import { PostgresDriver } from "../../../../../src/storage/drivers/PostgresDriver.ts";
import { PostgresQueueRepository } from "../../../../../src/storage/repositories/PostgresQueueRepository.ts";

describe("RedisQueueRepository Global Job Budgets Unit Tests", () => {
    const maxGlobalJobs = 100;
    const windowIds : string[] = [];

    let postgresDriver : PostgresDriver;
    let postgresQueueRepository : PostgresQueueRepository;

    beforeAll(async () => {
        postgresDriver = new PostgresDriver({
            connectionProtocol : 'tcp',
            connectionString : 'postgresql://postgres:password@localhost:5432/postgres'
        })

        await postgresDriver.connect();
        postgresDriver.setKeyPrefix('us-east-1');

        postgresQueueRepository = new PostgresQueueRepository(postgresDriver);
    })

    afterAll(async () => {
        for(const window of windowIds) {
            await postgresQueueRepository.refundGlobalJobBudget(100, window)
        }

        await postgresDriver.disconnect();
    })

    it("should successfully claim global job budget when requested amount is within limits", async () => {
        const { granted, window } = await postgresQueueRepository.claimGlobalJobBudget(20, maxGlobalJobs);

        windowIds.push(window);
        
        expect(granted).toBe(20);
        expect(window).toBeDefined();
    })

    it("should cap the granted global job budget to the maximum allowed limit when requested amount exceeds it", async () => {
        const { granted, window } = await postgresQueueRepository.claimGlobalJobBudget(500, maxGlobalJobs);

        expect(granted).toBe(80); // becasue 20 were already consumed in the first test
        expect(window).toBeDefined();
    })

    it("should cap the granted budget and successfully handle partial budget refunds", async () => {
        const { granted, window } = await postgresQueueRepository.claimGlobalJobBudget(200, maxGlobalJobs);
        
        windowIds.push(window);

        expect(granted).toBe(0);
        expect(window).toBeDefined();

        await postgresQueueRepository.refundGlobalJobBudget(50, window);
    })
})