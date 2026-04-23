"use client";

import { useState, useCallback, useRef, type ReactNode } from "react";
import { Palette, Paintbrush, Type, LayoutGrid, Blocks, Volume2, VolumeX, Settings, Shuffle, ChevronUp, Grid3X3 } from "lucide-react";
import { useSigilTokens } from "./sandbox/token-provider";
import { useSigilSound } from "./sound-provider";
import { ControlPanel } from "./control-panel";
import type { SigilTokens, GutterPattern } from "@sigil-ui/tokens";

const PRESET_DATA = [
  { name: "default", mood: "neutral", colors: ["#18181b", "#ffffff", "#0a0a0f", "#fafafa"] },
  { name: "sigil", mood: "structural", colors: ["#9b99e8", "#0a0a0f", "#fafafa", "#141419"] },
  { name: "crux", mood: "minimal", colors: ["#dc2626", "#ffffff", "#000000", "#f5f5f5"] },
  { name: "alloy", mood: "industrial", colors: ["#b87333", "#f5f4f0", "#1c1c1c", "#e8e6e0"] },
  { name: "basalt", mood: "volcanic", colors: ["#14b8a6", "#0f172a", "#e2e8f0", "#1e293b"] },
  { name: "forge", mood: "fiery", colors: ["#ea580c", "#1c1917", "#fafaf9", "#292524"] },
  { name: "onyx", mood: "luxury", colors: ["#a855f7", "#000000", "#f5f5f5", "#171717"] },
  { name: "flux", mood: "dynamic", colors: ["#06b6d4", "#0a0a0f", "#fafafa", "#141419"] },
  { name: "kova", mood: "nordic", colors: ["#38bdf8", "#f8fafc", "#0f172a", "#e2e8f0"] },
  { name: "etch", mood: "engraved", colors: ["#15803d", "#faf8f5", "#292524", "#f0ede8"] },
  { name: "anvil", mood: "heavy", colors: ["#1e40af", "#e5e7eb", "#111827", "#f3f4f6"] },
  { name: "rivet", mood: "structural", colors: ["#c2410c", "#fafaf9", "#18181b", "#f0f0f0"] },
  { name: "shard", mood: "angular", colors: ["#7c3aed", "#fafafa", "#09090b", "#f0f0f0"] },
  { name: "rune", mood: "ancient", colors: ["#b45309", "#f5f0e8", "#1c1917", "#e8e0d4"] },
  { name: "fang", mood: "predatory", colors: ["#84cc16", "#000000", "#ffffff", "#111111"] },
  { name: "cobalt", mood: "metallic", colors: ["#2563eb", "#020617", "#e0e0ff", "#0a0a2f"] },
  { name: "strata", mood: "geological", colors: ["#92400e", "#f5f2ed", "#292524", "#e8e4dd"] },
  { name: "brass", mood: "vintage", colors: ["#a16207", "#fefdf8", "#1c1917", "#f5f0e0"] },
  { name: "obsid", mood: "obsidian", colors: ["#be123c", "#050505", "#d4d4d8", "#111111"] },
  { name: "axiom", mood: "mathematical", colors: ["#2563eb", "#ffffff", "#000000", "#f5f5f5"] },
  { name: "glyph", mood: "typographic", colors: ["#dc2626", "#fafafa", "#09090b", "#f0f0f0"] },
  { name: "cipher", mood: "terminal", colors: ["#22c55e", "#000000", "#22c55e", "#0a0a0a"] },
  { name: "prism", mood: "spectral", colors: ["#8b5cf6", "#faf5ff", "#1e1b4b", "#f0e8ff"] },
  { name: "helix", mood: "biotech", colors: ["#059669", "#ffffff", "#064e3b", "#f0fdf4"] },
  { name: "hex", mood: "geometric", colors: ["#d946ef", "#0f0720", "#f5f3ff", "#1a1030"] },
  { name: "vex", mood: "punk", colors: ["#ec4899", "#fef08a", "#000000", "#fef9c3"] },
  { name: "arc", mood: "flowing", colors: ["#7c3aed", "#f5f3ff", "#1e1b4b", "#ede9fe"] },
  { name: "dsgn", mood: "wireframe", colors: ["#2563eb", "#ffffff", "#000000", "#f5f5f5"] },
  { name: "mrkr", mood: "annotated", colors: ["#eab308", "#fefce8", "#1c1917", "#fef9c3"] },
  { name: "noir", mood: "cinematic", colors: ["#d97706", "#000000", "#e8e8e8", "#0a0a0a"] },
  { name: "dusk", mood: "twilight", colors: ["#a78bfa", "#1a1625", "#f5f3ff", "#2a2035"] },
  { name: "mono", mood: "monochrome", colors: ["#525252", "#ffffff", "#000000", "#f5f5f5"] },
];

