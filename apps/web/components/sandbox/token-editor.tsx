"use client";

import { useCallback, useState } from "react";
import type { SigilTokens } from "@sigil-ui/tokens";
import { NativeSelect } from "@sigil-ui/components";
import { useSigilTokens } from "./token-provider";

/* ------------------------------------------------------------------ */
/*  Shared controls                                                    */
/* ------------------------------------------------------------------ */

function cssColorToHex(color: string): string {
  if (color.startsWith("#") && (color.length === 7 || color.length === 4))
    return color;
  if (typeof document === "undefined") return "#000000";
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: value,
            border: "1px solid var(--s-border)",
          }}
        />
        <input
          type="color"
          value={cssColorToHex(value)}
          onChange={(e) => onChange(e.target.value)}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
      </div>
      <span style={{ fontSize: 11, color: "var(--s-text-muted)", minWidth: 60 }}>
        {label}
      </span>
    </label>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
      }}
    >
      <span style={{ color: "var(--s-text-muted)", minWidth: 80, flexShrink: 0 }}>
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: "var(--s-primary)", height: 4 }}
      />
      <span
        style={{
          color: "var(--s-text)",
          minWidth: 40,
          textAlign: "right",
          fontFamily: "var(--s-font-mono, monospace)",
          fontSize: 10,
        }}
      >
        {value}
        {unit ?? ""}
      </span>
    </label>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
      <span style={{ color: "var(--s-text-muted)", minWidth: 80, flexShrink: 0 }}>
        {label}
      </span>
      <NativeSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-auto flex-1 py-0.5 text-[11px]"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </NativeSelect>
    </label>
  );
}

function ToggleControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, cursor: "pointer" }}>
      <span style={{ color: "var(--s-text-muted)", minWidth: 80, flexShrink: 0 }}>
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        style={{
          width: 32,
          height: 18,
          borderRadius: 9,
          border: "none",
          background: value ? "var(--s-primary)" : "var(--s-border)",
          position: "relative",
          cursor: "pointer",
          transition: "background 150ms",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#fff",
            position: "absolute",
            top: 2,
            left: value ? 16 : 2,
            transition: "left 150ms",
          }}
        />
      </button>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion section                                                  */
/* ------------------------------------------------------------------ */

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid var(--s-border)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--s-text)",
          fontFamily: "inherit",
        }}
      >
        {title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transition: "transform 200ms",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            padding: "4px 16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Value parsers                                                      */
/* ------------------------------------------------------------------ */

function parseNumericValue(s: string): { num: number; unit: string } {
  const match = /^(-?\d*\.?\d+)\s*(px|rem|em|%|ms|s|deg)?$/.exec(s);
  if (!match) return { num: 0, unit: "px" };
  return { num: parseFloat(match[1]), unit: match[2] ?? "" };
}

function resolveColorValue(
  v: string | { light: string; dark: string },
): string {
  if (typeof v === "string") return v;
  return v.dark;
}

/* ------------------------------------------------------------------ */
/*  Category editors                                                   */
/* ------------------------------------------------------------------ */

const COLOR_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text",
  "border",
] as const;

function ColorsPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const colors = tokens.colors;

  const handleChange = useCallback(
    (key: string, newColor: string) => {
      const current = (colors as Record<string, unknown>)[key];
      if (typeof current === "object" && current !== null && "light" in current) {
        const themed = current as { light: string; dark: string };
        patchTokens("colors", key, { ...themed, dark: newColor });
      } else {
        patchTokens("colors", key, newColor);
      }
    },
    [colors, patchTokens],
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
      {COLOR_KEYS.map((key) => (
        <ColorPicker
          key={key}
          label={key}
          value={resolveColorValue(
            (colors as Record<string, string | { light: string; dark: string }>)[key],
          )}
          onChange={(v) => handleChange(key, v)}
        />
      ))}
    </div>
  );
}

const DISPLAY_FONTS = [
  "Inter", "Nacelle", "Poppins", "Space Grotesk", "DM Sans", "Work Sans",
  "Outfit", "Satoshi", "Manrope", "Plus Jakarta Sans", "Geist", "Lexend",
  "Cabinet Grotesk", "Sora", "Nunito Sans", "Red Hat Display", "Archivo",
  "Fraunces", "Playfair Display", "Unbounded", "Bebas Neue", "Cal Sans",
] as const;

function TypographyPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const typo = tokens.typography;
  const basePx = parseNumericValue(typo["size-base"] ?? "16px");

  return (
    <>
      <SelectControl
        label="Display"
        value={typo["font-display"].split(",")[0].replace(/'/g, "").trim()}
        options={DISPLAY_FONTS}
        onChange={(v) =>
          patchTokens("typography", "font-display", `'${v}', system-ui, sans-serif`)
        }
      />
      <SelectControl
        label="Body"
        value={typo["font-body"].split(",")[0].replace(/'/g, "").trim()}
        options={DISPLAY_FONTS}
        onChange={(v) =>
          patchTokens("typography", "font-body", `'${v}', system-ui, sans-serif`)
        }
      />
      <SliderControl
        label="Base size"
        value={Math.round(basePx.num * (basePx.unit === "rem" ? 16 : 1))}
        min={12}
        max={20}
        unit="px"
        onChange={(v) =>
          patchTokens("typography", "size-base", `${(v / 16).toFixed(4)}rem`)
        }
      />
    </>
  );
}

function SpacingPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const sp = tokens.spacing;

  const sliders: { key: keyof typeof sp; label: string; max: number }[] = [
    { key: "card-padding", label: "Card pad", max: 48 },
    { key: "button-px", label: "Btn X", max: 40 },
    { key: "button-py", label: "Btn Y", max: 20 },
    { key: "section-py", label: "Section", max: 120 },
  ];

  const layoutSliders: {
    key: keyof NonNullable<SigilTokens["layout"]>;
    label: string;
    max: number;
  }[] = [
    { key: "gutter", label: "Gutter", max: 48 },
    { key: "page-margin", label: "Page margin", max: 80 },
  ];

  return (
    <>
      {sliders.map(({ key, label, max }) => {
        const { num } = parseNumericValue(String(sp[key]));
        return (
          <SliderControl
            key={key}
            label={label}
            value={num}
            min={0}
            max={max}
            unit="px"
            onChange={(v) => patchTokens("spacing", key, `${v}px`)}
          />
        );
      })}
      {(() => {
        const layout = tokens.layout;
        if (!layout) return null;
        return layoutSliders.map(({ key, label, max }) => {
          const { num } = parseNumericValue(String(layout[key]));
          return (
            <SliderControl
              key={key}
              label={label}
              value={num}
              min={0}
              max={max}
              unit="px"
              onChange={(v) => patchTokens("layout", key, `${v}px`)}
            />
          );
        });
      })()}
    </>
  );
}

function RadiusPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const r = tokens.radius;

  const keys: (keyof typeof r)[] = ["button", "card", "input", "badge", "modal"];

  return (
    <>
      {keys.map((key) => {
        const { num } = parseNumericValue(r[key] ?? "0px");
        return (
          <SliderControl
            key={key}
            label={key}
            value={num}
            min={0}
            max={key === "badge" ? 9999 : 24}
            unit="px"
            onChange={(v) =>
              patchTokens("radius", key, v >= 9999 ? "9999px" : `${v}px`)
            }
          />
        );
      })}
    </>
  );
}

function BordersPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const b = tokens.borders;
  const { num } = parseNumericValue(b.width.thin);

  return (
    <>
      <SliderControl
        label="Width"
        value={num}
        min={0}
        max={4}
        step={0.5}
        unit="px"
        onChange={(v) =>
          patchTokens("borders", "width", {
            ...b.width,
            thin: `${v}px`,
            medium: `${v * 1.5}px`,
            thick: `${v * 2}px`,
          })
        }
      />
      <SelectControl
        label="Style"
        value={b.style ?? "solid"}
        options={["solid", "dashed", "dotted", "double", "none"]}
        onChange={(v) => patchTokens("borders", "style", v)}
      />
    </>
  );
}

function MotionPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const m = tokens.motion;

  const durations: { key: keyof typeof m.duration; max: number }[] = [
    { key: "fast", max: 500 },
    { key: "normal", max: 800 },
    { key: "slow", max: 1200 },
  ];

  return (
    <>
      {durations.map(({ key, max }) => {
        const { num } = parseNumericValue(m.duration[key] ?? "200ms");
        return (
          <SliderControl
            key={key}
            label={key}
            value={num}
            min={0}
            max={max}
            unit="ms"
            onChange={(v) =>
              patchTokens("motion", "duration", { ...m.duration, [key]: `${v}ms` })
            }
          />
        );
      })}
      <SelectControl
        label="Easing"
        value={
          m.easing.default.includes("0.16")
            ? "ease-out-expo"
            : m.easing.default.includes("0.45")
              ? "ease-in-out"
              : "custom"
        }
        options={["ease-out-expo", "ease-in-out", "spring", "bounce", "linear"]}
        onChange={(v) => {
          const map: Record<string, string> = {
            "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
            "ease-in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
            spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            linear: "linear",
          };
          patchTokens("motion", "easing", {
            ...m.easing,
            default: map[v] ?? m.easing.default,
          });
        }}
      />
    </>
  );
}

function ButtonsPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const b = tokens.buttons;
  if (!b) return null;

  return (
    <>
      <SelectControl
        label="Weight"
        value={b["font-weight"]}
        options={["400", "500", "600", "700"]}
        onChange={(v) => patchTokens("buttons", "font-weight", v)}
      />
      <SelectControl
        label="Transform"
        value={b["text-transform"]}
        options={["none", "uppercase", "capitalize", "lowercase"]}
        onChange={(v) => patchTokens("buttons", "text-transform", v)}
      />
      <SelectControl
        label="Hover"
        value={b["hover-effect"]}
        options={["glow", "lift", "darken", "outline", "fill", "none"]}
        onChange={(v) => patchTokens("buttons", "hover-effect", v)}
      />
    </>
  );
}

function CardsPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const c = tokens.cards;
  if (!c) return null;

  return (
    <>
      <SelectControl
        label="Hover"
        value={c["hover-effect"]}
        options={["lift", "glow", "border", "scale", "none"]}
        onChange={(v) => patchTokens("cards", "hover-effect", v)}
      />
      <SelectControl
        label="Border"
        value={c["border-style"]}
        options={["solid", "dashed", "dotted", "none"]}
        onChange={(v) => patchTokens("cards", "border-style", v)}
      />
    </>
  );
}

function BackgroundsPanel() {
  const { tokens, patchTokens } = useSigilTokens();
  const bg = tokens.backgrounds;
  if (!bg) return null;

  return (
    <>
      <SelectControl
        label="Pattern"
        value={bg.pattern}
        options={[
          "none", "dots", "grid", "crosshatch", "diagonal", "diamond",
          "hexagon", "triangle",
        ]}
        onChange={(v) => patchTokens("backgrounds", "pattern", v)}
      />
      <ToggleControl
        label="Noise"
        value={bg.noise}
        onChange={(v) => patchTokens("backgrounds", "noise", v)}
      />
      <SelectControl
        label="Gradient"
        value={bg["gradient-type"]}
        options={["none", "linear", "radial", "conic"]}
        onChange={(v) => patchTokens("backgrounds", "gradient-type", v)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main editor                                                        */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "colors", title: "Colors", Component: ColorsPanel },
  { id: "typography", title: "Typography", Component: TypographyPanel },
  { id: "spacing", title: "Spacing", Component: SpacingPanel },
  { id: "radius", title: "Radius", Component: RadiusPanel },
  { id: "borders", title: "Borders", Component: BordersPanel },
  { id: "motion", title: "Motion", Component: MotionPanel },
  { id: "buttons", title: "Buttons", Component: ButtonsPanel },
  { id: "cards", title: "Cards", Component: CardsPanel },
  { id: "backgrounds", title: "Backgrounds", Component: BackgroundsPanel },
] as const;

export function TokenEditor() {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(["colors"]),
  );

  const toggle = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {SECTIONS.map(({ id, title, Component }) => (
        <Section
          key={id}
          title={title}
          open={openSections.has(id)}
          onToggle={() => toggle(id)}
        >
          <Component />
        </Section>
      ))}
    </div>
  );
}
