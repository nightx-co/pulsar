# Pulsar Client SDK

Pulsar Client SDK provides worker implementations that let applications consume and process jobs dispatched by the Pulsar engine.

The SDK supports persistent Node.js runtimes as well as serverless and edge environments. Depending on where your consumer runs you can choose one of three worker implementations.

- **Worker** is a WebSocket based worker for persistent runtimes.
- **HttpWorker** is an HTTP based worker for serverless and edge runtimes.
- **DependentWorker** is an HTTP proxy based worker that delegates job resolution to the Pulsar engine.

Every worker exposes a consistent interface for processing jobs. It can acknowledge execution and resolve jobs after processing.

## Installation

Install the SDK using your preferred package manager.

```bash
npm install "@nightx.co/pulsar-client"
```

```bash
pnpm add "@nightx.co/pulsar-client"
```

```bash
yarn add "@nightx.co/pulsar-client"
```

## Importing the SDK

The SDK exports components for storage configuration and worker initialization.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    Worker,
    HttpWorker,
    DependentWorker,
} from "@nightx.co/pulsar-client";
```

### Storage components

These components configure the storage layer used by a consumer.

- `PulsarUnifiedStorage` combines the configured storage drivers into one storage interface.
- `PostgresDriver` provides PostgreSQL connectivity.
- `RedisDriver` provides Redis connectivity and caching.

`PulsarUnifiedStorage` and `PostgresDriver` are required for storage backed workers. `RedisDriver` is optional and depends on how the Pulsar engine is configured.

The consumer must use the same storage configuration as the Pulsar engine. This includes the database connection the connection protocol and any additional storage layers.

For example if the engine uses PostgreSQL with Redis then the consumer must provide both drivers. If the engine uses PostgreSQL only then the consumer can use PostgreSQL alone.

Storage configuration must stay consistent across the engine and its consumers. Otherwise job coordination and acknowledgement can fail.

### Worker components

The SDK provides three worker implementations.

| Worker | Recommended environment | Communication |
|---|---|---|
| `Worker` | Persistent runtimes | WebSocket |
| `HttpWorker` | Serverless and edge runtimes | HTTP |
| `DependentWorker` | Environments where local storage is impractical | HTTP proxy |

Choose the implementation based on the runtime where the consumer will be deployed.

## Storage Configuration

Before initializing a storage backed worker configure the storage drivers and combine them with `PulsarUnifiedStorage`.

### PostgreSQL Driver

The PostgreSQL driver creates the database connection used by the consumer.

```typescript
const postgresDriver = new PostgresDriver({
    connectionString: "postgresql://postgres:password@localhost:5432/postgres",
    connectionProtocol: "tcp",
});
```

| Property | Description |
|---|---|
| `connectionString` | PostgreSQL connection string. |
| `connectionProtocol` | Connection protocol used by the driver. |

The connection string and protocol must match the configuration used by the Pulsar engine.

### Redis Driver

The Redis driver adds an additional storage layer when Redis is configured in the Pulsar engine.

```typescript
const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: "127.0.0.1:6379",
});
```

| Property | Description |
|---|---|
| `protocol` | Redis connection protocol. |
| `connectionString` | Redis address or URI. |

Redis is optional. If the Pulsar engine uses Redis with PostgreSQL then the consumer must configure Redis as well.

### Unified Storage

After initializing the drivers combine them using `PulsarUnifiedStorage`.

```typescript
const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});
```

| Property | Description |
|---|---|
| `cache` | Redis driver instance. |
| `db` | PostgreSQL driver instance. |
| `strategy` | Storage selection strategy. |

Pass the unified storage instance to a storage backed worker during initialization.

> **Important:** The storage configuration must be identical between the Pulsar engine and its consumers. A mismatch can cause failed acknowledgements and stalled processing.

## Authentication

Every worker must authenticate with the Pulsar instance using its configured API key.

```typescript
const apiKey = process.env.PULSAR_API_KEY!;
```

The API key used by the consumer must match the key configured in the Pulsar engine.

If the keys do not match authentication will fail and the consumer will not receive jobs.

## Worker Implementations

### 1. Worker (WebSocket)

`Worker` is the main implementation for persistent runtimes.

It opens a WebSocket connection to the Pulsar engine and keeps that connection alive to receive dispatched jobs.

Use this implementation for:

- VPS deployments.
- Persistent Node.js applications.
- Long running background processes.
- Other runtimes that support persistent WebSocket connections.

#### Initialization

```typescript
const worker = new Worker(
    "q_5",
    async (job) => {
        console.log(job.data);


        await job.ack(true);
    },
    {
        storage: unifiedStorage,
        concurrency: 1,
        wsConnectionString: "http://localhost:9500",
        apiKey,
        reconnectionDelay: 2000,
        removeOnFail: false,
        removeOnComplete: true,
    }
);
```

The constructor accepts three arguments.

| Argument | Description |
|---|---|
| `queueName` | Name of the queue the worker consumes. |
| `processor` | Async function that processes received jobs. |
| `options` | Worker configuration and execution options. |

#### Processor Function

The processor is an async function that runs whenever a job is dispatched to the worker.

```typescript
async (job, index) => {
    console.log(job.id);
    console.log(job.data);


    await job.ack(true);
}
```

The processor receives:

- `job` is the job instance containing its data and resolution methods.
- `index` is the processor iteration index.

Use `job.data` to access the job payload. The job instance also exposes methods for acknowledgement and job resolution.

#### Worker Options

| Option | Description |
|---|---|
| `storage` | Unified storage instance used by the worker. |
| `concurrency` | Maximum number of jobs processed at the same time. |
| `wsConnectionString` | WebSocket endpoint exposed by the Pulsar engine. |
| `apiKey` | Authentication key matching the Pulsar instance. |
| `reconnectionDelay` | Base reconnection delay in milliseconds used by exponential reconnection. |
| `removeOnFail` | Controls whether failed jobs are removed after retries are exhausted. |
| `removeOnComplete` | Controls whether completed jobs are removed. |

#### Concurrency

Concurrency controls how many jobs the worker can process simultaneously.

```typescript
{
    concurrency: 1
}
```

This processes one job at a time.

```typescript
{
    concurrency: 10
}
```

This allows up to ten jobs to run concurrently.

Set concurrency based on your processing requirements and available resources.

#### Reconnection Delay

The `reconnectionDelay` option controls the base delay used by the exponential reconnection mechanism when the WebSocket connection breaks.

The value is in milliseconds.

```typescript
{
    reconnectionDelay: 1000
}
```

The worker reconnects automatically and increases the delay between attempts. It retries until it reaches its configured attempt limit.

A value between 1000 and 2000 milliseconds is a reasonable starting point.

#### Job Removal

Two options control what happens to jobs after processing.

**removeOnFail**

This controls whether a failed job is removed after its retry policy is exhausted.

```typescript
{
    removeOnFail: false
}
```

When disabled the failed job is retained instead of being removed automatically.

**removeOnComplete**

This controls whether a successfully completed job is removed from the queue.

```typescript
{
    removeOnComplete: true
}
```

When enabled the resolved job is removed from the queue.

A worker can also complete processing without explicitly calling an acknowledgement as long as the processor resolves successfully. In that case `removeOnComplete` decides whether the completed job is removed.

***

### 2. HttpWorker (HTTP)

`HttpWorker` is designed for serverless and edge environments where a persistent WebSocket connection is not practical or supported.

Unlike `Worker` it does not keep a persistent connection with the Pulsar engine. Instead it processes incoming HTTP requests through its `handle()` method.

Use this implementation for:

- AWS Lambda.
- Supabase Edge Functions.
- Cloudflare Workers.
- Netlify Functions.
- Other serverless and edge environments.

#### Initialization

```typescript
const httpWorker = new HttpWorker("q_5", {
    storage: unifiedStorage,
    concurrency: 1,
    apiKey,
});
```

The constructor accepts two arguments.

| Argument | Description |
|---|---|
| `queueName` | Name of the queue the worker consumes. |
| `options` | Worker configuration. |

`HttpWorker` accepts the same general options as `Worker` including storage concurrency authentication and job removal settings. It does not require a WebSocket connection string.

#### Handling HTTP Requests

Call the `handle()` method to process incoming requests.

```typescript
await httpWorker.handle(
    request,
    async (job) => {
        console.log(job.data);


        await job.ack(true);
    }
);
```

| Argument | Description |
|---|---|
| `request` | Incoming HTTP request received by the function. |
| `processor` | Async function that processes the dispatched job. |

The processor receives the job context and can use the same job resolution methods available in `Worker`.

#### Background Execution

When deploying HTTP workers in edge runtimes it is highly recommended to run the worker inside the runtime’s background execution mechanism.

Many edge environments provide a `waitUntil()` API. This lets asynchronous work continue after the HTTP response has been returned.

```typescript
export default {
    async fetch(request, env, ctx) {
        const worker = new HttpWorker("q_5", {
            storage: unifiedStorage,
            concurrency: 1,
            apiKey,
        });


        ctx.waitUntil(
            worker.handle(request, async (job) => {
                await processJob(job.data);
                await job.ack(true);
            })
        );


        return new Response("OK", {
            status: 200,
        });
    },
};
```

The background execution API depends on the runtime.

For AWS Lambda and other serverless environments without an equivalent `waitUntil()` mechanism configure the Pulsar dispatch behavior to support asynchronous execution. Do not keep the dispatch request blocked until processing finishes.

Running the worker synchronously can reduce throughput because the dispatch execution remains occupied while the processor completes its work.

***

### 3. DependentWorker (HTTP Proxy)

`DependentWorker` is an alternative implementation for environments where configuring a local storage layer is unavailable or impractical.

Unlike the other two implementations it does not require local storage or a WebSocket connection. It delegates job resolution operations to the Pulsar engine through HTTP proxy requests.

The engine handles operations such as acknowledgement and other job resolution requests on behalf of the consumer.

**This implementation is not the recommended default.**

It receives less maintenance than the other worker implementations and may be reconsidered or removed in future releases. Prefer `Worker` or `HttpWorker` when possible.

#### Initialization

```typescript
const dependentWorker = new DependentWorker<{ batman: string }>(
    "q_2",
    {
        apiKey,
        concurrency: 1,
        connection: {
            url: "http://localhost:9500",
            headers: {},
        },
    }
);
```

The constructor accepts two arguments.

| Argument | Description |
|---|---|
| `queueName` | Name of the queue the worker consumes. |
| `options` | Worker configuration including authentication and engine connection details. |

#### DependentWorker Options

| Option | Description |
|---|---|
| `apiKey` | Authentication key matching the Pulsar instance. |
| `concurrency` | Maximum number of concurrently processed jobs. |
| `connection.url` | HTTP endpoint of the Pulsar engine. |
| `connection.headers` | Optional HTTP headers included in requests to the engine. |
| `removeOnFail` | Controls removal of failed jobs. |
| `removeOnComplete` | Controls removal of completed jobs. |

The connection URL must point to the HTTP endpoint exposed by the Pulsar engine.

#### Handling HTTP Requests

`DependentWorker` uses the same request handling approach as `HttpWorker`.

```typescript
await dependentWorker.handle(
    request,
    async (job) => {
        console.log(`Processing job: ${job.id}`);


        console.log(job.data);


        await job.ack(true);
    }
);
```

The worker receives the incoming request processes the dispatched job and delegates resolution operations to the Pulsar engine.

Like `HttpWorker` it should run through the runtime’s background execution mechanism whenever that is supported.

***

## Job Acknowledgement

All worker implementations expose job resolution methods through the job context.

The most important method is:

```typescript
await job.ack(true);
```

The acknowledgement method accepts a boolean argument that controls whether the acknowledgement is deferred or executed immediately.

| Value | Behavior |
|---|---|
| `true` | Defers acknowledgement for batch resolution. |
| `false` | Executes acknowledgement immediately. |

### Deferred Acknowledgement

Deferred acknowledgement is recommended for normal worker processing.

```typescript
await job.ack(true);
```

Instead of resolving each acknowledgement individually the worker places it into a deferred state. At the end of the processing cycle deferred acknowledgements are resolved in a batch.

This reduces the number of individual resolution operations and improves resource efficiency.

### Immediate Acknowledgement

Use immediate acknowledgement when resolution must happen right away.

```typescript
await job.ack(false);
```

This bypasses the deferred acknowledgement mechanism and resolves the acknowledgement immediately.

For most workloads use `true`.

***

## HTTP Response Requirements

When using `HttpWorker` or `DependentWorker` the HTTP handler must return a successful response to the Pulsar engine.

**Always return HTTP status 200 after handling the worker request. This includes cases where application level processing encounters an error.**

The HTTP response status is part of the dispatch lifecycle. Returning an unsuccessful status can interfere with the engine’s dispatch and worker cleanup mechanisms.

```typescript
return Response.json(
    { error: "Not found" },
    { status: 200 }
);
```

The response body can contain application level information. The HTTP status should remain `200`.

This requirement applies only to the HTTP based worker implementations.

***

## Choosing the Right Worker

| Deployment environment | Recommended worker | Reason |
|---|---|---|
| VPS / Persistent Node.js | `Worker` | Maintains a persistent WebSocket connection. |
| Long running server | `Worker` | Supports continuous job consumption. |
| AWS Lambda | `HttpWorker` | Uses HTTP based dispatch without persistent connections. |
| Supabase Edge Functions | `HttpWorker` | Compatible with edge request handling and background execution. |
| Cloudflare Workers | `HttpWorker` | Supports HTTP dispatch and `waitUntil`. |
| Netlify Functions | `HttpWorker` | Suitable for serverless execution. |
| Environments without local storage access | `DependentWorker` | Delegates job resolution to the Pulsar engine. |

## Complete Examples

### Persistent Node.js Consumer

A typical persistent consumer uses the main `Worker` implementation.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    Worker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: process.env.DATABASE_URL!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: process.env.REDIS_URL!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new Worker(
    "orders",
    async (job) => {
        console.log("Received job:", job.data);


        await processOrder(job.data);


        await job.ack(true);
    },
    {
        storage: unifiedStorage,
        concurrency: 5,
        wsConnectionString: process.env.PULSAR_WS_URL!,
        apiKey: process.env.PULSAR_API_KEY!,
        reconnectionDelay: 1000,
        removeOnFail: false,
        removeOnComplete: true,
    }
);
```

