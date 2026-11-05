"use client";

import { useState } from "react";

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
            "pl-mono px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
            (value === i ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]")
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  05 TUNING: funnel + shared-capacity model                          */
/* ================================================================== */
function Slider({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <label className="block">
      <div className="pl-mono mb-2 flex justify-between text-xs text-[var(--color-text-dim)]">
        <span>{label}</span>
        <span className="text-[var(--color-text-main)]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => set(+e.target.value)}
        className="w-full accent-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      />
      <div className="pl-mono mt-1 flex justify-between text-[10px] text-[var(--color-border-subtle)]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </label>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"border border-[var(--color-border)] bg-[var(--color-surface)] " + className}>{children}</div>;
}

function Label({ children, hot = false }: { children: React.ReactNode; hot?: boolean }) {
  return (
    <div className={"pl-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] " + (hot ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]")}>
      {hot && <span aria-hidden className="pl-beat inline-block h-1.5 w-1.5 bg-[var(--color-accent)]" />}
      {children}
    </div>
  );
}

function PanelHead({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-3 md:px-8">
      <Label hot>{label}</Label>
      <span className="pl-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-border-subtle)]">{tag}</span>
    </div>
  );
}

function Track({ children }: { children: React.ReactNode }) {
  return <div className="h-8 border border-[var(--color-border)] bg-[var(--color-surface-alt)]">{children}</div>;
}

export default function Calculator() {
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
      {/* 01 · per-tick batch */}
      <Panel className="overflow-hidden">
        <PanelHead label="01 · per-tick batch" tag="concurrency × n" />
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6 p-6 md:p-8">
            <Slider label="concurrency" value={c} set={setC} min={1} max={100} />
            <Slider label="n (jobs per worker)" value={n} set={setN} min={1} max={50} />
            <Slider label="maxJobsPerTick" value={cap} set={setCap} min={10} max={2000} />
          </div>
          <div className="flex flex-col justify-center gap-6 border-t border-[var(--color-border)] bg-[var(--color-code-bg)] p-6 md:p-8 lg:border-l lg:border-t-0">
            <div aria-hidden>
              <div className="pl-mono mb-1 flex justify-between text-xs text-[var(--color-text-dim)]"><span>requested</span><span>{req}</span></div>
              <Track>
                <div className="h-full bg-[var(--color-border-subtle)] transition-all" style={{ width: `${(req / mx) * 100}%` }} />
              </Track>
            </div>
            <div aria-hidden>
              <div className="pl-mono mb-1 flex justify-between text-xs text-[var(--color-text-dim)]"><span>maxJobsPerTick</span><span>{cap}</span></div>
              <Track>
                <div className="h-full border-r-2 border-[var(--color-text-main)] bg-[var(--color-footer-btn-hover)] transition-all" style={{ width: `${(cap / mx) * 100}%` }} />
              </Track>
            </div>
            <div aria-hidden>
              <div className="pl-mono mb-1 flex justify-between text-xs text-[var(--color-accent)]"><span>fetched</span><span>{got}</span></div>
              <Track>
                <div className="h-full bg-[var(--color-accent)] transition-all" style={{ width: `${(got / mx) * 100}%` }} />
              </Track>
            </div>
            <div className="pl-mono border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-text-muted)]">
              {c} × {n} = {req} requested → <span className="text-[var(--color-accent)]">{got} fetched</span>
              {req > cap && <span className="text-[var(--color-text-dim)]"> · workers scaled down</span>}
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 02 · self-invocation cost */}
        <Panel>
          <PanelHead label="02 · self-invocation cost" tag="per 30 days" />
          <div className="space-y-6 p-6 md:p-8">
            <Slider label="selfInvocationIntervalSec" value={sec} set={setSec} min={1} max={30} />
            <div>
              <div className="pl-mono text-5xl tracking-tight text-[var(--color-text-main)] md:text-6xl">{monthly.toLocaleString()}</div>
              <div className="mt-4 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                invocations per 30-day month while running continuously. Raise the interval to trade pickup latency for fewer invocations.
              </div>
            </div>
          </div>
        </Panel>

        {/* 03 · global concurrency */}
        <Panel>
          <PanelHead label="03 · global concurrency" tag={`${used} / ${glob} slots`} />
          <div className="space-y-6 p-6 md:p-8">
            <Slider label="queues" value={q} set={setQ} min={1} max={20} />
            <Slider label="workers each queue asks for" value={ask} set={setAsk} min={1} max={100} />
            <Slider label="maxGlobalConcurrency" value={glob} set={setGlob} min={10} max={200} />
            <div
              className="grid gap-[3px] border border-[var(--color-border)] bg-[var(--color-code-bg)] p-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10px, 1fr))" }}
              aria-hidden
            >
              {Array.from({ length: glob }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square"
                  style={{ background: i < used ? "var(--color-accent)" : "var(--color-border-dark)", border: i < used ? "none" : "1px solid var(--color-border-dark)" }}
                />
              ))}
            </div>
            <div className="pl-mono border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-text-muted)]">
              demand {demand} vs {glob} slots → each queue gets <span className="text-[var(--color-accent)]">{share}</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* 04 · tick concurrency */}
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] px-6 py-3 md:px-8">
          <Label hot>04 · tick concurrency</Label>
          <Seg options={["Sequential", "Parallel"]} value={mode} onChange={setMode} label="Tick concurrency" />
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {mode === 0
              ? "Sequential is safe on CPU, memory and connections. Queues take turns inside the tick budget."
              : "Parallel ticks every queue at once for lower latency, at the price of spikes."}{" "}
            With a cycleTickLimit of 10 across {q} queue{q > 1 ? "s" : ""}:{" "}
            <span className="text-[var(--color-text-main)]">
              {mode === 0
                ? seqTicks >= 1
                  ? `each queue gets about ${seqTicks} tick${seqTicks > 1 ? "s" : ""}.`
                  : "some queues wait for the next run."
                : "every queue gets all 10 ticks, together."}
            </span>
          </p>
          <div className="space-y-1.5 border border-[var(--color-border)] bg-[var(--color-code-bg)] p-4" aria-hidden>
            {Array.from({ length: Math.min(q, 10) }, (_, r) => (
              <div key={r} className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => {
                  const on = mode === 1 || Math.floor((i * Math.min(q, 10)) / 10) === r;
                  return (
                    <div
                      key={i}
                      className="h-3 flex-1"
                      style={{
                        background: on ? (mode === 1 ? "var(--color-accent)" : "var(--color-text-main)") : "var(--color-surface-active)",
                        border: on ? "none" : "1px solid var(--color-border-dark)",
                      }}
                    />
                  );
                })}
              </div>
            ))}
            <div className="pl-mono pt-2 text-xs text-[var(--color-text-dim)]">rows = queues · columns = ticks in the run</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}