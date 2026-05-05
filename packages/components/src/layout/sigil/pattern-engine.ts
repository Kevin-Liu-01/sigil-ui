import type { GutterPattern } from "@sigil-ui/tokens";

/**
 * Pattern math for the structural-visibility grid.
 *
 * Pure functions only — no React, no DOM. Each named pattern resolves
 * to a `SigilPatternStyles` descriptor that the gutter / margin / divider
 * components feed into a CSS background-image.
 *
 * `side: "right"` mirrors the pattern horizontally so the inside edge
 * (closest to content) reads symmetrically across both rails.
 */

const STRUCTURAL_LINE_COLOR =
  "var(--s-grid-line-color, var(--s-border-muted))";
const COLOR = STRUCTURAL_LINE_COLOR;

const SVG_STROKE_MASK = "white";

export type PatternSide = "left" | "right";

export type SigilPatternStyles = {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition?: string;
  isMask?: boolean;
};

export const STRUCTURAL_LINE_COLOR_VAR = STRUCTURAL_LINE_COLOR;
export const PATTERN_COLOR = COLOR;

const PATTERN_CELL_SCALE: Partial<Record<GutterPattern, number>> = {
  grid: 0.5,
  dots: 0.5,
  crosshatch: 0.5,
  diagonal: 0.5,
  diamond: 0.5,
  hexagon: 0.5,
  triangle: 0.5,
  zigzag: 0.5,
  checker: 0.5,
  plus: 0.5,
  brick: 0.5,
  wave: 0.5,
};

function buildLineSvg(
  tileW: number,
  tileH: number,
  lines: number[][],
): string {
  const lineEls = lines
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${SVG_STROKE_MASK}' stroke-width='1'/>`,
    )
    .join("");
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${tileW}' height='${tileH}'>${lineEls}</svg>`;
}

function mirrorLinesX(lines: number[][], tileW: number): number[][] {
  return lines.map(([x1, y1, x2, y2]) => [tileW - x1, y1, tileW - x2, y2]);
}

function getHexLines(cell: number): { w: number; h: number; lines: number[][] } {
  const s = Math.round(cell * 0.5);
  const w = Math.round(s * 1.732);
  const tileH = s * 3;
  const halfS = Math.round(s / 2);
  const threeHalfS = Math.round(s * 1.5);
  return {
    w,
    h: tileH,
    lines: [
      [w / 2, 0, w, halfS],
      [w, halfS, w, threeHalfS],
      [w, threeHalfS, w / 2, s * 2],
      [w / 2, s * 2, 0, threeHalfS],
      [0, threeHalfS, 0, halfS],
      [0, halfS, w / 2, 0],
      [w / 2, s * 2, w / 2, tileH],
    ],
  };
}

function getTriangleLines(
  cell: number,
): { w: number; h: number; lines: number[][] } {
  const side = cell;
  const h = Math.round(side * 0.866);
  const half = Math.round(side / 2);
  return {
    w: side,
    h: h * 2,
    lines: [
      [0, 0, side, 0],
      [0, h, side, h],
      [0, h * 2, side, h * 2],
      [0, 0, half, h],
      [half, h, 0, h * 2],
      [half, h, side, h * 2],
      [side, 0, half, h],
    ],
  };
}

function getBrickLines(
  cell: number,
): { w: number; h: number; lines: number[][] } {
  const rowH = Math.round(cell / 2);
  const half = Math.round(cell / 2);
  return {
    w: cell,
    h: rowH * 2,
    lines: [
      [0, rowH, cell, rowH],
      [0, rowH * 2, cell, rowH * 2],
      [0, 0, 0, rowH],
      [half, rowH, half, rowH * 2],
    ],
  };
}

/**
 * Snap a desired period to the largest integer divisor of `cell` that's
 * `<= target`. This guarantees the thin/wide horizontal patterns sum to
 * an exact multiple of `cell`, so they always re-align with the base
 * `cell` grid and no cumulative subpixel drift accumulates over a long
 * scroll. Without this, e.g. `cell=50, target=16.667` gets rasterized
 * as alternating 16/17px tiles whose cumulative position drifts ~2px
 * per 13k px scrolled relative to the 50px margin pattern — visible at
 * the bottom of long pages.
 */
function snapToCellDivisor(cell: number, target: number, min = 2): number {
  const c = Math.max(1, Math.round(cell));
  const t = Math.max(min, Math.floor(target));
  for (let d = t; d >= min; d--) {
    if (c % d === 0) return d;
  }
  return min;
}

/**
 * Resolve a `GutterPattern` name + cell size to a CSS-ready
 * `SigilPatternStyles` descriptor, or `null` for `"none"`.
 *
 * `side` mirrors the pattern across the vertical axis so the
 * inside edge (toward the content) reads as the "anchor" side.
 */
