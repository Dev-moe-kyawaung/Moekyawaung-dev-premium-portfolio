/* =========================================================================
   HOME — the cinematic landing page.
   Hero (video bg + typing) → trust strip → about → rings → timeline →
   skills → services → projects → apps → showreel → gallery → certificates →
   GitHub accounts → Lovable PWAs → emails → organizations → Burmese support →
   features → testimonials → pricing → FAQ → contact.
   ========================================================================= */
import { useEffect, useState } from "react";
import {
  GH_ACCOUNTS, HERO_STATS, LOVABLE_LINKS, MEDIA, PROFILE, SKILL_CHIPS, TIMELINE,
} from "../lib/data";
import { useApp } from "../lib/store";
import {
  Btn, Card, Icon, Reveal, Section, SectionHead, Tag,
} from "../components/ui";
import { Parallax, Timeline } from "../components/ui";
import { BandMarquee, Odometer, SplitText, Spotlight } from "../components/fx";
import {
  AppsBlock, CertsBlock, ContactForm, EmailsBlock, FaqBlock, GalleryBlock, LinkGrid,
  OrgBlock, PricingBlock, ProjectsBlock, RingsRow, ServicesBlock, ShowreelBlock,
  SkillsBlock, SocialRow, StatsRow, TestimonialsBlock, TrustStrip,
} from "../components/sections";

/* ------------------------------------------------------- TYPING EFFECT
   Four rotating senior-level role lines, typed then deleted.            */
const ROLES = [
  "Android Developer | Kotlin | Jetpack Compose | MVVM",
  "Android Engineer | Coroutines · Room · Retrofit · Hilt",
  "Flutter Developer | Dart · Material 3 · Firebase · CI/CD",
  "Android Engineer | KMM · Modular Architecture · Performance",
];

