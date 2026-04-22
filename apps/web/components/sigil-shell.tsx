"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SigilTokensProvider, useSigilTokens } from "./sandbox/token-provider";
import { SigilDevBar } from "./devbar";
import { SigilSoundProvider } from "./sound-provider";
import type { SigilTokens } from "@sigil-ui/tokens";

function useIsDark() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    const check = () => {
      setIsDark(
        root.classList.contains("dark") ||
        root.getAttribute("data-theme") === "dark"
      );
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function TokenStyleInjector() {
  const { tokens } = useSigilTokens();
  const isDark = useIsDark();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement("style");
      styleRef.current.setAttribute("data-sigil-tokens", "true");
      document.head.appendChild(styleRef.current);
    }

    const vars: string[] = [];

    function addVar(name: string, value: string) {
      vars.push(`${name}: ${value} !important;`);
    }

    function addThemed(key: string, value: unknown) {
      if (
        value &&
        typeof value === "object" &&
        "light" in (value as Record<string, unknown>) &&
        "dark" in (value as Record<string, unknown>)
      ) {
        const themed = value as { light: string; dark: string };
        addVar(`--s-${key}`, isDark ? themed.dark : themed.light);
      } else if (typeof value === "string") {
        addVar(`--s-${key}`, value);
      }
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
        if (typeof value === "string") {
          addVar(`--s-${key}`, value);
        }
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
        if (typeof value === "string") addVar(`--s-${key}`, value);
      }
    }

    // Motion (nested: duration.*, easing.*)
    if (tokens.motion) {
      if (tokens.motion.duration) {
        for (const [key, value] of Object.entries(tokens.motion.duration)) {
          if (typeof value === "string") addVar(`--s-duration-${key}`, value);
        }
      }
      if (tokens.motion.easing) {
        for (const [key, value] of Object.entries(tokens.motion.easing)) {
          if (typeof value === "string") addVar(`--s-ease-${key}`, value);
        }
      }
    }

    // Borders (nested: width.*)
    if (tokens.borders) {
      if (tokens.borders.width) {
        for (const [key, value] of Object.entries(tokens.borders.width)) {
          if (typeof value === "string") addVar(`--s-border-width-${key}`, value);
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
    ];

    for (const { key, prefix } of prefixedCategories) {
      const obj = tokens[key as keyof typeof tokens];
      if (obj && typeof obj === "object") {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          if (typeof v === "string") addVar(`--s-${prefix}${k}`, v);
          else if (typeof v === "boolean") addVar(`--s-${prefix}${k}`, v ? "1" : "0");
          else if (typeof v === "number") addVar(`--s-${prefix}${k}`, String(v));
        }
      }
    }

    const css = `:root {\n${vars.join("\n")}\n}`;
    styleRef.current.textContent = css;

    // Force body font-family directly for immediate effect
    if (tokens.typography?.["font-body"]) {
      document.body.style.fontFamily = tokens.typography["font-body"] as string;
    }
  }, [tokens, isDark]);

  return null;
}

export function SigilShell({ children }: { children: ReactNode }) {
  return (
    <SigilTokensProvider>
      <SigilSoundProvider>
        <TokenStyleInjector />
        <div className="s-transition-all">
          {children}
        </div>
        <SigilDevBar />
      </SigilSoundProvider>
    </SigilTokensProvider>
  );
}
