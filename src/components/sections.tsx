/* =========================================================================
   SECTION BLOCKS — composable, reusable across the landing page and the
   dedicated routes so content stays single-sourced.
   ========================================================================= */
import { useState, useMemo } from "react";
import {
  APPS, CERT_CATEGORIES, EMAILS, GALLERY, HERO_STATS,
  ORGS, PRICING, PROFILE, PROJECTS, RINGS, SERVICES, SKILL_BARS, SOCIALS,
  TESTIMONIALS, TRUST_POINTS, SHOWREEL, MEDIA, FAQ,
} from "../lib/data";
import { useApp } from "../lib/store";
import {
  Btn, Card, Icon, Lightbox, Reveal, Ring, SectionHead, Section,
  SkillBar, Stat, Tag, Tilt, useCarousel, Accordion,
} from "./ui";
import { Marquee, Odometer, Spotlight } from "./fx";

/* ------------------------------------------------------------ TRUST STRIP */
export function TrustStrip() {
  return (
    <div
      className="relative z-10 overflow-hidden border-y py-3.5"
      style={{
        borderColor: "var(--stroke)",
        background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--bg-2) 72%, transparent) 12%, color-mix(in srgb, var(--bg-2) 72%, transparent) 88%, transparent)",
        boxShadow: "var(--inner-hi)",
      }}
    >
      {/* Edge fades so the loop never appears to "cut" */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{ background: "linear-gradient(90deg, var(--bg-0), transparent)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style={{ background: "linear-gradient(270deg, var(--bg-0), transparent)" }} />
      <Marquee items={TRUST_POINTS} />
    </div>
  );
}

/* -------------------------------------------------------------- STATS ROW */
export function StatsRow() {
  const { lang } = useApp();
  const accents = ["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)", "var(--neon-lime)"];
  return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {HERO_STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 80}>
          <Stat n={s.n} suffix={s.suffix} label={lang === "my" ? s.labelMy : s.label} accent={accents[i]} />
        </Reveal>
      ))}
      </div>
  );
}

/* --------------------------------------------------------- ODOMETER METRICS
   Digit-roll KPI row used on the collection and activity pages.           */
