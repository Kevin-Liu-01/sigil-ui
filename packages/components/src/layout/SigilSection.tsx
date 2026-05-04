"use client";

import { type ReactNode, type CSSProperties, type ElementType } from "react";
import { cn } from "../utils";
import {
  usePageGridConfig,
  SigilGutter,
  type PageGridConfig,
} from "./SigilPageGrid";
import type { GutterPattern } from "@sigil-ui/tokens";

const SECTION_BORDER =
  "var(--s-section-border, var(--s-border-width-thin, 1px) var(--s-border-style, solid) var(--s-grid-line-color, var(--s-border-muted)))";

const BORDER_WIDTH = "var(--s-border-width-thin, 1px)";

/**
 * Split a CSS padding shorthand into [top, right, bottom, left],
 * correctly handling `var(...)` references that contain spaces.
 */
function splitCssPadding(padding: string): [string, string, string, string] {
  const values: string[] = [];
  let cur = "";
  let depth = 0;
  for (const ch of padding) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === " " && depth === 0) {
      if (cur) values.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur) values.push(cur);

  const t = values[0] ?? "0";
  const r = values[1] ?? t;
  const b = values[2] ?? t;
  const l = values[3] ?? r;
  return [t, r, b, l];
}

/**
 * When a section has a real CSS border, the border adds to the element's
 * auto-height. To keep total vertical space grid-aligned, we subtract
 * the border width from the corresponding padding axis so
 * (padding + border) = original padding.
 */
function borderCompensatedPadding(
  padding: string,
  borderTop: boolean,
  borderBottom: boolean,
): CSSProperties {
  const [t, r, b, l] = splitCssPadding(padding);
  return {
    paddingTop: borderTop ? `calc(${t} - ${BORDER_WIDTH})` : t,
    paddingRight: r,
    paddingBottom: borderBottom ? `calc(${b} - ${BORDER_WIDTH})` : b,
    paddingLeft: l,
  };
}

/* ------------------------------------------------------------------ */
/* Cross mark SVG                                                       */
/* ------------------------------------------------------------------ */

