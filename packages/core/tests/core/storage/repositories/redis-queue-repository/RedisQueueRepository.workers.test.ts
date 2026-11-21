import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver";
import { RedisQueueRepository } from "../../../../../src/storage/repositories/RedisQueueRepository";
import { generateRandomCandidateBatches } from "../helpers/handler";

describe("RedisQueueRepository Workers Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    let scenariosRegisteredWorkers : string[] = [];

    let redisQueueRepository : RedisQueueRepository;

    beforeAll(async () => {
        const redisDriver = new RedisDriver({ protocol : 'tcp', connectionString : 'redis://localhost:6379' });

        await redisDriver.connect();
        redisDriver.setKeyPrefix('us-east-1');

        redisQueueRepository = new RedisQueueRepository(redisDriver);
    })

    it("Scenario 1: Queue concurrency is stricter than global max concurrency", async () => {
        const candidateBatches = generateRandomCandidateBatches(10);
        
        const concurrency = 5;           // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit

        const result = await redisQueueRepository.registerWorker(
            queueName,
            candidateBatches,
            concurrency,
            globalMaxConcurrency
        )

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(5);
        
        const expectedIds = candidateBatches.slice(0, 5).map(c => c.workerId);
        expect(result).toEqual(expectedIds);

        scenariosRegisteredWorkers = result;
    })

    it("Deregistering Scenario 1 workers", async () => {
        expect(scenariosRegisteredWorkers.length).toBeGreaterThan(0);

        await Promise.all(scenariosRegisteredWorkers.map(workerId => redisQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })

    it("Scenario 2: Global max concurrency is stricter than queue concurrency", async () => {
        const candidateBatches = generateRandomCandidateBatches(15);
        
        const concurrency = 15;         // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit (stricter)

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

    it("Deregistering Scenario 2 workers", async () => {
        expect(scenariosRegisteredWorkers.length).toBeGreaterThan(0);

        await Promise.all(scenariosRegisteredWorkers.map(workerId => redisQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })
})