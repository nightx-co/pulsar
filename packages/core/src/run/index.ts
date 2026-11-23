
import { Pulsar } from "../service/Pulsar.service";
import { PulsarRuntime } from "../types/runtime.types";
import { PulsarUnifiedStorage } from "../storage/PulsarStorage";
import { RedisDriver } from "../storage/drivers/RedisDriver";
import { PostgresDriver } from "../storage/drivers/PostgresDriver";

import { IsolateInstance } from "../service/Isolate.service";
import { PulsarLoggerIntegrations, PulsarEventsIntegrations } from "../integrations";

import { Queue1, Queue2, Queue3 } from "./Queues";
import { Nebula } from "../cluster/Nebula";
import { createPulsarRequestHandler  } from "../server";
import { EventTriggerStrategy } from "../types/eventTriggerStrategry.types";

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : "127.0.0.1:6379",
    //connectionString: "redis://localhost:32774",
    //token : 'example_token',
    //url : 'http://127.0.0.1:8079'
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@localhost:5432/postgres",
    //connectionString: "postgres://supabase_admin:app_password@localhost:32775/order_processing_demo_database",
    connectionProtocol : 'tcp'
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "AUTO",
})

const INSTANCE_ID = 'eu-central-1';
const apiKey = 'MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx';

const isolate = new IsolateInstance(10);

const getEngine = (instanceId : string) : Pulsar => {
    console.log(`calling enigne`)
    return new Pulsar({
        runtime : PulsarRuntime.SERVERLESS_VM,
        instanceId : instanceId,
        apiKey : apiKey,
        storage : unifiedStorage,
        //isolate,
        timeoutSec : 150,
        queues : [
            Queue3,
            //Queue2,
            //Queue3
        ],
        //isolate,
        swarmConfig : {
            maxGlobalConcurrency : 1000,
            globalMaxJobsPerTick : 100_000,
        },

        engine : {
            //selfURL : 'http://host.docker.internal:3000',
            selfURL : 'http://host.docker.internal:7000',
            selfInvocationMethod : "auto_using_pgnet",
            // handler(selfUrl) {
            //     console.log(`[Pulsar] Process : SELF INVOKE FUNCTION EXECUTED.`)
            // },
            selfRestartIntervalSec : 10,
            selfInvocationIntervalSec : 5,
            
            //poolingIntervalMS : 500,
            
            healthCheckIntervalSec : 15,
            cycleTickLimit : 1000,
            tickConcurrency : "sequential",
            
            interventionPolicy : "cycle"
        },

        //eventTriggerStrategy : EventTriggerStrategy['POSTGRES_NOTIFY'],

        // networkInterface : {
        //     mode : "hybrid",
        //     port : 9500,
        // },

        integrations : [
            //PulsarLoggerIntegrations,
            PulsarEventsIntegrations
        ],

        onEvents : {
            queueComplete : (ctx) => console.log(ctx.queue)
        },
    })
}

//const engine = getEngine('eu-central-1');

//engine.start();

// process.on('SIGINT', async () => {
//     try {
//         console.log('Received SIGINT (Ctrl+C). Shutting down gracefully...');

//         if (engine.runtime === "PERSISTENT") {
//             await engine.shutdown();
//             await engine.awaitPendingShutdown();
//         }

//         console.log('Shutdown complete. Exiting process.');
//         process.exit(0);
//     }
//     catch (error) {
//         console.error('Error during graceful shutdown:', error);
//         process.exit(1);
//     }
// })

// console.log(`after code`)


const requestHandler = createPulsarRequestHandler({
    getEngine,
    unifiedStorage,
    instanceId : INSTANCE_ID,
    isolate
})

const server = Bun.serve({
    port: 7000,
    async fetch(request) {
        const userAgent = request.headers.get("user-agent") || "";

        if (userAgent.includes("Cursor") || userAgent.includes("Electron")) {
            return new Response('success', { status : 200 });
        }

        console.log(`request landed`)

        const response = await requestHandler.handle(request);

        return new Response(JSON.stringify(response.message), { status : response.status, headers : { 'content-type' : 'application/json' } });
    },
});

console.log(`Listening on ${server.url}`);

/*
Nebula.connect('us-west-1', "HTTPS", 'http://localhost:3000');

const managed = Nebula.wrap(({ queues, swarmConfig }) => {
    return new Pulsar({
        instanceId : 'us-west-1',
        runtime : PulsarRuntime.V8_ISOLATE,
        storage : unifiedStorage,
        queues,
        isolate,
        swarmConfig,
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
            assignmentScope : "shared",
            enabled : true,
            supportedPartitions : ['*']
        },

        autoMigrate : false,

        integrations : [
            PulsarLoggerIntegrations,
            PulsarEventsIntegrations
        ],

        onEvents : {
            queueComplete : (ctx) => console.log(ctx.queue)
        }
    })
})

async function handler() {
    await managed.start();
}

handler();
*/
