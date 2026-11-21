import type { EngineConsumerConfig } from "../types/consumer.types.ts";
import type { EngineQueuesConfig } from "../types/queue.types.ts";

export type QueueModule = EngineQueuesConfig & {
    consumer : EngineConsumerConfig;
}

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type EngineConsumerConfigWithoutQueue = DistributiveOmit<EngineConsumerConfig, "queue">;

type CreateQueueConfig = EngineQueuesConfig & { consumer : EngineConsumerConfigWithoutQueue};

export function createQueue(config : CreateQueueConfig) : QueueModule {
    return {
        ...config,
        consumer: {
            ...config.consumer,
            queue : config.queue
        }
    }
}