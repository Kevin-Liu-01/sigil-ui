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
 * Build a `repeating-linear-gradient` background that paints `subdivisions`
 * 1px lines per `cell`-tall block. The gradient itself repeats every `cell`
 * px (an integer length), so each block is recomputed from a clean integer
 * boundary — internal stops at fractional positions like `cell/3` render at
 * the same relative position in every block and never accumulate drift over
 * a long scroll. The bottom-most line lands exactly on the `cell` boundary
 * so it coincides with the parent margin's `horizontal` (period = cell)
 * pattern at every cell line.
 */
function buildSubdividedHorizontal(
  color: string,
  cell: number,
  subdivisions: number,
): { backgroundImage: string; backgroundSize: string } {
  const c = Math.max(1, Math.round(cell));
  const n = Math.max(1, Math.round(subdivisions));
  const stops: string[] = [];
  let prev = 0;
  for (let i = 1; i <= n; i++) {
    // i-th line bottom sits at i*c/n (the n-th line lands exactly on `c`).
    const lineEnd = (i * c) / n;
    const lineStart = lineEnd - 1;
    if (lineStart > prev) {
      stops.push(`transparent ${prev}px`);
      stops.push(`transparent ${lineStart}px`);
    }
    stops.push(`${color} ${lineStart}px`);
    stops.push(`${color} ${lineEnd}px`);
    prev = lineEnd;
  }
  return {
    backgroundImage: `repeating-linear-gradient(to bottom, ${stops.join(", ")})`,
    // `100% ${c}px` keeps the gradient anchored to integer cell boundaries
    // even though `repeating-linear-gradient` already repeats internally —
    // this avoids the engine spreading the pattern across the element.
    backgroundSize: `100% ${c}px`,
  };
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
      // 3 lines per cell — matches the dedalus reticle (which gets 3
      // cleanly because gridCell=48). For cell=50 the inner stops sit at
      // 16.67 / 33.33 (fractional), but `repeating-linear-gradient` repeats
      // the entire 50px block from a clean integer boundary, so each cell
      // renders the same 3 lines at the same relative positions — no
      // cumulative drift, and the bottom line lands exactly on every cell
      // boundary alongside the `horizontal` margin pattern.
      return buildSubdividedHorizontal(C, cell, 3);
    }
    case "horizontal-fine": {
      // 5 lines per cell — denser than `horizontal-thin` for an
      // instrument-ruler feel. Same drift-free repeat strategy: the
      // 5th line lands exactly on every cell boundary.
      return buildSubdividedHorizontal(C, cell, 5);
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
