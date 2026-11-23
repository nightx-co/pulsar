export type TimingProfileType = 'REALTIME' | 'STANDARD' | 'RELAXED' | 'ULTRA_EFFICIENT' | 'BALANCED' |  'CUSTOM';

export interface TimingProfile {
    /** Delay before the next tick when jobs are ready and slots are free  */
    activeTickDelayMs : number;

    /** Delay before the next tick when jobs are ready, but all slots are full.  */
    saturatedTickDelayMs : number;

    /** Fallback tick interval when the queue is completely empty. */
    idleTickDelayMs? : number;

    /** Maximum delay allowed for a scheduled setTimeout tick before handing off to onFutureSchedule. */
    maxNextTickDelayMs : number;
}

export const TIMING_PROFILES : Record<Exclude<TimingProfileType, 'CUSTOM'>, TimingProfile> = {
    
    /*
        Ultra-fast for high-throughput, latency-critical queues where every millisecond counts.
            Best for : fast notifications, real time order updates or bursty 10,000+ fast job pipelines.
            Pro      : lowest pickup latency and highest throughput for time sensitive jobs.
            Con      : highest CPU, database and idle/backoff wakeup overhead.
            Use when : users wait on near instant processing or bursts need rapid drain.
    */
    REALTIME: {
        activeTickDelayMs: 10,
        saturatedTickDelayMs: 100,
        idleTickDelayMs: 100,
        maxNextTickDelayMs: 15_000,// 15s
    },

    /*
        Responsive default for everyday background jobs that users expect to finish within a few seconds.
            Best for : transactional emails, password resets, image or PDF generation and standard API webhooks.
            Pro      : predictable responsiveness with moderate resource usage across typical workloads.
            Con      : not fast enough for sub-100ms queues and heavier than needed for infrequent tasks.
            Use when : starting out with a general-purpose queue without special latency or cost constraints.
    */
    STANDARD: {
        activeTickDelayMs: 1000,
        saturatedTickDelayMs: 1000,
        idleTickDelayMs: 5000,
        maxNextTickDelayMs: 60_000,
    },

    /*
        Steady pace that trades a small amount of pickup latency for lower database and CPU pressure under load.
            Best for : third-party CRM or ERP syncs, search indexing, analytics ingestion and multi-tenant queues.
            Pro      : eases contention when worker slots fill up or shared resources need breathing room.
            Con      : slightly slower slot re-checks and idle recovery than STANDARD.
            Use when : shared DB/API rate limits matter more than immediate second-by-second ticks.
    */
    BALANCED : {
        activeTickDelayMs: 1000,
        saturatedTickDelayMs: 2500,
        idleTickDelayMs: 10000,
        maxNextTickDelayMs: 60_000,
    },
    
    /*
        Low-overhead pacing for non-urgent background tasks that can safely wait several seconds.
            Best for : CSV or PDF report exports, daily digests, cache warming and bulk data backfills.
            Pro      : noticeably reduces polling load during busy or idle stretches.
            Con      : multi-second pickup and retry delays make it unsuitable for interactive flows.
            Use when : jobs run in the background and a few seconds of extra delay has no user impact.
    */
    RELAXED: {
        activeTickDelayMs: 5000,
        saturatedTickDelayMs: 10_000,
        idleTickDelayMs: 20_000,
        maxNextTickDelayMs: 60_000,
    },

    /*
        Minimal polling footprint designed to keep idle and saturated queues nearly silent on resources.
            Best for : nightly cleanup or archiving, database pruning, billing rollups or rare event-driven jobs.
            Pro      : lowest background resource cost for sparse or low-priority queues.
            Con      : long delays before picking up jobs, freeing slots, or recovering from missed triggers.
            Use when : queues sit mostly idle or run batch maintenance where long waits are acceptable.
    */
    ULTRA_EFFICIENT: {
        activeTickDelayMs: 10_000,
        saturatedTickDelayMs: 10_0000,
        idleTickDelayMs: 30_0000,
        maxNextTickDelayMs: 60_000,
    },
}