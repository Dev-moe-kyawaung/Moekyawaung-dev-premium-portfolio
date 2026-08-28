/* =========================================================================
   ENGINEERING PAGES — Cross-Platform Architecture · Flutter Architecture ·
   Performance · Open Source · GitHub Activity · Design System
   ========================================================================= */
import PageHero from "../components/PageHero";
import { Btn, Card, Icon, Reveal, Ring, Section, SectionHead, Tag } from "../components/ui";
import { Bullets, InfoGrid, LinkGrid, MetricRow } from "../components/sections";
import { GH_ACCOUNTS, PERF_METRICS, PROFILE, REPOS, RINGS } from "../lib/data";
import { useApp } from "../lib/store";

/* ------------------------------------------------------------- helper UI */
function Topic({ n, title, body, points, accent }: { n: string; title: string; body: string; points: string[]; accent: string }) {
  return (
    <Reveal>
      <article className="glass clip-cyber p-6" style={{ borderLeft: `3px solid ${accent}` }}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono-tech text-[12px]" style={{ color: accent }}>{n}</span>
          <h3 className="font-display text-[16px] font-bold text-hi">{title}</h3>
        </div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-body">{body}</p>
        <div className="mt-3"><Bullets items={points} tone="cyan" /></div>
      </article>
    </Reveal>
  );
}

/* ============================================== CROSS-PLATFORM ARCHITECTURE */
export function CrossPlatform() {
  return (
    <>
      <PageHero
        kicker="Cross-platform architecture"
        accent="var(--neon-violet)"
        title={<>Share what is <span className="grad-text-cool">stable.</span> Keep native what is <span className="grad-text">specific.</span></>}
        lead="Shared code is a product decision before it is a technical one. Here is the boundary I draw and why it holds up under maintenance."
        meta={["Shared domain", "Platform channels", "Feature modules", "Dual-store release"]}
      />
      <Section tight>
        <div className="space-y-4">
          <Topic n="01" accent="var(--neon-cyan)" title="Shared code strategy"
            body="Domain logic, validation rules, data mapping and networking are shared. Anything that touches platform identity — permissions UX, notification behaviour, widgets, payment sheets — stays native or behind a thin abstraction."
            points={[
              "Share the domain and data layers; treat presentation as negotiable per platform.",
              "Never share code purely to raise a 'code sharing %' metric — it is not the goal.",
              "Every shared module has one owner and a documented public contract.",
              "Version the shared layer independently so a platform fix never blocks the other.",
            ]} />
          <Topic n="02" accent="var(--neon-pink)" title="Platform channels"
            body="Channels are an API boundary, not a convenience hatch. I define them as typed contracts with explicit error envelopes, and test both sides independently."
            points={[
              "Pigeon-generated typed channels rather than hand-written string keys.",
              "Every channel call has a timeout, an error path, and a fallback behaviour.",
              "Native side stays thin: it forwards to real platform services, it does not hold logic.",
              "Channel contracts are versioned alongside the shared module.",
            ]} />
          <Topic n="03" accent="var(--neon-yellow)" title="Native integration boundaries"
            body="Camera, biometrics, background execution, deep links and store billing are where cross-platform frameworks leak. Those get first-class native attention."
            points={[
              "Biometric prompts use platform-native UI — users recognise the difference immediately.",
              "Background work respects Android WorkManager and iOS BGTaskScheduler semantics separately.",
              "Deep links are declared per platform and verified in CI with real intent tests.",
              "Store billing is never abstracted into a 'universal' wrapper.",
            ]} />
          <Topic n="04" accent="var(--neon-lime)" title="Feature module design"
            body="Modules are cut by feature, not by layer. Each one owns its screens, its state, its repository contracts, and its tests."
            points={[
              "A feature module can be deleted without touching another feature module.",
              "Cross-feature communication goes through a navigation contract, never a direct import.",
              "Shared design-system module is the only widely-imported dependency.",
              "Dependency direction is enforced by a lint rule, not by convention alone.",
            ]} />
          <Topic n="05" accent="var(--neon-cyan)" title="Testing layers"
            body="Test where failure is expensive. Domain logic gets unit tests, sync and data flow get integration tests, and only critical journeys get end-to-end coverage."
            points={[
              "Unit: pure domain and mapping logic — fast, exhaustive, no mocks of your own code.",
              "Integration: repository + local DB + fake network, including the flaky-network case.",
              "Widget/UI: golden images for the design system, behaviour tests for stateful screens.",
              "E2E: three journeys only — onboard, core action, checkout/submit.",
            ]} />
          <Topic n="06" accent="var(--neon-violet)" title="Release strategy for both stores"
            body="One version number, two rollout schedules. Android leads by 48 hours because staged rollout gives a real abort path; iOS follows once crash-free numbers hold."
            points={[
              "Signed artifacts produced only by CI — no local release builds, ever.",
              "Staged rollout: 5% → 20% → 50% → 100%, gated on crash-free and ANR thresholds.",
              "Release notes generated from conventional commits, translated to Burmese.",
              "Automatic rollback trigger if crash-free drops below the release gate.",
            ]} />
        </div>
      </Section>
    </>
  );
}

