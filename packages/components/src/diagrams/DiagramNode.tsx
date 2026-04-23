"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type DiagramNodeVariant = "default" | "highlighted" | "muted" | "accent";
export type DiagramNodeSize = "sm" | "md" | "lg";

export interface DiagramNodeProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  label: string;
  sublabel?: string;
  variant?: DiagramNodeVariant;
  size?: DiagramNodeSize;
  mono?: boolean;
  badge?: ReactNode;
}

const sizeStyles: Record<DiagramNodeSize, string> = {
  sm: "px-3 py-2 text-xs gap-1.5",
  md: "px-4 py-3 text-sm gap-2",
  lg: "px-5 py-4 text-base gap-2.5",
};

const iconSizes: Record<DiagramNodeSize, string> = {
  sm: "[&_svg]:size-3.5",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-5",
};

const variantStyles: Record<DiagramNodeVariant, string> = {
  default: "border-[var(--s-border)] bg-[var(--s-surface)] text-[var(--s-text)]",
  highlighted: "border-[var(--s-primary)] bg-[var(--s-primary-muted)] text-[var(--s-text)] ring-1 ring-[var(--s-primary)]/20",
  muted: "border-[var(--s-border-muted)] bg-[var(--s-surface)] text-[var(--s-text-muted)]",
  accent: "border-[var(--s-primary)] bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)]",
};

export const DiagramNode = forwardRef<HTMLDivElement, DiagramNodeProps>(
  function DiagramNode({ icon, label, sublabel, variant = "default", size = "md", mono = false, badge, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="diagram-node"
        className={cn(
          "relative inline-flex items-center rounded-[var(--s-radius-md,0px)] border",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          sizeStyles[size],
          variantStyles[variant],
          iconSizes[size],
          mono && "font-[family-name:var(--s-font-mono)]",
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">{label}</span>
          {sublabel && <span className="text-[0.75em] opacity-70 truncate">{sublabel}</span>}
        </div>
        {badge && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] text-[10px] font-bold">
            {badge}
          </span>
        )}
      </div>
    );
  },
);
