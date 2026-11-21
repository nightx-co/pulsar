import { StateMachine } from "./FiniteStateMachine";

export class CentralStateMachineRegistry {
    private machines = new Map<string, StateMachine<any>>();

    public getOrCreate<TState extends string>(key : string, initialState : TState, validTransitions? : Record<TState, TState[]>) : StateMachine<TState> {
        if (!this.machines.has(key)) {
            this.machines.set(key, new StateMachine<TState>(initialState, validTransitions));
        }
        return this.machines.get(key) as StateMachine<TState>;
    }

    public get<TState extends string>(key : string) : StateMachine<TState> | undefined {
        return this.machines.get(key) as StateMachine<TState> | undefined;
    }

    public remove(key : string) : boolean {
        return this.machines.delete(key);
    }
}