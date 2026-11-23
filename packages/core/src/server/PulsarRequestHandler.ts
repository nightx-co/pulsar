import { QueueActionHandler } from "../network/helpers/QueueActionHandler";
import { aquireInstanceLock } from "./helpers/acquireRedisLock";
import { checkFencingTokenValidity } from "./helpers/checkFencingValidity";
import { performEngineRestart } from "./helpers/performIsolateRestart";
import { parseRequest } from "./parser/parseRequest";
import { extractHeaders } from "./utility/extract-headers";

import type { IsolateInstance } from "../service/Isolate.service";
import type { Pulsar } from "../service/Pulsar.service";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import { config } from "../service/ConfigurationStore";

interface PulsarHandlerOptions {
    unifiedStorage : PulsarUnifiedStorage;
    getEngine: (instanceId : string) => Pulsar;
    instanceId : string;
    apiKey : string;
    /**
     * Optional isolate instance. Required only when Pulsar runtime is V8_ISOLATE.
     */
    isolate? : IsolateInstance;
}


export type GetEngine = {
    lockKey : string;
    instanceId : string;
}

type StandardResponse = {
    status : number;
    message : string;
}

export type ErrorHook = (error : unknown) => Response | void;

class PulsarRequestHandlerBuilder {
    private onErrorHook? : ErrorHook;
    private queueActionHandler : QueueActionHandler;

    constructor(private readonly opts : PulsarHandlerOptions) {
        this.queueActionHandler = new QueueActionHandler({
            logger : console,
            storage : opts.unifiedStorage,
            ensureReady: () => opts.unifiedStorage.connect(),
            getApiKey: () => opts.apiKey
        })
    }

    public onError(fn : ErrorHook): this {
        this.onErrorHook = fn;
        return this;
    }

    public async handle(req : Request) {
        const { url : rawUrl, method, body, headers } = await parseRequest(req);

        const url = new URL(rawUrl);

        const actionResponse = await this.queueActionHandler.tryHandle({
            pathname: url.pathname,
            method,
            headers : extractHeaders(headers),
            body
        })

        if (actionResponse) return actionResponse;

        if (url.pathname.endsWith("/validate_config") && method == "POST") {
            return await this.handleReconcileConfiguration();
        }

        return await this.handleEngineExecution(req);
    }

    private async handleReconcileConfiguration () : Promise<StandardResponse> {
        const engine = this.opts.getEngine(this.opts.instanceId);
        return await engine.validateConfiguration();
    }

    /**
     * Handles the HTTP request lifecycle for Pulsar Engine.
    */
    public async handleEngineExecution(req : Request) : Promise<StandardResponse> {
        const { headers : rawHeaders } = await parseRequest(req);
        const headers = extractHeaders(rawHeaders);

        const {
            executionOwner,
            isRestarted,
            lastExecutionId,
            lastIsolateId,
            poolerMode,
            targetQueue,
            fencingToken,
        } = headers;

        const isEventDriven = poolerMode === "event-driven-pooler";

        if (isEventDriven && !targetQueue) {
            return {
                message: "Target queue is not defined.",
                status: 400
            }
        }

        console.log(`[PulsarRequestHandlerBuilder] : Executing request for engine startup.`);

        await this.opts.unifiedStorage.connect();
        this.opts.unifiedStorage.bindInstanceId(this.opts.instanceId);

        const invalidFencingResponse = await checkFencingTokenValidity({
            executionOwner,
            isEventDriven,
            targetQueue : targetQueue as string,
            fencingToken,
            ops : this.opts.unifiedStorage.ops,
            requestStorageDisconnect : async () => {
                await this.opts.unifiedStorage.disconnect();
            }
        })

        if(invalidFencingResponse) return invalidFencingResponse;

        const lockAquiredResponse = await aquireInstanceLock({
            isEventDriven,
            lastExecutionId,
            targetQueue : targetQueue as string,
            repository : this.opts.unifiedStorage.repository,
            instanceId : this.opts.instanceId,
            requestStorageDisconnect : async () => {
                await this.opts.unifiedStorage.disconnect();
            }
        })

        if(typeof lockAquiredResponse == "object") {
            return lockAquiredResponse;
        }

        if(this.opts.isolate) {
            this.opts.isolate.set('current_execution_id', lastExecutionId);
            this.opts.isolate.set('lock_key', lockAquiredResponse);
        }

        try {
            const engine = this.opts.getEngine(this.opts.instanceId);
            engine.setCurrentExecutionId(lastExecutionId);
            const isV8Isolate = engine.runtime === "V8_ISOLATE";

            const isolate = this.opts.isolate;

            if (isV8Isolate && !isolate) {
                await this.opts.unifiedStorage.disconnect();
                throw new Error("[Pulsar SDK] : 'isolate' option must be provided when runtime is V8_ISOLATE.");
            }

            try {
                const blockResponse = await performEngineRestart({
                    engine,
                    isolate,
                    executionOwner,
                    isRestarted,
                    isV8Isolate,
                    lastExecutionId,
                    lastIsolateId,
                    poolerMode,
                    targetQueue : targetQueue as string 
                })

                if(blockResponse) {
                    await this.opts.unifiedStorage.disconnect();
                    return blockResponse;
                }

                if (isEventDriven && targetQueue) {
                    await engine.triggerQueue(targetQueue);
                }
                else {
                    await engine.start();
                }

                return {
                    message: "Engine Started Successfully",
                    status: 200
                }
            }
            catch (err) {
                if (this.onErrorHook) {
                    const customErrResponse = this.onErrorHook(err);
                    if (customErrResponse) {
                        return {
                            message : "Interval Exception Raised",
                            status : 200
                        }
                    }
                }
                throw err;
            }
            finally {
                await engine.awaitPendingShutdown();
            }   
        }
        catch (error) {
            await this.opts.unifiedStorage.repository.releaseQueueLock(lockAquiredResponse as string, lastExecutionId);
            await this.opts.unifiedStorage.disconnect();
            throw new Error(error as any);
        }
    }
}

export function createPulsarRequestHandler(opts : PulsarHandlerOptions) : PulsarRequestHandlerBuilder {
    return new PulsarRequestHandlerBuilder(opts);
}