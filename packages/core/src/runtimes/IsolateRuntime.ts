import { PulsarRuntimeCore, type RuntimeDependencies } from "../shared/PulsarRuntimeCore.ts";
import { PulsarRuntime } from "../types/runtime.types.ts";

import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { IRuntimeExecutionContext } from "./runtimeTypes.ts";
import { config } from "../service/ConfigurationStore.ts";
import { DeferredTickEvaluator } from "../subsys/DeferredTickEvaluator.ts";
import { PulsarEventBus } from "../service/PulsarEventBus.ts";

export class IsolateRuntime extends PulsarRuntimeCore {
    public readonly type = "V8_ISOLATE";
    public readonly shouldShutdownOnCycleComplete = true;
    public override minBootRequirementSec = 5;

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
        this.logger.log(`[EngineRuntime] : Initialized V8 Isolate Runtime.`);
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

        // unfinished, status : pending
        if(queueConfig.interventionPolicy == "tick" || (queueConfig.interventionPolicy == "inherit" && config.get('engine.interventionPolicy') == "tick")) {
            const shouldStop = await this.storage.repository.getStopSignal(queueConfig.queue);
            
            if(shouldStop) {
                PulsarEventBus.emit("tick:cycle-completed", { queue, cycles : 1 });
                return;
            }
        }

        await this.deps.clock.trackExecutionTime({ contextId: queue }, tickRunner);
    }

    public override async scheduleTick(queueConfig : EngineQueuesConfig, tickRunner : () => Promise<void>) {
        const { queue, concurrency, pooler } = queueConfig;

        const ctx = this.runtimeContext;
        const metrics = await this.queueService.getSingleQueueMetrics(queue);

        if (!metrics || !metrics.queueName) {
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
            },
        })
        
        return;
    }

    public override async handleCycleCompletion(ctx : IRuntimeExecutionContext) {
        let idpInvoked = false;
        let continuationScheduledForCurrentLock = false;
        const continuationOwnerId = ctx.currentExecutionId;

        const { isEdpLock, isIdpLock, targetEdpQueue } = this.parseLockKey(ctx.lockKey);
        
        for (const { queue, pooler } of ctx.getActiveQueues()) {
            try {
                if(pooler == "interval-driven-pooler" && idpInvoked) continue;
                if (isEdpLock && queue !== targetEdpQueue) continue;
                
                const metrics = await this.queueService.getSingleQueueMetrics(queue);

                if(!metrics) continue;

                if (metrics.total === 0) {
                    this.logger.log(`[Engine] : Queue ${queue} is empty (total: 0) using ${pooler} pooler. Halting tick.`)

                    if(pooler == "event-driven-pooler") {
                        ctx.endTick(queue);
                        continue;
                    }
                    else {
                        ctx.endTick(queue);
                    }
                }

                const totalJobs = metrics.total;
                const shouldInvoke = await this.storage.repository.evaluateDeadRun(
                    queue,
                    pooler,
                    totalJobs,
                    continuationOwnerId,
                    15000
                )

                if (!shouldInvoke) {
                    this.logger.log(`[Engine] : Should not invoke for ${queue}. Skipping.`);
                    continue;
                }

                const selfInvocationIntervalSec : number = config.get("engine.selfInvocationIntervalSec") ?? 1;
                const isV8Isolate = config.get('runtime') == PulsarRuntime.V8_ISOLATE;

                let delaySec = selfInvocationIntervalSec;

                if(isV8Isolate && config.raw.isolate) {
                    const isolate = config.raw.isolate;
                    const remainingTimeSec = (isolate.remainingTime / 1000);

                    const MIN_EXECUTION_TIME_SEC = this.minBootRequirementSec;

                    const REQUIRED_BUDGET_SEC = selfInvocationIntervalSec + MIN_EXECUTION_TIME_SEC;

                    if (remainingTimeSec < REQUIRED_BUDGET_SEC) {
                        this.logger.log(
                            `[EngineRuntime] : Isolate remaining time (${remainingTimeSec.toFixed(3)}s) is insufficient ` +
                            `for self-invocation (${selfInvocationIntervalSec}s delay + ${MIN_EXECUTION_TIME_SEC}s min work). Triggering restart.`
                        );

                        await this.handleRestart(ctx);
                        return true;
                    }
                    const maxAvailableDelay = Math.max(1, remainingTimeSec - MIN_EXECUTION_TIME_SEC);
                    delaySec = Math.min(selfInvocationIntervalSec, maxAvailableDelay);
                }
                
                const stateUpdate = await this.triggerSelfInvocation({
                    queue,
                    pooler,
                    delaySec,
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
                this.logger.log(`[deadRun] : Error checking queue ${queue}:`, error);
            }
        }
        
        return continuationScheduledForCurrentLock;
    }

    public override async handleRestart(ctx : IRuntimeExecutionContext) {
        let idpInvoked = false;
        const continuationOwnerId = ctx.currentExecutionId;
        const selfRestartIntervalSec = config.get("engine.selfRestartIntervalSec");

        const activeQueues = ctx.getActiveQueues();

        for (const { queue, pooler } of activeQueues) {
            
            if(pooler == "interval-driven-pooler" && idpInvoked) continue;

            const headers : Record<string, string> = {
                'content-type': 'application/json',
                'x-last-execution-id' : continuationOwnerId,
                'x-last-execution-at' : new Date().toISOString(),
                'x-execution-owner' : 'engine',
                'x-restart' : 'true',
                'x-pooler' : pooler,
                'x-target-queue' : queue
            };

            this.logger.log(`(${pooler}) : invoking engine via restartTick (${selfRestartIntervalSec})`);

            if(pooler == "interval-driven-pooler") idpInvoked = true;

            const lockKey = ctx.lockKey;

            await this.storage.repository.releaseQueueLock(lockKey, ctx.isolateId);
            await this.storage.ops.addRestart(activeQueues);

            await this.queueService.triggerUrl({
                url: config.get('engine.selfURL'),
                headers,
                delaySeconds: selfRestartIntervalSec
            });

            await this.storage.ops.updateRestartOwnership(queue, 'handled_by_engine');
        }
    }

    private parseLockKey(currentLockKey? : string) {
        const isEdpLock = currentLockKey?.startsWith("pulsar:lock:edp:") ?? false;
        const isIdpLock = currentLockKey === "pulsar:lock:idp";
        const targetEdpQueue = isEdpLock ? currentLockKey?.replace("pulsar:lock:edp:", "") ?? null : null;

        return { isEdpLock, isIdpLock, targetEdpQueue };
    }
}