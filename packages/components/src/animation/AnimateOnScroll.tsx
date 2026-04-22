"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useSigilAnimate, type UseSigilAnimateConfig } from "./useSigilAnimate";

export interface AnimateOnScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Animation preset. @default "fadeUp" */
  preset?: UseSigilAnimateConfig["preset"];
  /** Delay in seconds. */
  delay?: number;
  /** Duration in seconds. @default 0.6 */
  duration?: number;
  children?: ReactNode;
}

/** Wrapper component that applies scroll-triggered animation to children. */
export const AnimateOnScroll = forwardRef<HTMLDivElement, AnimateOnScrollProps>(
  function AnimateOnScroll({ preset = "fadeUp", delay = 0, duration = 0.6, className, children, ...rest }, ref) {
    const animRef = useSigilAnimate<HTMLDivElement>({
      preset,
      delay,
      duration,
      trigger: "scroll",
    });

    const resolvedRef = (el: HTMLDivElement | null) => {
      (animRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div ref={resolvedRef} className={cn(className)} {...rest}>
        {children}
      </div>
    );
  },
);
