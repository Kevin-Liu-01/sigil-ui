#!/usr/bin/env node
/**
 * Add a `## Preview` section with a working `<ComponentPreview>` block to
 * every docs page that is missing one.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "apps/web/content/docs/components");

const PREVIEWS = {
  "app-shell": `<AppShell
    header={<div className="px-4 py-2 text-sm font-medium border-b border-[color:var(--s-border)] bg-[var(--s-surface)]">Header</div>}
    sidebar={<div className="p-3 text-xs text-[var(--s-text-muted)]">Sidebar</div>}
    sidebarWidth={160}
    className="h-48 w-full max-w-2xl border border-[color:var(--s-border)] bg-[var(--s-background)] overflow-hidden"
  >
    <div className="p-4 text-sm text-[var(--s-text)]">Main content area</div>
  </AppShell>`,
  "before-after-diagram": `<BeforeAfterDiagram
    before={<p className="text-sm">Manual deploys, 2-hour rollbacks</p>}
    after={<p className="text-sm">CI/CD pipeline, 30-second rollbacks</p>}
  />`,
  "bento-section": `<BentoSection
    label="Platform"
    title="Everything in one place"
    cells={[
      { title: "Analytics", description: "Real-time insights",   span: "2x1" },
      { title: "Security",  description: "Enterprise-grade",     span: "1x1" },
      { title: "API",       description: "REST and GraphQL",     span: "1x1" },
      { title: "Dashboard", description: "Custom views",         span: "2x1" },
    ]}
  />`,
  chart: `<ChartContainer height={220}>
    <BarChart
      groups={[
        { label: "Mon", bars: [{ value: 14, color: "var(--s-primary)" }] },
        { label: "Tue", bars: [{ value: 22, color: "var(--s-primary)" }] },
        { label: "Wed", bars: [{ value: 18, color: "var(--s-primary)" }] },
        { label: "Thu", bars: [{ value: 30, color: "var(--s-primary)" }] },
        { label: "Fri", bars: [{ value: 26, color: "var(--s-primary)" }] },
      ]}
    />
  </ChartContainer>`,
  "chart-container": `<ChartContainer height={220}>
    <SparkLine values={[3, 5, 4, 7, 9, 8, 12, 11, 14, 17, 15, 19]} />
  </ChartContainer>`,
  "code-showcase-section": `<CodeShowcaseSection
    label="Quick start"
    title="Get started in seconds"
    description="Copy, paste, ship."
    tabs={[
      { label: "npm",  language: "bash", code: "npm install @sigil-ui/components" },
      { label: "pnpm", language: "bash", code: "pnpm add @sigil-ui/components" },
      { label: "yarn", language: "bash", code: "yarn add @sigil-ui/components" },
    ]}
  />`,
  "comparison-section": `<ComparisonSection
    title="Compare plans"
    columns={["Hobby", "Pro", "Team"]}
    features={[
      { label: "Projects",     values: ["1", "Unlimited", "Unlimited"] },
      { label: "Custom domain", values: [false, true, true] },
      { label: "SSO",          values: [false, false, true] },
    ]}
  />`,
  "ecosystem-diagram": `<EcosystemDiagram
    center={{ id: "core", label: "Sigil core" }}
    nodes={[
      { id: "tokens",     label: "Tokens",     position: "top" },
      { id: "components", label: "Components", position: "right" },
      { id: "presets",    label: "Presets",    position: "bottom" },
      { id: "cli",        label: "CLI",        position: "left" },
    ]}
  />`,
  "feature-showcase-section": `<FeatureShowcaseSection
    label="Highlights"
    title="What ships out of the box"
    rows={[
      { eyebrow: "Tokens", title: "519 design tokens", description: "Every color, font, and radius." },
      { eyebrow: "Components", title: "350+ React components", description: "All read from var(--s-*)." },
    ]}
  />`,
  "footer-section": `<FooterSection
    columns={[
      { title: "Product", links: [{ label: "Docs", href: "#" }, { label: "Pricing", href: "#" }] },
      { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }] },
    ]}
    copyright="© 2026 Sigil"
  />`,
  "globe-diagram": `<GlobeDiagram
    cities={[
      { id: "sf",  label: "San Francisco", x: 16, y: 48 },
      { id: "nyc", label: "New York",      x: 30, y: 44 },
      { id: "ldn", label: "London",        x: 54, y: 36 },
      { id: "tyo", label: "Tokyo",         x: 84, y: 50 },
    ]}
  />`,
  "gradient-banner-section": `<GradientBannerSection
    title="Ship faster with Sigil"
    description="One token, every component."
    cta={{ label: "Read the docs", href: "#" }}
  />`,
  "hub-route-diagram": `<HubRouteDiagram
    hub="API gateway"
    routes={[
      { label: "Auth service" },
      { label: "Billing service" },
      { label: "Notifications" },
      { label: "Analytics" },
    ]}
  />`,
  "hub-spoke-diagram": `<HubSpokeDiagram
    hub={{ id: "core", label: "Core" }}
    spokes={[
      { id: "a", label: "Tokens" },
      { id: "b", label: "Components" },
      { id: "c", label: "Presets" },
      { id: "d", label: "CLI" },
    ]}
  />`,
  "isometric-stack-diagram": `<IsometricStackDiagram
    layers={[
      { id: "ui",    label: "UI" },
      { id: "tokens", label: "Tokens" },
      { id: "css",   label: "CSS variables" },
    ]}
  />`,
  "large-text-section": `<LargeTextSection
    text="Token-driven design system for the agent era."
  />`,
  "logo-cloud-section": `<LogoCloudSection
    label="Trusted by"
    title="Teams shipping with Sigil"
    items={[
      { name: "Vercel" },
      { name: "Linear" },
      { name: "Stripe" },
      { name: "Figma" },
      { name: "Notion" },
    ]}
  />`,
  "mermaid-diagram": `<MermaidDiagram
    chart={\`graph LR
      A[Tokens] --> B[CSS]
      B --> C[Components]
      C --> D[App]\`}
  />`,
  "newsletter-section": `<NewsletterSection
    title="Stay in the loop"
    description="Monthly digest of new components, tokens, and presets."
    placeholder="you@example.com"
    cta="Subscribe"
  />`,
  "orbit-diagram": `<OrbitDiagram
    center={{ label: "Sigil" }}
    nodes={[
      { label: "Tokens" },
      { label: "Components" },
      { label: "Presets" },
      { label: "CLI" },
      { label: "Docs" },
      { label: "Demos" },
    ]}
  />`,
  "pipeline-diagram": `<PipelineDiagram
    steps={[
      { id: "design", label: "DESIGN.md",    description: "Source" },
      { id: "compile", label: "compile",     description: "tokens.ts" },
      { id: "css",    label: "CSS vars",     description: "--s-*" },
      { id: "render", label: "Components",   description: "consumers" },
    ]}
  />`,
  "sankey-diagram": `<SankeyDiagram
    nodes={[
      { id: "tokens",     label: "Tokens" },
      { id: "components", label: "Components" },
      { id: "pages",      label: "Pages" },
    ]}
    links={[
      { source: "tokens", target: "components", value: 100 },
      { source: "components", target: "pages",  value: 100 },
    ]}
  />`,
  "sigil-cursor": `<div className="relative w-full h-32 border border-[color:var(--s-border)] flex items-center justify-center text-sm text-[var(--s-text-muted)]">
    <SigilCursor variant="dot" />
    Hover this surface to see the custom cursor
  </div>`,
  "stack-diagram": `<StackDiagram
    layers={[
      { id: "ui",      label: "UI",       description: "React components" },
      { id: "tokens",  label: "Tokens",   description: "var(--s-*)" },
      { id: "presets", label: "Presets",  description: "519 fields each" },
    ]}
  />`,
  "stream-flow-diagram": `<StreamFlowDiagram
    nodes={[
      { id: "src",   label: "DESIGN.md" },
      { id: "build", label: "Build" },
      { id: "out",   label: "CSS" },
    ]}
  />`,
  "team-section": `<TeamSection
    label="Team"
    title="The people behind Sigil"
    members={[
      { name: "Riley Chen", role: "Design",  initials: "RC" },
      { name: "Jordan Kim", role: "Eng",     initials: "JK" },
      { name: "Mei Tanaka", role: "Product", initials: "MT" },
    ]}
  />`,
  "testimonials-section": `<TestimonialsSection
    title="What teams are saying"
    items={[
      { quote: "Sigil paid for itself in the first preset switch.", author: "Riley Chen", role: "Design Lead" },
      { quote: "Editing tokens replaced our 200-line theme file.",  author: "Jordan Kim", role: "Frontend Eng" },
    ]}
  />`,
  "timeline-section": `<TimelineSection
    label="Roadmap"
    title="What's shipping next"
    events={[
      { date: "Q2 2026", title: "Token diff",       description: "Visualize preset deltas." },
      { date: "Q3 2026", title: "Design extract",   description: "URL → DESIGN.md." },
      { date: "Q4 2026", title: "Headless cores",   description: "All overlays portable." },
    ]}
  />`,
  "tooltip-provider": `<TooltipProvider delayDuration={200}>
    <div className="flex items-center gap-3">
      <Tooltip><Button variant="outline">Hover A</Button></Tooltip>
      <Tooltip><Button variant="outline">Hover B</Button></Tooltip>
    </div>
  </TooltipProvider>`,
};

let touched = 0;
const errors = [];

for (const [slug, replacement] of Object.entries(PREVIEWS)) {
  const file = path.join(DOCS, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: missing MDX`);
    continue;
  }
  const src = fs.readFileSync(file, "utf-8");
  if (/<ComponentPreview/.test(src)) continue;

  const safeReplacement = replacement.replace(/\$/g, "$$$$");
  const block = `## Preview\n\n<ComponentPreview vertical>\n  ${safeReplacement}\n</ComponentPreview>\n\n`;

  // Insert after the first ` ``` ` closer following an Import code block.
  const importEnd = src.match(/## Import\s+```tsx[\s\S]*?```\s*\n+/);
  if (!importEnd) {
    errors.push(`${slug}: cannot find Import code block`);
    continue;
  }
  const insertAt = (importEnd.index ?? 0) + importEnd[0].length;
  const next = src.slice(0, insertAt) + block + src.slice(insertAt);
  fs.writeFileSync(file, next);
  console.log(`  ✓ ${slug}`);
  touched++;
}

console.log(`\nTouched ${touched}, errors ${errors.length}`);
for (const e of errors) console.log(`  ! ${e}`);
