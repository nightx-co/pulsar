import type { NetworkConfig } from "./interfaces/network.types";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import type { QueueService } from "../modules/Queue.module";

import { NetworkInterface } from "./NetworkInterface";
import { BaseNetworkDriver } from "./abstract/BaseNetworkDriver";
import { HttpNetworkDriver } from "./drivers/HttpNetworkDriver";
import { WebSocketNetworkDriver } from "./drivers/WebSocketNetworkDriver";
import { config } from "../service/ConfigurationStore";
import { LoggerService, type ILogger } from "../subsys/LoggerService";
import type { PulsarEventBus } from "../service/PulsarEventBus";

export class UnifiedTransportManager {

    private drivers : BaseNetworkDriver[] = [];
    public readonly topology : NetworkConfig['mode'];
    private networkInterface?: NetworkInterface;
    private readonly isServerMode : boolean;
    private readonly logger : ILogger;

    constructor(private readonly config : NetworkConfig, private storage : PulsarUnifiedStorage, private queueServuce : QueueService) {
        this.topology = config.mode;
        this.isServerMode = config.isServer;

        this.logger = new LoggerService();

        if (this.isServerMode) this.initializeTopology();
        else this.initializeClientTopology();
    }

    private initializeTopology() {
        this.networkInterface = new NetworkInterface(this.config);

        if (this.config.mode === "websocket" || this.config.mode === "hybrid") {
            this.drivers.push(new WebSocketNetworkDriver(this.config, this.networkInterface));
        }

        if (this.config.mode === "http" || this.config.mode === "hybrid") {
            this.drivers.push(new HttpNetworkDriver(this.config, this.networkInterface, this.storage, this.queueServuce));
        }
    }

    private initializeClientTopology() {
        this.drivers.push(new HttpNetworkDriver(this.config, undefined as any, this.storage, this.queueServuce));
    }

    public async bootAll() {
        if (!this.isServerMode || !this.networkInterface) return;

        await this.networkInterface.start();

        for (const driver of this.drivers) {
            await driver.start();
        }
    }

    public async shutdownAll() {
        if (!this.isServerMode) return;
        
        for (const driver of this.drivers) {
            await driver.stop();
        }
        
        await this.networkInterface?.close();
    }

    public onTrigger(onTrigger: (queue : string, data : any) => void) {
        for (const driver of this.drivers) {
            driver.onTrigger(onTrigger);
        }
    }

    public async dispatchToNetwork(queue : string, payload : any) {
        const targetQueue = config.get('queues').find(q => q.queue === queue)!;

        const interfaceMap : Record<string, string> = {
            http: "HTTP",
            socket: "WEBSOCKET"
        }

        const consumerType = targetQueue.consumer.type;
        const targetInterface = interfaceMap[consumerType];

        if (!targetInterface) {
            throw new Error(`[DispatchToNetwork] : Unsupported consumer type "${consumerType}" for queue: "${queue}"`);
        }

        for (const driver of this.drivers) {
            if (driver.interface === targetInterface) {
                await driver.broadcast(queue, payload, targetQueue.consumer.optimizePayload ?? true);
            }
        }

        const matched = this.drivers.filter(d => d.interface === targetInterface);

        if (matched.length === 0) {
            this.logger.error(`[DispatchToNetwork] : No "${targetInterface}" driver available for queue "${queue}" (mode: ${this.topology}, server: ${this.isServerMode})`);            
            throw new Error(`[DispatchToNetwork] : No "${targetInterface}" driver available for queue "${queue}" (mode: ${this.topology}, server: ${this.isServerMode})`);
        }
    }
}