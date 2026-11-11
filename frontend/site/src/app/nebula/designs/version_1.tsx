"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  PRIMITIVES & CONSTANTS                                            */
/* ------------------------------------------------------------------ */
const NAV = [
  ["what", "01 what"],
  ["topology", "02 topology"],
  ["leases", "03 leases"],
  ["architecture", "04 architecture"],
  ["config", "05 config"],
];

const LINKS = {
  github: "https://github.com/nightx/pulsar",
  docs: "https://github.com/nightx/pulsar/tree/main/docs",
  quickstart: "https://github.com/nightx/pulsar#quickstart",
};

const CLUSTER_INSTALL = "npm i @nightx/pulsar @nightx/nebula";

const CLUSTER_NODES = [
  { id: "node-aws-01", type: "AWS Lambda", queues: ["scrape", "embed"], status: "active", load: 74 },
  { id: "node-cf-02", type: "Cloudflare Worker", queues: ["scan", "sync"], status: "active", load: 42 },
  { id: "node-srv-03", type: "Dedicated Server", queues: ["heavy-compute", "export"], status: "active", load: 89 },
  { id: "node-edge-04", type: "Edge Isolate", queues: ["webhook-dispatch"], status: "standby", load: 0 },
];

const NEBULA_ENGINE_CODE = `import { Pulsar } from "@nightx/pulsar";
import { Nebula } from "@nightx/nebula";

// Nebula acts as the control plane; Pulsar remains the execution engine
const nebula = new Nebula({
  cluster: "production-us-east",
  storage: "redis://cluster-state:6379",
  heartbeatIntervalMs: 5000,
  leaseTtlMs: 15000,
});

const pulsar = new Pulsar({
  engine: {
    storage: "postgres://db:5432/app",
    cluster: nebula, // Hand over configuration and partition ownership
  }
});

await pulsar.start();`;

const STANDALONE_COMPARISON_CODE = `// 1. Standalone Mode (No Nebula)
// Pulsar runs completely self-contained with static, deploy-time config.
const standalonePulsar = new Pulsar({
  engine: { storage: "postgres://db:5432/app" },
  queues: [scrapeQueue, embedQueue]
});

// 2. Clustered Mode (With Nebula)
// Queue ownership, leasing, and partitions are dynamically orchestrated.
const clusteredPulsar = new Pulsar({
  engine: { 
    storage: "postgres://db:5432/app",
    cluster: nebula // Dynamic runtime configuration sync
  }
});`;

