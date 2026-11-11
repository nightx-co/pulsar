"use client";

import { useEffect, useState } from "react";

/* ================================================================== */
/*  DATA  (instance names, queue names, API shape = placeholders)      */
/* ================================================================== */
const INSTALL = "npm install pulsar-nebula";
const LINKS = { quickstart: "#", github: "#", docs: "#", pulsar: "/" };
const ACC = "#135DF6";

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
      <circle cx="12" cy="12" r="9" stroke={ACC} strokeWidth="1.6" strokeDasharray="2 3" />
      <circle cx="12" cy="12" r="3.2" fill={ACC} />
      <circle cx="20" cy="9" r="1.8" fill="#f2f2f2" />
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

function CodeLines({ title, lines }: { title: string; lines: [string, boolean?][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-black">
      <div className="pl-mono flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-2.5 text-xs text-[#5a5a5a]">
        <i className="h-2 w-2 rounded-full bg-[#ff5b2e]" />
        {title}
      </div>
      <pre className="pl-mono overflow-x-auto py-4 text-[13px] leading-6 text-[#d4d4d4]">
        {lines.map(([t, hot], i) => (
          <div key={i} className={"whitespace-pre px-5 " + (hot ? "border-l-2 border-[#ff5b2e] bg-[#1a0e0a] pl-[18px] text-[#f2f2f2]" : "")}>{t || " "}</div>
        ))}
      </pre>
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#1f1f1f] bg-black/90 backdrop-blur">
      <div className="flex h-14 items-stretch">
        <a href="#top" className="flex items-center gap-2 border-r border-[#1f1f1f] px-5 font-semibold">
          <Mark /> Nebula
        </a>
        <nav className="hidden flex-1 xl:flex" aria-label="Sections">
          {NAV.map(([id, label], i) => (
            <a
              key={id}
              href={"#" + id}
              className={"relative flex flex-1 items-end gap-2 px-3 pb-2.5 pl-mono text-[11px] transition-colors " + (i === active ? "text-[#f2f2f2]" : "text-[#5a5a5a] hover:text-[#f2f2f2]")}
            >
              <span className="absolute inset-x-1 top-0 h-[3px] rounded-b" style={{ background: i === active ? ACC : i < active ? "#555" : "#1f1f1f" }} />
              <span className={i === active ? "text-[#ff5b2e]" : ""}>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5 border-l border-[#1f1f1f] px-5 text-sm">
          <a className="hidden text-[#8a8a8a] hover:text-[#f2f2f2] sm:block" href={LINKS.pulsar}>Pulsar ↗</a>
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
/*  HERO: orbit diagram                                                */
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

/* ---- NEW: Pulsar-in-Nebula reveal. Replaces the old Orbit() ---- */
const PULSAR_URL = "https://pulsar-engine.vercel.app/"; // the Pulsar homepage (see note 1)
const PULSAR_INTERACTIVE = true; // false = non-scrollable live preview
const REVEAL_MS = 900;
const EASE = "cubic-bezier(.65,0,.35,1)";

// placeholders, ordered inner ring -> outer ring
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
    setAnim(false); // move the (invisible) circle to the dot without animating
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
      <div className="flex h-[52px] items-center justify-between border-b border-[#1f1f1f] px-4">
        <span className="pl-mono flex items-center gap-2 text-xs text-[#5a5a5a]">
          <i className="pl-beat h-2 w-2 rounded-full bg-[#ff5b2e]" />
          {open ? `${n.cl} · ${n.id}` : "cluster view · 9 instances"}
        </span>
        {!open && <span className="pl-mono rounded-full border border-[#333] px-3 py-1 text-[11px] text-[#8a8a8a]">click a dot</span>}
      </div>

      <div ref={setStage} className="relative overflow-hidden bg-black" style={{ height: size.h }}>
        {/* layer 1: the cluster. Zooms toward the dot you opened. */}
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
              <circle key={rr} cx="200" cy="200" r={rr} fill="none" stroke="#262626" strokeDasharray="2 6" />
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
                      <line x1="200" y1="200" x2={x} y2={y} stroke={on ? ACC : "#1c1c1c"} />
                      <circle cx={x} cy={y} r={on ? 12 : 9} fill="#000" stroke={on ? ACC : "#f2f2f2"} strokeWidth="1.5" />
                      <circle cx={x} cy={y} r={on ? 4.5 : 3} fill={on ? ACC : "#f2f2f2"} />
                      <circle
                        cx={x}
                        cy={y}
                        r="17"
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="2"
                        className="cursor-pointer outline-none focus-visible:stroke-[#ff5b2e]"
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
            <circle cx="200" cy="200" r="38" fill={ACC} />
            <text x="200" y="205" textAnchor="middle" fill="#000" fontSize="14" fontWeight="600">Nebula</text>
          </svg>
        </div>

        {/* the dot swelling: leading edge of the circle */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full border-2 border-[#ff5b2e]"
          style={{
            left: origin.x - r,
            top: origin.y - r,
            width: r * 2,
            height: r * 2,
            opacity: busy ? 1 : 0,
            transition: `left ${t}, top ${t}, width ${t}, height ${t}, opacity 200ms`,
          }}
        />

        {/* layer 2: that Pulsar instance, revealed from the dot */}
        <div
          aria-hidden={!open}
          className="absolute inset-0 flex flex-col bg-black"
          style={{
            clipPath: `circle(${r}px at ${origin.x}px ${origin.y}px)`,
            transition: `clip-path ${t}`,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[#1f1f1f] px-3">
            <button
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="pl-mono rounded border border-[#333] px-3 py-1.5 text-xs hover:border-[#f2f2f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e]"
            >
              ← cluster
            </button>
            <span className="pl-mono truncate text-xs">
              <span className="text-[#ff5b2e]">{n.id}</span>
              <span className="text-[#5a5a5a]"> · {n.rt}</span>
            </span>
            <span className="pl-mono hidden items-center gap-1.5 text-[11px] text-[#5a5a5a] sm:flex">
              <i className="h-1.5 w-1.5 rounded-full bg-[#ff5b2e]" />lease held
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <iframe
              title={`Pulsar instance ${n.id}`}
              src={PULSAR_URL}
              loading="lazy"
              tabIndex={open ? 0 : -1}
              className="absolute left-0 top-0 border-0 bg-black"
              style={{
                width: 1280,
                height: (size.h - 92) / scale,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: PULSAR_INTERACTIVE ? "auto" : "none",
              }}
            />
          </div>

          <div className="pl-mono flex h-12 shrink-0 items-center gap-x-4 overflow-hidden border-t border-[#1f1f1f] px-3 text-[11px] text-[#5a5a5a]">
            <span className="flex gap-1.5">
              {n.q.map((q) => (
                <span key={q} className="rounded bg-[#ff5b2e] px-2 py-0.5 font-medium text-black">{q}</span>
              ))}
            </span>
            <span>capacity {n.cap}</span>
            <span className="hidden sm:inline">cluster {n.cl}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1f1f1f] px-4 py-3 text-xs leading-relaxed text-[#8a8a8a]">
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
          <div className="pl-mono mb-8 flex flex-wrap items-center gap-2 text-xs text-[#8a8a8a]">
            <span className="rounded-full border border-[#ff5b2e] px-3 py-1 text-[#ff5b2e]">control plane</span>
            <span className="rounded-full border border-[#333] px-3 py-1">for Pulsar</span>
            <span className="rounded-full border border-[#333] px-3 py-1">optional</span>
          </div>
          <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl xl:text-[6.2rem]">
            One control plane for every <span className="text-[#ff5b2e]">Pulsar.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#8a8a8a] md:text-xl">
            Nebula coordinates many Pulsar instances across serverless functions, edge workers and persistent servers: who owns which queue, with which configuration, and what happens when one goes dark. It never touches a job.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Btn href="#topology" solid>Explore the architecture →</Btn>
            <CopyCmd />
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#5a5a5a]">
            Pulsar still runs perfectly well on its own. Nebula is what you add when managing deployments by hand stops scaling.
          </p>
        </div>
        <div className="lg:col-span-5"><Orbit /></div>
      </div>
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-3 divide-x divide-[#1f1f1f] border-y border-[#1f1f1f]">
        {[["N", "Pulsar instances, one cluster"], ["1", "owner per queue, by lease"], ["0", "jobs executed by Nebula"]].map(([a, b]) => (
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
/*  01 OVERVIEW: standalone vs managed                                 */
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
              <rect x="30" y="125" width="170" height="70" rx="8" fill="#000" stroke="#333" strokeDasharray="4 4" />
              <text x="115" y="154" textAnchor="middle" fill="#f2f2f2" fontSize="14">config.ts</text>
              <text x="115" y="176" textAnchor="middle" fill="#5a5a5a" fontSize="11">baked in at deploy time</text>
              <path d="M200 160 H340" stroke="#444" strokeWidth="2" />
              <polygon points="340,160 330,155 330,165" fill="#444" />
              <rect x="340" y="100" width="230" height="120" rx="10" fill="#0a0a0a" stroke="#f2f2f2" />
              <text x="455" y="150" textAnchor="middle" fill="#f2f2f2" fontSize="22" fontWeight="600">Pulsar</text>
              <text x="455" y="176" textAnchor="middle" fill="#8a8a8a" fontSize="12">tick loop · poolers · workers</text>
            </g>
          ) : (
            <g>
              <rect x="80" y="14" width="440" height="58" rx="10" fill={ACC} />
              <text x="300" y="40" textAnchor="middle" fill="#000" fontSize="18" fontWeight="600">Nebula</text>
              <text x="300" y="58" textAnchor="middle" fill="rgba(0,0,0,.65)" fontSize="11">topology · leases · live config</text>
              {nodes.map((nd, i) => {
                const sx = 160 + i * 140;
                const d = `M${sx} 72 C ${sx} 140, ${nd.x} 130, ${nd.x} 200`;
                return (
                  <g key={nd.x}>
                    <path d={d} fill="none" stroke="#262626" strokeWidth="2" />
                    <path d={d} fill="none" stroke={ACC} strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
                    <rect x={nd.x - 85} y="200" width="170" height="96" rx="10" fill="#0a0a0a" stroke="#f2f2f2" />
                    <text x={nd.x} y="240" textAnchor="middle" fill="#f2f2f2" fontSize="18" fontWeight="600">Pulsar</text>
                    <text x={nd.x} y="262" textAnchor="middle" fill="#8a8a8a" fontSize="11">{nd.rt}</text>
                    <text x={nd.x} y="281" textAnchor="middle" fill={ACC} fontSize="10">same engine inside</text>
                  </g>
                );
              })}
              <text x="300" y="135" textAnchor="middle" fill="#5a5a5a" fontSize="11">live config + queue assignments</text>
            </g>
          )}
        </svg>
        <p className="mt-4 text-sm leading-relaxed text-[#8a8a8a]">
          {managed
            ? "Joining a cluster does not rewrite Pulsar. The engine keeps polling, scheduling and dispatching exactly as before. Nebula just supplies the configuration, in real time."
            : "A single Pulsar deployment with its settings written into the deploy. Simple, self-contained, and still fully supported."}
        </p>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[#1f1f1f] px-5 py-3 text-[11px]">
          <span className="pl-mono text-[#5a5a5a]">what</span>
          <span className={"pl-mono " + (!managed ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>standalone</span>
          <span className={"pl-mono " + (managed ? "text-[#ff5b2e]" : "text-[#5a5a5a]")}>with Nebula</span>
        </div>
        {rows.map(([k, a, b]) => (
          <div key={k} className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-b border-[#141414] px-5 py-4 text-sm last:border-0">
            <span className="text-[#8a8a8a]">{k}</span>
            <span className={!managed ? "text-[#f2f2f2]" : "text-[#444]"}>{a}</span>
            <span className={managed ? "text-[#f2f2f2]" : "text-[#444]"}>{b}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  02 TOPOLOGY: Nebula > clusters > instances                         */
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
      <div className="rounded-lg bg-[#ff5b2e] px-6 py-5 text-black">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="pl-mono text-[11px] text-black/60">CONTROL PLANE</div>
            <div className="text-2xl font-semibold">Nebula</div>
          </div>
          <div className="pl-mono text-xs text-black/70">{CLUSTERS.length} clusters · {CLUSTERS.reduce((a, c, i) => a + c.instances.length + extra[i], 0)} instances</div>
        </div>
      </div>

      <div className="mx-auto h-6 w-px bg-[#333]" aria-hidden />
      <div className="grid gap-3 md:grid-cols-3">
        {CLUSTERS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={"relative rounded-lg border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (sel === i ? "border-[#ff5b2e] bg-[#0f0f0f]" : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#333]")}
          >
            <span className="absolute -top-3 left-1/2 hidden h-3 w-px bg-[#333] md:block" aria-hidden />
            <div className="pl-mono text-[11px] text-[#5a5a5a]">CLUSTER · PARTITION</div>
            <div className="mt-1 text-xl font-medium">{c.id}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.queues.map((q) => <span key={q} className="pl-mono rounded border border-[#262626] px-2 py-0.5 text-[11px] text-[#8a8a8a]">{q}</span>)}
            </div>
            <div className="pl-mono mt-3 text-xs text-[#5a5a5a]">{c.instances.length + extra[i]} instance{c.instances.length + extra[i] > 1 ? "s" : ""}</div>
          </button>
        ))}
      </div>

      <Panel className="mt-4 p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Label hot>{cl.id} · allowed queues</Label>
            <p className="mt-2 max-w-xl text-sm text-[#8a8a8a]">The cluster defines which queues its instances may serve. Nebula spreads them across whoever has joined. Each queue has exactly one owner at a time.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setExtra((e) => e.map((v, i) => (i === sel ? Math.min(v + 1, 3) : v)))}
              className="rounded-md bg-[#ff5b2e] px-4 py-2 text-sm font-medium text-black hover:bg-[#ff7a52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b2e]"
            >
              + Join an instance
            </button>
            <button onClick={() => setExtra((e) => e.map((v, i) => (i === sel ? 0 : v)))} className="rounded-md border border-[#333] px-4 py-2 text-sm text-[#8a8a8a] hover:text-[#f2f2f2]">Reset</button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {inst.map((n, i) => (
            <div key={n.id} className="rounded-lg border border-[#262626] bg-black p-4">
              <div className="flex items-center justify-between">
                <span className="pl-mono text-xs text-[#f2f2f2]">{n.id}</span>
                <i className="h-2 w-2 rounded-full" style={{ background: assigned[i].length ? ACC : "#444" }} />
              </div>
              <div className="mt-1 text-xs text-[#5a5a5a]">{n.rt}</div>
              <div className="mt-4 h-1.5 rounded-full bg-[#1a1a1a]" aria-hidden>
                <div className="h-full rounded-full bg-[#f2f2f2]" style={{ width: `${Math.min(100, (n.cap / 120) * 100)}%` }} />
              </div>
              <div className="pl-mono mt-1 text-[11px] text-[#5a5a5a]">capacity {n.cap}</div>
              <div className="mt-4 flex min-h-[28px] flex-wrap gap-1.5">
                {assigned[i].length ? (
                  assigned[i].map((q) => <span key={q} className="pl-mono rounded bg-[#ff5b2e] px-2 py-0.5 text-[11px] font-medium text-black">{q}</span>)
                ) : (
                  <span className="pl-mono text-[11px] text-[#5a5a5a]">standby · no queue</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-[#5a5a5a]">Each instance is a normal Pulsar. It can sit on a different runtime from its neighbours.</p>
      </Panel>
    </div>
  );
}

/* ================================================================== */
/*  03 LIFECYCLE: sequence diagram                                     */
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
  const c = active ? ACC : "#3a3a3a";
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth="2" />
      <polygon points={`${x2},${y} ${x2 - dir * 9},${y - 5} ${x2 - dir * 9},${y + 5}`} fill={c} />
      <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle" fill={active ? "#f2f2f2" : "#5a5a5a"} fontSize="12">{label}</text>
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
          <rect x="30" y="4" width="160" height="30" rx="6" fill="#000" stroke="#f2f2f2" />
          <text x="110" y="24" textAnchor="middle" fill="#f2f2f2" fontSize="13">Pulsar instance</text>
          <rect x="410" y="4" width="160" height="30" rx="6" fill={ACC} />
          <text x="490" y="24" textAnchor="middle" fill="#000" fontSize="13" fontWeight="600">Nebula</text>
          <line x1="110" y1="34" x2="110" y2="395" stroke="#262626" strokeDasharray="3 5" />
          <line x1="490" y1="34" x2="490" y2="395" stroke="#262626" strokeDasharray="3 5" />

          <Arrow x1={110} x2={490} y={80} active={s === 0} label="register(id, capacity)" />
          <g>
            <rect x="380" y="123" width="220" height="40" rx="6" fill="#000" stroke={s === 1 ? ACC : "#333"} />
            <text x="490" y="148" textAnchor="middle" fill={s === 1 ? "#f2f2f2" : "#5a5a5a"} fontSize="12">assign queues from topology</text>
          </g>
          <Arrow x1={490} x2={110} y={215} active={s === 2} label="assignment + config" />
          <Arrow x1={110} x2={490} y={280} active={s === 3} label="heartbeat · renew lease" />
          <text x="150" y="304" fill={s === 3 ? ACC : "#333"} fontSize="12">↻ repeats while running</text>
          <Arrow x1={110} x2={490} y={345} active={s === 4} label="release (graceful exit)" />
          <text x="300" y="380" textAnchor="middle" fill="#5a5a5a" fontSize="11">or: heartbeat stops → lease expires → queues released</text>
        </svg>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel className="flex-1">
          {LSTEPS.map(([t, d], i) => (
            <button
              key={t}
              onClick={() => { setPlay(false); setS(i); }}
              aria-current={s === i}
              className={"flex w-full gap-4 border-b border-[#141414] px-5 py-4 text-left transition-colors last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (s === i ? "bg-[#141414]" : "")}
            >
              <span className={"pl-mono pt-0.5 text-xs " + (s === i ? "text-[#ff5b2e]" : "text-[#444]")}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={"block font-medium " + (s === i ? "text-[#f2f2f2]" : "text-[#5a5a5a]")}>{t}</span>
                {s === i && <span className="mt-1 block text-sm leading-relaxed text-[#8a8a8a]">{d}</span>}
              </span>
            </button>
          ))}
        </Panel>
        <Panel className="flex items-center justify-between gap-4 p-5">
          <div className="pl-mono text-xs">
            <div className="text-[#5a5a5a]">instance <span className="text-[#f2f2f2]">{states[s]}</span></div>
            <div className="mt-1 text-[#5a5a5a]">lease <span className={lease === "held" ? "text-[#ff5b2e]" : "text-[#f2f2f2]"}>{lease}</span></div>
          </div>
          <button onClick={() => setPlay(!play)} className="pl-mono rounded border border-[#333] px-3 py-2 text-xs hover:border-[#f2f2f2]">{play ? "pause" : "play"}</button>
        </Panel>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  04 FAILOVER: heartbeat + lease simulation                          */
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
            <Panel key={n.id} className={"p-5 transition-colors " + (down ? "border-[#4a2a20]" : "")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="pl-mono text-sm">{n.id}</div>
                  <div className="text-xs text-[#5a5a5a]">{n.rt}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={"pl-mono rounded-full border px-3 py-1 text-[11px] " + (!down ? "border-[#333] text-[#8a8a8a]" : expired ? "border-[#ff5b2e] bg-[#ff5b2e] text-black" : "border-[#ff5b2e] text-[#ff5b2e]")}>
                    {!down ? "healthy" : expired ? "lease expired" : `silent · ${remaining} left`}
                  </span>
                  {down ? (
                    <button onClick={() => revive(n.id)} className="rounded border border-[#333] px-3 py-1.5 text-xs hover:border-[#f2f2f2]">Revive</button>
                  ) : (
                    <button onClick={() => kill(n.id)} className="rounded bg-[#f2f2f2] px-3 py-1.5 text-xs font-medium text-black hover:bg-white">Kill</button>
                  )}
                </div>
              </div>

              <div className="mt-4 flex h-8 items-end gap-[2px]" aria-hidden>
                {b.map((ok, i) => (
                  <div key={i} className="flex-1" style={{ height: ok ? "100%" : "14%", background: ok ? (i === b.length - 1 ? ACC : "#555") : "#2a1510" }} />
                ))}
              </div>
              <div className="pl-mono mt-2 flex items-center justify-between text-[11px] text-[#5a5a5a]">
                <span>heartbeat history</span>
                <span className="flex items-center gap-1.5">
                  lease
                  {Array.from({ length: TTL }, (_, i) => (
                    <i key={i} className="inline-block h-2 w-4 rounded-sm" style={{ background: i < remaining ? "#f2f2f2" : "#1f1f1f" }} />
                  ))}
                </span>
              </div>

              <div className="mt-4 flex min-h-[26px] flex-wrap gap-1.5">
                {owned.length ? owned.map((q) => <span key={q} className="pl-mono rounded bg-[#ff5b2e] px-2 py-0.5 text-[11px] font-medium text-black">{q}</span>) : <span className="pl-mono text-[11px] text-[#444]">no queues</span>}
              </div>
            </Panel>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <Panel className="flex-1">
          <div className="pl-mono flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-2.5 text-xs text-[#5a5a5a]"><i className="pl-beat h-2 w-2 rounded-full bg-[#ff5b2e]" />nebula log</div>
          <div className="pl-mono space-y-1.5 p-4 text-[12px] leading-5" aria-live="polite">
            {sim.log.map((l, i) => (
              <div key={i + l} className={l.includes("expired") || l.includes("→") ? "text-[#ff5b2e]" : "text-[#8a8a8a]"}><span className="mr-2 text-[#333]">›</span>{l}</div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="text-sm leading-relaxed text-[#8a8a8a]">
            Kill an instance. Its heartbeat stops, the lease runs down for {TTL} beats, then Nebula releases its queues to the healthy peers. No one redeploys anything.
          </p>
          <button onClick={() => setSim(initSim())} className="pl-mono mt-4 rounded border border-[#333] px-3 py-2 text-xs hover:border-[#f2f2f2]">reset simulation</button>
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
        <div className="mt-1 text-xs text-[#5a5a5a]">{inst.rt} · capacity {inst.cap}</div>

        <div className="mt-7 space-y-6">
          <label className="block">
            <div className="pl-mono mb-2 flex justify-between text-xs text-[#8a8a8a]"><span>concurrency</span><span className="text-[#f2f2f2]">{c.conc}</span></div>
            <input type="range" min={1} max={150} value={c.conc} onChange={(e) => upd({ conc: +e.target.value })} className="w-full accent-[#ff5b2e]" />
            <div className="mt-2 h-1.5 rounded-full bg-[#1a1a1a]" aria-hidden>
              <div className="relative h-full">
                <div className="absolute h-full rounded-full bg-[#ff5b2e]" style={{ width: `${(eff / 150) * 100}%` }} />
                <div className="absolute -top-1 h-3.5 w-px bg-[#f2f2f2]" style={{ left: `${(inst.cap / 150) * 100}%` }} />
              </div>
            </div>
            <div className="pl-mono mt-2 text-[11px] text-[#5a5a5a]">white mark = instance capacity</div>
          </label>

          <label className="block">
            <div className="pl-mono mb-2 flex justify-between text-xs text-[#8a8a8a]"><span>polling profile</span><span className="text-[#f2f2f2]">{PROFILES[c.profile]}</span></div>
            <input type="range" min={0} max={4} value={c.profile} onChange={(e) => upd({ profile: +e.target.value })} className="w-full accent-[#ff5b2e]" />
          </label>

          <div>
            <div className="pl-mono mb-3 text-xs text-[#8a8a8a]">queues owned by {inst.id}</div>
            <div className="flex flex-wrap gap-2">
              {CQ.map((q) => {
                const mine = c.queues.includes(q);
                const o = ownerOf(q);
                return (
                  <button
                    key={q}
                    onClick={() => toggle(q)}
                    aria-pressed={mine}
                    className={"pl-mono rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff5b2e] " + (mine ? "border-[#ff5b2e] bg-[#ff5b2e] text-black" : "border-[#333] text-[#8a8a8a] hover:text-[#f2f2f2]")}
                  >
                    {q}{!mine && o ? ` · ${o.slice(3)}` : ""}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-[#5a5a5a]">Claiming a queue takes it from its current owner. One owner at a time.</p>
          </div>
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-1" aria-hidden>
          <span className="h-px flex-1 bg-[#1f1f1f]" />
          <span key={ver} className="pl-mono nb-flash rounded-full border border-[#ff5b2e] px-3 py-1 text-[11px] text-[#ff5b2e]">pushed live · v{ver}</span>
          <span className="h-px flex-1 bg-[#1f1f1f]" />
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
        <p className="text-sm leading-relaxed text-[#8a8a8a]">
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
          <rect x="250" y="10" width="200" height="50" rx="10" fill={ACC} />
          <text x="350" y="40" textAnchor="middle" fill="#000" fontSize="16" fontWeight="600">Nebula</text>

          <path d="M350 60 V140" stroke="#262626" strokeWidth="2" />
          <path d="M350 60 V140" stroke={ACC} strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />

          <rect x="190" y="140" width="320" height="92" rx="10" fill="#0a0a0a" stroke={ACC} />
          <text x="350" y="178" textAnchor="middle" fill="#f2f2f2" fontSize="18" fontWeight="600">{store}</text>
          <text x="350" y="202" textAnchor="middle" fill="#8a8a8a" fontSize="12">shared cluster state</text>
          <text x="350" y="220" textAnchor="middle" fill="#5a5a5a" fontSize="10">instances · health · assignments · leases</text>

          {inst.map((n, i) => {
            const sx = 260 + i * 90;
            const d = `M${sx} 232 C ${sx} 275, ${n.x} 270, ${n.x} 312`;
            return (
              <g key={n.id}>
                <path d={d} fill="none" stroke="#262626" strokeWidth="2" />
                <path d={d} fill="none" stroke="#f2f2f2" strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
                <rect x={n.x - 95} y="312" width="190" height="70" rx="10" fill="#000" stroke="#f2f2f2" />
                <text x={n.x} y="341" textAnchor="middle" fill="#f2f2f2" fontSize="15" fontWeight="600">Pulsar</text>
                <text x={n.x} y="360" textAnchor="middle" fill="#8a8a8a" fontSize="11">{n.rt}</text>
              </g>
            );
          })}
          <text x="230" y="350" textAnchor="middle" fill="#5a5a5a" fontSize="14">✕</text>
          <text x="470" y="350" textAnchor="middle" fill="#5a5a5a" fontSize="14">✕</text>
          <text x="350" y="397" textAnchor="middle" fill="#5a5a5a" fontSize="11">instances never talk to each other directly</text>
        </svg>
      </Panel>

      <div className="mt-4 grid gap-px overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-4">
        {kinds.map(([k, rows]) => (
          <div key={k} className="bg-[#0a0a0a] p-5">
            <Label hot>{k}</Label>
            <div className="pl-mono mt-3 space-y-2 text-[12px] text-[#8a8a8a]">
              {rows.map((r) => <div key={r}>{r}</div>)}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#8a8a8a]">
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
        <p className="mt-4 text-xs text-[#5a5a5a]">API shape is illustrative.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Panel>
          {[
            ["on startup", "Register with an instance ID and capacity, then obtain queue assignments."],
            ["while running", "Keep the lease alive and report operational status."],
            ["on graceful exit", "Tell Nebula so the assignments are released immediately."],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-4 border-b border-[#141414] px-5 py-4 last:border-0">
              <span className="pl-mono pt-0.5 text-xs text-[#ff5b2e]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="font-medium">{t}</div>
                <div className="mt-1 text-sm text-[#8a8a8a]">{d}</div>
              </div>
            </div>
          ))}
        </Panel>
        <div className="rounded-r-md border-l-2 border-[#ff5b2e] bg-[#0a0a0a] py-3 pl-5 pr-4 text-sm leading-relaxed text-[#8a8a8a]">
          Nebula is an optional module. Remove the <span className="pl-mono text-[#f2f2f2]">nebula</span> key and the same Pulsar runs standalone again.
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
          <div key={c.t} className={"rounded-lg border p-6 md:p-8 " + (c.hot ? "border-[#ff5b2e] bg-[#ff5b2e] text-black" : "border-[#1f1f1f] bg-[#0a0a0a]")}>
            <div className={"pl-mono text-[11px] uppercase tracking-[0.14em] " + (c.hot ? "text-black/60" : "text-[#5a5a5a]")}>{c.hot ? "control plane" : "node"}</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight">{c.t}</div>
            <div className={"mt-1 " + (c.hot ? "text-black/70" : "text-[#8a8a8a]")}>{c.sub}</div>
            <ul className="mt-6 space-y-2.5">
              {c.does.map((d) => (
                <li key={d} className="flex gap-3 text-sm font-medium"><span className="pl-mono">+</span>{d}</li>
              ))}
            </ul>
            <ul className={"mt-5 space-y-2 border-t pt-5 " + (c.hot ? "border-black/20" : "border-[#1f1f1f]")}>
              {c.not.map((d) => (
                <li key={d} className={"flex gap-3 text-sm line-through " + (c.hot ? "text-black/55" : "text-[#5a5a5a]")}><span className="pl-mono no-underline">−</span>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Label>the foundation for</Label>
        <div className="mt-4 flex flex-wrap gap-2">
          {next.map((x) => <span key={x} className="rounded-full border border-dashed border-[#333] px-4 py-2 text-sm text-[#d4d4d4]">{x}</span>)}
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
    <footer className="border-t border-[#1f1f1f]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <h2 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-8xl">Run many Pulsars like one.</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn href={LINKS.quickstart} solid>Get started</Btn>
          <Btn href={LINKS.github}>Star on GitHub</Btn>
          <Btn href={LINKS.pulsar}>Back to Pulsar</Btn>
        </div>
        <div className="mt-24 flex items-end justify-between gap-6 overflow-hidden" aria-hidden>
          <span className="select-none text-[24vw] font-semibold leading-[0.8] tracking-tighter text-transparent md:text-[17vw]" style={{ WebkitTextStroke: "1px #2a2a2a" }}>Nebula</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1f1f1f] pt-6 text-sm text-[#5a5a5a]">
          <span className="flex items-center gap-2 font-semibold text-[#f2f2f2]"><Mark size={16} /> Nebula</span>
          <div className="flex gap-6">
            <a className="hover:text-[#f2f2f2]" href={LINKS.docs}>Docs</a>
            <a className="hover:text-[#f2f2f2]" href={LINKS.github}>GitHub</a>
            <a className="hover:text-[#f2f2f2]" href={LINKS.pulsar}>Pulsar</a>
          </div>
          <span>© {new Date().getFullYear()} Nebula. Open source.</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function NebulaPage() {
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
        @keyframes nb-rot { to { transform: rotate(360deg); } }
        .nb-spin { transform-box: view-box; transform-origin: 200px 200px; animation: nb-rot linear infinite; }
        @keyframes nb-flash { 0% { background-color: ${ACC}; color: #000; } 100% { background-color: transparent; } }
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