import { QueueService } from "../modules/Queue.module";
import { aquireInstanceLock } from "./helpers/acquireRedisLock";
import { checkFencingTokenValidity } from "./helpers/checkFencingValidity";
import { performEngineRestart } from "./helpers/performIsolateRestart";
import { parseRequest } from "./parser/parseRequest";
import { extractHeaders } from "./utility/extract-headers";

import type { IsolateInstance } from "../service/Isolate.service";
import type { Pulsar } from "../service/Pulsar.service";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage";

interface PulsarHandlerOptions {
    unifiedStorage : PulsarUnifiedStorage;
    getEngine: (instanceId : string) => Pulsar;
    instanceId : string;
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

type StandardArgs = {
    headers : Record<string, string>;
    body: any;
}

export type ErrorHook = (error : unknown) => Response | void;

class PulsarRequestHandlerBuilder {
    private onErrorHook? : ErrorHook;

    constructor(private readonly opts : PulsarHandlerOptions) {}

    public onError(fn : ErrorHook): this {
        this.onErrorHook = fn;
        return this;
    }

    public async handle(req : Request) {
        const { url : rawUrl, method, body, headers } = await parseRequest(req);

        const url = new URL(rawUrl);
        const args = { headers, body };

        if (url.pathname.endsWith("/ack") && method == "POST") {
            return await this.handleAck(args);
        }

        if (url.pathname.endsWith("/nack") && method == "POST") {
            return await this.handleNack(args);
        }

        if (url.pathname.endsWith("/retry") && method == "POST") {
            return await this.handleRetry(args);
        }

        if (url.pathname.endsWith("/validate_config") && method == "POST") {
            return await this.handleReconcileConfiguration();
        }

        return await this.handleEngineExecution(req);
    }

    private async getMessageIds(args : StandardArgs) : Promise<{queue : string, messageIds : number[], workerId : string}> {
        const { headers } = args;

        let parsedBody = args.body;
        if (typeof parsedBody === "string") {
            try {
                parsedBody = JSON.parse(parsedBody);
            }
            catch (err : any) {
                throw new Error(err);
            }
        }

        const queue = headers["x-queue"];
        const workerId = headers["x-worker-id"];

        if(!queue) throw new Error("[getMessageIds] : Queue Not Found In Headers");
        if(!workerId) throw new Error("[getMessageIds] : Worker Id Not Found In Headers");

        const rawMsgIds = (Array.isArray(parsedBody?.msg_ids) ? parsedBody.msg_ids : []) as number[];
        const messageIds : number[] = rawMsgIds.map((id) => Number.parseInt(String(id), 10)).filter((id) => Number.isInteger(id) && id >= 0);

        if(messageIds.length == 0) throw new Error("[getMessageIds] : No message ids were found");

        return { queue, messageIds, workerId };
    }

    private async performBatchAction(queue : string, workerId : string, messageIds : number[], action : "ACK" | "NACK" | "RETRY") {
        try {
            await this.opts.unifiedStorage.connect();

            const queueService = new QueueService(this.opts.unifiedStorage);

            switch (action) {
                case "ACK":
                    await queueService.ackBatch(queue, messageIds);
                    break;
                case "NACK":
                    await queueService.ackBatch(queue, messageIds);
                    break;
                case "RETRY":
                    await queueService.retryBatch(queue, messageIds);
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            await this.opts.unifiedStorage.repository.deregisterWorker(workerId, queue);
        }
    }

    private async handleAck(args : StandardArgs) : Promise<StandardResponse> {
        const { messageIds, queue, workerId } = await this.getMessageIds(args);

        //console.log(`[ACK] : Queue ${queue} : Message IDs ${messageIds}`);

        await this.performBatchAction(queue, workerId, messageIds, "ACK");

        return { message : "Jobs Acknowledged", status : 200 }
    }

    private async handleNack(args : StandardArgs) : Promise<StandardResponse> {
        const { queue, workerId, messageIds } = await this.getMessageIds(args);

        console.log(`[NACK] : Queue ${queue} : Message IDs ${messageIds}`);

        await this.performBatchAction(queue, workerId, messageIds, "NACK");

        return { message : "Jobs Nack Applied", status : 200 }
    }

    private async handleRetry(args : StandardArgs) : Promise<StandardResponse> {
        const { queue, workerId, messageIds } = await this.getMessageIds(args);

        console.log(`[RETRY] : Queue ${queue} : Message IDs ${messageIds}`);

        await this.performBatchAction(queue, workerId, messageIds, "RETRY");

        return { message : "Jobs Retry Applied", status : 200 }
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