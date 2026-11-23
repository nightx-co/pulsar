import { PulsarEventBus } from "../../service/PulsarEventBus";
import { TickEventRepository } from "./repositories/TickEventRepository";
import { NetworkEventRepository } from "./repositories/NetworkEventRepository";
import { QueueEventRepository } from "./repositories/QueueEventRepository";

import type { IEngineContext } from "./context/EngineContext";
import type { PulsarEventMap } from "../../types/events.type";

export class EventSubscriptionModule {
    private eventCleanUps : Array<() => void> = [];
    private tickEventRepo : TickEventRepository;
    private networkEventRepo : NetworkEventRepository;
    private queueEventRepo : QueueEventRepository;

    constructor(ctx : IEngineContext) {
        this.tickEventRepo = new TickEventRepository(ctx);
        this.networkEventRepo = new NetworkEventRepository(ctx);
        this.queueEventRepo = new QueueEventRepository(ctx);
    }

    public start() {
        // tick
        this.subscribe("tick:cycle-completed", (payload) => this.tickEventRepo.onCycleCompleted(payload));
        this.subscribe("tick:force-run", (payload) => this.tickEventRepo.onForceRun(payload));
        this.subscribe("tick:end", (payload) => this.tickEventRepo.onTickEnd(payload));
        this.subscribe("tick:time-exceeded", () => this.tickEventRepo.onTimeExceeded());

        // queue
        this.subscribe("queue:transition-profile-to-active", (payload) => this.queueEventRepo.handleTransitionToActiveProfile(payload));
        this.subscribe("queue:transition-profile-to-passive", (payload) => this.queueEventRepo.handleTransitionToIdleProfile(payload));

        // network
        this.subscribe("network-socket:worker-connected", (payload) => this.networkEventRepo.onWorkerConnected(payload));
        this.subscribe("network-socket:worker-queue-register", (payload) => this.networkEventRepo.onWorkerRegistered(payload));
        this.subscribe("network-socket:worker-disconnected", (payload) => this.networkEventRepo.onWorkerDisconnected(payload));
        this.subscribe("network-socket:worker-all-disconnected", (payload) => this.networkEventRepo.onWorkerAllDisconnected(payload));
        
        // miscellaneous
        this.subscribe("engine:health-check-requested", () => this.tickEventRepo.onHealthCheckRequested());
    }

    private subscribe<K extends keyof PulsarEventMap>(event : K, listener: (payload : PulsarEventMap[K]) => void) {
        const unsubscribe = PulsarEventBus.on(event, listener as any);
        this.eventCleanUps.push(unsubscribe);
    }

    public removeRegisteredEvents () {
        this.eventCleanUps.forEach((cleanup) => cleanup());
        this.eventCleanUps = [];
    }
}