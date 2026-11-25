export class IsolateInstance {
    
    constructor(private readonly maxLifespanSec : number) {
        if (this.get<number>("isolate_start_time_ms") === undefined) {
            this.set("isolate_id", crypto.randomUUID());
            this.set("isolate_start_time_ms", Date.now());
        }

      this.set("isolate_max_lifespan_sec", maxLifespanSec);
    }
  
    public isSameIsolate(id : string) : boolean {
        return id === this.id;
    }
  
    get id() {
        let id = this.get<string>("isolate_id");
        if (!id) {
            id = crypto.randomUUID();
            this.set("isolate_id", id);
        }
        return id;
    }
  
    get maxTimeSec() {
        return this.get<number>("isolate_max_lifespan_sec") ?? this.maxLifespanSec;
    }
  
    get uptimeSec() {
        const startMs = this.get<number>("isolate_start_time_ms");
        return typeof startMs === "number" ? (Date.now() - startMs) / 1000 : 0;
    }
  
    get remainingTimeSec() {
        return Math.max(0, this.maxTimeSec - this.uptimeSec);
    }
  
    get isExpired() : boolean {
        return this.uptimeSec >= this.maxTimeSec;
    }
  
    set<T = unknown>(key : string, value : T) {
        (globalThis as Record<string, unknown>)[key] = value;
    }
  
    get<T = unknown>(key : string) : T | undefined {
        return (globalThis as Record<string, unknown>)[key] as T | undefined;
    }
}