"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSigilTokens } from "./token-provider";
import type { SigilTokens } from "@sigil-ui/tokens";
import { tokensToMarkdown } from "./token-markdown";

/**
 * Flattens a SigilTokens object into CSS custom property declarations.
 * Produces lines like `--s-primary: oklch(0.65 0.24 275);`
 */
function tokensToCssText(tokens: SigilTokens): string {
  const lines: string[] = [];
  lines.push(":root {");

  const CATEGORY_PREFIX: Record<string, string> = {
    colors: "",
    typography: "",
    radius: "radius-",
    shadows: "shadow-",
    sigil: "",
    borders: "border-",
    layout: "",
    spacing: "",
    buttons: "btn-",
    cards: "card-",
    navigation: "nav-",
    headings: "heading-",
    backgrounds: "bg-",
    code: "code-",
    inputs: "input-",
    motion: "motion-",
  };

  for (const [category, obj] of Object.entries(tokens)) {
    if (!obj || typeof obj !== "object") continue;
    const prefix = CATEGORY_PREFIX[category] ?? `${category}-`;
    lines.push(`  /* ${category} */`);

    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if ("light" in (value as Record<string, unknown>) && "dark" in (value as Record<string, unknown>)) {
          const t = value as { light: string; dark: string };
          lines.push(`  --s-${prefix}${key}: ${t.light};`);
        } else {
          for (const [subKey, subVal] of Object.entries(value as Record<string, unknown>)) {
            if (typeof subVal === "string" || typeof subVal === "number") {
              lines.push(`  --s-${prefix}${key}-${subKey}: ${subVal};`);
            }
          }
        }
      } else if (typeof value === "string") {
        lines.push(`  --s-${prefix}${key}: ${value};`);
      } else if (typeof value === "number") {
        lines.push(`  --s-${prefix}${key}: ${value};`);
      }
    }
  }

  lines.push("}");
  return lines.join("\n");
}

type PresetEditorProps = {
  className?: string;
  markdownText?: string;
  /** Called when user wants to copy the CSS output. */
  onCopy?: () => void;
  /** Called when user wants to export the preset. */
  onExport?: () => void;
};

export function PresetEditor({ className, markdownText, onCopy, onExport }: PresetEditorProps) {
  const { tokens, activePreset, patchTokens } = useSigilTokens();
  const [editMode, setEditMode] = useState<"markdown" | "css" | "json">("markdown");
  const [localText, setLocalText] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generatedCss = useMemo(() => tokensToCssText(tokens), [tokens]);
  const generatedJson = useMemo(
    () => JSON.stringify(tokens, null, 2),
    [tokens],
  );
  const generatedMarkdown = useMemo(
    () => markdownText ?? tokensToMarkdown(tokens, activePreset.replace(/\*$/, "")),
    [activePreset, markdownText, tokens],
  );

  useEffect(() => {
    if (!isDirty) {
      if (editMode === "markdown") setLocalText(generatedMarkdown);
      else setLocalText(editMode === "css" ? generatedCss : generatedJson);
    }
  }, [generatedCss, generatedJson, generatedMarkdown, editMode, isDirty]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalText(e.target.value);
      setIsDirty(true);
    },
    [],
  );

  const handleApply = useCallback(() => {
    if (editMode === "markdown") {
      setIsDirty(false);
      return;
    }
    if (editMode === "json") {
      try {
        const parsed = JSON.parse(localText) as Partial<SigilTokens>;
        for (const [category, obj] of Object.entries(parsed)) {
          if (obj && typeof obj === "object") {
            for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
              patchTokens(category as keyof SigilTokens, key, value);
            }
          }
        }
        setIsDirty(false);
      } catch {
        /* invalid JSON - ignore */
      }
    } else {
      const varRegex = /--s-([a-z0-9-]+):\s*(.+?)\s*;/g;
      let match: RegExpExecArray | null;
      while ((match = varRegex.exec(localText)) !== null) {
        const varName = match[1];
        const varValue = match[2];
        const parts = varName.split("-");
        if (parts.length >= 2) {
          const possibleCategory = parts[0];
          const key = parts.slice(1).join("-");
          patchTokens(possibleCategory as keyof SigilTokens, key, varValue);
        }
      }
      setIsDirty(false);
    }
  }, [editMode, localText, patchTokens]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(localText);
    onCopy?.();
  }, [localText, onCopy]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--s-background)",
        color: "var(--s-text)",
      }}
    >
      {/* Editor header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid var(--s-border)",
          background: "var(--s-surface)",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
              color: "var(--s-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {activePreset}
          </span>

          {/* Mode toggle */}
          <div
            style={{
              display: "flex",
              border: "1px solid var(--s-border)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {(["markdown", "css", "json"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setEditMode(mode);
                  setIsDirty(false);
                }}
                style={{
                  padding: "2px 8px",
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  background:
                    editMode === mode
                      ? "var(--s-surface-elevated, var(--s-surface))"
                      : "transparent",
                  color:
                    editMode === mode
                      ? "var(--s-text)"
                      : "var(--s-text-muted)",
                }}
              >
                {mode === "markdown" ? "tokens.md" : mode}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px" }}>
          {isDirty && (
            <button
              type="button"
              onClick={handleApply}
              style={{
                padding: "3px 10px",
                borderRadius: "4px",
                border: "none",
                background: "var(--s-primary)",
                color: "var(--s-primary-contrast, #fff)",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              padding: "3px 10px",
              borderRadius: "4px",
              border: "1px solid var(--s-border)",
              background: "transparent",
              color: "var(--s-text-muted)",
              fontSize: "11px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Copy
          </button>
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              style={{
                padding: "3px 10px",
                borderRadius: "4px",
                border: "1px solid var(--s-border)",
                background: "transparent",
                color: "var(--s-text-muted)",
                fontSize: "11px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Export
            </button>
          )}
        </div>
      </div>

      {/* Code editor area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <textarea
          ref={textareaRef}
          value={localText}
          onChange={handleChange}
          spellCheck={false}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            border: "none",
            outline: "none",
            padding: "16px",
            fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "var(--s-text)",
            background: "var(--s-background)",
            tabSize: 2,
            whiteSpace: "pre",
            overflowWrap: "normal",
            overflowX: "auto",
          }}
        />
      </div>
    </div>
  );
}
