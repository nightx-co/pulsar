## Setup Pulsar Client in Cloudflare Worker

We will start by importing the Pulsar client classes and storage drivers.

```typescript
import {
  PostgresDriver,
  RedisDriver,
  PulsarUnifiedStorage,
} from "@nightx.co/pulsar-client/storage";

import {
  HttpWorker,
} from "@nightx.co/pulsar-client/class";
```

For most edge and serverless runtimes, it is generally recommended to use the `HttpWorker`.

However, if the storage cannot be initialized inside the consumer or client-side function due to certain constraints, a `DependentWorker` should be used instead of an `HttpWorker`.

The `DependentWorker` is significantly slower and is generally not recommended. However, if the storage cannot be initialized on the consumer side, it may be the most practical approach.

The `DependentWorker` generally provides lower throughput. If the throughput requirements and the number of operations per second are relatively low, it can work well.

You can refer to the following documentation to understand when and where to use each worker:

- [When to Use a Dependent Worker](http://pulsar-docks/when-to-use-depended-worker.mdx)

## Defining the Storage

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

## Defining the Queue and API Key

The queue name must match the target queue configured in the Pulsar instance.

If the queue name does not match the queue specified in the Pulsar instance's consumer configuration, the worker may fail to acknowledge the job and deregister the targeted worker. This can lead to repeated restarts or potentially a complete halt of the engine.

```typescript
const queue = "q_5";
```

The API key must be identical in both the Pulsar instance and the client.

```typescript
const API_KEY =
  "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";
```

## Initialize the HttpWorker

The `HttpWorker` can be initialized either outside or inside the request handler.

```typescript
const httpWorker = new HttpWorker(queue, {
  apiKey: API_KEY,
  storage: unifiedStorage,
  concurrency: 1,
  logger, // A custom logger can be integrated in the same way as the Pulsar engine
});
```

## Handling Incoming Requests

**index.ts**

For the consumer-side function, it is critical to return the response to the Pulsar engine as soon as possible.

On isolate-based runtimes, such as Supabase Edge Functions and Cloudflare Workers, `EdgeRuntime.waitUntil()` or a similar mechanism must be used to execute the processing asynchronously while immediately returning the response.

Do not place the request handler outside of the `waitUntil` mechanism when using Supabase Edge Functions or Cloudflare Workers.

For Vercel, `waitUntil()` or a similar mechanism should be used.

The relevant documentation references will be added here.

If the consumer or client is deployed in a serverless or edge environment, the response must be returned as soon as possible.

```typescript
import { waitUntil } from "cloudflare:workers";

export default {
  async fetch(request, env, ctx) {
    //ctx.waitUntil

    waitUntil(async () => {
        await httpWorker.handle(req, async (job) => {
          await job.ack(true);
        });
    })

    return new Response("Success");
  },
};


```

## References

- [Setting Up a Consumer with a Dependent Worker in Serverless and Edge Runtimes](./deployment/persistent-runtime.mdx)