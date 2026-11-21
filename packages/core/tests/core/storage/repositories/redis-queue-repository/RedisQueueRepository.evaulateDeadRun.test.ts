import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver.ts";
import { RedisQueueRepository } from "../../../../../src/storage/repositories/RedisQueueRepository.ts";

describe("RedisQueueRepository Evaluate Dead Run Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    const otherQueueName = 'other-concurrency-queue';
    const continuationOwnerId = 'test-continuation-owner-id';
    const otherOwnerId = 'other-owner-id-999';
    const dispatchTtlMs = 60_000;
    const lockTtlMs = 30_000;

    const prefix = 'us-east-1';
    
    const idpLockKey = `${prefix}:lock:idp`;
    const edpLockKey = `${prefix}:lock:edp:${queueName}`;
    const dispatchPendingKey = `${edpLockKey}:pending`;

    const otherEdpLockKey = `${prefix}:lock:edp:${otherQueueName}`;
    const otherDispatchPendingKey = `${otherEdpLockKey}:pending`;

    let redisDriver : RedisDriver;
    let redisQueueRepository : RedisQueueRepository;
    let rawRedis : any;

    beforeAll(async () => {
        redisDriver = new RedisDriver({
            protocol: 'tcp',
            connectionString: 'redis://localhost:6379'
        });

        await redisDriver.connect();
        redisDriver.setKeyPrefix(prefix);

        redisQueueRepository = new RedisQueueRepository(redisDriver);
        rawRedis = redisDriver.getNativeClient();
    })

    afterAll(async () => {
        await redisDriver.disconnect();
    })

    beforeEach(async () => {
        await rawRedis.del(idpLockKey, edpLockKey, dispatchPendingKey, otherEdpLockKey, otherDispatchPendingKey);
    })

    afterEach(async () => {
        await rawRedis.del(
            idpLockKey,
            edpLockKey,
            dispatchPendingKey,
            otherEdpLockKey,
            otherDispatchPendingKey,
            `${prefix}:lock:edp:${queueName}:pending`,
            `${prefix}:lock:edp:${otherQueueName}:pending`
        );
    })

    describe("Interval-Driven Pooler (interval-driven-pooler)", () => {

        it("should allow execution when IDP lock key does not exist", async () => {
            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'interval-driven-pooler',
                50,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(true);
        })

        it("should allow execution when IDP lock belongs to the current continuation owner", async () => {
            const locked = await redisQueueRepository.acquireQueueLock("lock:idp", continuationOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'interval-driven-pooler',
                50,
                continuationOwnerId,
                dispatchTtlMs
            );

            expect(allowedForDeadRun).toBe(true);
        })

        it("should block execution (IDP_LOCKED) when IDP lock belongs to another owner", async () => {
            await rawRedis.del(idpLockKey);

            const locked = await redisQueueRepository.acquireQueueLock("lock:idp", otherOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
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
            const allowedZero = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                0,
                continuationOwnerId,
                dispatchTtlMs
            )

            const allowedNegative = await redisQueueRepository.evaluateDeadRun(
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
            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
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
            const locked = await redisQueueRepository.acquireQueueLock(relativeEdpKey, continuationOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(true);
        })

        it("should block execution (EDP_LOCKED) when EDP lock belongs to another owner", async () => {
            await rawRedis.del(edpLockKey);

            const relativeEdpKey = `lock:edp:${queueName}`;
            const locked = await redisQueueRepository.acquireQueueLock(relativeEdpKey, otherOwnerId, lockTtlMs);
            expect(locked).toBe(true);

            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(false);
        })

        it("should block execution (EDP_DISPATCH_PENDING) when a dispatch is already pending", async () => {
            const firstAllowed = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                25,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(firstAllowed).toBe(true);

            const secondAllowed = await redisQueueRepository.evaluateDeadRun(
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
            const allowedForDeadRun = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'invalid-pooler' as any,
                25,
                continuationOwnerId,
                dispatchTtlMs
            )

            expect(allowedForDeadRun).toBe(false);
        })

        it("should correctly isolate event-driven dispatches between different queue names", async () => {
            const primaryAllowed = await redisQueueRepository.evaluateDeadRun(
                queueName,
                'event-driven-pooler',
                15,
                continuationOwnerId,
                dispatchTtlMs
            )
            expect(primaryAllowed).toBe(true);

            const otherAllowed = await redisQueueRepository.evaluateDeadRun(
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