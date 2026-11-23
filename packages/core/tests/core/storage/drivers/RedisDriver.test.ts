import { Redis as RedisTCP } from "ioredis";
import { Redis as RedisHTTP } from "@upstash/redis";
import { RedisDriver } from "../../../../src/storage/drivers/RedisDriver";

describe("RedisDriver Unit Tests", () => {
    describe("TCP Protocol (Docker / Local Redis)", () => {
        let driver : RedisDriver;

        beforeAll(() => {
            driver = new RedisDriver({
                protocol: "tcp",
                connectionString: "redis://localhost:6379",
            })
        })

        afterAll(async () => {
            await driver.disconnect();
        })

        it("should connect successfully via TCP and expose the native ioredis client", async () => {
            
            await driver.connect();
            const nativeClient = driver.getNativeClient("tcp") as RedisTCP;

            expect(nativeClient).toBeDefined();
            expect(typeof nativeClient.ping).toBe("function");
            expect(typeof nativeClient.quit).toBe("function");
            expect(["connect", "ready", "reconnecting", "connecting"]).toContain(nativeClient.status);
        })

        it("should return 'up' status on healthCheck for TCP", async () => {
            
            await driver.connect();
            const health = await driver.healthCheck();

            expect(health.status).toBe("up");
            expect(typeof health.latencyMs).toBe("number");
            expect(health.latencyMs).toBeGreaterThanOrEqual(0);
        })

        it("should disconnect gracefully via TCP without errors", async () => {
            
            await driver.connect();
            await expect(driver.disconnect()).resolves.not.toThrow();
            
            const health = await driver.healthCheck();
            expect(health.status).toBe("down");
        })
    })

    describe("HTTP Protocol (Upstash REST)", () => {
        let driver : RedisDriver;

        beforeAll(() => {
            driver = new RedisDriver({
                protocol: "http",
                url: "http://127.0.0.1:8079",
                token: "example_token",
            })
        })

        it("should expose the native Upstash HTTP client", async () => {
            
            await driver.connect();
            const nativeClient = driver.getNativeClient("http") as RedisHTTP;
            
            expect(nativeClient).toBeDefined();
            expect(typeof nativeClient.ping).toBe("function");
        })

        it("should handle healthCheck gracefully for HTTP", async () => {
            
            await driver.connect();
            const health = await driver.healthCheck();
            
            expect(health).toBeDefined();
            expect(typeof health.latencyMs).toBe("number");
            
            if (health.status === "down") {
                expect(health.details?.error).toBeDefined();
            }
            else {
                expect(health.status).toBe("up");
            }
        })

        it("should execute disconnect without errors for HTTP (stateless no-op)", async () => {
            await expect(driver.disconnect()).resolves.not.toThrow();
        })
    })
})