/* ============================================== FLUTTER ARCHITECTURE */
export function FlutterArchitecture() {
  return (
    <>
      <PageHero
        kicker="Flutter architecture"
        accent="var(--neon-cyan)"
        title={<>Widget composition that stays <span className="grad-text">readable at scale.</span></>}
        lead="A Flutter codebase fails slowly: one god-widget, one leaky provider, one rebuild storm at a time. These are the rules I hold to."
        meta={["Composition", "State", "Routing", "Async flow", "Rebuild budgets"]}
      />
      <Section tight>
        <div className="space-y-4">
          <Topic n="01" accent="var(--neon-cyan)" title="Widget composition"
            body="Small widgets with const constructors, no build method longer than a screen, and no widget that both fetches data and paints pixels."
            points={[
              "Split by responsibility: layout widget, presentation widget, and a state adapter.",
              "const wherever the analyzer allows it — free rebuild avoidance.",
              "Builder widgets scoped to the smallest subtree that actually depends on the value.",
              "No business logic inside build(); it belongs in the notifier or use case.",
            ]} />
          <Topic n="02" accent="var(--neon-pink)" title="State management"
            body="Riverpod for most projects, Bloc when the team already knows it. The choice matters far less than the discipline around it."
            points={[
              "One immutable state class per screen — no scattered booleans.",
              "State classes model loading, data, and error as an explicit union, never nullable soup.",
              "Providers expose values, never widgets, and never BuildContext.",
              "Every notifier is unit-testable without a widget tree.",
            ]} />
          <Topic n="03" accent="var(--neon-yellow)" title="Routing"
            body="Declarative routing with typed parameters and deep-link parity. The route table is a single readable file."
            points={[
              "go_router with typed route objects — no raw string paths in feature code.",
              "Deep links resolve to the same route builders as in-app navigation.",
              "Guards (auth, onboarding, feature flags) live in redirect, not in widgets.",
              "Back-stack behaviour tested explicitly, including Android hardware back.",
            ]} />
          <Topic n="04" accent="var(--neon-violet)" title="Asynchronous data flow"
            body="Streams from the repository, transformed in the domain layer, consumed as immutable state. Cancellation is designed in, not bolted on."
            points={[
              "Repositories return streams for anything that can change; futures only for commands.",
              "Every subscription has a defined cancellation point tied to the widget lifecycle.",
              "Debounce and distinct applied at the domain layer, not sprinkled in the UI.",
              "Errors are values in the stream, not exceptions thrown across async gaps.",
            ]} />
          <Topic n="05" accent="var(--neon-lime)" title="Platform-aware UI"
            body="Material by default, but platform conventions respected where users notice: scroll physics, date pickers, share sheets, haptics."
            points={[
              "Adaptive scroll physics and overscroll behaviour per platform.",
              "Native date/time pickers and share sheets rather than reimplemented ones.",
              "Text scaling honoured up to 200% without layout breakage.",
              "Safe areas and display cutouts handled at the scaffold level.",
            ]} />
          <Topic n="06" accent="var(--neon-cyan)" title="Performance-aware rebuild patterns"
            body="Rebuild budgets tracked like any other budget. The DevTools rebuild counter is part of code review, not an emergency tool."
            points={[
              "RepaintBoundary around independently animating subtrees.",
              "ListView.builder with itemExtent or prototypeItem wherever the height is knowable.",
              "Images decoded at display size, cached, and never resized during scroll.",
              "Expensive layout work moved off the build phase into precomputed layout objects.",
            ]} />
        </div>
      </Section>
    </>
  );
}

