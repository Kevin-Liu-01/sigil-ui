"use client";

import { useEffect, useRef } from "react";
import { animateElement, type PresetName } from "./animate";

export interface UseSigilAnimateConfig {
  /** Whether to animate at all. @default true */
  animate?: boolean;
  /** Delay before animation starts in seconds. */
  delay?: number;
  /** Animation duration in seconds. @default 0.6 */
  duration?: number;
  /** Trigger mode. @default "mount" */
  trigger?: "scroll" | "mount";
  /** Named animation preset. @default "fadeUp" */
  preset?: PresetName;
  /** Stagger value for child elements. */
  stagger?: number;
}

/**
 * React hook for declarative GSAP animation.
 * Returns a ref to attach to the target element.
 */
export function useSigilAnimate<T extends HTMLElement = HTMLDivElement>(
  config: UseSigilAnimateConfig = {},
) {
  const {
    animate: shouldAnimate = true,
    delay = 0,
    duration = 0.6,
    trigger = "mount",
    preset = "fadeUp",
    stagger = 0,
  } = config;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!shouldAnimate || !ref.current) return;

    const animation = animateElement(ref.current, {
      preset,
      duration,
      delay,
      stagger,
      scrollTrigger: trigger === "scroll",
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [shouldAnimate, delay, duration, trigger, preset, stagger]);

  return ref;
}
