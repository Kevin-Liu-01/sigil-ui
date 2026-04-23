"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
  icon?: ReactNode;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  data: TreeNode[];
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(function TreeView(
  { data, defaultExpanded = [], onSelect, selectedId, className, ...props },
  ref,
) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      ref={ref}
      data-slot="tree-view"
      role="tree"
      className={cn("text-sm", className)}
      {...props}
    >
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          toggle={toggle}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
});

function TreeItem({
  node,
  level,
  expanded,
  toggle,
  onSelect,
  selectedId,
}: {
  node: TreeNode;
  level: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  onSelect?: (id: string) => void;
  selectedId?: string;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <button
        type="button"
        onClick={() => {
          if (hasChildren) toggle(node.id);
          onSelect?.(node.id);
        }}
        data-state={isSelected ? "selected" : undefined}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-[var(--s-radius-sm,4px)] px-2 py-1",
          "text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
          isSelected && "bg-[var(--s-surface)] font-medium",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={cn(
              "shrink-0 text-[var(--s-text-muted)] transition-transform duration-[var(--s-duration-fast,150ms)]",
              isExpanded && "rotate-90",
            )}
            aria-hidden
          >
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {!hasChildren && <span className="w-3.5 shrink-0" />}
        {node.icon && <span className="shrink-0 [&>svg]:size-4 text-[var(--s-text-muted)]">{node.icon}</span>}
        <span className="truncate">{node.label}</span>
      </button>

      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              toggle={toggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
