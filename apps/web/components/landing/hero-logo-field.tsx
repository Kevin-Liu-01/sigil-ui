"use client";

import React, { useEffect, useState, useRef, useCallback, cloneElement } from "react";
import type { ReactElement } from "react";
import {
  Avatar, AvatarGroup, Badge, Button, Calendar, Card, CardContent, Checkbox,
  CommitGrid, Input, KPI, Meter, Progress, Separator, SparkLine,
  Slider, Stepper, Switch, Tabs, TabsList, TabsTrigger,
  ToggleGroup, ToggleGroupItem,
} from "@sigil-ui/components";
import { MarkdownChrome, TokenPreviewGlyph, type TokenPreviewKind } from "./token-visuals";
import { Palette, RectangleHorizontal, SquareSlash, Clock, Type, Layers, MoveHorizontal, SlidersHorizontal } from "lucide-react";
import { OklchText } from "../oklch-text";

/* ── Timing ──────────────────────────────────────────────────── */
const CYCLE_MS = 4200;
const PHASE_MS = 1050;
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
  { token: "--s-primary", before: "primary: oklch(0.55 0.12 275)", line: "primary: oklch(0.66 0.18 275)", label: "primary geometry" },
  { token: "--s-border", before: "border: oklch(0.20 0.01 260)", line: "border: oklch(0.24 0.01 260)", label: "cell outline" },
  { token: "--s-radius-md", before: "radius-md: 8px", line: "radius-md: 16px", label: "component corners" },
  { token: "--s-duration-slow", before: "duration-slow: 300ms", line: "duration-slow: 600ms", label: "draw timing" },
  { token: "--s-font-display", before: 'font-display: "IBM Plex Sans"', line: 'font-display: "Space Grotesk"', label: "heading typeface" },
  { token: "--s-success", before: "success: oklch(0.60 0.15 145)", line: "success: oklch(0.72 0.19 145)", label: "positive signal" },
  { token: "--s-space-2", before: "space-2: 8px", line: "space-2: 12px", label: "component gap" },
  { token: "--s-shadow-md", before: "shadow-md: 0 4px 12px", line: "shadow-md: 0 8px 24px", label: "card elevation" },
  { token: "--s-accent", before: "accent: oklch(0.60 0.16 250)", line: "accent: oklch(0.70 0.22 190)", label: "chart highlight" },
  { token: "--s-radius-full", before: "radius-full: 9999px", line: "radius-full: 8px", label: "avatar shape" },
  { token: "--s-input-height", before: "input-height: 36px", line: "input-height: 28px", label: "control size" },
  { token: "--s-duration-fast", before: "duration-fast: 150ms", line: "duration-fast: 80ms", label: "micro transition" },
  { token: "--s-font-body", before: 'font-body: "Inter"', line: 'font-body: "DM Sans"', label: "body typeface" },
] as const;

const HERO_CURSOR_STEPS = [
  { component: "UsageCard", ...HERO_TOKEN_STEPS[0] },
  { component: "PresetSwatches", ...HERO_TOKEN_STEPS[1] },
  { component: "DatePicker", ...HERO_TOKEN_STEPS[2] },
  { component: "TokenAction", ...HERO_TOKEN_STEPS[3] },
  { component: "KPI", ...HERO_TOKEN_STEPS[4] },
  { component: "CommitGrid", ...HERO_TOKEN_STEPS[5] },
  { component: "Badges", ...HERO_TOKEN_STEPS[6] },
  { component: "Coverage", ...HERO_TOKEN_STEPS[7] },
  { component: "SparkLine", ...HERO_TOKEN_STEPS[8] },
  { component: "Team", ...HERO_TOKEN_STEPS[9] },
  { component: "Sliders", ...HERO_TOKEN_STEPS[10] },
  { component: "Switches", ...HERO_TOKEN_STEPS[11] },
  { component: "Buttons", ...HERO_TOKEN_STEPS[12] },
] as const;

