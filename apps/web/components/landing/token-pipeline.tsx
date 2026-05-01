"use client";

import { useEffect, useState } from "react";
import {
  MonoLabel,
  TabularValue,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Progress,
  cn,
} from "@sigil-ui/components";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TokenPipelineDiagramProps {
  className?: string;
  style?: React.CSSProperties;
  /** Cycling interval in ms. @default 3000 */
  interval?: number;
}

/* ------------------------------------------------------------------ */
/*  Token groups that cycle through the animation                      */
/* ------------------------------------------------------------------ */

type TokenGroup = "colors" | "typography" | "spacing" | "radius";

const TOKEN_GROUPS: TokenGroup[] = ["colors", "typography", "spacing", "radius"];

const MARKDOWN_TOKENS: Record<
  TokenGroup,
  { label: string; heading: string; lines: string[]; effect: string }
> = {
  colors: {
    label: "color",
    heading: "## Colors",
    lines: [
      "primary: oklch(0.7 0.15 280)",
      "surface: oklch(0.17 0.01 260)",
      "border: oklch(0.25 0.02 260)",
    ],
    effect: "tint",
  },
  typography: {
    label: "type",
    heading: "## Typography",
    lines: [
      'font-display: "PP Mori"',
      'font-mono: "Berkeley Mono"',
      "heading-weight: 600",
    ],
    effect: "typeset",
  },
  spacing: {
    label: "space",
    heading: "## Spacing",
    lines: [
      "base: 4px",
      "section-py: 96px",
      "card-padding: 24px",
    ],
    effect: "reflow",
  },
  radius: {
    label: "radius",
    heading: "## Radius",
    lines: [
      "radius-sm: 4px",
      "radius-md: 8px",
      "radius-lg: 12px",
    ],
    effect: "reshape",
  },
};

const CSS_VARIABLES: Record<TokenGroup, string[]> = {
  colors: [
    "--s-primary: oklch(0.7 0.15 280);",
    "--s-surface: oklch(0.17 0.01 260);",
    "--s-border: oklch(0.25 0.02 260);",
  ],
  typography: [
    '--s-font-display: "PP Mori", sans-serif;',
    '--s-font-mono: "Berkeley Mono", monospace;',
    "--s-heading-weight: 600;",
  ],
  spacing: [
    "--s-spacing-base: 4px;",
    "--s-section-py: 96px;",
    "--s-card-padding: 24px;",
  ],
  radius: [
    "--s-radius-sm: 4px;",
    "--s-radius-md: 8px;",
    "--s-radius-lg: 12px;",
  ],
};

const ORBIT_COMPONENTS = [
  { name: "Button", angle: "0deg", distance: "clamp(130px, 19vw, 210px)" },
  { name: "Badge", angle: "72deg", distance: "clamp(112px, 17vw, 188px)" },
  { name: "Input", angle: "144deg", distance: "clamp(124px, 18vw, 202px)" },
  { name: "Progress", angle: "216deg", distance: "clamp(108px, 16vw, 176px)" },
  { name: "Card", angle: "288deg", distance: "clamp(128px, 18vw, 198px)" },
];

const effectClass: Record<TokenGroup, string> = {
  colors: "shadow-[0_0_42px_color-mix(in_oklch,var(--s-primary)_32%,transparent)]",
  typography: "tracking-[0.08em]",
  spacing: "gap-4",
  radius: "rounded-[var(--s-radius-xl,var(--s-radius-lg,16px))]",
};

type StageStyle = React.CSSProperties & {
  "--mx": string;
  "--my": string;
};

type OrbitStyle = React.CSSProperties & {
  "--angle": string;
  "--distance": string;
};

