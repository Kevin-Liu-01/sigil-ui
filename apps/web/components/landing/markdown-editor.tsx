"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  DensityText,
  Button,
  Badge,
  Card,
  CardContent,
  cn,
} from "@sigil-ui/components";
import { MarkdownChrome, TokenPreviewGlyph } from "./token-visuals";
import { OklchText } from "../oklch-text";

type TokenKind =
  | "color"
  | "font"
  | "radius"
  | "spacing"
  | "shadow"
  | "border"
  | "motion"
  | "layout";

type TokenLine =
  | { id: string; kind: "heading" | "comment" | "blank"; text: string }
  | {
      id: string;
      kind: "token";
      tokenKind: TokenKind;
      name: string;
      value: string;
      cssVar: string;
      md: string;
      description: string;
    };

const TOKEN_LINES: TokenLine[] = [
  { id: "intro", kind: "comment", text: "<!-- sigil.tokens.md: click any token line -->" },
  { id: "colors", kind: "heading", text: "## Colors" },
  { id: "primary", kind: "token", tokenKind: "color", name: "primary", value: "oklch(0.66 0.18 275)", cssVar: "--s-primary", md: "primary: oklch(0.66 0.18 275)", description: "Accent fills, CTA states, focus rings, and diagram highlights." },
  { id: "background", kind: "token", tokenKind: "color", name: "background", value: "oklch(0.08 0.01 260)", cssVar: "--s-background", md: "background: oklch(0.08 0.01 260)", description: "The canvas behind every surface." },
  { id: "surface", kind: "token", tokenKind: "color", name: "surface", value: "oklch(0.12 0.01 260)", cssVar: "--s-surface", md: "surface: oklch(0.12 0.01 260)", description: "Cards, panels, and inspector backplates." },
  { id: "text", kind: "token", tokenKind: "color", name: "text", value: "oklch(0.96 0 0)", cssVar: "--s-text", md: "text: oklch(0.96 0 0)", description: "Primary copy, titles, and high-contrast labels." },
  { id: "muted", kind: "token", tokenKind: "color", name: "text-muted", value: "oklch(0.62 0.02 260)", cssVar: "--s-text-muted", md: "text-muted: oklch(0.62 0.02 260)", description: "Blueprint guides, helper text, secondary labels." },
  { id: "blank-1", kind: "blank", text: "" },
  { id: "type", kind: "heading", text: "## Typography" },
  { id: "display", kind: "token", tokenKind: "font", name: "font-display", value: '"Nacelle", sans-serif', cssVar: "--s-font-display", md: 'font-display: "Nacelle", sans-serif', description: "Headline voice. Big, tight, and recognizable." },
  { id: "body", kind: "token", tokenKind: "font", name: "font-body", value: "system-ui, sans-serif", cssVar: "--s-font-body", md: "font-body: system-ui, sans-serif", description: "Readable interface copy and descriptions." },
  { id: "mono", kind: "token", tokenKind: "font", name: "font-mono", value: '"Roboto Mono", monospace', cssVar: "--s-font-mono", md: 'font-mono: "Roboto Mono", monospace', description: "Code, measurements, token labels, and tabs." },
  { id: "blank-2", kind: "blank", text: "" },
  { id: "radius", kind: "heading", text: "## Radius" },
  { id: "radius-sm", kind: "token", tokenKind: "radius", name: "radius-sm", value: "4px", cssVar: "--s-radius-sm", md: "sm: 4px", description: "Small chips, token marks, and tight controls." },
  { id: "radius-md", kind: "token", tokenKind: "radius", name: "radius-md", value: "8px", cssVar: "--s-radius-md", md: "md: 8px", description: "Cards, inputs, inspector panels, and preview shells." },
  { id: "radius-xl", kind: "token", tokenKind: "radius", name: "radius-xl", value: "18px", cssVar: "--s-radius-xl", md: "xl: 18px", description: "Large surfaces and spotlight panels." },
  { id: "blank-3", kind: "blank", text: "" },
  { id: "spacing", kind: "heading", text: "## Spacing" },
  { id: "space-2", kind: "token", tokenKind: "spacing", name: "space-2", value: "8px", cssVar: "--s-space-2", md: "space-2: 8px", description: "Small inline gaps and control padding." },
  { id: "space-4", kind: "token", tokenKind: "spacing", name: "space-4", value: "16px", cssVar: "--s-space-4", md: "space-4: 16px", description: "Default card internals and form rhythm." },
  { id: "space-6", kind: "token", tokenKind: "spacing", name: "space-6", value: "24px", cssVar: "--s-space-6", md: "space-6: 24px", description: "Section gutters and rail offsets." },
  { id: "blank-4", kind: "blank", text: "" },
  { id: "borders", kind: "heading", text: "## Borders" },
  { id: "border", kind: "token", tokenKind: "border", name: "border", value: "oklch(0.24 0.01 260)", cssVar: "--s-border", md: "border: oklch(0.24 0.01 260)", description: "Structural grid lines, panel separators, outlines." },
  { id: "border-width", kind: "token", tokenKind: "border", name: "border-width", value: "1px", cssVar: "--s-border-width", md: "border-width: 1px", description: "The measurement line that makes Reticle feel precise." },
  { id: "blank-5", kind: "blank", text: "" },
  { id: "shadow", kind: "heading", text: "## Shadows" },
  { id: "shadow-md", kind: "token", tokenKind: "shadow", name: "shadow-md", value: "0 16px 50px rgb(0 0 0 / 0.2)", cssVar: "--s-shadow-md", md: "shadow-md: 0 16px 50px rgb(0 0 0 / 0.2)", description: "Subtle elevation for floating previews." },
  { id: "blank-6", kind: "blank", text: "" },
  { id: "motion", kind: "heading", text: "## Motion" },
  { id: "duration-fast", kind: "token", tokenKind: "motion", name: "duration-fast", value: "150ms", cssVar: "--s-duration-fast", md: "duration-fast: 150ms", description: "Hover and click feedback. Fast enough to feel physical." },
  { id: "duration-slow", kind: "token", tokenKind: "motion", name: "duration-slow", value: "600ms", cssVar: "--s-duration-slow", md: "duration-slow: 600ms", description: "Larger drawing and preview transitions." },
  { id: "blank-7", kind: "blank", text: "" },
  { id: "layout", kind: "heading", text: "## Layout" },
  { id: "grid-cell", kind: "token", tokenKind: "layout", name: "grid-cell", value: "48px", cssVar: "--s-grid-cell", md: "grid-cell: 48px", description: "Blueprint cells, rails, and diagram quadrants." },
  { id: "content-max", kind: "token", tokenKind: "layout", name: "content-max", value: "1280px", cssVar: "--s-content-max", md: "content-max: 1280px", description: "Maximum readable page width." },
];

