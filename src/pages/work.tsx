/* =========================================================================
   WORK PAGES — Projects Index · Project Detail 01/02/03 · Case Studies · Labs
   ========================================================================= */
import PageHero from "../components/PageHero";
import { Btn, Card, Icon, Reveal, Section, SectionHead, Tag, Tilt } from "../components/ui";
import { Bullets, GalleryBlock, InfoGrid, ProjectsBlock, ShowreelBlock } from "../components/sections";
import { PROJECTS, PERF_METRICS } from "../lib/data";
import { useApp } from "../lib/store";

/* ========================================================== PROJECTS INDEX */
export function Projects() {
  return (
    <>
      <PageHero
        kicker="Projects · ပရောဂျက်များ"
        title={<>Six builds, each with a <span className="grad-text">measurable outcome.</span></>}
        lead="Curated work spanning commerce, field operations, internal tooling, reference architecture and on-device ML."
        meta={["6 selected projects", "Live demos", "Public source", "Role labelled"]}
      />
      <Section tight><ProjectsBlock /></Section>
      <Section>
        <SectionHead label="Reel" title={<>Motion from recent <span className="grad-text-cool">releases.</span></>} />
        <ShowreelBlock />
      </Section>
    </>
  );
}

/* ========================================================== PROJECT DETAIL */
type Detail = {
  key: string;
  accent: string;
  problem: string;
  role: string;
  architecture: string[];
  outcomes: [string, string][];
  lessons: string[];
  stack: string[];
};

