"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type FrostedPanelEdge = "left" | "right" | "top" | "bottom";

export interface FrostedPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Which edge gets a border. @default "left" */
  edge?: FrostedPanelEdge;
  /** Use frosted glass (blur) or solid bg. @default "frosted" */
  variant?: "frosted" | "solid";
  /** Element type. @default "div" */
  as?: "div" | "aside" | "nav" | "header";
}

const edgeBorders: Record<FrostedPanelEdge, string> = {
  left: "border-l border-[color:var(--s-border)]",
  right: "border-r border-[color:var(--s-border)]",
  top: "border-t border-[color:var(--s-border)]",
  bottom: "border-b border-[color:var(--s-border)]",
};

/**
 * Frosted or solid panel with a single border edge.
 *
 * Used for drawers, sidebars, slide-out carts, and sticky navbars.
 * The frosted variant uses `bg/80 + backdrop-blur-lg`, the solid
 * variant uses opaque `var(--s-background)`.
 *
 * ```tsx
 * <FrostedPanel edge="left">Cart sidebar</FrostedPanel>
 * <FrostedPanel edge="bottom" variant="solid" as="nav">Navbar</FrostedPanel>
 * ```
 */
export const FrostedPanel = forwardRef<HTMLDivElement, FrostedPanelProps>(
  function FrostedPanel(
    { edge = "left", variant = "frosted", as: Tag = "div", className, children, ...rest },
    ref,
  ) {
    return (
      <Tag
        ref={ref as any}
        data-slot="frosted-panel"
        className={cn(
          edgeBorders[edge],
          variant === "frosted"
            ? "bg-[var(--s-background)]/80 backdrop-blur-lg"
            : "bg-[var(--s-background)]",
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
