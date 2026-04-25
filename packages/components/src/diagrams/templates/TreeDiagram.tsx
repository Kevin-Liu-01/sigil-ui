"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface TreeDiagramNode {
  id: string;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "highlighted" | "accent" | "muted";
  children?: TreeDiagramNode[];
}

export interface TreeDiagramProps extends HTMLAttributes<HTMLDivElement> {
  root: TreeDiagramNode;
  connector?: "solid" | "dashed";
  compact?: boolean;
}

const nodeVariants: Record<string, string> = {
  default: "border-[var(--s-border)] bg-[var(--s-surface)] text-[var(--s-text)]",
  highlighted: "border-[var(--s-primary)] bg-[var(--s-primary-muted)] text-[var(--s-text)] ring-1 ring-[var(--s-primary)]/20",
  accent: "border-[var(--s-primary)] bg-[var(--s-primary)] text-[var(--s-primary-contrast)]",
  muted: "border-[var(--s-border-muted)] bg-[var(--s-surface)] text-[var(--s-text-muted)]",
};

function RenderNode({ node, connector, compact, depth }: { node: TreeDiagramNode; connector: string; compact: boolean; depth: number }) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-[var(--s-radius-md,0px)] border",
          compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
          "font-medium [&_svg]:size-4",
          nodeVariants[node.variant ?? "default"],
        )}
      >
        {node.icon && <span className="shrink-0">{node.icon}</span>}
        {node.label}
      </div>

      {hasChildren && (
        <>
          <div
            className={cn("w-px h-5", connector === "dashed" ? "border-l border-dashed border-[var(--s-border)]" : "bg-[var(--s-border)]")}
          />
          <div className="flex items-start gap-6">
            {node.children!.map((child, i) => (
              <div key={child.id} className="flex flex-col items-center">
                <div
                  className={cn("w-px h-4", connector === "dashed" ? "border-l border-dashed border-[var(--s-border)]" : "bg-[var(--s-border)]")}
                />
                <RenderNode node={child} connector={connector} compact={compact} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const TreeDiagram = forwardRef<HTMLDivElement, TreeDiagramProps>(
  function TreeDiagram({ root, connector = "solid", compact = false, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="tree-diagram"
        className={cn("flex justify-center overflow-auto p-6", className)}
        {...rest}
      >
        <RenderNode node={root} connector={connector} compact={compact} depth={0} />
      </div>
    );
  },
);
