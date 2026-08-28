/* =========================================================================
   PREMIUM FX — the layer that separates "nice template" from "crafted".
   Canvas constellation field · split-text reveal · spotlight surfaces ·
   odometer numerals · marquee bands · page-transition curtain.
   Every effect degrades gracefully under prefers-reduced-motion.
   ========================================================================= */
import {
  useEffect, useRef, useState, type ReactNode, type CSSProperties,
} from "react";
import { cn } from "../utils/cn";
import { useInView } from "./ui";

/* Shared helper — is motion allowed right now? */
export const motionOK = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  document.documentElement.dataset.motion !== "off";

/* =========================================================== CONSTELLATION
   A lightweight particle field with proximity linking and gentle cursor
   attraction. Capped particle count + DPR clamp keeps it under 1ms/frame. */
export function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !motionOK()) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let pts: P[] = [];

    const palette = ["0,240,255", "255,43,209", "139,92,255", "245,255,61"];

    const seed = () => {
      const target = Math.min(96, Math.round((w * h) / 22000));
      pts = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.6,
        c: palette[(Math.random() * palette.length) | 0],
      }));
    };

    const resize = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        // Gentle attraction toward the pointer
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000 && d2 > 1) {
          const f = 0.00016;
          p.vx += dx * f; p.vy += dy * f;
        }
        p.vx *= 0.994; p.vy *= 0.994;
        p.x += p.vx; p.y += p.vy;

        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.62)`;
        ctx.fill();
      }

      // Proximity links — O(n²) but n ≤ 96 so it stays cheap
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.c},${(0.19 * (1 - d2 / 15000)).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas" aria-hidden="true" />;
}

/* ============================================================== SPLIT TEXT
   Per-character staggered entrance. Preserves word boundaries so text still
   wraps naturally, and exposes the full string to assistive tech.          */
export function SplitText({
  text, className, delay = 0, stagger = 22, as: As = "span",
}: { text: string; className?: string; delay?: number; stagger?: number; as?: any }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.25);
  const words = text.split(" ");
  let k = 0;

  return (
    <As ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {[...word].map((ch, ci) => {
            const d = delay + k++ * stagger;
            return (
              <span key={ci} className={cn("split-ch", inView && "in")} style={{ transitionDelay: `${d}ms` }}>
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="split-ch in">&nbsp;</span>}
        </span>
      ))}
    </As>
  );
}

/* =============================================================== SPOTLIGHT
   Wraps any surface and tracks the pointer as CSS variables so the glow is
   painted by the compositor rather than React.                             */
export function Spotlight({
  children, className, color = "var(--neon-cyan)", style, brackets = true,
}: { children: ReactNode; className?: string; color?: string; style?: CSSProperties; brackets?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
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
      onMouseMove={onMove}
      className={cn("spot", brackets && "brackets", className)}
      style={{ ["--spot-c" as any]: color, ["--brk-c" as any]: color, ...style }}
    >
      {children}
    </div>
  );
}

/* ================================================================ ODOMETER
   Digit-roll counter. Each column translates its own 0–9 strip, which reads
   far more "engineered" than a plain incrementing number.                  */
export function Odometer({
  value, suffix = "", className, duration = 1700,
}: { value: number; suffix?: string; className?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (!motionOK()) { setN(value); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const digits = String(n).padStart(String(value).length, "0").split("");

  return (
    <span ref={ref} className={cn("inline-flex items-baseline tabular-nums", className)} aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block overflow-hidden" style={{ height: "1em", width: "0.62em" }} aria-hidden="true">
          <span
            className="absolute left-0 top-0 flex flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${-Number(d) * 100}%)` }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
              <span key={x} style={{ height: "1em", lineHeight: "1em" }}>{x}</span>
            ))}
          </span>
        </span>
      ))}
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}

/* ================================================================= MARQUEE */
export function Marquee({
  items, speed = "normal", reverse, tone,
}: { items: string[]; speed?: "normal" | "fast"; reverse?: boolean; tone?: string }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className={cn("marquee gap-9", speed === "fast" && "marquee-fast", reverse && "marquee-rev")}>
        {row.map((p, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 font-mono-tech text-[12px] uppercase tracking-[0.22em] text-dim">
            <span style={{ color: tone ?? ["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)"][i % 3] }}>◆</span>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ========================================================= DISPLAY MARQUEE
   Oversized editorial band — used as a section divider.                    */
export function BandMarquee({ text, reverse }: { text: string; reverse?: boolean }) {
  const row = Array.from({ length: 8 }, () => text);
  return (
    <div className="relative z-10 overflow-hidden border-y py-3.5" style={{ borderColor: "var(--stroke)" }} aria-hidden="true">
      <div className={cn("marquee marquee-fast gap-8", reverse && "marquee-rev")}>
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            <span
              className="font-display text-[clamp(1.1rem,2.6vw,1.9rem)] font-black uppercase tracking-tight"
              style={{ color: i % 2 ? "transparent" : "var(--txt-hi)", WebkitTextStroke: i % 2 ? "1px var(--neon-cyan)" : undefined, opacity: i % 2 ? 0.85 : 0.14 }}
            >
              {t}
            </span>
            <span className="text-lg" style={{ color: "var(--neon-pink)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================= CURTAIN
   Fires a wipe on every route change so navigation feels authored.         */
export function Curtain({ trigger }: { trigger: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = ref.current;
    if (!el || !motionOK()) return;
    el.classList.remove("run");
    void el.offsetWidth; // force reflow to restart the animation
    el.classList.add("run");
  }, [trigger]);

  return <div ref={ref} className="curtain" aria-hidden="true" />;
}

/* ============================================================ SCROLL SCENE
   Maps section scroll progress (0→1) to a CSS variable so children can
   drive any property without extra listeners.                              */
export function ScrollScene({
  children, className, from = 0.9, to = 1.06,
}: { children: ReactNode; className?: string; from?: number; to?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(Math.max(1 - (r.top + r.height * 0.3) / window.innerHeight, 0), 1);
        el.style.setProperty("--p", p.toFixed(3));
        el.style.transform = `scale(${(from + (to - from) * p).toFixed(4)})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [from, to]);
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}

/* ============================================================= KICKER RULE
   Numbered editorial section index: 01 ──── LABEL                          */
export function Kicker({ index, label, color = "var(--neon-cyan)" }: { index?: string; label: string; color?: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      {index && <span className="font-mono-tech text-[11px] tabular-nums" style={{ color }}>{index}</span>}
      <span className="h-px w-9" style={{ background: color }} />
      <span className="font-mono-tech text-[11px] uppercase tracking-[0.34em]" style={{ color }}>{label}</span>
    </div>
  );
}

/* ================================================================= LAZY IMG
   Fades in with a shimmer placeholder — removes the "pop" of raw <img>.    */
export function Img({
  src, alt, className, style, eager,
}: { src: string; alt: string; className?: string; style?: CSSProperties; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={cn("relative block overflow-hidden", !loaded && "shimmer")} style={style}>
      <img
        src={src} alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(className, "transition-opacity duration-700")}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </span>
  );
}
