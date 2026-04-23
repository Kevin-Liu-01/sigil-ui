"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { Stack, Divider, Badge, Button, Frame } from "@sigil-ui/components";
import { Palette, Paintbrush, Type, LayoutGrid, Blocks, Volume2, VolumeX, Settings, Shuffle } from "lucide-react";
import { useSigilTokens } from "./sandbox/token-provider";
import { useSigilSound } from "./sound-provider";
import { ControlPanel } from "./control-panel";
import type { SigilTokens } from "@sigil-ui/tokens";

const PRESET_DATA = [
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

type Tab = "presets" | "tokens" | "fonts" | "layout" | "components";

function PresetChip({ name, mood, colors, active, onClick }: {
  name: string; mood: string; colors: string[]; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 cursor-pointer transition-all"
      style={{
        width: 120, padding: "8px 10px",
        borderRadius: "var(--s-card-radius, 8px)",
        border: active ? "1.5px solid var(--s-primary)" : "1px solid var(--s-border)",
        background: active ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface))" : "var(--s-surface)",
        scrollSnapAlign: "start",
      }}
    >
      <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: c, border: "1px solid rgba(128,128,128,0.2)" }} />
        ))}
      </div>
      <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 600, color: "var(--s-text)", textAlign: "left" }}>
        {name}
      </div>
      <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 9, color: "var(--s-text-muted)", textAlign: "left" }}>
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
      <label style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", width: 80, flexShrink: 0 }}>
        {label}
      </label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: "var(--s-primary)", height: 4 }}
      />
      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-secondary)", width: 44, textAlign: "right" }}>
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
        style={{ width: 24, height: 24, border: "1px solid var(--s-border)", borderRadius: 4, cursor: "pointer", padding: 0 }}
      />
      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

