"use client";

import type { ReactNode } from "react";
import { SigilFrame, type SigilFrameProps } from "./SigilFrame";

export type SigilPageChrome = "rails" | "minimal" | "none";

export interface SigilPageProps extends SigilFrameProps {
  children: ReactNode;
  chrome?: SigilPageChrome;
}

/**
 * Preferred page-level Sigil entrypoint.
 *
 * `rhythm="locked"` keeps sections and `Divider` bands on the structural grid.
 * `rhythm="hairline"` keeps page chrome available but disables section snap by
 * default so content can flow editorially with `Hairline` rules.
 */
export function SigilPage({
  chrome = "rails",
  rhythm = "locked",
  showGutterGrid,
  showMarginLines,
  edgeless,
  snap,
  children,
  ...props
}: SigilPageProps) {
  const noChrome = chrome === "none";
  const minimal = chrome === "minimal" || noChrome;
  return (
    <SigilFrame
      rhythm={rhythm}
      edgeless={edgeless ?? noChrome}
      snap={snap ?? rhythm === "locked"}
      showGutterGrid={showGutterGrid ?? !minimal}
      showMarginLines={showMarginLines ?? !minimal}
      {...props}
    >
      {children}
    </SigilFrame>
  );
}
