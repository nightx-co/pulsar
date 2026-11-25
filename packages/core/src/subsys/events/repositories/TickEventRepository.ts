import { config } from "../../../service/ConfigurationStore";
import { LoggerService, type ILogger } from "../../LoggerService";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "../../RuntimeCacheStorage";

import type { IEngineContext } from "../context/EngineContext";
import type { PulsarEventMap } from "../../../types/events.type";
import type { IRuntimeExecutionContext } from "../../../runtimes/runtimeTypes";

export class TickEventRepository {
    private readonly logger : ILogger;
    private memory : RuntimeCacheStorage;

    constructor(private readonly ctx : IEngineContext) {
        this.logger = new LoggerService();
        this.memory = createRuntimeCacheStorage();
    }

    public async onCycleCompleted({ queue } : PulsarEventMap["tick:cycle-completed"]) {
        const { runtimeStrategy, shutdown, tickController, executionContext } = this.ctx;
        
        if (runtimeStrategy.shouldShutdownOnCycleComplete) {
            await shutdown();
        }
        else {
            this.logger.log("[Pulsar Persistent] : Cycle completed. Resetting state for next execution round.");
            tickController.resetQueueState(queue);

            const queueConfig = config.raw.queues.find(q => q.queue === queue);
            if (!queueConfig) return;

            if (queueConfig.pooler === "event-driven-pooler") {
                /*
                    Issue PR(#7) : Persistent EDP locks are acquired but never released after the triggered tick completes,
                    blocking subsequent events for up to 120 seconds.
                    Release the lock after the persistent EDP cycle using the same owner that acquired it.
                */

                // Fixed : Releasing Queue Lock & Clearing dispatch pending everytime an EDP queue finishes its lifecycle.
                await this.ctx.storage.repository.releaseQueueLock(`lock:edp:${queueConfig.queue}`, this.ctx.executionContext.currentExecutionId);
                await this.ctx.storage.repository.clearDispatchPending(`lock:edp:${queueConfig.queue}`);
                return;
            }

            await executionContext.runTick(queueConfig);
        }
    }

    public async onForceRun({ queue, reason } : PulsarEventMap["tick:force-run"]) {
        this.logger.log(`[Tick] : Force executing tick for queue [${queue.queue}] Trigger Reason : ${reason}`);

        const runtimeContext = this.memory.references.get<IRuntimeExecutionContext>('runtime_context');
        if (!runtimeContext) {
            this.logger.error(`[ServerlessRuntime] : Context could not be found during onFutureSchedule. This will result in a silent halt of the engine.`);
            throw new Error(`[ServerlessRuntime] : Context could not be found during onFutureSchedule. This will result in a silent halt of the engine.`);
        }

        await runtimeContext.runTick(queue);
    }

    public onTickEnd({ queue, reason } : PulsarEventMap["tick:end"]) {
        this.logger.log(`[Tick] : Force stoping tick for queue [${queue}] (Trigger Reason : ${reason})`);
        this.ctx.tickController.endTick(queue);
    }

    public async onTimeExceeded({ queue } : PulsarEventMap["tick:time-exceeded"]) {
        this.logger.log(`[Tick] : Ending [${queue}] All Ticks due to time limit.`);
        this.ctx.tickController.endTick(queue);
    }

    public async onHealthCheckRequested() {
        this.logger.log(`Pulsar : Health checking ping at (${new Date().toISOString()})`);
        await this.ctx.storage.ops.pingHealthCheck();
    }
}