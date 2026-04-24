"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

export interface ScaleInProps extends HTMLAttributes<HTMLDivElement> {
  /** Initial scale factor. @default 0.92 */
  initialScale?: number;
  /** Delay before animation in ms. @default 0 */
  delay?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
  children?: ReactNode;
}

export const ScaleIn = forwardRef<HTMLDivElement, ScaleInProps>(
  function ScaleIn(
    {
      initialScale = 0.92,
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
        data-slot="scale-in"
        className={cn("sigil-scale-in", className)}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : `scale(${initialScale})`,
          transition: reduced
            ? "none"
            : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${delay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-spring,cubic-bezier(0.34,1.56,0.64,1)) ${delay}ms`,
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
