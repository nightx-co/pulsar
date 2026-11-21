import msgpack from '@msgpack/msgpack';
import { RuntimeEventBridge } from '../../subsys/RuntimeEventBridge';
import { BaseNetworkDriver } from "../abstract/BaseNetworkDriver";
import { createRuntimeCacheStorage } from "../../subsys/RuntimeCacheStorage";
import { parseRequest } from "../../server/parser/parseRequest";
import { extractHeaders, type ResponseHeaders } from '../../server/utility/extract-headers';
import { config } from "../../service/ConfigurationStore";

import { PulsarRuntime } from "../../types/runtime.types";
import type { PulsarUnifiedStorage } from "../../storage/PulsarStorage";
import type { NetworkConfig } from "../interfaces/network.types";
import type { NetworkInterface } from "../NetworkInterface";
import type { QueueService } from "../../modules/Queue.module";
import type { EngineConsumerConfig } from "../../types/consumer.types";
import type { RuntimeCacheStorage } from "../../subsys/RuntimeCacheStorage";
import type { IRuntimeExecutionContext } from '../../runtimes/runtimeTypes';

type StandardArgs = {
    headers : ResponseHeaders;
    body : any;
}

type StandardResponse = {
    status : number;
    message : string;
}

export class HttpNetworkDriver extends BaseNetworkDriver {
    public override readonly interface = "HTTP";

    private consumersMap : Map<string, EngineConsumerConfig>;
    private triggerHandler?: (queue : string, data : any) => void;

    private runtimeEventBridge : RuntimeEventBridge;
    private store : RuntimeCacheStorage;


    constructor(
        readonly networkConfig : NetworkConfig,
        private readonly networkInterface : NetworkInterface,
        private storage : PulsarUnifiedStorage,
        private queueService : QueueService
    ) {
        super(networkConfig);
        this.store = createRuntimeCacheStorage();

        const runtimeExecutionId = this.memory.kv.get<string>("runtime_execution_id");

        this.runtimeEventBridge = new RuntimeEventBridge(this.storage, this.logger, runtimeExecutionId!);

        const consumers = config.get('queues');
        const map : Map<string, EngineConsumerConfig> = new Map();
        consumers.forEach(({ consumer, queue }) => map.set(queue, consumer));
        
        this.consumersMap = map;

        if (this.networkInterface) {
            this.networkInterface.onFetch = (req : Request) => this.handleFetch(req);
        }
    }

    public override async start() {}

    public override async broadcast(queue : string, payload : any, optimizePayload : boolean) {
        const consumer = this.consumersMap.get(queue);
        if (!consumer) {
            throw new Error(`No consumer registered for queue: "${queue}"`);
        }

        if (consumer.type !== "http") return;

        const { worker_id, batch } = payload;

        const rawPayload  = optimizePayload ? msgpack.encode(payload) : JSON.stringify(payload);

        const selfUrl = config.get('runtime') == PulsarRuntime.PERSISTENT ? this.store.kv.get('self_url') as string : config.get('engine.selfURL');

        try {
            await fetch(`${consumer.url}/dispatch`, {
                method: "POST",
                headers: {
                    'content-type': optimizePayload ? 'application/x-msgpack' : 'application/json',
                    ...consumer.headers,
                    'x-worker-id': worker_id,
                    'x-batch-size': batch.length.toString(),
                    'x-pulsar-callback-url': selfUrl,
                    'x-queue': queue,
                    "x-execution-signature": crypto.randomUUID(),
                    "x-instance-id" : config.get("instanceId"),
                    "x-api-key" : config.get("apiKey"),
                    "x-dispatched-at" : new Date().toISOString()
                },
                body: rawPayload
            })
        }
        catch (error) {
            this.logger.error('Error dispatching jobs to http consumer,', error);
        }
    }

    public onTrigger(handler: (queue : string, data : any) => void) {
        this.triggerHandler = handler;
    }

    public override async stop() {}

