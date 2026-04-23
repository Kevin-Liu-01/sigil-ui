"use client";

import React, { useEffect, useState, cloneElement } from "react";
import type { ReactElement } from "react";

const CYCLE_MS = 4200;
const STAGGER_MS = 40;
const ANIM_MS = 3400;

const P = { fill: "none" as const, strokeWidth: 0.25, pathLength: 1 };

type V = ReactElement[];

const VARIANTS: V[] = [
  // v1 — Plus (+) divider, circles
  [
    <line key="a" x1={60} y1={4} x2={60} y2={116} stroke="currentColor" {...P} />,
    <line key="b" x1={4} y1={60} x2={116} y2={60} stroke="currentColor" {...P} />,
    <circle key="c" cx={22} cy={22} r={10} stroke="#c7d2fe" {...P} />,
    <circle key="d" cx={44} cy={22} r={10} stroke="#a5b4fc" {...P} />,
    <circle key="e" cx={22} cy={44} r={10} stroke="#818cf8" {...P} />,
    <circle key="f" cx={44} cy={44} r={10} stroke="#6366f1" {...P} />,
    <circle key="g" cx={82} cy={26} r={16} stroke="#ea580c" {...P} />,
    <circle key="h" cx={100} cy={44} r={6} stroke="#f97316" {...P} />,
    <circle key="i" cx={24} cy={80} r={12} stroke="#22c55e" {...P} />,
    <circle key="j" cx={42} cy={92} r={8} stroke="#16a34a" {...P} />,
    <circle key="k" cx={32} cy={108} r={5} stroke="#15803d" {...P} />,
    <circle key="l" cx={90} cy={90} r={22} stroke="#d946ef" {...P} />,
  ],

  // v2 — X divider, mixed shapes in triangular wedges
  [
    <line key="a" x1={10} y1={10} x2={110} y2={110} stroke="currentColor" {...P} />,
    <line key="b" x1={110} y1={10} x2={10} y2={110} stroke="currentColor" {...P} />,
    <rect key="c" x={46} y={14} width={12} height={12} stroke="#c7d2fe" {...P} />,
    <rect key="d" x={62} y={14} width={12} height={12} stroke="#a5b4fc" {...P} />,
    <rect key="e" x={54} y={30} width={12} height={12} stroke="#6366f1" {...P} />,
    <rect key="f" x={86} y={50} width={12} height={12} stroke="#ea580c" {...P} transform="rotate(45 92 56)" />,
    <rect key="g" x={94} y={62} width={10} height={10} stroke="#f97316" {...P} transform="rotate(45 99 67)" />,
    <polygon key="h" points="60,82 74,90 74,106 60,114 46,106 46,90" stroke="#d946ef" {...P} />,
    <polygon key="i" points="60,88 68,93 68,103 60,108 52,103 52,93" stroke="#f0abfc" {...P} />,
    <polygon key="j" points="30,52 38,66 22,66" stroke="#22c55e" {...P} />,
    <polygon key="k" points="18,56 22,64 14,64" stroke="#16a34a" {...P} />,
  ],

  // v3 — Forward slash (/) divider, shapes in 2 halves
  [
    <line key="a" x1={10} y1={110} x2={110} y2={10} stroke="currentColor" {...P} />,
    <circle key="b" cx={80} cy={20} r={14} stroke="#c7d2fe" {...P} />,
    <circle key="c" cx={80} cy={20} r={20} stroke="#c7d2fe" {...P} opacity={0.5} />,
    <circle key="d" cx={100} cy={28} r={8} stroke="#a5b4fc" {...P} />,
    <circle key="e" cx={92} cy={46} r={10} stroke="#ea580c" {...P} />,
    <circle key="f" cx={70} cy={38} r={6} stroke="#818cf8" {...P} />,
    <circle key="g" cx={28} cy={82} r={16} stroke="#22c55e" {...P} />,
    <circle key="h" cx={28} cy={82} r={22} stroke="#22c55e" {...P} opacity={0.4} />,
    <circle key="i" cx={46} cy={96} r={9} stroke="#d946ef" {...P} />,
    <circle key="j" cx={22} cy={104} r={6} stroke="#16a34a" {...P} />,
  ],

  // v4 — Backslash (\) divider, shapes in 2 halves
  [
    <line key="a" x1={10} y1={10} x2={110} y2={110} stroke="currentColor" {...P} />,
    <circle key="b" cx={22} cy={24} r={10} stroke="#c7d2fe" {...P} />,
    <circle key="c" cx={42} cy={20} r={8} stroke="#a5b4fc" {...P} />,
    <circle key="d" cx={28} cy={44} r={12} stroke="#6366f1" {...P} />,
    <circle key="e" cx={28} cy={44} r={17} stroke="#6366f1" {...P} opacity={0.4} />,
    <circle key="f" cx={50} cy={38} r={5} stroke="#818cf8" {...P} />,
    <circle key="g" cx={90} cy={80} r={18} stroke="#d946ef" {...P} />,
    <circle key="h" cx={90} cy={80} r={24} stroke="#d946ef" {...P} opacity={0.4} />,
    <circle key="i" cx={76} cy={96} r={8} stroke="#ea580c" {...P} />,
    <circle key="j" cx={100} cy={102} r={6} stroke="#f97316" {...P} />,
  ],

  // v5 — Y trisection divider, shapes in 3 sectors
  [
    <line key="a" x1={60} y1={60} x2={60} y2={4} stroke="currentColor" {...P} />,
    <line key="b" x1={60} y1={60} x2={11.5} y2={88} stroke="currentColor" {...P} />,
    <line key="c" x1={60} y1={60} x2={108.5} y2={88} stroke="currentColor" {...P} />,
    <circle key="d" cx={40} cy={20} r={10} stroke="#c7d2fe" {...P} />,
    <circle key="e" cx={40} cy={20} r={15} stroke="#c7d2fe" {...P} opacity={0.4} />,
    <circle key="f" cx={80} cy={20} r={8} stroke="#a5b4fc" {...P} />,
    <circle key="g" cx={60} cy={36} r={6} stroke="#818cf8" {...P} />,
    <circle key="h" cx={24} cy={86} r={12} stroke="#22c55e" {...P} />,
    <circle key="i" cx={40} cy={100} r={8} stroke="#16a34a" {...P} />,
    <circle key="j" cx={90} cy={82} r={14} stroke="#d946ef" {...P} />,
    <circle key="k" cx={90} cy={82} r={20} stroke="#d946ef" {...P} opacity={0.35} />,
    <circle key="l" cx={100} cy={100} r={6} stroke="#ea580c" {...P} />,
  ],

  // v6 — 3-column divider (||), monochrome
  [
    <line key="a" x1={40} y1={4} x2={40} y2={116} stroke="currentColor" {...P} />,
    <line key="b" x1={80} y1={4} x2={80} y2={116} stroke="currentColor" {...P} />,
    <circle key="c" cx={20} cy={28} r={10} stroke="currentColor" {...P} opacity={1} />,
    <circle key="d" cx={20} cy={52} r={8} stroke="currentColor" {...P} opacity={0.6} />,
    <circle key="e" cx={20} cy={90} r={14} stroke="currentColor" {...P} opacity={0.35} />,
    <circle key="f" cx={60} cy={20} r={12} stroke="currentColor" {...P} opacity={0.85} />,
    <circle key="g" cx={60} cy={60} r={16} stroke="currentColor" {...P} opacity={0.5} />,
    <circle key="h" cx={60} cy={60} r={22} stroke="currentColor" {...P} opacity={0.25} />,
    <circle key="i" cx={60} cy={100} r={8} stroke="currentColor" {...P} opacity={0.7} />,
    <circle key="j" cx={100} cy={36} r={8} stroke="currentColor" {...P} opacity={0.65} />,
    <circle key="k" cx={100} cy={76} r={12} stroke="currentColor" {...P} opacity={0.8} />,
  ],
];

