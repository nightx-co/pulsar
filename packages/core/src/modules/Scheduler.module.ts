import { config } from "../service/ConfigurationStore.ts";
import { TIMING_PROFILES, type TimingProfile, type TimingProfileType } from "../static/TimingProfile.ts";

export interface ScheduleRequest {
    queue : string;
    readyJobs : number;
    delayedJobs : number;
    availableSlots : number;
    nextVisibleAt? : number | null;
}

interface ScheduleMetrics {
    queue : string;
    readyJobs : number;
    delayedJobs : number;
    availableSlots : number;
    nextVisibleAt? : number | null;
}

interface ScheduleOptions {
    metrics : ScheduleMetrics;
    /** Standard wakeup handler for ready/backoff/idle ticks */
    onNext: () => void | Promise<void>;
    /** Specialized handler when scheduling near-term delayed jobs */
    onUpcomingDelayedNext?: (upcomingTimeMs : number) => void | Promise<void>;
    /** Async hook for long delays exceeding maxTimerMs (e.g. persistent state / external triggers) */
    onFutureSchedule?: (nextVisibleAt : number) => Promise<void>;
}

const MAX_SAFE_TIMEOUT_MS = 2_147_483_647;

export class Scheduler {
    private timers = new Map<string, ReturnType<typeof setTimeout>>();
    private profiles = new Map<string, TimingProfile>();

    constructor() {}

    /**
     * Register a timing profile for a queue
     */
    public registerQueueProfile(queue : string, profileInput : TimingProfileType | TimingProfile) {
        if (typeof profileInput === 'string') {
            const preset = profileInput !== 'CUSTOM' ? TIMING_PROFILES[profileInput] : undefined;
            this.profiles.set(queue, preset ?? TIMING_PROFILES.STANDARD);
        }
        else {
            this.profiles.set(queue, profileInput);
        }
    }

    public getProfile(queue : string) : TimingProfile {
        const liveQueueConfig = config.get('queues')?.find(q => q.queue === queue);
        const liveProfile = liveQueueConfig?.profile;

        if (liveProfile) {
            if (typeof liveProfile === 'string') {
                return liveProfile !== 'CUSTOM' ? TIMING_PROFILES[liveProfile] : TIMING_PROFILES.STANDARD;
            }
            if (typeof liveProfile === 'object') {
                return liveProfile as TimingProfile;
            }
        }

        return this.profiles.get(queue) ?? TIMING_PROFILES.STANDARD;
    }

    /**
     * Cancel pending schedules for a queue
     */
    public cancel(queue : string) {
        const pending = this.timers.get(queue);
        if (pending) {
            clearTimeout(pending as ReturnType<typeof setTimeout>);
            //clearImmediate(pending as any);
        }
        this.timers.delete(queue);
    }

    public scheduleNext(options : ScheduleOptions): void {
        const { metrics, onNext, onUpcomingDelayedNext, onFutureSchedule } = options;
        const { queue, readyJobs, delayedJobs, availableSlots, nextVisibleAt } = metrics;

        this.cancel(queue);
        const profile = this.getProfile(queue);

        // 1. Ready jobs + open slots -> Ultra-fast profile-based active tick
        if (readyJobs > 0 && availableSlots > 0) {
            this.setTimer(queue, onNext, profile.activeTickDelayMs);
            return;
        }

        // 2. Ready jobs but slots full -> Backoff poll to check slot freeing
        if (readyJobs > 0 && availableSlots === 0) {
            this.setTimer(queue, onNext, profile.saturatedTickDelayMs);
            return;
        }

        // 3. Delayed jobs present -> Calculate exact delta safely without blocking threads
        if (delayedJobs > 0 && nextVisibleAt) {
            const deltaMs = Math.max(0, nextVisibleAt - Date.now());

            if (deltaMs <= profile.maxNextTickDelayMs) {
                if(onUpcomingDelayedNext) {
                    onUpcomingDelayedNext(deltaMs);
                }
                
                this.setTimer(queue, onNext, deltaMs);
                return;
            }

            // Long delay handing over to external Redis/Trigger safety nets
            if (onFutureSchedule) {
                onFutureSchedule(nextVisibleAt).catch((err) =>
                    console.error(`Scheduler error setting long delay for ${queue}:`, err)
                )
            }
            return;
        }

        // 4. Idle fallback (optional trigger fallback)
        if (profile.idleTickDelayMs) {
            this.setTimer(queue, onNext, profile.idleTickDelayMs);
        }
    }

    private setTimer(queue : string, callback : () => void, delayMs : number) {
        const safeDelay = Math.min(Math.max(0, delayMs), MAX_SAFE_TIMEOUT_MS);

        const wrappedCallback = () => {
            this.timers.delete(queue);
            callback();
        }

        if (safeDelay === 0) {
            const immediate = setTimeout(wrappedCallback);
            this.timers.set(queue, immediate);
            return;
        }

        const timer = setTimeout(wrappedCallback, safeDelay);
        this.timers.set(queue, timer);
    }
}