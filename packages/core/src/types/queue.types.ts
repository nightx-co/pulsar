import type { TimingProfile, TimingProfileType } from "../static/TimingProfile.ts";
import type { EnginePoolingMode } from "./engine.types.ts";

export type EngineQueuesConfig = {
    queue: string;

    /**
     * Configures the execution cadence and polling intervals for this queue.
     * 
     * Accepts a predefined preset (`'REALTIME'`, `'STANDARD'`, `'BALANCED'`, `'RELAXED'`, `'ULTRA_EFFICIENT'`)
     * or a custom `TimingProfile` object to fine-tune active, backoff, and idle delays.
     * 
     * @default 'STANDARD'
    */
    profile : TimingProfileType | TimingProfile;

    /**
     * Controls how the queue pulls work from storage.
     * 
     * - `'interval-driven-pooler'`: For steady, predictable background workloads that need ongoing processing.
     * - `'event-driven-pooler'`: For instant processing of sporadic or bursty jobs while keeping idle execution costs at zero.
     * 
     * @default 'interval-driven-pooler'
    */
    pooler : EnginePoolingMode;

    /**  */
    type : "fifo" | "STANDER";

    /**
     * Maximum concurrent worker instances allowed for this queue.
     * 
     * @warning High concurrency increases parallel connections, I/O operations, and resource contention on the database and storage layer.
    */
    concurrency: number;

    /** Number of jobs assigned per worker batch */
    n: number;

    /** 
     * Maximum aggregate jobs the engine can fetch in a single tick loop.
     * If (concurrency * n) > maxJobsPerTick, active workers will be scaled 
     * down automatically to satisfy this limit (Backpressure throttling).
     */
    maxJobsPerTick? : number,

    /**
     * Defines the tick budget (quantum) allocated to this isolate. Once the tick count 
     * reaches this threshold, the engine marks the isolate's execution cycle as completed.
     * 
     * @default 10
     * 
     * @warning Do not set `cycleTickLimit` higher than 20 per queue, especially when running multiple queues.
     * High tick limits keep execution pinned to the same serverless instance, escalating the risk 
     * of hitting total execution timeouts (e.g., AWS Lambda, Vercel, or Cloudflare Workers limits).
    */
    cycleTickLimit? : number;

    sleep?: number;

    /**
        * Rules for automatically switching queue performance modes based on active workload.
        * 
        * When a queue experiences sustained inactivity, the engine automatically transitions it 
        * into an idle state. This significantly reduces database read operations, lowers API and 
        * storage costs, and minimizes unnecessary CPU and network utilization during quiet periods. 
        * 
        * As soon as new jobs are detected, the engine instantly transitions back and restores 
        * the queue's original active timing profile without manual intervention or job delivery latency.
        *
     */
    stateTransitionPolicy? : {
        /**
         * Whether automatic state switching is active for this queue.
         * 
         * @default true
         */
        enabled?: boolean;
        /**
         * Number of consecutive empty ticks required before the engine transitions into idle mode for this queue.
         * 
         * @default 10
         */
        idleThresholdTicks?: number;
        /**
         * The timing profile or custom interval object applied when the queue enters idle mode.
         * 
         * Accepts a predefined preset (`RELAXED`, `ULTRA_EFFICIENT`) or a custom `TimingProfile`.
         * 
         * maxTimerMs will be ignored
         * 
         * @default 'RELAXED'
         */
        idleTimingProfile?: TimingProfileType | TimingProfile;
    }

    /**
     * Defines how and when the Pulsar engine evaluates external cancellation or stop signals 
     * sent by an external system to halt a running tick process.
     * 
     * - `tick`: Evaluates the stop signal on every single atomic tick iteration (immediate intervention).
     * - `cycle`: Evaluates the stop signal only at the completion of a batch cycle (deferred intervention).
     * - `inherit`: Inherits the default policy from the global engine configuration.
     * 
     * @default "inherit"
     */
    interventionPolicy? : "tick" | "cycle" | "inherit";

    deadLetterQueue? : string;
}


export type QueueMessage<T = unknown> = {
    msg_id: number;
    read_ct: number;
    enqueued_at: Date;
    vt: Date;
    message: T;
}