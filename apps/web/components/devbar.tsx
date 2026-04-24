"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  Shuffle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Monitor,
  PanelLeft,
  PanelRight,
  X,
  RotateCcw,
  Download,
  Save,
  Trash2,
  MessageSquare,
  Send,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Slider as SigilSlider,
  Switch as SigilSwitch,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SegmentedControl,
  SegmentedControlItem,
} from "@sigil-ui/components";
import { useSigilTokens } from "./sandbox/token-provider";
import { useSigilSound } from "./sound-provider";
import type { SigilTokens, GutterPattern } from "@sigil-ui/tokens";

/* ================================================================== */
/*  Devbar State Context                                               */
/* ================================================================== */

export type DockPosition = "left" | "right";

type DevBarState = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  canvasMode: boolean;
  setCanvasMode: (v: boolean) => void;
  dock: DockPosition;
  setDock: (d: DockPosition) => void;
  agentOpen: boolean;
  setAgentOpen: (v: boolean) => void;
};

const DevBarContext = createContext<DevBarState | null>(null);

export function useDevBar() {
  return useContext(DevBarContext);
}

export function DevBarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [canvasMode, setCanvasMode] = useState(false);
  const [dock, setDock] = useState<DockPosition>("left");
  const [agentOpen, setAgentOpen] = useState(false);

  const ctx = useMemo<DevBarState>(
    () => ({ sidebarOpen, setSidebarOpen, canvasMode, setCanvasMode, dock, setDock, agentOpen, setAgentOpen }),
    [sidebarOpen, canvasMode, dock, agentOpen],
  );

  return <DevBarContext.Provider value={ctx}>{children}</DevBarContext.Provider>;
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const SIDEBAR_W = 260;
const SIDEBAR_W_MOBILE = 280;
const AGENT_W = 340;
const TOOLBAR_H = 44;
const MOBILE_BP = 768;

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
  { name: "vast", mood: "editorial", colors: ["#a0522d", "#faf6f0", "#2c1810", "#f0e8df"] },
  { name: "aura", mood: "ethereal", colors: ["#8b5cf6", "#0f0a1e", "#e8e0f8", "#1a1030"] },
  { name: "field", mood: "utilitarian", colors: ["#15803d", "#ffffff", "#0a1a10", "#f0f4f0"] },
];

const DISPLAY_FONTS = [
  "ABC Monument Grotesk", "PP Neue Montreal", "PP Mori", "Apfel Grotezk",
  "Nacelle", "Vulf Sans", "PP Editorial New", "PP Eiko", "PP Hatton",
  "PP Monument Extended", "PP Neue Machina", "PP Telegraf", "PP Gosha Sans",
  "PP Radio Grotesk", "PP Pangram Sans", "PP Supply Sans",
];

const MONO_FONTS = ["PP Fraktion Mono", "PP Supply Mono", "PP Neue Bit"];

const GUTTER_PATTERNS: GutterPattern[] = [
  "grid", "dots", "crosshatch", "diagonal", "diamond", "horizontal",
  "horizontal-thin", "horizontal-wide", "hexagon", "triangle", "zigzag",
  "checker", "plus", "brick", "wave", "none",
];

const SHADOW_OPTIONS = ["none", "sm", "md", "lg", "xl"] as const;
const BORDER_STYLES = ["solid", "dashed", "dotted", "none"] as const;
const CELL_BG_OPTIONS = ["none", "surface", "alternate"] as const;
const CONTENT_ALIGN = ["center", "left", "wide"] as const;
const HERO_ALIGN = ["center", "left", "full-bleed"] as const;
const NAVBAR_ALIGN = ["full", "content", "inset"] as const;

const COMPONENT_LIST = [
  "Hero", "Button", "Card", "Badge", "Input", "KPI", "Terminal",
  "CodeBlock", "Grid", "Stack", "Diamond", "Hexagon", "Triangle",
  "Box3D", "Card3D", "Pricing", "CTA", "FeatureFrame", "Timeline",
  "Accordion", "Table", "Tabs", "LoadingSpinner", "Avatar", "Progress",
];

/* ================================================================== */
/*  Mobile detection                                                   */
/* ================================================================== */

function useIsMobile(breakpoint = MOBILE_BP) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ================================================================== */
/*  Custom Preset Persistence                                          */
/* ================================================================== */

type CustomPreset = { name: string; tokens: SigilTokens; createdAt: number };

const STORAGE_KEY = "sigil-custom-presets";

function loadCustomPresets(): CustomPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomPreset[]) : [];
  } catch { return []; }
}

function saveCustomPresetsToStorage(presets: CustomPreset[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(presets)); } catch { /* quota */ }
}

/* ================================================================== */
/*  Token Helpers                                                      */
/* ================================================================== */

function readStr(obj: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = obj?.[key];
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && "dark" in (v as Record<string, unknown>))
    return String((v as Record<string, string>).dark);
  return fallback;
}

function readNum(obj: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const raw = obj?.[key];
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return parseFloat(raw) || fallback;
  return fallback;
}

function readBool(obj: Record<string, unknown> | undefined, key: string, fallback: boolean): boolean {
  const raw = obj?.[key];
  if (typeof raw === "boolean") return raw;
  if (typeof raw === "string") return raw === "true" || raw === "1";
  return fallback;
}

function toCssColor(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("dark" in obj && typeof obj.dark === "string") return obj.dark;
    if ("light" in obj && typeof obj.light === "string") return obj.light;
  }
  return "#888888";
}

let _hexCanvas: HTMLCanvasElement | null = null;
function cssToHex(css: string): string {
  if (css.startsWith("#") && (css.length === 4 || css.length === 7 || css.length === 9)) return css;
  if (typeof document === "undefined") return "#888888";
  if (!_hexCanvas) _hexCanvas = document.createElement("canvas");
  const ctx = _hexCanvas.getContext("2d");
  if (!ctx) return "#888888";
  ctx.fillStyle = "#000000";
  ctx.fillStyle = css;
  const parsed = ctx.fillStyle;
  if (parsed.startsWith("#")) return parsed;
  const m = parsed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    const [, r, g, b] = m;
    return `#${[r, g, b].map(x => Number(x).toString(16).padStart(2, "0")).join("")}`;
  }
  return "#888888";
}

/* ================================================================== */
/*  Micro Controls                                                     */
/* ================================================================== */

const FONT_BODY = '"PP Telegraf", "PP Mori", system-ui, sans-serif';
const FONT_DISPLAY = '"PP Mori", system-ui, sans-serif';
const FONT_MONO = '"PP Fraktion Mono", ui-monospace, monospace';
const FONT = FONT_BODY;

