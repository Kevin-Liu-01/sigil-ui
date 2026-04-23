"use client";

import React, { useEffect, useState, cloneElement } from "react";
import type { ReactElement } from "react";

/* ── Timing ──────────────────────────────────────────────────── */
const CYCLE_MS = 4200;
const STAGGER_MS = 40;
const ANIM_MS = 3400;

/* ── Single uniform stroke preset ────────────────────────────── */
const S = { fill: "none" as const, strokeWidth: 0.25, pathLength: 1 };

/* ── Palette aliases (resolved via CSS custom properties) ────── */
const P = "var(--hlf-pri)";
const N = "currentColor";
const M = "var(--hlf-mid)";

type V = ReactElement[];

const VARIANTS: V[] = [
  /* ═══ ORIGINAL VARIANTS — organic circle clusters ═══════════ */

  /* Plus (+), scattered circle clusters */
  [
    <line key="d1" x1={60} y1={4} x2={60} y2={116} stroke={N} {...S} />,
    <line key="d2" x1={4} y1={60} x2={116} y2={60} stroke={N} {...S} />,
    <circle key="a" cx={22} cy={22} r={10} stroke={P} {...S} />,
    <circle key="b" cx={44} cy={22} r={10} stroke={P} {...S} strokeOpacity={0.8} />,
    <circle key="c" cx={22} cy={44} r={10} stroke={P} {...S} strokeOpacity={0.6} />,
    <circle key="d" cx={44} cy={44} r={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={82} cy={26} r={16} stroke={M} {...S} />,
    <circle key="f" cx={100} cy={44} r={6} stroke={M} {...S} />,
    <circle key="g" cx={24} cy={80} r={12} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="h" cx={42} cy={92} r={8} stroke={N} {...S} strokeOpacity={0.6} />,
    <circle key="i" cx={32} cy={108} r={5} stroke={N} {...S} strokeOpacity={0.4} />,
    <circle key="j" cx={90} cy={90} r={22} stroke={P} {...S} />,
  ],

  /* X, mixed shapes in triangular wedges */
  [
    <line key="d1" x1={10} y1={10} x2={110} y2={110} stroke={N} {...S} />,
    <line key="d2" x1={110} y1={10} x2={10} y2={110} stroke={N} {...S} />,
    <rect key="a" x={46} y={14} width={12} height={12} stroke={P} {...S} />,
    <rect key="b" x={62} y={14} width={12} height={12} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect key="c" x={54} y={30} width={12} height={12} stroke={P} {...S} strokeOpacity={0.5} />,
    <rect key="d" x={86} y={50} width={12} height={12} stroke={M} {...S} transform="rotate(45 92 56)" />,
    <rect key="e" x={94} y={62} width={10} height={10} stroke={M} {...S} transform="rotate(45 99 67)" />,
    <polygon key="f" points="60,82 74,90 74,106 60,114 46,106 46,90" stroke={P} {...S} />,
    <polygon key="g" points="60,88 68,93 68,103 60,108 52,103 52,93" stroke={P} {...S} strokeOpacity={0.5} />,
    <polygon key="h" points="30,52 38,66 22,66" stroke={N} {...S} strokeOpacity={0.8} />,
    <polygon key="i" points="18,56 22,64 14,64" stroke={N} {...S} strokeOpacity={0.5} />,
  ],

  /* Slash (/), concentric circles in 2 halves */
  [
    <line key="d1" x1={10} y1={110} x2={110} y2={10} stroke={N} {...S} />,
    <circle key="a" cx={80} cy={20} r={14} stroke={P} {...S} />,
    <circle key="b" cx={80} cy={20} r={20} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="c" cx={100} cy={28} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="d" cx={92} cy={46} r={10} stroke={M} {...S} />,
    <circle key="e" cx={70} cy={38} r={6} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="f" cx={28} cy={82} r={16} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="g" cx={28} cy={82} r={22} stroke={N} {...S} strokeOpacity={0.3} />,
    <circle key="h" cx={46} cy={96} r={9} stroke={P} {...S} />,
    <circle key="i" cx={22} cy={104} r={6} stroke={N} {...S} strokeOpacity={0.5} />,
  ],

  /* Backslash (\), concentric circles in 2 halves */
  [
    <line key="d1" x1={10} y1={10} x2={110} y2={110} stroke={N} {...S} />,
    <circle key="a" cx={22} cy={24} r={10} stroke={P} {...S} />,
    <circle key="b" cx={42} cy={20} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="c" cx={28} cy={44} r={12} stroke={P} {...S} />,
    <circle key="d" cx={28} cy={44} r={17} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="e" cx={50} cy={38} r={5} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="f" cx={90} cy={80} r={18} stroke={P} {...S} />,
    <circle key="g" cx={90} cy={80} r={24} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="h" cx={76} cy={96} r={8} stroke={M} {...S} />,
    <circle key="i" cx={100} cy={102} r={6} stroke={M} {...S} />,
  ],

  /* Y trisection, circles in 3 sectors */
  [
    <line key="d1" x1={60} y1={60} x2={60} y2={4} stroke={N} {...S} />,
    <line key="d2" x1={60} y1={60} x2={11.5} y2={88} stroke={N} {...S} />,
    <line key="d3" x1={60} y1={60} x2={108.5} y2={88} stroke={N} {...S} />,
    <circle key="a" cx={40} cy={20} r={10} stroke={P} {...S} />,
    <circle key="b" cx={40} cy={20} r={15} stroke={P} {...S} strokeOpacity={0.3} />,
    <circle key="c" cx={80} cy={20} r={8} stroke={P} {...S} strokeOpacity={0.7} />,
    <circle key="d" cx={60} cy={36} r={6} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="e" cx={24} cy={86} r={12} stroke={N} {...S} strokeOpacity={0.8} />,
    <circle key="f" cx={40} cy={100} r={8} stroke={N} {...S} strokeOpacity={0.5} />,
    <circle key="g" cx={90} cy={82} r={14} stroke={P} {...S} />,
    <circle key="h" cx={90} cy={82} r={20} stroke={P} {...S} strokeOpacity={0.25} />,
    <circle key="i" cx={100} cy={100} r={6} stroke={M} {...S} />,
  ],

  /* 3-column (||), monochrome */
  [
    <line key="d1" x1={40} y1={4} x2={40} y2={116} stroke={N} {...S} />,
    <line key="d2" x1={80} y1={4} x2={80} y2={116} stroke={N} {...S} />,
    <circle key="a" cx={20} cy={28} r={10} stroke={N} {...S} />,
    <circle key="b" cx={20} cy={52} r={8} stroke={N} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={20} cy={90} r={14} stroke={N} {...S} strokeOpacity={0.3} />,
    <circle key="d" cx={60} cy={20} r={12} stroke={N} {...S} strokeOpacity={0.85} />,
    <circle key="e" cx={60} cy={60} r={16} stroke={N} {...S} strokeOpacity={0.45} />,
    <circle key="f" cx={60} cy={60} r={22} stroke={N} {...S} strokeOpacity={0.2} />,
    <circle key="g" cx={60} cy={100} r={8} stroke={N} {...S} strokeOpacity={0.65} />,
    <circle key="h" cx={100} cy={36} r={8} stroke={N} {...S} strokeOpacity={0.6} />,
    <circle key="i" cx={100} cy={76} r={12} stroke={N} {...S} strokeOpacity={0.75} />,
  ],

  /* ═══ GEOMETRIC VARIANTS — circles + squares, tighter ═══════ */

  /* Plus (+) · circle-wrapping-square motif */
  [
    <line key="d1" x1={60} y1={0} x2={60} y2={120} stroke={N} {...S} />,
    <line key="d2" x1={0} y1={60} x2={120} y2={60} stroke={N} {...S} />,
    <circle key="a" cx={37} cy={37} r={16} stroke={P} {...S} />,
    <rect   key="b" x={32} y={32} width={10} height={10} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={37} cy={37} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={77} y={31} width={12} height={12} stroke={M} {...S} transform="rotate(45 83 37)" />,
    <circle key="e" cx={83} cy={37} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="f" cx={37} cy={83} r={13} stroke={N} {...S} strokeOpacity={0.8} />,
    <rect   key="g" x={33} y={79} width={8} height={8} stroke={N} {...S} strokeOpacity={0.35} />,
    <circle key="h" cx={84} cy={84} r={17} stroke={P} {...S} strokeOpacity={0.8} />,
    <circle key="i" cx={84} cy={84} r={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <rect   key="j" x={81} y={81} width={6} height={6} stroke={P} {...S} strokeOpacity={0.2} />,
  ],

  /* X cross · alternating circles and diamonds */
  [
    <line key="d1" x1={6} y1={6} x2={114} y2={114} stroke={N} {...S} />,
    <line key="d2" x1={114} y1={6} x2={6} y2={114} stroke={N} {...S} />,
    <circle key="a" cx={60} cy={28} r={14} stroke={P} {...S} />,
    <rect   key="b" x={56} y={24} width={8} height={8} stroke={P} {...S} strokeOpacity={0.45} />,
    <rect   key="c" x={86} y={54} width={12} height={12} stroke={M} {...S} transform="rotate(45 92 60)" />,
    <circle key="d" cx={92} cy={60} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={60} cy={92} r={14} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={56} y={88} width={8} height={8} stroke={P} {...S} strokeOpacity={0.3} />,
    <rect   key="g" x={22} y={54} width={12} height={12} stroke={M} {...S} strokeOpacity={0.65} transform="rotate(45 28 60)" />,
    <circle key="h" cx={28} cy={60} r={4} stroke={M} {...S} strokeOpacity={0.3} />,
  ],

  /* Slash (/) · inscribed squares in concentric circles */
  [
    <line key="d1" x1={6} y1={114} x2={114} y2={6} stroke={N} {...S} />,
    <circle key="a" cx={42} cy={42} r={17} stroke={P} {...S} />,
    <rect   key="b" x={36} y={36} width={12} height={12} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={42} cy={42} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={26} y={62} width={8} height={8} stroke={M} {...S} />,
    <circle key="e" cx={78} cy={78} r={17} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={72} y={72} width={12} height={12} stroke={P} {...S} strokeOpacity={0.35} />,
    <circle key="g" cx={78} cy={78} r={4} stroke={P} {...S} strokeOpacity={0.18} />,
    <rect   key="h" x={86} y={50} width={8} height={8} stroke={M} {...S} strokeOpacity={0.6} />,
  ],

  /* Backslash (\) · mirrored diamonds across diagonal */
  [
    <line key="d1" x1={6} y1={6} x2={114} y2={114} stroke={N} {...S} />,
    <circle key="a" cx={78} cy={38} r={15} stroke={P} {...S} />,
    <rect   key="b" x={73} y={33} width={10} height={10} stroke={P} {...S} strokeOpacity={0.5} transform="rotate(45 78 38)" />,
    <circle key="c" cx={78} cy={38} r={4} stroke={P} {...S} strokeOpacity={0.25} />,
    <rect   key="d" x={90} y={50} width={8} height={8} stroke={M} {...S} />,
    <circle key="e" cx={38} cy={78} r={15} stroke={P} {...S} strokeOpacity={0.7} />,
    <rect   key="f" x={33} y={73} width={10} height={10} stroke={P} {...S} strokeOpacity={0.35} transform="rotate(45 38 78)" />,
    <circle key="g" cx={38} cy={78} r={4} stroke={P} {...S} strokeOpacity={0.18} />,
    <rect   key="h" x={50} y={90} width={8} height={8} stroke={M} {...S} strokeOpacity={0.6} />,
  ],

  /* Y trisection · 3-fold with mixed shapes */
  [
    <line key="d1" x1={60} y1={60} x2={60} y2={0} stroke={N} {...S} />,
    <line key="d2" x1={60} y1={60} x2={11.5} y2={88} stroke={N} {...S} />,
    <line key="d3" x1={60} y1={60} x2={108.5} y2={88} stroke={N} {...S} />,
    <circle key="a" cx={38} cy={30} r={12} stroke={P} {...S} />,
    <rect   key="b" x={34} y={26} width={8} height={8} stroke={P} {...S} strokeOpacity={0.4} />,
    <rect   key="c" x={76} y={24} width={12} height={12} stroke={M} {...S} transform="rotate(45 82 30)" />,
    <circle key="d" cx={82} cy={30} r={4} stroke={M} {...S} strokeOpacity={0.4} />,
    <circle key="e" cx={60} cy={92} r={15} stroke={P} {...S} strokeOpacity={0.8} />,
    <rect   key="f" x={55} y={87} width={10} height={10} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="g" cx={60} cy={92} r={4} stroke={P} {...S} strokeOpacity={0.2} />,
  ],

  /* Three columns (||) · rects and circles stepping */
  [
    <line key="d1" x1={40} y1={0} x2={40} y2={120} stroke={N} {...S} />,
    <line key="d2" x1={80} y1={0} x2={80} y2={120} stroke={N} {...S} />,
    <circle key="a" cx={25} cy={36} r={8} stroke={P} {...S} />,
    <rect   key="b" x={21} y={64} width={8} height={8} stroke={P} {...S} strokeOpacity={0.5} />,
    <circle key="c" cx={25} cy={94} r={7} stroke={P} {...S} strokeOpacity={0.35} />,
    <rect   key="d" x={52} y={26} width={16} height={16} stroke={M} {...S} />,
    <circle key="e" cx={60} cy={60} r={13} stroke={M} {...S} strokeOpacity={0.55} />,
    <rect   key="f" x={55} y={86} width={10} height={10} stroke={M} {...S} strokeOpacity={0.3} />,
    <circle key="g" cx={95} cy={44} r={8} stroke={P} {...S} strokeOpacity={0.8} />,
    <rect   key="h" x={91} y={72} width={8} height={8} stroke={P} {...S} strokeOpacity={0.4} />,
    <circle key="i" cx={95} cy={100} r={6} stroke={P} {...S} strokeOpacity={0.55} />,
  ],
];

/* ── CSS ─────────────────────────────────────────────────────── */

const STYLE_BLOCK = `
@keyframes hlf-draw {
  0%   { stroke-dashoffset: 1; opacity: 0; }
  4%   { opacity: 1; }
  32%  { stroke-dashoffset: 0; }
  68%  { stroke-dashoffset: 0; }
  96%  { opacity: 1; }
  100% { stroke-dashoffset: -1; opacity: 0; }
}
.hero-logo-field {
  --hlf-pri: var(--s-primary, oklch(0.55 0.2 275));
  --hlf-mid: color-mix(
    in oklch,
    var(--s-primary, oklch(0.55 0.2 275)) 40%,
    var(--s-text-muted, oklch(0.55 0 0))
  );
}
`;

/* ── Shared render helper ────────────────────────────────────── */

function renderVariant(elements: V) {
  return elements.map((el, i) =>
    cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, {
      style: {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `hlf-draw ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${i * STAGGER_MS}ms both`,
      },
    }),
  );
}

/* ── Components ──────────────────────────────────────────────── */

export function HeroLogoField() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % VARIANTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [mounted]);

  const variant = VARIANTS[idx];

  return (
    <div
      className="hero-logo-field"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <svg
        key={idx}
        viewBox="-12 -12 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 420,
          height: 420,
          opacity: mounted ? 0.4 : 0,
          color: "var(--s-text-muted)",
          transition: "opacity 600ms ease",
        }}
      >
        {/* Registration marks — overshoot the corners */}
        <line x1={-8} y1={0} x2={128} y2={0} stroke="currentColor" strokeWidth={0.4} opacity={0.7} />
        <line x1={-8} y1={120} x2={128} y2={120} stroke="currentColor" strokeWidth={0.4} opacity={0.7} />
        <line x1={0} y1={-8} x2={0} y2={128} stroke="currentColor" strokeWidth={0.4} opacity={0.7} />
        <line x1={120} y1={-8} x2={120} y2={128} stroke="currentColor" strokeWidth={0.4} opacity={0.7} />

        {renderVariant(variant)}
      </svg>
    </div>
  );
}

export function FooterLogo() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % VARIANTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const variant = VARIANTS[idx];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />
      <svg
        key={idx}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        className="hero-logo-field"
        style={{ color: "var(--s-text-muted)" }}
        aria-hidden="true"
      >
        {renderVariant(variant)}
      </svg>
    </>
  );
}

export function NavbarLogo() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
    >
      <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill="currentColor" />
      <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill="currentColor" />
      <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill="currentColor" />
      <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill="var(--s-primary, #6366f1)" />
    </svg>
  );
}
