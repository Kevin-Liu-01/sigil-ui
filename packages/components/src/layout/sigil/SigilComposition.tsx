"use client";

import type {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { useState } from "react";
import { cn } from "../../utils";
import { DensityText } from "../../playbook/DensityText";
import { MonoLabel } from "../../playbook/MonoLabel";
import { SigilSection, type SigilSectionProps } from "./SigilSection";

export interface SigilSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  heading: ReactNode;
  description?: ReactNode;
  maxDescriptionWidth?: CSSProperties["maxWidth"];
}

export function SigilSectionHeader({
  label,
  heading,
  description,
  maxDescriptionWidth = 576,
  className,
  style,
  ...props
}: SigilSectionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        marginBottom:
          "var(--s-section-header-block-margin-bottom, var(--s-grid-cell))",
        ...style,
      }}
      {...props}
    >
      <div
        className="flex items-baseline justify-between"
        style={{
          marginBottom:
            "var(--s-section-label-row-margin-bottom, calc(var(--s-grid-cell) / 3))",
        }}
      >
        <MonoLabel variant="accent" size="sm">/ {label}</MonoLabel>
      </div>
      <DensityText
        role="headline"
        as="h2"
        className="font-[family-name:var(--s-font-display)] text-[clamp(24px,3vw,40px)] font-bold tracking-[var(--s-heading-h2-tracking,-0.02em)] leading-[var(--s-heading-h2-leading,1.15)] text-[var(--s-text)]"
        style={{
          marginBottom:
            "var(--s-section-heading-margin-bottom, calc(var(--s-grid-cell) / 4))",
        }}
      >
        {heading}
      </DensityText>
      {description && (
        <DensityText
          role="body"
          as="p"
          muted
          className="leading-relaxed"
          style={{ maxWidth: maxDescriptionWidth }}
        >
          {description}
        </DensityText>
      )}
    </div>
  );
}

export interface SigilStackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | string;
}

const GAP: Record<string, string> = {
  xs: "calc(var(--s-grid-cell) / 6)",
  sm: "calc(var(--s-grid-cell) / 4)",
  md: "calc(var(--s-grid-cell) / 2)",
  lg: "var(--s-grid-cell)",
  xl: "calc(2 * var(--s-grid-cell))",
};

export const SIGIL_RHYTHM_STYLES = {
  gapXs: { gap: "calc(var(--s-grid-cell) / 6)" } as CSSProperties,
  gapSm: { gap: "calc(var(--s-grid-cell) / 5)" } as CSSProperties,
  gapMd: { gap: "calc(var(--s-grid-cell) / 4)" } as CSSProperties,
  gapLg: { gap: "calc(var(--s-grid-cell) / 3)" } as CSSProperties,
  mtMajor: { marginTop: "calc(4 * var(--s-grid-cell) / 3)" } as CSSProperties,
  mtSection: { marginTop: "var(--s-grid-cell)" } as CSSProperties,
  mtBlock: { marginTop: "calc(var(--s-grid-cell) / 2)" } as CSSProperties,
  mbTight: { marginBottom: "calc(var(--s-grid-cell) / 12)" } as CSSProperties,
  mbSm: { marginBottom: "calc(var(--s-grid-cell) / 6)" } as CSSProperties,
  mbMd: { marginBottom: "calc(var(--s-grid-cell) / 4)" } as CSSProperties,
  mbLg: { marginBottom: "calc(var(--s-grid-cell) / 3)" } as CSSProperties,
  mbXl: { marginBottom: "calc(var(--s-grid-cell) / 2)" } as CSSProperties,
  mbHero: { marginBottom: "calc(2 * var(--s-grid-cell) / 3)" } as CSSProperties,
  installInner: {
    gap: "calc(var(--s-grid-cell) / 4)",
    paddingLeft: "calc(var(--s-grid-cell) / 3)",
    paddingRight: "calc(var(--s-grid-cell) / 3)",
    paddingTop: "calc(var(--s-grid-cell) / 5)",
    paddingBottom: "calc(var(--s-grid-cell) / 4)",
  } as CSSProperties,
  btnGhost: {
    paddingLeft: "calc(var(--s-grid-cell) / 3)",
    paddingRight: "calc(var(--s-grid-cell) / 3)",
    paddingTop: "calc(var(--s-grid-cell) / 5)",
    paddingBottom: "calc(var(--s-grid-cell) / 5)",
  } as CSSProperties,
  btnGhostLg: {
    paddingLeft: "calc(var(--s-grid-cell) / 2)",
    paddingRight: "calc(var(--s-grid-cell) / 2)",
    paddingTop: "calc(var(--s-grid-cell) / 4)",
    paddingBottom: "calc(var(--s-grid-cell) / 4)",
  } as CSSProperties,
} as const;

