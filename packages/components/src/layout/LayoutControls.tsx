"use client";

import { forwardRef, useCallback, type ChangeEvent } from "react";
import { cn } from "../utils";

export interface LayoutControlsProps {
  onPatch: (category: string, key: string, value: string) => void;
  values?: {
    navbarHeight?: string;
    pageMargin?: string;
    gutter?: string;
    sectionGap?: string;
    bentoGap?: string;
    bentoRadius?: string;
    contentMax?: string;
    gridColumns?: string;
  };
  className?: string;
}

interface SliderDef {
  label: string;
  category: string;
  tokenKey: string;
  valueKey: keyof NonNullable<LayoutControlsProps["values"]>;
  min: number;
  max: number;
  step: number;
  fallback: number;
  unit: string;
}

const SLIDERS: SliderDef[] = [
  { label: "NAVBAR HEIGHT", category: "layout", tokenKey: "navbar-height", valueKey: "navbarHeight", min: 48, max: 96, step: 4, fallback: 64, unit: "px" },
  { label: "PAGE MARGIN", category: "layout", tokenKey: "page-margin", valueKey: "pageMargin", min: 8, max: 64, step: 4, fallback: 24, unit: "px" },
  { label: "GUTTER", category: "layout", tokenKey: "gutter", valueKey: "gutter", min: 8, max: 48, step: 4, fallback: 16, unit: "px" },
  { label: "SECTION SPACING", category: "spacing", tokenKey: "section-py", valueKey: "sectionGap", min: 24, max: 128, step: 8, fallback: 64, unit: "px" },
  { label: "BENTO GAP", category: "layout", tokenKey: "bento-gap", valueKey: "bentoGap", min: 4, max: 32, step: 2, fallback: 12, unit: "px" },
  { label: "BENTO RADIUS", category: "layout", tokenKey: "bento-radius", valueKey: "bentoRadius", min: 0, max: 32, step: 2, fallback: 12, unit: "px" },
  { label: "CONTENT MAX", category: "layout", tokenKey: "content-max", valueKey: "contentMax", min: 768, max: 1920, step: 64, fallback: 1280, unit: "px" },
  { label: "GRID COLUMNS", category: "layout", tokenKey: "grid-columns", valueKey: "gridColumns", min: 2, max: 6, step: 1, fallback: 4, unit: "" },
];

function parseNumeric(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? fallback : n;
}

export const LayoutControls = forwardRef<HTMLDivElement, LayoutControlsProps>(
  function LayoutControls({ onPatch, values, className }, ref) {
    const handleChange = useCallback(
      (def: SliderDef) => (e: ChangeEvent<HTMLInputElement>) => {
        const suffix = def.unit ? def.unit : "";
        onPatch(def.category, def.tokenKey, `${e.target.value}${suffix}`);
      },
      [onPatch],
    );

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-2 gap-x-16 gap-y-2", className)}
      >
        {SLIDERS.map((def) => {
          const numeric = parseNumeric(values?.[def.valueKey], def.fallback);
          return (
            <div
              key={def.tokenKey}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <label
                style={{
                  fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                  fontSize: 10,
                  fontWeight: 500,
                  color: "var(--s-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  width: 100,
                  flexShrink: 0,
                }}
              >
                {def.label}
              </label>
              <input
                type="range"
                min={def.min}
                max={def.max}
                step={def.step}
                value={numeric}
                onChange={handleChange(def)}
                style={{ flex: 1, accentColor: "var(--s-primary)", height: 4 }}
              />
              <span
                style={{
                  fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                  fontSize: 10,
                  color: "var(--s-text-secondary)",
                  width: 48,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {numeric}
                {def.unit}
              </span>
            </div>
          );
        })}
      </div>
    );
  },
);
