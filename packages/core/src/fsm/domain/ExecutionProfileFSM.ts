import type { EngineQueuesConfig } from "@package/src/types/queue.types";
import { PulsarEventBus } from "../../service/PulsarEventBus";
import { CentralStateMachineRegistry } from "../CentralStateMachineRegistry";

export type ProfileLifeCycle = 'ACTIVE' | 'PASSIVE';

export class ExecutionProfileSwitcherFSM {
    private static registry = new CentralStateMachineRegistry();
    private static consecutiveEmptyTicks : Map<string, number> = new Map();

    private static validTransitions : Record<ProfileLifeCycle, ProfileLifeCycle[]> = {
        ACTIVE: ['PASSIVE'],
        PASSIVE: ['ACTIVE']
    }

    public static getQueueMachine(queueName : string) {
        return this.registry.getOrCreate<ProfileLifeCycle>(
            `queue:${queueName}`,
            'ACTIVE',
            this.validTransitions
        )
    }

    public static handleEmptyTick(queueConfig : EngineQueuesConfig) {
        const { queue, stateTransitionPolicy } = queueConfig;
        if (!stateTransitionPolicy?.enabled) return;

        const threshold = stateTransitionPolicy.idleThresholdTicks ?? 10;
        const currentTicks = (this.consecutiveEmptyTicks.get(queue) ?? 0) + 1;
        this.consecutiveEmptyTicks.set(queue, currentTicks);

        const machine = this.getQueueMachine(queue);

        if (currentTicks >= threshold && machine.is("ACTIVE")) {
            machine.transition('PASSIVE');
            PulsarEventBus.emit('queue:transition-profile-to-passive', { queue : queueConfig });
        }
    }

    public static handleActiveTick(queueConfig : EngineQueuesConfig) {
        const { queue, stateTransitionPolicy } = queueConfig;
        if (!stateTransitionPolicy?.enabled) return;

        const currentTicks = this.consecutiveEmptyTicks.get(queue) ?? 0;

        if (currentTicks > 0) {
            this.consecutiveEmptyTicks.set(queue, 0);

            const machine = this.getQueueMachine(queue);
            if (machine.is("PASSIVE")) {
                machine.transition('ACTIVE');
                PulsarEventBus.emit('queue:transition-profile-to-active', { queue : queueConfig });
            }
        }
    }
}