export type EnginePoolingMode = 'interval-driven-pooler' | 'event-driven-pooler';

export type EngineSelfInvocation =
    { selfURL : string; selfInvocationMethod? : "auto_using_pgnet" } |
    { selfURL : string; selfInvocationMethod? : "manual", handler : (selfUrl : string) => Promise<void> | void }

type BaseEngineOptions = {
    /**
     * The global maximum ceiling for total tick executions across ALL queues in a single execution run.
     * 
     * Once the cumulative number of ticks executed across all queues reaches this limit, 
     * the engine terminates the current execution cycle and triggers a self-invocation restart.
     * 
     * ### Execution Flow:
     * ```
     * [ Queue Ticks Executed ] ──(Count reaches cycleTickLimit)──> [ Terminate Cycle & Self-Invoke ]
     * ```
     * 
     * For example, with 10 queues and `cycleTickLimit: 10`, each queue executes 1 tick before 
     * the engine reaches the global limit and restarts, ensuring no single queue consumes 
     * the entire execution window.
     * 
     * @default Infinity
    */
    cycleTickLimit?: number;
    /**
     * Controls the execution strategy for dispatching tick cycles across target queues.
     * 
     * This setting dictates whether the engine evaluates and triggers ticks across multiple 
     * configured queues sequentially (one queue at a time) or in parallel (simultaneously).
     * 
     * ### Execution Flow Comparison:
     * 
     * **`sequential` (Default - CPU & Memory Safe):**
     * ```
     * [ Queue A Tick ] ──(await completion)──> [ Queue B Tick ] ──(await completion)──> [ Queue C Tick ]
     * ```
     * * **Behavior:** Processes queue ticks strictly one after another in serial order.
     * * **Pros:** Keeps CPU usage steady and avoids sudden spike loads on database connections and memory isolates.
     * * **Cons:** Takes longer total clock time to complete a single tick cycle across all queues.
     * 
     * **`parallel` (High Throughput - Higher Resource Demand):**
     * ```
     * ┌─> [ Queue A Tick ]
     * ├─> [ Queue B Tick ]  ─── (Fired simultaneously via Promise.allSettled)
     * └─> [ Queue C Tick ]
     * ```
     * * **Behavior:** Dispatches tick evaluations for all candidate queues at the exact same moment.
     * * **Pros:** Dramatically lowers cycle latency and maximizes total job processing throughput.
     * * **Cons:** Produces concurrent CPU spikes, higher transient V8 memory allocations, and heavier concurrent database query bursts.
     * 
     * > **Performance Note:** Choosing between `sequential` and `parallel` directly impacts engine resource utilization. 
     * > In environments with strict CPU time allocations or tight database connection limits, `sequential` prevents resource starvation. 
     * > For high-capacity environments prioritizing low dispatch latency across many queues, `parallel` delivers optimal speed.
     * 
     * @default "sequential"
     */
    tickConcurrency?: "parallel" | "sequential";
    /**
     * How often (in seconds) the engine checks its own internal health and runtime state.
     * 
     * @default 15
     */
    healthCheckIntervalSec?: number;

    /**
     * Defines the default engine wide intervention policy for handling external cancellation or stop signals.
     * 
     * Queues configured with a policy of `"inherit"` will automatically adopt this global setting. 
     * When an external stop or intervention signal is triggered this policy dictates how the engine 
     * evaluates the signal and terminates the tick process:
     * 
     * - `tick`: The engine checks the intervention flag on every single atomic tick iteration. 
     *   When a stop signal is detected, the engine aborts execution immediately within the current tick 
     *   boundary, ensuring near instantaneous cessation at the cost of higher cache/storage I/O.
     * ---
     * - `cycle`: The engine allows the active tick loop to run continuously through the completion 
     *   of a full batch cycle. The signal is only evaluated during the cycle reset boundary after 
     *   which the engine cleanly exits the loop (zero runtime overhead during active crunching but 
     *   introduces latency proportional to cycle length).
     * ---
     *- `disabled`: All external cancellation and intervention signals are ignored.
     *   The engine will not evaluate, acknowledge, or act upon incoming stop signals,
     *   allowing active tick processes to continue uninterrupted until normal completion.
     *   This effectively disables external intervention across all queues inheriting this policy.
     * 
     * @default "disabled"
     */
    interventionPolicy? : 'tick' | 'cycle' | 'disabled';
}

export type SelfInvokingEngine = BaseEngineOptions & {
    selfURL: string;
    selfInvocationMethod?: "auto_using_pgnet" | { method: "manual", handler: (selfUrl: string, headers : Record<string, string>) => Promise<void> | void };
    /**
     * Specifies how often (in seconds) the engine should invoke itself.
     * 
     * The minimum value is **1 second**. A higher number increases the delay 
     * between self-invocations.
     * 
     * ### Recommendations & Workload Pacing
     * * It is generally **recommended to keep the default (1 second)**.
     * * Increasing this value introduces processing latency before jobs are picked up.
     * * **Lower values (e.g., 1s)** process jobs faster and are recommended if you have 
     *   multiple interval-driven queues with frequent, predictable workloads.
     * * **Higher values (e.g., 5s)** process jobs slower but significantly reduce the 
     *   total number of engine invocations over time.
     * 
     * ### Estimated Monthly Invocations
     * The lower this setting is, the higher the total invocation count will be at the 
     * end of the month.
     * 
     * **1 Second Interval:**
     * * Formula: `1 second * 60 seconds * 60 minutes * 24 hours * 30 days`
     * * Total: **~2,592,000 invocations / month**
     * 
     * **5 Seconds Interval:**
     * * Formula: `(1 second / 5) * 60 seconds * 60 minutes * 24 hours * 30 days`
     * * Total: **~518,400 invocations / month**
     * 
     * *(Note: Depending on your hosting platform, actual invocation counts may be slightly 
     * higher or lower based on execution overhead).*
     * 
     * @default 1
     * @minimum 1
    */
    selfInvocationIntervalSec?: number;
    selfRestartIntervalSec?: number;
}

export type PersistentEngine = BaseEngineOptions & {
    poolingIntervalMS?: number;
    advancePoolingConfig? : {
        optimizePolling?: boolean;
        /** 
         * Number of consecutive empty polls before switching to an backoff/slower interval.
         * Default: 5
         */
        emptyPollsBeforeBackoff?: number;
        /** 
         * The maximum delay interval (in milliseconds) when backing off due to prolonged inactivity.
         * Default: 30000 (30 seconds)
         */
        maxBackoffIntervalMS?: number;
    }
}