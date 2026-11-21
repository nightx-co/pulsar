import { config } from "../service/ConfigurationStore";
import { QueueFSM } from "../fsm/domain/QueueFSM";
import { createRuntimeCacheStorage, type RuntimeCacheStorage } from "./RuntimeCacheStorage";

import type { ILogger } from "./LoggerService";
import type { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import type { IRuntimeExecutionContext } from "../runtimes/runtimeTypes";
import type { EngineQueuesConfig } from "../types/queue.types";

export class RuntimeEventBridge {
    private readonly pgNotifyChannel = 'channel_pulsar_event_driven_queue' as const;
    private memory : RuntimeCacheStorage;

    private consecutiveEmptyPools : number = 0;
    private readonly lastLogged = new Map<string, string>()

    constructor (
        protected readonly storage : PulsarUnifiedStorage,
        protected readonly logger : ILogger,
        protected readonly runtimeExecutionId : string
    ) {
        this.memory = createRuntimeCacheStorage();
    }

    public async registerPgNotifyHandler(ctx : IRuntimeExecutionContext) {
        await this.storage.ops.subscribeToDatabaseEvents<{ queue_name : string, fencing_token : string, notified_at : string }>(this.pgNotifyChannel, async (event) => {
            this.logger.log(`[Persistent Runtime] : Recived PgNotification Event - ${new Date().toISOString()}`);
            
            const targetQueue = config.get('queues').find(q => q.queue === event.queue_name);
            if(!targetQueue) {
                this.logger.error(`[Persistent Runtime] : Received notification for unregistered or unmanaged queue: '${event.queue_name}' on channel: ${this.pgNotifyChannel}`);
                return;
            }

            this.lastLogged.delete(targetQueue.queue);

            const canTrigger = await this.handleTriggerValidity(targetQueue.queue, event.fencing_token);

            if(canTrigger) {
                await ctx.runTick(targetQueue);
            }
        }, () => {
            this.logger.log(`[Persistent Runtime] : Successfully established PostgreSQL notification listener on channel : ${this.pgNotifyChannel}`);
        })
    }

    public async registerPollingHandler(ctx : IRuntimeExecutionContext) {
        this.consecutiveEmptyPools = 0;

        // future implentation
        // after (x) consecutive empty pools it wll shift to resourse saving mode
        // that would be, insdate of fetching entries every interval it would do it
        // by 10:5 ratio or 50% of the time would fetch be called out of 100%
        // maybe make ExecutionProfileFSM universal so it supports both queue profile tranistion and pooling transistion

        setInterval(async () => {
            for(const edpQueue of config.get('queues').filter(q => q.pooler === "event-driven-pooler")) {
                const entries = await this.storage.ops.getPollingQueueEntries(edpQueue.queue);

                if (!entries || entries.length === 0) {
                    this.consecutiveEmptyPools++;
                    continue;
                }

                for(const entry of entries) {
                    const queueName = entry.payload.queue_name;
                    const fencingToken = entry.payload.fencing_token;

                    const queue = await this.handleTriggerValidity(queueName, fencingToken);

                    if(queue) {
                        this.lastLogged.delete(queueName);
                        await ctx.runTick(queue);
                        await this.storage.ops.deletePollingQueueEntry(entry.id);
                    }
                }
            }
        }, config.get("engine.poolingIntervalMS"));
    }

    public async httpEventDrivenQueueTrigger(queueName : string, fencingToken : string, ctx : IRuntimeExecutionContext) {
        const targetQueue = config.get('queues').find(q => q.queue === queueName);

        if(!targetQueue) {
            this.logger.error(`[Persistent Runtime] : Received notification for unregistered or unmanaged queue : '${queueName}' on channel : ${this.pgNotifyChannel}`);
            return;
        }

        this.lastLogged.delete(targetQueue.queue);
        
        const canTrigger = await this.handleTriggerValidity(queueName, fencingToken);

        if(canTrigger) {
            await ctx.runTick(targetQueue);
        }
    }
    
    private async handleTriggerValidity(queue : string, fencingToken : number | string) : Promise<EngineQueuesConfig | null> {
        const targetQueue = config.get('queues').find(q => q.queue === queue);
        if(!targetQueue) {
            const err = `[Persistent Runtime] : pool entry for unregistered or unmanaged queue: '${queue}'`;
            if (this.lastLogged.get(queue) !== err) {
                this.logger.error(err);
                this.lastLogged.set(queue, err);
            }
            return null;
        }
        
        const isValidToken = await this.storage.ops.checkFencingTokenValidity(queue, fencingToken);
        
        if(!isValidToken) {
            const errorMsg = `[EventDrivenPoller]-[ExecutionTrigger]-[${queue}] : Engine execution rejected : Invalid fencing token.`;
            if (this.lastLogged.get(queue) !== errorMsg) {
                this.logger.error(errorMsg);
                this.lastLogged.set(queue, errorMsg);
            }
            return null;
        }

        const lockKey = `lock:edp:${queue}`;
        const lockTTL = 120_000;

        const lockAcquired = await this.storage.repository.acquireQueueLock(
            lockKey,
            this.runtimeExecutionId,
            lockTTL
        )

        if (lockAcquired) {
            await this.storage.repository.clearDispatchPending(lockKey);
        }
        else {
            const busyMsg = `[Persistent Runtime] : Engine busy for queue ${queue}, skipping trigger.`;
            if (this.lastLogged.get(queue) !== busyMsg) {
                this.logger.log(busyMsg);
                this.lastLogged.set(queue, busyMsg);
            }
            return null;
        }

        const machine = QueueFSM.getMachine(queue);

        if(machine.is("IDLE_WAITING_FOR_WORKER") || !machine.is("READY")) {
            this.memory.kv.set(`${queue}-buffered-events`, { queue : queue, at : new Date().toISOString() });
            const stateMsg = `[RuntimeEventBridge] : Queue event for '${queue}' buffered in memory - Machine state is '${machine.getState()}' indicating the queue is idle and waiting for a worker or not in a ready state.`;
            if (this.lastLogged.get(queue) !== stateMsg) {
                this.logger.log(stateMsg);
                this.lastLogged.set(queue, stateMsg);
            }
            return null;
        }

        return targetQueue;
    }
}