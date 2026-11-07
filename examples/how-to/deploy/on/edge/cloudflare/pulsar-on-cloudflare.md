# How to Deploy Pulsar in Cloudflare Using Workers

## Step 1: Create a New Edge Function

Create a new Edge Function in your Supabase project using the Supabase CLI or the Supabase Dashboard.

Name the function `pulsar-[your-instance-id]`. The instance ID in the function name is optional.

```bash
npx supabase functions new pulsar-edge-1
```

## Step 2: Write the Code

Once the Edge Function has been created, navigate to its `index.ts` file.

### Import Pulsar

First, import the required Pulsar classes and integrations into your Edge Function.

```typescript
import {
    IsolateInstance,
    Pulsar,
    PulsarRuntime,
} from "@nightx.co/pulsar@latest";

// Storage classes
import {
    RedisDriver,
    PostgresDriver,
    PulsarUnifiedStorage,
} from "@nightx.co/pulsar@latest/storage";

// HTTP request handler
import {
    createPulsarRequestHandler,
} from "@nightx.co/pulsar@latest/server";

// Optional integrations for custom logging and events
import {
    PulsarLoggerIntegrations,
    PulsarEventsIntegrations,
} from "@nightx.co/pulsar@latest/integrations";
```

### Define the Storage

Next, define your storage configuration.

Redis is optional. However, adding Redis can improve throughput and reduce database load.

```typescript
const cacheStorage = new RedisDriver({
    protocol: "http", // Must use HTTP for serverless and edge runtimes
    connectionString: "your_redis_url", // HTTP endpoint
    token: "your_token",
});

const postgresDriver = new PostgresDriver({
    connectionString:
        "postgresql://postgres:password@host.docker.internal:5432/postgres", // Must use a pooler connection string to avoid exhausting database connections
    connectionProtocol: "transcational", // Never use TCP on serverless and edge runtimes
});

const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage, // Optional field
    db: postgresDriver,
    strategy: "AUTO",
});
```

### Define the Required Variables

Next, define the following three variables.

```typescript
// Maximum isolate wall-clock time for edge runtimes.
// For example, Supabase Free Tier provides 150 seconds,
// while Cloudflare Workers Paid Tier provides 400 seconds.
//
// It is recommended to set this value 1–2 seconds lower
// than the actual wall-clock limit.
//
// Pulsar is aware of the wall-clock limit and handles it
// automatically using a safety buffer.
//
// If the configured isolate lifespan is significantly
// higher than the actual wall-clock limit, the isolate
// may be terminated before Pulsar can sustain its
// self-invocation process. This may lead to restarts
// and cause delays.
//
// For edge runtimes, MAX_ISOLATE_LIFESPAN_MS must match
// the wall-clock time provided by the runtime.

const MAX_ISOLATE_LIFESPAN_MS = 180_000;

// Instance ID for this Pulsar instance.
//
// Multiple Pulsar instances can be deployed.
// Their instance IDs define their independent work processes.

const instanceId = "eu-central-1";

// A strong API key.
//
// All consumers using this Pulsar instance must use
// the same API key for authentication validation.

const apiKey =
  "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";
```

### Initialize the IsolateInstance

Define the `IsolateInstance` outside your request handler.

This creates an isolate instance whose variables and data remain the same across requests handled by the same isolate. Subsequent Pulsar invocations can use this instance to track the remaining time and operational overhead.

The `IsolateInstance` must be initialized outside the handler function.

```typescript
const isolate = new IsolateInstance(
    MAX_ISOLATE_LIFESPAN_MS,
);
```

### Create a Queue

Create a new file named `queue.ts` and define your queue.

```typescript
export const orderQueue = createQueue({
    queue: "order_queue",
    type: "STANDER",
    concurrency: 1,
    cycleTickLimit: 10, // Keep it at 5–10 maximum when using multiple queues
    maxJobsPerTick: 10_0000,
    n: 10,
    sleep: 10,
    profile: "REALTIME",
    pooler: "interval-driven-pooler",
    interventionPolicy: "inherit",

    stateTransitionPolicy: {
        enabled: true,
        idleTimingProfile: "ULTRA_EFFICIENT",
    }, // Recommended for serverless runtimes and resource-constrained environments

    deadLetterQueue: "dlq_q_1", // Future patch

    consumer: {
        type: "http",
        url: "your_consumer_function_url",
        headers: {
            "Authorization": `Bearer SUPABASE_ANON_KEY`, -- on supabase
            "X-Amz-Invocation-Type" : "Event" -- on lambda
        },
    },
});
```

As for the consumer, if it is deployed to a serverless function such as AWS Lambda, special consideration is required.

