"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface WordRotateProps extends HTMLAttributes<HTMLSpanElement> {
  /** Array of words/phrases to cycle through. */
  words: string[];
  /** Time each word is shown in ms. @default 2500 */
  duration?: number;
}

export const WordRotate = forwardRef<HTMLSpanElement, WordRotateProps>(
  function WordRotate({ words, duration = 2500, className, style, ...rest }, ref) {
    const reduced = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [animState, setAnimState] = useState<"in" | "out">("in");

    useEffect(() => {
      if (words.length <= 1) return;

      const timer = setInterval(() => {
        setAnimState("out");
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setAnimState("in");
        }, 200);
      }, duration);

      return () => clearInterval(timer);
    }, [words.length, duration]);

    const isIn = animState === "in";

    return (
      <span
        ref={ref}
        data-slot="word-rotate"
        className={cn("sigil-word-rotate inline-block overflow-hidden", className)}
        style={{ verticalAlign: "bottom", ...style }}
        {...rest}
      >
        <span
          aria-live="polite"
          style={{
            display: "inline-block",
            opacity: isIn ? 1 : 0,
            transform: isIn ? "translateY(0)" : "translateY(40%)",
            filter: isIn ? "blur(0px)" : "blur(4px)",
            transition: reduced
              ? "none"
              : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out), transform var(--s-duration-fast,150ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)), filter var(--s-duration-fast,150ms) var(--s-ease-out,ease-out)`,
          }}
        >
          {words[index]}
        </span>
      </span>
    );
  },
);
