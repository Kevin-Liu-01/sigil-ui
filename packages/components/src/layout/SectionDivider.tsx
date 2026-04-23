"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { usePageGridConfig } from "./SigilPageGrid";

export type SectionDividerPattern =
  | "dots"
  | "hatch"
  | "diagonal"
  | "crosshatch"
  | "diamond"
  | "grid";

export interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Pattern variant filling the divider band. @default "dots" */
  pattern?: SectionDividerPattern;
  /** Band height. @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Pattern opacity. @default 0.15 */
  opacity?: number;
  /** Pattern scale multiplier. @default 1 */
  scale?: number;
  /** Show border lines on top and bottom edges. @default true */
  showBorders?: boolean;
  /** Show cross marks at left/right endpoints. @default false */
  showCross?: boolean;
  /** Optional label rendered in the center. */
  label?: ReactNode;
  /** Fade edges with a horizontal gradient mask. @default true */
  fadeEdges?: boolean;
}

const heightMap: Record<string, number> = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 48,
  xl: 96,
};

const COLOR = "var(--s-border-muted)";

function getPatternCSS(
  variant: SectionDividerPattern,
  cell: number,
  scale: number,
): React.CSSProperties {
  const s = cell * scale;
  const C = COLOR;

  switch (variant) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${C} 0.75px, transparent 0.75px)`,
        backgroundSize: `${s}px ${s}px`,
      };
    case "hatch":
      return {
        backgroundImage: `linear-gradient(to bottom, transparent ${s - 1}px, ${C} ${s - 1}px)`,
        backgroundSize: `100% ${s}px`,
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
        backgroundSize: `${Math.round(s * 1.414)}px ${Math.round(s * 1.414)}px`,
      };
    case "crosshatch":
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 0.5px, transparent 0.5px)`,
          `linear-gradient(-45deg, ${C} 0.5px, transparent 0.5px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    case "diamond": {
      const h = s / 2;
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(-45deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${h}px ${h}px`,
      };
    }
    case "grid":
      return {
        backgroundImage: [
          `linear-gradient(to right, ${C} 1px, transparent 1px)`,
          `linear-gradient(to bottom, transparent ${s - 1}px, ${C} ${s - 1}px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    default:
      return {};
  }
}

function CrossMark() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className="shrink-0"
      aria-hidden
    >
      <line
        x1="0" y1="5" x2="10" y2="5"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
      <line
        x1="5" y1="0" x2="5" y2="10"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
    </svg>
  );
}

/** Decorative horizontal band with pattern fill — placed between sections, bentos, or content blocks. */
export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  function SectionDivider(
    {
      pattern = "dots",
      size = "md",
      scale = 1,
      showBorders = true,
      showCross = false,
      label,
      fadeEdges = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const gridConfig = usePageGridConfig();
    const cell = gridConfig?.gridCell ?? 48;

    return (
      <div
        ref={ref}
        data-slot="section-divider"
        role="none"
        aria-hidden
        className={cn(
          "sigil-section-divider relative w-full overflow-hidden",
          className,
        )}
        style={{ height: heightMap[size], ...style }}
        {...rest}
      >
        {showBorders && (
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: COLOR }} />
        )}

        <div
          className="absolute inset-0"
          style={getPatternCSS(pattern, cell, scale)}
        />

        {fadeEdges && (
          <>
            <div
              className="absolute inset-y-0 left-0 w-16 z-[1]"
              style={{
                background:
                  "linear-gradient(to right, var(--s-background, #fff), transparent)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-16 z-[1]"
              style={{
                background:
                  "linear-gradient(to left, var(--s-background, #fff), transparent)",
              }}
            />
          </>
        )}

        {showCross && (
          <>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-[2]">
              <CrossMark />
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[2]">
              <CrossMark />
            </div>
          </>
        )}

        {label && (
          <div className="absolute inset-0 flex items-center justify-center z-[2]">
            <span className="px-3 py-0.5 text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)] bg-[var(--s-background,#fff)]">
              {label}
            </span>
          </div>
        )}

        {showBorders && (
          <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: COLOR }} />
        )}
      </div>
    );
  },
);
