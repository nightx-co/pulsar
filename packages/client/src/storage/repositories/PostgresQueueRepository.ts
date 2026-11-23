import postgres from "postgres";

import type { PostgresDriver } from "../drivers/PostgresDriver.ts";
import { BaseQueueRepository } from "./QueueRepository.ts";

export class PostgresQueueRepository extends BaseQueueRepository {
    constructor(private readonly driver : PostgresDriver) {
        super();
        this.driver = driver;
    }

    private get sql () : postgres.Sql {
        return this.driver.getNativeClient();
    }

    private get prefix () : string {
        if(!this.driver.prefix) {
            throw new Error('[PostgresQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).');
        }
        return this.driver.prefix;
    }

    public override async deregisterWorker(workerId : string, queue : string) {
        if (!workerId) return;
        const registryKey = `${this.prefix}:queues:${queue}:worker_registry`;
        const globalRegistryKey = `${this.prefix}:global_worker_registry`;

        const globalWorkerId = `${registryKey}:${workerId}`;

        await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE (key = ${registryKey} AND field = ${workerId})
               OR (key = ${globalRegistryKey} AND field = ${globalWorkerId})
        `;
    }

    public override async pauseQueue(queue : string, period : string) {
        
    }

    public override async resumeQueue(queue : string, period : string) {
        
    }
}