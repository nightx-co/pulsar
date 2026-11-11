"use client";

import { useEffect, useState } from "react";
import Calculator from "../components/Calculator";
import Runtimes from "../components/Runtimes";
import Integrations from "../components/IntegrationMap";
import Maintainer from "../components/Maintainer";
import { HANDLES, HEIGHTS, INSTALL, NAV, NOT, ENGINE_CODE, LINKS, PROFILES, QUEUE_CODE, STORAGE_OPS, TICK_STEPS } from "../constants/static";
import Compatibility from "../components/Compatibility";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                         */
/* ------------------------------------------------------------------ */
function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12h6l2-9 4 18 3-9h7" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function Btn({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <a
      href={href}
      className={
        "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
        (solid
          ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
          : "border border-[var(--color-border-subtle)] text-[var(--color-text-main)] hover:border-[var(--color-text-main)]")
      }
    >
      {children}
    </a>
  );
}

function Code({ code, title }: { code: string; title: string }) {
  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-code-bg)]">
      <div className="pl-mono flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5 text-xs text-[var(--color-text-muted)]">
        <span>{title}</span>
        <span className="flex gap-1" aria-hidden>
          <i className="h-1.5 w-1.5 bg-[var(--color-border-subtle)]" />
          <i className="h-1.5 w-1.5 bg-[var(--color-border-subtle)]" />
          <i className="h-1.5 w-1.5 bg-[var(--color-accent)]" />
        </span>
      </div>
      <pre className="pl-mono overflow-x-auto p-5 text-[13px] leading-6 text-[var(--color-code-text)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Chapter({
  id,
  n,
  title,
  lead,
  children,
}: {
  id: string;
  n: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-[var(--color-border)] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="pl-mono mb-6 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span className="text-[var(--color-accent)]">{n}</span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
          <span>{NAV.find((x) => x[0] === id)?.[1]}</span>
        </div>
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:col-span-7 md:text-6xl">{title}</h2>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)] md:col-span-5 md:pt-3 md:text-lg">{lead}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */
function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("what");

  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const list = (
    <ul className="space-y-0.5">
      {NAV.map(([id, label], i) => (
        <li key={id}>
          <a
            href={"#" + id}
            onClick={() => setOpen(false)}
            className={
              "pl-mono flex items-center gap-3 border-l-2 py-2 pl-4 text-xs transition-colors " +
              (active === id
                ? "border-[var(--color-accent)] text-[var(--color-text-main)]"
                : "border-transparent text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]")
            }
          >
            <span className={active === id ? "text-[var(--color-accent)]" : ""}>{String(i + 1).padStart(2, "0")}</span>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col justify-between border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:flex">
        <div>
          <a href="#top" className="mb-10 flex items-center gap-2.5 text-lg font-semibold">
            <Mark /> Pulsar
          </a>
          {list}
        </div>
        <div className="space-y-4">
          <div className="flex gap-5 text-sm text-[var(--color-text-muted)]">
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.github}>GitHub</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.blogs}>Blogs</a>
          </div>
          <Btn href={LINKS.quickstart} solid>Get started</Btn>
        </div>
      </aside>

      {/* mobile bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <Mark size={18} /> Pulsar
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="pl-mono border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs text-[var(--color-text-main)]"
          >
            {open ? "close" : "index"}
          </button>
        </div>
        {open && (
          <div className="border-t border-[var(--color-border)] p-5">
            {list}
            <div className="mt-5 flex items-center gap-5 text-sm text-[var(--color-text-muted)]">
              <a href={LINKS.github}>GitHub</a>
              <a href={LINKS.docs}>Docs</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
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
      className="pl-mono flex items-center gap-3 border border-[var(--color-border-subtle)] px-5 py-3 text-sm text-[var(--color-code-text)] hover:border-[var(--color-text-main)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <span className="text-[var(--color-accent)]">$</span>
      {INSTALL}
      <span className="text-xs text-[var(--color-text-dim)]">{ok ? "copied" : "copy"}</span>
    </button>
  );
}

type Slot = { kind: "tick"; h: number; faded?: boolean } | { kind: "gap" };
const SLOTS: Slot[] = [
  ...HEIGHTS.map((h) => ({ kind: "tick", h }) as Slot),
  { kind: "gap" },
  ...HEIGHTS.map((_, i) => ({ kind: "tick", h: HEIGHTS[(i + 4) % 10] }) as Slot),
  { kind: "gap" },
  ...[46, 70, 38, 60].map((h) => ({ kind: "tick", h, faded: true }) as Slot),
];

function RunTimeline() {
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (reduced()) { setHead(SLOTS.length); return; }
    const t = setInterval(() => setHead((h) => (h + 1) % (SLOTS.length + 4)), 260);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
      <div className="pl-mono flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3 text-xs text-[var(--color-text-muted)]">
        <span>live run</span>
        <span className="flex items-center gap-2"><i className="pl-beat inline-block h-1.5 w-1.5 bg-[var(--color-accent)]" />ticking</span>
      </div>
      <div className="p-5 md:p-8">
        <div className="flex h-36 items-end gap-[3px] md:gap-1.5" aria-hidden>
          {SLOTS.map((s, i) =>
            s.kind === "gap" ? (
              <div key={i} className="flex h-full w-4 shrink-0 justify-center md:w-8">
                <div className={"h-full w-px border-l border-dashed " + (i < head ? "border-[var(--color-accent)]" : "border-[var(--color-border-subtle)]")} />
              </div>
            ) : (
              <div
                key={i}
                className="flex-1 transition-colors duration-200"
                style={{
                  height: `${s.h}%`,
                  background: i === head ? "var(--color-accent)" : i < head ? "var(--color-text-main)" : "var(--color-border)",
                  opacity: s.faded ? 0.5 : 1,
                }}
              />
            )
          )}
        </div>
        <div className="pl-mono mt-4 flex justify-between text-xs text-[var(--color-text-dim)]">
          <span>run 1 · 10 ticks · cycleTickLimit</span>
          <span className="text-[var(--color-accent)]">self-invoke</span>
          <span className="hidden sm:inline">run 2 · fresh isolate</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="px-5 pb-20 pt-16 md:px-10 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="pl-mono mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-text-muted)]">
          <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[var(--color-accent)]">open source</span>
          <span>PostgreSQL</span><span>·</span><span>PGMQ</span><span>·</span><span>serverless · edge · servers</span>
        </div>
        <h1 className="text-[2.9rem] font-semibold leading-[0.98] tracking-tight sm:text-7xl md:text-[6.5rem]">
          Multi-runtime pooler engine for <span className="text-[var(--color-accent)]">PGMQ</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)] md:col-span-7 md:text-xl">
            Pulsar is the execution engine for PGMQ. It decides when to wake, how much to pull, who does the work and how to keep going, on serverless functions, edge isolates or your own servers.
          </p>
          <div className="flex flex-col items-start gap-3 md:col-span-5 md:items-end">
            <Btn href={LINKS.quickstart} solid>Run your first queue →</Btn>
            <CopyCmd />
          </div>
        </div>
        <div className="mt-16"><RunTimeline /></div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          Every bar is a tick. When the tick budget or the host&apos;s clock runs out, Pulsar stops cleanly and hands off to a fresh run, so a serverless time limit never drops a job.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  01 WHAT                                                            */
/* ------------------------------------------------------------------ */
function LayerStack() {
  const layers: [string, string, boolean][] = [
    ["Your code", "Consumers and handlers", false],
    ["Pulsar", "The orchestration layer: ticks, locks, dispatch", true],
    ["PGMQ", "Stores and manages the messages", false],
    ["PostgreSQL", "Durable foundation", false],
  ];
  return (
    <div className="border border-[var(--color-border)]">
      {layers.map(([t, d, hot], i) => (
        <div
          key={t}
          className={
            "flex items-center gap-5 p-5 " +
            (i > 0 ? "border-t border-[var(--color-border)] " : "") +
            (hot ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "")
          }
        >
          <span className={"pl-mono text-xs " + (hot ? "text-[var(--color-accent-contrast)]/60" : "text-[var(--color-text-dim)]")}>L{layers.length - i}</span>
          <div>
            <div className="text-lg font-medium">{t}</div>
            <div className={"text-sm " + (hot ? "text-[var(--color-accent-contrast)]/70" : "text-[var(--color-text-muted)]")}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function What() {
  return (
    <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-2">
      <div className="bg-[var(--color-surface)] p-6 md:p-8"><LayerStack /></div>
      <div className="grid bg-[var(--color-surface)]">
        <div className="p-6 md:p-8">
          <div className="pl-mono mb-5 text-xs text-[var(--color-accent)]">+ Pulsar handles</div>
          <ul className="space-y-3">
            {HANDLES.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[var(--color-code-text)]">
                <span className="pl-mono mt-0.5 text-[var(--color-accent)]">+</span>{h}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-[var(--color-border)] p-6 md:p-8">
          <div className="pl-mono mb-5 text-xs text-[var(--color-text-dim)]">− Pulsar is not</div>
          <ul className="space-y-3">
            {NOT.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[var(--color-text-dim)]">
                <span className="pl-mono mt-0.5">−</span>{h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  02 POOLERS                                                         */
/* ------------------------------------------------------------------ */
const N = 48;
const IDP_PAT = Array.from({ length: N }, (_, i) => i % 6 === 0);
const EDP_PAT = Array.from({ length: N }, (_, i) => (i >= 9 && i <= 15) || (i >= 33 && i <= 36));

function PoolerRow({ pat, label, note, head }: { pat: boolean[]; label: string; note: string; head: number }) {
  return (
    <div className="p-5 md:p-6">
      <div className="pl-mono mb-4 flex flex-col gap-1 text-xs sm:flex-row sm:justify-between">
        <span className="text-[var(--color-text-main)]">{label}</span>
        <span className="text-[var(--color-text-dim)]">{note}</span>
      </div>
      <div className="flex h-10 items-end gap-[2px]" aria-hidden>
        {pat.map((on, i) => (
          <div
            key={i}
            className="flex-1 transition-colors"
            style={{ height: on ? "100%" : "10%", background: on ? (i <= head ? "var(--color-accent)" : "var(--color-bar-muted)") : "var(--color-border)" }}
          />
        ))}
      </div>
    </div>
  );
}

function Poolers() {
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (reduced()) { setHead(N); return; }
    const t = setInterval(() => setHead((h) => (h + 1) % (N + 6)), 170);
    return () => clearInterval(t);
  }, []);

  const rows = [
    ["interval-driven-pooler", "Timed polling", "Low, regular polls", "Bound by the interval", "Continuous, batch and delayed work"],
    ["event-driven-pooler", "Storage event", "Zero idle polls", "Under 10ms", "Bursty, sporadic, interactive tasks"],
  ];
  const head_ = ["Pooler", "Trigger", "Idle cost", "Pickup latency", "Best for"];

  return (
    <>
      <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
        <PoolerRow head={head} pat={IDP_PAT} label="interval-driven" note="wakes every interval, work or not" />
        <PoolerRow head={head} pat={EDP_PAT} label="event-driven" note="silent until a job is inserted" />
      </div>

      <div className="mt-4 overflow-x-auto border border-[var(--color-border)]">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[var(--color-text-dim)]">
              {head_.map((h) => <th key={h} className="pl-mono px-5 py-3 text-xs font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-[var(--color-border-dark)] align-top last:border-0">
                {r.map((c, i) => (
                  <td key={i} className={"px-5 py-4 " + (i === 0 ? "pl-mono text-[var(--color-text-main)]" : i === 1 ? "pl-mono text-[var(--color-accent)]" : "text-[var(--color-text-muted)]")}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-[var(--color-text-dim)]">Interval-driven is the default. Polling cadence comes from the queue&apos;s profile.</p>

      <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-5">
        {PROFILES.map(([p, d], i) => (
          <div key={p} className="bg-[var(--color-surface)] p-4">
            <div className="pl-mono flex justify-between text-xs">
              <span className="text-[var(--color-text-main)]">{p}</span>
              <span className="text-[var(--color-text-dim)]">{i + 1}</span>
            </div>
            <div className="mt-3 text-sm text-[var(--color-text-muted)]">{d}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  03 FEATURES                                                        */
/* ------------------------------------------------------------------ */
function Features() {
  const rows = [
    ["scrape", "event-driven", "10", "10"],
    ["embed", "event-driven", "4", "20"],
    ["scan", "interval-driven", "2", "5"],
  ];
  const list: [string, string][] = [
    ["Reliable by construction", "Distributed locks, retries and failure recovery prevent races and duplicate processing."],
    ["Elastic scaling", "Workers wake on a trigger or an interval, so nothing idles waiting for jobs."],
    ["Dispatch anywhere", "HTTP endpoints, async handlers, or streams into Kafka, NATS and other brokers."],
    ["Deeply customizable", "Hooks, payload transformations, queue routing and event triggers are yours to shape."],
  ];

  return (
    <>
      <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-2">
        <div className="bg-[var(--color-surface)] p-6 md:p-8">
          <div className="text-xl font-medium">Per-queue configuration</div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            Concurrency, batch size, tick limits, timing profile and consumer, tuned separately for every queue in the same engine.
          </p>
          <div className="pl-mono mt-6 border border-[var(--color-border)] text-xs" aria-hidden>
            <div className="grid grid-cols-[1.1fr_1.4fr_.7fr_.7fr] border-b border-[var(--color-border)] px-4 py-2 text-[var(--color-text-dim)]">
              <span>queue</span><span>pooler</span><span>concurrency</span><span>n</span>
            </div>
            {rows.map((r) => (
              <div key={r[0]} className="grid grid-cols-[1.1fr_1.4fr_.7fr_.7fr] border-b border-[var(--color-border-dark)] px-4 py-2 text-[var(--color-text-muted)] last:border-0">
                <span className="text-[var(--color-text-main)]">{r[0]}</span><span>{r[1]}</span>
                <span className="text-[var(--color-accent)]">{r[2]}</span><span className="text-[var(--color-accent)]">{r[3]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] p-6 md:p-8">
          <div className="text-xl font-medium">Runtime-aware engine</div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            An internal clock tracks the time your host has left and stops ticking before the platform ends the function, then hands off cleanly.
          </p>
          <div className="mt-6" aria-hidden>
            <div className="flex h-12 items-stretch gap-[3px]">
              <div className="flex-[7] bg-[var(--color-text-main)]" />
              <div className="flex-[1.2] bg-[var(--color-accent)]" />
              <div className="flex-[2] border border-dashed border-[var(--color-bar-muted)]" />
            </div>
            <div className="pl-mono mt-3 flex text-xs text-[var(--color-text-dim)]">
              <span className="flex-[7]">ticking</span>
              <span className="flex-[1.2] text-[var(--color-accent)]">stop</span>
              <span className="flex-[2] text-right">host timeout</span>
            </div>
          </div>
        </div>
      </div>

      <ol className="mt-4 border border-[var(--color-border)]">
        {list.map(([t, d], i) => (
          <li key={t} className="grid items-baseline gap-2 border-b border-[var(--color-border)] px-6 py-5 last:border-0 md:grid-cols-[60px_1fr_1.4fr] md:gap-6">
            <span className="pl-mono text-xs text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-lg font-medium">{t}</span>
            <span className="text-sm leading-relaxed text-[var(--color-text-muted)]">{d}</span>
          </li>
        ))}
      </ol>

      <h3 className="mt-20 text-2xl font-semibold tracking-tight md:text-3xl">Two levels of control</h3>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
        The engine sets how Pulsar lives and what it may spend. Every queue then sets its own pace inside those limits.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          ["Engine", "Runtime, storage, self-invocation, global concurrency and the tick budget.", "new Pulsar({ engine })", ENGINE_CODE],
          ["Queue", "Pooler, polling profile, concurrency, batch size and consumer.", "createQueue({ … })", QUEUE_CODE],
        ].map(([t, d, title, code]) => (
          <div key={t} className="flex flex-col">
            <div className="text-lg font-medium">{t}</div>
            <p className="mb-4 mt-1 text-sm text-[var(--color-text-muted)]">{d}</p>
            <div className="flex-1"><Code title={title} code={code} /></div>
          </div>
        ))}
      </div>
      <a href={LINKS.config} className="pl-mono mt-6 inline-block text-sm text-[var(--color-accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]">
        Read the full configuration reference →
      </a>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  04 TICK                                                            */
/* ------------------------------------------------------------------ */
function TickLoop() {
  const LIMIT = 10, STEPS = TICK_STEPS.length, HANDOFF = 4;
  const total = LIMIT * STEPS + HANDOFF;
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduced()) { setT(2 * STEPS + 2); return; }
    const id = setInterval(() => setT((x) => (x + 1) % total), 380);
    return () => clearInterval(id);
  }, [STEPS, total]);

  const handoff = t >= LIMIT * STEPS;
  const tick = handoff ? LIMIT : Math.floor(t / STEPS) + 1;
  const step = handoff ? -1 : t % STEPS;

  return (
    <div className="border border-[var(--color-border)]">
      <div className="grid md:grid-cols-[280px_1fr]">
        <div className="flex flex-col justify-between border-b border-[var(--color-border)] p-6 md:border-b-0 md:border-r md:p-8">
          <div className="pl-mono text-xs text-[var(--color-text-dim)]">{handoff ? "status" : "tick"}</div>
          {handoff ? (
            <div className="pl-mono my-8 text-3xl text-[var(--color-accent)]">self-<br />invoke</div>
          ) : (
            <div className="my-8 flex items-baseline gap-3">
              <span className="pl-mono text-8xl font-medium leading-none">{String(tick).padStart(2, "0")}</span>
              <span className="pl-mono text-sm text-[var(--color-text-dim)]">/ {LIMIT}</span>
            </div>
          )}
          <div className="pl-mono text-xs text-[var(--color-text-dim)]">
            {handoff ? "cycleTickLimit reached: fresh run starts" : `${tick} of ${LIMIT} ticks used`}
          </div>
        </div>

        <ol>
          {TICK_STEPS.map(([title, desc], i) => {
            const active = i === step;
            const done = handoff || i < step;
            return (
              <li key={title} className={"flex items-start gap-5 border-b border-[var(--color-border)] px-6 py-4 last:border-0 transition-colors duration-300 md:px-8 " + (active ? "bg-[var(--color-surface-active)]" : "")}>
                <span
                  className="pl-mono flex h-7 w-7 shrink-0 items-center justify-center border text-xs transition-colors duration-300"
                  style={{
                    background: active ? "var(--color-accent)" : "transparent",
                    borderColor: active ? "var(--color-accent)" : done ? "var(--color-text-main)" : "var(--color-border-subtle)",
                    color: active ? "var(--color-accent-contrast)" : done ? "var(--color-text-main)" : "var(--color-text-dim)",
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className={"font-medium transition-colors duration-300 " + (active ? "text-[var(--color-text-main)]" : "text-[var(--color-text-dim)]")}>{title}</div>
                  <div className={"mt-0.5 text-sm transition-colors duration-300 " + (active ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-subtle)]")}>{desc}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="border-t border-[var(--color-border)] p-6">
        <div className="pl-mono mb-3 flex justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">tick budget for this run</span>
          <span className={handoff ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]"}>cycleTickLimit = {LIMIT}</span>
        </div>
        <div className="flex h-3 gap-1.5" aria-hidden>
          {Array.from({ length: LIMIT }, (_, i) => (
            <div key={i} className="flex-1 transition-colors duration-200" style={{ background: handoff || i < tick - 1 ? "var(--color-text-main)" : i === tick - 1 ? "var(--color-accent)" : "var(--color-border)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  05 TUNING                                                          */
/* ------------------------------------------------------------------ */
function Tuning() {
  return (
    <>
      <Calculator />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="border border-[var(--color-border)] p-6">
          <div className="font-medium">Global concurrency</div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            With maxGlobalConcurrency at 100 and ten queues each asking for 100 workers, every queue is held to about 10. Slots are first come, first served when demand is lower.
          </p>
        </div>
        <div className="border border-[var(--color-border)] p-6">
          <div className="font-medium">Tick concurrency</div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            Sequential is safe on CPU, memory and connections. Parallel ticks every queue at once for lower latency, at the price of spikes. With a cycleTickLimit of 10 across 10 queues, sequential gives each queue one tick.
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  07 STORAGE                                                         */
/* ------------------------------------------------------------------ */
function Storage() {
  const [redis, setRedis] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border border-[var(--color-border)] p-5">
        <div>
          <div>Add a Redis cache driver</div>
          <div className="mt-1 text-sm text-[var(--color-text-muted)]">Optional. Flip it to see where the engine&apos;s hot operations go.</div>
        </div>
        <button
          role="switch"
          aria-checked={redis}
          aria-label="Add a Redis cache driver"
          onClick={() => setRedis((r) => !r)}
          className={"relative h-8 w-16 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " + (redis ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-border-subtle)] bg-transparent")}
        >
          <span className={"absolute top-1 h-5 w-5 transition-all " + (redis ? "left-[38px] bg-[var(--color-accent-contrast)]" : "left-1 bg-[var(--color-text-muted)]")} />
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="border border-[var(--color-border)]">
          <div className="pl-mono border-b border-[var(--color-border)] px-5 py-3 text-xs text-[var(--color-text-dim)]">engine operations</div>
          {STORAGE_OPS.map((op) => (
            <div key={op} className="flex items-center justify-between gap-3 border-b border-[var(--color-border-dark)] px-5 py-3.5 last:border-0">
              <span className="text-sm">{op}</span>
              <span className={"pl-mono shrink-0 border px-3 py-1 text-xs transition-colors duration-300 " + (redis ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border-subtle)] text-[var(--color-text-muted)]")}>
                {redis ? "Redis" : "Postgres unlogged"}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className={"flex-1 p-6 transition-colors duration-300 " + (redis ? "border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "border border-dashed border-[var(--color-border-subtle)]")}>
            <div className={"text-lg font-medium " + (redis ? "" : "text-[var(--color-text-dim)]")}>Redis</div>
            <p className={"mt-2 text-sm leading-relaxed " + (redis ? "text-[var(--color-accent-contrast)]/70" : "text-[var(--color-text-subtle)]")}>
              {redis ? "A TCP driver for persistent servers, or an HTTP driver like Upstash for serverless and edge." : "Not connected. Nothing breaks without it."}
            </p>
          </div>
          <div className="flex-1 border border-[var(--color-border)] p-6">
            <div className="text-lg font-medium">PostgreSQL</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">Always the persistent layer. Handles {redis ? "none" : "all"} of the hot operations on the left.</p>
          </div>
        </div>
      </div>

      <div className="pl-mono mt-4 flex items-center justify-between border border-[var(--color-border)] px-5 py-4 text-sm">
        <span className="text-[var(--color-text-muted)]">hot operations on Postgres</span>
        <span>
          <span className={redis ? "text-[var(--color-accent)]" : ""}>{redis ? 0 : STORAGE_OPS.length}</span>
          <span className="text-[var(--color-text-dim)]"> of {STORAGE_OPS.length}</span>
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        Unlogged tables skip write-ahead logging, so they are truncated after a database crash. That only affects the engine&apos;s operational state, not your PGMQ queues.
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <>
      <section className="border-t border-[var(--color-border)] bg-[var(--color-accent)] px-5 py-24 text-[var(--color-accent-contrast)] md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-4xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">Give your queues an engine.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={LINKS.quickstart} className="bg-[var(--color-accent-contrast)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-footer-btn-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-contrast)]">Get started</a>
            <a href={LINKS.github} className="border border-[var(--color-accent-contrast)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-accent-contrast)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-contrast)]">Star on GitHub</a>
          </div>
        </div>
      </section>
      <footer className="border-t border-[var(--color-border)] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-text-dim)]">
          <span className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-main)]"><Mark size={18} /> Pulsar</span>
          <div className="flex gap-6">
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.github}>GitHub</a>
          </div>
          <span>© {new Date().getFullYear()} Pulsar. Open source.</span>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function PulsarLanding() {
    return (
        <div
            className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] antialiased"
            style={{
                //fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                //fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

                :root {
                /* --- CUSTOMIZABLE THEME VARIABLES --- */
                --color-accent: #135DF6;
                --color-accent-hover: #0049B5;
                --color-accent-contrast: #FFFEFE;

                --color-bg: rgb(10, 10, 10);
                --color-surface: rgb(7, 7, 7);
                --color-surface-alt: rgb(13, 13, 12);
                --color-surface-active: rgb(19, 19, 18);
                
                --color-border: #262624;
                --color-border-dark: #1c1c1a;
                --color-border-subtle: #3a3a37;
                
                --color-text-main: #ecebe4;
                --color-text-muted: #8d8c84;
                --color-text-dim: #6b6a63;
                --color-text-subtle: #3f3f3b;
                
                --color-code-bg: #070706;
                --color-code-text: #cfcec6;
                --color-bar-muted: #4a4a46;
                --color-footer-btn-hover: #1a1a18;
                }

                html { scroll-behavior: smooth; }
                ::selection { background: var(--color-accent); color: var(--color-accent-contrast); }
                .pl-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                @keyframes pl-beat { 0%,100% { opacity: 1; } 50% { opacity: .2; } }
                .pl-beat { animation: pl-beat 1.2s ease-in-out infinite; }
                @keyframes pl-flow { to { stroke-dashoffset: -28; } }
                .pl-flow { animation: pl-flow 1.2s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .pl-beat, .pl-flow { animation: none; } html { scroll-behavior: auto; } }
            `}</style>

            <Sidebar />

            <main className="lg:pl-60">
                <Hero />

                <Chapter id="what" n="01" title="PGMQ stores the messages. Pulsar operates them." lead="Pulsar is an orchestration engine, not a queue. You keep your Postgres and your business logic. Pulsar runs everything in between.">
                    <What />
                </Chapter>

                <Chapter id="poolers" n="02" title="Choose what wakes the engine, per queue" lead="An interval-driven queue is polled on a schedule under one shared lock. An event-driven queue sleeps until a database trigger fires, then drains itself and goes quiet. One insert burst does not mean one invocation per job.">
                    <Poolers />
                </Chapter>

                <Chapter id="features" n="03" title="Everything between the queues and your code" lead="The moving parts of a production queue, already built and configured per queue.">
                    <Features />
                </Chapter>

                <Chapter id="tick" n="04" title="One loop runs everything: the tick" lead="A tick is one complete execution cycle. Ticks repeat until a queue or engine cycleTickLimit is spent, or the host's clock runs low. Then the run ends and a fresh one begins.">
                    <TickLoop />
                </Chapter>

                <Chapter id="tuning" n="05" title="Do the math before production does" lead="Requested jobs are concurrency × n. If that exceeds maxJobsPerTick, Pulsar scales workers down for the tick instead of overloading your database. Self-invocation cost is just arithmetic.">
                    <Tuning />
                </Chapter>

                <Chapter id="runtimes" n="06" title="One engine, three ways to live" lead="Set the runtime and Pulsar adapts its scheduling and lifecycle. Pick one to watch how a run ends.">
                    <Runtimes />
                </Chapter>

                <Chapter id="storage" n="07" title="Postgres is enough. Redis makes it faster." lead="Unified Storage puts Redis and PostgreSQL behind one interface. Supply a cache driver and hot operations move to Redis. Leave it out and they run through an unlogged Postgres table.">
                    <Storage />
                </Chapter>

                <Chapter id="integrations" n="08" title="Plug jobs into anything" lead="Pulsar claims the jobs, then dispatches them to your own endpoint, your own function, or the streaming tools you already run.">
                    <Integrations />
                </Chapter>

                <Chapter
                    id="compatibility"
                    n="09"
                    title="Runs on the Postgres you already have"
                    lead="Pulsar works with most Postgres databases, including serverless ones like NeonDB. If your database can run the required extensions, you're set."
                >
                <Compatibility />
                </Chapter>

                <Chapter
                    id="author"
                    n="09"
                    title="Built by one person, in two months."
                    lead="Pulsar is a small project made with care, not a claim to be perfect. It is not a replacement for SQS and it is not built for a million requests per second. If it helps you, that's wonderful, and if you'd like to make it better, contributions are very welcome."
                >
                    <Maintainer />
                </Chapter>

                <Footer />
            </main>
        </div>
    )
}