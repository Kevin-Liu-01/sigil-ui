"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FlowNode {
  id: string;
  label: string;
  children?: ReactNode;
  variant?: "default" | "highlighted" | "accent";
}

export interface FlowConnection {
  from: string;
  to: string;
  label?: string;
}

export interface FlowDiagramProps extends HTMLAttributes<HTMLDivElement> {
  nodes: FlowNode[];
  connections: FlowConnection[];
  direction?: "horizontal" | "vertical";
  connector?: "solid" | "dashed" | "dashed-animated";
}

const nodeVariantStyles = {
  default: "border-[color:var(--s-border)] bg-[var(--s-surface)]",
  highlighted: "border-[color:var(--s-primary)] bg-[var(--s-primary-muted)] ring-1 ring-[var(--s-primary)]/20",
  accent: "border-[color:var(--s-primary)] bg-[var(--s-primary)] text-[var(--s-primary-contrast)]",
};

export const FlowDiagram = forwardRef<HTMLDivElement, FlowDiagramProps>(function FlowDiagram(
  { nodes, connections, direction = "horizontal", connector = "dashed-animated", className, ...rest },
  ref,
) {
  const isH = direction === "horizontal";

  const connectedPairs = new Set<string>();
  for (const c of connections) {
    connectedPairs.add(`${c.from}→${c.to}`);
  }

  const orderedPairs: { from: string; to: string; label?: string }[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const key = `${nodes[i].id}→${nodes[i + 1].id}`;
    const conn = connections.find(c => `${c.from}→${c.to}` === key);
    orderedPairs.push({
      from: nodes[i].id,
      to: nodes[i + 1].id,
      label: conn?.label,
    });
  }

  const dashProps: Record<string, string | number> = {};
  if (connector === "dashed" || connector === "dashed-animated") {
    dashProps.strokeDasharray = "6 4";
  }

  return (
    <div
      ref={ref}
      data-slot="flow-diagram"
      className={cn("flex items-center gap-3", isH ? "flex-row flex-wrap" : "flex-col", className)}
      {...rest}
    >
      {connector === "dashed-animated" && (
        <style>{`@keyframes sigil-flow-dash{to{stroke-dashoffset:-20}}[data-slot="flow-diagram"] .flow-dash-anim{animation:sigil-flow-dash 1s linear infinite}`}</style>
      )}
      {nodes.map((node, i) => (
        <div key={node.id} className={cn("flex items-center gap-3", isH ? "flex-row" : "flex-col")}>
          <div
            className={cn(
              "rounded-[var(--s-radius-md,0px)] border px-4 py-3 text-sm",
              nodeVariantStyles[node.variant ?? "default"],
            )}
          >
            <div className={cn("font-medium", node.variant === "accent" ? "" : "text-[var(--s-text)]")}>{node.label}</div>
            {node.children && <div className="mt-1 text-xs text-[var(--s-text-muted)]">{node.children}</div>}
          </div>

          {i < nodes.length - 1 && (
            <svg
              className="shrink-0"
              width={isH ? 40 : 16}
              height={isH ? 24 : 40}
              viewBox={isH ? "0 0 40 24" : "0 0 16 40"}
              fill="none"
              aria-hidden
            >
              {isH ? (
                <>
                  <line x1="0" y1="12" x2="32" y2="12" stroke="var(--s-chart-axis)" strokeWidth="1.5" className={connector === "dashed-animated" ? "flow-dash-anim" : undefined} {...dashProps} />
                  <polygon points="32,8 40,12 32,16" fill="var(--s-chart-axis)" />
                </>
              ) : (
                <>
                  <line x1="8" y1="0" x2="8" y2="32" stroke="var(--s-chart-axis)" strokeWidth="1.5" className={connector === "dashed-animated" ? "flow-dash-anim" : undefined} {...dashProps} />
                  <polygon points="4,32 8,40 12,32" fill="var(--s-chart-axis)" />
                </>
              )}
              {orderedPairs[i]?.label && (
                <text
                  x={isH ? 20 : 16}
                  y={isH ? 8 : 20}
                  textAnchor={isH ? "middle" : "start"}
                  dominantBaseline={isH ? "auto" : "middle"}
                  fill="var(--s-text-muted)"
                  fontSize={9}
                  fontFamily="var(--s-font-mono, monospace)"
                >
                  {orderedPairs[i].label}
                </text>
              )}
            </svg>
          )}
        </div>
      ))}
    </div>
  );
});
