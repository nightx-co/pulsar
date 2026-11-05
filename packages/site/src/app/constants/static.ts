
export const INSTALL = "npm install pulsar";
export const LINKS = { quickstart: "docs/getting-started/quickstart/serverless", github: "https://github.com/nightx-co/pulsar", docs: "docs/getting-started/introduction", config: "docs/configurations/overview" };
export const HEIGHTS = [46, 72, 38, 88, 54, 66, 32, 80, 50, 70];

 
export const TARGETS: { id: string; sub: string; code: string }[] = [
  {
    id: "HTTP endpoint",
    sub: "Any service, runtime or language",
    code: `consumer: {
  type: "http",
  url: "https://api.example.com/jobs/scrape",
  headers: { authorization: "Bearer ..." },
}`,
  },
  {
    id: "Async callback",
    sub: "In-process handler, no extra network hop",
    code: `consumer: {
  type: "callback",
  sleep: 30,
  handler: async (job, worker) => {
    await doWork(job.payload);
    await worker.deregister();
  },
}`,
  },
  {
    id: "WebSocket",
    sub: "Persistent engine and consumers",
    code: `consumer: {
  type: "websocket",
  // long-lived channel between engine and consumers
}`,
  },
  {
    id: "Kafka",
    sub: "Forward claimed jobs to streams",
    code: `consumer: {
  type: "callback",
  handler: async (job) => {
    await producer.send({ topic: "jobs", messages: [{ value: JSON.stringify(job.payload) }] });
  },
}`,
  },
  {
    id: "NATS",
    sub: "Forward claimed jobs to subjects",
    code: `consumer: {
  type: "callback",
  handler: async (job) => {
    nc.publish("jobs.scrape", codec.encode(JSON.stringify(job.payload)));
  },
}`,
  },
];


export const NAV: [string, string][] = [
  ["what", "What it is"],
  ["poolers", "Poolers"],
  ["features", "Features"],
  ["tick", "The tick"],
  ["tuning", "Tuning"],
  ["runtimes", "Runtimes"],
  ["storage", "Storage"],
  ["integrations", "Integrations"],
  ["compatibility", "Compatibility"],
  ["author", "Auhtor"],
];

export const HANDLES = [
  "When to wake and when to stay quiet",
  "How much work to pull each tick",
  "Per-queue and global concurrency",
  "Distributed locks and worker slots",
  "Retries and failure recovery",
  "Clean handoff across serverless invocations",
];
export const NOT = ["A message queue or broker", "A replacement for PGMQ", "A home for your business logic"];

export const PROFILES: [string, string][] = [
  ["realtime", "Tightest polling for latency-sensitive work"],
  ["fast", "Frequent polls, low pickup delay"],
  ["balanced", "A sensible default for most queues"],
  ["relaxed", "Fewer polls, gentler on the database"],
  ["background", "Long intervals for batch and delayed jobs"],
];

export const TICK_STEPS: [string, string][] = [
  ["Evaluate limits", "Read queue config, tick limits and the host clock."],
  ["Size the batch", "Work out how much can run inside the budget."],
  ["Pull from PGMQ", "Claim a batch of jobs from the queue."],
  ["Dispatch", "Send each job to its configured consumer."],
  ["Update state", "Record workers, slots and locks."],
  ["Decide", "Run another tick, or stop and hand off."],
];

export const STORAGE_OPS = [
  "Worker registration",
  "Worker deregistration",
  "Execution state",
  "Distributed locks",
  "Slot accounting",
];


export const ENGINE_CODE = `const pulsar = new Pulsar({
  engine: {
    runtime: "edge-isolate",
    storage: { cache: upstash },
    selfInvocation: { mode: "pg_net", intervalSec: 1 },
    maxGlobalConcurrency: 100,
    cycleTickLimit: 10,
    tickConcurrency: "sequential",
  },
});`;

export const QUEUE_CODE = `pulsar.createQueue({
  name: "scrape",
  pooler: "event-driven",
  profile: "balanced",
  concurrency: 10,
  n: 10,
  maxJobsPerTick: 100,
  consumer: { type: "http", url: process.env.WORKER_URL },
});`;
