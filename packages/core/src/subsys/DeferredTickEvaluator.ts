import type { PulsarClock } from "./PulsarClock";
import type { Scheduler } from "../modules/Scheduler.module";
import type { ILogger } from "./LoggerService";
import type { EngineQueuesConfig } from "@package/src/types/queue.types";
import { config } from "../service/ConfigurationStore";
import { PulsarRuntime } from "../types/runtime.types";
import { PulsarEventBus } from "../service/PulsarEventBus";

export class DeferredTickEvaluator {
    constructor (
        private minBootRequirementSec : number,
        private scheduler : Scheduler,
        private clock : PulsarClock,
        private logger : ILogger
    ) {}

    private timers = new Map<string, ReturnType<typeof setTimeout>>();
    private watchdogTimer : ReturnType<typeof setInterval> | null = null;
    private isShutdownTriggered = false;

    public evaluateUpcomingDelayedNext(upcomingTimeMs : number, queue : string) {
        const selfInvocationIntervalSec = config.get("engine.selfInvocationIntervalSec") ?? 1;
        const MIN_EXECUTION_TIME_SEC = this.minBootRequirementSec;
        const REQUIRED_BUDGET_MS = (selfInvocationIntervalSec + MIN_EXECUTION_TIME_SEC) * 1000;

        let deltaRemainingTimeMs : number = 0;

        if(config.get('runtime') === PulsarRuntime.V8_ISOLATE) {
            const isolate = config.raw.isolate;
            if (!isolate) throw new Error("Isolate is not configured for V8_Isolate_Runtime!");
            deltaRemainingTimeMs = isolate.remainingTime - upcomingTimeMs;
        }
        else {
            deltaRemainingTimeMs = this.clock.getTimeRemaining() - upcomingTimeMs;
        }

        if (deltaRemainingTimeMs < REQUIRED_BUDGET_MS) {
            this.logger.log(
                `[Isolate Runtime] Sleep duration of ${upcomingTimeMs}ms exceeds safe isolate budget. ` +
                `Canceling timer sleep and initiating shutdown.`
            );

            this.scheduler.cancel(queue);
            this.triggerGracefulShutdown(queue);
            return;
        }

        this.startWatchdog(queue, REQUIRED_BUDGET_MS);
    }
        
    public startWatchdog(queue : string, requiredBudgetMs :  number) {
        this.stopRuntimeWatchdog();
        this.isShutdownTriggered = false;

        this.watchdogTimer = setInterval(() => {
            if (this.isShutdownTriggered) return;

            let remainingTime : number = 0;

            if(config.get('runtime') === PulsarRuntime.V8_ISOLATE) {
                const isolate = config.raw.isolate;
                if (!isolate) throw new Error("Isolate is not configured for V8_Isolate_Runtime!");
                remainingTime = isolate.remainingTime;
            }
            else {
                remainingTime = this.clock.getTimeRemaining();
                console.log(`remainingTime : ${(remainingTime / 1000).toFixed(2)}`)
            }

            if (remainingTime <= requiredBudgetMs) {
                this.logger.log(
                    `[Isolate Watchdog] Remaining isolate budget (${remainingTime / 1000}s) expired during delayed sleep. ` +
                    `Canceling wakeup and executing graceful shutdown.`
                );

                this.scheduler.cancel(queue);
                this.triggerGracefulShutdown(queue);
            }
        }, 1000)
    }

    private triggerGracefulShutdown(queue : string) {
        if (this.isShutdownTriggered) return;
        this.isShutdownTriggered = true;

        this.stopRuntimeWatchdog();

        PulsarEventBus.emit("tick:time-exceeded", {
            queue,
            elapsedMs: this.clock.getElapsedTotalTime(),
        });

        PulsarEventBus.emit("tick:cycle-completed", { queue, cycles: 1 });
    }

    public stopRuntimeWatchdog() {
        if (this.watchdogTimer) {
            clearInterval(this.watchdogTimer);
            this.watchdogTimer = null;
        }
    }

    public clearTimer(queue : string) {
        const pending = this.timers.get(queue);
        if(pending) {
            clearTimeout(pending as ReturnType<typeof setTimeout>);
        }

        this.timers.delete(queue);
    }

    public forceExecuteTickLater(queue : EngineQueuesConfig, targetTimestamp : number) {
        const MAX_TIMEOUT = 2147483647; // ~24.8 days in ms

        const reason = `Extended time limit reached ${targetTimestamp}ms elapsed, overriding standard caps !`;

        const forceRunTick = () => PulsarEventBus.emit("tick:force-run", { queue, reason });

        const delay = targetTimestamp - Date.now();

        if (delay > MAX_TIMEOUT) {
            this.timers.set(
                queue.queue,
                setTimeout(() => {
                    this.forceExecuteTickLater(queue, targetTimestamp);
                }, MAX_TIMEOUT)
            )

            return;
        }

        this.timers.set(
            queue.queue,
            setTimeout(() => {
                forceRunTick();
            }, Math.max(0, delay))
        )
    }
}
