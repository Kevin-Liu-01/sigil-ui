import type { CSSProperties } from "react";
import {
  PATTERN_COLOR,
  type SigilPatternStyles,
} from "./pattern-engine";
import { STRUCTURAL_LINE_COLOR } from "./grid-helpers";

export type SigilMarginStyles = {
  container: CSSProperties;
  overlay: CSSProperties | null;
};

/** Build one outer margin column using the same pattern and edge contract everywhere. */
export function buildMarginStyle(
  css: SigilPatternStyles | null,
  innerEdge: "Right" | "Left",
  edgeless = false,
  marginBorder?: string,
): SigilMarginStyles {
  const anchorPos = innerEdge === "Right" ? "right top" : "left top";
  const container: CSSProperties = {
    backgroundColor: "var(--s-background)",
    position: "relative",
    overflow: "hidden",
  };
  let overlay: CSSProperties | null = null;

  if (css) {
    if (css.isMask) {
      overlay = {
        position: "absolute",
        inset: 0,
        backgroundColor: PATTERN_COLOR,
        WebkitMaskImage: css.backgroundImage,
        WebkitMaskSize: css.backgroundSize,
        WebkitMaskRepeat: "repeat",
        maskImage: css.backgroundImage,
        maskSize: css.backgroundSize,
        maskRepeat: "repeat",
        WebkitMaskPosition: css.backgroundPosition ?? anchorPos,
        maskPosition: css.backgroundPosition ?? anchorPos,
      };
    } else {
      Object.assign(container, {
        backgroundImage: css.backgroundImage,
        backgroundSize: css.backgroundSize,
        backgroundPosition: css.backgroundPosition ?? anchorPos,
      });
    }
  }

  if (!edgeless || css) {
    const prop = `border${innerEdge}` as keyof CSSProperties;
    Object.assign(container, {
      [prop]:
        marginBorder ??
        `var(--s-margin-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) ${STRUCTURAL_LINE_COLOR})`,
    });
  }

  return { container, overlay };
}
