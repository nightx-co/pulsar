export interface ClockOptions {
    /** Maximum allowed runtime in milliseconds for the entire engine execution (e.g., 25000 for 25s) */
    maxExecutionBudgetSec?: number;
    /** Safety margin in milliseconds reserved for graceful cleanup/shutdown */
    safetyBufferMs?: number;
    /** Maximum number of execution spans to retain in memory */
    maxTrackHistory?: number;

    enabled?: boolean;
}

export class PulsarClock {
    /*
        THE PLAN WITH THE `tracks` WAS TO BUILD A RECORD OF TIME SERIES AVARAGING TICK EXECUTION DURATION,
        THEN WHEN THE NEXT TICK IS ABOUT TO EXECUTE THE CLOCK CAN PREDICT HOW LONG IT MIGHT TAKE BASED ON
        EXISTING RECORDS DATA.

        CURRENTLY `tracks` IS NOT BEING FULLY USED, HOWEVER IN FUTURE WE WILL DECIDE IF TO KEEP IT OR REMOVE.
    */
    private tracks : { id : string; duration : number; contextId : string }[] = [];
    private startTime : number;
    private maxExecutionBudgetSec : number;
    private safetyBufferMs : number;
    private maxTrackHistory : number;
    private enabled : boolean;
    /*
        THE `cpuExecutionMicroseconds` WAS INTRODUCED TO TRACK ACTIVE CPU EXECUTION TIME FOR SERVERLESS/EDGE RUNTIMES,
        IT TRACKS SYNCHRONUS EXECUTION SUCH AS MATH, SYNC CODES ETC AND INCREAMENT THE NUMBER, ONCE IT HITS THE THREASHOLD
        WHICH IS THE TARGET RUNTIME CPU LIMIT, IT WILL STOP ALL TICK PROCESS LIKE THE CLOCK AND RESCHEDULE THE FUNCTION.

        AS OF NOW, WE COULDN'T FIND ANY WAY TO NATIVELY TRACK CPU EXECUTION TIME FOR SERVERLESS/EDGE RUNTIMES.
        IN FUTURE WE MAY INTRODUCE SOMETHING THAT WILL HELP US TRACK CPU TIMING.
    */
    public cpuExecutionMicroseconds = 0;
    private remainingTimeWatchdogId? : ReturnType<typeof setInterval>;

    constructor(options : ClockOptions = {}) {
        this.startTime = performance.now();
        this.maxExecutionBudgetSec = options.maxExecutionBudgetSec ?? 250;
        this.safetyBufferMs = options.safetyBufferMs ?? 1000;
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
        const elapsedMs = this.getElapsedTotalTime();
        const budgetMs = this.maxExecutionBudgetSec * 1000;
        return Math.max(0, budgetMs - elapsedMs - this.safetyBufferMs);
    }

    public getAverageTickDuration(lastN = 5) : number {
        if (this.tracks.length === 0) return 0;
        const recent = this.tracks.slice(-lastN);
        const total = recent.reduce((sum, t) => sum + t.duration, 0);
        return total / recent.length;
    }

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

    public registerRemainingTimeWatchdog(onTimeReached : () => void) {
        this.stopRemainingTimeWatchdog();
    
        const checkTime = () => {
            const remainingTime = this.getTimeRemaining();
    
            if (remainingTime <= 0) {
                onTimeReached();
            }
        }
    
        checkTime();
        this.remainingTimeWatchdogId = setInterval(checkTime, 1000);
    }
    
    public stopRemainingTimeWatchdog() {
        if (this.remainingTimeWatchdogId !== undefined) {
            clearInterval(this.remainingTimeWatchdogId);
            this.remainingTimeWatchdogId = undefined;
        }
    }
}