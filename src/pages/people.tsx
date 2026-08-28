/* =========================================================================
   PEOPLE PAGES — Experience · Testimonials · Services · Mentorship ·
   Writing · Talks · Awards · Contact
   ========================================================================= */
import PageHero from "../components/PageHero";
import { Btn, Card, Icon, Reveal, Section, SectionHead, Tag, Timeline, Tilt } from "../components/ui";
import {
  Bullets, ContactForm, InfoGrid, PricingBlock, ServicesBlock, SocialRow, TestimonialsBlock,
} from "../components/sections";
import { AWARDS, PROFILE, TALKS, TESTIMONIALS, TIMELINE, WRITING } from "../lib/data";
import { useApp } from "../lib/store";

/* =============================================================== EXPERIENCE */
const ROLE_DETAIL = [
  { resp: ["Architecture reviews and performance audits for APAC product teams", "Feature-rescue engagements on stalled releases", "Mentoring senior-track Android and Flutter engineers"], team: "Independent · 18 client engagements" },
  { resp: ["Led Flutter adoption for shared commerce codebases", "Ran performance rescue on three legacy Android apps", "Defined the cross-border release process for MY/TH"], team: "Consulting · 3–8 person client teams" },
  { resp: ["Managed a 6-engineer mobile team", "Owned the Views → Compose migration plan", "Built the GitHub Actions CI/CD pipeline from scratch"], team: "6 engineers · 2 designers · 1 PM" },
  { resp: ["Architected a multi-tenant POS platform", "Introduced Kotlin, coroutines and modularisation", "Set the code review standard still in use"], team: "4 engineers · Bangkok studio" },
  { resp: ["Migrated a monolithic Activity codebase to MVP", "Added Retrofit + OkHttp networking and offline caching", "Reduced crash rate through systematic triage"], team: "3 engineers · regional fintech" },
  { resp: ["Shipped first production Java Android apps", "Handled store submissions and release management", "Built client-facing retail features end to end"], team: "2 engineers · Tachileik" },
  { resp: ["Building an AI translation app for Burmese, English and Thai", "Hybrid on-device + Claude API inference", "Offline glossary cache with conflict-free sync"], team: "Solo · private beta" },
];

export function Experience() {
  const ordered = [...TIMELINE].reverse();
  return (
    <>
      <PageHero
        kicker="Experience · အတွေ့အကြုံ"
        accent="var(--neon-violet)"
        title={<>Twelve years, seven roles, one <span className="grad-text">consistent standard.</span></>}
        lead="Each role below includes what I was responsible for, the measurable impact, and the team context it happened in."
        meta={["2014 — present", "MY 🇲🇲 · TH 🇹🇭", "Teams of 2–8", "Individual contributor & lead"]}
      />

      <Section tight>
        <div className="space-y-4">
          {ordered.map((r, i) => {
            const d = ROLE_DETAIL[TIMELINE.indexOf(r)] ?? ROLE_DETAIL[0];
            return (
              <Reveal key={r.year} delay={i * 60}>
                <article className="glass clip-cyber p-6">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-xl font-black" style={{ color: "var(--neon-yellow)" }}>{r.year}</span>
                    <h2 className="font-display text-[17px] font-bold text-hi">{r.title}</h2>
                    <span className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-dim">{r.org}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{r.body}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-[1.5fr_1fr]">
                    <div>
                      <h3 className="mb-2 font-mono-tech text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>Responsibilities</h3>
                      <Bullets items={d.resp} tone="cyan" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="mb-1.5 font-mono-tech text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-lime)" }}>Measurable impact</h3>
                        <p className="clip-tag inline-block px-2.5 py-1 font-mono-tech text-[12px]"
                           style={{ color: "var(--neon-lime)", background: "color-mix(in srgb, var(--neon-lime) 12%, transparent)" }}>▲ {r.impact}</p>
                      </div>
                      <div>
                        <h3 className="mb-1.5 font-mono-tech text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-pink)" }}>Team context</h3>
                        <p className="text-[14px] text-body">{d.team}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHead label="Compact view" title="Same story, timeline format" />
        <Timeline items={TIMELINE} />
      </Section>
    </>
  );
}

