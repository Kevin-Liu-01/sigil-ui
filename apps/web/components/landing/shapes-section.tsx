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
  SectionDivider,
} from "@sigil-ui/components";
import { TechFrame } from "./tech-frame";

const TRANSITION = "cubic-bezier(0.16, 1, 0.3, 1)";

const PATTERNS: { name: string; bg: (c: string, cell: number) => string; size: string }[] = [
  { name: "grid", bg: (c, s) => `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, transparent ${s - 1}px, ${c} ${s - 1}px)`, size: "12px 12px" },
  { name: "dots", bg: (c, s) => `radial-gradient(circle, ${c} 0.75px, transparent 0.75px)`, size: "10px 10px" },
  { name: "crosshatch", bg: (c, s) => `linear-gradient(45deg, ${c} 0.5px, transparent 0.5px), linear-gradient(-45deg, ${c} 0.5px, transparent 0.5px)`, size: "10px 10px" },
  { name: "diagonal", bg: (c, s) => `repeating-linear-gradient(45deg, transparent, transparent ${s - 1}px, ${c} ${s - 1}px, ${c} ${s}px)`, size: "14px 14px" },
  { name: "diamond", bg: (c, s) => `linear-gradient(45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%), linear-gradient(-45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%)`, size: "6px 6px" },
  { name: "hexagon", bg: (c) => `radial-gradient(circle farthest-side at 0% 50%, ${c} 23%, transparent 24%), radial-gradient(circle farthest-side at 100% 50%, ${c} 23%, transparent 24%), radial-gradient(circle farthest-side at 50% 0%, ${c} 23%, transparent 24%), radial-gradient(circle farthest-side at 50% 100%, ${c} 23%, transparent 24%)`, size: "10px 12px" },
  { name: "triangle", bg: (c, s) => `linear-gradient(60deg, ${c} 0.5px, transparent 0.5px), linear-gradient(-60deg, ${c} 0.5px, transparent 0.5px), linear-gradient(to bottom, transparent ${s - 1}px, ${c} ${s - 1}px)`, size: "12px 12px" },
  { name: "zigzag", bg: (c, s) => `linear-gradient(135deg, ${c} 25%, transparent 25%), linear-gradient(225deg, ${c} 25%, transparent 25%), linear-gradient(315deg, ${c} 25%, transparent 25%), linear-gradient(45deg, ${c} 25%, transparent 25%)`, size: "10px 10px" },
  { name: "checker", bg: (c) => `linear-gradient(45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%), linear-gradient(45deg, ${c} 25%, transparent 25%, transparent 75%, ${c} 75%)`, size: "12px 12px" },
  { name: "plus", bg: (c, s) => `linear-gradient(to right, transparent 5px, ${c} 5px, ${c} 7px, transparent 7px), linear-gradient(to bottom, transparent 5px, ${c} 5px, ${c} 7px, transparent 7px)`, size: "12px 12px" },
  { name: "brick", bg: (c, s) => `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, transparent ${s - 1}px, ${c} ${s - 1}px)`, size: "14px 7px" },
  { name: "wave", bg: (c, s) => `repeating-linear-gradient(30deg, transparent, transparent ${s - 1}px, ${c} ${s - 1}px, ${c} ${s}px)`, size: "14px 12px" },
];

