"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../utils";

export type ShapeVariant = "diamond" | "hexagon" | "triangle" | "circle" | "cross" | "pill";
export type ShapeSize = "sm" | "md" | "lg" | "xl";

export interface ShapeProps extends SVGAttributes<SVGSVGElement> {
  /** Shape type. @default "diamond" */
  variant?: ShapeVariant;
  /** Size. @default "md" */
  size?: ShapeSize;
  /** Fill the shape with color. */
  filled?: boolean;
  /** Custom stroke width. @default 1.5 */
  strokeWidth?: number;
}

const sizes: Record<ShapeSize, number> = { sm: 16, md: 24, lg: 32, xl: 48 };

const shapePaths: Record<ShapeVariant, (s: number) => string> = {
  diamond: (s) => {
    const h = s / 2;
    return `M${h},1 L${s - 1},${h} L${h},${s - 1} L1,${h} Z`;
  },
  hexagon: (s) => {
    const h = s / 2;
    const q = s / 4;
    return `M${q},1 L${s - q},1 L${s - 1},${h} L${s - q},${s - 1} L${q},${s - 1} L1,${h} Z`;
  },
  triangle: (s) => {
    const h = s / 2;
    return `M${h},2 L${s - 2},${s - 2} L2,${s - 2} Z`;
  },
  circle: (s) => {
    const h = s / 2;
    const r = h - 1;
    return `M${h},${h - r} A${r},${r} 0 1,1 ${h},${h + r} A${r},${r} 0 1,1 ${h},${h - r} Z`;
  },
  cross: (s) => {
    const h = s / 2;
    return `M${h},2 V${s - 2} M2,${h} H${s - 2}`;
  },
  pill: (s) => {
    const h = s / 2;
    const r = h - 2;
    return `M${h},2 L${s - 2},2 A${r},${r} 0 0,1 ${s - 2},${s - 2} L2,${s - 2} A${r},${r} 0 0,1 2,2 Z`;
  },
};

/** Generic SVG shape component with multiple variants. */
export const Shape = forwardRef<SVGSVGElement, ShapeProps>(function Shape(
  { variant = "diamond", size = "md", filled = false, strokeWidth = 1.5, className, ...rest },
  ref,
) {
  const s = sizes[size];
  const d = shapePaths[variant](s);
  const isCross = variant === "cross";

  return (
    <svg
      ref={ref}
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill={filled && !isCross ? "var(--s-primary)" : "none"}
      stroke="var(--s-primary)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
      {...rest}
    >
      <path d={d} />
    </svg>
  );
});
