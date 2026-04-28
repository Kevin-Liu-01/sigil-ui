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
      "The source of truth. 259 fields — colors, fonts, spacing, radius, shadows, motion — that define your entire design system. Edit one token and every component updates.",
    color: "oklch(0.58 0.19 275)",
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
      "Curated bundles of all 259 tokens. One command switches the entire visual identity. Fork a preset or create your own from scratch.",
    color: "oklch(0.62 0.15 55)",
  },
  {
    id: "components",
    num: "03",
    title: "COMPONENTS",
    subtitle: "Radix + shadcn lineage",
    items: [
      { label: "Button" },
      { label: "Card" },
      { label: "Input" },
      { label: "Badge" },
    ],
    description:
      "200+ token-driven components built on Radix primitives. They consume var(--s-*) tokens — never hardcode values. Switch presets and the entire library updates.",
    color: "oklch(0.60 0.16 168)",
  },
  {
    id: "pages",
    num: "04",
    title: "PAGES",
    subtitle: "Any page type",
    items: [
      { label: "Landing" },
      { label: "Dashboard" },
      { label: "E-commerce" },
    ],
    description:
      "Compose components into real pages. 17 production templates included. Every page inherits the active token set automatically.",
    color: "oklch(0.60 0.16 325)",
  },
];

const LAYER_NOTES: Record<string, string[]> = {
  tokens: [
    "The editable source surface.",
    "Every color, radius, font, shadow, and timing value starts here.",
    "Agents change this layer first.",
  ],
  presets: [
    "A preset is a complete bundle of token decisions.",
    "Switching presets rewrites the system without touching components.",
    "Custom presets are still plain token files.",
  ],
  components: [
    "Components consume variables. They do not own visual decisions.",
    "The same Button, Card, and Input survive every preset change.",
    "This is the stable React surface.",
  ],
  pages: [
    "Pages compose components into product surfaces.",
    "Templates inherit the active token set automatically.",
    "No page needs one-off styling to match the system.",
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
const H = 22;
const GAP = 10;
const LIFT = 18;
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
        "The stack starts as a complete system: tokens, presets, components, and pages.",
        "Select a layer to isolate it and remove everything above it from the drawing.",
        "The model reads bottom-up: source decisions become product surfaces.",
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
                ? "var(--s-background)"
                : isAboveActive
                  ? "transparent"
                  : "color-mix(in oklch, var(--s-text) 5%, var(--s-background))";
              const leftColor = isActive
                ? "color-mix(in oklch, var(--s-text) 12%, var(--s-background))"
                : isAboveActive
                  ? "transparent"
                  : "color-mix(in oklch, var(--s-text) 10%, var(--s-background))";
              const rightColor = isActive
                ? "color-mix(in oklch, var(--s-text) 8%, var(--s-background))"
                : isAboveActive
                  ? "transparent"
                  : "color-mix(in oklch, var(--s-text) 7%, var(--s-background))";
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
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 1.2 : 0.8}
                    style={{
                      opacity: isAboveActive ? 0 : 1,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  {/* Lower-right face */}
                  <polygon
                    points={geo.right.map(pt).join(" ")}
                    fill={rightColor}
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 1.2 : 0.8}
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
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 1.5 : 0.8}
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

                  <TraceLines geo={geo} ox={ox} oy={oy} active={isActive} />

                  {/* ── Decorative top-face content ── */}
                  {isActive && layer.id === "tokens" && (
                    <TopFaceTokenLines geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {isActive && layer.id === "presets" && (
                    <TopFacePresetDots geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {isActive && layer.id === "components" && (
                    <TopFaceComponentBlocks geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}
                  {isActive && layer.id === "pages" && (
                    <TopFacePageIcon geo={geo} ox={ox} oy={oy} active={isActive} />
                  )}

                  {/* Number label */}
                  <text
                    x={geo.center[0] + ox}
                    y={geo.center[1] + oy - 1}
                    textAnchor="middle"
                    fill={FACE_INK}
                    fontSize={13}
                    fontWeight={700}
                    pointerEvents="none"
                    style={{
                      fontFamily: "var(--s-font-mono, monospace)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 300ms ease",
                    }}
                  >
                    {layer.num}
                  </text>
                  {/* Title label */}
                  <text
                    x={geo.center[0] + ox}
                    y={geo.center[1] + oy + 11}
                    textAnchor="middle"
                    fill={FACE_INK}
                    fontSize={7}
                    fontWeight={600}
                    letterSpacing="0.1em"
                    pointerEvents="none"
                    style={{
                      fontFamily: "var(--s-font-mono, monospace)",
                      opacity: isActive ? 0.9 : 0,
                      transition: "opacity 300ms ease",
                    }}
                  >
                    {layer.title}
                  </text>
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
          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--s-text)]" />
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
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSetActive(layer.id)}
                className={cn(
                  "group bg-[var(--s-background)] border px-2 py-3 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)] text-left",
                    activeLayer?.id === layer.id
                    ? "border-[var(--s-primary)] text-[var(--s-text)] shadow-[var(--s-shadow-sm)]"
                    : "border-[var(--s-border)] text-[var(--s-text-muted)] hover:border-[var(--s-border-strong)] hover:text-[var(--s-text)]",
                )}
              >
                <MonoLabel
                  size="sm"
                    variant={activeLayer?.id === layer.id ? "accent" : "muted"}
                  className="block"
                >
                  {layer.num}
                </MonoLabel>
                <span className="mt-1 block truncate font-[family-name:var(--s-font-mono)] text-[8px] font-semibold uppercase tracking-[0.12em]">
                  {layer.title}
                </span>
              </button>
            ))}
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
                className="text-[var(--s-primary)] font-bold"
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
                "Tokens define the bottom layer. Presets package them. Components consume them. Pages compose the result into product screens."}
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
  const opacity = active ? 0.66 : 0.24;
  const rightA = sidePoint(geo.right, ox, oy, 0.16, 0.38);
  const rightB = sidePoint(geo.right, ox, oy, 0.72, 0.38);
  const rightC = sidePoint(geo.right, ox, oy, 0.86, 0.38);
  const leftA = sidePoint(geo.left, ox, oy, 0.16, 0.42);
  const leftB = sidePoint(geo.left, ox, oy, 0.68, 0.42);
  const leftC = sidePoint(geo.left, ox, oy, 0.78, 0.42);

  return (
    <g
      pointerEvents="none"
      style={{
        opacity,
        transition: "opacity 300ms ease",
      }}
    >
      <line
        x1={rightA[0]}
        y1={rightA[1]}
        x2={rightB[0]}
        y2={rightB[1]}
        stroke={FACE_INK}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <line
        x1={leftA[0]}
        y1={leftA[1]}
        x2={leftB[0]}
        y2={leftB[1]}
        stroke={FACE_INK}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.72}
      />
      <circle cx={rightC[0]} cy={rightC[1]} r={2.2} fill={FACE_INK} />
      <circle cx={leftC[0]} cy={leftC[1]} r={1.8} fill={FACE_INK} opacity={0.7} />
      <text
        x={rightA[0]}
        y={rightA[1] + 9}
        fill={FACE_INK}
        fontSize={5}
        fontWeight={700}
        letterSpacing="0.12em"
        style={{ fontFamily: "var(--s-font-mono, monospace)" }}
      >
        {layer.id.toUpperCase()}
      </text>
    </g>
  );
}

