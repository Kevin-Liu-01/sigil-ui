import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

/** Reusable animation presets for common reveal patterns. */
export const PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    from: { opacity: 0, x: 40 },
    to: { opacity: 1, x: 0 },
  },
  slideRight: {
    from: { opacity: 0, x: -40 },
    to: { opacity: 1, x: 0 },
  },
  blurIn: {
    from: { opacity: 0, filter: "blur(8px)" },
    to: { opacity: 1, filter: "blur(0px)" },
  },
} as const satisfies Record<string, AnimationPreset>;

export type PresetName = keyof typeof PRESETS;

/** Apply a preset animation to an element with optional ScrollTrigger. */
export function animateElement(
  element: gsap.TweenTarget,
  options: {
    preset?: PresetName;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    duration?: number;
    delay?: number;
    stagger?: number;
    scrollTrigger?: boolean | ScrollTrigger.Vars;
  } = {},
) {
  const { preset = "fadeUp", from, to, duration = 0.6, delay = 0, stagger = 0, scrollTrigger } = options;
  const p = PRESETS[preset];

  const triggerConfig: ScrollTrigger.Vars | undefined = scrollTrigger
    ? typeof scrollTrigger === "boolean"
      ? { trigger: element as Element, start: "top 85%", toggleActions: "play none none reverse" }
      : scrollTrigger
    : undefined;

  gsap.fromTo(
    element,
    { ...p.from, ...from },
    {
      ...p.to,
      ...to,
      duration,
      delay,
      stagger,
      ease: "power2.out",
      scrollTrigger: triggerConfig,
    },
  );
}
