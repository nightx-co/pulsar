# Pulsar

**Runtime-Flexible Messaging Poller and Orchestration Engine for PostgreSQL and PGMQ**

Pulsar is an open-source messaging poller and orchestration engine built on PostgreSQL and PGMQ. It provides a unified execution layer for processing queued jobs across serverless functions, edge runtimes, and persistent servers.

Pulsar is not a message queue or broker. It operates on top of an existing PostgreSQL and PGMQ infrastructure, coordinating job execution, worker lifecycle management, concurrency, scheduling, and dispatch.

Instead of building and maintaining runtime-specific polling loops and worker coordination systems, developers can use Pulsar to manage the execution lifecycle while retaining control over their database, queues, and business logic.

## Features

- **Runtime-flexible execution:** Supports persistent runtimes, serverless VMs, containers, and V8 isolates.
- **Tick-based processing:** Coordinates queue evaluation, job pulling, dispatch, and execution state.
- **Interval-driven polling:** Configurable polling profiles for latency-sensitive and background workloads.
- **Event-driven activation:** Activates queue processing when database events trigger new work.
- **Global and per-queue concurrency:** Coordinates execution limits across queues and individual consumers.
- **Runtime-aware scheduling:** Respects execution budgets and supports continuation across runtime invocations.
- **Flexible consumer dispatch:** Supports HTTP, asynchronous callbacks, WebSockets, and external integrations.
- **Unified Storage System (USS):** Combines PostgreSQL persistence with optional Redis acceleration.
- **Worker coordination:** Handles worker registration, deregistration, execution slots, and distributed locking.
- **Extensible architecture:** Supports custom consumers, hooks, payload transformations, and queue routing.

## Installation

Install Pulsar using npm:

```bash
npm i @nightx.co/pulsar
```

## Requirements

### Supported runtimes

Pulsar supports:

- Node.js
- Deno
- Bun
- AWS Lambda
- Supabase Edge Functions
- Vercel Functions
- Docker and Kubernetes
- Persistent server environments

Serverless environments should provide a minimum of 2 seconds of CPU execution time.

### Database requirements

Pulsar requires PostgreSQL with the following extensions:

| Extension | Purpose |
|---|---|
| `pgmq` | Underlying message queue management |
| `pg_cron` | Scheduled queue processing and engine execution (version > 1.6.4) |
| `pg_net` | HTTP capabilities used by the processing engine |

## Quick Start

### 1. Import Pulsar

```typescript
import { Pulsar, PulsarRuntime, createQueue } from "@nightx.co/pulsar";
import {
  PostgresDriver,
  PulsarUnifiedStorage,
  RedisDriver,
} from "@nightx.co/pulsar/storage";
```

### 2. Configure Storage

Pulsar uses PostgreSQL as its persistent storage layer. Redis is optional and can be used to accelerate frequently accessed operational state.

```typescript
const postgresDriver = new PostgresDriver({
  connectionString: process.env.DATABASE_URL,
  connectionProtocol:  process.env.DATABASE_POOLER, // Tcp | Session | Transaction
});

const cacheStorage = new RedisDriver({
  protocol: "tcp", // Tcp | Http
  connectionString: process.env.REDIS_URL,
});

const unifiedStorage = new PulsarUnifiedStorage({
  cache: cacheStorage,
  db: postgresDriver,
  strategy: "AUTO",
});
```

Redis is optional. To use PostgreSQL without Redis:

```typescript
const unifiedStorage = new PulsarUnifiedStorage({
  db: postgresDriver,
  strategy: "AUTO",
});
```

### 3. Define a Queue

Queues are configured independently, allowing different workloads to use tailored concurrency settings, pooling strategies, execution profiles, and state transition policies.

```typescript
const Queue1 = createQueue({
  queue: "q_1",
  type: "fifo", // or "STANDER"

  concurrency: 10,
  n: 10,
  maxJobsPerTick: 1000,
  cycleTickLimit: 10,
  sleep: 10,

  // Accepts a preset string or a custom TimingProfile object
  profile: "STANDARD", 

  pooler: "interval-driven-pooler",

  // Automatic performance scaling during inactive periods
  stateTransitionPolicy: {
    enabled: true,
    idleThresholdTicks: 10,
    idleTimingProfile: "RELAXED", // or a custom TimingProfile
  },

  // Signal intervention evaluation policy
  interventionPolicy: "inherit", // "tick" | "cycle" | "inherit"

  deadLetterQueue: "q_1_dlq",

  consumer: {
    type: "http",
    url: "http://localhost:9999/process-job",
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
    optimizePayload: true, // uses MsgPack to optimize raw payload up to 30%
  },
});

```