const TOKENS = TOKEN_LINES.filter((line): line is Extract<TokenLine, { kind: "token" }> => line.kind === "token");

export interface MarkdownEditorPreviewProps {
  className?: string;
  style?: CSSProperties;
}

function tokenPreviewKind(token: Extract<TokenLine, { kind: "token" }>) {
  if (token.tokenKind === "motion") return "duration";
  if (token.tokenKind === "radius") return token.name.endsWith("sm") ? "radius-sm" : "radius-md";
  return token.tokenKind;
}

function TokenGlyph({ token }: { token: Extract<TokenLine, { kind: "token" }> }) {
  return <TokenPreviewGlyph kind={tokenPreviewKind(token)} value={token.value} />;
}

function TokenLivePreview({ token }: { token: Extract<TokenLine, { kind: "token" }> }) {
  const previewStyle = {
    "--preview-primary": token.tokenKind === "color" ? token.value : "var(--s-primary)",
    "--preview-radius": token.tokenKind === "radius" ? token.value : "var(--s-radius-md, 8px)",
    "--preview-gap": token.tokenKind === "spacing" ? token.value : "16px",
    "--preview-border": token.tokenKind === "border" ? token.value : "var(--s-border)",
    "--preview-shadow": token.tokenKind === "shadow" ? token.value : "var(--s-shadow-md, 0 16px 50px rgb(0 0 0 / 0.2))",
    "--preview-duration": token.tokenKind === "motion" ? token.value : "var(--s-duration-fast, 150ms)",
    "--preview-font": token.tokenKind === "font" ? token.value : "var(--s-font-display)",
  } as CSSProperties;

  return (
    <div style={previewStyle} className="grid gap-4">
      <div
        className="relative overflow-hidden p-4"
        style={{
          border: "1px solid var(--preview-border)",
          borderRadius: "var(--preview-radius)",
          boxShadow: "var(--preview-shadow)",
          background:
            token.tokenKind === "color" && token.name === "background"
              ? token.value
              : "color-mix(in oklch, var(--s-surface) 82%, var(--preview-primary) 8%)",
          transition: "all var(--preview-duration) ease",
        }}
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(var(--s-border) 1px, transparent 1px), linear-gradient(90deg, var(--s-border) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative grid gap-3" style={{ gap: "var(--preview-gap)" }}>
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--preview-font)] text-lg font-semibold" style={{ color: "var(--s-text)" }}>Live Token Preview</span>
            <Badge style={{ background: "var(--preview-primary)", color: "var(--s-primary-contrast, white)" }}>active</Badge>
          </div>
          <Card style={{ borderColor: "var(--preview-border)", borderRadius: "var(--preview-radius)", boxShadow: "var(--preview-shadow)" }}>
            <CardContent className="p-4">
              <div className="flex items-center" style={{ gap: "var(--preview-gap)" }}>
                <span style={{ width: 34, height: 34, borderRadius: "var(--preview-radius)", background: "var(--preview-primary)", flex: "0 0 auto" }} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--s-text)" }}>{token.cssVar}</div>
                  <div className="text-xs" style={{ color: "var(--s-text-muted)" }}>{token.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--preview-gap)" }}>
            <Button size="sm" style={{ background: "var(--preview-primary)", borderRadius: "var(--preview-radius)", transitionDuration: "var(--preview-duration)" }}>Primary</Button>
            <button type="button" className="h-8 px-3 text-xs" style={{ border: "1px solid var(--preview-border)", borderRadius: "var(--preview-radius)", background: "transparent", color: "var(--s-text)", transition: "all var(--preview-duration) ease" }}>
              Outline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarkdownEditorPreview({
  className,
  style,
}: MarkdownEditorPreviewProps) {
  const [activeId, setActiveId] = useState(TOKENS[0].id);
  const activeToken = TOKENS.find((token) => token.id === activeId) ?? TOKENS[0];

  return (
    <div
      data-slot="markdown-editor-preview"
      className={cn("flex flex-col", className)}
      style={style}
    >
      <GapPixelGrid columns={{ base: 1, lg: 2 }} gap={1}>
        <GapPixelCell className="flex flex-col">
          <MarkdownChrome title="SIGIL.TOKENS.MD" meta="scroll + click">
          <div
            className="max-h-[520px] overflow-y-auto px-0 py-3 font-[family-name:var(--s-font-mono)] text-[11px] leading-[1.7]"
            style={{ background: "var(--s-surface)" }}
          >
            {TOKEN_LINES.map((line, index) => {
              if (line.kind === "blank") return <div key={line.id} className="h-3" />;
              if (line.kind === "heading") {
                return (
                  <div
                    key={line.id}
                    className="mt-3 px-4 font-semibold"
                    style={{ color: "var(--s-text)" }}
                  >
                    {line.text}
                  </div>
                );
              }
              if (line.kind === "comment") {
                return (
                  <div key={line.id} className="px-4 opacity-70" style={{ color: "var(--s-text-muted)" }}>
                    {line.text}
                  </div>
                );
              }

              const tokenLine = line as Extract<TokenLine, { kind: "token" }>;
              const active = tokenLine.id === activeId;
              return (
                <button
                  key={tokenLine.id}
                  type="button"
                  onClick={() => setActiveId(tokenLine.id)}
                  className="grid w-full cursor-pointer grid-cols-[34px_34px_1fr] items-center gap-2 border-0 bg-transparent px-4 py-1 text-left font-[family-name:var(--s-font-mono)] text-[11px] transition-colors duration-[var(--s-duration-fast,150ms)]"
                  style={{
                    color: active ? "var(--s-text)" : "var(--s-text-muted)",
                    background: active ? "color-mix(in oklch, var(--s-primary) 14%, transparent)" : "transparent",
                    borderLeft: active ? "2px solid var(--s-primary)" : "2px solid transparent",
                  }}
                >
                  <span className="tabular-nums opacity-50">{String(index + 1).padStart(2, "0")}</span>
                  <TokenGlyph token={tokenLine} />
                  <span>
                    <span style={{ color: active ? "var(--s-primary)" : "var(--s-text)" }}>{tokenLine.name}</span>
                    <span style={{ color: "var(--s-text-muted)" }}>: </span>
                    <span><OklchText>{tokenLine.value}</OklchText></span>
                  </span>
                </button>
              );
            })}
          </div>
          </MarkdownChrome>
        </GapPixelCell>

        <GapPixelCell className="flex flex-col">
          <MarkdownChrome title="TOKEN VISUALIZER" meta={activeToken.cssVar}>
          <div className="grid gap-5 p-5">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <TokenGlyph token={activeToken} />
                <div>
                  <div className="font-[family-name:var(--s-font-mono)] text-sm font-semibold" style={{ color: "var(--s-text)" }}>
                    {activeToken.md}
                  </div>
                  <DensityText role="chrome" muted>{activeToken.description}</DensityText>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 font-[family-name:var(--s-font-mono)] text-[10px]">
                <div className="border border-[var(--s-border)] p-2">
                  <div style={{ color: "var(--s-text-muted)" }}>CSS variable</div>
                  <code style={{ color: "var(--s-primary)" }}>{activeToken.cssVar}</code>
                </div>
                <div className="border border-[var(--s-border)] p-2">
                  <div style={{ color: "var(--s-text-muted)" }}>visualizer</div>
                  <code style={{ color: "var(--s-primary)" }}>{activeToken.tokenKind}</code>
                </div>
              </div>
            </div>

            <TokenLivePreview token={activeToken} />

            <div>
              <MonoLabel variant="accent" className="mb-3 block">TOKEN VISUALIZATION LIBRARY</MonoLabel>
              <div className="grid grid-cols-4 gap-2">
                {TOKENS.slice(0, 16).map((token) => (
                  <button
                    key={token.id}
                    type="button"
                    title={token.name}
                    onClick={() => setActiveId(token.id)}
                    className="flex h-12 cursor-pointer items-center justify-center border bg-transparent transition-colors duration-[var(--s-duration-fast,150ms)]"
                    style={{
                      borderColor: token.id === activeId ? "var(--s-primary)" : "var(--s-border)",
                      background: token.id === activeId ? "color-mix(in oklch, var(--s-primary) 12%, transparent)" : "transparent",
                    }}
                  >
                    <TokenGlyph token={token} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          </MarkdownChrome>
        </GapPixelCell>
      </GapPixelGrid>
    </div>
  );
}
