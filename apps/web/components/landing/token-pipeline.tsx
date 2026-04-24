"use client";

import { useState, useEffect } from "react";
import {
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  CardCell,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Switch,
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

const MARKDOWN_TOKENS: Record<TokenGroup, { heading: string; lines: string[] }> = {
  colors: {
    heading: "## Colors",
    lines: [
      "primary: oklch(0.7 0.15 280)",
      "background: oklch(0.13 0.01 260)",
      "surface: oklch(0.17 0.01 260)",
      "text: oklch(0.93 0.01 260)",
      "border: oklch(0.25 0.02 260)",
    ],
  },
  typography: {
    heading: "## Typography",
    lines: [
      'font-display: "PP Mori"',
      'font-body: "Inter"',
      'font-mono: "Berkeley Mono"',
      "heading-weight: 600",
    ],
  },
  spacing: {
    heading: "## Spacing",
    lines: [
      "base: 4px",
      "section-py: 96px",
      "card-padding: 24px",
      "input-height: 40px",
    ],
  },
  radius: {
    heading: "## Radius",
    lines: [
      "radius-sm: 4px",
      "radius-md: 8px",
      "radius-lg: 12px",
      "radius-full: 9999px",
    ],
  },
};

const CSS_VARIABLES: Record<TokenGroup, string[]> = {
  colors: [
    "--s-primary: oklch(0.7 0.15 280);",
    "--s-background: oklch(0.13 0.01 260);",
    "--s-surface: oklch(0.17 0.01 260);",
    "--s-text: oklch(0.93 0.01 260);",
    "--s-border: oklch(0.25 0.02 260);",
  ],
  typography: [
    '--s-font-display: "PP Mori", sans-serif;',
    '--s-font-body: "Inter", sans-serif;',
    '--s-font-mono: "Berkeley Mono", monospace;',
    "--s-heading-weight: 600;",
  ],
  spacing: [
    "--s-spacing-base: 4px;",
    "--s-section-py: 96px;",
    "--s-card-padding: 24px;",
    "--s-input-height: 40px;",
  ],
  radius: [
    "--s-radius-sm: 4px;",
    "--s-radius-md: 8px;",
    "--s-radius-lg: 12px;",
    "--s-radius-full: 9999px;",
  ],
};

const AFFECTED_COMPONENTS: Record<TokenGroup, string[]> = {
  colors: ["button", "badge", "card", "progress"],
  typography: ["card-title", "input", "badge"],
  spacing: ["card", "input"],
  radius: ["button", "badge", "card", "input"],
};

/* ------------------------------------------------------------------ */
/*  Flow arrow between columns                                         */
/* ------------------------------------------------------------------ */

function FlowArrow({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-6">
      <MonoLabel size="xs" variant={active ? "accent" : "muted"}>
        {label}
      </MonoLabel>
      <div className="flex items-center gap-0.5">
        <div
          className="h-px w-6 transition-colors duration-300"
          style={{
            background: active ? "var(--s-primary)" : "var(--s-text-muted)",
          }}
        />
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          className="transition-colors duration-300"
        >
          <path
            d="M1 1L5 5L1 9"
            stroke={active ? "var(--s-primary)" : "var(--s-text-muted)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Column 1: Markdown source                                          */
/* ------------------------------------------------------------------ */

function MarkdownColumn({ activeGroup }: { activeGroup: TokenGroup }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <MonoLabel variant="accent" size="xs">
        SIGIL.TOKENS.MD
      </MonoLabel>
      <div
        className="flex flex-col gap-0.5 overflow-hidden"
        style={{
          background: "var(--s-surface, var(--s-background))",
          borderRadius: "var(--s-radius-sm, 4px)",
          border: "1px solid var(--s-border)",
        }}
      >
        {TOKEN_GROUPS.map((group) => {
          const isActive = group === activeGroup;
          const { heading, lines } = MARKDOWN_TOKENS[group];
          return (
            <div
              key={group}
              data-slot="token-group"
              className={cn(
                "px-3 py-2 transition-all duration-300",
                isActive && "bg-[var(--s-primary)]/[0.06]",
              )}
              style={{
                borderLeft: isActive
                  ? "2px solid var(--s-primary)"
                  : "2px solid transparent",
              }}
            >
              <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold text-[var(--s-text)]">
                {heading}
              </span>
              {lines.map((line) => (
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

/* ------------------------------------------------------------------ */
/*  Column 2: CSS variables                                            */
/* ------------------------------------------------------------------ */

function CssColumn({ activeGroup }: { activeGroup: TokenGroup }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <MonoLabel variant="muted" size="xs">
        CSS VARIABLES
      </MonoLabel>
      <div
        className="flex flex-col gap-0.5 overflow-hidden"
        style={{
          background: "var(--s-surface, var(--s-background))",
          borderRadius: "var(--s-radius-sm, 4px)",
          border: "1px solid var(--s-border)",
        }}
      >
        <div className="px-3 py-1.5 text-[10px] font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)]">
          :root {"{"}
        </div>
        {TOKEN_GROUPS.map((group) => {
          const isActive = group === activeGroup;
          const vars = CSS_VARIABLES[group];
          return (
            <div
              key={group}
              data-slot="css-group"
              className={cn(
                "px-3 py-1.5 transition-all duration-300",
                isActive && "bg-[var(--s-primary)]/[0.06]",
              )}
              style={{
                borderLeft: isActive
                  ? "2px solid var(--s-primary)"
                  : "2px solid transparent",
              }}
            >
              {vars.map((v) => (
                <div
                  key={v}
                  className="font-[family-name:var(--s-font-mono)] text-[10px] leading-relaxed pl-3"
                  style={{
                    color: isActive
                      ? "var(--s-text)"
                      : "var(--s-text-muted)",
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          );
        })}
        <div className="px-3 py-1.5 text-[10px] font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)]">
          {"}"}
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <TabularValue size="xs" muted>
          259 variables compiled
        </TabularValue>
        <Badge size="sm" variant="outline" className="text-[8px] font-[family-name:var(--s-font-mono)]">
          v2.4
        </Badge>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Column 3: Live components                                          */
/* ------------------------------------------------------------------ */

function ComponentsColumn({ activeGroup }: { activeGroup: TokenGroup }) {
  const affected = AFFECTED_COMPONENTS[activeGroup];

  function glowRing(id: string) {
    return affected.includes(id)
      ? "ring-1 ring-[var(--s-primary)]/40 shadow-[0_0_8px_var(--s-primary)]/20"
      : "";
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      <MonoLabel variant="muted" size="xs">
        COMPONENTS
      </MonoLabel>
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2">
          <Button
            size="sm"
            className={cn(
              "text-[10px] transition-shadow duration-300",
              glowRing("button"),
            )}
          >
            Deploy
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "text-[10px] transition-shadow duration-300",
              glowRing("button"),
            )}
          >
            Cancel
          </Button>
        </div>

        <div className="flex gap-1.5">
          <Badge
            size="sm"
            className={cn(
              "transition-shadow duration-300",
              glowRing("badge"),
            )}
          >
            Stable
          </Badge>
          <Badge
            size="sm"
            variant="secondary"
            className={cn(
              "transition-shadow duration-300",
              glowRing("badge"),
            )}
          >
            Beta
          </Badge>
          <Badge
            size="sm"
            variant="outline"
            className={cn(
              "transition-shadow duration-300",
              glowRing("badge"),
            )}
          >
            v2.4
          </Badge>
        </div>

        <Card
          className={cn(
            "transition-shadow duration-300",
            glowRing("card"),
          )}
        >
          <CardHeader className="p-3 pb-1.5">
            <CardTitle
              className={cn(
                "text-[11px] transition-shadow duration-300",
                affected.includes("card-title") &&
                  "text-[var(--s-primary)]",
              )}
            >
              Edge Compute
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-[9px] text-[var(--s-text-muted)] leading-relaxed">
              Deploy functions at the edge with sub-50ms cold starts across 12
              regions.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[var(--s-text)]">
            Dark Mode
          </span>
          <Switch defaultChecked />
        </div>

        <Input
          placeholder="Search tokens..."
          className={cn(
            "h-8 text-[10px] transition-shadow duration-300",
            glowRing("input"),
          )}
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] text-[var(--s-text-muted)]">
              Build progress
            </span>
            <TabularValue size="xs" muted>
              100%
            </TabularValue>
          </div>
          <Progress
            value={100}
            className={cn(
              "h-1 transition-shadow duration-300",
              glowRing("progress"),
            )}
          />
        </div>
      </div>
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

  useEffect(() => {
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % TOKEN_GROUPS.length),
      interval,
    );
    return () => clearInterval(id);
  }, [interval]);

  const activeGroup = TOKEN_GROUPS[activeIndex];

  return (
    <div
      data-slot="token-pipeline"
      className={cn("overflow-hidden", className)}
      style={{
        border: "1px solid var(--s-border)",
        borderRadius: "var(--s-radius-md, 8px)",
        ...style,
      }}
    >
      {/* 5-column grid: source | arrow | css | arrow | components */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr auto 1fr auto 1fr",
          background: "var(--s-border)",
          gap: "1px",
        }}
      >
        {/* Col 1: Markdown source */}
        <div style={{ background: "var(--s-background)" }}>
          <MarkdownColumn activeGroup={activeGroup} />
        </div>

        {/* Arrow 1 */}
        <div
          className="flex items-center"
          style={{ background: "var(--s-background)" }}
        >
          <FlowArrow active={true} label="compileToCss()" />
        </div>

        {/* Col 2: CSS variables */}
        <div style={{ background: "var(--s-background)" }}>
          <CssColumn activeGroup={activeGroup} />
        </div>

        {/* Arrow 2 */}
        <div
          className="flex items-center"
          style={{ background: "var(--s-background)" }}
        >
          <FlowArrow active={true} label="var(--s-*)" />
        </div>

        {/* Col 3: Live components */}
        <div style={{ background: "var(--s-background)" }}>
          <ComponentsColumn activeGroup={activeGroup} />
        </div>
      </div>

      {/* Bottom strip: active group indicator */}
      <div
        className="flex items-center gap-4 px-4 py-2"
        style={{
          background: "var(--s-surface, var(--s-background))",
          borderTop: "1px solid var(--s-border)",
        }}
      >
        {TOKEN_GROUPS.map((group, i) => (
          <button
            key={group}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "font-[family-name:var(--s-font-mono)] text-[9px] uppercase tracking-[0.15em] transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0",
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
