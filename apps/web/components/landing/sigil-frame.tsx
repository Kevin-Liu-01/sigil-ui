"use client";

import { type ReactNode } from "react";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { SigilFrame as SigilFrameBase } from "@sigil-ui/components";
import type { GutterPattern } from "@sigil-ui/tokens";

export function SigilFrame({ children }: { children: ReactNode }) {
  let gutterPattern: GutterPattern = "grid";
  let marginPattern: GutterPattern = "horizontal";
  let contentMax = 1200;
  let railGap = 24;
  let gridCell = 48;
  let crossStroke = 1.5;

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
  } catch { /* no provider */ }

  return (
    <SigilFrameBase
      showGutterGrid
      showMarginLines
      gutterPattern={gutterPattern}
      marginPattern={marginPattern}
      contentMax={contentMax}
      railGap={railGap}
      gridCell={gridCell}
      crossStroke={crossStroke}
    >
      {children}
    </SigilFrameBase>
  );
}