export function getSigilPatternStyles(
  pattern: GutterPattern,
  cell: number,
  side: PatternSide = "left",
): SigilPatternStyles | null {
  const C = COLOR;
  const R = side === "right";
  const scale = PATTERN_CELL_SCALE[pattern] ?? 1;
  const s = Math.max(Math.round(cell * scale), 8);
  switch (pattern) {
    case "grid": {
      // Lines at the END of each tile (bottom-right) so they coincide
      // with the 1px structural border on a `box-sizing: border-box`
      // band of height = grid-cell. A line at the TOP would sit 1px
      // below where bands actually end.
      return {
        backgroundImage: [
          `linear-gradient(${R ? "to right" : "to left"}, ${C} 1px, transparent 1px)`,
          `linear-gradient(to top, ${C} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${C} 1px, transparent 1px)`,
        backgroundSize: `${s}px ${s}px`,
        backgroundPosition: R ? `left ${s / 2}px` : `right ${s / 2}px`,
      };
    case "crosshatch": {
      const a = R ? -45 : 45;
      const b = R ? 45 : -45;
      return {
        backgroundImage: [
          `repeating-linear-gradient(${a}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
          `repeating-linear-gradient(${b}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%",
      };
    }
    case "diagonal": {
      const angle = R ? -45 : 45;
      return {
        backgroundImage: `repeating-linear-gradient(${angle}deg, transparent, transparent ${s - 1}px, ${C} ${s - 1}px, ${C} ${s}px)`,
        backgroundSize: "100% 100%",
      };
    }
    case "diamond": {
      const h = s / 2;
      const a = R ? -45 : 45;
      const b = R ? 45 : -45;
      return {
        backgroundImage: [
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(${b}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${h}px ${h}px`,
      };
    }
    // Horizontal patterns: line at the END of each tile (bottom) so it
    // lines up with the 1px structural border of bands/dividers above.
    // `to top` puts the color stop at the bottom of each tile.
    case "horizontal":
      return {
        backgroundImage: `linear-gradient(to top, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${cell}px`,
      };
    case "horizontal-thin": {
      // Snap to an integer divisor of `cell` so every 3rd-ish thin line
      // lands exactly on a `cell` boundary. Avoids the cumulative drift
      // a literal `cell / 3` (16.667px for cell=50) accumulates from
      // per-tile subpixel rounding over a long scroll.
      const thin = snapToCellDivisor(cell, cell / 3);
      return {
        backgroundImage: `linear-gradient(to top, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${thin}px`,
      };
    }
    case "horizontal-wide": {
      // Integer multiple of an integer cell — already drift-free, but
      // guard against a fractional `cell` with `Math.round`.
      const wide = Math.round(cell) * 3;
      return {
        backgroundImage: `linear-gradient(to top, ${C} 1px, transparent 1px)`,
        backgroundSize: `100% ${wide}px`,
      };
    }
    case "hexagon": {
      const { w, h, lines } = getHexLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "triangle": {
      const { w, h, lines } = getTriangleLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "zigzag": {
      const [a1, a2, a3, a4] = R ? [45, 315, 225, 135] : [135, 225, 315, 45];
      return {
        backgroundImage: [
          `linear-gradient(${a1}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a2}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a3}deg, ${C} 25%, transparent 25%)`,
          `linear-gradient(${a4}deg, ${C} 25%, transparent 25%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "checker": {
      const h = s / 2;
      const a = R ? -45 : 45;
      return {
        backgroundImage: [
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
          `linear-gradient(${a}deg, ${C} 25%, transparent 25%, transparent 75%, ${C} 75%)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
        backgroundPosition: R
          ? `left ${h}px top ${h}px, left top`
          : `right top, right ${h}px top ${h}px`,
      };
    }
    case "plus": {
      const mid = Math.floor(s / 2);
      const dir = R ? "to left" : "to right";
      const vDir = R ? "to top" : "to bottom";
      return {
        backgroundImage: [
          `linear-gradient(${dir}, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
          `linear-gradient(${vDir}, transparent ${mid}px, ${C} ${mid}px, ${C} ${mid + 1}px, transparent ${mid + 1}px)`,
        ].join(", "),
        backgroundSize: `${s}px ${s}px`,
      };
    }
    case "brick": {
      const { w, h, lines } = getBrickLines(s);
      const svg = buildLineSvg(w, h, R ? mirrorLinesX(lines, w) : lines);
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "wave": {
      const w = s;
      const h = s;
      const a = h * 0.35;
      const mid = h / 2;
      const pts: string[] = [];
      const steps = 40;
      const sign = R ? -1 : 1;
      for (let i = 0; i <= steps; i++) {
        const x = R ? w - (i / steps) * w : (i / steps) * w;
        const y = mid + sign * a * Math.sin((i / steps) * Math.PI * 2);
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><path d='${pts.join(" ")}' fill='none' stroke='${SVG_STROKE_MASK}' stroke-width='1'/></svg>`;
      return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${w}px ${h}px`,
        isMask: true,
      };
    }
    case "none":
    default:
      return null;
  }
}
