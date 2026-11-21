import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver";
import { RedisQueueRepository } from "../../../../../src/storage/repositories/RedisQueueRepository";

describe("RedisQueueRepository Locks Unit Tests", () => {
    const lockKey = 'test-lock-key';
    const ownerId = 'jettest';
    const fakeOwnerId = 'fake_jettest';

    let redisDriver : RedisDriver;
    let redisQueueRepository : RedisQueueRepository;

    beforeAll(async () => {
        redisDriver = new RedisDriver({
            protocol : 'tcp',
            connectionString : 'redis://localhost:6379'
        });

        await redisDriver.connect();
        redisDriver.setKeyPrefix('us-east-1');

        redisQueueRepository = new RedisQueueRepository(redisDriver);
    })

    afterAll(async () => {
        if (redisDriver) {
            await redisQueueRepository.releaseQueueLock(lockKey, fakeOwnerId);
            await redisDriver.disconnect();
        }
    })

    it("should acquire a lock thus returning true", async () => {
        const isAcquired = await redisQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        expect(isAcquired).toBe(true);
    })

    it("should try to acquire the lock but with a different owner", async () => {
        const isAcquired = await redisQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquired).toBe(false);
    })

    it("should try to acquire the lock but with the original owner again", async () => {
        const isAcquired = await redisQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        expect(isAcquired).toBe(true);
    })

    it("should release the lock using releaseQueueLock that takes only lock key as its arg", async () => {
        await redisQueueRepository.acquireQueueLock(lockKey, ownerId, 60_000);
        
        const isReleased = await redisQueueRepository.releaseQueueLock(lockKey, ownerId);
        expect(isReleased).toBe(true);

        const isAcquiredByFake = await redisQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquiredByFake).toBe(true);
    })

    it("should expire the lock after the TTL", async () => {
        const shortTtl = 1_000;
        await redisQueueRepository.acquireQueueLock(lockKey, ownerId, shortTtl);

        await new Promise((resolve) => setTimeout(resolve, shortTtl + 200));

        const isAcquiredAfterExpiry = await redisQueueRepository.acquireQueueLock(lockKey, fakeOwnerId, 60_000);
        expect(isAcquiredAfterExpiry).toBe(true);
    })
})