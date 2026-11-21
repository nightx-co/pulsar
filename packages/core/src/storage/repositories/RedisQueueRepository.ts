import type { Redis as RedisTCP } from "ioredis";
import type { Redis as RedisHTTP } from "@upstash/redis";
import type { RedisDriver } from "../drivers/RedisDriver.ts";
import type { IBatchCandidate } from "../../modules/Tick.module.ts";

import REGISTER_WORKERS_LUA from "../../scripts/lua/registerWorkers.lua";
import ACQUIRE_QUEUE_LOCK_LUA from "../../scripts/lua/acquireQueueLock.lua";
import RELEASE_QUEUE_LOCK_LUA from "../../scripts/lua/releaseQueueLock.lua";
import EVALUATE_DEAD_RUN_LUA from "../../scripts/lua/evaluateDeadRun.lua";
import CLAIM_GLOBAL_BUDGET_LUA from "../../scripts/lua/claimGlobalJobBudget.lua";
import REFUND_GLOBAL_BUDGET_LUA from "../../scripts/lua/refundGlobalJobBudget.lua";
import COUNT_ACTIVE_WORKERS_LUA from "../../scripts/lua/countActiveWorkers.lua";
import STOP_LUA from "../../scripts/lua/stop.lua";
import RESET_WORKERS_LUA from '../../scripts/lua/resetWorkers.lua';

import { BaseQueueRepository } from "./QueueRepository.ts";
import { WORKER_TTL_MS } from "../../static/static.ts";

type DeadRunReason =  | "ALLOWED" | "NO_JOBS" | "IDP_LOCKED" | "EDP_LOCKED" | "EDP_DISPATCH_PENDING" | "UNKNOWN_POOLER";

export class RedisQueueRepository extends BaseQueueRepository {
    private protocol : "tcp" | "http";

    constructor(private readonly driver : RedisDriver) {
        super();
        this.protocol = driver.options.protocol;
        this.driver = driver;
    }

    private get redis() : RedisTCP | RedisHTTP {
        return this.driver.getNativeClient();
    }

    private get prefix () : string {
        if(!this.driver.prefix) {
            throw new Error('[RedisQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).');
        }
        return this.driver.prefix;
    }

    override async registerWorker (queue : string, candidateBatches : IBatchCandidate[], concurrency : number, globalMaxConcurrency : number = Infinity) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;
        const now = Date.now();

        const keys = [registryKey, globalRegistryKey];
        const args = [
            concurrency,
            globalMaxConcurrency === Infinity ? 999999999 : globalMaxConcurrency,
            now,
            WORKER_TTL_MS,
            ...candidateBatches.map((b) => b.workerId),
        ] as string[];