    private async handleFetch(req : Request) {
        const { url: rawUrl, method, body, headers : rawHeaders } = await parseRequest(req);
        const headers = extractHeaders(rawHeaders);

        const url = new URL(rawUrl);
        const args = { headers, body };

        if (url.pathname.endsWith("/ack") && method === "POST") {
            const response = await this.handleAck(args);
            return new Response(response.message, { status: response.status });
        }

        if (url.pathname.endsWith("/nack") && method === "POST") {
            const response = await this.handleNack(args);
            return new Response(response.message, { status: response.status });
        }

        if (url.pathname.endsWith("/retry") && method === "POST") {
            const response = await this.handleRetry(args);
            return new Response(response.message, { status: response.status });
        }

        if (url.pathname.endsWith("/deregister") && method === "POST") {
            const response = await this.handleDeregister(args);
            return new Response(response.message, { status: response.status });
        }

        const executionOwner = headers.executionOwner;
        const poolerMode = headers.poolerMode;

        if(executionOwner == 'trigger') {
            if(poolerMode == 'event-driven-pooler') {
                const queueName = headers.targetQueue as string;
                const fencingToken = headers.fencingToken ?? '0';

                const activeCtx = this.store.kv.get<IRuntimeExecutionContext>('active_runtime_ctx');

                if(!activeCtx) {
                    this.logger.warn('active runtime context was not found');
                    return new Response('UNKNOWN ROUTE', { status: 200 });
                }

                else await this.runtimeEventBridge.httpEventDrivenQueueTrigger(queueName, fencingToken, activeCtx);
            }
        }

        return new Response('UNKNOWN ROUTE', { status: 200 });
    }

    private async performBatchAction(queue : string, workerId : string, messageIds : number[],  action : "ACK" | "NACK" | "RETRY" | "DEREGISTER") {
        try {
            switch (action) {
                case "ACK":
                    await this.queueService.ackBatch(queue, messageIds);
                    break;
                case "NACK":
                    await this.queueService.ackBatch(queue, messageIds);
                    break;
                case "RETRY":
                    await this.queueService.retryBatch(queue, messageIds);
                    break;
                case "DEREGISTER":
                    await this.storage.repository.deregisterWorker(workerId, queue);
                    break;
            }
        }
        catch (error) {
            this.logger.error(`Error performing batch action [${action}] for queue [${queue}]:`, error);
            throw error;
        }
    }

    private parseBody(body : ArrayBufferLike | Uint8Array) : any {
        try {
            if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
                return msgpack.decode(body);
            }

            return body;
        }
        catch (err : any) {
            throw new Error(`Failed to parse request body : ${err?.message}`);
        }
    }

    private extractContext(args : StandardArgs) {
        const headers = args.headers;
        const body = this.parseBody(args.body);
        const queue = headers.targetQueue;
        const workerId = headers.workerId ?? '';

        if (!queue) {
            throw new Error("[HttpNetworkDriver] Queue not found in headers");
        }

        return { headers, body, queue, workerId };
    }

    private async getMessageIds(args : StandardArgs) : Promise<{ queue : string; messageIds : number[]; workerId : string }> {
        const { queue, body, workerId } = this.extractContext(args);

        const rawMsgIds = (Array.isArray(body?.msg_ids) ? body.msg_ids : []) as number[];
        const messageIds : number[] = rawMsgIds
            .map((id) => Number.parseInt(String(id), 10))
            .filter((id) => Number.isInteger(id) && id >= 0);

        return { queue, messageIds, workerId };
    }

    private async handleAck(args : StandardArgs) : Promise<StandardResponse> {
        const { messageIds, queue, workerId } = await this.getMessageIds(args);
        await this.performBatchAction(queue, workerId, messageIds, "ACK");
        return { message: "Jobs Acknowledged", status: 200 };
    }

    private async handleNack(args : StandardArgs) : Promise<StandardResponse> {
        const { messageIds, queue, workerId } = await this.getMessageIds(args);
        await this.performBatchAction(queue, workerId, messageIds, "NACK");
        return { message: "Jobs Not Acknowledged", status: 200 };
    }

    private async handleRetry(args : StandardArgs) : Promise<StandardResponse> {
        const { queue, workerId, messageIds } = await this.getMessageIds(args);
        await this.performBatchAction(queue, workerId, messageIds, "RETRY");
        return { message: "Jobs Retry Applied", status: 200 };
    }

    private async handleDeregister(args : StandardArgs) : Promise<StandardResponse> {
        const { queue, workerId } = this.extractContext(args);

        if (!workerId) {
            throw new Error("[HttpNetworkDriver] Worker ID not found in headers");
        }

        await this.performBatchAction(queue, workerId, [], "DEREGISTER");
        return { message: "Worker Deregistered", status: 200 };
    }
}