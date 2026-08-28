/* =========================================================================
   SITE CHROME — preloader, custom cursor, ambient FX layers,
   scroll progress bar, back-to-top and the sticky "hire me" CTA.
   ========================================================================= */
import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";
import { useApp } from "../lib/store";
import { PROFILE } from "../lib/data";

/* ------------------------------------------------------------ PRELOADER */
export function Preloader() {
  const { tr } = useApp();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 18 + 6);
      setPct(Math.round(v));
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 380);
      }
    }, 130);
    return () => clearInterval(id);
  }, []);

  const boot = [
    "mounting design tokens",
    "warming glass surfaces",
    "linking constellation field",
    "resolving locale · my / en / th",
    "portfolio ready",
  ];
  const step = Math.min(boot.length - 1, Math.floor((pct / 100) * boot.length));

  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden={done} role="status" aria-live="polite">
      {/* Ambient wash behind the loader */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
           style={{ background: "radial-gradient(46% 40% at 50% 46%, color-mix(in srgb, var(--neon-cyan) 12%, transparent), transparent 70%)" }} />

      <div className="relative w-[min(88vw,440px)] text-center">
        <div className="avatar-ring mx-auto mb-7 h-24 w-24">
          <div className="grid h-full w-full place-items-center rounded-full" style={{ background: "var(--bg-0)" }}>
            <span className="grad-text font-display text-2xl font-black">MKA</span>
          </div>
        </div>

        <p className="font-display text-[13px] font-bold uppercase tracking-[0.22em] text-hi">Moe Kyaw Aung</p>
        <p className="mt-1 font-mono-tech text-[10.5px] uppercase tracking-[0.3em] text-dim">{tr("loading")}</p>

        {/* Segmented progress bar */}
        <div className="mt-5 flex gap-1" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => {
            const on = (i / 28) * 100 <= pct;
            return (
              <span key={i} className="h-[5px] flex-1 transition-all duration-200"
                    style={{
                      background: on ? "linear-gradient(90deg, var(--neon-cyan), var(--neon-pink))" : "var(--glass-flat)",
                      boxShadow: on ? "0 0 8px -2px var(--neon-cyan)" : "none",
                    }} />
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between font-mono-tech text-[10.5px]">
          <span className="text-dim">▸ {boot[step]}</span>
          <span className="tabular-nums" style={{ color: "var(--neon-cyan)" }}>{String(pct).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- CUSTOM CURSOR */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const t = e.target as HTMLElement | null;
      const hot = !!t?.closest?.("[data-cursor='hot'], a, button, [role='button']");
      const txt = !!t?.closest?.("input, textarea, [contenteditable='true']");
      ring.current?.classList.toggle("hot", hot && !txt);
      ring.current?.classList.toggle("txt", txt);
    };

    const loop = () => {
      // Critically-damped follow — reads as "weighted", not laggy
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
      if (ring.current) {
        const cl = ring.current.classList;
        const sw = cl.contains("txt") ? 6 : cl.contains("hot") ? 30 : 17;
        const sh = cl.contains("txt") ? 23 : cl.contains("hot") ? 30 : 17;
        ring.current.style.transform = `translate3d(${rx - sw}px, ${ry - sh}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

/* ----------------------------------------------------- SHORTCUT HINT
   A single, dismissible toast introducing the command palette. Appears
   once the preloader clears, then retires itself after 9 seconds.       */
export function ShortcutHint({ onCommand }: { onCommand: () => void }) {
  const [show, setShow] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const inT = setTimeout(() => setShow(true), 2600);
    const outT = setTimeout(() => setShow(false), 11600);
    return () => { clearTimeout(inT); clearTimeout(outT); };
  }, []);

  return (
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-[85] -translate-x-1/2 transition-all duration-500 md:bottom-6 md:left-auto md:right-24 md:translate-x-0"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="glass-strong clip-tag flex items-center gap-3 px-4 py-2.5">
        <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim">Press</span>
        <kbd className="clip-tag border px-2 py-1 font-mono-tech text-[11px]"
             style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}>
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
        <button onClick={() => { onCommand(); setShow(false); }}
                className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-hi underline decoration-dotted underline-offset-4">
          to navigate
        </button>
        <button onClick={() => setShow(false)} aria-label="Dismiss hint" className="ml-1 text-dim hover:text-[var(--neon-pink)]">
          <Icon name="x" size={13} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- AMBIENT LAYERS */
export function Ambient() {
  return (
    <>
      <div className="fx-aurora" aria-hidden="true" />
      <div className="fx-grid" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />
      <div className="fx-noise" aria-hidden="true" />
      <div className="fx-scanlines" aria-hidden="true" />
    </>
  );
}

/* --------------------------------------------------------- SCROLL METER */
export function ScrollMeter() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? (scrollY / h) * 100 : 0;
      if (bar.current) bar.current.style.width = `${p}%`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[70] h-[3px] w-full" aria-hidden="true" style={{ background: "transparent" }}>
      <div ref={bar} className="h-full" style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-pink), var(--neon-yellow))", boxShadow: "0 0 12px var(--neon-cyan)" }} />
    </div>
  );
}

/* ------------------------------------------------- BACK TO TOP + STICKY */
export function FloatingActions({ onCommand }: { onCommand?: () => void }) {
  const { tr, go } = useApp();
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShow(scrollY > 400);
      const h = document.documentElement.scrollHeight - innerHeight;
      setPct(h > 0 ? Math.min(scrollY / h, 1) : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <>
      {/* Sticky call-to-action — always reachable on every page */}
      <div className="fixed bottom-5 left-5 z-[80] hidden flex-col gap-2 md:flex">
        <a
          href={`mailto:${PROFILE.email}?subject=Project%20enquiry`}
          className="clip-tag inline-flex items-center gap-2 px-4 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-transform hover:scale-105"
          style={{ background: "linear-gradient(100deg, var(--neon-yellow), var(--neon-lime))", boxShadow: "0 12px 34px -10px rgba(182,255,61,.75)" }}
          data-cursor="hot"
        >
          <Icon name="mail" size={15} /> {tr("hireMe")}
        </a>
        {onCommand && (
          <button
            onClick={onCommand}
            className="clip-tag inline-flex items-center gap-2 border px-4 py-2 font-mono-tech text-[10.5px] uppercase tracking-[0.16em] backdrop-blur-md transition-colors hover:bg-white/8"
            style={{ borderColor: "var(--stroke)", color: "var(--txt-dim)", background: "color-mix(in srgb, var(--bg-1) 60%, transparent)" }}
            aria-label="Open command palette"
            data-cursor="hot"
          >
            ⌘K · quick nav
          </button>
        )}
      </div>

      {/* Back to top — with a live scroll-progress ring */}
      <button
        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
        aria-label={tr("backTop")}
        className="fixed bottom-20 right-4 z-[80] grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 md:bottom-5 md:right-5"
        style={{
          borderColor: "var(--stroke)",
          background: "color-mix(in srgb, var(--bg-1) 86%, transparent)",
          backdropFilter: "blur(10px)",
          color: "var(--neon-cyan)",
          opacity: show ? 1 : 0,
          transform: show ? "none" : "translateY(18px) scale(.85)",
          pointerEvents: show ? "auto" : "none",
          boxShadow: "0 0 26px -8px var(--neon-cyan)",
        }}
        data-cursor="hot"
      >
        <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r={R} fill="none" stroke="var(--stroke)" strokeWidth="1.5" />
          <circle
            cx="24" cy="24" r={R} fill="none" stroke="var(--neon-cyan)" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C - C * pct}
            style={{ filter: "drop-shadow(0 0 4px var(--neon-cyan))", transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <span className="relative"><Icon name="up" size={19} /></span>
      </button>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-[75] flex items-center justify-between gap-3 border-t px-4 py-2.5 backdrop-blur-xl md:hidden"
           style={{ borderColor: "var(--stroke)", background: "color-mix(in srgb, var(--bg-0) 88%, transparent)" }}>
        <div className="min-w-0">
          <p className="truncate font-display text-[11px] font-bold uppercase tracking-[0.14em] text-hi">{PROFILE.name}</p>
          <p className="truncate font-mono-tech text-[10px] text-dim">{PROFILE.phone1}</p>
        </div>
        <button
          onClick={() => go("contact")}
          className="clip-tag shrink-0 px-4 py-2 font-display text-[10.5px] font-bold uppercase tracking-[0.16em] text-black"
          style={{ background: "linear-gradient(100deg, var(--neon-cyan), var(--neon-pink))" }}
        >
          {tr("contactMe")}
        </button>
      </div>
    </>
  );
}
