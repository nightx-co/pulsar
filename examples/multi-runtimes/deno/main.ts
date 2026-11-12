import { Pulsar, PulsarRuntime, EventTriggerStrategy } from "pulsar";
import { PostgresDriver, PulsarUnifiedStorage, RedisDriver } from "pulsar/storage";
import { PulsarEventsIntegrations } from "pulsar/integrations";
import { Queue1, Queue2, Queue3 } from "./Queues.ts";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : "127.0.0.1:6379",
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@localhost:5432/postgres",
    connectionProtocol : "tcp"
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "AUTO",
})

const engine = new Pulsar({
    runtime : PulsarRuntime.PERSISTENT,
    storage : unifiedStorage,
    queues : [
        //Queue1,
        //Queue2,
        Queue3
    ],
    swarmConfig : {
        maxGlobalConcurrency : 1000,
        globalMaxJobsPerTick : 100_000,
    },
    engine : {
        poolingIntervalMS : 500,
        poolingMode : "interval-driven-pooler",

        //selfURL : "http://host.docker.internal:9999/process-job",
        //selfInvocationMethod : "auto_using_pgnet",
        //selfInvocationIntervalSec : 5,
        healthCheckIntervalSec : 15,
        cycleTickLimit : 1000,
        tickConcurrency : "sequential",
        //lockKey : `pulsar:lock:idp`,
        //instanceId : crypto.randomUUID()
    },
    autoMigrate : false,

    eventTriggerStrategy : EventTriggerStrategy.POSTGRES_NOTIFY,

    instanceId : 'eu-central-1',

    networkInterface : {
        mode : "websocket",
        port : 9500,
    },

    onEvents : {
        queueComplete : (ctx) => console.log(ctx.queue)
    },
})

//engine.installIntegrations([ PulsarEventsIntegrations ]);

engine.start();