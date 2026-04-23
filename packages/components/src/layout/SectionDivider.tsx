"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

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
  /** Pattern opacity. @default 0.08 */
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

const sizeMap: Record<string, string> = {
  xs: "h-4",
  sm: "h-6",
  md: "h-10",
  lg: "h-16",
  xl: "h-24",
};

function getPatternCSS(
  variant: SectionDividerPattern,
  scale: number,
): React.CSSProperties {
  const s = 20 * scale;
  const color = "var(--s-border)";

  switch (variant) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${color} 0.75px, transparent 0.75px)`,
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
    case "crosshatch":
      return {
        backgroundImage: [
          `repeating-linear-gradient(45deg, transparent, transparent ${s / 2 - 0.5}px, ${color} ${s / 2 - 0.5}px, ${color} ${s / 2}px)`,
          `repeating-linear-gradient(-45deg, transparent, transparent ${s / 2 - 0.5}px, ${color} ${s / 2 - 0.5}px, ${color} ${s / 2}px)`,
        ].join(", "),
      };
    case "diamond":
      return {
        backgroundImage: [
          `linear-gradient(45deg, ${color} 12.5%, transparent 12.5%, transparent 87.5%, ${color} 87.5%)`,
          `linear-gradient(-45deg, ${color} 12.5%, transparent 12.5%, transparent 87.5%, ${color} 87.5%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    case "grid":
      return {
        backgroundImage: [
          `repeating-linear-gradient(0deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px)`,
          `repeating-linear-gradient(90deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px)`,
        ].join(", "),
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
      opacity = 0.08,
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
    return (
      <div
        ref={ref}
        data-slot="section-divider"
        role="none"
        aria-hidden
        className={cn(
          "sigil-section-divider relative w-full overflow-hidden",
          sizeMap[size],
          className,
        )}
        style={style}
        {...rest}
      >
        {/* Top border */}
        {showBorders && (
          <div className="absolute inset-x-0 top-0 h-px bg-[var(--s-border)]" />
        )}

        {/* Pattern fill */}
        <div
          className="absolute inset-0"
          style={{ opacity, ...getPatternCSS(pattern, scale) }}
        />

        {/* Horizontal fade mask on edges */}
        {fadeEdges && (
          <>
            <div
              className="absolute inset-y-0 left-0 w-16 z-[1]"
              style={{
                background:
                  "linear-gradient(to right, var(--s-bg, #fff), transparent)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-16 z-[1]"
              style={{
                background:
                  "linear-gradient(to left, var(--s-bg, #fff), transparent)",
              }}
            />
          </>
        )}

        {/* Cross marks at endpoints */}
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

        {/* Center label */}
        {label && (
          <div className="absolute inset-0 flex items-center justify-center z-[2]">
            <span className="px-3 py-0.5 text-xs font-mono text-[var(--s-text-muted)] bg-[var(--s-bg,#fff)]">
              {label}
            </span>
          </div>
        )}

        {/* Bottom border */}
        {showBorders && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--s-border)]" />
        )}
      </div>
    );
  },
);
