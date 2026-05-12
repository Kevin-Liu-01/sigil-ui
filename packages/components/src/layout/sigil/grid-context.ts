"use client";

import { createContext, useContext } from "react";
import type { GutterPattern } from "@sigil-ui/tokens";

export type SigilRhythmMode = "locked" | "hairline";
export type SigilBandStroke = "visual" | "border" | "none";

/**
 * Structural configuration shared by every component inside a
 * `SigilFrame` / `SigilPageGrid` boundary. These values change only
 * when the active preset's structural tokens change (rail-gap,
 * grid-cell, content-max, etc.) — once per preset switch, never per
 * render.
 */
export interface PageGridConfig {
  railGap: number;
  contentMax: number;
  gridCell: number;
  crossStroke: number;
  gutterPattern: GutterPattern;
  marginPattern: GutterPattern;
  edgeless: boolean;
  rhythm: SigilRhythmMode;
  snap: boolean;
  bandStroke: SigilBandStroke;
}

export const DEFAULTS: PageGridConfig = {
  railGap: 50,
  contentMax: 1200,
  gridCell: 16,
  crossStroke: 1.5,
  gutterPattern: "grid",
  marginPattern: "horizontal",
  edgeless: false,
  rhythm: "locked",
  snap: true,
  bandStroke: "visual",
};

export const PageGridContext = createContext<PageGridConfig | null>(null);

/**
 * Lightweight boolean context for the "am I inside a SigilPageGrid?"
 * question. Its value is set once at provider mount and never changes,
 * so subscribers never re-render after the initial paint. Components
 * that only need to pick `Inner` vs `Standalone` variants subscribe
 * here instead of `PageGridContext` — that keeps preset switching
 * out of their render path entirely.
 */
export const IsInsidePageGridContext = createContext(false);

export function usePageGridConfig() {
  return useContext(PageGridContext);
}

export function useIsInsidePageGrid() {
  return useContext(IsInsidePageGridContext);
}
