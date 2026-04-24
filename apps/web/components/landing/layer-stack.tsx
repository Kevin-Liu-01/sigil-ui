"use client";

import { useState, useMemo, useCallback, type HTMLAttributes } from "react";
import {
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
    subtitle: "31 curated + custom",
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
      "100+ production components built on Radix primitives. They consume var(--s-*) tokens — never hardcode values. Switch presets and the entire library updates.",
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

const AGENT_ITEMS = [
  "AGENTS.md",
  "tokens.md",
  "compileToCss()",
  "sigil doctor",
];

/* ================================================================ */
/* Isometric helpers                                                  */
/* ================================================================ */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

function iso(x: number, y: number, z: number): [number, number] {
  return [(x - z) * COS30, (x + z) * SIN30 - y];
}

function darken(color: string, amount: number): string {
  const m = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!m) return color;
  return `oklch(${Math.max(0, parseFloat(m[1]) - amount).toFixed(2)} ${m[2]} ${m[3]})`;
}

/* ================================================================ */
/* Constants                                                          */
/* ================================================================ */

const W = 170;
const D = 170;
const H = 22;
const GAP = 10;
const LIFT = 14;
const MARGIN = 48;

/* ================================================================ */
/* Component                                                          */
/* ================================================================ */

export interface LayerStackDiagramProps
  extends HTMLAttributes<HTMLDivElement> {}

