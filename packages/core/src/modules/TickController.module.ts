import { PulsarEventBus } from "../service/PulsarEventBus.ts";
import { config } from "../service/ConfigurationStore.ts";
import { LoggerService, type ILogger } from "../subsys/LoggerService.ts";
import { QueueFSM } from "../fsm/domain/QueueFSM.ts";

import type { Scheduler } from "./Scheduler.module.ts";
import type { TickService } from "./Tick.module.ts";
import type { PulsarClock } from "../subsys/PulsarClock.ts";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage.ts";
import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { PulsarRuntimeCore } from "../shared/PulsarRuntimeCore.ts";

interface ITickController {
    clock : PulsarClock;
    tickService : TickService;
    scheduler : Scheduler;
    storage : PulsarUnifiedStorage;
    runtimeStrategy : PulsarRuntimeCore;
}

export class TickController {
    private clock : PulsarClock;

    private tickService : TickService;
    private scheduler : Scheduler;
    private storage : PulsarUnifiedStorage;
    
    private runtimeStrategy : PulsarRuntimeCore;
    
    private tickState = new Map<string, { count : number; max : number; registred : boolean, stopped : boolean }>();
    private activeTicks = new Set<string>();

    private lastHealthCheckAt : number = 0;

    private logger : ILogger;

    constructor({ scheduler, storage, tickService, clock, runtimeStrategy } : ITickController) {
        this.logger = new LoggerService();
        this.clock = clock;

        this.tickService = tickService;
        this.scheduler = scheduler;
        this.storage = storage;

        this.runtimeStrategy = runtimeStrategy;

        this.initializeState();
    }

    public initializeState() {
        this.tickState.clear();
        this.activeTicks.clear();
    }

    public resetQueueState(queue : string) {
        this.tickState.delete(queue);   
        this.activeTicks.delete(queue);
    }

    // Future plan:
    // Refactor the tick execution flow into independent self contained units.
    //
    // Instead of TickController directly owning and coordinating the state,
    // counters, active-tick tracking, scheduling and stop/completion behavior
    // for every queue, each queue's recurring tick process should become its own
    // isolated unit (for example, a `TickUnit`).
    //
    // Each `TickUnit` would encapsulate the lifecycle and behavior of one queue's
    // tick loop: its own cycle counter, cycle limit, running/stopped status,
    // scheduling continuation and completion handling.
    //
    // TickController will still exist, but its responsibility will change from
    // directly managing per-queue tick state to managing and coordinating these
    // smaller tick units. It will create, start, stop, reset, and query the
    // appropriate unit for a queue, while each unit operates independently within
    // its own boundary.

    public async runTick(queueConfig : EngineQueuesConfig) {
        await this.runtimeStrategy.executeTick(queueConfig, async () => {
            const { queue } = queueConfig;
            
            if(!QueueFSM.canExecuteTick(queueConfig.queue)) {
                const currentState = QueueFSM.getMachine(queueConfig.queue).getState();
                this.logger.log(`[FSM] : Queue(${queueConfig.queue}) tick execution blocked - Current state : ${currentState}`);
                return;
            }
            
            this.initializeTickState(queueConfig);
        
            if (this.activeTicks.has(queue) || this.tickState.get(queue)?.stopped) {
                return;
            }

            this.activeTicks.add(queue);
            this.scheduler.cancel(queue); // cancel any pending wakeup timer for this queue running now

            let stopped = false;

            try {
                let globalAvailableSlots : number = Infinity;

                const maxGlobalConcurrency = config.get('swarmConfig')?.maxGlobalConcurrency;

                if(maxGlobalConcurrency !== undefined) {
                    const totalActiveWorkers = await this.storage.repository.getGlobalActiveWorkersCount();
                    globalAvailableSlots = Math.max(0, maxGlobalConcurrency - totalActiveWorkers);
                }

                if (globalAvailableSlots > 0 && !this.tickState.get(queue)?.stopped) {
                    await this.tickService.run(queueConfig, globalAvailableSlots);
                }
            }
            catch (error) {
                this.logger.error(`Orchestrator error on ${queue}:`, error);
            }
            finally {
                this.activeTicks.delete(queue);
                stopped = this.updateTickCounter(queue);
            }
            
            if (stopped) {
                return;
            }

            await this.runtimeStrategy.scheduleTick(queueConfig, () => this.runTick(queueConfig))
        })
    }

    public endTick(queue : string) {
        const state = this.tickState.get(queue);

        if (state) {
            if(state.stopped == true) return;

            this.tickState.set(queue, { ...state, stopped: true });
            this.scheduler.cancel(queue);
            this.clock.clear(queue);

            const allStopped = config.raw.queues.every((q) => {
                const s = this.tickState.get(q.queue);
                return s ? s.stopped : true;
            })

            const persistent = !this.runtimeStrategy.shouldShutdownOnCycleComplete;

            if(persistent || allStopped) {
                PulsarEventBus.emit("tick:cycle-completed", {
                    queue : queue,
                    cycles : this.tickState.get(queue)?.count ?? 1
                })
            }
        }
    }

    private initializeTickState(q : EngineQueuesConfig) {
        const existing = this.tickState.get(q.queue);

        if (!existing) {
            this.tickState.set(q.queue, { count: 0, max: q.cycleTickLimit ?? 10, registred : true, stopped: false });
        }
    }

    private updateTickCounter(queue : string) {
        const state = this.tickState.get(queue) ?? { count: 0, stopped: false, max : 10, registred : false };
        const count = state.count + 1;
        const reachedMax = count >= state.max;

        this.tickState.set(queue, { ...state, count });

        if (state.stopped) {
            this.triggerPeriodicHealthCheck();
            return true;
        }

        if (reachedMax) {
            this.endTick(queue);
        }

        this.triggerPeriodicHealthCheck();
        return state.stopped || reachedMax;
    }

    private triggerPeriodicHealthCheck() {
        const now = Date.now();
        const shouldShutdownOnCycleComplete = this.runtimeStrategy.shouldShutdownOnCycleComplete;
        const healthCheckIntervalSec = (config.get('engine.healthCheckIntervalSec') ?? 15) * 1000;

        if (now - this.lastHealthCheckAt >= healthCheckIntervalSec && !shouldShutdownOnCycleComplete) {
            this.lastHealthCheckAt = now;
            PulsarEventBus.emit('engine:health-check-requested', { timestamp: now });
        }
    }
}