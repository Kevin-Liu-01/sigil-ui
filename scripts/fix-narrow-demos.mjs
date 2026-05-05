#!/usr/bin/env node
/**
 * Fix demos that render too narrow in their docs preview block. Most need
 * <ComponentPreview vertical> (which switches the wrapper to flex-column +
 * align-items: stretch); a few also need an explicit width container to
 * showcase the layout properly.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "apps/web/content/docs/components");

const REPLACEMENTS = {
  "feature-card": `<FeatureCard
    title="Token-driven design system"
    description="Every value flows from one DESIGN.md through CSS variables into 350+ components. Switch presets and the entire library updates instantly."
  />`,
  "resource-card": `<ResourceCard
    title="Read the docs"
    description="Tokens, presets, components, and migration guides — everything in one place."
    href="/docs"
  />`,
  "pricing-card": `<PricingCard
    title="Team"
    description="For product teams shipping branded apps."
    price="$29"
    features={[
      "350+ token-driven components",
      "46 curated presets",
      "Custom DESIGN.md",
      "Priority support",
    ]}
    action={<Button>Start free trial</Button>}
  />`,
  "mega-menu": `<MegaMenu>
    <Card><CardHeader><CardTitle>Platform</CardTitle><CardDescription>Tokens, themes, and the runtime that powers Sigil.</CardDescription></CardHeader></Card>
    <Card><CardHeader><CardTitle>Components</CardTitle><CardDescription>350+ React components consuming var(--s-*).</CardDescription></CardHeader></Card>
    <Card><CardHeader><CardTitle>Docs</CardTitle><CardDescription>Guides, recipes, and the full API reference.</CardDescription></CardHeader></Card>
  </MegaMenu>`,
  "split-pane": `<SplitPane
    left={<Card><CardHeader><CardTitle>Source</CardTitle><CardDescription>DESIGN.md authoring surface.</CardDescription></CardHeader></Card>}
    right={<Card><CardHeader><CardTitle>Compiled</CardTitle><CardDescription>CSS variables emitted at build time.</CardDescription></CardHeader></Card>}
  />`,
  changelog: `<Changelog>
    <Card>
      <CardHeader>
        <CardTitle>v1.2.0</CardTitle>
        <CardDescription>Calendar refactor, CarouselDots, hardened defaults across 21 components.</CardDescription>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>v1.1.3</CardTitle>
        <CardDescription>Token compliance scan, audit script, MDX preview hardening.</CardDescription>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>v1.1.0</CardTitle>
        <CardDescription>Initial 46-preset library, 350+ component catalog.</CardDescription>
      </CardHeader>
    </Card>
  </Changelog>`,
  "container-query": `<ContainerQuery className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Container-aware surface</CardTitle>
        <CardDescription>Resize the parent and watch this card's typography respond.</CardDescription>
      </CardHeader>
    </Card>
  </ContainerQuery>`,
  "skeleton-table": `<SkeletonTable rows={5} columns={4} className="w-full" />`,
  "feature-grid": `<FeatureGrid
    rows={[
      { eyebrow: "Tokens",     title: "Single source of truth",      description: "Every value lives in one DESIGN.md you can read and edit." },
      { eyebrow: "Components", title: "350+ token-driven primitives", description: "Buttons, cards, charts, layouts. All read from var(--s-*)." },
      { eyebrow: "Presets",    title: "46 curated identities",        description: "One command swaps the entire visual system." },
    ]}
  />`,
  "cta-section": `<CTASection title="Ready to build?" description="Get started with Sigil UI today." buttonText="Get Started" />`,
  "spinner-overlay": `<div className="relative h-40 w-full rounded-[var(--s-card-radius,8px)] border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)]">
    <SpinnerOverlay />
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
  // Force `vertical` attribute (preserves any other existing attrs)
  const existingAttrs = (match[1] ?? "").trim();
  const hasVertical = /\bvertical\b/.test(existingAttrs);
  const newAttrs = hasVertical ? existingAttrs : (existingAttrs ? `${existingAttrs} vertical` : "vertical");

  const next = src.replace(
    previewRe,
    `<ComponentPreview ${newAttrs}>\n  ${safeReplacement}\n</ComponentPreview>`,
  );
  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log(`  ✓ ${slug}`);
    touched++;
  }
}

console.log(`\nTouched ${touched}, errors ${errors.length}`);
for (const e of errors) console.log(`  ! ${e}`);
