"use client";

import { useState, useCallback } from "react";
import { NativeSelect } from "@sigil-ui/components";

type FontCategory = "display" | "body" | "mono";

type FontOption = {
  name: string;
  family: string;
  category: "sans" | "serif" | "mono" | "display" | "pixel";
  local: boolean;
};

const SANS_FONTS: FontOption[] = [
  { name: "ABC Monument Grotesk", family: '"ABC Monument Grotesk", system-ui, sans-serif', category: "sans", local: true },
  { name: "Apfel Grotezk", family: '"Apfel Grotezk", system-ui, sans-serif', category: "sans", local: true },
  { name: "Nacelle", family: '"Nacelle", system-ui, sans-serif', category: "sans", local: true },
  { name: "Tex Gyre Heros", family: '"Tex Gyre Heros", system-ui, sans-serif', category: "sans", local: true },
  { name: "TT Commons Classic", family: '"TT Commons Classic", system-ui, sans-serif', category: "sans", local: true },
  { name: "Vulf Sans", family: '"Vulf Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Neue Montreal", family: '"PP Neue Montreal", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Mori", family: '"PP Mori", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Telegraf", family: '"PP Telegraf", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Gosha Sans", family: '"PP Gosha Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Radio Grotesk", family: '"PP Radio Grotesk", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Pangram Sans", family: '"PP Pangram Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Supply Sans", family: '"PP Supply Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Fraktion Sans", family: '"PP Fraktion Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Pier Sans", family: '"PP Pier Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Fuji", family: '"PP Fuji", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Charlevoix", family: '"PP Charlevoix", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Acma", family: '"PP Acma", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Fragment Sans", family: '"PP Fragment Sans", system-ui, sans-serif', category: "sans", local: true },
  { name: "PP Casa", family: '"PP Casa", system-ui, sans-serif', category: "sans", local: true },
];

const SERIF_FONTS: FontOption[] = [
  { name: "PP Editorial New", family: '"PP Editorial New", Georgia, serif', category: "serif", local: true },
  { name: "PP Eiko", family: '"PP Eiko", Georgia, serif', category: "serif", local: true },
  { name: "PP Hatton", family: '"PP Hatton", Georgia, serif', category: "serif", local: true },
  { name: "PP Rader", family: '"PP Rader", Georgia, serif', category: "serif", local: true },
  { name: "PP Cirka", family: '"PP Cirka", Georgia, serif', category: "serif", local: true },
  { name: "PP Writer", family: '"PP Writer", Georgia, serif', category: "serif", local: true },
  { name: "PP Fragment Serif", family: '"PP Fragment Serif", Georgia, serif', category: "serif", local: true },
  { name: "PP Gatwick", family: '"PP Gatwick", Georgia, serif', category: "serif", local: true },
  { name: "Migra", family: '"Migra", Georgia, serif', category: "serif", local: true },
];

const DISPLAY_FONTS: FontOption[] = [
  { name: "PP Monument Extended", family: '"PP Monument Extended", system-ui, sans-serif', category: "display", local: true },
  { name: "PP Neue Machina", family: '"PP Neue Machina", system-ui, sans-serif', category: "display", local: true },
  { name: "PP Formula Condensed", family: '"PP Formula Condensed", system-ui, sans-serif', category: "display", local: true },
  { name: "PP Stellar", family: '"PP Stellar", system-ui, sans-serif', category: "display", local: true },
  { name: "PP Woodland", family: '"PP Woodland", system-ui, sans-serif', category: "display", local: true },
  { name: "PP Mondwest", family: '"PP Mondwest", system-ui, sans-serif', category: "display", local: true },
];

const MONO_FONTS: FontOption[] = [
  { name: "PP Fraktion Mono", family: '"PP Fraktion Mono", ui-monospace, monospace', category: "mono", local: true },
  { name: "PP Supply Mono", family: '"PP Supply Mono", ui-monospace, monospace', category: "mono", local: true },
  { name: "PP Neue Bit", family: '"PP Neue Bit", ui-monospace, monospace', category: "pixel", local: true },
];

const DISPLAY_BODY_OPTIONS = [...SANS_FONTS, ...SERIF_FONTS, ...DISPLAY_FONTS];

type FontPickerProps = {
  onFontChange?: (category: FontCategory, family: string) => void;
  currentDisplay?: string;
  currentBody?: string;
  currentMono?: string;
};

function FontRow({
  label,
  options,
  value,
  onChange,
  previewText,
}: {
  label: string;
  options: FontOption[];
  value: string;
  onChange: (family: string) => void;
  previewText: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "var(--s-text-muted)",
          marginBottom: 6,
          fontFamily: "var(--s-font-mono)",
        }}
      >
        {label}
      </div>
      <NativeSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs"
      >
        {options.map((opt) => (
          <option key={opt.name} value={opt.family}>
            {opt.name} {opt.category !== "sans" ? `(${opt.category})` : ""}
          </option>
        ))}
      </NativeSelect>
      <div
        style={{
          marginTop: 6,
          padding: "8px 10px",
          borderRadius: 6,
          background: "var(--s-surface-sunken, var(--s-surface))",
          fontFamily: value,
          fontSize: 14,
          lineHeight: 1.4,
          color: "var(--s-text)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {previewText}
      </div>
    </div>
  );
}

export function FontPicker({
  onFontChange,
  currentDisplay = '"ABC Monument Grotesk", system-ui, sans-serif',
  currentBody = '"ABC Monument Grotesk", system-ui, sans-serif',
  currentMono = '"PP Fraktion Mono", ui-monospace, monospace',
}: FontPickerProps) {
  const [display, setDisplay] = useState(currentDisplay);
  const [body, setBody] = useState(currentBody);
  const [mono, setMono] = useState(currentMono);

  const handleDisplay = useCallback(
    (family: string) => {
      setDisplay(family);
      onFontChange?.("display", family);
    },
    [onFontChange],
  );

  const handleBody = useCallback(
    (family: string) => {
      setBody(family);
      onFontChange?.("body", family);
    },
    [onFontChange],
  );

  const handleMono = useCallback(
    (family: string) => {
      setMono(family);
      onFontChange?.("mono", family);
    },
    [onFontChange],
  );

  return (
    <div style={{ padding: "8px 0" }}>
      <FontRow
        label="Display Font"
        options={DISPLAY_BODY_OPTIONS}
        value={display}
        onChange={handleDisplay}
        previewText="The quick brown fox jumps over the lazy dog"
      />
      <FontRow
        label="Body Font"
        options={DISPLAY_BODY_OPTIONS}
        value={body}
        onChange={handleBody}
        previewText="Design tokens that compound across every component."
      />
      <FontRow
        label="Monospace Font"
        options={MONO_FONTS}
        value={mono}
        onChange={handleMono}
        previewText="npx @sigil-ui/cli init --preset noir"
      />
    </div>
  );
}