const TOKEN_SECTIONS: { name: string; icon: React.ElementType; indices: number[] }[] = [
  { name: "Colors", icon: Palette, indices: [0, 5, 8] },
  { name: "Borders", icon: RectangleHorizontal, indices: [1] },
  { name: "Radius", icon: SquareSlash, indices: [2, 9] },
  { name: "Motion", icon: Clock, indices: [3, 11] },
  { name: "Typography", icon: Type, indices: [4, 12] },
  { name: "Spacing", icon: MoveHorizontal, indices: [6] },
  { name: "Shadows", icon: Layers, indices: [7] },
  { name: "Inputs", icon: SlidersHorizontal, indices: [10] },
];

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
  0% { opacity: 0; transform: translateY(3px); filter: blur(1px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes hlf-type-line {
  0% { clip-path: inset(0 100% 0 0); opacity: 0.4; }
  60% { opacity: 1; }
  100% { clip-path: inset(0 0 0 0); opacity: 1; }
}
@keyframes hlf-apply-style {
  0% { box-shadow: none; filter: none; }
  40% { box-shadow: 0 0 0 1.5px var(--s-primary), 0 0 16px color-mix(in oklch, var(--s-primary) 16%, transparent); filter: brightness(1.03); }
  100% { box-shadow: 0 0 0 1px color-mix(in oklch, var(--s-primary) 28%, transparent); filter: none; }
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
  animation: hlf-token-rewrite 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-logo-field__typed {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: hlf-type-line 700ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
}
.hero-logo-field__apply {
  animation: hlf-apply-style 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-logo-field__line-active {
  background: color-mix(in oklch, var(--s-primary) 10%, transparent);
  border-left: 2px solid color-mix(in oklch, var(--s-primary) 70%, transparent);
  margin-left: -8px;
  padding-left: 6px;
  transition: background-color 300ms, border-color 300ms;
}
.hero-logo-field__line-done {
  border-left: 2px solid color-mix(in oklch, var(--s-primary) 30%, transparent);
  margin-left: -8px;
  padding-left: 6px;
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

const STEP_KEYS = [
  "UsageCard", "PresetSwatches", "DatePicker", "TokenAction",
  "KPI", "CommitGrid", "Badges", "Coverage",
  "SparkLine", "Team", "Sliders", "Switches", "Buttons",
] as const;

const TOTAL_STEPS = 13;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const COMMIT_DAYS = (() => {
  const days: { date: string; count: number }[] = [];
  const rand = seededRandom(42);
  const base = new Date(Date.UTC(2026, 2, 1));
  for (let i = 48; i >= 0; i--) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() + (49 - i));
    days.push({ date: d.toISOString().split("T")[0], count: Math.floor(rand() * 7 * (1 + Math.sin(i / 4))) });
  }
  return days;
})();

export function HeroLogoField() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [appliedSet, setAppliedSet] = useState<Set<string>>(new Set());
  const appliedQueue = useRef<string[]>([]);
  const [formats, setFormats] = useState<string[]>(["bold"]);

  const containerRef = useRef<HTMLDivElement>(null);
  const mdScrollRef = useRef<HTMLDivElement>(null);
  const componentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selRect, setSelRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const setComponentRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    componentRefs.current[key] = el;
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setPhase((current) => {
        if (current >= 3) {
          const currentKey = STEP_KEYS[idx % STEP_KEYS.length];
          appliedQueue.current = [...appliedQueue.current.filter((k) => k !== currentKey), currentKey];
          setAppliedSet(new Set(appliedQueue.current));
          const nextIdx = idx + 1;
          if (nextIdx >= STEP_KEYS.length) {
            setTimeout(() => {
              appliedQueue.current = [];
              setAppliedSet(new Set());
              setIdx(0);
            }, 1200);
          } else {
            setIdx(nextIdx);
          }
          return 0;
        }
        return current + 1;
      });
    }, PHASE_MS);
    return () => clearInterval(interval);
  }, [mounted, idx]);

  useEffect(() => {
    const container = containerRef.current;
    const target = componentRefs.current[STEP_KEYS[idx % STEP_KEYS.length]];
    if (!container || !target) return;
    if (phase < 1) return;
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const pad = 6;
    setSelRect({
      top: tRect.top - cRect.top - pad,
      left: tRect.left - cRect.left - pad,
      width: tRect.width + pad * 2,
      height: tRect.height + pad * 2,
    });
  }, [idx, phase]);

  useEffect(() => {
    const container = mdScrollRef.current;
    if (!container) return;
    const activeLine = container.querySelector("[data-active-token]") as HTMLElement | null;
    if (activeLine) {
      const lineTop = activeLine.offsetTop - container.offsetTop;
      const lineBottom = lineTop + activeLine.offsetHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;
      if (lineTop < viewTop) {
        container.scrollTop = lineTop - 4;
      } else if (lineBottom > viewBottom) {
        container.scrollTop = lineBottom - container.clientHeight + 4;
      }
    }
  }, [idx]);

  const activeStepIndex = idx % STEP_KEYS.length;
  const activeToken = HERO_CURSOR_STEPS[activeStepIndex];
  const activeComponent = activeToken.component;
  const isSelecting = phase >= 1;
  const isTyping = phase >= 2;
  const isApplied = phase >= 3;

  const applied = (name: string) => appliedSet.has(name) || (activeComponent === name && isApplied);
  const radiusApplied = applied("DatePicker") || (activeComponent === "DatePicker" && isTyping);

  const containerHeight = containerRef.current?.clientHeight ?? 0;
  const containerWidth = containerRef.current?.clientWidth ?? 0;
  const flipLabel = selRect ? (selRect.top + selRect.height + 36) > containerHeight : false;
  const anchorLabelRight = selRect ? (selRect.left + selRect.width > containerWidth * 0.55) : false;

  const mono9: React.CSSProperties = { fontFamily: "var(--s-font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase" };
  const mono10: React.CSSProperties = { fontFamily: "var(--s-font-mono)", fontSize: 10, lineHeight: 1.62 };
  const cellBg = "var(--s-surface, var(--s-background))";

  return (
    <div
      className="hero-logo-field"
      style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", zIndex: 0 }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />

      <div
        ref={containerRef}
        className="grid"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          marginTop: 20,
          width: "min(54vw, 580px)",
          minWidth: 480,
          opacity: mounted ? 1 : 0,
          transition: "opacity 600ms ease",
          pointerEvents: "auto",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto auto auto auto 1fr 1fr",
          gap: 5,
        }}
      >
        {/* Row 1: sigil.tokens.md (3 cols) + UsageCard (2) + PresetSwatches (2) */}
        <div
          className="row-span-3"
          style={{
            gridColumn: "1 / 4",
            border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border-strong, var(--s-border))",
            borderRadius: "var(--s-radius-md,8px)",
            background: "var(--s-surface, var(--s-background))",
            overflow: "hidden",
            boxShadow: "var(--s-shadow-md, 0 2px 8px rgb(0 0 0 / 0.08))",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ ...mono9, borderBottom: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border)", padding: "3px 8px", color: "var(--s-text)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--s-surface-elevated, var(--s-surface))", flexShrink: 0 }}>
            <span style={{ fontWeight: 700 }}>sigil.tokens.md</span>
            <span style={{ fontSize: 8, color: "var(--s-text-muted)" }}>{appliedSet.size}/{STEP_KEYS.length}</span>
          </div>
          <div ref={mdScrollRef} style={{ ...mono10, padding: "4px 8px", fontSize: 8, lineHeight: 1.4, overflow: "auto", flex: 1, minHeight: 0 }}>
            {TOKEN_SECTIONS.map((section, si) => {
              const Icon = section.icon;
              return (
                <React.Fragment key={section.name}>
                  <div style={{ color: "var(--s-text)", fontWeight: 700, marginTop: si > 0 ? 1 : 0, fontSize: 8 }}>
                    {section.name}
                  </div>
                  {section.indices.map((stepIdx) => {
                    const t = HERO_TOKEN_STEPS[stepIdx];
                    const step = HERO_CURSOR_STEPS[stepIdx];
                    const isActive = activeToken.token === t.token;
                    const isDone = applied(step.component);
                    return (
                      <div
                        key={t.token}
                        {...(isActive ? { "data-active-token": true } : {})}
                        className={isActive ? "hero-logo-field__line-active" : isDone ? "hero-logo-field__line-done" : undefined}
                        style={{ color: isActive ? "var(--s-primary)" : isDone ? "var(--s-text)" : "var(--s-text-muted)", transition: "color 300ms", paddingLeft: 11, display: "flex", alignItems: "center", gap: 3 }}
                      >
                        <Icon size={7} style={{ opacity: 0.4, flexShrink: 0 }} />
                        <OklchText>{isActive ? t.line : isDone ? t.line : t.before}</OklchText>
                        {isDone && !isActive ? " ✓" : ""}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
            <div style={{
              borderTop: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border)",
              paddingTop: 3,
              marginTop: 3,
              fontSize: 7,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "var(--s-text-muted)",
              opacity: 0.6,
            }}>
              <span>{isApplied ? "✓ applied" : isSelecting ? activeToken.token : "idle"}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{appliedSet.size}/{STEP_KEYS.length}</span>
            </div>
          </div>
        </div>

        <div ref={setComponentRef("UsageCard")} style={{ gridColumn: "4 / 6" }}>
          <Card
            className={`overflow-hidden h-full ${applied("UsageCard") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("UsageCard") ? "var(--s-primary)" : "var(--s-border)",
              background: applied("UsageCard") ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface, var(--s-background)))" : cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5">
              <div className="mb-1 flex items-center justify-between">
                <span style={{ ...mono9, color: "var(--s-text-muted)" }}>usage</span>
                <Badge size="sm" className="text-[7px]" style={applied("UsageCard") ? { background: "oklch(0.66 0.18 275)", borderColor: "oklch(0.66 0.18 275)" } : undefined}>live</Badge>
              </div>
              <div className="font-[family-name:var(--s-font-mono)] text-base font-bold tabular-nums" style={{ color: applied("UsageCard") ? "oklch(0.66 0.18 275)" : "var(--s-text)", transition: "color 600ms" }}>12.4k</div>
              <Progress value={applied("UsageCard") ? 88 : 72} className="mt-1.5 h-1" style={applied("UsageCard") ? { "--progress-color": "oklch(0.66 0.18 275)" } as React.CSSProperties : undefined} />
            </CardContent>
          </Card>
        </div>

        <div ref={setComponentRef("PresetSwatches")} style={{ gridColumn: "6 / 8" }}>
          <Card
            className={`overflow-hidden h-full ${applied("PresetSwatches") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("PresetSwatches") ? "var(--s-primary)" : "var(--s-border)",
              background: applied("PresetSwatches") ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface, var(--s-background)))" : cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5">
              <div className="mb-1" style={{ ...mono9, color: "var(--s-text-muted)" }}>preset</div>
              <div className="flex gap-1">
                {["sigil", "onyx", "rune", "flux", "prism"].map((name, itemIdx) => (
                  <span
                    key={name}
                    style={{
                      width: 16, height: 16,
                      border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-primary)",
                      borderRadius: "var(--s-radius-sm,4px)",
                      background: applied("PresetSwatches")
                        ? itemIdx === 0 ? "var(--s-primary)" : "color-mix(in oklch, var(--s-primary) 12%, transparent)"
                        : itemIdx === activeStepIndex % 3 ? "var(--s-primary)" : "transparent",
                    }}
                  />
                ))}
              </div>
              <div className="flex mt-1 gap-1">
                {["kova", "cobalt", "helix", "hex", "crux"].map((name, itemIdx) => (
                  <span
                    key={name}
                    style={{
                      width: 16, height: 16,
                      border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-primary)",
                      borderRadius: "var(--s-radius-sm,4px)",
                      background: applied("PresetSwatches")
                        ? itemIdx === 0 ? "var(--s-primary)" : "color-mix(in oklch, var(--s-primary) 12%, transparent)"
                        : itemIdx === activeStepIndex % 3 ? "var(--s-primary)" : "transparent",
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: DatePicker spans right 4 cols */}
        <div
          ref={setComponentRef("DatePicker")}
          className={`overflow-hidden ${radiusApplied ? "hero-logo-field__apply" : ""}`}
          style={{
            gridColumn: "4 / 8",
            border: `var(--s-border-thin,1px) var(--s-border-style,solid) ${radiusApplied ? "var(--s-primary)" : "var(--s-border)"}`,
            borderRadius: radiusApplied ? "16px" : "var(--s-radius-md,8px)",
            background: radiusApplied ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface, var(--s-background)))" : cellBg,
            transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms), border-radius var(--s-duration-slow,600ms)",
          }}
        >
          <Calendar
            mode="single"
            selected={new Date()}
            captionLayout="label"
            disableNavigation={false}
            className="p-1 w-full [--cell-size:1rem] [&_table]:w-full [&_table]:text-[8px] [&_table]:table-fixed [&_button]:text-[8px] [&_button]:p-0 [&_button]:h-4 [&_button]:w-full [&_button]:min-w-0 [&_th]:text-[7px] [&_th]:h-4 [&_th]:p-0 [&_td]:p-px [&_.rdp-caption]:text-[8px] [&_.rdp-caption]:py-0 [&_.rdp-caption]:h-5 [&_.rdp-nav]:gap-0 [&_.rdp-nav_button]:h-4 [&_.rdp-nav_button]:w-4 [&_.rdp-nav_button]:p-0 [&_.rdp-head_row]:h-4 [&_.rdp-row]:h-4 [&_.rdp-cell]:p-px [&_.rdp-day]:h-4 [&_.rdp-day]:w-full [&_.rdp-day_selected]:h-4 [&_.rdp-day_selected]:w-full [&_select]:hidden [&_.rdp-dropdown]:hidden [&_.rdp-dropdowns]:hidden"
          />
        </div>

        {/* Row 3: TokenAction spans right 4 cols */}
        <div ref={setComponentRef("TokenAction")} style={{ gridColumn: "4 / 8" }}>
          <div className={`grid grid-cols-[1fr_auto] gap-2 ${applied("TokenAction") ? "hero-logo-field__apply" : ""}`} style={{ transition: `all ${applied("TokenAction") ? "600ms" : "var(--s-duration-slow,300ms)"}` }}>
            <Input
              value="sigil.tokens.md"
              readOnly
              className={`h-7 text-[9px] ${applied("TokenAction") ? "hero-logo-field__typed" : ""}`}
              key={applied("TokenAction") ? "typed" : "idle"}
            />
            <Button size="sm" className="h-7 px-2.5 text-[9px]">{applied("TokenAction") ? "Saved" : "Apply"}</Button>
          </div>
        </div>

        {/* Row 4: KPI + CommitGrid + Badges + Coverage/ToggleGroup */}
        <div ref={setComponentRef("KPI")} className="h-full" style={{ gridColumn: "1 / 2" }}>
          <KPI
            label="ARR"
            value="$7.52m"
            change="+67%"
            trend="up"
            className={`text-[9px] ${applied("KPI") ? "hero-logo-field__apply" : ""}`}
            style={{ fontFamily: applied("KPI") ? '"Space Grotesk", var(--s-font-display)' : undefined }}
          />
        </div>
        <div ref={setComponentRef("CommitGrid")} className="h-full" style={{ gridColumn: "2 / 4" }}>
          <Card
            className={`h-full ${applied("CommitGrid") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("CommitGrid") ? "var(--s-primary)" : "var(--s-border)",
              background: applied("CommitGrid") ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface, var(--s-background)))" : cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2 h-full">
              <CommitGrid data={COMMIT_DAYS} weeks={10} cellSize={10} gap={2} showDayLabels={false} showMonthLabels={false} color={applied("CommitGrid") ? "var(--s-success, #22c55e)" : "var(--s-primary)"} />
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Badges")} className="h-full" style={{ gridColumn: "4 / 5" }}>
          <Card
            className={`h-full ${applied("Badges") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Badges") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2 h-full flex flex-col justify-between" style={{ gap: applied("Badges") ? 8 : 4, transition: "gap var(--s-duration-slow,600ms)" }}>
              <div className="flex items-center gap-1 flex-wrap">
                <Badge size="sm" variant={appliedSet.size >= 4 ? "default" : "outline"} className="text-[7px]">
                  {appliedSet.size >= 4 ? "staged" : "staging"}
                </Badge>
                <Badge size="sm" variant="outline" className="text-[7px]">v2.4</Badge>
              </div>
              <div className="flex items-center gap-1">
                {["us", "eu", "ap"].map((r) => (
                  <Badge key={r} size="sm" variant="outline" className="text-[7px]">{r}</Badge>
                ))}
              </div>
              <Checkbox label="Dark" defaultChecked />
              <Checkbox label="Animate" />
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Coverage")} className="h-full" style={{ gridColumn: "5 / 8" }}>
          <Card
            className={`h-full ${applied("Coverage") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Coverage") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              boxShadow: applied("Coverage") ? "0 8px 24px rgb(0 0 0 / 0.12)" : undefined,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms), box-shadow var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2 h-full flex flex-col">
              <textarea
                value="Design tokens control every visual property. One file configures color, type, spacing, and motion."
                readOnly
                style={{
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  resize: "none",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: formats.includes("mono") ? "var(--s-font-mono)" : "var(--s-font-body, var(--s-font-mono))",
                  fontSize: 9,
                  lineHeight: 1.5,
                  color: "var(--s-text)",
                  fontWeight: formats.includes("bold") ? 700 : 400,
                  fontStyle: formats.includes("italic") ? "italic" : "normal",
                  textDecoration: [formats.includes("underline") && "underline", formats.includes("strikethrough") && "line-through"].filter(Boolean).join(" ") || "none",
                  letterSpacing: formats.includes("tracking") ? "0.08em" : undefined,
                  textTransform: formats.includes("uppercase") ? "uppercase" : undefined,
                  padding: 0,
                }}
              />
              <div className="flex flex-col gap-1 mt-1" style={{ flexShrink: 0 }}>
                <ToggleGroup type="multiple" value={formats} onValueChange={(v) => setFormats(Array.isArray(v) ? v : [v])} className="w-full">
                  <ToggleGroupItem value="bold" size="sm" className="text-[8px] h-5 flex-1 font-bold">B</ToggleGroupItem>
                  <ToggleGroupItem value="italic" size="sm" className="text-[8px] h-5 flex-1 italic">I</ToggleGroupItem>
                  <ToggleGroupItem value="underline" size="sm" className="text-[8px] h-5 flex-1 underline">U</ToggleGroupItem>
                  <ToggleGroupItem value="strikethrough" size="sm" className="text-[8px] h-5 flex-1 line-through">S</ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="multiple" value={formats} onValueChange={(v) => setFormats(Array.isArray(v) ? v : [v])} className="w-full">
                  <ToggleGroupItem value="uppercase" size="sm" className="text-[7px] h-5 flex-1 uppercase">Aa</ToggleGroupItem>
                  <ToggleGroupItem value="tracking" size="sm" className="text-[7px] h-5 flex-1 tracking-widest">T↔</ToggleGroupItem>
                  <ToggleGroupItem value="mono" size="sm" className="text-[7px] h-5 flex-1 font-mono">{'</>'}</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: SparkLine + Team + Sliders + Switches + Buttons */}
        <div ref={setComponentRef("SparkLine")} className="h-full" style={{ gridColumn: "1 / 3" }}>
          <Card
            className={`h-full ${applied("SparkLine") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("SparkLine") ? "var(--s-primary)" : "var(--s-border)",
              background: applied("SparkLine") ? "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface, var(--s-background)))" : cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-0.5 flex-col flex ">
              <div className="mb-1 px-0.5 flex items-center justify-between">
                <span style={{ ...mono9, color: "var(--s-text-muted)" }}>requests / min</span>
                <span className="font-[family-name:var(--s-font-mono)] text-[8px] tabular-nums" style={{ color: "var(--s-text-muted)" }}>p99 12ms</span>
              </div>
              <SparkLine data={[8, 11, 9, 13, 10, 12, 16, 14, 18, 15, 19, 17, 13, 20]} width={200} height={58} filled className="w-full h-full" color={applied("SparkLine") ? "oklch(0.70 0.22 190)" : undefined} />
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Team")} className="h-full" style={{ gridColumn: "3 / 4" }}>
          <Card
            className={`h-full ${applied("Team") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Team") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5">
              <div className="mb-1" style={{ ...mono9, color: "var(--s-text-muted)" }}>team</div>
              <AvatarGroup max={3}>
                <Avatar src="https://github.com/shadcn.png" name="shadcn" size="sm" style={applied("Team") ? { borderRadius: 8 } : undefined} />
                <Avatar src="https://github.com/leerob.png" name="Lee" size="sm" style={applied("Team") ? { borderRadius: 8 } : undefined} />
                <Avatar src="https://github.com/rauchg.png" name="G" size="sm" style={applied("Team") ? { borderRadius: 8 } : undefined} />
              </AvatarGroup>
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Sliders")} className="h-full" style={{ gridColumn: "4 / 5" }}>
          <Card
            className={`h-full ${applied("Sliders") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Sliders") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5 flex flex-col gap-2">
              <div>
                <div className="mb-1" style={{ ...mono9, color: "var(--s-text-muted)" }}>spacing</div>
                <Slider defaultValue={[16]} min={4} max={48} step={4} className="w-full" />
              </div>
              <div>
                <div className="mb-1" style={{ ...mono9, color: "var(--s-text-muted)" }}>radius</div>
                <Slider defaultValue={[8]} min={0} max={24} step={2} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Switches")} className="h-full" style={{ gridColumn: "5 / 6" }}>
          <Card
            className={`h-full ${applied("Switches") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Switches") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--s-font-mono)] text-[8px]" style={{ color: "var(--s-text-muted)" }}>sound</span>
                <Switch checked={applied("UsageCard")} onCheckedChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--s-font-mono)] text-[8px]" style={{ color: "var(--s-text-muted)" }}>motion</span>
                <Switch defaultChecked onCheckedChange={() => {}} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div ref={setComponentRef("Buttons")} className="h-full" style={{ gridColumn: "6 / 8" }}>
          <Card
            className={`h-full ${applied("Buttons") ? "hero-logo-field__apply" : ""}`}
            style={{
              borderColor: applied("Buttons") ? "var(--s-primary)" : "var(--s-border)",
              background: cellBg,
              transition: "background-color var(--s-duration-slow,600ms), border-color var(--s-duration-slow,600ms)",
            }}
          >
            <CardContent className="p-2.5">
              <div className="grid grid-cols-6 gap-1.5" style={{ fontFamily: applied("Buttons") ? '"DM Sans", var(--s-font-body)' : undefined }}>
                <Button size="sm" className="col-span-3 h-6 px-2 text-[8px]">Primary</Button>
                <Button size="sm" variant="outline" className="col-span-3 h-6 px-2 text-[8px]">Outline</Button>
                <Button size="sm" variant="secondary" className="col-span-4 h-6 px-2 text-[8px]">Secondary</Button>
                <Button size="sm" variant="ghost" className="col-span-2 h-6 px-2 text-[8px]">Ghost</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Selection overlay (ref-measured, always rendered) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: selRect?.top ?? 0,
            left: selRect?.left ?? 0,
            width: selRect?.width ?? 0,
            height: selRect?.height ?? 0,
            border: "var(--s-border-thin,1px) dashed color-mix(in oklch, var(--s-primary) 50%, transparent)",
            borderRadius: "var(--s-radius-md,8px)",
            background: "color-mix(in oklch, var(--s-primary) 6%, transparent)",
            opacity: selRect ? 1 : 0,
            transition: "top 600ms cubic-bezier(0.16,1,0.3,1), left 600ms cubic-bezier(0.16,1,0.3,1), width 600ms cubic-bezier(0.16,1,0.3,1), height 600ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease, border-radius 600ms cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            key={`sel-${activeComponent}-${idx}`}
            style={{
              position: "absolute",
              left: "50%",
              transform: `translateX(-50%) ${isSelecting ? "translateY(0)" : "translateY(-4px)"}`,
              ...(flipLabel ? { top: -32 } : { bottom: -32 }),
              padding: "5px 10px",
              background: "var(--s-background)",
              border: "var(--s-border-thin,1px) var(--s-border-style,solid) var(--s-border-interactive, var(--s-primary))",
              borderRadius: "var(--s-radius-sm,4px)",
              boxShadow: "var(--s-shadow-md, 0 4px 12px rgb(0 0 0 / 0.1))",
              fontFamily: "var(--s-font-mono)",
              fontSize: 9,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              width: "max-content",
              maxWidth: selRect
                ? Math.min(selRect.left + selRect.width, containerWidth - selRect.left) * 2
                : undefined,
              overflow: "hidden",
              textOverflow: "ellipsis",
              opacity: selRect ? 1 : 0,
              transition: "opacity 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {!isTyping && (
              <span style={{ color: "var(--s-text-muted)" }}><OklchText>{activeToken.before}</OklchText></span>
            )}
            {isTyping && !isApplied && (
              <>
                <span style={{ color: "var(--s-text-muted)", textDecoration: "line-through", opacity: 0.5 }}><OklchText>{activeToken.before}</OklchText></span>
                <span style={{ color: "var(--s-primary)", marginLeft: 6 }}>&rarr;</span>
                <span className="hero-logo-field__typed" style={{ color: "var(--s-primary)", marginLeft: 6 }}><OklchText>{activeToken.line}</OklchText></span>
              </>
            )}
            {isApplied && (
              <>
                <span style={{ color: "var(--s-primary)" }}><OklchText>{activeToken.line}</OklchText></span>
                <span style={{ color: "var(--s-success, #10b981)", marginLeft: 6 }}>✓</span>
              </>
            )}
          </div>
        </div>

        {/* ── Cursor (always rendered, opacity-driven) ────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: (selRect?.left ?? 0) + (selRect?.width ?? 0) - 10,
            top: (selRect?.top ?? 0) + (selRect?.height ?? 0) - 10,
            opacity: selRect ? 1 : 0,
            color: "var(--s-primary)",
            transition: "left 600ms cubic-bezier(0.16,1,0.3,1), top 600ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
            pointerEvents: "none",
            zIndex: 11,
            filter: "drop-shadow(0 2px 6px color-mix(in oklch, var(--s-primary) 22%, transparent))",
          }}
        >
          <svg width="20" height="26" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L18 15L11 16.5L8.5 24L3 3Z" fill="var(--s-background)" stroke="var(--s-primary)" strokeWidth="1.5" />
          </svg>
        </div>
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

export function FooterComponentDiagram() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <svg
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
          <pattern id="hlf-footer-component-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={P} strokeWidth="0.25" opacity="0.28" />
          </pattern>
          <pattern id="hlf-hatch-neutral" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={P} strokeWidth="0.25" opacity="0.22" />
          </pattern>
          <pattern id="hlf-hatch-pri" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.55" />
          </pattern>
          <pattern id="hlf-hatch-pri-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.34" />
          </pattern>
          <pattern id="hlf-hatch-mid-soft" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={P} strokeWidth="0.25" opacity="0.32" />
          </pattern>
        </defs>
        <rect x={2} y={2} width={116} height={116} stroke={P} {...G} fill="url(#hlf-footer-component-hatch)" strokeOpacity={0.46} />
        <g opacity={0.95}>{renderVariant(HERO_COMPONENT_DRAWING)}</g>
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
