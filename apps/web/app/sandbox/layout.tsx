"use client";

import { useState, useCallback, type ReactNode } from "react";
import { Stack, Divider, Margin } from "@sigil-ui/components";

type SandboxLayoutProps = {
  children: ReactNode;
  chat?: ReactNode;
  toolbar?: ReactNode;
};

export default function SandboxLayout({
  children,
  chat,
  toolbar,
}: SandboxLayoutProps) {
  const [chatOpen, setChatOpen] = useState(true);
  const [toolbarOpen, setToolbarOpen] = useState(true);

  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);
  const toggleToolbar = useCallback(() => setToolbarOpen((v) => !v), []);

  return (
    <Stack
      className="h-dvh w-full overflow-hidden bg-[var(--s-background)] text-[var(--s-text)]"
      style={{
        display: "grid",
        gridTemplateRows: toolbarOpen ? "1fr 280px" : "1fr 0px",
        gridTemplateColumns: chatOpen ? "1fr 380px" : "1fr 0px",
        transition: "grid-template-rows 200ms ease, grid-template-columns 200ms ease",
      }}
    >
      {/* Canvas area (top-left) */}
      <div className="relative overflow-hidden flex flex-col" style={{ gridRow: 1, gridColumn: 1 }}>
        {/* Toggle buttons */}
        <Stack direction="row" gap={6} className="absolute top-3 right-3 z-30">
          <ToggleButton
            label={chatOpen ? "Hide Chat" : "Show Chat"}
            active={chatOpen}
            onClick={toggleChat}
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 3a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H5l-2 2V10H3a1 1 0 01-1-1V3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <ToggleButton
            label={toolbarOpen ? "Hide Toolbar" : "Show Toolbar"}
            active={toolbarOpen}
            onClick={toggleToolbar}
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="2" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2" y="7" width="10" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            }
          />
        </Stack>

        {children}
      </div>

      {/* Chat panel (top-right) — Divider + content */}
      <Stack
        direction="row"
        flush
        className="overflow-hidden"
        style={{
          gridRow: 1,
          gridColumn: 2,
          visibility: chatOpen ? "visible" : "hidden",
          width: chatOpen ? "100%" : 0,
          transition: "width 200ms ease, visibility 200ms ease",
        }}
      >
        <Divider orientation="vertical" />
        <Stack className="flex-1 overflow-hidden bg-[var(--s-surface)]">
          {chat ?? <ChatPlaceholder />}
        </Stack>
      </Stack>

      {/* Toolbar (bottom, spans full width) */}
      <Stack
        className="overflow-hidden bg-[var(--s-surface-sunken)]"
        style={{
          gridRow: 2,
          gridColumn: "1 / -1",
          visibility: toolbarOpen ? "visible" : "hidden",
          height: toolbarOpen ? "100%" : 0,
          transition: "height 200ms ease, visibility 200ms ease",
        }}
      >
        <Divider orientation="horizontal" />
        <div className="flex-1 overflow-hidden">
          {toolbar ?? <ToolbarPlaceholder />}
        </div>
      </Stack>
    </Stack>
  );
}

function ToggleButton({
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
      className={[
        "flex items-center justify-center w-7 h-7 rounded-md transition-colors text-xs",
        active
          ? "bg-[var(--s-surface-elevated)] text-[var(--s-text)] shadow-sm"
          : "bg-[var(--s-surface)] text-[var(--s-text-muted)] hover:text-[var(--s-text)]",
        "border border-[var(--s-border)]",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}

function ChatPlaceholder() {
  return (
    <Stack className="h-full">
      <Margin size="sm">
        <Stack direction="row" gap={8} align="center" className="py-3 border-b border-[var(--s-border)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--s-primary)]">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </svg>
          <span className="text-sm font-medium text-[var(--s-text)]">Agent Chat</span>
        </Stack>
      </Margin>
      <Stack align="center" justify="center" className="flex-1 p-4">
        <p className="text-xs text-[var(--s-text-muted)] text-center">
          Chat panel — connect an agent to modify the canvas via natural language.
        </p>
      </Stack>
      <Margin size="sm" className="py-3 border-t border-[var(--s-border)]">
        <Stack
          direction="row"
          gap={8}
          align="center"
          className="rounded-lg border border-[var(--s-border)] bg-[var(--s-background)] px-3 py-2"
        >
          <input
            type="text"
            placeholder="Describe what to build..."
            disabled
            className="flex-1 bg-transparent text-sm text-[var(--s-text)] placeholder:text-[var(--s-text-subtle)] outline-none"
          />
        </Stack>
      </Margin>
    </Stack>
  );
}

function ToolbarPlaceholder() {
  return (
    <Stack align="center" justify="center" className="h-full">
      <p className="text-xs text-[var(--s-text-muted)]">
        Toolbar — drag components from the palette onto the canvas
      </p>
    </Stack>
  );
}
