"use client";

import { useState, useEffect } from "react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { FooterComponentDiagram, FooterQuadrantDiagram, HeroLogoField } from "@/components/landing/hero-logo-field";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Terminal } from "@/components/landing/terminal";
import { ComponentGalleryCTA, LiveComponentGrid } from "@/components/landing/live-component";
import { ShapesAndPatterns, ThreeDShowcase } from "@/components/landing/shapes-section";
import { TechFrame } from "@/components/landing/tech-frame";
import { SigilFrame, useIsEdgeless } from "@/components/landing/sigil-frame";
import { TokenPipelineDiagram } from "@/components/landing/token-pipeline";
import { LayerStackDiagram } from "@/components/landing/layer-stack";
import { ComponentAnatomyDiagram } from "@/components/landing/component-anatomy";
import { ComponentStackDiagram } from "@/components/landing/component-stack";
import { PresetComparisonView } from "@/components/landing/preset-comparison";
import { MarkdownEditorPreview } from "@/components/landing/markdown-editor";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";
import { TextureBg } from "@/components/texture-bg";

import {
  SigilSection,
  Divider,
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
      borderTop={false}
      borderBottom={props.borderBottom && !edgeless}
      showCrosses={props.showCrosses && !edgeless}
    />
  );
}

function LandingDivider({
  fadeEdges: _fadeEdges,
  ...props
}: React.ComponentProps<typeof Divider>) {
  let edgeless = false;
  try { edgeless = useIsEdgeless(); } catch { /* outside provider */ }
  if (edgeless) return null;
  return <Divider {...props} fadeEdges={false} />;
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
    <LandingSection borderTop padding="152px 24px 64px" style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.3} />
      <div className="relative z-[1] mb-12">
        <HeroLogoField />
        <MonoLabel variant="accent" className="block mb-4">$ npx create-sigil-app@latest</MonoLabel>

        <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4 max-w-3xl">
          Your Design Systems <br /> Live in One File.
        </h1>

        <DensityText role="body" as="p" muted className="mb-6 max-w-[528px] leading-relaxed">
          The same Radix components you trust, with an agent-first token layer on top.
          {" "}{SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components. {SIGIL_PRODUCT_STATS.tokenCount} tokens. One token file that humans and AI agents
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

    </LandingSection>
  );
}

function ProductSurfaceSection() {
  return (
    <LandingSection borderTop>
      <MonoLabel variant="accent" className="block mb-4">PRODUCT SURFACE GENERATED FROM THE SAME TOKENS</MonoLabel>
      <TechFrame variant="overshoot" extend={16} opacity={0.35} padding={16}>
        <div className="s-transition-all">
          <HeroShowcase />
        </div>
      </TechFrame>
    </LandingSection>
  );
}

function ComponentGalleryBannerSection() {
  return (
    <LandingSection borderTop padding="0 24px 48px">
      <TechFrame variant="dimension" extend={12} opacity={0.3} padding={8}>
        <ComponentGalleryCTA />
      </TechFrame>
    </LandingSection>
  );
}

/* ================================================================ */
/* ACT 1 — What Is Sigil?                                             */
/* ================================================================ */

function LayerSection() {
  return (
    <LandingSection borderTop style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Architecture"
          heading="Four layers. One agent-editable surface."
          description="Tokens define the primitives. Presets bundle them. Components consume them. Pages compose them. The agent layer sits alongside — humans and AI both edit the same token file."
        />
        <LayerStackDiagram />
      </div>
    </LandingSection>
  );
}

function TokenPipelineSection() {
  return (
    <LandingSection borderTop style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Token System"
          heading="One file compiles to everything."
          description={`Edit sigil.tokens.md or token CSS overrides. ${SIGIL_PRODUCT_STATS.tokenCount} token fields compile. ${SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components update instantly.`}
        />
        <TokenPipelineDiagram />
      </div>
    </LandingSection>
  );
}

function MarkdownEditorSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Your Token File"
        heading="Scroll the markdown. Click a token. Watch the system move."
        description="sigil.tokens.md becomes an inspectable design surface: every line maps to a CSS variable, a tiny visualization, and a live component preview."
      />
      <MarkdownEditorPreview />
    </LandingSection>
  );
}

/* ================================================================ */
/* Agent-First Design                                                 */
/* ================================================================ */

