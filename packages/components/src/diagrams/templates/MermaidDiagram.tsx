"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils";

function resolveToken(token: string): string {
  if (typeof window === "undefined") return "#888";
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  if (!raw) return "#888";
  if (raw.startsWith("#") || raw.startsWith("rgb")) return raw;
  if (raw.startsWith("oklch")) {
    const el = document.createElement("div");
    el.style.color = raw;
    document.body.appendChild(el);
    const resolved = getComputedStyle(el).color;
    el.remove();
    return resolved;
  }
  return raw;
}

function getThemeVars() {
  return {
    primaryColor: resolveToken("--s-primary"),
    primaryTextColor: resolveToken("--s-text"),
    primaryBorderColor: resolveToken("--s-border-strong"),
    lineColor: resolveToken("--s-chart-axis"),
    sectionBkgColor: resolveToken("--s-surface"),
    altSectionBkgColor: resolveToken("--s-surface-elevated"),
    gridColor: resolveToken("--s-chart-grid"),
    secondaryColor: resolveToken("--s-surface-elevated"),
    tertiaryColor: resolveToken("--s-surface"),
  };
}

export interface MermaidDiagramProps extends HTMLAttributes<HTMLDivElement> {
  chart: string;
  theme?: "dark" | "default";
}

export const MermaidDiagram = forwardRef<HTMLDivElement, MermaidDiagramProps>(
  function MermaidDiagram({ chart, theme = "dark", className, ...props }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
      let cancelled = false;

      async function render() {
        try {
          const mermaid = (await import("mermaid")).default;
          mermaid.initialize({
            startOnLoad: false,
            theme: theme === "dark" ? "dark" : "default",
            themeVariables: theme === "dark" ? getThemeVars() : undefined,
            flowchart: { curve: "basis" },
          });

          const id = `mermaid-${Date.now()}`;
          const { svg: rendered } = await mermaid.render(id, chart);
          if (!cancelled) setSvg(rendered);
        } catch (e) {
          if (!cancelled) setError(e instanceof Error ? e.message : "Failed to render");
        }
      }

      render();
      return () => { cancelled = true; };
    }, [chart, theme]);

    return (
      <div
        ref={ref}
        data-slot="mermaid-diagram"
        className={cn(
          "w-full overflow-auto rounded-[var(--s-radius-card,0px)] border border-[color:var(--s-border)] p-4",
          theme === "dark" ? "bg-[var(--s-background)]" : "bg-[var(--s-surface)]",
          className,
        )}
        {...props}
      >
        {error ? (
          <p className="text-xs text-[var(--s-error)]">Mermaid error: {error}</p>
        ) : svg ? (
          <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} className="[&_svg]:max-w-full" />
        ) : (
          <div className="flex items-center justify-center py-8 text-xs text-[var(--s-text-muted)]">Loading diagram...</div>
        )}
      </div>
    );
  },
);
