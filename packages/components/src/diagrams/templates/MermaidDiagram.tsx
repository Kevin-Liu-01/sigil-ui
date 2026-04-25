"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils";

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
            themeVariables: theme === "dark" ? {
              primaryColor: "var(--s-primary)",
              primaryTextColor: "var(--s-text)",
              primaryBorderColor: "var(--s-border-strong)",
              lineColor: "var(--s-chart-axis)",
              sectionBkgColor: "var(--s-surface)",
              altSectionBkgColor: "var(--s-surface-elevated)",
              gridColor: "var(--s-chart-grid)",
              secondaryColor: "var(--s-surface-elevated)",
              tertiaryColor: "var(--s-surface)",
            } : undefined,
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
          "w-full overflow-auto rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] p-4",
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
