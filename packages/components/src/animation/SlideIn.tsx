"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useMountReveal } from "./useMountReveal";
import { useReducedMotion } from "./useReducedMotion";

type SlideDirection = "up" | "down" | "left" | "right";

export interface SlideInProps extends HTMLAttributes<HTMLDivElement> {
  /** Edge to slide from. @default "left" */
  direction?: SlideDirection;
  /** Slide distance in pixels. @default 60 */
  offset?: number;
  /** Delay before animation in ms. @default 0 */
  delay?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
  children?: ReactNode;
}

const slideTransform: Record<SlideDirection, (o: number) => string> = {
  up: (o) => `translateY(${o}px)`,
  down: (o) => `translateY(-${o}px)`,
  left: (o) => `translateX(-${o}px)`,
  right: (o) => `translateX(${o}px)`,
};

export const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  function SlideIn(
    {
      direction = "left",
      offset = 60,
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
    const mounted = useMountReveal(trigger === "mount" && !reduced);
    const visible = reduced || (trigger === "mount" ? mounted : inView);

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={mergedRef}
        data-slot="slide-in"
        className={cn("sigil-slide-in", className)}
        style={{
          transform: visible ? "translateX(0) translateY(0)" : slideTransform[direction](offset),
          opacity: visible ? 1 : 0,
          transition: reduced
            ? "none"
            : `transform var(--s-duration-slow,400ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${delay}ms, opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${delay}ms`,
          willChange: visible ? "auto" : "transform, opacity",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
