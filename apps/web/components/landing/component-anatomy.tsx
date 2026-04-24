"use client";

import { useState, type HTMLAttributes } from "react";
import {
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
  role: string;
  detail: string;
};

const TOKENS: TokenEntry[] = [
  {
    id: "fill",
    label: "Fill",
    variable: "--s-primary",
    value: "oklch(0.7 0.15 280)",
    role: "color",
    detail: "Button background, active rails, focus accents.",
  },
  {
    id: "text",
    label: "Foreground",
    variable: "--s-primary-contrast",
    value: "#fff",
    role: "contrast",
    detail: "Readable text color paired with the active surface.",
  },
  {
    id: "radius",
    label: "Corners",
    variable: "--s-radius-md",
    value: "6px",
    role: "shape",
    detail: "Shared radius contract for controls and nested chips.",
  },
  {
    id: "font",
    label: "Type",
    variable: "--s-font-mono",
    value: '"Roboto Mono"',
    role: "typography",
    detail: "Mono annotations, token labels, command surfaces.",
  },
  {
    id: "speed",
    label: "Motion",
    variable: "--s-duration-fast",
    value: "150ms",
    role: "motion",
    detail: "Hover, press, and state transitions stay synchronized.",
  },
  {
    id: "shadow",
    label: "Depth",
    variable: "--s-shadow-sm",
    value: "0 1px 2px...",
    role: "elevation",
    detail: "Small elevation cue without breaking the grid.",
  },
];