function AgentFirstSection() {
  return (
    <LandingSection borderTop style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
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
              { name: `${SIGIL_PRODUCT_STATS.componentCountLabel} Token-Driven Components`, desc: "Button, Card, Dialog, Tabs, Accordion, DataTable, Form — battle-tested" },
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
              { name: "sigil.tokens.md", desc: `One markdown override file. ${SIGIL_PRODUCT_STATS.tokenCount} token system. Human-readable, agent-writable, git-diffable` },
              { name: "compileToCss()", desc: "Deterministic compiler. Same input always produces same CSS output" },
              { name: "var(--s-*) variables", desc: "CSS custom properties. Components read them — agents never touch components" },
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
            Changes one file — colors, fonts, spacing, radius. One edit instead of hunting through {SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components.
          </DensityText>
        </GapPixelCell>
        <GapPixelCell className="p-5">
          <TabularValue className="block mb-2 text-[var(--s-primary)] font-bold">03</TabularValue>
          <DensityText role="detail" as="span" className="font-semibold block mb-1">CSS recompiles</DensityText>
          <DensityText role="chrome" as="span" muted>
            Deterministic output. Same tokens always produce the same CSS variables. No surprise side effects.
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
    <LandingSection id="components" borderTop style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
      <SectionHeader
        label="Components"
        heading="Components that inherit the system."
        description="Every component reads from var(--s-*) tokens. Switch presets and the entire library updates."
      />

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
        <LiveComponentGrid showCta={false} />
      </TechFrame>

      {/* Component anatomy diagram */}
      <div className="mt-12">
        <MonoLabel variant="accent" className="block mb-4">HOW TOKENS FLOW INTO COMPONENTS</MonoLabel>
        <ComponentAnatomyDiagram />
      </div>
      </div>
    </LandingSection>
  );
}

function ComponentStackSection() {
  return (
    <LandingSection borderTop style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Under the Hood"
          heading="One import. Batteries included."
          description="Select a component to see what ships with it — Radix primitives, animation engines, sound feedback, charting libraries — all wired in automatically."
        />
        <ComponentStackDiagram />
      </div>
    </LandingSection>
  );
}

const EVALUATION_CARDS = [
  {
    label: "contrast audit",
    value: "AA",
    title: "Readable by default",
    body: "Every preset can be checked against text, surface, and action contrast before it ships.",
    meter: 92,
  },
  {
    label: "agent safety",
    value: "1 file",
    title: "Constrained edit surface",
    body: "Agents change token fields and generated instructions instead of scattering style overrides.",
    meter: 84,
  },
  {
    label: "visual drift",
    value: "0",
    title: "Compiler-owned output",
    body: "The same token spec always produces the same CSS variables, Tailwind theme, and component look.",
    meter: 100,
  },
];

const PRODUCT_FEATURES = [
  {
    title: "Token workbench",
    label: "inspect",
    body: "Trace a visual decision from markdown to CSS var to live component.",
  },
  {
    title: "Preset switchboard",
    label: "compose",
    body: "Flip the entire visual language without touching page or component code.",
  },
  {
    title: "Agent instructions",
    label: "govern",
    body: "Generated project guidance tells humans and AI where visual changes belong.",
  },
  {
    title: "Component gallery",
    label: "verify",
    body: "Preview real UI under the active preset before adding it to an app.",
  },
];

function MiniBlueprintPanel({ title, label }: { title: string; label: string }) {
  return (
    <div className="relative min-h-[150px] overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)] p-4">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-[1] flex items-center justify-between">
        <MonoLabel variant="accent" size="xs">{label}</MonoLabel>
        <span className="h-2 w-2 bg-[var(--s-primary)]" />
      </div>
      <div className="relative z-[1] mt-8">
        <div className="mb-3 h-3 w-3/5 bg-[var(--s-text)]" />
        <div className="mb-2 h-2 w-4/5 bg-[var(--s-border)]" />
        <div className="h-2 w-1/2 bg-[var(--s-border)]" />
      </div>
      <DensityText role="detail" className="relative z-[1] mt-6 block font-semibold">
        {title}
      </DensityText>
    </div>
  );
}

function EvaluationProductSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Product System"
        heading="Evaluate the system before it becomes UI."
        description="Sigil treats design-system work like product infrastructure: inspectable, measurable, and safe for agents to operate."
      />

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {EVALUATION_CARDS.map((card) => (
            <div key={card.label} className="border border-[var(--s-border)] bg-[var(--s-surface)] p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <MonoLabel variant="accent" size="xs">{card.label}</MonoLabel>
                <TabularValue className="text-[clamp(22px,3vw,40px)] font-bold text-[var(--s-text)]">
                  {card.value}
                </TabularValue>
              </div>
              <DensityText role="headline" as="h3" className="mb-2 text-xl font-semibold">
                {card.title}
              </DensityText>
              <DensityText role="body" as="p" muted className="mb-4 leading-relaxed">
                {card.body}
              </DensityText>
              <Progress value={card.meter} />
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PRODUCT_FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <MiniBlueprintPanel title={feature.title} label={feature.label} />
              <div className="border-x border-b border-[var(--s-border)] bg-[var(--s-surface)] p-4">
                <DensityText role="body" as="p" muted>
                  {feature.body}
                </DensityText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* Capabilities Showcase — inspire, preset swap, ripple, history     */
/* ================================================================ */

const INSPIRE_COLORS = [
  { hex: "#9b99e8", label: "primary", oklch: "oklch(0.65 0.18 275)", count: 47 },
  { hex: "#1a1a24", label: "surface", oklch: "oklch(0.13 0.02 268)", count: 31 },
  { hex: "#e8e8ed", label: "text", oklch: "oklch(0.94 0.01 260)", count: 28 },
  { hex: "#2a2a3a", label: "border", oklch: "oklch(0.22 0.02 270)", count: 19 },
  { hex: "#da8325", label: "accent", oklch: "oklch(0.68 0.16 62)", count: 12 },
  { hex: "#10b981", label: "success", oklch: "oklch(0.72 0.17 168)", count: 8 },
];

const INSPIRE_TOKEN_LINES = [
  "--s-primary: oklch(0.65 0.18 275);",
  "--s-primary-hover: oklch(0.58 0.2 275);",
  "--s-background: oklch(0.13 0.012 260);",
  "--s-surface: oklch(0.18 0.016 260);",
  "--s-text: oklch(0.94 0.008 260);",
  "--s-radius-card: var(--s-radius-lg);",
];

function useTypingEffect(text: string, speed = 30, trigger = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!trigger) { setDisplayed(""); setDone(false); return; }
    let i = 0;
    setDisplayed("");
    setDone(false);
    const tick = () => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
        setTimeout(tick, speed + Math.random() * 16);
      } else {
        setDone(true);
      }
    };
    tick();
  }, [text, speed, trigger]);
  return { displayed, done };
}

