/* =========================================================================
   COMMAND PALETTE (⌘K / Ctrl+K)
   Fuzzy navigation across all 36 routes plus quick actions — copy email,
   toggle theme, switch language/currency, jump to external profiles.
   Full keyboard control, roving focus, and screen-reader announcements.
   ========================================================================= */
import { useEffect, useMemo, useRef, useState } from "react";
import { ROUTES, PROFILE, SOCIALS } from "../lib/data";
import { useApp, type Lang } from "../lib/store";
import { Icon } from "./ui";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: string;
  run: () => void;
  keywords?: string;
};

/* Lightweight subsequence fuzzy match — returns a score, or -1 for no match */
function score(q: string, target: string) {
  if (!q) return 0;
  const t = target.toLowerCase();
  const s = q.toLowerCase();
  if (t.includes(s)) return 100 - t.indexOf(s);
  let ti = 0, hits = 0, streak = 0, best = 0;
  for (const ch of s) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    streak = found === ti ? streak + 1 : 1;
    best = Math.max(best, streak);
    hits++; ti = found + 1;
  }
  return hits * 2 + best * 3;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { go, lang, setLang, setCur, toggleTheme, theme } = useApp();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* ---------------------------------------------------------- ITEM SET */
  const items = useMemo<Item[]>(() => {
    const nav: Item[] = ROUTES.map((r) => ({
      id: `nav-${r.id}`,
      label: r[lang],
      hint: r.group,
      group: "Navigate",
      icon: "arrow",
      keywords: `${r.en} ${r.my} ${r.th} ${r.id}`,
      run: () => go(r.id),
    }));

    const actions: Item[] = [
      { id: "a-mail", label: "Copy primary email", hint: PROFILE.email, group: "Actions", icon: "mail", keywords: "copy email contact",
        run: () => navigator.clipboard?.writeText(PROFILE.email) },
      { id: "a-call", label: "Call directly", hint: PROFILE.phone1, group: "Actions", icon: "phone", keywords: "phone call ring",
        run: () => { window.location.href = "tel:+959889000889"; } },
      { id: "a-theme", label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`, hint: "Appearance", group: "Actions",
        icon: theme === "dark" ? "sun" : "moon", keywords: "theme dark light mode appearance", run: toggleTheme },
      { id: "a-resume", label: "Download resume", hint: "Plain-text CV", group: "Actions", icon: "download", keywords: "cv resume download pdf",
        run: () => go("resume") },
      { id: "a-top", label: "Scroll to top", hint: "Back to top", group: "Actions", icon: "up", keywords: "top scroll up",
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ];

    const langs: Item[] = ([["en", "English 🌐"], ["my", "မြန်မာ 🇲🇲"], ["th", "ไทย 🇹🇭"]] as [Lang, string][]).map(([id, label]) => ({
      id: `l-${id}`, label: `Language — ${label}`, hint: id.toUpperCase(), group: "Preferences", icon: "globe",
      keywords: `language locale ${id} ${label}`, run: () => setLang(id),
    }));

    const curs: Item[] = (["USD", "THB", "MMK"] as const).map((c) => ({
      id: `c-${c}`, label: `Currency — ${c}`, hint: "Pricing display", group: "Preferences", icon: "globe",
      keywords: `currency money price ${c}`, run: () => { setCur(c); go("pricing"); },
    }));

    const social: Item[] = SOCIALS.slice(0, 8).map((s) => ({
      id: `s-${s.name}`, label: s.name, hint: "Open profile ↗", group: "Profiles", icon: s.icon,
      keywords: `social profile ${s.name}`, run: () => window.open(s.url, "_blank", "noreferrer"),
    }));

    return [...nav, ...actions, ...langs, ...curs, ...social];
  }, [lang, theme, go, setLang, setCur, toggleTheme]);

  /* ------------------------------------------------------------ FILTER */
  const results = useMemo(() => {
    if (!q.trim()) return items.slice(0, 40);
    return items
      .map((it) => ({ it, s: Math.max(score(q, it.label), score(q, it.keywords ?? "")) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((x) => x.it);
  }, [q, items]);

  /* Reset selection when the query changes */
  useEffect(() => setSel(0), [q]);

  /* Focus the input and lock scroll while open */
  useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, [open]);

  /* Keyboard handling */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel((v) => (v + 1) % Math.max(results.length, 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel((v) => (v - 1 + results.length) % Math.max(results.length, 1)); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const it = results[sel];
        if (it) { it.run(); onClose(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, sel, onClose]);

  /* Keep the active row in view */
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;

  /* Group results while preserving rank order */
  const grouped: { group: string; rows: { it: Item; i: number }[] }[] = [];
  results.forEach((it, i) => {
    const last = grouped[grouped.length - 1];
    if (last && last.group === it.group) last.rows.push({ it, i });
    else grouped.push({ group: it.group, rows: [{ it, i }] });
  });

  return (
    <div className="cmdk-back grid place-items-start justify-center pt-[12vh]" onClick={onClose}>
      <div
        className="cmdk-panel glass-strong clip-cyber flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-label="Command palette"
      >
        {/* Search field */}
        <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--stroke)" }}>
          <span style={{ color: "var(--neon-cyan)" }} aria-hidden="true"><Icon name="arrow" size={17} /></span>
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, actions, profiles…"
            aria-label="Search commands" aria-autocomplete="list" aria-controls="cmdk-list"
            className="min-w-0 flex-1 bg-transparent font-display text-[15px] text-hi outline-none placeholder:font-sans placeholder:text-[var(--txt-dim)]"
          />
          <kbd className="clip-tag hidden shrink-0 border px-2 py-1 font-mono-tech text-[10px] text-dim sm:block" style={{ borderColor: "var(--stroke)" }}>ESC</kbd>
        </div>

        {/* Results */}
        <ul ref={listRef} id="cmdk-list" role="listbox" aria-label="Results" className="flex-1 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-10 text-center">
              <p className="font-display text-[14px] text-hi">No match for “{q}”</p>
              <p className="mt-1 font-mono-tech text-[11.5px] text-dim">Try “performance”, “pricing”, or “kotlin”.</p>
            </li>
          )}
          {grouped.map((g) => (
            <li key={g.group + g.rows[0].i}>
              <p className="px-3 pb-1 pt-3 font-mono-tech text-[9.5px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-yellow)" }}>
                {g.group}
              </p>
              <ul>
                {g.rows.map(({ it, i }) => {
                  const active = i === sel;
                  return (
                    <li key={it.id}>
                      <button
                        data-i={i}
                        role="option" aria-selected={active}
                        onMouseEnter={() => setSel(i)}
                        onClick={() => { it.run(); onClose(); }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors clip-tag"
                        style={{
                          background: active ? "color-mix(in srgb, var(--neon-cyan) 13%, transparent)" : "transparent",
                          borderLeft: `2px solid ${active ? "var(--neon-cyan)" : "transparent"}`,
                        }}
                      >
                        <span className="shrink-0" style={{ color: active ? "var(--neon-cyan)" : "var(--txt-dim)" }}>
                          <Icon name={it.icon} size={15} />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[14.5px]" style={{ color: active ? "var(--txt-hi)" : "var(--txt)" }}>
                          {it.label}
                        </span>
                        <span className="hidden shrink-0 font-mono-tech text-[10.5px] text-dim sm:block">{it.hint}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footer legend */}
        <div className="flex items-center justify-between gap-4 border-t px-5 py-2.5" style={{ borderColor: "var(--stroke)" }}>
          <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-dim">
            <span><kbd style={{ color: "var(--neon-cyan)" }}>↑↓</kbd> navigate</span>
            <span><kbd style={{ color: "var(--neon-cyan)" }}>↵</kbd> select</span>
            <span className="hidden sm:inline"><kbd style={{ color: "var(--neon-cyan)" }}>esc</kbd> close</span>
          </div>
          <span className="font-mono-tech text-[10px] text-dim" aria-live="polite">{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
