/*
import { Pulsar } from "../service/Pulsar.service";
import { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import { PulsarEventsIntegrations } from "../integrations/PulsarEventsIntegrations";
import { Queue1, Queue2, Queue3 } from "./Queues";
import { RedisDriver } from "../storage/drivers/RedisDriver";
import { PostgresDriver } from "../storage/drivers/PostgresDriver";
import { PulsarRuntime } from "../types/runtime.types";
import { IsolateInstance } from "../service/Isolate.service";
*/

/*
const server = Bun.serve({
    port: 4000, // Defaults to 3000 if not specified
    fetch(request) {
        console.log(`${new Date().toISOString()} : Reciving request on us-west-1`);
        return new Response("Welcome to Bun!");
    },
});

console.log(`Listening on ${server.url}`);
*/

/*
const cacheStorage = new RedisDriver({
    protocol : "tcp",
    keyPrefix: "pulsar",
    connectionString : "127.0.0.1:6379",
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@localhost:5432/postgres",
    unloggedTableSchema: "pulsar_engine",
    keyPrefix: "pulsar-edge-us-1",
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "PG_UNLOGGED",
})

const isolate = new IsolateInstance(50_000);

const engine = new Pulsar({
    instanceId : 'pulsar-edge-us-1',
    runtime : PulsarRuntime.V8_ISOLATE,
    storage : unifiedStorage,
    queues : [ Queue1 ],
    isolate,
    swarmConfig : {
        maxGlobalConcurrency : 1000,
        globalMaxJobsPerTick : 100_000,
    },
    engine : {
        selfURL : "http://localhost:9999/process-job",
        selfInvocationMethod : "manual",
        handler(selfUrl) {
            console.log(`[Pulsar] Process : SELF INVOKE FUNCTION EXECUTED.`)
        },
        selfRestartIntervalSec : 10,
        selfInvocationIntervalSec : 5,
        healthCheckIntervalSec : 15,
        cycleTickLimit : 1000,
        tickConcurrency : "sequential",
        lockKey : `pulsar:lock:idp`,
        instanceId : crypto.randomUUID()
    },

    nebula : {
        clusterId : 'cluster-edge-eu-1',
        connection : { endpoint : '' },
        health : { heartbeatIntervalMs : 500, leaseTtlSec : 5, revokeOnIsolateDeath : true },
        mode : "shared"
    },

    autoMigrate : false,

    integrations : [
        //PulsarLoggerIntegrations,
        PulsarEventsIntegrations
    ],

    onEvents : {
        queueComplete : (ctx) => console.log(ctx.queue)
    }
})


engine.start();
*/