import { QueueFSM } from "../../../fsm/domain/QueueFSM";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "../../RuntimeCacheStorage";
import { LoggerService, type ILogger } from "../../LoggerService";
import { config } from "../../../service/ConfigurationStore";

import type { PulsarEventMap } from "../../../types/events.type";
import type { IEngineContext } from "../context/EngineContext";
import type { IRuntimeExecutionContext } from "../../../runtimes/runtimeTypes";
import type { EngineQueuesConfig } from "../../../types/queue.types";

export class NetworkEventRepository {
    private readonly logger : ILogger;
    private memory : RuntimeCacheStorage;

    constructor(private readonly ctx : IEngineContext) {
        this.logger = new LoggerService();
        this.memory = createRuntimeCacheStorage();
    }

    public onWorkerConnected (_payload : PulsarEventMap["network-socket:worker-connected"]) {}

    public async onWorkerRegistered (paylod : PulsarEventMap["network-socket:worker-queue-register"]) {
        await this.handleWorkerConnectionBack(paylod);
    }

    public onWorkerDisconnected (payload : PulsarEventMap["network-socket:worker-disconnected"]) {
        QueueFSM.handleWorkerDisconnected(payload.queue, payload.remaining);
    }

    public onWorkerAllDisconnected (payload : PulsarEventMap["network-socket:worker-all-disconnected"]) {
        QueueFSM.handleWorkerDisconnected(payload.queue, 0);
    }

    private async handleWorkerConnectionBack({ queue } : PulsarEventMap["network-socket:worker-queue-register"]) {
        const machine = QueueFSM.getMachine(queue);
        const wasWaiting = machine.is('IDLE_WAITING_FOR_WORKER');

        QueueFSM.handleWorkerConnected(queue);

        if(wasWaiting && machine.is("READY")) {
            this.logger.log(`[FSM] : Queue [${queue}] transitioned to READY. Reconciling slots and running catch-up...`);

            await this.ctx.storage.repository.resetAllocatedWorkerSlots(queue);

            const targetQueue = config.get('queues').find(q => q.queue === queue);
            if(!targetQueue) {
                this.logger.error(`Error target queue was not found after FSM state transitioned ${queue}`);
                return;
            }

            if(targetQueue.pooler === "event-driven-pooler") {
                await this.handleEventDrivenQueuesCatchUp(targetQueue);
            }
            else if (targetQueue.pooler === "interval-driven-pooler") {
                await this.runtimeContext.runTick(targetQueue);
            }
        }
    }

    private async handleEventDrivenQueuesCatchUp(baseQueue : EngineQueuesConfig) {
        const { queue } = baseQueue;

        const bufferedEvents = this.memory.kv.get<{ queue : string, at : string }>(`${queue}-buffered-events`);

        if(bufferedEvents) {
            this.logger.log(`[FSM] : Executing tick for queue [${queue}] due to existing event buffer.`);
            await this.runtimeContext.runTick(baseQueue);
            return;
        }

        const metrics = await this.ctx.queueService.getSingleQueueMetrics(queue);

        if(!metrics) {
            this.logger.error(`[Pulsar] : Failed to fetch metrics for ${queue}. Halting queue.`);
            this.logger.error(JSON.stringify(metrics));
            return;
        }

        if(metrics?.total > 0) {
            this.logger.log(`[FSM] : Executing tick for queue [${queue}] as jobs were found during reconciliation.`);
            await this.runtimeContext.runTick(baseQueue);
        }
    }

    private get runtimeContext() {
        const runtimeContext = this.memory.references.get<IRuntimeExecutionContext>('runtime_context');
        if (!runtimeContext) {
            this.logger.error(`[NetworkEventRepository] : Runtime Context could not be found.`);
            throw new Error(`[NetworkEventRepository] : Runtime Context could not be found.`);
        }
        return runtimeContext;
    }
}