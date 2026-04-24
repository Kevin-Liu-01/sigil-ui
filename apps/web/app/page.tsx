"use client";

import { useState } from "react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { HeroLogoField } from "@/components/landing/hero-logo-field";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Terminal } from "@/components/landing/terminal";
import { LiveComponentGrid } from "@/components/landing/live-component";
import { ShapesAndPatterns } from "@/components/landing/shapes-section";
import { TechFrame } from "@/components/landing/tech-frame";
import { SigilFrame, useIsEdgeless } from "@/components/landing/sigil-frame";
import { TokenPipelineDiagram } from "@/components/landing/token-pipeline";
import { LayerStackDiagram } from "@/components/landing/layer-stack";
import { ComponentAnatomyDiagram } from "@/components/landing/component-anatomy";
import { PresetComparisonView } from "@/components/landing/preset-comparison";
import { MarkdownEditorPreview } from "@/components/landing/markdown-editor";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";

import {
  SigilSection,
  SectionDivider,
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentCTA,
  CardCell,
  FeaturedGrid,
  BorderStack,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Switch,
  Progress,
} from "@sigil-ui/components";

/* ================================================================ */
/* Edgeless-aware section wrapper                                     */
/* ================================================================ */

function LandingSection(props: React.ComponentProps<typeof SigilSection>) {
  let edgeless = false;
  try { edgeless = useIsEdgeless(); } catch { /* outside provider */ }
  return (
    <SigilSection
      {...props}
      borderTop={props.borderTop && !edgeless}
      borderBottom={props.borderBottom && !edgeless}
      showCrosses={props.showCrosses && !edgeless}
    />
  );
}

function LandingDivider(props: React.ComponentProps<typeof SectionDivider>) {
  let edgeless = false;
  try { edgeless = useIsEdgeless(); } catch { /* outside provider */ }
  if (edgeless) return null;
  return <SectionDivider {...props} />;
}

/* ================================================================ */
/* Section Header — reusable pattern                                  */
/* ================================================================ */

function SectionHeader({
  label,
  heading,
  description,
  maxDescWidth = 576,
}: {
  label: string;
  heading: string;
  description?: string;
  maxDescWidth?: number;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <MonoLabel variant="accent" size="sm">/ {label}</MonoLabel>
      </div>
      <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(24px,3vw,40px)] font-bold tracking-tight leading-[1.1] text-[var(--s-text)] mb-3">
        {heading}
      </h2>
      {description && (
        <DensityText role="body" as="p" muted className="leading-relaxed" style={{ maxWidth: maxDescWidth }}>
          {description}
        </DensityText>
      )}
    </div>
  );
}

/* ================================================================ */
/* 1 — Hero                                                           */
/* ================================================================ */

const PRESET_DOTS: { name: string; color: string }[] = [
  { name: "sigil", color: "#9b99e8" },
  { name: "noir", color: "#d97706" },
  { name: "forge", color: "#ea580c" },
  { name: "vex", color: "#ec4899" },
  { name: "arc", color: "#7c3aed" },
  { name: "cipher", color: "#22c55e" },
];

