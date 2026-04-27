"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  SigilSection,
  Divider,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentActive,
  BorderStack,
  GapPixelGrid,
  GapPixelCell,
} from "@sigil-ui/components";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { TextureBg } from "@/components/texture-bg";
import {
  Palette,
  Type,
  Ruler,
  LayoutGrid,
  Crosshair,
  Circle,
  Layers,
  Zap,
  Square,
  MousePointerClick,
  CreditCard,
  Heading,
  Compass,
  Image,
  Code2,
  TextCursorInput,
  MousePointer,
  GripVertical,
  AlignCenter,
  Rows3,
  Minus,
  Grid3X3,
  Focus,
  Blend,
  BarChart3,
  ImageIcon,
  SlidersHorizontal,
  Box,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type { SigilPreset } from "@sigil-ui/tokens";
import { presetCatalog, type PresetCatalogEntry } from "@sigil-ui/presets";

type CategoryMeta = {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
};

const CATEGORY_META: CategoryMeta[] = [
  { key: "colors", label: "Colors", icon: Palette, description: "Backgrounds, surfaces, text, borders, brand, status, gradients, glow" },
  { key: "typography", label: "Typography", icon: Type, description: "Font stacks, size scale, weight scale, leading, tracking" },
  { key: "spacing", label: "Spacing", icon: Ruler, description: "Base scale, component padding, section spacing" },
  { key: "layout", label: "Layout", icon: LayoutGrid, description: "Content widths, margins, gutters, grid, bento, sidebar" },
  { key: "sigil", label: "Sigil Grid", icon: Crosshair, description: "Grid cell, cross marks, rail gap, structural visibility" },
  { key: "radius", label: "Radius", icon: Circle, description: "Scale from none to full, per-component radius overrides" },
  { key: "shadows", label: "Shadows", icon: Layers, description: "Elevation scale, glow, colored, inner, per-component shadows" },
  { key: "motion", label: "Motion", icon: Zap, description: "Durations, easings, hover/press/stagger presets" },
  { key: "borders", label: "Borders", icon: Square, description: "Width scale, style, per-component border definitions" },
  { key: "buttons", label: "Buttons", icon: MousePointerClick, description: "Font weight, transform, spacing, hover effect, active scale" },
  { key: "cards", label: "Cards", icon: CreditCard, description: "Border style, hover effect, padding, title/description sizing" },
  { key: "headings", label: "Headings", icon: Heading, description: "H1–H4 + display sizes, weights, tracking, leading" },
  { key: "navigation", label: "Navigation", icon: Compass, description: "Navbar height/blur/border, link style, sidebar, pagination" },
  { key: "backgrounds", label: "Backgrounds", icon: Image, description: "Pattern type/opacity, noise, gradient, hero pattern, dividers" },
  { key: "code", label: "Code", icon: Code2, description: "Font, sizing, syntax highlighting colors" },
  { key: "inputs", label: "Inputs", icon: TextCursorInput, description: "Heights, focus ring, placeholder, error state, labels" },
  { key: "cursor", label: "Cursor", icon: MousePointer, description: "Custom pointer variant, size, colors, glow" },
  { key: "scrollbar", label: "Scrollbar", icon: GripVertical, description: "Width, track/thumb colors, Firefox support" },
  { key: "alignment", label: "Alignment", icon: AlignCenter, description: "Rail system, content/hero/section/navbar alignment" },
  { key: "sections", label: "Sections", icon: Rows3, description: "Section padding, max-width, gap, divider control" },
  { key: "dividers", label: "Dividers", icon: Minus, description: "Line style, width, color, ornament, full-bleed" },
  { key: "gridVisuals", label: "Grid Visuals", icon: Grid3X3, description: "Lines, dots, cell background, hover effects" },
  { key: "focus", label: "Focus", icon: Focus, description: "Ring width, color, offset, outline" },
  { key: "overlays", label: "Overlays", icon: Blend, description: "Backdrop blur, surface, border, shadow, z-index" },
  { key: "dataViz", label: "Data Viz", icon: BarChart3, description: "Series colors, positive/negative, grid, tooltip" },
  { key: "media", label: "Media", icon: ImageIcon, description: "Radius, border, outline, shadow, object-fit" },
  { key: "controls", label: "Controls", icon: SlidersHorizontal, description: "Heights, hit area, track/thumb styling" },
  { key: "componentSurfaces", label: "Component Surfaces", icon: Box, description: "Background, border, text, hover/active/selected states" },
];

function isOklchColor(value: string): boolean {
  return typeof value === "string" && value.startsWith("oklch(");
}

function isHexColor(value: string): boolean {
  return typeof value === "string" && /^#[0-9a-fA-F]{3,8}$/.test(value);
}

function isColorRef(value: string): boolean {
  return typeof value === "string" && value.startsWith("var(--s-");
}

function isColorLike(value: string): boolean {
  return (
    typeof value === "string" &&
    (isOklchColor(value) || isHexColor(value) || value.startsWith("rgb"))
  );
}

function ColorSwatch({ value }: { value: string }) {
  if (!isColorLike(value)) return null;
  return (
    <span
      className="inline-block shrink-0 border border-[var(--s-border-muted)]"
      style={{
        width: 12,
        height: 12,
        borderRadius: "2px",
        background: value,
      }}
      aria-hidden
    />
  );
}

type ThemedValue = { light: string; dark: string };

function isThemed(v: unknown): v is ThemedValue {
  return (
    typeof v === "object" &&
    v !== null &&
    "light" in v &&
    "dark" in v
  );
}

function TokenRow({
  tokenKey,
  value,
}: {
  tokenKey: string;
  value: unknown;
}) {
  if (value === undefined || value === null) return null;

  if (isThemed(value)) {
    return (
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 border-b border-[var(--s-border-muted)] py-2 last:border-b-0">
        <div className="flex items-center gap-2 min-w-0">
          <MonoLabel size="sm" className="truncate">
            {tokenKey}
          </MonoLabel>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--s-font-mono)] uppercase tracking-[0.1em] text-[var(--s-text-subtle)]">
              L
            </span>
            <ColorSwatch value={value.light} />
            <TabularValue size="xs" muted className="truncate">
              {value.light}
            </TabularValue>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-[family-name:var(--s-font-mono)] uppercase tracking-[0.1em] text-[var(--s-text-subtle)]">
              D
            </span>
            <ColorSwatch value={value.dark} />
            <TabularValue size="xs" muted className="truncate">
              {value.dark}
            </TabularValue>
          </div>
        </div>
      </div>
    );
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <>
        <div className="pt-2 pb-1">
          <MonoLabel size="sm" variant="accent">
            {tokenKey}
          </MonoLabel>
        </div>
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <TokenRow key={k} tokenKey={k} value={v} />
        ))}
      </>
    );
  }

  const display = Array.isArray(value)
    ? value.join(", ")
    : String(value);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-x-4 border-b border-[var(--s-border-muted)] py-2 last:border-b-0">
      <div className="flex items-center gap-2 min-w-0">
        <MonoLabel size="sm" className="truncate">
          {tokenKey}
        </MonoLabel>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <ColorSwatch value={display} />
        <TabularValue size="xs" muted className="truncate">
          {display}
        </TabularValue>
      </div>
    </div>
  );
}

