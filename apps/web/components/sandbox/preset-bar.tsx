"use client";

import { useCallback, useRef } from "react";
import { presets, type PresetName } from "@sigil-ui/presets";
import { useSigilActions, useSigilActivePreset } from "./token-provider";

const PRESET_DATA = [
  { name: "sigil", mood: "precise, structural", colors: ["#9b99e8", "#da8325", "#0a0a0f", "#fafafa"] },
  { name: "crux", mood: "minimal, decisive", colors: ["#dc2626", "#525252", "#ffffff", "#000000"] },
  { name: "alloy", mood: "industrial, warm", colors: ["#b87333", "#71717a", "#f5f4f0", "#1c1c1c"] },
  { name: "basalt", mood: "volcanic, dark", colors: ["#14b8a6", "#64748b", "#0f172a", "#e2e8f0"] },
  { name: "forge", mood: "hot, heavy", colors: ["#ea580c", "#dc2626", "#1c1917", "#fafaf9"] },
  { name: "onyx", mood: "luxury, gem-like", colors: ["#a855f7", "#eab308", "#000000", "#f5f5f5"] },
  { name: "flux", mood: "dynamic, energetic", colors: ["#06b6d4", "#a855f7", "#0a0a0f", "#fafafa"] },
  { name: "kova", mood: "cold, Nordic", colors: ["#38bdf8", "#94a3b8", "#f8fafc", "#0f172a"] },
  { name: "etch", mood: "etched, print-like", colors: ["#15803d", "#78716c", "#faf8f5", "#292524"] },
  { name: "anvil", mood: "heavy, utilitarian", colors: ["#1e40af", "#6b7280", "#e5e7eb", "#111827"] },
  { name: "rivet", mood: "structural, exposed", colors: ["#c2410c", "#71717a", "#fafaf9", "#18181b"] },
  { name: "shard", mood: "angular, aggressive", colors: ["#7c3aed", "#ec4899", "#fafafa", "#09090b"] },
  { name: "rune", mood: "ancient, mystical", colors: ["#b45309", "#78716c", "#f5f0e8", "#1c1917"] },
  { name: "fang", mood: "predatory, razor", colors: ["#84cc16", "#ef4444", "#000000", "#ffffff"] },
  { name: "cobalt", mood: "metallic, deep-blue", colors: ["#2563eb", "#06b6d4", "#020617", "#e0e0ff"] },
  { name: "strata", mood: "geological, layered", colors: ["#92400e", "#c2410c", "#f5f2ed", "#292524"] },
  { name: "brass", mood: "vintage, art-deco", colors: ["#a16207", "#78350f", "#fefdf8", "#1c1917"] },
  { name: "obsid", mood: "obsidian, reflective", colors: ["#be123c", "#a855f7", "#050505", "#d4d4d8"] },
  { name: "axiom", mood: "mathematical, clean", colors: ["#2563eb", "#6b7280", "#ffffff", "#000000"] },
  { name: "glyph", mood: "typographic, bold", colors: ["#dc2626", "#78716c", "#fafafa", "#09090b"] },
  { name: "cipher", mood: "terminal, hacker", colors: ["#22c55e", "#f59e0b", "#000000", "#22c55e"] },
  { name: "prism", mood: "spectral, colorful", colors: ["#8b5cf6", "#ec4899", "#faf5ff", "#1e1b4b"] },
  { name: "helix", mood: "biotech, scientific", colors: ["#059669", "#3b82f6", "#ffffff", "#064e3b"] },
  { name: "hex", mood: "hexagonal, spell", colors: ["#d946ef", "#06b6d4", "#0f0720", "#f5f3ff"] },
  { name: "vex", mood: "punk, provocative", colors: ["#ec4899", "#000000", "#fef08a", "#000000"] },
  { name: "arc", mood: "flowing, graceful", colors: ["#7c3aed", "#f43f5e", "#f5f3ff", "#1e1b4b"] },
  { name: "dsgn", mood: "wireframe, technical", colors: ["#2563eb", "#6b7280", "#ffffff", "#000000"] },
  { name: "mrkr", mood: "annotated, highlighted", colors: ["#eab308", "#dc2626", "#fefce8", "#1c1917"] },
  { name: "noir", mood: "cinematic, dramatic", colors: ["#d97706", "#ef4444", "#000000", "#e8e8e8"] },
  { name: "dusk", mood: "twilight, atmospheric", colors: ["#a78bfa", "#f472b6", "#1a1625", "#f5f3ff"] },
  { name: "mono", mood: "monochrome, monospace", colors: ["#525252", "#525252", "#ffffff", "#000000"] },
] as const;

export function PresetBar() {
  const activePreset = useSigilActivePreset();
  const { setPreset } = useSigilActions();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeName = activePreset.replace("*", "");

  const handleClick = useCallback(
    async (name: string) => {
      const loader = presets[name as PresetName];
      if (!loader) return;
      await setPreset(name);
    },
    [setPreset],
  );

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 16px",
        overflowX: "auto",
        overflowY: "hidden",
        height: "100%",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "thin",
      }}
    >
      {PRESET_DATA.map((p) => {
        const isActive = activeName === p.name;
        return (
          <button
            key={p.name}
            onClick={() => handleClick(p.name)}
            style={{
              flex: "0 0 140px",
              height: 100,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--s-surface)",
              border: isActive
                ? "2px solid var(--s-primary)"
                : "1px solid var(--s-border)",
              borderRadius: 8,
              cursor: "pointer",
              scrollSnapAlign: "start",
              textAlign: "left",
              fontFamily: "inherit",
              transition: "border-color 150ms, box-shadow 150ms",
              boxShadow: isActive
                ? "0 0 0 1px var(--s-primary)"
                : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--s-text)",
                  marginBottom: 2,
                  fontFamily: "var(--s-font-mono, monospace)",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--s-text-muted)",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.mood}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {p.colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    background: c,
                    border: "1px solid var(--s-border)",
                  }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
