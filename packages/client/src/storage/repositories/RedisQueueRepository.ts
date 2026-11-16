import type { Redis as RedisTCP } from "ioredis";
import type { Redis as RedisHTTP } from "@upstash/redis";
import type { RedisDriver } from "../drivers/RedisDriver.ts";

import { BaseQueueRepository } from "./QueueRepository.ts";

export class RedisQueueRepository extends BaseQueueRepository {
    private protocol : "tcp" | "http";

    constructor(private readonly driver : RedisDriver) {
        super();
        this.protocol = driver.options.protocol;
        this.driver = driver;
    }

    private get redis() : RedisTCP | RedisHTTP {
        return this.driver.getNativeClient();
    }

    private get prefix () : string {
        if(!this.driver.prefix) {
            throw new Error('[RedisQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).');
        }
        return this.driver.prefix;
    }

    override async deregisterWorker(workerId : string, queue : string) {
        if (!workerId) return;
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const globalWorkerId = `${registryKey}:${workerId}`;

        const pipeline = this.redis.pipeline();
        pipeline.hdel(registryKey, workerId);
        pipeline.hdel(globalRegistryKey, globalWorkerId);
        await pipeline.exec();
    }

    public override async pauseQueue(queue: string, period: string) {
        
    }

    public override async resumeQueue(queue: string, period: string) {
        
    }

    
    private async evalScript<T>(script : string, keys : string[], args : (string | number)[]) : Promise<T> {
        if (this.protocol === "http") {
            const httpRedis = this.redis as RedisHTTP;
            return (await httpRedis.eval(script, keys, args)) as T;
        }
        const tcpRedis = this.redis as RedisTCP;
        return (await tcpRedis.eval(script, keys.length, ...keys, ...args)) as T;
    }
}