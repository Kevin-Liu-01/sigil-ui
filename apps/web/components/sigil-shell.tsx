"use client";

import { useEffect, type ReactNode } from "react";
import { SigilTokensProvider, useSigilTokens } from "./sandbox/token-provider";
import { SigilDevBar } from "./devbar";
import { SigilSoundProvider } from "./sound-provider";
import type { SigilTokens } from "@sigil-ui/tokens";

function TokenStyleInjector() {
  const { tokens } = useSigilTokens();

  useEffect(() => {
    const root = document.documentElement;

    function applyThemed(key: string, value: unknown) {
      if (value && typeof value === "object" && "light" in (value as Record<string, unknown>) && "dark" in (value as Record<string, unknown>)) {
        const themed = value as { light: string; dark: string };
        root.style.setProperty(`--s-${key}`, themed.dark);
      } else if (typeof value === "string") {
        root.style.setProperty(`--s-${key}`, value);
      }
    }

    if (tokens.colors) {
      for (const [key, value] of Object.entries(tokens.colors)) {
        applyThemed(key, value);
      }
    }

    if (tokens.typography) {
      for (const [key, value] of Object.entries(tokens.typography)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-${key}`, value);
        }
      }

      if (tokens.typography["font-display"]) {
        root.style.setProperty("--s-font-display", tokens.typography["font-display"] as string);
      }
      if (tokens.typography["font-body"]) {
        root.style.setProperty("--s-font-body", tokens.typography["font-body"] as string);
        document.body.style.fontFamily = tokens.typography["font-body"] as string;
      }
      if (tokens.typography["font-mono"]) {
        root.style.setProperty("--s-font-mono", tokens.typography["font-mono"] as string);
      }
    }

    if (tokens.radius) {
      for (const [key, value] of Object.entries(tokens.radius)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-radius-${key}`, value);
          if (key === "lg") root.style.setProperty("--s-card-radius", value);
        }
      }
    }

    if (tokens.sigil) {
      for (const [key, value] of Object.entries(tokens.sigil)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-${key}`, value);
        }
      }
    }

    if (tokens.shadows) {
      for (const [key, value] of Object.entries(tokens.shadows)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-shadow-${key}`, value);
        }
      }
    }

    if (tokens.layout) {
      for (const [key, value] of Object.entries(tokens.layout)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-${key}`, value);
        }
      }
    }

    if (tokens.spacing) {
      for (const [key, value] of Object.entries(tokens.spacing)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-${key}`, value);
        }
      }
    }

    if (tokens.buttons) {
      for (const [key, value] of Object.entries(tokens.buttons)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-btn-${key}`, value);
        }
      }
    }

    if (tokens.cards) {
      for (const [key, value] of Object.entries(tokens.cards)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-card-${key}`, value);
        }
      }
    }

    if (tokens.navigation) {
      for (const [key, value] of Object.entries(tokens.navigation)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-nav-${key}`, value);
        }
      }
    }

    if (tokens.headings) {
      for (const [key, value] of Object.entries(tokens.headings)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-heading-${key}`, value);
        }
      }
    }

    if (tokens.backgrounds) {
      for (const [key, value] of Object.entries(tokens.backgrounds)) {
        if (typeof value === "string" || typeof value === "boolean") {
          root.style.setProperty(`--s-bg-${key}`, String(value));
        }
      }
    }

    if (tokens.alignment) {
      for (const [key, value] of Object.entries(tokens.alignment)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-align-${key}`, value);
        } else if (typeof value === "boolean") {
          root.style.setProperty(`--s-align-${key}`, value ? "1" : "0");
        }
      }
    }

    if (tokens.sections) {
      for (const [key, value] of Object.entries(tokens.sections)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-section-${key}`, value);
        } else if (typeof value === "boolean") {
          root.style.setProperty(`--s-section-${key}`, value ? "1" : "0");
        }
      }
    }

    if (tokens.dividers) {
      for (const [key, value] of Object.entries(tokens.dividers)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-divider-${key}`, value);
        } else if (typeof value === "boolean") {
          root.style.setProperty(`--s-divider-${key}`, value ? "1" : "0");
        }
      }
    }

    if (tokens.gridVisuals) {
      for (const [key, value] of Object.entries(tokens.gridVisuals)) {
        if (typeof value === "string") {
          root.style.setProperty(`--s-grid-${key}`, value);
        } else if (typeof value === "boolean") {
          root.style.setProperty(`--s-grid-${key}`, value ? "1" : "0");
        }
      }
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