### Serverless HTTP Consumer

A serverless consumer uses `HttpWorker` and handles incoming HTTP requests.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    HttpWorker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: process.env.DATABASE_URL!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: process.env.REDIS_URL!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new HttpWorker("orders", {
    storage: unifiedStorage,
    concurrency: 5,
    apiKey: process.env.PULSAR_API_KEY!,
});


export async function handler(request: Request) {
    try {
        await worker.handle(request, async (job) => {
            console.log("Received job:", job.data);


            await processOrder(job.data);


            await job.ack(true);
        });
    } catch (error) {
        console.error("Worker execution failed:", error);
    }


    return Response.json(
        { success: true },
        { status: 200 }
    );
}
```

### Edge Runtime Consumer (Background Execution)

Edge runtimes often provide a background execution mechanism. This lets asynchronous tasks continue running after the HTTP response has been returned.

Pulsar’s `HttpWorker` can use this mechanism to process jobs without blocking the incoming HTTP request.

Whenever the runtime supports `waitUntil()` use it to execute the worker.

The following examples show how to integrate Pulsar with different edge and serverless platforms.

#### Cloudflare Workers

Cloudflare Workers exposes `ctx.waitUntil()` through the execution context.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    HttpWorker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: process.env.DATABASE_URL!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: process.env.REDIS_URL!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new HttpWorker("orders", {
    storage: unifiedStorage,
    concurrency: 5,
    apiKey: process.env.PULSAR_API_KEY!,
});


export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext) {
        ctx.waitUntil(
            worker.handle(request, async (job) => {
                console.log("Received job:", job.data);


                await processOrder(job.data);


                await job.ack(true);
            })
        );


        return Response.json(
            { success: true },
            { status: 200 }
        );
    },
};
```

