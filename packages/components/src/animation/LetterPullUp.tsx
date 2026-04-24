"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useMountReveal } from "./useMountReveal";
import { useReducedMotion } from "./useReducedMotion";

export interface LetterPullUpProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to animate. */
  text: string;
  /** Stagger between letters in ms. @default 30 */
  interval?: number;
  /** Base delay in ms. @default 0 */
  delay?: number;
  /** Pull distance in pixels. @default 24 */
  pullDistance?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
}

export const LetterPullUp = forwardRef<HTMLDivElement, LetterPullUpProps>(
  function LetterPullUp(
    {
      text,
      interval = 30,
      delay = 0,
      pullDistance = 24,
      trigger = "scroll",
      viewOptions,
      className,
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

    const words = text.split(" ");

    return (
      <div
        ref={mergedRef}
        data-slot="letter-pull-up"
        className={cn("sigil-letter-pull-up flex flex-wrap", className)}
        aria-label={text}
        {...rest}
      >
        {words.map((word, wi) => {
          const charOffset = words.slice(0, wi).reduce((sum, w) => sum + w.length + 1, 0);
          return (
            <span key={wi} className="flex">
              {word.split("").map((char, ci) => {
                const charDelay = delay + (charOffset + ci) * interval;
                return (
                  <span
                    key={ci}
                    aria-hidden
                    style={{
                      display: "inline-block",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : `translateY(${pullDistance}px)`,
                      transition: reduced
                        ? "none"
                        : `opacity var(--s-duration-fast,150ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${charDelay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${charDelay}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {wi < words.length - 1 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </div>
    );
  },
);
