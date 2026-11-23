import { PulsarUnifiedStorage } from '../storage/PulsarStorage.ts';
import { PulsarEventBus } from './PulsarEventBus.ts';
import { PulsarClock } from '../subsys/PulsarClock.ts';
import { QueueService } from '../modules/Queue.module.ts';

import { SwarmManager } from './SwarmBudgetTracker.ts';
import { Scheduler } from "../modules/Scheduler.module.ts";
import { TickService } from '../modules/Tick.module.ts';
import { TickController } from '../modules/TickController.module.ts';
import { PulsarRuntime } from '../types/runtime.types.ts';

import { PersistentRuntime } from '../runtimes/PersistentRuntime.ts';
import { ServerlessRuntime } from '../runtimes/ServerlessRuntime.ts';
import { IsolateRuntime } from '../runtimes/IsolateRuntime.ts';

import { config } from './ConfigurationStore.ts';
import { UnifiedTransportManager } from '../network/UnifiedTransportManager.ts';
import { LoggerService } from '../subsys/LoggerService.ts';
import { QueueFSM } from '../fsm/domain/QueueFSM.ts';

import type { EngineQueuesConfig } from '../types/queue.types.ts';
import type { EngineConsumerConfig } from '../types/consumer.types.ts';
import type { IsolateInstance } from './Isolate.service.ts';
import type { EngineConfig } from '../types/base.types.ts';
import type { IIntegration, IntegrationConstructor, IntegrationMap } from '../types/integrations.types.ts';
import type { PulsarRuntimeCore, RuntimeDependencies } from '../shared/PulsarRuntimeCore.ts';

/**
 * Core abstract base class for the Pulsar engine ecosystem.
 * 
 * Provides foundational lifecycle management, centralized event emitting, unified storage
 * initialization, queue registration
*/
export abstract class PulsarCore {
    protected storage : PulsarUnifiedStorage;

    protected tickService : TickService;
    protected tickController: TickController;

    protected unifiedTransportManager : UnifiedTransportManager;
    protected swarmManager : SwarmManager;
    protected scheduler : Scheduler;
    protected queueService : QueueService;

    protected clock : PulsarClock;
    protected events : PulsarEventBus;

    protected queues : EngineQueuesConfig[] = [];
    protected consumers : EngineConsumerConfig[] = [];

    protected runtimeStrategy: PulsarRuntimeCore;

    public readonly logger : LoggerService;
    private readonly integrations = new Map<string, IIntegration>();

