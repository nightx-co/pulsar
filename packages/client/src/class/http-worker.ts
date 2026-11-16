import { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import { BaseWorker } from "./base-worker";
import { parseAnyPayload } from "../helpers/parseAnyPayload";
import { Job } from "./Job";

import type { IWorkerTransport, HttpWorkerOptions, Processor, IBatchCandidate } from "../types/worker.types";

export class HttpWorker<T = any> extends BaseWorker<HttpWorkerOptions> {
    
    protected override transport : IWorkerTransport = this;
    private readonly storage : PulsarUnifiedStorage;
    private instanceIdAsiggned : boolean = false;

    constructor(queueName : string, options : HttpWorkerOptions) {
        super(queueName, options);
        this.storage = new PulsarUnifiedStorage(options.storage);
    }

    public async handle (req : Request, processor : Processor<T>) {
        const parsedRequest = await parseAnyPayload(req);

        const url = new URL(parsedRequest.url);

        if(url.pathname.endsWith('/dispatch')) {
            const { batch, worker_id } = parsedRequest.body as IBatchCandidate;
            const headers = parsedRequest.headers;
            
            const instanceId = headers['x-instance-id'] as string;
            const apiKey = headers['x-api-key'] as string;

            if (!instanceId) {
                this.logger.warn('Bad Request: Instance ID is required.');
                return { status: 400, message: 'Bad Request: Instance ID is required.' }
            }

            if (!apiKey) {
                this.logger.warn('Bad Request: API key is required.');
                return { status: 400, message: 'Bad Request: API key is required.' };
            }

            if (apiKey !== this.options.apiKey) return { status: 401, message: 'Unauthorized: Invalid API key provided.' };

            if (!worker_id) {
                this.logger.warn('Bad Request: Worker ID is required.');
                return { status: 400, message: 'Bad Request: Worker ID is required.' };
            }
            
            if (!batch || batch.length === 0) {
                this.logger.warn('Bad Request: Batch must contain at least one item.');
                return { status: 400, message: 'Bad Request: Batch must contain at least one item.' };
            }

            if(!this.instanceIdAsiggned) {
                this.storage.bindInstanceId(instanceId);
                this.instanceIdAsiggned = true;
            }

            const jobs = batch.map((job) => new Job(job.msg_id, job));

            return this.handleProcesses(worker_id, jobs, processor);
        }
    }

    public async connect() {
        await this.storage.connect();
    }
    
    public async ack(q : string, ids : number | Array<number>) {
        await this.storage.ops.ack(q, ids);
    }
    
    public async nack(q : string, ids : number | Array<number>) {
        await this.storage.ops.nack(q, ids);
    }

    public async retry(q : string, ids : number | Array<number>) {
        await this.storage.ops.retry(q, ids);
    }

    public async deregister(workerId : string) {
        await this.storage.repository.deregisterWorker(workerId, this.queueName);
    }
}