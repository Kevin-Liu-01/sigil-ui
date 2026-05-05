"use client";

import type { ReactNode } from "react";
import { cn } from "../../utils";

export interface SigilFullBleedProps {
  children: ReactNode;
  className?: string;
  /** Background applied to the full-width outer wrapper. */
  background?: string;
  /** Override the inner content max-width. Uses --s-content-max by default. */
  contentMax?: string;
  /** Horizontal padding inside the max-width container. */
  padding?: string;
}

/**
 * Full-viewport-width wrapper that constrains inner content to
 * `--s-content-max`. Use for navbars and footers that need a
 * full-bleed background but centered content.
 *
 * Works both inside and outside `SigilPageGrid`. Inside the grid it
 * breaks out via `100vw` + negative margin; outside the grid it fills
 * its parent width.
 */
export function SigilFullBleed({
  children,
  className,
  background,
  contentMax,
  padding = "0 var(--s-page-margin, 25px)",
}: SigilFullBleedProps) {
  return (
    <div
      data-slot="sigil-fullbleed"
      className={cn("w-screen relative left-1/2 -translate-x-1/2", className)}
      style={{ background }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: contentMax ?? "var(--s-content-max, 1200px)",
          padding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
