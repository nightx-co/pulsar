import type { EnginePoolingMode } from "../../types/engine.types";

export type ResponseHeaders = {
    isRestarted: boolean;
    poolerMode: EnginePoolingMode;
    lastExecutionId: string;
    lastExecutionAt: string;
    lastIsolateId: string;
    executionOwner: "watchdog" | "engine" | "trigger";
    targetQueue?: string;
    fencingToken?: string;
    workerId? : string;
}

export const extractHeaders = (rawHeaders : Record<string, string>) : ResponseHeaders => {
    return {
        isRestarted: (rawHeaders["x-restart"] ?? "false") === "true",
        poolerMode: (rawHeaders["x-pooler"] ?? "interval-driven-pooler") as EnginePoolingMode,
        lastExecutionId: rawHeaders["x-last-execution-id"] ?? crypto.randomUUID(),
        lastExecutionAt: rawHeaders["x-last-execution-at"] ?? new Date().toISOString(),
        lastIsolateId: rawHeaders["x-last-isolate-id"] ?? crypto.randomUUID(),
        executionOwner: (rawHeaders["x-execution-owner"] ?? "engine") as "watchdog" | "engine",
        targetQueue: rawHeaders["x-target-queue"] ?? undefined,
        fencingToken: rawHeaders["x-fencing-token"] ?? undefined,
        workerId: rawHeaders["x-worker-id"] ?? undefined,
    }
}