function ComponentChip({ name, onDrop }: { name: string; onDrop: () => void }) {
  return (
    <button
      type="button"
      onClick={onDrop}
      className="cursor-pointer transition-colors"
      style={{
        padding: "4px 10px",
        borderRadius: "var(--s-radius-sm, 4px)",
        border: "1px solid var(--s-border)",
        background: "var(--s-surface)",
        fontFamily: "var(--s-font-mono)",
        fontSize: 11,
        color: "var(--s-text-secondary)",
      }}
    >
      {name}
    </button>
  );
}

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
  }, [setPreset]);

  const handleComponentDrop = useCallback((name: string) => {
    setDragMessage(`Added <${name} /> to canvas`);
    setTimeout(() => setDragMessage(null), 2000);
  }, []);

  const handleRandomize = useCallback(() => {
    const randomPreset = PRESET_DATA[Math.floor(Math.random() * PRESET_DATA.length)]!;
    setPreset(randomPreset.name);
  }, [setPreset]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "presets", label: "Presets", icon: <Palette size={12} /> },
    { id: "tokens", label: "Tokens", icon: <Paintbrush size={12} /> },
    { id: "fonts", label: "Fonts", icon: <Type size={12} /> },
    { id: "layout", label: "Layout", icon: <LayoutGrid size={12} /> },
    { id: "components", label: "Components", icon: <Blocks size={12} /> },
  ];

  return (
    <>
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: open ? "translateY(0)" : "translateY(calc(100% - 40px))",
      }}
    >
      {/* Toggle bar */}
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          maxWidth: 1200,
          margin: "0 auto",
          background: "var(--s-surface)",
          borderTop: "1px solid var(--s-border)",
          cursor: "pointer",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 600, color: "var(--s-text-secondary)" }}>
            sigil devbar
          </span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", padding: "1px 6px", borderRadius: 4, background: "var(--s-primary-muted, rgba(155,153,232,0.15))", color: "var(--s-primary)" }}>
            {activePreset}
          </span>
          {dragMessage && (
            <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-success)" }}>
              {dragMessage}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            style={{
              background: soundEnabled ? "color-mix(in oklch, var(--s-primary) 15%, transparent)" : "none",
              border: "1px solid var(--s-border)", borderRadius: 4,
              padding: "2px 8px", cursor: "pointer", fontFamily: "var(--s-font-mono)",
              fontSize: 10, color: soundEnabled ? "var(--s-primary)" : "var(--s-text-muted)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />} Sound</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPanelOpen(true); play("tap"); }}
            title="Open control panel"
            style={{
              background: "none", border: "1px solid var(--s-border)", borderRadius: 4,
              padding: "2px 8px", cursor: "pointer", fontFamily: "var(--s-font-mono)",
              fontSize: 10, color: "var(--s-text-muted)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Settings size={12} /> Customize</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleRandomize(); play("preset"); }}
            title="Randomize preset"
            style={{
              background: "none", border: "1px solid var(--s-border)", borderRadius: 4,
              padding: "2px 8px", cursor: "pointer", fontFamily: "var(--s-font-mono)",
              fontSize: 10, color: "var(--s-text-muted)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Shuffle size={12} /> Random</span>
          </button>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>
            {open ? "▼" : "▲"}
          </span>
        </div>
      </div>

      {/* Panel */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 240,
          background: "var(--s-surface)",
          borderTop: "1px solid var(--s-border)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid var(--s-border)",
            flexShrink: 0,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 16px",
                fontFamily: "var(--s-font-mono)",
                fontSize: 11,
                fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? "var(--s-primary)" : "var(--s-text-muted)",
                background: tab === t.id ? "color-mix(in oklch, var(--s-primary) 6%, var(--s-surface))" : "transparent",
                border: "none",
                borderBottom: tab === t.id ? "2px solid var(--s-primary)" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 150ms",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {t.icon}
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflow: "auto", padding: 12 }}>
          {tab === "presets" && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 8 }}>
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

          {tab === "tokens" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Colors
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <ColorSwatch label="primary" value={(tokens.colors?.primary as string) ?? "#9b99e8"} onChange={(v) => patchTokens("colors", "primary", v)} />
                  <ColorSwatch label="secondary" value={(tokens.colors?.secondary as string) ?? "#da8325"} onChange={(v) => patchTokens("colors", "secondary", v)} />
                  <ColorSwatch label="success" value={(tokens.colors?.success as string) ?? "#10b981"} onChange={(v) => patchTokens("colors", "success", v)} />
                  <ColorSwatch label="error" value={(tokens.colors?.error as string) ?? "#ef4444"} onChange={(v) => patchTokens("colors", "error", v)} />
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Radius & Spacing
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <TokenSlider label="card-radius" value={parseInt((tokens.radius?.lg as string) ?? "12")} min={0} max={32} step={1} unit="px" onChange={(v) => patchTokens("radius", "lg", `${v}px`)} />
                  <TokenSlider label="button-r" value={parseInt((tokens.radius?.md as string) ?? "8")} min={0} max={24} step={1} unit="px" onChange={(v) => patchTokens("radius", "md", `${v}px`)} />
                  <TokenSlider label="grid-cell" value={parseInt((tokens.sigil?.["grid-cell"] as string) ?? "48")} min={24} max={96} step={4} unit="px" onChange={(v) => patchTokens("sigil", "grid-cell", `${v}px`)} />
                </div>
              </div>
            </div>
          )}

          {tab === "fonts" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {(["display", "body", "mono"] as const).map((role) => (
                <div key={role}>
                  <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                    {role}
                  </div>
                  <select
                    value={(tokens.typography?.[`font-${role}` as keyof typeof tokens.typography] as string)?.split(",")[0]?.replace(/['"]/g, "") ?? "PP Neue Montreal"}
                    onChange={(e) => {
                      const family = `"${e.target.value}", system-ui, sans-serif`;
                      patchTokens("typography", `font-${role}`, role === "mono" ? `"${e.target.value}", ui-monospace, monospace` : family);
                    }}
                    style={{
                      width: "100%", padding: "6px 8px", fontSize: 11,
                      fontFamily: "var(--s-font-mono)",
                      border: "1px solid var(--s-border)", borderRadius: 6,
                      background: "var(--s-background)", color: "var(--s-text)",
                      cursor: "pointer",
                    }}
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <div style={{
                    marginTop: 6, padding: "6px 8px", borderRadius: 6,
                    background: "var(--s-surface-sunken, var(--s-surface))",
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

          {tab === "layout" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                  Page Structure
                </div>
                <TokenSlider
                  label="navbar-h"
                  value={parseInt((tokens.layout?.["navbar-height"] as string) ?? "64")}
                  min={48} max={96} step={4} unit="px"
                  onChange={(v) => patchTokens("layout", "navbar-height", `${v}px`)}
                />
                <TokenSlider
                  label="page-margin"
                  value={parseInt((tokens.layout?.["page-margin"] as string) ?? "24")}
                  min={8} max={64} step={4} unit="px"
                  onChange={(v) => patchTokens("layout", "page-margin", `${v}px`)}
                />
                <TokenSlider
                  label="gutter"
                  value={parseInt((tokens.layout?.gutter as string) ?? "16")}
                  min={8} max={48} step={4} unit="px"
                  onChange={(v) => patchTokens("layout", "gutter", `${v}px`)}
                />
                <TokenSlider
                  label="section-py"
                  value={parseInt((tokens.spacing?.["section-py"] as string) ?? "64")}
                  min={24} max={128} step={8} unit="px"
                  onChange={(v) => patchTokens("spacing", "section-py", `${v}px`)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                  Grid & Bento
                </div>
                <TokenSlider
                  label="bento-gap"
                  value={parseInt((tokens.layout?.["bento-gap"] as string) ?? "12")}
                  min={4} max={32} step={2} unit="px"
                  onChange={(v) => patchTokens("layout", "bento-gap", `${v}px`)}
                />
                <TokenSlider
                  label="bento-r"
                  value={parseInt((tokens.layout?.["bento-radius"] as string) ?? "12")}
                  min={0} max={32} step={2} unit="px"
                  onChange={(v) => patchTokens("layout", "bento-radius", `${v}px`)}
                />
                <TokenSlider
                  label="content-max"
                  value={parseInt((tokens.layout?.["content-max"] as string) ?? "1280")}
                  min={768} max={1920} step={64} unit="px"
                  onChange={(v) => patchTokens("layout", "content-max", `${v}px`)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, fontWeight: 600, color: "var(--s-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                  Alignment Rails
                </div>
                <TokenSlider
                  label="rail-margin"
                  value={parseInt((tokens.alignment?.["rail-margin"] as string) ?? "24")}
                  min={8} max={64} step={4} unit="px"
                  onChange={(v) => patchTokens("alignment" as any, "rail-margin", `${v}px`)}
                />
                <TokenSlider
                  label="section-py"
                  value={parseInt((tokens.sections?.["padding-y"] as string) ?? "64")}
                  min={24} max={160} step={8} unit="px"
                  onChange={(v) => patchTokens("sections" as any, "padding-y", `${v}px`)}
                />
                <TokenSlider
                  label="hero-py"
                  value={parseInt((tokens.sections?.["padding-y-hero"] as string) ?? "120")}
                  min={64} max={240} step={16} unit="px"
                  onChange={(v) => patchTokens("sections" as any, "padding-y-hero", `${v}px`)}
                />
                <TokenSlider
                  label="divider-w"
                  value={parseFloat((tokens.dividers?.width as string) ?? "1")}
                  min={0} max={4} step={0.5} unit="px"
                  onChange={(v) => patchTokens("dividers" as any, "width", `${v}px`)}
                />
              </div>
            </div>
          )}

          {tab === "components" && (
            <div>
              <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", marginBottom: 8 }}>
                Click a component to preview it on the page
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
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
