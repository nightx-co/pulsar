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
        
        const { batch, worker_id } = parsedRequest.body as IBatchCandidate<T>;

        const jobs = batch.map((job) => new Job(job.msg_id, job.headers, job.message));

        await this.handleProcesses(worker_id, jobs, processor);
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

        await fetch(`${this.options.connection.url}/${action.toLowerCase()}`, {
            method: "POST",
            headers: {
                "content-type": "application/x-msgpack",
                "x-target-queue": queue,
                "x-action": action.toLowerCase(),
                ...(action === "DEREGISTER" ? { 'x-worker-id' : msgIds as any } : {}),
                ...this.options.connection.headers
            },
            body: msgpack.encode(payload),
        })
    }

    async pause() {
        console.log(`Worker for queue "${this.queueName}" paused.`);
    }

    async resume() {
        console.log(`Worker for queue "${this.queueName}" resumed.`);
    }
}