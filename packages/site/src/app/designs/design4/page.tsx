"use client";

import { useEffect, useState } from "react";

/* ================================================================== */
/*  DATA  (placeholders: swap in your real pulsarData values)          */
/* ================================================================== */
const INSTALL = "npm install pulsar";
const LINKS = { quickstart: "#", github: "#", docs: "#", config: "#" };
const ACC = "#ff5b2e";
const HEIGHTS = [46, 72, 38, 88, 54, 66, 32, 80, 50, 70];

const NAV: [string, string][] = [
  ["what", "What"],
  ["poolers", "Poolers"],
  ["features", "Features"],
  ["tick", "Tick"],
  ["tuning", "Tuning"],
  ["runtimes", "Runtimes"],
  ["storage", "Storage"],
  ["integrations", "Integrations"],
];

const HANDLES = [
  "When to wake and when to stay quiet",
  "How much work to pull each tick",
  "Per-queue and global concurrency",
  "Distributed locks and worker slots",
  "Retries and failure recovery",
  "Clean handoff across serverless invocations",
];
const NOT = ["A message queue or broker", "A replacement for PGMQ", "A home for your business logic"];

const PROFILES: [string, string][] = [
  ["realtime", "Tightest polling for latency-sensitive work"],
  ["fast", "Frequent polls, low pickup delay"],
  ["balanced", "A sensible default for most queues"],
  ["relaxed", "Fewer polls, gentler on the database"],
  ["background", "Long intervals for batch and delayed jobs"],
];

const TICK_STEPS: [string, string][] = [
  ["Evaluate limits", "Read queue config, tick limits and the host clock before doing anything."],
  ["Size the batch", "Work out how much can run inside the budget: concurrency, batch size, global caps."],
  ["Pull from PGMQ", "Claim a batch of jobs from the queue under the right locks."],
  ["Dispatch", "Send each job to its configured consumer: HTTP, callback, WebSocket or a broker."],
  ["Update state", "Record workers, execution slots and locks in the storage layer."],
  ["Decide", "Run another tick, or stop cleanly and hand off to a fresh invocation."],
];

const STORAGE_OPS = [
  "Worker registration",
  "Worker deregistration",
  "Execution state",
  "Distributed locks",
  "Slot accounting",
];

type RT = {
  id: string;
  label: string;
  kind: "vm" | "isolate" | "persistent";
  blurb: string;
  hosts: string[];
  rows: [string, string][];
};

const RUNTIMES: RT[] = [
  {
    id: "serverless-vm",
    label: "Serverless VM",
    kind: "vm",
    blurb: "Each invocation works inside its execution budget. When more work remains, it starts the next run in a new container.",
    hosts: ["AWS Lambda", "Cloud Run", "Vercel Functions"],
    rows: [["lifecycle", "Run, self-invoke, run"], ["handoff", "New container"], ["idle cost", "Pay per run"]],
  },
  {
    id: "edge-isolate",
    label: "Edge isolate",
    kind: "isolate",
    blurb: "Respects invocation limits and isolate recycling. Pauses, then triggers a fresh isolate through the configured self-invocation.",
    hosts: ["Supabase Edge Functions", "Cloudflare Workers", "Deno Deploy"],
    rows: [["lifecycle", "Run, pause, recycle"], ["handoff", "Fresh isolate"], ["idle cost", "Near zero"]],
  },
  {
    id: "persistent",
    label: "Persistent server",
    kind: "persistent",
    blurb: "One long-running process that keeps ticking. No self-invocation needed, and WebSocket dispatch is available.",
    hosts: ["Node.js", "Bun", "Docker", "Kubernetes"],
    rows: [["lifecycle", "Always on"], ["handoff", "None"], ["idle cost", "Server running cost"]],
  },
];

const ENGINE_CODE = `const pulsar = new Pulsar({
  engine: {
    runtime: "edge-isolate",
    storage: { cache: upstash },
    selfInvocation: { mode: "pg_net", intervalSec: 1 },
    maxGlobalConcurrency: 100,
    cycleTickLimit: 10,
    tickConcurrency: "sequential",
  },
});`;

const QUEUE_CODE = `pulsar.createQueue({
  name: "scrape",
  pooler: "event-driven",
  profile: "balanced",
  concurrency: 10,
  n: 10,
  maxJobsPerTick: 100,
  consumer: { type: "http", url: process.env.WORKER_URL },
});`;

const TARGETS: { id: string; sub: string; code: string }[] = [
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

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================================================================== */
/*  PRIMITIVES                                                         */
/* ================================================================== */
function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12h6l2-9 4 18 3-9h7" stroke={ACC} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Btn({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <a
      href={href}
      className={
        "inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b2e] " +
        (solid ? "bg-[#ff5b2e] text-black hover:bg-[#ff7a52]" : "border border-[#333] text-[#f2f2f2] hover:border-[#f2f2f2]")
      }
    >
      {children}
    </a>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] " + className}>{children}</div>;
}