#### Supabase Edge Functions

Supabase Edge Functions provide `EdgeRuntime.waitUntil()` for background execution.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    HttpWorker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: Deno.env.get("DATABASE_URL")!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: Deno.env.get("REDIS_URL")!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new HttpWorker("orders", {
    storage: unifiedStorage,
    concurrency: 5,
    apiKey: Deno.env.get("PULSAR_API_KEY")!,
});


Deno.serve(async (request) => {
    EdgeRuntime.waitUntil(
        worker.handle(request, async (job) => {
            console.log("Received job:", job.data);


            await processOrder(job.data);


            await job.ack(true);
        })
    );


    return Response.json(
        { success: true },
        { status: 200 }
    );
});
```

#### Vercel Functions

For Vercel environments use the `waitUntil()` function provided by the Vercel Functions runtime.

```typescript
import { waitUntil } from "@vercel/functions";

import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    HttpWorker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: process.env.DATABASE_URL!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: process.env.REDIS_URL!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new HttpWorker("orders", {
    storage: unifiedStorage,
    concurrency: 5,
    apiKey: process.env.PULSAR_API_KEY!,
});


export async function POST(request: Request) {
    waitUntil(
        worker.handle(request, async (job) => {
            console.log("Received job:", job.data);


            await processOrder(job.data);


            await job.ack(true);
        })
    );


    return Response.json(
        { success: true },
        { status: 200 }
    );
}
```

#### Netlify Functions

Netlify Functions provide background execution through their runtime context. For supported function environments use the available `waitUntil()` API.

```typescript
import {
    PulsarUnifiedStorage,
    PostgresDriver,
    RedisDriver,
    HttpWorker,
} from "@nightx.co/pulsar-client";


