import type { PulsarRuntimeCore } from "../../../shared/PulsarRuntimeCore";
import type { TickController } from "../../../modules/TickController.module";
import type { IRuntimeExecutionContext } from "../../../runtimes/runtimeTypes";
import type { PulsarUnifiedStorage } from "../../../storage";
import type { QueueService } from "../../../modules/Queue.module";

export interface IEngineContext {
    tickController : TickController;
    runtimeStrategy : PulsarRuntimeCore;
    executionContext : IRuntimeExecutionContext;
    storage : PulsarUnifiedStorage;
    queueService : QueueService;
    shutdown: () => Promise<void>;
}