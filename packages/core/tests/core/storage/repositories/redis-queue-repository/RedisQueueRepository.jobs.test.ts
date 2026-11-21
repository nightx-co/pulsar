import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver.ts";
import { RedisQueueRepository } from "../../../../../src/storage/repositories/RedisQueueRepository.ts";

describe("RedisQueueRepository Global Job Budgets Unit Tests", () => {
    const maxGlobalJobs = 100;
    const windowIds: string[] = [];

    let redisDriver : RedisDriver;
    let redisQueueRepository : RedisQueueRepository;

    beforeAll(async () => {
        redisDriver = new RedisDriver({
            protocol : 'tcp',
            connectionString : 'redis://localhost:6379'
        })

        await redisDriver.connect();
        redisDriver.setKeyPrefix('us-east-1');

        redisQueueRepository = new RedisQueueRepository(redisDriver);
    })

    afterAll(async () => {
        for(const window of windowIds) {
            await redisQueueRepository.refundGlobalJobBudget(100, window)
        }
    })

    it("should successfully claim global job budget when requested amount is within limits", async () => {
        const { granted, window } = await redisQueueRepository.claimGlobalJobBudget(20, maxGlobalJobs);

        windowIds.push(window);
        
        expect(granted).toBe(20);
        expect(window).toBeDefined();
    })

    it("should cap the granted global job budget to the maximum allowed limit when requested amount exceeds it", async () => {
        const { granted, window } = await redisQueueRepository.claimGlobalJobBudget(500, maxGlobalJobs);

        expect(granted).toBe(80); // becasue 20 were already consumed in the first test
        expect(window).toBeDefined();
    })

    it("should cap the granted budget and successfully handle partial budget refunds", async () => {
        const { granted, window } = await redisQueueRepository.claimGlobalJobBudget(200, maxGlobalJobs);
        
        windowIds.push(window);

        expect(granted).toBe(0);
        expect(window).toBeDefined();

        await redisQueueRepository.refundGlobalJobBudget(50, window);
    })
})