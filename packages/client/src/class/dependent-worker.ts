import msgpack from '@msgpack/msgpack';
import { Job } from "./Job";
import { BaseWorker } from "./base-worker";
import { parseAnyPayload } from "../helpers/parseAnyPayload";

import type { DependentWorkerOptions, IBatchCandidate, IWorkerTransport, Processor } from "../types/worker.types";

/**
 * A worker implementation for processing dependent/batch jobs through a remote
 * queue proxy.
 *
 * `DependentWorker` receives a batch of jobs, converts each raw job payload into
 * a `Job` instance, and delegates them to the configured processor. It also
 * provides lifecycle controls for acknowledging, rejecting, retrying, and
 * deregistering jobs or workers by sending MessagePack-encoded proxy requests.
 *
 * @template T - The expected payload type for each processed job.
 */
export class DependentWorker<T = any> extends BaseWorker<DependentWorkerOptions> {
    protected override transport : IWorkerTransport = this;

    constructor(queueName : string, options : DependentWorkerOptions) {
        super(queueName, options);
    }

    public async handle (req : any, processor : Processor<T>) {
        const parsedRequest = await parseAnyPayload(req);
        const { headers, method } = parsedRequest;

        const url = new URL(parsedRequest.url);

        if(url.pathname.endsWith('/dispatch')) {
            const apiKey = headers['x-api-key'] as string;

            if (!apiKey) {
                this.logger.warn('Bad Request: API key is required.');
                return { status: 400, message: 'Bad Request: API key is required.' };
            }

            if (apiKey !== this.options.apiKey) return { status: 401, message: 'Unauthorized: Invalid API key provided.' };
            
            const { batch, worker_id } = parsedRequest.body as IBatchCandidate<T>;

            if (!worker_id || !Array.isArray(batch) || batch.length === 0) {
                this.logger.warn('Bad Request : Worker ID and a non-empty batch are required.');
                return { status : 400, message : 'Bad Request : Worker ID and a non-empty batch are required.' };
            }

            const jobs = batch.map((job) => new Job(job.msg_id, job.headers, job.message));

            await this.handleProcesses(worker_id, jobs, processor);
        }
    }
    
    public async connect() {}
    
    public async ack(q : string, ids : number | Array<number>) {
        await this.sendProxyRequest("ACK", q, ids);
    }
    
    public async nack(q : string, ids : number | Array<number>) {
        await this.sendProxyRequest("NACK", q, ids);
    }

    public async retry(q : string, ids : number | Array<number>) {
        await this.sendProxyRequest("RETRY", q, ids);
    }

    public async deregister(workerId : string) {
        await this.sendProxyRequest("DEREGISTER", this.queueName, workerId);
    }

    private async sendProxyRequest(action : string, queue : string, msgIds : number | Array<number> | string) {
        const payload = { msg_ids: Array.isArray(msgIds) ? msgIds : [msgIds] }

        const response = await fetch(`${this.options.connection.url}/${action.toLowerCase()}`, {
            method: "POST",
            headers: {
                "content-type": "application/x-msgpack",
                "x-target-queue": queue,
                "x-api-key": this.options.apiKey,
                "x-action": action.toLowerCase(),
                ...(action === "DEREGISTER" ? { 'x-worker-id' : msgIds as any } : {}),
                ...this.options.connection.headers
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const detail = await response.text().catch(() => "");
            this.logger.error(`[DependentWorker] ${action} for queue "${queue}" failed with ${response.status} ${response.statusText}${detail ? `: ${detail}` : ""}`);
            throw new Error(`[DependentWorker] ${action} for queue "${queue}" failed with ${response.status} ${response.statusText}${detail ? `: ${detail}` : ""}`);
        }
    }

    async pause() {
        console.log(`Worker for queue "${this.queueName}" paused.`);
    }

    async resume() {
        console.log(`Worker for queue "${this.queueName}" resumed.`);
    }
}