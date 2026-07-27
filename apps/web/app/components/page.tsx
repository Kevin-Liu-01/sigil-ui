"use client";

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
  Button,
} from "@sigil-ui/components";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { ComponentShowcase } from "@/components/landing/component-showcase";
import { ComponentAnatomyDiagram } from "@/components/landing/component-anatomy";
import { TextureBg } from "@/components/texture-bg";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";

const STATS = [
  { value: SIGIL_PRODUCT_STATS.componentCountLabel, label: "Token-Driven Components" },
  { value: `${SIGIL_PRODUCT_STATS.primitiveCount}+`, label: "Headless Primitives" },
  { value: String(SIGIL_PRODUCT_STATS.tokenCount), label: "Design Tokens" },
  { value: String(SIGIL_PRODUCT_STATS.presetCount), label: "Presets" },
] as const;

const TOKEN_CARDS = [
  {
    title: "No hardcoded values",
    body: "Components read var(--s-*) tokens for every visual property — colors, spacing, radius, shadows. Never hex codes, never magic numbers.",
  },
  {
    title: "One preset, everything updates",
    body: "Switch presets and all 350+ token-driven components change simultaneously. One command, zero prop drilling, zero theme objects.",
  },
  {
    title: "Agent-friendly",
    body: "AI agents and humans edit DESIGN.md — one readable source of truth. Components respond deterministically without hunting through files.",
  },
] as const;

export default function ComponentsPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      {/* ── Hero ── */}
      <SigilSection borderTop space="hero" className="relative overflow-hidden">
        <TextureBg opacity={0.3} />
        <div className="relative z-[1] mb-12 max-w-3xl">
          <MonoLabel variant="accent" className="mb-4 block">
            / Components
          </MonoLabel>

          <h1 className="mb-4 font-[family-name:var(--s-font-display)] text-[clamp(var(--s-size-3xl),5vw,var(--s-size-5xl))] font-[var(--s-heading-display-weight)] leading-[var(--s-heading-display-leading)] tracking-[var(--s-heading-display-tracking)] text-[var(--s-text)]">
            {SIGIL_PRODUCT_STATS.componentCountLabel} Token-Driven Components.
          </h1>

          <DensityText
            role="body"
            as="p"
            muted
            className="mb-6 max-w-[528px] leading-relaxed"
          >
            Every component reads from{" "}
            <code className="text-[var(--s-primary)]">var(--s-*)</code> tokens.
            Switch presets and the entire library updates instantly — no prop
            drilling, no theme objects, no manual overrides.
          </DensityText>

          <div className="flex gap-3 flex-wrap">
            <AccentCTA asChild>
              <a href="/docs/components/button">View Docs</a>
            </AccentCTA>
            <Button asChild variant="outline" size="lg">
              <a href="/sandbox">Open Sandbox</a>
            </Button>
          </div>
        </div>
      </SigilSection>

      <Divider pattern="vertical" size="md" showBorders />

      {/* ── Stats bar ── */}
      <SigilSection space="none">
        <GapPixelGrid columns={{ sm: 2, md: 4 }} data-stagger>
          {STATS.map((stat) => (
            <GapPixelCell
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 px-6"
            >
              <TabularValue size="xl" className="font-bold">
                {stat.value}
              </TabularValue>
              <MonoLabel className="mt-2">{stat.label}</MonoLabel>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </SigilSection>

      <Divider pattern="diagonal" size="md" showBorders />

      {/* ── Component Showcase ── */}
      <SigilSection space="compact">
        <ComponentShowcase />
      </SigilSection>

      {/* ── Component Anatomy ── */}
      <SigilSection space="normal">
        <div
          className="max-w-2xl"
          style={{
            marginBottom: "var(--s-section-header-block-margin-bottom, calc(1 * var(--s-grid-cell)))",
          }}
        >
          <MonoLabel
            variant="accent"
            className="block"
            style={{
              marginBottom: "var(--s-section-label-row-margin-bottom)",
            }}
          >
            HOW TOKENS FLOW
          </MonoLabel>

          <DensityText
            role="headline"
            as="h2"
            style={{
              marginBottom: "var(--s-section-heading-margin-bottom)",
            }}
          >
            Every component reads from tokens.
          </DensityText>

          <DensityText role="body" as="p" muted className="leading-relaxed">
            Colors, radius, shadows, motion, typography — all resolved at
            runtime from CSS custom properties. Change a token, every consumer
            updates. No imports, no build step, no prop drilling.
          </DensityText>
        </div>

        <ComponentAnatomyDiagram />
      </SigilSection>

      <Divider pattern="diagonal" size="md" showBorders />

      {/* ── Build with tokens ── */}
      <SigilSection space="normal">
        <div
          className="max-w-2xl"
          style={{
            marginBottom: "var(--s-section-header-block-margin-bottom, calc(1 * var(--s-grid-cell)))",
          }}
        >
          <MonoLabel
            variant="accent"
            className="block"
            style={{
              marginBottom: "var(--s-section-label-row-margin-bottom)",
            }}
          >
            WHY TOKENS
          </MonoLabel>

          <DensityText
            role="headline"
            as="h2"
            style={{
              marginBottom: "var(--s-section-heading-margin-bottom)",
            }}
          >
            Build with tokens, not overrides.
          </DensityText>
        </div>

        <GapPixelGrid columns={{ md: 2 }} data-stagger>
          {TOKEN_CARDS.map((card) => (
            <CardCell
              key={card.title}
              title={card.title}
              footer={
                <MonoLabel size="xs">var(--s-*)</MonoLabel>
              }
            >
              {card.body}
            </CardCell>
          ))}
        </GapPixelGrid>

        <div className="flex gap-3 flex-wrap mt-10">
          <AccentCTA asChild>
            <a href="/docs">Get Started</a>
          </AccentCTA>
          <Button asChild variant="outline" size="lg">
            <a href="/docs/theming">Read the Docs</a>
          </Button>
        </div>
      </SigilSection>

      <Divider pattern="vertical" size="md" showBorders />

      <LandingFooter />
    </SigilFrame>
  );
}
