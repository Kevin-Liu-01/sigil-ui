"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSigilTokenValues } from "@/components/sandbox/token-provider";
import { SigilFrame as SigilFrameBase } from "@sigil-ui/components";
import type { GutterPattern, SigilTokens } from "@sigil-ui/tokens";

const EdgelessContext = createContext(false);

export function useIsEdgeless(): boolean {
  return useContext(EdgelessContext);
}

type StructuralConfig = {
  gutterPattern: GutterPattern;
  marginPattern: GutterPattern;
  contentMax: number;
  railGap: number;
  gridCell: number;
  crossStroke: number;
  marginBorder: string | undefined;
  isEdgeless: boolean;
  effectiveContentMax: number;
};

function deriveStructuralConfig(tokens: SigilTokens | null): StructuralConfig {
  let gutterPattern: GutterPattern = "none";
  let marginPattern: GutterPattern = "none";
  let contentMax = 1200;
  let railGap = 50;
  let gridCell = 16;
  let crossStroke = 1.5;
  let marginBorder: string | undefined;

  if (tokens) {
    const sigil = tokens.sigil as Record<string, unknown>;
    const layout = tokens.layout as Record<string, unknown> | undefined;

    if (sigil?.["gutter-pattern"]) gutterPattern = sigil["gutter-pattern"] as GutterPattern;
    if (sigil?.["margin-pattern"]) marginPattern = sigil["margin-pattern"] as GutterPattern;
    if (sigil?.["grid-cell"]) gridCell = parseInt(sigil["grid-cell"] as string) || gridCell;
    if (sigil?.["cross-stroke"]) crossStroke = parseFloat(sigil["cross-stroke"] as string) || crossStroke;
    if (sigil?.["rail-gap"]) railGap = parseInt(sigil["rail-gap"] as string) || railGap;
    if (layout?.["content-max"]) contentMax = parseInt(layout["content-max"] as string) || contentMax;
    const mb = sigil?.["margin-border"] as string | undefined;
    if (mb && mb !== "none") marginBorder = mb;
  }

  const isEdgeless = tokens
    ? ((tokens.sigil as Record<string, unknown>)?.["gutter-visible"] === false
      || (gutterPattern === "none" && marginPattern === "none" && railGap === 0))
    : false;
  const effectiveContentMax = isEdgeless ? Math.max(contentMax, 1400) : contentMax;

  return {
    gutterPattern,
    marginPattern,
    contentMax,
    railGap,
    gridCell,
    crossStroke,
    marginBorder,
    isEdgeless,
    effectiveContentMax,
  };
}

export function SigilFrame({ children }: { children: ReactNode }) {
  let tokens: SigilTokens | null = null;
  try {
    tokens = useSigilTokenValues();
  } catch { /* no provider */ }

  // Derive only the slice we care about. useMemo keeps the config object
  // identity stable when the input slices haven't changed (e.g. a
  // color-only token change), which lets the memo'd SigilFrameBase below
  // bail and skip the cascading re-render through every SigilSection.
  const config = useMemo(
    () => deriveStructuralConfig(tokens),
    // We intentionally depend on the specific token slices we read instead
    // of the whole `tokens` object — otherwise color-only changes would
    // bust the memo. These primitives compare by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      (tokens?.sigil as Record<string, unknown> | undefined)?.["gutter-pattern"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["margin-pattern"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["grid-cell"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["cross-stroke"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["rail-gap"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["margin-border"],
      (tokens?.sigil as Record<string, unknown> | undefined)?.["gutter-visible"],
      (tokens?.layout as Record<string, unknown> | undefined)?.["content-max"],
    ],
  );

  const frame = (
    <SigilFrameBase
      showGutterGrid={!config.isEdgeless}
      showMarginLines={!config.isEdgeless || config.marginPattern !== "none"}
      gutterPattern={config.gutterPattern}
      marginPattern={config.marginPattern}
      marginBorder={config.marginBorder}
      contentMax={config.effectiveContentMax}
      railGap={config.railGap}
      gridCell={config.gridCell}
      crossStroke={config.crossStroke}
    >
      {children}
    </SigilFrameBase>
  );

  return (
    <EdgelessContext.Provider value={config.isEdgeless}>
      {config.isEdgeless ? (
        <div style={{ "--s-content-max": `${config.effectiveContentMax}px` } as React.CSSProperties}>
          {frame}
        </div>
      ) : frame}
    </EdgelessContext.Provider>
  );
}
