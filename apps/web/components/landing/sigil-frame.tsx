"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { SigilFrame as SigilFrameBase } from "@sigil-ui/components";
import type { GutterPattern } from "@sigil-ui/tokens";

const EdgelessContext = createContext(false);

export function useIsEdgeless(): boolean {
  return useContext(EdgelessContext);
}

export function SigilFrame({ children }: { children: ReactNode }) {
  let gutterPattern: GutterPattern = "none";
  let marginPattern: GutterPattern = "none";
  let contentMax = 1200;
  let railGap = 50;
  let gridCell = 50;
  let crossStroke = 1.5;
  let marginBorder: string | undefined;
  let isEdgeless = false;

  try {
    const { tokens } = useSigilTokens();
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

    isEdgeless = sigil?.["gutter-visible"] === false
      || (gutterPattern === "none" && marginPattern === "none" && railGap === 0);
  } catch { /* no provider */ }

  const effectiveContentMax = isEdgeless ? Math.max(contentMax, 1400) : contentMax;

  const frame = (
    <SigilFrameBase
      showGutterGrid={!isEdgeless}
      showMarginLines={!isEdgeless}
      gutterPattern={gutterPattern}
      marginPattern={marginPattern}
      marginBorder={marginBorder}
      contentMax={effectiveContentMax}
      railGap={railGap}
      gridCell={gridCell}
      crossStroke={crossStroke}
    >
      {children}
    </SigilFrameBase>
  );

  return (
    <EdgelessContext.Provider value={isEdgeless}>
      {isEdgeless ? (
        <div style={{ "--s-content-max": `${effectiveContentMax}px` } as React.CSSProperties}>
          {frame}
        </div>
      ) : frame}
    </EdgelessContext.Provider>
  );
}