function TokenFileCard({ activeGroup }: { activeGroup: TokenGroup }) {
  return (
    <div
      className="relative z-[3] w-full max-w-[360px] border bg-[var(--s-background)]/95 p-4 shadow-[var(--s-shadow-lg)] backdrop-blur transition-transform duration-300 lg:absolute lg:left-8 lg:top-8"
      style={{
        borderColor: "var(--s-border)",
        borderRadius: "var(--s-radius-lg, 12px)",
        transform: "translate3d(calc(var(--mx) * -12px), calc(var(--my) * -10px), 0)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <MonoLabel variant="accent" size="xs">
          sigil.tokens.md
        </MonoLabel>
        <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.18em] text-[var(--s-text-muted)]">
          source
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {TOKEN_GROUPS.map((group) => {
          const token = MARKDOWN_TOKENS[group];
          const isActive = group === activeGroup;

          return (
            <div
              key={group}
              className={cn(
                "border px-3 py-2 transition-all duration-300",
                isActive && "bg-[var(--s-primary)]/[0.07] sm:translate-x-2",
              )}
              style={{
                borderColor: isActive ? "var(--s-primary)" : "var(--s-border)",
                borderRadius: "var(--s-radius-md, 8px)",
              }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold text-[var(--s-text)]">
                  {token.heading}
                </span>
                {isActive && (
                  <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase text-[var(--s-primary)]">
                    compiling
                  </span>
                )}
              </div>
              {token.lines.map((line) => (
                <div
                  key={line}
                  className="font-[family-name:var(--s-font-mono)] text-[10px] leading-relaxed text-[var(--s-text-muted)]"
                >
                  {line}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompilerSpine({ activeGroup }: { activeGroup: TokenGroup }) {
  return (
    <div
      className="relative z-[2] mx-auto flex min-h-[400px] w-full max-w-[320px] flex-col justify-between border bg-[var(--s-surface)]/80 p-4 shadow-[var(--s-shadow-md)] backdrop-blur lg:absolute lg:bottom-10 lg:left-1/2 lg:top-10 lg:-translate-x-1/2"
      style={{
        borderColor: "var(--s-border)",
        borderRadius: "var(--s-radius-lg, 12px)",
        transform: "translate3d(calc(var(--mx) * 6px), calc(var(--my) * 8px), 0)",
      }}
    >
      <div>
        <MonoLabel variant="muted" size="xs">
          compileToCss()
        </MonoLabel>
        <div className="mt-4 rounded-[var(--s-radius-md,8px)] border border-[var(--s-border)] bg-[var(--s-background)] p-3">
          <div className="mb-2 font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)]">
            :root {"{"}
          </div>
          {CSS_VARIABLES[activeGroup].map((line) => (
            <div
              key={line}
              className="font-[family-name:var(--s-font-mono)] text-[10px] leading-relaxed text-[var(--s-text)]"
            >
              {line}
            </div>
          ))}
          <div className="mt-2 font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)]">
            {"}"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {TOKEN_GROUPS.map((group) => (
          <div
            key={group}
            className={cn(
              "h-1.5 rounded-[var(--s-radius-full,9999px)] transition-all duration-300",
              group === activeGroup
                ? "bg-[var(--s-primary)]"
                : "bg-[var(--s-border)]",
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <TabularValue size="xs" muted>
          300+ vars
        </TabularValue>
        <Badge size="sm" variant="outline" className="font-[family-name:var(--s-font-mono)] text-[8px]">
          instant
        </Badge>
      </div>
    </div>
  );
}

function OrbitCard({
  name,
  angle,
  distance,
  activeGroup,
}: {
  name: string;
  angle: string;
  distance: string;
  activeGroup: TokenGroup;
}) {
  const style: OrbitStyle = {
    "--angle": angle,
    "--distance": distance,
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 hidden h-16 w-28 -translate-x-1/2 -translate-y-1/2 lg:block"
      style={style}
    >
      <div className="sigil-token-orbit-node h-full w-full">
        <div
          className={cn(
            "flex h-full w-full flex-col justify-between border bg-[var(--s-background)]/95 p-2.5 shadow-[var(--s-shadow-md)] backdrop-blur transition-all duration-500",
            effectClass[activeGroup],
          )}
          style={{
            borderColor: "var(--s-border)",
            borderRadius:
              activeGroup === "radius"
                ? "var(--s-radius-xl, 18px)"
                : "var(--s-radius-md, 8px)",
          }}
        >
          <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.16em] text-[var(--s-text-muted)]">
            {name}
          </span>
          <span className="h-1.5 w-full rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)]/70" />
        </div>
      </div>
    </div>
  );
}

function ComponentCard({ activeGroup }: { activeGroup: TokenGroup }) {
  const token = MARKDOWN_TOKENS[activeGroup];

  return (
    <div
      className="relative z-[4] mx-auto w-full max-w-[340px] transition-transform duration-500 lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2"
      style={{
        transform: "translate3d(calc(var(--mx) * 14px), calc(var(--my) * 10px), 0)",
      }}
    >
      <Card
        className={cn(
          "border bg-[var(--s-background)]/95 shadow-[var(--s-shadow-xl)] backdrop-blur transition-all duration-500",
          effectClass[activeGroup],
        )}
      >
        <CardHeader className="p-4 pb-2">
          <div className="mb-2 flex items-center justify-between">
            <Badge size="sm" className="font-[family-name:var(--s-font-mono)] text-[9px]">
              {token.effect}
            </Badge>
            <MonoLabel variant="muted" size="xs">
              components
            </MonoLabel>
          </div>
          <CardTitle
            className={cn(
              "text-[18px] transition-all duration-500",
              activeGroup === "typography" && "tracking-[-0.04em]",
            )}
          >
            Runtime Panel
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("flex flex-col gap-3 p-4 pt-1 transition-all duration-500", activeGroup === "spacing" && "gap-5")}>
          <div className="flex gap-2">
            <Button size="sm" className="text-[10px]">
              Deploy
            </Button>
            <Button size="sm" variant="outline" className="text-[10px]">
              Cancel
            </Button>
          </div>

          <Input placeholder="Search tokens..." className="h-8 text-[10px]" />

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.12em] text-[var(--s-text-muted)]">
                propagated
              </span>
              <TabularValue size="xs" muted>
                103
              </TabularValue>
            </div>
            <Progress value={100} className="h-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EffectStack({
  activeGroup,
  onSelect,
}: {
  activeGroup: TokenGroup;
  onSelect: (group: TokenGroup) => void;
}) {
  return (
    <div className="relative z-[4] grid gap-3 lg:absolute lg:bottom-8 lg:left-8 lg:w-[360px] lg:grid-cols-2">
      {TOKEN_GROUPS.map((group, index) => {
        const token = MARKDOWN_TOKENS[group];
        const isActive = group === activeGroup;

        return (
          <button
            key={group}
            type="button"
            onClick={() => onSelect(group)}
            className={cn(
              "group border bg-[var(--s-background)]/90 p-3 text-left backdrop-blur transition-all duration-300",
              isActive
                ? "translate-y-0 border-[var(--s-primary)] text-[var(--s-text)] shadow-[var(--s-shadow-md)]"
                : "translate-y-1 border-[var(--s-border)] text-[var(--s-text-muted)] opacity-70 hover:opacity-100",
            )}
            style={{
              borderRadius: "var(--s-radius-md, 8px)",
              transform: `translate3d(calc(var(--mx) * ${index - 1}px), calc(var(--my) * ${index + 2}px), 0)`,
            }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-[family-name:var(--s-font-mono)] text-[10px] uppercase tracking-[0.16em]">
                {token.label}
              </span>
              <span className="h-1.5 w-1.5 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)] opacity-70" />
            </div>
            <div className="font-[family-name:var(--s-font-mono)] text-[11px] text-[var(--s-text)]">
              {token.effect}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function TokenPipelineDiagram({
  className,
  style,
  interval = 3000,
}: TokenPipelineDiagramProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % TOKEN_GROUPS.length),
      interval,
    );
    return () => clearInterval(id);
  }, [interval]);

  const activeGroup = TOKEN_GROUPS[activeIndex];
  const stageStyle: StageStyle = {
    "--mx": pointer.x.toFixed(3),
    "--my": pointer.y.toFixed(3),
    ...style,
  };

  return (
    <div
      data-slot="token-pipeline"
      className={cn(
        "relative min-h-[650px] overflow-hidden border bg-[var(--s-background)] p-4 sm:p-6 lg:p-8",
        className,
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
      style={{
        borderColor: "var(--s-border)",
        borderRadius: "var(--s-radius-lg, 12px)",
        background:
          "radial-gradient(circle at 68% 42%, color-mix(in oklch, var(--s-primary) 18%, transparent), transparent 34%), linear-gradient(var(--s-border) 1px, transparent 1px), linear-gradient(90deg, var(--s-border) 1px, transparent 1px), var(--s-background)",
        backgroundSize: "auto, 48px 48px, 48px 48px, auto",
        ...stageStyle,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="sigil-token-scan absolute left-0 top-0 h-24 w-full border-y border-[var(--s-primary)]/40 bg-[var(--s-primary)]/[0.04]" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(520px,72vw)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--s-radius-full,9999px)] border border-[var(--s-border)] lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(360px,52vw)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--s-radius-full,9999px)] border border-dashed border-[var(--s-border)] lg:block" />

      <div className="relative z-[1] flex flex-col gap-5 lg:block lg:min-h-[600px]">
        <TokenFileCard activeGroup={activeGroup} />
        <CompilerSpine activeGroup={activeGroup} />
        <ComponentCard activeGroup={activeGroup} />
        <EffectStack
          activeGroup={activeGroup}
          onSelect={(group) => setActiveIndex(TOKEN_GROUPS.indexOf(group))}
        />

        {ORBIT_COMPONENTS.map((item) => (
          <OrbitCard
            key={item.name}
            name={item.name}
            angle={item.angle}
            distance={item.distance}
            activeGroup={activeGroup}
          />
        ))}
      </div>

      <div className="relative z-[5] mt-5 flex items-center gap-4 border-t border-[var(--s-border)] pt-4">
        {TOKEN_GROUPS.map((group, i) => (
          <button
            key={group}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "cursor-pointer border-0 bg-transparent p-0 font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.15em] transition-colors duration-200",
              i === activeIndex
                ? "text-[var(--s-primary)]"
                : "text-[var(--s-text-muted)]",
            )}
          >
            {group}
          </button>
        ))}
        <span className="ml-auto">
          <TabularValue size="xs" muted>
            {activeIndex + 1}/{TOKEN_GROUPS.length}
          </TabularValue>
        </span>
      </div>
    </div>
  );
}
