"use client";

import { useEffect, useState } from "react";

/* ================================================================== */
/*  DATA & CONSTANTS                                                   */
/* ================================================================== */
const INSTALL = "npm install @nightx/pulsar @nightx/nebula";
const LINKS = { quickstart: "https://github.com/nightx/pulsar#quickstart", github: "https://github.com/nightx/pulsar", docs: "https://github.com/nightx/pulsar/tree/main/docs", pulsar: "/" };

const NAV: [string, string][] = [
  ["overview", "Overview"],
  ["topology", "Topology"],
  ["lifecycle", "Lifecycle"],
  ["failover", "Failover"],
  ["config", "Live config"],
  ["state", "Shared state"],
  ["sdk", "SDK"],
  ["roles", "Roles"],
];

const PROFILES = ["realtime", "fast", "balanced", "relaxed", "background"];
const RUNTIME_NAMES = ["Cloudflare Worker", "Serverless function", "Persistent container", "Edge isolate"];

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================================================================== */
/*  PRIMITIVES                                                         */
/* ================================================================== */
function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="var(--color-accent)" strokeWidth="1.6" strokeDasharray="2 3" />
      <circle cx="12" cy="12" r="3.2" fill="var(--color-accent)" />
      <circle cx="20" cy="9" r="1.8" fill="var(--color-text-main)" />
    </svg>
  );
}

function Btn({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <a
      href={href}
      className={
        "inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
        (solid
          ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
          : "border border-[var(--color-border-subtle)] text-[var(--color-text-main)] hover:border-[var(--color-text-main)]")
      }
    >
      {children}
    </a>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"border border-[var(--color-border)] bg-[var(--color-surface)] " + className}>{children}</div>;
}