/* ============================================================= TESTIMONIALS */
export function Testimonials() {
  return (
    <>
      <PageHero
        kicker="Testimonials · အသိအမှတ်ပြုချက်"
        accent="var(--neon-pink)"
        title={<>What managers, PMs, designers and engineers <span className="grad-text">actually said.</span></>}
        lead="Collected after project handover, unedited except for length."
        meta={[`${TESTIMONIALS.length} references`, "Available on request", "LinkedIn recommendations"]}
      />
      <Section tight><TestimonialsBlock /></Section>
      <Section>
        <SectionHead label="All references" title="Every quote, in full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <Tilt className="h-full">
                <Card className="flex h-full flex-col">
                  <span className="font-display text-3xl leading-none" style={{ color: "var(--neon-pink)" }} aria-hidden="true">“</span>
                  <p className="mt-1 flex-1 text-[15px] leading-relaxed text-body">{t.quote}</p>
                  <div className="mt-4 flex items-center gap-3 border-t pt-4" style={{ borderColor: "var(--stroke-soft)" }}>
                    <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-display text-[13px] font-bold text-hi">{t.name}</p>
                      <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.14em] text-dim">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ================================================================= SERVICES */
export function Services() {
  const { go } = useApp();
  return (
    <>
      <PageHero
        kicker="Services · ဝန်ဆောင်မှု"
        accent="var(--neon-yellow)"
        title={<>Six engagements with <span className="grad-text">defined scope</span> and a real deliverable.</>}
        lead="No open-ended retainers that drift. Each service has an output you can point at when it's done."
        meta={["Fixed scope", "Written deliverables", "MMK · THB · USD", "Remote-first"]}
        actions={<>
          <Btn variant="primary" onClick={() => go("contact")}>Start an engagement</Btn>
          <Btn variant="wire" onClick={() => go("pricing")}>See pricing</Btn>
        </>}
      />
      <Section tight><ServicesBlock /></Section>
      <Section>
        <SectionHead label="Process" title="How an engagement runs" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Scoping call", d: "45 minutes. I ask about the codebase, the team, and what specifically hurts right now.", c: "var(--neon-cyan)" },
            { n: "02", t: "Access & context", d: "Repo access, a build that runs, and one hour with whoever knows the history.", c: "var(--neon-pink)" },
            { n: "03", t: "Work + updates", d: "Async written updates every two days. No status meetings unless you want them.", c: "var(--neon-yellow)" },
            { n: "04", t: "Handover", d: "Written report, a walkthrough call, and a prioritised list your team can act on.", c: "var(--neon-lime)" },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <Card className="beam h-full" glow={s.c}>
                <span className="font-display text-2xl font-black" style={{ color: s.c }}>{s.n}</span>
                <h3 className="mt-2 font-display text-[14.5px] font-bold text-hi">{s.t}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">{s.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead label="Pricing" title={<>Rates in <span className="grad-text">your currency.</span></>} />
        <PricingBlock />
      </Section>
    </>
  );
}

/* =============================================================== MENTORSHIP */
export function Mentorship() {
  const { go } = useApp();
  return (
    <>
      <PageHero
        kicker="Mentorship · လမ်းညွှန်မှု"
        accent="var(--neon-lime)"
        title={<>Direct feedback, always with the <span className="grad-text">reason behind it.</span></>}
        lead="I mentor engineers moving from mid-level into senior mobile work — the part where technical skill stops being the bottleneck."
        meta={["Weekly 1:1", "Async code review", "EN / မြန်မာ", "3-month minimum"]}
        actions={<Btn variant="primary" onClick={() => go("contact")}>Request a slot</Btn>}
      />
      <Section tight>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Code review support", d: "I review your real PRs, not toy exercises. Comments explain the principle, not just the fix, so the next PR is better without me.", c: "var(--neon-cyan)" },
            { t: "Pairing sessions", d: "90-minute live sessions on whatever is actually blocking you — a gnarly state bug, a migration plan, a test you can't make deterministic.", c: "var(--neon-pink)" },
            { t: "Refactoring guidance", d: "How to break a 2,000-line class apart without freezing the roadmap. Sequencing matters more than the end state.", c: "var(--neon-yellow)" },
            { t: "Career growth", d: "What senior actually means at different company sizes, how to demonstrate it, and how to talk about impact without inflating it.", c: "var(--neon-violet)" },
            { t: "Flutter & Compose fundamentals", d: "Rebuild semantics, state boundaries, and the mental model that makes the framework predictable instead of magical.", c: "var(--neon-lime)" },
            { t: "Interview preparation", d: "System design for mobile, live coding under pressure, and how to handle the 'tell me about a failure' question honestly.", c: "var(--neon-cyan)" },
          ].map((m, i) => (
            <Reveal key={m.t} delay={i * 65}>
              <Tilt className="h-full">
                <Card className="beam h-full" glow={m.c}>
                  <h3 className="font-display text-[15px] font-bold" style={{ color: m.c }}>{m.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-body">{m.d}</p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card hover={false} className="h-full">
              <h2 className="font-display text-[16px] font-bold text-hi">How it works</h2>
              <div className="mt-3">
                <Bullets tone="lime" items={[
                  "One 60-minute video call per week, same slot, Asia/Bangkok time.",
                  "Unlimited async questions between calls — I answer in writing within a day.",
                  "Up to eight PR reviews per month on your real work.",
                  "A shared document tracking what we're working on and what changed.",
                  "Three-month minimum, because habits don't change in four weeks.",
                  "Sessions in English or Burmese, whichever you think better in.",
                ]} />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={90}>
            <Card hover={false} className="h-full">
              <h2 className="font-display text-[16px] font-bold text-hi">Who this is for</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                Engineers with two to six years of mobile experience who can already ship features but find that
                architecture decisions, code review conversations, and cross-team negotiation are where they stall.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                It is <strong className="text-hi">not</strong> a beginner course. If you're learning your first
                language, you'll get more from a structured curriculum than from me — and I'll tell you that on
                the intro call rather than take your money.
              </p>
              <p className="mt-3 font-mono-tech text-[12px]" style={{ color: "var(--neon-lime)" }}>● 2 mentee slots open this quarter</p>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/* ================================================================== WRITING */
export function Writing() {
  return (
    <>
      <PageHero
        kicker="Writing · ဆောင်းပါးများ"
        accent="var(--neon-cyan)"
        title={<>Notes on architecture, performance, and <span className="grad-text">delivery discipline.</span></>}
        lead="Written mostly to organise my own thinking. Published because the same questions keep coming up in review."
        meta={[`${WRITING.length} articles`, "Technical depth", "No listicles"]}
      />
      <Section tight>
        <div className="grid gap-4 md:grid-cols-2">
          {WRITING.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <Tilt className="h-full">
                <Card className="beam flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <Tag tone={["cyan", "pink", "yellow", "violet", "lime"][i % 5]}>{w.tag}</Tag>
                    <span className="font-mono-tech text-[10.5px] text-dim">{w.date} · {w.read}</span>
                  </div>
                  <h2 className="mt-3 font-display text-[16px] font-bold leading-snug text-hi">{w.title}</h2>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-body">{w.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-cyan)" }}>
                    Read article <Icon name="arrow" size={13} />
                  </span>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead label="Themes" title="What I keep coming back to" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {["Flutter architecture", "Performance", "Shared code strategy", "Delivery discipline", "Product thinking"].map((t, i) => (
            <Reveal key={t} delay={i * 55}>
              <Card className="text-center">
                <p className="font-display text-[13.5px] font-bold text-hi">{t}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ==================================================================== TALKS */
export function Talks() {
  return (
    <>
      <PageHero
        kicker="Talks · ဟောပြောမှု"
        accent="var(--neon-violet)"
        title={<>Meetups, conferences, and full-day <span className="grad-text-cool">workshops.</span></>}
        lead="Mostly trace-driven and hands-on. If a slide can be replaced with a live device, it usually is."
        meta={[`${TALKS.length} sessions`, "EN + Burmese", "Slides on request"]}
      />
      <Section tight>
        <div className="space-y-3">
          {TALKS.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <article className="glass clip-cyber flex flex-col gap-3 p-5 md:flex-row md:items-center">
                <div className="flex shrink-0 items-center gap-3 md:w-40">
                  <span className="font-display text-lg font-black" style={{ color: "var(--neon-yellow)" }}>{t.year}</span>
                  <Tag tone={["cyan", "pink", "violet", "lime"][i % 4]}>{t.type}</Tag>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-[15.5px] font-bold text-hi">{t.title}</h2>
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim">{t.venue}</p>
                  <p className="mt-1.5 text-[14.5px] text-body">{t.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead label="Booking" title="Available for" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Conference talk", d: "30–45 minutes on Flutter or Compose performance, with live traces from a real device.", c: "var(--neon-cyan)" },
            { t: "Team workshop", d: "Half or full day, hands-on, using your codebase rather than a prepared sample.", c: "var(--neon-pink)" },
            { t: "Community session", d: "Free for Myanmar and Thai student groups — delivered in Burmese if useful.", c: "var(--neon-lime)" },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <Card className="beam h-full" glow={x.c}>
                <h3 className="font-display text-[14.5px] font-bold" style={{ color: x.c }}>{x.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body">{x.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* =================================================================== AWARDS */
export function Awards() {
  return (
    <>
      <PageHero
        kicker="Awards · ဆုများ"
        accent="var(--neon-yellow)"
        title={<>Certifications, recognition, and <span className="grad-text">community mentions.</span></>}
        lead="Credentials matter less than shipped work, but they show the direction of deliberate practice over a decade."
        meta={["82+ certificates", "Launchpad alumni", "6 recognitions"]}
      />
      <Section tight>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title} delay={i * 65}>
              <Tilt className="h-full">
                <Card className="beam h-full" glow={["var(--neon-yellow)", "var(--neon-cyan)", "var(--neon-pink)"][i % 3]}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-2xl" aria-hidden="true">🏆</span>
                    <span className="font-mono-tech text-[11px] text-dim">{a.year}</span>
                  </div>
                  <h2 className="mt-2.5 font-display text-[14.5px] font-bold text-hi">{a.title}</h2>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "var(--neon-cyan)" }}>{a.org}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-body">{a.note}</p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ================================================================== CONTACT */
export function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact · ဆက်သွယ်ရန်"
        accent="var(--neon-cyan)"
        title={<>Let's build something <span className="grad-text">reliable, polished, and useful.</span></>}
        lead="Tell me what you're building and where it's stuck. If I'm not the right person, I'll usually know who is."
        meta={["Asia/Bangkok · GMT+7", "Reply within 1 business day", "NDA-friendly", "EN · မြန်မာ · ไทย"]}
        actions={<>
          <Btn variant="primary" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={15} /> Email directly</Btn>
          <Btn variant="wire" href={PROFILE.linkedin} external><Icon name="linkedin" size={15} /> LinkedIn</Btn>
        </>}
      />

      <Section tight>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal><ContactForm /></Reveal>
          <div className="space-y-4">
            <Reveal delay={80}>
              <InfoGrid rows={[
                ["Email", PROFILE.email],
                ["Phone", PROFILE.phone1],
                ["Alt phone", PROFILE.phone2],
                ["Time zone", "Asia/Bangkok (GMT+7)"],
                ["Working hours", "09:00 – 18:00 ICT"],
                ["Overlap", "EU mornings · US west evenings"],
                ["Response", "< 1 business day"],
                ["Availability", "Open 🟢"],
              ]} />
            </Reveal>
            <Reveal delay={140}>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Book a slot</h2>
                <p className="mt-2 text-[14.5px] text-body">
                  A 30-minute intro call is the fastest way to work out whether this is a fit. No pitch deck, just questions.
                </p>
                <Btn variant="wire" className="mt-4 w-full" href={`mailto:${PROFILE.email}?subject=Intro%20call%20request`}>
                  Request a calendar link
                </Btn>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card hover={false}>
                <h2 className="mb-3 font-display text-[14px] font-bold text-hi">Social · 16 profiles</h2>
                <SocialRow size={40} />
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead label="Location" title={<>Based between <span className="grad-text">two borders.</span></>}
          sub="Tachileik, Shan State, Myanmar — 20 minutes from the Thai border crossing at Mae Sai, and a short flight from Bangkok." />
        <Reveal>
          <div className="clip-cyber overflow-hidden border" style={{ borderColor: "var(--stroke)" }}>
            <iframe
              title="Map — Tachileik, Myanmar"
              src="https://www.google.com/maps?q=Tachileik,+Shan+State,+Myanmar&output=embed"
              width="100%" height="380" loading="lazy"
              style={{ border: 0, filter: "invert(.92) hue-rotate(180deg) saturate(1.15)" }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
