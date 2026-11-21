import type { Job } from "../class/Job";
import type { PulsarStorageOptions } from "../storage/PulsarStorage";
import type { ILogger } from "../utils/LoggerService";

export interface IBatchCandidate<T extends unknown = unknown> {
    worker_id : string;
    batch : QueueMessage<T>[];
}

export type QueueMessage<T = unknown> = {
    msg_id : number;
    read_ct : number;
    enqueued_at : Date;
    vt : Date;
    message : T;
    headers : Record<string, any>;
}

export type BaseOptions = {
    concurrency? : number;
    removeOnComplete? : boolean | number;
    removeOnFail? : boolean | number;
    apiKey : string;
    logger? : ILogger;
}

export type WorkerOptions = BaseOptions & {
    storage : PulsarStorageOptions;
    wsConnectionString : string;
    reconnectionDelay? : number;
}


export type HttpWorkerOptions = BaseOptions & {
    storage : PulsarStorageOptions;
}
export type DependentWorkerOptions = BaseOptions & {
    connection : {
        url : string;
        headers : Record<string, string>
    }
}

export interface IWorkerTransport {
    connect() : Promise<void>;
    ack(queue : string, ids : number | Array<number>) : Promise<void>;
    nack(queue : string, ids : number | Array<number>) : Promise<void>;
    retry(queue : string, ids : number | Array<number>) : Promise<void>;
    deregister(workerId : string) : Promise<void>;
}

export type ConsumerJob<T> = {
    ack : Job<T>['ack'];
    nack : Job<T>['nack'];
    retry : Job<T>['retry'];
    data : Job<T>['data'];
    id : Job<T>['id'];
}

export type Processor<T = any> = (job : ConsumerJob<T>, iterationIndex : number) => Promise<void | any>;