function Hero() {
  let setPreset: ((name: string) => Promise<void>) | null = null;
  let sound: ReturnType<typeof useSigilSound> = { play: () => {}, enabled: false, setEnabled: () => {}, activePreset: "sigil", setActivePreset: () => {} };
  try {
    const ctx = useSigilTokens();
    setPreset = ctx.setPreset;
  } catch {
    /* no provider */
  }
  try {
    sound = useSigilSound();
  } catch {
    /* no sound provider */
  }

  const handlePresetDot = (name: string) => {
    setPreset?.(name);
    sound.play("preset");
  };

  return (
    <LandingSection borderTop padding="96px 24px 48px">
      <div className="relative z-[1] mb-12">
        <HeroLogoField />
        <MonoLabel variant="accent" className="block mb-4">npm install</MonoLabel>

        <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4 max-w-3xl">
          Your Design Systems <br /> Live in One File.
        </h1>

        <DensityText role="body" as="p" muted className="mb-6 max-w-[528px] leading-relaxed">
          The same Radix components you trust, with an agent-first token layer on top.
          100+ components. 259 tokens. One markdown file that humans and AI agents
          both edit to control every color, font, radius, and animation.
        </DensityText>

        <div className="flex items-center gap-3 flex-wrap">
          <AccentCTA asChild>
            <a href="/docs" className="no-underline">Get Started</a>
          </AccentCTA>
          <a
            href="/docs/components/button"
            className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
          >
            View Components
          </a>
        </div>

        <div className="flex items-center gap-2.5 mt-5">
          {PRESET_DOTS.map((p) => (
            <button
              key={p.name}
              type="button"
              title={p.name}
              onClick={() => handlePresetDot(p.name)}
              className="w-2.5 h-2.5 border border-[var(--s-border)] p-0 cursor-pointer transition-transform duration-[var(--s-duration-fast,150ms)] hover:scale-150"
              style={{ background: p.color }}
            />
          ))}
        </div>
      </div>

      <SectionDivider pattern="dots" size="xs" opacity={0.1} showBorders={false} fadeEdges={false} className="my-6" />

      <div className="relative z-[1]">
        <TechFrame variant="overshoot" extend={16} opacity={0.35} padding={16}>
          <div className="s-transition-all">
            <HeroShowcase />
          </div>
        </TechFrame>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* ACT 1 — What Is Sigil?                                             */
/* ================================================================ */

function LayerSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Architecture"
        heading="Four layers. One agent-editable surface."
        description="Tokens define the primitives. Presets bundle them. Components consume them. Pages compose them. The agent layer sits alongside — humans and AI both edit the same token file."
      />
      <LayerStackDiagram />
    </LandingSection>
  );
}

function TokenPipelineSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Token System"
        heading="One file compiles to everything."
        description="Edit sigil.tokens.md. 300+ CSS variables compile. 103 components update instantly."
      />
      <TokenPipelineDiagram />
    </LandingSection>
  );
}

function MarkdownEditorSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Your Token File"
        heading="Your file. Your rules. Your preset."
        description="sigil.tokens.md is the single source of truth for your project's visual identity. Start from a curated preset or write every token from scratch — either way, you own the file and can change any of 259 fields at any time."
      />
      <MarkdownEditorPreview />

      <div className="mt-12">
        <GapPixelGrid columns={{ md: 3 }}>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="mb-3 block">YOUR BRAND COLORS</MonoLabel>
            <DensityText role="body" as="p" muted>
              Set your exact brand colors in OKLCH. Perceptually uniform — lightness,
              chroma, and hue stay consistent across light and dark modes.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="mb-3 block">YOUR FONTS</MonoLabel>
            <DensityText role="body" as="p" muted>
              Display, body, and mono fonts configured once. Every heading, paragraph,
              and code block follows your choices automatically.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="mb-3 block">SAVES AI TOKENS</MonoLabel>
            <DensityText role="body" as="p" muted>
              Agents edit one markdown file instead of hunting through dozens of component
              files. Fewer tokens spent, deterministic output, zero drift.
            </DensityText>
          </GapPixelCell>
        </GapPixelGrid>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* Agent-First Design                                                 */
/* ================================================================ */

function AgentFirstSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Agent-First Design"
        heading="Same components you trust. One file for agents to edit."
        description="Sigil's components are built on Radix primitives and the same patterns behind shadcn/ui — accessible, composable, production-grade. The token layer is the thin control surface that makes them agent-editable without touching component code."
      />

      {/* Core diagram: Components (trusted) + Token layer (agent-editable) */}
      <GapPixelGrid columns={{ md: 2 }} className="mb-12">
        <GapPixelCell className="p-6">
          <MonoLabel variant="accent" className="block mb-4">THE COMPONENTS YOU ALREADY TRUST</MonoLabel>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { name: "Radix Primitives", desc: "Accessible, unstyled behavior layer — focus management, keyboard nav, ARIA" },
              { name: "forwardRef + className", desc: "Standard React patterns. Slot composition. No proprietary abstractions" },
              { name: "Tailwind + clsx + twMerge", desc: "The same class composition stack used across the React ecosystem" },
              { name: "100+ Production Components", desc: "Button, Card, Dialog, Tabs, Accordion, DataTable, Form — battle-tested" },
            ].map((item) => (
              <div key={item.name} className="border-b border-[var(--s-border)] pb-2.5">
                <DensityText role="detail" as="span" className="font-semibold block">{item.name}</DensityText>
                <DensityText role="chrome" as="span" muted>{item.desc}</DensityText>
              </div>
            ))}
          </div>
          <MonoLabel className="block">Nothing proprietary. Standard React components.</MonoLabel>
        </GapPixelCell>

        <GapPixelCell className="p-6 border-l-2 border-l-[var(--s-primary)]">
          <MonoLabel variant="accent" className="block mb-4">THE LAYER AGENTS EDIT</MonoLabel>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { name: "sigil.tokens.md", desc: "One markdown file. 259 fields. Human-readable, agent-writable, git-diffable" },
              { name: "compileToCss()", desc: "Deterministic compiler. Same input always produces same CSS output" },
              { name: "var(--s-*) variables", desc: "300+ CSS custom properties. Components read them — agents never touch components" },
              { name: ".sigil/AGENTS.md", desc: "Auto-generated instructions for any AI agent — preset mood, token conventions, CLI commands" },
            ].map((item) => (
              <div key={item.name} className="border-b border-[var(--s-border)] pb-2.5">
                <DensityText role="detail" as="span" className="font-semibold block text-[var(--s-primary)]">{item.name}</DensityText>
                <DensityText role="chrome" as="span" muted>{item.desc}</DensityText>
              </div>
            ))}
          </div>
          <MonoLabel variant="accent" className="block">Thin control surface. Maximum leverage.</MonoLabel>
        </GapPixelCell>
      </GapPixelGrid>

      {/* Agent workflow: what an agent actually does */}
      <MonoLabel variant="accent" className="block mb-4">WHAT AN AGENT DOES WITH SIGIL</MonoLabel>
      <GapPixelGrid columns={{ md: 4 }}>
        <GapPixelCell className="p-5">
          <TabularValue className="block mb-2 text-[var(--s-primary)] font-bold">01</TabularValue>
          <DensityText role="detail" as="span" className="font-semibold block mb-1">Reads AGENTS.md</DensityText>
          <DensityText role="chrome" as="span" muted>
            Learns the active preset, token naming, component conventions, and available CLI commands.
          </DensityText>
        </GapPixelCell>
        <GapPixelCell className="p-5">
          <TabularValue className="block mb-2 text-[var(--s-primary)] font-bold">02</TabularValue>
          <DensityText role="detail" as="span" className="font-semibold block mb-1">Edits tokens.md</DensityText>
          <DensityText role="chrome" as="span" muted>
            Changes one file — colors, fonts, spacing, radius. One edit instead of hunting through 100+ component files.
          </DensityText>
        </GapPixelCell>
        <GapPixelCell className="p-5">
          <TabularValue className="block mb-2 text-[var(--s-primary)] font-bold">03</TabularValue>
          <DensityText role="detail" as="span" className="font-semibold block mb-1">CSS recompiles</DensityText>
          <DensityText role="chrome" as="span" muted>
            Deterministic output. Same tokens always produce the same 300+ CSS variables. No surprise side effects.
          </DensityText>
        </GapPixelCell>
        <GapPixelCell className="p-5">
          <TabularValue className="block mb-2 text-[var(--s-primary)] font-bold">04</TabularValue>
          <DensityText role="detail" as="span" className="font-semibold block mb-1">Components update</DensityText>
          <DensityText role="chrome" as="span" muted>
            Every component reads var(--s-*). The agent never touches component code — the token layer is the only surface.
          </DensityText>
        </GapPixelCell>
      </GapPixelGrid>

      {/* Why this saves tokens */}
      <div className="mt-12">
        <GapPixelGrid columns={{ md: 3 }}>
          <GapPixelCell className="p-6">
            <TabularValue size="lg" className="block mb-2 font-bold">1 file</TabularValue>
            <MonoLabel variant="accent" className="block mb-2">VS. 100+ COMPONENT FILES</MonoLabel>
            <DensityText role="body" as="p" muted>
              Traditional approach: agent reads and edits dozens of component files to change a color.
              Sigil: one markdown edit. Fewer LLM tokens, faster iteration.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <TabularValue size="lg" className="block mb-2 font-bold">0 drift</TabularValue>
            <MonoLabel variant="accent" className="block mb-2">DETERMINISTIC OUTPUT</MonoLabel>
            <DensityText role="body" as="p" muted>
              The compiler is a pure function. Same tokens.md always produces the same CSS.
              No hallucinated styles, no inconsistent overrides, no entropy.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <TabularValue size="lg" className="block mb-2 font-bold">259 fields</TabularValue>
            <MonoLabel variant="accent" className="block mb-2">COMPLETE VISUAL CONTROL</MonoLabel>
            <DensityText role="body" as="p" muted>
              Colors, fonts, spacing, radius, shadows, motion, borders — the full visual
              identity in one structured file. The agent has total control without total access.
            </DensityText>
          </GapPixelCell>
        </GapPixelGrid>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* ACT 2 — How It Looks                                               */
