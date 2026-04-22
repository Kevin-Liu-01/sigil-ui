"use client";

import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Horizontal padding / gutter. @default "md" */
  gutter?: "none" | "sm" | "md" | "lg";
  /** Max width constraint. */
  maxWidth?: string;
  /** Render as a different element. @default "section" */
  as?: ElementType;
  children?: ReactNode;
}

const gutterMap: Record<string, string> = {
  none: "px-0",
  sm: "px-4",
  md: "px-6 md:px-8",
  lg: "px-8 md:px-12 lg:px-16",
};

/** Page section wrapper with configurable gutters and max-width centering. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { gutter = "md", maxWidth, as: Component = "section", className, style, children, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn("w-full mx-auto", gutterMap[gutter], className)}
      style={{ maxWidth: maxWidth ?? "var(--s-content-max, 1200px)", ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
});
