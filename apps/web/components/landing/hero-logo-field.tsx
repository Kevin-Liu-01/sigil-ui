"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOGO_VARIANTS = [
  "/logo.svg",
  "/logo-v2-mixed-shapes.svg",
  "/logo-v3-gradient-dots.svg",
  "/logo-v4-outline.svg",
  "/logo-v5-asymmetric.svg",
  "/logo-v6-monochrome.svg",
] as const;

type Treatment = "ghost" | "dotted" | "blur" | "normal";

type Placement = {
  src: string;
  x: string;
  y: string;
  size: number;
  rotation: number;
  treatment: Treatment;
  opacity: number;
  delay: number;
};

const PLACEMENTS: Placement[] = [
  { src: LOGO_VARIANTS[0], x: "3%",  y: "5%",  size: 100, rotation: -12, treatment: "dotted", opacity: 0.18, delay: 0 },
  { src: LOGO_VARIANTS[3], x: "8%",  y: "55%", size: 72,  rotation: 8,   treatment: "ghost",  opacity: 0.12, delay: 200 },
  { src: LOGO_VARIANTS[1], x: "80%", y: "2%",  size: 88,  rotation: 15,  treatment: "blur",   opacity: 0.10, delay: 400 },
  { src: LOGO_VARIANTS[4], x: "90%", y: "30%", size: 64,  rotation: -20, treatment: "dotted", opacity: 0.15, delay: 100 },
  { src: LOGO_VARIANTS[5], x: "1%",  y: "78%", size: 80,  rotation: 5,   treatment: "ghost",  opacity: 0.10, delay: 300 },
  { src: LOGO_VARIANTS[2], x: "85%", y: "62%", size: 96,  rotation: -8,  treatment: "ghost",  opacity: 0.12, delay: 500 },
  { src: LOGO_VARIANTS[3], x: "15%", y: "88%", size: 56,  rotation: 22,  treatment: "dotted", opacity: 0.14, delay: 150 },
  { src: LOGO_VARIANTS[0], x: "70%", y: "85%", size: 72,  rotation: -15, treatment: "blur",   opacity: 0.08, delay: 350 },
  { src: LOGO_VARIANTS[2], x: "42%", y: "2%",  size: 60,  rotation: 10,  treatment: "ghost",  opacity: 0.08, delay: 250 },
  { src: LOGO_VARIANTS[4], x: "50%", y: "88%", size: 68,  rotation: -5,  treatment: "dotted", opacity: 0.12, delay: 450 },
];

const TREATMENT_STYLES: Record<Treatment, React.CSSProperties> = {
  ghost: {},
  dotted: {
    maskImage: "radial-gradient(circle 1px at 1.5px 1.5px, black 100%, transparent 0)",
    WebkitMaskImage: "radial-gradient(circle 1px at 1.5px 1.5px, black 100%, transparent 0)",
    maskSize: "3.5px 3.5px",
    WebkitMaskSize: "3.5px 3.5px",
  } as React.CSSProperties,
  blur: {
    filter: "blur(4px)",
  },
  normal: {},
};

function ScatteredLogo({ placement, visible }: { placement: Placement; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: placement.x,
        top: placement.y,
        width: placement.size,
        height: placement.size,
        transform: `rotate(${placement.rotation}deg) scale(${visible ? 1 : 0.7})`,
        opacity: visible ? placement.opacity : 0,
        transition: `opacity 1200ms ease ${placement.delay}ms, transform 1200ms ease ${placement.delay}ms`,
        pointerEvents: "none",
        ...TREATMENT_STYLES[placement.treatment],
      }}
    >
      <Image
        src={placement.src}
        alt=""
        width={placement.size}
        height={placement.size}
        style={{ width: "100%", height: "100%" }}
        aria-hidden
      />
    </div>
  );
}

export function HeroLogoField() {
  const [visible, setVisible] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((i) => (i + 1) % LOGO_VARIANTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSrc = LOGO_VARIANTS[heroIdx];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes hero-logo-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.04); }
}
`,
        }}
      />

      {/* Scattered background logos */}
      {PLACEMENTS.map((p, i) => (
        <ScatteredLogo key={i} placement={p} visible={visible} />
      ))}

      {/* Magnified center logo — large and clearly visible */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          opacity: visible ? 0.14 : 0,
          transition: "opacity 2000ms ease 200ms",
          pointerEvents: "none",
          animation: "hero-logo-pulse 8s ease-in-out infinite",
          maskImage: "radial-gradient(ellipse 55% 55% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 50%, black 30%, transparent 100%)",
        }}
      >
        <Image
          src={heroSrc}
          alt=""
          width={400}
          height={400}
          style={{ width: "100%", height: "100%", transition: "opacity 800ms ease" }}
          aria-hidden
          priority
        />
      </div>
    </>
  );
}
