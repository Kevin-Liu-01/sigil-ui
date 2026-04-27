"use client";

import { useState, useCallback, type ReactNode } from "react";
import { NativeSelect, Separator } from "@sigil-ui/components";

type SandboxLayoutProps = {
  canvas: ReactNode;
  library: ReactNode;
  rightPanel: ReactNode;
  forge?: ReactNode;
  presetName?: string;
  presetList?: string[];
  onPresetChange?: (name: string) => void;
  onExport?: () => void;
  onReset?: () => void;
  rightMode: "agent" | "code" | "history";
  onRightModeChange: (mode: "agent" | "code" | "history") => void;
};

export function SandboxLayout({
  canvas,
  library,
  rightPanel,
  forge,
  presetName,
  presetList,
  onPresetChange,
  onExport,
  onReset,
  rightMode,
  onRightModeChange,
}: SandboxLayoutProps) {
  const [libOpen, setLibOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const toggleLib = useCallback(() => setLibOpen((v) => !v), []);
  const toggleRight = useCallback(() => setRightOpen((v) => !v), []);

  return (
    <div
      className="h-dvh w-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateRows: "44px auto 1fr",
        gridTemplateColumns: `${libOpen ? "280px" : "0px"} 1fr ${rightOpen ? "380px" : "0px"}`,
        transition: "grid-template-columns 200ms ease",
        background: "var(--s-background)",
        color: "var(--s-text)",
      }}
    >
      {/* ---- Row 1: Header (spans all) ---- */}
      <header
        className="flex items-center justify-between px-3"
        style={{
          gridRow: 1,
          gridColumn: "1 / -1",
          borderBottom: "1px solid var(--s-border)",
          background: "var(--s-surface)",
        }}
      >
        <div className="flex items-center gap-2">
          <HeaderButton onClick={toggleLib} label={libOpen ? "Hide library" : "Show library"} active={libOpen}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="1" y="2" width="4" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
              <rect x="7" y="2" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </HeaderButton>

          <Separator orientation="vertical" style={{ height: "20px" }} />

          <a href="/" className="no-underline" style={{ color: "var(--s-text-muted)", fontSize: "12px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12L12 3l9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--s-text-muted)", letterSpacing: "0.06em" }}>
            Sandbox
          </span>

          {presetName && (
            <>
              <span style={{ color: "var(--s-text-subtle)", fontSize: "10px" }}>/</span>
              <NativeSelect
                value={presetName}
                onChange={(e) => onPresetChange?.(e.target.value)}
                className="h-auto w-auto border-none bg-transparent py-0 pr-6 text-xs font-medium"
              >
                {(presetList ?? []).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </NativeSelect>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div style={{ display: "flex", border: "1px solid var(--s-border)", borderRadius: "5px", overflow: "hidden" }}>
            <PanelTab active={rightMode === "agent"} onClick={() => onRightModeChange("agent")} label="Agent"
              icon={<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H5l-2 2V10H3a1 1 0 01-1-1V3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>}
            />
            <PanelTab active={rightMode === "code"} onClick={() => onRightModeChange("code")} label="Code"
              icon={<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M5 3L2 7l3 4M9 3l3 4-3 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            />
            <PanelTab active={rightMode === "history"} onClick={() => onRightModeChange("history")} label="History"
              icon={<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M3 3.5h8M3 7h8M3 10.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /><path d="M10 9l1.5 1.5L13 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            />
          </div>

          <Separator orientation="vertical" style={{ height: "20px" }} />

          {onReset && (
            <HeaderButton onClick={onReset} label="Reset">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2.5 7a4.5 4.5 0 118 2.5M2.5 7V3.5M2.5 7H6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </HeaderButton>
          )}

          {onExport && (
            <HeaderButton onClick={onExport} label="Export">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 2v7M4 6l3 3 3-3M3 11h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </HeaderButton>
          )}

          <Separator orientation="vertical" style={{ height: "20px" }} />

          <HeaderButton onClick={toggleRight} label={rightOpen ? "Hide panel" : "Show panel"} active={rightOpen}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="1" y="2" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
              <rect x="9" y="2" width="4" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </HeaderButton>
        </div>
      </header>

      {/* ---- Row 2: Forge strip (center column only) ---- */}
      <div style={{ gridRow: 2, gridColumn: 2, overflow: "hidden" }}>
        {forge}
      </div>

      {/* ---- Row 3 Col 1: Library sidebar ---- */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          gridRow: 3,
          gridColumn: 1,
          borderRight: libOpen ? "1px solid var(--s-border)" : "none",
          visibility: libOpen ? "visible" : "hidden",
          width: libOpen ? "100%" : 0,
          transition: "width 200ms ease, visibility 200ms ease",
          background: "var(--s-surface)",
        }}
      >
        <PanelHeader label="Library" />
        <div className="flex-1 overflow-hidden">{library}</div>
      </div>

      {/* ---- Row 3 Col 2: Canvas ---- */}
      <div className="relative flex flex-col overflow-hidden" style={{ gridRow: 3, gridColumn: 2 }}>
        {canvas}
      </div>

      {/* ---- Row 3 Col 3: Right panel ---- */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          gridRow: 3,
          gridColumn: 3,
          borderLeft: rightOpen ? "1px solid var(--s-border)" : "none",
          visibility: rightOpen ? "visible" : "hidden",
          width: rightOpen ? "100%" : 0,
          transition: "width 200ms ease, visibility 200ms ease",
          background: "var(--s-surface)",
        }}
      >
        <PanelHeader label={rightMode === "agent" ? "Token Forge Agent" : rightMode === "history" ? "Design History" : "Token Editor"} />
        <div className="flex-1 overflow-hidden flex flex-col">{rightPanel}</div>
      </div>
    </div>
  );
}

function PanelHeader({ label }: { label: string }) {
  return (
    <div
      className="flex h-8 shrink-0 items-center px-3"
      style={{ borderBottom: "1px solid var(--s-border)", background: "var(--s-surface)" }}
    >
      <span
        className="font-[family-name:var(--s-font-mono)] text-[10px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: "var(--s-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function PanelTab({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "4px", padding: "3px 10px",
        fontSize: "11px", fontWeight: 600,
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        textTransform: "uppercase", letterSpacing: "0.04em", border: "none", cursor: "pointer",
        background: active ? "var(--s-surface-elevated, var(--s-surface))" : "transparent",
        color: active ? "var(--s-text)" : "var(--s-text-muted)",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function HeaderButton({ onClick, label, active, children }: { onClick: () => void; label: string; active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="flex items-center justify-center w-7 h-7 rounded-md transition-colors text-xs"
      style={{
        background: active ? "var(--s-surface-elevated, var(--s-surface))" : "transparent",
        color: active ? "var(--s-text)" : "var(--s-text-muted)",
        border: active ? "1px solid var(--s-border)" : "1px solid transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
