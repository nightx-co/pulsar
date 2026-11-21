import { LoggerService, type ILogger } from "../../LoggerService";
import { TIMING_PROFILES, type TimingProfile } from "../../../static/TimingProfile";
import { config } from "../../../service/ConfigurationStore";

import type { PulsarEventMap } from "../../../types/events.type";
import type { IEngineContext } from "../context/EngineContext";

export class QueueEventRepository {
    private readonly logger : ILogger;
    private transitionItems = new Set<string>();

    constructor(private readonly _ctx : IEngineContext) {
        this.logger = new LoggerService();
    }

    public handleTransitionToIdleProfile({ queue : { queue, stateTransitionPolicy } } : PulsarEventMap["queue:transition-profile-to-passive"]) {
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

    public handleTransitionToActiveProfile({ queue : { queue, stateTransitionPolicy, profile } } : PulsarEventMap["queue:transition-profile-to-active"]) {
        this.transitionItems.delete(queue);

        if(stateTransitionPolicy?.enabled) {
            config.modifyQueue(queue, 'profile', profile);
        }

        this.logger.log(`[ENGINE_STATE] Transitioning engine execution profile to ACTIVE. Queue config: (${queue})`);
    }
}