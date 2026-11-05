# Pulsar Runtime-Flexible Messaging Poller and Orchestration Engine

Pulsar is an open-source, runtime-flexible messaging poller and orchestration engine built on PostgreSQL and PGMQ. It provides the execution layer required to reliably pull, coordinate, and dispatch queued jobs across serverless functions, edge runtimes, and persistent servers.

Pulsar is not a message queue or broker. It operates on top of an existing PGMQ and PostgreSQL infrastructure, managing the execution lifecycle around the messages stored there. Rather than requiring developers to build their own polling loops, concurrency controls, worker coordination, and runtime-specific execution logic, Pulsar provides a configurable engine that handles these responsibilities while allowing developers to retain control over their database, queue infrastructure, and business logic.

## Execution Engine and Tick-Based Processing

At the core of Pulsar is a tick-based execution model. A tick represents one complete execution cycle in which the engine evaluates queue configurations and execution limits, determines how much work can be processed, pulls a batch of jobs from PGMQ, dispatches those jobs to their configured consumers, updates operational state, and determines whether another cycle should run.

The engine coordinates work according to per-queue concurrency settings, batch sizes, maximum jobs per tick, and global concurrency limits. When the requested workload exceeds the available execution budget, Pulsar adjusts the amount of work processed rather than blindly attempting to execute everything at once. It also supports sequential and parallel tick execution, allowing developers to choose between more controlled resource consumption and greater throughput.

Pulsar's internal clock tracks the execution time available to the current runtime. This is particularly important in serverless environments, where each invocation has a finite execution window. Instead of depending on a long-running process, the engine can stop a cycle before reaching the host's execution limit and hand off further work to a fresh invocation. This allows execution to continue across multiple runtime invocations without requiring a permanently running server.

## Interval-Driven and Event-Driven Polling

Pulsar supports two approaches to activating queue processing.

**Interval-driven polling** checks queues according to a configured polling cadence. Developers can choose a timing profile based on their latency and resource-consumption requirements, ranging from frequent polling for latency-sensitive workloads to longer intervals for background jobs where minimizing database activity is more important. Polling is coordinated through shared locking to prevent multiple workers from independently processing the same scheduled queue work.

**Event-driven activation** allows a queue to remain idle until a database event triggers processing. When new work arrives, the engine can activate and drain the queue rather than continuously polling an empty queue. A burst of inserted messages can therefore be handled as a coordinated processing cycle instead of requiring a separate engine invocation for every message.

These approaches let developers balance responsiveness, database load, and execution cost according to the nature of each workload.

## Runtime-Aware Execution

Pulsar is designed to adapt its execution lifecycle to different hosting environments rather than requiring one runtime model for every deployment.

- **V8 isolates and edge runtimes:** The engine accounts for invocation limits and isolate lifecycle constraints. It can pause and trigger a fresh invocation when required, using a configured self-invocation mechanism.
- **Serverless virtual machines and containers:** Each invocation processes work within its execution budget and can initiate a subsequent run when more work remains.
- **Persistent runtimes:** The engine can remain active in a long-running process, continuously coordinating ticks without requiring serverless-style self-invocation.

Runtime configuration determines how Pulsar manages execution budgets, tick limits, restarts, and continuation. This allows the same orchestration model to support both short-lived serverless execution and long-running worker deployments.

## Queue-Level Configuration and Resource Management

Each queue can be configured independently with its own consumer, polling profile, concurrency, batch size, and execution limits. This makes it possible to run queues with different workload characteristics through the same engine without forcing them to share identical processing policies.

Pulsar also coordinates concurrency at the engine level. Per-queue settings determine how much work an individual queue can request, while a global concurrency limit caps the total workload across queues. When multiple queues compete for execution capacity, the engine adjusts their available concurrency according to the configured limits.

This provides a common resource-management layer for workloads that differ in throughput, latency sensitivity, and processing cost.

## Worker Coordination, Locking, and Recovery

Coordinating job execution requires more than pulling messages. Pulsar manages operational state associated with workers, execution slots, distributed locks, and job processing. These mechanisms help coordinate concurrent workers, reduce conflicting execution, and support retry and failure-recovery workflows.

