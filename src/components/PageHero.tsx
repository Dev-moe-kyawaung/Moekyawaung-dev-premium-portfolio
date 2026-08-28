/* =========================================================================
   PAGE HERO — the cinematic masthead every inner route shares.
   Editorial kicker + rule, oversized headline, lead paragraph, meta rail,
   ambient corner wash and a numbered breadcrumb back to home.
   ========================================================================= */
import type { ReactNode } from "react";
import { Reveal, Icon, Btn } from "./ui";
import { useApp } from "../lib/store";
import { ROUTES } from "../lib/data";

export default function PageHero({
  kicker, title, lead, accent = "var(--neon-cyan)", meta, actions,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  accent?: string;
  meta?: string[];
  actions?: ReactNode;
}) {
  const { go, tr, route, lang } = useApp();
  const current = ROUTES.find((r) => r.id === route);
  const index = String(ROUTES.findIndex((r) => r.id === route) + 1).padStart(2, "0");

  return (
    <header className="relative overflow-hidden pb-10 pt-[calc(var(--nav-h)+58px)]">
      {/* Ambient corner wash + faint dot field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
           style={{ background: `radial-gradient(58% 52% at 12% -6%, color-mix(in srgb, ${accent} 20%, transparent), transparent 68%)` }} />
      <div className="dotfield pointer-events-none absolute inset-0 opacity-40" aria-hidden="true"
           style={{ maskImage: "radial-gradient(70% 60% at 80% 20%, #000, transparent 72%)" }} />

      {/* Oversized watermark index */}
      <span aria-hidden="true"
            className="pointer-events-none absolute right-[3%] top-[calc(var(--nav-h)+10px)] select-none font-display text-[clamp(5rem,16vw,13rem)] font-black leading-none"
            style={{ color: "transparent", WebkitTextStroke: `1px ${accent}`, opacity: 0.09 }}>
        {index}
      </span>

      <div className="shell relative z-10">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.22em]">
            <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-dim transition-colors hover:text-[var(--neon-cyan)]">
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Icon name="arrow" size={12} /></span>
              Home
            </button>
            <span className="text-dim/50" aria-hidden="true">/</span>
            <span className="text-dim">{current?.group ?? "Page"}</span>
            <span className="text-dim/50" aria-hidden="true">/</span>
            <span style={{ color: accent }}>{current ? current[lang] : ""}</span>
          </nav>
        </Reveal>

        {/* Kicker rule */}
        <Reveal delay={60}>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono-tech text-[11px] tabular-nums" style={{ color: accent }}>{index}</span>
            <span className="h-px w-12" style={{ background: accent }} />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.32em]" style={{ color: accent }}>{kicker}</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={110}>
          <h1 className="max-w-5xl font-display text-[clamp(1.95rem,5.6vw,3.9rem)] font-black leading-[1.01]">{title}</h1>
        </Reveal>

        {/* Lead */}
        {lead && (
          <Reveal delay={170}>
            <p className="mt-5 max-w-3xl border-l-2 pl-5 font-edit text-[clamp(1.02rem,1.95vw,1.22rem)] font-light leading-relaxed text-body"
               style={{ borderLeftColor: `color-mix(in srgb, ${accent} 60%, transparent)` }}>
              {lead}
            </p>
          </Reveal>
        )}

        {/* Meta rail */}
        {meta && (
          <Reveal delay={220}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.map((m) => (
                <li key={m}
                    className="clip-tag border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-dim"
                    style={{ borderColor: "var(--stroke)", background: "var(--glass-flat)" }}>
                  <span style={{ color: accent }}>◆</span> {m}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Actions */}
        <Reveal delay={280}>
          <div className="mt-8 flex flex-wrap gap-3">
            {actions ?? (
              <>
                <Btn variant="primary" onClick={() => go("contact")}>{tr("contactMe")} <Icon name="arrow" size={15} /></Btn>
                <Btn variant="wire" onClick={() => go("projects")}>{tr("viewProjects")}</Btn>
              </>
            )}
          </div>
        </Reveal>

        <div className="hairline mt-10" />
      </div>
    </header>
  );
}
