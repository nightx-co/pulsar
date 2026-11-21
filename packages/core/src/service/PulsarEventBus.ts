import type { PulsarEventMap } from "../types/events.type";

export class PulsarEventBus {
    private static target = new EventTarget();
    private static pending = new Set<Promise<unknown>>();

    private static track(p : Promise<unknown>) {
        const tracked = p
            .catch(err => console.error('[EventBus] :  handler failed - ', err))
            .finally(() => PulsarEventBus.pending.delete(tracked));
        
        PulsarEventBus.pending.add(tracked);
    }

    public static emit<K extends keyof PulsarEventMap>(event : K, payload : PulsarEventMap[K]) : void {
        PulsarEventBus.target.dispatchEvent(new CustomEvent(event, { detail: payload }));
    }

    public static on<K extends keyof PulsarEventMap>(event : K, handler : (payload : PulsarEventMap[K]) => Promise<void> | void) : () => void {
        const listener = (e : Event) => {
            const result = handler((e as CustomEvent<PulsarEventMap[K]>).detail);
            if (result instanceof Promise) this.track(result);
        }

        PulsarEventBus.target.addEventListener(event, listener as EventListener);
        return () => PulsarEventBus.target.removeEventListener(event, listener as EventListener);
    }

    public static once<K extends keyof PulsarEventMap>(event : K, handler: (payload : PulsarEventMap[K]) => Promise<void> | void) : void {
        const listener = (e: Event) => handler((e as CustomEvent<PulsarEventMap[K]>).detail);
        PulsarEventBus.target.addEventListener(event, listener as EventListener, { once: true });
    }

    public static async drain() {
        while (PulsarEventBus.pending.size > 0) {
            await Promise.allSettled([...PulsarEventBus.pending]);
        }
    }
}