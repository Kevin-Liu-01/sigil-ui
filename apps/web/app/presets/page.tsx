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
] as const;

type Category = (typeof CATEGORIES)[number];

const PRESETS = [
  { name: "sigil", category: "Structural", primary: "#9b99e8", bg: "#0f0f14", font: "PP Mori", radius: "0px" },
  { name: "kova", category: "Structural", primary: "#60a5fa", bg: "#0c1220", font: "Inter", radius: "6px" },
  { name: "cobalt", category: "Structural", primary: "#3b82f6", bg: "#0f172a", font: "Geist", radius: "8px" },
  { name: "helix", category: "Structural", primary: "#06b6d4", bg: "#0a1628", font: "Space Grotesk", radius: "4px" },
  { name: "hex", category: "Structural", primary: "#8b5cf6", bg: "#0f0a1e", font: "JetBrains Mono", radius: "2px" },
  { name: "crux", category: "Minimal", primary: "#171717", bg: "#fafafa", font: "Inter", radius: "8px" },
  { name: "axiom", category: "Minimal", primary: "#374151", bg: "#ffffff", font: "Geist", radius: "12px" },
  { name: "arc", category: "Minimal", primary: "#7c3aed", bg: "#faf5ff", font: "Space Grotesk", radius: "10px" },
  { name: "mono", category: "Minimal", primary: "#18181b", bg: "#fafafa", font: "Geist Mono", radius: "0px" },
  { name: "basalt", category: "Dark", primary: "#a78bfa", bg: "#09090b", font: "Inter", radius: "8px" },
  { name: "onyx", category: "Dark", primary: "#f97316", bg: "#0a0a0a", font: "Outfit", radius: "6px" },
  { name: "fang", category: "Dark", primary: "#ef4444", bg: "#0c0a09", font: "Space Grotesk", radius: "4px" },
  { name: "obsid", category: "Dark", primary: "#6366f1", bg: "#020617", font: "Inter", radius: "8px" },
  { name: "cipher", category: "Dark", primary: "#22c55e", bg: "#0a0a0a", font: "JetBrains Mono", radius: "0px" },
  { name: "noir", category: "Dark", primary: "#d97706", bg: "#0a0a0a", font: "Inter", radius: "4px" },
  { name: "flux", category: "Colorful", primary: "#ec4899", bg: "#0f172a", font: "Outfit", radius: "12px" },
  { name: "shard", category: "Colorful", primary: "#f43f5e", bg: "#0f0f14", font: "Inter", radius: "8px" },
  { name: "prism", category: "Colorful", primary: "#8b5cf6", bg: "#0c0a1a", font: "Poppins", radius: "16px" },
  { name: "vex", category: "Colorful", primary: "#ec4899", bg: "#0f0a14", font: "Space Grotesk", radius: "6px" },
  { name: "dsgn", category: "Colorful", primary: "#06b6d4", bg: "#0a1628", font: "Outfit", radius: "10px" },
  { name: "dusk", category: "Colorful", primary: "#c084fc", bg: "#0f0520", font: "Inter", radius: "8px" },
  { name: "etch", category: "Editorial", primary: "#92400e", bg: "#faf5ee", font: "Lora", radius: "4px" },
  { name: "rune", category: "Editorial", primary: "#7c3aed", bg: "#f5f3ff", font: "Playfair Display", radius: "0px" },
  { name: "strata", category: "Editorial", primary: "#0f766e", bg: "#f0fdfa", font: "Source Serif", radius: "6px" },
  { name: "glyph", category: "Editorial", primary: "#1d4ed8", bg: "#eff6ff", font: "Merriweather", radius: "8px" },
  { name: "mrkr", category: "Editorial", primary: "#dc2626", bg: "#fef2f2", font: "DM Serif Display", radius: "2px" },
  { name: "alloy", category: "Industrial", primary: "#78716c", bg: "#1c1917", font: "IBM Plex Mono", radius: "2px" },
  { name: "forge", category: "Industrial", primary: "#ea580c", bg: "#0c0a09", font: "JetBrains Mono", radius: "0px" },
  { name: "anvil", category: "Industrial", primary: "#a8a29e", bg: "#0c0a09", font: "Space Mono", radius: "0px" },
  { name: "rivet", category: "Industrial", primary: "#f59e0b", bg: "#1c1917", font: "Inconsolata", radius: "4px" },
  { name: "brass", category: "Industrial", primary: "#ca8a04", bg: "#1a1a1a", font: "Fira Code", radius: "2px" },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Start or create",
    description: "sigil preset <name> to start from a curated base, or sigil preset create to build your own from scratch.",
  },
  {
    number: "02",
    title: "Customize your token file",
    description: "sigil.tokens.md is yours — change any of 259 fields to match your brand exactly.",
  },
  {
    number: "03",
    title: "Everything updates",
    description: "CSS recompiles, 200+ token-driven components refresh — zero component-level edits required.",
  },
] as const;

