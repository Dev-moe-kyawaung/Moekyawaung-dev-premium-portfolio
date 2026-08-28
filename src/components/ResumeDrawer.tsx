/* =========================================================================
   RESUME DRAWER — slide-over panel offering the CV in three formats plus a
   copy-to-clipboard ATS block. Focus-trapped, Escape-closable.
   ========================================================================= */
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../lib/data";
import { Btn, Icon } from "./ui";

export const ATS_RESUME = `MOE KYAW AUNG — SENIOR ANDROID & FLUTTER DEVELOPER
Tachileik, Myanmar / Bangkok, Thailand
moekyawaung@programmer.net | +95 9 889 000 889 | +959 666 000 050
GitHub: github.com/Dev-moe-kyawaung | LinkedIn: linkedin.com/in/moe-kyaw-aung-2653093a1
Gravatar: gravatar.com/moekyawaung13721

PROFESSIONAL SUMMARY
Senior Android Engineer with nearly 12 years designing and delivering high-performance
mobile applications using Kotlin, Jetpack, MVVM/MVI and Clean Architecture. Proven expertise
integrating Firebase (Auth, Firestore, Cloud Messaging, Crashlytics) and RESTful APIs.
Experienced setting up CI/CD pipelines with GitHub Actions and Azure DevOps. Delivers
features end to end: UI, networking, local caching, testing and release-ready builds.

CORE SKILLS
Android      Kotlin, Coroutines, Flow, Jetpack (Compose, ViewModel, Navigation, Room, Paging), Material 3
Cross-plat.  Flutter, Dart, platform channels, shared domain modules, Kotlin Multiplatform
Architecture Clean Architecture, MVVM, MVI, multi-module applications, dependency inversion
Backend      Firebase Suite, REST APIs, Retrofit, OkHttp, JSON, Supabase
DevOps       GitHub Actions, Azure DevOps, Jenkins, Fastlane, staged rollout, crash gating
Testing      JUnit, Espresso, MockK, macrobenchmark, golden/UI tests, integration tests
Performance  Perfetto, Flutter DevTools, baseline profiles, startup and frame budgets
Security     OWASP MASVS, encrypted storage, certificate pinning, obfuscated releases
Languages    Burmese (native), English (professional), Thai (working)

EXPERIENCE
2026-present  Building MoekyawTranslator — AI translation app (Burmese/English/Thai)
              Hybrid on-device + Claude API inference; offline glossary cache.
2024-present  Independent Senior Engineer — own practice
              Architecture reviews, performance audits, mentorship, feature rescue.
              18 engagements, 100% renewal rate.
2022-2024     Principal Mobile Engineer — Consulting, Myanmar/Thailand
              Flutter adoption for shared codebases; jank frames reduced 68% median.
2020-2022     Mobile Tech Lead — Cross-border commerce
              Led 6 engineers; Compose migration; release cadence 6 weeks to 1 week.
2018-2020     Senior Android Developer — Bangkok product studio
              Multi-tenant POS architecture; Kotlin + modularisation; build time -44%.
2016-2018     Android Developer — Regional fintech vendor
              MVP migration, Retrofit networking, offline caching; crash-free 92% to 99.1%.
2014-2016     Junior Android Developer — Tachileik software house
              First production Java applications; 6 apps published.

SELECTED PROJECTS
Mobile Commerce Redesign   Checkout drop-off -31%, conversion +18.4%, 7 screens to 3.
Offline-First Field App    100% task capture during outages, zero data-loss tickets.
Operations Companion       Median approval time 4h12m to 11m, cold start -57%.
PulseSync                  Multi-module Android reference app with full CI/CD.
Lens Lite                  On-device TFLite classification, cold inference 180ms.

EDUCATION & CERTIFICATION
82+ verified certificates across nine domains: programming languages, web development,
mobile, databases, AI/ML, security & DevOps, blockchain, software engineering, business.
Google Developers Launchpad — alumni (2024).

AVAILABILITY
Open to senior/lead Android or Flutter roles, remote-first or hybrid from Bangkok.
Time zone Asia/Bangkok (GMT+7). Responds within one business day.`;

