"use client";

import React, { useEffect, useState, cloneElement } from "react";
import type { ReactElement } from "react";
import { Badge, Button, Card, CardContent, Input, Progress } from "@sigil-ui/components";
import { MarkdownChrome, TokenPreviewGlyph, type TokenPreviewKind } from "./token-visuals";

/* ── Timing ──────────────────────────────────────────────────── */
const CYCLE_MS = 4200;
const STAGGER_MS = 40;
const ANIM_MS = 3400;

/* ── Single uniform stroke preset ────────────────────────────── */
const S = { fill: "none" as const, strokeWidth: 0.25, pathLength: 1 };
const G = { fill: "none" as const, strokeWidth: 0.25, pathLength: 1 };

/* ── Palette aliases (resolved via CSS custom properties) ────── */
const P = "var(--hlf-pri)";
const N = "currentColor";
const M = "var(--hlf-mid)";

type V = ReactElement[];

const VARIANTS: V[] = [
  /* ═══ ORIGINAL VARIANTS — organic circle clusters ═══════════ */

  /* Plus (+), scattered circle clusters */
  [
    <line key="d1" x1={60} y1={4} x2={60} y2={116} stroke={N} {...S} />,
    <line key="d2" x1={4} y1={60} x2={116} y2={60} stroke={N} {...S} />,
    <circle key="a" cx={22} cy={22} r={10} stroke={P} {...S} />,
    <circle key="b" cx={44} cy={22} r={10} stroke={P} {...S} strokeOpacity={0.8} />,
    <circle key="c" cx={22} cy={44} r={10} stroke={P} {...S} strokeOpacity={0.6} />,
    <circle key="d" cx={44} cy={44} r={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={82} cy={26} r={16} stroke={M} {...S} />,
    <circle key="f" cx={100} cy={44} r={6} stroke={M} {...S} />,
    <circle key="g" cx={24} cy={80} r={12} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="h" cx={42} cy={92} r={8} stroke={N} {...S} strokeOpacity={0.6} />,
    <circle key="i" cx={32} cy={108} r={5} stroke={N} {...S} strokeOpacity={0.4} />,
    <circle key="j" cx={90} cy={90} r={22} stroke={P} {...S} />,
  ],

  /* X, mixed shapes in triangular wedges */
  [
    <line key="d1" x1={10} y1={10} x2={110} y2={110} stroke={N} {...S} />,
    <line key="d2" x1={110} y1={10} x2={10} y2={110} stroke={N} {...S} />,
    <rect key="a" x={46} y={14} width={12} height={12} stroke={P} {...S} />,
    <rect key="b" x={62} y={14} width={12} height={12} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect key="c" x={54} y={30} width={12} height={12} stroke={P} {...S} strokeOpacity={0.5} />,
    <rect key="d" x={86} y={50} width={12} height={12} stroke={M} {...S} transform="rotate(45 92 56)" />,
    <rect key="e" x={94} y={62} width={10} height={10} stroke={M} {...S} transform="rotate(45 99 67)" />,
    <polygon key="f" points="60,82 74,90 74,106 60,114 46,106 46,90" stroke={P} {...S} />,
    <polygon key="g" points="60,88 68,93 68,103 60,108 52,103 52,93" stroke={P} {...S} strokeOpacity={0.5} />,
    <polygon key="h" points="30,52 38,66 22,66" stroke={N} {...S} strokeOpacity={0.8} />,
    <polygon key="i" points="18,56 22,64 14,64" stroke={N} {...S} strokeOpacity={0.5} />,
  ],

  /* Slash (/), concentric circles in 2 halves */
  [
    <line key="d1" x1={10} y1={110} x2={110} y2={10} stroke={N} {...S} />,
    <circle key="a" cx={80} cy={20} r={14} stroke={P} {...S} />,
    <circle key="b" cx={80} cy={20} r={20} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="c" cx={100} cy={28} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="d" cx={92} cy={46} r={10} stroke={M} {...S} />,
    <circle key="e" cx={70} cy={38} r={6} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="f" cx={28} cy={82} r={16} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="g" cx={28} cy={82} r={22} stroke={N} {...S} strokeOpacity={0.3} />,
    <circle key="h" cx={46} cy={96} r={9} stroke={P} {...S} />,
    <circle key="i" cx={22} cy={104} r={6} stroke={N} {...S} strokeOpacity={0.5} />,
  ],

  /* Backslash (\), concentric circles in 2 halves */
  [
    <line key="d1" x1={10} y1={10} x2={110} y2={110} stroke={N} {...S} />,
    <circle key="a" cx={22} cy={24} r={10} stroke={P} {...S} />,
    <circle key="b" cx={42} cy={20} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="c" cx={28} cy={44} r={12} stroke={P} {...S} />,
    <circle key="d" cx={28} cy={44} r={17} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="e" cx={50} cy={38} r={5} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="f" cx={90} cy={80} r={18} stroke={P} {...S} />,
    <circle key="g" cx={90} cy={80} r={24} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="h" cx={76} cy={96} r={8} stroke={M} {...S} />,
    <circle key="i" cx={100} cy={102} r={6} stroke={M} {...S} />,
  ],

  /* Y trisection, circles in 3 sectors */
  [
    <line key="d1" x1={60} y1={60} x2={60} y2={4} stroke={N} {...S} />,
    <line key="d2" x1={60} y1={60} x2={11.5} y2={88} stroke={N} {...S} />,
    <line key="d3" x1={60} y1={60} x2={108.5} y2={88} stroke={N} {...S} />,
    <circle key="a" cx={40} cy={20} r={10} stroke={P} {...S} />,
    <circle key="b" cx={40} cy={20} r={15} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="c" cx={80} cy={20} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="d" cx={60} cy={36} r={6} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="e" cx={24} cy={86} r={12} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="f" cx={40} cy={100} r={8} stroke={N} {...S} strokeOpacity={0.5} />,
    <circle key="g" cx={90} cy={82} r={14} stroke={P} {...S} />,
    <circle key="h" cx={90} cy={82} r={20} stroke={P} {...S} strokeOpacity={0.25} />,
    <circle key="i" cx={100} cy={100} r={6} stroke={M} {...S} />,
  ],

  /* 3-column (||), monochrome */
  [
    <line key="d1" x1={40} y1={4} x2={40} y2={116} stroke={N} {...S} />,
    <line key="d2" x1={80} y1={4} x2={80} y2={116} stroke={N} {...S} />,
    <circle key="a" cx={20} cy={28} r={10} stroke={N} {...S} />,
    <circle key="b" cx={20} cy={52} r={8} stroke={N} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={20} cy={90} r={14} stroke={N} {...S} strokeOpacity={0.3} />,
    <circle key="d" cx={60} cy={20} r={12} stroke={N} {...S} strokeOpacity={0.85} />,
    <circle key="e" cx={60} cy={60} r={16} stroke={N} {...S} strokeOpacity={0.45} />,
    <circle key="f" cx={60} cy={60} r={22} stroke={N} {...S} strokeOpacity={0.2} />,
    <circle key="g" cx={60} cy={100} r={8} stroke={N} {...S} strokeOpacity={0.65} />,
    <circle key="h" cx={100} cy={36} r={8} stroke={N} {...S} strokeOpacity={0.6} />,
    <circle key="i" cx={100} cy={76} r={12} stroke={N} {...S} strokeOpacity={0.75} />,
  ],

  /* ═══ GEOMETRIC VARIANTS — circles + squares, tighter ═══════ */

  /* Plus (+) · circle-wrapping-square motif */
  [
    <line key="d1" x1={60} y1={0} x2={60} y2={120} stroke={N} {...S} />,
    <line key="d2" x1={0} y1={60} x2={120} y2={60} stroke={N} {...S} />,
    <circle key="a" cx={37} cy={37} r={16} stroke={P} {...S} />,
    <rect   key="b" x={32} y={32} width={10} height={10} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={37} cy={37} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={77} y={31} width={12} height={12} stroke={M} {...S} transform="rotate(45 83 37)" />,
    <circle key="e" cx={83} cy={37} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="f" cx={37} cy={83} r={13} stroke={N} {...S} strokeOpacity={0.8} />,
    <rect   key="g" x={33} y={79} width={8} height={8} stroke={N} {...S} strokeOpacity={0.35} />,
    <circle key="h" cx={84} cy={84} r={17} stroke={P} {...S} strokeOpacity={0.8} />,
    <circle key="i" cx={84} cy={84} r={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <rect   key="j" x={81} y={81} width={6} height={6} stroke={P} {...S} strokeOpacity={0.2} />,
  ],

  /* X cross · alternating circles and diamonds */
  [
    <line key="d1" x1={6} y1={6} x2={114} y2={114} stroke={N} {...S} />,
    <line key="d2" x1={114} y1={6} x2={6} y2={114} stroke={N} {...S} />,
    <circle key="a" cx={60} cy={28} r={14} stroke={P} {...S} />,
    <rect   key="b" x={56} y={24} width={8} height={8} stroke={P} {...S} strokeOpacity={0.45} />,
    <rect   key="c" x={86} y={54} width={12} height={12} stroke={M} {...S} transform="rotate(45 92 60)" />,
    <circle key="d" cx={92} cy={60} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={60} cy={92} r={14} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={56} y={88} width={8} height={8} stroke={P} {...S} strokeOpacity={0.3} />,
    <rect   key="g" x={22} y={54} width={12} height={12} stroke={M} {...S} strokeOpacity={0.65} transform="rotate(45 28 60)" />,
    <circle key="h" cx={28} cy={60} r={4} stroke={M} {...S} strokeOpacity={0.3} />,
  ],

  /* Slash (/) · inscribed squares in concentric circles */
  [
    <line key="d1" x1={6} y1={114} x2={114} y2={6} stroke={N} {...S} />,
    <circle key="a" cx={42} cy={42} r={17} stroke={P} {...S} />,
    <rect   key="b" x={36} y={36} width={12} height={12} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={42} cy={42} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={26} y={62} width={8} height={8} stroke={M} {...S} />,
    <circle key="e" cx={78} cy={78} r={17} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={72} y={72} width={12} height={12} stroke={P} {...S} strokeOpacity={0.35} />,
    <circle key="g" cx={78} cy={78} r={4} stroke={P} {...S} strokeOpacity={0.18} />,
    <rect   key="h" x={86} y={50} width={8} height={8} stroke={M} {...S} strokeOpacity={0.6} />,
  ],

  /* Backslash (\) · mirrored diamonds across diagonal */
  [
    <line key="d1" x1={6} y1={6} x2={114} y2={114} stroke={N} {...S} />,
    <circle key="a" cx={78} cy={38} r={15} stroke={P} {...S} />,
    <rect   key="b" x={73} y={33} width={10} height={10} stroke={P} {...S} strokeOpacity={0.5} transform="rotate(45 78 38)" />,
    <circle key="c" cx={78} cy={38} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={90} y={50} width={8} height={8} stroke={M} {...S} />,
    <circle key="e" cx={38} cy={78} r={15} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={33} y={73} width={10} height={10} stroke={P} {...S} strokeOpacity={0.35} transform="rotate(45 38 78)" />,
    <circle key="g" cx={38} cy={78} r={4} stroke={P} {...S} strokeOpacity={0.18} />,
    <rect   key="h" x={50} y={90} width={8} height={8} stroke={M} {...S} strokeOpacity={0.6} />,
  ],

  /* Y trisection · 3-fold with mixed shapes */
  [
    <line key="d1" x1={60} y1={60} x2={60} y2={0} stroke={N} {...S} />,
    <line key="d2" x1={60} y1={60} x2={11.5} y2={88} stroke={N} {...S} />,
    <line key="d3" x1={60} y1={60} x2={108.5} y2={88} stroke={N} {...S} />,
    <circle key="a" cx={38} cy={30} r={12} stroke={P} {...S} />,
    <rect   key="b" x={34} y={26} width={8} height={8} stroke={P} {...S} strokeOpacity={0.4} />,
    <rect   key="c" x={76} y={24} width={12} height={12} stroke={M} {...S} transform="rotate(45 82 30)" />,
    <circle key="d" cx={82} cy={30} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={60} cy={92} r={15} stroke={P} {...S} strokeOpacity={0.8} />,
    <rect   key="f" x={55} y={87} width={10} height={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="g" cx={60} cy={92} r={4} stroke={P} {...S} strokeOpacity={0.2} />,
  ],

  /* Three columns (||) · rects and circles stepping */
  [
    <line key="d1" x1={40} y1={0} x2={40} y2={120} stroke={N} {...S} />,
    <line key="d2" x1={80} y1={0} x2={80} y2={120} stroke={N} {...S} />,
    <circle key="a" cx={25} cy={36} r={8} stroke={P} {...S} />,
    <rect   key="b" x={21} y={64} width={8} height={8} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={25} cy={94} r={7} stroke={P} {...S} strokeOpacity={0.35} />,
    <rect   key="d" x={52} y={26} width={16} height={16} stroke={M} {...S} />,
    <circle key="e" cx={60} cy={60} r={13} stroke={M} {...S} strokeOpacity={0.55} />,
    <rect   key="f" x={55} y={86} width={10} height={10} stroke={M} {...S} strokeOpacity={0.3} />,
    <circle key="g" cx={95} cy={44} r={8} stroke={P} {...S} strokeOpacity={0.8} />,
    <rect   key="h" x={91} y={72} width={8} height={8} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="i" cx={95} cy={100} r={6} stroke={P} {...S} strokeOpacity={0.55} />,
  ],
];

type HeroPattern =
  | "fourCircles"
  | "circleRow"
  | "circleColumn"
  | "circleDiamond"
  | "nineDots"
  | "squareTiles"
  | "squareRow"
  | "squareColumn"
  | "steppedSquares"
  | "cornerSquares"
  | "splitSquares"
  | "diamondStack"
  | "diamondCorners"
  | "meetingLines"
  | "chevron"
  | "parallelHatch"
  | "stairLines"
  | "nodePath"
  | "bracketBox";

const HERO_CONFIGS: HeroPattern[][] = [
  ["fourCircles", "squareTiles", "meetingLines", "diamondStack"],
  ["circleDiamond", "steppedSquares", "parallelHatch", "cornerSquares"],
  ["nineDots", "splitSquares", "chevron", "circleRow"],
  ["squareColumn", "circleColumn", "diamondCorners", "bracketBox"],
  ["nodePath", "bracketBox", "fourCircles", "stairLines"],
  ["parallelHatch", "circleDiamond", "squareRow", "meetingLines"],
  ["cornerSquares", "nineDots", "diamondStack", "splitSquares"],
  ["chevron", "squareTiles", "circleColumn", "nodePath"],
  ["squareRow", "meetingLines", "circleRow", "diamondCorners"],
  ["bracketBox", "steppedSquares", "nodePath", "fourCircles"],
  ["circleColumn", "parallelHatch", "cornerSquares", "squareTiles"],
  ["diamondStack", "circleRow", "parallelHatch", "squareColumn"],
  ["splitSquares", "nineDots", "meetingLines", "circleDiamond"],
  ["stairLines", "diamondCorners", "squareRow", "nodePath"],
  ["fourCircles", "bracketBox", "parallelHatch", "steppedSquares"],
  ["splitSquares", "cornerSquares", "circleColumn", "chevron"],
  ["squareTiles", "nodePath", "diamondStack", "nineDots"],
  ["circleRow", "splitSquares", "stairLines", "diamondCorners"],
  ["meetingLines", "squareColumn", "bracketBox", "circleDiamond"],
  ["parallelHatch", "fourCircles", "chevron", "squareRow"],
];

const HERO_CELLS = [
  { x: 18, y: 18, stroke: P, fill: "url(#hlf-hatch-pri)" },
  { x: 66, y: 18, stroke: P, fill: "url(#hlf-hatch-mid)" },
  { x: 18, y: 66, stroke: P, fill: "url(#hlf-hatch-mid-soft)" },
  { x: 66, y: 66, stroke: P, fill: "url(#hlf-hatch-pri-soft)" },
] as const;

const HERO_TOKEN_STEPS = [
  { token: "--s-primary", line: "primary: oklch(0.66 0.18 275)", label: "primary geometry" },
  { token: "--s-border", line: "border: oklch(0.24 0.01 260)", label: "cell outline" },
  { token: "--s-radius-md", line: "radius-md: 8px", label: "component corners" },
  { token: "--s-duration-slow", line: "duration-slow: 600ms", label: "draw timing" },
] as const;

const HERO_CURSOR_STEPS = [
  {
    left: "58%",
    top: "30%",
    select: { left: "43%", top: "16%", width: "22%", height: "24%" },
    settings: { left: "43%", top: "42%" },
    component: "UsageCard",
    preset: "sigil -> forge",
    ...HERO_TOKEN_STEPS[0],
  },
  {
    left: "80%",
    top: "30%",
    select: { left: "68%", top: "16%", width: "24%", height: "24%" },
    settings: { left: "66%", top: "42%" },
    component: "PresetSwatches",
    preset: "forge -> prism",
    ...HERO_TOKEN_STEPS[1],
  },
  {
    left: "69%",
    top: "62%",
    select: { left: "43%", top: "48%", width: "49%", height: "31%" },
    settings: { left: "51%", top: "81%" },
    component: "DatePicker",
    preset: "prism -> sigil",
    ...HERO_TOKEN_STEPS[2],
  },
  {
    left: "76%",
    top: "86%",
    select: { left: "43%", top: "82%", width: "49%", height: "12%" },
    settings: { left: "44%", top: "70%" },
    component: "TokenAction",
    preset: "saved",
    ...HERO_TOKEN_STEPS[3],
  },
] as const;

const HERO_VARIANTS: V[] = HERO_CONFIGS.map((config, variantIdx) =>
  config.flatMap((pattern, cellIdx) => {
    const cell = HERO_CELLS[cellIdx];
    const cx = cell.x + 18;
    const cy = cell.y + 18;
    return renderHeroPattern(pattern, cell, `${variantIdx}-${cellIdx}`).map((el, elementIdx) =>
      cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, {
        key: `${variantIdx}-${cellIdx}-${elementIdx}`,
        transform: `translate(${cx} ${cy}) scale(1.34) translate(${-cx} ${-cy})`,
      }),
    );
  }),
);

const HERO_BLUEPRINT: V = [
  <line key="grid-v1" x1={24} y1={12} x2={24} y2={108} stroke={P} {...G} strokeOpacity={0.22} />,
  <line key="grid-v2" x1={60} y1={8} x2={60} y2={112} stroke={P} {...G} strokeOpacity={0.42} />,
  <line key="grid-v3" x1={96} y1={12} x2={96} y2={108} stroke={P} {...G} strokeOpacity={0.22} />,
  <line key="grid-h1" x1={12} y1={24} x2={108} y2={24} stroke={P} {...G} strokeOpacity={0.22} />,
  <line key="grid-h2" x1={8} y1={60} x2={112} y2={60} stroke={P} {...G} strokeOpacity={0.42} />,
  <line key="grid-h3" x1={12} y1={96} x2={108} y2={96} stroke={P} {...G} strokeOpacity={0.22} />,
  <rect key="guide-nw" x={15} y={15} width={42} height={42} stroke={P} {...G} fill="url(#hlf-hatch-neutral)" strokeOpacity={0.58} />,
  <rect key="guide-ne" x={63} y={15} width={42} height={42} stroke={P} {...G} fill="url(#hlf-hatch-neutral)" strokeOpacity={0.58} />,
  <rect key="guide-sw" x={15} y={63} width={42} height={42} stroke={P} {...G} fill="url(#hlf-hatch-neutral)" strokeOpacity={0.58} />,
  <rect key="guide-se" x={63} y={63} width={42} height={42} stroke={P} {...G} fill="url(#hlf-hatch-neutral)" strokeOpacity={0.58} />,
];

const HERO_COMPONENT_DRAWING: V = [
  <rect key="shell" x={38} y={14} width={74} height={92} rx={3} stroke={P} {...S} fill="url(#hlf-hatch-neutral)" strokeOpacity={0.78} />,
  <line key="shell-head" x1={38} y1={28} x2={112} y2={28} stroke={P} {...G} strokeOpacity={0.54} />,
  <line key="shell-side" x1={54} y1={28} x2={54} y2={106} stroke={P} {...G} strokeOpacity={0.42} />,
  <circle key="dot-a" cx={44} cy={21} r={1.8} stroke={P} {...S} strokeOpacity={0.7} />,
  <circle key="dot-b" cx={50} cy={21} r={1.8} stroke={P} {...S} strokeOpacity={0.5} />,
  <rect key="nav-1" x={43} y={36} width={6} height={6} stroke={P} {...S} fill="url(#hlf-hatch-pri)" strokeOpacity={0.6} />,
  <rect key="nav-2" x={43} y={49} width={6} height={6} stroke={P} {...S} strokeOpacity={0.46} />,
  <rect key="nav-3" x={43} y={62} width={6} height={6} stroke={P} {...S} strokeOpacity={0.46} />,
  <rect key="stat-1" x={60} y={36} width={18} height={18} rx={2} stroke={P} {...S} fill="url(#hlf-hatch-pri-soft)" strokeOpacity={0.72} />,
  <rect key="stat-2" x={84} y={36} width={20} height={18} rx={2} stroke={P} {...S} strokeOpacity={0.58} />,
  <line key="stat-line-1" x1={64} y1={43} x2={73} y2={43} stroke={P} {...G} strokeOpacity={0.55} />,
  <line key="stat-line-2" x1={88} y1={43} x2={99} y2={43} stroke={P} {...G} strokeOpacity={0.44} />,
  <rect key="calendar" x={60} y={61} width={44} height={34} rx={2} stroke={P} {...S} fill="url(#hlf-hatch-mid-soft)" strokeOpacity={0.72} />,
  <line key="cal-head" x1={60} y1={70} x2={104} y2={70} stroke={P} {...G} strokeOpacity={0.5} />,
  <line key="cal-v1" x1={71} y1={70} x2={71} y2={95} stroke={P} {...G} strokeOpacity={0.28} />,
  <line key="cal-v2" x1={82} y1={70} x2={82} y2={95} stroke={P} {...G} strokeOpacity={0.28} />,
  <line key="cal-v3" x1={93} y1={70} x2={93} y2={95} stroke={P} {...G} strokeOpacity={0.28} />,
  <line key="cal-h1" x1={60} y1={78} x2={104} y2={78} stroke={P} {...G} strokeOpacity={0.28} />,
  <line key="cal-h2" x1={60} y1={86} x2={104} y2={86} stroke={P} {...G} strokeOpacity={0.28} />,
  <circle key="cal-active" cx={87.5} cy={82} r={3.5} stroke={P} {...S} fill="url(#hlf-hatch-pri)" strokeOpacity={0.75} />,
  <path key="chart" d="M64 101 L74 94 L82 98 L92 89 L102 92" stroke={P} {...S} strokeOpacity={0.78} />,
  <circle key="chart-node" cx={92} cy={89} r={2.2} stroke={P} {...S} fill="var(--s-background)" strokeOpacity={0.78} />,
  <rect key="input" x={10} y={32} width={33} height={11} rx={2} stroke={P} {...S} fill="url(#hlf-hatch-pri-soft)" strokeOpacity={0.62} />,
  <rect key="button" x={10} y={48} width={26} height={10} rx={2} stroke={P} {...S} strokeOpacity={0.58} />,
  <line key="md-1" x1={12} y1={68} x2={39} y2={68} stroke={P} {...G} strokeOpacity={0.45} />,
  <line key="md-2" x1={12} y1={75} x2={33} y2={75} stroke={P} {...G} strokeOpacity={0.35} />,
  <line key="md-3" x1={12} y1={82} x2={40} y2={82} stroke={P} {...G} strokeOpacity={0.45} />,
];

const DIAGRAM_CODE = `const diagram = {
  grid: "2x2 blueprint cells",
  motion: "stroke-dash draw",
  cells: HERO_CONFIGS[variant],
  fills: ["diagonal", "soft-diagonal"],
};`;

const TOKEN_ROWS: {
  token: string;
  usage: string;
  preview: TokenPreviewKind;
}[] = [
  { token: "--s-primary", usage: "primary geometry + inspect frame", preview: "primary" },
  { token: "--hlf-mid", usage: "mixed secondary geometry", preview: "mid" },
  { token: "--s-text-muted", usage: "blueprint grid + guide strokes", preview: "muted" },
  { token: "--s-background", usage: "inspector surface + control fill", preview: "background" },
  { token: "--s-border", usage: "panel dividers + control outline", preview: "border" },
  { token: "--s-radius-sm", usage: "inspect button corner radius", preview: "radius-sm" },
  { token: "--s-radius-md", usage: "inspector panel corner radius", preview: "radius-md" },
  { token: "--s-duration-fast", usage: "control transition timing", preview: "duration" },
  { token: "--s-font-mono", usage: "code, labels, token names", preview: "mono" },
] as const;

function renderHeroPattern(
  pattern: HeroPattern,
  cell: (typeof HERO_CELLS)[number],
  key: string,
): V {
  const { x, y, stroke, fill } = cell;
  const c = { x: x + 18, y: y + 18 };
  const common = { stroke, ...S };
  const soft = { stroke, ...G };

  switch (pattern) {
    case "fourCircles":
      return [
        <circle key={`${key}-a`} cx={x + 11} cy={y + 11} r={4.6} {...common} strokeOpacity={0.72} />,
        <circle key={`${key}-b`} cx={x + 25} cy={y + 11} r={4.6} {...common} strokeOpacity={0.62} />,
        <circle key={`${key}-c`} cx={x + 11} cy={y + 25} r={4.6} {...common} strokeOpacity={0.62} />,
        <circle key={`${key}-d`} cx={x + 25} cy={y + 25} r={4.6} {...common} strokeOpacity={0.52} />,
      ];
    case "circleRow":
      return [9, 18, 27].map((dx, i) => (
        <circle key={`${key}-${i}`} cx={x + dx} cy={c.y} r={4.2} {...common} strokeOpacity={0.72 - i * 0.1} />
      ));
    case "circleColumn":
      return [9, 18, 27].map((dy, i) => (
        <circle key={`${key}-${i}`} cx={c.x} cy={y + dy} r={4.2} {...common} strokeOpacity={0.72 - i * 0.1} />
      ));
    case "circleDiamond":
      return [
        <circle key={`${key}-n`} cx={c.x} cy={y + 8} r={3.8} {...common} strokeOpacity={0.7} />,
        <circle key={`${key}-e`} cx={x + 28} cy={c.y} r={3.8} {...common} strokeOpacity={0.58} />,
        <circle key={`${key}-s`} cx={c.x} cy={y + 28} r={3.8} {...common} strokeOpacity={0.58} />,
        <circle key={`${key}-w`} cx={x + 8} cy={c.y} r={3.8} {...common} strokeOpacity={0.58} />,
      ];
    case "nineDots":
      return [10, 18, 26].flatMap((dx, col) =>
        [10, 18, 26].map((dy, row) => (
          <circle key={`${key}-${col}-${row}`} cx={x + dx} cy={y + dy} r={1.9} {...common} strokeOpacity={0.5} />
        )),
      );
    case "squareTiles":
      return [
        <rect key={`${key}-a`} x={x + 7} y={y + 7} width={9} height={9} {...common} fill={fill} strokeOpacity={0.62} />,
        <rect key={`${key}-b`} x={x + 20} y={y + 7} width={9} height={9} {...common} fill={fill} strokeOpacity={0.52} />,
        <rect key={`${key}-c`} x={x + 7} y={y + 20} width={9} height={9} {...common} fill={fill} strokeOpacity={0.52} />,
        <rect key={`${key}-d`} x={x + 20} y={y + 20} width={9} height={9} {...common} fill={fill} strokeOpacity={0.44} />,
      ];
    case "squareRow":
      return [7, 17, 27].map((dx, i) => (
        <rect key={`${key}-${i}`} x={x + dx - 4} y={c.y - 4} width={8} height={8} {...common} fill={i === 1 ? fill : "none"} strokeOpacity={0.64 - i * 0.08} />
      ));
    case "squareColumn":
      return [7, 17, 27].map((dy, i) => (
        <rect key={`${key}-${i}`} x={c.x - 4} y={y + dy - 4} width={8} height={8} {...common} fill={i === 1 ? fill : "none"} strokeOpacity={0.64 - i * 0.08} />
      ));
    case "steppedSquares":
      return [
        <rect key={`${key}-a`} x={x + 6} y={y + 6} width={8} height={8} {...common} strokeOpacity={0.6} />,
        <rect key={`${key}-b`} x={x + 14} y={y + 14} width={8} height={8} {...common} fill={fill} strokeOpacity={0.54} />,
        <rect key={`${key}-c`} x={x + 22} y={y + 22} width={8} height={8} {...common} strokeOpacity={0.48} />,
      ];
    case "cornerSquares":
      return [
        <rect key={`${key}-nw`} x={x + 5} y={y + 5} width={7} height={7} {...common} strokeOpacity={0.58} />,
        <rect key={`${key}-ne`} x={x + 24} y={y + 5} width={7} height={7} {...common} strokeOpacity={0.5} />,
        <rect key={`${key}-sw`} x={x + 5} y={y + 24} width={7} height={7} {...common} strokeOpacity={0.5} />,
        <rect key={`${key}-se`} x={x + 24} y={y + 24} width={7} height={7} {...common} fill={fill} strokeOpacity={0.44} />,
      ];
    case "splitSquares":
      return [
        <rect key={`${key}-l`} x={x + 6} y={y + 9} width={11} height={18} {...common} fill={fill} strokeOpacity={0.52} />,
        <rect key={`${key}-r`} x={x + 19} y={y + 9} width={11} height={18} {...common} strokeOpacity={0.52} />,
        <line key={`${key}-joint`} x1={x + 18} y1={y + 9} x2={x + 18} y2={y + 27} {...soft} strokeOpacity={0.34} />,
      ];
    case "diamondStack":
      return [9, 18, 27].map((dy, i) => (
        <polygon key={`${key}-${i}`} points={`${c.x},${y + dy - 5} ${c.x + 5},${y + dy} ${c.x},${y + dy + 5} ${c.x - 5},${y + dy}`} {...common} fill={i === 1 ? fill : "none"} strokeOpacity={0.62 - i * 0.08} />
      ));
    case "diamondCorners":
      return [
        <polygon key={`${key}-nw`} points={`${x + 10},${y + 5} ${x + 15},${y + 10} ${x + 10},${y + 15} ${x + 5},${y + 10}`} {...common} strokeOpacity={0.54} />,
        <polygon key={`${key}-ne`} points={`${x + 26},${y + 5} ${x + 31},${y + 10} ${x + 26},${y + 15} ${x + 21},${y + 10}`} {...common} fill={fill} strokeOpacity={0.46} />,
        <polygon key={`${key}-sw`} points={`${x + 10},${y + 21} ${x + 15},${y + 26} ${x + 10},${y + 31} ${x + 5},${y + 26}`} {...common} fill={fill} strokeOpacity={0.46} />,
        <polygon key={`${key}-se`} points={`${x + 26},${y + 21} ${x + 31},${y + 26} ${x + 26},${y + 31} ${x + 21},${y + 26}`} {...common} strokeOpacity={0.4} />,
      ];
    case "meetingLines":
      return [
        <line key={`${key}-a`} x1={x + 7} y1={y + 7} x2={c.x} y2={c.y} {...common} strokeOpacity={0.54} />,
        <line key={`${key}-b`} x1={x + 29} y1={y + 7} x2={c.x} y2={c.y} {...common} strokeOpacity={0.5} />,
        <line key={`${key}-c`} x1={c.x} y1={c.y} x2={x + 7} y2={y + 29} {...common} strokeOpacity={0.5} />,
        <line key={`${key}-d`} x1={c.x} y1={c.y} x2={x + 29} y2={y + 29} {...common} strokeOpacity={0.46} />,
        <circle key={`${key}-node`} cx={c.x} cy={c.y} r={2.4} {...common} strokeOpacity={0.44} />,
      ];
    case "chevron":
      return [
        <polyline key={`${key}-a`} points={`${x + 8},${y + 12} ${c.x},${y + 6} ${x + 28},${y + 12}`} {...common} strokeOpacity={0.54} />,
        <polyline key={`${key}-b`} points={`${x + 8},${y + 22} ${c.x},${y + 16} ${x + 28},${y + 22}`} {...common} strokeOpacity={0.46} />,
        <polyline key={`${key}-c`} points={`${x + 8},${y + 32} ${c.x},${y + 26} ${x + 28},${y + 32}`} {...common} strokeOpacity={0.38} />,
      ];
    case "parallelHatch":
      return [0, 1, 2, 3].map((i) => (
        <line key={`${key}-${i}`} x1={x + 7 + i * 6} y1={y + 29} x2={x + 17 + i * 6} y2={y + 7} {...common} strokeOpacity={0.46 - i * 0.04} />
      ));
    case "stairLines":
      return [
        <polyline key={`${key}-a`} points={`${x + 7},${y + 28} ${x + 15},${y + 28} ${x + 15},${y + 20} ${x + 23},${y + 20} ${x + 23},${y + 12} ${x + 31},${y + 12}`} {...common} strokeOpacity={0.54} />,
        <polyline key={`${key}-b`} points={`${x + 7},${y + 20} ${x + 15},${y + 20} ${x + 15},${y + 12} ${x + 23},${y + 12}`} {...soft} strokeOpacity={0.34} />,
      ];
    case "nodePath":
      return [
        <polyline key={`${key}-path`} points={`${x + 8},${y + 27} ${x + 16},${y + 15} ${x + 25},${y + 22} ${x + 29},${y + 8}`} {...common} strokeOpacity={0.48} />,
        <circle key={`${key}-a`} cx={x + 8} cy={y + 27} r={2.4} {...common} strokeOpacity={0.48} />,
        <circle key={`${key}-b`} cx={x + 16} cy={y + 15} r={2.4} {...common} strokeOpacity={0.48} />,
        <circle key={`${key}-c`} cx={x + 25} cy={y + 22} r={2.4} {...common} strokeOpacity={0.48} />,
        <circle key={`${key}-d`} cx={x + 29} cy={y + 8} r={2.4} {...common} strokeOpacity={0.48} />,
      ];
    case "bracketBox":
      return [
        <path key={`${key}-tl`} d={`M ${x + 8} ${y + 16} V ${y + 8} H ${x + 16}`} {...common} strokeOpacity={0.52} />,
        <path key={`${key}-tr`} d={`M ${x + 20} ${y + 8} H ${x + 28} V ${y + 16}`} {...common} strokeOpacity={0.46} />,
        <path key={`${key}-br`} d={`M ${x + 28} ${y + 20} V ${y + 28} H ${x + 20}`} {...common} strokeOpacity={0.46} />,
        <path key={`${key}-bl`} d={`M ${x + 16} ${y + 28} H ${x + 8} V ${y + 20}`} {...common} strokeOpacity={0.4} />,
        <rect key={`${key}-center`} x={x + 14} y={y + 14} width={8} height={8} {...common} fill={fill} strokeOpacity={0.34} />,
      ];
  }
}

/* ── CSS ─────────────────────────────────────────────────────── */

const STYLE_BLOCK = `
@keyframes hlf-draw {
  0%   { stroke-dashoffset: 1; opacity: 0; }
  4%   { opacity: 1; }
  32%  { stroke-dashoffset: 0; }
  68%  { stroke-dashoffset: 0; }
  96%  { opacity: 1; }
  100% { stroke-dashoffset: -1; opacity: 0; }
}
@keyframes hlf-frame-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes hlf-panel-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hlf-token-rewrite {
  0% { opacity: 0; transform: translateY(4px); filter: blur(2px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.hero-logo-field {
  --hlf-pri: var(--s-primary, oklch(0.55 0.2 275));
  --hlf-mid: color-mix(
    in oklch,
    var(--s-primary, oklch(0.55 0.2 275)) 84%,
    var(--s-text-muted, oklch(0.55 0 0))
  );
}
.hero-logo-field__inspect-frame {
  stroke-dasharray: 432;
  stroke-dashoffset: 432;
  animation: hlf-frame-draw 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero-logo-field__inspector {
  animation: hlf-panel-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-logo-field__token-line {
  animation: hlf-token-rewrite 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
`;

/* ── Shared render helper ────────────────────────────────────── */

function renderVariant(elements: V) {
  return elements.map((el, i) =>
    cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, {
      style: {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `hlf-draw ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${i * STAGGER_MS}ms both`,
      },
    }),
  );
}

/* ── Components ──────────────────────────────────────────────── */

export function HeroLogoField() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [inspected, setInspected] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted || inspected) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_VARIANTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [mounted, inspected]);

  const activeToken = HERO_CURSOR_STEPS[idx % HERO_CURSOR_STEPS.length];
  const cursorLeft = activeToken.left;
  const cursorTop = activeToken.top;

  return (
    <div
      className="hero-logo-field"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <div
        style={{
          position: "absolute",
          right: -32,
          top: "50%",
          transform: "translateY(-50%)",
          width: "min(58vw, 640px)",
          height: "min(48vw, 520px)",
          minWidth: 520,
          minHeight: 460,
          opacity: mounted ? 0.96 : 0,
          color: "var(--s-text-muted)",
          transition: "opacity 600ms ease",
          pointerEvents: "auto",
        }}
      >
        <svg
          key={idx}
          viewBox="-12 -12 144 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <defs>
            <pattern id="hlf-hatch-pri" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
              <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.55" />
            </pattern>
            <pattern id="hlf-hatch-pri-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
              <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.34" />
            </pattern>
            <pattern id="hlf-hatch-mid" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="3" stroke={M} strokeWidth="0.25" opacity="0.5" />
            </pattern>
            <pattern id="hlf-hatch-mid-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="3" stroke={M} strokeWidth="0.25" opacity="0.32" />
            </pattern>
          <pattern id="hlf-hatch-neutral" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={N} strokeWidth="0.25" opacity="0.22" />
          </pattern>
          </defs>

          <g opacity={0.34}>{renderVariant(HERO_COMPONENT_DRAWING)}</g>

          {inspected && (
            <g>
              <rect
                className="hero-logo-field__inspect-frame"
                x={6}
                y={6}
                width={108}
                height={108}
                stroke={P}
                strokeWidth={0.25}
                opacity={0.65}
                fill="none"
              />
              <path d="M 6 18 V 6 H 18" stroke={P} strokeWidth={0.25} opacity={0.5} />
              <path d="M 102 6 H 114 V 18" stroke={P} strokeWidth={0.25} opacity={0.5} />
              <path d="M 114 102 V 114 H 102" stroke={P} strokeWidth={0.25} opacity={0.5} />
              <path d="M 18 114 H 6 V 102" stroke={P} strokeWidth={0.25} opacity={0.5} />
            </g>
          )}
        </svg>

        <div
          style={{
            position: "absolute",
            left: "43%",
            top: "16%",
            width: "49%",
            display: "grid",
            gap: 10,
            pointerEvents: "none",
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <Card
              className="overflow-hidden"
              style={{
                borderColor: "var(--s-primary)",
                background: "color-mix(in oklch, var(--s-background) 92%, transparent)",
              }}
            >
              <CardContent className="p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--s-text-muted)" }}>usage</span>
                  <Badge size="sm" className="text-[8px]">live</Badge>
                </div>
                <div className="font-[family-name:var(--s-font-mono)] text-lg font-bold tabular-nums" style={{ color: "var(--s-text)" }}>12.4k</div>
                <Progress value={72} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card
              className="overflow-hidden"
              style={{
                borderColor: "var(--s-primary)",
                background: "color-mix(in oklch, var(--s-background) 92%, transparent)",
              }}
            >
              <CardContent className="p-3">
                <div className="mb-2 font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--s-text-muted)" }}>
                  preset
                </div>
                <div className="flex gap-1">
                  {["sigil", "onyx", "rune"].map((name, itemIdx) => (
                    <span
                      key={name}
                      style={{
                        width: 18,
                        height: 18,
                        border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-primary)",
                        borderRadius: "var(--s-radius-sm,4px)",
                        background: itemIdx === idx % 3 ? "var(--s-primary)" : "transparent",
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card
            className="overflow-hidden"
            style={{
              borderColor: "var(--s-primary)",
              background: "color-mix(in oklch, var(--s-background) 94%, transparent)",
            }}
          >
            <CardContent className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--s-text-muted)" }}>date picker</span>
                <Badge size="sm" variant="outline" className="text-[8px]">token</Badge>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 21 }, (_, itemIdx) => (
                  <span
                    key={itemIdx}
                    style={{
                      height: 16,
                      border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border-muted, var(--s-border))",
                      borderRadius: "var(--s-radius-sm,4px)",
                      background: itemIdx === 11 ? "var(--s-primary)" : "transparent",
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value="sigil.tokens.md" readOnly className="h-8 text-[10px]" />
            <Button size="sm" className="h-8 px-3 text-[10px]">Apply</Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            ...activeToken.select,
            border: "var(--s-border-thin,1px) dashed var(--s-primary)",
            borderRadius: "var(--s-radius-md,8px)",
            background: "color-mix(in oklch, var(--s-primary) 7%, transparent)",
            transition: "left var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1), top var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1), width var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1), height var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
          }}
        />

        <div
          key={`${activeToken.component}-${activeToken.token}`}
          className="hero-logo-field__token-line"
          style={{
            position: "absolute",
            ...activeToken.settings,
              width: 194,
            border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-primary)",
            borderRadius: "var(--s-radius-md,8px)",
            background: "var(--s-background)",
            boxShadow: "var(--s-shadow-sm, 0 8px 20px rgb(0 0 0 / 0.12))",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border)",
              padding: "7px 9px",
              fontFamily: "var(--s-font-mono)",
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--s-text-muted)",
            }}
          >
            <span>{activeToken.component}</span>
            <span>saved</span>
          </div>
          <div style={{ display: "grid", gap: 4, padding: 9, fontFamily: "var(--s-font-mono)", fontSize: 10 }}>
            <div style={{ color: "var(--s-primary)", fontWeight: 700 }}>{activeToken.token}</div>
            <div style={{ color: "var(--s-text)" }}>{activeToken.line}</div>
            <div style={{ color: "var(--s-text-muted)" }}>preset: {activeToken.preset}</div>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: cursorLeft,
            top: cursorTop,
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "start",
            gap: 8,
            color: "var(--s-primary)",
            transition: "left var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1), top var(--s-duration-slow,600ms) cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
          }}
        >
          <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L18 15L11 16.5L8.5 24L3 3Z" fill="var(--s-background)" stroke="var(--s-primary)" strokeWidth="0.25" />
          </svg>
          <div
            style={{
            minWidth: 138,
              border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-primary)",
              borderRadius: "var(--s-radius-sm,4px)",
              background: "var(--s-background)",
              padding: "6px 8px",
              fontFamily: "var(--s-font-mono)",
              fontSize: 9,
              lineHeight: 1.4,
              boxShadow: "var(--s-shadow-sm, 0 8px 20px rgb(0 0 0 / 0.12))",
            }}
          >
            <div style={{ color: "var(--s-primary)", fontWeight: 700 }}>{activeToken.token}</div>
            <div style={{ color: "var(--s-text-muted)" }}>{activeToken.label}</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 18,
            top: 82,
            width: 230,
            border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border)",
            borderRadius: "var(--s-radius-md,8px)",
            background: "var(--s-background)",
            overflow: "hidden",
            boxShadow: "var(--s-shadow-sm, 0 8px 20px rgb(0 0 0 / 0.12))",
          }}
        >
          <div
            style={{
              borderBottom: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border)",
              padding: "7px 9px",
              fontFamily: "var(--s-font-mono)",
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--s-text-muted)",
            }}
          >
            sigil.tokens.md
          </div>
          <div style={{ padding: "8px 9px", fontFamily: "var(--s-font-mono)", fontSize: 10, lineHeight: 1.7 }}>
            <div style={{ color: "var(--s-text)", fontWeight: 700 }}>## Component Drawer</div>
            <div style={{ color: "var(--s-text-muted)" }}>component: {activeToken.component}</div>
            <div key={activeToken.line} className="hero-logo-field__token-line" style={{ color: "var(--s-primary)" }}>
              {activeToken.line}
            </div>
            <div style={{ color: "var(--s-text-muted)" }}>save: preset.apply()</div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={inspected}
          onClick={() => setInspected((value) => !value)}
          style={{
            position: "absolute",
            left: 20,
            bottom: 22,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 26,
            padding: "0 9px",
            border: "1px solid var(--s-border)",
            borderRadius: "var(--s-radius-sm, 4px)",
            background: "var(--s-background)",
            color: "var(--s-text)",
            fontFamily: "var(--s-font-mono)",
            fontSize: 9,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "border-color var(--s-duration-fast, 150ms), background-color var(--s-duration-fast, 150ms)",
          }}
        >
          <span aria-hidden="true" style={{ width: 5, height: 5, background: "var(--s-primary)" }} />
          {inspected ? "Hide" : "Inspect"}
        </button>

        {inspected && (
          <div
            className="hero-logo-field__inspector"
            style={{
              position: "absolute",
              top: 48,
              right: 64,
              width: 300,
              maxWidth: "calc(100vw - 40px)",
              boxShadow: "var(--s-shadow-md, 0 18px 50px rgb(0 0 0 / 0.18))",
            }}
          >
            <MarkdownChrome title="Blueprint Source" meta="20 variants">
            <pre
              style={{
                margin: 0,
                padding: 10,
                overflow: "auto",
                maxHeight: 96,
                borderBottom: "var(--s-border-thin, 1px) var(--s-border-style, solid) var(--s-border)",
                color: "var(--s-text-muted)",
                fontFamily: "var(--s-font-mono)",
                fontSize: 10,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
              }}
            >
              {DIAGRAM_CODE}
            </pre>
            <div style={{ padding: 10 }}>
              <div
                style={{
                  marginBottom: 7,
                  color: "var(--s-text-muted)",
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Sigil Tokens
              </div>
              <div style={{ display: "grid", gap: 5 }}>
                {TOKEN_ROWS.map(({ token, usage, preview }) => (
                  <div
                    key={token}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "28px 96px 1fr",
                      gap: 8,
                      alignItems: "center",
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 9,
                    }}
                  >
                    <TokenPreviewGlyph kind={preview} />
                    <code style={{ color: "var(--s-primary)" }}>{token}</code>
                    <span style={{ color: "var(--s-text-muted)" }}>{usage}</span>
                  </div>
                ))}
              </div>
            </div>
            </MarkdownChrome>
          </div>
        )}
      </div>
    </div>
  );
}

