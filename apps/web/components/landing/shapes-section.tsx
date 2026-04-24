"use client";

import React from "react";
import {
  VoronoiBento,
  Diamond,
  Hexagon,
  Triangle,
  Diagonal,
  Shape,
  Box3D,
  MonoLabel,
  DensityText,
  TabularValue,
} from "@sigil-ui/components";
import { TechFrame } from "./tech-frame";

/* ================================================================ */
/* Pattern background helper                                         */
/* ================================================================ */

function patternBg(name: string, color: string, cell: number) {
  const s = cell;
  const mid = Math.floor(s / 2);
  const map: Record<string, { bg: string; size: string; pos?: string }> = {
    grid: {
      bg: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, transparent ${s - 1}px, ${color} ${s - 1}px)`,
      size: `${s}px ${s}px`,
    },
    dots: {
      bg: `radial-gradient(circle, ${color} 1.2px, transparent 1.2px)`,
      size: `${s}px ${s}px`,
      pos: `${s / 2}px ${s / 2}px`,
    },
    crosshatch: {
      bg: `repeating-linear-gradient(45deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px), repeating-linear-gradient(-45deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px)`,
      size: "100% 100%, 100% 100%",
    },
    diagonal: {
      bg: `repeating-linear-gradient(45deg, transparent, transparent ${s - 1}px, ${color} ${s - 1}px, ${color} ${s}px)`,
      size: "100% 100%",
    },
    checker: {
      bg: `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%), linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%)`,
      size: `${s}px ${s}px`,
      pos: `0 0, ${s / 2}px ${s / 2}px`,
    },
    plus: {
      bg: `linear-gradient(to right, transparent ${mid}px, ${color} ${mid}px, ${color} ${mid + 1}px, transparent ${mid + 1}px), linear-gradient(to bottom, transparent ${mid}px, ${color} ${mid}px, ${color} ${mid + 1}px, transparent ${mid + 1}px)`,
      size: `${s}px ${s}px`,
    },
  };
  return map[name] ?? map.grid;
}

/* ================================================================ */
/* Cell content variants                                              */
/* ================================================================ */

function CellShape({
  shape,
  name,
  sub,
  accent,
}: {
  shape: React.ReactNode;
  name: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        background: accent
          ? "linear-gradient(135deg, var(--s-primary), color-mix(in oklch, var(--s-primary) 50%, var(--s-surface)))"
          : "var(--s-surface)",
        padding: 24,
      }}
    >
      <div className="flex items-center justify-center" style={{ minHeight: 52 }}>
        {shape}
      </div>
      <span
        className="font-mono text-center"
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: accent ? "var(--s-primary-contrast, #fff)" : "var(--s-text)",
        }}
      >
        {name}
      </span>
      <span
        className="font-mono text-center"
        style={{
          fontSize: 10,
          color: accent ? "var(--s-primary-contrast, #fff)" : "var(--s-text-muted)",
          opacity: accent ? 0.8 : 1,
          lineHeight: 1.4,
        }}
      >
        {sub}
      </span>
    </div>
  );
}

function CellPattern({ name, patternName }: { name: string; patternName: string }) {
  const p = patternBg(patternName, "var(--s-border-muted)", 16);
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "var(--s-surface)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: p.bg,
          backgroundSize: p.size,
          ...(p.pos ? { backgroundPosition: p.pos } : {}),
          opacity: 0.4,
        }}
      />
      <span
        className="font-mono relative z-[1]"
        style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text)", letterSpacing: "0.03em" }}
      >
        {name}
      </span>
      <span
        className="font-mono relative z-[1] mt-1"
        style={{ fontSize: 9, color: "var(--s-text-muted)" }}
      >
        pattern
      </span>
    </div>
  );
}

function CellStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: "var(--s-surface)", padding: 20 }}
    >
      <TabularValue size="xl" className="block font-bold text-[var(--s-primary)]">
        {value}
      </TabularValue>
      <MonoLabel size="sm" variant="muted">{label}</MonoLabel>
    </div>
  );
}

function CellInfo({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center"
      style={{
        background: accent
          ? "linear-gradient(160deg, var(--s-primary), color-mix(in oklch, var(--s-primary) 40%, var(--s-bg)))"
          : "var(--s-surface)",
        padding: 24,
      }}
    >
      <MonoLabel variant={accent ? "inverse" : "accent"} size="sm" className="block mb-2">
        {title}
      </MonoLabel>
      <DensityText
        role="body"
        as="span"
        className="leading-relaxed"
        style={{
          color: accent ? "var(--s-primary-contrast, #fff)" : "var(--s-text-muted)",
          opacity: accent ? 0.85 : 1,
          fontSize: 12,
        }}
      >
        {body}
      </DensityText>
    </div>
  );
}

/* ================================================================ */
/* Main export — exactly 2 Voronoi rows, every cell has content       */
/* ================================================================ */

export function ShapesAndPatterns() {
  return (
    <TechFrame variant="overshoot" extend={16} opacity={0.3} padding={8}>
      <div className="flex flex-col">
        {/* ── Row 1: shapes + hero info ───────────────────────── */}
        <VoronoiBento seeds={5} height={440} gap={6}>
          <CellShape
            accent
            shape={<Shape variant="diamond" size="xl" filled strokeWidth={1.5} />}
            name="Voronoi"
            sub="Organic cell layouts via d3-delaunay"
          />
          <CellShape
            shape={<Diamond size="lg" style={{ background: "var(--s-primary)", opacity: 0.8 }} />}
            name="Diamond"
            sub="Rotated square grids"
          />
          <CellShape
            shape={<Hexagon size="lg" style={{ background: "var(--s-primary)", opacity: 0.8 }} />}
            name="Hexagon"
            sub="Honeycomb tessellation"
          />
          <CellShape
            shape={<Triangle size="lg" style={{ background: "var(--s-primary)", opacity: 0.8 }} />}
            name="Triangle"
            sub="Triangular fills"
          />
          <CellInfo
            accent
            title="TOKEN-DRIVEN"
            body="Every shape and pattern responds to your active preset."
          />
        </VoronoiBento>

        {/* ── Row 2: patterns + stats + remaining shapes ──────── */}
        <VoronoiBento seeds={7} height={440} gap={6}>
          <CellPattern name="Grid" patternName="grid" />
          <CellPattern name="Dots" patternName="dots" />
          <CellPattern name="Crosshatch" patternName="crosshatch" />
          <CellShape
            shape={<Diagonal height={48} fill="var(--s-primary)" style={{ width: 72, opacity: 0.8 }} />}
            name="Diagonal"
            sub="Angular section cuts"
          />
          <CellShape
            shape={<Shape variant="cross" size="lg" strokeWidth={1.5} />}
            name="Cross"
            sub="Structural markers"
          />
          <CellStat value="7" label="Shape types" />
          <CellShape
            shape={
              <Box3D depth={24} tiltX={-12} tiltY={20} perspective={400} variant="card" className="w-[48px] h-[48px]">
                <div className="w-full h-full" />
              </Box3D>
            }
            name="Box3D"
            sub="CSS 3D transforms"
          />
        </VoronoiBento>
      </div>
    </TechFrame>
  );
}