export default function ResumeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 120);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; clearTimeout(t); };
  }, [open, onClose]);

  const save = (ext: "txt" | "md") => {
    const body = ext === "md"
      ? `# Moe Kyaw Aung — Senior Android & Flutter Developer\n\n\`\`\`\n${ATS_RESUME}\n\`\`\`\n`
      : ATS_RESUME;
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Moe-Kyaw-Aung-Resume.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(ATS_RESUME); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* denied */ }
  };

  return (
    <div className="fixed inset-0 z-[9993]" style={{ pointerEvents: open ? "auto" : "none" }} aria-hidden={!open}>
      <div
        className="absolute inset-0 bg-black/72 backdrop-blur-md transition-opacity duration-400"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
      />
      <aside
        ref={panel}
        role="dialog" aria-modal="true" aria-label="Download resume"
        className="drawer-panel absolute right-0 top-0 flex h-full w-[min(94vw,560px)] flex-col border-l"
        style={{
          borderColor: "var(--stroke)",
          background: "color-mix(in srgb, var(--bg-1) 97%, transparent)",
          transform: open ? "none" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b p-6" style={{ borderColor: "var(--stroke)" }}>
          <div>
            <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-yellow)" }}>
              Curriculum vitae
            </p>
            <h2 className="mt-1.5 font-display text-[20px] font-black leading-tight">
              Download <span className="grad-text">résumé</span>
            </h2>
            <p className="mt-1.5 text-[14px] text-body">
              ATS-clean, no tables, no columns — parses correctly in every tracking system I've tested.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close resume panel"
            className="clip-tag grid h-9 w-9 shrink-0 place-items-center border"
            style={{ borderColor: "var(--stroke)", color: "var(--neon-pink)" }}>
            <Icon name="x" size={17} />
          </button>
        </div>

        {/* Format options */}
        <div className="space-y-2.5 p-6">
          {[
            { t: "Plain text (.txt)", d: "Maximum ATS compatibility. 4 KB.", fn: () => save("txt"), c: "var(--neon-cyan)", icon: "download" },
            { t: "Markdown (.md)", d: "For GitHub profiles and static sites.", fn: () => save("md"), c: "var(--neon-violet)", icon: "download" },
            { t: copied ? "Copied to clipboard ✓" : "Copy to clipboard", d: "Paste straight into an application form.", fn: copy, c: copied ? "var(--neon-lime)" : "var(--neon-pink)", icon: "check" },
          ].map((o) => (
            <button key={o.t} onClick={o.fn}
              className="glass clip-cyber-sm beam flex w-full items-center gap-4 p-4 text-left transition-transform hover:-translate-y-0.5">
              <span className="clip-tag grid h-10 w-10 shrink-0 place-items-center"
                    style={{ background: `color-mix(in srgb, ${o.c} 14%, transparent)`, color: o.c }}>
                <Icon name={o.icon} size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[13.5px] font-bold text-hi">{o.t}</span>
                <span className="block font-mono-tech text-[11px] text-dim">{o.d}</span>
              </span>
              <Icon name="arrow" size={15} />
            </button>
          ))}

          <a href={`mailto:${PROFILE.email}?subject=Request%20for%20designed%20PDF%20CV`}
             className="glass clip-cyber-sm beam flex w-full items-center gap-4 p-4 text-left transition-transform hover:-translate-y-0.5">
            <span className="clip-tag grid h-10 w-10 shrink-0 place-items-center"
                  style={{ background: "color-mix(in srgb, var(--neon-yellow) 14%, transparent)", color: "var(--neon-yellow)" }}>
              <Icon name="mail" size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[13.5px] font-bold text-hi">Request designed PDF</span>
              <span className="block font-mono-tech text-[11px] text-dim">Sent within one business day.</span>
            </span>
            <Icon name="ext" size={15} />
          </a>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <p className="mb-2 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim">Preview</p>
          <pre className="glass clip-cyber-sm h-full overflow-auto p-4 font-mono-tech text-[11.5px] leading-relaxed text-body whitespace-pre-wrap">
            {ATS_RESUME}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t p-4" style={{ borderColor: "var(--stroke)" }}>
          <span className="font-mono-tech text-[11px] text-dim">Updated 2026 · {PROFILE.location.split("↔")[0].trim()}</span>
          <Btn variant="wire" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={14} /> Email me</Btn>
        </div>
      </aside>
    </div>
  );
}
