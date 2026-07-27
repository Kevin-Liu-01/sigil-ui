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
import { SigilFrame } from "@/components/landing/sigil-frame";
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
  SigilDivider,
  GapPixelGrid,
  GapPixelCell,
  SigilActionRow,
  SigilGhostLink,
  SigilHero,
  SigilHeroContent,
  SigilHeroDescription,
  SigilHeroLayout,
  SigilHeroMedia,
  SigilHeroTitle,
  SigilInline,
  SigilMonoBlock,
  SigilRhythmBox,
  SigilSectionHeader,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentCTA,
  FeaturedGrid,
  Badge,
} from "@sigil-ui/components";

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
        className="inline-flex items-center font-[family-name:var(--s-font-mono)] text-[14px] tracking-[0.01em] text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)] group-hover:text-[var(--s-text)]"
        style={{
          background: "var(--s-background)",
          borderRadius: "var(--s-radius-xl, 16px) var(--s-radius-xl, 16px) 0 0",
          gap: "var(--s-command-gap, var(--s-section-heading-margin-bottom))",
          paddingInline: "var(--s-command-padding-x, var(--s-section-label-row-margin-bottom))",
          paddingTop: "var(--s-command-padding-top, var(--s-section-heading-margin-bottom))",
          paddingBottom: "var(--s-command-padding-bottom, var(--s-section-heading-margin-bottom))",
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

const HERO_PRESETS = ["default", "sigil", "noir", "forge", "vex", "arc", "cipher"];

function Hero() {
  const actions = useOptionalSigilActions();
  const setPreset = actions?.setPreset;
  const preloadPreset = actions?.preloadPreset;
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

  useEffect(() => {
    if (!preloadPreset) return;

    const warmVisiblePresets = () => {
      for (const name of HERO_PRESETS) void preloadPreset(name);
    };
    const idleWindow = window as unknown as {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    };
    if (!idleWindow.requestIdleCallback) {
      const timeout = globalThis.setTimeout(warmVisiblePresets, 0);
      return () => globalThis.clearTimeout(timeout);
    }

    const idle = idleWindow.requestIdleCallback(warmVisiblePresets, {
      timeout: 800,
    });
    return () => idleWindow.cancelIdleCallback?.(idle);
  }, [preloadPreset]);

  return (
      <SigilHero>
      <TextureBg opacity={0.3} />
      <SigilHeroLayout>
        <SigilHeroContent>
          <SigilRhythmBox marginBottom="sm">
            <InstallCommand />
          </SigilRhythmBox>

          <SigilHeroTitle>
            An Agent-First <br /> Design System.
          </SigilHeroTitle>

          <SigilHeroDescription>
            <span className="hidden lg:inline">
              {SIGIL_PRODUCT_STATS.componentCountLabel} components, {SIGIL_PRODUCT_STATS.presetCount} presets, {SIGIL_PRODUCT_STATS.tokenCount} tokens.{" "}
            </span>
            One token file controls every color, font, radius, and animation. Agents and humans edit the same surface.
          </SigilHeroDescription>

          <SigilActionRow>
            <AccentCTA asChild>
              <a href="/docs" className="no-underline">Get Started</a>
            </AccentCTA>
            <SigilGhostLink href="/docs/components/button">
              View Components
            </SigilGhostLink>
          </SigilActionRow>

          <SigilInline
            marginTop="lg"
            gap="xs"
            className="max-w-full flex-wrap"
          >
            {HERO_PRESETS.map((name) => (
              <button
                key={name}
                type="button"
                title={name}
                aria-label={`Switch to ${name} preset`}
                onPointerEnter={() => void preloadPreset?.(name)}
                onFocus={() => void preloadPreset?.(name)}
                onClick={() => handlePresetDot(name)}
                className="min-h-[var(--s-control-hit-area,2.75rem)] cursor-pointer border border-[var(--s-border)] bg-[var(--s-surface)] px-[var(--s-badge-padding-x)] font-[family-name:var(--s-font-mono)] text-[var(--s-badge-font-size,0.625rem)] uppercase tracking-[var(--s-tracking-wide,0.08em)] text-[var(--s-text-muted)] transition-[background-color,border-color,color,transform] duration-[var(--s-duration-fast,150ms)] hover:border-[var(--s-primary)] hover:text-[var(--s-text)] active:scale-[var(--s-button-active-scale,0.98)]"
              >
                {name === "default" ? "base" : name}
              </button>
            ))}
          </SigilInline>
        </SigilHeroContent>

        <SigilHeroMedia>
          <HeroLogoField />
        </SigilHeroMedia>
      </SigilHeroLayout>
      </SigilHero>
  );
}

function ProductSurfaceSection() {
  return (
    <SigilSection borderTop space="compact" className="landing-deferred-section">
      <HeroShowcase />
    </SigilSection>
  );
}

function ComponentGalleryBannerSection() {
  return (
    <SigilSection borderTop space="compact" className="landing-deferred-section">
      <ComponentGalleryCTA />
    </SigilSection>
  );
}

/* ================================================================ */
/* ACT 1 — What Is Sigil?                                             */
/* ================================================================ */

function LayerSection() {
  return (
    <SigilSection borderTop className="landing-deferred-section relative overflow-hidden">
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SigilSectionHeader
          label="Architecture"
          heading="From project intent to production UI."
          description="DESIGN.md, presets, guidelines, skills, MCPs, and proven upstream libraries enter one constraint pipeline. Sigil absorbs them into tokens and adapters, then emits coherent components and pages without forking behavior libraries."
        />
        <LayerStackDiagram />
      </div>
    </SigilSection>
  );
}

function TokenSystemSection() {
  return (
    <SigilSection borderTop className="landing-deferred-section relative overflow-hidden">
      <TextureBg opacity={0.3} />
      <div className="relative z-[1]">
        <SigilSectionHeader
          label="Token System"
          heading="DESIGN.md is the source of truth."
          description={`The human-readable spec compiles to ${SIGIL_PRODUCT_STATS.tokenCount} CSS custom properties, Tailwind theme values, and W3C tokens. Change the intent once and ${SIGIL_PRODUCT_STATS.componentCountLabel} components update without scattered edits.`}
        />
        <TokenPipelineDiagram />

        <div style={{ marginTop: "var(--s-section-subsection-gap)" }}>
          <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>LIVE TOKEN EDITOR</MonoLabel>
          <DensityText
            role="body"
            as="p"
            muted
            className="max-w-lg leading-relaxed"
            style={{ marginBottom: "var(--s-section-content-gap)" }}
          >
            Every design decision maps to a named token. Edit the spec and watch the compiled interface update live.
          </DensityText>
          <MarkdownEditorPreview />
        </div>
      </div>
    </SigilSection>
  );
}


/* ================================================================ */
/* Under the Hood — component anatomy + stack merged                  */
/* ================================================================ */

function UnderTheHoodSection() {
  return (
    <SigilSection id="components" borderTop className="landing-deferred-section relative overflow-hidden">
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
        <SigilSectionHeader
          label="Under the Hood"
          heading="Own the constraints. Reuse the primitives."
          description="Sigil wraps Base UI, Radix, charting, carousel, and other proven libraries with one token contract. Upstream owns difficult behavior; Sigil owns the visual language, adapters, and agent-editable surface."
        />
        <ComponentStackDiagram />

        <div style={{ marginTop: "var(--s-section-subsection-gap)" }}>
          <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>HOW TOKENS FLOW INTO COMPONENTS</MonoLabel>
          <DensityText
            role="body"
            as="p"
            muted
            className="max-w-lg leading-relaxed"
            style={{ marginBottom: "var(--s-section-content-gap)" }}
          >
            Every visual property resolves to one named token. No hardcoded values — components read CSS variables directly.
          </DensityText>
          <ComponentAnatomyDiagram />
        </div>
      </div>
    </SigilSection>
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
    <SigilSection borderTop className="landing-deferred-section">
      <SigilSectionHeader
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
              <SigilMonoBlock
                className="font-[family-name:var(--s-font-mono)] text-[13px] font-semibold tracking-[0.03em] border whitespace-nowrap"
                style={{
                  color: cmdColor,
                  borderColor: cmdBorder,
                  background: cmdBg,
                }}
              >
                $ {tile.command}
              </SigilMonoBlock>
              <div
                className="font-semibold text-[18px] tracking-[-0.02em] leading-tight"
                style={{ color: fg }}
              >
                {tile.title}
              </div>
              <div style={{ transform: "scale(1.35)", transformOrigin: "center" }}>
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
    </SigilSection>
  );
}

function ThreeDSection() {
  return (
    <SigilSection borderTop className="landing-deferred-section">
      <SigilSectionHeader
        label="3D Components"
        heading="Projected UI without leaving CSS."
        description="Isometric scenes, prisms, exploded boxes, tilt cards, and depth stacks all inherit the active token system."
      />
      <ThreeDShowcase />
    </SigilSection>
  );
}

function PresetsSection() {
  const [morphIndex, setMorphIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (document.documentElement.hasAttribute("data-sigil-preset-switching")) return;
      setMorphIndex((prev) => (prev + 1) % MINI_PRESETS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <SigilSection id="presets" borderTop className="landing-deferred-section relative overflow-hidden">
      <TextureBg opacity={0.25} />
      <div className="relative z-[1]">
        <SigilSectionHeader
          label="Presets"
          heading="Same components. Completely different identity."
          description={`Each of the ${SIGIL_PRODUCT_STATS.presetCount} presets rewrites all ${SIGIL_PRODUCT_STATS.tokenCount} tokens at once — colors, fonts, spacing, radius, motion, everything. Not a theme toggle. A different design language.`}
        />

        <PresetMorphScene index={morphIndex} setIndex={setMorphIndex} />

        <div style={{ marginTop: "var(--s-section-subsection-gap)" }}>
          <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-content-gap)" }}>COMPARE ALL PRESETS</MonoLabel>
          <PresetComparisonView />
        </div>

        <div style={{ marginTop: "var(--s-grid-cell)" }}>
          <GapPixelGrid columns={{ md: 2 }} data-stagger>
            <GapPixelCell className="p-6">
              <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>START FROM A PRESET</MonoLabel>
              <SigilMonoBlock
                className="text-[12px]"
                style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}
              >
                <span className="text-[var(--s-text-muted)]">$</span>{" "}
                <span className="text-[var(--s-text)]">sigil preset noir</span>
              </SigilMonoBlock>
              <DensityText role="body" as="p" muted>
                {SIGIL_PRODUCT_STATS.presetCount} curated bundles. One command writes the token layer.
              </DensityText>
            </GapPixelCell>
            <GapPixelCell className="p-6">
              <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>CREATE YOUR OWN</MonoLabel>
              <SigilMonoBlock
                className="text-[12px]"
                style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}
              >
                <span className="text-[var(--s-text-muted)]">$</span>{" "}
                <span className="text-[var(--s-text)]">sigil preset create</span>
              </SigilMonoBlock>
              <DensityText role="body" as="p" muted>
                Pick a base, set brand colors and fonts, and a custom preset is generated.
              </DensityText>
            </GapPixelCell>
          </GapPixelGrid>
          <GapPixelGrid columns={{ md: 1 }} className="mt-0">
            <GapPixelCell className="p-6">
              <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>EDIT TOKENS DIRECTLY</MonoLabel>
              <div className="flex flex-col md:flex-row md:items-start" style={{ gap: "var(--s-section-content-gap)" }}>
                <SigilMonoBlock className="text-[12px] leading-relaxed md:w-1/3">
                  <div className="text-[var(--s-text-muted)]">## Colors</div>
                  <div className="text-[var(--s-primary)]">primary: oklch(0.65 0.2 150)</div>
                </SigilMonoBlock>
                <DensityText role="body" as="p" muted className="md:w-2/3 m-0">
                  Open sigil.tokens.md and change any of 519 fields. Your file is the source of truth.
                </DensityText>
              </div>
            </GapPixelCell>
          </GapPixelGrid>
        </div>

        <SigilActionRow
          style={{ marginTop: "var(--s-section-subsection-gap)" }}
        >
          <AccentCTA asChild>
            <a href="/presets" className="no-underline">Browse Presets</a>
          </AccentCTA>
          <SigilGhostLink href="/sandbox">
            Create Custom Preset
          </SigilGhostLink>
        </SigilActionRow>
      </div>
    </SigilSection>
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
    <SigilSection borderTop className="landing-deferred-section">
      <SigilSectionHeader
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
                <DensityText role="headline" as="h3" className="text-[var(--s-primary-contrast,#fff)] text-xl" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>AI SaaS Landing</DensityText>
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
              <MonoLabel className="block" style={{ marginBottom: "var(--s-section-label-row-margin-bottom)" }}>cobalt</MonoLabel>
              <DensityText role="body" as="p" muted className="text-xs">Analytics dashboard with KPIs and data tables.</DensityText>
            </div>
          </a>
        </GapPixelCell>

        {/* Remaining demos */}
        {DEMOS.slice(2, 8).map((demo) => (
          <GapPixelCell key={demo.slug} className="p-0">
            <a href={`/demos/${demo.slug}`} className="block no-underline group">
              <div className="p-5">
                <div className="flex items-baseline justify-between" style={{ marginBottom: "var(--s-section-label-row-margin-bottom)" }}>
                  <TabularValue size="xs" muted>{demo.num}</TabularValue>
                  <MonoLabel size="xs">{demo.preset}</MonoLabel>
                </div>
                <DensityText role="nav" as="h3" className="font-semibold" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>{demo.name}</DensityText>
                <DensityText role="body" as="p" muted className="text-xs line-clamp-2">{demo.description}</DensityText>
              </div>
            </a>
          </GapPixelCell>
        ))}
      </FeaturedGrid>

      <div style={{ marginTop: "var(--s-section-gap)" }}>
        <AccentCTA asChild>
          <a href="/demos" className="no-underline">View All 17 Templates</a>
        </AccentCTA>
      </div>
    </SigilSection>
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

const QUICK_START_ACCENTS = [
  "var(--s-primary)",
  "var(--s-info, var(--s-primary))",
  "var(--s-success, var(--s-primary))",
];

const GENERATED_FILES = [
  { path: "sigil.tokens.md", detail: `${SIGIL_PRODUCT_STATS.tokenCount} token system` },
  { path: "app/sigil.css", detail: "CSS variables" },
  { path: ".sigil/AGENTS.md", detail: "agent instructions" },
  { path: "components/ui/*", detail: "token-bound UI" },
];

function QuickStartSection() {
  return (
    <SigilSection borderTop space="normal" className="landing-deferred-section">
      <div
        className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        style={{
          marginBottom: "var(--s-section-subsection-gap)",
          gap: "var(--s-section-subsection-gap)",
        }}
      >
        <div>
          <MonoLabel
            variant="accent"
            size="sm"
            className="block"
            style={{ marginBottom: "var(--s-section-label-row-margin-bottom)" }}
          >
            / Quick Start
          </MonoLabel>
          <h2
            className="max-w-[620px] font-[family-name:var(--s-font-display)] text-[clamp(36px,5vw,72px)] font-bold leading-[var(--s-heading-display-leading,1.08)] tracking-[var(--s-heading-display-tracking,-0.03em)] text-[var(--s-text)]"
            style={{
              marginBottom: "var(--s-section-heading-margin-bottom)",
            }}
          >
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

      <div
        className="grid lg:grid-cols-[1.05fr_0.95fr]"
        style={{ gap: "var(--s-section-content-gap)" }}
      >
        <SigilRhythmBox padding="md" className="relative overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)]">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <SigilInline className="relative z-[1] justify-between" marginBottom="lg" gap="lg">
            <MonoLabel variant="accent">installer trace</MonoLabel>
            <Badge variant="outline" className="font-[family-name:var(--s-font-mono)]">live output</Badge>
          </SigilInline>
          <div className="relative z-[1]">
            <Terminal lines={CLI_LINES} title="create-sigil-app" />
          </div>
          <SigilRhythmBox className="relative z-[1] grid grid-cols-2 sm:grid-cols-4" marginTop="lg" style={{ gap: "var(--s-section-label-row-margin-bottom)" }}>
            {GENERATED_FILES.map((file) => (
              <SigilRhythmBox key={file.path} padding="xs" className="border border-[var(--s-border)] bg-[var(--s-surface)]">
                <MonoLabel size="xs" className="block normal-case tracking-normal" style={{ marginBottom: "var(--s-section-label-row-margin-bottom)" }}>
                  {file.path}
                </MonoLabel>
                <DensityText role="chrome" muted>{file.detail}</DensityText>
              </SigilRhythmBox>
            ))}
          </SigilRhythmBox>
        </SigilRhythmBox>

        <div className="grid" style={{ gap: "var(--s-section-heading-margin-bottom)" }} data-stagger>
          {QUICK_START_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group border border-[var(--s-border)] border-l-[3px] bg-[var(--s-surface)] transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-background)]"
              style={{
                borderLeftColor: QUICK_START_ACCENTS[index],
                padding: "var(--s-section-content-gap)",
              }}
            >
              <SigilInline className="items-start justify-between" marginBottom="lg" gap="lg">
                <div>
                  <MonoLabel variant="accent" size="xs" className="block" style={{ marginBottom: "var(--s-section-label-row-margin-bottom)" }}>
                    {String(index + 1).padStart(2, "0")} / {step.time}
                  </MonoLabel>
                  <DensityText role="headline" as="h3" className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </DensityText>
                </div>
                <TabularValue muted>{step.time.split("-")[1]}</TabularValue>
              </SigilInline>
              <div
                className="overflow-x-auto whitespace-nowrap border border-[var(--s-border)] bg-[var(--s-background)] font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text)]"
                style={{
                  marginBottom: "var(--s-section-content-gap)",
                  paddingLeft: "var(--s-section-heading-margin-bottom)",
                  paddingRight: "var(--s-section-heading-margin-bottom)",
                  paddingTop: "var(--s-section-label-row-margin-bottom)",
                  paddingBottom: "var(--s-section-label-row-margin-bottom)",
                }}
              >
                <span className="text-[var(--s-text-muted)]">$</span> {step.command}
              </div>
              <DensityText role="body" as="p" muted className="leading-relaxed">
                {step.body}
              </DensityText>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col border border-[var(--s-border)] bg-[color-mix(in_oklch,var(--s-primary)_5%,var(--s-background))] sm:flex-row sm:items-center sm:justify-between"
        style={{
          marginTop: "var(--s-section-content-gap)",
          gap: "var(--s-section-heading-margin-bottom)",
          padding: "var(--s-section-content-gap)",
        }}
      >
        <div>
          <MonoLabel variant="accent" className="block" style={{ marginBottom: "var(--s-section-heading-margin-bottom)" }}>ready for agents</MonoLabel>
          <DensityText role="body" as="p" muted>
            The generated project tells humans and AI the same rule: edit tokens, not component styling.
          </DensityText>
        </div>
        <SigilActionRow>
          <AccentCTA asChild>
            <a href="/docs" className="no-underline">Start Now</a>
          </AccentCTA>
          <SigilGhostLink href="/sandbox">
            Try Sandbox
          </SigilGhostLink>
        </SigilActionRow>
      </div>
    </SigilSection>
  );
}

function FinalCTA() {
  return (
    <>
    <SigilDivider size="md" showCross fadeEdges />
    <SigilSection
      padding="var(--s-section-padding-y, calc(2 * var(--s-grid-cell))) var(--s-section-padding-x, var(--s-page-margin, 24px))"
      className="landing-deferred-section relative overflow-hidden"
    >
      <TextureBg opacity={0.45} darkOpacity={0.35} />
      <div
        className="relative z-[1] mx-auto grid max-w-5xl items-center md:grid-cols-[1fr_360px]"
        style={{ gap: "var(--s-section-subsection-gap)" }}
      >
        <div>
          <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(28px,4vw,48px)] font-bold leading-[var(--s-heading-h1-leading,1.1)] tracking-[var(--s-heading-h1-tracking,-0.025em)] text-[var(--s-text)]" style={{ marginBottom: "var(--s-section-content-gap)" }}>
            Start building.
          </h2>
          <DensityText role="body" as="p" muted className="max-w-md leading-relaxed" style={{ marginBottom: "var(--s-section-subsection-gap, var(--s-grid-cell))" }}>
            {SIGIL_PRODUCT_STATS.componentCountLabel} components. {SIGIL_PRODUCT_STATS.presetCount} presets. {SIGIL_PRODUCT_STATS.tokenCount} tokens.
            One file controls everything — start building in 30 seconds.
          </DensityText>
          <SigilActionRow>
            <AccentCTA size="lg" asChild>
              <a href="/docs" className="no-underline">Get Started</a>
            </AccentCTA>
            <SigilGhostLink href="/docs/components/button" size="lg">
              Read the Docs
            </SigilGhostLink>
          </SigilActionRow>
        </div>
        <div className="hidden grid-cols-2 md:grid" style={{ gap: "var(--s-section-heading-margin-bottom)" }}>
          <div
            className="flex flex-col min-h-[320px] overflow-hidden border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-md,8px)] bg-[var(--s-background)]"
          >
            <FooterQuadrantDiagram />
            <div
              className="mt-auto font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--s-text-muted)]"
              style={{ padding: "var(--s-section-label-row-margin-bottom)" }}
            >
              blueprint variants / 20
            </div>
          </div>
          <div
            className="flex flex-col min-h-[320px] overflow-hidden border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-md,8px)] bg-[var(--s-background)]"
          >
            <FooterComponentDiagram />
            <div
              className="mt-auto font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--s-text-muted)]"
              style={{ padding: "var(--s-section-label-row-margin-bottom)" }}
            >
              component blueprint
            </div>
          </div>
        </div>
      </div>
    </SigilSection>
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

      <SigilDivider pattern="vertical" size="md" showBorders />

      <ProductSurfaceSection />

      <SigilDivider pattern="vertical" size="md" showBorders />

      <ComponentGalleryBannerSection />

      <SigilDivider pattern="vertical" size="md" showBorders />

      {/* Architecture */}
      <LayerSection />

      <SigilDivider pattern="diagonal" size="md" showBorders />

      {/* Token System — pipeline + live editor */}
      <TokenSystemSection />

      <SigilDivider pattern="diagonal" size="md" showBorders />

      {/* Under the Hood — anatomy + stack */}
      <UnderTheHoodSection />

      <SigilDivider pattern="vertical" size="md" showBorders />

      {/* Presets — morphing demo + comparison + paths */}
      <PresetsSection />

      <SigilDivider pattern="diagonal" size="md" showBorders />

      {/* CLI Surface — Voronoi bento */}
      <CLIVoronoiSection />

      <SigilDivider pattern="vertical" size="md" showBorders />

      {/* 3D Components */}
      <ThreeDSection />

      <SigilDivider pattern="diagonal" size="md" showBorders />

      {/* Demos */}
      <DemoSitesSection />

      <SigilDivider pattern="vertical" size="md" showBorders />

      {/* Quick Start */}
      <QuickStartSection />

      <FinalCTA />

      <LandingFooter />
    </SigilFrame>
  );
}
