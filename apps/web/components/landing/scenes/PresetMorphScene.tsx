"use client";

import {
  DensityText,
  GapPixelCell,
  GapPixelGrid,
  MonoLabel,
} from "@sigil-ui/components";

/**
 * Preset morphing demo — a single mini-site card whose colors,
 * borders, radii, and accents swap between preset definitions to
 * sell the "one switch reskins everything" idea.
 *
 * Used by `app/page.tsx`'s "What is Sigil" section. State (`index`)
 * is owned by the page so the scene re-renders cheaply on each
 * preset toggle without re-mounting.
 */

export type MiniPreset = {
  name: string;
  primary: string;
  bg: string;
  surface: string;
  text: string;
  border: string;
  radius: string;
};

export const MINI_PRESETS: MiniPreset[] = [
  { name: "sigil", primary: "#9b99e8", bg: "#0f0f14", surface: "#1a1a24", text: "#e8e8ed", border: "#2a2a3a", radius: "8px" },
  { name: "noir", primary: "#d97706", bg: "#0a0a0a", surface: "#141414", text: "#e5e5e5", border: "#262626", radius: "6px" },
  { name: "forge", primary: "#ea580c", bg: "#0c0a09", surface: "#1c1917", text: "#e7e5e4", border: "#292524", radius: "2px" },
  { name: "cipher", primary: "#22c55e", bg: "#0a0f0a", surface: "#141f14", text: "#d4e8d4", border: "#1c3a1c", radius: "4px" },
  { name: "arc", primary: "#7c3aed", bg: "#0f0b1a", surface: "#1a1528", text: "#e8e3f5", border: "#2d2640", radius: "14px" },
  { name: "flux", primary: "#ec4899", bg: "#0f172a", surface: "#1e293b", text: "#e2e8f0", border: "#334155", radius: "12px" },
];

export function PresetMorphScene({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (i: number) => void;
}) {
  const p = MINI_PRESETS[index];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
      <div
        className="overflow-hidden border transition-all duration-[400ms]"
        style={{
          background: p.bg,
          color: p.text,
          borderColor: p.border,
          borderRadius: 8,
          transitionTimingFunction:
            "var(--s-ease-spring, cubic-bezier(0.32, 0.72, 0, 1))",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: `1px solid ${p.border}` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 transition-all duration-[400ms]"
              style={{
                background: p.primary,
                borderRadius: Number.parseInt(p.radius) / 2 || 2,
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Sigil / {p.name}
            </span>
          </div>
          <div className="flex gap-3">
            {["Docs", "Presets", "Lab"].map((l) => (
              <span
                key={l}
                className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.08em]"
                style={{ color: `color-mix(in srgb, ${p.text} 50%, transparent)` }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 py-7">
          <div
            className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.16em] mb-2 transition-colors duration-[600ms]"
            style={{ color: p.primary }}
          >
            Design system
          </div>
          <div className="text-xl font-bold tracking-[-0.03em] leading-[1.1] mb-2">
            One token file.<br />Every component.
          </div>
          <div
            className="text-[11px] leading-[1.6] mb-4"
            style={{
              color: `color-mix(in srgb, ${p.text} 60%, transparent)`,
              maxWidth: 260,
            }}
          >
            519 tokens control your entire visual identity.
          </div>
          <div className="flex gap-2">
            <div
              className="text-[9px] font-bold uppercase tracking-[0.04em] px-4 py-1.5 transition-all duration-[600ms]"
              style={{ background: p.primary, color: p.bg, borderRadius: p.radius }}
            >
              Get Started
            </div>
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.04em] px-4 py-1.5 transition-all duration-[600ms]"
              style={{ border: `1px solid ${p.border}`, borderRadius: p.radius }}
            >
              Browse
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-px transition-all duration-[600ms]"
          style={{ background: p.border }}
        >
          {["519", "46", "1"].map((val, i) => (
            <div
              key={i}
              className="p-3.5 transition-all duration-[600ms]"
              style={{ background: p.surface }}
            >
              <div
                className="font-[family-name:var(--s-font-mono)] text-lg font-bold tracking-[-0.02em] transition-colors duration-[600ms]"
                style={{ color: p.primary }}
              >
                {val}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em]">
                {["Tokens", "Presets", "Agent"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

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
                className="w-5 h-5 border-2 transition-all duration-[var(--s-duration-normal,200ms)]"
                style={{
                  background: preset.primary,
                  borderColor: index === i ? "var(--s-text)" : "transparent",
                  borderRadius: "50%",
                  transform: index === i ? "scale(1.25)" : "scale(1)",
                }}
              />
              <MonoLabel size="xs" variant={index === i ? "accent" : "muted"}>
                {preset.name}
              </MonoLabel>
            </GapPixelCell>
          ))}
        </GapPixelGrid>

        <div className="border border-[var(--s-border)] bg-[var(--s-surface)] p-5">
          <MonoLabel variant="accent" size="xs" className="block mb-3">
            Active preset
          </MonoLabel>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "primary", value: p.primary },
              { label: "radius", value: p.radius },
              { label: "background", value: p.bg },
              { label: "border", value: p.border },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-[var(--s-border)] pb-2"
              >
                <MonoLabel size="xs" className="normal-case tracking-normal">
                  {row.label}
                </MonoLabel>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 border border-[var(--s-border)]"
                    style={{ background: row.value }}
                  />
                  <DensityText role="chrome" muted>
                    {row.value}
                  </DensityText>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
          <MonoLabel variant="accent" size="xs" className="block mb-2">
            One command
          </MonoLabel>
          <div className="font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text)]">
            <span className="text-[var(--s-text-muted)]">$ </span>sigil preset{" "}
            {p.name}
          </div>
        </div>
      </div>
    </div>
  );
}