function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
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
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col justify-between border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:flex">
        <div>
          <a href="#top" className="mb-10 flex items-center gap-2.5 text-lg font-semibold">
            <Mark /> Nebula <span className="text-xs text-[var(--color-text-dim)]">for Pulsar</span>
          </a>
          {list}
        </div>
        <div className="space-y-4">
          <div className="flex gap-5 text-sm text-[var(--color-text-muted)]">
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.github}>GitHub</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.docs}>Docs</a>
          </div>
          <Btn href={LINKS.quickstart} solid>Cluster guide</Btn>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <Mark size={18} /> Nebula
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
/*  HERO VISUAL: CLUSTER TOPOLOGY MESH                                 */
/* ------------------------------------------------------------------ */
function ClusterMesh() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % CLUSTER_NODES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 md:p-8">
      <div className="pl-mono mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-4 text-xs text-[var(--color-text-muted)]">
        <span>control-plane: nebula-us-east</span>
        <span className="flex items-center gap-2">
          <i className="pl-beat inline-block h-1.5 w-1.5 bg-[var(--color-accent)]" />
          partitions synced
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {CLUSTER_NODES.map((node, i) => {
          const isSelected = pulse === i;
          return (
            <div
              key={node.id}
              className={
                "border p-4 transition-all duration-300 " +
                (isSelected
                  ? "border-[var(--color-accent)] bg-[var(--color-surface-active)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]")
              }
            >
              <div className="pl-mono flex items-center justify-between text-xs text-[var(--color-text-dim)]">
                <span>{node.type}</span>
                <span className={node.status === "active" ? "text-[var(--color-accent)]" : ""}>{node.status}</span>
              </div>
              <div className="mt-3 text-sm font-medium text-[var(--color-text-main)]">{node.id}</div>
              <div className="mt-4 flex flex-wrap gap-1">
                {node.queues.map((q) => (
                  <span key={q} className="pl-mono bg-[var(--color-border-dark)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">
                    {q}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[var(--color-text-dim)]">load lease</span>
                <span className="pl-mono text-[var(--color-text-main)]">{node.load}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pl-mono mt-6 flex flex-wrap items-center justify-between border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-dim)]">
        <span>Coordination Backend: Redis / Postgres</span>
        <span className="text-[var(--color-accent)]">Zero manual distribution required</span>
      </div>
    </div>
  );
}

function Hero() {
  const [ok, setOk] = useState(false);
  return (
    <section id="top" className="px-5 pb-20 pt-16 md:px-10 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="pl-mono mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-text-muted)]">
          <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[var(--color-accent)]">cluster orchestration</span>
          <span>Pulsar Engine</span><span>·</span><span>Control Plane</span><span>·</span><span>Distributed Leases</span>
        </div>
        <h1 className="text-[2.9rem] font-semibold leading-[0.98] tracking-tight sm:text-7xl md:text-[6.5rem]">
          Cluster management for <span className="text-[var(--color-accent)]">Pulsar</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)] md:col-span-7 md:text-xl">
            Nebula is the control plane that coordinates multiple Pulsar execution nodes across serverless functions, edge isolates, and persistent servers as a single unified system.
          </p>
          <div className="flex flex-col items-start gap-3 md:col-span-5 md:items-end">
            <Btn href={LINKS.quickstart} solid>Deploy a cluster →</Btn>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(CLUSTER_INSTALL);
                setOk(true);
                setTimeout(() => setOk(false), 1400);
              }}
              aria-label={`Copy ${CLUSTER_INSTALL}`}
              className="pl-mono flex items-center gap-3 border border-[var(--color-border-subtle)] px-5 py-3 text-sm text-[var(--color-code-text)] hover:border-[var(--color-text-main)]"
            >
              <span className="text-[var(--color-accent)]">$</span>
              {CLUSTER_INSTALL}
              <span className="text-xs text-[var(--color-text-dim)]">{ok ? "copied" : "copy"}</span>
            </button>
          </div>
        </div>
        <div className="mt-16"><ClusterMesh /></div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          Pulsar remains a standalone powerhouse on its own. When you scale across regions or functions, Nebula orchestrates them automatically.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  01 WHAT: CONTROL PLANE vs EXECUTION ENGINE                        */
/* ------------------------------------------------------------------ */
function What() {
  return (
    <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-2">
      <div className="bg-[var(--color-surface)] p-6 md:p-8">
        <div className="pl-mono mb-4 text-xs text-[var(--color-accent)]">Control Plane</div>
        <h3 className="text-2xl font-medium">Nebula</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Manages cluster topology, heartbeat monitoring, partition assignments, and lease-based coordination. It does not execute jobs; it orchestrates who runs them.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-[var(--color-code-text)]">
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">✓</span> Real-time configuration sync</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">✓</span> Automatic workload redistribution</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">✓</span> Lease expiration & node failure recovery</li>
        </ul>
      </div>

      <div className="bg-[var(--color-surface)] p-6 md:p-8">
        <div className="pl-mono mb-4 text-xs text-[var(--color-text-dim)]">Execution Engine</div>
        <h3 className="text-2xl font-medium">Pulsar Node</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          A standalone worker node that handles message polling, concurrency budgets, tick cycles, and job dispatching. Can run completely disconnected without Nebula.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-[var(--color-text-dim)]">
          <li className="flex items-start gap-3"><span className="text-[var(--color-text-dim)]">○</span> Fully standalone by default</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-text-dim)]">○</span> Zero-dependency core execution</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-text-dim)]">○</span> Pluggable cluster awareness</li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  02 TOPOLOGY: PARTITIONS & CLUSTERS                                */
