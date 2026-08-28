/* =========================================================================
   COLLECTION PAGES — App Collection · Certificates · GitHub Accounts ·
   Lovable PWA Links · Email Collection · Organization
   ========================================================================= */
import PageHero from "../components/PageHero";
import { Btn, Card, Icon, Reveal, Section, SectionHead, Tag } from "../components/ui";
import {
  AppsBlock, CertsBlock, EmailsBlock, LinkGrid, MetricRow, OrgBlock, SocialRow,
} from "../components/sections";
import { CERT_CATEGORIES, GH_ACCOUNTS, LOVABLE_LINKS, PROFILE, REPOS, EMAILS } from "../lib/data";
import { useApp } from "../lib/store";

/* ============================================================ APP COLLECTION */
export function AppsPage() {
  const { tr } = useApp();
  return (
    <>
      <PageHero
        kicker="My Create App Collection · အက်ပ်စုစည်းမှု"
        accent="var(--neon-pink)"
        title={<>Sixteen apps, from a snake game to a <span className="grad-text">full POS platform.</span></>}
        lead="Demo builds, teaching repositories and production experiments. Each one exists because I wanted to answer a specific question."
        meta={["16 apps", `${REPOS.length} public repos`, "Kotlin · Dart · TypeScript"]}
        actions={<Btn variant="primary" href={PROFILE.githubTech} external><Icon name="github" size={15} /> moekyawaung-tech</Btn>}
      />

      <Section tight>
        <SectionHead label="Collection" title="Tap any card to open the repository" />
        <AppsBlock />
      </Section>

      <Section>
        <SectionHead label="Repositories" title={<>The full <span className="grad-text-cool">source index.</span></>}
          sub="Eighteen public repositories across three GitHub organisations." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {REPOS.map((r, i) => (
            <Reveal key={r.name} delay={i * 35}>
              <a href={r.url} target="_blank" rel="noreferrer noopener"
                 className="glass clip-cyber-sm block h-full p-4 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono-tech text-[13px] text-hi">{r.name}</span>
                  <Tag tone={["cyan", "pink", "yellow", "violet", "lime"][i % 5]}>{r.lang}</Tag>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-body">{r.note}</p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono-tech text-[11px]" style={{ color: "var(--neon-cyan)" }}>
                  <Icon name="github" size={12} /> {tr("source")}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* =============================================================== CERTIFICATES */
export function Certificates() {
  const total = CERT_CATEGORIES.reduce((a, c) => a + c.count, 0);
  return (
    <>
      <PageHero
        kicker="Certificates · လက်မှတ်များ"
        accent="var(--neon-lime)"
        title={<><span className="grad-text">{total}+ verified certificates</span> across nine technical domains.</>}
        lead="A certification portfolio demonstrating structured, practical learning — from programming languages and web frameworks through machine learning, blockchain and cybersecurity."
        meta={[`${total}+ certificates`, "9 categories", "2019 — 2026", "Programming Hub verified"]}
      />

      <Section tight>
        <MetricRow items={[
          { n: total, s: "+", l: "Certificates", c: "var(--neon-cyan)" },
          { n: 9, l: "Categories", c: "var(--neon-pink)" },
          { n: 7, s: "+", l: "Years learning", c: "var(--neon-yellow)" },
          { n: 100, s: "%", l: "Verified", c: "var(--neon-lime)" },
        ]} />
      </Section>

      <Section tight><CertsBlock /></Section>
    </>
  );
}

/* =========================================================== GITHUB ACCOUNTS */
export function GitHubAccounts() {
  return (
    <>
      <PageHero
        kicker="GitHub account collection"
        accent="var(--neon-cyan)"
        title={<><span className="grad-text-cool">{GH_ACCOUNTS.length} live GitHub Pages</span> sites, all publicly deployed.</>}
        lead="Landing pages, experiments, client demos and micro-sites. Keeping them live means the work is always inspectable, not screenshot-only."
        meta={[`${GH_ACCOUNTS.length} deployed sites`, "600+ repositories", "Static · zero cost", "HTTPS by default"]}
        actions={<Btn variant="primary" href={PROFILE.github} external><Icon name="github" size={15} /> Main profile</Btn>}
      />
      <Section tight>
        <SectionHead label="Index" title="Every deployed site" sub="Opens in a new tab — some are experiments and may be mid-iteration." />
        <LinkGrid links={GH_ACCOUNTS} tone="cyan" label="GitHub Pages" />
      </Section>
      <Section>
        <SectionHead label="Also" title={<>Where to find me <span className="grad-text">elsewhere.</span></>} />
        <Reveal><SocialRow size={46} /></Reveal>
      </Section>
    </>
  );
}

/* ============================================================ LOVABLE LINKS */
export function LovableLinks() {
  return (
    <>
      <PageHero
        kicker="Lovable PWA links collection"
        accent="var(--neon-pink)"
        title={<><span className="grad-text">{LOVABLE_LINKS.length} Lovable PWAs</span> — the rapid prototyping lab.</>}
        lead="CV variants, bio pages and content experiments. Useful for testing a layout idea in an afternoon before committing engineering time to it."
        meta={[`${LOVABLE_LINKS.length} live apps`, "Installable PWAs", "Iterated weekly"]}
      />
      <Section tight>
        <SectionHead label="Index" title="Every Lovable deployment" />
        <LinkGrid links={LOVABLE_LINKS} tone="pink" label="Lovable app" />
      </Section>
      <Section>
        <SectionHead label="Why" title="What this collection is for" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Fast content testing", d: "Rewriting a bio or a case-study summary is a five-minute deploy instead of a build cycle.", c: "var(--neon-cyan)" },
            { t: "Layout exploration", d: "Trying six hero treatments in parallel and sharing all six with a client for a real opinion.", c: "var(--neon-pink)" },
            { t: "PWA behaviour checks", d: "Install prompts, offline shells and splash screens verified on real Android hardware.", c: "var(--neon-yellow)" },
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

/* =========================================================== EMAIL COLLECTION */
export function Emails() {
  return (
    <>
      <PageHero
        kicker="Mail collection · အီးမေးလ်များ"
        accent="var(--neon-yellow)"
        title={<><span className="grad-text">{EMAILS.length} routed inboxes</span> so enquiries reach the right place.</>}
        lead="Purpose-specific addresses, all forwarding into one filtered workflow. Use whichever matches your reason for writing — or just use the primary one."
        meta={[`${EMAILS.length} addresses`, "One-click copy", "< 1 business day reply"]}
        actions={<Btn variant="primary" href={`mailto:${PROFILE.email}`}><Icon name="mail" size={15} /> {PROFILE.email}</Btn>}
      />
      <Section tight>
        <SectionHead label="Directory" title="Copy or send in one click" />
        <EmailsBlock />
      </Section>
      <Section>
        <SectionHead label="Routing" title="Which address to use" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Hiring & roles", e: "moekyawaung@engineer.com", c: "var(--neon-cyan)" },
            { t: "Consulting & audits", e: "moekyawaung@contractor.net", c: "var(--neon-pink)" },
            { t: "Press & speaking", e: "moekyawaung@publicist.com", c: "var(--neon-yellow)" },
            { t: "Everything else", e: "moekyawaung@programmer.net", c: "var(--neon-lime)" },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <Card className="beam h-full" glow={x.c}>
                <h3 className="font-display text-[14px] font-bold" style={{ color: x.c }}>{x.t}</h3>
                <a href={`mailto:${x.e}`} className="mt-2 block break-all font-mono-tech text-[12.5px] text-body hover:text-[var(--txt-hi)]">{x.e}</a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ============================================================== ORGANIZATION */
export function Organization() {
  return (
    <>
      <PageHero
        kicker="Organization · အဖွဲ့အစည်း"
        accent="var(--neon-violet)"
        title={<>The organisations and communities the work <span className="grad-text-cool">runs through.</span></>}
        lead="Three GitHub organisations, two community groups, and one accelerator programme — each with a distinct purpose rather than duplicated profiles."
        meta={["6 organisations", "2019 — present", "MY 🇲🇲 · TH 🇹🇭"]}
      />
      <Section tight><OrgBlock /></Section>
      <Section>
        <SectionHead label="Structure" title="How the accounts are split" />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { t: "Flagship engineering", d: "Dev-moe-kyawaung holds reference architectures and anything I would show in an interview. Highest code-quality bar.", c: "var(--neon-cyan)" },
            { t: "Product demos", d: "moekyawaung-tech holds the 16-app collection and POS line — shipped, opinionated, occasionally rough at the edges.", c: "var(--neon-pink)" },
            { t: "Civic & security", d: "Moekyawaung-cyber holds public-good datasets: Myanmar postcodes, hospital directories, and OSINT tooling.", c: "var(--neon-yellow)" },
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
      <Section>
        <SectionHead label="Community" title={<>Connected <span className="grad-text">profiles.</span></>} />
        <Reveal><SocialRow size={46} /></Reveal>
      </Section>
    </>
  );
}
