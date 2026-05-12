"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useOptionalSigilTokenValues } from "@/components/sandbox/token-provider";
import { SigilFrame as SigilFrameBase } from "@sigil-ui/components";
import type {
  GutterPattern,
  SigilTokens,
} from "@sigil-ui/tokens";
import type { SigilBandStroke, SigilRhythmMode } from "@sigil-ui/components";

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
  rhythm: SigilRhythmMode;
  snap: boolean;
  bandStroke: SigilBandStroke;
};

function deriveStructuralConfig(tokens: SigilTokens | null): StructuralConfig {
  let gutterPattern: GutterPattern = "none";
  let marginPattern: GutterPattern = "none";
  let contentMax = 1200;
  let railGap = 50;
  let gridCell = 16;
  let crossStroke = 1.5;
  let marginBorder: string | undefined;
  let rhythm: SigilRhythmMode = "locked";
  let snap = true;
  let bandStroke: SigilBandStroke = "visual";

  if (tokens) {
    const sigil = tokens.sigil as Record<string, unknown>;
    const layout = tokens.layout as Record<string, unknown> | undefined;
    const pageRhythm = tokens.pageRhythm as Record<string, unknown> | undefined;

    if (sigil?.["gutter-pattern"]) gutterPattern = sigil["gutter-pattern"] as GutterPattern;
    if (sigil?.["margin-pattern"]) marginPattern = sigil["margin-pattern"] as GutterPattern;
    if (sigil?.["grid-cell"]) gridCell = parseInt(sigil["grid-cell"] as string) || gridCell;
    if (sigil?.["cross-stroke"]) crossStroke = parseFloat(sigil["cross-stroke"] as string) || crossStroke;
    if (sigil?.["rail-gap"]) railGap = parseInt(sigil["rail-gap"] as string) || railGap;
    if (layout?.["content-max"]) contentMax = parseInt(layout["content-max"] as string) || contentMax;
    const mb = sigil?.["margin-border"] as string | undefined;
    if (mb && mb !== "none") marginBorder = mb;
    if (pageRhythm?.mode === "hairline" || pageRhythm?.mode === "locked") {
      rhythm = pageRhythm.mode;
    }
    if (typeof pageRhythm?.snap === "boolean") snap = pageRhythm.snap;
    if (
      pageRhythm?.["band-stroke"] === "visual" ||
      pageRhythm?.["band-stroke"] === "border" ||
      pageRhythm?.["band-stroke"] === "none"
    ) {
      bandStroke = pageRhythm["band-stroke"];
    }
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
    rhythm,
    snap,
    bandStroke,
  };
}

export function SigilFrame({ children }: { children: ReactNode }) {
  const tokens: SigilTokens | null = useOptionalSigilTokenValues();

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
      (tokens?.pageRhythm as Record<string, unknown> | undefined)?.mode,
      (tokens?.pageRhythm as Record<string, unknown> | undefined)?.snap,
      (tokens?.pageRhythm as Record<string, unknown> | undefined)?.["band-stroke"],
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
      rhythm={config.rhythm}
      snap={config.snap}
      bandStroke={config.bandStroke}
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
