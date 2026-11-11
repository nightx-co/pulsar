"use client";

import { useState } from "react";
import { TARGETS } from "../constants/static";

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

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"border border-[var(--color-border)] bg-[var(--color-surface)] " + className}>{children}</div>;
}

function PanelHead({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
      <div className="pl-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
        <span aria-hidden className="pl-beat inline-block h-1.5 w-1.5 bg-[var(--color-accent)]" />
        {label}
      </div>
      <span className="pl-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-border-subtle)]">{tag}</span>
    </div>
  );
}

/* ================================================================== */
/*  08 INTEGRATIONS: switchboard                                     */
/* ================================================================== */
export default function Integrations() {
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
                className={
                  "flex w-full items-center justify-between gap-3 border px-5 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
                  (s === i ? "border-[var(--color-accent)] bg-[var(--color-surface-active)]" : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-subtle)]")
                }
              >
                <span>
                  <span className="block font-medium text-[var(--color-text-main)]">{t.id}</span>
                  <span className="mt-0.5 block text-xs text-[var(--color-text-dim)]">{t.sub}</span>
                </span>
                <i
                  aria-hidden
                  className={"inline-block h-1.5 w-1.5 shrink-0 " + (s === i ? "pl-beat bg-[var(--color-accent)]" : "border border-[var(--color-border-subtle)]")}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <Panel>
            <PanelHead label="dispatch" tag="claimed jobs → target" />
            <div className="bg-[var(--color-code-bg)] p-5">
              <svg viewBox="0 0 600 70" className="w-full" role="img" aria-label={`Pulsar dispatching claimed jobs to ${tg.id}`}>
                <rect x="1" y="12" width="130" height="46" fill="var(--color-accent)" />
                <text x="66" y="40" textAnchor="middle" fill="var(--color-accent-contrast)" fontSize="15" fontWeight="600">Pulsar</text>
                <path d="M131 35 H469" stroke="var(--color-border)" strokeWidth="2" />
                <path d="M131 35 H469" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 9" className="pl-flow" />
                <rect x="469" y="12" width="130" height="46" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
                <text x="534" y="40" textAnchor="middle" fill="var(--color-text-main)" fontSize="13">{tg.id}</text>
                <text x="300" y="26" textAnchor="middle" fill="var(--color-text-dim)" fontSize="11" className="pl-mono">claimed jobs</text>
              </svg>
            </div>
          </Panel>
          <Code title={tg.id + " consumer"} code={tg.code} />
        </div>
      </div>
    </>
  );
}