function Label({ children, hot = false }: { children: React.ReactNode; hot?: boolean }) {
  return <div className={"pl-mono text-[11px] uppercase tracking-[0.14em] " + (hot ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>{children}</div>;
}

function Seg({ options, value, onChange, label }: { options: string[]; value: number; onChange: (i: number) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex flex-wrap rounded-md border border-[#1f1f1f] bg-[#0a0a0a] p-1">
      {options.map((o, i) => (
        <button
          key={o}
          role="tab"
          aria-selected={value === i}
          onClick={() => onChange(i)}
          className={
            "rounded px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " +
            (value === i ? "bg-[#f2f2f2] text-black" : "text-[#8a8a8a] hover:text-[#f2f2f2]")
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Code({ code, title }: { code: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-black">
      <div className="pl-mono flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-2.5 text-xs text-[#5a5a5a]">
        <i className="h-2 w-2 rounded-full bg-[#ff5b2e]" />
        {title}
      </div>
      <pre className="pl-mono overflow-x-auto p-5 text-[13px] leading-6 text-[#d4d4d4]"><code>{code}</code></pre>
    </div>
  );
}

function Ruler() {
  return (
    <svg className="block h-3 w-full" aria-hidden>
      <defs>
        <pattern id="r1" width="10" height="12" patternUnits="userSpaceOnUse"><rect x="0" y="8" width="1" height="4" fill="#2a2a2a" /></pattern>
        <pattern id="r2" width="100" height="12" patternUnits="userSpaceOnUse"><rect x="0" y="2" width="1" height="10" fill="#555" /></pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#r1)" />
      <rect width="100%" height="12" fill="url(#r2)" />
    </svg>
  );
}

function Stage({ id, n, title, lead, children }: { id: string; n: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14">
      <Ruler />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-14">
        <div className="pl-mono flex items-center gap-4 text-xs text-[#5a5a5a]">
          <span className="text-[#ff5b2e]">{n}</span>
          <span>/ 08</span>
          <span className="uppercase tracking-[0.14em]">{NAV.find((x) => x[0] === id)?.[1]}</span>
        </div>
        <h2 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">{title}</h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#8a8a8a] md:ml-auto md:mt-0 md:-translate-y-2 md:text-lg">{lead}</p>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  HEADER: the section bar is a row of ticks                          */
/* ================================================================== */
function Header() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(NAV.findIndex((x) => x[0] === e.target.id));
        }),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#1f1f1f] bg-black/90 backdrop-blur">
      <div className="flex h-14 items-stretch">
        <a href="#top" className="flex items-center gap-2 border-r border-[#1f1f1f] px-5 font-semibold">
          <Mark /> Pulsar
        </a>
        <nav className="hidden flex-1 xl:flex" aria-label="Sections">
          {NAV.map(([id, label], i) => (
            <a
              key={id}
              href={"#" + id}
              className={"group relative flex flex-1 items-end gap-2 px-3 pb-2.5 pl-mono text-[11px] transition-colors " + (i === active ? "text-[#f2f2f2]" : "text-[#5a5a5a] hover:text-[#f2f2f2]")}
            >
              <span className="absolute inset-x-1 top-0 h-[3px] rounded-b" style={{ background: i === active ? ACC : i < active ? "#555" : "#1f1f1f" }} />
              <span className={i === active ? "text-[#ff5b2e]" : ""}>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5 border-l border-[#1f1f1f] px-5 text-sm">
          <a className="hidden text-[#8a8a8a] hover:text-[#f2f2f2] sm:block" href={LINKS.github}>GitHub</a>
          <a className="hidden text-[#8a8a8a] hover:text-[#f2f2f2] sm:block" href={LINKS.docs}>Docs</a>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle sections"
            className="pl-mono rounded border border-[#333] px-3 py-1.5 text-xs xl:hidden"
          >
            {open ? "close" : String(active + 1).padStart(2, "0") + " " + NAV[active][1]}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#1f1f1f] bg-black p-3 xl:hidden">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {NAV.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={"#" + id}
                  onClick={() => setOpen(false)}
                  className={"pl-mono block rounded px-3 py-3 text-xs " + (i === active ? "bg-[#ff5b2e] text-black" : "text-[#8a8a8a] hover:bg-[#111]")}
                >
                  {String(i + 1).padStart(2, "0")} {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ================================================================== */
/*  HERO: a live run ledger                                            */
/* ================================================================== */
function CopyCmd() {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(INSTALL);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      aria-label={`Copy ${INSTALL}`}
      className="pl-mono flex items-center gap-3 rounded-md border border-[#333] px-5 py-3 text-sm text-[#d4d4d4] hover:border-[#f2f2f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b2e]"
    >
      <span className="text-[#ff5b2e]">$</span>
      {INSTALL}
      <span className="text-xs text-[#5a5a5a]">{ok ? "copied" : "copy"}</span>
    </button>
  );
}

const PULLED = [40, 38, 40, 22, 40, 40, 17, 40, 31, 40];
const MS = [14, 12, 15, 9, 13, 16, 8, 14, 11, 15];

function Ledger() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) { setN(12); return; }
    const id = setInterval(() => setN((x) => (x + 1) % 26), 650);
    return () => clearInterval(id);
  }, []);

  type L = { key: string; text: string; hot?: boolean; dim?: boolean };
  const all: L[] = [];
  all.push({ key: "boot", text: "engine up · runtime=edge-isolate · cycleTickLimit=10", dim: true });
  for (let i = 0; i < 10; i++)
    all.push({
      key: "t" + i,
      text: `tick ${String(i + 1).padStart(2, "0")}   pulled ${String(PULLED[i]).padStart(2, " ")}   dispatched ${String(PULLED[i]).padStart(2, " ")}   ${String(MS[i]).padStart(2, " ")}ms`,
    });
  all.push({ key: "h1", text: "cycleTickLimit reached → self-invoke", hot: true });
  all.push({ key: "r2", text: "run 2 · fresh isolate · resuming", dim: true });
  for (let i = 0; i < 4; i++)
    all.push({ key: "u" + i, text: `tick ${String(i + 1).padStart(2, "0")}   pulled ${String(PULLED[i + 2]).padStart(2, " ")}   dispatched ${String(PULLED[i + 2]).padStart(2, " ")}   ${String(MS[i + 3]).padStart(2, " ")}ms` });

  const shown = all.slice(0, Math.min(n, all.length)).slice(-9);

  return (
    <Panel className="overflow-hidden">
      <div className="pl-mono flex items-center justify-between border-b border-[#1f1f1f] px-4 py-2.5 text-xs text-[#5a5a5a]">
        <span className="flex items-center gap-2"><i className="pl-beat h-2 w-2 rounded-full bg-[#ff5b2e]" />run ledger</span>
        <span>pulsar · live</span>
      </div>
      <div className="pl-mono h-[258px] overflow-hidden p-4 text-[12.5px] leading-[26px] sm:text-[13px]" aria-hidden>
        {shown.map((l) => (
          <div key={l.key} className={"whitespace-pre " + (l.hot ? "text-[#ff5b2e]" : l.dim ? "text-[#5a5a5a]" : "text-[#d4d4d4]")}>
            <span className="mr-3 text-[#333]">›</span>{l.text}
          </div>
        ))}
        <span className="pl-beat inline-block h-4 w-2 translate-y-1 bg-[#ff5b2e]" />
      </div>
    </Panel>
  );
}

function Hero() {
  return (
    <section id="top" className="px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="pl-mono mb-8 flex flex-wrap items-center gap-2 text-xs text-[#8a8a8a]">
            <span className="rounded-full border border-[#ff5b2e] px-3 py-1 text-[#ff5b2e]">open source</span>
            <span className="rounded-full border border-[#333] px-3 py-1">PostgreSQL</span>
            <span className="rounded-full border border-[#333] px-3 py-1">PGMQ</span>
          </div>
          <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl xl:text-[6.5rem]">
            Multi-runtime pooler engine for <span className="text-[#ff5b2e]">PGMQ.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#8a8a8a] md:text-xl">
            Pulsar is the execution engine for PGMQ. It decides when to wake, how much to pull, who does the work and how to keep going, on serverless functions, edge isolates or your own servers.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Btn href={LINKS.quickstart} solid>Run your first queue →</Btn>
            <CopyCmd />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-4 lg:col-span-5">
          <Ledger />
          <p className="text-sm leading-relaxed text-[#8a8a8a]">
            Every line is a tick. When the tick budget or the host&apos;s clock runs out, Pulsar stops cleanly and hands off to a fresh run, so a serverless time limit never drops a job.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-3 divide-x divide-[#1f1f1f] border-y border-[#1f1f1f]">
        {[["3", "runtimes"], ["2", "pooler modes"], ["0", "idle polls when event-driven"]].map(([a, b]) => (
          <div key={b} className="px-3 py-6 md:px-8">
            <div className="text-4xl font-semibold tracking-tight md:text-6xl">{a}</div>
            <div className="pl-mono mt-2 text-[10px] uppercase tracking-[0.12em] text-[#5a5a5a] md:text-xs">{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  01 WHAT: horizontal stack                                          */
/* ================================================================== */
function What() {
  const cols: [string, string][] = [
    ["Your code", "Consumers and handlers"],
    ["Pulsar", "The orchestration layer"],
    ["PGMQ", "Stores and manages the messages"],
    ["PostgreSQL", "Durable foundation"],
  ];
  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1.8fr_auto_1fr_auto_1fr] lg:items-stretch">
        {cols.map(([t, d], i) => {
          const hot = i === 1;
          return (
            <div key={t} className="contents">
              {i > 0 && (
                <div className="pl-mono flex items-center justify-center text-[#ff5b2e] max-lg:hidden" aria-hidden>⇄</div>
              )}
              <div className={"rounded-lg border p-6 " + (hot ? "border-[#ff5b2e] bg-[#ff5b2e] text-black" : "border-[#1f1f1f] bg-[#0a0a0a]")}>
                <div className={"pl-mono text-[11px] " + (hot ? "text-black/60" : "text-[#5a5a5a]")}>L{4 - i}</div>
                <div className="mt-2 text-2xl font-semibold">{t}</div>
                <div className={"mt-1 text-sm " + (hot ? "text-black/70" : "text-[#8a8a8a]")}>{d}</div>
                {hot && (
                  <ul className="mt-6 space-y-2.5 border-t border-black/20 pt-5">
                    {HANDLES.map((h) => (
                      <li key={h} className="flex gap-3 text-sm font-medium"><span className="pl-mono">+</span>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Label>Pulsar is not</Label>
        {NOT.map((x) => (
          <span key={x} className="rounded-full border border-dashed border-[#333] px-4 py-1.5 text-sm text-[#5a5a5a] line-through decoration-[#ff5b2e]">{x}</span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  02 POOLERS: playable simulation                                    */
/* ================================================================== */
const COLS = 60;
const PERIODS = [2, 4, 6, 10, 15];

function Poolers() {
  const [pi, setPi] = useState(2);
  const [bursts, setBursts] = useState<number[]>([13, 41]);
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (reduced()) { setHead(COLS); return; }
    const t = setInterval(() => setHead((h) => (h + 1) % (COLS + 8)), 150);
    return () => clearInterval(t);
  }, []);

  const period = PERIODS[pi];
  const polls: number[] = [];
  for (let i = period - 1; i < COLS; i += period) polls.push(i);
  const hits = new Set<number>();
  const delays: number[] = [];
  bursts.forEach((b) => {
    const next = polls.find((p) => p >= b);
    if (next !== undefined) { hits.add(next); delays.push(next - b); }
  });
  const empty = polls.length - hits.size;
  const avg = delays.length ? (delays.reduce((a, b) => a + b, 0) / delays.length).toFixed(1) : "0.0";
  const eventActive = new Set<number>();
  bursts.forEach((b) => { for (let k = 0; k < 3; k++) if (b + k < COLS) eventActive.add(b + k); });

  const Playhead = () => (
    <div className="pointer-events-none absolute inset-y-0 w-px bg-[#f2f2f2]/50" style={{ left: `${Math.min(head / COLS, 1) * 100}%` }} />
  );

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Panel className="p-5 md:p-7 lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label>simulation · 60 cells</Label>
          <div className="flex gap-2">
            <button
              onClick={() => head < COLS && !bursts.includes(head) && setBursts([...bursts, head])}
              className="rounded-md bg-[#ff5b2e] px-4 py-2 text-sm font-medium text-black hover:bg-[#ff7a52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b2e]"
            >
              Insert jobs at playhead
            </button>
            <button onClick={() => setBursts([])} className="rounded-md border border-[#333] px-4 py-2 text-sm text-[#8a8a8a] hover:text-[#f2f2f2]">Clear</button>
          </div>
        </div>

        <div className="mt-7 space-y-6">
          <div>
            <div className="pl-mono mb-2 text-xs text-[#5a5a5a]">job inserts</div>
            <div className="relative h-6" aria-hidden>
              {bursts.map((b) => (
                <div key={b} className="absolute bottom-0 h-full w-[2px] bg-[#f2f2f2]" style={{ left: `${(b / COLS) * 100}%` }} />
              ))}
              <Playhead />
            </div>
          </div>

          <div>
            <div className="pl-mono mb-2 flex justify-between text-xs"><span className="text-[#f2f2f2]">interval-driven</span><span className="text-[#5a5a5a]">polls every {period} cells</span></div>
            <div className="relative flex h-14 items-end gap-[2px]" aria-hidden>
              {Array.from({ length: COLS }, (_, i) => {
                const isPoll = polls.includes(i);
                const hit = hits.has(i);
                return (
                  <div key={i} className="flex-1 transition-colors" style={{
                    height: isPoll ? "100%" : "8%",
                    background: isPoll ? (hit ? ACC : "#3a3a3a") : "#1a1a1a",
                    opacity: i <= head ? 1 : 0.45,
                  }} />
                );
              })}
              <Playhead />
            </div>
          </div>

          <div>
            <div className="pl-mono mb-2 flex justify-between text-xs"><span className="text-[#f2f2f2]">event-driven</span><span className="text-[#5a5a5a]">silent until a job is inserted</span></div>
            <div className="relative flex h-14 items-end gap-[2px]" aria-hidden>
              {Array.from({ length: COLS }, (_, i) => (
                <div key={i} className="flex-1 transition-colors" style={{
                  height: eventActive.has(i) ? "100%" : "8%",
                  background: eventActive.has(i) ? ACC : "#1a1a1a",
                  opacity: i <= head ? 1 : 0.45,
                }} />
              ))}
              <Playhead />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1f1f1f] pt-6">
          <Label>polling profile (sets the interval)</Label>
          <input
            type="range" min={0} max={4} value={pi} onChange={(e) => setPi(+e.target.value)}
            aria-label="Polling profile" className="mt-4 w-full accent-[#ff5b2e]"
          />
          <div className="pl-mono mt-2 grid grid-cols-5 text-[11px]">
            {PROFILES.map(([p], i) => (
              <button key={p} onClick={() => setPi(i)} className={"text-center " + (i === pi ? "text-[#ff5b2e]" : "text-[#5a5a5a] hover:text-[#f2f2f2]")}>{p}</button>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#8a8a8a]">{PROFILES[pi][1]}.</p>
        </div>
      </Panel>

      <div className="grid gap-4 lg:col-span-4">
        <Panel className="p-6">
          <Label>interval-driven</Label>
          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">polls</span><span className="pl-mono text-2xl">{polls.length}</span></div>
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">empty polls</span><span className="pl-mono text-2xl text-[#ff5b2e]">{empty}</span></div>
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">avg pickup delay</span><span className="pl-mono text-2xl">{avg}</span></div>
          </div>
          <p className="mt-5 border-t border-[#1f1f1f] pt-4 text-sm text-[#8a8a8a]">Idle cost: low, regular polls. Best for continuous, batch and delayed work. The default.</p>
        </Panel>
        <Panel className="p-6">
          <Label hot>event-driven</Label>
          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">wakes</span><span className="pl-mono text-2xl">{bursts.length}</span></div>
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">empty polls</span><span className="pl-mono text-2xl text-[#ff5b2e]">0</span></div>
            <div className="flex items-baseline justify-between"><span className="text-sm text-[#8a8a8a]">pickup latency</span><span className="pl-mono text-2xl">&lt;10ms</span></div>
          </div>
          <p className="mt-5 border-t border-[#1f1f1f] pt-4 text-sm text-[#8a8a8a]">Zero idle polls. Best for bursty, sporadic, interactive tasks. One insert burst is one drain, not one invocation per job.</p>
        </Panel>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  03 FEATURES: master / detail                                       */
/* ================================================================== */
const FEATURES: [string, string][] = [
  ["Per-queue configuration", "Concurrency, batch size, tick limits, timing profile and consumer, tuned separately for every queue in the same engine."],
  ["Runtime-aware engine", "An internal clock tracks the time your host has left and stops ticking before the platform ends the function, then hands off cleanly."],
  ["Reliable by construction", "Distributed locks, retries and failure recovery prevent races and duplicate processing."],
  ["Elastic scaling", "Workers wake on a trigger or an interval, so nothing idles waiting for jobs."],
  ["Dispatch anywhere", "HTTP endpoints, async handlers, or streams into Kafka, NATS and other brokers."],
  ["Deeply customizable", "Hooks, payload transformations, queue routing and event triggers are yours to shape."],
];

function FeatureVisual({ k }: { k: number }) {
  if (k === 0) {
    const rows = [["scrape", "event-driven", "10", "10"], ["embed", "event-driven", "4", "20"], ["scan", "interval-driven", "2", "5"]];
    return (
      <div className="pl-mono text-xs">
        <div className="grid grid-cols-[1.1fr_1.4fr_.8fr_.5fr] border-b border-[#1f1f1f] pb-2 text-[#5a5a5a]"><span>queue</span><span>pooler</span><span>concurrency</span><span>n</span></div>
        {rows.map((r) => (
          <div key={r[0]} className="grid grid-cols-[1.1fr_1.4fr_.8fr_.5fr] border-b border-[#141414] py-3 text-[#8a8a8a]">
            <span className="text-[#f2f2f2]">{r[0]}</span><span>{r[1]}</span><span className="text-[#ff5b2e]">{r[2]}</span><span className="text-[#ff5b2e]">{r[3]}</span>
          </div>
        ))}
      </div>
    );
  }
  if (k === 1) {
    return (
      <div aria-hidden>
        <div className="flex h-14 gap-[3px]">
          <div className="flex-[7] rounded-sm bg-[#f2f2f2]" />
          <div className="flex-[1.2] rounded-sm bg-[#ff5b2e]" />
          <div className="flex-[2] rounded-sm border border-dashed border-[#444]" />
        </div>
        <div className="pl-mono mt-3 flex text-xs text-[#5a5a5a]">
          <span className="flex-[7]">ticking</span><span className="flex-[1.2] text-[#ff5b2e]">stop</span><span className="flex-[2] text-right">host timeout</span>
        </div>
      </div>
    );
  }
  if (k === 2) {
    const lines = ["lock acquired · scrape", "job 4812 claimed · worker 3", "handler failed · retry 1/3", "retry ok · slot released", "lock released"];
    return (
      <div className="pl-mono space-y-2 text-xs" aria-hidden>
        {lines.map((l, i) => (
          <div key={l} className={"flex gap-3 " + (i === 2 ? "text-[#ff5b2e]" : "text-[#8a8a8a]")}><span className="text-[#333]">{String(i + 1).padStart(2, "0")}</span>{l}</div>
        ))}
      </div>
    );
  }
  if (k === 3) {
    return (
      <div className="space-y-4" aria-hidden>
        {["trigger", "interval"].map((t, r) => (
          <div key={t} className="flex items-center gap-3">
            <span className="pl-mono w-16 text-xs text-[#5a5a5a]">{t}</span>
            <div className="flex flex-1 gap-1">
              {Array.from({ length: 14 }, (_, i) => (
                <div key={i} className="h-8 flex-1 rounded-sm" style={{ background: (r === 0 ? i === 3 || i === 4 || i === 10 : i % 5 === 0) ? ACC : "#1a1a1a" }} />
              ))}
            </div>
          </div>
        ))}
        <div className="pl-mono text-xs text-[#5a5a5a]">orange = workers awake</div>
      </div>
    );
  }
  if (k === 4) {
    return (
      <div className="flex flex-wrap gap-2" aria-hidden>
        {["HTTP", "Async handler", "WebSocket", "Kafka", "NATS", "other brokers"].map((x) => (
          <span key={x} className="rounded-full border border-[#333] px-4 py-2 text-sm text-[#d4d4d4]">{x}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2" aria-hidden>
      {["hooks", "payload transformations", "queue routing", "event triggers"].map((x) => (
        <div key={x} className="pl-mono rounded border border-[#1f1f1f] px-4 py-4 text-xs text-[#d4d4d4]">{x}</div>
      ))}
    </div>
  );
}

function Features() {
  const [k, setK] = useState(0);
  const [lvl, setLvl] = useState(0);
  return (
    <>
      <div className="grid overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] lg:grid-cols-[360px_1fr]">
        <ul className="border-b border-[#1f1f1f] lg:border-b-0 lg:border-r">
          {FEATURES.map(([t], i) => (
            <li key={t}>
              <button
                onClick={() => setK(i)}
                aria-pressed={k === i}
                className={"flex w-full items-center gap-4 border-b border-[#141414] px-6 py-4 text-left transition-colors last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (k === i ? "bg-[#141414] text-[#f2f2f2]" : "text-[#8a8a8a] hover:text-[#f2f2f2]")}
              >
                <span className={"pl-mono text-xs " + (k === i ? "text-[#ff5b2e]" : "text-[#444]")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{t}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-6 md:p-10">
          <div className="text-2xl font-semibold md:text-3xl">{FEATURES[k][0]}</div>
          <p className="mt-3 max-w-lg leading-relaxed text-[#8a8a8a]">{FEATURES[k][1]}</p>
          <div className="mt-8 min-h-[150px] rounded-lg border border-[#1f1f1f] bg-black p-5"><FeatureVisual k={k} /></div>
        </div>
      </div>

      <div className="mt-24 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Two levels of control</h3>
          <p className="mt-4 text-[#8a8a8a]">The engine sets how Pulsar lives and what it may spend. Every queue then sets its own pace inside those limits.</p>

          <div className="mt-8 rounded-xl border p-4 transition-colors" style={{ borderColor: lvl === 0 ? ACC : "#1f1f1f" }}>
            <button onClick={() => setLvl(0)} className="pl-mono w-full text-left text-xs" style={{ color: lvl === 0 ? ACC : "#5a5a5a" }}>
              ENGINE · runtime, storage, self-invocation, global concurrency, tick budget
            </button>
            <div className="mt-4 rounded-lg border p-4 transition-colors" style={{ borderColor: lvl === 1 ? ACC : "#1f1f1f" }}>
              <button onClick={() => setLvl(1)} className="pl-mono w-full text-left text-xs" style={{ color: lvl === 1 ? ACC : "#5a5a5a" }}>
                QUEUE · pooler, profile, concurrency, batch size, consumer
              </button>
            </div>
          </div>
          <a href={LINKS.config} className="pl-mono mt-6 inline-block text-sm text-[#ff5b2e] underline-offset-4 hover:underline">
            Read the full configuration reference →
          </a>
        </div>
        <div className="lg:col-span-7">
          <Code title={lvl === 0 ? "new Pulsar({ engine })" : "createQueue({ … })"} code={lvl === 0 ? ENGINE_CODE : QUEUE_CODE} />
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/*  04 TICK: a six-segment rail                                        */
/* ================================================================== */
function TickLoop() {
  const LIMIT = 10, STEPS = TICK_STEPS.length, HANDOFF = 4;
  const total = LIMIT * STEPS + HANDOFF;
  const [t, setT] = useState(0);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (reduced()) { setT(2 * STEPS + 2); setPlay(false); return; }
  }, [STEPS]);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setT((x) => (x + 1) % total), 600);
    return () => clearInterval(id);
  }, [play, total]);

  const handoff = t >= LIMIT * STEPS;
  const tick = handoff ? LIMIT : Math.floor(t / STEPS) + 1;
  const step = handoff ? -1 : t % STEPS;

  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#1f1f1f] md:grid-cols-6">
        {TICK_STEPS.map(([title], i) => {
          const active = i === step;
          const done = handoff || i < step;
          return (
            <button
              key={title}
              onClick={() => { setPlay(false); setT((tick - 1) * STEPS + i); }}
              aria-current={active}
              className={"bg-[#0a0a0a] p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (active ? "bg-[#141414]" : "")}
            >
              <div className="mb-5 h-1.5 rounded-full" style={{ background: active ? ACC : done ? "#f2f2f2" : "#1f1f1f" }} />
              <div className={"pl-mono text-xs " + (active ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>{String(i + 1).padStart(2, "0")}</div>
              <div className={"mt-1 font-medium " + (active ? "text-[#f2f2f2]" : "text-[#5a5a5a]")}>{title}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[320px_1fr]">
        <Panel className="flex items-end justify-between p-6">
          <div>
            <Label>{handoff ? "status" : "tick"}</Label>
            {handoff ? (
              <div className="pl-mono mt-4 text-3xl leading-tight text-[#ff5b2e]">self-<br />invoke</div>
            ) : (
              <div className="mt-2 flex items-baseline gap-2">
                <span className="pl-mono text-8xl font-medium leading-none">{String(tick).padStart(2, "0")}</span>
                <span className="pl-mono text-[#5a5a5a]">/{LIMIT}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPlay(!play)} className="pl-mono rounded border border-[#333] px-3 py-2 text-xs hover:border-[#f2f2f2]">{play ? "pause" : "play"}</button>
            <button onClick={() => { setPlay(false); setT((x) => (x + 1) % total); }} className="pl-mono rounded border border-[#333] px-3 py-2 text-xs hover:border-[#f2f2f2]">step</button>
          </div>
        </Panel>
        <Panel className="flex flex-col justify-center p-6 md:p-8">
          {handoff ? (
            <>
              <div className="text-2xl font-semibold text-[#ff5b2e]">Budget spent. Handing off.</div>
              <p className="mt-2 max-w-xl text-[#8a8a8a]">cycleTickLimit reached. This run ends and a fresh one begins, so no host time limit ever drops a job.</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-semibold">{TICK_STEPS[step][0]}</div>
              <p className="mt-2 max-w-xl text-[#8a8a8a]">{TICK_STEPS[step][1]}</p>
            </>
          )}
        </Panel>
      </div>

      <Panel className="mt-4 p-6">
        <div className="pl-mono mb-3 flex justify-between text-xs">
          <span className="text-[#8a8a8a]">tick budget for this run</span>
          <span className={handoff ? "text-[#ff5b2e]" : "text-[#5a5a5a]"}>cycleTickLimit = {LIMIT}</span>
        </div>
        <div className="flex h-3 gap-1.5" aria-hidden>
          {Array.from({ length: LIMIT }, (_, i) => (
            <div key={i} className="flex-1 rounded-sm transition-colors duration-200" style={{ background: handoff || i < tick - 1 ? "#f2f2f2" : i === tick - 1 ? ACC : "#1f1f1f" }} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  05 TUNING: funnel + shared-capacity model                          */
/* ================================================================== */
function Slider({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <label className="block">
      <div className="pl-mono mb-2 flex justify-between text-xs text-[#8a8a8a]"><span>{label}</span><span className="text-[#f2f2f2]">{value}</span></div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => set(+e.target.value)} className="w-full accent-[#ff5b2e]" />
    </label>
  );
}

function Tuning() {
  const [c, setC] = useState(50);
  const [n, setN] = useState(10);
  const [cap, setCap] = useState(200);
  const [sec, setSec] = useState(1);
  const [q, setQ] = useState(10);
  const [ask, setAsk] = useState(100);
  const [glob, setGlob] = useState(100);
  const [mode, setMode] = useState(0);

  const req = c * n;
  const got = Math.min(req, cap);
  const mx = Math.max(req, cap, 1);
  const monthly = Math.round((86400 * 30) / sec);

  const demand = q * ask;
  const share = demand > glob ? Math.floor(glob / q) : ask;
  const used = Math.min(demand, glob);
  const seqTicks = Math.floor(10 / q);

  return (
    <div className="space-y-4">
      <Panel className="overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6 p-6 md:p-8">
            <Label hot>01 · per-tick batch</Label>
            <Slider label="concurrency" value={c} set={setC} min={1} max={100} />
            <Slider label="n (jobs per worker)" value={n} set={setN} min={1} max={50} />
            <Slider label="maxJobsPerTick" value={cap} set={setCap} min={10} max={2000} />
          </div>
          <div className="flex flex-col justify-center gap-6 border-t border-[#1f1f1f] bg-black p-6 md:p-8 lg:border-l lg:border-t-0">
            <div aria-hidden>
              <div className="pl-mono mb-1 flex justify-between text-xs text-[#5a5a5a]"><span>requested</span><span>{req}</span></div>
              <div className="h-8 rounded-sm bg-[#141414]"><div className="h-full rounded-sm bg-[#444] transition-all" style={{ width: `${(req / mx) * 100}%` }} /></div>
            </div>
            <div aria-hidden className="relative">
              <div className="pl-mono mb-1 flex justify-between text-xs text-[#5a5a5a]"><span>maxJobsPerTick</span><span>{cap}</span></div>
              <div className="h-8 rounded-sm bg-[#141414]"><div className="h-full rounded-sm border-r-2 border-[#f2f2f2] bg-[#222] transition-all" style={{ width: `${(cap / mx) * 100}%` }} /></div>
            </div>
            <div aria-hidden>
              <div className="pl-mono mb-1 flex justify-between text-xs text-[#ff5b2e]"><span>fetched</span><span>{got}</span></div>
              <div className="h-8 rounded-sm bg-[#141414]"><div className="h-full rounded-sm bg-[#ff5b2e] transition-all" style={{ width: `${(got / mx) * 100}%` }} /></div>
            </div>
            <div className="pl-mono text-sm text-[#8a8a8a]">
              {c} × {n} = {req} requested → <span className="text-[#ff5b2e]">{got} fetched</span>
              {req > cap && <span className="text-[#5a5a5a]"> · workers scaled down</span>}
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-6 p-6 md:p-8">
          <Label hot>02 · self-invocation cost</Label>
          <Slider label="selfInvocationIntervalSec" value={sec} set={setSec} min={1} max={30} />
          <div>
            <div className="pl-mono text-6xl tracking-tight">{monthly.toLocaleString()}</div>
            <div className="mt-3 text-sm leading-relaxed text-[#8a8a8a]">invocations per 30-day month while running continuously. Raise the interval to trade pickup latency for fewer invocations.</div>
          </div>
        </Panel>

        <Panel className="space-y-6 p-6 md:p-8">
          <Label hot>03 · global concurrency</Label>
          <Slider label="queues" value={q} set={setQ} min={1} max={20} />
          <Slider label="workers each queue asks for" value={ask} set={setAsk} min={1} max={100} />
          <Slider label="maxGlobalConcurrency" value={glob} set={setGlob} min={10} max={200} />
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10px, 1fr))" }} aria-hidden>
            {Array.from({ length: glob }, (_, i) => (
              <div key={i} className="aspect-square rounded-[2px]" style={{ background: i < used ? ACC : "#1a1a1a" }} />
            ))}
          </div>
          <div className="pl-mono text-sm text-[#8a8a8a]">
            demand {demand} vs {glob} slots → each queue gets <span className="text-[#ff5b2e]">{share}</span>
          </div>
        </Panel>
      </div>

      <Panel className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Label hot>04 · tick concurrency</Label>
          <Seg options={["Sequential", "Parallel"]} value={mode} onChange={setMode} label="Tick concurrency" />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <p className="text-sm leading-relaxed text-[#8a8a8a]">
            {mode === 0
              ? "Sequential is safe on CPU, memory and connections. Queues take turns inside the tick budget."
              : "Parallel ticks every queue at once for lower latency, at the price of spikes."}{" "}
            With a cycleTickLimit of 10 across {q} queue{q > 1 ? "s" : ""}:{" "}
            <span className="text-[#f2f2f2]">
              {mode === 0 ? (seqTicks >= 1 ? `each queue gets about ${seqTicks} tick${seqTicks > 1 ? "s" : ""}.` : "some queues wait for the next run.") : "every queue gets all 10 ticks, together."}
            </span>
          </p>
          <div className="space-y-1.5" aria-hidden>
            {Array.from({ length: Math.min(q, 10) }, (_, r) => (
              <div key={r} className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => {
                  const on = mode === 1 || Math.floor((i * Math.min(q, 10)) / 10) === r;
                  return <div key={i} className="h-3 flex-1 rounded-sm" style={{ background: on ? (mode === 1 ? ACC : "#f2f2f2") : "#161616" }} />;
                })}
              </div>
            ))}
            <div className="pl-mono pt-2 text-xs text-[#5a5a5a]">rows = queues · columns = ticks in the run</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  06 RUNTIMES: three lifelines on one shared clock                   */
/* ================================================================== */
type Item = { k: "t"; h: number; faded?: boolean } | { k: "hand" } | { k: "wait" };
const ticks = (n: number, off = 0, faded = false): Item[] =>
  Array.from({ length: n }, (_, i) => ({ k: "t", h: HEIGHTS[(i + off) % HEIGHTS.length], faded }) as Item);

const STRIPS: Record<RT["kind"], Item[]> = {
  vm: [...ticks(9), { k: "hand" }, ...ticks(9, 3), { k: "hand" }, ...ticks(5, 6, true)],
  isolate: [...ticks(8), { k: "hand" }, { k: "wait" }, ...ticks(8, 3), { k: "hand" }, { k: "wait" }, ...ticks(3, 7, true)],
  persistent: ticks(30),
};
const STRIP_LABELS: Record<RT["kind"], string[]> = {
  vm: ["run 1", "self-invoke", "run 2, new container"],
  isolate: ["run 1", "pause, recycle", "run 2, fresh isolate"],
  persistent: ["one process", "no restarts", "ticks while it lives"],
};

function Runtimes() {
  const [sel, setSel] = useState(0);
  const [clock, setClock] = useState(0);
  useEffect(() => {
    if (reduced()) { setClock(40); return; }
    const t = setInterval(() => setClock((x) => x + 1), 220);
    return () => clearInterval(t);
  }, []);
  const rt = RUNTIMES[sel];

  return (
    <>
      <div className="space-y-3">
        {RUNTIMES.map((r, idx) => {
          const items = STRIPS[r.kind];
          const head = clock % (items.length + 4);
          const labels = STRIP_LABELS[r.kind];
          const on = sel === idx;
          return (
            <button
              key={r.id}
              onClick={() => setSel(idx)}
              aria-pressed={on}
              className={"grid w-full gap-5 rounded-lg border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] md:grid-cols-[200px_1fr] md:p-6 " + (on ? "border-[#ff5b2e] bg-[#0f0f0f]" : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#333]")}
            >
              <div>
                <div className={"pl-mono text-xs " + (on ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>{r.id}</div>
                <div className="mt-1 text-xl font-medium">{r.label}</div>
              </div>
              <div>
                <div className="flex h-16 items-end gap-[2px]" aria-hidden>
                  {items.map((it, i) =>
                    it.k === "t" ? (
                      <div key={i} className="flex-1 transition-colors duration-200" style={{ height: `${it.h}%`, background: i === head ? ACC : i < head ? "#f2f2f2" : "#1f1f1f", opacity: it.faded ? 0.5 : 1 }} />
                    ) : it.k === "hand" ? (
                      <div key={i} className="flex h-full w-3 shrink-0 justify-center md:w-5"><div className={"h-full border-l border-dashed " + (i < head ? "border-[#ff5b2e]" : "border-[#333]")} /></div>
                    ) : (
                      <div key={i} className="h-full w-4 shrink-0 md:w-8"><div className={"h-full border-b border-dotted " + (i < head ? "border-[#ff5b2e]" : "border-[#333]")} /></div>
                    )
                  )}
                </div>
                <div className="pl-mono mt-2 flex justify-between gap-3 text-[11px] text-[#5a5a5a]">
                  <span>{labels[0]}</span>
                  <span className={r.kind === "persistent" ? "" : "text-[#ff5b2e]"}>{labels[1]}</span>
                  <span className="hidden text-right sm:inline">{labels[2]}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Panel className="mt-3 grid md:grid-cols-[1.4fr_1fr]">
        <div className="p-6 md:p-8">
          <div className="pl-mono text-sm text-[#ff5b2e]">{rt.id}</div>
          <p className="mt-3 max-w-md leading-relaxed text-[#d4d4d4]">{rt.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {rt.hosts.map((h) => <span key={h} className="rounded-full border border-[#333] px-3 py-1 text-xs text-[#8a8a8a]">{h}</span>)}
          </div>
        </div>
        <dl className="border-t border-[#1f1f1f] md:border-l md:border-t-0">
          {rt.rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[#141414] px-6 py-4 last:border-0 md:px-8">
              <dt className="pl-mono text-xs text-[#5a5a5a]">{k}</dt>
              <dd className="text-right text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#8a8a8a]">
        Re-invocation uses pg_net by default. Choose manual to trigger the next cycle yourself through something fire-and-forget like QStash or SNS. Never await a request to selfURL, it holds the current instance open.
      </p>
    </>
  );
}

/* ================================================================== */
/*  07 STORAGE: routing matrix                                         */
/* ================================================================== */
function Storage() {
  const [m, setM] = useState(0);
  const redis = m > 0;
  const copy = [
    "PostgreSQL only. Hot operations run through an unlogged table. Nothing else to deploy.",
    "A Redis cache driver over TCP, suited to persistent servers. Hot operations move to Redis.",
    "A Redis cache driver over HTTP, like Upstash, suited to serverless and edge. Hot operations move to Redis.",
  ];
  return (
    <>
      <Seg options={["Postgres only", "+ Redis (TCP)", "+ Redis (HTTP)"]} value={m} onChange={setM} label="Storage setup" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="overflow-hidden">
          <div className="grid grid-cols-[1fr_90px_130px] border-b border-[#1f1f1f] px-5 py-3 text-xs sm:grid-cols-[1fr_130px_160px]">
            <span className="pl-mono text-[#5a5a5a]">engine operation</span>
            <span className={"pl-mono text-center " + (redis ? "text-[#ff5b2e]" : "text-[#333]")}>Redis</span>
            <span className={"pl-mono text-center " + (!redis ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>Postgres unlogged</span>
          </div>
          {STORAGE_OPS.map((op) => (
            <div key={op} className="grid grid-cols-[1fr_90px_130px] items-center border-b border-[#141414] px-5 py-4 last:border-0 sm:grid-cols-[1fr_130px_160px]">
              <span className="text-sm">{op}</span>
              <span className="flex justify-center"><i className="block h-3.5 w-3.5 rounded-full transition-all duration-300" style={{ background: redis ? ACC : "transparent", border: redis ? "none" : "1px dashed #333" }} /></span>
              <span className="flex justify-center"><i className="block h-3.5 w-3.5 rounded-full transition-all duration-300" style={{ background: !redis ? ACC : "transparent", border: !redis ? "none" : "1px dashed #333" }} /></span>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel className="flex-1 p-6">
            <Label hot>{["postgres only", "redis · tcp", "redis · http"][m]}</Label>
            <p className="mt-3 text-sm leading-relaxed text-[#d4d4d4]">{copy[m]}</p>
          </Panel>
          <Panel className="p-6">
            <Label>hot operations on Postgres</Label>
            <div className="pl-mono mt-3 text-5xl">
              <span className={redis ? "text-[#ff5b2e]" : ""}>{redis ? 0 : STORAGE_OPS.length}</span>
              <span className="text-2xl text-[#5a5a5a]"> / {STORAGE_OPS.length}</span>
            </div>
            <p className="mt-3 text-sm text-[#8a8a8a]">PostgreSQL is always the persistent layer, and PGMQ messages always live there.</p>
          </Panel>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#8a8a8a]">
        Unlogged tables skip write-ahead logging, so they are truncated after a database crash. That only affects the engine&apos;s operational state, not your PGMQ queues.
      </p>
    </>
  );
}

/* ================================================================== */
/*  08 INTEGRATIONS: switchboard                                       */
/* ================================================================== */
function Integrations() {
  const [s, setS] = useState(0);
  const tg = TARGETS[s];
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <ul className="space-y-2">
          {TARGETS.map((t, i) => (
            <li key={t.id}>
              <button
                onClick={() => setS(i)}
                aria-pressed={s === i}
                className={"flex w-full items-center justify-between gap-3 rounded-lg border px-5 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (s === i ? "border-[#ff5b2e] bg-[#0f0f0f]" : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#333]")}
              >
                <span>
                  <span className="block font-medium">{t.id}</span>
                  <span className="mt-0.5 block text-xs text-[#5a5a5a]">{t.sub}</span>
                </span>
                <i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s === i ? ACC : "#2a2a2a" }} />
              </button>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <Panel className="p-5">
            <svg viewBox="0 0 600 70" className="w-full" role="img" aria-label={`Pulsar dispatching claimed jobs to ${tg.id}`}>
              <rect x="1" y="12" width="130" height="46" rx="8" fill={ACC} />
              <text x="66" y="40" textAnchor="middle" fill="#000" fontSize="15" fontWeight="600">Pulsar</text>
              <path d="M131 35 H469" stroke="#222" strokeWidth="2" />
              <path d="M131 35 H469" stroke={ACC} strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
              <rect x="469" y="12" width="130" height="46" rx="8" fill="#000" stroke="#444" />
              <text x="534" y="40" textAnchor="middle" fill="#f2f2f2" fontSize="13">{tg.id}</text>
              <text x="300" y="26" textAnchor="middle" fill="#5a5a5a" fontSize="11">claimed jobs</text>
            </svg>
          </Panel>
          <Code title={tg.id + " consumer"} code={tg.code} />
        </div>
      </div>
      <div className="mt-6 max-w-2xl rounded-r-md border-l-2 border-[#ff5b2e] bg-[#0a0a0a] py-3 pl-5 pr-4 text-sm leading-relaxed text-[#8a8a8a]">
        In callback mode your code must deregister the worker when the job finishes, or its slot stays occupied and the queue stalls. Set sleep above your slowest handler so a job is never picked up twice.
      </div>
    </>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <h2 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-8xl">Give your queues an engine.</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn href={LINKS.quickstart} solid>Get started</Btn>
          <Btn href={LINKS.github}>Star on GitHub</Btn>
        </div>
        <div className="mt-24 flex items-end justify-between gap-6 overflow-hidden" aria-hidden>
          <span className="select-none text-[26vw] font-semibold leading-[0.8] tracking-tighter text-transparent md:text-[19vw]" style={{ WebkitTextStroke: "1px #2a2a2a" }}>Pulsar</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1f1f1f] pt-6 text-sm text-[#5a5a5a]">
          <span className="flex items-center gap-2 font-semibold text-[#f2f2f2]"><Mark size={16} /> Pulsar</span>
          <div className="flex gap-6">
            <a className="hover:text-[#f2f2f2]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[#f2f2f2]" href={LINKS.github}>GitHub</a>
          </div>
          <span>© {new Date().getFullYear()} Pulsar. Open source.</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function PulsarLanding() {
  return (
    <div className="min-h-screen bg-black text-[#f2f2f2] antialiased" style={{ fontFamily: "'Familjen Grotesk', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Fragment+Mono&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: ${ACC}; color: #000; }
        .pl-mono { font-family: 'Fragment Mono', ui-monospace, monospace; }
        @keyframes pl-beat { 0%,100% { opacity: 1; } 50% { opacity: .2; } }
        .pl-beat { animation: pl-beat 1.1s ease-in-out infinite; }
        @keyframes pl-flow { to { stroke-dashoffset: -28; } }
        .pl-flow { animation: pl-flow 1s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .pl-beat, .pl-flow { animation: none; } html { scroll-behavior: auto; } }
      `}</style>

      <Header />

      <main>
        <Hero />

        <Stage id="what" n="01" title="PGMQ stores the messages. Pulsar operates them." lead="Pulsar is an orchestration engine, not a queue. You keep your Postgres and your business logic. Pulsar runs everything in between.">
          <What />
        </Stage>

        <Stage id="poolers" n="02" title="Choose what wakes the engine, per queue." lead="An interval-driven queue is polled on a schedule under one shared lock. An event-driven queue sleeps until a database trigger fires, then drains itself and goes quiet. Insert some jobs and watch both react.">
          <Poolers />
        </Stage>

        <Stage id="features" n="03" title="Everything between the queues and your code." lead="The moving parts of a production queue, already built and configured per queue.">
          <Features />
        </Stage>

        <Stage id="tick" n="04" title="One loop runs everything: the tick." lead="A tick is one complete execution cycle. Ticks repeat until a queue or engine cycleTickLimit is spent, or the host's clock runs low. Then the run ends and a fresh one begins.">
          <TickLoop />
        </Stage>

        <Stage id="tuning" n="05" title="Do the math before production does." lead="Requested jobs are concurrency × n. If that exceeds maxJobsPerTick, Pulsar scales workers down for the tick instead of overloading your database. Self-invocation cost is just arithmetic.">
          <Tuning />
        </Stage>

        <Stage id="runtimes" n="06" title="One engine, three ways to live." lead="Set the runtime and Pulsar adapts its scheduling and lifecycle. All three run on the same clock below. Pick one for the details.">
          <Runtimes />
        </Stage>

        <Stage id="storage" n="07" title="Postgres is enough. Redis makes it faster." lead="Unified Storage puts Redis and PostgreSQL behind one interface. Supply a cache driver and hot operations move to Redis. Leave it out and they run through an unlogged Postgres table.">
          <Storage />
        </Stage>

        <Stage id="integrations" n="08" title="Plug jobs into anything." lead="Pulsar claims the jobs, then dispatches them to your own endpoint, your own function, or the streaming tools you already run.">
          <Integrations />
        </Stage>
      </main>

      <Footer />
    </div>
  );
}