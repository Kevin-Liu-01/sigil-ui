"use client";

import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../utils";

type ScrollbarOrientation = "vertical" | "horizontal" | "both";

type ScrollbarStyle = CSSProperties & {
  "--s-scrollbar-width"?: string;
  "--s-scrollbar-height"?: string;
};

export type ScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  /** Orientation of the scrollbar. @default "vertical" */
  orientation?: ScrollbarOrientation;
  /** Override token-driven scrollbar thickness for this instance. */
  scrollbarSize?: number | string;
  /** Additional classes for the scrollbar track. */
  scrollbarClassName?: string;
  /** Additional classes for the scrollbar thumb. */
  thumbClassName?: string;
};

const toCssLength = (value: number | string | undefined): string | undefined =>
  typeof value === "number" ? `${value}px` : value;

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    {
      className,
      children,
      orientation = "vertical",
      scrollbarSize,
      scrollbarClassName,
      thumbClassName,
      ...props
    },
    ref,
  ) {
    const showVertical = orientation === "vertical" || orientation === "both";
    const showHorizontal = orientation === "horizontal" || orientation === "both";

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        data-slot="scroll-area"
        className={cn("sigil-scroll-area relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
          {children}
        </ScrollAreaPrimitive.Viewport>
        {showVertical && (
          <ScrollBar
            orientation="vertical"
            scrollbarSize={scrollbarSize}
            className={scrollbarClassName}
            thumbClassName={thumbClassName}
          />
        )}
        {showHorizontal && (
          <ScrollBar
            orientation="horizontal"
            scrollbarSize={scrollbarSize}
            className={scrollbarClassName}
            thumbClassName={thumbClassName}
          />
        )}
        <ScrollAreaPrimitive.Corner className="bg-[var(--s-scrollbar-corner,transparent)]" />
      </ScrollAreaPrimitive.Root>
    );
  },
);

const ScrollBar = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> & {
    scrollbarSize?: number | string;
    thumbClassName?: string;
  }
>(function ScrollBar(
  { className, orientation = "vertical", scrollbarSize, thumbClassName, style, ...props },
  ref,
) {
  const size = toCssLength(scrollbarSize);
  const scrollbarStyle: ScrollbarStyle = {
    ...style,
    "--s-scrollbar-width": size,
    "--s-scrollbar-height": size,
  };

  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none bg-[var(--s-scrollbar-track,transparent)]",
        "rounded-[var(--s-scrollbar-radius,var(--s-radius-full))]",
        "p-[var(--s-scrollbar-padding,2px)]",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        orientation === "vertical" &&
          "h-full w-[var(--s-scrollbar-width,10px)] border-l border-l-[var(--s-scrollbar-border,transparent)]",
        orientation === "horizontal" &&
          "h-[var(--s-scrollbar-height,10px)] flex-col border-t border-t-[var(--s-scrollbar-border,transparent)]",
        className,
      )}
      style={scrollbarStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "relative flex-1 rounded-[var(--s-scrollbar-radius,var(--s-radius-full))]",
          "bg-[var(--s-scrollbar-thumb,var(--s-border))]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-scrollbar-thumb-hover,var(--s-border-strong))]",
          "active:bg-[var(--s-scrollbar-thumb-active,var(--s-primary))]",
          thumbClassName,
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
});
