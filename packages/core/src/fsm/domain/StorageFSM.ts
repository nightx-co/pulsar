import type { EngineQueuesConfig } from "../../types/queue.types";
import { CentralStateMachineRegistry } from "../CentralStateMachineRegistry";

export type StorageLifeCycle = 'CONNECTED' | 'DISCONNECTED' | 'DISCONNECTING' | 'CONNECTING';

export class StorageFSM {
    private static registry = new CentralStateMachineRegistry();

    private static validTransitions : Record<StorageLifeCycle, StorageLifeCycle[]> = {
        CONNECTED : ['DISCONNECTED', 'DISCONNECTING'],
        CONNECTING : ['CONNECTED', 'DISCONNECTED', 'DISCONNECTING'],
        DISCONNECTED : ['CONNECTED', 'CONNECTING'],
        DISCONNECTING : ['DISCONNECTED']
    }

    public static getMachine(queueName : string) {
        return this.registry.getOrCreate<StorageLifeCycle>(
            `queue:${queueName}`,
            'DISCONNECTED',
            this.validTransitions
        )
    }

    public static handleEmptyTick(queueConfig : EngineQueuesConfig) {
        
    }

    public static handleActiveTick(queueConfig : EngineQueuesConfig) {
        
    }
}