import { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

import Neon from '../../../public/logo/neon.jpeg';
import Supabase from '../../../public/logo/supabase.jpg';
import Rds from '../../../public/logo/rds.webp';
import GCP from '../../../public/logo/gcp.png';
import Azure from '../../../public/logo/azure.png';
import Docker from '../../../public/logo/docker.png';


type Provider = {
  id: string;
  name: string;
  label: string;
  logo: StaticImageData; // path or URL to your logo, leave "" until you add it
};

/* ---- add your logo paths here, e.g. "/logos/neon.svg" ---- */
const PROVIDERS: Provider[] = [
  { id: "neon", name: "NeonDB", label: "Serverless Postgres", logo: Neon },
  { id: "supabase", name: "Supabase", label: "Managed Postgres", logo: Supabase },
  { id: "rds", name: "Amazon RDS", label: "AWS managed database", logo: Rds },
  { id: "cloudsql", name: "Google Cloud SQL", label: "Google Cloud managed database", logo: GCP },
  { id: "azure", name: "Azure Database", label: "Microsoft Azure managed database", logo: Azure },
  { id: "self", name: "Self-hosted", label: "Docker, VM or bare metal", logo: Docker },
];
/* ----------------------------------------------------------- */

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
      <span className="pl-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">{tag}</span>
    </div>
  );
}

function Logo({ p }: { p: Provider }) {
  const [broken, setBroken] = useState(false);
  const showImg = p.logo && !broken;
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-[var(--color-border)] bg-[var(--color-code-bg)] p-2.5 transition-colors group-hover:border-[var(--color-border-subtle)]">
      {showImg ? (
        <Image
          src={p.logo}
          alt={`${p.name} logo`}
          onError={() => setBroken(true)}
          className="h-full w-full object-contain"
          width={100}
          height={100}
          unoptimized
          quality={100}
          loading="lazy"
        />
      ) : (
        <span aria-hidden className="pl-mono text-xl text-[var(--color-accent)]">
          {p.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

function Card({ p }: { p: Provider }) {
  return (
    <div className="group relative flex items-center gap-5 p-6 transition-colors border border-[var(--color-border)] hover:bg-[var(--color-surface-active)] md:p-7">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      />
      <Logo p={p} />
      <div className="min-w-0">
        <div className="text-lg font-semibold tracking-tight text-[var(--color-text-main)]">{p.name}</div>
        <div className="mt-0.5 text-sm text-[var(--color-text-muted)]">{p.label}</div>
      </div>
    </div>
  );
}

export default function Compatibility() {
  return (
    <>
      <Panel className="overflow-hidden">
        <PanelHead label="supported databases" tag="postgresql" />
        
        {/* Grid wrapper holding the background watermark */}
        <div className="relative ">
          {/* Giant centered watermark sitting behind the cards */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-0 opacity-[0.05] select-none"
          >
            <img
              className="w-[420px] h-[420px] object-contain filter grayscale"
              src="https://www.freeiconspng.com/uploads/elephant-png-25.png"
              alt=""
            />
          </div>

          {/* Cards grid layered on top (z-10) */}
          <div className="relative z-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] bg-[var(--color-code-bg)] px-6 py-4 md:px-8">
          <span className="text-sm text-[var(--color-text-muted)]">
            Works with any PostgreSQL database as long as you can setup pgmq
          </span>
          <span className="pl-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            + more
          </span>
        </div>
      </Panel>
    </>
  );
}