export function SigilStack({
  gap = "md",
  className,
  style,
  ...props
}: SigilStackProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ gap: GAP[gap] ?? gap, ...style }}
      {...props}
    />
  );
}

export interface SigilActionRowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg" | string;
}

export function SigilActionRow({
  gap = "sm",
  className,
  style,
  ...props
}: SigilActionRowProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center", className)}
      style={{ gap: GAP[gap] ?? gap, ...style }}
      {...props}
    />
  );
}

export interface SigilInlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg" | string;
  marginTop?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  marginBottom?: "xs" | "sm" | "md" | "lg" | "xl" | string;
}

const MARGIN: Record<string, string> = {
  xs: "calc(var(--s-grid-cell) / 12)",
  sm: "calc(var(--s-grid-cell) / 6)",
  md: "calc(var(--s-grid-cell) / 4)",
  lg: "calc(var(--s-grid-cell) / 2)",
  xl: "var(--s-grid-cell)",
};

export function SigilInline({
  gap = "sm",
  marginTop,
  marginBottom,
  className,
  style,
  ...props
}: SigilInlineProps) {
  return (
    <div
      className={cn("flex items-center", className)}
      style={{
        gap: GAP[gap] ?? gap,
        marginTop: marginTop ? MARGIN[marginTop] ?? marginTop : undefined,
        marginBottom: marginBottom ? MARGIN[marginBottom] ?? marginBottom : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilRhythmBoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "xs" | "sm" | "md" | "lg" | string;
  marginTop?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  marginBottom?: "xs" | "sm" | "md" | "lg" | "xl" | string;
}

const PADDING: Record<string, string> = {
  xs: "calc(var(--s-grid-cell) / 6)",
  sm: "calc(var(--s-grid-cell) / 4)",
  md: "calc(var(--s-grid-cell) / 2)",
  lg: "var(--s-grid-cell)",
};

export function SigilRhythmBox({
  padding,
  marginTop,
  marginBottom,
  className,
  style,
  ...props
}: SigilRhythmBoxProps) {
  return (
    <div
      className={className}
      style={{
        padding: padding ? PADDING[padding] ?? padding : undefined,
        marginTop: marginTop ? MARGIN[marginTop] ?? marginTop : undefined,
        marginBottom: marginBottom ? MARGIN[marginBottom] ?? marginBottom : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilGhostLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "md" | "lg";
}

export function SigilGhostLink({
  size = "md",
  className,
  style,
  ...props
}: SigilGhostLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center border border-[var(--s-border)] bg-transparent font-[family-name:var(--s-font-mono)] font-medium text-[var(--s-text)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]",
        size === "lg" ? "text-[14px]" : "text-[13px]",
        className,
      )}
      style={{
        ...(size === "lg" ? SIGIL_RHYTHM_STYLES.btnGhostLg : SIGIL_RHYTHM_STYLES.btnGhost),
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilHeroProps extends Omit<SigilSectionProps, "space"> {}

export function SigilHero({ className, ...props }: SigilHeroProps) {
  return (
    <SigilSection
      space="hero"
      className={cn("relative overflow-hidden", className)}
      {...props}
    />
  );
}

export interface SigilHeroLayoutProps extends HTMLAttributes<HTMLDivElement> {}

export function SigilHeroLayout({
  className,
  style,
  ...props
}: SigilHeroLayoutProps) {
  return (
    <div
      className={cn("relative z-[1] flex flex-col lg:flex-row lg:items-center", className)}
      style={{
        gap: "var(--s-section-subsection-gap, var(--s-grid-cell))",
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilHeroContentProps extends HTMLAttributes<HTMLDivElement> {}

export function SigilHeroContent({
  className,
  ...props
}: SigilHeroContentProps) {
  return (
    <div
      className={cn("min-w-0 flex-1 shrink-0 lg:max-w-[36%]", className)}
      {...props}
    />
  );
}

export interface SigilHeroMediaProps extends HTMLAttributes<HTMLDivElement> {}

export function SigilHeroMedia({ className, ...props }: SigilHeroMediaProps) {
  return (
    <div
      className={cn("flex min-w-0 flex-1 items-center justify-center", className)}
      {...props}
    />
  );
}

export interface SigilHeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2";
}

export function SigilHeroTitle({
  as: Tag = "h1",
  className,
  style,
  ...props
}: SigilHeroTitleProps) {
  return (
    <Tag
      className={cn(
        "max-w-3xl font-[family-name:var(--s-font-display)] text-[clamp(32px,5vw,56px)] font-bold leading-[var(--s-heading-display-leading,1.08)] tracking-[var(--s-heading-display-tracking,-0.03em)] text-[var(--s-text)]",
        className,
      )}
      style={{
        marginBottom: "var(--s-section-heading-margin-bottom)",
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilHeroDescriptionProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "role"> {
  children: ReactNode;
}

export function SigilHeroDescription({
  className,
  style,
  ...props
}: SigilHeroDescriptionProps) {
  return (
    <DensityText
      role="body"
      as="p"
      muted
      className={cn("max-w-md leading-relaxed", className)}
      style={{
        marginBottom: "var(--s-section-content-gap)",
        ...style,
      }}
      {...props}
    />
  );
}

export interface SigilViewCodeProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  defaultView?: "preview" | "code";
  previewLabel?: string;
  codeLabel?: string;
}

export function SigilViewCode({
  code,
  defaultView = "preview",
  previewLabel = "View",
  codeLabel = "Code",
  className,
  children,
  ...props
}: SigilViewCodeProps) {
  const [mode, setMode] = useState<"preview" | "code">(defaultView);
  return (
    <div data-slot="sigil-view-code" className={className} {...props}>
      <div
        className="flex items-center justify-between border-b border-[var(--s-border)] bg-[var(--s-surface)]"
        style={{ padding: "var(--s-section-label-row-margin-bottom)" }}
      >
        <MonoLabel variant="accent">Demo</MonoLabel>
        <div className="flex items-center border border-[var(--s-border)]">
          {(["preview", "code"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className="border-0 bg-transparent px-3 py-1.5 font-[family-name:var(--s-font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--s-text)]"
              style={{
                background:
                  mode === value
                    ? "var(--s-background)"
                    : "transparent",
                color:
                  mode === value
                    ? "var(--s-text)"
                    : "var(--s-text-muted)",
              }}
            >
              {value === "preview" ? previewLabel : codeLabel}
            </button>
          ))}
        </div>
      </div>
      {mode === "preview" ? (
        children
      ) : (
        <pre
          className="m-0 max-h-[calc(100dvh-120px)] overflow-auto bg-[var(--s-background)] font-[family-name:var(--s-font-mono)] text-[12px] leading-[1.7] text-[var(--s-text)]"
          style={{ padding: "var(--s-grid-cell)" }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export interface SigilMonoBlockProps extends HTMLAttributes<HTMLDivElement> {}

export function SigilMonoBlock({
  className,
  style,
  ...props
}: SigilMonoBlockProps) {
  return (
    <div
      className={cn("font-[family-name:var(--s-font-mono)]", className)}
      style={{
        padding:
          "calc(var(--s-grid-cell) / 6) calc(var(--s-grid-cell) / 4)",
        background: "var(--s-surface)",
        border: "1px solid var(--s-border)",
        ...style,
      }}
      {...props}
    />
  );
}
