"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check as CheckIcon } from "lucide-react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { FooterComponentDiagram, FooterQuadrantDiagram, HeroLogoField } from "@/components/landing/hero-logo-field";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Terminal } from "@/components/landing/terminal";
import { ComponentGalleryCTA } from "@/components/landing/live-component";
import { ThreeDShowcase } from "@/components/landing/shapes-section";
import { SigilFrame, useIsEdgeless } from "@/components/landing/sigil-frame";
import { TokenPipelineDiagram } from "@/components/landing/token-pipeline";
import { LayerStackDiagram } from "@/components/landing/layer-stack";
import { ComponentAnatomyDiagram } from "@/components/landing/component-anatomy";
import { ComponentStackDiagram } from "@/components/landing/component-stack";
import { PresetComparisonView } from "@/components/landing/preset-comparison";
import { MarkdownEditorPreview } from "@/components/landing/markdown-editor";
import { useOptionalSigilActions } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";
import { MINI_PRESETS, PresetMorphScene } from "@/components/landing/scenes/PresetMorphScene";
import { CliDiagram, voronoiBounds } from "@/components/landing/scenes/CliDiagram";
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
  FeaturedGrid,
  Badge,
} from "@sigil-ui/components";

/* ================================================================ */
/* Edgeless-aware section wrapper                                     */
/* ================================================================ */

function LandingSection(props: React.ComponentProps<typeof SigilSection>) {
  const edgeless = useIsEdgeless();
  return (
    <SigilSection
      {...props}
      borderTop={false}
      borderBottom={!edgeless && props.borderBottom}
      showCrosses={!edgeless && props.showCrosses}
    />
  );
}

function LandingDivider({
  fadeEdges: _fadeEdges,
  ...props
}: React.ComponentProps<typeof Divider>) {
  const edgeless = useIsEdgeless();
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
      <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(24px,3vw,40px)] font-bold tracking-[var(--s-heading-h2-tracking,-0.02em)] leading-[var(--s-heading-h2-leading,1.15)] text-[var(--s-text)] mb-3">
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

const INSTALL_CMD = "npx create-sigil-app@latest";

function InstallCommand({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  }, []);

  return (
    <div
      className={`inline-block overflow-hidden cursor-pointer group ${className ?? ""}`}
      style={{
        borderRadius: "var(--s-radius-xl, 16px) var(--s-radius-xl, 16px) 0 0",
        padding: "1px 1px 0 1px",
        background: "linear-gradient(180deg, color-mix(in oklch, var(--s-text) 25%, transparent) 0%, color-mix(in oklch, var(--s-text) 4%, transparent) 100%)",
      }}
      onClick={copy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copy(); }}
    >
      <div
        className="inline-flex items-center gap-3 px-5 pt-2.5 pb-3 font-[family-name:var(--s-font-mono)] text-[14px] tracking-[0.01em] text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)] group-hover:text-[var(--s-text)]"
        style={{
          background: "var(--s-background)",
          borderRadius: "var(--s-radius-xl, 16px) var(--s-radius-xl, 16px) 0 0",
        }}
      >
        <span>{INSTALL_CMD}</span>
        {copied ? (
          <CheckIcon size={15} className="text-[var(--s-success)] shrink-0" />
        ) : (
          <Copy size={15} className="shrink-0 opacity-50 group-hover:opacity-80 transition-opacity" />
        )}
      </div>
    </div>
  );
}

const PRESET_DOTS: { name: string; color: string }[] = [
  { name: "default", color: "#000000"},
  { name: "sigil", color: "#9b99e8" },
  { name: "noir", color: "#d97706" },
  { name: "forge", color: "#ea580c" },
  { name: "vex", color: "#ec4899" },
  { name: "arc", color: "#7c3aed" },
  { name: "cipher", color: "#22c55e" },
];