const DETAILS: Record<string, Detail> = {
  "project-01": {
    key: "commerce",
    accent: "var(--neon-cyan)",
    problem:
      "A regional retailer had grown their shopping app feature-by-feature for four years. Checkout spanned seven screens, the cart state lived in three different places, and 41% of users dropped before payment. The team could not ship changes safely because nothing was isolated.",
    role:
      "Lead Mobile Engineer. I owned the architecture, ran the rebuild with two other engineers, and worked directly with the product designer on the new flow.",
    architecture: [
      "Split the monolith into five feature modules — catalog, cart, checkout, account, and a shared design-system module.",
      "Single source of truth for cart state, exposed as an immutable stream from the domain layer.",
      "Contract-first API client generated from OpenAPI, with a typed error envelope instead of raw HTTP codes.",
      "Optimistic UI for add-to-cart, reconciled against the server response with a rollback path.",
      "Golden-image tests on the checkout screens so visual regressions fail the build, not the release.",
    ],
    outcomes: [
      ["Checkout drop-off", "41% → 28% (−31%)"],
      ["Cart-to-order conversion", "+18.4%"],
      ["Screens in checkout", "7 → 3"],
      ["Median checkout time", "94s → 41s"],
      ["Build time (clean)", "8m12s → 4m35s"],
      ["Crash-free sessions", "97.9% → 99.8%"],
    ],
    lessons: [
      "Cutting screens is worth more than optimising them — every removed step compounds.",
      "Optimistic UI needs a designed failure state, or it just moves the confusion later.",
      "Golden tests are the cheapest way to protect a design system once it exists.",
      "Modularising by feature, not by layer, is what actually unblocks parallel work.",
    ],
    stack: ["Dart", "Flutter", "Riverpod", "OpenAPI", "Modular architecture", "Golden tests"],
  },
  "project-02": {
    key: "field",
    accent: "var(--neon-pink)",
    problem:
      "Field teams inspecting infrastructure across rural Myanmar and northern Thailand lost work constantly. The app assumed connectivity; when it dropped mid-form, entries vanished. Crews were re-entering the same inspections from paper notes at the end of each day.",
    role:
      "Architect and implementer. Solo on the sync layer, paired with a backend engineer on the conflict contract.",
    architecture: [
      "Local-first data model: every write lands in a local database first and is treated as authoritative until acknowledged.",
      "Durable outbox queue with idempotency keys, exponential backoff, and per-record retry state.",
      "Last-writer-wins for scalar fields, append-only merge for attachments, explicit manual resolution for the three fields where a wrong merge would be dangerous.",
      "Background sync via WorkManager with network and battery constraints; foreground sync when the app is opened.",
      "A visible sync status surface — users can see exactly what is pending, failed, or synced.",
    ],
    outcomes: [
      ["Task capture during outage", "62% → 100%"],
      ["Duplicate re-entry", "eliminated"],
      ["Sync conflicts needing manual fix", "< 0.4% of records"],
      ["Average time to sync after reconnect", "11s"],
      ["Battery drain (8h shift)", "−34%"],
      ["Support tickets about lost data", "23/mo → 0"],
    ],
    lessons: [
      "Offline-first is a data-modelling decision, not a caching feature you add later.",
      "Users forgive slow sync; they never forgive silent data loss.",
      "Showing sync state removed more support tickets than making sync faster did.",
      "Test the flaky-network case in CI, not just the online and airplane-mode extremes.",
    ],
    stack: ["Flutter", "Drift", "WorkManager", "Outbox pattern", "Idempotency keys", "Reliability"],
  },
  "project-03": {
    key: "ops",
    accent: "var(--neon-yellow)",
    problem:
      "An operations group ran approvals through email threads and a desktop dashboard nobody opened on the road. Median approval time was over four hours, and urgent escalations were routinely missed because there was no push path to the people who could act.",
    role:
      "Senior Android Engineer. Built the app end-to-end and instrumented the analytics that proved the improvement.",
    architecture: [
      "Compose UI with a single-activity, type-safe navigation graph and deep links straight into an approval item.",
      "Push notifications via FCM carrying enough payload to render the decision card offline.",
      "Paging 3 over a Room-backed repository so the queue is instant on cold start and reconciles in the background.",
      "Role-based UI composition — the same screen renders different affordances per permission set, resolved in the domain layer.",
      "Trace-driven performance work: baseline profiles plus a 16ms frame budget enforced in a macrobenchmark test.",
    ],
    outcomes: [
      ["Median approval time", "4h 12m → 11m"],
      ["Missed escalations", "−92%"],
      ["Cold start (p50)", "1.9s → 0.82s"],
      ["Daily active operators", "31% → 78%"],
      ["Jank frames on queue scroll", "9.8% → 1.1%"],
      ["Notification → decision rate", "64%"],
    ],
    lessons: [
      "Putting the decision inside the notification payload mattered more than any UI polish.",
      "Baseline profiles are the single highest-leverage startup fix on mid-tier Android hardware.",
      "Role logic belongs in the domain layer; branching in composables gets unmaintainable fast.",
      "Instrument the outcome metric before you ship, or you cannot prove the work paid off.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Paging 3", "FCM", "Room", "Macrobenchmark"],
  },
};

