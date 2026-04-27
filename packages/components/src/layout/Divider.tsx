"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import type { GutterPattern } from "@sigil-ui/tokens";
import { cn } from "../utils";
import {
  getSigilPatternStyles,
  usePageGridConfig,
  type SigilPatternStyles,
} from "./SigilPageGrid";

export type DividerPattern = GutterPattern | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider orientation. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Pattern variant filling the divider band. Defaults to the surrounding page grid pattern. */
  pattern?: DividerPattern;
  /** Band thickness. @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Pattern opacity. @default 1 */
  opacity?: number;
  /** Pattern scale multiplier. @default 1 */
  scale?: number;
  /** Show border lines on the band edges. @default true */
  showBorders?: boolean;
  /** Show cross marks at endpoints. @default false */
  showCross?: boolean;
  /** Optional label rendered in the center. */
  label?: ReactNode;
  /** Fade the pattern near the endpoints with a mask. @default true */
  fadeEdges?: boolean;
  /** If true, this is purely decorative (aria-hidden). @default true */
  decorative?: boolean;
}

const sizeMap: Record<NonNullable<DividerProps["size"]>, number> = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 48,
  xl: 96,
};

const COLOR = "var(--s-grid-line-color, var(--s-border-muted))";
const EDGE_FADE = 64;

function getLegacyVerticalPatternCSS(
  cell: number,
  scale: number,
): SigilPatternStyles {
  const s = cell * scale;
  return {
    backgroundImage: `linear-gradient(to right, ${COLOR} 1px, transparent 1px)`,
    backgroundSize: `${s}px 100%`,
  };
}

function resolveDividerPattern(
  pattern: DividerPattern | undefined,
  gridConfig: ReturnType<typeof usePageGridConfig>,
): DividerPattern {
  if (pattern) return pattern;
  if (gridConfig?.marginPattern && gridConfig.marginPattern !== "none") {
    return gridConfig.marginPattern;
  }
  if (gridConfig?.gutterPattern && gridConfig.gutterPattern !== "none") {
    return gridConfig.gutterPattern;
  }
  return "horizontal";
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
        x1="0"
        y1="5"
        x2="10"
        y2="5"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
      <line
        x1="5"
        y1="0"
        x2="5"
        y2="10"
        stroke="var(--s-border)"
        strokeWidth="var(--s-cross-stroke, 1)"
      />
    </svg>
  );
}

function getMaskImage(orientation: NonNullable<DividerProps["orientation"]>) {
  return orientation === "horizontal"
    ? `linear-gradient(to right, transparent 0, black ${EDGE_FADE}px, black calc(100% - ${EDGE_FADE}px), transparent 100%)`
    : `linear-gradient(to bottom, transparent 0, black ${EDGE_FADE}px, black calc(100% - ${EDGE_FADE}px), transparent 100%)`;
}

/** Decorative patterned divider band — horizontal between sections or vertical between panes. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    orientation = "horizontal",
    pattern,
    size = "md",
    scale = 1,
    opacity = 1,
    showBorders = true,
    showCross = false,
    label,
    fadeEdges = true,
    decorative = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const gridConfig = usePageGridConfig();
  const cell = gridConfig?.gridCell ?? 48;
  const thickness = sizeMap[size];
  const maskImage = getMaskImage(orientation);
  const isHorizontal = orientation === "horizontal";
  const resolvedPattern = resolveDividerPattern(pattern, gridConfig);
  const patternCss =
    resolvedPattern === "vertical"
      ? getLegacyVerticalPatternCSS(cell, scale)
      : getSigilPatternStyles(resolvedPattern, cell * scale);
  const legacyPatternOffset = isHorizontal
    ? `${(cell * scale) / 2}px 0`
    : `0 ${(cell * scale) / 2}px`;
  const patternPosition = patternCss?.backgroundPosition
    ?? (resolvedPattern === "vertical" ? legacyPatternOffset : undefined);

  return (
    <div
      ref={ref}
      data-slot="divider"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "sigil-divider relative shrink-0 overflow-hidden",
        isHorizontal ? "w-full" : "h-full",
        className,
      )}
      style={{
        [isHorizontal ? "height" : "width"]: thickness,
        ...style,
      }}
      {...rest}
    >
      {showBorders && (
        <>
          <div
            className={cn(
              "absolute bg-[var(--s-grid-line-color,var(--s-border-muted))]",
              isHorizontal ? "inset-x-0 top-0 h-px" : "inset-y-0 left-0 w-px",
            )}
          />
          <div
            className={cn(
              "absolute bg-[var(--s-grid-line-color,var(--s-border-muted))]",
              isHorizontal ? "inset-x-0 bottom-0 h-px" : "inset-y-0 right-0 w-px",
            )}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          ...(patternCss?.isMask
            ? {
              backgroundColor: COLOR,
              WebkitMaskImage: patternCss.backgroundImage,
              WebkitMaskSize: patternCss.backgroundSize,
              WebkitMaskRepeat: "repeat",
              maskImage: patternCss.backgroundImage,
              maskSize: patternCss.backgroundSize,
              maskRepeat: "repeat",
              ...(patternPosition
                ? {
                  WebkitMaskPosition: patternPosition,
                  maskPosition: patternPosition,
                }
                : {}),
            }
            : {
              backgroundImage: patternCss?.backgroundImage,
              backgroundSize: patternCss?.backgroundSize,
              ...(patternPosition ? { backgroundPosition: patternPosition } : {}),
            }),
          opacity,
          ...(fadeEdges && !patternCss?.isMask
            ? {
              WebkitMaskImage: maskImage,
              maskImage,
            }
            : {}),
        }}
      />

      {showCross && (
        <>
          <div
            className={cn(
              "absolute z-[2]",
              isHorizontal
                ? "left-2 top-1/2 -translate-y-1/2"
                : "left-1/2 top-2 -translate-x-1/2",
            )}
          >
            <CrossMark />
          </div>
          <div
            className={cn(
              "absolute z-[2]",
              isHorizontal
                ? "right-2 top-1/2 -translate-y-1/2"
                : "bottom-2 left-1/2 -translate-x-1/2",
            )}
          >
            <CrossMark />
          </div>
        </>
      )}

      {label && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <span
            className={cn(
              "bg-[var(--s-background)] px-3 py-0.5 text-xs text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)]",
              !isHorizontal && "[writing-mode:vertical-rl]",
            )}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
});
