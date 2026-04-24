"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface CardCellProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  /** Card title (rendered with font-display). */
  title?: ReactNode;
  /** Footer content (rendered in a mono strip with border-t). */
  footer?: ReactNode;
  /** Make the card clickable as a link. */
  href?: string;
  /** Padding override. @default "var(--s-card-padding, 16px)" */
  padding?: string;
}

/**
 * A card cell designed for gap-pixel grids.
 *
 * `bg-[var(--s-background)]` cell, font-display title, mono footer
 * strip with border-t. Drop these into a `GapPixelGrid` and the
 * system handles all the hairlines.
 *
 * ```tsx
 * <GapPixelGrid columns={{ md: 3 }}>
 *   <CardCell title="Edge Compute" footer={<MonoLabel>12 regions</MonoLabel>}>
 *     Deploy functions at the edge with sub-50ms cold starts.
 *   </CardCell>
 * </GapPixelGrid>
 * ```
 */
export const CardCell = forwardRef<HTMLDivElement, CardCellProps>(
  function CardCell(
    { title, footer, href, padding, className, children, ...rest },
    ref,
  ) {
    const Wrapper = href ? "a" : "div";
    const linkProps = href ? { href } : {};

    return (
      <Wrapper
        {...(linkProps as any)}
        ref={ref as any}
        data-slot="card-cell"
        className={cn(
          "flex flex-col min-w-0",
          href && "no-underline group",
          className,
        )}
        style={{ background: "var(--s-background)" }}
        {...rest}
      >
        <div
          className="flex-1"
          style={{ padding: padding ?? "var(--s-card-padding, 16px)" }}
        >
          {title && (
            <h3 className="font-[family-name:var(--s-font-display)] text-[var(--s-text)] text-sm font-semibold leading-tight mb-2">
              {title}
            </h3>
          )}
          <div className="text-sm text-[var(--s-text-muted)] leading-relaxed">
            {children}
          </div>
        </div>
        {footer && (
          <div
            className="flex items-center gap-2 border-t border-[var(--s-border)] px-[var(--s-card-padding,16px)] py-2"
          >
            {footer}
          </div>
        )}
      </Wrapper>
    );
  },
);
