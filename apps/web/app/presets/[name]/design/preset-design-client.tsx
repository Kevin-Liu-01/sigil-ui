"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  SigilSection,
  Divider,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentActive,
  AccentCTA,
  BorderStack,
  GapPixelGrid,
  GapPixelCell,
} from "@sigil-ui/components";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { TextureBg } from "@/components/texture-bg";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";
import type { SigilPreset, SigilTokens, DesignDocument } from "@sigil-ui/tokens";
import { presetCatalog } from "@sigil-ui/presets";

function generateDesignMd(preset: SigilPreset): string {
  const { tokens, metadata, name } = preset;

  function isThemed(v: unknown): v is { light: string; dark: string } {
    return typeof v === "object" && v !== null && "light" in v && "dark" in v;
  }

  function mdTable(headers: string[], rows: string[][]): string {
    const sep = headers.map(() => "---");
    return [
      `| ${headers.join(" | ")} |`,
      `| ${sep.join(" | ")} |`,
      ...rows.map((r) => `| ${r.join(" | ")} |`),
    ].join("\n");
  }

  function tokenRow(token: string, value: string, role?: string): string[] {
    return [`\`${token}\``, `\`${value}\``, role ?? ""];
  }

  const entry = presetCatalog.find((p) => p.name === name);
  const out: string[] = [];

  // Header
  out.push(`# ${entry?.label ?? name} — Style Reference`);
  out.push(`> ${metadata.description}`);
  out.push("");
  out.push(`**Theme:** adaptive`);
  out.push(`**Preset:** ${name}`);
  out.push(`**Density:** balanced`);
  out.push("");
  if (metadata.mood) out.push(`${metadata.mood}. ${metadata.description}`);
  out.push("");

  // Colors
  out.push("## Tokens — Colors");
  out.push("");
  out.push("All color values use OKLCH for perceptual uniformity and wide-gamut display support.");
  out.push("");
  const colorRows: string[][] = [];
  for (const [key, value] of Object.entries(tokens.colors)) {
    if (value === undefined) continue;
    if (isThemed(value)) {
      colorRows.push([`\`${key}\``, `\`${value.light}\``, `\`${value.dark}\``, key.replace(/-/g, " ")]);
    } else {
      colorRows.push([`\`${key}\``, `\`${String(value)}\``, `\`${String(value)}\``, key.replace(/-/g, " ")]);
    }
  }
  out.push(mdTable(["Token", "Light", "Dark", "Role"], colorRows));
  out.push("");

  // Typography
  out.push("## Tokens — Typography");
  out.push("");
  const typoRows: string[][] = [];
  for (const [key, value] of Object.entries(tokens.typography)) {
    if (value !== undefined) typoRows.push(tokenRow(key, String(value)));
  }
  out.push(mdTable(["Token", "Value", "Role"], typoRows));
  out.push("");

  // Spacing
  out.push("## Tokens — Spacing");
  out.push("");
  const spacingRows = tokens.spacing.scale.map((s) =>
    tokenRow(`space-${s}`, `${s}`, `${s}${tokens.spacing.unit} step`),
  );
  out.push(mdTable(["Token", "Value", "Role"], spacingRows));
  out.push("");

  // Layout
  if (tokens.layout) {
    out.push("## Tokens — Layout");
    out.push("");
    const layoutRows = Object.entries(tokens.layout).map(([k, v]) => tokenRow(k, String(v)));
    out.push(mdTable(["Token", "Value", "Role"], layoutRows));
    out.push("");
  }

  // Sigil Grid
  out.push("## Tokens — Sigil Grid");
  out.push("");
  const sigilRows = Object.entries(tokens.sigil).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], sigilRows));
  out.push("");

  // Radius
  out.push("## Tokens — Radius");
  out.push("");
  const radiusRows = Object.entries(tokens.radius).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], radiusRows));
  out.push("");

  // Shadows
  out.push("## Tokens — Shadows");
  out.push("");
  const shadowRows = Object.entries(tokens.shadows).map(([k, v]) => tokenRow(k, String(v)));
  out.push(mdTable(["Token", "Value", "Role"], shadowRows));
  out.push("");

  // Motion
  out.push("## Tokens — Motion");
  out.push("");
  out.push("### Durations");
  out.push("");
  const durRows = Object.entries(tokens.motion.duration).map(([k, v]) => tokenRow(k, v));
  out.push(mdTable(["Token", "Value", "Role"], durRows));
  out.push("");
  out.push("### Easings");
  out.push("");
  const easeRows = Object.entries(tokens.motion.easing).map(([k, v]) => tokenRow(k, v));
  out.push(mdTable(["Token", "Value", "Role"], easeRows));
  out.push("");

  // Borders
  out.push("## Tokens — Borders");
  out.push("");
  const borderRows = Object.entries(tokens.borders.width).map(([k, v]) => tokenRow(k, v));
  out.push(mdTable(["Token", "Value", "Role"], borderRows));
  out.push("");

  // Backgrounds
  if (tokens.backgrounds) {
    out.push("## Tokens — Backgrounds");
    out.push("");
    const bgRows = Object.entries(tokens.backgrounds).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v)));
    out.push(mdTable(["Token", "Value", "Role"], bgRows));
    out.push("");
  }

  // Block tokens helper
  function emitBlock(heading: string, group: Record<string, unknown> | undefined) {
    if (!group) return;
    const entries = Object.entries(group).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return;
    out.push(`## ${heading}`);
    out.push("");
    const rows = entries.map(([k, v]) => tokenRow(k, String(v)));
    out.push(mdTable(["Token", "Value", "Role"], rows));
    out.push("");
  }

  emitBlock("Block Tokens — Buttons", tokens.buttons);
  emitBlock("Block Tokens — Cards", tokens.cards);
  emitBlock("Block Tokens — Headings", tokens.headings);
  emitBlock("Block Tokens — Navigation", tokens.navigation);
  emitBlock("Block Tokens — Inputs", tokens.inputs);
  emitBlock("Block Tokens — Code", tokens.code);
  emitBlock("Block Tokens — Hero", tokens.hero);
  emitBlock("Block Tokens — CTA", tokens.cta);
  emitBlock("Block Tokens — Footer", tokens.footer);
  emitBlock("Block Tokens — Banner", tokens.banner);
  emitBlock("Block Tokens — Sections", tokens.sections);
  emitBlock("Composition — Page Rhythm", tokens.pageRhythm);
  emitBlock("Composition — Grid & Alignment", tokens.alignment);
  emitBlock("Composition — Dividers", tokens.dividers);
  emitBlock("Composition — Grid Visuals", tokens.gridVisuals);

  // Cursor + Scrollbar combined
  if (tokens.cursor || tokens.scrollbar) {
    out.push("## Composition — Cursor & Scrollbar");
    out.push("");
    const combined = [
      ...Object.entries(tokens.cursor ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
      ...Object.entries(tokens.scrollbar ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
    ];
    out.push(mdTable(["Token", "Value", "Role"], combined));
    out.push("");
  }

  // Focus + Overlays combined
  if (tokens.focus || tokens.overlays) {
    out.push("## Composition — Focus & Overlays");
    out.push("");
    const combined = [
      ...Object.entries(tokens.focus ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
      ...Object.entries(tokens.overlays ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => tokenRow(k, String(v))),
    ];
    out.push(mdTable(["Token", "Value", "Role"], combined));
    out.push("");
  }

  emitBlock("Composition — Data Visualization", tokens.dataViz);
  emitBlock("Composition — Media", tokens.media);
  emitBlock("Composition — Controls", tokens.controls);
  emitBlock("Composition — Component Surfaces", tokens.componentSurfaces);

  // Components
  out.push("## Components");
  out.push("");
  out.push("### Primary Button");
  out.push("Solid `--s-primary` background, `--s-radius-button` corners, inverse text. Hover applies `--s-button-hover-effect` with `--s-duration-fast`. Active scales to `--s-button-active-scale`.");
  out.push("");
  out.push("### Card");
  out.push("`--s-surface` background, `--s-card-border-style` border. Hover triggers `--s-card-hover-effect`. Padding at `--s-card-padding`.");
  out.push("");
  out.push("### Input");
  out.push("`--s-surface` background, `--s-input-border-width` border. Focus ring at `--s-focus-ring-width` in `--s-focus-ring-color`.");
  out.push("");

  // Surfaces
  out.push("## Surfaces");
  out.push("");
  const bgLight = isThemed(tokens.colors.background) ? tokens.colors.background.light : String(tokens.colors.background);
  const surfLight = isThemed(tokens.colors.surface) ? tokens.colors.surface.light : String(tokens.colors.surface);
  const elevLight = isThemed(tokens.colors["surface-elevated"]) ? tokens.colors["surface-elevated"].light : String(tokens.colors["surface-elevated"]);
  out.push(mdTable(["Level", "Name", "Value", "Purpose"], [
    ["0", "Background", `\`${bgLight}\``, "Base page background"],
    ["1", "Surface", `\`${surfLight}\``, "Card and panel surfaces"],
    ["2", "Elevated", `\`${elevLight}\``, "Raised surfaces (modals, popovers)"],
  ]));
  out.push("");

  // Do's and Don'ts
  out.push("## Do's and Don'ts");
  out.push("");
  out.push("### Do");
  out.push("- Use OKLCH for all color values.");
  out.push("- Reference `var(--s-*)` tokens — never hardcode.");
  out.push("- Apply `--s-duration-fast` for micro-interactions.");
  out.push("- Use the spacing scale (4/8px grid) for all gaps.");
  out.push("- Keep shadows layered using the token scale.");
  out.push("- Use concentric border-radius.");
  out.push("");
  out.push("### Don't");
  out.push("- Do not hardcode hex/rgb in component files.");
  out.push("- Do not use arbitrary Tailwind values.");
  out.push("- Do not bypass the spacing scale.");
  out.push("- Do not add shadows outside the token system.");
  out.push("- Do not use `duration-150` — use `duration-[var(--s-duration-fast)]`.");
  out.push("- Do not use `rounded-lg` — use `rounded-[var(--s-radius-lg)]`.");
  out.push("");

  // Similar Brands
  if (entry) {
    out.push("## Similar Brands");
    out.push("");
    out.push(`- Category: **${entry.category}** — ${entry.mood}`);
    out.push(`- Fonts: ${entry.fonts.display} / ${entry.fonts.body} / ${entry.fonts.mono}`);
    out.push("");
  }

  // Compile — CSS
  out.push("## Compile — CSS");
  out.push("");
  out.push("```css");
  out.push(":root {");
  for (const [key, value] of Object.entries(tokens.colors)) {
    if (value === undefined) continue;
    if (isThemed(value)) {
      out.push(`  --s-${key}: ${value.light};`);
    } else {
      out.push(`  --s-${key}: ${String(value)};`);
    }
  }
  out.push("");
  out.push(`  --s-font-display: ${tokens.typography["font-display"]};`);
  out.push(`  --s-font-body: ${tokens.typography["font-body"]};`);
  out.push(`  --s-font-mono: ${tokens.typography["font-mono"]};`);
  out.push("");
  for (const step of tokens.spacing.scale) {
    out.push(`  --s-space-${step}: ${step}${tokens.spacing.unit};`);
  }
  out.push("");
  for (const [key, value] of Object.entries(tokens.radius)) {
    out.push(`  --s-radius-${key}: ${value};`);
  }
  out.push("");
  for (const [key, value] of Object.entries(tokens.shadows)) {
    out.push(`  --s-shadow-${key}: ${value};`);
  }
  out.push("");
  for (const [key, value] of Object.entries(tokens.motion.duration)) {
    out.push(`  --s-duration-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.motion.easing)) {
    out.push(`  --s-ease-${key}: ${value};`);
  }
  out.push("}");
  out.push("");
  out.push("[data-theme='dark'] {");
  for (const [key, value] of Object.entries(tokens.colors)) {
    if (isThemed(value)) {
      out.push(`  --s-${key}: ${value.dark};`);
    }
  }
  out.push("}");
  out.push("```");
  out.push("");

  // Compile — Tailwind v4
  out.push("## Compile — Tailwind v4");
  out.push("");
  out.push("```css");
  out.push("@theme {");
  for (const key of Object.keys(tokens.colors)) {
    out.push(`  --color-${key}: var(--s-${key});`);
  }
  out.push("");
  out.push(`  --font-display: var(--s-font-display);`);
  out.push(`  --font-body: var(--s-font-body);`);
  out.push(`  --font-mono: var(--s-font-mono);`);
  out.push("");
  for (const step of tokens.spacing.scale) {
    out.push(`  --spacing-${step}: var(--s-space-${step});`);
  }
  out.push("");
  for (const key of Object.keys(tokens.radius)) {
    out.push(`  --radius-${key}: var(--s-radius-${key});`);
  }
  out.push("");
  for (const key of Object.keys(tokens.shadows)) {
    out.push(`  --shadow-${key}: var(--s-shadow-${key});`);
  }
  out.push("");
  for (const key of Object.keys(tokens.motion.duration)) {
    out.push(`  --duration-${key}: var(--s-duration-${key});`);
  }
  for (const key of Object.keys(tokens.motion.easing)) {
    out.push(`  --ease-${key}: var(--s-ease-${key});`);
  }
  out.push("}");
  out.push("```");
  out.push("");

  return out.join("\n");
}

export default function PresetDesignClient() {
  const params = useParams();
  const name = params.name as string;

  const [preset, setPreset] = useState<SigilPreset | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const entry = useMemo(() => presetCatalog.find((p) => p.name === name), [name]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import("@sigil-ui/presets")
      .then((mod) => {
        const loaders = mod.presets as Record<string, () => Promise<SigilPreset>>;
        const loader = loaders[name];
        if (!loader) throw new Error(`Preset "${name}" not found`);
        return loader();
      })
      .then((p) => { if (!cancelled) { setPreset(p); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [name]);

  const designMd = useMemo(() => {
    if (!preset) return "";
    return generateDesignMd(preset);
  }, [preset]);

  const lineCount = useMemo(() => designMd.split("\n").length, [designMd]);

  function copyToClipboard() {
    navigator.clipboard.writeText(designMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadFile() {
    const blob = new Blob([designMd], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DESIGN.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <SigilFrame>
      <LandingNavbar />
      <BorderStack>
        {/* Hero */}
        <SigilSection borderTop padding="var(--s-section-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 24px)) var(--s-section-padding-y-sm, 3rem)" className="relative overflow-hidden">
          <TextureBg opacity={0.2} />
          <div className="relative z-[1] max-w-4xl">
            <Link
              href={`/presets/${name}`}
              className="inline-flex items-center gap-1.5 mb-6 text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)] no-underline"
            >
              <ArrowLeft size={14} />
              <MonoLabel size="sm">{entry?.label ?? name} Preset</MonoLabel>
            </Link>

            <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(24px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-[var(--s-text)] mb-3">
              <span className="text-[var(--s-primary)]">DESIGN.md</span>{" "}
              <span className="text-[var(--s-text-muted)]">/ {entry?.label ?? name}</span>
            </h1>

            <DensityText role="body" as="p" muted className="mb-5 max-w-[560px]">
              The complete design reference for the <strong>{entry?.label ?? name}</strong> preset.
              Drop this file into your project as <code className="text-[var(--s-primary)]">DESIGN.md</code> and
              run <code className="text-[var(--s-primary)]">sigil design compile</code> to generate your CSS and Tailwind tokens.
            </DensityText>

            {!loading && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={downloadFile}
                  className="inline-flex items-center gap-2 h-9 px-4 text-[12px] font-[family-name:var(--s-font-mono)] font-semibold uppercase tracking-[0.06em] bg-[var(--s-primary)] text-white border-0 cursor-pointer transition-opacity hover:opacity-90"
                >
                  <Download size={14} />
                  Download DESIGN.md
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 h-9 px-4 text-[12px] font-[family-name:var(--s-font-mono)] font-semibold uppercase tracking-[0.06em] bg-transparent text-[var(--s-text)] border border-[var(--s-border)] cursor-pointer transition-colors hover:bg-[var(--s-surface)]"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy to Clipboard"}
                </button>
                <TabularValue size="xs" muted>
                  {lineCount} lines · 500+ tokens · 33 categories
                </TabularValue>
              </div>
            )}
          </div>
        </SigilSection>

        <Divider pattern="vertical" size="sm" showBorders />

        {/* Quick start */}
        {!loading && (
          <SigilSection padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px))">
            <GapPixelGrid columns={{ md: 3 }}>
              <GapPixelCell className="p-4">
                <MonoLabel size="sm" className="mb-2 block text-[var(--s-text-muted)]">1. Download</MonoLabel>
                <TabularValue size="xs" muted as="p">
                  Save as <code>DESIGN.md</code> in your project root.
                </TabularValue>
              </GapPixelCell>
              <GapPixelCell className="p-4">
                <MonoLabel size="sm" className="mb-2 block text-[var(--s-text-muted)]">2. Compile</MonoLabel>
                <TabularValue size="xs" muted as="p">
                  Run <code>sigil design compile</code> to generate CSS + Tailwind.
                </TabularValue>
              </GapPixelCell>
              <GapPixelCell className="p-4">
                <MonoLabel size="sm" className="mb-2 block text-[var(--s-text-muted)]">3. Customize</MonoLabel>
                <TabularValue size="xs" muted as="p">
                  Edit tokens in the markdown, run <code>sigil design sync</code>.
                </TabularValue>
              </GapPixelCell>
            </GapPixelGrid>
          </SigilSection>
        )}

        <Divider pattern="diagonal" size="sm" showBorders />

        {/* The DESIGN.md content */}
        <SigilSection padding="var(--s-section-padding-y-sm, 3rem) var(--s-section-padding-x, var(--s-page-margin, 24px)) var(--s-section-padding-y, 6rem)">
          {loading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-4 bg-[var(--s-surface)] animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
            </div>
          ) : (
            <div className="max-w-4xl">
              <pre className="whitespace-pre-wrap break-words text-[12px] leading-[1.7] font-[family-name:var(--s-font-mono)] text-[var(--s-text-secondary)] bg-[var(--s-surface)] border border-[var(--s-border-muted)] p-6 overflow-x-auto max-h-[80vh] overflow-y-auto">
                {designMd}
              </pre>
            </div>
          )}
        </SigilSection>

        <Divider pattern="diagonal" size="md" showBorders />
      </BorderStack>
      <LandingFooter />
    </SigilFrame>
  );
}
