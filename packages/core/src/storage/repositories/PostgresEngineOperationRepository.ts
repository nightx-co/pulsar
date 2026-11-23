import postgres from "postgres";
import { PostgresDriver } from "../drivers/PostgresDriver.ts";
import { computeConfigDelta } from "../../helpers/computeConfigDelta.ts";
import { LoggerService, type ILogger } from "../../subsys/LoggerService.ts";

import { PulsarRuntime } from "../../types/runtime.types.ts";
import { EventTriggerStrategy } from "../../types/eventTriggerStrategry.types.ts";
import type { EngineQueuesConfig } from "../../types/queue.types.ts";
import type { IConfigurationObject, IConfigSyncResult } from "../../types/config.types.ts";
import type { EnginePoolingMode } from "../../types/engine.types.ts";

export interface IPulsarPostgresEngineOperationRepository {
    addRestart(queues : EngineQueuesConfig[]): Promise<void>;
    deleteRestart(queue: string): Promise<void>;
    checkFencingTokenValidity(queue : string, token : string | number) : Promise<boolean>;
    verifyAndSyncConfiguration(host : string, instanceId : string, url : string, configurations : IConfigurationObject) : Promise<IConfigSyncResult>;
    subscribeToDatabaseEvents<T extends unknown>(channel : string, onEvent : (event : T) => Promise<void>, onListen?: () => void) : Promise<void>;
    getPollingQueueEntries(queueName : string, limit : number) : Promise<Array<IPoolQueueEntry>>;
    deletePollingQueueEntry(id : number) : Promise<void>;
}

export interface IPoolQueueEntry {
    id : number;
    queue : string;
    payload : {
        queue_name : string;
        fencing_token : number;
        execution_at : string;
    };
    created_at : string;
}

export class PostgresEngineOperationRepository implements IPulsarPostgresEngineOperationRepository {
    private readonly logger : ILogger;
    
    constructor(private driver : PostgresDriver) {
        this.logger = new LoggerService();
    }

    private get sql () : postgres.Sql {
        return this.driver.getNativeClient();
    }

    async addRestart(queues : EngineQueuesConfig[]) {
        if(queues.length == 0) return;

        const hasIntervalDrivenPoolerQueues = queues.some(queue => queue.pooler == "interval-driven-pooler");

        if (hasIntervalDrivenPoolerQueues) {
            await this.sql`
                WITH clear_all AS (
                    DELETE FROM pulsar.pulsar_restart
                )
                INSERT INTO pulsar.pulsar_restart (queue_name, type, created_at)
                VALUES ('__GLOBAL__', 'interval-driven-pooler', NOW())
                ON CONFLICT (queue_name) 
                DO UPDATE SET type = EXCLUDED.type, created_at = NOW();
            `;

            this.logger.log(`[Storage] : Restart added for [interval-driven-pooler].`);
        }

        const eventDrivenPoolerQeues = queues.filter(q => q.pooler == "event-driven-pooler");

        for(const { queue } of eventDrivenPoolerQeues) {
            await this.sql`
                INSERT INTO pulsar.pulsar_restart (queue_name, type, created_at, owner)
                VALUES (${queue}, 'event-driven-pooler', NOW(), 'engine')
                ON CONFLICT (queue_name) 
                DO UPDATE SET type = EXCLUDED.type, created_at = NOW();
            `;
            
            this.logger.log(`[Storage] : Restart added for queue (${queue}) for [event-driven-pooler]`);
        }
    }

    async updateRestartOwnership(queue : string | null = null, owner : string) {
        const target = !queue ? '__GLOBAL__' : queue;

        await this.sql`
            UPDATE pulsar.pulsar_restart
            SET owner = ${owner}
            WHERE queue_name = ${target}
        `;

        this.logger.log(`[Storage] : Ownership updated for restart [${queue}]`);
    }

    async deleteRestart(queue : string | '__GLOBAL__') {
        await this.sql`
            DELETE FROM pulsar.pulsar_restart
            WHERE queue_name = ${queue} OR queue_name = '__GLOBAL__'
        `;
    }

    async pingHealthCheck() {
        await this.sql`
            INSERT INTO pulsar.health_check (id, last_health_checked_at)
            OVERRIDING SYSTEM VALUE
            VALUES (1, NOW())
            ON CONFLICT (id) 
            DO UPDATE SET last_health_checked_at = EXCLUDED.last_health_checked_at;
        `;
    }

    async checkFencingTokenValidity(queue : string, token : string | number) {
        const numericToken = typeof token === 'string' && /^\d+$/.test(token) ? Number(token) : NaN;

        if (isNaN(numericToken)) return false;

        const result = await this.sql<{ is_valid : boolean }[]>`
            UPDATE pulsar.queue_locks
            SET last_valid_token = ${numericToken}
            WHERE queue_name = ${queue}
            AND fencing_token = ${numericToken}
            AND last_valid_token <= ${numericToken}
            RETURNING true AS is_valid;
        `;
        
        const isValid = result[0]?.is_valid ?? false;
        
        return isValid;
    }

