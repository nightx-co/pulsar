import { Queue5 } from "./Queues.ts";

import { IsolateInstance, Pulsar, PulsarRuntime } from "npm:@nightx.co/pulsar@latest";
import { RedisDriver, PostgresDriver, PulsarUnifiedStorage } from "npm:@nightx.co/pulsar@latest/storage";
import { createPulsarRequestHandler } from "npm:@nightx.co/pulsar@latest/server";
import { PulsarLoggerIntegrations, PulsarEventsIntegrations } from "npm:@nightx.co/pulsar@latest/integrations";

const MAX_ISOLATE_LIFESPAN_MS = 180_000;

const cacheStorage = new RedisDriver({
    protocol : "tcp",
    connectionString : "host.docker.internal:6379",
})

const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@host.docker.internal:5432/postgres",
    connectionProtocol : "tcp"
})

const unifiedStorage = new PulsarUnifiedStorage({
    cache : cacheStorage,
    db : postgresDriver,
    strategy : "REDIS_CACHE",
})

const instanceId = 'eu-central-1';
const apiKey = "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";

const isolate = new IsolateInstance(MAX_ISOLATE_LIFESPAN_MS);

const getEngine = (instanceId : string) : Pulsar => {
    console.log(`engine get called`);

    const engine =new Pulsar({
        instanceId,
        apiKey,
        runtime : PulsarRuntime.V8_ISOLATE,
        storage : unifiedStorage,
        isolate : isolate,
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
    isolate
})