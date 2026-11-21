import { CentralStateMachineRegistry } from "../CentralStateMachineRegistry";

export type QueueLifecycleState = 'IDLE_WAITING_FOR_WORKER' | 'READY' | 'DRAINING';

export class QueueFSM {
    private static registry = new CentralStateMachineRegistry();

    private static validQueueTransitions : Record<QueueLifecycleState, QueueLifecycleState[]> = {
        IDLE_WAITING_FOR_WORKER: ['READY', 'DRAINING'],
        READY: ['IDLE_WAITING_FOR_WORKER', 'DRAINING'],
        DRAINING: ['IDLE_WAITING_FOR_WORKER']
    }

    public static getMachine(queueName: string) {
        return this.registry.getOrCreate<QueueLifecycleState>(
            `queue:${queueName}`,
            'IDLE_WAITING_FOR_WORKER',
            this.validQueueTransitions
        )
    }

    public static canExecuteTick(queueName: string) : boolean {
        const machine = this.getMachine(queueName);
        return machine.is('READY');
    }

    public static handleWorkerConnected(queueName : string) {
        const machine = this.getMachine(queueName);
        if (machine.is('IDLE_WAITING_FOR_WORKER')) {
            machine.transition('READY');
        }
    }

    public static handleWorkerDisconnected(queueName : string, activeWorkerCount : number) {
        const machine = this.getMachine(queueName);
        if (activeWorkerCount === 0 && machine.is('READY')) {
            machine.transition('IDLE_WAITING_FOR_WORKER');
        }
    }
}