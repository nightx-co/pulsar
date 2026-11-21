import type { EngineQueuesConfig } from "../types/queue.types";
import type { ILogger } from "./LoggerService";
import { TIMING_PROFILES, type TimingProfile } from "../static/TimingProfile";
import { config } from "../service/ConfigurationStore";

export class ExecutionProfileSwitcher {
    private transitionItems = new Set<string>();

    constructor(private logger : ILogger) {}

    transitionToIdleMode({ queue, stateTransitionPolicy } : EngineQueuesConfig) {
        if(this.transitionItems.has(queue)) return;
        this.transitionItems.add(queue);

        this.logger.log(`[ENGINE_STATE] Transitioning engine execution profile to IDLE. Queue config: (${queue})`);

        if(stateTransitionPolicy?.enabled) {
            const rawProfile = stateTransitionPolicy.idleTimingProfile;

            if (rawProfile) {
                const idleProfile : TimingProfile = typeof rawProfile === "object"
                    ? {
                        activePollMs: rawProfile.activePollMs,
                        backoffPollMs: rawProfile.backoffPollMs,
                        idlePollMs: rawProfile.idlePollMs,
                    } as TimingProfile
                    : TIMING_PROFILES[rawProfile as keyof typeof TIMING_PROFILES];

                config.modifyQueue(queue, 'profile', idleProfile);
            }
        }
    }

    transitionToActiveMode({ queue, profile, stateTransitionPolicy } : EngineQueuesConfig) {
        this.transitionItems.delete(queue);

        if(stateTransitionPolicy?.enabled) {
            config.modifyQueue(queue, 'profile', profile);
        }

        this.logger.log(`[ENGINE_STATE] Transitioning engine execution profile to ACTIVE. Queue config: (${queue})`);
    }
}