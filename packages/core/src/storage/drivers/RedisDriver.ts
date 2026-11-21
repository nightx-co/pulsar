import { Redis as RedisTCP } from "ioredis";
import { Redis as RedisHTTP } from "@upstash/redis";

import type { IPulsarDriver, RedisDriverOptions, StorageHealth } from "./types.ts";
import type { ILogger } from "../../integrations/index.ts";
import { LoggerService } from "../../subsys/LoggerService.ts";

export class RedisDriver implements IPulsarDriver {
    public readonly type = "cache";
    public readonly name = "RedisDriver";

    private tcpClient?: RedisTCP;
    private httpClient?: RedisHTTP;

    public prefix? : string;
    private readonly logger : ILogger;

    constructor(public readonly options : RedisDriverOptions) {
        this.logger = new LoggerService();
    }

    private initClients() {
        if (this.options.protocol === "http") {
            this.httpClient = new RedisHTTP({
                url: this.options.url!,
                token: this.options.token!,
            })
        }
        else {
            this.tcpClient = new RedisTCP(this.options.connectionString!, {
                lazyConnect: true,
                maxRetriesPerRequest: 3,
            })
        }
    }

    public setKeyPrefix(instanceId : string) {
        this.prefix = instanceId;
    }

    public async connect() {
        if (this.options.protocol == "tcp") {
            if (!this.tcpClient) {
                this.initClients();
            }
            
            if(!this.tcpClient) throw new Error('TCP Client could not found');

            const status = this.tcpClient.status;

            if (status === "end" || status === "close") {
                this.initClients();
            }

            if (this.tcpClient.status === "wait") {
                await this.tcpClient.connect();
                this.logger.log(`[RedisDriver] : TCP Connected to ${this.options.connectionString}`);
            }
        }
        else if(this.options.protocol == "http") {
            if (!this.httpClient) {
                this.initClients();
            }

            const status = await this.httpClient!.ping();
            if(status.toLowerCase() === "pong") {
                this.logger.log(`[RedisDriver] : HTTP REST client initialized.`);
            }
            else {
                this.logger.warn(`[RedisDriver] : HTTP REST client initialized, but ping failed with unexpected response:`, status);
            }
        }
    }

    public async disconnect() {
        if (this.options.protocol == "tcp" && this.tcpClient) {
            const status = this.tcpClient.status;
            if (status !== "end" && status !== "close") {
                try {
                    await this.tcpClient.quit();
                    this.logger.log("[RedisDriver] : TCP Disconnected.");
                }
                catch (_err) {
                    this.tcpClient.disconnect();
                }
            }
        }
    }

    public async healthCheck() : Promise<StorageHealth> {
        const start = Date.now();
        try {
            if (this.options.protocol === "tcp") {
                await this.tcpClient!.ping();
            }
            else {
                await this.httpClient!.ping();
            }
            return { status: "up", latencyMs: Date.now() - start };
        }
        catch (err : any) {
            return { status: "down", latencyMs: Date.now() - start, details: { error: err.message } };
        }
    }

    public getNativeClient<T = RedisTCP | RedisHTTP>(protocol?: "tcp" | "http") {
        const targetProtocol = protocol ?? this.options.protocol;

        if (targetProtocol === "tcp") {
            if (!this.tcpClient) throw new Error("[RedisDriver] : TCP client is not initialized.");
            return this.tcpClient as T;
        }

        if (!this.httpClient) throw new Error("[RedisDriver] : REST client is not initialized.");
        return this.httpClient as T;
    }
}