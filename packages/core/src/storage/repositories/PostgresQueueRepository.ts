import postgres from "postgres";
import { WORKER_TTL_MS } from "../../static/static.ts";

import type { PostgresDriver } from "../drivers/PostgresDriver.ts";
import type { IBatchCandidate } from "../../modules/Tick.module.ts";
import { BaseQueueRepository } from "./QueueRepository.ts";

type DeadRunReason =  | "ALLOWED" | "NO_JOBS" | "IDP_LOCKED" | "EDP_LOCKED" | "EDP_DISPATCH_PENDING" | "UNKNOWN_POOLER";

const NEVER_EXPIRES = "9223372036854775807";

export class PostgresQueueRepository extends BaseQueueRepository {
    constructor(private readonly driver : PostgresDriver) {
        super();
        this.driver = driver;
    }

    private get sql () : postgres.Sql {
        return this.driver.getNativeClient();
    }

    private get prefix () : string {
        if(!this.driver.prefix) {
            throw new Error('[PostgresQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).');
        }
        return this.driver.prefix;
    }

    override async registerWorker (queue : string, candidateBatches : IBatchCandidate[], concurrency : number, globalMaxConcurrency : number = Infinity) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const candidateIds = candidateBatches.map(b => b.workerId);

        if (candidateIds.length === 0) return [];

        const effectiveGlobalLimit = globalMaxConcurrency === Infinity ? 2147483647 : globalMaxConcurrency;

        const result = await this.sql<{ granted_worker_id: string }[]>`
            SELECT granted_worker_id
            FROM pulsar.register_workers(
                ${registryKey}::varchar,
                ${globalRegistryKey}::varchar,
                ${concurrency}::int,
                ${effectiveGlobalLimit}::int,
                ${WORKER_TTL_MS}::bigint,
                ${this.sql.array(candidateIds)}::varchar[]
            )
        `;