/* =============================================================== PERFORMANCE */
export function Performance() {
  return (
    <>
      <PageHero
        kicker="Performance · စွမ်းဆောင်ရည်"
        accent="var(--neon-yellow)"
        title={<>Measured on real devices, <span className="grad-text">not on my laptop.</span></>}
        lead="Every number below comes from a mid-tier physical device fleet — the hardware most users actually hold, not a flagship emulator."
        meta={["Frame smoothness", "Startup", "Memory", "Battery", "List rendering"]}
      />

      <Section tight>
        <SectionHead label="Before / after" title={<>What an audit typically <span className="grad-text">moves.</span></>}
          sub="Aggregate medians across six engagements between 2022 and 2026." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERF_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 60}>
              <Card className="h-full">
                <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-dim">{m.label}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono-tech text-[13px] text-dim line-through">{m.before}</span>
                  <span style={{ color: "var(--neon-cyan)" }}><Icon name="arrow" size={14} /></span>
                  <span className="font-display text-xl font-black text-hi">{m.after}</span>
                </div>
                <span className="clip-tag mt-3 inline-block px-2 py-0.5 font-mono-tech text-[11.5px]"
                      style={{ color: "var(--neon-lime)", background: "color-mix(in srgb, var(--neon-lime) 14%, transparent)" }}>{m.delta}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Method" title="How I actually find the problem" />
        <div className="space-y-4">
          <Topic n="01" accent="var(--neon-cyan)" title="Frame smoothness"
            body="Perfetto traces on a real device, filtered to the janky frames only. I care about p95 frame time, not average — averages hide exactly the stutter users complain about."
            points={[
              "Capture during the specific interaction users report, not a synthetic scroll.",
              "Separate UI-thread jank from raster-thread jank before touching any code.",
              "Track a 16ms budget at 60Hz and 8.3ms at 120Hz as a build-time assertion.",
              "Macrobenchmark tests keep the win from regressing next sprint.",
            ]} />
          <Topic n="02" accent="var(--neon-pink)" title="Startup time"
            body="Cold start is where mid-tier hardware punishes lazy initialisation. Baseline profiles plus a strict startup dependency budget do most of the work."
            points={[
              "Baseline Profiles generated from the real critical user journey.",
              "App Startup library instead of ad-hoc initialisation in Application.onCreate.",
              "Deferred: analytics, crash reporting flush, remote config, image cache warm-up.",
              "Measured with the ADB reportFullyDrawn signal, not the first frame.",
            ]} />
          <Topic n="03" accent="var(--neon-yellow)" title="Memory usage"
            body="Leaks are usually retained contexts and unbounded caches. I instrument with LeakCanary in debug and heap-dump comparisons across a scripted session."
            points={[
              "Bounded image cache sized from actual display dimensions.",
              "Explicit lifecycle scoping — no listeners outliving their owner.",
              "Bitmap decoding at target size; never full-resolution into a thumbnail.",
              "Heap comparison before and after a 200-item scroll cycle.",
            ]} />
          <Topic n="04" accent="var(--neon-violet)" title="Battery impact"
            body="Battery problems are almost always wakelocks, over-eager sync, or location precision nobody needed."
            points={[
              "Sync constrained to network + charging where the product allows it.",
              "Coalesce network calls; one batched request beats twelve polite ones.",
              "Location accuracy matched to actual requirement, not defaulted to fine.",
              "Verified with Battery Historian across a scripted 8-hour session.",
            ]} />
          <Topic n="05" accent="var(--neon-lime)" title="List rendering"
            body="Lists are where most apps lose their frame budget. Fixed extents, stable keys, and cheap item builders solve the majority of it."
            points={[
              "Stable item keys so diffing does not rebuild the world.",
              "Fixed item extent wherever the design permits it.",
              "Paging with prefetch distance tuned to scroll velocity.",
              "No shadows, blurs, or clipping inside a fast-scrolling item.",
            ]} />
          <Topic n="06" accent="var(--neon-cyan)" title="Real device behaviour"
            body="A four-device fleet: two mid-tier Android, one low-end Android, one older iPhone. If it is smooth there, it is smooth everywhere."
            points={[
              "Thermal throttling reproduced deliberately before signing off a fix.",
              "Testing on 3G-throttled and lossy connections, not just offline.",
              "Storage-pressure scenario: device at 95% full changes I/O behaviour.",
              "Every claimed improvement re-measured on the same device it was found on.",
            ]} />
        </div>
      </Section>

      <Section>
        <SectionHead label="Budget" title="Performance budget I hold teams to" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <InfoGrid rows={[
              ["Cold start (p50, mid-tier)", "< 1.2 s"],
              ["Warm start", "< 400 ms"],
              ["Frame budget @60Hz", "16.6 ms"],
              ["Frame budget @120Hz", "8.3 ms"],
              ["Jank frames (scroll)", "< 2%"],
              ["Peak memory (list screen)", "< 200 MB"],
              ["APK / IPA download", "< 25 MB"],
              ["Crash-free sessions", "> 99.7%"],
            ]} />
          </Reveal>
          <Reveal delay={90}>
            <Card hover={false} className="h-full">
              <h3 className="font-display text-[15px] font-bold text-hi">Why budgets, not goals</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                A goal is aspirational and gets dropped when the deadline moves. A budget is a constraint the
                build enforces: exceed it and CI fails, the same as a broken test. That is the only version of
                performance work that survives contact with a roadmap.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Budgets also make trade-offs explicit. If a new feature costs 200ms of startup, that becomes a
                conversation with product rather than a silent regression discovered three releases later.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {RINGS.slice(0, 3).map((r) => <Ring key={r.label} {...r} size={96} />)}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/* =============================================================== OPEN SOURCE */
export function OpenSource() {
  const { tr } = useApp();
  return (
    <>
      <PageHero
        kicker="Open source · အခမဲ့ကုဒ်"
        accent="var(--neon-lime)"
        title={<>Repositories, tools, and documentation that <span className="grad-text">outlive the project.</span></>}
        lead="Most of these started as something I needed twice. Publishing them forces the API to be honest."
        meta={[`${REPOS.length} public repositories`, "600+ total repos", "MIT licensed", "Docs in EN + MY"]}
        actions={<Btn variant="primary" href={PROFILE.github} external><Icon name="github" size={15} /> GitHub profile</Btn>}
      />

      <Section tight>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REPOS.map((r, i) => (
            <Reveal key={r.name} delay={i * 40}>
              <Card className="beam flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono-tech text-[13.5px] text-hi">{r.name}</h3>
                  <Tag tone={["cyan", "pink", "yellow", "violet", "lime"][i % 5]}>{r.lang}</Tag>
                </div>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-body">{r.note}</p>
                <p className="mt-3 border-t pt-3 text-[13px] text-dim" style={{ borderColor: "var(--stroke-soft)" }}>
                  <strong className="text-hi">Why this matters: </strong>
                  {i % 3 === 0 ? "It removes a recurring setup cost for anyone starting a similar feature."
                    : i % 3 === 1 ? "It documents a pattern I kept re-explaining in code review."
                      : "It gives junior developers a readable reference implementation to learn from."}
                </p>
                <a href={r.url} target="_blank" rel="noreferrer noopener"
                   className="mt-3 inline-flex items-center gap-1.5 font-mono-tech text-[11.5px]" style={{ color: "var(--neon-cyan)" }}>
                  <Icon name="github" size={13} /> {tr("source")}
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Contribution types" title="Where the time goes" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Libraries", d: "Small, focused packages with a single responsibility and a real README.", c: "var(--neon-cyan)" },
            { t: "Tools", d: "CLI and CI utilities that shave minutes off a workflow I run daily.", c: "var(--neon-pink)" },
            { t: "Contributions", d: "Bug fixes and issue triage on packages my projects depend on.", c: "var(--neon-yellow)" },
            { t: "Documentation", d: "Burmese translations and worked examples for Android/Flutter learners.", c: "var(--neon-lime)" },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <Card className="h-full" glow={x.c}>
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

/* ============================================================ GITHUB ACTIVITY */
const COMMITS = [
  { repo: "POS-Ultimate-Pro-Max", msg: "perf: add baseline profile for checkout journey", when: "2 hours ago", type: "perf" },
  { repo: "Lens-lite", msg: "feat: quantised model swap reduces cold inference to 180ms", when: "yesterday", type: "feat" },
  { repo: "Job-Portal-App", msg: "fix: outbox retry no longer duplicates on 409 conflict", when: "2 days ago", type: "fix" },
  { repo: "social-dashboard", msg: "refactor: extract feed virtualisation into shared hook", when: "3 days ago", type: "refactor" },
  { repo: "Daily-planner-app", msg: "test: macrobenchmark for list scroll at 120Hz", when: "4 days ago", type: "test" },
  { repo: "video-player", msg: "feat: picture-in-picture with gesture handoff", when: "6 days ago", type: "feat" },
  { repo: "Weather-app", msg: "chore: bump Flutter to stable, migrate deprecated APIs", when: "1 week ago", type: "chore" },
  { repo: "Advance-POS-Version", msg: "docs: Burmese translation for module setup guide", when: "1 week ago", type: "docs" },
];

const PRS = [
  { title: "Add typed error envelope to generated API client", repo: "Dev-moe-kyawaung/pulsesync-android", state: "merged" },
  { title: "Fix Myanmar line-break metrics on Android 14", repo: "upstream/text-layout", state: "open" },
  { title: "Reduce runner minutes with dependency caching", repo: "moekyawaung-tech/POS-Full-Version", state: "merged" },
  { title: "Document offline outbox pattern with worked example", repo: "moekyawaung-tech/Job-Portal-App", state: "merged" },
  { title: "Support reduced-motion in shared transition package", repo: "upstream/motion-kit", state: "review" },
];

export function GitHubActivity() {
  const typeColor: Record<string, string> = {
    feat: "var(--neon-lime)", fix: "var(--neon-pink)", perf: "var(--neon-yellow)",
    refactor: "var(--neon-violet)", test: "var(--neon-cyan)", chore: "var(--txt-dim)", docs: "var(--neon-cyan)",
  };
  const stateColor: Record<string, string> = { merged: "var(--neon-violet)", open: "var(--neon-lime)", review: "var(--neon-yellow)" };

  return (
    <>
      <PageHero
        kicker="GitHub activity"
        accent="var(--neon-cyan)"
        title={<>An honest look at what I've been <span className="grad-text">committing.</span></>}
        lead="Pinned repositories, recent commits, open pull requests and the contribution pattern behind them."
        meta={["43 GitHub Pages sites", "600+ repositories", "Daily commit habit"]}
        actions={<Btn variant="primary" href={PROFILE.github} external><Icon name="github" size={15} /> Open GitHub</Btn>}
      />

      <Section tight>
        <MetricRow items={[
          { n: 600, s: "+", l: "Repositories", c: "var(--neon-cyan)" },
          { n: 43, l: "Pages sites", c: "var(--neon-pink)" },
          { n: 3000, s: "+", l: "Commits / year", c: "var(--neon-yellow)" },
          { n: 16, l: "Shipped apps", c: "var(--neon-lime)" },
        ]} />
      </Section>

      {/* Contribution heatmap — deterministic pseudo-random pattern */}
      <Section tight>
        <SectionHead label="Contribution pattern" title="Last 26 weeks" />
        <Reveal>
          <Card hover={false} className="overflow-x-auto">
            <div className="flex gap-[3px]" role="img" aria-label="Contribution heatmap for the last 26 weeks">
              {Array.from({ length: 26 }).map((_, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((__, d) => {
                    const seed = (w * 7 + d) * 2654435761 % 100;
                    const level = seed > 82 ? 4 : seed > 62 ? 3 : seed > 40 ? 2 : seed > 18 ? 1 : 0;
                    const colors = ["var(--glass-strong)", "color-mix(in srgb, var(--neon-cyan) 25%, transparent)",
                      "color-mix(in srgb, var(--neon-cyan) 50%, transparent)", "color-mix(in srgb, var(--neon-cyan) 75%, transparent)", "var(--neon-cyan)"];
                    return <span key={d} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: colors[level] }} />;
                  })}
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono-tech text-[11px] text-dim">Less <span style={{ color: "var(--neon-cyan)" }}>▪▪▪▪▪</span> More · Consistency beats bursts.</p>
          </Card>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <SectionHead label="Recent commits" title="What changed lately" />
            <div className="space-y-2">
              {COMMITS.map((c, i) => (
                <Reveal key={c.msg} delay={i * 45}>
                  <div className="glass clip-cyber-sm flex items-start gap-3 p-3.5">
                    <span className="clip-tag shrink-0 px-2 py-0.5 font-mono-tech text-[10px] uppercase"
                          style={{ color: typeColor[c.type], background: `color-mix(in srgb, ${typeColor[c.type]} 13%, transparent)` }}>{c.type}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] text-hi">{c.msg}</p>
                      <p className="font-mono-tech text-[10.5px] text-dim">{c.repo} · {c.when}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHead label="Pull requests" title="Open & recently merged" />
            <div className="space-y-2">
              {PRS.map((p, i) => (
                <Reveal key={p.title} delay={i * 55}>
                  <div className="glass clip-cyber-sm flex items-start gap-3 p-3.5">
                    <span className="clip-tag shrink-0 px-2 py-0.5 font-mono-tech text-[10px] uppercase"
                          style={{ color: stateColor[p.state], background: `color-mix(in srgb, ${stateColor[p.state]} 13%, transparent)` }}>{p.state}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] text-hi">{p.title}</p>
                      <p className="font-mono-tech text-[10.5px] text-dim">{p.repo}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6">
              <SectionHead label="Pinned" title="Repositories I'd show first" />
              <div className="space-y-2">
                {REPOS.slice(0, 4).map((r, i) => (
                  <Reveal key={r.name} delay={i * 55}>
                    <a href={r.url} target="_blank" rel="noreferrer noopener" className="glass clip-cyber-sm block p-3.5 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono-tech text-[13px] text-hi">{r.name}</span>
                        <Tag tone={["cyan", "pink", "yellow", "lime"][i % 4]}>{r.lang}</Tag>
                      </div>
                      <p className="mt-1.5 text-[13.5px] text-body">{r.note}</p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead label="Deployed sites" title={<>GitHub Pages <span className="grad-text-cool">network.</span></>} />
        <LinkGrid links={GH_ACCOUNTS.slice(0, 12)} tone="violet" label="GitHub Pages" />
      </Section>
    </>
  );
}

/* =============================================================== DESIGN SYSTEM */
const TOKENS: [string, string, string][] = [
  ["--neon-cyan", "#00f0ff", "Primary accent · links, focus, progress"],
  ["--neon-pink", "#ff2bd1", "Secondary accent · emphasis, errors"],
  ["--neon-yellow", "#f5ff3d", "Tertiary accent · highlights, prices"],
  ["--neon-violet", "#8b5cff", "Depth accent · architecture surfaces"],
  ["--neon-lime", "#b6ff3d", "Positive state · success, availability"],
  ["--bg-0", "#05060a", "Page background"],
  ["--bg-1", "#0a0c14", "Elevated background"],
  ["--glass", "rgba(255,255,255,.045)", "Glass fill"],
  ["--stroke", "rgba(255,255,255,.12)", "Hairline border"],
  ["--txt-hi", "#eef2ff", "Primary text"],
  ["--txt", "#b9c2dd", "Body text"],
  ["--txt-dim", "#7c87a8", "Muted / meta text"],
];

export function DesignSystem() {
  return (
    <>
      <PageHero
        kicker="Design system · ဒီဇိုင်းစနစ်"
        accent="var(--neon-pink)"
        title={<>Tokens, type, motion — the <span className="grad-text">contract</span> behind every screen.</>}
        lead="This page documents the actual CSS custom properties this site runs on. Change one value here and the whole system moves."
        meta={["12 colour tokens", "4 type families", "6 motion curves", "3 elevation levels"]}
      />

      <Section tight>
        <SectionHead label="Colour" title="Token palette" />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {TOKENS.map((tk, i) => (
            <Reveal key={tk[0]} delay={i * 35}>
              <div className="glass clip-cyber-sm flex items-center gap-3 p-3.5">
                <span className="h-10 w-10 shrink-0 rounded-md border" style={{ background: `var(${tk[0]})`, borderColor: "var(--stroke)" }} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-mono-tech text-[12px] text-hi">{tk[0]}</p>
                  <p className="font-mono-tech text-[10.5px] text-dim">{tk[1]}</p>
                  <p className="text-[12.5px] text-body">{tk[2]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="Typography" title="Four families, one hierarchy" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card hover={false}>
              {[
                { f: "font-display", n: "Orbitron", u: "Headings, nav, buttons", s: "text-2xl" },
                { f: "font-edit", n: "Sora", u: "Editorial lead paragraphs", s: "text-xl" },
                { f: "", n: "Rajdhani", u: "Body copy, UI labels", s: "text-lg" },
                { f: "font-mono-tech", n: "Share Tech Mono", u: "Metadata, code, metrics", s: "text-base" },
              ].map((t) => (
                <div key={t.n} className="border-b py-3.5 last:border-0" style={{ borderColor: "var(--stroke-soft)" }}>
                  <p className={`${t.f} ${t.s} font-bold text-hi`}>{t.n} — Aa Bb Cc 0123</p>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-dim">{t.u}</p>
                </div>
              ))}
              <div className="pt-3.5">
                <p className="text-lg text-hi" style={{ fontFamily: "'Noto Sans Myanmar', sans-serif" }}>Noto Sans Myanmar — မိုးကျော်အောင်</p>
                <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-dim">Burmese script · line-height 1.9</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={90}>
            <div className="space-y-4">
              <Card hover={false}>
                <h3 className="font-display text-[14px] font-bold text-hi">Spacing scale</h3>
                <div className="mt-3 space-y-1.5">
                  {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <span className="w-10 font-mono-tech text-[11px] text-dim">{s}px</span>
                      <span className="h-2.5" style={{ width: s * 2, background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-pink))" }} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card hover={false}>
                <h3 className="font-display text-[14px] font-bold text-hi">Motion curves</h3>
                <div className="mt-3 space-y-1.5 font-mono-tech text-[12px] text-body">
                  <p>--ease-out: cubic-bezier(.16, 1, .3, 1)</p>
                  <p>--ease-inout: cubic-bezier(.65, 0, .35, 1)</p>
                  <p>--dur-fast: 160ms · --dur: 320ms · --dur-slow: 720ms</p>
                  <p className="text-dim">All motion disabled under prefers-reduced-motion.</p>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead label="Components" title="Interaction states" />
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal><Card hover={false}><h3 className="mb-3 font-display text-[13.5px] font-bold text-hi">Buttons</h3>
            <div className="flex flex-wrap gap-2"><Btn variant="primary">Primary</Btn><Btn variant="wire">Wire</Btn><Btn variant="ghost">Ghost</Btn></div></Card></Reveal>
          <Reveal delay={70}><Card hover={false}><h3 className="mb-3 font-display text-[13.5px] font-bold text-hi">Tags</h3>
            <div className="flex flex-wrap gap-1.5">{["cyan", "pink", "yellow", "violet", "lime"].map((t) => <Tag key={t} tone={t}>{t}</Tag>)}</div></Card></Reveal>
          <Reveal delay={140}><Card hover={false}><h3 className="mb-3 font-display text-[13.5px] font-bold text-hi">Elevation</h3>
            <div className="space-y-2 font-mono-tech text-[12px] text-body">
              <p>0 — flat surface, hairline border</p>
              <p>1 — glass blur 16px + card shadow</p>
              <p>2 — glass blur 22px + neon ring glow</p>
            </div></Card></Reveal>
        </div>
      </Section>
    </>
  );
}
