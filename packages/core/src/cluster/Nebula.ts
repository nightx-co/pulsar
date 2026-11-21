import type { EngineSwarmConfig } from "../types/base.types.ts";
import type { QueueModule } from "../helpers/defineQueue";
import type { Pulsar } from "../service/Pulsar.service";

interface ICallback {
    status : 'OK' | 'ERR',
    initialized_at : string,
    configurations : {
        queues : QueueModule[];
        swarmConfig?: EngineSwarmConfig;
        clusterMeta? : { id : string, idempotency?: string, session_id : string, dispose_at : number }
    }
}

class NebulaClient {
    private connectionState : {
        instanceId : string,
        connectionMethod : "HTTPS" | "SOCKET",
        url : string
    } = { connectionMethod : "HTTPS", instanceId : "UNINITIALIZED", url : '' }

    constructor() {}

    public async connect (instanceId : string, connectionMethod : "HTTPS" | "SOCKET" = "HTTPS", url : string) {
        this.connectionState.instanceId = instanceId;
        this.connectionState.connectionMethod = connectionMethod;
        this.connectionState.url = url;
    }

    private async initiateHandshake() {
        if(this.connectionState.connectionMethod == "HTTPS") {
            const response = await fetch(`${this.connectionState.url}/handshake`, {
                method : "GET",
                headers : {
                    'content-type' : "application/json",
                    'x-instance-id' : this.connectionState.instanceId,
                    'x-handshake-time' : new Date().toISOString(),
                }
            })

            if(response.status !== 200) {
                throw new Error(JSON.stringify(response));
            }

            const configurations = await response.json() as ICallback;

            if(!configurations) {
                throw new Error('invalid body recived during nebula fetch request handshake');
            }

            return configurations;
        }
    }

    public wrap(callback: (args: ICallback["configurations"]) => Pulsar) {
        return { 
            start: async () => {
                const handshakeResponse = await this.initiateHandshake();

                if(!handshakeResponse) {
                    throw new Error(`Error initializing handshake with [Nebula] : handshake response is missing`);
                }

                const engine : Pulsar = callback(handshakeResponse.configurations);

                return engine.start();
            },

            destory: async () => {

            }
        }
    }
}

export const Nebula = new NebulaClient();