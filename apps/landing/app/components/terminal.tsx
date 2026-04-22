"use client";

import { useEffect, useState } from "react";

type TerminalLine = {
  text: string;
  prefix?: string;
  color?: string;
  delay?: number;
};

type TerminalProps = {
  lines: TerminalLine[];
  title?: string;
};

export function Terminal({ lines, title = "terminal" }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= lines.length) return;

    const delay = lines[visibleCount]?.delay ?? 400;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, lines]);

  return (
    <div
      className="overflow-hidden"
      style={{
        borderRadius: "var(--r-card-radius)",
        border: "1px solid var(--r-border)",
        background: "var(--r-surface)",
        boxShadow: "var(--r-shadow-lg)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: "var(--r-space-3) var(--r-space-4)",
          borderBottom: "1px solid var(--r-border)",
        }}
      >
        <div className="flex gap-1.5">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "var(--r-radius-full)",
              background: "#ef4444",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "var(--r-radius-full)",
              background: "#f59e0b",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "var(--r-radius-full)",
              background: "#10b981",
              opacity: 0.7,
            }}
          />
        </div>
        <span
          className="r-mono"
          style={{
            fontSize: "11px",
            color: "var(--r-text-subtle)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {title}
        </span>
        <div style={{ width: 44 }} />
      </div>

      {/* Content */}
      <div
        className="r-mono"
        style={{
          padding: "var(--r-space-6)",
          fontSize: "13px",
          lineHeight: 1.8,
          minHeight: 180,
        }}
      >
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.prefix && (
              <span style={{ color: "var(--r-text-muted)", userSelect: "none" }}>
                {line.prefix}
              </span>
            )}
            <span style={{ color: line.color ?? "var(--r-text-secondary)" }}>
              {line.text}
            </span>
          </div>
        ))}
        {visibleCount < lines.length && (
          <span className="r-cursor-blink" />
        )}
      </div>
    </div>
  );
}
