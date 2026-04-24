"use client";

import React from "react";
import {
  Badge,
  Button,
  Card3D,
  ExplodedBox3D,
  Input,
  IsometricPrism,
  IsometricScene,
  Progress,
  Switch,
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

function GeometricGlyph({
  variant,
  color,
}: {
  variant: "diamond" | "hexagon" | "triangle";
  color: string;
}) {
  const clipPath = {
    diamond: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
    hexagon: "polygon(24% 0, 76% 0, 100% 50%, 76% 100%, 24% 100%, 0 50%)",
    triangle: "polygon(50% 4%, 96% 92%, 4% 92%)",
  }[variant];

  return (
    <div
      className="relative h-[120px] w-[120px]"
      style={{
        clipPath,
        background: color,
        boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--s-text) 18%, transparent)",
      }}
    >
      <div
        className="absolute inset-[18%]"
        style={{
          clipPath,
          border: "1px solid color-mix(in oklch, var(--s-background) 60%, transparent)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}

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
          ? "linear-gradient(160deg, var(--s-primary), color-mix(in oklch, var(--s-primary) 40%, var(--s-background)))"
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
/* 3D showcase                                                        */
/* ================================================================ */

function SceneBlock({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--s-border)] bg-[var(--s-background)]">
      <div className="flex items-center justify-between border-b border-[var(--s-border)] px-4 py-3">
        <MonoLabel variant="accent" size="xs">{label}</MonoLabel>
        <MonoLabel size="xs" variant="muted">{title}</MonoLabel>
      </div>
      <div className="min-h-[220px] p-4">{children}</div>
    </div>
  );
}

const TERRAIN_BOXES = [
  { title: "Button", kind: "button", depth: 18, accent: "var(--s-accent-sky)" },
  { title: "Input", kind: "input", depth: 26, accent: "var(--s-accent-emerald)" },
  { title: "Switch", kind: "switch", depth: 22, accent: "var(--s-accent-amber)" },
  { title: "Progress", kind: "progress", depth: 34, accent: "var(--s-accent-fuchsia)" },
  { title: "Badge", kind: "badge", depth: 20, accent: "var(--s-accent-rose)" },
  { title: "Actions", kind: "actions", depth: 42, accent: "var(--s-primary)" },
] as const;

function TerrainBoxContent({ kind }: { kind: (typeof TERRAIN_BOXES)[number]["kind"] }) {
  if (kind === "button") return <Button size="sm">Deploy</Button>;
  if (kind === "input") return <Input placeholder="Search..." className="h-8 text-xs" />;
  if (kind === "switch") {
    return (
      <div className="flex items-center gap-2">
        <Switch defaultChecked />
        <MonoLabel size="xs">live</MonoLabel>
      </div>
    );
  }
  if (kind === "progress") return <Progress value={68} />;
  if (kind === "badge") {
    return (
      <div className="flex gap-2">
        <Badge>New</Badge>
        <Badge variant="outline">v2</Badge>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <Button size="sm">Run</Button>
      <Button size="sm" variant="outline">Diff</Button>
    </div>
  );
}

function ReactiveTerrainGrid() {
  const [pointer, setPointer] = React.useState({ x: 0.5, y: 0.45, active: false });

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
          active: true,
        });
      }}
      onPointerLeave={() => setPointer((current) => ({ ...current, active: false }))}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative grid h-full grid-cols-3 gap-5 p-6">
        {TERRAIN_BOXES.map((box, index) => {
          const col = (index % 3) / 2;
          const row = Math.floor(index / 3) / 1;
          const dx = pointer.x - col;
          const dy = pointer.y - row;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const intensity = pointer.active ? Math.max(0, 1 - distance * 1.45) : 0.18;
          const rotateX = (-dy * 12 * intensity).toFixed(2);
          const rotateY = (dx * 14 * intensity).toFixed(2);
          const lift = (intensity * -12).toFixed(1);

          return (
            <div
              key={box.title}
              className="flex items-center justify-center"
              style={{
                transform: `translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Box3D depth={box.depth} variant="card" hoverLift className="h-[130px] w-full max-w-[190px]">
                <div className="flex h-full w-full flex-col justify-between p-4">
                  <div className="flex items-center justify-between gap-2">
                    <MonoLabel variant="accent" size="xs">{box.title}</MonoLabel>
                    <span className="h-2 w-2" style={{ background: box.accent }} />
                  </div>
                  <TerrainBoxContent kind={box.kind} />
                  <Progress value={Math.round(38 + intensity * 58)} />
                </div>
              </Box3D>
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 border border-[var(--s-border)] bg-[var(--s-background)] px-3 py-2">
        <MonoLabel variant="accent" size="xs">cursor-weighted tilt field</MonoLabel>
      </div>
    </div>
  );
}

function CylinderStack() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative h-[190px] w-[210px]">
        {[0, 1, 2, 3].map((layer) => (
          <div
            key={layer}
            className="absolute left-1/2 h-16 w-44 -translate-x-1/2"
            style={{
              top: `${layer * 34}px`,
              zIndex: 10 - layer,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-8 rounded-[50%] border border-[var(--s-border)]"
              style={{
                background:
                  layer === 0
                    ? "color-mix(in oklch, var(--s-primary) 75%, var(--s-background))"
                    : "var(--s-surface-elevated)",
              }}
            />
            <div
              className="absolute inset-x-0 top-4 h-10 border-x border-[var(--s-border)]"
              style={{
                background:
                  layer === 0
                    ? "color-mix(in oklch, var(--s-primary) 38%, var(--s-background))"
                    : "var(--s-surface)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-8 rounded-[50%] border border-[var(--s-border)] bg-[var(--s-background)]" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Badge>Database</Badge>
        <MonoLabel size="xs" variant="muted">token tables</MonoLabel>
      </div>
    </div>
  );
}

export function ThreeDShowcase() {
  return (
    <TechFrame variant="overshoot" extend={16} opacity={0.35} padding={8}>
      <div className="grid gap-0 border border-[var(--s-border)] bg-[var(--s-background)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b border-[var(--s-border)] p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <MonoLabel variant="accent">interactive component terrain</MonoLabel>
            <Badge variant="outline" className="font-[family-name:var(--s-font-mono)]">move cursor</Badge>
          </div>
          <IsometricScene height={460} gridSize={36} className="bg-[var(--s-background)]">
            <ReactiveTerrainGrid />
          </IsometricScene>
        </div>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-1">
          <SceneBlock label="01" title="Database Cylinder">
            <CylinderStack />
          </SceneBlock>
          <SceneBlock label="02" title="Exploded Faces">
            <div className="flex h-full items-center justify-center">
              <ExplodedBox3D size={100} depth={26} gap={14} showLabels />
            </div>
          </SceneBlock>
          <SceneBlock label="03" title="Projected Boxes">
            <div className="grid h-full grid-cols-2 place-items-center gap-3">
              {[18, 28, 38, 48].map((depth) => (
                <Box3D key={depth} depth={depth} hoverLift className="h-16 w-24">
                  <TabularValue size="xs" muted>{depth}px</TabularValue>
                </Box3D>
              ))}
            </div>
          </SceneBlock>
        </div>
      </div>
    </TechFrame>
  );
}

/* ================================================================ */
/* Voronoi showcase                                                   */
/* ================================================================ */

const VORONOI_TILES = [
  {
    points: "0,0 355,0 315,230 160,300 0,250",
    content: (
      <CellInfo
        accent
        title="REAL CELL CONTENT"
        body="Centered content. Shared edges. No cropped rectangles."
      />
    ),
  },
  {
    points: "355,0 655,0 610,105 585,250 315,230",
    content: <CellPattern name="Grid Field" patternName="grid" />,
  },
  {
    points: "655,0 1000,0 1000,270 745,345 585,250 610,105",
    content: (
      <CellShape
        shape={<GeometricGlyph variant="hexagon" color="var(--s-accent-emerald)" />}
        name="Hex Layout"
        sub="shape primitives in polygon cells"
      />
    ),
  },
  {
    points: "0,250 160,300 390,430 345,650 0,650",
    content: (
      <CellShape
        shape={<GeometricGlyph variant="diamond" color="var(--s-accent-sky)" />}
        name="Diamond"
        sub="token color + border rhythm"
      />
    ),
  },
  {
    points: "315,230 585,250 745,345 520,430 390,430 160,300",
    content: (
      <CellInfo
        title="CENTER CELL"
        body="Split from the stat tile below. Same shared Voronoi seams."
      />
    ),
  },
  {
    points: "390,430 520,430 655,650 345,650",
    content: <CellStat value="9" label="Voronoi panels" />,
  },
  {
    points: "745,345 1000,270 1000,650 655,650 520,430",
    content: (
      <CellShape
        shape={<GeometricGlyph variant="triangle" color="var(--s-accent-amber)" />}
        name="Triangle"
        sub="non-rectangular content"
      />
    ),
  },
];

function polygonBounds(points: string) {
  const coords = points.split(" ").map((pair) => pair.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

export function ShapesAndPatterns() {
  return (
    <TechFrame variant="overshoot" extend={16} opacity={0.3} padding={8}>
      <div className="relative h-[720px] overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden>
          {VORONOI_TILES.map((tile, index) => (
            <polygon
              key={index}
              points={tile.points}
              fill="var(--s-surface)"
            />
          ))}
        </svg>

        {VORONOI_TILES.map((tile, index) => {
          const bounds = polygonBounds(tile.points);
          return (
            <div
              key={index}
              className="absolute overflow-hidden"
              style={{
                left: `${bounds.minX / 10}%`,
                top: `${(bounds.minY / 650) * 100}%`,
                width: `${bounds.width / 10}%`,
                height: `${(bounds.height / 650) * 100}%`,
                clipPath: `polygon(${tile.points
                  .split(" ")
                  .map((pair) => {
                    const [x, y] = pair.split(",").map(Number);
                    return `${(((x - bounds.minX) / bounds.width) * 100).toFixed(3)}% ${(((y - bounds.minY) / bounds.height) * 100).toFixed(3)}%`;
                  })
                  .join(", ")})`,
              }}
            >
              {tile.content}
            </div>
          );
        })}

        <svg className="pointer-events-none absolute inset-0 z-[2] h-full w-full" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden>
          {VORONOI_TILES.map((tile, index) => (
            <polygon
              key={index}
              points={tile.points}
              fill="transparent"
              stroke="var(--s-border)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[var(--s-primary)]" />
      </div>
    </TechFrame>
  );
}
