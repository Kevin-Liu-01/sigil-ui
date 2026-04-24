"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

export interface BlurFadeProps extends HTMLAttributes<HTMLDivElement> {
  /** Initial blur radius in pixels. @default 10 */
  blur?: number;
  /** Vertical offset in pixels. @default 16 */
  yOffset?: number;
  /** Delay before animation in ms. @default 0 */
  delay?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
  children?: ReactNode;
}

export const BlurFade = forwardRef<HTMLDivElement, BlurFadeProps>(
  function BlurFade(
    {
      blur = 10,
      yOffset = 16,
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
        data-slot="blur-fade"
        className={cn("sigil-blur-fade", className)}
        style={{
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : `blur(${blur}px)`,
          transform: visible ? "translateY(0)" : `translateY(${yOffset}px)`,
          transition: reduced
            ? "none"
            : `opacity var(--s-duration-slow,400ms) var(--s-ease-out,ease-out) ${delay}ms, filter var(--s-duration-slow,400ms) var(--s-ease-out,ease-out) ${delay}ms, transform var(--s-duration-slow,400ms) var(--s-ease-out,ease-out) ${delay}ms`,
          willChange: visible ? "auto" : "opacity, filter, transform",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
