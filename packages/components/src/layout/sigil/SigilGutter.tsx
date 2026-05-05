"use client";

import { cn } from "../../utils";
import type { GutterPattern } from "@sigil-ui/tokens";
import {
  getSigilPatternStyles,
  PATTERN_COLOR,
  type PatternSide,
} from "./pattern-engine";
import { DEFAULTS } from "./grid-context";
import { STRUCTURAL_LINE_COLOR } from "./grid-helpers";

export interface SigilGutterProps {
  showGrid?: boolean;
  gridCell?: number;
  pattern?: GutterPattern;
  side?: PatternSide;
  visible?: boolean;
  className?: string;
}

/**
 * The decorative rail flanking each side of `SigilPageGrid`'s content
 * column. Renders a token-driven background pattern + a 1px structural
 * border along the inside edge.
 *
 * When `visible` is false the gutter renders as plain `--s-background`
 * so the `edgeless` mode of `SigilFrame` collapses cleanly.
 */
export function SigilGutter({
  showGrid = true,
  gridCell,
  pattern = "grid",
  side = "left",
  visible = true,
  className,
}: SigilGutterProps) {
  if (!visible) {
    return (
      <div aria-hidden="true" style={{ background: "var(--s-background)" }} />
    );
  }

  const cell = gridCell ?? DEFAULTS.gridCell;
  const patternCss = showGrid ? getSigilPatternStyles(pattern, cell, side) : null;

  if (!patternCss) {
    return (
      <div aria-hidden="true" style={{ background: "var(--s-background)" }} />
    );
  }

  const anchor = side === "right" ? "left top" : "right top";

  return (
    <div
      aria-hidden="true"
      data-slot="sigilpagegrid"
      className={cn("relative overflow-hidden", className)}
      style={{ background: "var(--s-background)" }}
    >
      {/* Pattern fills the full rail width — no CSS border to shrink it */}
      <div
        className="absolute inset-0"
        style={
          patternCss.isMask
            ? {
                backgroundColor: PATTERN_COLOR,
                WebkitMaskImage: patternCss.backgroundImage,
                WebkitMaskSize: patternCss.backgroundSize,
                WebkitMaskRepeat: "repeat",
                maskImage: patternCss.backgroundImage,
                maskSize: patternCss.backgroundSize,
                maskRepeat: "repeat",
                WebkitMaskPosition: patternCss.backgroundPosition ?? anchor,
                maskPosition: patternCss.backgroundPosition ?? anchor,
              }
            : {
                backgroundImage: patternCss.backgroundImage,
                backgroundSize: patternCss.backgroundSize,
                backgroundPosition: patternCss.backgroundPosition ?? anchor,
              }
        }
      />
      {/* Structural border — separate element so it doesn't eat from the pattern area */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          [side === "left" ? "right" : "left"]: 0,
          width: "var(--s-border-width-thin, 1px)",
          background: STRUCTURAL_LINE_COLOR,
          zIndex: 1,
        }}
      />
    </div>
  );
}