function TokenSection({
  meta,
  tokens,
  forceOpen,
}: {
  meta: CategoryMeta;
  tokens: Record<string, unknown>;
  forceOpen: boolean;
}) {
  const [manualToggle, setManualToggle] = useState<boolean | null>(null);
  const prevForceOpen = useRef(forceOpen);
  useEffect(() => {
    if (prevForceOpen.current !== forceOpen) {
      setManualToggle(null);
      prevForceOpen.current = forceOpen;
    }
  }, [forceOpen]);
  const open = manualToggle ?? forceOpen;
  const Icon = meta.icon;
  const count = Object.keys(tokens).length;

  return (
    <div className="border border-[var(--s-border-muted)]">
      <button
        type="button"
        onClick={() => setManualToggle(open ? false : true)}
        className="flex w-full items-center gap-3 bg-[var(--s-surface)] px-4 py-3 cursor-pointer text-left transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated)]"
      >
        <Icon size={16} className="shrink-0 text-[var(--s-primary)]" />
        <DensityText role="nav" className="font-semibold flex-1">
          {meta.label}
        </DensityText>
        <TabularValue size="xs" muted>
          {count} tokens
        </TabularValue>
        {open ? (
          <ChevronDown size={14} className="shrink-0 text-[var(--s-text-muted)]" />
        ) : (
          <ChevronRight size={14} className="shrink-0 text-[var(--s-text-muted)]" />
        )}
      </button>

      {open && (
        <div className="border-t border-[var(--s-border-muted)] bg-[var(--s-background)] px-4 py-2">
          <p className="text-[11px] font-[family-name:var(--s-font-mono)] text-[var(--s-text-subtle)] mb-3 tracking-wide">
            {meta.description}
          </p>
          {Object.entries(tokens).map(([key, val]) => (
            <TokenRow key={key} tokenKey={key} value={val} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PresetDetailPage() {
  const params = useParams();
  const name = params.name as string;

  const [preset, setPreset] = useState<SigilPreset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const catalogEntry = useMemo(
    () => presetCatalog.find((p) => p.name === name),
    [name],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    import("@sigil-ui/presets")
      .then((mod) => {
        const loaders = mod.presets as Record<string, () => Promise<SigilPreset>>;
        const loader = loaders[name];
        if (!loader) throw new Error(`Preset "${name}" not found`);
        return loader();
      })
      .then((p) => {
        if (!cancelled) {
          setPreset(p);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  const sections = useMemo(() => {
    if (!preset) return [];
    return CATEGORY_META.filter(
      (meta) => (preset.tokens as Record<string, unknown>)[meta.key] != null,
    ).map((meta) => ({
      meta,
      tokens: (preset.tokens as Record<string, unknown>)[
        meta.key
      ] as Record<string, unknown>,
    }));
  }, [preset]);

  const [filterText, setFilterText] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  const filteredSections = useMemo(() => {
    if (!filterText.trim()) return sections;
    const q = filterText.toLowerCase();
    return sections
      .map((s) => {
        if (s.meta.label.toLowerCase().includes(q)) return s;
        const filtered = Object.fromEntries(
          Object.entries(s.tokens).filter(([key, val]) => {
            const valStr =
              typeof val === "object" ? JSON.stringify(val) : String(val);
            return (
              key.toLowerCase().includes(q) ||
              valStr.toLowerCase().includes(q)
            );
          }),
        );
        if (Object.keys(filtered).length === 0) return null;
        return { ...s, tokens: filtered };
      })
      .filter(Boolean) as typeof sections;
  }, [sections, filterText]);

  const totalTokens = useMemo(
    () =>
      sections.reduce(
        (acc, s) => acc + Object.keys(s.tokens).length,
        0,
      ),
    [sections],
  );

  return (
    <SigilFrame>
      <LandingNavbar />

      <BorderStack>
        {/* ── Hero ──────────────────────────────── */}
        <SigilSection
          borderTop
          padding="96px 24px 48px"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <TextureBg opacity={0.3} />
          <div className="relative z-[1] max-w-3xl">
            <Link
              href="/presets"
              className="inline-flex items-center gap-1.5 mb-6 text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)] no-underline"
            >
              <ArrowLeft size={14} />
              <MonoLabel size="sm">All Presets</MonoLabel>
            </Link>

            {loading ? (
              <div className="space-y-3">
                <div className="h-12 w-48 bg-[var(--s-surface)] animate-pulse" />
                <div className="h-6 w-96 bg-[var(--s-surface)] animate-pulse" />
              </div>
            ) : error ? (
              <div>
                <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4">
                  Preset not found
                </h1>
                <DensityText role="body" as="p" muted>
                  {error}
                </DensityText>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)]">
                    {catalogEntry?.label ?? name}
                  </h1>
                  {catalogEntry && (
                    <span
                      className="inline-block h-5 w-5 rounded-full border border-[var(--s-border)]"
                      style={{
                        background: preset?.tokens.colors.primary
                          ? typeof preset.tokens.colors.primary === "string"
                            ? preset.tokens.colors.primary
                            : preset.tokens.colors.primary.dark
                          : undefined,
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                <DensityText role="body" as="p" muted className="mb-3 max-w-[560px]">
                  {preset?.metadata.description}
                </DensityText>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {catalogEntry && (
                    <MonoLabel variant="accent" size="sm">
                      {catalogEntry.category}
                    </MonoLabel>
                  )}
                  {preset?.metadata.mood && (
                    <TabularValue size="xs" muted>
                      {preset.metadata.mood}
                    </TabularValue>
                  )}
                  <TabularValue size="xs" muted>
                    {sections.length} categories · {totalTokens} tokens
                  </TabularValue>
                </div>

                {preset?.metadata.tags && preset.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {preset.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 text-[10px] font-[family-name:var(--s-font-mono)] uppercase tracking-[0.08em] text-[var(--s-text-muted)] border border-[var(--s-border-muted)] bg-[var(--s-surface)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </SigilSection>

        <Divider pattern="vertical" size="md" showBorders />

        {/* ── Quick stats ─────────────────────────── */}
        {preset && !loading && (
          <>
            <SigilSection padding="24px">
              <GapPixelGrid columns={{ sm: 2, md: 4 }}>
                <GapPixelCell className="p-4">
                  <MonoLabel size="sm" className="mb-1 block text-[var(--s-text-muted)]">
                    Display Font
                  </MonoLabel>
                  <TabularValue size="xs">
                    {preset.tokens.typography["font-display"].split(",")[0].replace(/['"]/g, "")}
                  </TabularValue>
                </GapPixelCell>
                <GapPixelCell className="p-4">
                  <MonoLabel size="sm" className="mb-1 block text-[var(--s-text-muted)]">
                    Body Font
                  </MonoLabel>
                  <TabularValue size="xs">
                    {preset.tokens.typography["font-body"].split(",")[0].replace(/['"]/g, "")}
                  </TabularValue>
                </GapPixelCell>
                <GapPixelCell className="p-4">
                  <MonoLabel size="sm" className="mb-1 block text-[var(--s-text-muted)]">
                    Base Radius
                  </MonoLabel>
                  <TabularValue size="xs">
                    {preset.tokens.radius.md}
                  </TabularValue>
                </GapPixelCell>
                <GapPixelCell className="p-4">
                  <MonoLabel size="sm" className="mb-1 block text-[var(--s-text-muted)]">
                    Motion Speed
                  </MonoLabel>
                  <TabularValue size="xs">
                    {preset.tokens.motion.duration.fast}
                  </TabularValue>
                </GapPixelCell>
              </GapPixelGrid>
            </SigilSection>

            <Divider pattern="diagonal" size="sm" showBorders />
          </>
        )}

        {/* ── Token document ────────────────────── */}
        {preset && !loading && (
          <SigilSection padding="32px 24px 64px">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <MonoLabel className="mb-2 block">Token Document</MonoLabel>
                <DensityText role="body" as="p" muted>
                  Full token specification for <strong>{catalogEntry?.label ?? name}</strong>.
                </DensityText>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter tokens…"
                  className="h-8 w-48 border border-[var(--s-border)] bg-[var(--s-background)] px-3 text-[12px] font-[family-name:var(--s-font-mono)] text-[var(--s-text)] placeholder:text-[var(--s-text-subtle)] outline-none focus:border-[var(--s-primary)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setExpandAll(!expandAll)}
                  className="border cursor-pointer bg-transparent p-0"
                >
                  <AccentActive active={expandAll} className="px-3 py-1.5 border-0">
                    <MonoLabel size="sm" variant={expandAll ? "accent" : "muted"}>
                      {expandAll ? "Collapse" : "Expand All"}
                    </MonoLabel>
                  </AccentActive>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {filteredSections.map(({ meta, tokens }) => (
                <TokenSection
                  key={meta.key}
                  meta={meta}
                  tokens={tokens}
                  forceOpen={expandAll || !!filterText}
                />
              ))}

              {filteredSections.length === 0 && filterText && (
                <div className="py-12 text-center">
                  <DensityText role="body" as="p" muted>
                    No tokens match "{filterText}"
                  </DensityText>
                </div>
              )}
            </div>
          </SigilSection>
        )}

        {loading && (
          <SigilSection padding="48px 24px">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-[var(--s-surface)] animate-pulse"
                />
              ))}
            </div>
          </SigilSection>
        )}

        <Divider pattern="diagonal" size="md" showBorders />
      </BorderStack>

      <LandingFooter />
    </SigilFrame>
  );
}