        return result.map(row => row.granted_worker_id);
    }

    override async deregisterWorker(workerId : string, queue : string) {
        if (!workerId) return;
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const globalWorkerId = `${registryKey}:${workerId}`;

        await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE (key = ${registryKey} AND field = ${workerId})
               OR (key = ${globalRegistryKey} AND field = ${globalWorkerId})
        `;
    }

    override async resetAllocatedWorkerSlots(queue : string) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;
        const globalFieldPrefix = `${registryKey}:`;

        await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE key = ${registryKey}
            OR (key = ${globalRegistryKey} AND field LIKE ${globalFieldPrefix + '%'})
        `;
    }

    override async getActiveWorkersCount(queue : string) {
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;

        const [result] = await this.sql<{ count: number }[]>`
            SELECT COUNT(*)::int AS count
            FROM pulsar.queue_cache
            WHERE key = ${registryKey} AND expires_at > pulsar.now_ms()
        `;

        return result?.count ?? 0;
    }

    override async setFutureSchedule(queue : string, scheduleAt : string) : Promise<void> {
        const registryKey = `${this.prefix}:queues:${queue}:next_ready_at`;

        await this.sql`
            INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
            VALUES (${registryKey}, '', ${scheduleAt}, ${NEVER_EXPIRES})
            ON CONFLICT (key, field)
            DO UPDATE SET value = EXCLUDED.value
        `;
    }

    override async getGlobalActiveWorkersCount() {
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const [result] = await this.sql<{ count: number }[]>`
            SELECT COUNT(*)::int AS count
            FROM pulsar.queue_cache
            WHERE key = ${globalRegistryKey} AND expires_at > pulsar.now_ms()
        `;

        return result?.count ?? 0;
    }

    override async refundGlobalJobBudget(amount : number, window : string) {
        if (amount <= 0) return;

        const windowKey = `${this.budgetKeyPrefix()}${window}`;

        await this.sql`
            UPDATE pulsar.queue_cache
            SET value = GREATEST(0, value::int - ${amount})::text
            WHERE key = ${windowKey} AND field = 'count'
        `;
    }

    private budgetKeyPrefix() {
        return `${this.prefix}:global:job_budget`;
    }

    override async claimGlobalJobBudget(requested : number, maxGlobalJobsPerTick : number) {
        if (maxGlobalJobsPerTick === Infinity || maxGlobalJobsPerTick <= 0) {
            return { granted: requested, window: "" };
        }

        const prefix = this.budgetKeyPrefix();

        return await this.sql.begin(async (tx) => {
            // Lock first, THEN read the clock, so the window we use is the one that
            // is current when we actually hold the lock. The lock is per budget
            // (not per window) so claims stay fully serialized across a rollover.
            await tx`SELECT pg_advisory_xact_lock(hashtext(${prefix}))`;

            const [clock] = await tx<{ second: number }[]>`
                SELECT floor(pulsar.now_ms() / 1000)::float8 AS second
            `;
            const second = clock!.second;
            const windowKey = `${prefix}${second}`;
            const expiresAt = (second + 2) * 1000; // TTL 2s

            await tx`
                DELETE FROM pulsar.queue_cache
                WHERE starts_with(key, ${prefix})
                  AND expires_at <= pulsar.now_ms()
            `;

            const [row] = await tx<{ used: number }[]>`
                SELECT COALESCE(
                    (SELECT value::int FROM pulsar.queue_cache WHERE key = ${windowKey} AND field = 'count'),
                    0
                ) AS used
            `;

            const granted = Math.max(0, Math.min(requested, maxGlobalJobsPerTick - (row?.used ?? 0)));

            if (granted > 0) {
                await tx`
                    INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
                    VALUES (${windowKey}, 'count', ${String(granted)}, ${expiresAt}::bigint)
                    ON CONFLICT (key, field) DO UPDATE
                    SET value = (pulsar.queue_cache.value::int + ${granted})::text
                `;
            }

            return { granted, window: String(second) };
        });
    }

    override async acquireQueueLock(lockKey : string, ownerId : string, ttlMs : number): Promise<boolean> {
        const now = Date.now();
        const expiresAt = now + ttlMs;
 
        const rows = await this.sql`
            INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
            VALUES (${`${this.prefix}:${lockKey}`}, '', ${ownerId}, ${expiresAt})
            ON CONFLICT (key, field) DO UPDATE
            SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at
            WHERE pulsar.queue_cache.expires_at IS NULL
               OR pulsar.queue_cache.expires_at <= ${now}
               OR pulsar.queue_cache.value = EXCLUDED.value
            RETURNING 1
        `;
 
        return rows.length > 0;
    }

    override async releaseQueueLock(lockKey : string, ownerId : string): Promise<boolean> {
        const now = Date.now();

        const rows = await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE key = ${`${this.prefix}:${lockKey}`}
            AND field = ''
            AND value = ${ownerId}
            AND (expires_at IS NULL OR expires_at > ${now})
            RETURNING 1
        `;

        return rows.length === 1;
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
        const now = Date.now();

        const prefixedIdpLockKey = `${this.prefix}:${idpLockKey}`;
        const prefixedEdpLockKey = `${this.prefix}:${edpLockPrefix}`;

        const reason : DeadRunReason = await this.sql.begin(async (tx) => {
            await tx`SELECT pg_advisory_xact_lock(hashtext(${`dead_run:${queueName}`}))`;

            const readLive = async (key : string) => {
                const [row] = await tx<{ value: string }[]>`
                    SELECT value FROM pulsar.queue_cache
                    WHERE key = ${key} AND field = ''
                      AND (expires_at IS NULL OR expires_at > ${now})
                `;
                return row?.value ?? null;
            };

            if (poolerType === "interval-driven-pooler") {
                const holder = await readLive(prefixedIdpLockKey!);
                if (holder !== null && holder !== continuationOwnerId) return "IDP_LOCKED";
                return "ALLOWED";
            }

            if (poolerType === "event-driven-pooler") {
                if (totalJobs <= 0) return "NO_JOBS";

                const edpLockKey = `${prefixedEdpLockKey}${queueName}`;
                const holder = await readLive(edpLockKey);
                if (holder !== null) {
                    return holder === continuationOwnerId ? "ALLOWED" : "EDP_LOCKED";
                }

                const pending = await readLive(`${edpLockKey}:pending`);
                if (pending !== null) return "EDP_DISPATCH_PENDING";

                await tx`
                    INSERT INTO pulsar.queue_cache (key, field, value, expires_at)
                    VALUES (${`${edpLockKey}:pending`}, '', '1', ${now + dispatchTtlMs})
                    ON CONFLICT (key, field) DO UPDATE
                    SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at
                `;
                return "ALLOWED";
            }

            return "UNKNOWN_POOLER";
        });

        if (reason !== "ALLOWED") {
            console.log(`DEAD_RUN STOP REASON : ${reason}`);
        }

        return reason === "ALLOWED";
    }

    override async clearDispatchPending(lockKey : string) : Promise<void> {
        const dispatchKey = `${lockKey}:pending`;
 
        await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE key = ${dispatchKey} AND field = ''
        `;
    }

    override async getStopSignal() : Promise<boolean> {
        return await false
    }
}