"use client";

import { type ReactNode } from "react";

/**
 * Structural section panel — the atomic unit of the blueprint design language.
 * Combines screen-line hairlines (top + bottom) with container column borders.
 */
export function Panel({
  children,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "nav" | "footer" | "header" | "div" | "aside";
}) {
  return (
    <Tag
      className={`s-screen-line-top s-screen-line-bottom s-container-column ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * 32px structural breathing band between panels.
 * Container column borders continue through the dead space,
 * with screen-line hairlines at top and bottom.
 */
export function PanelSpacer() {
  return (
    <div className="s-screen-line-top s-screen-line-bottom s-container-column h-8" />
  );
}

/**
 * Section header row with screen-line divider below.
 * Renders a mono-spaced label in the chanhdai/tailwindcss style.
 */
export function PanelHeader({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="s-screen-line-bottom flex items-center justify-between px-4 py-2.5">
      <span
        style={{
          fontFamily: "var(--s-font-mono)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "var(--s-text-muted)",
        }}
      >
        {children}
      </span>
      {right}
    </header>
  );
}

/**
 * Full-page demo wrapper. Sets the page-level token overrides and
 * provides the max-width + horizontal padding container.
 */
export function DemoShell({
  children,
  maxWidth = "56rem",
}: {
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{
        background: "var(--s-background)",
        color: "var(--s-text)",
        fontFamily: "var(--s-font-body)",
      }}
    >
      <div className="mx-auto px-2" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Placeholder image block — colored gradient with aspect ratio,
 * used where real images would go.
 */
export function PlaceholderImage({
  aspect = "16/9",
  gradient,
  label,
  className = "",
}: {
  aspect?: string;
  gradient?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        aspectRatio: aspect,
        background:
          gradient ??
          "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 15%, var(--s-surface)) 0%, var(--s-surface) 100%)",
        borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: "var(--s-font-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--s-text-muted)",
            opacity: 0.6,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