    constructor (baseConfig : EngineConfig) {
        config.initialize(baseConfig);

        this.logger = new LoggerService();

        if (baseConfig.integrations?.length) {
            this.runIntegrations(baseConfig.integrations);
        }

        for(const { consumer, ...queue } of config.raw.queues) {
            this.queues.push(queue);
            this.consumers.push(consumer);
        }

        const instanceId = config.get('instanceId');

        if(!instanceId) {
            throw new Error('[Pulsar] : instanceId is required.');
        }
        
        const instanceIdRegex = /^[a-zA-Z0-9_-]+$/;

        if (typeof instanceId !== 'string' || !instanceIdRegex.test(instanceId)) {
            throw new Error('[Pulsar] : Invalid instanceId format. It must contain only alphanumeric characters, hyphens, and underscores (e.g., "string-like-this" or "or_this").');
        }

        this.events = new PulsarEventBus();

        let maxExecutionBudgetMs = Infinity;

        const isV8Isolate = config.raw.runtime === PulsarRuntime.V8_ISOLATE;

        const isolate = config.get('isolate')!;

        if(isV8Isolate) {
            maxExecutionBudgetMs = Math.max(0, isolate.remainingTime - 5000);
        }
        else if(config.raw.runtime === PulsarRuntime.SERVERLESS_VM) {
            maxExecutionBudgetMs = config.raw.timeoutSec * 1000;
            this.logger.log(`[Clock] : SERVERLESS runtime started with ${maxExecutionBudgetMs / 1000} second timeout.`);
        }

        this.storage = config.raw.storage;
        this.storage.connect();
        this.storage.bindInstanceId(instanceId);
        
        this.clock = new PulsarClock({
            maxExecutionBudgetMs,
            safetyBufferMs: 0,
            maxTrackHistory : 50,
            enabled : true
        })
        
        this.queueService = new QueueService(this.storage);
        this.scheduler = new Scheduler();

        this.runtimeStrategy = this.resolveRuntimeStrategy();

        if (!this.runtimeStrategy) {
            this.logger.error('[Pulsar] Failed to resolve a valid runtime strategy.');
            throw new Error('[Pulsar] Failed to resolve a valid runtime strategy.');
        }

        const queues = config.get('queues');

        /*
            Issue PR(#7) : QueueFSM leaves HTTP-consumer queues in IDLE_WAITING_FOR_WORKER,
            but only WebSocket registration makes a queue READY;
            HTTP queues therefore fail canExecuteTick() forever. 
            Initialize HTTP queues as ready while retaining worker gating for socket queues,
            or add an equivalent readiness transition for HTTP consumers.
        */

        if(config.raw.runtime == PulsarRuntime.PERSISTENT) {
            this.unifiedTransportManager = new UnifiedTransportManager({
                ...config.raw.networkInterface,
                isServer : true
            }, this.storage, this.queueService);

            /* FIX
                FOR QUEUES ONLY WITH CONSUMER TYPE OF HTTP OR CALLBACK, THE QUEUE FSM SHOULD TRANSITION TO READ.
                AS NO WORKERS WILL CONNECT LIKE SOCKET WORKERS.
            */
            for(const { consumer, queue } of queues) {
                if(consumer.type == "http" || consumer.type == "callback") {
                    const machine = QueueFSM.getMachine(queue);
                    machine.transition('READY');    
                }
            }
        }
        else {
            this.unifiedTransportManager = new UnifiedTransportManager({
                mode : "client",
                isServer : false,
                port : 0,
            }, this.storage, this.queueService)

            /* FIX
                IN NON PERSISTENT RUNTIME, ( SERVERLESS, V8_ISOLATE, EDGE ) ALWAYS TRANSITION THE STATE TO READY BY DEFAULT.
                AS OF CURRENT VERSION OF PULSAR, NON PERSISTENT RUNTIME DO NOT SUPPORT SOCKET CONSUMER TYPE.
            */
            for(const { queue } of queues) {
                const machine = QueueFSM.getMachine(queue);
                machine.transition('READY');
            }
        }

        this.swarmManager = new SwarmManager(
            config.raw.swarmConfig?.globalMaxJobsPerTick ?? Infinity,
            config.raw.swarmConfig?.maxGlobalConcurrency ?? Infinity
        )
        
        this.tickService = new TickService({
            queue : this.queueService,
            storage : this.storage,
            swarmManager: this.swarmManager,
            unifiedTransportManager : this.unifiedTransportManager
        })

        this.tickController = new TickController({
            scheduler : this.scheduler,
            storage : this.storage,
            tickService : this.tickService,
            clock : this.clock,
            runtimeStrategy : this.runtimeStrategy
        })

        if(Number.isFinite(maxExecutionBudgetMs) && isV8Isolate) {
            this.logger.log(`[EngineRuntime] : isolate registred with id : [${isolate.id}]`);
            this.logger.log(`[Clock] : Synced execution timeout (${maxExecutionBudgetMs / 1000}s) with isolate [${isolate.id}]`);
        }
        else {
            this.logger.log(`[EngineRuntime] : Engine Started With No V8 Isolate (${new Date().toISOString()})`);
            if(Number.isFinite(maxExecutionBudgetMs)) {
                this.logger.log(`[Clock] : Synced execution timeout (${maxExecutionBudgetMs / 1000}s)`);
            }
        }
    }

    private resolveRuntimeStrategy() : PulsarRuntimeCore {
        const deps : RuntimeDependencies = {
            queueService: this.queueService,
            clock: this.clock,
            queues : this.queues,
            storage : this.storage,
            isolate : this.V8Isolate,
            events : PulsarEventBus,
            scheduler : this.scheduler
        }

        switch (config.get('runtime')) {
            case PulsarRuntime.PERSISTENT:
                return new PersistentRuntime(deps);
            case PulsarRuntime.SERVERLESS_VM:
                return new ServerlessRuntime(deps);
            case PulsarRuntime.V8_ISOLATE:
                return new IsolateRuntime(deps);
            default:
                throw new Error(`Unsupported Runtime`);
        }
    }

    protected async runIntegrations(integrations : Array<IntegrationConstructor | IIntegration>) {
        for (const item of integrations) {
            let instance : IIntegration;

            if (typeof item === "function") {
                instance = new item("ALL");
            }
            else {
                instance = item;
            }

            await instance.main(this);

            this.integrations.set(instance.module, instance);
        }
    }

    public getIntegration<K extends keyof IntegrationMap>(moduleOrClass : K) : IntegrationMap[K];
    public getIntegration<T extends IIntegration>(moduleOrClass : new (...args : any[]) => T) : T;

    public getIntegration(moduleOrClass : any) : any {
        if (typeof moduleOrClass === "string") {
            return this.integrations.get(moduleOrClass);
        }

        for (const instance of this.integrations.values()) {
            if (instance instanceof moduleOrClass) {
                return instance;
            }
        }

        const name = typeof moduleOrClass === "string" ? moduleOrClass : moduleOrClass.name;
        throw new Error(`Integration "${name}" is not registered.`);
    }

    get runtime() : keyof typeof PulsarRuntime {
        return this.runtimeStrategy.type as keyof typeof PulsarRuntime;
    }

    get isV8Isolate() {
        return config.get('runtime') === PulsarRuntime.V8_ISOLATE
    }

    get V8Isolate() : IsolateInstance {
        return config.raw.isolate as IsolateInstance;
    }

    protected async exit() {
        await this.storage.disconnect();
    }
}