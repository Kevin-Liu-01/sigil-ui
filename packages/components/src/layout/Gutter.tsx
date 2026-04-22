"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface GutterProps extends HTMLAttributes<HTMLDivElement> {
  /** Gutter height. @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeMap: Record<string, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-16",
  xl: "h-24",
};

/** Vertical gutter spacing component. */
export const Gutter = forwardRef<HTMLDivElement, GutterProps>(function Gutter(
  { size = "md", className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(sizeMap[size], className)} aria-hidden {...rest} />;
});
