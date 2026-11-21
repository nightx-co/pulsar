import { PostgresDriver } from "../../../../../src/storage/drivers/PostgresDriver.ts";
import { PostgresQueueRepository } from "../../../../../src/storage/repositories/PostgresQueueRepository.ts";

describe("RedisQueueRepository Locks Unit Tests", () => {
    const lockKey = 'test-lock-key';
    const ownerId = 'jettest';
    const fakeOwnerId = 'fake_jettest';

    let postgresDriver : PostgresDriver;
    let postgresQueueRepository : PostgresQueueRepository;

    beforeAll(async () => {
        postgresDriver = new PostgresDriver({
            connectionProtocol : 'tcp',
            connectionString : 'postgresql://postgres:password@localhost:5432/postgres'
        });

        await postgresDriver.connect();
        postgresDriver.setKeyPrefix('us-east-1');

        postgresQueueRepository = new PostgresQueueRepository(postgresDriver);
    })

    afterAll(async () => {
        if (postgresDriver) {
            await postgresQueueRepository.releaseQueueLock(lockKey, fakeOwnerId);
            await postgresDriver.disconnect();
        }
    })

    it("should acquire a lock thus returning true", async () => {
        const isAcquired = await postgresQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        expect(isAcquired).toBe(true);
    })

    it("should try to acquire the lock but with a different owner", async () => {
        const isAcquired = await postgresQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquired).toBe(false);
    })

    it("should try to acquire the lock but with the original owner again", async () => {
        const isAcquired = await postgresQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        expect(isAcquired).toBe(true);
    })

    it("should release the lock using releaseQueueLock that takes only lock key as its arg", async () => {
        await postgresQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        
        const isReleased = await postgresQueueRepository.releaseQueueLock(lockKey, ownerId);
        expect(isReleased).toBe(true);

        const isAcquiredByFake = await postgresQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquiredByFake).toBe(true);
    })

    it("should expire the lock after the TTL", async () => {
        const shortTtl = 1_000;
        await postgresQueueRepository.acquireQueueLock(lockKey, ownerId, shortTtl);

        await new Promise((resolve) => setTimeout(resolve, shortTtl + 200));

        const isAcquiredAfterExpiry = await postgresQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquiredAfterExpiry).toBe(true);
    })
})