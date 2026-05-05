import type { CSSProperties } from "react";

/**
 * Shared CSS-string constants and helpers used across the structural
 * grid components. Centralising these here means every consumer of
 * `SigilPageGrid`, `SigilSection`, `SigilGutter`, and `Divider` reads
 * the same `var(--s-*)` chain — no per-component drift.
 */

export const STRUCTURAL_LINE_COLOR =
  "var(--s-grid-line-color, var(--s-border-muted))";

export const STRUCTURAL_BORDER =
  "var(--s-gutter-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";

export const SECTION_BORDER =
  "var(--s-section-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";

export const BORDER_WIDTH = "var(--s-border-width-thin, 1px)";

/**
 * Five-column structural grid used by `SigilPageGrid` and the
 * standalone-mode branch of `SigilSection`:
 *   margin | gutter | content | gutter | margin
 *
 * Returning a `CSSProperties` partial keeps both call sites identical
 * and avoids the historic "two slightly different format strings"
 * drift between the page grid and the section's standalone fallback.
 */
export function buildGridCols(railGap: number, contentMax: number): CSSProperties {
  return {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };
}

/**
 * Split a CSS padding shorthand into [top, right, bottom, left],
 * correctly handling `var(...)` references that contain spaces.
 */
export function splitCssPadding(padding: string): [string, string, string, string] {
  const values: string[] = [];
  let cur = "";
  let depth = 0;
  for (const ch of padding) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === " " && depth === 0) {
      if (cur) values.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur) values.push(cur);

  const t = values[0] ?? "0";
  const r = values[1] ?? t;
  const b = values[2] ?? t;
  const l = values[3] ?? r;
  return [t, r, b, l];
}

/**
 * When a section has a real CSS border, the border adds to the
 * element's auto-height. To keep total vertical space grid-aligned,
 * subtract the border width from the corresponding padding axis so
 * `(padding + border) === original padding`.
 */
export function borderCompensatedPadding(
  padding: string,
  borderTop: boolean,
  borderBottom: boolean,
): CSSProperties {
  const [t, r, b, l] = splitCssPadding(padding);
  return {
    paddingTop: borderTop ? `calc(${t} - ${BORDER_WIDTH})` : t,
    paddingRight: r,
    paddingBottom: borderBottom ? `calc(${b} - ${BORDER_WIDTH})` : b,
    paddingLeft: l,
  };
}