const COMPONENT_LIST = [
  "Hero", "Button", "Card", "Badge", "Input", "KPI", "Terminal",
  "CodeBlock", "Grid", "Stack", "Diamond", "Hexagon", "Triangle",
  "Box3D", "Card3D", "Pricing", "CTA", "FeatureFrame", "Timeline",
  "Accordion", "Table", "Tabs", "LoadingSpinner", "Avatar", "Progress",
];

const FONT_OPTIONS = [
  "PP Neue Montreal", "PP Mori", "PP Telegraf", "PP Gosha Sans",
  "PP Radio Grotesk", "PP Pangram Sans", "PP Supply Sans",
  "PP Editorial New", "PP Eiko", "PP Hatton", "PP Cirka",
  "PP Monument Extended", "PP Neue Machina", "PP Stellar",
  "PP Fraktion Mono", "PP Supply Mono", "PP Neue Bit",
];

const GUTTER_PATTERNS: GutterPattern[] = [
  "grid", "dots", "crosshatch", "diagonal", "diamond", "horizontal",
  "hexagon", "triangle", "zigzag", "checker", "plus", "brick", "wave", "none",
];

type Tab = "presets" | "tokens" | "fonts" | "layout" | "components";

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function PresetChip({ name, mood, colors, active, onClick }: {
  name: string; mood: string; colors: string[]; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex-shrink-0 cursor-pointer"
      style={{
        width: 116,
        padding: "10px 10px 8px",
        borderRadius: "var(--s-radius-sm, 6px)",
        border: active ? "1.5px solid var(--s-primary)" : "1px solid color-mix(in oklch, var(--s-border) 60%, transparent)",
        background: active
          ? "color-mix(in oklch, var(--s-primary) 6%, var(--s-surface))"
          : "var(--s-surface)",
        transition: "all 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: active
          ? "0 0 0 1px color-mix(in oklch, var(--s-primary) 20%, transparent)"
          : "none",
      }}
    >
      <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
        {colors.map((c, i) => (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: 2,
            background: c,
            border: "0.5px solid rgba(128,128,128,0.15)",
          }} />
        ))}
      </div>
      <div style={{
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 10.5, fontWeight: 600,
        color: active ? "var(--s-primary)" : "var(--s-text)",
        textAlign: "left", lineHeight: 1.2,
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 9, color: "var(--s-text-muted)",
        textAlign: "left", marginTop: 1, lineHeight: 1,
      }}>
        {mood}
      </div>
    </button>
  );
}

function TokenSlider({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <label style={{
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 10, fontWeight: 500,
        color: "var(--s-text-muted)",
        width: 80, flexShrink: 0,
        letterSpacing: "0.01em",
      }}>
        {label}
      </label>
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="devbar-slider"
          style={{ width: "100%", height: 3, accentColor: "var(--s-primary)" }}
        />
      </div>
      <span style={{
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 10, fontWeight: 500,
        color: "var(--s-text-secondary)",
        width: 42, textAlign: "right",
        fontVariantNumeric: "tabular-nums",
      }}>
        {value}{unit}
      </span>
    </div>
  );
}

