/* =========================================================================
   CORE PAGES — About · Resume · Skills · Tech Stack
   ========================================================================= */
import PageHero from "../components/PageHero";
import {
  Btn, Card, Icon, Reveal, Section, SectionHead, Tag, Timeline, Ring,
} from "../components/ui";
import {
  Bullets, InfoGrid, RingsRow, SkillsBlock, SocialRow, StatsRow, GalleryBlock,
} from "../components/sections";
import {
  MEDIA, PROFILE, SKILL_CHIPS, SKILL_GROUPS, TECH_BADGES, TIMELINE, RINGS,
} from "../lib/data";
import { useApp } from "../lib/store";

/* ==================================================================== ABOUT */
export function About() {
  const { go } = useApp();
  return (
    <>
      <PageHero
        kicker="About · အကြောင်း"
        title={<>I build apps with strong architecture, careful performance tuning, and <span className="grad-text">practical collaboration.</span></>}
        lead="My work usually sits at the intersection of product thinking, system design, and implementation discipline."
        meta={["Nearly 12 years", "Tachileik ↔ Bangkok", "Burmese · English · Thai", "40+ certifications"]}
      />

      <Section tight>
        <div className="grid gap-9 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="font-edit text-[17px] font-light leading-relaxed text-hi">
                I'm a Senior Android &amp; Flutter Developer who builds apps with strong architecture, careful
                performance tuning, and practical collaboration. I prefer building codebases that are easy for
                teams to understand, test, and extend. That means clear boundaries, reliable data flow, stable
                releases, and a focus on the user experience as it behaves in the real world.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                Nearly 12 years of hands-on experience building secure, scalable, and user-friendly mobile
                applications. Strong in Kotlin and modern Jetpack development — Compose, ViewModel, Room — plus
                Firebase integration and REST API consumption. I deliver features end-to-end: UI, networking,
                local caching, testing, and release-ready builds.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                I started in Tachileik writing Java Activities for retail clients, moved through fintech and
                cross-border commerce in Bangkok, and now run an independent practice focused on architecture
                reviews, performance audits, mentorship, and feature rescue across APAC teams.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <blockquote className="glass clip-cyber mt-6 border-l-2 p-5" style={{ borderLeftColor: "var(--neon-pink)" }}>
                <p className="font-edit text-[17px] font-light italic text-hi">“{PROFILE.philosophy}”</p>
                <footer className="mt-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-dim">— Working principle</footer>
              </blockquote>
            </Reveal>

            <div className="mt-8"><StatsRow /></div>
          </div>

          <div className="space-y-5">
            <Reveal>
              <div className="avatar-ring mx-auto aspect-square w-full max-w-[320px]">
                <img src={MEDIA.portrait2} alt="Moe Kyaw Aung" className="h-full w-full rounded-full object-cover" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <InfoGrid rows={[
                ["Full name", PROFILE.name],
                ["မြန်မာအမည်", PROFILE.nameMm],
                ["Role", "Senior Android & Flutter Developer"],
                ["Base", "Tachileik 🇲🇲 ↔ Bangkok 🇹🇭"],
                ["Languages", "Burmese · English · Thai"],
                ["GitHub", "Dev-moe-kyawaung"],
                ["Certificates", "82+ verified"],
                ["Status", "Open to work 🟢"],
              ]} />
            </Reveal>
            <Reveal delay={150}><SocialRow size={40} /></Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead label="Focus areas" title={<>Four lanes I work <span className="grad-text-cool">deeply in.</span></>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Mobile", d: "Kotlin · Jetpack Compose · MVVM · Clean Architecture · Flutter · Dart", c: "var(--neon-cyan)" },
            { t: "Backend", d: "Firebase · REST APIs · Python · Retrofit · Room · Supabase", c: "var(--neon-pink)" },
            { t: "Security", d: "Ethical hacking · OWASP MASVS · encrypted storage · cert pinning", c: "var(--neon-yellow)" },
            { t: "AI / ML", d: "Claude API · TFLite · on-device ML · streaming inference", c: "var(--neon-violet)" },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 70}>
              <Card className="beam h-full" glow={f.c}>
                <h3 className="font-display text-[15px] font-bold" style={{ color: f.c }}>{f.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body">{f.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Timeline · အတွေ့အကြုံ" title={<>The route from <span className="grad-text">2014 to now.</span></>} />
        <Timeline items={TIMELINE} />
      </Section>

      <Section>
        <SectionHead label="Gallery" title={<>Behind the <span className="grad-text-cool">work.</span></>} />
        <GalleryBlock />
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn variant="primary" onClick={() => go("resume")}><Icon name="download" size={15} /> Download resume</Btn>
            <Btn variant="wire" onClick={() => go("experience")}>Experience timeline</Btn>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* =================================================================== RESUME */
const ATS_TEXT = `MOE KYAW AUNG — SENIOR ANDROID & FLUTTER DEVELOPER
Tachileik, Myanmar / Bangkok, Thailand | moekyawaung@programmer.net | +95 9 889 000 889
GitHub: github.com/Dev-moe-kyawaung | LinkedIn: linkedin.com/in/moe-kyaw-aung-2653093a1

SUMMARY
Senior Android Engineer with nearly 12 years designing and delivering high-performance mobile
applications using Kotlin, Jetpack, MVVM/MVI and Clean Architecture. Proven expertise integrating
Firebase (Auth, Firestore, Cloud Messaging, Crashlytics) and RESTful APIs. Experienced setting up
CI/CD pipelines with GitHub Actions and Azure DevOps. Passionate about clean, testable code and
mentoring junior developers.

CORE SKILLS
Android: Kotlin, Jetpack (Compose, ViewModel, Navigation, Room, Paging), Material 3
Cross-platform: Flutter, Dart, platform channels, shared domain modules
Architecture: Clean Architecture, MVVM, MVI, multi-module applications
Backend & Cloud: Firebase Suite, REST APIs, Retrofit, OkHttp, JSON
DevOps: GitHub Actions, Azure DevOps, Jenkins, Fastlane, automated testing and deployment
Testing: JUnit, Espresso, MockK, UI and integration tests
Other: SOLID, OOP, Agile/Scrum, Jira, Microsoft Azure services

EXPERIENCE
2024-present  Independent Senior Engineer — architecture reviews, performance audits, mentorship
2022-2024     Principal Mobile Engineer — Flutter adoption, performance rescue, MY/TH consulting
2020-2022     Mobile Tech Lead — led 6 engineers, Compose migration, CI/CD on GitHub Actions
2018-2020     Senior Android Developer — multi-tenant POS platform, Kotlin + modularisation
2016-2018     Android Developer — MVP migration, Retrofit networking, offline caching
2014-2016     Junior Android Developer — first production Java applications

EDUCATION & CERTIFICATION
82+ verified certificates across programming, web, mobile, databases, AI/ML, security, blockchain
Google Developers Launchpad alumni (2024)`;

export function Resume() {
  const { go } = useApp();
  const download = () => {
    const blob = new Blob([ATS_TEXT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Moe-Kyaw-Aung-Resume.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHero
        kicker="Resume · ကိုယ်ရေးမှတ်တမ်း"
        accent="var(--neon-yellow)"
        title={<>Senior Flutter &amp; Android Developer with <span className="grad-text">production depth.</span></>}
        lead="Experience building production apps, improving performance, and supporting teams through architecture decisions, release workflows, and long-term maintenance."
        meta={["Nearly 12 years", "6 roles", "82+ certificates", "ATS-friendly export"]}
        actions={<>
          <Btn variant="primary" onClick={download}><Icon name="download" size={15} /> Download CV (.txt)</Btn>
          <Btn variant="wire" onClick={() => go("contact")}>Request PDF</Btn>
        </>}
      />

      <Section tight>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHead label="Summary" title="Professional summary" />
            <Reveal>
              <p className="text-[15.5px] leading-relaxed text-body">
                Senior Android Engineer with strong experience designing and delivering high-performance mobile
                applications using <strong className="text-hi">Kotlin</strong>, <strong className="text-hi">Jetpack</strong>,{" "}
                <strong className="text-hi">MVVM/MVI</strong> and <strong className="text-hi">Clean Architecture</strong>.
                Proven expertise integrating <strong className="text-hi">Firebase</strong> (Auth, Firestore, Cloud
                Messaging, Crashlytics) and RESTful APIs. Experienced in setting up{" "}
                <strong className="text-hi">CI/CD pipelines</strong> using GitHub Actions and Azure DevOps.
                Passionate about writing clean, testable code and mentoring junior developers.
              </p>
            </Reveal>

            <div className="mt-9">
              <SectionHead label="Experience" title="Career timeline" />
              <Timeline items={TIMELINE} />
            </div>

            <div className="mt-9">
              <SectionHead label="ATS section" title="Plain-text version" sub="Copy-paste friendly for applicant tracking systems." />
              <Reveal>
                <pre className="glass clip-cyber max-h-[420px] overflow-auto p-5 font-mono-tech text-[12px] leading-relaxed text-body whitespace-pre-wrap">
                  {ATS_TEXT}
                </pre>
              </Reveal>
            </div>
          </div>

          <aside className="space-y-5">
            <Reveal>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Key skills</h2>
                <ul className="mt-3 space-y-2">
                  {["Kotlin · Coroutines · Flow", "Jetpack Compose · Material 3", "Flutter · Dart", "Clean Architecture · MVVM/MVI", "Firebase · REST · Retrofit", "Room · Paging · WorkManager", "GitHub Actions · Fastlane", "JUnit · Espresso · MockK"].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[14px] text-body">
                      <span style={{ color: "var(--neon-lime)" }}><Icon name="check" size={13} /></span>{s}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Certifications</h2>
                <p className="mt-2 text-[14px] text-body">82+ verified certificates across nine domains, plus Google Developers Launchpad alumni status.</p>
                <Btn variant="ghost" className="mt-4 w-full" onClick={() => go("certificates")}>View all</Btn>
              </Card>
            </Reveal>
            <Reveal delay={140}>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Contact</h2>
                <ul className="mt-3 space-y-1.5 text-[13.5px]">
                  <li className="truncate"><a href={`mailto:${PROFILE.email}`} className="hover:text-[var(--neon-cyan)]">{PROFILE.email}</a></li>
                  <li><a href="tel:+959889000889" className="hover:text-[var(--neon-cyan)]">{PROFILE.phone1}</a></li>
                  <li className="text-dim">{PROFILE.location}</li>
                </ul>
              </Card>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}

/* =================================================================== SKILLS */
export function Skills() {
  return (
    <>
      <PageHero
        kicker="Skills · ကျွမ်းကျင်မှု"
        accent="var(--neon-pink)"
        title={<>Grouped by how the work <span className="grad-text">actually gets done.</span></>}
        lead="Six categories, from widget composition to stakeholder demos. Depth ratings reflect production delivery, not tutorials."
        meta={["6 categories", "36 competencies", "Animated on scroll"]}
      />

      <Section tight>
        <SectionHead label="Depth" title="Proficiency bars" sub="Bars fill when they enter the viewport via IntersectionObserver." />
        <SkillsBlock />
      </Section>

      <Section>
        <SectionHead label="Rings" title={<>Core four at a <span className="grad-text-cool">glance.</span></>} />
        <RingsRow />
      </Section>

      <Section>
        <SectionHead label="Categories" title="Skill groups" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <Card className="beam h-full" glow={["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)"][i % 3]}>
                <h3 className="font-display text-[14.5px] font-bold text-hi">{g.title}</h3>
                <div className="mt-3"><Bullets items={g.items} tone={["cyan", "pink", "yellow"][i % 3]} /></div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Cloud" title={<>Tech <span className="grad-text">chips.</span></>} />
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {SKILL_CHIPS.map((c, i) => <Tag key={c} tone={["cyan", "pink", "yellow", "violet", "lime"][i % 5]}>{c}</Tag>)}
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* =============================================================== TECH STACK */
const LAYERS = [
  { t: "Presentation layer", d: "Jetpack Compose · Flutter widgets · Material 3 · design tokens · motion specs", c: "var(--neon-cyan)" },
  { t: "Domain / data layer", d: "Use cases · repositories · Room / Drift · Retrofit / Dio · DTO mapping · caching policy", c: "var(--neon-pink)" },
  { t: "Architecture", d: "Clean Architecture · MVVM / MVI · multi-module graph · dependency inversion · Hilt / Riverpod", c: "var(--neon-yellow)" },
  { t: "Delivery & quality", d: "GitHub Actions · Fastlane · signed release lanes · JUnit / Espresso / MockK · Crashlytics gates", c: "var(--neon-violet)" },
  { t: "Collaboration layer", d: "Figma handoff · written ADRs · async standups · bilingual docs · demo cadence", c: "var(--neon-lime)" },
];

export function TechStack() {
  return (
    <>
      <PageHero
        kicker="Tech Stack · နည်းပညာ"
        accent="var(--neon-violet)"
        title={<>A stack organised in <span className="grad-text-cool">layers, not logos.</span></>}
        lead="Every tool below earns its place because it removes a specific class of production problem."
        meta={["5 layers", "6 badge groups", "Production-verified"]}
      />

      <Section tight>
        <SectionHead label="Layered view" title="How the stack is organised" />
        <div className="space-y-3">
          {LAYERS.map((l, i) => (
            <Reveal key={l.t} delay={i * 70}>
              <div className="glass clip-cyber flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-6"
                   style={{ borderLeft: `3px solid ${l.c}` }}>
                <div className="flex shrink-0 items-center gap-3 md:w-64">
                  <span className="font-mono-tech text-[11px]" style={{ color: l.c }}>L{i + 1}</span>
                  <h3 className="font-display text-[14.5px] font-bold text-hi">{l.t}</h3>
                </div>
                <p className="flex-1 text-[14.5px] leading-relaxed text-body">{l.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Badges" title={<>Tooling by <span className="grad-text">domain.</span></>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TECH_BADGES.map((g, i) => (
            <Reveal key={g.group} delay={i * 60}>
              <Card className="h-full" hover={false}>
                <h3 className="font-display text-[13.5px] font-bold text-hi">{g.group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span key={it.n} className="clip-tag px-2.5 py-1 font-mono-tech text-[10.5px] uppercase tracking-[0.1em] text-white"
                          style={{ background: it.c, textShadow: "0 1px 2px rgba(0,0,0,.5)" }}>
                      {it.n}
                    </span>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Confidence" title="Where I sit on the core four" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {RINGS.map((r, i) => <Reveal key={r.label} delay={i * 80}><Ring {...r} /></Reveal>)}
        </div>
      </Section>
    </>
  );
}
