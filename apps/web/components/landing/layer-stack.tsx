"use client";

import {
  useState,
  useMemo,
  useCallback,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import {
  DiagramCalloutLine,
  MonoLabel,
  TabularValue,
  DensityText,
  cn,
} from "@sigil-ui/components";

/* ================================================================ */
/* Data                                                               */
/* ================================================================ */

interface LayerDef {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  items: { label: string; value?: string }[];
  description: string;
  color: string;
}

const LAYERS: LayerDef[] = [
  {
    id: "tokens",
    num: "01",
    title: "TOKENS",
    subtitle: "259 configurable fields",
    items: [
      { label: "--s-primary", value: "oklch(0.7 0.15 280)" },
      { label: "--s-radius-md", value: "6px" },
      { label: "--s-font-display", value: '"Inter"' },
      { label: "--s-duration-fast", value: "150ms" },
    ],
    description:
      "259 CSS custom properties that define every visual decision in the system. Colors, fonts, spacing, radius, shadows, and motion — all in one place.",
    color: "oklch(0.50 0.24 275)",
  },
  {
    id: "presets",
    num: "02",
    title: "PRESETS",
    subtitle: "44 curated + custom",
    items: [
      { label: "sigil" },
      { label: "noir" },
      { label: "forge" },
      { label: "+ your own" },
    ],
    description:
      "A preset is a complete set of 259 token values that defines a visual identity. Switch presets and the entire UI transforms in one command.",
    color: "oklch(0.56 0.20 45)",
  },
  {
    id: "components",
    num: "03",
    title: "COMPONENTS",
    subtitle: "200+ token-driven",
    items: [
      { label: "Button" },
      { label: "Card" },
      { label: "Input" },
      { label: "Badge" },
    ],
    description:
      "200+ React components that read from token variables. They never hardcode colors, spacing, or motion — so they survive every preset switch without changing a line.",
    color: "oklch(0.52 0.20 160)",
  },
  {
    id: "pages",
    num: "04",
    title: "PAGES",
    subtitle: "17 production templates",
    items: [
      { label: "Landing" },
      { label: "Dashboard" },
      { label: "E-commerce" },
    ],
    description:
      "Compose components into production screens. Every page inherits the active token set — no page-level overrides or one-off styling needed.",
    color: "oklch(0.52 0.22 330)",
  },
];

const LAYER_NOTES: Record<string, string[]> = {
  tokens: [
    "Colors use OKLCH. Spacing follows a 4px grid. All values are semantic, never raw.",
    "Change --s-primary and every button, link, badge, and focus ring updates at once.",
    "Agents edit tokens first. The layers above never need manual changes.",
  ],
  presets: [
    "sigil preset noir — one command rewrites all 259 tokens simultaneously.",
    "44 built-in presets across 7 categories: structural, minimal, dark, colorful, editorial, industrial, edgeless.",
    "Create custom presets from any base. Every field is overridable.",
  ],
  components: [
    "Read-only consumers of tokens. They never own colors, spacing, or motion values.",
    "Built on Radix primitives — keyboard navigation, focus management, ARIA handled.",
    "Button, Card, Input, Badge, and 196 more — all available via sigil add.",
  ],
  pages: [
    "17 templates: landing, dashboard, e-commerce, docs, portfolio, blog, and more.",
    "Drag-and-drop composition in the sandbox. Export clean code.",
    "Switch the preset after the page is built. Everything adapts.",
  ],
};

/* ================================================================ */
/* Isometric helpers                                                  */
/* ================================================================ */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

function iso(x: number, y: number, z: number): [number, number] {
  return [(x - z) * COS30, (x + z) * SIN30 - y];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function pointOnQuad(
  quad: [number, number][],
  u: number,
  v: number,
): [number, number] {
  const top: [number, number] = [
    lerp(quad[0][0], quad[1][0], u),
    lerp(quad[0][1], quad[1][1], u),
  ];
  const bottom: [number, number] = [
    lerp(quad[3][0], quad[2][0], u),
    lerp(quad[3][1], quad[2][1], u),
  ];
  return [lerp(top[0], bottom[0], v), lerp(top[1], bottom[1], v)];
}

function projectedRect(
  quad: [number, number][],
  ox: number,
  oy: number,
  u1: number,
  v1: number,
  u2: number,
  v2: number,
): string {
  return [
    pointOnQuad(quad, u1, v1),
    pointOnQuad(quad, u2, v1),
    pointOnQuad(quad, u2, v2),
    pointOnQuad(quad, u1, v2),
  ]
    .map(([x, y]) => `${x + ox},${y + oy}`)
    .join(" ");
}

/* ================================================================ */
/* Constants                                                          */
/* ================================================================ */

const W = 170;
const D = 170;
const H = 28;
const GAP = 26;
const LIFT = 26;
const MARGIN = 64;
const FACE_INK = "var(--s-text)";

/* ================================================================ */
/* Component                                                          */
/* ================================================================ */

export interface LayerStackDiagramProps
  extends HTMLAttributes<HTMLDivElement> {}

export function LayerStackDiagram({
  className,
  ...rest
}: LayerStackDiagramProps) {
  const [active, setActive] = useState<string | null>(null);
  const activeLayer = active ? (LAYERS.find((l) => l.id === active) ?? LAYERS[0]) : null;
  const activeIndex = active ? LAYERS.findIndex((l) => l.id === active) : -1;
  const activeNotes = activeLayer
    ? LAYER_NOTES[activeLayer.id] ?? []
    : [
        "Each layer has one job. Tokens define. Presets bundle. Components consume. Pages compose.",
        "Select a layer to isolate it and see what it contains.",
        "Changes flow upward — edit a token and every layer above inherits it automatically.",
      ];

  const handleSetActive = useCallback((id: string | null) => setActive(id), []);

  const { svgW, svgH, ox, oy, geos } = useMemo(() => {
    const allPts: [number, number][] = [];
    const geometries = LAYERS.map((_, i) => {
      const y0 = i * (H + GAP);
      const top = [
        iso(0, y0 + H, 0),
        iso(W, y0 + H, 0),
        iso(W, y0 + H, D),
        iso(0, y0 + H, D),
      ];
      const left = [
        iso(0, y0 + H, D),
        iso(W, y0 + H, D),
        iso(W, y0, D),
        iso(0, y0, D),
      ];
      const right = [
        iso(W, y0 + H, 0),
        iso(W, y0 + H, D),
        iso(W, y0, D),
        iso(W, y0, 0),
      ];
      const center: [number, number] = [
        (top[0][0] + top[2][0]) / 2,
        (top[0][1] + top[2][1]) / 2,
      ];
      const faces = { top, left, right, center, y0 };
      [...top, ...left, ...right].forEach((p) => allPts.push(p));
      return faces;
    });

    // account for lift headroom
    const lastY = (LAYERS.length - 1) * (H + GAP) + H + LIFT;
    allPts.push(iso(0, lastY, 0));
    allPts.push(iso(W, lastY, D));

    const xs = allPts.map((p) => p[0]);
    const ys = allPts.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      svgW: maxX - minX + MARGIN * 2,
      svgH: maxY - minY + MARGIN * 2,
      ox: -minX + MARGIN,
      oy: -minY + MARGIN,
      geos: geometries,
    };
  }, []);

  const pt = useCallback(
    (p: [number, number]) => `${p[0] + ox},${p[1] + oy}`,
    [ox, oy],
  );

  return (
    <div
      data-slot="layer-stack-diagram"
      className={cn("", className)}
      {...rest}
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-0 items-stretch min-h-[520px] border border-[var(--s-border)] bg-[var(--s-background)]">
        {/* ────────────────── Isometric SVG ────────────────── */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[var(--s-background)] px-4 py-10">
          {/* subtle dot grid behind the stack */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute inset-x-10 bottom-10 top-12 pointer-events-none opacity-35"
            style={{
              background:
                "radial-gradient(ellipse at 50% 72%, color-mix(in oklch, var(--s-text) 8%, transparent), transparent 58%)",
            }}
          />

          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="relative z-[1] w-full max-w-[640px] select-none"
            role="img"
            aria-label="Isometric layer stack: tokens, presets, components, pages"
          >
            <defs>
              <filter id="iso-glow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite
                  in="SourceGraphic"
                  in2="blur"
                  operator="over"
                />
              </filter>
              <linearGradient id="edge-sheen" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor={FACE_INK} stopOpacity="0.12" />
                <stop offset="100%" stopColor={FACE_INK} stopOpacity="0" />
              </linearGradient>
              <filter id="iso-drop" x="-15%" y="-15%" width="130%" height="145%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="7"
                  floodColor="var(--s-text)"
                  floodOpacity="0.14"
                />
              </filter>
            </defs>

            {LAYERS.map((layer, index) => {
              const geo = geos[index];
              const isActive = activeLayer?.id === layer.id;
              const isAboveActive = activeIndex >= 0 && index > activeIndex;
              const topColor = isActive
                ? `color-mix(in oklch, ${layer.color} 28%, var(--s-background))`
                : isAboveActive
                  ? "transparent"
                  : `color-mix(in oklch, ${layer.color} 14%, var(--s-background))`;
              const leftColor = isActive
                ? `color-mix(in oklch, ${layer.color} 46%, var(--s-background))`
                : isAboveActive
                  ? "transparent"
                  : `color-mix(in oklch, ${layer.color} 24%, var(--s-background))`;
              const rightColor = isActive
                ? `color-mix(in oklch, ${layer.color} 38%, var(--s-background))`
                : isAboveActive
                  ? "transparent"
                  : `color-mix(in oklch, ${layer.color} 18%, var(--s-background))`;
              const ease =
                "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)";

              if (isAboveActive) return null;

              return (
                <g
                  key={layer.id}
                  style={{
                    transform: isActive ? `translateY(-${LIFT}px)` : "translateY(0)",
                    transition: ease,
                  }}
                >
                  {/* Lower-left face */}
                  <polygon
                    points={geo.left.map(pt).join(" ")}
                    fill={leftColor}
                    stroke={isActive ? layer.color : "var(--s-border)"}
                    strokeWidth={isActive ? 1.2 : 0.7}
                    strokeOpacity={isActive ? 0.6 : 1}
                    style={{
                      opacity: isAboveActive ? 0 : 1,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  {/* Lower-right face */}
                  <polygon
                    points={geo.right.map(pt).join(" ")}
                    fill={rightColor}
                    stroke={isActive ? layer.color : "var(--s-border)"}
                    strokeWidth={isActive ? 1.2 : 0.7}
                    strokeOpacity={isActive ? 0.6 : 1}
                    style={{
                      opacity: isAboveActive ? 0 : 1,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  <SideFaceContent
                    layer={layer}
                    geo={geo}
                    ox={ox}
                    oy={oy}
                    active={isActive}
                  />
                  {/* Top face */}
                  <polygon
                    points={geo.top.map(pt).join(" ")}
                    fill={topColor}
                    stroke={isActive ? layer.color : "var(--s-border)"}
                    strokeWidth={isActive ? 1.4 : 0.7}
                    strokeOpacity={isActive ? 0.7 : 1}
                    filter={isActive ? "url(#iso-drop)" : undefined}
                    style={{
                      opacity: isAboveActive ? 0 : 1,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  <polygon
                    points={geo.top.map(pt).join(" ")}
                    fill="url(#edge-sheen)"
                    opacity={isActive ? 0.12 : 0.04}
                    pointerEvents="none"
                  />

                  {/* Layer texture — always visible, opacity scales with active */}
                  {layer.id === "tokens" && (
                    <TopFaceTokenLines geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {layer.id === "presets" && (
                    <TopFacePresetDots geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {layer.id === "components" && (
                    <TopFaceComponentBlocks geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {layer.id === "pages" && (
                    <TopFacePageIcon geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}

                  {/* Isometric number — flush with the top face (skip for prism layers) */}
                  {layer.id !== "presets" && (
                    <g transform={`translate(${geo.center[0] + ox}, ${geo.center[1] + oy})`}>
                      <text
                        x="0" y="0"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isActive ? layer.color : FACE_INK}
                        fontSize={44}
                        fontWeight={800}
                        pointerEvents="none"
                        transform={`matrix(${COS30}, ${SIN30}, ${-COS30}, ${SIN30}, 0, 0)`}
                        style={{
                          fontFamily: "var(--s-font-mono, monospace)",
                          opacity: isActive ? 0.88 : 0.25,
                          transition: "opacity 300ms ease",
                        }}
                      >
                        {layer.num}
                      </text>
                    </g>
                  )}
                  <polygon
                    aria-label={`Select ${layer.title.toLowerCase()} layer`}
                    points={geo.top.map(pt).join(" ")}
                    fill="transparent"
                    pointerEvents="all"
                    className="cursor-pointer"
                    onClick={() => handleSetActive(layer.id)}
                  />
                </g>
              );
            })}

            <LayerCallouts geos={geos} ox={ox} oy={oy} activeIndex={activeIndex} />

            {/* ── Agent layer dashed line ── */}
            <AgentLine ox={ox} oy={oy} />
          </svg>
        </div>

        {/* ────────────────── Narrative Panel ────────────────── */}
        <div className="relative overflow-hidden border-t border-[var(--s-border)] bg-[var(--s-surface)]/60 p-5 lg:border-l lg:border-t-0 lg:p-6">
          <div
            className="absolute inset-y-0 left-0 w-1 transition-colors duration-300"
            style={{ backgroundColor: activeLayer?.color ?? "var(--s-text)" }}
          />
          <div className="mb-5 flex items-center justify-between gap-4">
            <MonoLabel variant="accent">Layer model</MonoLabel>
            <TabularValue size="xs" muted>
              {activeLayer ? `stack/${String(activeIndex + 1).padStart(2, "0")}` : "stack/all"}
            </TabularValue>
          </div>

          {/* Layer selector tabs */}
          <div className="grid grid-cols-5 gap-1 mb-6">
            <button
              type="button"
              onClick={() => handleSetActive(null)}
              className={cn(
                "group bg-[var(--s-background)] border px-2 py-3 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)] text-left",
                activeLayer === null
                  ? "border-[var(--s-primary)] text-[var(--s-text)] shadow-[var(--s-shadow-sm)]"
                  : "border-[var(--s-border)] text-[var(--s-text-muted)] hover:border-[var(--s-border-strong)] hover:text-[var(--s-text)]",
              )}
            >
              <MonoLabel size="sm" variant={activeLayer === null ? "accent" : "muted"} className="block">
                00
              </MonoLabel>
              <span className="mt-1 block truncate font-[family-name:var(--s-font-mono)] text-[8px] font-semibold uppercase tracking-[0.12em]">
                All
              </span>
            </button>
            {LAYERS.map((layer) => {
              const isSelected = activeLayer?.id === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleSetActive(layer.id)}
                  className={cn(
                    "group relative bg-[var(--s-background)] border px-2 py-3 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)] text-left",
                    isSelected
                      ? "text-[var(--s-text)] shadow-[var(--s-shadow-sm)]"
                      : "border-[var(--s-border)] text-[var(--s-text-muted)] hover:border-[var(--s-border-strong)] hover:text-[var(--s-text)]",
                  )}
                  style={isSelected ? { borderColor: layer.color } : undefined}
                >
                  <span
                    className="absolute top-2 right-2 size-2 rounded-full transition-opacity duration-150"
                    style={{ backgroundColor: layer.color, opacity: isSelected ? 1 : 0.35 }}
                  />
                  <MonoLabel
                    size="sm"
                    variant={isSelected ? "accent" : "muted"}
                    className="block"
                  >
                    {layer.num}
                  </MonoLabel>
                  <span className="mt-1 block truncate font-[family-name:var(--s-font-mono)] text-[8px] font-semibold uppercase tracking-[0.12em]">
                    {layer.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active layer details */}
          <div
            key={activeLayer?.id ?? "full-stack"}
            className="animate-[s-fade-in_300ms_ease]"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-baseline gap-3">
              <TabularValue
                size="lg"
                className="font-bold transition-colors duration-300"
                style={{ color: activeLayer?.color ?? "var(--s-primary)" }}
              >
                {activeLayer?.num ?? "00"}
              </TabularValue>
              <h3 className="font-[family-name:var(--s-font-display)] text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-[var(--s-text)]">
                {activeLayer?.title ?? "FULL STACK"}
              </h3>
              </div>
              <MonoLabel size="xs" variant="muted" className="mt-2 hidden sm:block">
                {activeLayer?.subtitle ?? "Complete system view"}
              </MonoLabel>
            </div>

            <DensityText role="body" as="p" muted className="mb-6 leading-relaxed">
              {activeLayer?.description ??
                "Four layers with a single rule: visual decisions flow in one direction. Edit the bottom, and everything above updates."}
            </DensityText>

            <div className="mb-6 grid gap-3">
              {activeNotes.map((note, index) => (
                <div
                  key={note}
                  className="grid grid-cols-[40px_1fr] gap-3 border border-[var(--s-border)] bg-[var(--s-background)] p-3"
                >
                  <TabularValue size="xs" muted>{String(index + 1).padStart(2, "0")}</TabularValue>
                  <DensityText role="body" as="p" muted className="leading-relaxed">
                    {note}
                  </DensityText>
                </div>
              ))}
            </div>

            <div className="border border-[var(--s-border)] bg-[var(--s-background)] p-4">
              <MonoLabel variant="accent" size="xs" className="mb-3 block">current surface</MonoLabel>
              <div className="grid grid-cols-2 gap-2">
                {(activeLayer?.items ?? LAYERS.map((layer) => ({ label: layer.title, value: layer.subtitle }))).map((item) => (
                  <div key={item.label} className="border border-[var(--s-border-muted)] px-3 py-2">
                    <MonoLabel size="xs" className="block normal-case tracking-normal">{item.label}</MonoLabel>
                    {item.value && <TabularValue size="xs" muted>{item.value}</TabularValue>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Decorative top-face elements                                       */
/* ================================================================ */

type FaceProps = {
  geo: {
    top: [number, number][];
    left: [number, number][];
    right: [number, number][];
    center: [number, number];
  };
  ox: number;
  oy: number;
  active: boolean;
};

function sidePoint(
  face: [number, number][],
  ox: number,
  oy: number,
  u: number,
  v: number,
): [number, number] {
  const [x, y] = pointOnQuad(face, u, v);
  return [x + ox, y + oy];
}

function SideFaceContent({
  layer,
  geo,
  ox,
  oy,
  active,
}: FaceProps & { layer: LayerDef }) {
  const opacity = active ? 0.72 : 0.28;
  const ink = active ? layer.color : FACE_INK;
  const rightA = sidePoint(geo.right, ox, oy, 0.12, 0.34);
  const rightB = sidePoint(geo.right, ox, oy, 0.56, 0.34);
  const rightC = sidePoint(geo.right, ox, oy, 0.68, 0.34);
  const rightD = sidePoint(geo.right, ox, oy, 0.12, 0.58);
  const rightE = sidePoint(geo.right, ox, oy, 0.42, 0.58);
  const leftA = sidePoint(geo.left, ox, oy, 0.12, 0.38);
  const leftB = sidePoint(geo.left, ox, oy, 0.52, 0.38);
  const leftC = sidePoint(geo.left, ox, oy, 0.12, 0.60);
  const leftD = sidePoint(geo.left, ox, oy, 0.36, 0.60);

  return (
    <g
      pointerEvents="none"
      style={{
        opacity,
        transition: "opacity 300ms ease",
      }}
    >
      <line x1={rightA[0]} y1={rightA[1]} x2={rightB[0]} y2={rightB[1]}
        stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={rightC[0]} cy={rightC[1]} r={2} fill={ink} />
      <line x1={rightD[0]} y1={rightD[1]} x2={rightE[0]} y2={rightE[1]}
        stroke={ink} strokeWidth={0.9} strokeLinecap="round" opacity={0.55} />
      <line x1={leftA[0]} y1={leftA[1]} x2={leftB[0]} y2={leftB[1]}
        stroke={ink} strokeWidth={1.2} strokeLinecap="round" opacity={0.72} />
      <line x1={leftC[0]} y1={leftC[1]} x2={leftD[0]} y2={leftD[1]}
        stroke={ink} strokeWidth={0.9} strokeLinecap="round" opacity={0.45} />
    </g>
  );
}

function LayerCallouts({
  geos,
  ox,
  oy,
  activeIndex,
}: {
  geos: Array<{
    top: [number, number][];
    left: [number, number][];
    right: [number, number][];
    center: [number, number];
  }>;
  ox: number;
  oy: number;
  activeIndex: number;
}) {
  return (
    <g>
      {LAYERS.map((layer, index) => {
        if (activeIndex >= 0 && index > activeIndex) return null;
        const geo = geos[index];
        const isActive = activeIndex === index;
        const start = pointOnQuad(geo.right, 0.82, 0.42);
        const x1 = start[0] + ox;
        const y1 = start[1] + oy;
        const elbowX = x1 + 42;
        const labelX = elbowX + 10;
        const labelY = y1 - 2;

        return (
          <DiagramCalloutLine
            key={layer.id}
            path={`M ${x1} ${y1} L ${elbowX} ${y1 - 22} L ${labelX + 72} ${y1 - 22}`}
            dotX={x1}
            dotY={y1}
            label={layer.title}
            labelX={labelX}
            labelY={labelY - 24}
            active={isActive}
          />
        );
      })}
    </g>
  );
}

function TopFaceTokenLines({ geo, ox, oy, active }: FaceProps) {
  const color = "oklch(0.50 0.24 275)";
  const n = 10, margin = 0.06;
  const step = (1 - 2 * margin) / (n - 1);
  const els: JSX.Element[] = [];

  for (let i = 0; i < n; i++) {
    const v = margin + i * step;
    const a = pointOnQuad(geo.top, margin, v);
    const b = pointOnQuad(geo.top, 1 - margin, v);
    els.push(<line key={`th${i}`} x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy}
      stroke={color} strokeWidth={0.55} opacity={0.4} />);
  }
  for (let i = 0; i < n; i++) {
    const u = margin + i * step;
    const a = pointOnQuad(geo.top, u, margin);
    const b = pointOnQuad(geo.top, u, 1 - margin);
    els.push(<line key={`tv${i}`} x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy}
      stroke={color} strokeWidth={0.55} opacity={0.4} />);
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const p = pointOnQuad(geo.top, margin + c * step, margin + r * step);
      const edge = r === 0 || c === 0 || r === n - 1 || c === n - 1;
      els.push(<circle key={`td${r}_${c}`} cx={p[0] + ox} cy={p[1] + oy}
        r={edge ? 1.0 : 1.6} fill={color} opacity={edge ? 0.3 : 0.55} />);
    }
  }

  const sideH = 3, sideV = 8, sm = 0.08;
  const sideStepU = (1 - 2 * sm) / (sideV - 1);
  const sideStepV = (1 - 2 * sm) / (sideH - 1);

  for (const [face, prefix] of [[geo.left, "l"], [geo.right, "r"]] as const) {
    for (let i = 0; i < sideH; i++) {
      const v = sm + i * sideStepV;
      const a = pointOnQuad(face, sm, v);
      const b = pointOnQuad(face, 1 - sm, v);
      els.push(<line key={`${prefix}h${i}`} x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy}
        stroke={color} strokeWidth={0.45} opacity={0.35} />);
    }
    for (let i = 0; i < sideV; i++) {
      const u = sm + i * sideStepU;
      const a = pointOnQuad(face, u, sm);
      const b = pointOnQuad(face, u, 1 - sm);
      els.push(<line key={`${prefix}v${i}`} x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy}
        stroke={color} strokeWidth={0.45} opacity={0.35} />);
    }
    for (let r = 0; r < sideH; r++) {
      for (let c = 0; c < sideV; c++) {
        const p = pointOnQuad(face, sm + c * sideStepU, sm + r * sideStepV);
        els.push(<circle key={`${prefix}d${r}_${c}`} cx={p[0] + ox} cy={p[1] + oy}
          r={0.9} fill={color} opacity={0.4} />);
      }
    }
  }

  return (
    <g style={{ opacity: active ? 0.65 : 0.14, transition: "opacity 300ms ease" }} pointerEvents="none">
      {els}
    </g>
  );
}

function TopFacePresetDots({ geo, ox, oy, active }: FaceProps) {
  const color = "oklch(0.56 0.20 45)";
  const margin = 0.12, sz = 0.17;
  const gap = (1 - 2 * margin - 3 * sz) / 2;
  const heights = [10, 13, 9, 14, 11, 12, 8, 10, 14];

  const prisms: Array<{ u1: number; v1: number; u2: number; v2: number; ph: number }> = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const u1 = margin + c * (sz + gap);
      const v1 = margin + r * (sz + gap);
      prisms.push({ u1, v1, u2: u1 + sz, v2: v1 + sz, ph: heights[r * 3 + c] });
    }
  }

  return (
    <g style={{ opacity: active ? 0.78 : 0.18, transition: "opacity 300ms ease" }} pointerEvents="none">
      {prisms.map((p, i) => {
        const tl = pointOnQuad(geo.top, p.u1, p.v1);
        const tr = pointOnQuad(geo.top, p.u2, p.v1);
        const br = pointOnQuad(geo.top, p.u2, p.v2);
        const bl = pointOnQuad(geo.top, p.u1, p.v2);

        const topPts = [tl, tr, br, bl]
          .map(pt => `${pt[0] + ox},${pt[1] + oy - p.ph}`).join(" ");
        const leftPts = [
          `${bl[0] + ox},${bl[1] + oy - p.ph}`, `${br[0] + ox},${br[1] + oy - p.ph}`,
          `${br[0] + ox},${br[1] + oy}`, `${bl[0] + ox},${bl[1] + oy}`,
        ].join(" ");
        const rightPts = [
          `${tr[0] + ox},${tr[1] + oy - p.ph}`, `${br[0] + ox},${br[1] + oy - p.ph}`,
          `${br[0] + ox},${br[1] + oy}`, `${tr[0] + ox},${tr[1] + oy}`,
        ].join(" ");

        return (
          <g key={i}>
            <polygon points={leftPts}
              fill={`color-mix(in oklch, ${color} 52%, var(--s-background))`}
              stroke={color} strokeWidth={0.5} strokeOpacity={0.35} />
            <polygon points={rightPts}
              fill={`color-mix(in oklch, ${color} 44%, var(--s-background))`}
              stroke={color} strokeWidth={0.5} strokeOpacity={0.35} />
            <polygon points={topPts}
              fill={`color-mix(in oklch, ${color} 32%, var(--s-background))`}
              stroke={color} strokeWidth={0.6} strokeOpacity={0.45} />
          </g>
        );
      })}
    </g>
  );
}

function TopFaceComponentBlocks({ geo, ox, oy, active }: FaceProps) {
  const color = "oklch(0.52 0.20 160)";
  const filled = [
    { u: 0.10, v: 0.10, w: 0.18, h: 0.11 },
    { u: 0.32, v: 0.10, w: 0.14, h: 0.11 },
    { u: 0.50, v: 0.10, w: 0.20, h: 0.11 },
    { u: 0.74, v: 0.10, w: 0.16, h: 0.11 },
  ];
  const cards = [
    { u: 0.10, v: 0.28, w: 0.24, h: 0.26 },
    { u: 0.38, v: 0.28, w: 0.24, h: 0.26 },
    { u: 0.66, v: 0.28, w: 0.24, h: 0.26 },
  ];
  const inputs = [
    { u: 0.10, v: 0.62, w: 0.38, h: 0.10 },
    { u: 0.52, v: 0.62, w: 0.38, h: 0.10 },
  ];
  const badges = [0.14, 0.28, 0.42, 0.56, 0.70, 0.84];

  return (
    <g style={{ opacity: active ? 0.72 : 0.16, transition: "opacity 300ms ease" }} pointerEvents="none">
      {filled.map((b, i) => (
        <polygon key={`f${i}`}
          points={projectedRect(geo.top, ox, oy, b.u, b.v, b.u + b.w, b.v + b.h)}
          fill={color} opacity={0.65}
        />
      ))}
      {cards.map((c, i) => (
        <g key={`c${i}`}>
          <polygon
            points={projectedRect(geo.top, ox, oy, c.u, c.v, c.u + c.w, c.v + c.h)}
            fill="transparent" stroke={color} strokeWidth={0.75}
          />
          <polygon
            points={projectedRect(geo.top, ox, oy, c.u + 0.03, c.v + 0.04, c.u + c.w - 0.03, c.v + 0.10)}
            fill={color} opacity={0.35}
          />
          <polygon
            points={projectedRect(geo.top, ox, oy, c.u + 0.03, c.v + 0.14, c.u + c.w * 0.5, c.v + 0.17)}
            fill={FACE_INK} opacity={0.18}
          />
          {(() => {
            const p = pointOnQuad(geo.top, c.u + c.w - 0.06, c.v + 0.06);
            return <circle cx={p[0] + ox} cy={p[1] + oy} r={1.6} fill={color} opacity={0.5} />;
          })()}
        </g>
      ))}
      {inputs.map((inp, i) => (
        <polygon key={`i${i}`}
          points={projectedRect(geo.top, ox, oy, inp.u, inp.v, inp.u + inp.w, inp.v + inp.h)}
          fill="transparent" stroke={color} strokeWidth={0.55} strokeOpacity={0.7}
        />
      ))}
      {badges.map((u, i) => {
        const p = pointOnQuad(geo.top, u, 0.80);
        return <circle key={`b${i}`} cx={p[0] + ox} cy={p[1] + oy} r={2} fill={color} opacity={0.4 + (i % 3) * 0.15} />;
      })}
    </g>
  );
}

function TopFacePageIcon({ geo, ox, oy, active }: FaceProps) {
  const color = "oklch(0.52 0.22 330)";
  const lineRows: Array<{ v: number; u1: number; u2: number; w: number; op: number }> = [];
  for (let i = 0; i < 14; i++) {
    const v = 0.08 + i * 0.06;
    const u2 = 0.92 - (i % 3) * 0.10;
    lineRows.push({ v, u1: 0.08, u2, w: i < 2 ? 1.4 : 1.0, op: 0.25 + (i % 4) * 0.12 });
  }

  return (
    <g style={{ opacity: active ? 0.72 : 0.16, transition: "opacity 300ms ease" }} pointerEvents="none">
      {lineRows.map((l, i) => {
        const a = pointOnQuad(geo.top, l.u1, l.v);
        const b = pointOnQuad(geo.top, l.u2, l.v);
        return (
          <line key={i} x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy}
            stroke={color} strokeWidth={l.w} opacity={l.op} strokeLinecap="round" />
        );
      })}
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.08, 0.08, 0.38, 0.16)}
        fill={color} opacity={0.15}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.72, 0.80, 0.92, 0.92)}
        fill={color} opacity={0.25}
      />
    </g>
  );
}

/* ================================================================ */
/* Agent line along the left edge of the stack                        */
/* ================================================================ */

function AgentLine({ ox, oy }: { ox: number; oy: number }) {
  const bottom = iso(0, 0, 0);
  const top = iso(0, (LAYERS.length - 1) * (H + GAP) + H + LIFT, 0);
  const x = bottom[0] + ox - 16;
  const y1 = bottom[1] + oy;
  const y2 = top[1] + oy;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <DiagramCalloutLine
        path={`M ${x} ${y1} L ${x} ${y2}`}
        dotX={x}
        dotY={y1}
        active
      />
      <circle cx={x} cy={y2} r={2} fill="var(--s-text-muted)" opacity={0.5} />
      <text
        x={x - 6}
        y={midY}
        textAnchor="middle"
        fill="var(--s-text-muted)"
        fontSize={6}
        fontWeight={600}
        letterSpacing="0.15em"
        opacity={0.5}
        transform={`rotate(-90, ${x - 6}, ${midY})`}
        style={{ fontFamily: "var(--s-font-mono, monospace)" }}
      >
        AGENT LAYER
      </text>
    </g>
  );
}
