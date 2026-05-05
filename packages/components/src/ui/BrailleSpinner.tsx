"use client";

import { useEffect, useState } from "react";
import { cn } from "../utils";

export type BrailleSpinnerName =
  | "orbit"
  | "scan"
  | "breathe"
  | "cascade"
  | "helix"
  | "sparkle";

export interface BrailleSpinnerProps {
  /** Animation variant. @default "orbit" */
  name?: BrailleSpinnerName;
  /** Accessible label. @default "Loading" */
  label?: string;
  className?: string;
}

interface SpinnerDef {
  readonly frames: string[];
  readonly interval: number;
}

type Coord = [number, number];

const PERIM: Coord[] = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3], [3, 3], [3, 2],
  [3, 1], [3, 0], [2, 0], [1, 0],
];

function makeGrid(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(false) as boolean[]);
}

function gridToBraille(grid: boolean[][]): string {
  const rows = grid.length;
  const cols = grid[0].length;
  let result = "";
  for (let c = 0; c < cols; c += 2) {
    let code = 0x2800;
    const offsets = [
      [0, 0, 0x01], [1, 0, 0x02], [2, 0, 0x04],
      [0, 1, 0x08], [1, 1, 0x10], [2, 1, 0x20],
      [3, 0, 0x40], [3, 1, 0x80],
    ] as const;
    for (const [r, dc, bit] of offsets) {
      if (r < rows && c + dc < cols && grid[r][c + dc]) {
        code |= bit;
      }
    }
    result += String.fromCharCode(code);
  }
  return result;
}

function frame4x4(dots: Coord[]): string {
  const g = makeGrid(4, 4);
  for (const [r, c] of dots) g[r][c] = true;
  return gridToBraille(g);
}

function buildOrbit(): SpinnerDef {
  const trail = 3;
  return {
    frames: Array.from({ length: PERIM.length }, (_, i) => {
      const dots: Coord[] = [];
      for (let t = 0; t < trail; t++) dots.push(PERIM[(i - t + PERIM.length) % PERIM.length]);
      return frame4x4(dots);
    }),
    interval: 80,
  };
}

function buildScan(): SpinnerDef {
  return {
    frames: Array.from({ length: 4 }, (_, col) =>
      frame4x4([[0, col], [1, col], [2, col], [3, col]]),
    ),
    interval: 100,
  };
}

function buildBreathe(): SpinnerDef {
  const inner: Coord[] = [[1, 1], [1, 2], [2, 1], [2, 2]];
  const ring: Coord[] = [
    [0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3],
    [2, 0], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3],
  ];
  const all: Coord[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) all.push([r, c]);
  const seq = [[], inner, ring, all, ring, inner] as Coord[][];
  return { frames: seq.map((dots) => frame4x4(dots)), interval: 120 };
}

function buildCascade(): SpinnerDef {
  return {
    frames: Array.from({ length: 4 }, (_, row) =>
      frame4x4([[row, 0], [row, 1], [row, 2], [row, 3]]),
    ),
    interval: 80,
  };
}

function buildHelix(): SpinnerDef {
  const frames: string[] = [];
  for (let step = 0; step < 8; step++) {
    const dots: Coord[] = [];
    for (let row = 0; row < 4; row++) dots.push([row, (step + row) % 4]);
    frames.push(frame4x4(dots));
  }
  return { frames, interval: 80 };
}

function buildSparkle(): SpinnerDef {
  const ALL: Coord[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) ALL.push([r, c]);
  const seed = [7, 2, 13, 0, 11, 5, 15, 8, 3, 14, 6, 1, 10, 4, 9, 12];
  const frames: string[] = [];
  for (let step = 0; step < 8; step++) {
    const dots: Coord[] = [];
    for (let i = 0; i < 4; i++) dots.push(ALL[seed[(step * 2 + i) % 16]]);
    frames.push(frame4x4(dots));
  }
  return { frames, interval: 90 };
}

const SPINNERS: Record<BrailleSpinnerName, SpinnerDef> = {
  orbit: buildOrbit(),
  scan: buildScan(),
  breathe: buildBreathe(),
  cascade: buildCascade(),
  helix: buildHelix(),
  sparkle: buildSparkle(),
};

/** Unicode Braille-grid spinner with multiple animation variants. */
export function BrailleSpinner({
  name = "orbit",
  label,
  className,
}: BrailleSpinnerProps) {
  const spinner = SPINNERS[name] ?? SPINNERS.orbit;
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % spinner.frames.length);
    }, spinner.interval);
    return () => clearInterval(id);
  }, [spinner]);

  return (
    <span
      role="status"
      aria-label={label ?? "Loading"}
      data-slot="braille-spinner"
      className={cn("inline-flex items-center gap-2 font-mono", className)}
    >
      <span aria-hidden="true">{spinner.frames[frameIndex]}</span>
      {label ? <span>{label}</span> : null}
    </span>
  );
}