const postgresDriver = new PostgresDriver({
    connectionString: process.env.DATABASE_URL!,
    connectionProtocol: "tcp",
});


const cacheStorage = new RedisDriver({
    protocol: "tcp",
    connectionString: process.env.REDIS_URL!,
});


const unifiedStorage = new PulsarUnifiedStorage({
    cache: cacheStorage,
    db: postgresDriver,
    strategy: "AUTO",
});


const worker = new HttpWorker("orders", {
    storage: unifiedStorage,
    concurrency: 5,
    apiKey: process.env.PULSAR_API_KEY!,
});


export default async (request: Request, context: Context) => {
    context.waitUntil(
        worker.handle(request, async (job) => {
            console.log("Received job:", job.data);


            await processOrder(job.data);


            await job.ack(true);
        })
    );


    return Response.json(
        { success: true },
        { status: 200 }
    );
};
```

> **Note:** Background execution APIs depend on the platform and function runtime. Make sure the deployed runtime supports the API shown here and that its execution limits are enough for your workload.

#### Why use waitUntil()?

`waitUntil()` lets the runtime manage the worker’s asynchronous execution separately from the HTTP response lifecycle.

Without background execution the HTTP handler must wait for the worker to finish before returning a response. This can occupy the function execution lifecycle unnecessarily and reduce dispatch throughput.

With background execution:

1. Pulsar receives the incoming HTTP request.
2. The runtime schedules worker execution using `waitUntil()`.
3. The HTTP handler returns a successful response.
4. The runtime continues executing the worker in the background.
5. The worker processes the job and performs acknowledgement and resolution operations.

**Recommendation:** Use background execution with `HttpWorker` whenever your deployment environment provides a supported mechanism. This is the preferred approach for edge based consumers.

***

## Summary

`@nightx.co/pulsar-client` provides three ways to consume jobs depending on the deployment environment.

- Use `Worker` for persistent runtimes that support WebSocket connections.
- Use `HttpWorker` for serverless and edge runtimes.
- Use `DependentWorker` when local storage is impractical and job resolution must be delegated to the Pulsar engine.

For storage backed consumers keep the storage configuration identical between the Pulsar engine and the consumer.

For HTTP based consumers run processing in the background whenever the runtime supports it. Always return HTTP 200 to complete the dispatch lifecycle.