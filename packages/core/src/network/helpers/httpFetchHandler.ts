import msgpack from '@msgpack/msgpack';
import { parseRequest } from "../../server/parser/parseRequest";
import { config } from '../../service/ConfigurationStore';
import { extractHeaders, type ResponseHeaders } from "../../server/utility/extract-headers";

import { QueueService } from '../../modules/Queue.module';
import type { PulsarUnifiedStorage } from '../../storage/PulsarStorage';
import type { IRuntimeExecutionContext } from "../../runtimes/runtimeTypes";
import type { RuntimeEventBridge } from '../../subsys/RuntimeEventBridge';
import type { RuntimeCacheStorage } from '../../subsys/RuntimeCacheStorage';
import type { ILogger } from '../../integrations';
import { QueueActionHandler } from './QueueActionHandler';

type StandardArgs = {
    headers : ResponseHeaders;
    body : any;
}

type StandardResponse = {
    status : number;
    message : string | Record<string, any>;
}

type RequestContext = {
    headers : ResponseHeaders;
    body : any;
    queue? : string;
    workerId : string;
    apiKey? : string;
}

export class HttpFetchHandler {
    private queueActionHandler : QueueActionHandler;

    constructor(
        private runtimeEventBridge : RuntimeEventBridge,
        private store : RuntimeCacheStorage,
        private logger : ILogger,
        private queueService : QueueService,
        private storage : PulsarUnifiedStorage
    ) {
        this.queueActionHandler = new QueueActionHandler({
            logger : console,
            storage : storage,
            ensureReady: () => storage.connect()
        })
    }

    private toHttpResponse(response : StandardResponse) : Response {
        const isObject = typeof response.message === "object" && response.message !== null;
        const payload = isObject ? JSON.stringify(response.message) : response.message;
        const headers : Record<string, string> = isObject ? { "Content-Type": "application/json" } : {};

        return new Response(payload as any, { status: response.status, headers });
    }

    public async handleFetch(req : Request) : Promise<Response> {
        const { url: rawUrl, method, body, headers : rawHeaders } = await parseRequest(req);
        const headers = extractHeaders(rawHeaders);

        const url = new URL(rawUrl);
        const args = { headers, body };

        const actionResponse = await this.queueActionHandler.tryHandle({ pathname: url.pathname, method, headers, body });
        if (actionResponse) return this.toHttpResponse(actionResponse);

        /*
        if (url.pathname.endsWith("/ack") && method === "POST") {
            const response = await this.handleAck(args);
            return this.toHttpResponse(response);
        }

        if (url.pathname.endsWith("/nack") && method === "POST") {
            const response = await this.handleNack(args);
            return this.toHttpResponse(response);
        }

        if (url.pathname.endsWith("/retry") && method === "POST") {
            const response = await this.handleRetry(args);
            return this.toHttpResponse(response);
        }

        if (url.pathname.endsWith("/deregister") && method === "POST") {
            const response = await this.handleDeregister(args);
            return this.toHttpResponse(response);
        }
        */

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

    private async performBatchAction(queue : string, workerId : string, messageIds : number[], action : "ACK" | "NACK" | "RETRY" | "DEREGISTER") {
        try {
            switch (action) {
                case "ACK":
                    await this.queueService.ackBatch(queue, messageIds);
                    break;
                case "NACK":
                    await this.queueService.nackBatch(queue, messageIds);
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

    private extractContext(args : StandardArgs) : RequestContext {
        const headers = args.headers;
        const body = this.parseBody(args.body);
        const queue = headers.targetQueue;
        const workerId = headers.workerId ?? '';
        const apiKey = headers.apiKey;

        return { headers, body, queue, workerId, apiKey };
    }

    private validateContext(ctx : RequestContext, options : { requireQueue? : boolean; requireApiKey? : boolean; requireWorkerId? : boolean } = {}) : StandardResponse | null {
        const { requireQueue = true, requireApiKey = true, requireWorkerId = false } = options;

        if (requireApiKey && !ctx.apiKey) {

            if (!ctx.apiKey) {
                this.logger.error(`[HTTP Network Driver] : API Key is not present in headers.`);
                return {
                    status: 401,
                    message: { error: "UNAUTHORIZED", message: "API key is missing in headers" }
                }
            }

            if (ctx.apiKey !== config.get('apiKey')) {
                this.logger.error(`[HTTP Network Driver] : Invalid API Key in headers.`);
                return {
                    status: 401,
                    message: { error: "UNAUTHORIZED", message: "Invalid API key" }
                }
            }
        }

        if (requireQueue && !ctx.queue) {
            this.logger.error(`[HTTP Network Driver] : Queue not found in headers.`);
            return {
                status: 400,
                message: { error: "BAD_REQUEST", message: "Target queue is missing in headers" }
            }
        }

        if (requireWorkerId && !ctx.workerId) {
            this.logger.error(`[HTTP Network Driver] : Worker ID not found in headers.`);
            return {
                status: 400,
                message: { error: "BAD_REQUEST", message: "Worker ID is missing in headers" }
            }
        }

        return null;
    }

    private getMessageIds(ctx : RequestContext) : number[] {
        const rawMsgIds = (Array.isArray(ctx.body?.msg_ids) ? ctx.body.msg_ids : []) as number[];
        return rawMsgIds
            .map((id) => Number.parseInt(String(id), 10))
            .filter((id) => Number.isInteger(id) && id >= 0);
    }

    private async handleAck(args : StandardArgs) : Promise<StandardResponse> {
        const ctx = this.extractContext(args);
        const validationError = this.validateContext(ctx);
        if (validationError) return validationError;

        const messageIds = this.getMessageIds(ctx);
        await this.performBatchAction(ctx.queue!, ctx.workerId, messageIds, "ACK");
        return { message: "Jobs Acknowledged", status: 200 };
    }

    private async handleNack(args : StandardArgs) : Promise<StandardResponse> {
        const ctx = this.extractContext(args);
        const validationError = this.validateContext(ctx);
        if (validationError) return validationError;

        const messageIds = this.getMessageIds(ctx);
        await this.performBatchAction(ctx.queue!, ctx.workerId, messageIds, "NACK");
        return { message: "Jobs Not Acknowledged", status: 200 };
    }

    private async handleRetry(args : StandardArgs) : Promise<StandardResponse> {
        const ctx = this.extractContext(args);
        const validationError = this.validateContext(ctx);
        if (validationError) return validationError;

        const messageIds = this.getMessageIds(ctx);
        await this.performBatchAction(ctx.queue!, ctx.workerId, messageIds, "RETRY");
        return { message: "Jobs Retry Applied", status: 200 };
    }

    private async handleDeregister(args : StandardArgs) : Promise<StandardResponse> {
        const ctx = this.extractContext(args);
        const validationError = this.validateContext(ctx, { requireWorkerId: true });
        if (validationError) return validationError;

        await this.performBatchAction(ctx.queue!, ctx.workerId, [], "DEREGISTER");
        return { message: "Worker Deregistered", status: 200 };
    }
}