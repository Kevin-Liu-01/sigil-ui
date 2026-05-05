#!/usr/bin/env node
/**
 * Replace bare/broken demos in component docs with valid prop sets sourced
 * from each component's actual public API.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "apps/web/content/docs/components");

const REPLACEMENTS = {
  "logo-bar": `<LogoBar
    logos={[
      { src: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='ui-sans-serif' font-size='16' font-weight='600' fill='currentColor'%3EVercel%3C/text%3E%3C/svg%3E", alt: "Vercel" },
      { src: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='ui-sans-serif' font-size='16' font-weight='600' fill='currentColor'%3ELinear%3C/text%3E%3C/svg%3E", alt: "Linear" },
      { src: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='ui-sans-serif' font-size='16' font-weight='600' fill='currentColor'%3EStripe%3C/text%3E%3C/svg%3E", alt: "Stripe" },
      { src: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='ui-sans-serif' font-size='16' font-weight='600' fill='currentColor'%3EFigma%3C/text%3E%3C/svg%3E", alt: "Figma" },
      { src: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='ui-sans-serif' font-size='16' font-weight='600' fill='currentColor'%3ENotion%3C/text%3E%3C/svg%3E", alt: "Notion" },
    ]}
  />`,
  "feature-grid": `<FeatureGrid
    rows={[
      { eyebrow: "Tokens", title: "Single source of truth", description: "Every value lives in one DESIGN.md you can read and edit." },
      { eyebrow: "Components", title: "350+ token-driven primitives", description: "Buttons, cards, charts, layouts. All read from var(--s-*)." },
    ]}
  />`,
  "feature-section": `<FeatureSection
    label="WHY SIGIL"
    title="Edit tokens, not components"
    description="Change one value, every consumer updates."
    features={[
      { title: "Token-driven", description: "519 fields compile to CSS custom properties." },
      { title: "46 presets", description: "Switch the entire visual identity in one command." },
      { title: "Agent-friendly", description: "MDX-first DESIGN.md you can hand to any LLM." },
    ]}
  />`,
  "stats-section": `<StatsSection
    label="By the numbers"
    title="Sigil at a glance"
    stats={[
      { value: "350+", label: "Components" },
      { value: "519", label: "Design tokens" },
      { value: "46", label: "Presets" },
      { value: "33", label: "Token categories" },
    ]}
  />`,
  "install-section": `<InstallSection
    label="Get started"
    title="Install in seconds"
    commands={[
      { label: "npm",  command: "npm install @sigil-ui/components" },
      { label: "pnpm", command: "pnpm add @sigil-ui/components" },
      { label: "yarn", command: "yarn add @sigil-ui/components" },
    ]}
  />`,
  "floating-ui": `<FloatingUI
    layers={[
      <div key="a" className="px-4 py-3 text-sm text-[var(--s-text)]">Layer 1 — base panel</div>,
      <div key="b" className="px-4 py-3 text-sm text-[var(--s-text)]">Layer 2 — overlay</div>,
      <div key="c" className="px-4 py-3 text-sm text-[var(--s-text)]">Layer 3 — toolbar</div>,
    ]}
  />`,
  "code-block": `<CodeBlock language="tsx" code={\`import { Button } from "@sigil-ui/components";

export function CTA() {
  return <Button>Ship it</Button>;
}\`} />`,
  "code-tabs": `<CodeTabs
    tabs={[
      { value: "npm",  label: "npm",  language: "bash", code: "npm install @sigil-ui/components" },
      { value: "pnpm", label: "pnpm", language: "bash", code: "pnpm add @sigil-ui/components" },
      { value: "yarn", label: "yarn", language: "bash", code: "yarn add @sigil-ui/components" },
    ]}
  />`,
  "braille-spinner": `<div className="flex items-center gap-6">
    <BrailleSpinner name="orbit" />
    <BrailleSpinner name="scan" />
    <BrailleSpinner name="breathe" />
    <BrailleSpinner name="cascade" />
    <BrailleSpinner name="helix" />
    <BrailleSpinner name="sparkle" />
  </div>`,
  "cost-calculator": `<CostCalculator
    sliders={[
      { label: "Active users", value: 1500, unit: "users", min: 0, max: 10000, step: 100 },
      { label: "API calls",    value: 250000, unit: "/mo", min: 0, max: 1000000, step: 10000 },
    ]}
    estimate={{ brandName: "Sigil", brandCost: 175, competitorName: "Other", competitorCost: 420, savingsNote: "Includes 90% utilization." }}
  />`,
  shape: `<div className="flex items-center gap-6 text-[var(--s-primary)]">
    <Shape variant="diamond" size="lg" />
    <Shape variant="hexagon" size="lg" />
    <Shape variant="triangle" size="lg" />
    <Shape variant="circle" size="lg" />
    <Shape variant="cross" size="lg" />
    <Shape variant="pill" size="lg" />
  </div>`,
};

let touched = 0;
const errors = [];

for (const [slug, replacement] of Object.entries(REPLACEMENTS)) {
  const file = path.join(DOCS, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: missing MDX`);
    continue;
  }
  const src = fs.readFileSync(file, "utf-8");
  const previewRe = /<ComponentPreview([^>]*)>([\s\S]*?)<\/ComponentPreview>/;
  const match = src.match(previewRe);
  if (!match) {
    errors.push(`${slug}: no <ComponentPreview> block`);
    continue;
  }
  const safeReplacement = replacement.replace(/\$/g, "$$$$");
  const safeAttrs = (match[1] ?? "").replace(/\$/g, "$$$$");
  const next = src.replace(
    previewRe,
    `<ComponentPreview${safeAttrs}>\n  ${safeReplacement}\n</ComponentPreview>`,
  );
  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log(`  ✓ ${slug}`);
    touched++;
  }
}

console.log(`\nTouched ${touched}, errors ${errors.length}`);
for (const e of errors) console.log(`  ! ${e}`);