function Hero() {
  const actions = useOptionalSigilActions();
  const setPreset = actions?.setPreset;
  let sound: ReturnType<typeof useSigilSound> = {
    play: () => {},
    enabled: false,
    setEnabled: () => {},
    activePreset: "sigil",
    setActivePreset: () => {},
  };
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
    <LandingSection borderTop padding="var(--s-hero-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 24px))" className="relative">
      <TextureBg opacity={0.3} />
      <div className="relative z-[1] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        <div className="flex-1 min-w-0 shrink-0 lg:max-w-[45%]">
          <InstallCommand className="mb-2" />

          <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[var(--s-heading-display-leading,1.08)] tracking-[var(--s-heading-display-tracking,-0.03em)] text-[var(--s-text)] mb-4 max-w-3xl">
            An Agent-First <br /> Design System.
          </h1>

          <DensityText role="body" as="p" muted className="mb-6 max-w-md leading-relaxed">
            <span className="hidden lg:inline">
              {SIGIL_PRODUCT_STATS.componentCountLabel} components, {SIGIL_PRODUCT_STATS.presetCount} presets, {SIGIL_PRODUCT_STATS.tokenCount} tokens.{" "}
            </span>
            One token file controls every color, font, radius, and animation. Agents and humans edit the same surface.
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

        <div className="flex-1 min-w-0 flex items-center justify-center">
          <HeroLogoField />
        </div>
      </div>
    </LandingSection>
  );
}

function ProductSurfaceSection() {
  return (
    <LandingSection borderTop padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
      <div className="s-transition-all">
        <HeroShowcase />
      </div>
    </LandingSection>
  );
}

function ComponentGalleryBannerSection() {
  return (
    <LandingSection borderTop padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
      <ComponentGalleryCTA />
    </LandingSection>
  );
}

/* ================================================================ */
/* ACT 1 — What Is Sigil?                                             */
/* ================================================================ */

function LayerSection() {
  return (
    <LandingSection borderTop className="relative overflow-hidden">
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Architecture"
          heading="Four layers. One editable surface."
          description="Tokens define every visual primitive. Presets bundle them into complete identities. Components consume them via CSS variables. Pages compose components. You only ever edit the token layer."
        />
        <LayerStackDiagram />
      </div>
    </LandingSection>
  );
}

function TokenSystemSection() {
  return (
    <LandingSection borderTop className="relative overflow-hidden">
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Token System"
          heading="Edit one file. Everything recompiles."
          description={`sigil.tokens.md compiles to ${SIGIL_PRODUCT_STATS.tokenCount} CSS custom properties. Every component reads them. Change a value, and ${SIGIL_PRODUCT_STATS.componentCountLabel} components update — no manual edits across files.`}
        />
        <TokenPipelineDiagram />

        <div className="mt-20">
          <MonoLabel variant="accent" className="block mb-3">LIVE TOKEN EDITOR</MonoLabel>
          <DensityText role="body" as="p" muted className="mb-6 max-w-lg leading-relaxed">
            Every line in sigil.tokens.md maps to a CSS variable. Edit a value and see the component update live.
          </DensityText>
          <MarkdownEditorPreview />
        </div>
      </div>
    </LandingSection>
  );
}


/* ================================================================ */
/* Under the Hood — component anatomy + stack merged                  */
/* ================================================================ */

function UnderTheHoodSection() {
  return (
    <LandingSection id="components" borderTop className="relative overflow-hidden">
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Under the Hood"
          heading="Radix primitives. Token-driven styling. One import."
          description="Each component bundles the behavior primitive, animation engine, and token bindings it needs. Select one to see what ships inside."
        />
        <ComponentStackDiagram />

        <div className="mt-20">
          <MonoLabel variant="accent" className="block mb-3">HOW TOKENS FLOW INTO COMPONENTS</MonoLabel>
          <DensityText role="body" as="p" muted className="mb-6 max-w-lg leading-relaxed">
            Every visual property resolves to one named token. No hardcoded values — components read CSS variables directly.
          </DensityText>
          <ComponentAnatomyDiagram />
        </div>
      </div>
    </LandingSection>
  );
}

/* ================================================================ */
/* Preset Identity — moved to scenes/PresetMorphScene.tsx           */
/* ================================================================ */

/* ================================================================ */
/* CLI Voronoi tile data                                             */
/* (CliDiagram + voronoiBounds moved to scenes/CliDiagram.tsx)       */
/* ================================================================ */

