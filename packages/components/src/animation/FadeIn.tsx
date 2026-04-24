"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction to fade from. @default "up" */
  direction?: FadeDirection;
  /** Offset in pixels for the translate. @default 24 */
  offset?: number;
  /** Delay before animation in ms. @default 0 */
  delay?: number;
  /** Whether animation triggers on scroll (IntersectionObserver) or immediately on mount. @default "scroll" */
  trigger?: "scroll" | "mount";
  /** IntersectionObserver options when trigger is "scroll". */
  viewOptions?: UseInViewOptions;
  children?: ReactNode;
}

const directionTransform: Record<FadeDirection, (offset: number) => string> = {
  up: (o) => `translateY(${o}px)`,
  down: (o) => `translateY(-${o}px)`,
  left: (o) => `translateX(${o}px)`,
  right: (o) => `translateX(-${o}px)`,
  none: () => "none",
};

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  function FadeIn(
    {
      direction = "up",
      offset = 24,
      delay = 0,
      trigger = "scroll",
      viewOptions,
      className,
      style,
      children,
      ...rest
    },
    outerRef,
  ) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>(viewOptions);
    const visible = reduced || trigger === "mount" ? true : inView;

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={mergedRef}
        data-slot="fade-in"
        className={cn("sigil-fade-in", className)}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : directionTransform[direction](offset),
          transition: reduced
            ? "none"
            : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${delay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${delay}ms`,
          willChange: visible ? "auto" : "opacity, transform",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