#### Configuration Options Reference

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | `string` | **Required** | The unique name/identifier of the queue. |
| `type` | `"fifo" | "STANDER"` | — | The queue ordering and processing type. |
| `concurrency` | `number` | **Required** | Maximum concurrent worker instances allowed for this queue. *(High concurrency increases resource contention on the database/storage layer).* |
| `n` | `number` | **Required** | Number of jobs assigned per worker batch. |
| `profile` | `TimingProfileType | TimingProfile` | `'STANDARD'` | Configures execution cadence and polling intervals (presets or custom object). |
| `pooler` | `EnginePoolingMode` | `'interval-driven-pooler'` | Strategy for pulling work from storage (`'interval-driven-pooler'` or `'event-driven-pooler'`). |
| `maxJobsPerTick` | `number` | *Optional* | Maximum aggregate jobs fetched in a single tick loop. If `(concurrency * n)` exceeds this, workers auto-scale down (backpressure throttling). |
| `cycleTickLimit` | `number` | `10` | Tick budget (quantum) allocated to the isolate. Avoid setting higher than 20 to prevent hitting serverless execution timeouts (e.g., AWS Lambda, Vercel). |
| `sleep` | `number` | *Optional* | Sleep duration parameters for the worker loop. |
| `stateTransitionPolicy` | `Object` | *Optional* | Rules for automatically shifting performance modes during sustained inactivity to cut database reads and idle costs. |
| `interventionPolicy` | `"tick" \| "cycle" \| "inherit"` | `"inherit"` | Evaluates external stop/cancellation signals on every atomic tick, at cycle completion, or inherits globally. |
| `deadLetterQueue` | `string` | *Optional* | Target queue name where permanently failed or poisoned jobs are routed. |

---

#### Available Polling Strategies (`pooler`)

* **`interval-driven-pooler` (IDP):** Ideal for steady, predictable background workloads that require ongoing processing.
* **`event-driven-pooler` (EDP):** Tailored for instant processing of sporadic or bursty jobs while keeping idle execution costs at absolute zero.

#### Available Polling Profiles (`profile`)

You can pass a predefined string preset or supply a custom `TimingProfile` object (`{ activePollMs, backoffPollMs, maxTimerMs, idlePollMs }`):

* `'REALTIME'`
* `'STANDARD'`
* `'BALANCED'`
* `'RELAXED'`
* `'ULTRA_EFFICIENT'`






### 4. Initialize the Engine

Configure Pulsar to run in a persistent runtime, serverless VM, or V8 isolate.

```typescript
const engine = new Pulsar({
  runtime: PulsarRuntime.PERSISTENT,

  storage: unifiedStorage,
  queues: [Queue1],

  apiKey: process.env.PULSAR_API_KEY,
  instanceId: crypto.randomUUID(),

  swarmConfig: {
    maxGlobalConcurrency: 1000,
    globalMaxJobsPerTick: 100_000,
  },

  engine: {
    cycleTickLimit: 1000,
    tickConcurrency: "sequential",
    interventionPolicy: "disabled",
    healthCheckIntervalSec: 15,
  },
  
  networkInterface: {
    mode: "http",
    port: 9999,
  },
  eventTriggerStrategy: "polling",
});

await engine.start();

```

The engine starts coordinating queue processing through its tick-based execution lifecycle.

---

## Runtime Configuration & Environments

Pulsar supports three distinct runtime execution environments via `PulsarRuntime`, adapting behavior to match the underlying hosting architecture.

### 1. Persistent Runtime (`PulsarRuntime.PERSISTENT`)

For traditional, long-running persistent environments such as AWS EC2, VPS, Dedicated Servers, or local Node.js/Bun processes. Unlike ephemeral isolates or serverless containers that spin down between invocations, persistent runtimes maintain an uninterrupted execution context and continuous process lifespan. The engine can rely on background event loops, stateful in-memory caching, and non-ephemeral scheduling without relying on cloud provider lifecycle hooks.