export function ProjectDetail({ route }: { route: string }) {
  const { go, tr } = useApp();
  const d = DETAILS[route];
  const p = PROJECTS.find((x) => x.page === route)!;
  const others = PROJECTS.filter((x) => x.page && x.page !== route);

  return (
    <>
      <PageHero
        kicker={`Case study · ${p.role}`}
        accent={d.accent}
        title={<>{p.title.split(" ").slice(0, -1).join(" ")} <span className="grad-text">{p.title.split(" ").slice(-1)}</span></>}
        lead={p.outcome}
        meta={d.stack}
        actions={<>
          <Btn variant="primary" href={p.demo} external><Icon name="ext" size={15} /> {tr("liveDemo")}</Btn>
          <Btn variant="wire" href={p.source} external><Icon name="github" size={15} /> {tr("source")}</Btn>
        </>}
      />

      <Section tight>
        <Reveal>
          <div className="clip-cyber overflow-hidden border" style={{ borderColor: "var(--stroke)" }}>
            <img src={p.image} alt={`${p.title} interface`} className="h-[clamp(200px,38vw,420px)] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </Section>

      <Section tight>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-9">
            <div>
              <SectionHead label="Problem" title="What was broken" />
              <Reveal><p className="text-[15.5px] leading-relaxed text-body">{d.problem}</p></Reveal>
            </div>
            <div>
              <SectionHead label="Role" title="What I owned" />
              <Reveal><p className="text-[15.5px] leading-relaxed text-body">{d.role}</p></Reveal>
            </div>
            <div>
              <SectionHead label="Architecture" title="How it was built" />
              <Reveal><Bullets items={d.architecture} tone="cyan" /></Reveal>
            </div>
            <div>
              <SectionHead label="Lessons" title="What I'd carry forward" />
              <Reveal><Bullets items={d.lessons} tone="yellow" /></Reveal>
            </div>
          </div>

          <aside className="space-y-5">
            <Reveal>
              <div>
                <h2 className="mb-3 font-mono-tech text-[11px] uppercase tracking-[0.28em]" style={{ color: d.accent }}>Outcome</h2>
                <InfoGrid rows={d.outcomes} />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Stack</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.stack.map((s, i) => <Tag key={s} tone={["cyan", "pink", "yellow", "violet", "lime"][i % 5]}>{s}</Tag>)}
                </div>
              </Card>
            </Reveal>
            <Reveal delay={140}>
              <Card hover={false}>
                <h2 className="font-display text-[14px] font-bold text-hi">Want the same result?</h2>
                <p className="mt-2 text-[14px] text-body">I run this as a fixed-scope engagement — audit first, then implementation support.</p>
                <Btn variant="primary" className="mt-4 w-full" onClick={() => go("contact")}>Start a conversation</Btn>
              </Card>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section>
        <SectionHead label="Next" title={<>Other <span className="grad-text-cool">case studies.</span></>} />
        <div className="grid gap-4 md:grid-cols-2">
          {others.map((o, i) => (
            <Reveal key={o.id} delay={i * 70}>
              <Tilt>
                <button onClick={() => go(o.page!)} className="glass clip-cyber block w-full p-5 text-left transition-all hover:-translate-y-1">
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.2em]" style={{ color: `var(--neon-${o.accent})` }}>{o.role}</p>
                  <h3 className="mt-1.5 font-display text-[15.5px] font-bold text-hi">{o.title}</h3>
                  <p className="mt-2 text-[14.5px] text-body">{o.outcome}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-cyan)" }}>
                    {tr("readCase")} <Icon name="arrow" size={13} />
                  </span>
                </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ============================================================ CASE STUDIES */
export function CaseStudies() {
  const { go, tr } = useApp();
  const keys = ["project-01", "project-02", "project-03"];
  return (
    <>
      <PageHero
        kicker="Case studies · လေ့လာမှုများ"
        accent="var(--neon-lime)"
        title={<>Problem, role, architecture, outcome, <span className="grad-text">lessons.</span></>}
        lead="Every engagement documented the same way, so you can compare like for like instead of reading marketing."
        meta={["3 deep dives", "Measured outcomes", "Honest lessons"]}
      />

      <Section tight>
        <div className="space-y-5">
          {keys.map((k, i) => {
            const d = DETAILS[k];
            const p = PROJECTS.find((x) => x.page === k)!;
            return (
              <Reveal key={k} delay={i * 80}>
                <article className="glass clip-cyber overflow-hidden">
                  <div className="grid lg:grid-cols-[280px_1fr]">
                    <img src={p.image} alt={p.title} className="h-48 w-full object-cover lg:h-full" loading="lazy" />
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="clip-tag px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-black" style={{ background: d.accent }}>
                          {p.role}
                        </span>
                        <h2 className="font-display text-[17px] font-bold text-hi">{p.title}</h2>
                      </div>

                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <dt className="font-mono-tech text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-pink)" }}>Problem</dt>
                          <dd className="mt-1 text-[14px] leading-relaxed text-body">{d.problem.split(".")[0]}.</dd>
                        </div>
                        <div>
                          <dt className="font-mono-tech text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>Architecture</dt>
                          <dd className="mt-1 text-[14px] leading-relaxed text-body">{d.architecture[0]}</dd>
                        </div>
                        <div>
                          <dt className="font-mono-tech text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-yellow)" }}>Outcome</dt>
                          <dd className="mt-1 text-[14px] leading-relaxed text-body">{d.outcomes[0][0]}: <strong className="text-hi">{d.outcomes[0][1]}</strong></dd>
                        </div>
                        <div>
                          <dt className="font-mono-tech text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-lime)" }}>Lesson</dt>
                          <dd className="mt-1 text-[14px] leading-relaxed text-body">{d.lessons[0]}</dd>
                        </div>
                      </dl>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Btn variant="wire" onClick={() => go(k)}>{tr("readCase")} <Icon name="arrow" size={14} /></Btn>
                        <Btn variant="ghost" href={p.source} external><Icon name="github" size={14} /> {tr("source")}</Btn>
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
        <SectionHead label="Aggregate" title={<>Measured across <span className="grad-text">all engagements.</span></>} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERF_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 60}>
              <Card className="h-full">
                <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-dim">{m.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono-tech text-[13px] line-through text-dim">{m.before}</span>
                  <Icon name="arrow" size={13} />
                  <span className="font-display text-lg font-black text-hi">{m.after}</span>
                </div>
                <span className="clip-tag mt-2 inline-block px-2 py-0.5 font-mono-tech text-[11px]"
                      style={{ color: "var(--neon-lime)", background: "color-mix(in srgb, var(--neon-lime) 12%, transparent)" }}>{m.delta}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ==================================================================== LABS */
const LAB_ITEMS = [
  { t: "Shader-based glow list", d: "Testing whether Impeller fragment shaders can replace layered blur for neon list highlights without dropping frames.", s: "Prototype", c: "var(--neon-cyan)" },
  { t: "Gesture-driven page transitions", d: "Velocity-aware shared-element transitions that stay interruptible mid-flight.", s: "Motion study", c: "var(--neon-pink)" },
  { t: "Burmese text metrics probe", d: "Measuring line-break behaviour of Myanmar script across five font fallbacks on Android 10–15.", s: "Research", c: "var(--neon-yellow)" },
  { t: "Compose recomposition visualiser", d: "A debug overlay that paints recomposition counts directly onto the widget tree.", s: "Tool", c: "var(--neon-violet)" },
  { t: "On-device translation cache", d: "Hybrid glossary + model cache so common Burmese phrases resolve without a network call.", s: "Side project", c: "var(--neon-lime)" },
  { t: "CI cost profiler", d: "GitHub Actions runner-minute breakdown per workflow, surfaced as a weekly digest.", s: "Tool", c: "var(--neon-cyan)" },
  { t: "Adaptive layout playground", d: "One codebase rendering phone, foldable, tablet and desktop layouts from a single spec object.", s: "Prototype", c: "var(--neon-pink)" },
  { t: "Crash-to-trace linker", d: "Automatically attaches the nearest Perfetto trace window to a Crashlytics report.", s: "Experiment", c: "var(--neon-yellow)" },
];

export function Labs() {
  return (
    <>
      <PageHero
        kicker="Labs · ဓာတ်ခွဲခန်း"
        accent="var(--neon-lime)"
        title={<>Prototypes, motion studies, and things that <span className="grad-text">might not work.</span></>}
        lead="Unfinished on purpose. This is where I test ideas before they earn a place in production code."
        meta={["8 active experiments", "No promises", "Occasionally useful"]}
      />
      <Section tight>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {LAB_ITEMS.map((l, i) => (
            <Reveal key={l.t} delay={i * 55}>
              <Tilt className="h-full">
                <Card className="beam h-full" glow={l.c}>
                  <span className="clip-tag inline-block px-2 py-0.5 font-mono-tech text-[10px] uppercase tracking-[0.16em]"
                        style={{ color: l.c, background: `color-mix(in srgb, ${l.c} 12%, transparent)` }}>{l.s}</span>
                  <h3 className="mt-2.5 font-display text-[14px] font-bold text-hi">{l.t}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-body">{l.d}</p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead label="Visual log" title={<>Screens from the <span className="grad-text-cool">workbench.</span></>} />
        <GalleryBlock />
      </Section>
    </>
  );
}
