/* =========================================================================
   UI PRIMITIVES — the reusable component system used across all 36 routes.
   Every primitive is presentation-only and reads tokens from index.css.
   ========================================================================= */
import {
  useEffect, useRef, useState, useCallback, type ReactNode, type CSSProperties,
} from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ HOOK
   useInView — one shared IntersectionObserver pattern powering scroll
   reveals, counters, skill bars and progress rings.                       */
export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/* ---------------------------------------------------------------- REVEAL */
export function Reveal({
  children, delay = 0, className, as: As = "div",
}: { children: ReactNode; delay?: number; className?: string; as?: any }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <As
      ref={ref}
      className={cn("reveal", inView && "in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

/* -------------------------------------------------------------- PARALLAX
   Depth-based scroll translation. Strength is in px per 1000px scrolled. */
export function Parallax({
  children, strength = 60, className,
}: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translate3d(0, ${(-progress * strength).toFixed(2)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [strength]);
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}

/* ------------------------------------------------------------ TILT CARD */
export function Tilt({
  children, className, max = 9, style,
}: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={cn("tilt", className)} style={style}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------- MAGNETIC BTN */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`;
  };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- GLASS CARD
   Premium surface: gradient glass, inner top highlight, pointer-tracked
   spotlight and hover corner brackets.                                    */
export function Card({
  children, className, glow, hover = true, style, flat,
}: { children: ReactNode; className?: string; glow?: string; hover?: boolean; style?: CSSProperties; flat?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const accent = glow ?? "var(--neon-cyan)";

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={flat ? undefined : onMove}
      className={cn(
        "glass clip-cyber relative p-6 transition-all duration-300",
        !flat && "spot brackets",
        hover && "hover:-translate-y-1.5",
        className,
      )}
      style={{
        ["--spot-c" as any]: accent,
        ["--brk-c" as any]: accent,
        ...(glow ? { boxShadow: `0 0 0 1px ${glow}22, 0 26px 70px -34px ${glow}, var(--inner-hi)` } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- BUTTON */
export function Btn({
  children, href, onClick, variant = "primary", className, ariaLabel, type = "button", external,
}: {
  children: ReactNode; href?: string; onClick?: () => void;
  variant?: "primary" | "ghost" | "wire"; className?: string;
  ariaLabel?: string; type?: "button" | "submit"; external?: boolean;
}) {
  const base = "clip-tag group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 font-display text-[12.5px] font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer";
  const styles = {
    primary: "text-black hover:brightness-110 hover:-translate-y-0.5 active:scale-[.98] active:translate-y-0",
    ghost: "border text-hi hover:bg-white/10 hover:-translate-y-0.5",
    wire: "border text-hi hover:-translate-y-0.5",
  }[variant];
  const inline: CSSProperties =
    variant === "primary"
      ? {
          background: "linear-gradient(100deg, var(--neon-cyan), var(--neon-pink) 55%, var(--neon-violet))",
          backgroundSize: "180% auto",
          boxShadow: "0 12px 40px -14px rgba(0,240,255,.75), inset 0 1px 0 rgba(255,255,255,.4)",
        }
      : variant === "wire"
        ? { borderColor: "var(--neon-cyan)", boxShadow: "inset 0 0 0 0 var(--neon-cyan)" }
        : { borderColor: "var(--stroke)", boxShadow: "var(--inner-hi)" };

  /* Sweeping sheen on hover for every button variant */
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100"
      />
      <Magnetic className="relative z-10 inline-flex items-center gap-2">{children}</Magnetic>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className={cn(base, styles, className)}
        style={inline}
        data-cursor="hot"
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cn(base, styles, className)} style={inline} data-cursor="hot">
      {inner}
    </button>
  );
}

/* --------------------------------------------------------------- COUNTER */
export function Counter({
  to, suffix = "", duration = 1900, className,
}: { to: number; suffix?: string; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo for a satisfying settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : v}{suffix}
    </span>
  );
}

/* ---------------------------------------------------------- PROGRESS RING */
export function Ring({ label, pct, color, size = 132 }: { label: string; pct: number; color: string; size?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth="8" fill="none" />
          <circle
            className="ring-bar" cx={size / 2} cy={size / 2} r={r} strokeWidth="8" fill="none"
            stroke={color} strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={inView ? c - (c * pct) / 100 : c}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-2xl font-black text-hi">
            {inView ? <Counter to={pct} suffix="%" duration={1500} /> : "0%"}
          </span>
        </div>
      </div>
      <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-dim">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------ SKILL BAR */
export function SkillBar({ name, pct, accent, delay = 0 }: { name: string; pct: number; accent: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-hi">{name}</span>
        <span className="font-mono-tech text-xs" style={{ color: accent }}>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--glass-strong)" }}>
        <div
          className="bar-fill h-full rounded-full"
          style={{
            width: inView ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${accent}, var(--neon-pink))`,
            boxShadow: `0 0 12px ${accent}`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ TAG */
const TAG_TONES: Record<string, string> = {
  cyan: "var(--neon-cyan)", pink: "var(--neon-pink)", yellow: "var(--neon-yellow)",
  violet: "var(--neon-violet)", lime: "var(--neon-lime)",
};
export function Tag({ children, tone = "cyan" }: { children: ReactNode; tone?: string }) {
  const c = TAG_TONES[tone] ?? tone;
  return (
    <span
      className="clip-tag inline-block px-2.5 py-1 font-mono-tech text-[10.5px] uppercase tracking-[0.14em]"
      style={{ color: c, background: `color-mix(in srgb, ${c} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 38%, transparent)` }}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------- SECTION HEADER
   Editorial masthead with an optional numeric index, rule, and lead.      */
export function SectionHead({
  label, title, sub, center, id, index, accent = "var(--neon-cyan)",
}: {
  label: string; title: ReactNode; sub?: ReactNode; center?: boolean;
  id?: string; index?: string; accent?: string;
}) {
  return (
    <header id={id} className={cn("mb-9", center && "mx-auto max-w-3xl text-center")}>
      <Reveal>
        <div className={cn("mb-3 flex items-center gap-3", center && "justify-center")}>
          {index && <span className="font-mono-tech text-[11px] tabular-nums" style={{ color: accent }}>{index}</span>}
          <span className="h-px w-9" style={{ background: accent }} />
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.34em]" style={{ color: accent }}>
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="text-[clamp(1.75rem,4.2vw,3.05rem)] font-black leading-[1.08]">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={140}>
          <p className={cn("mt-3.5 max-w-2xl font-edit text-[16px] font-light leading-relaxed text-body", center && "mx-auto")}>{sub}</p>
        </Reveal>
      )}
    </header>
  );
}

/* -------------------------------------------------------------- SECTION */
export function Section({
  children, id, className, tight,
}: { children: ReactNode; id?: string; className?: string; tight?: boolean }) {
  return (
    <section id={id} className={cn("relative z-10", tight ? "py-10" : "py-14 md:py-16", className)}>
      <div className="shell">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------- ACCORDION */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={it.q} delay={i * 45}>
            <div className="glass clip-cyber-sm overflow-hidden">
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="hot"
                >
                  <span className="font-display text-[14px] font-bold text-hi">{it.q}</span>
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm transition-transform duration-300"
                    style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", transform: isOpen ? "rotate(45deg)" : "none" }}
                    aria-hidden="true"
                  >+</span>
                </button>
              </h3>
              <div
                className="grid transition-all duration-500"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-body">{it.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- LIGHTBOX */
export function Lightbox({
  items, index, onClose, onStep,
}: { items: { src: string; caption: string }[]; index: number | null; onClose: () => void; onStep: (d: number) => void }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, onClose, onStep]);

  if (index === null) return null;
  const it = items[index];
  return (
    <div
      role="dialog" aria-modal="true" aria-label={it.caption}
      className="fixed inset-0 z-[9998] grid place-items-center bg-black/88 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <figure className="relative max-h-[88vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img src={it.src} alt={it.caption} className="clip-cyber max-h-[76vh] w-full object-contain" loading="lazy" />
        <figcaption className="mt-3 text-center font-mono-tech text-xs uppercase tracking-[0.2em] text-dim">
          {index + 1} / {items.length} · {it.caption}
        </figcaption>
        <button onClick={() => onStep(-1)} aria-label="Previous image"
          className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/50 text-white">‹</button>
        <button onClick={() => onStep(1)} aria-label="Next image"
          className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/50 text-white">›</button>
      </figure>
      <button onClick={onClose} aria-label="Close gallery"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/50 text-xl text-white">×</button>
    </div>
  );
}

/* ---------------------------------------------------------------- STAT */
export function Stat({ n, suffix, label, accent = "var(--neon-cyan)" }: { n: number; suffix: string; label: string; accent?: string }) {
  return (
    <div
      className="glass clip-cyber-sm spot relative overflow-hidden px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1"
      style={{ ["--spot-c" as any]: accent }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* Top accent rule */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="font-display text-[clamp(1.6rem,4vw,2.45rem)] font-black tabular-nums"
           style={{ color: accent, textShadow: `0 0 26px ${accent}55` }}>
        <Counter to={n} suffix={suffix} />
      </div>
      <div className="mt-1 font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------- TIMELINE */
export function Timeline({ items }: { items: { year: string; title: string; org: string; body: string; impact: string }[] }) {
  return (
    <ol className="relative ml-3 space-y-6 border-l pl-7" style={{ borderColor: "var(--stroke)" }}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.year + it.title} delay={i * 60} className="relative">
          <span
            className="absolute -left-[38px] top-1.5 grid h-4 w-4 place-items-center rounded-full"
            style={{ background: "var(--bg-0)", boxShadow: `0 0 0 2px ${i % 2 ? "var(--neon-pink)" : "var(--neon-cyan)"}` }}
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: i % 2 ? "var(--neon-pink)" : "var(--neon-cyan)" }} />
          </span>
          <div className="glass clip-cyber-sm p-5">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <span className="font-mono-tech text-sm" style={{ color: "var(--neon-yellow)" }}>{it.year}</span>
              <h3 className="font-display text-[15px] font-bold text-hi">{it.title}</h3>
            </div>
            <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-dim">{it.org}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-body">{it.body}</p>
            <p className="mt-2.5 inline-block clip-tag px-2.5 py-1 font-mono-tech text-[11px]"
               style={{ color: "var(--neon-lime)", background: "color-mix(in srgb, var(--neon-lime) 12%, transparent)" }}>
              ▲ {it.impact}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- ICONS
   Inline SVG sprites — no icon-font payload, fully colourable & a11y-safe. */
const PATHS: Record<string, string> = {
  github: "M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96C21.6 8.75 23 11 23 14.4V21h-4v-5.9c0-1.4-.03-3.2-2-3.2-2 0-2.3 1.52-2.3 3.1V21h-4V9Z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.4 2L12 12.3 19.6 7H4.4Z",
  phone: "M6.6 2h3.2l1.6 4-2 1.4a13 13 0 0 0 5.2 5.2l1.4-2 4 1.6v3.2a2 2 0 0 1-2.2 2A18 18 0 0 1 4.6 4.2 2 2 0 0 1 6.6 2Z",
  telegram: "M21.9 4.3 2.9 11.6c-1.1.4-1.1 1.1-.2 1.4l4.8 1.5 1.8 5.6c.2.6.4.8 1 .8.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.6.2 1.8-.8l3.2-15.2c.3-1.2-.5-1.8-1.7-1.4Z",
  instagram: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 2.3a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm6.9-2.6a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z",
  youtube: "M23 12s0-3.6-.46-5.33a2.8 2.8 0 0 0-1.97-1.98C18.83 4.2 12 4.2 12 4.2s-6.83 0-8.57.49A2.8 2.8 0 0 0 1.46 6.67C1 8.4 1 12 1 12s0 3.6.46 5.33a2.8 2.8 0 0 0 1.97 1.98c1.74.49 8.57.49 8.57.49s6.83 0 8.57-.49a2.8 2.8 0 0 0 1.97-1.98C23 15.6 23 12 23 12ZM9.8 15.4V8.6l5.9 3.4-5.9 3.4Z",
  play: "M3.6 2.3 14 12 3.6 21.7A1.9 1.9 0 0 1 3 20.3V3.7c0-.6.24-1.1.6-1.4Zm11.8 7.1 2.9 2.6-2.9 2.6L12.6 12l2.8-2.6Zm-1.2-1.1L5.1 1.9l11.4 6.6-2.3 1.8Zm0 7.4 2.3 1.8L5.1 22.1l9.1-6.4Z",
  gravatar: "M12 2a10 10 0 1 0 10 10v-1.5h-2V12a8 8 0 1 1-8-8h1.5V2H12Zm2 1.6V10a2 2 0 1 1-4 0V3.6a10 10 0 0 1 4 0Z",
  tumblr: "M14.5 2v4.2h4v3.6h-4v5.4c0 1.3.5 1.9 1.7 1.9h2.4V22h-3.5c-3.2 0-5-1.7-5-5V9.8H7.5V6.6c2.6-.8 3.6-2.6 3.8-4.6h3.2Z",
  flickr: "M7 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm10 0a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z",
  bluesky: "M12 10.3C10.9 8.2 7.9 4.3 5.2 2.6 2.6.9 1.6 1.2 1 1.5.2 1.9 0 3 0 3.7c0 .7.4 5.6.6 6.4.8 2.7 3.6 3.6 6.2 3.3h.4c-2.6.4-4.9 1.4-1.9 4.8 3.3 3.5 4.6-.8 5.2-3 .6 2.2 1.4 6.4 5.3 3 2.8-3.4.7-4.4-1.9-4.8h.4c2.6.3 5.4-.6 6.2-3.3.2-.8.6-5.7.6-6.4 0-.7-.2-1.8-1-2.2-.6-.3-1.6-.6-4.2 1.1C16.1 4.3 13.1 8.2 12 10.3Z",
  vimeo: "M22.9 7.3c-.1 2.1-1.6 5-4.4 8.7-2.9 3.9-5.4 5.8-7.4 5.8-1.3 0-2.3-1.1-3.2-3.4L6.3 13c-.6-2.3-1.3-3.4-2-3.4-.2 0-.7.3-1.6.9l-1-1.2c1-.9 2-1.8 3-2.7 1.3-1.2 2.3-1.8 3-1.8 1.6-.2 2.5.9 2.9 3.2.4 2.5.7 4.1.9 4.7.5 2.1 1 3.2 1.6 3.2.4 0 1.1-.7 2-2.1.9-1.4 1.4-2.5 1.4-3.2.1-1.1-.3-1.7-1.4-1.7-.5 0-1 .1-1.6.4 1.1-3.5 3.1-5.2 6.1-5.1 2.2.1 3.3 1.5 3.3 4.1Z",
  slack: "M5 15a2 2 0 1 1-2-2h2v2Zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5ZM9 5a2 2 0 1 1 2-2v2H9Zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5Zm10 3a2 2 0 1 1 2 2h-2V9Zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5Zm-3 10a2 2 0 1 1-2 2v-2h2Zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5Z",
  paypal: "M7.1 21h-3l3-18h6.4c3.5 0 5.6 1.8 5 5.1-.6 3.5-3.2 5.2-6.9 5.2H9.2L8.1 21H7.1Zm3.3-10.4h1.8c1.9 0 3.2-.8 3.5-2.5.2-1.4-.6-2.1-2.3-2.1h-2l-1 4.6Z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.9a15.6 15.6 0 0 0-1.4-3.7A8 8 0 0 1 18.9 8ZM12 4.2c.7 1 1.4 2.3 1.8 3.8h-3.6c.4-1.5 1.1-2.8 1.8-3.8ZM4.3 14a8 8 0 0 1 0-4h3.3a17 17 0 0 0 0 4H4.3Zm.8 2h2.9c.3 1.3.8 2.6 1.4 3.7A8 8 0 0 1 5.1 16Zm2.9-8H5.1a8 8 0 0 1 4.3-3.7C8.8 5.4 8.3 6.7 8 8Zm4 11.8c-.7-1-1.4-2.3-1.8-3.8h3.6c-.4 1.5-1.1 2.8-1.8 3.8Zm2.2-5.8H9.8a15 15 0 0 1 0-4h4.4a15 15 0 0 1 0 4Zm.4 5.7c.6-1.1 1.1-2.4 1.4-3.7h2.9a8 8 0 0 1-4.3 3.7ZM16.4 14a17 17 0 0 0 0-4h3.3a8 8 0 0 1 0 4h-3.3Z",
  sun: "M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-13V1m0 22v-3M4.2 4.2 2.1 2.1m19.8 19.8-2.1-2.1M4 12H1m22 0h-3M4.2 19.8l-2.1 2.1M21.9 2.1l-2.1 2.1",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
  arrow: "M5 12h14m-7-7 7 7-7 7",
  up: "M12 19V5m-7 7 7-7 7 7",
  ext: "M14 3h7v7m0-7L10 14M19 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6",
  check: "m4 12 5 5L20 6",
  download: "M12 3v12m0 0 4-4m-4 4-4-4M4 19h16",
  menu: "M3 6h18M3 12h18M3 18h18",
  x: "M6 6l12 12M18 6 6 18",
};

export function Icon({ name, size = 18, className, stroke }: { name: string; size?: number; className?: string; stroke?: boolean }) {
  const d = PATHS[name] ?? PATHS.globe;
  const isStroke = stroke ?? ["sun", "moon", "arrow", "up", "ext", "check", "download", "menu", "x"].includes(name);
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      className={className}
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : "none"}
      strokeWidth={isStroke ? 2 : 0}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

/* --------------------------------------------------------------- CAROUSEL
   Accessible, auto-advancing slider used for testimonials + showreel.     */
export function useCarousel(len: number, ms = 5200) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || len < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms, paused]);
  const step = useCallback((d: number) => setI((v) => (v + d + len) % len), [len]);
  return { i, setI, step, setPaused };
}
