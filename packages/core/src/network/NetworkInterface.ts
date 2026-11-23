import { serve } from "crossws/server";
import EventEmitter from "eventemitter3";
import { LoggerService } from "../subsys/LoggerService";

import type { Server, ServerHandler } from "srvx";
import type { NetworkConfig } from "./interfaces/network.types";
import type { ILogger } from "../subsys/LoggerService";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "../subsys/RuntimeCacheStorage";

export class NetworkInterface extends EventEmitter {
    private serverInstance : Server<ServerHandler> = null as any;
    private logger : ILogger;
    private store : RuntimeCacheStorage;

    public onFetch?: (request : Request) => Promise<Response> | Response;

    constructor(private readonly config : NetworkConfig) {
        super();
        this.logger = new LoggerService();
        this.store = createRuntimeCacheStorage();
    }

    public async start() {
        const self = this;

        this.logger.log(`[Network] : Initializing server on port ${this.config.port} in [${this.config.mode}] mode`);

        const openWebSocket = this.config.mode === "hybrid" || this.config.mode === "websocket";

        if (openWebSocket) {
            this.logger.log(`[Network] : WebSocket server handlers attached on port ${this.config.port}`);
        }

        this.serverInstance = serve({
            port : this.config.port,
            ...(openWebSocket ? {
                websocket: {
                    open(peer) { 
                        self.emit("open", peer); 
                    },
                    message(peer, message) { 
                        self.emit("message", peer, message); 
                    },
                    close(peer, event) { 
                        self.emit("close", peer, event); 
                    },
                },
            } : {}),
            fetch(request) {
                if (self.onFetch) {
                    return self.onFetch(request);
                }
                self.logger.warn(`[Network] : Unhandled route accessed: ${request.method} ${request.url}`);
                return new Response(null, { status: 404 });
            },
            gracefulShutdown: false,
            maxRequestBodySize: undefined,
        })

        this.store.kv.set('self_url', this.serverInstance.url);

        await this.serverInstance.ready();
        this.logger.log(`[Server] Successfully started and listening on port ${this.config.port}`);
    }

    public async close() {
        try {
            await this.serverInstance?.close(true);
        }
        catch (err) {
            this.logger.error(`[Network] : Error closing server:`, err);
        }
    }
}