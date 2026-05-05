"use client";

import type { ReactNode } from "react";
import { SigilPageGrid, type SigilPageGridProps } from "./SigilPageGrid";

export interface SigilFrameProps extends SigilPageGridProps {
  /** HTML element for the outer wrapper. @default "div" */
  as?: "div" | "main" | "article";
}

/**
 * Top-level page frame that wraps all content in the 5-column
 * structural grid: margin | gutter | content | gutter | margin.
 *
 * This is the recommended entry point for any Sigil page layout.
 * Place your navbar, sections, and footer as direct children —
 * they all render inside the content column between the gutters.
 *
 * Pass `edgeless` to strip all gutter/margin decoration so
 * gutters collapse to 0px and margins become empty space.
 *
 * ```tsx
 * <SigilFrame>
 *   <MyNavbar />
 *   <SigilSection borderTop>...</SigilSection>
 *   <MyFooter />
 * </SigilFrame>
 *
 * <SigilFrame edgeless>
 *   <SigilSection>...</SigilSection>
 * </SigilFrame>
 * ```
 */
export function SigilFrame({
  as: _Tag = "div",
  children,
  ...props
}: SigilFrameProps & { children: ReactNode }) {
  return <SigilPageGrid {...props}>{children}</SigilPageGrid>;
}