function TraceLines({ geo, ox, oy, active }: FaceProps) {
  const a = pointOnQuad(geo.top, 0.18, 0.28);
  const b = pointOnQuad(geo.top, 0.82, 0.28);
  const c = pointOnQuad(geo.top, 0.82, 0.72);
  const d = pointOnQuad(geo.top, 0.18, 0.72);
  const midA = pointOnQuad(geo.top, 0.5, 0.18);
  const midB = pointOnQuad(geo.top, 0.5, 0.82);
  const line = (p1: [number, number], p2: [number, number], key: string) => (
    <line
      key={key}
      x1={p1[0] + ox}
      y1={p1[1] + oy}
      x2={p2[0] + ox}
      y2={p2[1] + oy}
      stroke="var(--s-text)"
      strokeWidth={active ? 0.85 : 0.55}
      strokeDasharray="3 4"
      opacity={active ? 0.32 : 0.14}
    />
  );

  return (
    <g pointerEvents="none">
      {[line(a, b, "ab"), line(b, c, "bc"), line(c, d, "cd"), line(d, a, "da"), line(midA, midB, "mid")]}
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
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  return (
    <g
      style={{
        opacity: active ? 0.82 : 0.24,
        transition: "opacity 300ms ease",
      }}
      pointerEvents="none"
    >
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.23, 0.28, 0.77, 0.62)}
        fill="var(--s-background)"
        opacity={0.2}
        stroke={FACE_INK}
        strokeWidth={0.75}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.3, 0.38, 0.72, 0.43)}
        fill={FACE_INK}
        opacity={0.9}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.3, 0.49, 0.63, 0.53)}
        fill={FACE_INK}
        opacity={0.58}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.3, 0.59, 0.68, 0.63)}
        fill={FACE_INK}
        opacity={0.4}
      />
      <circle cx={cx - 32} cy={cy + 4} r={2.7} fill={FACE_INK} opacity={0.85} />
    </g>
  );
}

