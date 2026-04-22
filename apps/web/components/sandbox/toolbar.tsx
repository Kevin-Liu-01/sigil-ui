"use client";

import { useCallback, useState } from "react";
import { useSigilTokens } from "./token-provider";
import { PresetBar } from "./preset-bar";
import { TokenEditor } from "./token-editor";
import { FontPicker } from "./font-picker";
import { ComponentPalette } from "./component-palette";

const TABS = ["Presets", "Tokens", "Fonts", "Components", "Randomize"] as const;
type Tab = (typeof TABS)[number];

const CONTENT_TABS = ["Presets", "Tokens", "Fonts", "Components"] as const;
type ContentTab = (typeof CONTENT_TABS)[number];

const PRESET_NAMES = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
] as const;

type ToolbarProps = {
  onAddComponent: (component: string, props: Record<string, any>) => void;
  className?: string;
};

export function Toolbar({ onAddComponent, className }: ToolbarProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<ContentTab>("Presets");
  const { setPreset, activePreset } = useSigilTokens();

  const handleRandomize = useCallback(() => {
    const current = activePreset.replace("*", "");
    const others = PRESET_NAMES.filter((n) => n !== current);
    const pick = others[Math.floor(Math.random() * others.length)];
    setPreset(pick);
  }, [activePreset, setPreset]);

  const handleTabClick = useCallback(
    (tab: Tab) => {
      if (tab === "Randomize") {
        handleRandomize();
        return;
      }
      setActiveTab(tab);
      if (!expanded) setExpanded(true);
    },
    [expanded, handleRandomize],
  );

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: expanded ? 280 : 48,
        background: "var(--s-surface)",
        borderTop: "1px solid var(--s-border)",
        transition: "height 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 48,
          minHeight: 48,
          paddingLeft: 16,
          paddingRight: 8,
          gap: 2,
          borderBottom: expanded ? "1px solid var(--s-border)" : "none",
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab !== "Randomize" && activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? "var(--s-primary)" : "var(--s-text-muted)",
                background: isActive
                  ? "color-mix(in srgb, var(--s-primary) 10%, transparent)"
                  : "transparent",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                transition: "color 150ms, background 150ms",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              {tab === "Randomize" ? "⚄ Randomize" : tab}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />

        {/* Collapse toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Collapse toolbar" : "Expand toolbar"}
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            color: "var(--s-text-muted)",
            fontSize: 16,
            transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Panel content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          opacity: expanded ? 1 : 0,
          transition: "opacity 200ms",
        }}
      >
        {activeTab === "Presets" && <PresetBar />}
        {activeTab === "Tokens" && <TokenEditor />}
        {activeTab === "Fonts" && <FontPicker />}
        {activeTab === "Components" && (
          <ComponentPalette onAddComponent={onAddComponent} />
        )}
      </div>
    </div>
  );
}
