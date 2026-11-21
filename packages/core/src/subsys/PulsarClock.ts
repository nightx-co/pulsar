export interface ClockOptions {
    /** Maximum allowed runtime in milliseconds for the entire engine execution (e.g., 25000 for 25s) */
    maxExecutionBudgetMs?: number;
    /** Safety margin in milliseconds reserved for graceful cleanup/shutdown */
    safetyBufferMs?: number;
    /** Maximum number of execution spans to retain in memory */
    maxTrackHistory?: number;

    enabled?: boolean;
}

export class PulsarClock {
    private tracks : { id : string; duration : number; contextId : string }[] = [];
    private startTime : number;
    private maxExecutionBudgetMs : number;
    private safetyBufferMs : number;
    private maxTrackHistory : number;
    private enabled : boolean;

    public cpuExecutionMicroseconds = 0;

    constructor(options : ClockOptions = {}) {
        this.startTime = performance.now();
        this.maxExecutionBudgetMs = options.maxExecutionBudgetMs ?? 25000;
        this.safetyBufferMs = options.safetyBufferMs ?? 2000;
        this.maxTrackHistory = options.maxTrackHistory ?? 100;
        this.enabled = options.enabled ?? false;
    }

    public async trackExecutionTime<T>({ contextId } : { contextId : string }, fn: () => Promise<T>) : Promise<T> {
        const start = performance.now();
        try {
            return await fn();
        }
        finally {
            if(this.enabled == true) {
                const end = performance.now();
                const duration = end - start;

                this.tracks.push({ id: crypto.randomUUID(), duration, contextId });

                if (this.tracks.length > this.maxTrackHistory) {
                    this.tracks.shift();
                }
            }
        }
    }
    
    public getElapsedTotalTime() : number {
        return performance.now() - this.startTime;
    }

    public getTimeRemaining() : number {
        const elapsed = this.getElapsedTotalTime();
        const remaining = this.maxExecutionBudgetMs - elapsed - this.safetyBufferMs;
        return Math.max(0, remaining);
    }

    public getAverageTickDuration(lastN = 5): number {
        if (this.tracks.length === 0) return 0;
        const recent = this.tracks.slice(-lastN);
        const total = recent.reduce((sum, t) => sum + t.duration, 0);
        return total / recent.length;
    }

    /**
     * Determines if executing another tick is safe.
     * Uses recent average tick duration to estimate whether another tick will exceed the deadline.
     */
    public isSafeToContinue() : boolean {
        if(!this.enabled) return true;

        const remaining = this.getTimeRemaining();

        if (remaining <= 0) return false;

        const estimatedNextTick = this.getAverageTickDuration(5);
        if (estimatedNextTick > 0 && remaining < estimatedNextTick) {
            return false;
        }

        return true;
    }

    public clear(contextId : string) {
        this.tracks = this.tracks.filter(track => track.contextId !== contextId);
    }
}