"use client";

import { type ReactNode, type CSSProperties, type ElementType } from "react";
import { cn } from "../utils";
import {
  usePageGridConfig,
  SigilGutter,
  type PageGridConfig,
} from "./SigilPageGrid";

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
  /** CSS padding string. @default "80px 0" */
  padding?: string;
  /** Content max width for standalone mode (outside SigilPageGrid). */
  contentMax?: number;
  /** Rail gap for standalone mode (outside SigilPageGrid). */
  railGap?: number;
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
  padding = "80px 0",
  contentMax = 1200,
  railGap = 24,
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
  return (
    <Tag
      id={id}
      className={cn("relative", className)}
      style={{
        padding,
        borderTop: borderTop
          ? "1px solid var(--s-border-muted)"
          : undefined,
        borderBottom: borderBottom
          ? "1px solid var(--s-border-muted)"
          : undefined,
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
}) {
  const gridCols: CSSProperties = {
    gridTemplateColumns: `1fr ${railGap}px minmax(0, ${contentMax}px) ${railGap}px 1fr`,
  };

  return (
    <Tag id={id} className={cn("grid", className)} style={{ ...gridCols, ...style }}>
      <div aria-hidden="true" />
      <SigilGutter showGrid={false} />
      <div
        className="relative"
        style={{
          padding,
          borderTop: borderTop
            ? "1px solid var(--s-border-muted)"
            : undefined,
          borderBottom: borderBottom
            ? "1px solid var(--s-border-muted)"
            : undefined,
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
      <SigilGutter showGrid={false} />
      <div aria-hidden="true" />
    </Tag>
  );
}
