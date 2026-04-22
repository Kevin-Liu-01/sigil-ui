"use client";

import { useCallback, useEffect, useState, useRef } from "react";

type SliderControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
};

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "px",
  onChange,
}: SliderControlProps) {
  const [localValue, setLocalValue] = useState(value);
  const [textValue, setTextValue] = useState(`${value}`);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
    if (!isEditing) {
      setTextValue(`${value}`);
    }
  }, [value, isEditing]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setLocalValue(v);
      setTextValue(`${v}`);
      onChange(v);
    },
    [onChange],
  );

  const handleTextSubmit = useCallback(() => {
    setIsEditing(false);
    const stripped = textValue.replace(/[^\d.\-]/g, "");
    const parsed = parseFloat(stripped);
    if (Number.isNaN(parsed)) {
      setTextValue(`${localValue}`);
      return;
    }
    const clamped = Math.min(max, Math.max(min, parsed));
    setLocalValue(clamped);
    setTextValue(`${clamped}`);
    onChange(clamped);
  }, [textValue, localValue, min, max, onChange]);

  const pct = ((localValue - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <input
            ref={inputRef}
            type="text"
            value={isEditing ? textValue : `${localValue}`}
            onChange={(e) => setTextValue(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={handleTextSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTextSubmit();
                inputRef.current?.blur();
              }
            }}
            style={{
              width: "40px",
              padding: "1px 3px",
              borderRadius: "4px",
              border: "1px solid transparent",
              background: isEditing ? "var(--s-background)" : "transparent",
              borderColor: isEditing ? "var(--s-border)" : "transparent",
              color: "var(--s-text)",
              fontSize: "11px",
              fontWeight: 500,
              fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
              textAlign: "right",
              outline: "none",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              color: "var(--s-text-muted)",
              fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
            }}
          >
            {unit}
          </span>
        </div>
      </div>

      <div style={{ position: "relative", height: "14px" }}>
        {/* Track background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "4px",
            transform: "translateY(-50%)",
            borderRadius: "2px",
            background: "var(--s-border)",
          }}
        />
        {/* Filled track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${pct}%`,
            height: "4px",
            transform: "translateY(-50%)",
            borderRadius: "2px",
            background: "var(--s-primary)",
          }}
        />
        {/* Thumb indicator */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--s-primary)",
            border: "2px solid var(--s-background)",
            boxShadow: "0 0 0 1px var(--s-primary)",
            pointerEvents: "none",
          }}
        />
        {/* Transparent range input on top */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleSliderChange}
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
      </div>
    </div>
  );
}
