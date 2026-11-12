import { Pulsar, PulsarRuntime, createQueue } from "@nightx.co/pulsar";
import { RedisDriver, PostgresDriver, PulsarUnifiedStorage } from "@nightx.co/pulsar/storage";
import { createPulsarRequestHandler } from "@nightx.co/pulsar/server";
import { PulsarLoggerIntegrations, PulsarEventsIntegrations } from "@nightx.co/pulsar/integrations";

import { API_KEY, POSTGRESSQL_TCP, REDIS_TCP } from '../../../environment_vars';

const Queue5 = createQueue({
    queue: "q_5",
    type : "STANDER",
    concurrency: 1,
    cycleTickLimit : 10,
    maxJobsPerTick : 10_0000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",
    pooler : "interval-driven-pooler",
    interventionPolicy : "inherit",
    stateTransitionPolicy : { enabled : false },
    deadLetterQueue : "dlq_q_1",
    consumer : {
        type : "http",
        url : "http://host.docker.internal:9999/client",
        headers : { "Authorization": `Bearer SUPABASE_ANON_KEY}` }
    }
});

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
const apiKey = API_KEY;

const getEngine = (instanceId : string) : Pulsar => {
    console.log(`engine get called`);

    const engine =new Pulsar({
        instanceId,
        apiKey,
        runtime : PulsarRuntime.SERVERLESS_VM,
        storage : unifiedStorage,
        queues : [
            Queue5,
        ],
        swarmConfig : {
            maxGlobalConcurrency : 100,
            globalMaxJobsPerTick : 100_000,
        },
        engine : {
            selfURL : "http://host.docker.internal:9999/pulsar",
            selfInvocationMethod : "auto_using_pgnet",
            selfInvocationIntervalSec : 5,
            selfRestartIntervalSec : 60,
            healthCheckIntervalSec : 15,
            cycleTickLimit : 1000,
            tickConcurrency : "sequential"
        },
        integrations : [PulsarLoggerIntegrations, PulsarEventsIntegrations],
        logger : {
            log : console.log,
            error : console.error,
            warn : console.warn,
            debug : console.debug,
        },
        onEvents : {
            queueComplete : (ctx) => console.log(ctx.queue)
        },
    })

    return engine;
}

export const requestHandler = createPulsarRequestHandler({
    getEngine,
    instanceId,
    unifiedStorage,
})