import { IsolateInstance } from "../service/Isolate.service.ts";
import type { NetworkConfig } from "../network/interfaces/network.types.ts";
import type { BaseEngineConfig } from "./base.types.ts";
import type { PersistentEngine, SelfInvokingEngine } from "./engine.types.ts";
import type { EventTriggerStrategy } from "./eventTriggerStrategry.types.ts";

/**
 * Supported runtime execution environments for Pulsar.
 */
export enum PulsarRuntime {
    /**
     * Configuration for ephemeral V8 isolate environments (Cloudflare Workers, Supabase Edge, Deno Deploy).
     * 
     * In V8 isolate platforms, incoming requests share the same warm memory space until the isolate shuts down.
     * The engine relies on the required `isolate` instance to monitor remaining isolate lifespan, handle dynamic global 
     * state, and sync tick schedules before the V8 isolate gets terminated by the cloud provider.
     */
    V8_ISOLATE = "v8-isolate",
    
    /**
     * Configuration for containerized or persistent runtime environments (AWS Lambda, GCP Cloud Run, Docker, Node.js VMs).
     * 
     * Unlike V8 isolates, these environments operate in dedicated process/container sandboxes with predictable execution limits
     * or persistent process lifetimes. Tracking V8 isolate memory and remaining uptime across HTTP invocations is not strictly required.
     */
    SERVERLESS_VM = "serverless-vm",

    /**
     * Configuration for traditional, long-running persistent environments (AWS EC2, VPS, Dedicated Servers, local Node.js processes).
     * 
     * Unlike ephemeral isolates or serverless containers that spin down between invocations, persistent runtimes maintain an uninterrupted 
     * execution context and continuous process lifespan. The engine can rely on background event loops, stateful in-memory caching, 
     * and non-ephemeral scheduling without relying on cloud provider lifecycle hooks.
     */
    PERSISTENT = "persistent"
}

export type PulsarRuntimeType = typeof PulsarRuntime[keyof typeof PulsarRuntime];

export type ConfigForRuntime<T extends PulsarRuntimeType> = 
    T extends typeof PulsarRuntime.V8_ISOLATE ? V8IsolateConfig :
    T extends typeof PulsarRuntime.SERVERLESS_VM ? ServerlessVMConfig :
    PersistentConfig;

export type V8IsolateConfig = BaseEngineConfig & {
    runtime : typeof PulsarRuntime.V8_ISOLATE;
    engine: SelfInvokingEngine;
    /**
    * Active isolate tracking instance.
    */
    isolate : IsolateInstance;
}

export type ServerlessVMConfig = BaseEngineConfig & {
    runtime : typeof PulsarRuntime.SERVERLESS_VM;
    engine: SelfInvokingEngine;
    timeoutSec : number;
    /**
    * Optional isolate tracking instance if custom lifecycle tracking is desired inside Lambda or containerized workers.
    */
    isolate? : IsolateInstance;
}

export type PersistentConfig = BaseEngineConfig & {
    runtime : typeof PulsarRuntime.PERSISTENT;
    
    /**
    * Optional isolate tracking instance if custom lifecycle tracking is desired inside Lambda or containerized workers.
    */
    isolate? : IsolateInstance;

    networkInterface : {
        /**
         * Determines the operational network mode of the server.
         * 
         * - `http`: Opens an HTTP server. Crucial for consumers running dependent workers 
         *   (e.g., when a consumer cannot initialize local storage configuration directly). 
         *   Dependent workers use this HTTP server for acks, retries, etc. 
         *   *(Note: This mode introduces latency and throughput limitations).*
         * 
         * - `socket`: Opens a WebSocket server. Both the pulsar and consumers connect to 
         *   this socket to transport and dispatch jobs. Provides near-realtime job dispatch 
         *   performance for workers.
         * 
         * - `hybrid`: Opens both HTTP and WebSocket servers simultaneously. Ideal for 
         *   multi-runtime deployed consumers where some instances operate in serverless 
         *   functions and others on a VPS, allowing each consumer to select its optimal 
         *   server option based on its specific configuration.
        */
        mode : Exclude<NetworkConfig["mode"], "client">;
        /**
         * The port number on which the server instance will listen for incoming traffic.
        */
        port : NetworkConfig["port"];
        /**
         * Optional hostname or IP address to bind the server to.
        */
        host? : NetworkConfig["host"];
    }
    
    eventTriggerStrategy : typeof EventTriggerStrategy[keyof typeof EventTriggerStrategy];
    engine : PersistentEngine;
}