"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SigilPreset, SigilTokens } from "@sigil-ui/tokens";
import { presets, defaultPreset, type PresetName } from "@sigil-ui/presets";

type SigilTokensContextValue = {
  tokens: SigilTokens;
  activePreset: string;
  setPreset: (name: string) => Promise<void>;
  patchTokens: (
    category: keyof SigilTokens,
    key: string,
    value: unknown,
  ) => void;
};

const SigilTokensContext = createContext<SigilTokensContextValue | null>(null);

export function SigilTokensProvider({
  children,
  initialPreset,
  initialTokens,
}: {
  children: ReactNode;
  initialPreset?: string | SigilPreset;
  initialTokens?: SigilTokens;
}) {
  const resolvedName =
    typeof initialPreset === "string"
      ? initialPreset
      : initialPreset?.name ?? "default";

  const resolvedTokens =
    initialTokens ??
    (typeof initialPreset === "object" ? initialPreset?.tokens : undefined) ??
    defaultPreset.tokens;

  const [tokens, setTokens] = useState<SigilTokens>(resolvedTokens);
  const [activePreset, setActivePreset] = useState(resolvedName);

  const setPreset = useCallback(async (name: string) => {
    const loader = presets[name as PresetName];
    if (!loader) return;
    const preset = await loader();
    setTokens(preset.tokens);
    setActivePreset(name);
  }, []);

  const patchTokens = useCallback(
    (category: keyof SigilTokens, key: string, value: unknown) => {
      setTokens((prev) => {
        const cat = { ...(prev[category] as Record<string, unknown>) };
        if (key.includes(".")) {
          const [parent, ...rest] = key.split(".");
          const child = rest.join(".");
          cat[parent!] = {
            ...((cat[parent!] as Record<string, unknown>) ?? {}),
            [child]: value,
          };
        } else {
          cat[key] = value;
        }
        return { ...prev, [category]: cat };
      });
      setActivePreset((prev) => (prev.endsWith("*") ? prev : `${prev}*`));
    },
    [],
  );

  const ctx = useMemo<SigilTokensContextValue>(
    () => ({ tokens, activePreset, setPreset, patchTokens }),
    [tokens, activePreset, setPreset, patchTokens],
  );

  return (
    <SigilTokensContext.Provider value={ctx}>
      {children}
    </SigilTokensContext.Provider>
  );
}

export function useSigilTokens() {
  const ctx = useContext(SigilTokensContext);
  if (!ctx)
    throw new Error("useSigilTokens must be used within SigilTokensProvider");
  return ctx;
}

export const SigilTokenProvider = SigilTokensProvider;

// ---------------------------------------------------------------------------
// SandboxTokenInjector — writes sandbox token state to CSS custom properties
// so agent patches and preset switches are reflected visually.
// Appends AFTER the root TokenStyleInjector, winning via source order.
// ---------------------------------------------------------------------------

import { useEffect, useRef } from "react";

function addVar(arr: string[], name: string, value: string) {
  arr.push(`${name}: ${value} !important;`);
}

function addPrimitive(arr: string[], name: string, value: unknown) {
  if (typeof value === "string") addVar(arr, name, value);
  else if (typeof value === "boolean") addVar(arr, name, value ? "1" : "0");
  else if (typeof value === "number") addVar(arr, name, String(value));
}

export function SandboxTokenInjector() {
  const { tokens } = useSigilTokens();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.setAttribute("data-sigil-sandbox", "true");
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      el.remove();
    };
  }, []);

  useEffect(() => {
    const el = styleRef.current;
    if (!el) return;

    const vars: string[] = [];
    const dark: string[] = [];

    if (tokens.colors) {
      for (const [key, value] of Object.entries(tokens.colors)) {
        if (
          value &&
          typeof value === "object" &&
          "light" in (value as Record<string, unknown>) &&
          "dark" in (value as Record<string, unknown>)
        ) {
          const t = value as { light: string; dark: string };
          vars.push(`--s-${key}: ${t.light} !important;`);
          dark.push(`--s-${key}: ${t.dark} !important;`);
        } else if (typeof value === "string") {
          addVar(vars, `--s-${key}`, value);
        }
      }
    }

    if (tokens.typography) {
      for (const [key, value] of Object.entries(tokens.typography)) {
        if (typeof value === "string") addVar(vars, `--s-${key}`, value);
      }
    }

    if (tokens.radius) {
      for (const [key, value] of Object.entries(tokens.radius)) {
        if (typeof value === "string") {
          addVar(vars, `--s-radius-${key}`, value);
          if (key === "card") addVar(vars, "--s-card-radius", value);
        }
      }
    }

    if (tokens.shadows) {
      for (const [key, value] of Object.entries(tokens.shadows)) {
        if (typeof value === "string") addVar(vars, `--s-shadow-${key}`, value);
      }
    }

    if (tokens.sigil) {
      for (const [key, value] of Object.entries(tokens.sigil)) {
        addPrimitive(vars, `--s-${key}`, value);
      }
    }

    if (tokens.motion) {
      const motion = tokens.motion as Record<string, unknown>;
      for (const [key, value] of Object.entries(motion)) {
        if (key === "duration" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(vars, `--s-duration-${k}`, v);
          }
        } else if (key === "easing" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(vars, `--s-ease-${k}`, v);
          }
        } else {
          addPrimitive(vars, `--s-motion-${key}`, value);
        }
      }
    }

    if (tokens.borders) {
      const borders = tokens.borders as Record<string, unknown>;
      for (const [key, value] of Object.entries(borders)) {
        if (key === "width" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(vars, `--s-border-width-${k}`, v);
          }
        } else if (typeof value === "string") {
          addVar(vars, `--s-border-${key}`, value);
        }
      }
    }

    const flat: { key: string; prefix: string }[] = [
      { key: "layout", prefix: "" },
      { key: "spacing", prefix: "" },
      { key: "buttons", prefix: "btn-" },
      { key: "cards", prefix: "card-" },
      { key: "navigation", prefix: "nav-" },
      { key: "headings", prefix: "heading-" },
      { key: "backgrounds", prefix: "bg-" },
      { key: "alignment", prefix: "align-" },
      { key: "sections", prefix: "section-" },
      { key: "dividers", prefix: "divider-" },
      { key: "gridVisuals", prefix: "grid-" },
      { key: "code", prefix: "code-" },
      { key: "inputs", prefix: "input-" },
    ];

    for (const { key, prefix } of flat) {
      const obj = tokens[key as keyof typeof tokens];
      if (obj && typeof obj === "object") {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          addPrimitive(vars, `--s-${prefix}${k}`, v);
        }
      }
    }

    const blocks = [`:root {\n${vars.join("\n")}\n}`];
    if (dark.length > 0) {
      blocks.push(`.dark, [data-theme="dark"] {\n${dark.join("\n")}\n}`);
    }
    el.textContent = blocks.join("\n");
  }, [tokens]);

  return null;
}
