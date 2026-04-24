"use client";

import { Children, cloneElement, forwardRef, isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

export interface StaggerProps extends HTMLAttributes<HTMLDivElement> {
  /** Delay between each child in ms. @default 80 */
  interval?: number;
  /** Base delay before the first child animates in ms. @default 0 */
  delay?: number;
  /** Vertical offset for each child. @default 20 */
  yOffset?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
  children?: ReactNode;
}

export const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  function Stagger(
    {
      interval = 80,
      delay = 0,
      yOffset = 20,
      trigger = "scroll",
      viewOptions,
      className,
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

    const items = Children.toArray(children);

    return (
      <div ref={mergedRef} data-slot="stagger" className={cn("sigil-stagger", className)} {...rest}>
        {items.map((child, i) => {
          const childDelay = delay + i * interval;
          const itemStyle: React.CSSProperties = {
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : `translateY(${yOffset}px)`,
            transition: reduced
              ? "none"
              : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${childDelay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${childDelay}ms`,
          };

          if (isValidElement<{ style?: React.CSSProperties; className?: string }>(child)) {
            return cloneElement(child, {
              style: { ...itemStyle, ...child.props.style },
            });
          }

          return (
            <div key={i} style={itemStyle}>
              {child}
            </div>
          );
        })}
      </div>
    );
  },
);
