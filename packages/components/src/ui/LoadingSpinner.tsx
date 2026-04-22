"use client";

import {
  forwardRef,
  useEffect,
  useReducer,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "../utils";
import catalog from "./spinners-catalog.json";

type SpinnerDef = { frames: string[]; interval: number };

const HARDCODED: Record<string, SpinnerDef> = {
  braille:   { frames: ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"], interval: 80 },
  dots:      { frames: ["⠁","⠂","⠄","⡀","⢀","⠠","⠐","⠈"], interval: 80 },
  dots2:     { frames: ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"], interval: 80 },
  triangle:  { frames: ["◢","◣","◤","◥"], interval: 50 },
  arc:       { frames: ["◜","◠","◝","◞","◡","◟"], interval: 100 },
  wave:      { frames: ["⠁⠂⠄⡀","⠂⠄⡀⢀","⠄⡀⢀⠠","⡀⢀⠠⠐","⢀⠠⠐⠈","⠠⠐⠈⠁","⠐⠈⠁⠂","⠈⠁⠂⠄"], interval: 100 },
  noise:     { frames: ["▓","▒","░","▒"], interval: 100 },
  snake:     { frames: ["⠏","⠛","⠹","⢸","⣰","⣤","⣆","⡇"], interval: 80 },
  helix:     { frames: ["⠋⠁","⠙⠂","⠹⠄","⢸⡀","⣰⢀","⣤⠠","⣆⠐","⡇⠈"], interval: 80 },
  sparkle:   { frames: ["✶","✷","✸","✹","✺","✹","✷"], interval: 120 },
  moon:      { frames: ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"], interval: 150 },
  earth:     { frames: ["🌍","🌎","🌏"], interval: 200 },
  clock:     { frames: ["🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛"], interval: 100 },
  bar:       { frames: ["|","/","-","\\"], interval: 100 },
  grow_horizontal: { frames: ["▏","▎","▍","▌","▋","▊","▉","█","▉","▊","▋","▌","▍","▎"], interval: 80 },
  grow_vertical:   { frames: ["▁","▂","▃","▄","▅","▆","▇","█","▇","▆","▅","▄","▃","▂"], interval: 80 },
  square_corners:  { frames: ["◰","◳","◲","◱"], interval: 120 },
  circle_halves:   { frames: ["◐","◓","◑","◒"], interval: 120 },
  circle_quarters: { frames: ["◴","◷","◶","◵"], interval: 120 },
  rain: { frames: ["⠁","⠂","⠄","⡀","⡈","⡐","⡠","⣀","⣁","⣂","⣄","⣌","⣔","⣤","⣥","⣦","⣮","⣶","⣷","⣿","⡿","⠿","⢟","⠟","⠏","⠇","⠃","⠁"], interval: 50 },
};

const catalogSpinners = (catalog as { spinners: Record<string, { frames: string[]; interval: number }> }).spinners;

function resolveSpinner(name: string): SpinnerDef {
  return HARDCODED[name] ?? catalogSpinners[name] ?? HARDCODED.braille;
}

export const SPINNER_NAMES = [
  ...Object.keys(HARDCODED),
  ...Object.keys(catalogSpinners).filter((k) => !(k in HARDCODED)),
] as const;

export type SpinnerVariant = (typeof SPINNER_NAMES)[number];

const SIZE_MAP = {
  sm: "text-xs",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
} as const;

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Spinner name from the catalog. @default "braille" */
  variant?: SpinnerVariant;
  /** Override interval in ms. */
  speed?: number;
  /** Size variant. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** Optional text shown next to the spinner. */
  label?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Animated loading spinner supporting 55 Unicode/emoji frame sets. */
export const LoadingSpinner = forwardRef<HTMLSpanElement, LoadingSpinnerProps>(
  function LoadingSpinner(
    { variant = "braille", speed, size = "md", label, className, ...rest },
    ref,
  ) {
    const { frames, interval } = resolveSpinner(variant);
    const ms = speed ?? interval;
    const reducedMotion = usePrefersReducedMotion();
    const [frame, tick] = useReducer(
      (prev: number) => (prev + 1) % frames.length,
      0,
    );

    useEffect(() => {
      if (reducedMotion) return;
      const id = setInterval(tick, ms);
      return () => clearInterval(id);
    }, [frames.length, ms, reducedMotion]);

    const spinner = (
      <span
        ref={ref}
        role="status"
        aria-label={label ?? "Loading"}
        className={cn(
          "inline-block font-mono text-[var(--s-primary)]",
          SIZE_MAP[size],
          className,
        )}
        {...rest}
      >
        {frames[reducedMotion ? 0 : frame]}
        <span className="sr-only">{label ?? "Loading…"}</span>
      </span>
    );

    if (!label) return spinner;

    return (
      <span className={cn("inline-flex items-center gap-2", SIZE_MAP[size])}>
        {spinner}
        <span className="text-[var(--s-text-secondary)]">{label}</span>
      </span>
    );
  },
);
