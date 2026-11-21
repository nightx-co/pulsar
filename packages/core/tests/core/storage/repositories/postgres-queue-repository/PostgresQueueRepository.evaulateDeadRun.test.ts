import postgres from "postgres";
import { PostgresDriver } from "../../../../../src/storage/drivers/PostgresDriver.ts";
import { PostgresQueueRepository } from "../../../../../src/storage/repositories/PostgresQueueRepository.ts";

describe("PostgresQueueRepository Evaluate Dead Run Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    const otherQueueName = 'other-concurrency-queue';
    const continuationOwnerId = 'test-continuation-owner-id';
    const otherOwnerId = 'other-owner-id-999';
    const dispatchTtlMs = 60_000;
    const lockTtlMs = 30_000;

    const prefix = 'us-east-1';
    
    const edpLockKey = `${prefix}:lock:edp:${queueName}`;
    const dispatchPendingKey = `${edpLockKey}:pending`;

    let postgresDriver : PostgresDriver;
    let postgresQueueRepository : PostgresQueueRepository;
    let rawSql : postgres.Sql;

    beforeAll(async () => {
        postgresDriver = new PostgresDriver({
            connectionProtocol : 'tcp',
            connectionString : 'postgresql://postgres:password@localhost:5432/postgres'
        });

        await postgresDriver.connect();
        postgresDriver.setKeyPrefix(prefix);

        postgresQueueRepository = new PostgresQueueRepository(postgresDriver);
        rawSql = postgresDriver.getNativeClient();
    })

    afterAll(async () => {
        await rawSql`
            DELETE FROM pulsar.queue_cache 
            WHERE key IN (
                ${`${prefix}:lock:idp`},
                ${`${prefix}:lock:edp:${queueName}`},
                ${`${prefix}:lock:edp:${queueName}:pending`},
                ${`${prefix}:lock:edp:${otherQueueName}`},
                ${`${prefix}:lock:edp:${otherQueueName}:pending`}
            )
        `;
        await postgresDriver.disconnect();
    })

    describe("Interval-Driven Pooler (interval-driven-pooler)", () => {
        it("should allow execution when IDP lock key does not exist", async () => {
            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'interval-driven-pooler',
                50,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(true);
        })

        it("should allow execution when IDP lock belongs to the current continuation owner", async () => {
            const locked = await postgresQueueRepository.acquireQueueLock("lock:idp", continuationOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'interval-driven-pooler',
                50,
                continuationOwnerId,
                dispatchTtlMs
            );

            expect(allowedForDeadRun).toBe(true);
        })

        it("should block execution (IDP_LOCKED) when IDP lock belongs to another owner", async () => {
            await rawSql`DELETE FROM pulsar.queue_cache WHERE key = ${`${prefix}:lock:idp`}`;

            const locked = await postgresQueueRepository.acquireQueueLock("lock:idp", otherOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'interval-driven-pooler',
                50,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(false);
        })
    })

    describe("Event-Driven Pooler (event-driven-pooler)", () => {

        it("should return NO_JOBS and block when totalJobs is zero or negative", async () => {
            const allowedZero = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                0,
                continuationOwnerId,
                dispatchTtlMs
            )

            const allowedNegative = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                -10,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedZero).toBe(false);
            expect(allowedNegative).toBe(false);
        })

        it("should allow execution and reserve dispatch slot when no locks or pending states exist", async () => {
            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(true);
        });

        it("should allow execution when EDP lock already belongs to the current continuation owner", async () => {
            const relativeEdpKey = `lock:edp:${queueName}`;
            const locked = await postgresQueueRepository.acquireQueueLock(relativeEdpKey, continuationOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(true);
        })

        it("should block execution (EDP_LOCKED) when EDP lock belongs to another owner", async () => {
            const relativeEdpKey = `lock:edp:${queueName}`;

            await rawSql`DELETE FROM pulsar.queue_cache WHERE key = ${`${prefix}:${relativeEdpKey}`}`;

            const locked = await postgresQueueRepository.acquireQueueLock(relativeEdpKey, otherOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(false);
        })

        it("should block execution (EDP_DISPATCH_PENDING) when a dispatch is already pending", async () => {
            await rawSql`
                DELETE FROM pulsar.queue_cache 
                WHERE key IN (${edpLockKey}, ${dispatchPendingKey})
            `;

            const firstAllowed = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(firstAllowed).toBe(true);

            const secondAllowed = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(secondAllowed).toBe(false);
        })
    })

    describe("Edge Cases and Multi-Queue Isolation", () => {
        it("should return false for unknown/unsupported pooler types", async () => {
            const allowedForDeadRun = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'invalid-pooler' as any,
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(false);
        })

        it("should correctly isolate event-driven dispatches between different queue names", async () => {
            await rawSql`
                DELETE FROM pulsar.queue_cache 
                WHERE key IN (${edpLockKey}, ${dispatchPendingKey})
            `;

            const primaryAllowed = await postgresQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                15,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(primaryAllowed).toBe(true);

            const otherAllowed = await postgresQueueRepository.evaluateDeadRun(
                otherQueueName,
                'event-driven-pooler',
                15,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(otherAllowed).toBe(true);
        })
    })
})