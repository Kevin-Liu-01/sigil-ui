"use client";

import { useState, type HTMLAttributes } from "react";
import {
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  DensityText,
  Button,
  Badge,
  cn,
} from "@sigil-ui/components";

export interface ComponentAnatomyDiagramProps extends HTMLAttributes<HTMLDivElement> {}

type TokenEntry = {
  id: string;
  label: string;
  variable: string;
  value: string;
};

const TOKENS: TokenEntry[] = [
  { id: "fill", label: "FILL COLOR", variable: "--s-primary", value: "oklch(0.7 0.15 280)" },
  { id: "text", label: "TEXT COLOR", variable: "--s-primary-contrast", value: "#fff" },
  { id: "radius", label: "CORNER RADIUS", variable: "--s-radius-md", value: "6px" },
  { id: "font", label: "FONT FAMILY", variable: "--s-font-mono", value: '"Roboto Mono"' },
  { id: "speed", label: "TRANSITION", variable: "--s-duration-fast", value: "150ms" },
  { id: "shadow", label: "SHADOW", variable: "--s-shadow-sm", value: "0 1px 2px..." },
];

/**
 * SVG callout positions for the four labeled arrows.
 * Each maps a token id to start (on the button) and end (toward the label) coords.
 * Viewbox is 320×240.
 */
const CALLOUTS: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [
  { id: "fill", x1: 90, y1: 70, x2: 20, y2: 20 },
  { id: "radius", x1: 230, y1: 70, x2: 300, y2: 20 },
  { id: "font", x1: 90, y1: 110, x2: 20, y2: 200 },
  { id: "speed", x1: 230, y1: 110, x2: 300, y2: 200 },
];

const CALLOUT_LABELS: Record<string, [string, string]> = {
  fill: ["fill", "--s-primary"],
  radius: ["radius", "--s-radius-md"],
  font: ["font", "--s-font-mono"],
  speed: ["speed", "--s-duration-fast"],
};

function CalloutDot({ cx, cy, active }: { cx: number; cy: number; active: boolean }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill={active ? "var(--s-primary)" : "var(--s-border)"}
      style={{ transition: "fill 150ms ease" }}
    />
  );
}

export function ComponentAnatomyDiagram({ className, ...rest }: ComponentAnatomyDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      data-slot="component-anatomy-diagram"
      className={cn("border border-[var(--s-border)]", className)}
      {...rest}
    >
      <GapPixelGrid columns={{ base: 1, md: 2 }} gap={1}>
        {/* Left column — the component with SVG callout overlay */}
        <GapPixelCell className="p-6 relative min-h-[280px] flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[320px] mx-auto">
            <svg
              viewBox="0 0 320 240"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              aria-hidden
            >
              {CALLOUTS.map((c) => {
                const active = hovered === c.id;
                return (
                  <g key={c.id}>
                    <line
                      x1={c.x1}
                      y1={c.y1}
                      x2={c.x2}
                      y2={c.y2}
                      stroke={active ? "var(--s-primary)" : "var(--s-border)"}
                      strokeWidth={1}
                      style={{ transition: "stroke 150ms ease" }}
                    />
                    <CalloutDot cx={c.x1} cy={c.y1} active={active} />
                    <CalloutDot cx={c.x2} cy={c.y2} active={active} />
                    {/* Label at the endpoint */}
                    <text
                      x={c.x2}
                      y={c.y2 - 8}
                      textAnchor={c.x2 < 160 ? "start" : "end"}
                      className="font-[family-name:var(--s-font-mono)]"
                      fill={active ? "var(--s-primary)" : "var(--s-text-muted)"}
                      fontSize={9}
                      style={{ transition: "fill 150ms ease" }}
                    >
                      {CALLOUT_LABELS[c.id]?.[0]}
                    </text>
                    <text
                      x={c.x2}
                      y={c.y2 + 12}
                      textAnchor={c.x2 < 160 ? "start" : "end"}
                      className="font-[family-name:var(--s-font-mono)]"
                      fill={active ? "var(--s-primary)" : "var(--s-text-muted)"}
                      fontSize={8}
                      opacity={0.7}
                      style={{ transition: "fill 150ms ease" }}
                    >
                      {CALLOUT_LABELS[c.id]?.[1]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Centered component specimens */}
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <Button size="lg">Get Started</Button>
              <div className="flex items-center gap-2">
                <Badge>New</Badge>
                <div
                  className="h-8 w-20 rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)]"
                  style={{ background: "var(--s-surface)" }}
                />
              </div>
            </div>
          </div>
        </GapPixelCell>

        {/* Right column — token breakdown */}
        <GapPixelCell className="p-6">
          <MonoLabel variant="accent" className="mb-5 block">TOKEN CONSUMPTION</MonoLabel>

          <div className="flex flex-col">
            {TOKENS.map((token) => {
              const active = hovered === token.id;
              return (
                <div
                  key={token.id}
                  className={cn(
                    "flex flex-col gap-1 py-3 border-b border-[var(--s-border)] cursor-default transition-colors",
                    active && "bg-[var(--s-surface)]",
                  )}
                  onMouseEnter={() => setHovered(token.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <DensityText role="chrome">{token.label}</DensityText>
                  <div className="flex items-baseline justify-between gap-3">
                    <MonoLabel
                      size="sm"
                      variant={active ? "accent" : "inverse"}
                      className="normal-case tracking-normal"
                    >
                      {token.variable}
                    </MonoLabel>
                    <TabularValue size="xs" muted>{token.value}</TabularValue>
                  </div>
                </div>
              );
            })}
          </div>
        </GapPixelCell>
      </GapPixelGrid>
    </div>
  );
}