        if (this.protocol === "http") {
            const httpRedis = this.redis as RedisHTTP;

            const grantedWorkerIds = await httpRedis.eval<string[]>(
                REGISTER_WORKERS_LUA,
                keys,
                args
            ) as string[];
            return grantedWorkerIds ?? [];
        }
        else {
            const tcpRedis = this.redis as RedisTCP;
            const grantedWorkerIds = (await tcpRedis.eval(
                REGISTER_WORKERS_LUA,
                keys.length,
                ...keys,
                ...args
            )) as string[];
            return grantedWorkerIds ?? [];
        }
    }

    override async deregisterWorker(workerId : string, queue : string) {
        if (!workerId) return;
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const globalWorkerId = `${registryKey}:${workerId}`;

        const pipeline = this.redis.pipeline();
        pipeline.hdel(registryKey, workerId);
        pipeline.hdel(globalRegistryKey, globalWorkerId);
        await pipeline.exec();
    }

    override async resetAllocatedWorkerSlots(queue : string) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const keys = [registryKey, globalRegistryKey];
        const args : (string | number)[] = [];

        await this.evalScript<number>(
            RESET_WORKERS_LUA,
            keys,
            args
        )
    }

    override async getActiveWorkersCount(queue : string) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const now = Date.now();
        const count = await this.evalScript<number>(COUNT_ACTIVE_WORKERS_LUA, [registryKey], [now]);
        return Number(count ?? 0);
    }

    override async getGlobalActiveWorkersCount() {
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;
        const count = await this.evalScript<number>(COUNT_ACTIVE_WORKERS_LUA, [globalRegistryKey], []);
        return Number(count ?? 0);
    }

    override async setFutureSchedule(queue : string, scheduleAt : string) {
        const registryKey = `${this.prefix}:queues:${queue}:next_ready_at`;
        await this.redis.set(registryKey, scheduleAt);
    }

    private budgetKeyPrefix() {
        return `${this.prefix}:global:job_budget`;
    }

    override async claimGlobalJobBudget(requested : number, maxGlobalJobsPerTick : number) {
        if (maxGlobalJobsPerTick === Infinity || maxGlobalJobsPerTick <= 0) {
            return { granted: requested, window: "" };
        }

        const result = await this.evalScript<[number | string, number | string]>(
            CLAIM_GLOBAL_BUDGET_LUA,
            [this.budgetKeyPrefix()],
            [requested, maxGlobalJobsPerTick]
        )

        const [granted, window] = result ?? [0, ""];
        return { granted: Number(granted ?? 0), window: String(window ?? "") };
    }

    override async refundGlobalJobBudget(amount : number, window : string) {
        if (amount <= 0 || !window) return;

        const windowKey = `${this.budgetKeyPrefix()}:${window}`;
        await this.evalScript<unknown>(REFUND_GLOBAL_BUDGET_LUA, [windowKey], [amount]);
    }

    override async acquireQueueLock(lockKey : string, ownerId : string, ttlMs : number) : Promise<boolean> {
        const result = await this.evalScript<number>(ACQUIRE_QUEUE_LOCK_LUA, [`${this.prefix}:${lockKey}`], [ownerId, ttlMs]);
        return Boolean(result);
    }

    override async releaseQueueLock(lockKey : string, ownerId : string) : Promise<boolean> {
        const result = await this.evalScript<number>(RELEASE_QUEUE_LOCK_LUA, [`${this.prefix}:${lockKey}`], [ownerId]);
        return result === 1;
    }

    override async clearDispatchPending(lockKey : string) : Promise<void> {
        const dispatchKey = `${lockKey}:pending`;
        await this.redis.del(dispatchKey);
    }

    override async evaluateDeadRun(
        queueName : string,
        poolerType : "interval-driven-pooler" | "event-driven-pooler",
        totalJobs : number,
        continuationOwnerId : string,
        dispatchTtlMs : number = 15000,
        idpLockKey : string = "lock:idp",
        edpLockPrefix : string = "lock:edp:"
    ) : Promise<boolean> {

        const prefixedIdpLockKey = `${this.prefix}:${idpLockKey}`;
        const prefixedEdpLockKey = `${this.prefix}:${edpLockPrefix}`;

        const keys = [prefixedIdpLockKey, prefixedEdpLockKey];
        const args = [queueName, poolerType, totalJobs, continuationOwnerId, dispatchTtlMs];
        
        const reason = await this.evalScript<DeadRunReason>(EVALUATE_DEAD_RUN_LUA, keys, args);

        if(reason !== "ALLOWED") {
            console.log(`DEAD_RUN STOP REASON : ${reason}`);
        }

        return reason === "ALLOWED";
    }

    private async evalScript<T>(script : string, keys : string[], args : (string | number)[]) : Promise<T> {
        if (this.protocol === "http") {
            const httpRedis = this.redis as RedisHTTP;
            return (await httpRedis.eval(script, keys, args)) as T;
        }
        const tcpRedis = this.redis as RedisTCP;
        return (await tcpRedis.eval(script, keys.length, ...keys, ...args)) as T;
    }

    override async getStopSignal(queue : string) : Promise<boolean> {
        const stopKey = `${this.prefix}:stops:${queue}`;

        const result = await this.evalScript<number>(STOP_LUA, [stopKey], []);
        return result === 1;
    }
}