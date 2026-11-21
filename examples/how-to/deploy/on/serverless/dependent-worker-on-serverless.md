# Deploy Pulsar Client in Serverless Environments Using a Dependent Worker

We will start by importing the `DependentWorker` class.

```typescript
import {
  DependentWorker,
} from "@nightx.co/pulsar-client/class";
```

The `DependentWorker` is significantly slower and is generally not recommended. However, if storage cannot be initialized on the consumer side, it may be the most practical approach.

The `DependentWorker` generally provides lower throughput. If your throughput requirements and the number of operations per second are relatively low, it can still work well.

## Defining the Queue and API Key

The queue name must match the target queue configured in the Pulsar instance.

If the queue name does not match the queue specified in the Pulsar instance's consumer configuration, the worker may fail to acknowledge jobs and deregister the targeted worker. This can lead to repeated restarts or potentially a complete halt of the engine.

```typescript
const queue = "q_5";
```

The API key must be identical in both the Pulsar instance and the client.

```typescript
const API_KEY =
  "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";
```

## Initialize the DependentWorker

The `DependentWorker` can be initialized either outside or inside the request handler.

```typescript
const dependentWorker = new DependentWorker(queue, {
  apiKey: API_KEY,
  concurrency: 1,
  logger, // A custom logger can be integrated in the same way as the Pulsar engine
  connection: {
    url: "pulsar-instance-url",
    headers: {}, // Must be configured correctly
  },
});
```

## Handling Incoming Requests

**index.ts**

For the consumer-side function, it is critical to return the response to the Pulsar engine as soon as possible.

On isolate-based runtimes, such as Supabase Edge Functions and Cloudflare Workers, `EdgeRuntime.waitUntil()` or a similar mechanism must be used to execute the processing asynchronously while immediately returning the response.

Do not execute the request handler outside the `waitUntil` mechanism when using these runtimes.

For Vercel, `waitUntil()` or a similar mechanism should be used.

If the consumer or client is deployed in a serverless or edge environment, the response must be returned as soon as possible.

### Supabase Edge Functions

```typescript
Deno.serve(async (req: Request) => {
  EdgeRuntime.waitUntil(
    async () => {
      await dependentWorker.handle(req, async (job) => {
        // Job action
      });
    },
  );

  return new Response(
    JSON.stringify({ status: "success" }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
});
```

Reference:

- [Background Tasks in Supabase Edge Functions](https://supabase.com/docs/guides/functions/background-tasks)

### Cloudflare Workers

```typescript
import { waitUntil } from "cloudflare:workers";

export default {
  async fetch(request, env, ctx) {
    waitUntil(
      async () => {
        await dependentWorker.handle(request, async (job) => {
          // Job action
        });
      },
    );

    return new Response("Hello, World!");
  },
};
```

Reference:

- [Cloudflare Workers: waitUntil](https://developers.cloudflare.com/changelog/post/2025-08-08-add-waituntil-cloudflare-workers/)



### Vercel Functions

```typescript
import { waitUntil } from "@vercel/functions";

export async function POST(req : Request) {
    waitUntil(
        dependentWorker.handle(req, async (job) => {
            // Job action
        })
    )

    return new Response('Success', { status: 200 });
}

```

Reference:

- [Vercel Functions: waitUntil](https://vercel.com/changelog/waituntil-is-now-available-for-vercel-functions)


### Netlify Functions 
```typescript
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Pass a background promise to waitUntil
  context.waitUntil(
    dependentWorker.handle(req, async (job) => {
        // Job action
    })
  );

  // Return the response immediately
  return new Response("Done!", { status: 200 });
};
```

Reference:

- [Netlify Functions: waitUntil](https://docs.netlify.com/build/functions/api/#waituntil)


### AWS Lambda
```typescript

export const handler = async (event, context) => {
    await dependentWorker.handle(event, async (job) => {
        // Job action
    });

    return {
        statusCode: 200
    };
}

```