"use client";

import { useState } from "react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { HeroLogoField } from "@/components/landing/hero-logo-field";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { PresetShowcase } from "@/components/landing/preset-showcase";
import { PresetTable } from "@/components/landing/preset-table";
import { Terminal } from "@/components/landing/terminal";
import {
  TokenFlowDiagram,
  PresetTransitionDemo,
  CodeExample,
  ParallaxSection,
} from "@/components/landing/interactive-diagrams";
import { LiveComponentGrid } from "@/components/landing/live-component";
import { ShapesAndPatterns } from "@/components/landing/shapes-section";
import { ProductDemo } from "@/components/landing/product-demo-section";
import { TechFrame } from "@/components/landing/tech-frame";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";

import { SigilSection, SectionDivider } from "@sigil-ui/components";

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
        <span className="s-label">/ {label}</span>
      </div>
      <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(24px,3vw,40px)] font-bold tracking-tight leading-[1.1] text-[var(--s-text)] mb-3">
        {heading}
      </h2>
      {description && (
        <p
          className="s-mono text-sm leading-relaxed text-[var(--s-text-muted)]"
          style={{ maxWidth: maxDescWidth }}
        >
          {description}
        </p>
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
    <SigilSection borderTop padding="96px 24px 48px">
      <div className="relative z-[1] mb-12">
        <HeroLogoField />
        <span className="s-label block mb-4">/ sigil ui</span>

        <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4 max-w-3xl">
          Design Systems That Live in One File.
        </h1>

        <p className="s-mono text-sm leading-relaxed text-[var(--s-text-secondary)] mb-6 max-w-[528px]">
          100+ components. 300+ tokens. 30 presets. One markdown file controls
          every color, radius, border, and sound.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="/docs"
            className="inline-flex items-center px-5 py-2.5 bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] font-[family-name:var(--s-font-mono)] text-[13px] font-semibold border border-[var(--s-primary)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:brightness-110"
          >
            Get Started
          </a>
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
    </SigilSection>
  );
}

/* ================================================================ */
/* 2 — Token System                                                   */
/* ================================================================ */

