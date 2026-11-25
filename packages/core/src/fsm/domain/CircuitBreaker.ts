import { CentralStateMachineRegistry } from "../CentralStateMachineRegistry";

export type CircuitBreaker = 'OPEN' | 'CLOSED' | 'HALF-OPEN';

/*
    FUTURE IMPLEMENTATION : WE WILL ADD A CIRCUIT BREAKER FOR THE 'DISPATCH TO CONSUMER',
    WHICH BY ADDING WILL PREAVENT THE ENGINE FROM REPEATEDLY DISPATCHING TO FAILED CONSUMER
    AND WASTING RESOURSES. WHAT THE CIRCUIT BREAKER WOULD DO IS, IT WILL TRACK CONSECUTIVE
    FAILED DISPATCH AND IF IT REACHES A CERTEIN THREASHOLD (EX:10) WE WILL OPEN THE CIRCUIT,
    WHICH WILL STOP THE TICK PROCESS AND IT WILL START A NEXT_OPEN_AT TIMER, WHEN IT REACHES
    THE TIMER IT WILL FIRST DO HALF-OPEN FOR THE CIRCUIT BREAKER WHERE THE ENGINE WILL FIRST 
    CHECK HEALTH OF THE CONSUMER BY SENDING 1 REQUEST/EVENT, THIS SINGLE REQUEST/EVENT WILL 
    DETERMINE IF TO OPEN/CLOSE THE CIRCUIT.
*/

export class CircuitBreakerFSM {
    private static registry = new CentralStateMachineRegistry();
    private static consecutiveFailedDispatch : Map<string, number> = new Map();

    private static validTransitions : Record<CircuitBreaker, CircuitBreaker[]> = {
        'HALF-OPEN' : ['CLOSED', 'OPEN'],
        CLOSED : ['HALF-OPEN', 'OPEN'],
        OPEN : ['CLOSED', 'HALF-OPEN']
    }

    public static getMachine(queueName : string) {
        return this.registry.getOrCreate<CircuitBreaker>(
            `queue:${queueName}`,
            'CLOSED',
            this.validTransitions
        )
    }

    public static handleFailedDispatch(queue : string) {
        const existingFailedDispatch = (this.consecutiveFailedDispatch.get(queue) ?? 0);
        this.consecutiveFailedDispatch.set(queue, existingFailedDispatch + 1);

        if((this.consecutiveFailedDispatch.get(queue) ?? 0) > 10) {
            this.getMachine(queue).transition('OPEN');
        }
    }

    public static isClosed(queue : string) {
        return this.getMachine(queue).getState() === 'CLOSED';
    }

    public static isOpen(queue : string) {
        return this.getMachine(queue).getState() === 'OPEN';
    }

    public static isHalfOpen(queue : string) {
        return this.getMachine(queue).getState() === 'HALF-OPEN';
    }

    public static doPartialOpen(queue : string) {
        this.getMachine(queue).transition('HALF-OPEN');
    }
}