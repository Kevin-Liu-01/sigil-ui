"use client";

import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Spacing between children — maps to a CSS gap value. */
  gap?: string | number;
  /** Remove all gaps for flush stacking. */
  flush?: boolean;
  /** Stack direction. @default "column" */
  direction?: "row" | "column";
  /** Cross-axis alignment. */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Main-axis justification. */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Render as a different HTML element. @default "div" */
  as?: ElementType;
  children?: ReactNode;
}

const justifyMap: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignMap: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

/** Vertical or horizontal stacking container with configurable gap. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    gap,
    flush = false,
    direction = "column",
    align,
    justify,
    as: Component = "div",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const resolvedGap = flush ? "0px" : typeof gap === "number" ? `${gap}px` : gap;

  return (
    <Component
      ref={ref}
      data-slot="stack"
      className={cn(
        "flex",
        direction === "column" ? "flex-col" : "flex-row",
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      style={{ gap: resolvedGap, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
});
