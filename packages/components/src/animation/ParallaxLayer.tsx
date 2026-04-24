"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface ParallaxLayerProps extends HTMLAttributes<HTMLDivElement> {
  /** Parallax speed multiplier. Positive = moves slower than scroll, negative = faster. @default 0.3 */
  speed?: number;
  children?: ReactNode;
}

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  function ParallaxLayer({ speed = 0.3, className, style, children, ...rest }, outerRef) {
    const reduced = useReducedMotion();
    const innerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    const mergedRef = (el: HTMLDivElement | null) => {
      (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    useEffect(() => {
      if (reduced) return;

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const el = innerRef.current;
          if (!el) { ticking = false; return; }
          const rect = el.getBoundingClientRect();
          const viewH = window.innerHeight;
          const center = rect.top + rect.height / 2 - viewH / 2;
          setOffset(center * speed * -1);
          ticking = false;
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, [speed, reduced]);

    return (
      <div
        ref={mergedRef}
        data-slot="parallax-layer"
        className={cn("sigil-parallax-layer", className)}
        style={{
          transform: reduced ? "none" : `translateY(${offset}px)`,
          willChange: reduced ? "auto" : "transform",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
