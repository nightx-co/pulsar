import type { JSONValue, Sql } from "postgres";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage.ts";
import type { QueueMessage } from "../types/queue.types.ts";

interface ITriggerURL {
    url: string;
    body?: JSONValue;
    headers?: Record<string, string>;
    delaySeconds? : number;
}

interface ISingleQueueMetrics {
    queueName: string;
    readyJobs: number;
    delayedJobs: number;
    total: number;
    nextVisibleAt: number | null;
}

export class QueueService {
    protected sql : Sql;

    constructor (storage : PulsarUnifiedStorage) {
        this.sql = storage.db.getNativeClient();
    }

    public async triggerUrl({ body={}, delaySeconds=0, headers={'Content-Type': 'application/json'}, url } : ITriggerURL) {
        await this.sql`
            select pulsar.schedule_http_request(
                ${url},
                ${delaySeconds},
                'POST',
                ${this.sql.json(body)},
                ${this.sql.json(headers)}
            ) as job_id;
        `;
        return true;
    }

    public async send<T = unknown>(queue: string, message: T, delaySeconds = 0) : Promise<bigint> {
        const messageJson = JSON.stringify(message);
        const result = await this.sql`SELECT pgmq.send( ${queue}, ${messageJson}::jsonb, ${delaySeconds} ) AS msg_id `;
        return result[0]?.msg_id as bigint;
    }

    /**
     * Read jobs using PGMQ's native FIFO strategies.
     * @param strategy 'rr' (Round Robin), 'grouped' (SQS-style), or 'head' (One per group)
     */
    public async readFifo(queue: string, vt: number, qty: number, strategy: 'rr' | 'grouped' | 'head' = 'grouped'): Promise<any[]> {
        // FUTURE IMPLEMENTATION        
        throw new Error(`FIFO NOT IMPLEMENTED`);
    }

    public async read<T = unknown>(queue: string, visibilityTimeout = 30, quantity = 1): Promise<QueueMessage<T>[]> {
        const result = await this.sql`
            SELECT *
            FROM pgmq.read(
                ${queue},
                ${visibilityTimeout},
                ${quantity}
            )
        `;
        return result as unknown as QueueMessage<T>[];
    }

    public async ack(queue: string, messageId: bigint): Promise<boolean> {
        const result = await this.sql`
            SELECT pgmq.delete(
                ${queue}::text,
                ${messageId.toString()}::bigint
            ) AS deleted
        `;
        return Boolean(result[0]?.deleted);
    }

    
    public async ackBatch(queue: string, messageIds: number[]): Promise<boolean> {
        if (!messageIds || messageIds.length === 0) {
            return true;
        }

        const ids = messageIds.map((id) => id.toString());

        const result = await this.sql`
            SELECT pgmq.delete(
            ${queue}::text,
            ${ids}::bigint[]
            ) AS deleted
        `;

        return result.length > 0;
    }

    public async retryBatch(queue: string, messageIds: number[]): Promise<number> {
        if (messageIds.length === 0) return 0;

        const ids = messageIds.map((id) => id.toString());

        const result = await this.sql`
            SELECT pgmq.set_vt(
                ${queue},
                id::bigint,
                0
            ) AS set_vt
            FROM unnest(${ids}::bigint[]) AS id
        `;

        return result.filter((row) => Boolean(row.set_vt)).length;
    }

    public async nackBatch(queue: string, messageIds: number[]): Promise<number> {
        if (messageIds.length === 0) return 0;
    
        const ids = messageIds.map((id) => id.toString());
    
        const result = await this.sql`
            SELECT pgmq.archive(
                ${queue}::text,
                ${ids}::bigint[]
            ) AS archived
        `;
    
        return result.length;
    }

    public async retry( queue: string, messageId: bigint): Promise<boolean> {
        const result = await this.sql`
            SELECT pgmq.set_vt(
                ${queue},
                ${messageId.toString()},
                0
            ) AS set_vt
        `;

        return Boolean(result[0]?.set_vt);
    }

    public async delayRetry(queue: string,messageId: bigint,seconds: number): Promise<boolean> {
        const result = await this.sql`
            SELECT pgmq.set_vt(
                ${queue},
                ${messageId.toString()},
                ${seconds}
            ) AS set_vt
        `;

        return Boolean(result[0]?.set_vt);
    }

    public async getSingleQueueMetrics(queueName : string) : Promise<ISingleQueueMetrics | null> {
        try {
            const result = await this.sql`SELECT * FROM pulsar.get_single_queue_metrics(${queueName})`;

            const rows = Array.from(result);
            if (!rows.length) return null;

            const row: any = rows[0];

            return {
                queueName: row.queue_name as string,
                readyJobs: Number(row.ready_jobs ?? 0),
                delayedJobs: Number(row.delayed_jobs ?? 0),
                total: Number(row.total_jobs ?? 0),
                nextVisibleAt: row.next_visible_at ? new Date(row.next_visible_at).getTime() : null,
            };
        }
        catch (err) {
            console.error(`Failed to fetch metrics for queue: ${queueName}`, err);
            return null;
        }
    }

    public async getAllQueueMetrics() : Promise<{ queue_name : string, ready_jobs : number, delayed_jobs : number, total : number, next_visible_at : number }[]> {
        const allQueueMetrics = await this.sql`SELECT * FROM pgmq.get_queue_metrics()`;
        
        return Array.from(allQueueMetrics).map((row : any) => ({
            queue_name: row.queue_name as string,
            ready_jobs: Number(row.ready_jobs),
            delayed_jobs: Number(row.delayed_jobs),
            total: Number(row.total_jobs),
            next_visible_at : Number(row.next_visible_at),
        }))
    }

    public async closeQueue(): Promise<void> {
        await this.sql.end();
    }
}