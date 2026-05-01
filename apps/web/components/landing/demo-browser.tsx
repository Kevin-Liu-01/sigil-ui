"use client";

import type { ReactNode } from "react";

type DemoBrowserProps = {
  title: string;
  url: string;
  href: string;
  children?: ReactNode;
  className?: string;
  variant?: "large" | "small";
};

const DEMO_COLORS: Record<string, { from: string; to: string }> = {
  "ai-saas":    { from: "#9b99e8", to: "#4f46e5" },
  "dashboard":  { from: "#3b82f6", to: "#1e40af" },
  "ecommerce":  { from: "#f5f5f5", to: "#e5e5e5" },
  "dev-docs":   { from: "#1e40af", to: "#0f172a" },
  "startup":    { from: "#d4ff00", to: "#84cc16" },
  "portfolio":  { from: "#000000", to: "#18181b" },
  "blog":       { from: "#faf8f5", to: "#f0ede8" },
  "agency":     { from: "#0a0a0f", to: "#141419" },
  "cli-tool":   { from: "#050510", to: "#0a0a1f" },
  "playground": { from: "#9b99e8", to: "#6366f1" },
};

function isLightGradient(from: string, to: string): boolean {
  const luminance = (hex: string) => {
    const c = hex.replace("#", "");
    if (c.length < 6) return 0;
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };
  return (luminance(from) + luminance(to)) / 2 > 140;
}

function DemoPlaceholder({ name }: { name: string }) {
  const colors = DEMO_COLORS[name] ?? { from: "#9b99e8", to: "#4f46e5" };
  const light = isLightGradient(colors.from, colors.to);

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 w-full h-full select-none"
      style={{
        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        color: light ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
      }}
    >
      <span
        className="r-mono font-semibold"
        style={{ fontSize: 16, letterSpacing: "-0.01em" }}
      >
        {name}
      </span>
      <span
        className="r-mono"
        style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        Built with Sigil
      </span>
    </div>
  );
}

export function DemoBrowser({
  title,
  url,
  href,
  children,
  className = "",
  variant = "large",
}: DemoBrowserProps) {
  const isSmall = variant === "small";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block no-underline transition-all group ${className}`}
      style={{
        borderRadius: "var(--s-card-radius, 8px)",
        border: "1px solid var(--s-border)",
        overflow: "hidden",
        background: "var(--s-surface)",
        boxShadow: "var(--s-shadow-sm)",
        transitionDuration: "var(--s-duration-fast, 150ms)",
        transitionTimingFunction: "var(--s-ease-out, ease-out)",
      }}
    >
      {/* macOS title bar */}
      <div
        className="flex items-center relative"
        style={{
          height: 50,
          padding: "0 14px",
          borderBottom: "1px solid var(--s-border)",
          background: "var(--s-surface)",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        </div>

        <span
          className="r-mono absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            fontSize: 11,
            color: "var(--s-text-muted)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "60%",
          }}
        >
          {url}
        </span>
      </div>

      {/* Content area */}
      <div
        className="group-hover:-translate-y-0.5 group-hover:shadow-lg transition-all"
        style={{
          height: isSmall ? 200 : "auto",
          minHeight: isSmall ? undefined : 200,
          overflow: "hidden",
          transitionDuration: "var(--s-duration-fast, 150ms)",
        }}
      >
        {children ?? <DemoPlaceholder name={title} />}
      </div>
    </a>
  );
}
