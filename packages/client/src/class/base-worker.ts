import { LoggerService } from "../utils/LoggerService";
import type { BaseOptions, ConsumerJob, IWorkerTransport, Processor } from "../types/worker.types";
import type { Job } from "./Job";

type DeferredAction = 'ack' | 'retry' | 'nack';

const ACTION_LABELS : Record<DeferredAction, string> = {
    ack : 'acknowledged',
    nack : 'rejected (nack)',
    retry : 'sent back to the queue for retry',
}

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

        const { concurrency } = this.options;
        if (!Number.isInteger(concurrency) || concurrency < 1) {
            throw new RangeError(`Worker option "concurrency" must be a positive integer (received ${concurrency}).`);
        }
    }

    private get tag() : string {
        return `[Worker:${this.queueName}]`;
    }

    public async handleProcesses (workerId : string, jobs : Job[], processor : Processor) {
        await this.transport.connect();

        const queue = [...jobs];
        const concurrency = Math.min(this.options.concurrency ?? 1, Math.max(jobs.length, 1));
        let nextIndex = 0;
        let failedCount = 0;

        this.logger.log(
            jobs.length === 0
                ? `${this.tag} Worker ${workerId} received no jobs. Nothing to process.`
                : `${this.tag} Worker ${workerId} picked up ${jobs.length} job(s) (concurrency: ${concurrency}).`
        )

        const workerPool = async () => {
            while (queue.length > 0) {
                const job = queue.shift();
                if (!job) return;

                const index = nextIndex++;
                const { cleanup, settled } = this.attachEventActions(job);
                const consumerJob = this.createConsumerJob(job);

                try {
                    await processor(consumerJob, index);
                }
                catch (err) {
                    failedCount++;
                    this.logger.error(
                        `${this.tag} Job ${job.id} failed with an unhandled error. ` +
                        `It was not acknowledged and will become available again once its visibility timeout expires.`,
                        err
                    )
                }
                finally {
                    cleanup();
                    await settled();
                }
            }
        }

        try {
            await Promise.all(Array.from({ length : concurrency }, () => workerPool()));
        }
        finally {
            try {
                await this.transport.deregister(workerId);
            }
            catch (err) {
                this.logger.error(`${this.tag} Failed to deregister worker ${workerId}:`, err);
            }

            await this.dispatchDeferredActions(jobs);

            this.logger.log(`${this.tag} Worker ${workerId} finished its batch: ` + `${jobs.length - failedCount} succeeded, ${failedCount} failed.`);
        }
    }

    private createConsumerJob<T>(job : Job<T>) : ConsumerJob<T> {
        return Object.freeze({
            id : job.id,
            data : job.data,
            headers : job.headers,
            ack : (...args : Parameters<Job<T>['ack']>) => job.ack(...args),
            nack : (...args : Parameters<Job<T>['nack']>) => job.nack(...args),
            retry : (...args : Parameters<Job<T>['retry']>) => job.retry(...args),
        })
    }

    private attachEventActions(job : Job) {
        const pending : Promise<void>[] = [];

        const handle = (action : DeferredAction) => () => {
            const task = this.transport[action](this.queueName, job.id)
                .then(() => this.logger.log(`${this.tag} Job ${job.id} ${ACTION_LABELS[action]}.`))
                .catch((err : unknown) => this.logger.error(`${this.tag} Failed to apply "${action}" to job ${job.id}:`, err))
            
            pending.push(task);
        }

        const onAck = handle('ack');
        const onNack = handle('nack');
        const onRetry = handle('retry');

        job.once("ack", onAck);
        job.once("nack", onNack);
        job.once("retry", onRetry);

        return {
            cleanup : () => {
                job.off("ack", onAck);
                job.off("nack", onNack);
                job.off("retry", onRetry);
            },
            settled : async () => { await Promise.all(pending); }
        }
    }

    private async dispatchDeferredActions(jobs : Job[]) {
        const idsByAction = new Map<DeferredAction, number[]>();

        for (const { action, id } of jobs.flatMap(job => job.defferedStates)) {
            const ids = idsByAction.get(action);
            if (ids) ids.push(id);
            else idsByAction.set(action, [id]);
        }

        if (idsByAction.size === 0) return;

        const summary = [...idsByAction].map(([action, ids]) => `${ids.length} ${action}`).join(', ');
        this.logger.log(`${this.tag} Applying deferred actions: ${summary}.`);

        for (const [action, ids] of idsByAction) {
            try {
                await this.transport[action](this.queueName, ids);
                this.logger.log(`${this.tag} ${ids.length} job(s) ${ACTION_LABELS[action]}.`);
            }
            catch (err) {
                this.logger.error(`${this.tag} Failed to apply deferred "${action}" to ${ids.length} job(s) (ids: ${ids.join(', ')}):`, err);
            }
        }
    }
}