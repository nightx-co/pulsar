import type { EngineQueuesConfig } from "@package/src/types/queue.types";
import { CentralStateMachineRegistry } from "../CentralStateMachineRegistry";

export type EngineLifeCycle = 'ACTIVE' | 'IDLE' | 'SHUTTING_DOWN' | 'SHUTDOWN';

export class EngineFSM {
    private static registry = new CentralStateMachineRegistry();

    private static validTransitions : Record<EngineLifeCycle, EngineLifeCycle[]> = {
        ACTIVE: ['IDLE', 'SHUTTING_DOWN'],
        IDLE : ['ACTIVE', 'SHUTTING_DOWN'],
        SHUTTING_DOWN : ['SHUTDOWN'],
        SHUTDOWN : ['ACTIVE', 'IDLE']
    }

    public static getMachine(queueName : string) {
        return this.registry.getOrCreate<EngineLifeCycle>(
            `queue:${queueName}`,
            'ACTIVE',
            this.validTransitions
        )
    }

    public static handleEmptyTick(queueConfig : EngineQueuesConfig) {
        
    }

    public static handleActiveTick(queueConfig : EngineQueuesConfig) {
        
    }
}