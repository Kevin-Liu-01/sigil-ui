"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useInView, type UseInViewOptions } from "./useInView";
import { useMountReveal } from "./useMountReveal";
import { useReducedMotion } from "./useReducedMotion";

type RevealUnit = "word" | "char";

export interface TextRevealProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to reveal. */
  text: string;
  /** Reveal by word or character. @default "word" */
  by?: RevealUnit;
  /** Stagger interval between units in ms. @default 60 */
  interval?: number;
  /** Base delay in ms. @default 0 */
  delay?: number;
  trigger?: "scroll" | "mount";
  viewOptions?: UseInViewOptions;
}

function splitText(text: string, by: RevealUnit): string[] {
  if (by === "char") return text.split("");
  return text.split(/(\s+)/);
}

export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(
  function TextReveal(
    {
      text,
      by = "word",
      interval = 60,
      delay = 0,
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

    const units = splitText(text, by);
    let unitIndex = 0;

    return (
      <div
        ref={mergedRef}
        data-slot="text-reveal"
        className={cn("sigil-text-reveal", className)}
        aria-label={text}
        {...rest}
      >
        {units.map((unit, i) => {
          const isSpace = /^\s+$/.test(unit);
          if (isSpace) return <span key={i}>{unit}</span>;

          const unitDelay = delay + unitIndex * interval;
          unitIndex++;

          return (
            <span
              key={i}
              aria-hidden
              style={{
                display: "inline-block",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                filter: visible ? "blur(0px)" : "blur(4px)",
                transition: reduced
                  ? "none"
                  : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${unitDelay}ms, transform var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${unitDelay}ms, filter var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${unitDelay}ms`,
              }}
            >
              {unit}
            </span>
          );
        })}
      </div>
    );
  },
);
