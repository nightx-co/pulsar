import { RedisDriver } from "../../../../../src/storage/drivers/RedisDriver.ts";

describe("RedisQueueRepository Connections Unit Tests", () => {
    let tcpRedis : RedisDriver;
    let httpRedis : RedisDriver;

    it("should successfully connect via TCP protocol and return a healthy status", async () => {
        tcpRedis = new RedisDriver({
            protocol : 'tcp',
            connectionString : 'redis://localhost:6379'
        })

        await tcpRedis.connect();
        tcpRedis.setKeyPrefix('us-east-1');

        const { latencyMs, status } = await tcpRedis.healthCheck();
        
        expect(status).toBe("up");
        expect(latencyMs).toBeGreaterThan(0);
    })

    it("should successfully disconnect the TCP client without throwing any errors", async () => {
        await tcpRedis.disconnect();

        const { status } = await tcpRedis.healthCheck();
        
        expect(status).toBe('down');
    })

    it("should successfully connect via HTTP protocol with a token and return a healthy status", async () => {
        httpRedis = new RedisDriver({
            protocol : 'http',
            token : 'example_token',
            url : 'http://localhost:8079'
        });

        await httpRedis.connect();
        httpRedis.setKeyPrefix('us-east-1');

        const { latencyMs, status } = await httpRedis.healthCheck();

        expect(status).toBe("up");
        expect(latencyMs).toBeGreaterThan(0);
    })
})