function ColorSwatch({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <input
        type="color" value={value.startsWith("#") ? value : "#9b99e8"}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 22, height: 22, border: "1px solid var(--s-border)",
          borderRadius: "var(--s-radius-sm, 4px)", cursor: "pointer", padding: 0,
        }}
      />
      <span style={{
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 10, color: "var(--s-text-muted)", fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
      fontSize: 9, fontWeight: 600,
      color: "var(--s-text-muted)",
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      marginBottom: 6,
      paddingBottom: 4,
      borderBottom: "1px solid color-mix(in oklch, var(--s-border) 40%, transparent)",
    }}>
      {children}
    </div>
  );
}

function PatternChip({ pattern, active, onClick }: {
  pattern: GutterPattern; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "3px 8px",
        borderRadius: "var(--s-radius-sm, 4px)",
        border: active
          ? "1px solid var(--s-primary)"
          : "1px solid color-mix(in oklch, var(--s-border) 50%, transparent)",
        background: active
          ? "color-mix(in oklch, var(--s-primary) 10%, var(--s-surface))"
          : "transparent",
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 9.5, fontWeight: active ? 600 : 400,
        color: active ? "var(--s-primary)" : "var(--s-text-muted)",
        cursor: "pointer",
        transition: "all 120ms ease-out",
        lineHeight: 1.4,
      }}
    >
      {pattern}
    </button>
  );
}