function TopFacePresetDots({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  const dots = [0.31, 0.44, 0.57, 0.7];
  return (
    <g
      style={{
        opacity: active ? 0.8 : 0.24,
        transition: "opacity 300ms ease",
      }}
      pointerEvents="none"
    >
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.22, 0.3, 0.78, 0.62)}
        fill="var(--s-background)"
        opacity={0.18}
        stroke={FACE_INK}
        strokeWidth={0.75}
      />
      {dots.map((u, i) => {
        const [x, y] = pointOnQuad(geo.top, u, 0.43);
        const [x2, y2] = pointOnQuad(geo.top, u, 0.58);
        return (
          <g key={i}>
            <polygon
              points={projectedRect(geo.top, ox, oy, u - 0.04, 0.46, u + 0.04, 0.61)}
              fill={FACE_INK}
              opacity={0.16 + i * 0.12}
              stroke={FACE_INK}
              strokeWidth={0.45}
            />
            <circle
              cx={x + ox}
              cy={y + oy - 2}
              r={2.2}
              fill={FACE_INK}
              opacity={0.35 + i * 0.12}
              stroke={FACE_INK}
              strokeWidth={0.4}
            />
            <line
              x1={x + ox}
              y1={y + oy + 4}
              x2={x2 + ox}
              y2={y2 + oy}
              stroke={FACE_INK}
              strokeWidth={0.45}
              opacity={0.5}
            />
          </g>
        );
      })}
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        fill={FACE_INK}
        fontSize={6}
        fontWeight={700}
        letterSpacing="0.12em"
        style={{ fontFamily: "var(--s-font-mono, monospace)" }}
      >
        PRESET BUNDLE
      </text>
    </g>
  );
}

function TopFaceComponentBlocks({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  return (
    <g
      style={{
        opacity: active ? 0.86 : 0.26,
        transition: "opacity 300ms ease",
      }}
      pointerEvents="none"
    >
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.19, 0.25, 0.81, 0.68)}
        fill="var(--s-background)"
        opacity={0.18}
        stroke={FACE_INK}
        strokeWidth={0.75}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.28, 0.36, 0.49, 0.48)}
        fill={FACE_INK}
        opacity={0.9}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.33, 0.41, 0.44, 0.43)}
        fill="var(--s-background)"
        opacity={0.85}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.52, 0.35, 0.73, 0.5)}
        fill="transparent"
        stroke={FACE_INK}
        strokeWidth={0.9}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.56, 0.42, 0.69, 0.45)}
        fill={FACE_INK}
        opacity={0.75}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.32, 0.58, 0.68, 0.64)}
        fill={FACE_INK}
        opacity={0.26}
      />
      <circle cx={cx + 24} cy={cy} r={2.4} fill={FACE_INK} opacity={0.9} />
    </g>
  );
}

function TopFacePageIcon({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  return (
    <g
      style={{
        opacity: active ? 0.84 : 0.24,
        transition: "opacity 300ms ease",
      }}
      pointerEvents="none"
    >
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.2, 0.24, 0.8, 0.72)}
        fill="var(--s-background)"
        opacity={0.17}
        stroke={FACE_INK}
        strokeWidth={0.7}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.2, 0.24, 0.8, 0.35)}
        fill={FACE_INK}
        opacity={0.14}
      />
      <circle cx={cx - 34} cy={cy - 20} r={1.4} fill={FACE_INK} opacity={0.72} />
      <circle cx={cx - 28} cy={cy - 17} r={1.4} fill={FACE_INK} opacity={0.55} />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.3, 0.45, 0.58, 0.5)}
        fill={FACE_INK}
        opacity={0.82}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.31, 0.57, 0.72, 0.62)}
        fill={FACE_INK}
        opacity={0.46}
      />
      <polygon
        points={projectedRect(geo.top, ox, oy, 0.58, 0.63, 0.74, 0.7)}
        fill={FACE_INK}
        opacity={0.9}
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
