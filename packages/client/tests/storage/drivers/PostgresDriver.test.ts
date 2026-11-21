import * as postgres from "postgres";
import { PostgresDriver } from "../../../src/storage/drivers/PostgresDriver.js";

describe("PostgresDriver Unit Tests", () => {
    describe("Postgres Database (Docker)", () => {
        let driver : PostgresDriver;

        beforeAll(() => {
            driver = new PostgresDriver({
                connectionString : 'postgresql://postgres:password@localhost:5432/postgres',
                connectionProtocol : "tcp"
            })
        })

        afterAll(async () => {
            await driver.disconnect();
        })

        it("should connect successfully and expose the native postgres client", async () => {
            await driver.connect();
            const nativeClient = driver.getNativeClient() as postgres.Sql;

            expect(nativeClient).toBeDefined();
            expect(typeof nativeClient).toBe("function");
        })

        it("should return 'up' status on healthCheck", async () => {
            await driver.connect();
            const health = await driver.healthCheck();

            expect(health.status).toBe("up");
            expect(typeof health.latencyMs).toBe("number");
            expect(health.latencyMs).toBeGreaterThanOrEqual(0);
        })

        it("should disconnect gracefully without errors", async () => {
            
            await driver.connect();
            await expect(driver.disconnect()).resolves.not.toThrow();
            
            const health = await driver.healthCheck();
            expect(health.status).toBe("down");
        })
    })
})