function SectionHeader({ title, open, onToggle }: {
  title: string; open: boolean; onToggle: () => void;
}) {
  return (
    <button
      type="button" onClick={onToggle}
      style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "8px 0",
        background: "none", border: "none", cursor: "pointer",
      }}
    >
      <span style={{
        fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 600,
        color: "var(--db-text2)", textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        {title}
      </span>
      <ChevronDown
        size={10}
        style={{
          color: "var(--db-muted)",
          transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </button>
  );
}

function Section({ title, defaultOpen, children }: {
  title: string; defaultOpen?: boolean; children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div style={{ borderBottom: "1px solid var(--db-border)", padding: "0 16px" }}>
      <SectionHeader title={title} open={open} onToggle={() => setOpen(v => !v)} />
      <div style={{
        overflow: "hidden", maxHeight: open ? 600 : 0, opacity: open ? 1 : 0,
        transition: "max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease",
        paddingBottom: open ? 10 : 0,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>
      </div>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 26 }}>
      <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 500, color: "var(--db-muted)", width: 72, flexShrink: 0, letterSpacing: "0.02em" }}>{label}</span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {value && <span style={{ fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 500, color: "var(--db-text2)", width: 44, textAlign: "right", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{value}</span>}
    </div>
  );
}

function Slider({ value, min, max, step, onChange }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return <SigilSlider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => { if (v !== undefined) onChange(v); }} className="w-full" />;
}

function ColorInput({ value, onChange }: { value: unknown; onChange: (v: string) => void }) {
  const css = toCssColor(value);
  const hex = cssToHex(css);
  return (
    <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0 }}>
      <div style={{ width: 24, height: 24, borderRadius: 4, background: css, border: "1px solid var(--db-border)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />
      <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", border: "none", padding: 0 }} />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return <SigilSwitch size="sm" checked={checked} onCheckedChange={onChange} />;
}

function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <SegmentedControl value={value} onValueChange={(v) => onChange(v as T)} className="w-full text-xs">
      {options.map((opt) => <SegmentedControlItem key={opt} value={opt} className="text-[10px] px-2 py-0.5">{opt}</SegmentedControlItem>)}
    </SegmentedControl>
  );
}

function useDevbarPortalStyle(): React.CSSProperties {
  const root = typeof document !== "undefined" ? document.querySelector(".devbar-root") : null;
  const isDark = root?.closest(".dark") || root?.closest("[data-theme='dark']");
  return {
    ["--s-primary" as string]: isDark ? "#e4e4e7" : "#18181b",
    ["--s-background" as string]: isDark ? "#0a0a0f" : "#ffffff",
    ["--s-surface" as string]: isDark ? "#141419" : "#f8f8fa",
    ["--s-border" as string]: isDark ? "#2c2c3c" : "#d0d0d8",
    ["--s-border-style" as string]: "solid",
    ["--s-text" as string]: isDark ? "#fafafa" : "#0a0a0f",
    ["--s-text-muted" as string]: isDark ? "#8888a0" : "#8a8a95",
    ["--s-radius-md" as string]: "6px",
    ["--s-card-radius" as string]: "6px",
    ["--s-shadow-lg" as string]: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.12)",
    ["--s-duration-fast" as string]: "150ms",
    background: isDark ? "#141419" : "#f8f8fa",
    borderColor: isDark ? "#2c2c3c" : "#d0d0d8",
    color: isDark ? "#fafafa" : "#0a0a0f",
    zIndex: 10002,
  };
}

function SelectField({ value, options, onChange, showFont }: { value: string; options: readonly string[]; onChange: (v: string) => void; showFont?: boolean }) {
  const portalStyle = useDevbarPortalStyle();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="h-7 text-[11px] px-2"
        style={showFont ? { fontFamily: `"${value}", system-ui, sans-serif` } : undefined}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-[200px]" style={portalStyle}>
        {options.map((o) => (
          <SelectItem
            key={o}
            value={o}
            className="text-[11px] pl-6"
            style={showFont ? { fontFamily: `"${o}", system-ui, sans-serif` } : undefined}
          >
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ChipButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "3px 8px", borderRadius: 4,
      border: active ? "1px solid var(--db-accent)" : "1px solid var(--db-border)",
      background: active ? "var(--db-accent-dim)" : "transparent",
      fontFamily: FONT, fontSize: 9, fontWeight: active ? 600 : 400,
      color: active ? "var(--db-accent)" : "var(--db-muted)",
      cursor: "pointer", transition: "all 120ms ease-out", lineHeight: 1.4,
    }}>{label}</button>
  );
}

/* ================================================================== */
/*  Preset Strip (with custom presets)                                 */
/* ================================================================== */

function PresetStrip({ activePreset, onSelect, onRandomize, customPresets, onDeleteCustom }: {
  activePreset: string; onSelect: (name: string) => void; onRandomize: () => void;
  customPresets: CustomPreset[]; onDeleteCustom: (name: string) => void;
}) {
  return (
    <div style={{ padding: "8px 16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 9, fontWeight: 600, color: "var(--db-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Presets</span>
        <button type="button" onClick={onRandomize} title="Random preset" style={{
          display: "flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 4,
          border: "1px solid var(--db-border)", background: "none", color: "var(--db-muted)",
          fontFamily: FONT, fontSize: 8, fontWeight: 500, cursor: "pointer", transition: "all 120ms ease",
        }}><Shuffle size={8} />random</button>
      </div>
      <div className="devbar-scroll" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, maxHeight: 280, overflowY: "auto", marginBottom: 8 }}>
        {PRESET_DATA.map((p) => {
          const active = activePreset.replace("*", "") === p.name;
          return (
            <button key={p.name} type="button" onClick={() => onSelect(p.name)} style={{
              padding: "6px 7px 5px", borderRadius: 5, textAlign: "left",
              border: active ? "1.5px solid var(--db-accent)" : "1px solid var(--db-border)",
              background: active ? "var(--db-accent-dim)" : "transparent",
              cursor: "pointer", transition: "all 120ms ease",
            }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                {p.colors.map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: "0.5px solid rgba(128,128,128,0.12)" }} />)}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: active ? 700 : 500, color: active ? "var(--db-accent)" : "var(--db-text)", lineHeight: 1.2 }}>{p.name}</span>
                <span style={{ fontFamily: FONT, fontSize: 7, color: "var(--db-muted)", opacity: 0.6 }}>{p.mood}</span>
              </div>
            </button>
          );
        })}
        {customPresets.map((cp) => {
          const active = activePreset.replace("*", "") === cp.name;
          return (
            <div key={cp.name} style={{ position: "relative" }}>
              <button type="button" onClick={() => onSelect(cp.name)} style={{
                width: "100%", padding: "6px 7px 5px", borderRadius: 5, textAlign: "left",
                border: active ? "1.5px solid var(--db-accent)" : "1px solid var(--db-border)",
                background: active ? "var(--db-accent-dim)" : "transparent",
                cursor: "pointer", transition: "all 120ms ease",
              }}>
                <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: active ? 700 : 500, color: active ? "var(--db-accent)" : "var(--db-text)", lineHeight: 1.2 }}>{cp.name}</span>
                <span style={{ fontFamily: FONT, fontSize: 7, color: "var(--db-muted)", opacity: 0.6, marginLeft: 4 }}>custom</span>
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onDeleteCustom(cp.name); }} style={{
                position: "absolute", top: 3, right: 3, width: 14, height: 14, borderRadius: 7,
                background: "var(--db-surface)", border: "1px solid var(--db-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--db-muted)", padding: 0,
              }}><X size={7} /></button>
            </div>
          );
        })}
      </div>
      <div style={{ height: 1, background: "var(--db-border)", marginLeft: -16, marginRight: -16 }} />
    </div>
  );
}