Unlike Supabase Edge Runtime or Cloudflare Workers, AWS Lambda does not provide a waitUntil mechanism. Therefore, the invocation must be handled asynchronously.

For AWS Lambda, it is critical to include the X-Amz-Invocation-Type header with the value "Event" in the consumer configuration. This allows Pulsar to invoke the consumer asynchronously without waiting for the consumer to finish processing the request.

For Supabase Edge Functions, use the Authorization header with your Supabase Anon Key.

For more information about configuring asynchronous Lambda invocation through API Gateway, refer to the following documentation:

- [Configure Lambda asynchronous invocation in the API Gateway console](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-integration-async.html)


- [Setting Up a Consumer in Serverless and Edge Runtimes](./deployment/persistent-runtime.mdx)

### Create the Engine

The engine is created using a factory or wrapper function.

This is important because of Pulsar's internal lock mechanism. Invoking the engine consumes CPU time, so the wrapper allows Pulsar to conserve resources and wake the engine only when there is work to do.

The engine must be wrapped inside a wrapper function. The same applies to serverless runtimes.

```typescript
const getEngine = (instanceId: string): Pulsar => {
    console.log(`engine get called`);

    const engine = new Pulsar({
        instanceId, // Required
        apiKey, // Required
        runtime: PulsarRuntime.V8_ISOLATE, // Required
        storage: unifiedStorage, // Required
        isolate: isolate, // Required

        queues: [
            orderQueue,

            // Caution:
            // Adding more queues can increase the likelihood of
            // running out of CPU or memory (OOM) in your Edge Function
            // and reaching the wall-clock limit faster.
            //
            // For edge runtimes, it is generally recommended to use
            // a maximum of 1–3 queues, with:
            // - cycleTickLimit: 5
            // - concurrency: 4 maximum
            // - n: 25 maximum
            //
            // These values may vary depending on your paid tier,
            // function RAM, and CPU resources.
        ],

        swarmConfig: {
            maxGlobalConcurrency: 100,
            globalMaxJobsPerTick: 100_000,
        },

        engine: {
            selfURL: "your_function_url", // Required

            selfInvocationMethod: "auto_using_pgnet", // Optional

            selfInvocationIntervalSec: 5, // Default: 5 seconds

            // Default: 60 seconds.
            //
            // Do not lower this to 5–10 seconds.
            // The old isolate may take longer than 10 seconds to recycle.
            //
            // If misconfigured, the next restart request may reach
            // the same old isolate that is about to terminate.
            // In this case, Pulsar may stop completely until the
            // next watchdog restart request arrives.

            selfRestartIntervalSec: 60,

            healthCheckIntervalSec: 15, // How often health checks should occur

            cycleTickLimit: 1000,

            tickConcurrency: "sequential",
        },

        integrations: [
            PulsarLoggerIntegrations,
            PulsarEventsIntegrations,
        ], // Optional

        // Optional logger configuration.
        //
        // If you have a third-party logger such as Better Stack
        // or Grafana, you can use it to stream logs to your
        // provider instead of using console logging.

        logger: {
            log: console.log,
            error: console.error,
            warn: console.warn,
            debug: console.debug,
        },

        // Optional interval events.
        //
        // These include events such as restarts, executed ticks,
        // and when all jobs in a queue have been processed.

        onEvents: {
            queueComplete: (ctx) => console.log(ctx.queue),
        },
    });

    return engine; // Finally, return the engine
};
```

### Create the Request Handler

Next, create the request handler and pass the required fields.

```typescript
export const requestHandler = createPulsarRequestHandler({
    getEngine, // Required
    instanceId, // Required
    unifiedStorage, // Required
    isolate, // Required for V8 isolate runtimes
});
```

### Handle Incoming Requests

Finally, import the `requestHandler` into your `index.ts` file and let it handle incoming requests.

**index.ts**


```typescript
import { waitUntil } from "cloudflare:workers";

export default {
  async fetch(request, env, ctx) {
    //ctx.waitUntil

    waitUntil(async () => {
        const { message, status } = await requestHandler.handle(req);
    })

    return new Response("Hello, World!");
  },
};

```

### Initialize Pulsar Configuration

Once the Worker has been deployed, send an initial POST request to trigger configuration reconciliation and automatic setup.

```bash
curl -X POST http://[your-function-url]/validate_config
```

The request should return a `200 OK` response with a message indicating that the configuration has been validated and reconciled.

```json
{
  "message": "validate/reconciled"
}
```

## References

- [Setting Up a Consumer in Serverless and Edge Runtimes](./deployment/persistent-runtime.mdx)
- [Supabase Edge Functions Example](./deployment/persistent-runtime.mdx)