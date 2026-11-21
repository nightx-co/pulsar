import type { EngineQueuesConfig } from "../types/queue.types";

export type PulsarEventMap = {
    "tick:time-exceeded" : { queue : string; elapsedMs : number };
    "tick:cycle-completed" : { queue : string; cycles : number };
    "tick:force-run" : { queue : EngineQueuesConfig; reason? : string };
    "tick:end" : { queue : string; reason? : string };
    
    "queue:transition-profile-to-passive" : { queue : EngineQueuesConfig };
    "queue:transition-profile-to-active" : { queue : EngineQueuesConfig };
    
    "engine:shutdown-requested" : { reason : string };
    "engine:health-check-requested" : { timestamp : number };

    "network-socket:worker-connected" : { id : string, at : string };
    "network-socket:worker-disconnected" : { id : string, queue : string, remaining : number };
    "network-socket:worker-queue-register" : { id : string, queue : string };
    "network-socket:worker-all-disconnected" : { id : string, queue : string };
}