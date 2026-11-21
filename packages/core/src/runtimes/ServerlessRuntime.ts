import { config } from "../service/ConfigurationStore.ts";
import { PulsarEventBus } from "../service/PulsarEventBus.ts";
import { PulsarRuntimeCore, type RuntimeDependencies } from "../shared/PulsarRuntimeCore.ts";
import { DeferredTickEvaluator } from "../subsys/DeferredTickEvaluator.ts";

import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { IRuntimeExecutionContext } from "./runtimeTypes.ts";

export class ServerlessRuntime extends PulsarRuntimeCore {
    public readonly type = "SERVERLESS_VM";

    public override readonly shouldShutdownOnCycleComplete = true;
    public override minBootRequirementSec = 1;

    private deferredTickEvaluator : DeferredTickEvaluator;

    constructor(private deps : RuntimeDependencies) {
        super(deps);

        this.deferredTickEvaluator = new DeferredTickEvaluator(
            this.minBootRequirementSec,
            this.scheduler,
            this.clock,
            this.logger
        )
    }

    public override onBoot(ctx : IRuntimeExecutionContext) {
        this.logger.log(`Initialized Serverless VM Runtime.`);
        this.memory.references.set('runtime_context', ctx);
    }

    public override async onStart(ctx : IRuntimeExecutionContext) {
        await this.executeQueuesTick(ctx.runTick);
    }

    public override async executeTick(queueConfig : EngineQueuesConfig, tickRunner : () => Promise<void>) {
        const { queue } = queueConfig;
        
        this.deferredTickEvaluator.stopRuntimeWatchdog();

        const isSafeToContinue = this.deps.clock.isSafeToContinue();

        if (!isSafeToContinue) {
            this.logger.log(`[EngineRuntime] : Ending All Ticks due to time limit.`);
            
            PulsarEventBus.emit("tick:time-exceeded", {
                queue,
                elapsedMs : this.deps.clock.getElapsedTotalTime()
            });

            PulsarEventBus.emit("tick:cycle-completed", { queue, cycles : 1 });
            
            return;
        }

        await tickRunner();
    }

    public override async scheduleTick(queueConfig : EngineQueuesConfig, tickRunner : () => Promise<void>) : Promise<void> {
        const { queue, concurrency, pooler } = queueConfig;
        
        const ctx = this.runtimeContext;

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

        const wrappedTickRunner = async () => {
            this.deferredTickEvaluator.stopRuntimeWatchdog();
            await tickRunner();
        }

        this.scheduler.scheduleNext({
            metrics : { queue, availableSlots, ...metrics },
            onNext : wrappedTickRunner,
            onUpcomingDelayedNext: (upcomingTimeMs : number) => {
                this.logger.log(`[Scheduler] : Next tick scheduled in ${(upcomingTimeMs / 1000).toFixed(2)}s`);
                return this.deferredTickEvaluator.evaluateUpcomingDelayedNext(upcomingTimeMs, queue)
            },
            onFutureSchedule : async (nextVisibleAt) => {
                const futureTriggerTime = new Date(nextVisibleAt);
                const currentTime = new Date();

                const safeBufferSeconds = 1;
                const inTheFutureSeconds = Math.floor((futureTriggerTime.getTime() - currentTime.getTime()) / 1000) + safeBufferSeconds;

                this.logger.log(`[Scheduler] : Scheduled tick execution request`, `${(inTheFutureSeconds).toFixed(2)}s`);

                if(pooler === "event-driven-pooler") {
                    const continuationOwnerId = ctx.currentExecutionId;    
                    const { isEdpLock, isIdpLock, targetEdpQueue } = this.parseLockKey(ctx.lockKey);

                    await this.triggerSelfInvocation({
                        continuationOwnerId,
                        isEdpLock,
                        isIdpLock,
                        pooler,
                        queue,
                        delaySec : inTheFutureSeconds,
                        targetEdpQueue : targetEdpQueue
                    })

                    PulsarEventBus.emit("tick:cycle-completed", { queue, cycles: 1 });
                }
            },
        })
    }

    override async handleCycleCompletion(ctx : IRuntimeExecutionContext) {
        let idpInvoked = false;
        let continuationScheduledForCurrentLock = false;
        const continuationOwnerId = ctx.currentExecutionId;
        
        const { isEdpLock, isIdpLock, targetEdpQueue } = this.parseLockKey(ctx.lockKey);

        for (const { queue, pooler } of ctx.getActiveQueues()) {
            try {
                if(pooler == "interval-driven-pooler" && idpInvoked) continue;
                if (isEdpLock && queue !== targetEdpQueue) continue;
                
                const metrics = await this.queueService.getSingleQueueMetrics(queue);

                if (!metrics || !metrics.queueName) {
                    this.logger.error(`[Pulsar] : Failed to fetch metrics for ${queue}. Halting queue.`);
                    this.logger.error(JSON.stringify(metrics));
                    ctx.endTick(queue);
                    continue;
                }

                const totalJobs = metrics.total;

                if (metrics.delayedJobs > 0 && metrics.nextVisibleAt) {
                    const delayMs = metrics.nextVisibleAt - Date.now();
                    if (delayMs > 0) {
                        this.logger.log(`[Serverless Runtime] : Delayed jobs exist for ${queue}. Relying on scheduler's future wakeup in ${Math.ceil(delayMs / 1000)}s.`);
                        continuationScheduledForCurrentLock = true;
                        continue;
                    }
                }

                const shouldInvoke = await this.storage.repository.evaluateDeadRun(
                    queue,
                    pooler,
                    totalJobs,
                    continuationOwnerId,
                    15000
                )

                if (!shouldInvoke) {
                    this.logger.log(`[Pulsar] Should not invoke for ${queue}. Skipping.`);
                    continue;
                }

                const selfInvocationIntervalSec = config.get("engine.selfInvocationIntervalSec") ?? 1;

                const stateUpdate = await this.triggerSelfInvocation({
                    queue,
                    pooler,
                    delaySec : selfInvocationIntervalSec,
                    continuationOwnerId,
                    isIdpLock,
                    isEdpLock,
                    targetEdpQueue
                })

                if (stateUpdate.idpInvoked) idpInvoked = true;

                if (stateUpdate.continuationScheduledForCurrentLock) {
                    continuationScheduledForCurrentLock = true;
                }
            }
            catch (error) {
                this.logger.error(`[deadRun] : Error checking queue ${queue}:`, error);
            }
        }
        
        return continuationScheduledForCurrentLock;
    }

    private parseLockKey(currentLockKey? : string) {
        const isEdpLock = currentLockKey?.startsWith("pulsar:lock:edp:") ?? false;
        const isIdpLock = currentLockKey === "pulsar:lock:idp";
        const targetEdpQueue = isEdpLock ? currentLockKey?.replace("pulsar:lock:edp:", "") ?? null : null;

        return { isEdpLock, isIdpLock, targetEdpQueue };
    }

    public override async handleRestart(_ctx: IRuntimeExecutionContext) {};
}