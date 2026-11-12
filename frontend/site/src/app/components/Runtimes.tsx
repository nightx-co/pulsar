"use client";

import { HEIGHTS, RT, RUNTIMES, reduced } from "../constants/pulsarData";
import { useEffect, useState } from "react";

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"border border-[var(--color-border)] bg-[var(--color-surface)] " + className}>{children}</div>;
}

function PanelHead({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-3 md:px-8">
      <div className="pl-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
        <span aria-hidden className="pl-beat inline-block h-1.5 w-1.5 bg-[var(--color-accent)]" />
        {label}
      </div>
      <span className="pl-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-border-subtle)]">{tag}</span>
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

export default function Runtimes() {
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
              className={
                "grid w-full gap-5 border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:grid-cols-[200px_1fr] md:p-6 " +
                (on ? "border-[var(--color-accent)] bg-[var(--color-surface-active)]" : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-subtle)]")
              }
            >
              <div>
                <div className={"pl-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] " + (on ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]")}>
                  <span
                    aria-hidden
                    className={"inline-block h-1.5 w-1.5 " + (on ? "pl-beat bg-[var(--color-accent)]" : "border border-[var(--color-border-subtle)]")}
                  />
                  {r.id}
                </div>
                <div className="mt-2 text-xl font-medium text-[var(--color-text-main)]">{r.label}</div>
              </div>
              <div>
                <div className="border border-[var(--color-border)] bg-[var(--color-code-bg)] p-3">
                  <div className="flex h-16 items-end gap-[2px]" aria-hidden>
                    {items.map((it, i) =>
                      it.k === "t" ? (
                        <div
                          key={i}
                          className="flex-1 transition-colors duration-200"
                          style={{ height: `${it.h}%`, background: i === head ? "var(--color-accent)" : i < head ? "var(--color-text-main)" : "var(--color-border)", opacity: it.faded ? 0.5 : 1 }}
                        />
                      ) : it.k === "hand" ? (
                        <div key={i} className="flex h-full w-3 shrink-0 justify-center md:w-5">
                          <div className={"h-full border-l border-dashed " + (i < head ? "border-[var(--color-accent)]" : "border-[var(--color-border-subtle)]")} />
                        </div>
                      ) : (
                        <div key={i} className="h-full w-4 shrink-0 md:w-8">
                          <div className={"h-full border-b border-dotted " + (i < head ? "border-[var(--color-accent)]" : "border-[var(--color-border-subtle)]")} />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="pl-mono mt-2 flex justify-between gap-3 text-[11px] text-[var(--color-text-dim)]">
                  <span>{labels[0]}</span>
                  <span className={r.kind === "persistent" ? "" : "text-[var(--color-accent)]"}>{labels[1]}</span>
                  <span className="hidden text-right sm:inline">{labels[2]}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Panel className="mt-3">
        <PanelHead label={rt.id} tag="selected runtime" />
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="p-6 md:p-8">
            <p className="max-w-md leading-relaxed text-[var(--color-text-main)]">{rt.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {rt.hosts.map((h) => (
                <span key={h} className="pl-mono border border-[var(--color-border)] bg-[var(--color-code-bg)] px-3 py-1 text-xs text-[var(--color-text-muted)]">{h}</span>
              ))}
            </div>
          </div>
          <dl className="border-t border-[var(--color-border)] bg-[var(--color-code-bg)] md:border-l md:border-t-0">
            {rt.rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] px-6 py-4 last:border-0 md:px-8">
                <dt className="pl-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)]">{k}</dt>
                <dd className="text-right text-sm text-[var(--color-text-main)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>

      <div className="mt-6 max-w-2xl border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
        Re-invocation uses pg_net by default. Choose manual to trigger the next cycle yourself through something fire-and-forget like QStash or SNS. Never await a request to selfURL, it holds the current instance open.
      </div>
    </>
  );
}