export type TimingProfileType = 'REALTIME' | 'STANDARD' | 'RELAXED' | 'ULTRA_EFFICIENT' | 'BALANCED' |  'CUSTOM';

export interface TimingProfile {
    activePollMs: number;       // How fast to poll when jobs are active & slots are free (e.g. 10ms - 50ms)
    backoffPollMs: number;      // How fast to re-check when slots are full (e.g. 100ms - 500ms)
    idlePollMs?: number;        // Idle fallback poll (if DB triggers/notifiers are missed)
    maxTimerMs: number;         // Max setTimeout duration allowed before re-evaluating metrics
}

export const TIMING_PROFILES: Record<Exclude<TimingProfileType, 'CUSTOM'>, TimingProfile> = {
    // Ultra-fast for high-throughput, latency-critical queues (e.g. 10,000+ fast jobs)
    REALTIME: {
        activePollMs: 1000, // 10
        backoffPollMs: 1000,
        idlePollMs: 1000,
        maxTimerMs: 5_000,// 30s
    },
    // Balanced for standard background job workloads
    STANDARD: {
        activePollMs: 100,
        backoffPollMs: 500,
        idlePollMs: 10000,
        maxTimerMs: 60000,
    },
    // Balanced for standard background job workloads
    BALANCED : {
        activePollMs: 10000,
        backoffPollMs: 500,
        idlePollMs: 10000,
        maxTimerMs: 60000,
    },
    // Low-cost for non-urgent tasks (e.g., reports, cleanup)
    RELAXED: {
        activePollMs: 1000,
        backoffPollMs: 20000,
        idlePollMs: 30000,
        maxTimerMs: 60000,
    },

    ULTRA_EFFICIENT: {
        activePollMs: 5000,
        backoffPollMs: 100000,
        idlePollMs: 120000,
        maxTimerMs: 240000,
    },
}