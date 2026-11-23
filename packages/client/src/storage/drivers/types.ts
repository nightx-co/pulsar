export interface StorageHealth {
    status : "up" | "down" | "degraded";
    latencyMs : number;
    details? : Record<string, any>;
}

export interface IPulsarDriver {
    readonly type: "cache" | "database";
    readonly name: string;

    connect() : Promise<void>;
    disconnect() : Promise<void>;
    healthCheck() : Promise<StorageHealth>;
    
    setKeyPrefix(instanceId : string) : void;

    getNativeClient<T = any>() : T;
}

export type RedisDriverOptions = {
    connectionString : string;
    protocol : "tcp";
} | { protocol : "http"; token : string, url : string };

export interface PostgresDriverOptions {
    connectionString : string;
    connectionProtocol : "tcp" | "transactional" | "session";
}