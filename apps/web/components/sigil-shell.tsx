"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SigilTokensProvider, useSigilTokens } from "./sandbox/token-provider";
import { SigilDevBar } from "./devbar";
import { SigilSoundProvider } from "./sound-provider";

function TokenStyleInjector() {
  const { tokens } = useSigilTokens();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current =
        (document.querySelector("style[data-sigil-tokens]") as HTMLStyleElement) ?? null;
      if (!styleRef.current) {
        styleRef.current = document.createElement("style");
        styleRef.current.setAttribute("data-sigil-tokens", "true");
        document.head.appendChild(styleRef.current);
      }
    }

    const lightVars: string[] = [];
    const darkVars: string[] = [];

    function addVar(name: string, value: string) {
      lightVars.push(`${name}: ${value} !important;`);
    }

    function addThemed(key: string, value: unknown) {
      if (
        value &&
        typeof value === "object" &&
        "light" in (value as Record<string, unknown>) &&
        "dark" in (value as Record<string, unknown>)
      ) {
        const themed = value as { light: string; dark: string };
        lightVars.push(`--s-${key}: ${themed.light} !important;`);
        darkVars.push(`--s-${key}: ${themed.dark} !important;`);
      } else if (typeof value === "string") {
        addVar(`--s-${key}`, value);
      }
    }

    function addPrimitive(name: string, value: unknown) {
      if (typeof value === "string") addVar(name, value);
      else if (typeof value === "boolean") addVar(name, value ? "1" : "0");
      else if (typeof value === "number") addVar(name, String(value));
    }

    // Colors (ThemedColor-aware)
    if (tokens.colors) {
      for (const [key, value] of Object.entries(tokens.colors)) {
        addThemed(key, value);
      }
    }

    // Typography
    if (tokens.typography) {
      for (const [key, value] of Object.entries(tokens.typography)) {
        if (typeof value === "string") addVar(`--s-${key}`, value);
      }
    }

    // Radius — set both --s-radius-{key} and --s-card-radius for compat
    if (tokens.radius) {
      for (const [key, value] of Object.entries(tokens.radius)) {
        if (typeof value === "string") {
          addVar(`--s-radius-${key}`, value);
          if (key === "card") addVar("--s-card-radius", value);
        }
      }
    }

    // Shadows
    if (tokens.shadows) {
      for (const [key, value] of Object.entries(tokens.shadows)) {
        if (typeof value === "string") addVar(`--s-shadow-${key}`, value);
      }
    }

    // Sigil grid
    if (tokens.sigil) {
      for (const [key, value] of Object.entries(tokens.sigil)) {
        addPrimitive(`--s-${key}`, value);
      }
    }

    // Motion — nested duration/easing objects + flat top-level keys
    if (tokens.motion) {
      const motion = tokens.motion as Record<string, unknown>;
      for (const [key, value] of Object.entries(motion)) {
        if (key === "duration" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(`--s-duration-${k}`, v);
          }
        } else if (key === "easing" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(`--s-ease-${k}`, v);
          }
        } else {
          addPrimitive(`--s-motion-${key}`, value);
        }
      }
    }

    // Borders — nested width object + flat keys
    if (tokens.borders) {
      const borders = tokens.borders as Record<string, unknown>;
      for (const [key, value] of Object.entries(borders)) {
        if (key === "width" && value && typeof value === "object") {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (typeof v === "string") addVar(`--s-border-width-${k}`, v);
          }
        } else if (typeof value === "string") {
          addVar(`--s-border-${key}`, value);
        }
      }
    }

    // Prefixed flat categories
    const prefixedCategories: { key: string; prefix: string }[] = [
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

    for (const { key, prefix } of prefixedCategories) {
      const obj = tokens[key as keyof typeof tokens];
      if (obj && typeof obj === "object") {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          addPrimitive(`--s-${prefix}${k}`, v);
        }
      }
    }

    const blocks = [`:root {\n${lightVars.join("\n")}\n}`];
    if (darkVars.length > 0) {
      blocks.push(`.dark, [data-theme="dark"] {\n${darkVars.join("\n")}\n}`);
    }
    styleRef.current.textContent = blocks.join("\n");

    if (tokens.typography?.["font-body"]) {
      document.body.style.fontFamily = tokens.typography["font-body"] as string;
    }
  }, [tokens]);

  return null;
}

export function SigilShell({ children }: { children: ReactNode }) {
  return (
    <SigilTokensProvider>
      <SigilSoundProvider>
        <TokenStyleInjector />
        {children}
        <SigilDevBar />
      </SigilSoundProvider>
    </SigilTokensProvider>
  );
}
