import { EventTriggerStrategy, Pulsar, PulsarRuntime } from "@nightx.co/pulsar";
import { PulsarEventsIntegrations } from "@nightx.co/pulsar/integrations";
import { RedisDriver, PostgresDriver, PulsarUnifiedStorage } from "@nightx.co/pulsar/storage";
import { Queue5 } from "./Queues";
import { POSTGRESSQL_TCP, REDIS_TCP, API_KEY } from "../../environment_vars";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : REDIS_TCP,
})

const postgresDriver = new PostgresDriver({
    connectionString: POSTGRESSQL_TCP,
    connectionProtocol : "tcp"
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "REDIS_CACHE",
})

const instanceId = 'eu-central-1';

const engine = new Pulsar({
    runtime : PulsarRuntime.PERSISTENT,
    instanceId : instanceId,
    apiKey : API_KEY,
    storage : unifiedStorage,
    queues : [ Queue5 ],
    swarmConfig : {
        maxGlobalConcurrency : 1000,
        globalMaxJobsPerTick : 100_000,
    },

    engine : {
        poolingMode : "interval-driven-pooler",
        poolingIntervalMS : 500,
        
        healthCheckIntervalSec : 15,
        cycleTickLimit : 1000,
        tickConcurrency : "sequential",
        
        interventionPolicy : "cycle"
    },

    eventTriggerStrategy : EventTriggerStrategy['WEBHOOK'],

    networkInterface : {
        mode : "hybrid",
        port : 9500,
    },

    integrations : [
        //PulsarLoggerIntegrations,
        PulsarEventsIntegrations
    ],

    onEvents : {
        queueComplete : (ctx) => console.log(ctx.queue)
    },
})

engine.start();