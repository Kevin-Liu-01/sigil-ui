"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FlowNode {
  id: string;
  label: string;
  children?: ReactNode;
}

export interface FlowConnection {
  from: string;
  to: string;
}

export interface FlowDiagramProps extends HTMLAttributes<HTMLDivElement> {
  /** Nodes in the flow. */
  nodes: FlowNode[];
  /** Connections between nodes. */
  connections: FlowConnection[];
  /** Flow direction. @default "horizontal" */
  direction?: "horizontal" | "vertical";
}

/** Flow diagram with connected nodes. Renders nodes inline with arrow connectors. */
export const FlowDiagram = forwardRef<HTMLDivElement, FlowDiagramProps>(function FlowDiagram(
  { nodes, connections: _connections, direction = "horizontal", className, ...rest },
  ref,
) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={ref}
      data-slot="flow-diagram"
      className={cn(
        "flex items-center gap-2",
        isHorizontal ? "flex-row flex-wrap" : "flex-col",
        className,
      )}
      {...rest}
    >
      {nodes.map((node, i) => (
        <div
          key={node.id}
          className={cn(
            "flex items-center gap-2",
            isHorizontal ? "flex-row" : "flex-col",
          )}
        >
          <div
            className={cn(
              "rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)]",
              "bg-[var(--s-surface)] px-4 py-3 text-sm",
            )}
          >
            <div className="font-medium text-[var(--s-text)]">{node.label}</div>
            {node.children && (
              <div className="mt-1 text-[var(--s-text-muted)]">{node.children}</div>
            )}
          </div>
          {i < nodes.length - 1 && (
            <svg
              className={cn("shrink-0 text-[var(--s-border)]")}
              width={isHorizontal ? 24 : 16}
              height={isHorizontal ? 16 : 24}
              viewBox={isHorizontal ? "0 0 24 16" : "0 0 16 24"}
              fill="none"
              aria-hidden
            >
              {isHorizontal ? (
                <>
                  <line x1="0" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points="14,3 20,8 14,13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <>
                  <line x1="8" y1="0" x2="8" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points="3,14 8,20 13,14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          )}
        </div>
      ))}
    </div>
  );
});