function Label({ children, hot = false }: { children: React.ReactNode; hot?: boolean }) {
  return <div className={"pl-mono text-[11px] uppercase tracking-[0.14em] " + (hot ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]")}>{children}</div>;
}

function Seg({ options, value, onChange, label }: { options: string[]; value: number; onChange: (i: number) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex flex-wrap border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
      {options.map((o, i) => (
        <button
          key={o}
          role="tab"
          aria-selected={value === i}
          onClick={() => onChange(i)}
          className={
            "px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] " +
            (value === i ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]")
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CodeLines({ title, lines }: { title: string; lines: [string, boolean?][] }) {
  return (
    <div className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-code-bg)]">
      <div className="pl-mono flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5 text-xs text-[var(--color-text-dim)]">
        <i className="h-2 w-2 bg-[var(--color-accent)]" />
        {title}
      </div>
      <pre className="pl-mono overflow-x-auto py-4 text-[13px] leading-6 text-[var(--color-code-text)]">
        {lines.map(([t, hot], i) => (
          <div key={i} className={"whitespace-pre px-5 " + (hot ? "border-l-2 border-[var(--color-accent)] bg-[var(--color-surface-active)] pl-[18px] text-[var(--color-text-main)]" : "")}>{t || " "}</div>
        ))}
      </pre>
    </div>
  );
}

function Ruler() {
  return (
    <svg className="block h-3 w-full" aria-hidden>
      <defs>
        <pattern id="r1" width="10" height="12" patternUnits="userSpaceOnUse"><rect x="0" y="8" width="1" height="4" fill="var(--color-border-dark)" /></pattern>
        <pattern id="r2" width="100" height="12" patternUnits="userSpaceOnUse"><rect x="0" y="2" width="1" height="10" fill="var(--color-border-subtle)" /></pattern>
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
        <div className="pl-mono flex items-center gap-4 text-xs text-[var(--color-text-dim)]">
          <span className="text-[var(--color-accent)]">{n}</span>
          <span>/ 08</span>
          <span className="uppercase tracking-[0.14em]">{NAV.find((x) => x[0] === id)?.[1]}</span>
        </div>
        <h2 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">{title}</h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] md:ml-auto md:mt-0 md:-translate-y-2 md:text-lg">{lead}</p>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  HEADER                                                             */
/* ================================================================== */
function Header() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(NAV.findIndex((x) => x[0] === e.target.id))),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="flex h-14 items-stretch">
        <a href="#top" className="flex items-center gap-2 border-r border-[var(--color-border)] px-5 font-semibold">
          <Mark /> Nebula
        </a>
        <nav className="hidden flex-1 xl:flex" aria-label="Sections">
          {NAV.map(([id, label], i) => (
            <a
              key={id}
              href={"#" + id}
              className={"relative flex flex-1 items-end gap-2 px-3 pb-2.5 pl-mono text-[11px] transition-colors " + (i === active ? "text-[var(--color-text-main)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]")}
            >
              <span className="absolute inset-x-1 top-0 h-[3px]" style={{ background: i === active ? "var(--color-accent)" : i < active ? "var(--color-border-subtle)" : "var(--color-border)" }} />
              <span className={i === active ? "text-[var(--color-accent)]" : ""}>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5 border-l border-[var(--color-border)] px-5 text-sm">
          <a className="hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] sm:block" href={LINKS.pulsar}>Pulsar ↗</a>
          <a className="hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] sm:block" href={LINKS.docs}>Docs</a>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle sections"
            className="pl-mono border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs xl:hidden"
          >
            {open ? "close" : String(active + 1).padStart(2, "0") + " " + NAV[active][1]}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-3 xl:hidden">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {NAV.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={"#" + id}
                  onClick={() => setOpen(false)}
                  className={"pl-mono block px-3 py-3 text-xs " + (i === active ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-active)]")}
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
/*  HERO: ORBIT INTERACTIVE REVEAL                                     */
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
      className="pl-mono flex items-center gap-3 border border-[var(--color-border-subtle)] px-5 py-3 text-sm text-[var(--color-code-text)] hover:border-[var(--color-text-main)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <span className="text-[var(--color-accent)]">$</span>
      {INSTALL}
      <span className="text-xs text-[var(--color-text-dim)]">{ok ? "copied" : "copy"}</span>
    </button>
  );
}

const PULSAR_URL = "https://pulsar-engine.vercel.app/";
const PULSAR_INTERACTIVE = true;
const REVEAL_MS = 500;
const EASE = "cubic-bezier(.65,0,.35,1)";

const NODES = [
  { id: "pl-edge-01", rt: "Cloudflare Worker", cap: 40, q: ["scrape", "embed"], cl: "ingest" },
  { id: "pl-fn-02", rt: "Serverless function", cap: 60, q: ["scan"], cl: "ingest" },
  { id: "pl-ctr-01", rt: "Persistent container", cap: 120, q: ["summarize", "classify"], cl: "ai-jobs" },
  { id: "pl-fn-03", rt: "Serverless function", cap: 60, q: ["transcribe"], cl: "ai-jobs" },
  { id: "pl-edge-02", rt: "Edge isolate", cap: 20, q: ["cleanup"], cl: "maintenance" },
  { id: "pl-fn-04", rt: "Serverless function", cap: 60, q: ["scrape"], cl: "ingest" },
  { id: "pl-ctr-02", rt: "Persistent container", cap: 80, q: ["embed"], cl: "ingest" },
  { id: "pl-edge-03", rt: "Cloudflare Worker", cap: 40, q: ["classify"], cl: "ai-jobs" },
  { id: "pl-ctr-03", rt: "Persistent container", cap: 100, q: ["scan", "cleanup"], cl: "maintenance" },
];

function Orbit() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [anim, setAnim] = useState(false);
  const [busy, setBusy] = useState(false);
  const [calm, setCalm] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 480, h: 456 });

  useEffect(() => setCalm(reduced()), []);

  useEffect(() => {
    if (!stage) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setSize((s) => (s.w === w ? s : { w, h: Math.max(360, Math.round(w * 0.95)) }));
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [stage]);

  const openNode = (i: number, el: Element) => {
    if (!stage || open || busy) return;
    const a = el.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    setCur(i);
    setAnim(false);
    setOrigin({ x: a.left + a.width / 2 - s.left, y: a.top + a.height / 2 - s.top });
    setBusy(true);
    setTimeout(() => { setAnim(true); setOpen(true); }, 40);
    setTimeout(() => setBusy(false), REVEAL_MS + 60);
  };
  const close = () => {
    if (!open || busy) return;
    setBusy(true);
    setOpen(false);
    setTimeout(() => setBusy(false), REVEAL_MS + 20);
  };

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !busy) {
        setBusy(true);
        setOpen(false);
        setTimeout(() => setBusy(false), REVEAL_MS + 20);
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [open, busy]);

  const R = Math.ceil(
    Math.max(
      Math.hypot(origin.x, origin.y),
      Math.hypot(size.w - origin.x, origin.y),
      Math.hypot(origin.x, size.h - origin.y),
      Math.hypot(size.w - origin.x, size.h - origin.y)
    )
  );
  const r = open ? R : 0;
  const scale = size.w / 1280;
  const t = anim && !calm ? `${REVEAL_MS}ms ${EASE}` : "0ms";
  const n = NODES[cur];
  const h = hover !== null ? NODES[hover] : null;

  const rings = [
    { r: 78, n: 2, dur: 38, rev: false, off: 0 },
    { r: 128, n: 3, dur: 62, rev: true, off: 2 },
    { r: 176, n: 4, dur: 90, rev: false, off: 5 },
  ];
  const paused = hover !== null || open;

  return (
    <Panel className="overflow-hidden">
      <div className="flex h-[52px] items-center justify-between border-b border-[var(--color-border)] px-4">
        <span className="pl-mono flex items-center gap-2 text-xs text-[var(--color-text-dim)]">
          <i className="pl-beat h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          {open ? `${n.cl} · ${n.id}` : "cluster view · 9 instances"}
        </span>
        {!open && <span className="pl-mono border border-[var(--color-border-subtle)] px-3 py-1 text-[11px] text-[var(--color-text-muted)]">click a dot</span>}
      </div>

      <div ref={setStage} className="relative overflow-hidden bg-[var(--color-surface)]" style={{ height: size.h }}>
        <div
          aria-hidden={open}
          className="absolute inset-0"
          style={{
            transform: open ? "scale(1.7)" : "scale(1)",
            transformOrigin: `${origin.x}px ${origin.y}px`,
            opacity: open ? 0.25 : 1,
            transition: `transform ${t}, opacity ${t}`,
            pointerEvents: open ? "none" : "auto",
          }}
        >
          <svg viewBox="-60 0 520 400" className="absolute inset-0 h-full w-full" role="group" aria-label="Nebula with nine Pulsar instances orbiting it. Select one to open it.">
            {rings.map(({ r: rr }) => (
              <circle key={rr} cx="200" cy="200" r={rr} fill="none" stroke="var(--color-border)" strokeDasharray="2 6" />
            ))}
            {rings.map(({ r: rr, n: cnt, dur, rev, off }, ri) => (
              <g
                key={rr}
                className="nb-spin"
                style={{ animationDuration: `${dur}s`, animationDirection: rev ? "reverse" : "normal", animationPlayState: paused ? "paused" : "running" }}
              >
                {Array.from({ length: cnt }, (_, i) => {
                  const k = off + i;
                  const a = (i / cnt) * Math.PI * 2 + ri * 0.7;
                  const x = 200 + rr * Math.cos(a);
                  const y = 200 + rr * Math.sin(a);
                  const on = hover === k;
                  return (
                    <g key={i}>
                      <line x1="200" y1="200" x2={x} y2={y} stroke={on ? "var(--color-accent)" : "var(--color-border-dark)"} />
                      <circle cx={x} cy={y} r={on ? 12 : 9} fill="var(--color-bg)" stroke={on ? "var(--color-accent)" : "var(--color-text-main)"} strokeWidth="1.5" />
                      <circle cx={x} cy={y} r={on ? 4.5 : 3} fill={on ? "var(--color-accent)" : "var(--color-text-main)"} />
                      <circle
                        cx={x}
                        cy={y}
                        r="17"
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="2"
                        className="cursor-pointer outline-none focus-visible:stroke-[var(--color-accent)]"
                        role="button"
                        tabIndex={open ? -1 : 0}
                        aria-label={`Open ${NODES[k].id}, ${NODES[k].rt}`}
                        onMouseEnter={() => setHover(k)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(k)}
                        onBlur={() => setHover(null)}
                        onClick={(e) => openNode(k, e.currentTarget)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openNode(k, e.currentTarget);
                          }
                        }}
                      />
                    </g>
                  );
                })}
              </g>
            ))}
            <circle cx="200" cy="200" r="38" fill="var(--color-accent)" />
            <text x="200" y="205" textAnchor="middle" fill="var(--color-accent-contrast)" fontSize="14" fontWeight="600">Nebula</text>
          </svg>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full border-2 border-[var(--color-accent)]"
          style={{
            left: origin.x - r,
            top: origin.y - r,
            width: r * 2,
            height: r * 2,
            opacity: busy ? 1 : 0,
            transition: `left ${t}, top ${t}, width ${t}, height ${t}, opacity 200ms`,
          }}
        />

        <div
          aria-hidden={!open}
          className="absolute inset-0 flex flex-col bg-[var(--color-bg)]"
          style={{
            clipPath: `circle(${r}px at ${origin.x}px ${origin.y}px)`,
            transition: `clip-path ${t}`,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[var(--color-border)] px-3">
            <button
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="pl-mono border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs hover:border-[var(--color-text-main)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              ← cluster
            </button>
            <span className="pl-mono truncate text-xs">
              <span className="text-[var(--color-accent)]">{n.id}</span>
              <span className="text-[var(--color-text-dim)]"> · {n.rt}</span>
            </span>
            <span className="pl-mono hidden items-center gap-1.5 text-[11px] text-[var(--color-text-dim)] sm:flex">
              <i className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />lease held
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <iframe
              title={`Pulsar instance ${n.id}`}
              src={PULSAR_URL}
              loading="lazy"
              tabIndex={open ? 0 : -1}
              className="absolute left-0 top-0 border-0 bg-[var(--color-bg)]"
              style={{
                width: 1280,
                height: (size.h - 92) / scale,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: PULSAR_INTERACTIVE ? "auto" : "none",
              }}
            />
          </div>

          <div className="pl-mono flex h-12 shrink-0 items-center gap-x-4 overflow-hidden border-t border-[var(--color-border)] px-3 text-[11px] text-[var(--color-text-dim)]">
            <span className="flex gap-1.5">
              {n.q.map((q) => (
                <span key={q} className="bg-[var(--color-accent)] px-2 py-0.5 font-medium text-[var(--color-accent-contrast)]">{q}</span>
              ))}
            </span>
            <span>capacity {n.cap}</span>
            <span className="hidden sm:inline">cluster {n.cl}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-4 py-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {open
          ? "That's Pulsar: the same engine, running as one node of this cluster. Go back to see the rest."
          : h
          ? `${h.id} · ${h.rt} · ${h.q.join(", ")}`
          : "Every dot is a Pulsar instance. Hover to inspect one, click to open it."}
      </div>
    </Panel>
  );
}

function Hero() {
  return (
    <section id="top" className="px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="pl-mono mb-8 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="border border-[var(--color-accent)] px-3 py-1 text-[var(--color-accent)]">control plane</span>
            <span className="border border-[var(--color-border-subtle)] px-3 py-1">for Pulsar</span>
            <span className="border border-[var(--color-border-subtle)] px-3 py-1">optional</span>
          </div>
          <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl xl:text-[6.2rem]">
            One control plane for every <span className="text-[var(--color-accent)]">Pulsar.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
            Nebula coordinates many Pulsar instances across serverless functions, edge workers and persistent servers: who owns which queue, with which configuration, and what happens when one goes dark. It never touches a job.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Btn href="#topology" solid>Explore the architecture →</Btn>
            <CopyCmd />
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-text-dim)]">
            Pulsar still runs perfectly well on its own. Nebula is what you add when managing deployments by hand stops scaling.
          </p>
        </div>
        <div className="lg:col-span-5"><Orbit /></div>
      </div>
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-3 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {[["N", "Pulsar instances, one cluster"], ["1", "owner per queue, by lease"], ["0", "jobs executed by Nebula"]].map(([a, b]) => (
          <div key={b} className="px-3 py-6 md:px-8">
            <div className="text-4xl font-semibold tracking-tight md:text-6xl">{a}</div>
            <div className="pl-mono mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] md:text-xs">{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  01 OVERVIEW: STANDALONE VS MANAGED                                 */
/* ================================================================== */
function Overview() {
  const [m, setM] = useState(0);
  const managed = m === 1;
  const nodes = [
    { x: 100, rt: "Cloudflare Worker" },
    { x: 300, rt: "Serverless function" },
    { x: 500, rt: "Persistent container" },
  ];
  const rows: [string, string, string][] = [
    ["Engine and tick loop", "Pulsar", "Same Pulsar, unchanged"],
    ["Where config comes from", "Hard-coded at deploy", "Assigned live by Nebula"],
    ["Who owns a queue", "You decide, per deployment", "One instance, by lease"],
    ["When an instance dies", "You notice and redeploy", "Queues move to healthy peers"],
    ["Adding an instance", "Edit config, redeploy", "Register and receive work"],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Panel className="p-5 md:p-7">
        <Seg options={["Standalone Pulsar", "Managed by Nebula"]} value={m} onChange={setM} label="Deployment mode" />
        <svg viewBox="0 0 600 320" className="mt-6 w-full" role="img" aria-label={managed ? "Nebula pushing configuration to three Pulsar instances" : "A single Pulsar instance with configuration baked in at deploy time"}>
          {!managed ? (
            <g>
              <rect x="30" y="125" width="170" height="70" stroke="var(--color-border-subtle)" strokeDasharray="4 4" fill="var(--color-bg)" />
              <text x="115" y="154" textAnchor="middle" fill="var(--color-text-main)" fontSize="14">config.ts</text>
              <text x="115" y="176" textAnchor="middle" fill="var(--color-text-dim)" fontSize="11">baked in at deploy time</text>
              <path d="M200 160 H340" stroke="var(--color-border-subtle)" strokeWidth="2" />
              <polygon points="340,160 330,155 330,165" fill="var(--color-border-subtle)" />
              <rect x="340" y="100" width="230" height="120" fill="var(--color-surface)" stroke="var(--color-text-main)" />
              <text x="455" y="150" textAnchor="middle" fill="var(--color-text-main)" fontSize="22" fontWeight="600">Pulsar</text>
              <text x="455" y="176" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12">tick loop · poolers · workers</text>
            </g>
          ) : (
            <g>
              <rect x="80" y="14" width="440" height="58" fill="var(--color-accent)" />
              <text x="300" y="40" textAnchor="middle" fill="var(--color-accent-contrast)" fontSize="18" fontWeight="600">Nebula</text>
              <text x="300" y="58" textAnchor="middle" fill="var(--color-accent-contrast)" opacity="0.8" fontSize="11">topology · leases · live config</text>
              {nodes.map((nd, i) => {
                const sx = 160 + i * 140;
                const d = `M${sx} 72 C ${sx} 140, ${nd.x} 130, ${nd.x} 200`;
                return (
                  <g key={nd.x}>
                    <path d={d} fill="none" stroke="var(--color-border)" strokeWidth="2" />
                    <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
                    <rect x={nd.x - 85} y="200" width="170" height="96" fill="var(--color-surface)" stroke="var(--color-text-main)" />
                    <text x={nd.x} y="240" textAnchor="middle" fill="var(--color-text-main)" fontSize="18" fontWeight="600">Pulsar</text>
                    <text x={nd.x} y="262" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">{nd.rt}</text>
                    <text x={nd.x} y="281" textAnchor="middle" fill="var(--color-accent)" fontSize="10">same engine inside</text>
                  </g>
                );
              })}
              <text x="300" y="135" textAnchor="middle" fill="var(--color-text-dim)" fontSize="11">live config + queue assignments</text>
            </g>
          )}
        </svg>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {managed
            ? "Joining a cluster does not rewrite Pulsar. The engine keeps polling, scheduling and dispatching exactly as before. Nebula just supplies the configuration, in real time."
            : "A single Pulsar deployment with its settings written into the deploy. Simple, self-contained, and still fully supported."}
        </p>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[var(--color-border)] px-5 py-3 text-[11px]">
          <span className="pl-mono text-[var(--color-text-dim)]">what</span>
          <span className={"pl-mono " + (!managed ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]")}>standalone</span>
          <span className={"pl-mono " + (managed ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]")}>with Nebula</span>
        </div>
        {rows.map(([k, a, b]) => (
          <div key={k} className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-b border-[var(--color-border-dark)] px-5 py-4 text-sm last:border-0">
            <span className="text-[var(--color-text-muted)]">{k}</span>
            <span className={!managed ? "text-[var(--color-text-main)]" : "text-[var(--color-text-subtle)]"}>{a}</span>
            <span className={managed ? "text-[var(--color-text-main)]" : "text-[var(--color-text-subtle)]"}>{b}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  02 TOPOLOGY                                                       */
/* ================================================================== */
type Cluster = { id: string; queues: string[]; instances: { id: string; rt: string; cap: number }[] };
const CLUSTERS: Cluster[] = [
  { id: "ingest", queues: ["scrape", "embed"], instances: [{ id: "pl-edge-01", rt: "Cloudflare Worker", cap: 40 }, { id: "pl-fn-02", rt: "Serverless function", cap: 60 }] },
  { id: "ai-jobs", queues: ["transcribe", "summarize", "classify"], instances: [{ id: "pl-ctr-01", rt: "Persistent container", cap: 120 }, { id: "pl-fn-03", rt: "Serverless function", cap: 60 }] },
  { id: "maintenance", queues: ["scan", "cleanup"], instances: [{ id: "pl-edge-02", rt: "Edge isolate", cap: 20 }] },
];

function Topology() {
  const [sel, setSel] = useState(0);
  const [extra, setExtra] = useState<number[]>([0, 0, 0]);
  const cl = CLUSTERS[sel];
  const added = Array.from({ length: extra[sel] }, (_, k) => ({
    id: `pl-new-${String(k + 1).padStart(2, "0")}`,
    rt: RUNTIME_NAMES[(k + sel) % RUNTIME_NAMES.length],
    cap: 30,
  }));
  const inst = [...cl.instances, ...added];
  const assigned: string[][] = inst.map(() => []);
  cl.queues.forEach((q, i) => assigned[i % inst.length].push(q));

  return (
    <div>
      <div className="bg-[var(--color-accent)] px-6 py-5 text-[var(--color-accent-contrast)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="pl-mono text-[11px] opacity-80">CONTROL PLANE</div>
            <div className="text-2xl font-semibold">Nebula</div>
          </div>
          <div className="pl-mono text-xs opacity-80">{CLUSTERS.length} clusters · {CLUSTERS.reduce((a, c, i) => a + c.instances.length + extra[i], 0)} instances</div>
        </div>
      </div>

      <div className="mx-auto h-6 w-px bg-[var(--color-border-subtle)]" aria-hidden />
      <div className="grid gap-3 md:grid-cols-3">
        {CLUSTERS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={"relative border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] " + (sel === i ? "border-[var(--color-accent)] bg-[var(--color-surface-active)]" : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-subtle)]")}
          >
            <span className="absolute -top-3 left-1/2 hidden h-3 w-px bg-[var(--color-border-subtle)] md:block" aria-hidden />
            <div className="pl-mono text-[11px] text-[var(--color-text-dim)]">CLUSTER · PARTITION</div>
            <div className="mt-1 text-xl font-medium">{c.id}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.queues.map((q) => <span key={q} className="pl-mono border border-[var(--color-border-subtle)] px-2 py-0.5 text-[11px] text-[var(--color-text-muted)]">{q}</span>)}
            </div>
            <div className="pl-mono mt-3 text-xs text-[var(--color-text-dim)]">{c.instances.length + extra[i]} instance{c.instances.length + extra[i] > 1 ? "s" : ""}</div>
          </button>
        ))}
      </div>

      <Panel className="mt-4 p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Label hot>{cl.id} · allowed queues</Label>
            <p className="mt-2 max-w-xl text-sm text-[var(--color-text-muted)]">The cluster defines which queues its instances may serve. Nebula spreads them across whoever has joined. Each queue has exactly one owner at a time.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setExtra((e) => e.map((v, i) => (i === sel ? Math.min(v + 1, 3) : v)))}
              className="bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              + Join an instance
            </button>
            <button onClick={() => setExtra((e) => e.map((v, i) => (i === sel ? 0 : v)))} className="border border-[var(--color-border-subtle)] px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]">Reset</button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {inst.map((n, i) => (
            <div key={n.id} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4">
              <div className="flex items-center justify-between">
                <span className="pl-mono text-xs text-[var(--color-text-main)]">{n.id}</span>
                <i className="h-2 w-2 rounded-full" style={{ background: assigned[i].length ? "var(--color-accent)" : "var(--color-border-subtle)" }} />
              </div>
              <div className="mt-1 text-xs text-[var(--color-text-dim)]">{n.rt}</div>
              <div className="mt-4 h-1.5 bg-[var(--color-surface-alt)]" aria-hidden>
                <div className="h-full bg-[var(--color-text-main)]" style={{ width: `${Math.min(100, (n.cap / 120) * 100)}%` }} />
              </div>
              <div className="pl-mono mt-1 text-[11px] text-[var(--color-text-dim)]">capacity {n.cap}</div>
              <div className="mt-4 flex min-h-[28px] flex-wrap gap-1.5">
                {assigned[i].length ? (
                  assigned[i].map((q) => <span key={q} className="pl-mono bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent-contrast)]">{q}</span>)
                ) : (
                  <span className="pl-mono text-[11px] text-[var(--color-text-dim)]">standby · no queue</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-[var(--color-text-dim)]">Each instance is a normal Pulsar. It can sit on a different runtime from its neighbours.</p>
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  03 LIFECYCLE                                                      */
/* ================================================================== */
const LSTEPS: [string, string][] = [
  ["Register", "The instance starts and announces a unique instance ID and the execution capacity it can offer."],
  ["Assign", "Nebula looks at the cluster topology and existing assignments, then picks queues for this instance."],
  ["Configure", "The assignment and configuration are handed to the Pulsar engine, which polls, schedules and executes exactly as before."],
  ["Heartbeat", "While running, the instance keeps refreshing its heartbeat and holding its lease on every assigned queue."],
  ["Release", "A graceful exit tells Nebula to release the queues. A crash simply stops the heartbeat, and the lease expires."],
];

function Arrow({ x1, x2, y, active, label }: { x1: number; x2: number; y: number; active: boolean; label: string }) {
  const dir = x2 > x1 ? 1 : -1;
  const c = active ? "var(--color-accent)" : "var(--color-border-subtle)";
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth="2" />
      <polygon points={`${x2},${y} ${x2 - dir * 9},${y - 5} ${x2 - dir * 9},${y + 5}`} fill={c} />
      <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle" fill={active ? "var(--color-text-main)" : "var(--color-text-dim)"} fontSize="12">{label}</text>
    </g>
  );
}

function Lifecycle() {
  const [s, setS] = useState(0);
  const [play, setPlay] = useState(true);
  useEffect(() => {
    if (!play || reduced()) return;
    const id = setInterval(() => setS((x) => (x + 1) % LSTEPS.length), 1600);
    return () => clearInterval(id);
  }, [play]);

  const states = ["registered", "assigned", "configured", "running", "released"];
  const lease = s < 1 ? "none" : s < 4 ? "held" : "released";

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
      <Panel className="p-4 md:p-6">
        <svg viewBox="0 0 600 400" className="w-full" role="img" aria-label="Sequence between a Pulsar instance and Nebula: register, assign, configure, heartbeat, release">
          <rect x="30" y="4" width="160" height="30" stroke="var(--color-text-main)" fill="var(--color-bg)" />
          <text x="110" y="24" textAnchor="middle" fill="var(--color-text-main)" fontSize="13">Pulsar instance</text>
          <rect x="410" y="4" width="160" height="30" fill="var(--color-accent)" />
          <text x="490" y="24" textAnchor="middle" fill="var(--color-accent-contrast)" fontSize="13" fontWeight="600">Nebula</text>
          <line x1="110" y1="34" x2="110" y2="395" stroke="var(--color-border)" strokeDasharray="3 5" />
          <line x1="490" y1="34" x2="490" y2="395" stroke="var(--color-border)" strokeDasharray="3 5" />

          <Arrow x1={110} x2={490} y={80} active={s === 0} label="register(id, capacity)" />
          <g>
            <rect x="380" y="123" width="220" height="40" fill="var(--color-bg)" stroke={s === 1 ? "var(--color-accent)" : "var(--color-border)"} />
            <text x="490" y="148" textAnchor="middle" fill={s === 1 ? "var(--color-text-main)" : "var(--color-text-dim)"} fontSize="12">assign queues from topology</text>
          </g>
          <Arrow x1={490} x2={110} y={215} active={s === 2} label="assignment + config" />
          <Arrow x1={110} x2={490} y={280} active={s === 3} label="heartbeat · renew lease" />
          <text x="150" y="304" fill={s === 3 ? "var(--color-accent)" : "var(--color-border-subtle)"} fontSize="12">↻ repeats while running</text>
          <Arrow x1={110} x2={490} y={345} active={s === 4} label="release (graceful exit)" />
          <text x="300" y="380" textAnchor="middle" fill="var(--color-text-dim)" fontSize="11">or: heartbeat stops → lease expires → queues released</text>
        </svg>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel className="flex-1">
          {LSTEPS.map(([t, d], i) => (
            <button
              key={t}
              onClick={() => { setPlay(false); setS(i); }}
              aria-current={s === i}
              className={"flex w-full gap-4 border-b border-[var(--color-border-dark)] px-5 py-4 text-left transition-colors last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] " + (s === i ? "bg-[var(--color-surface-active)]" : "")}
            >
              <span className={"pl-mono pt-0.5 text-xs " + (s === i ? "text-[var(--color-accent)]" : "text-[var(--color-text-subtle)]")}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={"block font-medium " + (s === i ? "text-[var(--color-text-main)]" : "text-[var(--color-text-dim)]")}>{t}</span>
                {s === i && <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-muted)]">{d}</span>}
              </span>
            </button>
          ))}
        </Panel>
        <Panel className="flex items-center justify-between gap-4 p-5">
          <div className="pl-mono text-xs">
            <div className="text-[var(--color-text-dim)]">instance <span className="text-[var(--color-text-main)]">{states[s]}</span></div>
            <div className="mt-1 text-[var(--color-text-dim)]">lease <span className={lease === "held" ? "text-[var(--color-accent)]" : "text-[var(--color-text-main)]"}>{lease}</span></div>
          </div>
          <button onClick={() => setPlay(!play)} className="pl-mono border border-[var(--color-border-subtle)] px-3 py-2 text-xs hover:border-[var(--color-text-main)]">{play ? "pause" : "play"}</button>
        </Panel>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  04 FAILOVER                                                       */
/* ================================================================== */
const FINST = [
  { id: "pl-edge-01", rt: "Cloudflare Worker" },
  { id: "pl-fn-02", rt: "Serverless function" },
  { id: "pl-ctr-01", rt: "Persistent container" },
];
const FQ = ["scrape", "embed", "scan", "transcribe", "summarize", "cleanup"];
const TTL = 5;
const BEATS = 28;

type Sim = { beats: Record<string, boolean[]>; down: string[]; owners: Record<string, string>; log: string[]; released: string[] };

const initSim = (): Sim => ({
  beats: Object.fromEntries(FINST.map((i) => [i.id, Array(BEATS).fill(true)])),
  down: [],
  owners: Object.fromEntries(FQ.map((q, i) => [q, FINST[Math.floor(i / 2)].id])),
  log: ["cluster healthy · 3 instances · 6 queues leased"],
  released: [],
});

const missedOf = (b: boolean[]) => {
  let n = 0;
  for (let i = b.length - 1; i >= 0 && !b[i]; i--) n++;
  return n;
};

function stepSim(s: Sim): Sim {
  const beats: Record<string, boolean[]> = {};
  FINST.forEach((i) => { beats[i.id] = [...s.beats[i.id].slice(1), !s.down.includes(i.id)]; });
  const owners = { ...s.owners };
  const log = [...s.log];
  const released = [...s.released];
  FINST.forEach((i) => {
    if (missedOf(beats[i.id]) === TTL && !released.includes(i.id)) {
      released.push(i.id);
      const alive = FINST.filter((x) => !s.down.includes(x.id)).map((x) => x.id);
      const mine = FQ.filter((q) => owners[q] === i.id);
      if (!alive.length) {
        log.push(`${i.id} lease expired · no healthy instance left`);
        mine.forEach((q) => { owners[q] = "unowned"; });
      } else {
        log.push(`${i.id} lease expired · released ${mine.join(", ") || "nothing"}`);
        mine.forEach((q) => {
          const load = (id: string) => FQ.filter((x) => owners[x] === id).length;
          const t = [...alive].sort((a, b) => load(a) - load(b))[0];
          owners[q] = t;
          log.push(`${q} → ${t}`);
        });
      }
    }
  });
  return { ...s, beats, owners, log: log.slice(-8), released };
}

function Failover() {
  const [sim, setSim] = useState<Sim>(initSim);
  useEffect(() => {
    const id = setInterval(() => setSim((s) => stepSim(s)), 700);
    return () => clearInterval(id);
  }, []);

  const kill = (id: string) =>
    setSim((s) => (s.down.includes(id) ? s : { ...s, down: [...s.down, id], log: [...s.log, `${id} stopped heartbeating`].slice(-8) }));
  const revive = (id: string) =>
    setSim((s) => ({
      ...s,
      down: s.down.filter((x) => x !== id),
      released: s.released.filter((x) => x !== id),
      log: [...s.log, `${id} re-registered · standby until assigned`].slice(-8),
    }));

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-3">
        {FINST.map((n) => {
          const b = sim.beats[n.id];
          const m = missedOf(b);
          const down = sim.down.includes(n.id);
          const expired = m >= TTL;
          const remaining = down ? Math.max(TTL - m, 0) : TTL;
          const owned = FQ.filter((q) => sim.owners[q] === n.id);
          return (
            <Panel key={n.id} className={"p-5 transition-colors " + (down ? "border-[var(--color-accent)]" : "")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="pl-mono text-sm">{n.id}</div>
                  <div className="text-xs text-[var(--color-text-dim)]">{n.rt}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={"pl-mono border px-3 py-1 text-[11px] " + (!down ? "border-[var(--color-border-subtle)] text-[var(--color-text-muted)]" : expired ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "border-[var(--color-accent)] text-[var(--color-accent)]")}>
                    {!down ? "healthy" : expired ? "lease expired" : `silent · ${remaining} left`}
                  </span>
                  {down ? (
                    <button onClick={() => revive(n.id)} className="border border-[var(--color-border-subtle)] px-3 py-1.5 text-xs hover:border-[var(--color-text-main)]">Revive</button>
                  ) : (
                    <button onClick={() => kill(n.id)} className="bg-[var(--color-text-main)] px-3 py-1.5 text-xs font-medium text-[var(--color-bg)] hover:bg-white">Kill</button>
                  )}
                </div>
              </div>

              <div className="mt-4 flex h-8 items-end gap-[2px]" aria-hidden>
                {b.map((ok, i) => (
                  <div key={i} className="flex-1" style={{ height: ok ? "100%" : "14%", background: ok ? (i === b.length - 1 ? "var(--color-accent)" : "var(--color-bar-muted)") : "var(--color-border-dark)" }} />
                ))}
              </div>
              <div className="pl-mono mt-2 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
                <span>heartbeat history</span>
                <span className="flex items-center gap-1.5">
                  lease
                  {Array.from({ length: TTL }, (_, i) => (
                    <i key={i} className="inline-block h-2 w-4" style={{ background: i < remaining ? "var(--color-text-main)" : "var(--color-surface-active)" }} />
                  ))}
                </span>
              </div>

              <div className="mt-4 flex min-h-[26px] flex-wrap gap-1.5">
                {owned.length ? owned.map((q) => <span key={q} className="pl-mono bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent-contrast)]">{q}</span>) : <span className="pl-mono text-[11px] text-[var(--color-text-subtle)]">no queues</span>}
              </div>
            </Panel>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <Panel className="flex-1">
          <div className="pl-mono flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5 text-xs text-[var(--color-text-dim)]"><i className="pl-beat h-2 w-2 rounded-full bg-[var(--color-accent)]" />nebula log</div>
          <div className="pl-mono space-y-1.5 p-4 text-[12px] leading-5" aria-live="polite">
            {sim.log.map((l, i) => (
              <div key={i + l} className={l.includes("expired") || l.includes("→") ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}><span className="mr-2 text-[var(--color-text-subtle)]">›</span>{l}</div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            Kill an instance. Its heartbeat stops, the lease runs down for {TTL} beats, then Nebula releases its queues to the healthy peers. No one redeploys anything.
          </p>
          <button onClick={() => setSim(initSim())} className="pl-mono mt-4 border border-[var(--color-border-subtle)] px-3 py-2 text-xs hover:border-[var(--color-text-main)]">reset simulation</button>
        </Panel>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  05 LIVE CONFIG                                                     */
/* ================================================================== */
const CINST = [
  { id: "pl-edge-01", cap: 40, rt: "Cloudflare Worker" },
  { id: "pl-fn-02", cap: 60, rt: "Serverless function" },
  { id: "pl-ctr-01", cap: 120, rt: "Persistent container" },
];
const CQ = ["scrape", "embed", "scan", "transcribe", "summarize", "cleanup"];
type Cfg = { conc: number; profile: number; queues: string[] };

function LiveConfig() {
  const [sel, setSel] = useState(0);
  const [ver, setVer] = useState(1);
  const [cfg, setCfg] = useState<Record<string, Cfg>>({
    "pl-edge-01": { conc: 30, profile: 2, queues: ["scrape", "embed"] },
    "pl-fn-02": { conc: 50, profile: 2, queues: ["scan", "transcribe"] },
    "pl-ctr-01": { conc: 80, profile: 1, queues: ["summarize", "cleanup"] },
  });
  const inst = CINST[sel];
  const c = cfg[inst.id];
  const eff = Math.min(c.conc, inst.cap);

  const upd = (patch: Partial<Cfg>) => {
    setCfg((p) => ({ ...p, [inst.id]: { ...p[inst.id], ...patch } }));
    setVer((v) => v + 1);
  };
  const toggle = (q: string) => {
    setCfg((p) => {
      const has = p[inst.id].queues.includes(q);
      const next: Record<string, Cfg> = {};
      Object.keys(p).forEach((k) => {
        next[k] = { ...p[k], queues: k === inst.id ? (has ? p[k].queues.filter((x) => x !== q) : [...p[k].queues, q]) : p[k].queues.filter((x) => x !== q) };
      });
      return next;
    });
    setVer((v) => v + 1);
  };
  const ownerOf = (q: string) => CINST.find((i) => cfg[i.id].queues.includes(q))?.id;

  const lines: [string, boolean?][] = [
    [`// received from Nebula · v${ver}`],
    ["{"],
    [`  instanceId: "${inst.id}",`],
    [`  queues: [${c.queues.map((q) => `"${q}"`).join(", ")}],`, true],
    [`  profile: "${PROFILES[c.profile]}",`, true],
    [`  concurrency: ${eff},${c.conc > inst.cap ? `  // clamped to capacity ${inst.cap}` : ""}`, true],
    ["}"],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <Panel className="p-5 md:p-7">
        <Label hot>nebula · edit</Label>
        <div className="mt-4"><Seg options={CINST.map((i) => i.id)} value={sel} onChange={setSel} label="Instance" /></div>
        <div className="mt-1 text-xs text-[var(--color-text-dim)]">{inst.rt} · capacity {inst.cap}</div>

        <div className="mt-7 space-y-6">
          <label className="block">
            <div className="pl-mono mb-2 flex justify-between text-xs text-[var(--color-text-muted)]"><span>concurrency</span><span className="text-[var(--color-text-main)]">{c.conc}</span></div>
            <input type="range" min={1} max={150} value={c.conc} onChange={(e) => upd({ conc: +e.target.value })} className="w-full accent-[var(--color-accent)]" />
            <div className="mt-2 h-1.5 bg-[var(--color-surface-alt)]" aria-hidden>
              <div className="relative h-full">
                <div className="absolute h-full bg-[var(--color-accent)]" style={{ width: `${(eff / 150) * 100}%` }} />
                <div className="absolute -top-1 h-3.5 w-px bg-[var(--color-text-main)]" style={{ left: `${(inst.cap / 150) * 100}%` }} />
              </div>
            </div>
            <div className="pl-mono mt-2 text-[11px] text-[var(--color-text-dim)]">white mark = instance capacity</div>
          </label>

          <label className="block">
            <div className="pl-mono mb-2 flex justify-between text-xs text-[var(--color-text-muted)]"><span>polling profile</span><span className="text-[var(--color-text-main)]">{PROFILES[c.profile]}</span></div>
            <input type="range" min={0} max={4} value={c.profile} onChange={(e) => upd({ profile: +e.target.value })} className="w-full accent-[var(--color-accent)]" />
          </label>

          <div>
            <div className="pl-mono mb-3 text-xs text-[var(--color-text-muted)]">queues owned by {inst.id}</div>
            <div className="flex flex-wrap gap-2">
              {CQ.map((q) => {
                const mine = c.queues.includes(q);
                const o = ownerOf(q);
                return (
                  <button
                    key={q}
                    onClick={() => toggle(q)}
                    aria-pressed={mine}
                    className={"pl-mono border px-3 py-1.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] " + (mine ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]")}
                  >
                    {q}{!mine && o ? ` · ${o.slice(3)}` : ""}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-[var(--color-text-dim)]">Claiming a queue takes it from its current owner. One owner at a time.</p>
          </div>
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-1" aria-hidden>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
          <span key={ver} className="pl-mono nb-flash border border-[var(--color-accent)] px-3 py-1 text-[11px] text-[var(--color-accent)]">pushed live · v{ver}</span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <CodeLines title={`${inst.id} · effective config`} lines={lines} />
        <CodeLines
          title="without Nebula · baked in at deploy"
          lines={[
            ["new Pulsar({"],
            ['  queues: ["scrape", "embed"],'],
            ['  concurrency: 30,'],
            ["});"],
            ["// change a value → edit → redeploy"],
          ]}
        />
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          Pulsar&apos;s own rules still apply. Nebula supplies the settings, but the engine enforces its limits, and the assignment can never exceed what the instance said it could handle.
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  06 SHARED STATE                                                    */
/* ================================================================== */
function SharedState() {
  const [b, setB] = useState(0);
  const store = b === 0 ? "Redis" : "PostgreSQL";
  const inst = [
    { x: 110, rt: "Cloudflare Worker", id: "pl-edge-01" },
    { x: 350, rt: "Serverless function", id: "pl-fn-02" },
    { x: 590, rt: "Persistent container", id: "pl-ctr-01" },
  ];
  const kinds: [string, string[]][] = [
    ["instances", ["pl-edge-01 · capacity 40", "pl-fn-02 · capacity 60"]],
    ["health", ["pl-edge-01 · heartbeat ok", "pl-fn-02 · heartbeat ok"]],
    ["assignments", ["scrape → pl-edge-01", "scan → pl-fn-02"]],
    ["leases", ["scrape · owner pl-edge-01", "scan · owner pl-fn-02"]],
  ];

  return (
    <div>
      <Seg options={["Redis", "PostgreSQL"]} value={b} onChange={setB} label="Storage backend" />
      <Panel className="mt-4 p-4 md:p-6">
        <svg viewBox="0 0 700 400" className="w-full" role="img" aria-label={`Nebula and three Pulsar instances coordinating through a shared ${store} backend, with no direct links between instances`}>
          <rect x="250" y="10" width="200" height="50" fill="var(--color-accent)" />
          <text x="350" y="40" textAnchor="middle" fill="var(--color-accent-contrast)" fontSize="16" fontWeight="600">Nebula</text>

          <path d="M350 60 V140" stroke="var(--color-border)" strokeWidth="2" />
          <path d="M350 60 V140" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />

          <rect x="190" y="140" width="320" height="92" fill="var(--color-surface)" stroke="var(--color-accent)" />
          <text x="350" y="178" textAnchor="middle" fill="var(--color-text-main)" fontSize="18" fontWeight="600">{store}</text>
          <text x="350" y="202" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12">shared cluster state</text>
          <text x="350" y="220" textAnchor="middle" fill="var(--color-text-dim)" fontSize="10">instances · health · assignments · leases</text>

          {inst.map((n, i) => {
            const sx = 260 + i * 90;
            const d = `M${sx} 232 C ${sx} 275, ${n.x} 270, ${n.x} 312`;
            return (
              <g key={n.id}>
                <path d={d} fill="none" stroke="var(--color-border)" strokeWidth="2" />
                <path d={d} fill="none" stroke="var(--color-text-main)" strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
                <rect x={n.x - 95} y="312" width="190" height="70" fill="var(--color-bg)" stroke="var(--color-text-main)" />
                <text x={n.x} y="341" textAnchor="middle" fill="var(--color-text-main)" fontSize="15" fontWeight="600">Pulsar</text>
                <text x={n.x} y="360" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">{n.rt}</text>
              </g>
            );
          })}
          <text x="230" y="350" textAnchor="middle" fill="var(--color-text-dim)" fontSize="14">✕</text>
          <text x="470" y="350" textAnchor="middle" fill="var(--color-text-dim)" fontSize="14">✕</text>
          <text x="350" y="397" textAnchor="middle" fill="var(--color-text-dim)" fontSize="11">instances never talk to each other directly</text>
        </svg>
      </Panel>

      <div className="mt-4 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
        {kinds.map(([k, rows]) => (
          <div key={k} className="bg-[var(--color-surface)] p-5">
            <Label hot>{k}</Label>
            <div className="pl-mono mt-3 space-y-2 text-[12px] text-[var(--color-text-muted)]">
              {rows.map((r) => <div key={r}>{r}</div>)}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {b === 0
          ? "Redis holds the cluster state as a separate store. Independently deployed instances only ever need to reach it, never each other."
          : "PostgreSQL holds the cluster state in the database you already run for PGMQ. No additional service to deploy."}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  07 SDK                                                             */
/* ================================================================== */
function Sdk() {
  const [m, setM] = useState(1);
  const standalone: [string, boolean?][] = [
    ["const pulsar = new Pulsar({"],
    ['  engine: { runtime: "edge-isolate", cycleTickLimit: 10 },'],
    ['  queues: [{ name: "scrape", concurrency: 10 }],'],
    ["});"],
    [""],
    ["await pulsar.start();"],
  ];
  const managed: [string, boolean?][] = [
    ["const pulsar = new Pulsar({"],
    ['  engine: { runtime: "edge-isolate", cycleTickLimit: 10 },'],
    ["  nebula: {", true],
    ['    instanceId: "pl-edge-01",', true],
    ['    cluster: "ingest",', true],
    ["    capacity: 40,", true],
    ["    storage: redis, // or PostgreSQL", true],
    ["  },", true],
    ["  // queues arrive from Nebula", true],
    ["});"],
    [""],
    ["await pulsar.start(); // registers, receives assignment", true],
    ["// ... on graceful exit", true],
    ["await pulsar.stop();  // releases its queues", true],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <Seg options={["Standalone", "With Nebula"]} value={m} onChange={setM} label="SDK mode" />
        <div className="mt-4">
          <CodeLines title={m === 0 ? "standalone.ts" : "with-nebula.ts"} lines={m === 0 ? standalone : managed} />
        </div>
        <p className="mt-4 text-xs text-[var(--color-text-dim)]">API shape is illustrative.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Panel>
          {[
            ["on startup", "Register with an instance ID and capacity, then obtain queue assignments."],
            ["while running", "Keep the lease alive and report operational status."],
            ["on graceful exit", "Tell Nebula so the assignments are released immediately."],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-4 border-b border-[var(--color-border-dark)] px-5 py-4 last:border-0">
              <span className="pl-mono pt-0.5 text-xs text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="font-medium">{t}</div>
                <div className="mt-1 text-sm text-[var(--color-text-muted)]">{d}</div>
              </div>
            </div>
          ))}
        </Panel>
        <div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] py-3 pl-5 pr-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Nebula is an optional module. Remove the <span className="pl-mono text-[var(--color-text-main)]">nebula</span> key and the same Pulsar runs standalone again.
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  08 ROLES                                                           */
/* ================================================================== */
function Roles() {
  const cols: { t: string; sub: string; hot: boolean; does: string[]; not: string[] }[] = [
    {
      t: "Nebula",
      sub: "Decides where work runs",
      hot: true,
      does: ["Tracks every instance and its health", "Assigns queues across the cluster", "Holds the lease on each queue", "Pushes configuration in real time", "Gives one view of the whole cluster"],
      not: ["Execute jobs", "Process messages", "Poll PGMQ"],
    },
    {
      t: "Pulsar",
      sub: "Decides how work runs",
      hot: false,
      does: ["Polls and pulls from PGMQ", "Runs the tick loop and scheduling", "Dispatches to consumers", "Enforces concurrency and limits", "Runs alone or as a Nebula node"],
      not: ["Choose cluster-wide ownership when managed"],
    },
  ];
  const next = ["Dynamic queue balancing", "Automatic workload redistribution", "Global maintenance controls", "Graceful deployment upgrades", "Scaling on queue backlog"];

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {cols.map((c) => (
          <div key={c.t} className={"border p-6 md:p-8 " + (c.hot ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "border-[var(--color-border)] bg-[var(--color-surface)]")}>
            <div className={"pl-mono text-[11px] uppercase tracking-[0.14em] " + (c.hot ? "opacity-80" : "text-[var(--color-text-dim)]")}>{c.hot ? "control plane" : "node"}</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight">{c.t}</div>
            <div className={"mt-1 " + (c.hot ? "opacity-80" : "text-[var(--color-text-muted)]")}>{c.sub}</div>
            <ul className="mt-6 space-y-2.5">
              {c.does.map((d) => (
                <li key={d} className="flex gap-3 text-sm font-medium"><span className="pl-mono">+</span>{d}</li>
              ))}
            </ul>
            <ul className={"mt-5 space-y-2 border-t pt-5 " + (c.hot ? "border-[var(--color-accent-contrast)]/20" : "border-[var(--color-border)]")}>
              {c.not.map((d) => (
                <li key={d} className={"flex gap-3 text-sm line-through " + (c.hot ? "opacity-60" : "text-[var(--color-text-dim)]")}><span className="pl-mono no-underline">−</span>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Label>the foundation for</Label>
        <div className="mt-4 flex flex-wrap gap-2">
          {next.map((x) => <span key={x} className="border border-dashed border-[var(--color-border-subtle)] px-4 py-2 text-sm text-[var(--color-code-text)]">{x}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <h2 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-8xl">Run many Pulsars like one.</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn href={LINKS.quickstart} solid>Get started</Btn>
          <Btn href={LINKS.github}>Star on GitHub</Btn>
          <Btn href={LINKS.pulsar}>Back to Pulsar</Btn>
        </div>
        <div className="mt-24 flex items-end justify-between gap-6 overflow-hidden" aria-hidden>
          <span className="select-none text-[24vw] font-semibold leading-[0.8] tracking-tighter text-transparent md:text-[17vw]" style={{ WebkitTextStroke: "1px var(--color-border-subtle)" }}>Nebula</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-dim)]">
          <span className="flex items-center gap-2 font-semibold text-[var(--color-text-main)]"><Mark size={16} /> Nebula</span>
          <div className="flex gap-6">
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.github}>GitHub</a>
            <a className="hover:text-[var(--color-text-main)]" href={LINKS.pulsar}>Pulsar</a>
          </div>
          <span>© {new Date().getFullYear()} Nebula. Open source.</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE ROOT                                                          */
/* ================================================================== */
export default function NebulaPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          /* --- PULSAR & NEBULA UNIFIED THEME --- */
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
        .pl-beat { animation: pl-beat 1.1s ease-in-out infinite; }
        @keyframes pl-flow { to { stroke-dashoffset: -28; } }
        .pl-flow { animation: pl-flow 1s linear infinite; }
        @keyframes nb-rot { to { transform: rotate(360deg); } }
        .nb-spin { transform-box: view-box; transform-origin: 200px 200px; animation: nb-rot linear infinite; }
        @keyframes nb-flash { 0% { background-color: var(--color-accent); color: var(--color-accent-contrast); } 100% { background-color: transparent; } }
        .nb-flash { animation: nb-flash .7s ease-out 1; }
        @media (prefers-reduced-motion: reduce) { .pl-beat, .pl-flow, .nb-spin, .nb-flash { animation: none; } html { scroll-behavior: auto; } }
      `}</style>

      <Header />

      <main>
        <Hero />

        <Stage id="overview" n="01" title="Pulsar runs alone. Nebula runs many." lead="Nebula is not a new Pulsar. It is the layer that coordinates Pulsars once one deployment becomes five. Flip between the two worlds and see what actually changes.">
          <Overview />
        </Stage>

        <Stage id="topology" n="02" title="Clusters of Pulsars, one control plane." lead="Instances join a cluster, a partition with its own allowed queues. Nebula can hold many clusters and spreads each cluster's queues across whoever has joined.">
          <Topology />
        </Stage>

        <Stage id="lifecycle" n="03" title="Five steps from boot to release." lead="Every managed instance follows the same conversation with Nebula: register, get assigned, get configured, stay alive, let go.">
          <Lifecycle />
        </Stage>

        <Stage id="failover" n="04" title="When an instance dies, its queues don't." lead="Queue ownership is a lease. Stop heartbeating and the lease runs out, so Nebula hands the work to a healthy instance. Break something below.">
          <Failover />
        </Stage>

        <Stage id="config" n="05" title="Config you change, not redeploy." lead="Without Nebula, settings are written into each deployment. With it, Nebula pushes them to the running instance in real time, within what the instance can handle.">
          <LiveConfig />
        </Stage>

        <Stage id="state" n="06" title="Coordination through shared state." lead="Instances on different runtimes never connect to each other. They only reach one shared store, Redis or PostgreSQL, where Nebula keeps the cluster's topology, health and leases.">
          <SharedState />
        </Stage>

        <Stage id="sdk" n="07" title="An optional module, not a rewrite." lead="Enable Nebula when initializing the engine. Provide an instance identifier and cluster configuration, and the engine does the rest through its lifecycle.">
          <Sdk />
        </Stage>

        <Stage id="roles" n="08" title="Nebula decides where. Pulsar decides how." lead="Workload coordination and workload execution are deliberately separate. That is why Pulsar stays whole, whether it joins a cluster or not.">
          <Roles />
        </Stage>
      </main>

      <Footer />
    </div>
  );
}