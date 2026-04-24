"use client";

import { useState } from "react";
import {
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentActive,
  cn,
} from "@sigil-ui/components";

const PRESETS = {
  sigil: {
    bg: "#0f0f14",
    surface: "#1a1a24",
    primary: "#9b99e8",
    text: "#e8e8ed",
    border: "#2a2a3a",
    fontDisplay: "'PP Mori', sans-serif",
  },
  noir: {
    bg: "#0a0a0a",
    surface: "#141414",
    primary: "#d97706",
    text: "#e5e5e5",
    border: "#262626",
    fontDisplay: "'Inter', sans-serif",
  },
  forge: {
    bg: "#0c0a09",
    surface: "#1c1917",
    primary: "#ea580c",
    text: "#e7e5e4",
    border: "#292524",
    fontDisplay: "'JetBrains Mono', monospace",
  },
  arc: {
    bg: "#0f0b1a",
    surface: "#1a1528",
    primary: "#7c3aed",
    text: "#e8e3f5",
    border: "#2d2640",
    fontDisplay: "'Space Grotesk', sans-serif",
  },
  crux: {
    bg: "#fafafa",
    surface: "#ffffff",
    primary: "#171717",
    text: "#171717",
    border: "#e5e5e5",
    fontDisplay: "'Inter', sans-serif",
  },
  flux: {
    bg: "#0f172a",
    surface: "#1e293b",
    primary: "#ec4899",
    text: "#e2e8f0",
    border: "#334155",
    fontDisplay: "'Outfit', sans-serif",
  },
} as const;

type PresetName = keyof typeof PRESETS;
const PRESET_NAMES = Object.keys(PRESETS) as PresetName[];

export interface PresetComparisonViewProps {
  className?: string;
  style?: React.CSSProperties;
}

function MiniPage({ preset }: { preset: PresetName }) {
  const p = PRESETS[preset];

  return (
    <div
      data-slot="mini-page"
      className="flex flex-col overflow-hidden"
      style={{
        background: p.bg,
        color: p.text,
        fontFamily: p.fontDisplay,
      }}
    >
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-3"
        style={{
          height: 40,
          borderBottom: `1px solid ${p.border}`,
        }}
      >
        <div
          className="rounded-[3px]"
          style={{
            width: 18,
            height: 18,
            background: p.primary,
            opacity: 0.9,
          }}
        />
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 5,
                height: 5,
                background: p.text,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center gap-2 px-4 py-5">
        <span
          className="font-bold leading-none"
          style={{ fontSize: 18, letterSpacing: "-0.02em" }}
        >
          Build faster.
        </span>
        <span style={{ fontSize: 10, opacity: 0.5 }}>
          Token-driven design system
        </span>
        <button
          type="button"
          className="mt-1 cursor-default border-0"
          style={{
            background: p.primary,
            color: p.bg,
            fontSize: 9,
            fontWeight: 600,
            padding: "5px 14px",
            borderRadius: 4,
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
          }}
        >
          Get Started
        </button>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 gap-[5px] px-3 pb-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1 p-2"
            style={{
              background: p.surface,
              border: `1px solid ${p.border}`,
              borderRadius: 4,
            }}
          >
            <div
              style={{
                width: "60%",
                height: 5,
                borderRadius: 2,
                background: p.text,
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: "90%",
                height: 3,
                borderRadius: 2,
                background: p.text,
                opacity: 0.15,
              }}
            />
            <div
              style={{
                width: "70%",
                height: 3,
                borderRadius: 2,
                background: p.text,
                opacity: 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PresetPills({
  selected,
  onSelect,
}: {
  selected: PresetName;
  onSelect: (p: PresetName) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {PRESET_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className="flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0"
        >
          <AccentActive active={selected === name}>
            <div
              className="rounded-full border"
              style={{
                width: 16,
                height: 16,
                background: PRESETS[name].primary,
                borderColor:
                  selected === name
                    ? "var(--s-primary)"
                    : "var(--s-border)",
              }}
            />
          </AccentActive>
          <MonoLabel
            size="xs"
            variant={selected === name ? "accent" : "muted"}
          >
            {name}
          </MonoLabel>
        </button>
      ))}
    </div>
  );
}

export function PresetComparisonView({
  className,
  style,
}: PresetComparisonViewProps) {
  const [leftPreset, setLeftPreset] = useState<PresetName>("sigil");
  const [rightPreset, setRightPreset] = useState<PresetName>("crux");

  return (
    <div
      data-slot="preset-comparison"
      className={cn("flex flex-col gap-6", className)}
      style={style}
    >
      <GapPixelGrid columns={{ base: 1, sm: 2 }} gap={1}>
        {/* Left column */}
        <GapPixelCell className="flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2">
            <MonoLabel variant="accent">Preset A</MonoLabel>
            <TabularValue size="xs" muted>
              {leftPreset}
            </TabularValue>
          </div>
          <MiniPage preset={leftPreset} />
        </GapPixelCell>

        {/* Right column */}
        <GapPixelCell className="flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2">
            <MonoLabel variant="accent">Preset B</MonoLabel>
            <TabularValue size="xs" muted>
              {rightPreset}
            </TabularValue>
          </div>
          <MiniPage preset={rightPreset} />
        </GapPixelCell>
      </GapPixelGrid>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
        <div className="flex flex-col items-center gap-2">
          <DensityText role="chrome">Preset A</DensityText>
          <PresetPills selected={leftPreset} onSelect={setLeftPreset} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <DensityText role="chrome">Preset B</DensityText>
          <PresetPills selected={rightPreset} onSelect={setRightPreset} />
        </div>
      </div>

      {/* Custom preset callout */}
      <div
        className="flex items-center gap-3 px-4 py-3 mt-2"
        style={{ background: "var(--s-surface)", border: "1px solid var(--s-border)" }}
      >
        <MonoLabel variant="accent" size="xs">YOUR OWN PRESET</MonoLabel>
        <DensityText role="chrome" muted>
          These are curated examples. Run <code className="text-[var(--s-primary)]">sigil preset create</code> to build
          a custom preset with your brand colors, fonts, and radius — then edit sigil.tokens.md for full control.
        </DensityText>
      </div>
    </div>
  );
}
