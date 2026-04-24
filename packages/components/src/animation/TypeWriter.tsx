"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface TypeWriterProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text strings to type. Loops if multiple. */
  words: string[];
  /** Typing speed in ms per character. @default 60 */
  speed?: number;
  /** Pause after a word is fully typed in ms. @default 1500 */
  pauseDuration?: number;
  /** Deleting speed in ms per character. @default 40 */
  deleteSpeed?: number;
  /** Whether to loop through words. @default true */
  loop?: boolean;
  /** Show blinking cursor. @default true */
  cursor?: boolean;
}

export const TypeWriter = forwardRef<HTMLSpanElement, TypeWriterProps>(
  function TypeWriter(
    {
      words,
      speed = 60,
      pauseDuration = 1500,
      deleteSpeed = 40,
      loop = true,
      cursor = true,
      className,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      if (reduced) {
        setDisplay(words[0] ?? "");
        return;
      }

      const current = words[wordIndex] ?? "";

      if (!isDeleting && display === current) {
        if (!loop && wordIndex === words.length - 1) return;
        const pause = setTimeout(() => setIsDeleting(true), pauseDuration);
        return () => clearTimeout(pause);
      }

      if (isDeleting && display === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      const timeout = setTimeout(
        () => {
          setDisplay(
            isDeleting
              ? current.slice(0, display.length - 1)
              : current.slice(0, display.length + 1),
          );
        },
        isDeleting ? deleteSpeed : speed,
      );

      return () => clearTimeout(timeout);
    }, [display, isDeleting, wordIndex, words, speed, deleteSpeed, pauseDuration, loop, reduced]);

    return (
      <span
        ref={ref}
        data-slot="typewriter"
        className={cn("sigil-typewriter", className)}
        aria-label={words[wordIndex]}
        {...rest}
      >
        {display}
        {cursor && (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              marginLeft: "1px",
              verticalAlign: "text-bottom",
              background: "currentColor",
              animation: reduced ? "none" : "sigil-blink 0.8s step-end infinite",
            }}
          />
        )}
        <style>{`@keyframes sigil-blink { 50% { opacity: 0; } }`}</style>
      </span>
    );
  },
);
