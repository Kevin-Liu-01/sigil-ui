"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type PatternVariant =
  | "dots"
  | "hatch"
  | "diagonal"
  | "diamond"
  | "hexagon"
  | "triangle"
  | "crosshatch";

export type PatternProps = HTMLAttributes<HTMLDivElement> & {
  /** Pattern type. @default "dots" */
  variant?: PatternVariant;
  /** Pattern opacity. @default 0.1 */
  opacity?: number;
  /** Scale of the pattern. @default 1 */
  scale?: number;
};

function getPatternCSS(variant: PatternVariant, scale: number): React.CSSProperties {
  const s = 20 * scale;
  const color = "var(--s-text)";

  switch (variant) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: `${s}px ${s}px`,
      };
    case "hatch":
      return {
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px)`,
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${s / 2 - 0.5}px, ${color} ${s / 2 - 0.5}px, ${color} ${s / 2}px)`,
      };
    case "diamond":
      return {
        backgroundImage: `
          linear-gradient(45deg, ${color} 12.5%, transparent 12.5%, transparent 87.5%, ${color} 87.5%),
          linear-gradient(-45deg, ${color} 12.5%, transparent 12.5%, transparent 87.5%, ${color} 87.5%)
        `,
        backgroundSize: `${s}px ${s}px`,
      };
    case "hexagon": {
      const h = s * 0.866;
      return {
        backgroundImage: `
          radial-gradient(circle farthest-side at 0% 50%, ${color} 23.5%, transparent 0) ${s / 4}px 0,
          radial-gradient(circle farthest-side at 0% 50%, ${color} 23.5%, transparent 0) ${s * 0.75}px ${h}px
        `,
        backgroundSize: `${s}px ${h * 2}px`,
      };
    }
    case "triangle":
      return {
        backgroundImage: `
          linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%),
          linear-gradient(-60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%)
        `,
        backgroundSize: `${s}px ${s * 1.732}px`,
      };
    case "crosshatch":
      return {
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent ${s / 2 - 0.5}px, ${color} ${s / 2 - 0.5}px, ${color} ${s / 2}px),
          repeating-linear-gradient(-45deg, transparent, transparent ${s / 2 - 0.5}px, ${color} ${s / 2 - 0.5}px, ${color} ${s / 2}px)
        `,
      };
    default:
      return {};
  }
}

/** Background pattern overlay component with multiple SVG-free variants. */
export const Pattern = forwardRef<HTMLDivElement, PatternProps>(function Pattern(
  { variant = "dots", opacity = 0.1, scale = 1, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="pattern"
      className={cn("relative w-full h-full pointer-events-none", className)}
      style={{ opacity, ...getPatternCSS(variant, scale), ...style }}
      aria-hidden
      {...rest}
    />
  );
});