function TokenSystem() {
  return (
    <SigilSection borderTop>
      <SectionHeader
        label="Token System"
        heading="One file compiles to everything."
        description="Edit sigil.tokens.md. 300+ CSS variables compile. 103 components update instantly."
      />

      <ParallaxSection speed={0.03}>
        <TechFrame variant="brackets" extend={12} opacity={0.4} padding={24}>
          <TokenFlowDiagram />
        </TechFrame>
      </ParallaxSection>

      <SectionDivider pattern="hatch" size="xs" opacity={0.08} showBorders={false} fadeEdges={false} className="my-12" />

      <div className="mt-12">
        <TechFrame variant="crosshair" extend={12} opacity={0.3} padding={12}>
          <PresetTransitionDemo />
        </TechFrame>
      </div>

      <SectionDivider pattern="diagonal" size="xs" opacity={0.08} showBorders={false} fadeEdges={false} className="my-12" />

      <div className="mt-12">
        <TechFrame variant="ticks" extend={8} opacity={0.25}>
          <CodeExample
          filename="app/layout.tsx"
          language="tsx"
          code={`import { SigilShell } from "@sigil-ui/components";

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <SigilShell>{children}</SigilShell>
      </body>
    </html>
  );
}`}
          highlightLines={[1, 6]}
        />
        </TechFrame>
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 3 — Components                                                     */
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

function Components() {
  const [activeTab, setActiveTab] = useState("UI");

  return (
    <SigilSection id="components" borderTop>
      <SectionHeader
        label="Components"
        heading="100+ token-driven components."
        description="Every component reads from var(--s-*) tokens. Switch presets and the entire library updates."
      />

      <div className="flex gap-0 border-b border-[var(--s-border)] mb-8 overflow-x-auto">
        {COMPONENT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`s-mono bg-transparent border-0 px-4 py-2 text-xs font-[family-name:var(--s-font-mono)] tracking-[0.02em] cursor-pointer transition-colors duration-[var(--s-duration-fast,150ms)] shrink-0 ${
              activeTab === tab
                ? "text-[var(--s-text)] border-b-2 border-b-[var(--s-primary)]"
                : "text-[var(--s-text-muted)] border-b-2 border-b-transparent hover:text-[var(--s-text)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <TechFrame variant="dimension" extend={12} opacity={0.3} padding={8}>
        <LiveComponentGrid />
      </TechFrame>

      <a
        href="/docs/components/button"
        className="s-mono inline-block mt-6 text-[13px] text-[var(--s-text-muted)] no-underline hover:text-[var(--s-primary)] transition-colors duration-[var(--s-duration-fast,150ms)]"
      >
        79 more in /docs →
      </a>
    </SigilSection>
  );
}

/* ================================================================ */
/* 4 — Shapes & Patterns                                              */
/* ================================================================ */

function Shapes() {
  return (
    <SigilSection borderTop>
      <SectionHeader
        label="Shapes & Patterns"
        heading="Geometric primitives."
        description="Decorative shapes, tessellations, and pattern fills — all driven by tokens."
      />
      <ShapesAndPatterns />
    </SigilSection>
  );
}

/* ================================================================ */
/* 5 — Presets                                                        */
/* ================================================================ */

function Presets() {
  return (
    <SigilSection id="presets" borderTop>
      <SectionHeader
        label="Presets"
        heading="31 curated presets."
        description="One command switches all 259 tokens at once. Six aesthetic families."
      />

      <TechFrame variant="ticks" extend={8} opacity={0.3}>
        <PresetTable />
      </TechFrame>

      <SectionDivider pattern="grid" size="xs" opacity={0.08} showBorders={false} fadeEdges={false} className="my-12" />

      <div className="mt-12">
        <TechFrame variant="overshoot" extend={16} opacity={0.25} padding={12}>
          <PresetShowcase />
        </TechFrame>
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 6 — Demo Sites                                                     */
/* ================================================================ */

const DEMOS = [
  { num: "01", name: "AI SaaS Landing", url: "ai-saas.sigil-ui.dev", href: "/demos/ai-saas" },
  { num: "02", name: "Dashboard", url: "dashboard.sigil-ui.dev", href: "/demos/dashboard" },
  { num: "03", name: "E-commerce", url: "shop.sigil-ui.dev", href: "/demos/ecommerce" },
  { num: "04", name: "Developer Docs", url: "docs.sigil-ui.dev", href: "/demos/dev-docs" },
  { num: "05", name: "Startup", url: "startup.sigil-ui.dev", href: "/demos/startup" },
  { num: "06", name: "Portfolio", url: "portfolio.sigil-ui.dev", href: "/demos/portfolio" },
  { num: "07", name: "Blog", url: "blog.sigil-ui.dev", href: "/demos/blog" },
  { num: "08", name: "Agency", url: "agency.sigil-ui.dev", href: "/demos/agency" },
  { num: "09", name: "CLI Tool", url: "cli.sigil-ui.dev", href: "/demos/cli-tool" },
  { num: "10", name: "Playground", url: "play.sigil-ui.dev", href: "/demos/playground" },
];

function DemoSites() {
  return (
    <SigilSection borderTop>
      <SectionHeader
        label="Demos"
        heading="10 production templates."
        description="Real sites built with Sigil. Each uses a different preset."
      />

      <TechFrame variant="brackets" extend={12} opacity={0.3} padding={8}>
        <div className="flex flex-col">
          {DEMOS.map((demo) => (
            <a
              key={demo.num}
              href={demo.href}
              className="group grid grid-cols-[48px_1fr_32px] md:grid-cols-[48px_1fr_1fr_32px] items-center gap-4 py-3.5 border-b border-[var(--s-border-muted)] no-underline text-inherit hover:bg-[var(--s-surface)] transition-colors duration-[var(--s-duration-fast,150ms)]"
            >
              <span className="s-mono text-lg font-medium text-[var(--s-text-muted)] tracking-[-0.02em] tabular-nums">
                {demo.num}
              </span>
              <span className="text-[15px] font-semibold text-[var(--s-text)] font-[family-name:var(--s-font-body)]">
                {demo.name}
              </span>
              <span className="s-mono text-xs text-[var(--s-text-subtle)] hidden md:block">
                {demo.url}
              </span>
              <span className="text-base text-[var(--s-text-muted)] text-right group-hover:text-[var(--s-primary)] transition-colors duration-[var(--s-duration-fast,150ms)]">
                →
              </span>
            </a>
          ))}
        </div>
      </TechFrame>
    </SigilSection>
  );
}

/* ================================================================ */
/* 7 — CLI                                                            */
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

function CLISection() {
  return (
    <SigilSection borderTop>
      <SectionHeader
        label="CLI"
        heading="One command."
        description="Interactive setup. Detects your framework, recommends presets, generates everything."
      />

      <TechFrame variant="dimension" extend={12} opacity={0.3} className="max-w-[720px]">
        <Terminal lines={CLI_LINES} title="~/ — zsh" />
      </TechFrame>
    </SigilSection>
  );
}

/* ================================================================ */
/* Page                                                               */
/* ================================================================ */

export default function LandingPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      <Hero />

      <SectionDivider pattern="crosshatch" size="md" showBorders />

      <TokenSystem />

      <SectionDivider pattern="dots" size="sm" showBorders />

      <Components />

      <SectionDivider pattern="diagonal" size="lg" showBorders />

      <Shapes />

      <SectionDivider pattern="grid" size="md" showBorders />

      <Presets />

      <SectionDivider pattern="diamond" size="sm" showBorders />

      <DemoSites />

      <SigilSection borderTop>
        <ProductDemo />
      </SigilSection>

      <SectionDivider pattern="hatch" size="md" showBorders />

      <CLISection />

      <LandingFooter />
    </SigilFrame>
  );
}
