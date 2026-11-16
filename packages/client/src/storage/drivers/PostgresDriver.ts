import { LoggerService, type ILogger } from "../../utils/LoggerService.ts";
import type { IPulsarDriver, PostgresDriverOptions, StorageHealth } from "./types.ts";

import postgres from "postgres";

export class PostgresDriver implements IPulsarDriver {
    public readonly type = "database";
    public readonly name = "PostgresDriver";
    private sql!: postgres.Sql;
    private isConnected = false;

    public prefix? : string;
    private readonly logger : ILogger;

    constructor(public readonly options: PostgresDriverOptions) {
        this.logger = new LoggerService();
    }

    private initClient() {
        if(this.isConnected) return;
        this.sql = postgres(this.options.connectionString, { prepare : false });
        this.isConnected = true;
    }

    public setKeyPrefix(instanceId : string) {
        this.prefix = instanceId;
    }

    public async connect() {
        if (!this.isConnected) {
            this.initClient();

            try {
                await this.sql`SELECT 1`;
                this.logger.log(`[PostgresDriver] : Pool connected with : ${this.options.connectionProtocol ?? "TCP"}`);
            }
            catch (error) {
                this.logger.log("[PostgresDriver] : Health check failed:", error);
                throw error;
            }
        }
    }

    public async disconnect() {
        if (this.isConnected) {
            await this.sql.end();
            this.isConnected = false;
            this.logger.log("[PostgresDriver] : Pool disconnected.");
        }
    }

    public async healthCheck() : Promise<StorageHealth> {
        const start = Date.now();
        try {
            if (!this.isConnected) throw new Error("Connection pool is closed.");
            await this.sql`SELECT 1`;
            return { status: "up", latencyMs: Date.now() - start };
        }
        catch (err: any) {
            return { status: "down", latencyMs: Date.now() - start, details: { error: err.message } };
        }
    }

    public getNativeClient<T = postgres.Sql>() : T {
        if (!this.sql) throw new Error("[PostgresDriver] : Client is not initialized. Call connect() first.");
        return this.sql as T;
    }

    async close() {
        await this.disconnect();
    }
}