export class IsolateInstance {
    constructor(private MAX_ISOLATE_LIFESPAN_SEC : number) {
        this.set("isolate_id", crypto.randomUUID());
        this.set("isolate_start_time", Date.now());
        this.set("isolate_max_life_span_sec", this.MAX_ISOLATE_LIFESPAN_SEC * 1000);
    }

    public isSameIsolate(id : string) : boolean {
        return id === this.get<string>("isolate_id");
    }

    get id () : string {
        return this.get<string>("isolate_id") ?? crypto.randomUUID();
    }

    get remainingTime() : number {
        const startTime = this.get<number>("isolate_start_time");
        const maxSpan = this.get<number>("isolate_max_life_span_sec") ?? this.MAX_ISOLATE_LIFESPAN_SEC * 1000;

        if (typeof startTime !== "number") {
            return maxSpan;
        }

        const elapsed = Date.now() - startTime;
        return Math.max(0, maxSpan - elapsed);
    }

    get uptime() : number {
        const startTime = this.get<number>("isolate_start_time");
        return typeof startTime === "number" ? Date.now() - startTime : 0;
    }

    get maxTime() : number {
        return this.get<number>("isolate_max_life_span_sec") ?? this.MAX_ISOLATE_LIFESPAN_SEC * 1000;
    }

    set<T = unknown>(key: string, value: T) : void {
        (globalThis as Record<string, unknown>)[key] = value;
    }

    get<T = unknown>(key: string) : T | undefined {
        return (globalThis as Record<string, unknown>)[key] as T;
    }
}