function InspireShowcase() {
  const [phase, setPhase] = useState(0);
  const typing = useTypingEffect(
    "sigil inspire https://linear.app --name linear",
    26,
    true,
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Inspire"
        heading="See a site you like? Extract its tokens."
        description="sigil inspire extracts colors from any URL or CSS file, drafts OKLCH tokens, generates a preset file, and creates a preview page — one command."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: terminal + command */}
        <div className="flex flex-col gap-5">
          <div
            className="border border-[var(--s-border)] bg-[var(--s-surface)] p-4"
            style={{ fontFamily: "var(--s-font-mono, ui-monospace, monospace)" }}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--s-border)]">
              <MonoLabel variant="accent" size="xs">Terminal</MonoLabel>
              <Badge variant="outline" size="sm">live</Badge>
            </div>
            <div className="text-[13px]">
              <span className="text-[var(--s-text-muted)]">$ </span>
              <span className="text-[var(--s-text)]">{typing.displayed}</span>
              <span
                className="inline-block w-2 h-4 bg-[var(--s-primary)] ml-0.5 align-middle"
                style={{ opacity: typing.done ? 0 : 1, transition: "opacity 300ms" }}
              />
            </div>
          </div>

          {/* Extracted colors */}
          <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <MonoLabel variant="accent" size="xs" className="block mb-3">Extracted colors</MonoLabel>
            <div className="grid gap-2">
              {INSPIRE_COLORS.map((c, i) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-3 transition-all duration-[var(--s-duration-normal,300ms)]"
                  style={{
                    opacity: phase >= 1 ? 1 : 0,
                    transform: phase >= 1 ? "translateX(0)" : "translateX(-12px)",
                    transitionDelay: phase >= 1 ? `${i * 60}ms` : "0ms",
                  }}
                >
                  <div className="w-4 h-4 border border-[var(--s-border)]" style={{ background: c.hex }} />
                  <MonoLabel size="xs" className="w-14 normal-case tracking-normal">{c.label}</MonoLabel>
                  <DensityText role="chrome" muted className="flex-1">{c.oklch}</DensityText>
                  <TabularValue size="xs" muted>{c.count}x</TabularValue>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: generated token draft */}
        <div
          className="border border-[var(--s-border)] bg-[var(--s-background)] p-4 transition-opacity duration-500"
          style={{ opacity: phase >= 2 ? 1 : 0.3, transitionDelay: phase >= 2 ? "200ms" : "0ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <MonoLabel variant="accent" size="xs">Generated token draft</MonoLabel>
            <Badge variant={phase >= 2 ? "default" : "outline"} size="sm">
              {phase >= 2 ? "Ready" : "Waiting"}
            </Badge>
          </div>
          <div
            className="border border-[var(--s-border)] bg-[var(--s-surface)] p-4"
            style={{ fontFamily: "var(--s-font-mono, ui-monospace, monospace)", fontSize: 12, lineHeight: 1.9 }}
          >
            <div className="text-[var(--s-text-muted)]">{":root {"}</div>
            {INSPIRE_TOKEN_LINES.map((line, i) => (
              <div
                key={i}
                className="pl-4 transition-all duration-[var(--s-duration-normal,300ms)]"
                style={{
                  color: line.includes("primary") ? "var(--s-primary)" : "var(--s-text)",
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "translateY(0)" : "translateY(6px)",
                  transitionDelay: phase >= 2 ? `${400 + i * 80}ms` : "0ms",
                }}
              >
                {line}
              </div>
            ))}
            <div className="text-[var(--s-text-muted)]">{"}"}</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { path: "tokens.css", label: "draft" },
              { path: `preset.ts`, label: "preset" },
              { path: "page.tsx", label: "preview" },
            ].map((file, i) => (
              <div
                key={file.path}
                className="border border-[var(--s-border)] bg-[var(--s-surface)] p-2.5 transition-all duration-[var(--s-duration-normal,300ms)]"
                style={{
                  opacity: phase >= 2 ? 1 : 0,
                  transitionDelay: phase >= 2 ? `${800 + i * 100}ms` : "0ms",
                }}
              >
                <MonoLabel size="xs" className="block normal-case tracking-normal">{file.path}</MonoLabel>
                <DensityText role="chrome" muted>{file.label}</DensityText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LandingSection>
  );
}

const MINI_PRESETS: { name: string; primary: string; bg: string; surface: string; text: string; border: string; radius: string }[] = [
  { name: "sigil", primary: "#9b99e8", bg: "#0f0f14", surface: "#1a1a24", text: "#e8e8ed", border: "#2a2a3a", radius: "8px" },
  { name: "noir", primary: "#d97706", bg: "#0a0a0a", surface: "#141414", text: "#e5e5e5", border: "#262626", radius: "6px" },
  { name: "forge", primary: "#ea580c", bg: "#0c0a09", surface: "#1c1917", text: "#e7e5e4", border: "#292524", radius: "2px" },
  { name: "cipher", primary: "#22c55e", bg: "#0a0f0a", surface: "#141f14", text: "#d4e8d4", border: "#1c3a1c", radius: "4px" },
  { name: "arc", primary: "#7c3aed", bg: "#0f0b1a", surface: "#1a1528", text: "#e8e3f5", border: "#2d2640", radius: "14px" },
  { name: "flux", primary: "#ec4899", bg: "#0f172a", surface: "#1e293b", text: "#e2e8f0", border: "#334155", radius: "12px" },
];

function PresetCycleShowcase() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % MINI_PRESETS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const p = MINI_PRESETS[index];

  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Preset Identity"
        heading="Same components. Different design language."
        description={`${SIGIL_PRODUCT_STATS.presetCount} presets change all 259 tokens at once. Not a theme toggle — a different visual identity. Watch the same page morph.`}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
        {/* Mini site preview */}
        <div
          className="overflow-hidden border transition-all duration-[600ms]"
          style={{
            background: p.bg, color: p.text, borderColor: p.border,
            borderRadius: 8,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Mini navbar */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${p.border}` }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 transition-all duration-[600ms]" style={{ background: p.primary, borderRadius: Number.parseInt(p.radius) / 2 || 2 }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "-0.01em" }}>Sigil / {p.name}</span>
            </div>
            <div className="flex gap-3">
              {["Docs", "Presets", "Lab"].map((l) => (
                <span key={l} className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.08em]" style={{ color: `color-mix(in srgb, ${p.text} 50%, transparent)` }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Mini hero */}
          <div className="px-5 py-7">
            <div className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.16em] mb-2 transition-colors duration-[600ms]" style={{ color: p.primary }}>
              Design system
            </div>
            <div className="text-xl font-bold tracking-[-0.03em] leading-[1.1] mb-2">
              One token file.<br />Every component.
            </div>
            <div className="text-[11px] leading-[1.6] mb-4" style={{ color: `color-mix(in srgb, ${p.text} 60%, transparent)`, maxWidth: 260 }}>
              259 tokens control your entire visual identity.
            </div>
            <div className="flex gap-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.04em] px-4 py-1.5 transition-all duration-[600ms]" style={{ background: p.primary, color: p.bg, borderRadius: p.radius }}>Get Started</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.04em] px-4 py-1.5 transition-all duration-[600ms]" style={{ border: `1px solid ${p.border}`, borderRadius: p.radius }}>Browse</div>
            </div>
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-3 gap-px transition-all duration-[600ms]" style={{ background: p.border }}>
            {["259", "46", "1"].map((val, i) => (
              <div key={i} className="p-3.5 transition-all duration-[600ms]" style={{ background: p.surface }}>
                <div className="font-[family-name:var(--s-font-mono)] text-lg font-bold tracking-[-0.02em] transition-colors duration-[600ms]" style={{ color: p.primary }}>{val}</div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.06em]">
                  {["Tokens", "Presets", "Agent"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preset selector + info */}
        <div className="flex flex-col gap-5">
          <GapPixelGrid columns={{ base: 3, sm: 6 }} gap={1}>
            {MINI_PRESETS.map((preset, i) => (
              <GapPixelCell
                key={preset.name}
                className="flex flex-col items-center gap-2 p-3 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface)]"
                style={{ background: index === i ? "var(--s-surface)" : undefined }}
                onClick={() => setIndex(i)}
              >
                <div
                  className="w-5 h-5 border-2 transition-all duration-300"
                  style={{
                    background: preset.primary,
                    borderColor: index === i ? "var(--s-text)" : "transparent",
                    borderRadius: "50%",
                    transform: index === i ? "scale(1.25)" : "scale(1)",
                  }}
                />
                <MonoLabel size="xs" variant={index === i ? "accent" : "muted"}>{preset.name}</MonoLabel>
              </GapPixelCell>
            ))}
          </GapPixelGrid>

          <div className="border border-[var(--s-border)] bg-[var(--s-surface)] p-5">
            <MonoLabel variant="accent" size="xs" className="block mb-3">Active preset</MonoLabel>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "primary", value: p.primary },
                { label: "radius", value: p.radius },
                { label: "background", value: p.bg },
                { label: "border", value: p.border },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-[var(--s-border)] pb-2">
                  <MonoLabel size="xs" className="normal-case tracking-normal">{row.label}</MonoLabel>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-[var(--s-border)]" style={{ background: row.value }} />
                    <DensityText role="chrome" muted>{row.value}</DensityText>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <MonoLabel variant="accent" size="xs" className="block mb-2">One command</MonoLabel>
            <div className="font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text)]">
              <span className="text-[var(--s-text-muted)]">$ </span>sigil preset {p.name}
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}

const RIPPLE_COMPONENTS = ["Button", "Card", "Input", "Badge", "Dialog", "Navbar", "Tooltip", "Progress"];

function TokenRippleShowcase() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => !prev), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Token Propagation"
        heading="Edit one token. Every component updates."
        description="Components read from CSS variables. Change --s-primary and every button, link, focus ring, badge, gradient, and glow updates. One file. Zero component edits."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Token source */}
        <div className="flex flex-col gap-4">
          <div className="border border-[var(--s-border)] bg-[var(--s-surface)] p-4">
            <MonoLabel variant="accent" size="xs" className="block mb-3">Token source</MonoLabel>
            <div
              className="border border-[var(--s-border)] bg-[var(--s-background)] px-4 py-3"
              style={{ fontFamily: "var(--s-font-mono, ui-monospace, monospace)", fontSize: 13 }}
            >
              <span className="text-[var(--s-text-muted)]">--s-primary: </span>
              <span
                className="transition-colors duration-[var(--s-duration-normal,300ms)]"
                style={{ color: active ? "var(--s-primary)" : "var(--s-text-muted)" }}
              >
                {active ? "oklch(0.65 0.24 275)" : "oklch(0.45 0.08 260)"}
              </span>
            </div>
          </div>

          <div className="border border-[var(--s-border)] bg-[var(--s-surface)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{ background: active ? "var(--s-success)" : "var(--s-text-muted)" }}
              />
              <MonoLabel size="xs" variant={active ? "accent" : "muted"}>
                {active ? "Propagating to 200+ components" : "Waiting for token change..."}
              </MonoLabel>
            </div>
            <Progress value={active ? 100 : 0} className="transition-all duration-[800ms]" />
          </div>
        </div>

        {/* Component grid that lights up */}
        <GapPixelGrid columns={{ base: 2, sm: 4 }} gap={1}>
          {RIPPLE_COMPONENTS.map((name, i) => (
            <GapPixelCell
              key={name}
              className="p-3.5 text-center transition-all duration-[var(--s-duration-normal,300ms)]"
              style={{
                background: active ? "var(--s-primary)" : "var(--s-background)",
                color: active ? "var(--s-background)" : "var(--s-text-muted)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <MonoLabel size="xs" variant="muted" style={{ color: "inherit" }}>{name}</MonoLabel>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </div>
    </LandingSection>
  );
}

const HISTORY_SNAPSHOTS = [
  { name: "Launch v1", preset: "sigil", time: "2:14 PM", color: "#9b99e8" },
  { name: "Dark rebrand", preset: "noir", time: "3:42 PM", color: "#d97706" },
  { name: "Investor deck", preset: "flux", time: "5:08 PM", color: "#ec4899" },
];

function DesignHistoryShowcase() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Design History"
        heading="Save your direction. Compare. Restore."
        description="The sandbox saves full token snapshots to local storage. Name them, compare against current tokens, export as JSON, restore any saved state instantly."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Snapshot list */}
        <div className="border border-[var(--s-border)] bg-[var(--s-surface)]">
          <div className="flex items-center justify-between border-b border-[var(--s-border)] p-4">
            <MonoLabel variant="accent" size="xs">Saved states</MonoLabel>
            <Badge variant="outline" size="sm">{HISTORY_SNAPSHOTS.length} snapshots</Badge>
          </div>
          <div className="divide-y divide-[var(--s-border)]">
            {HISTORY_SNAPSHOTS.map((snap, i) => (
              <div
                key={snap.name}
                className="flex items-center justify-between p-4 transition-all duration-[var(--s-duration-normal,300ms)]"
                style={{
                  opacity: phase > i ? 1 : 0,
                  transform: phase > i ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: snap.color }} />
                  <DensityText role="detail" className="font-semibold">{snap.name}</DensityText>
                </div>
                <div className="flex items-center gap-3">
                  <MonoLabel size="xs" className="normal-case tracking-normal">{snap.preset}</MonoLabel>
                  <DensityText role="chrome" muted>{snap.time}</DensityText>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions + restore confirmation */}
        <div className="flex flex-col gap-4">
          <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <MonoLabel variant="accent" size="xs" className="block mb-3">Actions</MonoLabel>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Restore</Button>
              <Button variant="outline" size="sm">Export JSON</Button>
              <Button variant="outline" size="sm">Compare</Button>
            </div>
          </div>

          <div
            className="border bg-[var(--s-surface)] p-4 transition-all duration-500"
            style={{
              borderColor: phase >= 4 ? "var(--s-success)" : "var(--s-border)",
              opacity: phase >= 4 ? 1 : 0.3,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{ background: phase >= 4 ? "var(--s-success)" : "var(--s-text-muted)" }}
              />
              <MonoLabel size="xs" variant={phase >= 4 ? "accent" : "muted"}>
                {phase >= 4 ? "Restored — \"Launch v1\" applied" : "Select a snapshot to compare"}
              </MonoLabel>
            </div>
            {phase >= 4 && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { token: "--s-primary", from: "#ec4899", to: "#9b99e8" },
                  { token: "--s-radius-md", from: "12px", to: "8px" },
                ].map((diff) => (
                  <div key={diff.token} className="border border-[var(--s-border)] bg-[var(--s-background)] p-2.5">
                    <MonoLabel size="xs" className="block mb-1 normal-case tracking-normal text-[var(--s-primary)]">{diff.token}</MonoLabel>
                    <div className="flex items-center gap-2 font-[family-name:var(--s-font-mono)] text-[10px]">
                      <span className="text-[var(--s-text-muted)] line-through">{diff.from}</span>
                      <span className="text-[var(--s-text-muted)]">&rarr;</span>
                      <span className="text-[var(--s-text)]">{diff.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <MonoLabel variant="accent" size="xs" className="block mb-2">Try it</MonoLabel>
            <DensityText role="body" as="p" muted className="mb-3 text-sm">
              Open the sandbox, switch between presets, and save named snapshots from the History tab.
            </DensityText>
            <Button variant="outline" size="sm" asChild>
              <a href="/sandbox" className="no-underline">Open Sandbox</a>
            </Button>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}

const COMMAND_CARDS = [
  {
    command: "npx create-sigil-app",
    title: "Create a new app",
    body: "Bootstraps project files, token CSS, base preset, docs links, and agent instructions.",
    output: ["framework detected", "tokens written", "components ready"],
  },
  {
    command: "sigil init",
    title: "Install into an existing app",
    body: "Detects your stack and wires Sigil into the current project without replacing your app.",
    output: ["config created", "css imported", "doctor passing"],
  },
  {
    command: "sigil add button card input",
    title: "Add components",
    body: "Copies token-bound components into your project so they inherit the active visual system.",
    output: ["button.tsx", "card.tsx", "input.tsx"],
  },
  {
    command: "sigil preset forge",
    title: "Switch visual language",
    body: "Writes a complete preset into the token file and refreshes the compiled CSS variables.",
    output: ["259 fields", "css variables", "theme updated"],
  },
  {
    command: "sigil inspire https://example.com",
    title: "Draft tokens from a reference",
    body: "Extracts colors from a URL or CSS file, drafts OKLCH tokens, and scaffolds a preset file and preview page.",
    output: ["colors extracted", "preset drafted", "preview page"],
  },
  {
    command: "sigil docs",
    title: "Generate library docs",
    body: "Writes project docs and llms.txt from your active config, installed components, and token file.",
    output: ["sigil-project.md", "llms.txt", "agent context"],
  },
  {
    command: "sigil adapter shadcn",
    title: "Bridge existing systems",
    body: "Creates compatibility CSS so shadcn, Bootstrap, or Material variables inherit your Sigil tokens.",
    output: ["variable map", "css written", "one import"],
  },
  {
    command: "sigil diff",
    title: "Review design changes",
    body: "Shows token-level changes before you commit, so visual updates stay reviewable.",
    output: ["colors changed", "radius changed", "motion unchanged"],
  },
  {
    command: "sigil doctor",
    title: "Validate the install",
    body: "Checks config, token file, CSS import, component paths, dependencies, and preset health.",
    output: ["config ok", "tokens ok", "components ok"],
  },
];

function CommandSurfaceSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="CLI Surface"
        heading="Every command maps to a product action."
        description="The CLI is not just installation glue. It is the control plane for creating, changing, auditing, and validating your design system."
      />

      <div className="grid gap-0 border border-[var(--s-border)] md:grid-cols-2 lg:grid-cols-3">
        {COMMAND_CARDS.map((card) => (
          <div key={card.command} className="border-b border-r border-[var(--s-border)] bg-[var(--s-background)] p-5 last:border-r-0">
            <div className="mb-4 border border-[var(--s-border)] bg-[var(--s-surface)] px-3 py-2 font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text)]">
              <span className="text-[var(--s-text-muted)]">$</span> {card.command}
            </div>
            <DensityText role="headline" as="h3" className="mb-2 text-xl font-semibold">
              {card.title}
            </DensityText>
            <DensityText role="body" as="p" muted className="mb-5 leading-relaxed">
              {card.body}
            </DensityText>
            <div className="grid gap-2">
              {card.output.map((item) => (
                <div key={item} className="flex items-center justify-between border border-[var(--s-border-muted)] px-2.5 py-1.5">
                  <MonoLabel size="xs" className="normal-case tracking-normal">{item}</MonoLabel>
                  <span className="h-1.5 w-1.5 bg-[var(--s-primary)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LandingSection>
  );
}

function ShapesSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="Shapes & Patterns"
        heading="Voronoi bentos with actual content."
        description="Irregular polygon cells that hold real shapes, stats, pattern fields, and product copy without cropping a rectangular layout."
      />
      <ShapesAndPatterns />
    </LandingSection>
  );
}

function ThreeDSection() {
  return (
    <LandingSection borderTop>
      <SectionHeader
        label="3D Components"
        heading="Projected UI without leaving CSS."
        description="Isometric scenes, prisms, exploded boxes, tilt cards, and depth stacks all inherit the active token system."
      />
      <ThreeDShowcase />
    </LandingSection>
  );
}

function PresetsSection() {
  return (
    <LandingSection id="presets" borderTop>
      <SectionHeader
        label="Presets"
        heading={`Start from ${SIGIL_PRODUCT_STATS.presetCount} presets. Or build your own.`}
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
              {SIGIL_PRODUCT_STATS.presetCount} curated bundles. One command writes the token layer to your file. Use as-is or as a base to customize.
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
  { text: "npx create-sigil-app@latest acme-ui", prefix: "$", color: "var(--s-text)", delay: 650 },
  { text: "", delay: 180 },
  { text: "Detected Next.js + Tailwind", prefix: "→", color: "var(--s-text-muted)", delay: 320 },
  { text: "Selected preset: sigil", prefix: "✓", color: "var(--s-success)", delay: 360 },
  { text: "Created sigil.tokens.md", prefix: "✓", color: "var(--s-success)", delay: 340 },
  { text: "Wrote token CSS variables", prefix: "✓", color: "var(--s-success)", delay: 340 },
  { text: "Installed Button, Card, Input", prefix: "✓", color: "var(--s-success)", delay: 340 },
  { text: "Generated .sigil/AGENTS.md", prefix: "✓", color: "var(--s-success)", delay: 340 },
  { text: "", delay: 160 },
  { text: "Ready in 00:28", prefix: " ", color: "var(--s-primary)", delay: 280 },
];

const QUICK_START_STEPS = [
  {
    time: "00-08s",
    title: "Scaffold",
    command: "npx create-sigil-app@latest",
    body: "Detects your framework, package manager, Tailwind setup, and where token CSS should land.",
  },
  {
    time: "08-18s",
    title: "Pick a system",
    command: "sigil preset sigil",
    body: `Start from one of ${SIGIL_PRODUCT_STATS.presetCount} presets or let the installer recommend one from your product type.`,
  },
  {
    time: "18-30s",
    title: "Ship components",
    command: "sigil add button card input",
    body: "Components already read var(--s-*), so agents can change the system without touching React.",
  },
];

const GENERATED_FILES = [
  { path: "sigil.tokens.md", detail: `${SIGIL_PRODUCT_STATS.tokenCount} token system` },
  { path: "app/sigil.css", detail: "CSS variables" },
  { path: ".sigil/AGENTS.md", detail: "agent instructions" },
  { path: "components/ui/*", detail: "token-bound UI" },
];

function QuickStartSection() {
  return (
    <LandingSection borderTop padding="88px 24px">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <MonoLabel variant="accent" size="sm" className="mb-4 block">/ Quick Start</MonoLabel>
          <h2 className="mb-4 max-w-[620px] font-[family-name:var(--s-font-display)] text-[clamp(36px,5vw,72px)] font-bold leading-[0.96] tracking-[-0.05em] text-[var(--s-text)]">
            Get started in 30 seconds.
          </h2>
          <DensityText role="body" as="p" muted className="max-w-[600px] leading-relaxed">
            One command creates the token file, installs the CSS variable pipeline,
            drops in starter components, and writes the agent instructions your project needs.
          </DensityText>
        </div>

        <div className="grid grid-cols-3 border border-[var(--s-border)] bg-[var(--s-surface)]">
          {[
            ["00:30", "target setup"],
            ["259", "token fields"],
            ["200+", "token-driven components"],
          ].map(([value, label]) => (
            <div key={label} className="border-r border-[var(--s-border)] p-5 last:border-r-0">
              <TabularValue className="block text-[clamp(24px,4vw,48px)] font-bold text-[var(--s-text)]">
                {value}
              </TabularValue>
              <MonoLabel size="xs" variant="muted">{label}</MonoLabel>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)] p-4 sm:p-6">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-[1] mb-4 flex items-center justify-between gap-4">
            <MonoLabel variant="accent">installer trace</MonoLabel>
            <Badge variant="outline" className="font-[family-name:var(--s-font-mono)]">live output</Badge>
          </div>
          <div className="relative z-[1]">
            <Terminal lines={CLI_LINES} title="create-sigil-app" />
          </div>
          <div className="relative z-[1] mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GENERATED_FILES.map((file) => (
              <div key={file.path} className="border border-[var(--s-border)] bg-[var(--s-surface)] p-3">
                <MonoLabel size="xs" className="mb-2 block normal-case tracking-normal">
                  {file.path}
                </MonoLabel>
                <DensityText role="chrome" muted>{file.detail}</DensityText>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {QUICK_START_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden border border-[var(--s-border)] bg-[var(--s-surface)] p-5 transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-background)]"
            >
              <div
                className="absolute inset-y-0 left-0 w-1"
                style={{ background: index === 0 ? "var(--s-primary)" : PRESET_DOTS[index + 1]?.color }}
              />
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <MonoLabel variant="accent" size="xs" className="mb-2 block">
                    {String(index + 1).padStart(2, "0")} / {step.time}
                  </MonoLabel>
                  <DensityText role="headline" as="h3" className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </DensityText>
                </div>
                <TabularValue muted>{step.time.split("-")[1]}</TabularValue>
              </div>
              <div className="mb-4 overflow-x-auto whitespace-nowrap border border-[var(--s-border)] bg-[var(--s-background)] px-3 py-2 font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text)]">
                <span className="text-[var(--s-text-muted)]">$</span> {step.command}
              </div>
              <DensityText role="body" as="p" muted className="leading-relaxed">
                {step.body}
              </DensityText>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border border-[var(--s-border)] bg-[color-mix(in_oklch,var(--s-primary)_5%,var(--s-background))] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <MonoLabel variant="accent" className="mb-1 block">ready for agents</MonoLabel>
          <DensityText role="body" as="p" muted>
            The generated project tells humans and AI the same rule: edit tokens, not component styling.
          </DensityText>
        </div>
        <div className="flex flex-wrap gap-3">
          <AccentCTA asChild>
            <a href="/docs" className="no-underline">Start Now</a>
          </AccentCTA>
          <a
            href="/sandbox"
            className="inline-flex items-center border border-[var(--s-border)] bg-transparent px-5 py-2.5 font-[family-name:var(--s-font-mono)] text-[13px] font-medium text-[var(--s-text)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
          >
            Try Sandbox
          </a>
        </div>
      </div>
    </LandingSection>
  );
}

function FinalCTA() {
  return (
    <LandingSection borderTop padding="80px 24px" style={{ position: "relative", overflow: "hidden" }}>
      <TextureBg opacity={0.45} darkOpacity={0.35} />
      <div className="relative z-[1] mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-4 font-[family-name:var(--s-font-display)] text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-[var(--s-text)]">
            Start building.
          </h2>
          <DensityText role="body" as="p" muted className="mb-8 max-w-md leading-relaxed">
            One file. {SIGIL_PRODUCT_STATS.tokenCount} tokens. {SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components. {SIGIL_PRODUCT_STATS.presetCount} presets. The design system that
            compiles from a single token layer.
          </DensityText>
          <div className="flex flex-wrap items-center gap-3">
            <AccentCTA size="lg" asChild>
              <a href="/docs" className="no-underline">Get Started</a>
            </AccentCTA>
            <a
              href="/docs/components/button"
              className="inline-flex items-center border border-[var(--s-border)] bg-transparent px-6 py-3 font-[family-name:var(--s-font-mono)] text-[14px] font-medium text-[var(--s-text)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
            >
              Read the Docs
            </a>
          </div>
        </div>
        <div className="hidden grid-cols-2 gap-3 md:grid">
          <div
            className="relative min-h-[320px] overflow-hidden border border-[var(--s-border)]"
            style={{
              borderStyle: "var(--s-border-style, solid)",
              borderRadius: "var(--s-radius-md, 8px)",
              background: "var(--s-background)",
            }}
          >
            <FooterQuadrantDiagram />
            <div
              className="absolute bottom-4 left-4 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em]"
              style={{ color: "var(--s-text-muted)" }}
            >
              blueprint variants / 20
            </div>
          </div>
          <div
            className="relative min-h-[320px] overflow-hidden border border-[var(--s-border)]"
            style={{
              borderStyle: "var(--s-border-style, solid)",
              borderRadius: "var(--s-radius-md, 8px)",
              background: "var(--s-background)",
            }}
          >
            <FooterComponentDiagram />
            <div
              className="absolute bottom-4 left-4 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em]"
              style={{ color: "var(--s-text-muted)" }}
            >
              component blueprint
            </div>
          </div>
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

      <LandingDivider pattern="vertical" size="md" showBorders />

      <ProductSurfaceSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <ComponentGalleryBannerSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      {/* ACT 1 — What Is Sigil? */}
      <LayerSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <TokenPipelineSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <MarkdownEditorSection />

      <LandingDivider pattern="vertical" size="md" showBorders />

      {/* Agent-First Design */}
      <AgentFirstSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* ACT 2 — How It Looks */}
      <ComponentsSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* Component Stack — what's under each component */}
      <ComponentStackSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <EvaluationProductSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* Capabilities Showcase */}
      <InspireShowcase />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <PresetCycleShowcase />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <TokenRippleShowcase />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <DesignHistoryShowcase />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <CommandSurfaceSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <ThreeDSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <ShapesSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <PresetsSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      <DemoSitesSection />

      <LandingDivider pattern="vertical" size="md" showBorders />

      {/* ACT 3 — How To Use It */}
      <QuickStartSection />

      <FinalCTA />

      <LandingFooter />
    </SigilFrame>
  );
}
