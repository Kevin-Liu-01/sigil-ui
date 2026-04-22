"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const LOGO_VARIANTS = [
  "/logo.svg",
  "/logo-v2-mixed-shapes.svg",
  "/logo-v3-gradient-dots.svg",
  "/logo-v4-outline.svg",
  "/logo-v5-asymmetric.svg",
  "/logo-v6-monochrome.svg",
] as const;

type Treatment = "ghost" | "dotted" | "blur" | "outline" | "normal";

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
  // top-left cluster
  { src: LOGO_VARIANTS[0], x: "4%", y: "8%", size: 72, rotation: -12, treatment: "dotted", opacity: 0.07, delay: 0 },
  { src: LOGO_VARIANTS[3], x: "12%", y: "55%", size: 48, rotation: 8, treatment: "ghost", opacity: 0.04, delay: 200 },

  // top-right area
  { src: LOGO_VARIANTS[1], x: "82%", y: "5%", size: 64, rotation: 15, treatment: "blur", opacity: 0.05, delay: 400 },
  { src: LOGO_VARIANTS[4], x: "92%", y: "35%", size: 40, rotation: -20, treatment: "dotted", opacity: 0.06, delay: 100 },

  // mid-left
  { src: LOGO_VARIANTS[5], x: "2%", y: "75%", size: 56, rotation: 5, treatment: "outline", opacity: 0.05, delay: 300 },

  // mid-right
  { src: LOGO_VARIANTS[2], x: "88%", y: "65%", size: 80, rotation: -8, treatment: "ghost", opacity: 0.04, delay: 500 },

  // bottom scattered
  { src: LOGO_VARIANTS[3], x: "18%", y: "88%", size: 36, rotation: 22, treatment: "dotted", opacity: 0.05, delay: 150 },
  { src: LOGO_VARIANTS[0], x: "72%", y: "85%", size: 52, rotation: -15, treatment: "blur", opacity: 0.04, delay: 350 },

  // sparse fills
  { src: LOGO_VARIANTS[1], x: "45%", y: "3%", size: 44, rotation: 10, treatment: "ghost", opacity: 0.03, delay: 250 },
  { src: LOGO_VARIANTS[5], x: "55%", y: "90%", size: 48, rotation: -5, treatment: "outline", opacity: 0.04, delay: 450 },
];

const TREATMENT_STYLES: Record<Treatment, React.CSSProperties> = {
  ghost: {},
  dotted: {
    maskImage: "radial-gradient(circle 1.2px at 1.2px 1.2px, black 100%, transparent 0)",
    WebkitMaskImage: "radial-gradient(circle 1.2px at 1.2px 1.2px, black 100%, transparent 0)",
    maskSize: "4px 4px",
    WebkitMaskSize: "4px 4px",
  },
  blur: {
    filter: "blur(3px)",
  },
  outline: {
    filter: "brightness(0) invert(1) contrast(0.5)",
    mixBlendMode: "overlay" as const,
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
        transform: `rotate(${placement.rotation}deg) scale(${visible ? 1 : 0.8})`,
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
.hero-logo-magnified {
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
}
@keyframes hero-logo-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.02); }
}
`,
        }}
      />

      {/* Scattered background logos */}
      {PLACEMENTS.map((p, i) => (
        <ScatteredLogo key={i} placement={p} visible={visible} />
      ))}

      {/* Magnified center logo */}
      <div
        className="hero-logo-magnified"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 280,
          height: 280,
          opacity: visible ? 0.06 : 0,
          transition: "opacity 2000ms ease 200ms",
          pointerEvents: "none",
          animation: "hero-logo-pulse 8s ease-in-out infinite",
        }}
      >
        <Image
          src={heroSrc}
          alt=""
          width={280}
          height={280}
          style={{ width: "100%", height: "100%", transition: "opacity 800ms ease" }}
          aria-hidden
          priority
        />
      </div>
    </>
  );
}
