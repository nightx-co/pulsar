import type { IBatchCandidate } from "../../modules/Tick.module";

export abstract class BaseQueueRepository {
    public abstract getActiveWorkersCount(queue : string) : Promise<number>;
    public abstract getGlobalActiveWorkersCount () : Promise<number>;

    public abstract registerWorker(queue : string, candidateBatches : IBatchCandidate[], concurrency : number, globalMaxConcurrency : number) : Promise<string[]>;
    public abstract deregisterWorker(workerId : string, queue : string) : Promise<void>;
    public abstract resetAllocatedWorkerSlots(queue : string) : Promise<void>;

    public abstract claimGlobalJobBudget(requested : number, maxGlobalJobsPerTick : number) : Promise<{ granted : number, window : string }>;
    public abstract refundGlobalJobBudget(amount : number, window : string) : Promise<void>;

    public abstract acquireQueueLock(lockKey : string, ownerId : string, ttlMs : number) : Promise<boolean>;
    public abstract releaseQueueLock(lockKey : string, ownerId : string) : Promise<boolean>;

    public abstract evaluateDeadRun(
        queueName : string,
        poolerType : "interval-driven-pooler" | "event-driven-pooler",
        totalJobs : number,
        continuationOwnerId : string,
        dispatchTtlMs : number,
        idpLockKey? : string,
        edpLockPrefix? : string
    ) : Promise<boolean>;
    
    public abstract clearDispatchPending(lockKey : string) : Promise<void>;

    public abstract setFutureSchedule(queue : string, scheduleAt : string) : Promise<void>;

    public abstract getStopSignal(queue : string) : Promise<boolean>;
}

export type IQueueRepository = BaseQueueRepository;