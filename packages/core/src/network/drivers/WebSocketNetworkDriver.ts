import msgpack from '@msgpack/msgpack';
import { PulsarEventBus } from '../../service/PulsarEventBus';
import { BaseNetworkDriver } from "../abstract/BaseNetworkDriver";
import { config } from '../../service/ConfigurationStore';

import type { Peer, Message } from "crossws";
import type { NetworkConfig } from "../interfaces/network.types";
import type { NetworkInterface } from "../NetworkInterface";

export class WebSocketNetworkDriver extends BaseNetworkDriver {
    public override readonly interface = "WEBSOCKET";

    private queuePeers = new Map<string, Set<Peer>>();
    private readonly queueCursors = new Map<string, number>();
    private triggerHandler?: (queue : string, data : any) => void;

    private boundOpen = (peer : Peer) => this.onConnectionOpen(peer);
    private boundMessage = (peer : Peer, message : Message) => this.onMessage(peer, message);
    private boundClose = (peer : Peer) => this.onConnectionClose(peer);

    constructor(config : NetworkConfig, private networkInterface : NetworkInterface) {
        super(config);

        this.networkInterface.on("open", this.boundOpen);
        this.networkInterface.on("message", this.boundMessage);
        this.networkInterface.on("close", this.boundClose);
    }

    public override async start() {}

    public override async broadcast(queue : string, payload : any, optimizePayload : boolean) {
        const peers = this.queuePeers.get(queue);
        if (!peers || peers.size === 0) {
            this.queueCursors.delete(queue);
            this.logger.warn(`[Network] : No active workers listening on queue: ${queue}`);
            return;
        }

        const peerList = Array.from(peers);
        const encoded = msgpack.encode({ type : 'DISPATCH_BATCH', data : payload });
        const start = (this.queueCursors.get(queue) ?? 0) % peerList.length;

        for (let i = 0; i < peerList.length; i++) {
            const index = (start + i) % peerList.length;
            const peer = peerList[index];
    
            if(!peer) {
                this.logger.error(`[Network] : Failed to send message to peer (${i}), moving to next:`);
                continue;
            }

            try {
                peer.send(encoded);
                this.queueCursors.set(queue, (index + 1) % peerList.length);
                return;
            }
            catch (err) {
                this.logger.error(`[Network] : Failed to send message to peer ${peer.id}, trying next:`, err);
            }
        }
    
        throw new Error(`[Network] : Failed to deliver batch to any peer on queue: ${queue}`);
    }

    public onTrigger(handler: (queue : string, data : any) => void) {
        this.triggerHandler = handler;
    }

    public override async stop() {
        this.networkInterface.off("open", this.boundOpen);
        this.networkInterface.off("message", this.boundMessage);
        this.networkInterface.off("close", this.boundClose);

        for (const peers of this.queuePeers.values()) {
            for (const peer of peers) {
                try { peer.close(1001, "server shutting down"); } catch {}
            }
        }

        this.queuePeers.clear();
    }

    private onConnectionOpen(peer : Peer) {
        this.logger.log("[Network] : Worker connected:", peer.id);
        PulsarEventBus.emit("network-socket:worker-connected", { id : peer.id, at : new Date().toISOString() });
    }

    private onMessage(peer : Peer, message : Message) {
        const data = JSON.parse(message.toString());

        data.type === "REGISTER" ?
            this.handleWorkerRegistration(peer, data) :
            this.handleWorkerMessage(data);
    }

    private handleWorkerRegistration(peer : Peer, data : { type : "REGISTER", data : { queue : string, api_key : string } }) {
        const { api_key, queue } = data.data;

        let peersSet = this.queuePeers.get(queue);

        if (!peersSet) {
            peersSet = new Set<Peer>();
            this.queuePeers.set(queue, peersSet);
        }

        if (peersSet.has(peer)) {
            this.logger.log(`[Network] : Worker ${peer.id} is already registered to queue: ${queue}`);
            peer.send(msgpack.encode({
                type : "SOMETHING_WRONG",
                data : { peer_id : peer.id },
                message : `already registered to queue: ${queue}`,
                err : null,
                status : 400
            }));
            return;
        }

        if((api_key ?? '') !== config.get('apiKey')) {
            peer.send(msgpack.encode({
                type : "SOMETHING_WRONG",
                data : { peer_id : peer.id },
                message : `UNAUTHORIZED Invalid API Key`,
                err : null,
                status : 401
            }));
            return;
        }

        peer.send(msgpack.encode({ type : "STORAGE_BIND", data : { instance_id : config.get('instanceId') } }));

        PulsarEventBus.emit("network-socket:worker-queue-register", { id : peer.id, queue : queue });
        peer.subscribe(queue);
        peersSet.add(peer);

        this.memory.lists.add(queue, peer.id);

        this.logger.log(`[Network] : Worker ${peer.id} registered to queue: ${queue}`);
    }

    private handleWorkerMessage(data : any) {
        if (this.triggerHandler) {
            const queue = data.queue;
            const payload = data.data !== undefined ? data?.data : data;
            if (queue) {
                this.triggerHandler(queue, payload);
            }
        }
    }

    private onConnectionClose(peer : Peer) {
        this.logger.log("[Network] : [WebSocketNetworkDriver] - Worker disconnected:", peer.id);

        for (const [queue, peers] of this.queuePeers.entries()) {
            if (peers.has(peer)) {
                peers.delete(peer);
                this.memory.lists.remove(queue, peer.id);
                PulsarEventBus.emit("network-socket:worker-disconnected", { id : peer.id, queue, remaining : this.queuePeers.size });

                if (peers.size === 0) {
                    PulsarEventBus.emit("network-socket:worker-all-disconnected", { id : peer.id, queue });
                    this.queuePeers.delete(queue);
                }
            }
        }
    }
}