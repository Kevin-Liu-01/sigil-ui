import type { CSSProperties } from "react";

/**
 * Shared CSS-string constants and helpers used across the structural
 * grid components. Centralising these here means every consumer of
 * `SigilPageGrid`, `SigilSection`, `SigilGutter`, and `Divider` reads
 * the same `var(--s-*)` chain — no per-component drift.
 */

/**
 * ## Structural Y snap (horizontal lines across the page)
 *
 * **Period:** `G = var(--s-grid-cell)`. Section and divider outer boundaries snap
 * to full-cell intervals from the top of `SigilPageGrid`. Gutter `grid` patterns may
 * draw subdivisions inside each cell, but structural bands start/end on full cells.
 *
 * **Origin:** The top edge of `SigilPageGrid` — margin, gutter, and content columns
 * share the same y=0, so ruler ticks and content bands must stay **phase-locked**
 * when summed from that origin (scroll does not change relative alignment within the
 * page column).
 *
 * **Borders:** Prefer `box-sizing: border-box` on bands. A section border consumes
 * `var(--s-border-width-thin)`; `borderCompensatedPadding()` subtracts that width from
 * padding on the bordered axis so **outer** geometry still advances by an integer
 * multiple of `G` when padding tokens are defined as `calc(N * G)`.
 *
 * **Dividers:** Bordered and unbordered divider outer heights both use exact
 * multiples of `G`; `box-sizing: border-box` keeps the 1px borders inside the band
 * and avoids cumulative `+1px` drift.
 *
 * **Spacing tokens:** Section/hero/footer vertical padding should be authored as
 * `calc(integer * var(--s-grid-cell))` (and sub-multiples `G/2`, `G/3`, `G/4` only
 * for intra-stack gaps), not unrelated `rem`, so horizontal snap persists under zoom.
 *
 * **Avoid `calc(N + 0.5)` multiples of G** for block padding (e.g. `1.5 * G` top +
 * `1.5 * G` bottom): inner section edges then fall between rail lines. Prefer
 * whole-cell multiples (`1 * G`, `2 * G`, …).
 *
 * **Between-section bands:** Use `<Divider size="md" />` for one full structural
 * cell (`--s-divider-thickness-md` = `G` with borders included). Half-cell `sm`
 * breaks cumulative full-cell alignment with gutter rulers.
 */
export const STRUCTURAL_Y_PERIOD = "var(--s-grid-cell)";

export const STRUCTURAL_LINE_COLOR =
  "var(--s-grid-line-color, var(--s-border-muted))";

export const STRUCTURAL_BORDER =
  "var(--s-gutter-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";

export const SECTION_BORDER =
  "var(--s-section-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";

export const BORDER_WIDTH = "var(--s-border-width-thin, 1px)";

/**
 * Resolved pixel height of `var(--s-grid-cell)` — matches gutter/margin tile
 * math under zoom and root font changes better than parsing the raw token string.
 */
export function measureStructuralCellPx(): number {
  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;width:1px;height:var(--s-grid-cell);visibility:hidden;pointer-events:none;margin:0;padding:0;border:0;box-sizing:border-box;";
  document.body.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);
  if (Number.isFinite(h) && h > 0) return h;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--s-grid-cell")
    .trim();
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 48;
}

/**
 * Five-column structural grid used by `SigilPageGrid` and the
 * standalone-mode branch of `SigilSection`:
 *   margin | gutter | content | gutter | margin
 *
 * Returning a `CSSProperties` partial keeps both call sites identical
 * and avoids the historic "two slightly different format strings"
 * drift between the page grid and the section's standalone fallback.
 */
/**
 * Five-column structural grid using the same CSS variables the token compiler
 * emits (`--s-rail-gap`, `--s-content-max`). This keeps rail + content tracks
 * aligned with the structural grid when users zoom, change root font size, or
 * resize — numeric props from JS are not used so we never drift from `:root`.
 */
export function buildGridCols(_railGap?: number, _contentMax?: number): CSSProperties {
  return {
    gridTemplateColumns:
      "1fr var(--s-rail-gap, 50px) minmax(0, var(--s-content-max, 1200px)) var(--s-rail-gap, 50px) 1fr",
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
