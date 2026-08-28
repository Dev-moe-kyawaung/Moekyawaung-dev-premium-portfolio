/* =========================================================================
   SYSTEM PAGES — Pricing · FAQ · Accessibility · Localization · Legal
   ========================================================================= */
import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import { Btn, Card, Icon, Reveal, Section, SectionHead, Accordion } from "../components/ui";
import { Bullets, FaqBlock, InfoGrid, PricingBlock } from "../components/sections";
import { FX, PROFILE } from "../lib/data";
import { useApp } from "../lib/store";

/* ================================================================== PRICING */
export function Pricing() {
  const { cur, go } = useApp();
  return (
    <>
      <PageHero
        kicker="Pricing · ဈေးနှုန်း"
        accent="var(--neon-yellow)"
        title={<>Transparent rates in <span className="grad-text">MMK, THB and USD.</span></>}
        lead="Published because chasing a quote wastes both our time. If your budget is different, say so — scope is usually the flexible part, not quality."
        meta={[`Displaying ${cur}`, "No hidden fees", "50% upfront", "Invoiced monthly"]}
        actions={<>
          <Btn variant="primary" onClick={() => go("contact")}>Discuss a project</Btn>
          <Btn variant="wire" onClick={() => go("services")}>See service scope</Btn>
        </>}
      />

      <Section tight><PricingBlock /></Section>

      <Section>
        <SectionHead label="Conversion" title="Reference rates used on this page"
          sub="Fixed reference rates for display only. Final invoices use the mid-market rate on the invoice date." />
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(FX) as (keyof typeof FX)[]).map((k, i) => (
            <Reveal key={k} delay={i * 70}>
              <Card className="text-center">
                <p className="font-display text-2xl font-black" style={{ color: ["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)"][i] }}>
                  {FX[k].symbol} {k}
                </p>
                <p className="mt-1 font-mono-tech text-[12px] text-dim">1 USD = {FX[k].rate.toLocaleString()} {k}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Terms" title="How billing works" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card hover={false} className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Payment terms</h3>
              <div className="mt-3">
                <Bullets tone="yellow" items={[
                  "50% on engagement start, 50% on delivery for fixed-scope work.",
                  "Retainers invoiced monthly in advance, net-7.",
                  "Bank transfer (THB / USD), Wise, or PayPal. MMK by local transfer.",
                  "Rates are exclusive of VAT or withholding tax where applicable.",
                  "Unused retainer hours roll over one month, then expire.",
                ]} />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={90}>
            <Card hover={false} className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">What's included</h3>
              <div className="mt-3">
                <Bullets tone="lime" items={[
                  "Written deliverable in English, with a Burmese summary on request.",
                  "A walkthrough call at handover — recorded if your team wants it.",
                  "30 days of follow-up questions by email at no extra cost.",
                  "All code and documents are yours; I keep no rights over deliverables.",
                  "NDA signed before repository access, always.",
                ]} />
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead label="FAQ" title="Pricing questions" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={[
            { q: "Can you work below these rates?", a: "Sometimes — for early-stage teams in Myanmar, for open-source work, or where the scope can be genuinely reduced. What I won't do is keep the price and quietly cut the quality." },
            { q: "Do you charge for the scoping call?", a: "No. The first 45 minutes are free, and if I don't think I can help you I'll say so on that call." },
            { q: "What if the audit finds more than expected?", a: "The audit price is fixed regardless of what it uncovers. If the remediation work is larger than anticipated, that becomes a separate, separately-quoted engagement." },
            { q: "Do you offer equity instead of cash?", a: "Not as a substitute for the full rate. I have taken partial equity alongside a reduced cash rate for teams I believe in, on a case-by-case basis." },
            { q: "How do currency fluctuations work?", a: "Quotes are locked in the currency you accept them in, valid for 30 days. After that the quote is re-issued at the current rate." },
          ]} />
        </div>
      </Section>
    </>
  );
}

/* ====================================================================== FAQ */
export function Faq() {
  const { go } = useApp();
  return (
    <>
      <PageHero
        kicker="FAQ · မေးလေ့ရှိသောမေးခွန်း"
        accent="var(--neon-pink)"
        title={<>The questions I get <span className="grad-text">before every engagement.</span></>}
        lead="If yours isn't here, email me — I'll answer it and add it to this page."
        meta={["8 answers", "Updated 2026", "Ask anything"]}
        actions={<Btn variant="primary" onClick={() => go("contact")}>Ask a question</Btn>}
      />
      <Section tight>
        <div className="mx-auto max-w-3xl"><FaqBlock /></div>
      </Section>
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHead center label="Still unsure?" title={<>Ask directly — I <span className="grad-text">reply.</span></>}
            sub="One business day, usually much faster during Bangkok working hours." />
          <div className="flex flex-wrap justify-center gap-3">
            <Btn variant="primary" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={15} /> {PROFILE.email}</Btn>
            <Btn variant="wire" href="tel:+959889000889"><Icon name="phone" size={15} /> {PROFILE.phone1}</Btn>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================ ACCESSIBILITY */
export function Accessibility() {
  const [motion, setMotion] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [big, setBig] = useState(false);

  useEffect(() => { document.documentElement.dataset.motion = motion ? "off" : "on"; }, [motion]);
  useEffect(() => { document.documentElement.dataset.contrast = contrast ? "high" : "normal"; }, [contrast]);
  useEffect(() => { document.documentElement.style.fontSize = big ? "112.5%" : ""; }, [big]);

  const Toggle = ({ on, set, label, desc }: { on: boolean; set: (v: boolean) => void; label: string; desc: string }) => (
    <div className="glass clip-cyber-sm flex items-center justify-between gap-4 p-4">
      <div>
        <p className="font-display text-[13.5px] font-bold text-hi">{label}</p>
        <p className="text-[13.5px] text-body">{desc}</p>
      </div>
      <button
        role="switch" aria-checked={on} aria-label={label} onClick={() => set(!on)}
        className="relative h-7 shrink-0 rounded-full border transition-colors"
        style={{ width: 52, borderColor: on ? "var(--neon-lime)" : "var(--stroke)", background: on ? "color-mix(in srgb, var(--neon-lime) 22%, transparent)" : "transparent" }}
      >
        <span className="absolute top-[3px] h-[19px] w-[19px] rounded-full transition-all"
              style={{ left: on ? 28 : 3, background: on ? "var(--neon-lime)" : "var(--txt-dim)" }} />
      </button>
    </div>
  );

  return (
    <>
      <PageHero
        kicker="Accessibility · အသုံးပြုနိုင်စွမ်း"
        accent="var(--neon-lime)"
        title={<>Built to WCAG 2.2 AA, with the controls <span className="grad-text">in your hands.</span></>}
        lead="Accessibility is an engineering requirement here, not a checklist run before launch. Use the switches below to change how this site behaves."
        meta={["WCAG 2.2 AA target", "Keyboard complete", "Reduced motion", "Screen-reader tested"]}
      />

      <Section tight>
        <SectionHead label="Controls" title="Adjust this site right now" />
        <div className="grid gap-3 md:grid-cols-3">
          <Reveal><Toggle on={motion} set={setMotion} label="Reduce motion" desc="Disables all animation and transitions site-wide." /></Reveal>
          <Reveal delay={70}><Toggle on={contrast} set={setContrast} label="High contrast" desc="Raises text and border contrast beyond AA." /></Reveal>
          <Reveal delay={140}><Toggle on={big} set={setBig} label="Larger text" desc="Scales the root font size to 112.5%." /></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead label="Commitments" title="What is implemented" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { t: "Keyboard support", d: ["Every interactive element reachable by Tab in a logical order", "Skip-to-content link as the first focusable element", "Escape closes the lightbox and mobile drawer", "Arrow keys navigate the gallery", "No keyboard traps anywhere in the page"], c: "cyan" },
            { t: "Focus states", d: ["2px solid cyan outline with 3px offset on every focusable element", "Focus never removed, only restyled", "Focus returned to the trigger after a modal closes", "Visible against both dark and light themes"], c: "pink" },
            { t: "Contrast control", d: ["Body text meets 4.5:1 against its background", "Large headings meet 3:1 minimum", "Neon accents darkened automatically in light mode", "High-contrast switch pushes past AA on demand"], c: "yellow" },
            { t: "Reduced motion", d: ["prefers-reduced-motion honoured automatically", "Manual override available above", "Scanlines and noise removed, not just slowed", "Parallax disabled entirely, no residual jitter"], c: "violet" },
            { t: "Semantic markup", d: ["Landmark elements: header, nav, main, section, footer", "One h1 per page with a correct heading hierarchy", "Lists marked as lists, quotes as blockquote/cite", "Forms use real label elements, never placeholders alone"], c: "lime" },
            { t: "Screen reader support", d: ["aria-live regions for form results and typing effects", "Decorative images have empty alt, content images are described", "Icons are aria-hidden with adjacent text labels", "aria-expanded on every accordion and menu trigger"], c: "cyan" },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 60}>
              <Card className="h-full">
                <h3 className="font-display text-[15px] font-bold text-hi">{b.t}</h3>
                <div className="mt-3"><Bullets items={b.d} tone={b.c} /></div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Report" title="Found a barrier?" sub="Accessibility issues are treated as bugs with the same priority as a crash." />
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Btn variant="primary" href={`mailto:${PROFILE.email}?subject=Accessibility%20issue`}><Icon name="mail" size={15} /> Report an issue</Btn>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* ============================================================== LOCALIZATION */
export function Localization() {
  const { lang, setLang } = useApp();
  return (
    <>
      <PageHero
        kicker="Localization · ဘာသာစကား"
        accent="var(--neon-violet)"
        title={<>Myanmar, English and Thai — <span className="grad-text-cool">first-class, not translated last.</span></>}
        lead="Language is a layout constraint, not a string swap. Burmese script needs different line height, different fallbacks, and different truncation rules."
        meta={["3 locales", "Locale-aware fonts", "Graceful fallback", "RTL-ready structure"]}
        actions={
          <div className="flex flex-wrap gap-2">
            {(["en", "my", "th"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
                className="clip-tag border px-4 py-2.5 font-display text-[11.5px] font-bold uppercase tracking-[0.16em]"
                style={{
                  borderColor: lang === l ? "var(--neon-violet)" : "var(--stroke)",
                  background: lang === l ? "color-mix(in srgb, var(--neon-violet) 18%, transparent)" : "transparent",
                  color: lang === l ? "var(--neon-violet)" : "var(--txt)",
                }}>
                {l === "en" ? "🌐 English" : l === "my" ? "🇲🇲 မြန်မာ" : "🇹🇭 ไทย"}
              </button>
            ))}
          </div>
        }
      />

      <Section tight>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { flag: "🇲🇲", t: "မြန်မာဘာသာ", d: "Noto Sans Myanmar with line-height 1.9 and increased letter spacing. Zawgyi/Unicode detection with a normalisation pass. Numerals rendered in Myanmar or Latin depending on context.", c: "var(--neon-cyan)" },
            { flag: "🌐", t: "English", d: "The source language for all content. Rajdhani for UI, Sora for editorial passages, Orbitron for display headings.", c: "var(--neon-pink)" },
            { flag: "🇹🇭", t: "ภาษาไทย", d: "Noto Sans Thai with line-height 1.8. Thai has no word spaces, so truncation uses ICU line-break rules rather than character counts.", c: "var(--neon-yellow)" },
          ].map((l, i) => (
            <Reveal key={l.t} delay={i * 70}>
              <Card className="beam h-full" glow={l.c}>
                <span className="text-3xl" aria-hidden="true">{l.flag}</span>
                <h2 className="mt-2 font-display text-[15px] font-bold" style={{ color: l.c }}>{l.t}</h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body">{l.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Approach" title="How localization is structured" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card hover={false} className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Locale-aware content structure</h3>
              <div className="mt-3">
                <Bullets tone="violet" items={[
                  "One dictionary object keyed by string ID, with all three locales side by side — missing keys are impossible to miss in review.",
                  "The html lang attribute is updated on switch so screen readers pick the correct voice.",
                  "Font stack changes per locale via CSS attribute selectors, not JavaScript.",
                  "Dates, numbers and currency formatted with Intl using the active locale.",
                  "Layout tested at the longest string in every locale — Burmese runs roughly 30% longer than English.",
                ]} />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={90}>
            <Card hover={false} className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Fallback behaviour</h3>
              <div className="mt-3">
                <Bullets tone="lime" items={[
                  "Missing translation falls back to English rather than showing the raw key.",
                  "Partial locale support degrades per-string, never per-page.",
                  "Font fallback chain always ends in a system sans so no glyph renders as tofu.",
                  "Untranslatable proper nouns (Kotlin, Firebase, GitHub) stay in Latin script deliberately.",
                  "Language preference persists in the URL hash so shared links keep the reader's locale.",
                ]} />
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead label="Live sample" title="Same content, three locales" />
        <div className="grid gap-3 md:grid-cols-3">
          <Reveal><Card hover={false}><p className="font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">EN</p><p className="mt-2 text-[15px] text-hi">Senior Android &amp; Flutter Developer focused on architecture and performance.</p></Card></Reveal>
          <Reveal delay={70}><Card hover={false}><p className="font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">MY</p><p className="mt-2 text-[15px] leading-loose text-hi" style={{ fontFamily: "'Noto Sans Myanmar', sans-serif" }}>ဖွဲ့စည်းပုံဒီဇိုင်းနှင့် စွမ်းဆောင်ရည်အပေါ် အထူးပြုသော Senior Android နှင့် Flutter Developer ဖြစ်ပါသည်။</p></Card></Reveal>
          <Reveal delay={140}><Card hover={false}><p className="font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-dim">TH</p><p className="mt-2 text-[15px] leading-relaxed text-hi" style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}>นักพัฒนา Android และ Flutter ระดับซีเนียร์ ที่เน้นสถาปัตยกรรมและประสิทธิภาพ</p></Card></Reveal>
        </div>
      </Section>
    </>
  );
}

/* ==================================================================== LEGAL */
export function Legal() {
  return (
    <>
      <PageHero
        kicker="Legal · ဥပဒေ"
        accent="var(--neon-cyan)"
        title={<>Privacy, terms, cookies and <span className="grad-text">attribution.</span></>}
        lead="Short, readable, and accurate. This is a static portfolio — there is far less to disclose than most policies suggest."
        meta={["Last updated: 2026", "No tracking", "No cookies set"]}
      />

      <Section tight>
        <div className="mx-auto max-w-3xl space-y-8">
          <Reveal>
            <article>
              <h2 className="font-display text-[19px] font-bold text-hi">Privacy policy</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                This site is a static single-page application served without a backend. It does not run analytics,
                does not set tracking pixels, and does not sell or share data — because it does not collect any.
              </p>
              <div className="mt-3">
                <Bullets tone="cyan" items={[
                  "Contact and newsletter forms validate in the browser only; nothing is transmitted from this page.",
                  "Language, currency and theme preferences are held in memory for the session and are not persisted to a server.",
                  "Embedded Google Maps frames are loaded from Google and are subject to Google's own privacy policy.",
                  "Images and video are served from Cloudinary; their CDN may log standard request metadata.",
                  "If you email me, I keep that correspondence only as long as needed to answer it.",
                ]} />
              </div>
            </article>
          </Reveal>

          <Reveal delay={70}>
            <article>
              <h2 className="font-display text-[19px] font-bold text-hi">Terms of use</h2>
              <div className="mt-3">
                <Bullets tone="pink" items={[
                  "Content on this site is provided for information about my professional services.",
                  "Case-study metrics are drawn from real engagements; client names are withheld under NDA.",
                  "Nothing here constitutes a binding offer — engagements begin with a signed scope document.",
                  "Text and original graphics are © Moe Kyaw Aung. Code samples in linked repositories carry their own licences.",
                  "You may quote or link to this site with attribution; please do not republish it wholesale.",
                ]} />
              </div>
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article>
              <h2 className="font-display text-[19px] font-bold text-hi">Cookie notice</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                This site sets no first-party cookies and uses no local storage for tracking. Third-party embeds
                (Google Maps) may set their own cookies when you interact with them. Blocking third-party cookies in
                your browser will not break any functionality on this site.
              </p>
            </article>
          </Reveal>

          <Reveal delay={200}>
            <article>
              <h2 className="font-display text-[19px] font-bold text-hi">Attribution</h2>
              <div className="mt-3">
                <InfoGrid rows={[
                  ["Typefaces", "Orbitron, Rajdhani, Share Tech Mono, Sora, Noto Sans Myanmar / Thai — Google Fonts (OFL)"],
                  ["Icons", "Hand-authored inline SVG paths"],
                  ["Media hosting", "Cloudinary CDN"],
                  ["Maps", "Google Maps Embed API"],
                  ["Avatars", "pravatar.cc placeholder service"],
                  ["Framework", "React 19 · Vite 7 · Tailwind CSS 4"],
                ]} />
              </div>
            </article>
          </Reveal>

          <Reveal delay={260}>
            <article>
              <h2 className="font-display text-[19px] font-bold text-hi">Contact for legal matters</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                Questions about this page, takedown requests, or NDA queries:{" "}
                <a href={`mailto:${PROFILE.email}`} style={{ color: "var(--neon-cyan)" }}>{PROFILE.email}</a>.
              </p>
            </article>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