export function MetricRow({
  items,
}: { items: { n: number; s?: string; l: string; c: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((m, i) => (
        <Reveal key={m.l} delay={i * 70}>
          <Spotlight color={m.c}>
            <div className="glass clip-cyber-sm relative overflow-hidden px-4 py-5 text-center">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${m.c}, transparent)` }} />
              <p className="font-display text-[clamp(1.5rem,4vw,2.3rem)] font-black tabular-nums"
                 style={{ color: m.c, textShadow: `0 0 24px ${m.c}55` }}>
                <Odometer value={m.n} suffix={m.s ?? ""} />
              </p>
              <p className="mt-1 font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-dim">{m.l}</p>
            </div>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- PROGRESS RINGS */
export function RingsRow() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {RINGS.map((r, i) => (
        <Reveal key={r.label} delay={i * 90}>
          <Ring label={r.label} pct={r.pct} color={r.color} />
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ SKILL BLOCK */
export function SkillsBlock({ limit }: { limit?: number }) {
  const items = limit ? SKILL_BARS.slice(0, limit) : SKILL_BARS;
  return (
    <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {items.map((s, i) => (
        <SkillBar key={s.name} {...s} delay={i * 60} />
      ))}
    </div>
  );
}

/* --------------------------------------------------------- SERVICES BLOCK */
export function ServicesBlock() {
  const { price } = useApp();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => (
        <Reveal key={s.title} delay={i * 70}>
          <Tilt className="h-full">
            <Card className="beam h-full" glow={i % 2 ? "var(--neon-pink)" : "var(--neon-cyan)"}>
              <div className="mb-3 text-3xl" aria-hidden="true">{s.icon}</div>
              <h3 className="font-display text-[15.5px] font-bold text-hi">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-body">{s.body}</p>
              <ul className="mt-3 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13.5px] text-dim">
                    <span style={{ color: "var(--neon-lime)" }}><Icon name="check" size={13} /></span>{b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-yellow)" }}>
                from {price(480)}
              </p>
            </Card>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- PROJECTS BLOCK */
export function ProjectsBlock({ limit }: { limit?: number }) {
  const { tr, go } = useApp();
  const items = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 70}>
          <Tilt className="h-full" max={7}>
            <article
              className="glass clip-cyber spot brackets group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ ["--spot-c" as any]: `var(--neon-${p.accent})`, ["--brk-c" as any]: `var(--neon-${p.accent})` }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                el.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" decoding="async"
                     className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.14]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-1) 4%, transparent 64%)" }} />
                {/* Accent scanline sweep on hover */}
                <span aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `linear-gradient(180deg, color-mix(in srgb, var(--neon-${p.accent}) 22%, transparent), transparent 42%)` }} />
                <span className="clip-tag absolute left-3 top-3 px-2 py-1 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-black"
                      style={{ background: `var(--neon-${p.accent})`, boxShadow: `0 6px 20px -8px var(--neon-${p.accent})` }}>{p.role}</span>
                <span className="clip-tag absolute right-3 top-3 px-2 py-1 font-mono-tech text-[10px] tabular-nums backdrop-blur-md"
                      style={{ background: "rgba(0,0,0,.45)", color: "#fff" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[15.5px] font-bold text-hi transition-colors group-hover:text-[var(--neon-cyan)]">{p.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-body">{p.outcome}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t, j) => (
                    <Tag key={t} tone={["cyan", "pink", "yellow", "violet", "lime"][j % 5]}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={p.demo} target="_blank" rel="noreferrer noopener"
                     className="clip-tag inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-white/10"
                     style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}>
                    <Icon name="ext" size={12} /> {tr("liveDemo")}
                  </a>
                  <a href={p.source} target="_blank" rel="noreferrer noopener"
                     className="clip-tag inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-white/10"
                     style={{ borderColor: "var(--stroke)", color: "var(--txt)" }}>
                    <Icon name="github" size={12} /> {tr("source")}
                  </a>
                  {p.page && (
                    <button onClick={() => go(p.page!)}
                      className="clip-tag inline-flex items-center gap-1.5 px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.12em] text-black"
                      style={{ background: "var(--neon-yellow)" }}>
                      {tr("readCase")} <Icon name="arrow" size={12} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- APPS BLOCK */
export function AppsBlock() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {APPS.map((a, i) => (
        <Reveal key={a.n} delay={i * 35}>
          <a href={a.repo} target="_blank" rel="noreferrer noopener"
             className="glass clip-cyber-sm group flex h-full items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-125" aria-hidden="true">{a.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-[13px] font-bold text-hi">{a.name}</span>
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em]"
                    style={{ color: a.tag === "New" || a.tag === "Flagship" ? "var(--neon-pink)" : "var(--txt-dim)" }}>
                #{String(a.n).padStart(2, "0")} · {a.tag}
              </span>
            </span>
            <Icon name="ext" size={13} className="opacity-40 transition-opacity group-hover:opacity-100" />
          </a>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- CERTIFICATES */
export function CertsBlock({ compact }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    return CERT_CATEGORIES
      .filter((c) => cat === "all" || c.name === cat)
      .map((c) => ({ ...c, items: c.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) }))
      .filter((c) => c.items.length > 0);
  }, [q, cat]);

  const total = CERT_CATEGORIES.reduce((a, c) => a + c.count, 0);

  return (
    <>
      {!compact && (
        <>
          <Reveal>
            <div className="glass clip-tag mb-4 flex items-center gap-3 px-4 py-3">
              <span aria-hidden="true">🔍</span>
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search certificates…" aria-label="Search certificates"
                className="w-full bg-transparent text-[15px] text-hi outline-none placeholder:text-[var(--txt-dim)]"
              />
              <span className="shrink-0 font-mono-tech text-[11px] text-dim">{total} total</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="mb-6 flex flex-wrap gap-1.5">
              <FilterBtn active={cat === "all"} onClick={() => setCat("all")}>All ({total})</FilterBtn>
              {CERT_CATEGORIES.map((c) => (
                <FilterBtn key={c.name} active={cat === c.name} onClick={() => setCat(c.name)}>
                  {c.icon} {c.name} ({c.count})
                </FilterBtn>
              ))}
            </div>
          </Reveal>
        </>
      )}

      <div className="space-y-7">
        {(compact ? CERT_CATEGORIES.slice(0, 4) : filtered).map((c, ci) => (
          <Reveal key={c.name} delay={ci * 50}>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">{c.icon}</span>
                <h3 className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-hi">{c.name}</h3>
                <span className="clip-tag px-2 py-0.5 font-mono-tech text-[10.5px]"
                      style={{ background: "color-mix(in srgb, var(--neon-cyan) 14%, transparent)", color: "var(--neon-cyan)" }}>
                  {c.count}
                </span>
                <span className="hairline flex-1" />
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {c.items.map((it) => (
                  <div key={it} className="glass clip-cyber-sm flex items-center justify-between gap-3 p-3.5 transition-all hover:-translate-y-0.5">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-hi">{it}</p>
                      <p className="font-mono-tech text-[10.5px] text-dim">Programming Hub · verified</p>
                    </div>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
                          style={{ background: "color-mix(in srgb, var(--neon-lime) 16%, transparent)", color: "var(--neon-lime)" }}>
                      <Icon name="check" size={13} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function FilterBtn({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="clip-tag border px-3 py-1.5 font-mono-tech text-[11px] transition-colors"
      style={{
        borderColor: active ? "var(--neon-cyan)" : "var(--stroke)",
        background: active ? "color-mix(in srgb, var(--neon-cyan) 16%, transparent)" : "transparent",
        color: active ? "var(--neon-cyan)" : "var(--txt-dim)",
      }}
      aria-pressed={active}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------- LINK COLLECTIONS */
export function LinkGrid({ links, tone = "cyan", label }: { links: string[]; tone?: string; label: string }) {
  const pretty = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const tones: Record<string, string> = {
    cyan: "var(--neon-cyan)", pink: "var(--neon-pink)", yellow: "var(--neon-yellow)", violet: "var(--neon-violet)",
  };
  const c = tones[tone] ?? tone;
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((u, i) => (
        <Reveal key={u + i} delay={Math.min(i * 18, 400)}>
          <a href={u} target="_blank" rel="noreferrer noopener"
             className="glass clip-cyber-sm group flex items-center gap-3 p-3 transition-all duration-300 hover:-translate-y-0.5"
             aria-label={`${label} — ${pretty(u)}`}>
            <span className="font-mono-tech text-[10px]" style={{ color: c }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 truncate font-mono-tech text-[12.5px] text-body group-hover:text-[var(--txt-hi)]">{pretty(u)}</span>
            <Icon name="ext" size={12} className="opacity-40 transition-opacity group-hover:opacity-100" />
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export function EmailsBlock() {
  const [copied, setCopied] = useState("");
  const copy = async (addr: string) => {
    try { await navigator.clipboard.writeText(addr); setCopied(addr); setTimeout(() => setCopied(""), 1600); } catch { /* clipboard unavailable */ }
  };
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {EMAILS.map((e, i) => (
        <Reveal key={e.addr} delay={Math.min(i * 25, 400)}>
          <div className="glass clip-cyber-sm flex items-center gap-3 p-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center clip-tag"
                  style={{ background: "color-mix(in srgb, var(--neon-cyan) 12%, transparent)", color: "var(--neon-cyan)" }}>
              <Icon name="mail" size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono-tech text-[12.5px] text-hi">{e.addr}</p>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-dim">{e.label}</p>
            </div>
            <button onClick={() => copy(e.addr)} aria-label={`Copy ${e.addr}`}
              className="clip-tag shrink-0 border px-2 py-1 font-mono-tech text-[10px] transition-colors"
              style={{ borderColor: copied === e.addr ? "var(--neon-lime)" : "var(--stroke)", color: copied === e.addr ? "var(--neon-lime)" : "var(--txt-dim)" }}>
              {copied === e.addr ? "✓" : "COPY"}
            </button>
            <a href={`mailto:${e.addr}`} aria-label={`Email ${e.addr}`}
               className="clip-tag shrink-0 px-2 py-1 font-mono-tech text-[10px] text-black" style={{ background: "var(--neon-yellow)" }}>
              SEND
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- ORG BLOCK */
export function OrgBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ORGS.map((o, i) => (
        <Reveal key={o.name} delay={i * 60}>
          <Card className="beam h-full" glow={i % 2 ? "var(--neon-violet)" : "var(--neon-yellow)"}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[14.5px] font-bold text-hi">{o.name}</h3>
              <span className="font-mono-tech text-[10.5px] text-dim">{o.period}</span>
            </div>
            <p className="mt-1 font-mono-tech text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--neon-cyan)" }}>{o.role}</p>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">{o.note}</p>
            <a href={o.url} target="_blank" rel="noreferrer noopener"
               className="mt-3 inline-flex items-center gap-1.5 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-pink)" }}>
              Visit <Icon name="ext" size={12} />
            </a>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- GALLERY BLOCK */
export function GalleryBlock() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <Reveal key={g.src} delay={i * 40}>
            <button onClick={() => setIdx(i)} aria-label={`Open image: ${g.caption}`}
              className="clip-cyber-sm group relative block h-36 w-full overflow-hidden border sm:h-40"
              style={{ borderColor: "var(--stroke)" }} data-cursor="hot">
              <img src={g.src} alt={g.caption} loading="lazy"
                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,.85), transparent 65%)" }}>
                <span className="font-mono-tech text-[10.5px] uppercase tracking-[0.14em] text-white">{g.caption}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox items={GALLERY} index={idx} onClose={() => setIdx(null)}
                onStep={(d) => setIdx((v) => (v === null ? v : (v + d + GALLERY.length) % GALLERY.length))} />
    </>
  );
}

/* -------------------------------------------------------- SHOWREEL BLOCK */
export function ShowreelBlock() {
  const { i, step, setPaused } = useCarousel(SHOWREEL.length, 8000);
  const cur = SHOWREEL[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="clip-cyber relative overflow-hidden border" style={{ borderColor: "var(--stroke)" }}>
        <video key={cur.src} src={cur.src} poster={MEDIA.heroPoster} autoPlay muted loop playsInline
               className="h-[clamp(220px,42vw,460px)] w-full object-cover" aria-label={cur.title} />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4"
             style={{ background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)" }}>
          <span className="font-mono-tech text-[12px] uppercase tracking-[0.2em] text-white">{cur.title}</span>
          <div className="flex gap-2">
            <button onClick={() => step(-1)} aria-label="Previous reel" className="grid h-9 w-9 place-items-center border border-white/30 text-white">‹</button>
            <button onClick={() => step(1)} aria-label="Next reel" className="grid h-9 w-9 place-items-center border border-white/30 text-white">›</button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {SHOWREEL.map((s, j) => (
          <span key={s.src} className="h-1 w-8 transition-all"
                style={{ background: j === i ? "var(--neon-cyan)" : "var(--stroke)" }} aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------- TESTIMONIAL SLIDER */
export function TestimonialsBlock() {
  const { i, setI, step, setPaused } = useCarousel(TESTIMONIALS.length, 6000);
  const t = TESTIMONIALS[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Card className="relative overflow-hidden px-6 py-9 md:px-12 md:py-12" hover={false} flat>
        {/* Oversized quote mark + ambient wash */}
        <span className="pointer-events-none absolute -right-6 -top-16 select-none font-display text-[14rem] leading-none opacity-[0.06]" aria-hidden="true">”</span>
        <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-20" aria-hidden="true"
              style={{ background: "var(--neon-pink)", filter: "blur(72px)" }} />

        <blockquote key={t.name} className="relative" style={{ animation: "fadeIn 480ms var(--ease-out)" }}>
          {/* Five-star rating rail */}
          <div className="mb-4 flex items-center gap-1" aria-label="Five out of five">
            {[0, 1, 2, 3, 4].map((s) => (
              <span key={s} aria-hidden="true" style={{ color: "var(--neon-yellow)", filter: "drop-shadow(0 0 6px var(--neon-yellow))" }}>★</span>
            ))}
            <span className="ml-2 font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">verified reference</span>
          </div>

          <p className="font-edit text-[clamp(1.1rem,2.6vw,1.72rem)] font-light leading-[1.5] text-hi">“{t.quote}”</p>

          <footer className="mt-7 flex items-center gap-4">
            <span className="avatar-ring h-14 w-14 shrink-0">
              <img src={t.avatar} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
            </span>
            <div>
              <cite className="font-display text-[14px] font-bold not-italic text-hi">{t.name}</cite>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim">{t.role}</p>
            </div>
          </footer>
        </blockquote>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((x, j) => (
              <button key={x.name} onClick={() => setI(j)} role="tab" aria-selected={j === i} aria-label={`Testimonial ${j + 1}`}
                className="h-1.5 transition-all" style={{ width: j === i ? 28 : 14, background: j === i ? "var(--neon-pink)" : "var(--stroke)" }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => step(-1)} aria-label="Previous testimonial" className="grid h-9 w-9 place-items-center border" style={{ borderColor: "var(--stroke)" }}>‹</button>
            <button onClick={() => step(1)} aria-label="Next testimonial" className="grid h-9 w-9 place-items-center border" style={{ borderColor: "var(--stroke)" }}>›</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------- PRICING BLOCK */
export function PricingBlock() {
  const { price, cur, setCur } = useApp();
  return (
    <>
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-dim">Currency:</span>
          {(["USD", "THB", "MMK"] as const).map((c) => (
            <button key={c} onClick={() => setCur(c)} aria-pressed={cur === c}
              className="clip-tag border px-3.5 py-1.5 font-mono-tech text-[11.5px] transition-colors"
              style={{
                borderColor: cur === c ? "var(--neon-yellow)" : "var(--stroke)",
                background: cur === c ? "color-mix(in srgb, var(--neon-yellow) 16%, transparent)" : "transparent",
                color: cur === c ? "var(--neon-yellow)" : "var(--txt-dim)",
              }}>
              {c}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <Tilt className="h-full" max={6}>
              <Spotlight color={p.featured ? "var(--neon-pink)" : "var(--neon-cyan)"} className="h-full">
              <div className={`glass clip-cyber flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 ${p.featured ? "border-2" : ""}`}
                   style={p.featured ? { borderColor: "var(--neon-pink)", boxShadow: "0 0 0 1px var(--neon-pink), 0 30px 80px -36px var(--neon-pink), var(--inner-hi)" } : undefined}>
                {p.featured && (
                  <span className="clip-tag mb-3 self-start px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-black"
                        style={{ background: "var(--neon-pink)", boxShadow: "0 6px 20px -8px var(--neon-pink)" }}>Most requested</span>
                )}
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-[15px] font-bold text-hi">{p.name}</h3>
                  <span className="font-mono-tech text-[10px] tabular-nums text-dim">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="grad-text mt-3 font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-black tabular-nums">{price(p.usd)}</p>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim">{p.note}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px] text-body">
                      <span style={{ color: "var(--neon-lime)" }}><Icon name="check" size={14} /></span>{f}
                    </li>
                  ))}
                </ul>
                <Btn href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(p.name)}`} variant={p.featured ? "primary" : "wire"} className="mt-5 w-full">
                  Book {p.name}
                </Btn>
              </div>
              </Spotlight>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ FAQ BLOCK */
export function FaqBlock({ limit }: { limit?: number }) {
  return <Accordion items={limit ? FAQ.slice(0, limit) : FAQ} />;
}

/* -------------------------------------------------------- SOCIAL ICON ROW */
export function SocialRow({ size = 44 }: { size?: number }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noreferrer noopener" title={s.name} aria-label={s.name}
             className="clip-tag grid place-items-center border transition-all duration-300 hover:-translate-y-1"
             style={{ width: size, height: size, borderColor: "var(--stroke)", color: s.accent }}
             onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.accent; e.currentTarget.style.boxShadow = `0 0 20px -5px ${s.accent}`; }}
             onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--stroke)"; e.currentTarget.style.boxShadow = "none"; }}
             data-cursor="hot">
            <Icon name={s.icon} size={Math.round(size * 0.42)} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------- CONTACT FORM */
export function ContactForm() {
  const { tr } = useApp();
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (v.name.trim().length < 2) e.name = tr("errName");
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email)) e.email = tr("errEmail");
    if (v.subject.trim().length < 4) e.subject = tr("errSubject");
    if (v.message.trim().length < 20) e.message = tr("errMsg");
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setOk(true);
    setV({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setOk(false), 6000);
  };

  const field = (key: keyof typeof v, labelKey: string, type = "text") => (
    <div>
      <label htmlFor={`f-${key}`} className="mb-1.5 block font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">
        {tr(labelKey)} <span style={{ color: "var(--neon-pink)" }}>*</span>
      </label>
      <input
        id={`f-${key}`} type={type} value={v[key]}
        onChange={(e) => { setV({ ...v, [key]: e.target.value }); setErr({ ...err, [key]: "" }); }}
        aria-invalid={!!err[key]} aria-describedby={err[key] ? `e-${key}` : undefined}
        className="clip-tag w-full border bg-transparent px-4 py-3 text-[15px] text-hi outline-none transition-colors placeholder:text-[var(--txt-dim)]"
        style={{ borderColor: err[key] ? "var(--neon-pink)" : "var(--stroke)" }}
      />
      {err[key] && <p id={`e-${key}`} role="alert" className="mt-1 text-[12.5px]" style={{ color: "var(--neon-pink)" }}>✕ {err[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="glass clip-cyber space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "formName")}
        {field("email", "formEmail", "email")}
      </div>
      {field("subject", "formSubject")}
      <div>
        <label htmlFor="f-message" className="mb-1.5 block font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">
          {tr("formMsg")} <span style={{ color: "var(--neon-pink)" }}>*</span>
        </label>
        <textarea
          id="f-message" rows={5} value={v.message}
          onChange={(e) => { setV({ ...v, message: e.target.value }); setErr({ ...err, message: "" }); }}
          aria-invalid={!!err.message} aria-describedby={err.message ? "e-message" : undefined}
          className="clip-tag w-full resize-y border bg-transparent px-4 py-3 text-[15px] text-hi outline-none placeholder:text-[var(--txt-dim)]"
          style={{ borderColor: err.message ? "var(--neon-pink)" : "var(--stroke)" }}
        />
        {err.message && <p id="e-message" role="alert" className="mt-1 text-[12.5px]" style={{ color: "var(--neon-pink)" }}>✕ {err.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Btn type="submit" variant="primary">{tr("formSend")} <Icon name="arrow" size={15} /></Btn>
        {ok && <p role="status" className="font-mono-tech text-[12.5px]" style={{ color: "var(--neon-lime)" }}>✓ {tr("sent")}</p>}
      </div>
      <p className="font-mono-tech text-[11px] text-dim">
        Prefer email? <a href={`mailto:${PROFILE.email}`} style={{ color: "var(--neon-cyan)" }}>{PROFILE.email}</a> · Asia/Bangkok (GMT+7)
      </p>
    </form>
  );
}

/* ----------------------------------------------- SMALL CONTENT HELPERS */
export function Bullets({ items, tone = "cyan" }: { items: string[]; tone?: string }) {
  const tones: Record<string, string> = { cyan: "var(--neon-cyan)", pink: "var(--neon-pink)", yellow: "var(--neon-yellow)", lime: "var(--neon-lime)", violet: "var(--neon-violet)" };
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-body">
          <span className="mt-1 shrink-0" style={{ color: tones[tone] }}><Icon name="check" size={14} /></span>{i}
        </li>
      ))}
    </ul>
  );
}

export function InfoGrid({ rows }: { rows: [string, string][] }) {
  return (
    <div className="glass clip-cyber divide-y" style={{ borderColor: "var(--stroke)" }}>
      {rows.map(([k, val]) => (
        <div key={k} className="flex items-center justify-between gap-4 px-5 py-3" style={{ borderColor: "var(--stroke-soft)" }}>
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-dim">{k}</span>
          <span className="text-right text-[14.5px] font-semibold text-hi">{val}</span>
        </div>
      ))}
    </div>
  );
}

export { Section, SectionHead, Reveal, Card, Btn, Icon, Tag, Tilt };
