"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type TessellationVariant =
  | "zigzag"
  | "chevron"
  | "wave"
  | "hatching"
  | "crosshatching"
  | "triangleGrid"
  | "diamondGrid";

export type TessellationProps = HTMLAttributes<HTMLDivElement> & {
  /** Pattern variant. @default "zigzag" */
  variant?: TessellationVariant;
  /** Pattern opacity. @default 0.06 */
  opacity?: number;
  /** Scale multiplier on background-size. @default 1 */
  scale?: number;
};

function getTessellationCSS(
  variant: TessellationVariant,
  scale: number,
): React.CSSProperties {
  const color = "var(--s-border)";

  switch (variant) {
    case "zigzag": {
      const s = 48 * scale;
      const offset = -(s / 2);
      return {
        background: [
          `linear-gradient(135deg, ${color} 25%, transparent 25%) ${offset}px 0`,
          `linear-gradient(225deg, ${color} 25%, transparent 25%) ${offset}px 0`,
          `linear-gradient(315deg, ${color} 25%, transparent 25%)`,
          `linear-gradient(45deg, ${color} 25%, transparent 25%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "chevron": {
      const sw = 24 * scale;
      const sh = 48 * scale;
      return {
        background: [
          `linear-gradient(135deg, ${color} 33.33%, transparent 33.33%) 0 0`,
          `linear-gradient(225deg, ${color} 33.33%, transparent 33.33%) 0 0`,
        ].join(", "),
        backgroundSize: `${sw}px ${sh}px`,
      };
    }
    case "wave": {
      const sw = 24 * scale;
      const sh = 48 * scale;
      return {
        background: [
          `radial-gradient(circle at 100% 50%, transparent 20%, ${color} 21%, ${color} 22%, transparent 23%) 0 0`,
          `radial-gradient(circle at 0% 50%, transparent 20%, ${color} 21%, ${color} 22%, transparent 23%) ${sw / 2}px ${sh / 2}px`,
        ].join(", "),
        backgroundSize: `${sw}px ${sh}px`,
      };
    }
    case "hatching": {
      const gap = 5 * scale;
      const line = 1 * scale;
      return {
        background: `repeating-linear-gradient(45deg, transparent, transparent ${gap}px, ${color} ${gap}px, ${color} ${gap + line}px)`,
      };
    }
    case "crosshatching": {
      const gap = 5 * scale;
      const line = 1 * scale;
      return {
        background: [
          `repeating-linear-gradient(45deg, transparent, transparent ${gap}px, ${color} ${gap}px, ${color} ${gap + line}px)`,
          `repeating-linear-gradient(-45deg, transparent, transparent ${gap}px, ${color} ${gap}px, ${color} ${gap + line}px)`,
        ].join(", "),
      };
    }
    case "triangleGrid": {
      const s = 48 * scale;
      const h = 84 * scale;
      return {
        background: [
          `linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color})`,
          `linear-gradient(-60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color})`,
        ].join(", "),
        backgroundSize: `${s}px ${h}px`,
      };
    }
    case "diamondGrid": {
      const s = 36 * scale;
      return {
        background: [
          `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%)`,
          `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
        backgroundPosition: `0 0, ${s / 2}px ${s / 2}px`,
      };
    }
    default:
      return {};
  }
}

/** Geometric tessellation pattern overlay with 7 CSS-only variants. */
export const Tessellation = forwardRef<HTMLDivElement, TessellationProps>(
  function Tessellation(
    { variant = "zigzag", opacity = 0.06, scale = 1, className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="tessellation"
        className={cn("relative w-full h-full pointer-events-none", className)}
        style={{ opacity, ...getTessellationCSS(variant, scale), ...style }}
        aria-hidden
        {...rest}
      />
    );
  },
);