const CLI_VORONOI_TILES = [
  {
    points: "0,0 340,0 380,160 280,320 0,280",
    command: "npx create-sigil-app",
    title: "Bootstrap a new app",
    body: "Scaffolds token CSS, base preset, components, and agent instructions.",
    diagram: "scaffold",
    accent: true,
    cellStyle: "accent" as const,
  },
  {
    points: "340,0 620,0 580,190 380,160",
    command: "sigil init",
    title: "Install into existing app",
    body: "Detects your stack and wires Sigil in.",
    diagram: "init",
    cellStyle: "grid" as const,
  },
  {
    points: "620,0 1000,0 1000,240 720,300 580,190",
    command: "sigil add <names>",
    title: "Add components",
    body: "Copies token-bound components into your project.",
    diagram: "add",
    cellStyle: "dots" as const,
  },
  {
    points: "0,280 280,320 320,510 0,540",
    command: "sigil preset <name>",
    title: "Switch visual identity",
    body: `${SIGIL_PRODUCT_STATS.presetCount} presets change all 519 tokens at once.`,
    diagram: "preset",
    cellStyle: "tint-primary" as const,
  },
  {
    points: "280,320 380,160 580,190 720,300 680,480 320,510",
    command: "sigil inspire <url>",
    title: "Extract tokens from a reference",
    body: "Pulls colors from any URL, drafts OKLCH tokens, generates a preset and preview page.",
    diagram: "inspire",
    cellStyle: "diagonal" as const,
  },
  {
    points: "720,300 1000,240 1000,490 680,480",
    command: "sigil docs",
    title: "Generate library docs",
    body: "Writes project docs and llms.txt from your config.",
    diagram: "docs",
    cellStyle: "crosshatch" as const,
  },
  {
    points: "0,540 320,510 260,780 0,780",
    command: "sigil adapter <name>",
    title: "Bridge existing systems",
    body: "CSS bridge so shadcn, Bootstrap, or Material variables inherit your tokens.",
    diagram: "adapter",
    cellStyle: "tint-emerald" as const,
  },
  {
    points: "320,510 680,480 720,780 260,780",
    command: "sigil diff",
    title: "Review design changes",
    body: "Token-level changes before you commit.",
    diagram: "diff",
    cellStyle: "tint-amber" as const,
  },
  {
    points: "680,480 1000,490 1000,780 720,780",
    command: "sigil doctor",
    title: "Validate the install",
    body: "Checks config, tokens, CSS import, components, and preset health.",
    diagram: "doctor",
    cellStyle: "plus" as const,
  },
];

