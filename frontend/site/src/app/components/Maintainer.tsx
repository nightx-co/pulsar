"use client";

import { useState } from "react";

/* ---- edit these ---- */
const NAME = "Mohammed Hamim";
const ROLE = "Creator & maintainer";
const GITHUB_USER = "BlackdreamIO";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const AVATAR = `https://github.com/${GITHUB_USER}.png?size=200`; // or any image URL
/* -------------------- */

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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Maintainer() {
  const [broken, setBroken] = useState(false);

  return (
    <Panel>
      <PanelHead label="maintainer" tag="open source · 2 months" />
      <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-10">
        {/* avatar with corner marks */}
        <div className="relative mx-auto h-40 w-40 md:mx-0 md:h-48 md:w-48">
          <span aria-hidden className="absolute -left-2 -top-2 h-3 w-3 border-l-2 border-t-2 border-[var(--color-accent)]" />
          <span aria-hidden className="absolute -right-2 -top-2 h-3 w-3 border-r-2 border-t-2 border-[var(--color-accent)]" />
          <span aria-hidden className="absolute -bottom-2 -left-2 h-3 w-3 border-b-2 border-l-2 border-[var(--color-accent)]" />
          <span aria-hidden className="absolute -bottom-2 -right-2 h-3 w-3 border-b-2 border-r-2 border-[var(--color-accent)]" />
          <div className="h-full w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-code-bg)]">
            {broken ? (
              <div className="pl-mono flex h-full w-full items-center justify-center text-5xl text-[var(--color-accent)]">
                {NAME.charAt(0)}
              </div>
            ) : (
              <img
                src={AVATAR}
                alt={`Portrait of ${NAME}`}
                onError={() => setBroken(true)}
                className="h-full w-full object-cover grayscale transition duration-300 hover:grayscale-0"
              />
            )}
          </div>
        </div>

        {/* details */}
        <div className="text-center md:text-left">
          <div className="pl-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">{ROLE}</div>
          <h3 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--color-text-main)] md:text-5xl">{NAME}</h3>
          <div className="mx-auto mt-5 max-w-md border-l-2 border-[var(--color-accent)] pl-4 text-left text-sm leading-relaxed text-[var(--color-text-muted)] md:mx-0">
            Pulsar started as a personal itch and grew into something I&apos;m proud of. Issues, ideas and pull requests are all appreciated.
          </div>
          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent-contrast)] transition-colors hover:bg-transparent hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <GitHubIcon />
              Follow on GitHub
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </Panel>
  );
}