const CALLOUTS: {
  id: string;
  label: string;
  path: string;
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
}[] = [
  { id: "fill", label: "fill", path: "M188 138 L120 84 L68 84", x: 64, y: 80 },
  { id: "radius", label: "radius", path: "M318 138 L388 84 L452 84", x: 456, y: 80, anchor: "end" },
  { id: "font", label: "type", path: "M214 194 L138 272 L76 272", x: 72, y: 268 },
  { id: "speed", label: "motion", path: "M318 194 L400 272 L462 272", x: 466, y: 268, anchor: "end" },
  { id: "shadow", label: "depth", path: "M278 224 L278 316", x: 278, y: 336, anchor: "middle" },
];

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
  const [hovered, setHovered] = useState<string | null>("fill");
  const activeToken = TOKENS.find((token) => token.id === hovered) ?? TOKENS[0];

  return (
    <div
      data-slot="component-anatomy-diagram"
      className={cn("overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)]", className)}
      {...rest}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[430px] border-b border-[var(--s-border)] bg-[var(--s-background)] p-5 lg:border-b-0 lg:border-r">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-[1] flex items-center justify-between gap-3">
            <MonoLabel variant="accent">component blueprint</MonoLabel>
            <TabularValue size="xs" muted>
              var(--s-*) in use
            </TabularValue>
          </div>

          <div className="relative z-[1] mt-6 h-[340px]">
            <svg viewBox="0 0 520 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              <rect
                x="142"
                y="106"
                width="236"
                height="136"
                stroke="var(--s-border)"
                strokeDasharray="5 5"
                opacity="0.72"
              />
              <rect
                x="172"
                y="126"
                width="176"
                height="78"
                fill="color-mix(in oklch, var(--s-primary) 8%, var(--s-background))"
                stroke="var(--s-border)"
              />
              <line x1="260" y1="52" x2="260" y2="306" stroke="var(--s-border-muted)" strokeDasharray="3 5" />
              <line x1="88" y1="174" x2="432" y2="174" stroke="var(--s-border-muted)" strokeDasharray="3 5" />
              {CALLOUTS.map((callout) => {
                const active = hovered === callout.id;
                return (
                  <g key={callout.id}>
                    <path
                      d={callout.path}
                      stroke={active ? "var(--s-primary)" : "var(--s-border)"}
                      strokeWidth={active ? 1.4 : 1}
                      strokeDasharray={active ? undefined : "4 4"}
                      style={{ transition: "stroke 150ms ease" }}
                    />
                    <CalloutDot cx={callout.x} cy={callout.y + 4} active={active} />
                    <text
                      x={callout.x}
                      y={callout.y - 4}
                      textAnchor={callout.anchor ?? "start"}
                      className="font-[family-name:var(--s-font-mono)]"
                      fill={active ? "var(--s-primary)" : "var(--s-text-muted)"}
                      fontSize={10}
                      fontWeight={700}
                      letterSpacing="0.12em"
                    >
                      {callout.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative flex flex-col items-center gap-3 border border-[var(--s-border)] bg-[var(--s-surface)] p-5 shadow-[var(--s-shadow-md)]"
                onMouseEnter={() => setHovered("fill")}
                onMouseLeave={() => setHovered(null)}
              >
                <Button size="lg">Get Started</Button>
                <div className="flex items-center gap-2">
                  <Badge onMouseEnter={() => setHovered("text")}>New</Badge>
                  <div
                    onMouseEnter={() => setHovered("radius")}
                    className="h-8 w-24 rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)] bg-[var(--s-background)]"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 h-4 w-40 -translate-x-1/2 border border-[var(--s-border-muted)] bg-[var(--s-text)]/5 blur-[1px]" />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-2">
              {["source token", "compiled var", "component class"].map((label, index) => (
                <div key={label} className="border border-[var(--s-border)] bg-[var(--s-background)] p-2">
                  <TabularValue size="xs" muted className="block">
                    {String(index + 1).padStart(2, "0")}
                  </TabularValue>
                  <MonoLabel size="xs" className="mt-1 block">
                    {label}
                  </MonoLabel>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[var(--s-surface)] p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <MonoLabel variant="accent" className="mb-2 block">token consumption</MonoLabel>
              <DensityText role="body" as="p" muted className="max-w-[420px] leading-relaxed">
                Each visual decision resolves to one named token, then every component reads the same CSS variable.
              </DensityText>
            </div>
            <Badge variant="outline" className="font-[family-name:var(--s-font-mono)]">
              {activeToken.role}
            </Badge>
          </div>

          <div className="mb-5 border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <MonoLabel variant="accent" size="sm">
                selected token
              </MonoLabel>
              <TabularValue size="xs" muted>{activeToken.value}</TabularValue>
            </div>
            <DensityText role="headline" as="h3" className="mb-2 text-xl font-semibold">
              {activeToken.label}
            </DensityText>
            <MonoLabel className="mb-3 block normal-case tracking-normal">
              {activeToken.variable}
            </MonoLabel>
            <DensityText role="body" as="p" muted className="leading-relaxed">
              {activeToken.detail}
            </DensityText>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TOKENS.map((token) => {
              const active = hovered === token.id;
              return (
                <div
                  key={token.id}
                  className={cn(
                    "cursor-default border bg-[var(--s-background)] p-3 transition-all duration-[var(--s-duration-fast,150ms)]",
                    active
                      ? "border-[var(--s-primary)] shadow-[var(--s-shadow-sm)]"
                      : "border-[var(--s-border)] hover:border-[var(--s-border-strong)]",
                  )}
                  onMouseEnter={() => setHovered(token.id)}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <DensityText role="detail" className="font-semibold">
                        {token.label}
                      </DensityText>
                      <MonoLabel
                        size="xs"
                        variant={active ? "accent" : "muted"}
                        className="mt-1 block normal-case tracking-normal"
                      >
                        {token.variable}
                      </MonoLabel>
                    </div>
                    <TabularValue size="xs" muted>
                      {token.role}
                    </TabularValue>
                  </div>
                  <div className="h-1.5 bg-[var(--s-border-muted)]">
                    <div
                      className="h-full bg-[var(--s-primary)] transition-all duration-[var(--s-duration-fast,150ms)]"
                      style={{ width: active ? "100%" : "42%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
