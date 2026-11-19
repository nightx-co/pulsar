import { LoggerService } from "../utils/LoggerService";
import type { BaseOptions, IWorkerTransport, Processor } from "../types/worker.types";
import type { Job } from "./Job";

/**
 * Abstract base class that provides shared job-processing behavior for queue workers.
 *
 * `BaseWorker` validates worker options, processes a batch of jobs with configurable
 * concurrency, attaches acknowledgment (`ack`), rejection (`nack`), and retry event
 * handlers to each job, and dispatches deferred lifecycle actions after a processing
 * cycle completes.
 *
 * Concrete worker implementations must supply an `IWorkerTransport`, which handles
 * the actual connection and queue communication.
 *
 * @template TOptions - The worker-specific options type, extending `BaseOptions`.
 */
export abstract class BaseWorker<TOptions extends BaseOptions = BaseOptions> {
    protected abstract readonly transport : IWorkerTransport;
    protected readonly logger : LoggerService;

    constructor(public readonly queueName : string, public readonly options : TOptions) {
        this.validateOptions();
        this.logger = new LoggerService();

        if(options.logger) this.logger.setProvider(options.logger);
    }

    private validateOptions() {
        this.options.concurrency = this.options.concurrency ?? 1;
        this.options.removeOnComplete = this.options.removeOnComplete ?? true;
        this.options.removeOnFail = this.options.removeOnFail ?? false;
    }

    public async handleProcesses (workerId : string, jobs : Job[], processor : Processor) {
        await this.transport.connect();

        const queue = [...jobs];
        const maxConcurrency = this.options.concurrency ?? 1;
        let iterationIndex = 0;

        const workerPool = async () => {
            while (queue.length > 0) {
                const job = queue.shift();
                if (!job) return;

                const cleanup = await this.attachEventAction(job);

                try {
                    await processor(job, iterationIndex);
                }
                catch (err) {
                    this.logger.error(`[Worker] Job ${job.id} threw an unhandled error:`, err);
                }
                finally {
                    iterationIndex++;
                    cleanup();
                }
            }
        }

        const workers = Array.from({ length: maxConcurrency }, () => workerPool());
        await Promise.all(workers);

        await this.transport.deregister(workerId);

        await this.onComplete(jobs);
    }

    private async attachEventAction(job : Job) {
        const onAck = async () => {
            this.logger.log(`[Job ${job.id}] Acknowledged`);
            await this.transport.ack(this.queueName, job.id);
        }

        const onNack = async () => {
            this.logger.log(`[Job ${job.id}] Nacked`);
            await this.transport.nack(this.queueName, job.id);
        }

        const onRetry = async () => {
            this.logger.log(`[Job ${job.id}] Retrying`);
            await this.transport.retry(this.queueName, job.id);
        }

        job.once("ack", onAck);
        job.once("nack", onNack);
        job.once("retry", onRetry);

        return () => {
            job.off("ack", onAck);
            job.off("nack", onNack);
            job.off("retry", onRetry);
        }
    }

    private async onComplete(jobs : Job[]) {
        await this.dispatchDefferedActions(jobs);

        this.logger.log(`cycle completed`);
    }
    
    private async dispatchDefferedActions(jobs : Array<Job>) {
        const batchedDefferedActions : { action : 'ack' | 'retry' | 'nack', id : number }[] = [];
        jobs.map(job => batchedDefferedActions.push(...job.defferedStates));

        this.logger.log(`acknoledging : ${jobs.length} deffered jobs`);

        const groupByActions = new Map<'ack' | 'retry' | 'nack', number[]>();

        batchedDefferedActions.forEach(current => {
            if (!groupByActions.has(current.action)) {
                groupByActions.set(current.action, []);
            }
            groupByActions.get(current.action)!.push(current.id);
        })

        for (const [action, ids] of groupByActions.entries()) {
            switch (action) {
                case "ack":
                    this.logger.log(`acknowledging ${ids.length} items.`);
                    await this.transport.ack(this.queueName, ids);
                    break;
            
                case "nack":
                    this.logger.log(`nacknowledging ${ids.length} items.`);
                    await this.transport.nack(this.queueName, ids);
                    break;

                case "retry":
                    this.logger.log(`retrying ${ids.length} items.`);
                    await this.transport.retry(this.queueName, ids);
                    break;
            }
        }
    }
}