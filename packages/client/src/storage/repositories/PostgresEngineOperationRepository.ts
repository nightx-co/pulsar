import postgres from "postgres";
import { PostgresDriver } from "../drivers/PostgresDriver.ts";
import { LoggerService, type ILogger } from "../../utils/LoggerService.ts";

export interface IPulsarPostgresEngineOperationRepository {
    ack(queue : string, jobIds : number | Array<number>) : Promise<boolean>;
    nack (queue : string, jobIds : number | Array<number>) : Promise<boolean>;
    retry (queue : string, jobIds : number | Array<number>) : Promise<boolean>;
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

    public async ack(queue : string, jobIds : number | number[]) {
        if(Array.isArray(jobIds)) {
            const ids = jobIds.map((id) => id.toString());

            const result = await this.sql`
                SELECT pgmq.delete(
                ${queue}::text,
                ${ids}::bigint[]
                ) AS deleted
            `;

            return result.length > 0;
        }
        else {  
            const result = await this.sql`
                SELECT pgmq.delete(
                    ${queue}::text,
                    ${jobIds.toString()}::bigint
                ) AS deleted
            `;

            return Boolean(result[0]?.deleted);
        }
    }

    public async nack(queue : string, jobId : number | Array<number>) {
        const ids = Array.isArray(jobId) ? jobId : [jobId];
        if (ids.length === 0) return false;

        const result = await this.sql`
            SELECT pgmq.archive(
                ${queue}::text,
                ${ids.map((id) => id.toString())}::bigint[]
            ) AS archived
        `;

        return result.length > 0;
    }

    public async retry(queue : string, jobIds : number | number[]) {
        if(Array.isArray(jobIds)) {
            const ids = jobIds.map((id) => id.toString());

            const result = await this.sql`
                SELECT pgmq.set_vt(
                    ${queue},
                    id::bigint,
                    0
                ) AS set_vt
                FROM unnest(${ids}::bigint[]) AS id
            `;

            return result.filter((row) => Boolean(row.set_vt)).length > 0;
        }
        else {
            const result = await this.sql`
                SELECT pgmq.set_vt(
                    ${queue},
                    ${jobIds.toString()},
                    0
                ) AS set_vt
            `;

            return Boolean(result[0]?.set_vt);
        }
    }
}