"use client";

import { useState, useCallback, type ReactNode } from "react";
import { Divider, NativeSelect } from "@sigil-ui/components";

type SandboxLayoutProps = {
  children: ReactNode;
  chat?: ReactNode;
  toolbar?: ReactNode;
  presetName?: string;
  presetList?: string[];
  onPresetChange?: (name: string) => void;
};

export function SandboxLayout({
  children,
  chat,
  toolbar,
  presetName,
  presetList,
  onPresetChange,
}: SandboxLayoutProps) {
  const [chatOpen, setChatOpen] = useState(true);
  const [toolbarOpen, setToolbarOpen] = useState(true);

  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);
  const toggleToolbar = useCallback(() => setToolbarOpen((v) => !v), []);

  return (
    <div
      className="h-dvh w-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateRows: toolbarOpen ? "40px 1fr 180px" : "40px 1fr 0px",
        gridTemplateColumns: chatOpen ? "1fr 360px" : "1fr 0px",
        transition:
          "grid-template-rows 200ms ease, grid-template-columns 200ms ease",
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
          <span
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: "var(--s-text-muted)", letterSpacing: "0.06em" }}
          >
            Sandbox
          </span>
          {presetName && (
            <>
              <span
                className="text-[10px]"
                style={{ color: "var(--s-text-subtle)" }}
              >
                /
              </span>
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

        <div className="flex items-center gap-1.5">
          <HeaderToggle
            label={toolbarOpen ? "Hide palette" : "Show palette"}
            active={toolbarOpen}
            onClick={toggleToolbar}
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="10"
                  height="3"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <rect
                  x="2"
                  y="7"
                  width="10"
                  height="5"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
              </svg>
            }
          />
          <HeaderToggle
            label={chatOpen ? "Hide agent" : "Show agent"}
            active={chatOpen}
            onClick={toggleChat}
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H5l-2 2V10H3a1 1 0 01-1-1V3z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </header>

      {/* ---- Canvas area ---- */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{ gridRow: 2, gridColumn: 1 }}
      >
        {children}
      </div>

      {/* ---- Chat panel ---- */}
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

      {/* ---- Toolbar ---- */}
      <div
        className="overflow-hidden flex flex-col"
        style={{
          gridRow: 3,
          gridColumn: "1 / -1",
          visibility: toolbarOpen ? "visible" : "hidden",
          height: toolbarOpen ? "100%" : 0,
          transition: "height 200ms ease, visibility 200ms ease",
          background: "var(--s-surface-sunken, var(--s-surface))",
        }}
      >
        <Divider orientation="horizontal" />
        <div className="flex-1 overflow-hidden">
          {toolbar ?? <ToolbarPlaceholder />}
        </div>
      </div>
    </div>
  );
}

function HeaderToggle({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="flex items-center justify-center w-7 h-7 rounded-md transition-colors text-xs"
      style={{
        background: active
          ? "var(--s-surface-elevated, var(--s-surface))"
          : "transparent",
        color: active ? "var(--s-text)" : "var(--s-text-muted)",
        border: active ? "1px solid var(--s-border)" : "1px solid transparent",
      }}
    >
      {icon}
    </button>
  );
}

function ChatPlaceholder() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <p className="text-xs text-[var(--s-text-muted)] text-center leading-relaxed">
        Chat panel — connect an agent to modify the canvas via natural language.
      </p>
    </div>
  );
}

function ToolbarPlaceholder() {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-xs text-[var(--s-text-muted)]">
        Toolbar — component palette
      </p>
    </div>
  );
}
