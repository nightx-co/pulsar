export type StateChangeListener<TState extends string> = (from : TState, to : TState) => void;

export class StateMachine<TState extends string> {
    private currentState : TState;
    private allowedTransitions : Map<TState, Set<TState>>;
    private listeners : Set<StateChangeListener<TState>> = new Set();

    constructor(initialState : TState, validTransitions? : Record<TState, TState[]>) {
        this.currentState = initialState;
        this.allowedTransitions = new Map();

        if (validTransitions) {
            for (const [from, tos] of Object.entries(validTransitions) as [TState, TState[]][]) {
                this.allowedTransitions.set(from, new Set(tos));
            }
        }
    }

    public getState() : TState {
        return this.currentState;
    }

    public is(state : TState) {
        return this.currentState === state;
    }

    public transition(newState : TState) : boolean {
        if (this.currentState === newState) {
            return false;
        }

        if (this.allowedTransitions.size > 0) {
            const allowed = this.allowedTransitions.get(this.currentState);
            if (!allowed || !allowed.has(newState)) {
                throw new Error(`Invalid state transition from [${this.currentState}] to [${newState}]`);
            }
        }

        const previousState = this.currentState;
        this.currentState = newState;

        for (const listener of this.listeners) {
            listener(previousState, newState);
        }

        return true;
    }

    public subscribe(listener : StateChangeListener<TState>) : () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        }
    }
}