### 2. Serverless VM (`PulsarRuntime.SERVERLESS_VM`)

For containerized or stateless serverless environments with predictable execution limits, such as AWS Lambda, GCP Cloud Run, and Docker VMs. Tracking V8 isolate memory and remaining uptime across HTTP invocations is not strictly required.

### 3. V8 Isolate (`PulsarRuntime.V8_ISOLATE`)

For short-lived, ephemeral V8 isolate environments such as Cloudflare Workers, Supabase Edge Functions, and Deno Deploy. Incoming requests share the same warm memory space until the isolate shuts down. The engine relies on a required `isolate` instance to monitor remaining isolate lifespan, handle dynamic global state, and sync tick schedules before the V8 isolate gets terminated by the cloud provider.

---
## Configuration Reference by Runtime

Depending on your selected `runtime`, the required and available configuration keys change.

### Common Base Options (`Pulsar` Root Configuration)

These options are shared across all runtime configurations:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `runtime` | `PulsarRuntimeType` | **Required** | The target runtime execution environment (`PERSISTENT`, `SERVERLESS_VM`, or `V8_ISOLATE`). |
| `storage` | `PulsarUnifiedStorage` | **Required** | Unified storage driver (PostgreSQL core, optionally paired with Redis memory offloading for a 25%+ throughput boost). |
| `queues` | `QueueModule[]` | **Required** | Array of defined queues managed by this engine instance. |
| `apiKey` | `string` | **Required** | Shared secret API key generated once (e.g., via `openssl rand -hex 32`) and matched across all consumers. |
| `instanceId` | `string` | **Required** | Unique identifier for the running engine instance. |
| `swarmConfig` | `Object` | *Optional* | Cluster-wide settings including `maxGlobalConcurrency`, `spawnerAlgorithm`, and `globalMaxJobsPerTick`. |
| `timeoutMs` | `number` | *Optional* | Execution timeout safety boundary for serverless hosting providers. |
| `integrations` | `Array` | *Optional* | Additional external plugins or integration constructors. |
| `logger` | `ILogger` | *Optional* | Custom logging implementation. |
| `onEvents` | `Object` | *Optional* | Lifecycle hooks such as `queueComplete` and `engineRestart`. |

---

### Runtime-Specific Options

#### For `PulsarRuntime.PERSISTENT` (`PersistentConfig`)

Requires `networkInterface`, `eventTriggerStrategy`, and a `PersistentEngine` object configuration. Self-invocation properties are **not** part of this runtime.

| Property | Path / Location | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `networkInterface` | Root Level | `Object` | **Required** | Configures network mode (`http`, `socket`, or `hybrid`), port, and optional host binding for persistent servers. |
| `eventTriggerStrategy` | Root Level | `EventTriggerStrategy` | **Required** | Strategy for triggering execution loops (`POSTGRES_NOTIFY`, `WEBHOOK`, or `POLLING`). |
| `engine` | Root Level | `PersistentEngine` | **Required** | Engine settings specific to persistent execution (including `poolingMode` and `poolingIntervalMS`). |
| `isolate` | Root Level | `IsolateInstance` | *Optional* | Optional isolate tracking instance if custom lifecycle tracking is desired. |

#### For `PulsarRuntime.SERVERLESS_VM` (`ServerlessVMConfig`)

Requires a `SelfInvokingEngine` configuration object inside `engine`.

| Property | Path / Location | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `engine` | Root Level | `SelfInvokingEngine` | **Required** | Self-invoking engine configuration (including `selfURL`, `selfInvocationMethod`, and timing intervals). |
| `isolate` | Root Level | `IsolateInstance` | *Optional* | Optional isolate tracking instance if custom lifecycle tracking is desired inside containerized workers. |

#### For `PulsarRuntime.V8_ISOLATE` (`V8IsolateConfig`)

Requires a `SelfInvokingEngine` configuration object inside `engine` and an active `isolate` tracking instance.

| Property | Path / Location | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `engine` | Root Level | `SelfInvokingEngine` | **Required** | Self-invoking engine configuration (including `selfURL`, `selfInvocationMethod`, and timing intervals). |
| `isolate` | Root Level | `IsolateInstance` | **Required** | Active isolate tracking instance to monitor remaining isolate lifespan and sync tick schedules. |

