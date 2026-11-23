# Roadmap

This document describes features planned for Pulsar. None of them are implemented yet.

## Scheduled polling

#### Background

Pulsar currently supports two polling modes:

- **Interval-driven polling.** The engine runs continuously and executes a queue tick at every configured interval. On serverless or isolated runtimes, the engine is re-invoked every interval.
- **Event-driven polling.** The engine stays idle until it receives a signal, such as a database notification or a webhook. Once awake, it keeps ticking and dispatching jobs to consumers until the queue is empty and every job has been dispatched.

#### Plan

Add a third mode, **scheduled polling**, which combines the two. Instead of running all the time (interval-driven) or waiting for an external signal (event-driven), the engine or queue wakes up at times you define, processes jobs for a window, and then goes back to sleep.

While a window is open, the engine behaves like the interval-driven poller: it repeatedly invokes itself and keeps ticking. The schedule decides when it starts and when it stops.

#### Example

A `pdf-export` queue that runs every day at 12 p.m.:

- At 12:00 p.m. the engine wakes up and starts processing the queue.
- It runs for up to 30 minutes, then goes back to sleep.
- The next window opens at 12:00 p.m. the following day.

#### Window end behavior

The end of a window is optional:

- **End defined.** The engine processes the queue for that amount of time, then goes back to sleep. Any remaining jobs wait for the next window.
- **End undefined.** The engine keeps running until the queue is fully drained and every job has been dispatched.

#### Why this is useful

- Heavy or expensive queues, such as PDF exports or report generation, can run during off-peak hours.
- Workloads that only need to run at certain times do not need an always-on engine or an external signal.
- Resource use becomes predictable, which matters on platforms that limit execution by CPU time.