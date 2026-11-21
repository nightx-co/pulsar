import type { QueueModule } from "../helpers/defineQueue.ts";
import type { ILogger } from "../subsys/LoggerService.ts";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage.ts";
//import type { Engine } from "./engine.types.ts";
import type { IIntegration, IntegrationConstructor } from "./integrations.types.ts";
import type { NebulaClusterConfig } from "./nebula.types.ts";
import type { PersistentConfig, ServerlessVMConfig, V8IsolateConfig } from "./runtime.types.ts";

export interface EngineSwarmConfig {
    maxGlobalConcurrency?: number,
    spawnerAlgorithm?: "LEAST_CONNECTIONS" | "ROUND_ROBIN" | "CBS",
    globalMaxJobsPerTick? : number,
}


// Base engine properties shared by all configurations
export type BaseEngineConfig = {
    instanceId : string;
    /**
     * Specifies the shared API key for this instance.
     * The key is generated once and must be identical across
     * all consumer configurations targeting this instance.
     *
     * Generate a secure API key using:
     * @example
     * openssl rand -hex 32
     * @or generate online
     * https://generate-random.org/api-keys
     */
    apiKey : string;

    nebula?: NebulaClusterConfig;

    /**
     * The unified storage layer responsible for state management, queue operations, and distributed locks.
     * 
     * The engine requires **PostgreSQL** as its core underlying storage driver to handle fundamental database 
     * functions and lock tables. However, adding **Redis** to the unified storage driver unlocks an optimized 
     * dual-layer storage architecture.
     * 
     * When Redis is configured alongside PostgreSQL, the engine automatically offloads high frequency, 
     * heavy throughput read and write operations—such as worker registration, batch dispatches, and job 
     * acknowledgments to Redis memory. 
     * 
     * ### Storage Mode Behavior:
     * * **PostgreSQL Only:** Handles all state persistence, transactional safety, and queue operations directly on the database.
     * * **PostgreSQL + Redis (Recommended):** Offloads runtime operational load from PostgreSQL to Redis memory, 
     *   significantly reducing database pressure and boosting overall engine processing speeds and throughput by 25% or more.
     */
    storage : PulsarUnifiedStorage;
    //queues: EngineQueuesConfig[];
    queues : QueueModule[];
    
    /**
     * Consumer configuration for HTTP endpoints.
     * When provided, Pulsar will make POST requests to this URL for each job.
     * The job payload will be sent in the request body.
     */
    swarmConfig?: EngineSwarmConfig;

    integrations?: Array<IntegrationConstructor | IIntegration>;

    logger? :ILogger;

    onEvents? : {
        queueComplete? : (ctx : { queue : string, at : number }) => Promise<void> | void;
        engineRestart? : () => Promise<void>;
    }
}


/**
 * Primary engine configuration union with runtime-level type enforcement.
 */
export type EngineConfig = V8IsolateConfig | ServerlessVMConfig | PersistentConfig;