---

## Engine Options Object Reference (`engine`)

The options nested inside the `engine` configuration block vary depending on your runtime architecture:

### Common Engine Options (Shared across all runtimes via `BaseEngineOptions`)

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `cycleTickLimit` | `number` | `Infinity` | Global ceiling for cumulative tick executions across all queues before terminating the cycle. |
| `tickConcurrency` | `"parallel" \| "sequential"` | `"sequential"` | Controls whether queue ticks are evaluated sequentially (CPU/memory safe) or simultaneously via `Promise.allSettled` (high throughput). |
| `healthCheckIntervalSec` | `number` | `15` | How often (in seconds) the engine checks its own internal health and runtime state. |
| `interventionPolicy` | `"tick" \| "cycle" \| "disabled"` | `"disabled"` | Default engine-wide policy for evaluating external cancellation or stop signals (`tick`, `cycle`, or `disabled`). |

### Self-Invoking Engine Options (`SelfInvokingEngine` — **Required for Serverless VM & V8 Isolate Runtimes**)

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `selfURL` | `string` | **Required** | The target endpoint URL used for engine self-invocation loops. |
| `selfInvocationMethod` | `"auto_using_pgnet" \| Object` | `"auto_using_pgnet"` | Specifies whether self-invocation uses database `pg_net` or a custom `manual` handler function (`{ method: "manual", handler: ... }`). |
| `selfInvocationIntervalSec` | `number` | `1` | Specifies how often (in seconds) the engine should invoke itself (minimum `1`). |
| `selfRestartIntervalSec` | `number` | *Optional* | Interval frequency for forcing engine process restarts. |

### Persistent Engine Options (`PersistentEngine` — **Used exclusively in Persistent Runtime**)

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `poolingMode` | `EnginePoolingMode` | *Optional* | Strategy for worker polling (`'interval-driven-pooler'` or `'event-driven-pooler'`). |
| `poolingIntervalMS` | `number` | *Optional* | Polling interval duration in milliseconds for the persistent engine loop. |

## Consumer Architecture

Pulsar separates orchestration from application-specific job execution.

Supported consumer mechanisms include:

| Consumer | Description |
|---|---|
| HTTP | Dispatches jobs to HTTP endpoints |
| Async Callback | Executes jobs through in-process asynchronous callbacks |
| WebSocket | Provides persistent network dispatch for connected consumers |
| External Integrations | Allows forwarding or transforming jobs for systems such as Kafka and NATS |

Consumers are responsible for executing application-specific business logic. Pulsar coordinates job pulling, execution capacity, and processing lifecycle management.

## Unified Storage System

Pulsar's Unified Storage System separates durable message storage from operational coordination.

- **PostgreSQL:** Provides the underlying persistent database.
- **PGMQ:** Manages queue and message storage.
- **Redis (optional):** Accelerates frequently accessed operational state.
- **PostgreSQL unlogged tables:** Provide an alternative for operational state when Redis is not configured.

Redis can be configured using a standard TCP driver or an HTTP-based driver suitable for serverless and edge environments.

When Redis is unavailable, Pulsar can use PostgreSQL unlogged tables for relevant operational operations. These tables are not crash-durable and their contents may be cleared following a database crash.

## Use Cases

Pulsar is designed for applications that need PostgreSQL-backed job processing without maintaining a separate runtime-specific orchestration system.

- Background job processing
- Serverless task execution
- Edge-based job processing
- Distributed worker coordination
- Scheduled queue processing
- Event-driven job execution
- Multi-queue concurrency management
- HTTP-based job dispatch
- Persistent worker infrastructure

## Why Pulsar?

PGMQ provides message management. PostgreSQL provides the underlying database. Consumers provide business logic.

Pulsar connects these components through a runtime-flexible orchestration engine.

Whether your application runs on a persistent server, serverless VM, or V8 isolate, Pulsar provides a unified way to coordinate queue processing, manage execution capacity, and continue work across runtime boundaries.

**Pulsar allows developers to use PostgreSQL and PGMQ as their messaging foundation without building and maintaining a separate polling and orchestration engine.**

## License

Pulsar is open-source. Refer to the repository for license details.