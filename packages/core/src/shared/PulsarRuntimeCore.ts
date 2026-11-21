import type { QueueService } from "../modules/Queue.module.ts";
import type { PulsarClock } from "../subsys/PulsarClock.ts";
import type { IPulsarRuntime, IRuntimeExecutionContext } from "../runtimes/runtimeTypes.ts";
import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { IsolateInstance } from "../service/Isolate.service.ts";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage.ts";
import type { PulsarEventBus } from "../service/PulsarEventBus.ts";
import type { Scheduler } from "../modules/Scheduler.module.ts";
import type { SelfInvokingEngine } from "../types/engine.types.ts";
import { LoggerService, type ILogger } from "../subsys/LoggerService.ts";
import { config } from "../service/ConfigurationStore.ts";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "../subsys/RuntimeCacheStorage.ts";

export interface RuntimeDependencies {
    queueService : QueueService;
    clock : PulsarClock;
    storage : PulsarUnifiedStorage
    queues : EngineQueuesConfig[];
    events : PulsarEventBus;
    isolate : IsolateInstance;
    scheduler : Scheduler;
}

interface ISelfInvocationState {
    idpInvoked : boolean;
    continuationScheduledForCurrentLock : boolean;
}

interface ExecuteSelfInvocation {
    queue : string;
    pooler : string;
    delaySec : number;
    continuationOwnerId : string;
    isIdpLock : boolean;
    isEdpLock : boolean;
    targetEdpQueue : string | null;
}

export abstract class PulsarRuntimeCore implements IPulsarRuntime {
    abstract readonly type : "PERSISTENT" | "SERVERLESS_VM" | "V8_ISOLATE";
    abstract readonly shouldShutdownOnCycleComplete : boolean;
    
    /** Minimum runtime required to make booting up the engine worth it (in seconds) */
    abstract readonly minBootRequirementSec : number;

    protected queueService : QueueService;
    protected clock : PulsarClock;
    protected queues : EngineQueuesConfig[];
    protected storage : PulsarUnifiedStorage;
    protected isolate : IsolateInstance;
    protected events : PulsarEventBus;
    protected scheduler : Scheduler;
    protected logger : ILogger;
    protected memory : RuntimeCacheStorage;

    constructor(deps : RuntimeDependencies) {
        this.queueService = deps.queueService;
        this.clock = deps.clock;
        this.queues = deps.queues;
        this.isolate = deps.isolate;
        this.storage = deps.storage;
        this.events = deps.events;
        this.scheduler = deps.scheduler;
        this.logger = new LoggerService();
        this.memory = createRuntimeCacheStorage();
    }

    abstract onBoot(ctx : IRuntimeExecutionContext) : void;
    abstract onStart(ctx : IRuntimeExecutionContext) : Promise<void>;
    abstract handleCycleCompletion(ctx : IRuntimeExecutionContext) : Promise<boolean>;
    abstract handleRestart(ctx : IRuntimeExecutionContext) : Promise<void>;

    public abstract executeTick(queueConfig: EngineQueuesConfig, tickRunner: () => Promise<void>) : Promise<void>;
    abstract scheduleTick(queueConfig: EngineQueuesConfig, tickRunner: () => Promise<void>) : Promise<void>;

    public get runtimeContext() {
        const ctx = this.memory.references.get<IRuntimeExecutionContext>('runtime_context');

        if (!ctx) {
            this.logger.error(`[RuntimeCore] : Runtime Context could not be founde.`);
            throw new Error(`[RuntimeCore] : Runtime Context could not be founde.`);
        }

        return ctx;
    }

    public async executeQueuesTick(runTick : IRuntimeExecutionContext["runTick"]) {
        const tickConcurrency = config.get('engine.tickConcurrency'); // "sequential" | "parallel"
        
        this.logger.log(`[Tick Controller] : Execution tick mode has been selected with concurrency ${tickConcurrency}`);

        if(tickConcurrency == "sequential") {
            for(const q of this.queues) {
                if(q.pooler == "interval-driven-pooler") {
                    await runTick(q);
                }
            }
        }
        else {
            const results = await Promise.allSettled(
                this.queues.filter(q => q.pooler === "interval-driven-pooler")
                .map((q) => runTick(q))
            )

            for (const res of results) {
                if (res.status === "rejected") {
                    this.logger.error("[Tick] : Error >>", res.reason);
                }
            }
        }
    }

    protected async triggerSelfInvocation(args : ExecuteSelfInvocation) : Promise<ISelfInvocationState> {
        const { queue, pooler, delaySec, continuationOwnerId, isIdpLock, isEdpLock, targetEdpQueue } = args;

        const url = config.get('engine.selfURL');

        const engine = config.raw.engine as SelfInvokingEngine;
        const selfInvocationMethod = engine.selfInvocationMethod;

        const state : ISelfInvocationState = {
            idpInvoked: false,
            continuationScheduledForCurrentLock: false
        }

        if (pooler === "interval-driven-pooler") {
            state.idpInvoked = true;
            if (isIdpLock) state.continuationScheduledForCurrentLock = true;
            this.logger.log(`(IDP) : Invoking Self in ${delaySec} seconds...`);
        }
        else if (pooler === "event-driven-pooler") {
            if (isEdpLock && queue === targetEdpQueue) {
                state.continuationScheduledForCurrentLock = true;
            }
            this.logger.log(`(EDP) : Invoking Self in ${delaySec} seconds...`);
        }

        const headers : Record<string, string> = {
            'content-type': 'application/json',
            'x-last-execution-id': continuationOwnerId,
            'x-last-execution-at': new Date().toISOString(),
            'x-execution-owner': 'engine',
            'x-restart': 'false',
            'x-pooler': pooler,
            'x-target-queue': queue
        }

        if(selfInvocationMethod == "auto_using_pgnet") {
            await this.queueService.triggerUrl({ url, headers, delaySeconds: delaySec })
        }

        else if (typeof selfInvocationMethod === "object" && selfInvocationMethod !== null && selfInvocationMethod.method === "manual") {
            await selfInvocationMethod.handler(url);
        }

        return state;
    }
}