/* ================================================================== */
/*  Sidebar Content                                                    */
/* ================================================================== */

function SidebarContent({ onClose }: { onClose: () => void }) {
  const { tokens, activePreset, setPreset, setTokens, patchTokens } = useSigilTokens();
  const { enabled: soundEnabled, setEnabled: setSoundEnabled, play, setActivePreset: setSoundPreset } = useSigilSound();

  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [savingName, setSavingName] = useState<string | null>(null);

  useEffect(() => { setCustomPresets(loadCustomPresets()); }, []);

  const handlePreset = useCallback((name: string) => {
    const custom = customPresets.find(cp => cp.name === name);
    if (custom) {
      setTokens(custom.tokens, custom.name);
    } else {
      setPreset(name);
    }
    setSoundPreset(name);
    play("preset");
  }, [setPreset, setTokens, setSoundPreset, play, customPresets]);

  const handleReset = useCallback(() => {
    setPreset(activePreset.replace("*", ""));
    play("preset");
  }, [activePreset, setPreset, play]);

  const handleExport = useCallback(() => {
    const css = document.querySelector("style[data-sigil-tokens]")?.textContent;
    if (css) navigator.clipboard.writeText(css);
    play("success");
  }, [play]);

  const handleSave = useCallback(() => {
    if (savingName === null) { setSavingName(activePreset.replace("*", "") + "-custom"); return; }
    const name = savingName.trim();
    if (!name) return;
    const next = [...customPresets.filter(p => p.name !== name), { name, tokens, createdAt: Date.now() }];
    saveCustomPresetsToStorage(next);
    setCustomPresets(next);
    setSavingName(null);
    play("success");
  }, [savingName, customPresets, tokens, activePreset, play]);

  const handleDeleteCustom = useCallback((name: string) => {
    const next = customPresets.filter(p => p.name !== name);
    saveCustomPresetsToStorage(next);
    setCustomPresets(next);
  }, [customPresets]);

  const patch = useCallback(
    (cat: string, key: string, value: unknown) => patchTokens(cat as keyof SigilTokens, key, value),
    [patchTokens],
  );

  const c = tokens.colors as Record<string, unknown> | undefined;
  const t = tokens.typography as Record<string, unknown> | undefined;
  const sp = tokens.spacing as Record<string, unknown> | undefined;
  const r = tokens.radius as Record<string, unknown> | undefined;
  const b = tokens.borders as Record<string, unknown> | undefined;
  const bw = (b?.["width"] && typeof b["width"] === "object" ? b["width"] : {}) as Record<string, unknown>;
  const sh = tokens.shadows as Record<string, unknown> | undefined;
  const m = tokens.motion as Record<string, unknown> | undefined;
  const md = (m?.["duration"] && typeof m["duration"] === "object" ? m["duration"] : {}) as Record<string, unknown>;
  const cards = tokens.cards as Record<string, unknown> | undefined;
  const buttons = tokens.buttons as Record<string, unknown> | undefined;
  const grid = tokens.sigil as Record<string, unknown> | undefined;
  const layout = tokens.layout as Record<string, unknown> | undefined;
  const nav = tokens.navigation as Record<string, unknown> | undefined;
  const align = (tokens as Record<string, unknown>).alignment as Record<string, unknown> | undefined;

  const currentGutterPattern = (tokens.sigil?.["gutter-pattern"] as GutterPattern) ?? "grid";
  const currentMarginPattern = (tokens.sigil?.["margin-pattern"] as GutterPattern) ?? "horizontal";

  const colorSwatch = (label: string, key: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <ColorInput value={c?.[key]} onChange={(v) => patch("colors", key, v)} />
      <span style={{ fontFamily: FONT, fontSize: 9, color: "var(--db-muted)", fontWeight: 500 }}>{label}</span>
    </div>
  );

  const colorsContent = (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
        {colorSwatch("primary", "primary")}
        {colorSwatch("secondary", "secondary")}
        {colorSwatch("background", "background")}
        {colorSwatch("surface", "surface")}
        {colorSwatch("text", "text")}
        {colorSwatch("border", "border")}
        {colorSwatch("accent", "accent")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginTop: 4 }}>
        {colorSwatch("success", "success")}
        {colorSwatch("warning", "warning")}
        {colorSwatch("error", "error")}
        {colorSwatch("info", "info")}
      </div>
    </>
  );

  const typographyContent = (
    <>
      <Row label="display"><SelectField showFont value={readStr(t, "font-display", "PP Neue Montreal").split(",")[0]!.replace(/['"]/g, "")} options={DISPLAY_FONTS} onChange={(v) => patch("typography", "font-display", `"${v}", system-ui, sans-serif`)} /></Row>
      <Row label="body"><SelectField showFont value={readStr(t, "font-body", "PP Neue Montreal").split(",")[0]!.replace(/['"]/g, "")} options={DISPLAY_FONTS} onChange={(v) => patch("typography", "font-body", `"${v}", system-ui, sans-serif`)} /></Row>
      <Row label="mono"><SelectField showFont value={readStr(t, "font-mono", "PP Fraktion Mono").split(",")[0]!.replace(/['"]/g, "")} options={MONO_FONTS} onChange={(v) => patch("typography", "font-mono", `"${v}", ui-monospace, monospace`)} /></Row>
      <Row label="heading wt" value={String(readNum(t, "heading-weight", 700))}><Slider value={readNum(t, "heading-weight", 700)} min={300} max={900} step={100} onChange={(v) => patch("typography", "heading-weight", v)} /></Row>
      <Row label="heading trk" value={`${readNum(t, "heading-tracking", -0.02).toFixed(3)}em`}><Slider value={readNum(t, "heading-tracking", -0.02)} min={-0.06} max={0.02} step={0.002} onChange={(v) => patch("typography", "heading-tracking", v)} /></Row>
      <Row label="base size" value={`${readNum(t, "base-size", 16)}px`}><Slider value={readNum(t, "base-size", 16)} min={14} max={20} step={1} onChange={(v) => patch("typography", "base-size", `${v}px`)} /></Row>
    </>
  );

  const spacingContent = (<>
    <Row label="page margin" value={`${readNum(layout, "page-margin", 24)}px`}><Slider value={readNum(layout, "page-margin", 24)} min={8} max={64} step={4} onChange={(v) => patch("layout", "page-margin", `${v}px`)} /></Row>
    <Row label="section pad" value={`${readNum(sp, "section-py", 64)}px`}><Slider value={readNum(sp, "section-py", 64)} min={24} max={160} step={8} onChange={(v) => patch("spacing", "section-py", `${v}px`)} /></Row>
    <Row label="card pad" value={`${readNum(sp, "card-padding", 24)}px`}><Slider value={readNum(sp, "card-padding", 24)} min={8} max={48} step={4} onChange={(v) => patch("spacing", "card-padding", `${v}px`)} /></Row>
    <Row label="grid gap" value={`${readNum(layout, "gutter", 16)}px`}><Slider value={readNum(layout, "gutter", 16)} min={4} max={48} step={4} onChange={(v) => patch("layout", "gutter", `${v}px`)} /></Row>
    <Row label="stack gap" value={`${readNum(sp, "stack-gap", 12)}px`}><Slider value={readNum(sp, "stack-gap", 12)} min={4} max={32} step={2} onChange={(v) => patch("spacing", "stack-gap", `${v}px`)} /></Row>
  </>);

  const radiusContent = (<>
    <Row label="global" value={`${readNum(r, "md", 8)}px`}><Slider value={readNum(r, "md", 8)} min={0} max={32} step={1} onChange={(v) => patch("radius", "md", `${v}px`)} /></Row>
    <Row label="button" value={`${readNum(r, "button", 8)}px`}><Slider value={readNum(r, "button", 8)} min={0} max={24} step={1} onChange={(v) => patch("radius", "button", `${v}px`)} /></Row>
    <Row label="card" value={`${readNum(r, "lg", 12)}px`}><Slider value={readNum(r, "lg", 12)} min={0} max={32} step={1} onChange={(v) => patch("radius", "lg", `${v}px`)} /></Row>
    <Row label="input" value={`${readNum(r, "input", 6)}px`}><Slider value={readNum(r, "input", 6)} min={0} max={16} step={1} onChange={(v) => patch("radius", "input", `${v}px`)} /></Row>
  </>);

  const bordersContent = (<>
    <Row label="border w" value={`${readNum(bw, "thin", 1)}px`}><Slider value={readNum(bw, "thin", 1)} min={0} max={4} step={0.5} onChange={(v) => patch("borders", "width.thin", `${v}px`)} /></Row>
    <Row label="style"><Segmented options={BORDER_STYLES} value={readStr(b, "style", "solid") as typeof BORDER_STYLES[number]} onChange={(v) => patch("borders", "style", v)} /></Row>
    <Row label="card border"><Toggle checked={readBool(cards, "border", true)} onChange={(v) => patch("cards", "border", v)} /></Row>
    <Row label="card shadow"><SelectField value={readStr(cards, "shadow", "md")} options={SHADOW_OPTIONS} onChange={(v) => patch("cards", "shadow", v)} /></Row>
    <Row label="btn shadow"><Toggle checked={readBool(buttons, "shadow", false)} onChange={(v) => patch("buttons", "shadow", v)} /></Row>
    <Row label="glow"><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Toggle checked={readBool(sh, "glow", false)} onChange={(v) => patch("shadows", "glow", v)} />{readBool(sh, "glow", false) && <ColorInput value={sh?.["glow-color"]} onChange={(v) => patch("shadows", "glow-color", v)} />}</div></Row>
  </>);

  const motionContent = (<>
    <Row label="fast" value={`${readNum(md, "fast", 150)}ms`}><Slider value={readNum(md, "fast", 150)} min={50} max={300} step={10} onChange={(v) => patch("motion", "duration.fast", `${v}ms`)} /></Row>
    <Row label="normal" value={`${readNum(md, "normal", 250)}ms`}><Slider value={readNum(md, "normal", 250)} min={100} max={500} step={10} onChange={(v) => patch("motion", "duration.normal", `${v}ms`)} /></Row>
    <Row label="hover scale" value={readNum(m, "hover-scale", 1.02).toFixed(2)}><Slider value={readNum(m, "hover-scale", 1.02)} min={1.0} max={1.1} step={0.01} onChange={(v) => patch("motion", "hover-scale", String(v))} /></Row>
    <Row label="press scale" value={readNum(m, "press-scale", 0.97).toFixed(2)}><Slider value={readNum(m, "press-scale", 0.97)} min={0.9} max={1.0} step={0.01} onChange={(v) => patch("motion", "press-scale", String(v))} /></Row>
  </>);

  const gridLayoutContent = (<>
    <Row label="content-max" value={`${readNum(layout, "content-max", 1200)}px`}><Slider value={readNum(layout, "content-max", 1200)} min={768} max={1600} step={40} onChange={(v) => patch("layout", "content-max", `${v}px`)} /></Row>
    <Row label="rail-gap" value={`${readNum(grid, "rail-gap", 24)}px`}><Slider value={readNum(grid, "rail-gap", 24)} min={8} max={48} step={4} onChange={(v) => patch("sigil", "rail-gap", `${v}px`)} /></Row>
    <Row label="grid-cell" value={`${readNum(grid, "grid-cell", 48)}px`}><Slider value={readNum(grid, "grid-cell", 48)} min={16} max={80} step={4} onChange={(v) => patch("sigil", "grid-cell", `${v}px`)} /></Row>
    <Row label="cross-stroke" value={`${readNum(grid, "cross-stroke", 1.5)}px`}><Slider value={readNum(grid, "cross-stroke", 1.5)} min={0} max={4} step={0.5} onChange={(v) => patch("sigil", "cross-stroke", `${v}px`)} /></Row>
    <Row label="navbar-h" value={`${readNum(sp, "navbar-height", 56)}px`}><Slider value={readNum(sp, "navbar-height", 56)} min={36} max={96} step={4} onChange={(v) => patch("spacing", "navbar-height", `${v}px`)} /></Row>
    <Row label="bento-gap" value={`${readNum(layout, "bento-gap", 12)}px`}><Slider value={readNum(layout, "bento-gap", 12)} min={2} max={32} step={2} onChange={(v) => patch("layout", "bento-gap", `${v}px`)} /></Row>
    <Row label="grid lines"><Toggle checked={readBool(grid, "show-grid", true)} onChange={(v) => patch("sigil", "show-grid", v)} /></Row>
    <Row label="dots"><Toggle checked={readBool(grid, "show-dots", false)} onChange={(v) => patch("sigil", "show-dots", v)} /></Row>
    <Row label="cell borders"><Toggle checked={readBool(grid, "cell-borders", false)} onChange={(v) => patch("sigil", "cell-borders", v)} /></Row>
    <Row label="cell bg"><Segmented options={CELL_BG_OPTIONS} value={readStr(grid, "cell-bg", "none") as typeof CELL_BG_OPTIONS[number]} onChange={(v) => patch("sigil", "cell-bg", v)} /></Row>
  </>);

  const patternsContent = (<>
    <div style={{ marginBottom: 4 }}>
      <span style={{ fontFamily: FONT, fontSize: 9, color: "var(--db-muted)", fontWeight: 500 }}>Gutter</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
        {GUTTER_PATTERNS.map(p => <ChipButton key={p} label={p} active={currentGutterPattern === p} onClick={() => patch("sigil", "gutter-pattern", p)} />)}
      </div>
    </div>
    <div>
      <span style={{ fontFamily: FONT, fontSize: 9, color: "var(--db-muted)", fontWeight: 500 }}>Margin</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
        {GUTTER_PATTERNS.map(p => <ChipButton key={p} label={p} active={currentMarginPattern === p} onClick={() => patch("sigil", "margin-pattern", p)} />)}
      </div>
    </div>
  </>);

  const alignmentContent = (<>
    <Row label="content"><Segmented options={CONTENT_ALIGN} value={readStr(align, "content-align", "center") as typeof CONTENT_ALIGN[number]} onChange={(v) => patch("alignment" as keyof SigilTokens, "content-align", v)} /></Row>
    <Row label="hero"><Segmented options={HERO_ALIGN} value={readStr(align, "hero-align", "center") as typeof HERO_ALIGN[number]} onChange={(v) => patch("alignment" as keyof SigilTokens, "hero-align", v)} /></Row>
    <Row label="navbar"><Segmented options={NAVBAR_ALIGN} value={readStr(nav, "navbar-align", "full") as typeof NAVBAR_ALIGN[number]} onChange={(v) => patch("navigation", "navbar-align", v)} /></Row>
    <Row label="rail visible"><Toggle checked={readBool(align, "rail-visible", false)} onChange={(v) => patch("alignment" as keyof SigilTokens, "rail-visible", v)} /></Row>
  </>);

  const handleRandomize = useCallback(() => {
    const p = PRESET_DATA[Math.floor(Math.random() * PRESET_DATA.length)]!;
    handlePreset(p.name);
  }, [handlePreset]);

  const iconBtn = (icon: ReactNode, onClick: () => void, title: string) => (
    <button type="button" onClick={onClick} title={title} style={{
      width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 4, border: "1px solid var(--db-border)", background: "none", color: "var(--db-muted)", cursor: "pointer",
    }}>{icon}</button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", flexShrink: 0, borderBottom: "1px solid var(--db-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Grid3X3 size={12} style={{ color: "var(--db-accent)" }} />
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 700, color: "var(--db-text)" }}>Studio</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 8, fontWeight: 600, padding: "1px 5px", borderRadius: 3, background: "var(--db-accent-dim)", color: "var(--db-accent)" }}>{activePreset}</span>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {iconBtn(<Save size={10} />, handleSave, "Save preset")}
          {iconBtn(<RotateCcw size={10} />, handleReset, "Reset")}
          {iconBtn(<Download size={10} />, handleExport, "Export CSS")}
          {iconBtn(<X size={10} />, onClose, "Close")}
        </div>
      </div>

      {/* Save name input */}
      {savingName !== null && (
        <div style={{ display: "flex", gap: 4, padding: "6px 16px", borderBottom: "1px solid var(--db-border)", background: "var(--db-accent-dim)" }}>
          <input
            autoFocus value={savingName}
            onChange={(e) => setSavingName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setSavingName(null); }}
            placeholder="preset name"
            style={{ flex: 1, padding: "3px 6px", fontSize: 10, fontFamily: FONT, borderRadius: 3, border: "1px solid var(--db-border)", background: "var(--db-bg)", color: "var(--db-text)", outline: "none" }}
          />
          <button type="button" onClick={handleSave} style={{ padding: "3px 8px", fontSize: 9, fontFamily: FONT, fontWeight: 600, borderRadius: 3, border: "none", background: "var(--db-accent)", color: "var(--db-bg)", cursor: "pointer" }}>Save</button>
          <button type="button" onClick={() => setSavingName(null)} style={{ padding: "3px 6px", fontSize: 9, fontFamily: FONT, borderRadius: 3, border: "1px solid var(--db-border)", background: "none", color: "var(--db-muted)", cursor: "pointer" }}>Cancel</button>
        </div>
      )}

      <PresetStrip activePreset={activePreset} onSelect={handlePreset} onRandomize={handleRandomize} customPresets={customPresets} onDeleteCustom={handleDeleteCustom} />

      <div className="devbar-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Section title="Colors" defaultOpen>{colorsContent}</Section>
        <Section title="Typography">{typographyContent}</Section>
        <Section title="Spacing">{spacingContent}</Section>
        <Section title="Radius">{radiusContent}</Section>
        <Section title="Borders & Shadows">{bordersContent}</Section>
        <Section title="Motion">{motionContent}</Section>
        <Section title="Grid & Layout">{gridLayoutContent}</Section>
        <Section title="Patterns">{patternsContent}</Section>
        <Section title="Alignment">{alignmentContent}</Section>
        <Section title="Sound"><Row label="enabled"><Toggle checked={soundEnabled} onChange={setSoundEnabled} /></Row></Section>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Toolbar                                                            */
/* ================================================================== */

function Toolbar({ isMobile = false }: { isMobile?: boolean }) {
  const devbar = useDevBar();
  const { activePreset, setPreset } = useSigilTokens();
  const { play, enabled: soundEnabled, setEnabled: setSoundEnabled, setActivePreset: setSoundPreset } = useSigilSound();

  if (!devbar) return null;
  const { sidebarOpen, setSidebarOpen, canvasMode, setCanvasMode, dock, setDock, agentOpen, setAgentOpen } = devbar;

  const handleRandomize = () => {
    const p = PRESET_DATA[Math.floor(Math.random() * PRESET_DATA.length)]!;
    setPreset(p.name);
    setSoundPreset(p.name);
    play("preset");
  };

  const handlePresetClick = (name: string) => {
    setPreset(name);
    setSoundPreset(name);
    play("preset");
  };

  const tbtn = (icon: ReactNode, onClick: () => void, active: boolean, label?: string) => (
    <button type="button" onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 4,
      padding: label ? "5px 10px 5px 7px" : "5px 7px",
      borderRadius: 6,
      background: active ? "var(--db-accent-dim)" : "transparent",
      border: "none",
      fontFamily: FONT, fontSize: 10, fontWeight: active ? 600 : 500,
      color: active ? "var(--db-accent)" : "var(--db-muted)",
      cursor: "pointer", transition: "all 120ms ease-out", flexShrink: 0,
    }}>{icon}{label && <span>{label}</span>}</button>
  );

  const divider = <div style={{ width: 1, height: 16, background: "var(--db-border)", flexShrink: 0, opacity: 0.6 }} />;

  return (
    <div className="devbar-chrome" style={{
      height: TOOLBAR_H, flexShrink: 0, display: "flex", alignItems: "center",
      padding: "0 6px", background: "var(--db-surface)",
      borderTop: canvasMode ? "none" : "1px solid var(--db-border)",
      backdropFilter: canvasMode ? "none" : "blur(16px) saturate(1.4)",
      WebkitBackdropFilter: canvasMode ? "none" : "blur(16px) saturate(1.4)",
      zIndex: 10001, gap: 2,
    }}>
      {/* Sigil button */}
      {tbtn(<Grid3X3 size={11} style={{ color: "var(--db-accent)" }} />, () => { if (canvasMode) { setCanvasMode(false); setSidebarOpen(false); setAgentOpen(false); } else { setCanvasMode(true); setSidebarOpen(true); } }, canvasMode, isMobile ? undefined : "Studio")}

      {/* Preset strip (hidden in canvas mode) */}
      {!canvasMode && (
        <>
          {divider}
          <div className="devbar-preset-strip" style={{
            flex: 1, display: "flex", gap: 1, overflowX: "auto", overflowY: "hidden",
            minWidth: 0, padding: "2px 4px",
          } as React.CSSProperties}>
            {PRESET_DATA.map((p) => {
              const active = activePreset.replace("*", "") === p.name;
              return (
                <button key={p.name} type="button" onClick={() => handlePresetClick(p.name)} style={{
                  flexShrink: 0, display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 8px 4px 6px", borderRadius: 5,
                  background: active ? "var(--db-accent-dim)" : "transparent",
                  border: "none",
                  fontFamily: FONT, fontSize: 10, fontWeight: active ? 600 : 400,
                  color: active ? "var(--db-accent)" : "var(--db-muted)",
                  cursor: "pointer", transition: "all 100ms ease", whiteSpace: "nowrap",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: p.colors[0], border: "0.5px solid rgba(128,128,128,0.15)", flexShrink: 0 }} />
                  {p.name}
                </button>
              );
            })}
          </div>
          {divider}
        </>
      )}

      {/* Spacer in canvas mode */}
      {canvasMode && <div style={{ flex: 1 }} />}

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        {tbtn(<Shuffle size={11} />, handleRandomize, false)}
        {divider}
        {tbtn(<Monitor size={11} />, () => { const next = !canvasMode; setCanvasMode(next); if (next) setSidebarOpen(true); else { setSidebarOpen(false); setAgentOpen(false); } }, canvasMode, isMobile ? undefined : "Canvas")}
        {canvasMode && !isMobile && tbtn(dock === "left" ? <PanelLeft size={11} /> : <PanelRight size={11} />, () => setDock(dock === "left" ? "right" : "left"), false)}
        {canvasMode && tbtn(<MessageSquare size={11} />, () => setAgentOpen(!agentOpen), agentOpen, isMobile ? undefined : "Agent")}
        {divider}
        {tbtn(soundEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />, () => setSoundEnabled(!soundEnabled), soundEnabled)}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Animation helpers                                                  */
/* ================================================================== */

const EASE_SPRING = "cubic-bezier(0.32, 0.72, 0, 1)";
const DUR = "380ms";

/* ================================================================== */
/*  Edge Toggle Handle                                                 */
/* ================================================================== */

function EdgeHandle({ dock, open, onToggle }: { dock: DockPosition; open: boolean; onToggle: () => void }) {
  const Icon = dock === "left"
    ? (open ? ChevronLeft : ChevronRight)
    : (open ? ChevronRight : ChevronLeft);

  return (
    <button type="button" onClick={onToggle} style={{
      position: "absolute", top: "50%", transform: "translateY(-50%)", width: 20, height: 48,
      ...(dock === "left" ? { right: -20 } : { left: -20 }),
      zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: dock === "left" ? "0 6px 6px 0" : "6px 0 0 6px",
      background: "var(--db-surface)", border: "1px solid var(--db-border)",
      ...(dock === "left" ? { borderLeft: "none" } : { borderRight: "none" }),
      cursor: "pointer", padding: 0, color: "var(--db-muted)", transition: `all ${DUR} ${EASE_SPRING}`, opacity: 1,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--db-accent)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--db-muted)"; }}
    >
      <Icon size={11} />
    </button>
  );
}

/* ================================================================== */
/*  Collapsed Tab                                                      */
/* ================================================================== */

function CollapsedTab({ dock, onOpen }: { dock: DockPosition; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} style={{
      position: "absolute", zIndex: 2,
      ...(dock === "left" ? { left: 0, top: "50%", transform: "translateY(-50%)" } : { right: 0, top: "50%", transform: "translateY(-50%)" }),
      display: "flex", alignItems: "center", gap: 6, padding: "10px 8px", flexDirection: "column",
      borderRadius: dock === "left" ? "0 8px 8px 0" : "8px 0 0 8px",
      background: "var(--db-surface)", border: "1px solid var(--db-border)",
      ...(dock === "left" ? { borderLeft: "none" } : { borderRight: "none" }),
      cursor: "pointer", color: "var(--db-muted)", transition: "all 200ms ease", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--db-accent)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--db-muted)"; }}
    >
      <Grid3X3 size={12} style={{ color: "inherit" }} />
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", writingMode: "vertical-lr", textOrientation: "mixed" }}>Studio</span>
    </button>
  );
}

/* ================================================================== */
/*  Content Area (unified for both modes, transitions in place)        */
/* ================================================================== */

function ContentArea({ children, canvas }: { children: ReactNode; canvas: boolean }) {
  const isMobile = useIsMobile();
  const showFrame = canvas && !isMobile;

  const devbar = useDevBar();
  const dock = devbar?.dock ?? "left";
  const sidebarOpen = devbar?.sidebarOpen ?? false;
  const agentOpen = devbar?.agentOpen ?? false;
  const bothHidden = !sidebarOpen && !agentOpen;

  return (
    <div style={{
      flex: 1, minWidth: 0, minHeight: 0, display: "flex", alignItems: "stretch",
      paddingTop: showFrame ? 8 : 0,
      paddingBottom: 0,
      paddingLeft: showFrame ? (dock === "right" || bothHidden ? 8 : 0) : 0,
      paddingRight: showFrame ? (dock === "left" || bothHidden ? 8 : 0) : 0,
      transition: `padding ${DUR} ${EASE_SPRING}`,
    }}>
      <div style={{
        width: "100%",
        borderRadius: showFrame ? 8 : 0,
        border: showFrame ? "1px solid var(--db-border)" : "none",
        overflow: "hidden",
        transition: `border-radius ${DUR} ${EASE_SPRING}, border-color ${DUR} ${EASE_SPRING}, box-shadow 500ms ease`,
      }}>
        <div style={{ width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Studio Agent Chat                                                  */
/* ================================================================== */

type StudioMessage = { id: string; role: "user" | "assistant"; content: string };

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function extractActions(text: string) {
  const actions: Record<string, unknown>[] = [];
  const regex = /```json\s*\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    try { const p = JSON.parse(match[1].trim()); if (p && typeof p === "object") actions.push(p); } catch { /* skip */ }
  }
  return actions;
}

function StudioAgentChat() {
  const { tokens, patchTokens, setPreset, setTokens } = useSigilTokens();
  const [messages, setMessages] = useState<StudioMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const processedRef = useRef(new Set<string>());

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const applyActions = useCallback((msgId: string, content: string) => {
    const actions = extractActions(content);
    for (const action of actions) {
      const key = `${msgId}:${JSON.stringify(action)}`;
      if (processedRef.current.has(key)) continue;
      processedRef.current.add(key);

      if ("patch" in action && action.patch && typeof action.patch === "object") {
        for (const [cat, val] of Object.entries(action.patch as Record<string, unknown>)) {
          if (typeof val === "object" && val !== null) {
            for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
              patchTokens(cat as keyof SigilTokens, k, v);
            }
          }
        }
      }
      if ("setPreset" in action && typeof action.setPreset === "string") {
        setPreset(action.setPreset);
      }
      if ("savePreset" in action && action.savePreset && typeof action.savePreset === "object") {
        const sp = action.savePreset as Record<string, unknown>;
        const name = typeof sp.name === "string" ? sp.name : "agent-preset";
        const existing = loadCustomPresets();
        const next = [...existing.filter(p => p.name !== name), { name, tokens, createdAt: Date.now() }];
        saveCustomPresetsToStorage(next);
      }
    }
  }, [patchTokens, setPreset, setTokens, tokens]);

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: StudioMessage = { id: generateId(), role: "user", content: trimmed };
    const assistantMsg: StudioMessage = { id: generateId(), role: "assistant", content: "" };
    const allMessages = [...messages, userMsg];
    setMessages([...allMessages, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          model: "gpt-5.4-mini",
          currentTokens: tokens,
          canvasItems: [],
          mode: "studio",
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: `Error: ${err}` } : m));
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setIsStreaming(false); return; }

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const current = accumulated;
        setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: current } : m));
      }

      applyActions(assistantMsg.id, accumulated);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: `Error: ${(err as Error).message}` } : m));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages, tokens, applyActions]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", color: "var(--db-text)" }}>
      {/* Header */}
      <div style={{
        padding: "10px 14px", borderBottom: "1px solid var(--db-border)", display: "flex", alignItems: "center", gap: 6,
        background: "var(--db-surface)",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: isStreaming ? "#d97706" : "#059669" }} />
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 700, color: "var(--db-text)" }}>Preset Agent</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="devbar-scroll" style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--db-muted)", fontSize: 12, textAlign: "center", padding: 24 }}>
            <span style={{ fontSize: 11, lineHeight: 1.6, fontFamily: FONT }}>
              Describe your ideal aesthetic. The agent will create and apply token changes in real-time.
            </span>
          </div>
        )}
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "88%", padding: "8px 12px", borderRadius: 10, fontSize: 12, lineHeight: 1.5, fontFamily: FONT,
                background: isUser ? "var(--db-accent)" : "var(--db-surface)",
                color: isUser ? "var(--db-bg)" : "var(--db-text)",
                border: isUser ? "none" : "1px solid var(--db-border)",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                {msg.content || <span style={{ display: "inline-block", width: 6, height: 14, background: "var(--db-muted)", borderRadius: 1, animation: "sigil-blink 1s step-end infinite" }} />}
              </div>
            </div>
          );
        })}
        {isStreaming && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <button onClick={() => { abortRef.current?.abort(); setIsStreaming(false); }} style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 500, fontFamily: FONT,
              background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
            }}><Square size={8} /> Stop</button>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid var(--db-border)", padding: "8px 12px", display: "flex", gap: 6, alignItems: "flex-end", background: "var(--db-surface)" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          placeholder="Describe an aesthetic..."
          rows={1}
          style={{
            flex: 1, resize: "none", padding: "8px 10px", borderRadius: 8,
            border: "1px solid var(--db-border)", background: "var(--db-bg)", color: "var(--db-text)",
            fontSize: 12, lineHeight: 1.4, fontFamily: FONT, outline: "none", minHeight: 36, maxHeight: 120,
          }}
          onInput={(e) => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = `${Math.min(t.scrollHeight, 120)}px`; }}
        />
        <button
          onClick={handleSubmit}
          disabled={isStreaming || !input.trim()}
          style={{
            padding: "8px 12px", borderRadius: 8, border: "none", background: "var(--db-accent)", color: "var(--db-bg)",
            fontSize: 12, fontWeight: 500, fontFamily: FONT,
            cursor: isStreaming || !input.trim() ? "not-allowed" : "pointer",
            opacity: isStreaming || !input.trim() ? 0.5 : 1, whiteSpace: "nowrap", height: 36,
            display: "flex", alignItems: "center", gap: 4,
          }}
        ><Send size={12} /></button>
      </div>

      <style>{`@keyframes sigil-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
}

/* ================================================================== */
/*  Agent Panel (right side in canvas mode)                            */
/* ================================================================== */

function AgentPanel({ open, isMobile }: { open: boolean; isMobile: boolean }) {
  if (isMobile) {
    return (
      <>
        {open && (
          <div
            onClick={() => {/* handled by parent setAgentOpen */}}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.4)",
            }}
          />
        )}
        <div className="devbar-chrome" style={{
          position: "fixed", zIndex: 10000,
          top: 0, right: 0, bottom: 0,
          width: `min(${AGENT_W}px, 90vw)`,
          background: "var(--db-surface)",
          borderLeft: "1px solid var(--db-border)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform ${DUR} ${EASE_SPRING}`,
          willChange: "transform",
        }}>
          <StudioAgentChat />
        </div>
      </>
    );
  }

  return (
    <div className="devbar-chrome" style={{
      width: open ? AGENT_W : 0, flexShrink: 0, overflow: "hidden",
      background: "var(--db-surface)",
      transition: `width ${DUR} ${EASE_SPRING}`, willChange: "width",
    }}>
      <div style={{ width: AGENT_W, height: "100%", opacity: open ? 1 : 0, transition: `opacity ${open ? "250ms 80ms" : "120ms"} ease` }}>
        <StudioAgentChat />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Sidebar Panel                                                      */
/* ================================================================== */

function SidebarPanel({ mode, dock, open, isMobile }: { mode: "canvas" | "normal"; dock: DockPosition; open: boolean; isMobile: boolean }) {
  const { setSidebarOpen } = useDevBar()!;
  const w = isMobile ? SIDEBAR_W_MOBILE : SIDEBAR_W;

  if (mode === "canvas" && !isMobile) {
    return (
      <div className="devbar-chrome" style={{
        position: "relative", width: open ? w : 0, flexShrink: 0,
        overflow: open ? "visible" : "hidden", background: "var(--db-surface)",
        transition: `width ${DUR} ${EASE_SPRING}`, willChange: "width",
      }}>
        <div style={{ width: w, height: "100%", opacity: open ? 1 : 0, transition: `opacity ${open ? "250ms 80ms" : "120ms"} ease` }}>
          <SidebarContent onClose={() => setSidebarOpen(false)} />
        </div>
        {open && <EdgeHandle dock={dock} open={open} onToggle={() => setSidebarOpen(!open)} />}
      </div>
    );
  }

  /* Mobile canvas mode + normal mode: fixed overlay sidebar that slides in/out */
  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && open && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.4)",
            transition: `opacity 200ms ease`,
          }}
        />
      )}
      <div className="devbar-chrome" style={{
        position: "fixed", zIndex: 10000,
        top: 0, bottom: mode === "canvas" ? 0 : TOOLBAR_H,
        width: isMobile ? `min(${w}px, 85vw)` : w,
        ...(dock === "left"
          ? { left: 0, borderRight: "1px solid var(--db-border)" }
          : { right: 0, borderLeft: "1px solid var(--db-border)" }),
        background: "var(--db-surface)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        transform: open
          ? "translateX(0)"
          : dock === "left" ? `translateX(-100%)` : `translateX(100%)`,
        transition: `transform ${DUR} ${EASE_SPRING}`,
        willChange: "transform",
        overflow: "hidden",
      }}>
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </div>
    </>
  );
}

/* ================================================================== */
/*  Canvas Viewport                                                    */
/* ================================================================== */

function CanvasViewport({ children, dock }: { children: ReactNode; dock: DockPosition }) {
  const isMobile = useIsMobile();
  const oppositeSide = dock === "left" ? "right" : "left";

  return (
    <div className="devbar-canvas-outer" style={{
      flex: 1, minWidth: 0, minHeight: 0, display: "flex", alignItems: "stretch", justifyContent: "center",
      ...(isMobile
        ? { padding: 0 }
        : {
            paddingTop: 12, paddingBottom: 0,
            paddingLeft: oppositeSide === "left" ? 12 : 0,
            paddingRight: oppositeSide === "right" ? 12 : 0,
          }),
      background: "var(--db-surface)", transition: `padding ${DUR} ${EASE_SPRING}`,
    }}>
      <div className="devbar-canvas-frame" style={{
        width: "100%", borderRadius: isMobile ? 0 : 8,
        border: isMobile ? "none" : "1px solid var(--db-border)",
        overflowX: "hidden", overflowY: "auto", transition: `border-radius ${DUR} ${EASE_SPRING}`,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main DevBar                                                        */
/* ================================================================== */

export function SigilDevBar({ children }: { children: ReactNode }) {
  const devbar = useDevBar();
  const isMobile = useIsMobile();
  if (!devbar) return <>{children}</>;

  const { sidebarOpen, setSidebarOpen, canvasMode, dock, agentOpen, setAgentOpen } = devbar;
  const isLeftDock = dock === "left";
  const showInFlowSidebar = canvasMode && !isMobile;
  const showInFlowAgent = canvasMode && !isMobile;

  return (
    <div className="devbar-root" style={{
      position: canvasMode ? "fixed" : "relative",
      inset: canvasMode ? 0 : undefined,
      display: "flex", flexDirection: "column",
      background: canvasMode ? "var(--db-surface)" : undefined,
      zIndex: canvasMode ? 9998 : undefined,
      minHeight: canvasMode ? undefined : "100dvh",
      transition: `background ${DUR} ${EASE_SPRING}`,
    }}>
      <style>{DEVBAR_STYLES}</style>

      {/* Main row: sidebar + content + agent */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "row",
        minHeight: 0, minWidth: 0, overflow: "hidden", position: "relative",
        paddingBottom: canvasMode ? 0 : TOOLBAR_H,
      }}>
        {/* In-flow sidebar (canvas desktop only) */}
        {showInFlowSidebar && isLeftDock && <SidebarPanel mode="canvas" dock={dock} open={sidebarOpen} isMobile={false} />}

        <ContentArea canvas={canvasMode}>{children}</ContentArea>

        {showInFlowSidebar && !isLeftDock && <SidebarPanel mode="canvas" dock={dock} open={sidebarOpen} isMobile={false} />}

        {/* In-flow agent panel (canvas desktop only) */}
        {showInFlowAgent && <AgentPanel open={agentOpen} isMobile={false} />}

        {/* Collapsed tab (canvas desktop, sidebar closed) */}
      </div>

      {/* Toolbar: fixed in normal mode, in-flow in canvas mode */}
      {canvasMode ? (
        <Toolbar isMobile={isMobile} />
      ) : (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10001 }}>
          <Toolbar isMobile={isMobile} />
        </div>
      )}

      {/* Overlay sidebar (normal mode + mobile canvas) */}
      {(!canvasMode || isMobile) && <SidebarPanel mode="normal" dock={dock} open={sidebarOpen} isMobile={isMobile} />}

      {/* Mobile overlay agent */}
      {isMobile && canvasMode && <AgentPanel open={agentOpen} isMobile={true} />}
      {isMobile && canvasMode && agentOpen && (
        <div onClick={() => setAgentOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 9998 }} />
      )}
    </div>
  );
}

/* ================================================================== */
/*  Shared styles                                                      */
/* ================================================================== */

const DEVBAR_STYLES = `
  .devbar-root {
    --db-bg: #ffffff;
    --db-surface: #f8f8fa;
    --db-border: #d0d0d8;
    --db-text: #0a0a0f;
    --db-text2: #4a4a55;
    --db-muted: #8a8a95;
    --db-accent: #18181b;
    --db-accent-dim: rgba(24,24,27,0.06);
    --db-accent-mid: rgba(24,24,27,0.10);
    color: var(--db-text);
  }
  .dark .devbar-root, [data-theme="dark"] .devbar-root {
    --db-bg: #0a0a0f;
    --db-surface: #141419;
    --db-border: #2c2c3c;
    --db-text: #fafafa;
    --db-text2: #a0a0aa;
    --db-muted: #8888a0;
    --db-accent: #e4e4e7;
    --db-accent-dim: rgba(228,228,231,0.06);
    --db-accent-mid: rgba(228,228,231,0.10);
  }
  .devbar-chrome {
    --s-primary: var(--db-accent);
    --s-primary-hover: var(--db-accent);
    --s-background: var(--db-bg);
    --s-surface: var(--db-surface);
    --s-surface-sunken: var(--db-surface);
    --s-border: var(--db-border);
    --s-border-style: solid;
    --s-text: var(--db-text);
    --s-text-secondary: var(--db-text2);
    --s-text-muted: var(--db-muted);
    --s-ring: var(--db-accent);
    --s-ring-offset: var(--db-bg);
    --s-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --s-radius-md: 6px;
    --s-radius-input: 6px;
    --s-radius-full: 9999px;
    --s-duration-fast: 150ms;
    --s-input-height: 28px;
    --s-error: #dc2626;
    font-family: ${FONT_BODY};
  }
  .devbar-preset-strip { scrollbar-width: none; }
  .devbar-preset-strip::-webkit-scrollbar { display: none; }
  .devbar-scroll { scrollbar-width: none; }
  .devbar-scroll::-webkit-scrollbar { display: none; }
  @media (max-width: ${MOBILE_BP}px) {
    .devbar-canvas-frame { border-radius: 0 !important; border: none !important; }
  }
`;
