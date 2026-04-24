"use client";

import { forwardRef, type SVGAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface DepNode {
  id: string;
  label: string;
  group?: string;
  x: number;
  y: number;
  icon?: ReactNode;
}

export interface DepEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface DependencyGraphProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  nodes: DepNode[];
  edges: DepEdge[];
  width?: number;
  height?: number;
  nodeRadius?: number;
}

export const DependencyGraph = forwardRef<SVGSVGElement, DependencyGraphProps>(
  function DependencyGraph({ nodes, edges, width: w = 500, height: h = 400, nodeRadius = 28, className, ...props }, ref) {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    return (
      <svg
        ref={ref}
        data-slot="dependency-graph"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        <defs>
          <marker id="dep-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--s-border-strong, var(--s-border))" />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const src = nodeMap.get(edge.from);
          const tgt = nodeMap.get(edge.to);
          if (!src || !tgt) return null;

          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;
          const x1 = src.x + nx * nodeRadius;
          const y1 = src.y + ny * nodeRadius;
          const x2 = tgt.x - nx * (nodeRadius + 6);
          const y2 = tgt.y - ny * (nodeRadius + 6);

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--s-border-strong, var(--s-border))"
                strokeWidth={1.2}
                strokeDasharray={edge.dashed ? "5 3" : undefined}
                markerEnd="url(#dep-arrow)"
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  textAnchor="middle"
                  fontSize={8}
                  fill="var(--s-text-muted)"
                  fontFamily="var(--s-font-mono, monospace)"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius}
              fill="var(--s-surface)"
              stroke="var(--s-border)"
              strokeWidth={1.5}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fontWeight={600}
              fill="var(--s-text)"
              fontFamily="var(--s-font-mono, monospace)"
            >
              {node.label}
            </text>
            {node.group && (
              <text
                x={node.x}
                y={node.y + nodeRadius + 12}
                textAnchor="middle"
                fontSize={8}
                fill="var(--s-text-muted)"
                fontFamily="var(--s-font-mono, monospace)"
              >
                {node.group}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  },
);
