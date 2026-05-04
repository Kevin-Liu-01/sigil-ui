"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SigilSection,
  Divider,
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentCTA,
  AccentActive,
  CardCell,
  BorderStack,
} from "@sigil-ui/components";
import { presetCatalog, type PresetCatalogEntry } from "@sigil-ui/presets";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { PresetComparisonView } from "@/components/landing/preset-comparison";
import { TextureBg } from "@/components/texture-bg";

const CATEGORIES = [
  "All",
  "Structural",
  "Minimal",
  "Dark",
  "Colorful",
  "Editorial",
  "Industrial",
  "Edgeless",
] as const;

type Category = (typeof CATEGORIES)[number];

const HUE_COLORS: Record<string, string> = {
  indigo: "oklch(0.55 0.18 280)",
  neutral: "oklch(0.30 0 0)",
  copper: "oklch(0.60 0.14 50)",
  slate: "oklch(0.40 0.02 260)",
  orange: "oklch(0.65 0.20 50)",
  purple: "oklch(0.55 0.20 300)",
  "blue-purple": "oklch(0.55 0.18 270)",
  teal: "oklch(0.60 0.14 185)",
  emerald: "oklch(0.55 0.15 160)",
  iron: "oklch(0.45 0.02 60)",
  amber: "oklch(0.70 0.16 80)",
  cyan: "oklch(0.65 0.15 200)",
  violet: "oklch(0.50 0.20 290)",
  red: "oklch(0.55 0.22 25)",
  cobalt: "oklch(0.50 0.18 250)",
  gold: "oklch(0.65 0.15 85)",
  blue: "oklch(0.55 0.18 250)",
  green: "oklch(0.55 0.17 155)",
  rainbow: "linear-gradient(135deg, oklch(0.65 0.2 0), oklch(0.65 0.2 120), oklch(0.65 0.2 240))",
  sky: "oklch(0.65 0.14 220)",
  fuchsia: "oklch(0.55 0.22 320)",
  black: "oklch(0.20 0 0)",
  "rose-violet": "oklch(0.55 0.18 330)",
  terracotta: "oklch(0.58 0.14 40)",
  coral: "oklch(0.65 0.16 25)",
  magenta: "oklch(0.55 0.20 340)",
  rose: "oklch(0.60 0.14 350)",
};

function getHueColor(hue: string): string {
  return HUE_COLORS[hue] ?? "oklch(0.55 0.15 280)";
}

const STEPS = [
  {
    number: "01",
    title: "Start or create",
    description: "sigil preset <name> to start from a curated base, or sigil preset create to build your own from scratch.",
  },
  {
    number: "02",
    title: "Customize your token file",
    description: "DESIGN.md is yours — change any of 519 fields to match your brand exactly. Compiles to CSS + Tailwind.",
  },
  {
    number: "03",
    title: "Everything updates",
    description: "CSS recompiles, 350+ token-driven components refresh — zero component-level edits required.",
  },
] as const;

function PresetCard({ preset }: { preset: PresetCatalogEntry }) {
  const hueColor = getHueColor(preset.primaryHue);
  const isGradient = hueColor.startsWith("linear-gradient");

  return (
    <Link
      href={`/presets/${preset.name}`}
      className="no-underline text-inherit"
    >
      <GapPixelCell className="flex flex-col h-full transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated)]">
        <div
          style={{
            height: 28,
            background: hueColor,
            borderBottom: "1px solid var(--s-border-muted)",
          }}
          aria-hidden
        />

        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <DensityText role="nav" className="font-semibold">
              {preset.label}
            </DensityText>
            {!isGradient && (
              <span
                className="inline-block shrink-0 border border-[var(--s-border-muted)]"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: hueColor,
                }}
                aria-hidden
              />
            )}
          </div>

          <MonoLabel size="sm">
            {preset.category}
          </MonoLabel>

          <TabularValue size="xs" muted as="p" className="line-clamp-2">
            {preset.description}
          </TabularValue>

          <div className="flex items-center justify-between pt-1 border-t border-[var(--s-border-muted)]">
            <TabularValue size="xs" muted>
              {preset.fonts.display}
            </TabularValue>
            <TabularValue size="xs" muted>
              {preset.mood.split(",")[0]}
            </TabularValue>
          </div>
        </div>
      </GapPixelCell>
    </Link>
  );
}

