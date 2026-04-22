"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ColorPickerProps = {
  value: string;
  onChange: (oklch: string) => void;
  label?: string;
};

type OklchValues = {
  l: number;
  c: number;
  h: number;
};

function parseOklch(str: string): OklchValues | null {
  const match = str.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/,
  );
  if (!match) return null;
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

function formatOklch(v: OklchValues): string {
  return `oklch(${v.l.toFixed(2)} ${v.c.toFixed(3)} ${v.h.toFixed(0)})`;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

// sRGB → linear
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// linear → sRGB
function linearToSrgb(c: number): number {
  return c <= 0.0031308
    ? c * 12.92
    : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function hexToOklch(hex: string): OklchValues | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean) && !/^[0-9a-fA-F]{3}$/.test(clean)) {
    return null;
  }

  let r: number, g: number, b: number;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) / 255;
    g = parseInt(clean[1] + clean[1], 16) / 255;
    b = parseInt(clean[2] + clean[2], 16) / 255;
  } else {
    r = parseInt(clean.slice(0, 2), 16) / 255;
    g = parseInt(clean.slice(2, 4), 16) / 255;
    b = parseInt(clean.slice(4, 6), 16) / 255;
  }

  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  // sRGB linear → OKLab via M1 and M2 matrices
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_c = Math.cbrt(l_);
  const m_c = Math.cbrt(m_);
  const s_c = Math.cbrt(s_);

  const L = 0.2104542553 * l_c + 0.793617785 * m_c - 0.0040720468 * s_c;
  const a = 1.9779984951 * l_c - 2.428592205 * m_c + 0.4505937099 * s_c;
  const bLab = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.808675766 * s_c;

  const C = Math.sqrt(a * a + bLab * bLab);
  let H = (Math.atan2(bLab, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { l: clamp(L, 0, 1), c: clamp(C, 0, 0.4), h: H % 360 };
}

function oklchToHex(v: OklchValues): string {
  const hRad = (v.h * Math.PI) / 180;
  const a = v.c * Math.cos(hRad);
  const bLab = v.c * Math.sin(hRad);

  const l_c = v.l + 0.3963377774 * a + 0.2158037573 * bLab;
  const m_c = v.l - 0.1055613458 * a - 0.0638541728 * bLab;
  const s_c = v.l - 0.0894841775 * a - 1.291485548 * bLab;

  const l_ = l_c * l_c * l_c;
  const m_ = m_c * m_c * m_c;
  const s_ = s_c * s_c * s_c;

  const r = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const b = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;

  const toHex = (c: number) => {
    const v = Math.round(clamp(linearToSrgb(c), 0, 1) * 255);
    return v.toString(16).padStart(2, "0");
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [localValues, setLocalValues] = useState<OklchValues>(
    () => parseOklch(value) ?? { l: 0.65, c: 0.15, h: 280 },
  );
  const [textInput, setTextInput] = useState(value);
  const [hexInput, setHexInput] = useState(() => {
    const v = parseOklch(value);
    return v ? oklchToHex(v) : "#7c6ccc";
  });
  const isExternalUpdate = useRef(false);

  useEffect(() => {
    const parsed = parseOklch(value);
    if (parsed) {
      isExternalUpdate.current = true;
      setLocalValues(parsed);
      setTextInput(value);
      setHexInput(oklchToHex(parsed));
    }
  }, [value]);

  const emitChange = useCallback(
    (v: OklchValues) => {
      const formatted = formatOklch(v);
      setTextInput(formatted);
      setHexInput(oklchToHex(v));
      onChange(formatted);
    },
    [onChange],
  );

  const handleSlider = useCallback(
    (key: keyof OklchValues, raw: number) => {
      setLocalValues((prev) => {
        const next = { ...prev, [key]: raw };
        emitChange(next);
        return next;
      });
    },
    [emitChange],
  );

  const handleTextSubmit = useCallback(() => {
    const parsed = parseOklch(textInput);
    if (parsed) {
      setLocalValues(parsed);
      setHexInput(oklchToHex(parsed));
      onChange(formatOklch(parsed));
    }
  }, [textInput, onChange]);

  const handleHexSubmit = useCallback(() => {
    const parsed = hexToOklch(hexInput);
    if (parsed) {
      setLocalValues(parsed);
      const formatted = formatOklch(parsed);
      setTextInput(formatted);
      onChange(formatted);
    }
  }, [hexInput, onChange]);

  const sliderTrackStyle = (
    gradient: string,
  ): React.CSSProperties => ({
    width: "100%",
    height: "8px",
    borderRadius: "4px",
    background: gradient,
    position: "relative",
    cursor: "pointer",
  });

  const oklchStr = formatOklch(localValues);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--s-text-secondary)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </label>
      )}

      {/* Preview swatch + text inputs */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid var(--s-border)",
            background: oklchStr,
            flexShrink: 0,
          }}
        />
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onBlur={handleTextSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
          style={{
            flex: 1,
            padding: "4px 6px",
            borderRadius: "5px",
            border: "1px solid var(--s-border)",
            background: "var(--s-background)",
            color: "var(--s-text)",
            fontSize: "10px",
            fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
            outline: "none",
            minWidth: 0,
          }}
        />
        <input
          type="text"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          onBlur={handleHexSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleHexSubmit()}
          style={{
            width: "70px",
            padding: "4px 6px",
            borderRadius: "5px",
            border: "1px solid var(--s-border)",
            background: "var(--s-background)",
            color: "var(--s-text)",
            fontSize: "10px",
            fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
            outline: "none",
          }}
        />
      </div>

      {/* Lightness slider */}
      <SliderRow
        label="L"
        min={0}
        max={1}
        step={0.01}
        value={localValues.l}
        onChange={(v) => handleSlider("l", v)}
        gradient={`linear-gradient(to right, oklch(0 ${localValues.c} ${localValues.h}), oklch(0.5 ${localValues.c} ${localValues.h}), oklch(1 ${localValues.c} ${localValues.h}))`}
        format={(v) => v.toFixed(2)}
      />

      {/* Chroma slider */}
      <SliderRow
        label="C"
        min={0}
        max={0.4}
        step={0.005}
        value={localValues.c}
        onChange={(v) => handleSlider("c", v)}
        gradient={`linear-gradient(to right, oklch(${localValues.l} 0 ${localValues.h}), oklch(${localValues.l} 0.2 ${localValues.h}), oklch(${localValues.l} 0.4 ${localValues.h}))`}
        format={(v) => v.toFixed(3)}
      />

      {/* Hue slider */}
      <SliderRow
        label="H"
        min={0}
        max={360}
        step={1}
        value={localValues.h}
        onChange={(v) => handleSlider("h", v)}
        gradient={`linear-gradient(to right, oklch(${localValues.l} ${localValues.c} 0), oklch(${localValues.l} ${localValues.c} 60), oklch(${localValues.l} ${localValues.c} 120), oklch(${localValues.l} ${localValues.c} 180), oklch(${localValues.l} ${localValues.c} 240), oklch(${localValues.l} ${localValues.c} 300), oklch(${localValues.l} ${localValues.c} 360))`}
        format={(v) => `${Math.round(v)}°`}
      />
    </div>
  );
}

function SliderRow({
  label,
  min,
  max,
  step,
  value,
  onChange,
  gradient,
  format,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  gradient: string;
  format: (v: number) => string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span
        style={{
          width: "14px",
          fontSize: "10px",
          fontWeight: 600,
          color: "var(--s-text-muted)",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            background: gradient,
            border: "1px solid var(--s-border)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${((value - min) / (max - min)) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#fff",
            border: "2px solid var(--s-primary)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        />
      </div>
      <span
        style={{
          width: "42px",
          fontSize: "10px",
          color: "var(--s-text-secondary)",
          textAlign: "right",
          fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
          flexShrink: 0,
        }}
      >
        {format(value)}
      </span>
    </div>
  );
}