export function LayerStackDiagram({
  className,
  ...rest
}: LayerStackDiagramProps) {
  const [active, setActive] = useState<string>("tokens");
  const activeLayer = LAYERS.find((l) => l.id === active) ?? LAYERS[0];

  const handleSetActive = useCallback((id: string) => setActive(id), []);

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
        iso(0, y0 + H, 0),
        iso(0, y0 + H, D),
        iso(0, y0, D),
        iso(0, y0, 0),
      ];
      const right = [
        iso(0, y0 + H, D),
        iso(W, y0 + H, D),
        iso(W, y0, D),
        iso(0, y0, D),
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-16 items-center min-h-[420px]">
        {/* ────────────────── Isometric SVG ────────────────── */}
        <div className="relative flex items-center justify-center py-4">
          {/* subtle dot grid behind the stack */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full max-w-[500px] select-none"
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
              <filter id="iso-drop" x="-15%" y="-15%" width="130%" height="145%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="7"
                  floodColor="#000"
                  floodOpacity="0.14"
                />
              </filter>
            </defs>

            {LAYERS.map((layer, i) => {
              const geo = geos[i];
              const isActive = active === layer.id;
              const topColor = layer.color;
              const leftColor = darken(layer.color, 0.20);
              const rightColor = darken(layer.color, 0.12);
              const ease =
                "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)";

              return (
                <g
                  key={layer.id}
                  className="cursor-pointer"
                  style={{
                    transform: isActive
                      ? `translateY(-${LIFT}px)`
                      : "translateY(0)",
                    transition: ease,
                  }}
                  onMouseEnter={() => handleSetActive(layer.id)}
                  onClick={() => handleSetActive(layer.id)}
                >
                  {/* Left face */}
                  <polygon
                    points={geo.left.map(pt).join(" ")}
                    fill={leftColor}
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 0.8 : 0.4}
                    style={{
                      opacity: isActive ? 1 : 0.55,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  {/* Right face */}
                  <polygon
                    points={geo.right.map(pt).join(" ")}
                    fill={rightColor}
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 0.8 : 0.4}
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />
                  {/* Top face */}
                  <polygon
                    points={geo.top.map(pt).join(" ")}
                    fill={topColor}
                    stroke={isActive ? "var(--s-text)" : "var(--s-border)"}
                    strokeWidth={isActive ? 1.2 : 0.4}
                    filter={isActive ? "url(#iso-drop)" : undefined}
                    style={{
                      opacity: isActive ? 1 : 0.65,
                      transition: "opacity 400ms ease, stroke 300ms ease",
                    }}
                  />

                  {/* ── Decorative top-face content ── */}
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

                  {/* Number label */}
                  <text
                    x={geo.center[0] + ox}
                    y={geo.center[1] + oy - 1}
                    textAnchor="middle"
                    fill="white"
                    fontSize={13}
                    fontWeight={700}
                    style={{
                      fontFamily: "var(--s-font-mono, monospace)",
                      opacity: isActive ? 1 : 0.75,
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
                    fill="white"
                    fontSize={7}
                    fontWeight={600}
                    letterSpacing="0.1em"
                    style={{
                      fontFamily: "var(--s-font-mono, monospace)",
                      opacity: isActive ? 0.9 : 0.5,
                      transition: "opacity 300ms ease",
                    }}
                  >
                    {layer.title}
                  </text>
                </g>
              );
            })}

            {/* ── Agent layer dashed line ── */}
            <AgentLine ox={ox} oy={oy} />
          </svg>
        </div>

        {/* ────────────────── Detail Panel ────────────────── */}
        <div>
          {/* Layer selector tabs */}
          <div className="flex gap-0 border-b border-[var(--s-border)] mb-6">
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSetActive(layer.id)}
                className={cn(
                  "bg-transparent border-0 px-4 py-2 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)]",
                  active === layer.id
                    ? "text-[var(--s-text)] border-b-2 border-b-[var(--s-primary)]"
                    : "text-[var(--s-text-muted)] border-b-2 border-b-transparent hover:text-[var(--s-text)]",
                )}
              >
                <MonoLabel
                  size="sm"
                  variant={active === layer.id ? "accent" : "muted"}
                >
                  {layer.num}
                </MonoLabel>
              </button>
            ))}
          </div>

          {/* Active layer details */}
          <div
            key={activeLayer.id}
            className="animate-[s-fade-in_300ms_ease]"
          >
            <div className="flex items-baseline gap-3 mb-3">
              <TabularValue
                size="lg"
                className="text-[var(--s-primary)] font-bold"
              >
                {activeLayer.num}
              </TabularValue>
              <h3 className="font-[family-name:var(--s-font-display)] text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-[var(--s-text)]">
                {activeLayer.title}
              </h3>
            </div>

            <DensityText
              role="body"
              as="p"
              muted
              className="mb-6 max-w-md leading-relaxed"
            >
              {activeLayer.description}
            </DensityText>

            <div className="flex flex-col mb-5 max-w-sm">
              {activeLayer.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-3 py-2.5 border-b border-[var(--s-border)]"
                >
                  <DensityText
                    role="chrome"
                    className="font-[family-name:var(--s-font-mono)]"
                  >
                    {item.label}
                  </DensityText>
                  {item.value && (
                    <TabularValue size="xs" muted>
                      {item.value}
                    </TabularValue>
                  )}
                </div>
              ))}
            </div>

            <MonoLabel className="block">{activeLayer.subtitle}</MonoLabel>
          </div>
        </div>
      </div>

      {/* ────────────────── Agent Bar ────────────────── */}
      <div
        className="mt-8 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
        style={{
          borderTop: "2px solid var(--s-primary)",
          background:
            "color-mix(in oklch, var(--s-primary) 4%, var(--s-background))",
        }}
      >
        <div className="shrink-0">
          <MonoLabel variant="accent" className="block mb-0.5">
            AGENT LAYER
          </MonoLabel>
          <DensityText role="chrome" muted>
            Human or AI — same interface
          </DensityText>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {AGENT_ITEMS.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 font-[family-name:var(--s-font-mono)] text-[11px] text-[var(--s-primary)]"
              style={{
                border: "1px solid var(--s-primary)",
                background:
                  "color-mix(in oklch, var(--s-primary) 8%, transparent)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <DensityText role="chrome" muted className="sm:ml-auto">
          Agents edit tokens, not components
        </DensityText>
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
    center: [number, number];
  };
  ox: number;
  oy: number;
  active: boolean;
};

function TopFaceTokenLines({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  const lineW = 28;
  return (
    <g
      style={{
        opacity: active ? 0.35 : 0.15,
        transition: "opacity 300ms ease",
      }}
    >
      {[-16, -10, -4, 2].map((dy, i) => (
        <line
          key={i}
          x1={cx - lineW + i * 4}
          y1={cy + dy}
          x2={cx + lineW - 8 - i * 6}
          y2={cy + dy}
          stroke="white"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

function TopFacePresetDots({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  const dots = [
    { dx: -12, color: "oklch(0.65 0.15 280)" },
    { dx: -4, color: "oklch(0.50 0.0 0)" },
    { dx: 4, color: "oklch(0.65 0.12 50)" },
    { dx: 12, color: "oklch(0.75 0.0 0)" },
  ];
  return (
    <g
      style={{
        opacity: active ? 0.55 : 0.2,
        transition: "opacity 300ms ease",
      }}
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={cx + d.dx}
          cy={cy - 12}
          r={2.5}
          fill={d.color}
          stroke="white"
          strokeWidth={0.4}
        />
      ))}
    </g>
  );
}

function TopFaceComponentBlocks({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  return (
    <g
      style={{
        opacity: active ? 0.35 : 0.15,
        transition: "opacity 300ms ease",
      }}
    >
      <rect
        x={cx - 18}
        y={cy - 16}
        width={14}
        height={6}
        rx={1}
        fill="none"
        stroke="white"
        strokeWidth={0.8}
      />
      <rect
        x={cx + 2}
        y={cy - 16}
        width={14}
        height={6}
        rx={1}
        fill="none"
        stroke="white"
        strokeWidth={0.8}
      />
      <rect
        x={cx - 8}
        y={cy - 7}
        width={14}
        height={6}
        rx={1}
        fill="none"
        stroke="white"
        strokeWidth={0.8}
      />
    </g>
  );
}

function TopFacePageIcon({ geo, ox, oy, active }: FaceProps) {
  const cx = geo.center[0] + ox;
  const cy = geo.center[1] + oy;
  return (
    <g
      style={{
        opacity: active ? 0.35 : 0.15,
        transition: "opacity 300ms ease",
      }}
    >
      <rect
        x={cx - 8}
        y={cy - 16}
        width={16}
        height={12}
        rx={1}
        fill="none"
        stroke="white"
        strokeWidth={0.8}
      />
      <line
        x1={cx - 8}
        y1={cy - 12}
        x2={cx + 8}
        y2={cy - 12}
        stroke="white"
        strokeWidth={0.6}
      />
      <line
        x1={cx - 5}
        y1={cy - 9}
        x2={cx + 4}
        y2={cy - 9}
        stroke="white"
        strokeWidth={0.5}
        opacity={0.6}
      />
      <line
        x1={cx - 5}
        y1={cy - 7}
        x2={cx + 2}
        y2={cy - 7}
        stroke="white"
        strokeWidth={0.5}
        opacity={0.6}
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
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={y2}
        stroke="var(--s-primary)"
        strokeWidth={1.5}
        strokeDasharray="3 4"
        opacity={0.35}
      />
      <circle cx={x} cy={y1} r={2} fill="var(--s-primary)" opacity={0.5} />
      <circle cx={x} cy={y2} r={2} fill="var(--s-primary)" opacity={0.5} />
      <text
        x={x - 6}
        y={midY}
        textAnchor="middle"
        fill="var(--s-primary)"
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