The engine also manages worker registration and deregistration, allowing execution capacity to be tracked as workers begin and finish processing. Correct lifecycle management is important for preventing occupied worker slots from accumulating and eventually blocking queue progress.

Pulsar's coordination mechanisms operate alongside PGMQ's message-management capabilities. They provide the orchestration required to execute jobs across different runtime environments without turning Pulsar itself into another message-storage system.

## Unified Storage Architecture

Pulsar separates durable message storage from the operational state needed to coordinate execution.

PostgreSQL remains the underlying persistent database, with PGMQ responsible for queue and message management. Pulsar's unified storage layer handles operational coordination such as worker registration, deregistration, execution state, and locking.

Redis is an optional acceleration layer for frequently accessed operational state. Depending on the deployment, Pulsar can communicate with Redis through a standard TCP driver or an HTTP-based driver suitable for serverless and edge environments.

When Redis is not configured, Pulsar can use an unlogged PostgreSQL table for relevant operational operations. This provides a database-backed alternative without requiring an additional cache service. Because PostgreSQL unlogged tables are not crash-durable, their operational contents can be cleared after a database crash; this does not mean the underlying PGMQ messages are stored in those tables.

This architecture allows deployments to choose between a simpler PostgreSQL-only setup and a configuration that uses Redis to accelerate hot operational paths.

## Flexible Consumer and Dispatch Architecture

Pulsar separates job orchestration from the code that performs the actual work. Once jobs are pulled from PGMQ, they can be dispatched to consumers through different execution mechanisms.

- **HTTP consumers:** Pulsar sends jobs to an HTTP endpoint, allowing the handler to run in a separate service, another runtime, or a different programming language.
- **Asynchronous callback consumers:** Jobs can be executed by a callback function within the same process, avoiding an additional network hop where in-process execution is appropriate.
- **Persistent network consumers:** In persistent deployments, WebSocket-based dispatch can provide a long-lived communication channel between Pulsar and connected consumers. Pulsar manages the transport integration so developers do not need to implement runtime-specific HTTP server and WebSocket upgrade boilerplate themselves.
- **External integrations:** Consumer logic can forward or transform work for systems such as Kafka, NATS, or other messaging infrastructure.

Transport selection depends on the deployment topology. Persistent engine and consumer deployments can use WebSockets for ongoing communication, while serverless consumers commonly use HTTP endpoints. This allows Pulsar to support different networking requirements without forcing every consumer to run in the same environment.

Consumer execution and job-storage lifecycle operations are separate concerns. Where consumers need to acknowledge, retry, or otherwise update job and worker state, Pulsar's storage abstractions allow those operations to be handled without requiring every consumer to initialize the complete orchestration engine or duplicate its scheduling responsibilities.

## Extensibility and Customization

Pulsar is designed to provide an orchestration foundation rather than dictate application-level business logic. Developers can configure queue behavior, consumer implementations, execution limits, dispatch mechanisms, and storage options to match their applications.

Its extensibility supports custom hooks, payload transformations, queue routing, and event-driven activation. Consumers remain responsible for the application-specific work performed by each job, while Pulsar coordinates when that work is pulled, how execution capacity is allocated, and how processing continues across runtime boundaries.

## The Role of Pulsar

Pulsar bridges the gap between a PostgreSQL-backed message queue and the runtime environments responsible for executing its jobs. PGMQ provides message management; PostgreSQL provides the underlying database; consumers provide business logic; and Pulsar coordinates the execution lifecycle connecting them.

By combining tick-based processing, runtime-aware scheduling, interval-driven and event-driven polling, concurrency management, worker coordination, flexible dispatch, and optional Redis acceleration, Pulsar provides a unified orchestration engine for applications that need to process queued work across serverless functions, edge runtimes, and persistent infrastructure.

Its central goal is to let developers use PostgreSQL and PGMQ as their messaging foundation without having to build and maintain a separate, runtime-specific polling and orchestration system themselves.