export function FooterLogo() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % VARIANTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const variant = VARIANTS[idx];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <svg
        key={idx}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        className="hero-logo-field"
        style={{ color: "var(--s-text-muted)" }}
        aria-hidden="true"
      >
        {renderVariant(variant)}
      </svg>
    </>
  );
}

export function FooterQuadrantDiagram() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_VARIANTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <svg
        key={idx}
        viewBox="-12 -12 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-logo-field"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          color: "var(--s-primary)",
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="hlf-hatch-pri" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.55" />
          </pattern>
          <pattern id="hlf-hatch-pri-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.34" />
          </pattern>
          <pattern id="hlf-hatch-mid" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.5" />
          </pattern>
          <pattern id="hlf-hatch-mid-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.32" />
          </pattern>
          <pattern id="hlf-hatch-neutral" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={P} strokeWidth="0.25" opacity="0.22" />
          </pattern>
        </defs>
        <g opacity={0.58}>{renderVariant(HERO_BLUEPRINT)}</g>
        <g opacity={0.95}>{renderVariant(HERO_VARIANTS[idx])}</g>
      </svg>
    </>
  );
}

export function NavbarLogo() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
    >
      <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill="currentColor" />
      <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill="currentColor" />
      <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill="currentColor" />
      <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill="var(--s-primary, #6366f1)" />
    </svg>
  );
}