export default function PresetsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? presetCatalog
      : presetCatalog.filter(
          (p) => p.category === activeCategory.toLowerCase(),
        );

  const categoryCounts = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] =
        cat === "All"
          ? presetCatalog.length
          : presetCatalog.filter((p) => p.category === cat.toLowerCase()).length;
      return acc;
    },
    {} as Record<Category, number>,
  );

  return (
    <SigilFrame>
      <LandingNavbar />

      <BorderStack>
        {/* Hero */}
        <SigilSection borderTop padding="var(--s-section-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 24px)) var(--s-section-padding-y-sm, 3rem)" className="relative overflow-hidden">
          <TextureBg opacity={0.3} />
          <div className="relative z-[1] mb-12 max-w-3xl">
            <MonoLabel variant="accent" className="mb-4 block">
              / Presets
            </MonoLabel>

            <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4">
              {presetCatalog.length} Curated Presets.<br />
              <span className="text-[var(--s-primary)]">519 tokens each.</span>
            </h1>

            <DensityText
              role="body"
              as="p"
              muted
              className="mb-6 max-w-[560px]"
            >
              Each preset applies a complete visual identity — colors, typography,
              radius, shadows, motion, borders, page composition, and more — across
              all 33 token categories. Pick one, customize your{" "}
              <code className="text-[var(--s-primary)]">DESIGN.md</code>,
              or create a fully custom preset from scratch.
            </DensityText>

            <div className="flex gap-3">
              <AccentCTA asChild>
                <a href="/docs/presets">Preset Docs</a>
              </AccentCTA>
              <button
                type="button"
                className="inline-flex items-center justify-center h-10 px-6 text-[13px] font-[family-name:var(--s-font-mono)] font-semibold uppercase tracking-[0.08em] bg-transparent text-[var(--s-text)] border border-[var(--s-border)] cursor-pointer transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface)]"
              >
                Create Custom Preset
              </button>
            </div>
          </div>
        </SigilSection>

        <Divider pattern="vertical" size="md" showBorders />

        {/* Category filter + grid */}
        <SigilSection padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="border cursor-pointer p-0 bg-transparent"
              >
                <AccentActive
                  active={activeCategory === cat}
                  className="px-3 py-1.5 border-0"
                >
                  <MonoLabel
                    size="sm"
                    variant={activeCategory === cat ? "accent" : "muted"}
                  >
                    {cat} ({categoryCounts[cat]})
                  </MonoLabel>
                </AccentActive>
              </button>
            ))}
          </div>

          <GapPixelGrid columns={{ sm: 2, md: 3, lg: 4 }}>
            {filtered.map((preset) => (
              <PresetCard key={preset.name} preset={preset} />
            ))}
          </GapPixelGrid>
        </SigilSection>

        <Divider pattern="diagonal" size="sm" showBorders />

        {/* Comparison */}
        <SigilSection padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
          <div className="mb-8 max-w-2xl">
            <MonoLabel className="mb-3 block">Compare Presets</MonoLabel>
            <DensityText role="headline" as="h2" className="mb-3">
              Same components. Different identity.
            </DensityText>
            <DensityText role="body" as="p" muted>
              Every preset applies a complete visual identity to the exact same
              component tree. Pick two and see the difference.
            </DensityText>
          </div>
          <PresetComparisonView />
        </SigilSection>

        <Divider pattern="vertical" size="sm" showBorders />

        {/* How It Works */}
        <SigilSection padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px)) var(--s-section-padding-y, 6rem)">
          <div className="mb-8 max-w-2xl">
            <MonoLabel className="mb-3 block">How It Works</MonoLabel>
            <DensityText role="headline" as="h2">
              Three steps. Zero component edits.
            </DensityText>
          </div>

          <GapPixelGrid columns={{ md: 3 }} className="mb-10">
            {STEPS.map((step) => (
              <CardCell
                key={step.number}
                title={step.title}
                footer={<MonoLabel variant="accent">{step.number}</MonoLabel>}
              >
                <TabularValue size="xs" muted as="div">
                  {step.description}
                </TabularValue>
              </CardCell>
            ))}
          </GapPixelGrid>

          <AccentCTA asChild>
            <a href="/sandbox">Try in Sandbox</a>
          </AccentCTA>
        </SigilSection>

        <Divider pattern="diagonal" size="md" showBorders />
      </BorderStack>

      <LandingFooter />
    </SigilFrame>
  );
}