export default function PresetsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PRESETS
      : PRESETS.filter((p) => p.category === activeCategory);

  return (
    <SigilFrame>
      <LandingNavbar />

      <BorderStack>
        {/* ── Hero ────────────────────────────────────────── */}
        <SigilSection borderTop padding="96px 24px 48px" style={{ position: "relative", overflow: "hidden" }}>
          <TextureBg opacity={0.3} />
          <div className="relative z-[1] mb-12 max-w-3xl">
            <MonoLabel variant="accent" className="mb-4 block">
              / Presets
            </MonoLabel>

            <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4">
              31 Curated Presets.<br />
              <span className="text-[var(--s-primary)]">Or build your own.</span>
            </h1>

            <DensityText
              role="body"
              as="p"
              muted
              className="mb-6 max-w-[528px]"
            >
              Start from a curated preset or create a custom one with{" "}
              <code className="text-[var(--s-primary)]">sigil preset create</code>.
              Your <code className="text-[var(--s-primary)]">sigil.tokens.md</code>{" "}
              is the source of truth — presets are starting points, not constraints.
              259 tokens across 16 categories, fully yours to customize.
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

        {/* ── Category filter + Preset grid ───────────────── */}
        <SigilSection padding="32px 24px 48px">
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
                    {cat}
                  </MonoLabel>
                </AccentActive>
              </button>
            ))}
          </div>

          <GapPixelGrid columns={{ sm: 2, md: 3, lg: 4 }}>
            {filtered.map((preset) => (
              <Link
                key={preset.name}
                href={`/presets/${preset.name}`}
                className="no-underline text-inherit"
              >
                <GapPixelCell className="flex flex-col h-full transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated)]">
                  <div
                    style={{ height: 24, background: preset.primary }}
                    aria-hidden
                  />

                  <div className="flex flex-col gap-2 p-4">
                    <DensityText role="nav" className="font-semibold">
                      {preset.name}
                    </DensityText>

                    <MonoLabel>{preset.category}</MonoLabel>

                    <div className="flex items-center justify-between">
                      <TabularValue size="xs" muted>
                        {preset.font}
                      </TabularValue>
                      <TabularValue size="xs" muted>
                        {preset.radius}
                      </TabularValue>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <div
                        className="shrink-0 border border-[var(--s-border)]"
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: preset.bg,
                        }}
                        aria-label={`Background: ${preset.bg}`}
                      />
                      <TabularValue size="xs" muted>
                        {preset.bg}
                      </TabularValue>
                    </div>
                  </div>
                </GapPixelCell>
              </Link>
            ))}
          </GapPixelGrid>
        </SigilSection>

        <Divider pattern="diagonal" size="sm" showBorders />

        {/* ── Preset Comparison ───────────────────────────── */}
        <SigilSection padding="48px 24px">
          <div className="mb-8 max-w-2xl">
            <MonoLabel className="mb-3 block">Compare Presets</MonoLabel>

            <DensityText
              role="headline"
              as="h2"
              className="mb-3"
            >
              Same components. Different identity.
            </DensityText>

            <DensityText role="body" as="p" muted>
              Every preset applies a complete visual identity — colors,
              typography, radius, shadows, motion, and borders — to the exact
              same component tree. Pick two and see the difference.
            </DensityText>
          </div>

          <PresetComparisonView />
        </SigilSection>

        <Divider pattern="vertical" size="sm" showBorders />

        {/* ── How Presets Work ────────────────────────────── */}
        <SigilSection padding="48px 24px 64px">
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
