import { LoggerService, type ILogger } from "../../subsys/LoggerService";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "../../subsys/RuntimeCacheStorage";
import type { NetworkConfig } from "../interfaces/network.types";

export abstract class BaseNetworkDriver {
    protected isRunning : boolean = false;
    protected logger : ILogger;

    public abstract interface : "WEBSOCKET" | "HTTP";

    /** Runtime Storage */
    protected memory : RuntimeCacheStorage;

    constructor(protected readonly config : NetworkConfig) {
        this.logger = new LoggerService();
        this.memory = createRuntimeCacheStorage();
    }

    public abstract start() : Promise<void>;
    public abstract stop() : Promise<void>;
    public abstract broadcast(queue : string, payload : any, optimizePayload : boolean) : Promise<void>;
    public abstract onTrigger(handler: (queue: string, data: any) => void) : void;
}