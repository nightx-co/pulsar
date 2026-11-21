import { PostgresDriver } from "../../../../../src/storage/drivers/PostgresDriver";
import { PostgresQueueRepository } from "../../../../../src/storage/repositories/PostgresQueueRepository";
import { generateRandomCandidateBatches } from "../helpers/handler";

describe("PostgresQueueRepository Workers Unit Tests", () => {
    const queueName = 'test-concurrency-queue';
    let scenariosRegisteredWorkers : string[] = [];

    let postgresDriver : PostgresDriver;
    let postgresQueueRepository : PostgresQueueRepository;

    beforeAll(async () => {
        postgresDriver = new PostgresDriver({ connectionString : 'postgresql://postgres:password@localhost:5432/postgres', connectionProtocol : 'tcp' });

        await postgresDriver.connect();
        postgresDriver.setKeyPrefix('us-east-1');

        postgresQueueRepository = new PostgresQueueRepository(postgresDriver);
    })

    afterAll(async () => {
        await postgresDriver.disconnect();
    })

    it("Scenario 1: Queue concurrency is stricter than global max concurrency", async () => {
        const candidateBatches = generateRandomCandidateBatches(10);
        
        const concurrency = 5;           // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit

        const result = await postgresQueueRepository.registerWorker(
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

        await Promise.all(scenariosRegisteredWorkers.map(workerId => postgresQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })

    it("Scenario 2: Global max concurrency is stricter than queue concurrency", async () => {
        const candidateBatches = generateRandomCandidateBatches(15);
        
        const concurrency = 15;         // Queue-level limit
        const globalMaxConcurrency = 10; // Global-level limit (stricter)

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

    it("Deregistering Scenario 2 workers", async () => {
        expect(scenariosRegisteredWorkers.length).toBeGreaterThan(0);

        await Promise.all(scenariosRegisteredWorkers.map(workerId => postgresQueueRepository.deregisterWorker(workerId, queueName)));

        scenariosRegisteredWorkers = [];
    })
})