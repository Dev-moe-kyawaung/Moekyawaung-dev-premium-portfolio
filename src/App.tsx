/* =========================================================================
   MOE KYAW AUNG — PORTFOLIO V000 · PREMIUM EDITION
   Application shell: providers, ambient FX, command palette, résumé drawer,
   page-transition curtain, hash router across 36 routes.
   ========================================================================= */
import { useCallback, useEffect, useState } from "react";
import { AppProvider, useApp } from "./lib/store";
import { ROUTES } from "./lib/data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Ambient, Cursor, FloatingActions, Preloader, ScrollMeter, ShortcutHint } from "./components/chrome";
import { Constellation, Curtain } from "./components/fx";
import CommandPalette from "./components/CommandPalette";
import ResumeDrawer from "./components/ResumeDrawer";

import Home from "./pages/Home";
import { About, Resume, Skills, TechStack } from "./pages/core";
import { CaseStudies, Labs, ProjectDetail, Projects } from "./pages/work";
import {
  CrossPlatform, DesignSystem, FlutterArchitecture, GitHubActivity, OpenSource, Performance,
} from "./pages/engineering";
import {
  Awards, Contact, Experience, Mentorship, Services, Talks, Testimonials, Writing,
} from "./pages/people";
import { Accessibility, Faq, Legal, Localization, Pricing } from "./pages/system";
import {
  AppsPage, Certificates, Emails, GitHubAccounts, LovableLinks, Organization,
} from "./pages/collections";

/* ------------------------------------------------------------------ ROUTER */
function Router({ onResume }: { onResume: () => void }) {
  const { route, lang } = useApp();

  /* Keep document title + meta description in sync for SEO and history */
  useEffect(() => {
    const r = ROUTES.find((x) => x.id === route);
    document.title = r && r.id !== "home"
      ? `${r[lang]} · Moe Kyaw Aung — Senior Android & Flutter Developer`
      : "Moe Kyaw Aung — Senior Android & Flutter Developer | Portfolio V000";
  }, [route, lang]);

  switch (route) {
    /* ---- Overview ---- */
    case "about": return <About />;
    case "resume": return <Resume />;
    case "skills": return <Skills />;
    case "stack": return <TechStack />;

    /* ---- Work ---- */
    case "projects": return <Projects />;
    case "project-01":
    case "project-02":
    case "project-03": return <ProjectDetail route={route} />;
    case "case-studies": return <CaseStudies />;
    case "labs": return <Labs />;

    /* ---- Engineering ---- */
    case "cross-platform": return <CrossPlatform />;
    case "flutter-architecture": return <FlutterArchitecture />;
    case "performance": return <Performance />;
    case "open-source": return <OpenSource />;
    case "github-activity": return <GitHubActivity />;
    case "design-system": return <DesignSystem />;

    /* ---- People ---- */
    case "experience": return <Experience />;
    case "testimonials": return <Testimonials />;
    case "services": return <Services />;
    case "mentorship": return <Mentorship />;
    case "writing": return <Writing />;
    case "talks": return <Talks />;
    case "awards": return <Awards />;
    case "contact": return <Contact />;

    /* ---- System ---- */
    case "pricing": return <Pricing />;
    case "faq": return <Faq />;
    case "accessibility": return <Accessibility />;
    case "localization": return <Localization />;
    case "legal": return <Legal />;

    /* ---- Collections ---- */
    case "apps": return <AppsPage />;
    case "certificates": return <Certificates />;
    case "github-accounts": return <GitHubAccounts />;
    case "lovable-links": return <LovableLinks />;
    case "emails": return <Emails />;
    case "organization": return <Organization />;

    /* ---- Default ---- */
    default: return <Home onResume={onResume} />;
  }
}

/* --------------------------------------------------------------- SHELL */
function Shell() {
  const { route } = useApp();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  /* Global keyboard shortcuts: ⌘K / Ctrl+K palette, ⌘/ résumé drawer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen((v) => !v); }
      if (mod && e.key === "/") { e.preventDefault(); setCvOpen((v) => !v); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openResume = useCallback(() => setCvOpen(true), []);

  return (
    <>
      <Preloader />
      <Cursor />
      <Ambient />
      <Constellation />
      <ScrollMeter />
      <Curtain trigger={route} />

      <Nav onCommand={() => setCmdOpen(true)} onResume={openResume} />

      {/* key forces a fresh mount per route so entrance animations replay */}
      <main id="main" key={route} className="relative z-10">
        <Router onResume={openResume} />
      </main>

      <Footer />
      <FloatingActions onCommand={() => setCmdOpen(true)} />
      <ShortcutHint onCommand={() => setCmdOpen(true)} />

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ResumeDrawer open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