function ShapeCard({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      style={{
        padding: "var(--s-card-padding, 24px)",
        border: "1px solid var(--s-border)",
        borderStyle: "var(--s-border-style, solid)",
        borderRadius: "var(--s-radius-md, 6px)",
        background: "var(--s-surface)",
        boxShadow: "var(--s-shadow-sm)",
        transition: `all 200ms ${TRANSITION}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--s-border-strong)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--s-border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center justify-center" style={{ minHeight: 64 }}>
        {children}
      </div>
      <span
        className="font-mono select-none"
        style={{ fontSize: 11, color: "var(--s-text-muted)", letterSpacing: "0.02em" }}
      >
        {name}
      </span>
    </div>
  );
}

function PatternCard({ name, bgImage, bgSize }: { name: string; bgImage: string; bgSize: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        border: "1px solid var(--s-border-muted)",
        borderStyle: "var(--s-border-style, solid)",
        borderRadius: "var(--s-radius-sm, 4px)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 48,
          backgroundImage: bgImage,
          backgroundSize: bgSize,
          opacity: 0.5,
        }}
      />
      <span
        className="font-mono pb-2"
        style={{ fontSize: 9, color: "var(--s-text-muted)", letterSpacing: "0.04em" }}
      >
        {name}
      </span>
    </div>
  );
}

function VoronoiShowcase() {
  const cellLabels = [
    { label: "Voronoi", sub: "Organic layouts" },
    { label: "Hexagon", sub: "Non-rectangular" },
    { label: "Diamond", sub: "Rotated grids" },
    { label: "Triangle", sub: "Tessellation" },
    { label: "Diagonal", sub: "Angular cuts" },
    { label: "Custom", sub: "Any polygon" },
  ];

  return (
    <VoronoiBento seeds={6} height={320} gap={6}>
      {cellLabels.map((c, i) => (
        <div
          key={i}
          className="w-full h-full flex flex-col items-center justify-center"
          style={{
            background: i === 0
              ? "linear-gradient(135deg, var(--s-primary), color-mix(in oklch, var(--s-primary) 60%, var(--s-surface)))"
              : "var(--s-surface)",
            padding: 16,
          }}
        >
          <Shape
            variant={["diamond", "hexagon", "triangle", "circle", "cross", "pill"][i] as any}
            size="lg"
            filled={i === 0}
            strokeWidth={1.5}
          />
          <span
            className="font-mono mt-2"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: i === 0 ? "var(--s-primary-contrast, #fff)" : "var(--s-text)",
            }}
          >
            {c.label}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              color: i === 0 ? "var(--s-primary-contrast, #fff)" : "var(--s-text-muted)",
              opacity: i === 0 ? 0.8 : 1,
            }}
          >
            {c.sub}
          </span>
        </div>
      ))}
    </VoronoiBento>
  );
}

export function ShapesAndPatterns() {
  const color = "var(--s-border-muted)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <div>
        <span className="s-label" style={{ display: "block", marginBottom: 12 }}>
          / Shapes and Patterns
        </span>
        <h2
          style={{
            fontFamily: "var(--s-font-display)",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--s-text)",
            margin: "0 0 12px 0",
          }}
        >
          Layouts beyond the rectangle.
        </h2>
        <p
          className="s-mono"
          style={{ fontSize: 14, color: "var(--s-text-muted)", margin: 0, maxWidth: 576 }}
        >
          Voronoi grids, hexagons, diamonds, triangles, diagonal cuts, and 14 structural
          patterns. Every shape responds to your active preset.
        </p>
      </div>

      {/* Voronoi Bento */}
      <div>
        <span className="s-fig" style={{ display: "block", marginBottom: 8 }}>
          Fig. 03 — Voronoi bento layout
        </span>
        <TechFrame variant="overshoot" extend={16} opacity={0.3} padding={8}>
          <div className="s-transition-all">
            <VoronoiShowcase />
          </div>
        </TechFrame>
      </div>

      <SectionDivider pattern="crosshatch" size="xs" opacity={0.06} showBorders={false} fadeEdges={false} />

      {/* Shape Gallery */}
      <TechFrame variant="brackets" extend={12} opacity={0.25} padding={8}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ShapeCard name="Diamond">
          <Diamond size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} />
        </ShapeCard>
        <ShapeCard name="Hexagon">
          <Hexagon size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} />
        </ShapeCard>
        <ShapeCard name="Triangle">
          <Triangle size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} />
        </ShapeCard>
        <ShapeCard name="Diagonal">
          <Diagonal height={56} fill="var(--s-primary)" style={{ width: 80, opacity: 0.8 }} />
        </ShapeCard>
      </div>
      </TechFrame>

      <SectionDivider pattern="dots" size="xs" opacity={0.06} showBorders={false} fadeEdges={false} />

      {/* Pattern Grid */}
      <div>
        <span className="s-fig" style={{ display: "block", marginBottom: 8 }}>
          14 structural patterns — gutter, margin, and background
        </span>
        <TechFrame variant="ticks" extend={6} opacity={0.2}>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {PATTERNS.map((p) => (
              <PatternCard
                key={p.name}
                name={p.name}
                bgImage={p.bg(color, 12)}
                bgSize={p.size}
              />
            ))}
          </div>
        </TechFrame>
      </div>

      <SectionDivider pattern="diagonal" size="xs" opacity={0.06} showBorders={false} fadeEdges={false} />

      {/* Box3D */}
      <TechFrame variant="crosshair" extend={8} opacity={0.2}>
      <div className="flex items-center gap-12 flex-wrap">
        <Box3D
          depth={40}
          tiltX={-15}
          tiltY={25}
          perspective={600}
          variant="card"
          className="w-[120px] h-[120px]"
        >
          <div
            className="w-full h-full flex items-center justify-center font-mono"
            style={{ fontSize: 12, color: "var(--s-text-muted)" }}
          >
            front
          </div>
        </Box3D>
        <div className="font-mono" style={{ maxWidth: 280 }}>
          <div style={{ fontWeight: 600, color: "var(--s-text)", marginBottom: 4 }}>
            Box3D
          </div>
          <p style={{ fontSize: 12, color: "var(--s-text-muted)", margin: 0, lineHeight: 1.6 }}>
            Token-driven 3D primitives with CSS transforms. Color, radius, shadows,
            and depth all respond to your preset file.
          </p>
        </div>
      </div>
      </TechFrame>
    </div>
  );
}
