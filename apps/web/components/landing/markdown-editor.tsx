"use client";

import { useState, useEffect } from "react";
import {
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  DensityText,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  cn,
} from "@sigil-ui/components";

const COLOR_CYCLE = [
  { value: "oklch(0.7 0.15 280)", label: "purple" },
  { value: "oklch(0.65 0.2 150)", label: "teal" },
  { value: "oklch(0.7 0.25 350)", label: "pink" },
] as const;

const CYCLE_INTERVAL = 4000;
const TRANSITION_MS = 600;

function oklchToApproxHex(oklch: string): string {
  const map: Record<string, string> = {
    "oklch(0.7 0.15 280)": "#9b87f5",
    "oklch(0.65 0.2 150)": "#2dd4a8",
    "oklch(0.7 0.25 350)": "#f472b6",
  };
  return map[oklch] ?? "#9b87f5";
}

const STATIC_LINES_BEFORE = [
  { text: "## Colors", type: "heading" as const },
  { text: "primary: ", type: "key" as const },
];

const STATIC_LINES_AFTER = [
  { text: "background: oklch(0.13 0.01 260)", type: "value" as const },
  { text: "", type: "blank" as const },
  { text: "## Typography", type: "heading" as const },
  { text: 'font-display: "PP Mori", sans-serif', type: "value" as const },
  { text: "", type: "blank" as const },
  { text: "## Radius", type: "heading" as const },
  { text: "md: 6px", type: "value" as const },
];

export interface MarkdownEditorPreviewProps {
  className?: string;
  style?: React.CSSProperties;
}

export function MarkdownEditorPreview({
  className,
  style,
}: MarkdownEditorPreviewProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlash(true);
      setColorIndex((i) => (i + 1) % COLOR_CYCLE.length);
      const flashTimer = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(flashTimer);
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const currentColor = COLOR_CYCLE[colorIndex];
  const approxHex = oklchToApproxHex(currentColor.value);

  return (
    <div
      data-slot="markdown-editor-preview"
      className={cn("flex flex-col", className)}
      style={style}
    >
      <GapPixelGrid columns={{ base: 1, sm: 2 }} gap={1}>
        {/* Editor pane */}
        <GapPixelCell className="flex flex-col">
          <div className="px-3 py-2">
            <MonoLabel variant="accent">SIGIL.TOKENS.MD</MonoLabel>
          </div>
          <div
            className="flex flex-col gap-0 px-4 py-3 font-[family-name:var(--s-font-mono)] text-[11px] leading-[1.7] min-h-[200px]"
            style={{ background: "var(--s-surface)" }}
          >
            {/* ## Colors */}
            <span className="font-semibold text-[var(--s-text)]">
              {STATIC_LINES_BEFORE[0].text}
            </span>

            {/* primary: <animated value> */}
            <span className="flex items-center">
              <span className="text-[var(--s-text-muted)]">primary: </span>
              <span
                className={cn(
                  "relative px-1 rounded-[2px] transition-colors",
                  flash
                    ? "bg-[color-mix(in_oklch,var(--s-primary)_20%,transparent)]"
                    : "bg-transparent",
                )}
                style={{ transitionDuration: "400ms" }}
              >
                <span style={{ color: approxHex }}>
                  {currentColor.value}
                </span>
                <span
                  className="inline-block w-[1.5px] h-[13px] align-middle ml-[1px]"
                  style={{
                    background: "var(--s-text)",
                    animation: "sigil-blink 1s step-end infinite",
                  }}
                />
              </span>
            </span>

            {/* Remaining static lines */}
            {STATIC_LINES_AFTER.map((line, i) => {
              if (line.type === "blank") return <span key={i}>&nbsp;</span>;
              if (line.type === "heading") {
                return (
                  <span
                    key={i}
                    className="font-semibold text-[var(--s-text)]"
                  >
                    {line.text}
                  </span>
                );
              }
              return (
                <span key={i} className="text-[var(--s-text-muted)]">
                  {line.text}
                </span>
              );
            })}
          </div>

          {/* Blink keyframes */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@keyframes sigil-blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }`,
            }}
          />
        </GapPixelCell>

        {/* Live Preview pane */}
        <GapPixelCell className="flex flex-col">
          <div className="px-3 py-2">
            <MonoLabel variant="accent">LIVE PREVIEW</MonoLabel>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-4 px-4 py-6 min-h-[200px]"
            style={{
              "--s-primary": approxHex,
              transition: `all ${TRANSITION_MS}ms ease`,
            } as React.CSSProperties}
          >
            <Button size="sm">Get Started</Button>
            <Badge>New</Badge>
            <Card className="w-full max-w-[200px]">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-xs">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <DensityText role="body" muted>
                  Manage your workspace settings and team.
                </DensityText>
              </CardContent>
            </Card>

            <DensityText role="chrome" className="mt-2">
              primary: {currentColor.label}
            </DensityText>
          </div>
        </GapPixelCell>
      </GapPixelGrid>
    </div>
  );
}
