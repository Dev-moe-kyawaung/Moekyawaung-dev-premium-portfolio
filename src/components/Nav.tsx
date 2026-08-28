/* =========================================================================
   STICKY NAVIGATION — scroll-aware glow, Myanmar/English/Thai labels,
   grouped mega-menu, language + currency + theme switchers,
   and a full-height mobile drawer.
   ========================================================================= */
import { useEffect, useState } from "react";
import { ROUTES, type Route, PROFILE } from "../lib/data";
import { useApp, type Lang } from "../lib/store";
import { Icon } from "./ui";
import { cn } from "../utils/cn";

const GROUPS: Route["group"][] = ["Main", "Work", "Engineering", "People", "System", "Collections"];
const GROUP_LABEL: Record<string, { en: string; my: string; th: string }> = {
  Main: { en: "Overview", my: "အထွေထွေ", th: "ภาพรวม" },
  Work: { en: "Work", my: "လက်ရာ", th: "ผลงาน" },
  Engineering: { en: "Engineering", my: "အင်ဂျင်နီယာ", th: "วิศวกรรม" },
  People: { en: "People", my: "လူများ", th: "ผู้คน" },
  System: { en: "System", my: "စနစ်", th: "ระบบ" },
  Collections: { en: "Collections", my: "စုစည်းမှု", th: "คอลเลกชัน" },
};

const LANGS: { id: Lang; flag: string; label: string }[] = [
  { id: "en", flag: "🌐", label: "EN" },
  { id: "my", flag: "🇲🇲", label: "MY" },
  { id: "th", flag: "🇹🇭", label: "TH" },
];

