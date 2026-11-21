import type { EngineQueuesConfig } from "../types/queue.types.ts";

export interface IRuntimeExecutionContext {
    lockKey : string;
    currentExecutionId : string;
    isolateId : string;
    getActiveQueues: () => EngineQueuesConfig[];
    runTick: (queueConfig : EngineQueuesConfig) => Promise<void>;
    endTick: (queue : string) => void;
}

export interface IPulsarRuntime {
    readonly type : "PERSISTENT" | "SERVERLESS_VM" | "V8_ISOLATE";

    onStart(ctx : IRuntimeExecutionContext, queues : EngineQueuesConfig[]) : Promise<void>;
    handleCycleCompletion(ctx : IRuntimeExecutionContext, currentLockKey : string) : Promise<boolean>;
}