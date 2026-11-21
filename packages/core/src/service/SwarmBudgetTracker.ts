export class SwarmManager {
    constructor(
        private maxGlobalJobsPerTick: number,
        private maxGlobalConcurrency: number
    ) {}

    /**
     * Getter for configured maximum global worker concurrency.
     */
    public getMaxGlobalConcurrency(): number {
        return this.maxGlobalConcurrency;
    }

    /**
     * Getter for configured maximum global jobs per 1s tick window.
     */
    public getMaxGlobalJobsPerTick(): number {
        return this.maxGlobalJobsPerTick;
    }
}