function ComponentChip({ name, onDrop }: { name: string; onDrop: () => void }) {
  return (
    <button
      type="button"
      onClick={onDrop}
      className="cursor-pointer"
      style={{
        padding: "3px 10px",
        borderRadius: "var(--s-radius-sm, 4px)",
        border: "1px solid color-mix(in oklch, var(--s-border) 50%, transparent)",
        background: "transparent",
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        fontSize: 10.5, fontWeight: 500,
        color: "var(--s-text-secondary)",
        cursor: "pointer",
        transition: "all 120ms ease-out",
      }}
    >
      {name}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main devbar                                                          */
/* ------------------------------------------------------------------ */

export function SigilDevBar() {
  const { tokens, activePreset, setPreset, patchTokens } = useSigilTokens();
  const { enabled: soundEnabled, setEnabled: setSoundEnabled, play, setActivePreset: setSoundPreset } = useSigilSound();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("presets");
  const [dragMessage, setDragMessage] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const handlePreset = useCallback((name: string) => {
    setPreset(name);
    setSoundPreset(name);
    play("preset");
  }, [setPreset, setSoundPreset, play]);

  const handleComponentDrop = useCallback((name: string) => {
    setDragMessage(`Added <${name} />`);
    setTimeout(() => setDragMessage(null), 2000);
  }, []);

  const handleRandomize = useCallback(() => {
    const randomPreset = PRESET_DATA[Math.floor(Math.random() * PRESET_DATA.length)]!;
    setPreset(randomPreset.name);
  }, [setPreset]);

  const currentGutterPattern = (tokens.sigil?.["gutter-pattern"] as GutterPattern) ?? "grid";
  const currentMarginPattern = (tokens.sigil?.["margin-pattern"] as GutterPattern) ?? "horizontal";

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "presets", label: "Presets", icon: <Palette size={11} /> },
    { id: "tokens", label: "Tokens", icon: <Paintbrush size={11} /> },
    { id: "fonts", label: "Fonts", icon: <Type size={11} /> },
    { id: "layout", label: "Layout", icon: <LayoutGrid size={11} /> },
    { id: "components", label: "Components", icon: <Blocks size={11} /> },
  ];

  return (
    <>
      {/* Inline styles for slider and scrollbar */}
      <style>{`
        .devbar-slider { appearance: none; -webkit-appearance: none; background: transparent; cursor: pointer; }
        .devbar-slider::-webkit-slider-runnable-track { height: 2px; background: color-mix(in oklch, var(--s-border) 80%, transparent); border-radius: 1px; }
        .devbar-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%; background: var(--s-primary); margin-top: -4px; border: 1.5px solid var(--s-surface); box-shadow: 0 0 0 1px color-mix(in oklch, var(--s-primary) 30%, transparent); }
        .devbar-slider::-moz-range-track { height: 2px; background: color-mix(in oklch, var(--s-border) 80%, transparent); border-radius: 1px; border: none; }
        .devbar-slider::-moz-range-thumb { width: 10px; height: 10px; border-radius: 50%; background: var(--s-primary); border: 1.5px solid var(--s-surface); box-shadow: 0 0 0 1px color-mix(in oklch, var(--s-primary) 30%, transparent); }
        .devbar-scroll::-webkit-scrollbar { height: 3px; }
        .devbar-scroll::-webkit-scrollbar-track { background: transparent; }
        .devbar-scroll::-webkit-scrollbar-thumb { background: color-mix(in oklch, var(--s-border) 50%, transparent); border-radius: 2px; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: open ? "translateY(0)" : "translateY(calc(100% - 36px))",
        }}
      >
        {/* ── Toggle bar ────────────────────────────────────── */}
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            maxWidth: 1200,
            margin: "0 auto",
            background: "color-mix(in oklch, var(--s-surface) 92%, var(--s-background))",
            borderTop: "1px solid var(--s-border)",
            backdropFilter: "blur(12px) saturate(1.4)",
            WebkitBackdropFilter: "blur(12px) saturate(1.4)",
            cursor: "pointer",
          }}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 3,
              background: "color-mix(in oklch, var(--s-primary) 12%, transparent)",
            }}>
              <Grid3X3 size={10} style={{ color: "var(--s-primary)" }} />
            </div>
            <span style={{
              fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
              fontSize: 10.5, fontWeight: 600,
              color: "var(--s-text-secondary)",
              letterSpacing: "0.02em",
            }}>
              sigil
            </span>
            <span style={{
              fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
              fontSize: 9.5, fontWeight: 600,
              padding: "1px 7px",
              borderRadius: "var(--s-radius-sm, 3px)",
              background: "color-mix(in oklch, var(--s-primary) 10%, transparent)",
              color: "var(--s-primary)",
              letterSpacing: "0.02em",
            }}>
              {activePreset}
            </span>
            {dragMessage && (
              <span style={{
                fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                fontSize: 9.5, color: "var(--s-success)",
                fontWeight: 500,
              }}>
                {dragMessage}
              </span>
            )}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {([
              {
                label: soundEnabled ? "Sound" : "Muted",
                icon: soundEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />,
                active: soundEnabled,
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); },
              },
              {
                label: "Customize",
                icon: <Settings size={10} />,
                active: false,
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); setPanelOpen(true); play("tap"); },
              },
              {
                label: "Random",
                icon: <Shuffle size={10} />,
                active: false,
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); handleRandomize(); play("preset"); },
              },
            ] as const).map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.onClick}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "3px 8px",
                  borderRadius: "var(--s-radius-sm, 3px)",
                  border: "1px solid color-mix(in oklch, var(--s-border) 50%, transparent)",
                  background: btn.active
                    ? "color-mix(in oklch, var(--s-primary) 10%, transparent)"
                    : "transparent",
                  fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                  fontSize: 9.5, fontWeight: 500,
                  color: btn.active ? "var(--s-primary)" : "var(--s-text-muted)",
                  cursor: "pointer",
                  transition: "all 120ms ease-out",
                }}
              >
                {btn.icon}{btn.label}
              </button>
            ))}
            <ChevronUp
              size={12}
              style={{
                color: "var(--s-text-muted)",
                marginLeft: 4,
                transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </div>

        {/* ── Panel ─────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 260,
            background: "color-mix(in oklch, var(--s-surface) 95%, var(--s-background))",
            borderTop: "1px solid color-mix(in oklch, var(--s-border) 60%, transparent)",
            backdropFilter: "blur(16px) saturate(1.4)",
            WebkitBackdropFilter: "blur(16px) saturate(1.4)",
            display: "flex",
            flexDirection: "column" as const,
          }}
        >
          {/* ── Tab bar ──── */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid color-mix(in oklch, var(--s-border) 40%, transparent)",
              flexShrink: 0,
              padding: "0 4px",
            }}
          >
            {tabs.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  style={{
                    position: "relative" as const,
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "7px 14px",
                    fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                    fontSize: 10, fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                    color: isActive ? "var(--s-primary)" : "var(--s-text-muted)",
                    background: "transparent",
                    border: "none",
                    borderBottom: isActive
                      ? "1.5px solid var(--s-primary)"
                      : "1.5px solid transparent",
                    cursor: "pointer",
                    transition: "all 150ms ease-out",
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* ── Tab content ── */}
          <div className="devbar-scroll" style={{ flex: 1, overflow: "auto", padding: "10px 14px 14px" }}>

            {/* ═══ Presets ═══ */}
            {tab === "presets" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingBottom: 8 }}>
                {PRESET_DATA.map((p) => (
                  <PresetChip
                    key={p.name}
                    {...p}
                    active={activePreset.replace("*", "") === p.name}
                    onClick={() => handlePreset(p.name)}
                  />
                ))}
              </div>
            )}

            {/* ═══ Tokens ═══ */}
            {tab === "tokens" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <SectionLabel>Colors</SectionLabel>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <ColorSwatch label="primary" value={(tokens.colors?.primary as string) ?? "#9b99e8"} onChange={(v) => patchTokens("colors", "primary", v)} />
                    <ColorSwatch label="secondary" value={(tokens.colors?.secondary as string) ?? "#da8325"} onChange={(v) => patchTokens("colors", "secondary", v)} />
                    <ColorSwatch label="success" value={(tokens.colors?.success as string) ?? "#10b981"} onChange={(v) => patchTokens("colors", "success", v)} />
                    <ColorSwatch label="error" value={(tokens.colors?.error as string) ?? "#ef4444"} onChange={(v) => patchTokens("colors", "error", v)} />
                  </div>
                </div>
                <div>
                  <SectionLabel>Radius & Spacing</SectionLabel>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <TokenSlider label="card-radius" value={parseInt((tokens.radius?.lg as string) ?? "12")} min={0} max={32} step={1} unit="px" onChange={(v) => patchTokens("radius", "lg", `${v}px`)} />
                    <TokenSlider label="button-r" value={parseInt((tokens.radius?.md as string) ?? "8")} min={0} max={24} step={1} unit="px" onChange={(v) => patchTokens("radius", "md", `${v}px`)} />
                    <TokenSlider label="grid-cell" value={parseInt((tokens.sigil?.["grid-cell"] as string) ?? "48")} min={24} max={96} step={4} unit="px" onChange={(v) => patchTokens("sigil", "grid-cell", `${v}px`)} />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Fonts ═══ */}
            {tab === "fonts" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {(["display", "body", "mono"] as const).map((role) => (
                  <div key={role}>
                    <SectionLabel>{role}</SectionLabel>
                    <select
                      value={(tokens.typography?.[`font-${role}` as keyof typeof tokens.typography] as string)?.split(",")[0]?.replace(/['"]/g, "") ?? "PP Neue Montreal"}
                      onChange={(e) => {
                        const family = `"${e.target.value}", system-ui, sans-serif`;
                        patchTokens("typography", `font-${role}`, role === "mono" ? `"${e.target.value}", ui-monospace, monospace` : family);
                      }}
                      style={{
                        width: "100%", padding: "5px 8px", fontSize: 10.5,
                        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                        border: "1px solid color-mix(in oklch, var(--s-border) 60%, transparent)",
                        borderRadius: "var(--s-radius-sm, 4px)",
                        background: "var(--s-background)", color: "var(--s-text)",
                        cursor: "pointer",
                      }}
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                    <div style={{
                      marginTop: 6, padding: "5px 8px",
                      borderRadius: "var(--s-radius-sm, 4px)",
                      background: "color-mix(in oklch, var(--s-surface) 60%, var(--s-background))",
                      fontFamily: `"${(tokens.typography?.[`font-${role}` as keyof typeof tokens.typography] as string)?.split(",")[0]?.replace(/['"]/g, "") ?? "PP Neue Montreal"}", system-ui`,
                      fontSize: 13, color: "var(--s-text-secondary)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      The quick brown fox
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ═══ Layout ═══ */}
            {tab === "layout" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Left column: sliders */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Frame */}
                  <div>
                    <SectionLabel>Frame</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      <TokenSlider
                        label="content-max"
                        value={parseInt((tokens.layout?.["content-max"] as string) ?? "1200")}
                        min={768} max={1600} step={40} unit="px"
                        onChange={(v) => patchTokens("layout", "content-max", `${v}px`)}
                      />
                      <TokenSlider
                        label="rail-gap"
                        value={parseInt((tokens.sigil?.["rail-gap"] as string) ?? "24")}
                        min={8} max={48} step={4} unit="px"
                        onChange={(v) => patchTokens("sigil", "rail-gap", `${v}px`)}
                      />
                      <TokenSlider
                        label="grid-cell"
                        value={parseInt((tokens.sigil?.["grid-cell"] as string) ?? "48")}
                        min={16} max={80} step={4} unit="px"
                        onChange={(v) => patchTokens("sigil", "grid-cell", `${v}px`)}
                      />
                      <TokenSlider
                        label="cross-stroke"
                        value={parseFloat((tokens.sigil?.["cross-stroke"] as string) ?? "1.5")}
                        min={0} max={4} step={0.5} unit="px"
                        onChange={(v) => patchTokens("sigil", "cross-stroke", `${v}px`)}
                      />
                    </div>
                  </div>

                  {/* Spacing */}
                  <div>
                    <SectionLabel>Spacing</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      <TokenSlider
                        label="page-margin"
                        value={parseInt((tokens.layout?.["page-margin"] as string) ?? "20")}
                        min={8} max={64} step={4} unit="px"
                        onChange={(v) => patchTokens("layout", "page-margin", `${v}px`)}
                      />
                      <TokenSlider
                        label="gutter"
                        value={parseInt((tokens.layout?.gutter as string) ?? "20")}
                        min={8} max={48} step={4} unit="px"
                        onChange={(v) => patchTokens("layout", "gutter", `${v}px`)}
                      />
                      <TokenSlider
                        label="navbar-h"
                        value={parseInt((tokens.spacing?.["navbar-height"] as string) ?? "56")}
                        min={36} max={96} step={4} unit="px"
                        onChange={(v) => patchTokens("spacing", "navbar-height", `${v}px`)}
                      />
                      <TokenSlider
                        label="section-py"
                        value={parseInt((tokens.spacing?.["section-py"] as string) ?? "80")}
                        min={24} max={160} step={8} unit="px"
                        onChange={(v) => patchTokens("spacing", "section-py", `${v}px`)}
                      />
                      <TokenSlider
                        label="bento-gap"
                        value={parseInt((tokens.layout?.["bento-gap"] as string) ?? "12")}
                        min={2} max={32} step={2} unit="px"
                        onChange={(v) => patchTokens("layout", "bento-gap", `${v}px`)}
                      />
                    </div>
                  </div>
                </div>

                {/* Right column: pattern selectors */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Gutter pattern */}
                  <div>
                    <SectionLabel>Gutter Pattern</SectionLabel>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {GUTTER_PATTERNS.map((p) => (
                        <PatternChip
                          key={p}
                          pattern={p}
                          active={currentGutterPattern === p}
                          onClick={() => patchTokens("sigil", "gutter-pattern", p)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Margin pattern */}
                  <div>
                    <SectionLabel>Margin Pattern</SectionLabel>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {GUTTER_PATTERNS.map((p) => (
                        <PatternChip
                          key={p}
                          pattern={p}
                          active={currentMarginPattern === p}
                          onClick={() => patchTokens("sigil", "margin-pattern", p)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Components ═══ */}
            {tab === "components" && (
              <div>
                <div style={{
                  fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                  fontSize: 10, color: "var(--s-text-muted)", marginBottom: 8, fontWeight: 500,
                }}>
                  Click a component to preview it on the page
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {COMPONENT_LIST.map((name) => (
                    <ComponentChip key={name} name={name} onDrop={() => handleComponentDrop(name)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ControlPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
