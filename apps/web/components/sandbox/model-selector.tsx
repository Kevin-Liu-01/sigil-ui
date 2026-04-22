"use client";

import { useCallback, useRef, useState, useEffect } from "react";

export type ModelId =
  | "gpt-5.4-mini"
  | "gpt-5.4"
  | "claude-sonnet-4.6"
  | "claude-haiku-3.5"
  | "gemini-3.1-flash"
  | "gemini-3.1-pro";

type ModelOption = {
  id: ModelId;
  label: string;
  provider: string;
};

const MODEL_OPTIONS: ModelOption[] = [
  { id: "gpt-5.4-mini", label: "GPT-5.4 Mini", provider: "OpenAI" },
  { id: "gpt-5.4", label: "GPT-5.4", provider: "OpenAI" },
  { id: "claude-sonnet-4.6", label: "Claude Sonnet 4.6", provider: "Anthropic" },
  { id: "claude-haiku-3.5", label: "Claude Haiku 3.5", provider: "Anthropic" },
  { id: "gemini-3.1-flash", label: "Gemini 3.1 Flash", provider: "Google" },
  { id: "gemini-3.1-pro", label: "Gemini 3.1 Pro", provider: "Google" },
];

type ModelSelectorProps = {
  value: ModelId;
  onChange: (model: ModelId) => void;
};

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = MODEL_OPTIONS.find((m) => m.id === value)!;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, handleClickOutside]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "3px 8px",
          borderRadius: "6px",
          border: "1px solid var(--s-border)",
          background: "var(--s-surface)",
          color: "var(--s-text-secondary)",
          fontSize: "11px",
          fontWeight: 500,
          cursor: "pointer",
          lineHeight: "1.4",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "9px", opacity: 0.6 }}>▾</span>
        {selected.label}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            marginBottom: "4px",
            minWidth: "180px",
            padding: "4px",
            borderRadius: "8px",
            border: "1px solid var(--s-border)",
            background: "var(--s-surface-elevated, var(--s-surface))",
            boxShadow: "var(--s-shadow-lg, 0 4px 16px rgba(0,0,0,0.12))",
            zIndex: 50,
          }}
        >
          {MODEL_OPTIONS.map((opt) => {
            const isActive = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: "5px",
                  border: "none",
                  background: isActive
                    ? "var(--s-primary-muted)"
                    : "transparent",
                  color: isActive
                    ? "var(--s-primary)"
                    : "var(--s-text)",
                  fontSize: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  lineHeight: "1.4",
                }}
              >
                <span style={{ fontWeight: isActive ? 600 : 400 }}>
                  {opt.label}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--s-text-muted)",
                    fontWeight: 400,
                  }}
                >
                  {opt.provider}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