const DRAW_CSS = `
@keyframes stroke-draw {
  0%   { stroke-dashoffset: 1; opacity: 0; }
  4%   { opacity: 1; }
  32%  { stroke-dashoffset: 0; }
  68%  { stroke-dashoffset: 0; }
  96%  { opacity: 1; }
  100% { stroke-dashoffset: -1; opacity: 0; }
}
`;

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
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: DRAW_CSS }} />
      <svg
        key={idx}
        viewBox="-12 -12 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: "-2%",
          top: "4%",
          width: 420,
          height: 420,
          opacity: mounted ? 0.22 : 0,
          color: "var(--s-text-muted)",
        }}
      >
        {/* Registration-mark frame — edges overshoot corners */}
        <line x1={-8} y1={0} x2={128} y2={0} stroke="currentColor" strokeWidth={0.25} opacity={0.6} />
        <line x1={-8} y1={120} x2={128} y2={120} stroke="currentColor" strokeWidth={0.25} opacity={0.6} />
        <line x1={0} y1={-8} x2={0} y2={128} stroke="currentColor" strokeWidth={0.25} opacity={0.6} />
        <line x1={120} y1={-8} x2={120} y2={128} stroke="currentColor" strokeWidth={0.25} opacity={0.6} />

        {variant.map((el, i) =>
          cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, {
            style: {
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `stroke-draw ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${i * STAGGER_MS}ms both`,
            },
          })
        )}
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
      <style dangerouslySetInnerHTML={{ __html: DRAW_CSS }} />
      <svg
        key={idx}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        style={{ color: "var(--s-text-muted)" }}
        aria-hidden="true"
      >
        {variant.map((el, i) =>
          cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, {
            style: {
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `stroke-draw ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${i * STAGGER_MS}ms both`,
            },
          })
        )}
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
      {/* TL — stepped edge, rotated cut */}
      <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill="currentColor" />
      <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill="currentColor" />
      <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill="currentColor" />
      <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill="#6366f1" />
    </svg>
  );
}
