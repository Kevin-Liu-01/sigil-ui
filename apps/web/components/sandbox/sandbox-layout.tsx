"use client";

import { useState, useCallback, type ReactNode } from "react";
import { Divider, NativeSelect } from "@sigil-ui/components";

type SandboxLayoutProps = {
  /** Live component preview panel. */
  preview: ReactNode;
  /** Code editor panel (preset CSS/JSON). */
  editor: ReactNode;
  /** Agent chat panel. */
  chat?: ReactNode;
  presetName?: string;
  presetList?: string[];
  onPresetChange?: (name: string) => void;
  onExport?: () => void;
  onReset?: () => void;
};

export function SandboxLayout({
  preview,
  editor,
  chat,
  presetName,
  presetList,
  onPresetChange,
  onExport,
  onReset,
}: SandboxLayoutProps) {
  const [chatOpen, setChatOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<"preview" | "editor">("preview");

  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);

  return (
    <div
      className="h-dvh w-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateRows: "44px 1fr",
        gridTemplateColumns: chatOpen ? "1fr 380px" : "1fr 0px",
        transition: "grid-template-columns 200ms ease",
        background: "var(--s-background)",
        color: "var(--s-text)",
      }}
    >
      {/* ---- Header ---- */}
      <header
        className="flex items-center justify-between px-4"
        style={{
          gridRow: 1,
          gridColumn: "1 / -1",
          borderBottom: "1px solid var(--s-border)",
          background: "var(--s-surface)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="no-underline"
            style={{ color: "var(--s-text-muted)", fontSize: "12px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12L12 3l9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <span
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: "var(--s-text-muted)", letterSpacing: "0.06em" }}
          >
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
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </NativeSelect>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Preview / Editor tab toggle */}
          <div
            style={{
              display: "flex",
              border: "1px solid var(--s-border)",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <PanelTab
              active={activePanel === "preview"}
              onClick={() => setActivePanel("preview")}
              label="Preview"
              icon={
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <rect x="2" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                  <rect x="8" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                  <rect x="2" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                  <rect x="8" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              }
            />
            <PanelTab
              active={activePanel === "editor"}
              onClick={() => setActivePanel("editor")}
              label="Code"
              icon={
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M5 3L2 7l3 4M9 3l3 4-3 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>

          <Divider orientation="vertical" style={{ height: "20px" }} />

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

          <Divider orientation="vertical" style={{ height: "20px" }} />

          <HeaderButton
            onClick={toggleChat}
            label={chatOpen ? "Hide agent" : "Show agent"}
            active={chatOpen}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2 3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H5l-2 2V10H3a1 1 0 01-1-1V3z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
            </svg>
          </HeaderButton>
        </div>
      </header>

      {/* ---- Main content: Preview or Editor ---- */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{ gridRow: 2, gridColumn: 1 }}
      >
        <div
          style={{
            display: activePanel === "preview" ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {preview}
        </div>
        <div
          style={{
            display: activePanel === "editor" ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {editor}
        </div>
      </div>

      {/* ---- Agent chat panel ---- */}
      <div
        className="overflow-hidden flex"
        style={{
          gridRow: 2,
          gridColumn: 2,
          visibility: chatOpen ? "visible" : "hidden",
          width: chatOpen ? "100%" : 0,
          transition: "width 200ms ease, visibility 200ms ease",
        }}
      >
        <Divider orientation="vertical" />
        <div
          className="flex-1 overflow-hidden flex flex-col"
          style={{ background: "var(--s-surface)" }}
        >
          {chat ?? <ChatPlaceholder />}
        </div>
      </div>
    </div>
  );
}

function PanelTab({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 10px",
        fontSize: "11px",
        fontWeight: 600,
        fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        border: "none",
        cursor: "pointer",
        background: active
          ? "var(--s-surface-elevated, var(--s-surface))"
          : "transparent",
        color: active ? "var(--s-text)" : "var(--s-text-muted)",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function HeaderButton({
  onClick,
  label,
  active,
  children,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="flex items-center justify-center w-7 h-7 rounded-md transition-colors text-xs"
      style={{
        background:
          active !== undefined && active
            ? "var(--s-surface-elevated, var(--s-surface))"
            : "transparent",
        color:
          active !== undefined && active
            ? "var(--s-text)"
            : "var(--s-text-muted)",
        border:
          active !== undefined && active
            ? "1px solid var(--s-border)"
            : "1px solid transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ChatPlaceholder() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <p className="text-xs text-[var(--s-text-muted)] text-center leading-relaxed">
        Describe your ideal design — the agent will patch tokens and you&apos;ll see changes in real-time.
      </p>
    </div>
  );
}
