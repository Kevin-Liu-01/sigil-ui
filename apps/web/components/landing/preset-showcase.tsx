"use client";

import { useState } from "react";

type PresetShowcaseProps = {
  className?: string;
};

type PresetDef = {
  name: string;
  bg: string;
  surface: string;
  primary: string;
  text: string;
  border: string;
};

const PRESETS: PresetDef[] = [
  { name: "sigil",  bg: "#0a0a0f", surface: "#141419", primary: "#9b99e8", text: "#fafafa", border: "rgba(255,255,255,0.08)" },
  { name: "noir",   bg: "#000000", surface: "#0a0a0a", primary: "#d97706", text: "#e8e8e8", border: "#1a1a1a" },
  { name: "forge",  bg: "#1c1917", surface: "#292524", primary: "#ea580c", text: "#fafaf9", border: "#3f3f46" },
  { name: "vex",    bg: "#fef08a", surface: "#fefce8", primary: "#ec4899", text: "#000000", border: "#000000" },
  { name: "arc",    bg: "#f5f3ff", surface: "#ede9fe", primary: "#7c3aed", text: "#1e1b4b", border: "#c4b5fd" },
  { name: "cipher", bg: "#000000", surface: "#0a0a0a", primary: "#22c55e", text: "#22c55e", border: "#1a3a1a" },
];

function MiniPage({ preset, active, onClick }: { preset: PresetDef; active: boolean; onClick: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      className="flex-shrink-0 flex flex-col items-center gap-2 group"
      style={{ cursor: "pointer" }}
    >
      <div
        className="relative overflow-hidden transition-all"
        style={{
          width: 280,
          height: 180,
          borderRadius: 8,
          border: active
            ? `2px solid ${preset.primary}`
            : `1px solid ${preset.border}`,
          boxShadow: active
            ? `0 0 20px ${preset.primary}33, 0 0 40px ${preset.primary}1a`
            : "none",
          transitionDuration: "200ms",
        }}
      >
        {/* Scaled inner content at 50% — double the logical size so it fits */}
        <div
          style={{
            width: 560,
            height: 360,
            transform: "scale(0.5)",
            transformOrigin: "top left",
            background: preset.bg,
            color: preset.text,
            fontFamily: "var(--s-font-body, system-ui)",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--s-font-display, system-ui)",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Welcome to {preset.name}
          </h3>

          <button
            type="button"
            style={{
              background: preset.primary,
              color: isLightColor(preset.primary) ? "#000" : "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "default",
              alignSelf: "flex-start",
            }}
          >
            Get started
          </button>

          <div
            style={{
              background: preset.surface,
              border: `1px solid ${preset.border}`,
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 500 }}>
              Quick overview
            </div>
            <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.5 }}>
              A preset shapes every surface, color, and motion in your app.
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: preset.border,
              marginTop: 4,
            }}
          />
        </div>
      </div>

      <span
        className="r-mono"
        style={{
          fontSize: 11,
          color: active ? "var(--s-text)" : "var(--s-text-muted)",
          letterSpacing: "0.04em",
          transition: "color 200ms",
        }}
      >
        {preset.name}
      </span>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const cleaned = hex.replace("#", "");
  if (cleaned.length < 6) return false;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export function PresetShowcase({ className = "" }: PresetShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      className={`flex gap-4 overflow-x-auto pb-4 ${className}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "var(--s-border-muted) transparent",
        scrollSnapType: "x mandatory",
      }}
    >
      {PRESETS.map((preset, i) => (
        <div key={preset.name} style={{ scrollSnapAlign: "start" }}>
          <MiniPage
            preset={preset}
            active={activeIdx === i}
            onClick={() => setActiveIdx(i)}
          />
        </div>
      ))}
    </div>
  );
}
