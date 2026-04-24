"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface NetworkGraphProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width?: number;
  height?: number;
}

export const NetworkGraph = forwardRef<SVGSVGElement, NetworkGraphProps>(
  function NetworkGraph({ nodes, edges, width: w = 500, height: h = 400, className, ...props }, ref) {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    return (
      <svg
        ref={ref}
        data-slot="network-graph"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {edges.map((edge, i) => {
          const src = nodeMap.get(edge.source);
          const tgt = nodeMap.get(edge.target);
          if (!src || !tgt) return null;
          return (
            <line
              key={i}
              x1={src.x}
              y1={src.y}
              x2={tgt.x}
              y2={tgt.y}
              stroke="var(--s-border)"
              strokeWidth={edge.weight ? Math.max(0.5, Math.min(edge.weight, 4)) : 1}
              opacity={0.4}
            />
          );
        })}

        {nodes.map((node) => {
          const r = node.size ?? 6;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={node.color ?? "var(--s-primary)"}
                opacity={0.85}
              />
              <text
                x={node.x}
                y={node.y + r + 12}
                textAnchor="middle"
                fontSize={9}
                fill="var(--s-text-muted)"
                fontFamily="var(--s-font-mono, monospace)"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  },
);