/* ================================================================ */

const COMPONENT_TABS = [
  "Layout",
  "UI",
  "Navigation",
  "Overlays",
  "Shapes",
  "3D",
  "Diagrams",
  "Marketing",
];

function ComponentsSection() {
  const [activeTab, setActiveTab] = useState("UI");

  return (
    <LandingSection id="components" borderTop>
      <SectionHeader
        label="Components"
        heading="100+ token-driven components."
        description="Every component reads from var(--s-*) tokens. Switch presets and the entire library updates."
      />

      {/* Stats bar */}
      <GapPixelGrid columns={{ sm: 2, md: 4 }} className="mb-10">
        {[
          { value: "100+", label: "Components" },
          { value: "14", label: "Categories" },
          { value: "31", label: "Presets" },
          { value: "259", label: "Tokens" },
        ].map((stat) => (
          <GapPixelCell key={stat.label} className="p-5 text-center">
            <TabularValue size="xl" className="block font-bold">{stat.value}</TabularValue>
            <MonoLabel className="mt-1 block">{stat.label}</MonoLabel>
          </GapPixelCell>
        ))}
      </GapPixelGrid>

      {/* Category tabs */}
      <div className="flex gap-0 border-b border-[var(--s-border)] mb-8 overflow-x-auto">
        {COMPONENT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`bg-transparent border-0 px-4 py-2 cursor-pointer transition-colors duration-[var(--s-duration-fast,150ms)] shrink-0 ${
              activeTab === tab
                ? "text-[var(--s-text)] border-b-2 border-b-[var(--s-primary)]"
                : "text-[var(--s-text-muted)] border-b-2 border-b-transparent hover:text-[var(--s-text)]"
            }`}
          >
            <MonoLabel size="sm" variant={activeTab === tab ? "accent" : "muted"}>{tab}</MonoLabel>
          </button>
        ))}
      </div>

      {/* Live component grid */}
      <TechFrame variant="dimension" extend={12} opacity={0.3} padding={8}>
        <LiveComponentGrid />
      </TechFrame>

      {/* Component anatomy diagram */}
      <div className="mt-12">
        <MonoLabel variant="accent" className="block mb-4">HOW TOKENS FLOW INTO COMPONENTS</MonoLabel>
        <ComponentAnatomyDiagram />
      </div>

      <div className="mt-8 flex gap-3">
        <AccentCTA asChild>
          <a href="/components" className="no-underline">Browse 100+ Components</a>
        </AccentCTA>
        <a
          href="/docs/components/button"
          className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
        >
          Read Docs
        </a>
      </div>
    </LandingSection>
  );
}

function ShapesSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Shapes & Patterns"
        heading="Geometric primitives. Voronoi everything."
        description="Every shape, pattern, and layout rendered inside Voronoi cells — organic tessellation powered by d3-delaunay, driven by your tokens."
      />
      <ShapesAndPatterns />
    </LandingSection>
  );
}

function PresetsSection() {
  return (
    <LandingSection id="presets" borderTop>
      <SectionHeader
        label="Presets"
        heading="Start from 31 presets. Or build your own."
        description="Use a curated preset as-is, fork one as a starting point, or create a fully custom preset from scratch. Your project's sigil.tokens.md is the final authority — not a library."
      />

      <PresetComparisonView />

      {/* Custom preset emphasis */}
      <div className="mt-12">
        <GapPixelGrid columns={{ md: 3 }}>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="block mb-3">START FROM A PRESET</MonoLabel>
            <div
              className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 mb-3"
              style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
            >
              <span className="text-[var(--s-text-muted)]">$</span>{" "}
              <span className="text-[var(--s-text)]">sigil preset noir</span>
            </div>
            <DensityText role="body" as="p" muted>
              31 curated bundles. One command writes all 259 tokens to your file. Use as-is or as a base to customize.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="block mb-3">CREATE YOUR OWN</MonoLabel>
            <div
              className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 mb-3"
              style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
            >
              <span className="text-[var(--s-text-muted)]">$</span>{" "}
              <span className="text-[var(--s-text)]">sigil preset create</span>
            </div>
            <DensityText role="body" as="p" muted>
              Interactive scaffolding. Pick a base, set your brand colors and fonts, and a custom preset is generated that you own and control.
            </DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-6">
            <MonoLabel variant="accent" className="block mb-3">EDIT TOKENS DIRECTLY</MonoLabel>
            <div
              className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 mb-3 leading-relaxed"
              style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
            >
              <div className="text-[var(--s-text-muted)]">## Colors</div>
              <div className="text-[var(--s-primary)]">primary: oklch(0.65 0.2 150)</div>
            </div>
            <DensityText role="body" as="p" muted>
              Open sigil.tokens.md and change any of 259 fields. Your file is the source of truth — presets are just starting points.
            </DensityText>
          </GapPixelCell>
        </GapPixelGrid>
      </div>

      <div className="mt-10 flex gap-3">
        <AccentCTA asChild>
          <a href="/presets" className="no-underline">Browse Presets</a>
        </AccentCTA>
        <a
          href="/sandbox"
          className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
        >
          Create Custom Preset
        </a>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* Demo Sites                                                         */
/* ================================================================ */

const DEMOS = [
  { num: "01", name: "AI SaaS Landing", slug: "ai-saas", preset: "sigil", description: "Modern AI product landing with gradient hero, feature grid, and pricing tiers." },
  { num: "02", name: "Dashboard", slug: "dashboard", preset: "cobalt", description: "Analytics dashboard with KPIs, charts, sidebar navigation, and data tables." },
  { num: "03", name: "E-commerce", slug: "ecommerce", preset: "kova", description: "Product catalog with filters, cart, checkout flow, and order tracking." },
  { num: "04", name: "Developer Docs", slug: "dev-docs", preset: "etch", description: "Documentation site with sidebar nav, code blocks, and API reference." },
  { num: "05", name: "Startup", slug: "startup", preset: "flux", description: "Startup landing page with hero, testimonials, and CTA sections." },
  { num: "06", name: "Portfolio", slug: "portfolio", preset: "noir", description: "Creative portfolio with project grid, about section, and contact form." },
  { num: "07", name: "Blog", slug: "blog", preset: "strata", description: "Editorial blog with article grid, categories, and reading progress." },
  { num: "08", name: "Agency", slug: "agency", preset: "onyx", description: "Agency site with case studies, team section, and service offerings." },
  { num: "09", name: "CLI Tool", slug: "cli-tool", preset: "cipher", description: "Developer tool landing with terminal demo, installation guide, and API docs." },
  { num: "10", name: "Playground", slug: "playground", preset: "dsgn", description: "Interactive sandbox with drag-and-drop canvas and live code editing." },
];

function DemoSitesSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Demos"
        heading="17 production templates."
        description="Real sites built with Sigil. Each uses a different preset."
      />

      <FeaturedGrid columns={3}>
        {/* Featured demo */}
        <GapPixelCell className="p-0">
          <a href="/demos/ai-saas" className="block no-underline group">
            <div
              className="h-32 flex items-end p-6"
              style={{ background: "linear-gradient(135deg, var(--s-primary), color-mix(in oklch, var(--s-primary) 40%, var(--s-surface)))" }}
            >
              <div>
                <DensityText role="headline" as="h3" className="text-[var(--s-primary-contrast,#fff)] text-xl mb-1">AI SaaS Landing</DensityText>
                <MonoLabel variant="inverse" size="xs">sigil preset</MonoLabel>
              </div>
            </div>
            <div className="p-6">
              <DensityText role="body" as="p" muted>Modern AI product landing with gradient hero, feature grid, and pricing tiers.</DensityText>
            </div>
          </a>
        </GapPixelCell>

        {/* Side demo */}
        <GapPixelCell className="p-0">
          <a href="/demos/dashboard" className="block no-underline group h-full">
            <div
              className="h-20 flex items-end p-4"
              style={{ background: "linear-gradient(135deg, oklch(0.55 0.15 240), oklch(0.3 0.08 240))" }}
            >
              <DensityText role="nav" as="h3" className="text-white font-semibold">Dashboard</DensityText>
            </div>
            <div className="p-4">
              <MonoLabel className="mb-2 block">cobalt</MonoLabel>
              <DensityText role="body" as="p" muted className="text-xs">Analytics dashboard with KPIs and data tables.</DensityText>
            </div>
          </a>
        </GapPixelCell>

        {/* Remaining demos */}
        {DEMOS.slice(2, 8).map((demo) => (
          <GapPixelCell key={demo.slug} className="p-0">
            <a href={`/demos/${demo.slug}`} className="block no-underline group">
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-2">
                  <TabularValue size="xs" muted>{demo.num}</TabularValue>
                  <MonoLabel size="xs">{demo.preset}</MonoLabel>
                </div>
                <DensityText role="nav" as="h3" className="font-semibold mb-1">{demo.name}</DensityText>
                <DensityText role="body" as="p" muted className="text-xs line-clamp-2">{demo.description}</DensityText>
              </div>
            </a>
          </GapPixelCell>
        ))}
      </FeaturedGrid>

      <div className="mt-8">
        <AccentCTA asChild>
          <a href="/demos" className="no-underline">View All 17 Templates</a>
        </AccentCTA>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* ACT 3 — How To Use It                                              */
/* ================================================================ */

const CLI_LINES = [
  { text: "npx sigil init", prefix: "$", color: "var(--s-text)", delay: 800 },
  { text: "", delay: 300 },
  { text: "Preset: sigil", prefix: "✓", color: "var(--s-success)", delay: 500 },
  { text: "Created sigil.config.ts", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Created sigil.tokens.md", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Installed token CSS variables", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Ready to import components", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "", delay: 200 },
  { text: "Done in 1.2s", prefix: " ", color: "var(--s-text-muted)", delay: 300 },
];

function QuickStartSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Quick Start"
        heading="Get started in 30 seconds."
        description="Three steps to a complete design system."
      />

      <GapPixelGrid columns={{ md: 3 }} className="mb-12">
        <GapPixelCell className="p-6">
          <MonoLabel variant="accent" className="block mb-3">01 INSTALL</MonoLabel>
          <div
            className="font-[family-name:var(--s-font-mono)] text-[13px] p-3 mb-3"
            style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
          >
            <span className="text-[var(--s-text-muted)]">$</span>{" "}
            <span className="text-[var(--s-text)]">npx create-sigil-app</span>
          </div>
          <DensityText role="body" as="p" muted>
            Interactive setup detects your framework, recommends presets, generates everything.
          </DensityText>
        </GapPixelCell>

        <GapPixelCell className="p-6">
          <MonoLabel variant="accent" className="block mb-3">02 DEFINE YOUR PRESET</MonoLabel>
          <div
            className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 mb-3 leading-relaxed"
            style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
          >
            <div><span className="text-[var(--s-text-muted)]">$</span>{" "}<span className="text-[var(--s-text)]">sigil preset create</span></div>
            <div className="text-[var(--s-text-muted)] text-[10px] mt-1">or start from one of 31 curated presets</div>
          </div>
          <div className="flex gap-1.5 mb-3">
            {PRESET_DOTS.map((p) => (
              <span
                key={p.name}
                className="w-3 h-3 border border-[var(--s-border)]"
                style={{ background: p.color }}
              />
            ))}
          </div>
          <DensityText role="body" as="p" muted>
            Create a custom preset from scratch, fork a curated one, or edit sigil.tokens.md directly. You own the file.
          </DensityText>
        </GapPixelCell>

        <GapPixelCell className="p-6">
          <MonoLabel variant="accent" className="block mb-3">03 BUILD</MonoLabel>
          <div
            className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 mb-3 leading-relaxed"
            style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
          >
            <div className="text-[var(--s-text-muted)]">{"import { Button } from"}</div>
            <div className="text-[var(--s-primary)]">{"  \"@sigil-ui/components\";"}</div>
          </div>
          <DensityText role="body" as="p" muted>
            100+ components that read from your tokens. No prop drilling, no theme objects.
          </DensityText>
        </GapPixelCell>
      </GapPixelGrid>

      <div className="max-w-[720px]">
        <MonoLabel className="block mb-3">~/ — zsh</MonoLabel>
        <Terminal lines={CLI_LINES} title="~/ — zsh" />
      </div>
    </LandingSection>
  );
}

function FinalCTA() {
  return (
    <LandingSection borderTop padding="80px 24px">
      <div className="text-center mx-auto max-w-xl">
        <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(28px,4vw,48px)] font-bold tracking-tight leading-[1.1] text-[var(--s-text)] mb-4">
          Start building.
        </h2>
        <DensityText role="body" as="p" muted className="mb-8 mx-auto max-w-md leading-relaxed">
          One file. 259 tokens. 100+ components. 31 presets. The design system that
          compiles from a single markdown file.
        </DensityText>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <AccentCTA size="lg" asChild>
            <a href="/docs" className="no-underline">Get Started</a>
          </AccentCTA>
          <a
            href="/docs/components/button"
            className="inline-flex items-center px-6 py-3 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[14px] font-medium border border-[var(--s-border)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* Page                                                               */
/* ================================================================ */

export default function LandingPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      {/* Hero */}
      <Hero />

      <LandingDivider pattern="crosshatch" size="md" showBorders />

      {/* ACT 1 — What Is Sigil? */}
      <LayerSection />

      <LandingDivider pattern="dots" size="sm" showBorders />

      <TokenPipelineSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <MarkdownEditorSection />

      <LandingDivider pattern="grid" size="md" showBorders />

      {/* Agent-First Design */}
      <AgentFirstSection />

      <LandingDivider pattern="hatch" size="sm" showBorders />

      {/* ACT 2 — How It Looks */}
      <ComponentsSection />

      <LandingDivider pattern="diamond" size="sm" showBorders />

      <ShapesSection />

      <LandingDivider pattern="crosshatch" size="sm" showBorders />

      <PresetsSection />

      <LandingDivider pattern="dots" size="sm" showBorders />

      <DemoSitesSection />

      <LandingDivider pattern="hatch" size="md" showBorders />

      {/* ACT 3 — How To Use It */}
      <QuickStartSection />

      <FinalCTA />

      <LandingFooter />
    </SigilFrame>
  );
}
