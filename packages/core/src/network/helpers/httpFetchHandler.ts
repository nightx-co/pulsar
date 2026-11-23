import { parseRequest } from "../../server/parser/parseRequest";
import { config } from '../../service/ConfigurationStore';
import { extractHeaders } from "../../server/utility/extract-headers";
import { QueueActionHandler } from './QueueActionHandler';

import type { PulsarUnifiedStorage } from '../../storage/PulsarStorage';
import type { IRuntimeExecutionContext } from "../../runtimes/runtimeTypes";
import type { RuntimeEventBridge } from '../../subsys/RuntimeEventBridge';
import type { RuntimeCacheStorage } from '../../subsys/RuntimeCacheStorage';
import type { ILogger } from '../../integrations';

type StandardResponse = {
    status : number;
    message : string | Record<string, any>;
}

export class HttpFetchHandler {
    private queueActionHandler : QueueActionHandler;

    constructor(
        private runtimeEventBridge : RuntimeEventBridge,
        private store : RuntimeCacheStorage,
        private logger : ILogger,
        private storage : PulsarUnifiedStorage
    ) {
        this.queueActionHandler = new QueueActionHandler({
            logger : this.logger,
            storage : storage,
            ensureReady: () => storage.connect(),
            getApiKey: () => config.get('apiKey')
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

        const actionResponse = await this.queueActionHandler.tryHandle({ pathname: url.pathname, method, headers, body });
        if (actionResponse) return this.toHttpResponse(actionResponse);

        const executionOwner = headers.executionOwner;
        const poolerMode = headers.poolerMode;

        if(executionOwner == 'trigger') {
            if(poolerMode == 'event-driven-pooler') {
                const queueName = headers.targetQueue as string;
                const fencingToken = headers.fencingToken ?? '0';

                const activeCtx = this.store.kv.get<IRuntimeExecutionContext>('active_runtime_ctx');

                if(!activeCtx) {
                    this.logger.warn('active runtime context was not found');
                    return new Response('UNKNOWN ROUTE', { status: 500 });
                }

                else await this.runtimeEventBridge.httpEventDrivenQueueTrigger(queueName, fencingToken, activeCtx);
            }
        }

        return new Response('UNKNOWN ROUTE', { status: 200 });
    }
}