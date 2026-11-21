import type { QueueService } from "./Queue.module.ts";
import type { SwarmManager } from '../service/SwarmBudgetTracker.ts';
import type { PulsarUnifiedStorage } from '../storage/PulsarStorage.ts';
import type { EngineQueuesConfig, QueueMessage } from "../types/queue.types.ts";
import type { UnifiedTransportManager } from "../network/UnifiedTransportManager.ts";

import { LoggerService, type ILogger } from "../subsys/LoggerService.ts";
import { ExecutionProfileSwitcherFSM } from "../fsm/domain/ExecutionProfileFSM.ts";
//import { PulsarMonitoringStreamProducer } from "../../monitoring/PulsarMonitoringStreamProducer.ts";

export interface IBatchCandidate {
    workerId : string;
    batch : QueueMessage[];
}

type GetBatchCandidate = {
    queueConfig : EngineQueuesConfig;
    maxGlobalSlotsAllowed: number;
}

interface ISpwanWorkers {
    grantedWorkerIds : string[];
    candidateBatches : IBatchCandidate[];
    queueConfig : EngineQueuesConfig;
}

interface ITick {
    storage : PulsarUnifiedStorage;
    queue : QueueService;
    swarmManager : SwarmManager;
    unifiedTransportManager : UnifiedTransportManager
}

export class TickService {
    private storage : PulsarUnifiedStorage;
    private queue : QueueService;
    private unifiedTransportManager : UnifiedTransportManager;

    private swarmManager: SwarmManager;

    private PROCESS_ID : string;
    private globalSequence = 0;

    private logger : ILogger;

    constructor ({ queue, storage, swarmManager, unifiedTransportManager } : ITick){
        this.storage = storage;
        this.queue = queue;
        this.swarmManager = swarmManager;
        this.unifiedTransportManager = unifiedTransportManager;
        
        this.logger = new LoggerService();

        this.PROCESS_ID = crypto.randomUUID().slice(0, 12);
        this.globalSequence = 0;
        //this.streamProducer = new PulsarMonitoringStreamProducer();
    }

    public async run(queueConfig : EngineQueuesConfig, maxGlobalSlotsAllowed : number) {
        const { concurrency, queue } = queueConfig;

        const maxGlobalConcurrency = this.swarmManager.getMaxGlobalConcurrency();
        const { batches : candidateBatches, window } = await this.getCandidatesBatch({
            queueConfig,
            maxGlobalSlotsAllowed,
        })

        if(!candidateBatches || candidateBatches.length === 0) {
            ExecutionProfileSwitcherFSM.handleEmptyTick(queueConfig);
            this.logger.warn(`[Tick] : [${queue}] - Empty Tick Executred)`);
            return;
        }

        ExecutionProfileSwitcherFSM.handleActiveTick(queueConfig);

        const grantedWorkerIds = await this.storage.repository.registerWorker(
            queue,
            candidateBatches,
            concurrency,
            maxGlobalConcurrency
        )

        const grantedSet = new Set(grantedWorkerIds);

        const ungrantedBatches = candidateBatches.filter(b => !grantedSet.has(b.workerId));
        if (ungrantedBatches.length > 0) {
            const ungrantedJobCount = ungrantedBatches.reduce((sum, b) => sum + b.batch.length, 0);
            
            await this.storage.repository.refundGlobalJobBudget(ungrantedJobCount, window);
        }

        if (grantedWorkerIds.length === 0) return;

        this.logger.log(`[Tick] : [${queue}] - Tick Executred. Total Jobs (${candidateBatches.reduce((sum, x) => sum + x.batch.length, 0)})`);        

        await this.spwanWorkers({ candidateBatches, grantedWorkerIds, queueConfig });
    }

    private async spwanWorkers({ grantedWorkerIds, candidateBatches, queueConfig : { queue,  } } : ISpwanWorkers) {
        if (!grantedWorkerIds?.length) return;
        const grantedSet = new Set(grantedWorkerIds);

        const activeBatches = candidateBatches.filter(b => grantedSet.has(b.workerId));

        await Promise.allSettled(activeBatches.map(({ batch, workerId }) => {
            return this.unifiedTransportManager.dispatchToNetwork(queue, { batch : batch, worker_id : workerId });
        }))
    }

    private async getCandidatesBatch({ queueConfig, maxGlobalSlotsAllowed } : GetBatchCandidate) : Promise<{ batches : IBatchCandidate[], window : string}> {
        const { concurrency, maxJobsPerTick, queue, sleep, n } = queueConfig;

        const activeWorkersCount = await this.storage.repository.getActiveWorkersCount(queue);

        const localAvailableSlots = Math.max(0, concurrency - activeWorkersCount);
        if (localAvailableSlots === 0) return { batches : [], window : '' };

        const effectiveSlots = Math.min(localAvailableSlots, maxGlobalSlotsAllowed);
        if (effectiveSlots === 0) return { batches : [], window : '' };

        const capacityMax = effectiveSlots * n;
        const localMaxJobs = (maxJobsPerTick !== undefined && maxJobsPerTick > 0) ? maxJobsPerTick : Infinity;

        const desiredToFetch = Math.min(capacityMax, localMaxJobs);
        if (desiredToFetch <= 0) return { batches : [], window : '' };
        
        const globalMaxJobsPerTick = this.swarmManager.getMaxGlobalJobsPerTick();

        const { granted : maxToFetch, window } = await this.storage.repository.claimGlobalJobBudget(desiredToFetch, globalMaxJobsPerTick);

        if (maxToFetch <= 0) return { batches : [], window : window };

        const jobs = await this.queue.read(queue, sleep ?? 1, maxToFetch);
        const jobsCount = jobs.length;

        if (jobsCount === 0) {
            await this.storage.repository.refundGlobalJobBudget(maxToFetch, window);
            return { batches : [], window : window };
        }

        if (jobsCount < maxToFetch) {
            const unusedBudget = maxToFetch - jobs.length;
            await this.storage.repository.refundGlobalJobBudget(unusedBudget, window);
        }

        const candidateBatchesCount = Math.ceil(jobsCount / n);
        const candidateBatches: IBatchCandidate[] = new Array(candidateBatchesCount);

        const timestamp = Date.now();

        let batchIdx = 0;

        for (let i = 0; i < jobsCount; i += n) {
            candidateBatches[batchIdx++] = {
                workerId: `w_${this.PROCESS_ID}_${timestamp}_${this.globalSequence++}`,
                batch: jobs.slice(i, i + n)
            }
        }

        return { batches : candidateBatches, window};
    }
}