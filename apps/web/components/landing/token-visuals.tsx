"use client";

import type { CSSProperties, ReactNode } from "react";

export type TokenPreviewKind =
  | "primary"
  | "mid"
  | "muted"
  | "background"
  | "border"
  | "radius-sm"
  | "radius-md"
  | "duration"
  | "mono"
  | "color"
  | "font"
  | "spacing"
  | "shadow"
  | "layout";

type TokenPreviewGlyphProps = {
  kind: TokenPreviewKind;
  value?: string;
  label?: string;
};

const tokenGlyphBase: CSSProperties = {
  width: 28,
  height: 20,
  border: "var(--s-border-thin, 1px) solid var(--s-border)",
  borderStyle: "var(--s-border-style, solid)",
  borderRadius: "var(--s-radius-sm, 4px)",
  flex: "0 0 auto",
};

export function TokenPreviewGlyph({ kind, value, label }: TokenPreviewGlyphProps) {
  const colorValue =
    value ??
    (kind === "primary"
      ? "var(--s-primary)"
      : kind === "mid"
        ? "var(--hlf-mid)"
        : kind === "background"
          ? "var(--s-background)"
          : "var(--s-text-muted)");

  if (kind === "primary" || kind === "mid" || kind === "background" || kind === "color") {
    return <span aria-hidden="true" style={{ ...tokenGlyphBase, background: colorValue }} />;
  }

  if (kind === "muted") {
    return (
      <span
        aria-hidden="true"
        style={{
          ...tokenGlyphBase,
          background:
            "repeating-linear-gradient(90deg, transparent 0 5px, var(--s-text-muted) 5px 6px)",
          opacity: 0.78,
        }}
      />
    );
  }

  if (kind === "border") {
    return (
      <span aria-hidden="true" style={{ ...tokenGlyphBase, position: "relative", background: "transparent" }}>
        <span
          style={{
            position: "absolute",
            inset: 5,
            border: "var(--s-border-thin, 1px) solid var(--s-primary)",
            borderStyle: "var(--s-border-style, solid)",
            borderRadius: "var(--s-radius-xs, 2px)",
          }}
        />
      </span>
    );
  }

  if (kind === "radius-sm" || kind === "radius-md") {
    return (
      <span aria-hidden="true" style={{ ...tokenGlyphBase, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            inset: kind === "radius-sm" ? 5 : 4,
            border: "var(--s-border-thin, 1px) solid var(--s-primary)",
            borderStyle: "var(--s-border-style, solid)",
            borderRadius: value ?? (kind === "radius-sm" ? "var(--s-radius-sm, 4px)" : "var(--s-radius-md, 8px)"),
          }}
        />
      </span>
    );
  }

  if (kind === "font" || kind === "mono") {
    return (
      <span
        aria-hidden="true"
        style={{
          ...tokenGlyphBase,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--s-primary)",
          fontFamily: value ?? "var(--s-font-mono)",
          fontSize: 9,
        }}
      >
        {label ?? "Aa"}
      </span>
    );
  }

  if (kind === "spacing") {
    return (
      <span aria-hidden="true" style={{ ...tokenGlyphBase, display: "flex", alignItems: "end", gap: 2, padding: 3 }}>
        {[6, 10, 14].map((height) => (
          <span key={height} style={{ flex: 1, height, background: "var(--s-primary)", opacity: height / 14 }} />
        ))}
      </span>
    );
  }

  if (kind === "shadow") {
    return (
      <span aria-hidden="true" style={{ ...tokenGlyphBase, display: "grid", placeItems: "center" }}>
        <span
          style={{
            width: 12,
            height: 9,
            border: "var(--s-border-thin, 1px) solid var(--s-primary)",
            borderStyle: "var(--s-border-style, solid)",
            boxShadow: "4px 4px 0 color-mix(in oklch, var(--s-primary) 25%, transparent)",
          }}
        />
      </span>
    );
  }

  if (kind === "duration") {
    return (
      <span aria-hidden="true" style={{ ...tokenGlyphBase, position: "relative", overflow: "hidden" }}>
        <span
          style={{
            position: "absolute",
            left: 5,
            right: 5,
            top: 9,
            borderTop: "var(--s-border-thin, 1px) solid var(--s-border-strong, var(--s-border))",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 5,
            top: 6,
            width: 6,
            height: 6,
            borderRadius: "var(--s-radius-full, 999px)",
            background: "var(--s-text-muted)",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            width: 8,
            height: 8,
            borderRadius: "var(--s-radius-full, 999px)",
            background: "var(--s-primary)",
            boxShadow: "-8px 0 0 color-mix(in oklch, var(--s-primary) 28%, transparent)",
          }}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        ...tokenGlyphBase,
        backgroundImage:
          "linear-gradient(var(--s-border) 1px, transparent 1px), linear-gradient(90deg, var(--s-border) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    />
  );
}

export function MarkdownChrome({
  title,
  meta,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        border: "var(--s-border-thin, 1px) solid var(--s-border)",
        borderStyle: "var(--s-border-style, solid)",
        borderRadius: "var(--s-radius-md, 8px)",
        background: "color-mix(in oklch, var(--s-background) 92%, transparent)",
        color: "var(--s-text)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: "var(--s-border-thin, 1px) var(--s-border-style, solid) var(--s-border)",
          padding: "8px 12px",
          fontFamily: "var(--s-font-mono)",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>{title}</span>
        {meta ? <span style={{ color: "var(--s-text-muted)" }}>{meta}</span> : null}
      </div>
      {children}
    </div>
  );
}