function CLIVoronoiSection() {
  const VB_W = 1000;
  const VB_H = 780;

  return (
    <LandingSection borderTop>
      <SectionHeader
        label="CLI"
        heading="Set up, switch presets, audit, and validate — from the terminal."
        description="One CLI to scaffold projects, swap visual identities, generate docs, bridge existing systems, and verify everything works."
      />

      <div
        className="relative overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)]"
        style={{ height: "clamp(700px, 90vw, 1000px)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Background polygon fills */}
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden>
          <defs>
            {/* Accent gradient */}
            <linearGradient id="cli-accent-grad" x1="0%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="var(--s-primary)" />
              <stop offset="100%" stopColor="color-mix(in oklch, var(--s-primary) 40%, var(--s-background))" />
            </linearGradient>

            {/* Color tint gradients */}
            <linearGradient id="cli-tint-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="color-mix(in oklch, var(--s-primary) 10%, var(--s-surface))" />
              <stop offset="100%" stopColor="var(--s-surface)" />
            </linearGradient>
            <linearGradient id="cli-tint-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="color-mix(in oklch, var(--s-accent-emerald) 12%, var(--s-surface))" />
              <stop offset="100%" stopColor="var(--s-surface)" />
            </linearGradient>
            <linearGradient id="cli-tint-amber" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="color-mix(in oklch, var(--s-accent-amber) 10%, var(--s-surface))" />
              <stop offset="100%" stopColor="var(--s-surface)" />
            </linearGradient>

            {/* Grid pattern */}
            <pattern id="cli-pat-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--s-border)" strokeWidth="0.5" />
            </pattern>

            {/* Dots pattern */}
            <pattern id="cli-pat-dots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1" fill="var(--s-border)" />
            </pattern>

            {/* Diagonal lines */}
            <pattern id="cli-pat-diagonal" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="var(--s-border)" strokeWidth="0.5" />
            </pattern>

            {/* Crosshatch */}
            <pattern id="cli-pat-crosshatch" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="10" stroke="var(--s-border)" strokeWidth="0.4" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="var(--s-border)" strokeWidth="0.4" />
            </pattern>

            {/* Plus / cross */}
            <pattern id="cli-pat-plus" width="14" height="14" patternUnits="userSpaceOnUse">
              <line x1="7" y1="3" x2="7" y2="11" stroke="var(--s-border)" strokeWidth="0.5" />
              <line x1="3" y1="7" x2="11" y2="7" stroke="var(--s-border)" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Base fills */}
          {CLI_VORONOI_TILES.map((tile, i) => {
            const fillMap: Record<string, string> = {
              accent: "url(#cli-accent-grad)",
              "tint-primary": "url(#cli-tint-primary)",
              "tint-emerald": "url(#cli-tint-emerald)",
              "tint-amber": "url(#cli-tint-amber)",
            };
            return (
              <polygon
                key={i}
                points={tile.points}
                fill={fillMap[tile.cellStyle] ?? "var(--s-surface)"}
              />
            );
          })}

          {/* Pattern overlays */}
          {CLI_VORONOI_TILES.map((tile, i) => {
            const patMap: Record<string, string> = {
              grid: "url(#cli-pat-grid)",
              dots: "url(#cli-pat-dots)",
              diagonal: "url(#cli-pat-diagonal)",
              crosshatch: "url(#cli-pat-crosshatch)",
              plus: "url(#cli-pat-plus)",
            };
            const pat = patMap[tile.cellStyle];
            return pat ? (
              <polygon key={`pat-${i}`} points={tile.points} fill={pat} opacity="0.45" />
            ) : null;
          })}
        </svg>

        {/* Content blocks — centered at each polygon's centroid, no clipping */}
        {CLI_VORONOI_TILES.map((tile, i) => {
          const coords = tile.points.split(" ").map((p) => p.split(",").map(Number));
          const cx = coords.reduce((s, [x]) => s + x, 0) / coords.length;
          const cy = coords.reduce((s, [, y]) => s + y, 0) / coords.length;

          const fg = tile.accent ? "var(--s-primary-contrast, #fff)" : "var(--s-text)";
          const fgMuted = tile.accent ? "rgba(255,255,255,0.6)" : "var(--s-text-muted)";
          const cmdColor = tile.accent ? "rgba(255,255,255,0.9)" : "var(--s-primary)";
          const cmdBorder = tile.accent ? "rgba(255,255,255,0.2)" : "color-mix(in oklch, var(--s-primary) 30%, var(--s-border))";
          const cmdBg = tile.accent ? "rgba(255,255,255,0.06)" : "color-mix(in oklch, var(--s-primary) 5%, var(--s-background))";

          return (
            <div
              key={i}
              className="absolute z-[1] flex flex-col items-center text-center pointer-events-none"
              style={{
                left: `${(cx / VB_W) * 100}%`,
                top: `${(cy / VB_H) * 100}%`,
                transform: "translate(-50%, -50%)",
                maxWidth: 240,
              }}
            >
              <div
                className="font-[family-name:var(--s-font-mono)] text-[13px] font-semibold tracking-[0.03em] mb-3 px-4 py-2 border whitespace-nowrap"
                style={{ color: cmdColor, borderColor: cmdBorder, background: cmdBg }}
              >
                $ {tile.command}
              </div>
              <div
                className="font-semibold text-[18px] tracking-[-0.02em] leading-tight mb-4"
                style={{ color: fg }}
              >
                {tile.title}
              </div>
              <div className="mb-4" style={{ transform: "scale(1.35)", transformOrigin: "center" }}>
                <CliDiagram variant={tile.diagram} accent={tile.accent} />
              </div>
              <div className="text-[13px] leading-[1.5] max-w-[220px]" style={{ color: fgMuted }}>
                {tile.body}
              </div>
            </div>
          );
        })}

        {/* Polygon border strokes */}
        <svg
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {CLI_VORONOI_TILES.map((tile, i) => (
            <polygon
              key={i}
              points={tile.points}
              fill="transparent"
              stroke="var(--s-border)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[var(--s-primary)]" />
      </div>
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
  const [morphIndex, setMorphIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMorphIndex((prev) => (prev + 1) % MINI_PRESETS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <LandingSection id="presets" borderTop className="relative overflow-hidden">
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
        <SectionHeader
          label="Presets"
          heading="Same components. Completely different identity."
          description={`Each of the ${SIGIL_PRODUCT_STATS.presetCount} presets rewrites all ${SIGIL_PRODUCT_STATS.tokenCount} tokens at once — colors, fonts, spacing, radius, motion, everything. Not a theme toggle. A different design language.`}
        />

        <PresetMorphScene index={morphIndex} setIndex={setMorphIndex} />

        <div className="mt-16">
          <MonoLabel variant="accent" className="block mb-4">COMPARE ALL PRESETS</MonoLabel>
          <PresetComparisonView />
        </div>

        <div className="mt-12">
          <GapPixelGrid columns={{ md: 2 }} data-stagger>
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
                {SIGIL_PRODUCT_STATS.presetCount} curated bundles. One command writes the token layer.
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
                Pick a base, set brand colors and fonts, and a custom preset is generated.
              </DensityText>
            </GapPixelCell>
          </GapPixelGrid>
          <GapPixelGrid columns={{ md: 1 }} className="mt-0">
            <GapPixelCell className="p-6">
              <MonoLabel variant="accent" className="block mb-3">EDIT TOKENS DIRECTLY</MonoLabel>
              <div className="flex flex-col md:flex-row gap-4 md:items-start">
                <div
                  className="font-[family-name:var(--s-font-mono)] text-[12px] p-3 leading-relaxed md:w-1/3"
                  style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
                >
                  <div className="text-[var(--s-text-muted)]">## Colors</div>
                  <div className="text-[var(--s-primary)]">primary: oklch(0.65 0.2 150)</div>
                </div>
                <DensityText role="body" as="p" muted className="md:w-2/3 m-0">
                  Open sigil.tokens.md and change any of 519 fields. Your file is the source of truth.
                </DensityText>
              </div>
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
        heading="17 templates. Real sites, real presets."
        description="SaaS landing pages, dashboards, e-commerce, portfolios, dev docs — each built with a different preset to show how the same components produce different products."
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
    <LandingSection borderTop padding="var(--s-section-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <MonoLabel variant="accent" size="sm" className="mb-4 block">/ Quick Start</MonoLabel>
          <h2 className="mb-4 max-w-[620px] font-[family-name:var(--s-font-display)] text-[clamp(36px,5vw,72px)] font-bold leading-[var(--s-heading-display-leading,1.08)] tracking-[var(--s-heading-display-tracking,-0.03em)] text-[var(--s-text)]">
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
            ["519", "token fields"],
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

        <div className="grid gap-3" data-stagger>
          {QUICK_START_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group border border-[var(--s-border)] border-l-[3px] bg-[var(--s-surface)] p-5 transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-background)]"
              style={{ borderLeftColor: index === 0 ? "var(--s-primary)" : PRESET_DOTS[index + 1]?.color }}
            >
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
    <>
    <Divider size="md" showCross fadeEdges />
    <LandingSection padding="var(--s-section-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 24px))" className="relative overflow-hidden">
      <TextureBg opacity={0.45} darkOpacity={0.35} />
      <div className="relative z-[1] mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-4 font-[family-name:var(--s-font-display)] text-[clamp(28px,4vw,48px)] font-bold leading-[var(--s-heading-h1-leading,1.1)] tracking-[var(--s-heading-h1-tracking,-0.025em)] text-[var(--s-text)]">
            Start building.
          </h2>
          <DensityText role="body" as="p" muted className="mb-8 max-w-md leading-relaxed">
            {SIGIL_PRODUCT_STATS.componentCountLabel} components. {SIGIL_PRODUCT_STATS.presetCount} presets. {SIGIL_PRODUCT_STATS.tokenCount} tokens.
            One file controls everything — start building in 30 seconds.
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
            className="flex flex-col min-h-[320px] overflow-hidden border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-md,8px)] bg-[var(--s-background)]"
          >
            <FooterQuadrantDiagram />
            <div className="mt-auto p-4 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--s-text-muted)]">
              blueprint variants / 20
            </div>
          </div>
          <div
            className="flex flex-col min-h-[320px] overflow-hidden border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-md,8px)] bg-[var(--s-background)]"
          >
            <FooterComponentDiagram />
            <div className="mt-auto p-4 font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--s-text-muted)]">
              component blueprint
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
    </>
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

      <LandingDivider pattern="vertical" size="md" showBorders />

      <ProductSurfaceSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      <ComponentGalleryBannerSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      {/* Architecture */}
      <LayerSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* Token System — pipeline + live editor */}
      <TokenSystemSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* Under the Hood — anatomy + stack */}
      <UnderTheHoodSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      {/* Presets — morphing demo + comparison + paths */}
      <PresetsSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* CLI Surface — Voronoi bento */}
      <CLIVoronoiSection />

      <LandingDivider pattern="vertical" size="sm" showBorders />

      {/* 3D Components */}
      <ThreeDSection />

      <LandingDivider pattern="diagonal" size="sm" showBorders />

      {/* Demos */}
      <DemoSitesSection />

      <LandingDivider pattern="vertical" size="md" showBorders />

      {/* Quick Start */}
      <QuickStartSection />

      <FinalCTA />

      <LandingFooter />
    </SigilFrame>
  );
}
