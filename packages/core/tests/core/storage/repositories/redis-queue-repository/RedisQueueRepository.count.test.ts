import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver";
import { RedisQueueRepository } from "../../../../../src/storage/repositories/RedisQueueRepository";
import { generateRandomCandidateBatches } from "../helpers/handler";

describe("RedisQueueRepository Workers Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    let scenariosRegisteredWorkers : string[] = [];

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
            await redisDriver.disconnect();
        }
    })

    it("should register 10 workers successfully", async () => {
        const candidateBatches = generateRandomCandidateBatches(10);
        
        const concurrency = 10;           // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit

        const result = await redisQueueRepository.registerWorker(
            queueName,
            candidateBatches,
            concurrency,
            globalMaxConcurrency
        )

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(10);
        
        const expectedIds = candidateBatches.slice(0, 10).map(c => c.workerId);
        expect(result).toEqual(expectedIds);

        scenariosRegisteredWorkers = result;
    })

    it("should verify that the queue has 10 active workers", async () => {
        const count = await redisQueueRepository.getActiveWorkersCount(queueName);
        console.log(`Queue active worker count: ${count}`);
        expect(count).toBe(10);
    })

    it("should verify that the global registry has 10 active workers", async () => {
        const count = await redisQueueRepository.getGlobalActiveWorkersCount();
        expect(count).toBe(10);
    })

    it("should deregister all test workers", async () => {
        expect(scenariosRegisteredWorkers.length).toBeGreaterThan(0);

        await Promise.all(scenariosRegisteredWorkers.map(workerId => redisQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })

    it("should verify that the queue has 0 active workers after cleanup", async () => {
        const count = await redisQueueRepository.getActiveWorkersCount(queueName);
        console.log(`Queue active worker count after cleanup: ${count}`);
        expect(count).toBe(0);
    })

    it("should verify that the global registry has 0 active workers after cleanup", async () => {
        const count = await redisQueueRepository.getGlobalActiveWorkersCount();
        expect(count).toBe(0);
    })
})