    async verifyAndSyncConfiguration (host : 'PULSAR_STANDALONE' | 'NEBULA_CLUSTER', instanceId : string, url : string, configurations : IConfigurationObject) : Promise<IConfigSyncResult> {
        const configJsonb = this.sql.json(configurations as any);

        return await this.sql.begin(async (sql) => {
            const result = await sql<any[]>`
                WITH existing AS (
                    SELECT configurations, hash FROM pulsar.meta WHERE instance_id = ${instanceId}
                ),
                updated AS (
                    INSERT INTO pulsar.meta (host, version, url, configurations, is_active, instance_id)
                    VALUES (${host}, '1.0.0', ${url}, ${configJsonb}::jsonb, true, ${instanceId})
                    ON CONFLICT (instance_id) 
                    DO UPDATE SET 
                        host = EXCLUDED.host,
                        url = EXCLUDED.url,
                        configurations = EXCLUDED.configurations,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE pulsar.meta.hash <> pulsar.generate_sha256(${configJsonb}::text)
                    RETURNING *
                )
                SELECT 
                    (SELECT configurations FROM existing) AS old_configurations,
                    EXISTS (SELECT 1 FROM updated) AS is_changed,
                    EXISTS (SELECT 1 FROM existing) AS was_existing;
            `;

            const row = result[0];
            const isNew = !row.was_existing;
            const isChanged = row.is_changed;
            const oldConfigurations = row.old_configurations as IConfigurationObject | undefined;
            
            let delta = undefined;

            if (isChanged && !isNew && oldConfigurations) {
                delta = computeConfigDelta(oldConfigurations, configurations);
            }

            if (isChanged || isNew) {
                await this.synchronizeQueueTriggers(sql, oldConfigurations, configurations, instanceId);
            }

            return {
                isChanged,
                isNew,
                oldConfigurations,
                delta
            }
        })
    }

    private async synchronizeQueueTriggers(sql : postgres.TransactionSql, oldCfg : IConfigurationObject | undefined, newCfg : IConfigurationObject, instanceId : string) {
        const EVENT_DRIVEN_POOLER : EnginePoolingMode = 'event-driven-pooler';

        const oldEdQueues = new Map((oldCfg?.queues || []).filter(q => q.pooler === EVENT_DRIVEN_POOLER).map(q => [q.queue, q.pooler]));
        const newEdQueues = new Map(newCfg.queues.filter(q => q.pooler === EVENT_DRIVEN_POOLER).map(q => [q.queue, q.pooler]));

        if(newCfg.runtime === PulsarRuntime['PERSISTENT']) {
            const triggerStrategy = newCfg.event_trigger_strategy;

            if(triggerStrategy === EventTriggerStrategy['POSTGRES_NOTIFY'] || triggerStrategy === EventTriggerStrategy['WEBHOOK']) {
                const edpQueues = newCfg.queues.filter(q => q.pooler === "event-driven-pooler");

                for (const { queue } of edpQueues) {
                    const triggerName = `pulsar_edp_trigger_${queue}_on_pgmq`;
                    const tableName = `pgmq.q_${queue}`;

                    this.logger.log(`[Configuration] : Dropping trigger ${triggerName} on ${tableName} due to runtime config changes`);

                    await sql.unsafe(`DROP TRIGGER IF EXISTS ${triggerName} ON ${tableName};`);
                }
            }
        }

        for (const [queueName] of oldEdQueues.entries()) {
            if (!newEdQueues.has(queueName)) {
                const triggerName = `pulsar_edp_trigger_${queueName}_on_pgmq`;
                const tableName = `pgmq.q_${queueName}`;
                
                await sql.unsafe(`DROP TRIGGER IF EXISTS ${triggerName} ON ${tableName};`);
            }
        }

        for (const [queueName] of newEdQueues.entries()) {
            const triggerName = `pulsar_edp_trigger_${queueName}_on_pgmq`;
            const tableName = `pgmq.q_${queueName}`;

            await sql.unsafe(`DROP TRIGGER IF EXISTS ${triggerName} ON ${tableName};`);

            await sql.unsafe(`
                CREATE TRIGGER ${triggerName}
                AFTER INSERT ON ${tableName}
                REFERENCING NEW TABLE AS new_table 
                FOR EACH STATEMENT
                EXECUTE FUNCTION pulsar.handle_edp_queue_dispatch('${queueName}', '${instanceId}');
            `);
        }
    }

    async subscribeToDatabaseEvents<T extends unknown>(channel : string, onEvent : (event : T) => Promise<void>, onListen?: () => void) {
        await this.sql.listen(channel, async (payload) => {
            try {
                const data = JSON.parse(payload);
                await onEvent(data as T);
            }
            catch (err) {
                this.logger.error("[TcpListenTransport] : Failed to parse payload:", err);
            }
        }, onListen)
    }

    async getPollingQueueEntries(queueName : string, limit : number = 10) : Promise<Array<IPoolQueueEntry>> {
        const result = await this.sql`
            DELETE FROM pulsar.pool_queue_entries
            WHERE id IN (
                SELECT id
                FROM pulsar.pool_queue_entries
                WHERE queue = ${queueName}
                ORDER BY created_at ASC
                LIMIT ${limit}
                FOR UPDATE SKIP LOCKED
            )
            RETURNING *;
        `;

        return (result as any[]).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) as IPoolQueueEntry[];
    }

    async deletePollingQueueEntry(id : number) : Promise<void> {
        await this.sql`
            DELETE FROM pulsar.pool_queue_entries
            WHERE id = ${id}
        `;
    }
}