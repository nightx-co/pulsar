export abstract class BaseQueueRepository {
    public abstract deregisterWorker(workerId : string, queue : string) : Promise<void>;

    public abstract pauseQueue(queue : string, period : string) : Promise<void>;

    public abstract resumeQueue(queue : string, period : string) : Promise<void>;
}

export type IQueueRepository = BaseQueueRepository;