import type { PostgresDriver } from "./drivers/PostgresDriver.ts";
import type { RedisDriver } from "./drivers/RedisDriver.ts";
import type { IQueueRepository } from "./repositories/QueueRepository.ts";

import { PostgresQueueRepository } from "./repositories/PostgresQueueRepository.ts";
import { RedisQueueRepository } from "./repositories/RedisQueueRepository.ts";

import { PostgresEngineOperationRepository } from "./repositories/PostgresEngineOperationRepository.ts";
import { LoggerService, type ILogger } from "../subsys/LoggerService.ts";

export type StorageStrategy = "AUTO" | "REDIS_CACHE" | "PG_UNLOGGED";

export interface PulsarStorageOptions {
    cache?: RedisDriver;
    db: PostgresDriver;
    /**
     * Storage Pooling Strategies:
     * - "AUTO"         : Uses Redis if `cache` is defined; otherwise falls back to PG_UNLOGGED.
     * - "REDIS_CACHE"  : Forces in-memory Redis buffers for maximum speed (Requires Redis).
     * - "PG_UNLOGGED"  : Uses Postgres Unlogged tables for fast volatile queueing (No Redis needed).
     */
    strategy?: StorageStrategy;
    syncIntervalMs?: number;
}

/**
 * Unified storage orchestrator for Pulsar queueing mechanics.
 * 
 * Manages the initialization, strategy resolution, and connection lifecycles of underlying
 * storage drivers (Postgres and optional Redis). Depending on the selected `StorageStrategy`,
 * it dynamically delegates queue operations to a high-throughput Redis memory store or
 * an optimized PostgreSQL repository (such as unlogged tables) while guaranteeing core 
 * database mechanics for engine orchestration.
 */
export class PulsarUnifiedStorage {
    public readonly repository : IQueueRepository;

    public readonly cache? : RedisDriver;
    public readonly db : PostgresDriver;
    public readonly ops : PostgresEngineOperationRepository;
    private readonly logger : ILogger;

    public readonly strategy : StorageStrategy;
    public readonly syncIntervalMs : number;
    private isConnected : boolean = false;

    constructor(options : PulsarStorageOptions) {
        this.logger = new LoggerService();

        if (!options.db) {
            throw new Error("[PulsarUnifiedStorage] PostgresDriver is required for core engine to operate.");
        }

        this.cache = options.cache;
        this.db = options.db;
        this.syncIntervalMs = options.syncIntervalMs ?? 500;
        
        this.ops = new PostgresEngineOperationRepository(this.db);

        let resolvedStrategy = options.strategy ?? "AUTO";
        if (resolvedStrategy === "AUTO") {
            resolvedStrategy = this.cache ? "REDIS_CACHE" : "PG_UNLOGGED";
        }

        this.strategy = resolvedStrategy;

        switch (this.strategy) {
            case "REDIS_CACHE":
                if (!this.cache) {
                   throw new Error("[PulsarUnifiedStorage] Strategy 'REDIS_CACHE' requires a valid Redis cache driver.");
                }
                this.repository = new RedisQueueRepository(this.cache);
                break;

            case "PG_UNLOGGED":
                this.repository = new PostgresQueueRepository(this.db);
                break;

            default:
                throw new Error(`[PulsarUnifiedStorage] Unsupported storage strategy: '${this.strategy}'`);
        }
    }

    public bindInstanceId(instanceId: string) {
        if (this.cache) {
            this.cache.setKeyPrefix(instanceId);
        }
        if (this.db) {
            this.db.setKeyPrefix(instanceId);
        }
    }

    public async connect() {
        if(this.isConnected) return;
        const tasks : Promise<void>[] = [];

        if (this.cache) tasks.push(this.cache.connect());
        if (this.db) tasks.push(this.db.connect());

        await Promise.all(tasks);
        this.logger.log(`[PulsarStorage] Storage layer active [Strategy: ${this.strategy}]`);
        this.isConnected = true;
    }

    public async disconnect() {
        this.isConnected = false;

        // const tasks : Promise<void>[] = [];
        // if (this.cache) tasks.push(this.cache.disconnect());
        // if (this.db) tasks.push(this.db.disconnect());

        // await Promise.all(tasks);
    }

    public async healthCheck() {
        const health : Record<string, any> = {};
        if (this.db) health.db = await this.db.healthCheck();
        return health;
    }
}