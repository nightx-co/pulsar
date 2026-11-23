# Architecture & Known Limitations

Pulsar is a beta-stage job-processing engine built around PostgreSQL, PGMQ, persistent connections, and a unified storage layer.

It is designed for smaller applications that need background job processing without operating separate queue infrastructure. It is not yet suitable for high-throughput, mission-critical, or availability-sensitive workloads.

## Performance

In our benchmark, Pulsar Engine processed approximately **37,780 jobs per second** on a machine with 16 GB RAM and an AMD Ryzen 5 5600G.

The benchmark used persistent WebSocket connections and excluded the HTTP dispatch layer.

This is not high throughput. The main bottlenecks are:

- Job scheduling.
- Queue processing.
- Dispatching.
- Database query execution.
- Database function overhead.
- Unnecessary database operations.

Until these areas are optimized, use Pulsar for low-to-moderate workloads rather than systems that need to sustain millions of requests per second.

## Reliability

We do not currently make availability guarantees such as 99.9% or 99.99%.

Pulsar has not undergone enough stress testing, failure simulation, or long-running production use to validate its behavior under sustained load, network interruptions, database failures, or worker crashes.

Treat reliability as unproven until we publish reproducible stress-test results and collect more production feedback.

## Configuration

Configuration is a mission critical part of running Pulsar. If it is not set up correctly the engine will not work. This covers three areas:

- Storage configuration.
- Runtime configuration.
- Engine configuration.

We have tried to explain each of these in our documentation and on GitHub. If something is still unclear or hard to follow, or missing please open a [GitHub issue](https://github.com/nightx-co/pulsar/issues) and tell us. We want to hear your feedback and we will use it to make configuration easier to understand and easier to get right.

**Reducing configuration**

We have put a lot of effort into designing the engine's interfaces to minimize the amount of configuration you have to write. The network interface is a good example. In the early phase, supporting WebSocket and HTTP consumers meant you had to:

- Define a WebSocket driver and an HTTP driver, the same way you define the storage layer.  
Pass those drivers in.
- Also define the network interface inside the engine configuration.

The network interface now constructs its built-in HTTP/WebSocket drivers, but persistent runtimes still require the `networkInterface` configuration; only manual driver setup is gone.

## Recommended use

Pulsar is a good fit for:

- Small to medium applications.
- Background jobs and delayed work.
- Projects that want queueing without deploying SQS, Cloudflare Queues, or similar infrastructure.
- Workloads where moderate throughput and best-effort delivery are acceptable.

Avoid Pulsar for:

- Payment processing.
- Financial transactions.
- Mission-critical workflows.
- Systems requiring strict delivery, ordering, or availability guarantees.
- High-throughput distributed systems.

## Storage layer

PostgreSQL is the foundation of Pulsar’s unified storage layer.

The current SQL queries, database functions, and repository implementations are not optimized for high-throughput work. In particular, we need to:

- Improve query execution plans.
- Add and tune indexes.
- Optimize database functions.
- Reduce redundant database operations.
- Benchmark storage performance under realistic queue sizes and concurrency.

Because every job operation touches the storage layer, these improvements will have a direct effect on overall engine throughput.

## Network dispatch

The current dispatch implementation has room to improve, especially for persistent connections and larger payloads.

We plan to adopt MessagePack for network serialization to reduce payload size and bandwidth usage. Until then, serialization overhead and payload size may affect dispatch performance.

## Serverless and V8 isolates

Pulsar is not yet well suited to constrained serverless environments.

In our testing, engine initialization and preparation consumed roughly **two seconds of CPU time** in some V8 isolate environments. We have not yet fully identified the source of this overhead.

This matters in platforms such as Supabase Edge Functions, where CPU execution time is limited. For example, with three queues and a cycle tick limit of 10, the engine may exceed the CPU soft limit before reaching its wall-clock limit.

Queue management, initialization, and execution cycles consume CPU time independently of wall-clock time. The engine kernel needs substantially lower initialization overhead and more efficient execution before we can consider serverless environments properly supported.

## Roadmap

The main areas we plan to improve are:

- Engine scheduling, queue processing, and dispatch throughput.
- Database indexes, queries, functions, and storage operations.
- MessagePack serialization and network dispatch efficiency.
- Serverless initialization and CPU usage.
- Stress testing, failure simulation, and long-running reliability validation.

Pulsar is intentionally positioned as a beta project. We prefer stating its current limits clearly over implying performance or reliability guarantees that it does not yet have.