export default function Nav({
  onCommand, onResume,
}: { onCommand?: () => void; onResume?: () => void }) {
  const { lang, setLang, cur, setCur, theme, toggleTheme, route, go, tr } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const label = (r: Route) => r[lang];
  const nav = (id: string) => { go(id); setOpen(false); setMenu(null); };

  return (
    <>
      {/* Skip link — handled with JS so it never collides with the hash router */}
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const m = document.getElementById("main");
          if (m) { m.setAttribute("tabindex", "-1"); m.focus(); m.scrollIntoView({ behavior: "smooth" }); }
        }}
      >
        Skip to main content
      </a>

      <header
        className={cn("fixed inset-x-0 top-0 z-[90] transition-all duration-500")}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, color-mix(in srgb, var(--bg-0) 92%, transparent), color-mix(in srgb, var(--bg-0) 72%, transparent))"
            : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(180%)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--stroke)" : "transparent"}`,
          boxShadow: scrolled ? "0 14px 50px -30px var(--neon-cyan), inset 0 1px 0 rgba(255,255,255,.07)" : "none",
        }}
      >
        {/* Hairline accent that appears with the glass */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
          style={{
            opacity: scrolled ? 1 : 0,
            background: "linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-pink), transparent)",
          }}
        />
        <nav className="shell flex items-center justify-between gap-3" style={{ height: "var(--nav-h)" }} aria-label="Primary">
          {/* ---------------------------------------------------- BRAND */}
          <button onClick={() => nav("home")} className="flex shrink-0 items-center gap-2.5" aria-label="Go to home" data-cursor="hot">
            <span className="avatar-ring h-9 w-9">
              <span className="grid h-full w-full place-items-center rounded-full" style={{ background: "var(--bg-0)" }}>
                <span className="font-display text-[11px] font-black grad-text">MKA</span>
              </span>
            </span>
            <span className="hidden text-left leading-none sm:block">
              <span className="block font-display text-[13px] font-black tracking-[0.06em] text-hi">MOE KYAW AUNG</span>
              <span className="block font-mono-tech text-[9.5px] uppercase tracking-[0.24em]" style={{ color: "var(--neon-cyan)" }}>
                Senior Android · Flutter
              </span>
            </span>
          </button>

          {/* ------------------------------------------- DESKTOP MEGA NAV */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {GROUPS.map((g) => {
              const items = ROUTES.filter((r) => r.group === g);
              const active = items.some((r) => r.id === route);
              return (
                <li key={g} className="relative" onMouseEnter={() => setMenu(g)} onMouseLeave={() => setMenu(null)}>
                  <button
                    className={cn("px-3 py-2 font-display text-[11.5px] font-bold uppercase tracking-[0.14em] transition-colors")}
                    style={{ color: active ? "var(--neon-cyan)" : "var(--txt)" }}
                    aria-expanded={menu === g}
                    aria-haspopup="true"
                    onClick={() => setMenu(menu === g ? null : g)}
                  >
                    {GROUP_LABEL[g][lang]}
                  </button>
                  {menu === g && (
                    <div className="absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-2">
                      <ul className="glass clip-cyber-sm max-h-[68vh] overflow-y-auto p-2">
                        {items.map((r) => (
                          <li key={r.id}>
                            <button
                              onClick={() => nav(r.id)}
                              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-white/8"
                              style={{ color: r.id === route ? "var(--neon-pink)" : "var(--txt)" }}
                            >
                              <span>{label(r)}</span>
                              <Icon name="arrow" size={13} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* --------------------------------------------------- CONTROLS */}
          <div className="flex items-center gap-1.5">
            {/* Language switcher */}
            <div className="hidden items-center gap-0.5 border p-0.5 sm:flex clip-tag" style={{ borderColor: "var(--stroke)" }} role="group" aria-label="Language">
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  aria-pressed={lang === l.id}
                  className="px-2 py-1 font-mono-tech text-[10.5px] tracking-wider transition-colors"
                  style={{ background: lang === l.id ? "var(--neon-cyan)" : "transparent", color: lang === l.id ? "#04121a" : "var(--txt-dim)" }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            {/* Currency switcher */}
            <select
              value={cur}
              onChange={(e) => setCur(e.target.value as any)}
              aria-label="Currency"
              className="hidden clip-tag cursor-pointer border bg-transparent px-2 py-1.5 font-mono-tech text-[10.5px] text-hi md:block"
              style={{ borderColor: "var(--stroke)" }}
            >
              <option value="USD" style={{ background: "#0a0c14" }}>USD $</option>
              <option value="THB" style={{ background: "#0a0c14" }}>THB ฿</option>
              <option value="MMK" style={{ background: "#0a0c14" }}>MMK K</option>
            </select>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="grid h-9 w-9 place-items-center border transition-colors clip-tag"
              style={{ borderColor: "var(--stroke)", color: "var(--neon-yellow)" }}
              data-cursor="hot"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
            </button>

            {/* Command palette trigger */}
            {onCommand && (
              <button
                onClick={onCommand}
                aria-label="Open command palette"
                className="clip-tag hidden items-center gap-2 border px-3 py-1.5 font-mono-tech text-[11px] transition-colors hover:bg-white/6 md:inline-flex"
                style={{ borderColor: "var(--stroke)", color: "var(--txt-dim)" }}
                data-cursor="hot"
              >
                <Icon name="arrow" size={13} />
                <span className="hidden lg:inline">Search</span>
                <kbd className="rounded border px-1.5 py-0.5 text-[9.5px]" style={{ borderColor: "var(--stroke)" }}>
                  {isMac ? "⌘" : "Ctrl"}K
                </kbd>
              </button>
            )}

            {/* Résumé drawer trigger */}
            {onResume && (
              <button
                onClick={onResume}
                aria-label="Download resume"
                className="clip-tag hidden h-9 w-9 place-items-center border transition-colors hover:bg-white/6 sm:grid"
                style={{ borderColor: "var(--stroke)", color: "var(--neon-lime)" }}
                data-cursor="hot"
              >
                <Icon name="download" size={16} />
              </button>
            )}

            {/* Desktop CTA */}
            <button
              onClick={() => nav("contact")}
              className="clip-tag hidden px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-black xl:block"
              style={{ background: "linear-gradient(100deg, var(--neon-cyan), var(--neon-pink))", boxShadow: "0 10px 30px -12px rgba(0,240,255,.7)" }}
              data-cursor="hot"
            >
              {tr("contactMe")}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label={tr("navMenu")}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center border lg:hidden clip-tag"
              style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)" }}
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- MOBILE DRAWER */}
      <div
        className="fixed inset-0 z-[95] lg:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
          onClick={() => setOpen(false)}
        />
        <aside
          className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col border-l transition-transform duration-400"
          style={{
            borderColor: "var(--stroke)",
            background: "color-mix(in srgb, var(--bg-1) 96%, transparent)",
            transform: open ? "none" : "translateX(100%)",
          }}
          role="dialog" aria-modal="true" aria-label="Site navigation"
        >
          <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--stroke)" }}>
            <span className="font-display text-sm font-black grad-text">NAVIGATION</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center border" style={{ borderColor: "var(--stroke)", color: "var(--neon-pink)" }}>
              <Icon name="x" size={17} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {GROUPS.map((g) => (
              <section key={g} className="mb-5">
                <h2 className="mb-2 font-mono-tech text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-yellow)" }}>
                  {GROUP_LABEL[g][lang]}
                </h2>
                <ul className="space-y-0.5">
                  {ROUTES.filter((r) => r.group === g).map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => nav(r.id)}
                        className="flex w-full items-center justify-between gap-2 border-b py-2 text-left text-[14.5px]"
                        style={{ borderColor: "var(--stroke-soft)", color: r.id === route ? "var(--neon-cyan)" : "var(--txt)" }}
                      >
                        {label(r)}
                        {r.id === route && <span className="font-mono-tech text-[10px]">●</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="border-t px-5 py-4" style={{ borderColor: "var(--stroke)" }}>
            {/* Quick actions inside the drawer */}
            <div className="mb-3 grid grid-cols-2 gap-1.5">
              {onCommand && (
                <button onClick={() => { setOpen(false); onCommand(); }}
                  className="clip-tag border py-2 font-mono-tech text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}>
                  ⌘K Search
                </button>
              )}
              {onResume && (
                <button onClick={() => { setOpen(false); onResume(); }}
                  className="clip-tag border py-2 font-mono-tech text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--neon-lime)", color: "var(--neon-lime)" }}>
                  ↓ Résumé
                </button>
              )}
            </div>
            <div className="mb-3 flex gap-1.5">
              {LANGS.map((l) => (
                <button key={l.id} onClick={() => setLang(l.id)}
                  className="flex-1 border py-1.5 font-mono-tech text-[11px]"
                  style={{ borderColor: "var(--stroke)", background: lang === l.id ? "var(--neon-cyan)" : "transparent", color: lang === l.id ? "#04121a" : "var(--txt-dim)" }}>
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            <a href={`tel:${PROFILE.phone1.replace(/\s/g, "")}`} className="block font-mono-tech text-xs text-dim">{PROFILE.phone1}</a>
            <a href={`mailto:${PROFILE.email}`} className="block font-mono-tech text-xs" style={{ color: "var(--neon-cyan)" }}>{PROFILE.email}</a>
          </div>
        </aside>
      </div>
    </>
  );
}
