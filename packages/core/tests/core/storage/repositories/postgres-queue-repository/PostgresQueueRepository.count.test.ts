import { PostgresDriver } from "../../../../../src/storage/drivers/PostgresDriver.ts";
import { generateRandomCandidateBatches } from "../helpers/handler.ts";
import { PostgresQueueRepository } from "../../../../../src/storage/repositories/PostgresQueueRepository.ts";

describe("PostgresQueueRepository Workers Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    let scenariosRegisteredWorkers : string[] = [];

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
            await postgresDriver.disconnect();
        }
    })

    it("should register 10 workers successfully", async () => {
        const candidateBatches = generateRandomCandidateBatches(10);
        
        const concurrency = 10;           // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit

        const result = await postgresQueueRepository.registerWorker(
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
        const count = await postgresQueueRepository.getActiveWorkersCount(queueName);
        console.log(`Queue active worker count: ${count}`);
        expect(count).toBe(10);
    })

    it("should verify that the global registry has 10 active workers", async () => {
        const count = await postgresQueueRepository.getGlobalActiveWorkersCount();
        expect(count).toBe(10);
    })

    it("should deregister all test workers", async () => {
        expect(scenariosRegisteredWorkers.length).toBeGreaterThan(0);

        await Promise.all(scenariosRegisteredWorkers.map(workerId => postgresQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })

    it("should verify that the queue has 0 active workers after cleanup", async () => {
        const count = await postgresQueueRepository.getActiveWorkersCount(queueName);
        console.log(`Queue active worker count after cleanup: ${count}`);
        expect(count).toBe(0);
    })

    it("should verify that the global registry has 0 active workers after cleanup", async () => {
        const count = await postgresQueueRepository.getGlobalActiveWorkersCount();
        expect(count).toBe(0);
    })
})