function Typer() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 26 : 52;
    const id = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, txt.length + 1);
        setTxt(next);
        if (next === full) setTimeout(() => setDel(true), 1700);
      } else {
        const next = full.slice(0, Math.max(0, txt.length - 1));
        setTxt(next);
        if (next === "") { setDel(false); setI((v) => (v + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [txt, del, i]);

  return (
    <p className="caret font-mono-tech text-[clamp(.8rem,2.1vw,1.05rem)] uppercase tracking-[0.12em]" style={{ color: "var(--neon-cyan)" }} aria-live="polite">
      {txt}
    </p>
  );
}

/* ------------------------------------------------------------------ HERO
   Cinematic video bed + bento side rail. The headline uses per-character
   split animation; the side rail is a 3-tile bento with live telemetry.  */
function Hero({ onResume }: { onResume?: () => void }) {
  const { tr, go } = useApp();
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      {/* ------------------------------------------ VIDEO BACKGROUND BED */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          src={MEDIA.heroVideo} poster={MEDIA.heroPoster}
          autoPlay muted loop playsInline preload="metadata"
          className="h-full w-full scale-105 object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 78% 58% at 44% 42%, transparent, var(--bg-0) 76%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg-0) 58%, transparent) 0%, transparent 28%, var(--bg-0) 96%)" }} />
        {/* Vertical rule ornaments */}
        <div className="absolute inset-y-0 left-[8%] hidden w-px lg:block" style={{ background: "linear-gradient(180deg, transparent, var(--stroke), transparent)" }} />
        <div className="absolute inset-y-0 right-[8%] hidden w-px lg:block" style={{ background: "linear-gradient(180deg, transparent, var(--stroke), transparent)" }} />
      </div>

      <div className="shell relative z-10 grid items-center gap-10 py-20 lg:grid-cols-[1.4fr_.95fr]">
        {/* ----------------------------------------------------- COPY */}
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="clip-tag inline-flex items-center gap-2 border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.2em]"
                    style={{ borderColor: "var(--neon-lime)", color: "var(--neon-lime)", boxShadow: "0 0 24px -10px var(--neon-lime)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "var(--neon-lime)" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--neon-lime)" }} />
                </span>
                {tr("availability")}
              </span>
              <span className="clip-tag border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim"
                    style={{ borderColor: "var(--stroke)" }}>
                GMT+7 · Bangkok
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 font-mono-tech text-[11.5px] uppercase tracking-[0.36em] text-dim">
              ⭐ Portfolio V000 — Senior Mobile Engineering
            </p>
          </Reveal>

          {/* Split-text display name */}
          <div className="mt-2">
            <SplitText
              as="h1"
              text="MOE KYAW AUNG"
              stagger={38}
              delay={180}
              className="grad-text block font-display text-[clamp(2.15rem,7.6vw,5.1rem)] font-black leading-[0.94] tracking-tight"
            />
          </div>

          <Reveal delay={220}>
            <p className="mt-2 font-display text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-hi">
              မိုးကျော်အောင် <span className="text-dim">·</span> Senior Android &amp; Flutter Developer
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-4 flex min-h-[30px] items-center gap-3">
              <span className="h-px w-6 shrink-0" style={{ background: "var(--neon-pink)" }} aria-hidden="true" />
              <Typer />
            </div>
          </Reveal>

          <Reveal delay={330}>
            <p className="mt-6 max-w-2xl font-edit text-[clamp(1.02rem,2vw,1.28rem)] font-light leading-relaxed text-hi">
              {tr("heroTitle")}
            </p>
          </Reveal>

          <Reveal delay={390}>
            <p className="mt-3.5 max-w-2xl text-[15.5px] leading-relaxed text-body">{tr("heroSub")}</p>
          </Reveal>

          <Reveal delay={440}>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-dim">{tr("heroSupport")}</p>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn variant="primary" onClick={() => go("projects")}>{tr("viewWork")} <Icon name="arrow" size={15} /></Btn>
              <Btn variant="wire" onClick={() => (onResume ? onResume() : go("resume"))}>
                <Icon name="download" size={15} /> {tr("downloadCv")}
              </Btn>
              <Btn variant="ghost" onClick={() => go("contact")}>{tr("contactMe")}</Btn>
            </div>
          </Reveal>

          <Reveal delay={560}>
            <div className="mt-8">
              <p className="mb-2.5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">16 verified profiles</p>
              <SocialRow size={40} />
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------- BENTO SIDE RAIL */}
        <Parallax strength={44}>
          <div className="grid gap-3">
            {/* Tile 1 — portrait + identity */}
            <Reveal delay={260}>
              <Spotlight color="var(--neon-cyan)">
                <div className="glass clip-cyber relative overflow-hidden p-6">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-25"
                       style={{ background: "var(--neon-cyan)", filter: "blur(46px)" }} aria-hidden="true" />
                  <div className="avatar-ring mx-auto mb-5 h-28 w-28">
                    <img src={MEDIA.avatar} alt="Moe Kyaw Aung portrait"
                         className="h-full w-full rounded-full object-cover" loading="eager" fetchPriority="high" />
                  </div>
                  <p className="text-center font-display text-[14px] font-black text-hi">Production focus</p>
                  <ul className="mt-4 space-y-2">
                    {["Flutter · Dart", "Kotlin · Jetpack Compose", "Shared architecture", "Native integrations", "App Store / Play delivery"].map((x, i) => (
                      <li key={x} className="flex items-center gap-2.5 text-[13.5px] text-body">
                        <span className="font-mono-tech text-[10px] tabular-nums"
                              style={{ color: ["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)"][i % 3] }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="hairline my-4" />
                  <p className="text-center font-mono-tech text-[10.5px] text-dim">{PROFILE.location}</p>
                </div>
              </Spotlight>
            </Reveal>

            {/* Tile 2 — odometer metrics */}
            <Reveal delay={340}>
              <div className="grid grid-cols-2 gap-3">
                {HERO_STATS.slice(0, 2).map((s, i) => (
                  <Spotlight key={s.label} color={i ? "var(--neon-pink)" : "var(--neon-yellow)"}>
                    <div className="glass clip-cyber-sm px-4 py-4 text-center">
                      <p className="font-display text-[clamp(1.35rem,3.4vw,1.9rem)] font-black"
                         style={{ color: i ? "var(--neon-pink)" : "var(--neon-yellow)" }}>
                        <Odometer value={s.n} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 font-mono-tech text-[9.5px] uppercase tracking-[0.18em] text-dim">{s.label}</p>
                    </div>
                  </Spotlight>
                ))}
              </div>
            </Reveal>

            {/* Tile 3 — currently building */}
            <Reveal delay={420}>
              <Spotlight color="var(--neon-violet)">
                <div className="glass clip-cyber-sm p-4">
                  <p className="font-mono-tech text-[9.5px] uppercase tracking-[0.26em]" style={{ color: "var(--neon-violet)" }}>
                    Currently building
                  </p>
                  <p className="mt-1.5 text-[14px] font-semibold text-hi">{PROFILE.building}</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--glass-flat)" }}>
                    <div className="h-full w-[68%] rounded-full"
                         style={{ background: "linear-gradient(90deg, var(--neon-violet), var(--neon-cyan))", boxShadow: "0 0 12px var(--neon-violet)" }} />
                  </div>
                  <p className="mt-1.5 font-mono-tech text-[10px] text-dim">Private beta · 68% to v1.0</p>
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </Parallax>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden="true">
        <span className="font-mono-tech text-[9.5px] uppercase tracking-[0.34em] text-dim">Scroll</span>
        <span className="h-12 w-[1px] overflow-hidden" style={{ background: "var(--stroke)" }}>
          <span className="block h-4 w-full" style={{ background: "var(--neon-cyan)", animation: "crtSweep 2.4s ease-in-out infinite" }} />
        </span>
      </div>
    </section>
  );
}

/* --------------------------------------------------- DEVELOPER DASHBOARD
   A compact "live" status panel: local clock, availability, current build,
   and rolling engineering telemetry.                                      */
function Dashboard() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const rows: [string, string, string][] = [
    ["Status", "● Available for senior roles", "var(--neon-lime)"],
    ["Local time", `${now} ICT (GMT+7)`, "var(--neon-cyan)"],
    ["Currently building", PROFILE.building, "var(--neon-pink)"],
    ["Response time", "< 1 business day", "var(--neon-yellow)"],
    ["Open mentee slots", "2 this quarter", "var(--neon-violet)"],
    ["Crash-free target", "> 99.7% sessions", "var(--neon-lime)"],
  ];

  return (
    <div className="glass clip-cyber overflow-hidden">
      <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: "var(--stroke)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--neon-pink)" }} aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--neon-yellow)" }} aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--neon-lime)" }} aria-hidden="true" />
        <span className="ml-2 font-mono-tech text-[11px] uppercase tracking-[0.24em] text-dim">
          developer-dashboard — live
        </span>
      </div>
      <div className="grid gap-x-8 gap-y-0 p-5 md:grid-cols-2">
        {rows.map(([k, v, c]) => (
          <div key={k} className="flex items-center justify-between gap-4 border-b py-2.5 last:border-0" style={{ borderColor: "var(--stroke-soft)" }}>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-dim">{k}</span>
            <span className="text-right font-mono-tech text-[12.5px]" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- FEATURES BLOCK */
const FEATURES = [
  { icon: "🎨", t: "Design fidelity", d: "Tokens, spacing and motion mapped 1:1 from Figma to Compose and Flutter." },
  { icon: "⚡", t: "Performance budgets", d: "Startup, frame time and memory tracked per release on real mid-tier devices." },
  { icon: "🧩", t: "Modular architecture", d: "Feature modules with explicit contracts, so teams can work without collisions." },
  { icon: "🔒", t: "Practical security", d: "OWASP MASVS checks, encrypted storage, certificate pinning, obfuscated releases." },
  { icon: "🌐", t: "Localization first", d: "Burmese, English and Thai handled at the layout level, not bolted on later." },
  { icon: "♿", t: "Accessibility", d: "TalkBack labels, focus order, contrast and reduced-motion respected by default." },
  { icon: "🧪", t: "Test discipline", d: "Unit, UI and integration tests targeted at code paths that actually break." },
  { icon: "🚀", t: "Release automation", d: "Signed builds, staged rollouts and crash gates on every merge to main." },
];

function FeaturesBlock() {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f, i) => (
        <Reveal key={f.t} delay={i * 55}>
          <Card className="beam h-full" glow={["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-yellow)", "var(--neon-violet)"][i % 4]}>
            <span className="text-2xl" aria-hidden="true">{f.icon}</span>
            <h3 className="mt-2.5 font-display text-[14px] font-bold text-hi">{f.t}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-body">{f.d}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/* ==================================================================== PAGE */
export default function Home({ onResume }: { onResume?: () => void }) {
  const { go, tr, lang } = useApp();

  return (
    <>
      <Hero onResume={onResume} />
      <TrustStrip />

      {/* ---------------------------------------------------------- ABOUT */}
      <Section id="about">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Parallax strength={40}>
            <Reveal>
              <div className="relative mx-auto max-w-[380px]">
                <div className="avatar-ring aspect-square w-full">
                  <img src={MEDIA.portrait1} alt="Moe Kyaw Aung at work"
                       className="h-full w-full rounded-full object-cover" loading="lazy" />
                </div>
                <div className="glass clip-cyber-sm absolute -bottom-3 -right-2 px-4 py-2.5">
                  <p className="font-display text-lg font-black" style={{ color: "var(--neon-yellow)" }}>12 yrs</p>
                  <p className="font-mono-tech text-[9.5px] uppercase tracking-[0.16em] text-dim">Mobile engineering</p>
                </div>
              </div>
            </Reveal>
          </Parallax>

          <div>
            <SectionHead
              index="01"
              label={lang === "my" ? "အကြောင်း" : "About"}
              title={<>Developer by craft, <span className="grad-text">engineer by discipline.</span></>}
              sub="Android Developer with nearly 12 years of hands-on experience building secure, scalable, and user-friendly mobile applications."
            />
            <Reveal delay={100}>
              <p className="text-[15.5px] leading-relaxed text-body">
                Strong in Kotlin and modern Jetpack development (Compose, ViewModel, Room), Firebase integration,
                and REST API consumption. I focus on clean architecture, maintainable code, and practical security.
                Comfortable delivering features end-to-end — from UI to networking, local caching, testing, and
                release-ready builds.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-3 text-[15.5px] leading-relaxed text-body">
                I prefer codebases that are easy for teams to understand, test and extend: clear boundaries,
                reliable data flow, stable releases, and a focus on how the experience actually behaves on a
                mid-tier device with a bad connection.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6"><StatsRow /></div>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn variant="wire" onClick={() => go("about")}>Full about page <Icon name="arrow" size={14} /></Btn>
                <Btn variant="ghost" onClick={() => go("resume")}>{tr("downloadCv")}</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- DASHBOARD */}
      <Section id="dashboard" tight>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal><Dashboard /></Reveal>
          <div>
            <SectionHead label="Active developer dashboard"
              title={<>Live status, <span className="grad-text">no guesswork.</span></>}
              sub="Availability, local time and current focus — updated so you never have to ask “is he free?” in the first email." />
            <Reveal delay={140}>
              <div className="flex flex-wrap gap-3">
                <Btn variant="primary" onClick={() => go("contact")}>Book an intro call</Btn>
                <Btn variant="ghost" onClick={() => go("github-activity")}>GitHub activity</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- RINGS */}
      <Section id="rings" tight>
        <SectionHead center index="03" accent="var(--neon-violet)" label="Capability" title={<>Core stack <span className="grad-text-cool">confidence</span></>}
          sub="Self-assessed depth, validated by production delivery and code review history." />
        <RingsRow />
      </Section>

      {/* ---------------------------------------------------- TIMELINE */}
      <Section id="timeline">
        <SectionHead index="04" accent="var(--neon-yellow)" label="Journey · ခရီးစဉ်" title={<>Twelve years, <span className="grad-text">one direction.</span></>}
          sub="From Java Activities in Tachileik to Compose and Flutter architecture work across Myanmar and Thailand." />
        <Timeline items={TIMELINE} />
      </Section>

      {/* ------------------------------------------------------ SKILLS */}
      <Section id="skills">
        <SectionHead index="05" accent="var(--neon-pink)" label="Skills · ကျွမ်းကျင်မှု" title={<>Measured, not <span className="grad-text">claimed.</span></>}
          sub="Progress animates as each bar scrolls into view via IntersectionObserver." />
        <SkillsBlock />
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-2">
            {SKILL_CHIPS.map((c) => <Tag key={c} tone={["cyan", "pink", "yellow", "violet", "lime"][c.length % 5]}>{c}</Tag>)}
          </div>
        </Reveal>
      </Section>

      <BandMarquee text="Kotlin · Jetpack Compose · Flutter · Dart · Clean Architecture · Firebase · CI/CD" />

      {/* ---------------------------------------------------- SERVICES */}
      <Section id="services">
        <SectionHead index="06" label="Services · ဝန်ဆောင်မှု" title={<>Focused engagements, <span className="grad-text">clear scope.</span></>}
          sub="Six ways I work with teams — each with a defined deliverable and a fixed price band." />
        <ServicesBlock />
      </Section>

      <BandMarquee reverse text="Selected work — Commerce · Field ops · Internal tooling · On-device ML" />

      {/* ---------------------------------------------------- PROJECTS */}
      <Section id="projects">
        <SectionHead index="07" accent="var(--neon-pink)" label="Selected work" title={<>Projects that <span className="grad-text">shipped.</span></>}
          sub="Outcome-first summaries with live demos and source pointed at my GitHub organisations." />
        <ProjectsBlock />
        <Reveal delay={160}>
          <div className="mt-7 text-center"><Btn variant="wire" onClick={() => go("projects")}>All projects <Icon name="arrow" size={14} /></Btn></div>
        </Reveal>
      </Section>

      {/* -------------------------------------------- APP COLLECTION */}
      <Section id="apps">
        <SectionHead index="08" accent="var(--neon-lime)" label="My Create App Collection" title={<>16 apps, <span className="grad-text">one signature.</span></>}
          sub="Demo builds and production experiments — every card links straight to its repository." />
        <AppsBlock />
      </Section>

      {/* ---------------------------------------------------- SHOWREEL */}
      <Section id="showreel">
        <SectionHead label="Showreel" title={<>Motion &amp; <span className="grad-text-cool">product film.</span></>}
          sub="Interaction studies and release films from recent engagements." />
        <ShowreelBlock />
      </Section>

      {/* ----------------------------------------------------- GALLERY */}
      <Section id="gallery">
        <SectionHead label="Gallery" title={<>Work in <span className="grad-text">progress.</span></>}
          sub="Click any frame to open the lightbox — arrow keys navigate, Escape closes." />
        <GalleryBlock />
      </Section>

      {/* ------------------------------------------------ CERTIFICATES */}
      <Section id="certificates">
        <SectionHead index="11" accent="var(--neon-lime)" label="Credentials" title={<>82+ verified <span className="grad-text">certificates.</span></>}
          sub="Nine domains — programming, web, mobile, databases, AI/ML, security, blockchain, engineering and business." />
        <CertsBlock compact />
        <Reveal delay={140}>
          <div className="mt-7 text-center"><Btn variant="wire" onClick={() => go("certificates")}>Browse all certificates <Icon name="arrow" size={14} /></Btn></div>
        </Reveal>
      </Section>

      {/* --------------------------------------------- GITHUB ACCOUNTS */}
      <Section id="github-accounts">
        <SectionHead label="GitHub account collection" title={<>43 live <span className="grad-text-cool">GitHub Pages.</span></>}
          sub="Every experiment, landing page and micro-site I keep publicly deployed." />
        <LinkGrid links={GH_ACCOUNTS.slice(0, 15)} tone="cyan" label="GitHub Pages" />
        <Reveal delay={120}>
          <div className="mt-6 text-center"><Btn variant="ghost" onClick={() => go("github-accounts")}>View all {GH_ACCOUNTS.length} <Icon name="arrow" size={14} /></Btn></div>
        </Reveal>
      </Section>

      {/* ----------------------------------------------- LOVABLE LINKS */}
      <Section id="lovable">
        <SectionHead label="Lovable PWA links" title={<>Rapid <span className="grad-text">PWA lab.</span></>}
          sub="Prototypes and CV variants shipped on Lovable — useful for testing content and layout ideas fast." />
        <LinkGrid links={LOVABLE_LINKS.slice(0, 15)} tone="pink" label="Lovable app" />
        <Reveal delay={120}>
          <div className="mt-6 text-center"><Btn variant="ghost" onClick={() => go("lovable-links")}>View all {LOVABLE_LINKS.length} <Icon name="arrow" size={14} /></Btn></div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ EMAILS */}
      <Section id="emails">
        <SectionHead label="Mail collection" title={<>Twenty routed <span className="grad-text">inboxes.</span></>}
          sub="Purpose-specific addresses so enquiries land in the right place. Copy or send in one click." />
        <EmailsBlock />
      </Section>

      {/* ------------------------------------------------ ORGANIZATION */}
      <Section id="organization">
        <SectionHead label="Organization" title={<>Where the work <span className="grad-text-cool">lives.</span></>}
          sub="GitHub organisations, community groups and programmes I contribute through." />
        <OrgBlock />
      </Section>

      {/* -------------------------------------------- BURMESE SUPPORT */}
      <Section id="burmese">
        <SectionHead label="Burmese language support · မြန်မာဘာသာ"
          title={<>မြန်မာဘာသာဖြင့် <span className="grad-text">အပြည့်အဝ</span> ပံ့ပိုးမှု</>}
          sub="Interface labels, error messages, documentation and client communication are all available in Burmese." />
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">ဘာသာစကား ၃ မျိုး</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                မြန်မာ 🇲🇲 · English 🌐 · ไทย 🇹🇭 — အက်ပ်တစ်ခုလုံးအတွက် စာသားများကို ဘာသာစကားအလိုက်
                ပြောင်းလဲပေးနိုင်ပြီး၊ စာလုံးအရွယ်အစားနှင့် စာကြောင်းအမြင့်ကိုပါ ဘာသာစကားအလိုက် ချိန်ညှိထားပါသည်။
              </p>
            </Card>
          </Reveal>
          <Reveal delay={70}>
            <Card className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Myanmar typography</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Noto Sans Myanmar ဖောင့်ကို အသုံးပြုထားပြီး line-height 1.9 ဖြင့် ဖတ်ရလွယ်ကူအောင်
                ပြင်ဆင်ထားပါသည်။ Zawgyi/Unicode ကွဲလွဲမှုများကိုလည်း ကိုင်တွယ်နိုင်ပါသည်။
              </p>
            </Card>
          </Reveal>
          <Reveal delay={140}>
            <Card className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Error messages in Burmese</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                ဆက်သွယ်ရန်ဖောင်တွင် အမှားပြချက်များအားလုံးကို မြန်မာဘာသာဖြင့် ဖော်ပြပေးပါသည် —
                ဥပမာ “ကျေးဇူးပြု၍ အမည် ထည့်သွင်းပါ။”
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------- FEATURES */}
      <Section id="features">
        <SectionHead label="Features" title={<>What ships with <span className="grad-text">every engagement.</span></>}
          sub="The non-negotiables I bring to any codebase I touch." />
        <FeaturesBlock />
      </Section>

      {/* ------------------------------------------------ TESTIMONIALS */}
      <Section id="testimonials">
        <SectionHead label="Testimonials" title={<>What teams <span className="grad-text-cool">say.</span></>} />
        <TestimonialsBlock />
      </Section>

      {/* ----------------------------------------------------- PRICING */}
      <Section id="pricing">
        <SectionHead index="18" accent="var(--neon-yellow)" label="Pricing" title={<>Transparent in <span className="grad-text">MMK, THB &amp; USD.</span></>}
          sub="Switch currency below — figures convert live using a fixed reference rate." />
        <PricingBlock />
      </Section>

      {/* --------------------------------------------------------- FAQ */}
      <Section id="faq">
        <SectionHead label="FAQ" title={<>Questions I get <span className="grad-text">often.</span></>} />
        <div className="mx-auto max-w-3xl"><FaqBlock limit={6} /></div>
        <Reveal delay={120}><div className="mt-6 text-center"><Btn variant="ghost" onClick={() => go("faq")}>All questions</Btn></div></Reveal>
      </Section>

      {/* ----------------------------------------------------- CONTACT */}
      <Section id="contact">
        <SectionHead center index="20" accent="var(--neon-cyan)" label="Contact · ဆက်သွယ်ရန်"
          title={<>Let's build something <span className="grad-text">reliable, polished, and useful.</span></>}
          sub="Asia/Bangkok (GMT+7) · replies within one business day." />
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={100}>
            <div className="space-y-4">
              <Card hover={false}>
                <h3 className="font-display text-[14px] font-bold text-hi">Direct lines</h3>
                <ul className="mt-3 space-y-2 text-[14.5px]">
                  <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={15} />{PROFILE.email}</a></li>
                  <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href="tel:+959889000889"><Icon name="phone" size={15} />{PROFILE.phone1}</a></li>
                  <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href="tel:+959666000050"><Icon name="phone" size={15} />{PROFILE.phone2}</a></li>
                  <li><a className="inline-flex items-center gap-2 hover:text-[var(--neon-cyan)]" href={PROFILE.gravatar} target="_blank" rel="noreferrer"><Icon name="gravatar" size={15} />gravatar.com/moekyawaung13721</a></li>
                </ul>
                <div className="mt-4"><SocialRow size={38} /></div>
              </Card>
              <Card hover={false}>
                <h3 className="font-display text-[14px] font-bold text-hi">Currently building</h3>
                <p className="mt-2 text-[14.5px] text-body">{PROFILE.building}</p>
                <p className="mt-3 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-lime)" }}>● Open to senior roles &amp; consulting</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
