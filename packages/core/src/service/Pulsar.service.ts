import sha256 from "js-sha256";
import { PulsarCore } from "./PulsarBaseService.ts";
import { EventSubscriptionModule } from "../subsys/events/EventSubscriptionModule.module.ts";
import { PulsarEventBus } from "./PulsarEventBus.ts";
import { config } from "./ConfigurationStore.ts";

import type { ConfigForRuntime, PulsarRuntimeType } from "../types/runtime.types.ts";
import type { TimingProfile, TimingProfileType } from "../static/TimingProfile.ts";

import type { EngineQueuesConfig } from "../types/queue.types.ts";
import type { IRuntimeExecutionContext } from "../runtimes/runtimeTypes.ts";

export type SpawnerAlgorithm = "ROUND_ROBIN" | "LEAST_CONNECTIONS" | "CBS";

/**
 * Main orchestrator engine for Pulsar responsible for managing queue execution loops,
 * dynamic scheduling, non-blocking worker dispatching, telemetry collection,
*/
export class Pulsar<R extends PulsarRuntimeType = PulsarRuntimeType> extends PulsarCore {

    private isolateId : string;
    private currentExecutionId : string;
    private lockKey : string;

    private eventSubscriptionModule : EventSubscriptionModule;

    // Tracks the in flight shutdown() chain kicked off by an emitted event
    // so the HTTP handler can await it before the response returns.
    private shutdownPromise : Promise<void> | null = null;

    private activeQueues = new Set<EngineQueuesConfig>();

    constructor (private baseConfig : ConfigForRuntime<R> & { runtime : R }) {
        super(baseConfig);

        if(!this.isV8Isolate) this.isolateId = crypto.randomUUID();
        else this.isolateId = this.V8Isolate.id;

        if(this.isV8Isolate) {
            this.currentExecutionId = this.V8Isolate.get('current_execution_id')!;
            this.lockKey = this.V8Isolate.get('lock_key')!;
        }
        else {            
            this.currentExecutionId = this.generateCurrentExecutionIdFromConfig();
            this.lockKey = 'lock-template-static-defination-for-non-v8';
        }

        this.tickController.initializeState();
        this.runtimeStrategy.onBoot(this.executionContext);
        
        this.eventSubscriptionModule = new EventSubscriptionModule({
            tickController : this.tickController,
            runtimeStrategy : this.runtimeStrategy,
            executionContext:  this.executionContext,
            storage : this.storage,
            queueService : this.queueService,
            shutdown:  this.shutdown
        })

        this.eventSubscriptionModule.start();
    }

    public async start() {
        await this.unifiedTransportManager.bootAll();
        await config.reconcileConfiguration(this.storage.ops);

        this.tickController.initializeState();
        this.configureQueueProfiles();
        await this.runtimeStrategy.onStart(this.executionContext);
    }

    public async triggerQueue(queue : string) {
        const targetQueue = this.queues.find(q => q.queue === queue);
        if(!targetQueue) throw new Error("[Pulsar] Target queue is missing.");

        this.logger.log(`[Pulsar] : Event-driven trigger for (${queue})`);

        await this.validateConfiguration();

        await this.runTick(targetQueue);
    }

    public async validateConfiguration() {
        const status = await config.reconcileConfiguration(this.storage.ops);
        return { status : 200, message : status }
    }

    private configureQueueProfiles() {
        for (const config of this.queues) {
            const profile = (config as any).profile as TimingProfileType | TimingProfile || 'REALTIME';
            this.scheduler.registerQueueProfile(config.queue, profile);
        }
    }

    private async runTick(queueConfig : EngineQueuesConfig) {
        this.activeQueues.add(queueConfig);
        return await this.tickController.runTick(queueConfig);
    }

    public async shutdown () {
        this.shutdownPromise ??= this.doShutdown();
        return this.shutdownPromise;
    }

    private async doShutdown() {
        this.logger.log(`Engine Shutdown ⚠️.`);

        this.eventSubscriptionModule.removeRegisteredEvents();

        if(this.unifiedTransportManager) {
            await this.unifiedTransportManager.shutdownAll();
        }

        const continuationScheduled = await this.runtimeStrategy.handleCycleCompletion(this.executionContext);

        // deadRun decides whether a continuation is being scheduled for THIS
        // lock's queue(s). If yes, the lock must stay held under this instanceId
        // until the continuation lands and renews it — releasing now would open
        // a window for an unrelated request to win the lock first.

        if (!continuationScheduled) {
            await this.releaseExecutionLock(this.lockKey, this.currentExecutionId);
        }

        await this.storage.ops.pingHealthCheck();
        await this.storage.disconnect();
    }

    public async scheduleRestart(queue : string) {
        if(queue) {
            const targetQueue = this.queues.find(q => q.queue == queue);
            if(targetQueue) {
                this.activeQueues.add(targetQueue);
            }
        }

        const activeQueues = Array.from(this.activeQueues.values());

        await this.releaseExecutionLock(this.lockKey, this.isolateId);
        await this.storage.ops.addRestart(activeQueues);
        //await this.tickController.restartTick(activeQueues);

        await this.runtimeStrategy.handleRestart(this.executionContext);

        await this.storage.ops.updateRestartOwnership(queue, 'handled_by_engine');
    }

    public async restartForSameIsolate(headers : Record<string, string>) {
        let delaySeconds = 30;
        
        if(this.isV8Isolate) {
            const isolate = this.V8Isolate;
            const timeRemaining = isolate.remainingTime;
            delaySeconds = timeRemaining + 5;
        }

        this.logger.log(`Estimated Restart in (${delaySeconds})S`);

        await this.queueService.triggerUrl({
            url: config.get('engine.selfURL'),
            headers,
            delaySeconds
        });
    }

    private get executionContext () : IRuntimeExecutionContext {
        const self = this;

        return {
            get lockKey() { return self.lockKey; },
            get currentExecutionId() { return self.currentExecutionId; },
            get isolateId() { return self.isolateId; },
    
            getActiveQueues: () => Array.from(self.activeQueues.values()),
            runTick: (queueConfig) => self.runTick(queueConfig),
            endTick: (queueName) => self.tickController.endTick(queueName)
        }
    }

    public setCurrentExecutionId(id : string) {
        this.currentExecutionId = id;
    }

    private generateCurrentExecutionIdFromConfig() {
        const queuesWithPooler = this.baseConfig.queues.map(q => `${q.queue}:${q.pooler}`).join(',');
        return sha256(queuesWithPooler);
    }
    
    public async awaitPendingShutdown() {
        await PulsarEventBus.drain();
        if (this.shutdownPromise) await this.shutdownPromise;
    }

    public async deleteScheduledRestart(queue : string | '__GLOBAL__') {
        await this.storage.ops.deleteRestart(queue);
    }

    public async acquireExecutionLock(lockKey : string, ownerId : string, ttlMs : number) {
        return await this.storage.repository.acquireQueueLock(lockKey, ownerId, ttlMs);
    }

    public async releaseExecutionLock(lockKey : string, ownerId : string) {
        return await this.storage.repository.releaseQueueLock(lockKey, ownerId);
    }
}