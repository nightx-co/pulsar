import type { EngineConfig } from "../types/base.types.ts";
import type { QueueModule } from "../helpers/defineQueue";
import type { PostgresEngineOperationRepository } from "../storage/repositories/PostgresEngineOperationRepository";
import type { EngineQueuesConfig } from "../types/queue.types";
import type { PathValue, SettablePathKeys, ReadablePathKeys, IConfigurationObject } from "../types/config.types";

import { LoggerService, type ILogger } from "../subsys/LoggerService.ts";
import { PulsarRuntime } from "../types/runtime.types.ts";
import { EventTriggerStrategy } from "../types/eventTriggerStrategry.types.ts";
import { createRuntimeCacheStorage } from "../subsys/RuntimeCacheStorage.ts";
import { configValidator } from "../helpers/configValidator.ts";

const RUNTIME_BLOCKED_KEYS = new Set(["storage", "runtime", "onEvents", "isolate", "queue"]);

const RUNTIME_BLOCKED_QUEUE_KEYS = new Set<string>(["queue", "deadLetterQueue"]);

export class ConfigurationStore {
    private static instance : ConfigurationStore;
    protected _config? : EngineConfig;
    private initialSnapshot? : EngineConfig;
    private logger : ILogger;

    constructor() {
        this.logger = new LoggerService();
    }

    public static getInstance() : ConfigurationStore {
        if (!ConfigurationStore.instance) {
            ConfigurationStore.instance = new ConfigurationStore();
        }
        return ConfigurationStore.instance;
    }

    public initialize(baseConfig : EngineConfig) {
        const engineInterventionPolicy = baseConfig.engine?.interventionPolicy ?? 'disabled';

        this._config = {
            ...baseConfig,
            swarmConfig : {
                globalMaxJobsPerTick : 100_000,
                maxGlobalConcurrency : 10_000,
                spawnerAlgorithm : "ROUND_ROBIN",
                ...baseConfig.swarmConfig,    
            },
            engine: {
                ...(baseConfig.runtime == PulsarRuntime.PERSISTENT ? {
                    poolingIntervalSec : 5
                } : {}),

                ...(baseConfig.runtime == PulsarRuntime.SERVERLESS_VM || baseConfig.runtime == PulsarRuntime.V8_ISOLATE ? {
                    selfInvocationMethod : "auto_using_pgnet",
                    selfInvocationIntervalSec : 1,
                    healthCheckIntervalSec : 15,
                    selfRestartIntervalSec : 60,
                } : {}),

                tickConcurrency : "sequential",
                cycleTickLimit : 1000,

                interventionPolicy : engineInterventionPolicy,
                
                ...baseConfig.engine,
            },
            queues : baseConfig.queues.map(q => ({
                stateTransitionPolicy : {
                    enabled : true,
                    idleThresholdTicks : 10,
                    idleTimingProfile : 'RELAXED'
                },
                interventionPolicy : engineInterventionPolicy,
                ...q
            }))
        } as EngineConfig;

        configValidator(this._config, this.logger);

        this.initialSnapshot = Object.freeze(JSON.parse(JSON.stringify(this._config)));
    }

    private ensureInitialized() : asserts this is { _config: EngineConfig } {
        if (!this._config) {
            throw new Error("[ConfigurationStore]: Engine configuration store is not initialized. Call initialize() first.");
        }
        if (!this.initialSnapshot) {
            throw new Error("[ConfigurationStore]: Engine initial snapshot is not initialized");
        }
    }

    public get raw() : Readonly<EngineConfig> {
        this.ensureInitialized();
        return this._config;
    }

    public get<P extends ReadablePathKeys<EngineConfig>>(path : P) : PathValue<EngineConfig, P> {
        this.ensureInitialized();

        const keys = path.split(".");
        let current: any = this._config;

        for (const key of keys) {
            if (current === undefined || current === null) {
                return undefined as PathValue<EngineConfig, P>;
            }
            current = current[key];
        }

        return current as PathValue<EngineConfig, P>;
    }

    public getInitialSnapshot() : Readonly<EngineConfig> {
        this.ensureInitialized();
        return Object.freeze({ ...this.initialSnapshot! });
    }

    public set<P extends SettablePathKeys<EngineConfig>>(path: P, value: PathValue<EngineConfig, P>): void {
        this.ensureInitialized();

        const keys = path.split(".");
        const rootKey = keys[0]!;

        if (RUNTIME_BLOCKED_KEYS.has(rootKey)) {
            throw new Error(`[ConfigurationStore]: Modifying path '${path}' via set() is forbidden.`);
        }

        let current: any = this._config!;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i]!;
            if (!(key in current) || typeof current[key] !== "object") {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]!] = value;
    }

    public modifyQueue<K extends keyof EngineQueuesConfig, P extends SettablePathKeys<EngineQueuesConfig>>(
        queue : string,
        key : K,
        value : PathValue<EngineQueuesConfig, P>
    ) {
        this.ensureInitialized();

        if (RUNTIME_BLOCKED_QUEUE_KEYS.has(key as string)) {
            throw new Error(`[ConfigurationStore]: Property '${String(key)}' on queue '${queue}' cannot be modified at runtime.`);
        }

        const targetQueueIndex = this._config.queues.findIndex(q => q.queue == queue);

        if(!this._config['queues'][targetQueueIndex]) {
            throw new Error(`[ConfigurationStore]: Modifying queue '${queue}' not found.`);
        }

        this._config['queues'][targetQueueIndex]![key] = value as unknown as QueueModule[K];
    }

    public async reconcileConfiguration(repository : PostgresEngineOperationRepository) {
        const initialSnapshot = this.getInitialSnapshot();
        const store = createRuntimeCacheStorage();
        
        let selfUrl : string = 'NOT_REQUIRED';

        if(initialSnapshot.runtime === PulsarRuntime.SERVERLESS_VM || initialSnapshot.runtime === PulsarRuntime.V8_ISOLATE) {
            selfUrl = initialSnapshot.engine.selfURL;
        }
        else if(initialSnapshot.runtime === PulsarRuntime.PERSISTENT && initialSnapshot.eventTriggerStrategy === EventTriggerStrategy.WEBHOOK) {
            const cacheUrl = store.kv.get<string>('self_url');
            
            if(!cacheUrl) {
                throw new Error(`Runtime cache URL not found. The URL parameter is required when operating in PERSISTENT mode and when eventTriggerStrategy is set to WEBHOOK. Please verify your system configuration and ensure the HTTP server has successfully started and is running.`);
            }
            
            selfUrl = cacheUrl;
        }

        const ConfigurationObject : IConfigurationObject = {
            queues : initialSnapshot.queues.map(q => ({
                queue : q.queue,
                pooler : q.pooler
            })),
            runtime : initialSnapshot.runtime,
            event_trigger_strategy : initialSnapshot.runtime == PulsarRuntime['PERSISTENT'] ? initialSnapshot.eventTriggerStrategy : EventTriggerStrategy.WEBHOOK,
            self_url : selfUrl
        }

        const configurationSyncStatus = await repository.verifyAndSyncConfiguration(
            'PULSAR_STANDALONE',
            initialSnapshot.instanceId as string,
            selfUrl,
            ConfigurationObject
        )

        if(!configurationSyncStatus.isChanged && !configurationSyncStatus.isNew) {
            this.logger.log(`[Configuration] status : [VALID].`);
            return `[Configuration] status : [VALID].`;
        }
        else {
            this.logger.log(`[Configuration] status : [INVALID & Reconciled].`);
            return `[Configuration] status : [INVALID & Reconciled].`;
        }
    }
}

export const config = ConfigurationStore.getInstance();