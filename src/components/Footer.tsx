/* =========================================================================
   FAT FOOTER — newsletter signup, grouped quick links, Google Maps embed,
   social icon grid, language + currency selectors and legal line.
   ========================================================================= */
import { useState } from "react";
import { MEDIA, PROFILE, ROUTES, SOCIALS, type Route } from "../lib/data";
import { useApp, type Lang } from "../lib/store";
import { Icon, Reveal } from "./ui";

const COLS: { key: Route["group"]; en: string; my: string; th: string }[] = [
  { key: "Main", en: "Overview", my: "အထွေထွေ", th: "ภาพรวม" },
  { key: "Work", en: "Work", my: "လက်ရာ", th: "ผลงาน" },
  { key: "Engineering", en: "Engineering", my: "အင်ဂျင်နီယာ", th: "วิศวกรรม" },
  { key: "People", en: "People", my: "လူများ", th: "ผู้คน" },
  { key: "Collections", en: "Collections", my: "စုစည်းမှု", th: "คอลเลกชัน" },
];

export default function Footer() {
  const { lang, setLang, cur, setCur, tr, go } = useApp();
  const [mail, setMail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side validation — no backend in a static single-file build.
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail)) { setState("err"); return; }
    setState("ok");
    setMail("");
  };

  return (
    <footer className="relative z-10 mt-10 border-t pb-24 pt-14 md:pb-10" style={{ borderColor: "var(--stroke)", background: "color-mix(in srgb, var(--bg-1) 70%, transparent)" }}>
      <div className="shell">

        {/* ------------------------------------------------- NEWSLETTER */}
        <Reveal>
          <div className="glass clip-cyber mb-10 grid gap-6 p-7 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-yellow)" }}>
                {tr("newsletter")}
              </p>
              <h2 className="mt-2 text-[clamp(1.3rem,3vw,1.9rem)] font-black leading-tight">
                Mobile engineering notes, <span className="grad-text">once a month</span>.
              </h2>
              <p className="mt-2 text-[14.5px] text-body">
                Architecture patterns, performance traces and release lessons from real production Android and Flutter work. No recruiter spam, unsubscribe any time.
              </p>
            </div>
            <form onSubmit={subscribe} noValidate>
              <label htmlFor="nl-email" className="mb-1.5 block font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">
                {tr("formEmail")}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="nl-email" type="email" value={mail} required
                  onChange={(e) => { setMail(e.target.value); setState("idle"); }}
                  placeholder="you@company.com"
                  aria-invalid={state === "err"}
                  aria-describedby="nl-msg"
                  className="clip-tag min-w-0 flex-1 border bg-transparent px-4 py-3 text-[15px] text-hi outline-none placeholder:text-[var(--txt-dim)]"
                  style={{ borderColor: state === "err" ? "var(--neon-pink)" : "var(--stroke)" }}
                />
                <button
                  type="submit"
                  className="clip-tag px-6 py-3 font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-black"
                  style={{ background: "linear-gradient(100deg, var(--neon-cyan), var(--neon-pink))" }}
                >
                  {tr("subscribe")}
                </button>
              </div>
              <p id="nl-msg" role="status" className="mt-2 font-mono-tech text-[11.5px]"
                 style={{ color: state === "ok" ? "var(--neon-lime)" : state === "err" ? "var(--neon-pink)" : "var(--txt-dim)" }}>
                {state === "ok" ? `✓ ${tr("subscribed")}` : state === "err" ? `✕ ${tr("errEmail")}` : "We store nothing beyond your address."}
              </p>
            </form>
          </div>
        </Reveal>

        {/* --------------------------------------------- LINKS + CONTACT */}
        <div className="grid gap-9 lg:grid-cols-[1.15fr_2.2fr]">
          {/* Brand + contact + map */}
          <div>
            <div className="flex items-center gap-3">
              <span className="avatar-ring h-12 w-12">
                <img src={MEDIA.portrait2} alt="Moe Kyaw Aung"
                     className="h-full w-full rounded-full object-cover" loading="lazy" />
              </span>
              <div>
                <p className="font-display text-[15px] font-black text-hi">{PROFILE.name}</p>
                <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>{PROFILE.nameMm}</p>
              </div>
            </div>

            <p className="mt-4 text-[14.5px] leading-relaxed text-body">
              Senior Android &amp; Flutter developer. Clean architecture, measurable performance, and releases that hold up in the real world.
            </p>

            <ul className="mt-4 space-y-1.5 text-[14px]">
              <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={14} />{PROFILE.email}</a></li>
              <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href="tel:+959889000889"><Icon name="phone" size={14} />{PROFILE.phone1}</a></li>
              <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href="tel:+959666000050"><Icon name="phone" size={14} />{PROFILE.phone2}</a></li>
              <li className="inline-flex items-center gap-2 text-dim"><Icon name="globe" size={14} />{PROFILE.location}</li>
            </ul>

            {/* Google Maps embed — Tachileik ↔ Bangkok base */}
            <div className="clip-cyber-sm mt-5 overflow-hidden border" style={{ borderColor: "var(--stroke)" }}>
              <iframe
                title="Base location — Tachileik, Myanmar"
                src="https://www.google.com/maps?q=Tachileik,+Myanmar&output=embed"
                width="100%" height="180" loading="lazy" style={{ border: 0, filter: "invert(.92) hue-rotate(180deg) saturate(1.2)" }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              {COLS.map((c) => (
                <nav key={c.key} aria-label={c.en}>
                  <h3 className="mb-2.5 font-mono-tech text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--neon-yellow)" }}>
                    {c[lang]}
                  </h3>
                  <ul className="space-y-1.5">
                    {ROUTES.filter((r) => r.group === c.key).map((r) => (
                      <li key={r.id}>
                        <button onClick={() => go(r.id)} className="text-left text-[13.5px] text-body transition-colors hover:text-[var(--neon-cyan)]">
                          {r[lang]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* Social icons */}
            <h3 className="mb-3 mt-8 font-mono-tech text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--neon-yellow)" }}>
              Social · 16 verified profiles
            </h3>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url} target="_blank" rel="noreferrer noopener"
                    aria-label={s.name} title={s.name}
                    className="grid h-10 w-10 place-items-center border transition-all duration-300 hover:-translate-y-1 clip-tag"
                    style={{ borderColor: "var(--stroke)", color: s.accent }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 18px -4px ${s.accent}`; e.currentTarget.style.borderColor = s.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--stroke)"; }}
                    data-cursor="hot"
                  >
                    <Icon name={s.icon} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------------------------------- OVERSIZED WORDMARK */}
        <div className="relative mt-12 select-none overflow-hidden" aria-hidden="true">
          <p className="whitespace-nowrap text-center font-display text-[clamp(2.2rem,13vw,10rem)] font-black leading-[0.85] tracking-tighter"
             style={{ color: "transparent", WebkitTextStroke: "1px var(--stroke)" }}>
            MOE KYAW AUNG
          </p>
          <p className="mt-1 text-center font-mono-tech text-[10px] uppercase tracking-[0.44em] text-dim">
            မိုးကျော်အောင် — Senior Android &amp; Flutter Developer
          </p>
        </div>

        <div className="hairline my-8" />

        {/* --------------------------------------------------- BOTTOM BAR */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-mono-tech text-[11.5px] text-dim">
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.nameMm} — Portfolio V000. “{PROFILE.philosophy}”
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Language"
              className="clip-tag cursor-pointer border bg-transparent px-2.5 py-1.5 font-mono-tech text-[11px] text-hi" style={{ borderColor: "var(--stroke)" }}>
              <option value="en" style={{ background: "#0a0c14" }}>🌐 English</option>
              <option value="my" style={{ background: "#0a0c14" }}>🇲🇲 မြန်မာ</option>
              <option value="th" style={{ background: "#0a0c14" }}>🇹🇭 ไทย</option>
            </select>
            <select value={cur} onChange={(e) => setCur(e.target.value as any)} aria-label="Currency"
              className="clip-tag cursor-pointer border bg-transparent px-2.5 py-1.5 font-mono-tech text-[11px] text-hi" style={{ borderColor: "var(--stroke)" }}>
              <option value="USD" style={{ background: "#0a0c14" }}>USD $</option>
              <option value="THB" style={{ background: "#0a0c14" }}>THB ฿</option>
              <option value="MMK" style={{ background: "#0a0c14" }}>MMK K</option>
            </select>
            <button onClick={() => go("legal")} className="font-mono-tech text-[11.5px] text-dim hover:text-[var(--neon-cyan)]">Legal</button>
            <button onClick={() => go("accessibility")} className="font-mono-tech text-[11.5px] text-dim hover:text-[var(--neon-cyan)]">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
