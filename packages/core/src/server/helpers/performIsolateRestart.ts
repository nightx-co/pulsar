import type { Pulsar } from "../../service/Pulsar.service";
import type { IsolateInstance } from "../../service/Isolate.service";
import type { EnginePoolingMode } from "../../types/engine.types";

interface IEnginePerformRestart {
    isRestarted : boolean;
    isV8Isolate : boolean;
    isolate? : IsolateInstance;
    executionOwner : string;
    lastIsolateId : string;
    lastExecutionId : string;
    poolerMode : EnginePoolingMode;
    targetQueue : string;
    engine : Pulsar;
}

export async function performEngineRestart({ targetQueue, isRestarted, isV8Isolate, isolate, executionOwner, lastExecutionId, lastIsolateId, poolerMode, engine } : IEnginePerformRestart) {
    const isolateUptimeSec = isolate?.uptimeSec ?? 0;
    const isolateMaxTime = isolate?.maxTimeSec ?? Infinity;
    const shouldRecycleIsolate = isV8Isolate && (isolate?.isExpired ?? false);

    if (isV8Isolate && isolate) {
        console?.info(
            [
              '[V8_ISOLATE_STATS]',
              `  isolateUptimeSec: ${isolateUptimeSec.toFixed(2)}`,
              `  isolateMaxTime: ${isolateMaxTime}`,
              `  isolateRemainingTimeSec: ${isolate.remainingTimeSec.toFixed(2)}`,
            ].join('\n')
        )
    }

    if (isRestarted && isV8Isolate && isolate) {
        console.log(`[Pulsar] : Engine Restarted By (${executionOwner === "watchdog" ? "watchdog" : "self"})`);

        if (isolate.isSameIsolate(lastIsolateId)) {
            console.log(`[Pulsar] : Engine Restarted in same isolate (${isolate.id}), Header Isolate (${lastIsolateId})`);
        }

        if (shouldRecycleIsolate) {
            console.log(`[${new Date().toISOString()}]: Engine Restarted With Network Call due to isolate recycling.`);

            const nextHeaders: Record<string, string> = {
                "content-type": "application/json",
                "x-last-execution-id": lastExecutionId,
                "x-last-execution-at": new Date().toISOString(),
                "x-execution-owner": executionOwner,
                "x-restart": isRestarted ? "true" : "false",
                "x-pooler": poolerMode,
                ...(targetQueue !== undefined && { "x-target-queue": targetQueue })
            }

            await engine.restartForSameIsolate(nextHeaders);

            return {
                message: "Engine Restarted Due To Same Isolate with no time to process.",
                status: 200
            }
        }

        await engine.deleteScheduledRestart(targetQueue ?? "__GLOBAL__");
    }

    if (shouldRecycleIsolate && isV8Isolate) {
        console.log(`[${new Date().toISOString()}] : Scheduling restart for (${targetQueue})`);
        await engine.scheduleRestart(targetQueue as string);

        return {
            message: "Engine Started Successfully",
            status: 200
        }
    }
}