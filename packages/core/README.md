# Pulsar

**Runtime-flexible messaging poller and orchestration engine for PostgreSQL and PGMQ.**

Pulsar coordinates job pulling worker lifecycle, concurrency, scheduling and dispatch across persistent servers, serverless VMs and V8 isolates. It works on top of PostgreSQL and PGMQ—it is not a message broker.

## Features

- Persistent, serverless VM and V8 isolate runtimes
- Tick based job processing and configurable polling
- Interval-driven and event-driven polling strategies
- Global and per queue concurrency controls
- Worker coordination and runtime aware scheduling
- HTTP, callbacks, WebSockets and external integrations
- PostgreSQL storage with optional Redis acceleration

## Installation

```bash
npm install "@nightx.co/pulsar"
```

## Requirements

- PostgreSQL with `pgmq`, `pg_cron` (version > 1.6.4) and `pg_net`
- A supported runtime: Node.js, Deno, Bun, AWS Lambda, Edge Functions, Serversless Functions or a persistent server
- Serverless environments should provide at least 2 seconds of CPU execution time

## Quick Start

This example configures Pulsar for a persistent runtime with PostgreSQL storage and an HTTP consumer.

### 1. Import

```typescript
import { Pulsar, PulsarRuntime, createQueue, EventTriggerStrategy } from "@nightx.co/pulsar";
import {
  PostgresDriver,
  PulsarUnifiedStorage,
  RedisDriver,
} from "@nightx.co/pulsar/storage";
```

### 2. Configure storage

Redis is optional. PostgreSQL is the persistent storage layer.

```typescript
const postgresDriver = new PostgresDriver({
  connectionString: process.env.DATABASE_URL,
  connectionProtocol: process.env.DATABASE_POOLER, // Tcp | Session | Transaction
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

To run without Redis:

```typescript
const unifiedStorage = new PulsarUnifiedStorage({
  db: postgresDriver,
  strategy: "AUTO",
});
```

### 3. Define a queue

```typescript
const Queue1 = createQueue({
  queue: "q_1",
  type: "fifo", // or "STANDER"

  concurrency: 10,
  n: 10,
  maxJobsPerTick: 1000,
  cycleTickLimit: 10,
  sleep: 10,

  profile: "STANDARD",
  pooler: "interval-driven-pooler",

  stateTransitionPolicy: {
    enabled: true,
    idleThresholdTicks: 10,
    idleTimingProfile: "RELAXED",
  },

  interventionPolicy: "inherit",
  deadLetterQueue: "q_1_dlq",

  consumer: {
    type: "http",
    url: "http://localhost:9999/process-job",
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
    optimizePayload: true,
  },
});
```

### 4. Initialize and start the engine

```typescript
const engine = new Pulsar({
  runtime: PulsarRuntime.PERSISTENT,

  storage: unifiedStorage,
  queues: [Queue1],

  apiKey: process.env.PULSAR_API_KEY,
  instanceId: 'instacne-id',

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

  eventTriggerStrategy: EventTriggerStrategy['POSTGRES_NOTIFY'],
});

await engine.start();
```

Pulsar coordinates queue processing. Your consumer endpoint handles the application specific job logic.

## Configuration

| Option | Description |
|---|---|
| `runtime` | `PERSISTENT`, `SERVERLESS_VM`, or `V8_ISOLATE` |
| `storage` | PostgreSQL-backed `PulsarUnifiedStorage`; Redis is optional |
| `queues` | Queue modules created with `createQueue()` |
| `apiKey` | Shared engine/consumer API key |
| `instanceId` | Unique identifier for the engine instance |
| `pooler` | `interval-driven-pooler` or `event-driven-pooler` |
| `profile` | `REALTIME`, `STANDARD`, `BALANCED`, `RELAXED`, or `ULTRA_EFFICIENT` |

Runtime-specific configuration differs. Persistent runtimes use network and event-trigger settings; serverless VM and V8 isolate runtimes use self-invocation configuration with an isolate tracker required for `V8_ISOLATE`.

## Storage behavior

- **PostgreSQL** provides persistence.
- **PGMQ** manages queues and messages.
- **Redis (optional)** accelerates operational state.
- Without Redis, Pulsar uses PostgreSQL unlogged tables for relevant operational state. These tables are not crash durable and their contents may be cleared after a database crash.

## Resources

Explore the deployment guides, runtime examples and database integration references to get started with Pulsar in your environment.

### Deployment Guides

| Resource | Description |
| --- | --- |
| [Deploy Pulsar to a Persistent Runtime](./deployment/persistent-runtime.mdx) | Learn how to deploy Pulsar in a persistent execution environment. |
| [Deploy Pulsar to a Serverless VM](./deployment/serverless-vm.mdx) | Learn how to configure and deploy Pulsar using a serverless VM runtime. |
| [Deploy Pulsar to a V8 Isolate](./deployment/v8-isolate.mdx) | Learn how to deploy Pulsar in a V8 isolate environment. |

### Database Integrations

| Resource | Description |
| --- | --- |
| [Getting Started with Supabase](./integrations/supabase.mdx) | Learn how to configure Pulsar with Supabase Postgres and PGMQ. |
| [Getting Started with Neon](./integrations/neon.mdx) | Learn how to configure Pulsar with Neon Postgres. |
| [PostgreSQL Setup](./integrations/postgresql.mdx) | Learn how to configure PostgreSQL as the unified storage backend for Pulsar. |

### Configuration & Setup

| Resource | Description |
| --- | --- |
| [Self-Invocation Setup](./configuration/self-invocation.mdx) | Learn how to configure engine self-invocation for serverless runtimes. |
| [Persistent Engine Setup](./configuration/persistent-engine.mdx) | Learn how to configure the persistent engine and its pooling strategies. |
| [Unified Storage Setup](./configuration/unified-storage.mdx) | Learn how to configure PostgreSQL storage and optional Redis memory offloading. |
| [Environment Variables](./configuration/environment-variables.mdx) | Reference the environment variables required to configure Pulsar. |

## License

Pulsar is open source. See the repository for license details.