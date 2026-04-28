"use client";

import { useState } from "react";
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
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Switch,
  Checkbox,
  Slider,
  Progress,
  Separator,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipProvider,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@sigil-ui/components";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { ComponentShowcase } from "@/components/landing/component-showcase";
import { ComponentAnatomyDiagram } from "@/components/landing/component-anatomy";
import { TextureBg } from "@/components/texture-bg";

const STATS = [
  { value: "200+", label: "Token-Driven Components" },
  { value: "33", label: "Categories" },
  { value: "519", label: "Tokens" },
  { value: "44", label: "Presets" },
] as const;

const TOKEN_CARDS = [
  {
    title: "No hardcoded values",
    body: "Components read var(--s-*) tokens for every visual property — colors, spacing, radius, shadows. Never hex codes, never magic numbers.",
  },
  {
    title: "One preset, everything updates",
    body: "Switch presets and all 200+ token-driven components change simultaneously. One command, zero prop drilling, zero theme objects.",
  },
  {
    title: "Agent-friendly",
    body: "AI agents edit tokens.md — a single markdown file. Components respond deterministically. No ambiguity, no hunting through files.",
  },
] as const;

export default function ComponentsPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      {/* ── Hero ── */}
      <SigilSection borderTop padding="96px 24px 48px" style={{ position: "relative", overflow: "hidden" }}>
        <TextureBg opacity={0.3} />
        <div className="relative z-[1] mb-12 max-w-3xl">
          <MonoLabel variant="accent" className="mb-4 block">
            / Components
          </MonoLabel>

          <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4">
            200+ Token-Driven Components.
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
            <a
              href="/sandbox"
              className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)] uppercase tracking-[0.08em]"
            >
              Open Sandbox
            </a>
          </div>
        </div>
      </SigilSection>

      <Divider pattern="vertical" size="md" showBorders />

      {/* ── Stats bar ── */}
      <SigilSection padding="0">
        <GapPixelGrid columns={{ sm: 2, md: 4 }}>
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

      <Divider pattern="diagonal" size="sm" showBorders />

      {/* ── Component Showcase ── */}
      <SigilSection padding="48px 24px">
        <ComponentShowcase />
      </SigilSection>

      {/* ── Component Anatomy ── */}
      <SigilSection padding="64px 24px">
        <div className="mb-10 max-w-2xl">
          <MonoLabel variant="accent" className="mb-4 block">
            HOW TOKENS FLOW
          </MonoLabel>

          <DensityText
            role="headline"
            as="h2"
            className="mb-4"
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

      <Divider pattern="diagonal" size="sm" showBorders />

      {/* ── Build with tokens ── */}
      <SigilSection padding="64px 24px">
        <div className="mb-10 max-w-2xl">
          <MonoLabel variant="accent" className="mb-4 block">
            WHY TOKENS
          </MonoLabel>

          <DensityText role="headline" as="h2" className="mb-4">
            Build with tokens, not overrides.
          </DensityText>
        </div>

        <GapPixelGrid columns={{ md: 3 }}>
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
          <a
            href="/docs/theming"
            className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)] uppercase tracking-[0.08em]"
          >
            Read the Docs
          </a>
        </div>
      </SigilSection>

      <Divider pattern="vertical" size="md" showBorders />

      <LandingFooter />
    </SigilFrame>
  );
}
