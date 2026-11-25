import { PulsarRuntime } from "../types/runtime.types.ts";
import { PulsarEventBus } from "../service/PulsarEventBus.ts";
import { PulsarRuntimeCore, type RuntimeDependencies } from "../shared/PulsarRuntimeCore.ts";
import { RuntimeEventBridge } from "../subsys/RuntimeEventBridge.ts";
import { DeferredTickEvaluator } from "../subsys/DeferredTickEvaluator.ts";
import { EventTriggerStrategy } from "../types/eventTriggerStrategry.types.ts";
import { createRuntimeCacheStorage } from "../subsys/RuntimeCacheStorage.ts";
import { config } from "../service/ConfigurationStore.ts";

import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { IRuntimeExecutionContext } from "./runtimeTypes.ts";

export class PersistentRuntime extends PulsarRuntimeCore {
    public readonly type = "PERSISTENT";
    public readonly shouldShutdownOnCycleComplete = false;
    public override minBootRequirementSec = 1;
    private readonly runtimeExecutionId : string;

    private deferredTickEvaluator : DeferredTickEvaluator;
    private runtimeEventBridge : RuntimeEventBridge;

    constructor(deps : RuntimeDependencies) {
        super(deps);

        this.deferredTickEvaluator = new DeferredTickEvaluator(
            this.minBootRequirementSec,
            this.scheduler,
            this.clock,
            this.logger
        )
        
        this.runtimeExecutionId = crypto.randomUUID();

        this.runtimeEventBridge = new RuntimeEventBridge(this.storage, this.logger, this.runtimeExecutionId);
        this.memory = createRuntimeCacheStorage();
        this.memory.kv.set("runtime_execution_id", this.runtimeExecutionId);
    }

    public override onBoot(ctx : IRuntimeExecutionContext) {
        this.logger.log(`Initialized Persistent Runtime.`);
        this.memory.references.set("runtime_context", ctx);
    }

    override async onStart(ctx : IRuntimeExecutionContext) {
        const bridge = this.runtimeEventBridge;

        if(config.raw.runtime == PulsarRuntime['PERSISTENT']) {
            const eventTriggerStrategy= config.raw.eventTriggerStrategy;

            switch (eventTriggerStrategy) {
                case EventTriggerStrategy['POSTGRES_NOTIFY']:
                    await bridge.registerPgNotifyHandler(ctx);
                    break;
            
                case EventTriggerStrategy['POLLING']:
                    await bridge.registerPollingHandler(ctx);
                    break;

                case EventTriggerStrategy['WEBHOOK']:
                    this.logger.log(`[Persistent Runtime] : Event Driven Queue triggers will heppen via webhook endpoint.`);
                    break;
            }

        }

        await this.executeQueuesTick(ctx.runTick);
    }

    override async executeTick(queueConfig : EngineQueuesConfig, tickRunner : () => Promise<void>) {
        this.deferredTickEvaluator.clearTimer(queueConfig.queue);
        
        const { isValid, reason } = this.validateTickRun(queueConfig);

        if (!isValid) {
            this.logger.warn(`[Tick] : [${queueConfig.queue}] - Rejected, invalid tick run: ${reason}. Please Reconnect Worker ASAP.`);
        }

        // unfinished, status : pending
        if(queueConfig.interventionPolicy == "tick") {
            const shouldStop = await this.storage.repository.getStopSignal(queueConfig.queue);
            
            if(shouldStop) {
                PulsarEventBus.emit("tick:cycle-completed", { queue : queueConfig.queue, cycles : 1 });
                return;
            }
        }

        await tickRunner();
    }

    private validateTickRun({ queue } : EngineQueuesConfig) : { isValid : boolean, reason : string } {
        const targetConsumer = config.raw.queues.find(q => q.queue === queue);
        
        if (!targetConsumer) {
            this.logger.warn(`[Tick] : Queue configuration could not be found for '${queue}'.`);
            return { 
                isValid: false, 
                reason: `Queue configuration could not be found for '${queue}'.` 
            }
        }

        if (targetConsumer.consumer.type === "socket") {
            const connectionList = this.memory.lists.get(queue);

            if (!connectionList) {
                PulsarEventBus.emit('tick:end', { queue, reason : "Socket consumer connection list does not exist" });
                this.logger.warn(`[Tick] : Socket consumer connection list does not exist for queue '${queue}'.`);

                return { 
                    isValid: false, 
                    reason: `Socket consumer connection list does not exist for queue '${queue}'.` 
                }
            }

            const workers = Array.from(connectionList.values());
            if (workers.length == 0) {
                PulsarEventBus.emit('tick:end', { queue, reason : `Socket consumer has (${workers.length}) active connections.` });

                return { 
                    isValid: false, 
                    reason: `Socket consumer for queue '${queue}' has (${workers.length}) active connections.` 
                }
            }
        }

        return { isValid: true, reason: "Tick run validation passed successfully." };
    }

    override async scheduleTick(queueConfig : EngineQueuesConfig, tickRunner : () => Promise<void>) : Promise<void> {
        const { queue, concurrency, pooler } = queueConfig;

        const metrics = await this.queueService.getSingleQueueMetrics(queue);

        if(!metrics) {
            this.logger.error(`[Pulsar] : Failed to fetch metrics for ${queue}. Halting queue.`);
            this.logger.error(JSON.stringify(metrics));
            PulsarEventBus.emit("tick:cycle-completed", { queue, cycles: 1 });
            return;
        }

        if(metrics?.total == 0) {
            if(pooler == "event-driven-pooler") {
                this.logger.log(`[Tick] : [${queue}] - Tick Process Ended. Cycle Limit Reached`);
                PulsarEventBus.emit("tick:cycle-completed", { queue, cycles: 1 });
                return;
            }
        }

        const activeWorkers = await this.storage.repository.getActiveWorkersCount(queue);
        const availableSlots = Math.max(0, concurrency - activeWorkers);

        this.deferredTickEvaluator.clearTimer(queue);

        this.scheduler.scheduleNext({
            metrics : { queue, availableSlots, ...metrics },
            onNext : tickRunner,
            onUpcomingDelayedNext : (upcomingTimeMs : number) => {
                this.logger.log(`[Scheduler] : Next tick scheduled in ${(upcomingTimeMs / 1000).toFixed(2)}s`);
            },
            onFutureSchedule : async (nextVisibleAtMs) => {
                const delayMs = nextVisibleAtMs - Date.now();
                this.logger.log(`[Scheduler] : Deffered tick execution in ${(Math.max(0, delayMs) / 1000).toFixed(2)}s`);
                this.deferredTickEvaluator.forceExecuteTickLater(queueConfig, nextVisibleAtMs);
            }
        })
    }

    override async handleCycleCompletion() {
        return false;
    }

    override async onTimeExceed(ctx: IRuntimeExecutionContext) {}

    override async handleRestart() {
        this.logger.log("[Persistent Runtime] : Restart triggered. Handled by process manager (PM2/systemd).");
    }
}