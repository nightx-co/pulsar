import msgpack from '@msgpack/msgpack';
import { HttpFetchHandler } from '../helpers/httpFetchHandler';
import { RuntimeEventBridge } from '../../subsys/RuntimeEventBridge';
import { BaseNetworkDriver } from "../abstract/BaseNetworkDriver";
import { createRuntimeCacheStorage } from "../../subsys/RuntimeCacheStorage";
import { config } from "../../service/ConfigurationStore";

import { PulsarRuntime } from "../../types/runtime.types";
import { CircuitBreakerFSM } from '@package/src/fsm/domain/CircuitBreaker';
import type { PulsarUnifiedStorage } from "../../storage/PulsarStorage";
import type { NetworkConfig } from "../interfaces/network.types";
import type { NetworkInterface } from "../NetworkInterface";
import type { EngineConsumerConfig } from "../../types/consumer.types";
import type { RuntimeCacheStorage } from "../../subsys/RuntimeCacheStorage";

export class HttpNetworkDriver extends BaseNetworkDriver {
    public override readonly interface = "HTTP";

    private consumersMap : Map<string, EngineConsumerConfig>;
    private triggerHandler?: (queue : string, data : any) => void;

    private runtimeEventBridge : RuntimeEventBridge;
    private store : RuntimeCacheStorage;
    private httpFetchHandler : HttpFetchHandler;

    constructor(
        readonly networkConfig : NetworkConfig,
        private readonly networkInterface : NetworkInterface,
        private storage : PulsarUnifiedStorage,
    ) {
        super(networkConfig);
        this.store = createRuntimeCacheStorage();

        const runtimeExecutionId = this.memory.kv.get<string>("runtime_execution_id");

        this.runtimeEventBridge = new RuntimeEventBridge(this.storage, this.logger, runtimeExecutionId!);
        this.httpFetchHandler = new HttpFetchHandler(
            this.runtimeEventBridge,
            this.store,
            this.logger,
            this.storage
        );

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

            // VIEW THE CircuitBreaker.ts FOR MORE REFERENCES.
            CircuitBreakerFSM.handleFailedDispatch(queue);
        }
        finally {
            /*
                DEREGISTER THE WORKER SLOT HERE, SO THE NEXT DISPATCH WONT GET STALE DUE TO SLOT EXHUSTION.
            */
        }
    }

    public onTrigger(handler: (queue : string, data : any) => void) {
        this.triggerHandler = handler;
    }

    public override async stop() {}

    private async handleFetch(req : Request) {
        return this.httpFetchHandler.handleFetch(req);
    }
}