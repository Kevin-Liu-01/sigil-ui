"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

/**
 * Density DNA — the text-size vocabulary that creates the
 * "dense technical document" feel.
 *
 * The chrome runs at 10-13px. Body at 14px. Only headlines go large.
 * Most of the type is small, monospaced, and uppercase, with just
 * enough large font-display headlines to create hierarchy.
 */

export type DensityRole =
  | "chrome"     // 10px — labels, badges, muted chrome
  | "counter"    // 11px — quantity counters, small mono
  | "detail"     // 12px — cart items, button text, options
  | "nav"        // 13px — nav links, CTA text, accordion titles
  | "body"       // 14px — descriptions, secondary copy
  | "base"       // 16px — store name, body content
  | "headline";  // 2xl+ — only headlines (font-display)

export interface DensityTextProps extends HTMLAttributes<HTMLElement> {
  /** The density role determines the font size and family. */
  role: DensityRole;
  /** Render as a different element. @default "span" */
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "label" | "dt" | "dd";
  /** Mono font (for chrome/counter/detail roles). Auto-applied for chrome/counter. */
  mono?: boolean;
  /** Uppercase (for chrome/counter roles). Auto-applied for chrome. */
  uppercase?: boolean;
  /** Muted color. @default false for body/base/headline, true for chrome */
  muted?: boolean;
  children: ReactNode;
}

const roleConfig: Record<DensityRole, { size: string; mono: boolean; upper: boolean; muted: boolean; display: boolean }> = {
  chrome:   { size: "text-[10px]",  mono: true,  upper: true,  muted: true,  display: false },
  counter:  { size: "text-[11px]",  mono: true,  upper: false, muted: true,  display: false },
  detail:   { size: "text-[12px]",  mono: false, upper: false, muted: false, display: false },
  nav:      { size: "text-[13px]",  mono: false, upper: false, muted: false, display: false },
  body:     { size: "text-sm",      mono: false, upper: false, muted: false, display: false },
  base:     { size: "text-base",    mono: false, upper: false, muted: false, display: false },
  headline: { size: "text-2xl",     mono: false, upper: false, muted: false, display: true  },
};

/**
 * Density-aware text component that enforces the Sigil type scale.
 *
 * ```tsx
 * <DensityText role="chrome">Infrastructure</DensityText>
 * <DensityText role="nav">Documentation</DensityText>
 * <DensityText role="headline" as="h2">Build faster</DensityText>
 * ```
 */
export const DensityText = forwardRef<HTMLElement, DensityTextProps>(
  function DensityText(
    { role, as: Tag = "span", mono, uppercase, muted, className, ...rest },
    ref,
  ) {
    const config = roleConfig[role];
    const isMono = mono ?? config.mono;
    const isUpper = uppercase ?? config.upper;
    const isMuted = muted ?? config.muted;

    return (
      <Tag
        ref={ref as any}
        data-slot="density-text"
        data-role={role}
        className={cn(
          config.size,
          isMono && "font-[family-name:var(--s-font-mono)]",
          config.display && "font-[family-name:var(--s-font-display)]",
          isUpper && "uppercase tracking-[0.2em]",
          isMuted ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]",
          config.display && "font-[var(--s-heading-weight,700)] leading-[1.1] tracking-[var(--s-heading-tracking,-0.025em)]",
          className,
        )}
        {...rest}
      />
    );
  },
);