/* ------------------------------------------------------------------ */
function Topology() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Standalone Node", "Pulsar runs as a self-contained process with hardcoded queue configurations. Ideal for single-server or straightforward container deployments."],
          ["Partition", "A logical grouping of queues allocated across a specific domain or service tier, supervised by the Nebula control plane."],
          ["Cluster", "Multiple partitions and active Pulsar instances bound together via a shared state backend (Redis/Postgres) for global scale."],
        ].map(([title, desc], i) => (
          <div key={title} className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <span className="pl-mono text-xs text-[var(--color-accent)]">0{i + 1}</span>
            <div className="mt-4 text-lg font-medium text-[var(--color-text-main)]">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-[var(--color-border)] p-6 md:p-8">
        <div className="text-xl font-medium">Standalone vs Clustered Architecture</div>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Nebula does not force a rewrite. It wraps your configuration layer so your workers stay lean while your cluster stays coordinated.
        </p>
        <div className="mt-6">
          <Code title="cluster-initialization.ts" code={STANDALONE_COMPARISON_CODE} />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  03 LEASES: HEARTBEATS & FAILURE RECOVERY                          */
/* ------------------------------------------------------------------ */
function Leases() {
  const [activeTab, setActiveTab] = useState<"healthy" | "crashed">("healthy");

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("healthy")}
          className={
            "pl-mono flex-1 px-6 py-4 text-xs transition-colors " +
            (activeTab === "healthy"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text-main)] bg-[var(--color-surface-active)]"
              : "text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]")
          }
        >
          01 / Active Node Heartbeat
        </button>
        <button
          onClick={() => setActiveTab("crashed")}
          className={
            "pl-mono flex-1 px-6 py-4 text-xs transition-colors " +
            (activeTab === "crashed"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text-main)] bg-[var(--color-surface-active)]"
              : "text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]")
          }
        >
          02 / Node Failure & Lease Expiry
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "healthy" ? (
          <div>
            <div className="text-lg font-medium">Continuous Lease Maintenance</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Every Pulsar worker instance registers with a unique ID and maintains an active lease. It sends lightweight heartbeats every few seconds to signal operational readiness.
            </p>
            <div className="pl-mono mt-6 border border-[var(--color-border)] p-4 text-xs text-[var(--color-accent)]">
              [NEBULA] node &apos;node-aws-01&apos; renewed lease for queues [scrape, embed] (TTL: 15000ms)
            </div>
          </div>
        ) : (
          <div>
            <div className="text-lg font-medium">Automatic Workload Redistribution</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              If an instance crashes or loses network connectivity, its heartbeat lease expires. Nebula immediately revokes its queue assignments and reallocates them to healthy nodes in the cluster.
            </p>
            <div className="pl-mono mt-6 border border-[var(--color-border)] p-4 text-xs text-amber-500">
              [NEBULA] heartbeat expired for &apos;node-cf-02&apos;. Releasing queues [scan, sync] to cluster pool.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  04 ARCHITECTURE: SHARED STATE BACKEND                            */
/* ------------------------------------------------------------------ */
function Architecture() {
  return (
    <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-2">
      <div className="bg-[var(--color-surface)] p-6 md:p-8">
        <div className="text-xl font-medium">Shared State & Coordination</div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Nebula relies on a shared storage backend—either Redis or PostgreSQL—to maintain cluster topology, active leases, and runtime configuration rules.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-[var(--color-code-text)]">
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">•</span> Independent instances require zero direct peer-to-peer chatter.</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">•</span> Redis delivers sub-millisecond lease locking and heartbeat checks.</li>
          <li className="flex items-start gap-3"><span className="text-[var(--color-accent)]">•</span> PostgreSQL ensures durable state persistence across cold starts.</li>
        </ul>
      </div>

      <div className="bg-[var(--color-surface)] p-6 md:p-8">
        <div className="text-xl font-medium">Multi-Runtime Deployment</div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Mix and match serverless functions, containerized workers, and edge nodes freely. Nebula acts as the single pane of glass uniting disparate hosting environments.
        </p>
        <div className="pl-mono mt-6 space-y-2 text-xs text-[var(--color-text-dim)]">
          <div className="border border-[var(--color-border)] p-3">Cloudflare Worker → Pulsar Worker (Edge)</div>
          <div className="border border-[var(--color-border)] p-3">AWS Lambda → Pulsar Worker (Serverless)</div>
          <div className="border border-[var(--color-border)] p-3">Docker Container → Pulsar Worker (Persistent)</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  05 CONFIG: CODE EXAMPLE                                          */
/* ------------------------------------------------------------------ */
function ConfigSection() {
  return (
    <>
      <Code title="nebula-cluster.ts" code={NEBULA_ENGINE_CODE} />
      <p className="mt-4 text-sm text-[var(--color-text-dim)]">
        When enabled, Pulsar syncs its tick budgets and queue bindings dynamically with Nebula in real time, eliminating static deploy-time bottlenecks.
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
          <h2 className="max-w-4xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">Scale your Pulsar queues.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={LINKS.quickstart} className="bg-[var(--color-accent-contrast)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-footer-btn-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-contrast)]">Get started</a>
            <a href={LINKS.github} className="border border-[var(--color-accent-contrast)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-accent-contrast)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-contrast)]">Star on GitHub</a>
          </div>
        </div>
      </section>
      <footer className="border-t border-[var(--color-border)] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-text-dim)]">
          <span className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-main)]"><Mark size={18} /> Nebula / Pulsar</span>
          <div className="flex gap-6">
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.github}>GitHub</a>
          </div>
          <span>© {new Date().getFullYear()} Nebula Cluster Engine. Open source.</span>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE ROOT                                                          */
/* ------------------------------------------------------------------ */
export default function NebulaLanding() {
    return (
        <div
            className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] antialiased"
            style={{
                fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

                :root {
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
                @media (prefers-reduced-motion: reduce) { .pl-beat { animation: none; } html { scroll-behavior: auto; } }
            `}</style>

            <Sidebar />

            <main className="lg:pl-60">
                <Hero />

                <Chapter
                    id="what"
                    n="01"
                    title="Nebula coordinates. Pulsar executes."
                    lead="Pulsar runs as a standalone engine out of the box. Nebula is the control plane layer that orchestrates multiple instances, partitions, and queue leases across your infrastructure."
                >
                    <What />
                </Chapter>

                <Chapter
                    id="topology"
                    n="02"
                    title="Partitions, clusters, and standalone nodes"
                    lead="Whether you run a single Pulsar worker or distribute workloads across global serverless functions, Nebula maps queue ownership dynamically without rewriting your code."
                >
                    <Topology />
                </Chapter>

                <Chapter
                    id="leases"
                    n="03"
                    title="Lease-based coordination and automatic recovery"
                    lead="Nodes maintain active heartbeats. If an instance drops offline, Nebula detects the expired lease instantly and redistributes its queues to healthy workers."
                >
                    <Leases />
                </Chapter>

                <Chapter
                    id="architecture"
                    n="04"
                    title="Shared state across serverless and edge"
                    lead="Using Redis or PostgreSQL as a shared control state, independently deployed Pulsar instances coordinate seamlessly without needing peer-to-peer networking."
                >
                    <Architecture />
                </Chapter>

                <Chapter
                    id="config"
                    n="05"
                    title="Plug Nebula into your Pulsar engine"
                    lead="Enable cluster management with a few lines of configuration during initialization, maintaining the exact same clean developer experience you expect."
                >
                    <ConfigSection />
                </Chapter>

                <Footer />
            </main>
        </div>
    );
}