function CrossMark({
  size = 12,
  stroke = 1.5,
}: {
  size?: number;
  stroke?: number;
}) {
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={size}
        stroke="var(--s-border)"
        strokeWidth={stroke}
      />
      <line
        x1={0}
        y1={half}
        x2={size}
        y2={half}
        stroke="var(--s-border)"
        strokeWidth={stroke}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* CrossRow — 4 crosses at gutter/border intersections                  */
/* ------------------------------------------------------------------ */

function CrossRow({
  position,
  railGap,
  crossStroke,
}: {
  position: "top" | "bottom";
  railGap: number;
  crossStroke: number;
}) {
  const size = 12;
  const half = size / 2;
  const verticalStyle =
    position === "top" ? { top: -half } : { bottom: -half };

  const horizontals: CSSProperties[] = [
    { left: -(railGap + half) },
    { left: -half },
    { right: -half },
    { right: -(railGap + half) },
  ];

  return (
    <>
      {horizontals.map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...h,
            ...verticalStyle,
            width: size,
            height: size,
            zIndex: 10,
          }}
        >
          <CrossMark size={size} stroke={crossStroke} />
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* SigilSection                                                         */
/* ------------------------------------------------------------------ */

export interface SigilSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** Semantic element type. @default "section" */
  as?: ElementType;
  /** Show a 1px top border along the section boundary. */
  borderTop?: boolean;
  /** Show a 1px bottom border along the section boundary. */
  borderBottom?: boolean;
  /** Render cross marks at the 4 gutter intersections of each visible border. */
  showCrosses?: boolean;
  /** CSS padding string. Uses `var(--s-section-py)` and `var(--s-page-margin)` by default. */
  padding?: string;
  /** Content max width for standalone mode (outside SigilPageGrid). */
  contentMax?: number;
  /** Rail gap for standalone mode (outside SigilPageGrid). */
  railGap?: number;
  /** Gutter pattern for standalone mode. */
  gutterPattern?: GutterPattern;
  /** Margin pattern for standalone mode. */
  marginPattern?: GutterPattern;
  /** Show gutter grid in standalone mode. @default true */
  showGutterGrid?: boolean;
  /** Show margin lines in standalone mode. @default true */
  showMarginLines?: boolean;
}

/**
 * Section that auto-detects its layout context.
 *
 * **Inside SigilPageGrid** — renders content directly in the content
 * column with optional border-top/bottom and cross marks that extend
 * into the gutter columns via absolute positioning.
 *
 * **Outside SigilPageGrid** — renders its own 5-column grid wrapper
 * (margin | gutter | content | gutter | margin) so sections can be
 * used independently.
 */
export function SigilSection({
  children,
  className,
  id,
  style,
  as,
  borderTop = false,
  borderBottom = false,
  showCrosses = false,
  padding = "var(--s-section-padding-y, 6rem) var(--s-section-padding-x, var(--s-page-margin, 25px))",
  contentMax = 1200,
  railGap = 50,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  showGutterGrid = true,
  showMarginLines = true,
}: SigilSectionProps) {
  const gridConfig = usePageGridConfig();

  if (gridConfig) {
    return (
      <InnerSection
        id={id}
        className={className}
        style={style}
        as={as}
        borderTop={borderTop}
        borderBottom={borderBottom}
        showCrosses={showCrosses}
        padding={padding}
        config={gridConfig}
      >
        {children}
      </InnerSection>
    );
  }

  return (
    <StandaloneSection
      id={id}
      className={className}
      style={style}
      as={as}
      borderTop={borderTop}
      borderBottom={borderBottom}
      showCrosses={showCrosses}
      padding={padding}
      contentMax={contentMax}
      railGap={railGap}
      gutterPattern={gutterPattern}
      marginPattern={marginPattern}
      showGutterGrid={showGutterGrid}
      showMarginLines={showMarginLines}
    >
      {children}
    </StandaloneSection>
  );
}

/* ------------------------------------------------------------------ */
/* InnerSection — used when inside SigilPageGrid                        */
/* ------------------------------------------------------------------ */

function InnerSection({
  children,
  className,
  id,
  style,
  as: Tag = "section",
  borderTop,
  borderBottom,
  showCrosses,
  padding,
  config,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  as?: ElementType;
  borderTop: boolean;
  borderBottom: boolean;
  showCrosses: boolean;
  padding: string;
  config: PageGridConfig;
}) {
  const hasBorder = borderTop || borderBottom;
  const paddingStyle = hasBorder
    ? borderCompensatedPadding(padding, borderTop, borderBottom)
    : { padding };

  return (
    <Tag
      id={id}
      data-slot="sigilsection" className={cn("relative", className)}
      style={{
        ...paddingStyle,
        borderTop: borderTop ? SECTION_BORDER : undefined,
        borderBottom: borderBottom ? SECTION_BORDER : undefined,
        ...style,
      }}
    >
      {showCrosses && borderTop && (
        <CrossRow
          position="top"
          railGap={config.railGap}
          crossStroke={config.crossStroke}
        />
      )}
      {children}
      {showCrosses && borderBottom && (
        <CrossRow
          position="bottom"
          railGap={config.railGap}
          crossStroke={config.crossStroke}
        />
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* StandaloneSection — used outside SigilPageGrid                       */
/* ------------------------------------------------------------------ */

function StandaloneSection({
  children,
  className,
  id,
  style,
  as: Tag = "section",
  borderTop,
  borderBottom,
  showCrosses,
  padding,
  contentMax,
  railGap,
  gutterPattern = "grid",
  marginPattern = "horizontal",
  showGutterGrid = true,
  showMarginLines = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  as?: ElementType;
  borderTop: boolean;
  borderBottom: boolean;
  showCrosses: boolean;
  padding: string;
  contentMax: number;
  railGap: number;
  gutterPattern?: GutterPattern;
  marginPattern?: GutterPattern;
  showGutterGrid?: boolean;
  showMarginLines?: boolean;
}) {
  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };

  const standaloneHasBorder = borderTop || borderBottom;
  const standalonePaddingStyle = standaloneHasBorder
    ? borderCompensatedPadding(padding, borderTop, borderBottom)
    : { padding };

  return (
    <Tag id={id} data-slot="sigilsection" className={cn("grid", className)} style={{ ...gridCols, ...style }}>
      <div aria-hidden="true" />
      <SigilGutter showGrid={showGutterGrid} pattern={gutterPattern} side="left" />
      <div
        className="relative"
        style={{
          ...standalonePaddingStyle,
          borderTop: borderTop ? SECTION_BORDER : undefined,
          borderBottom: borderBottom ? SECTION_BORDER : undefined,
          background: "var(--s-background)",
        }}
      >
        {showCrosses && borderTop && (
          <CrossRow position="top" railGap={railGap} crossStroke={1.5} />
        )}
        {children}
        {showCrosses && borderBottom && (
          <CrossRow position="bottom" railGap={railGap} crossStroke={1.5} />
        )}
      </div>
      <SigilGutter showGrid={showGutterGrid} pattern={gutterPattern} side="right" />
      <div aria-hidden="true" />
    </Tag>
  );
}
