"use client";

import { useEffect, useState, cloneElement } from "react";
import type { ReactElement } from "react";

const CYCLE_MS = 4200;
const STAGGER_MS = 40;
const ANIM_MS = 3400;

const P = { fill: "none" as const, strokeWidth: 0.25, pathLength: 1 };

type V = ReactElement[];

const VARIANTS: V[] = [
  // v1 — Circles
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

  // v2 — Mixed shapes
  [
    <line key="a" x1={60} y1={4} x2={60} y2={116} stroke="currentColor" {...P} />,
    <line key="b" x1={4} y1={60} x2={116} y2={60} stroke="currentColor" {...P} />,
    <rect key="c" x={12} y={12} width={18} height={18} stroke="#c7d2fe" {...P} />,
    <rect key="d" x={34} y={12} width={18} height={18} stroke="#a5b4fc" {...P} />,
    <rect key="e" x={12} y={34} width={18} height={18} stroke="#818cf8" {...P} />,
    <rect key="f" x={34} y={34} width={18} height={18} stroke="#6366f1" {...P} />,
    <rect key="g" x={74} y={18} width={14} height={14} stroke="#ea580c" {...P} transform="rotate(45 81 25)" />,
    <circle key="h" cx={81} cy={25} r={16} stroke="#ea580c" {...P} opacity={0.5} />,
    <rect key="i" x={94} y={34} width={10} height={10} stroke="#f97316" {...P} transform="rotate(45 99 39)" />,
    <polygon key="j" points="20,76 36,104 4,104" stroke="#22c55e" {...P} />,
    <polygon key="k" points="42,86 52,104 32,104" stroke="#16a34a" {...P} />,
    <polygon key="l" points="50,96 54,104 46,104" stroke="#15803d" {...P} />,
    <polygon key="m" points="90,68 108,78 108,98 90,108 72,98 72,78" stroke="#d946ef" {...P} />,
    <polygon key="n" points="90,76 100,82 100,94 90,100 80,94 80,82" stroke="#f0abfc" {...P} />,
  ],

  // v3 — Gradient dots with orbit rings
  [
    <line key="a" x1={60} y1={0} x2={60} y2={120} stroke="currentColor" {...P} />,
    <line key="b" x1={0} y1={60} x2={120} y2={60} stroke="currentColor" {...P} />,
    <circle key="c" cx={20} cy={20} r={14} stroke="#c7d2fe" {...P} />,
    <circle key="d" cx={20} cy={20} r={20} stroke="#c7d2fe" {...P} opacity={0.5} />,
    <circle key="e" cx={44} cy={20} r={10} stroke="#a5b4fc" {...P} />,
    <circle key="f" cx={20} cy={44} r={7} stroke="#818cf8" {...P} />,
    <circle key="g" cx={44} cy={44} r={5} stroke="#6366f1" {...P} />,
    <circle key="h" cx={82} cy={28} r={14} stroke="#ea580c" {...P} />,
    <circle key="i" cx={82} cy={28} r={20} stroke="#ea580c" {...P} opacity={0.4} />,
    <circle key="j" cx={100} cy={46} r={7} stroke="#f97316" {...P} />,
    <circle key="k" cx={30} cy={90} r={16} stroke="#22c55e" {...P} />,
    <circle key="l" cx={30} cy={90} r={22} stroke="#22c55e" {...P} opacity={0.4} />,
    <circle key="m" cx={76} cy={76} r={5} stroke="#ec4899" {...P} />,
    <circle key="n" cx={92} cy={84} r={9} stroke="#d946ef" {...P} />,
    <circle key="o" cx={98} cy={104} r={12} stroke="#a855f7" {...P} />,
    <line key="p" x1={76} y1={76} x2={98} y2={104} stroke="#d946ef" {...P} opacity={0.35} />,
  ],

  // v4 — Outline / dashed concentric
  [
    <line key="a" x1={60} y1={2} x2={60} y2={118} stroke="currentColor" {...P} />,
    <line key="b" x1={2} y1={60} x2={118} y2={60} stroke="currentColor" {...P} />,
    <circle key="c" cx={22} cy={22} r={10} stroke="#c7d2fe" {...P} />,
    <circle key="d" cx={44} cy={22} r={10} stroke="#a5b4fc" {...P} />,
    <circle key="e" cx={22} cy={44} r={10} stroke="#818cf8" {...P} />,
    <circle key="f" cx={44} cy={44} r={10} stroke="#6366f1" {...P} />,
    <circle key="g" cx={84} cy={28} r={14} stroke="#ea580c" {...P} />,
    <circle key="h" cx={100} cy={44} r={9} stroke="#f97316" {...P} />,
    <circle key="i" cx={30} cy={88} r={16} stroke="#22c55e" {...P} />,
    <path key="j" d="M 30 72 A 16 16 0 0 1 30 104" stroke="#16a34a" {...P} />,
    <circle key="k" cx={30} cy={88} r={20} stroke="#22c55e" {...P} opacity={0.5} />,
    <circle key="l" cx={90} cy={90} r={22} stroke="#d946ef" {...P} />,
    <circle key="m" cx={90} cy={90} r={15} stroke="#ec4899" {...P} />,
    <circle key="n" cx={90} cy={90} r={7} stroke="#f472b6" {...P} />,
  ],

  // v5 — Asymmetric clusters with echo rings
  [
    <line key="a" x1={60} y1={2} x2={60} y2={118} stroke="currentColor" {...P} />,
    <line key="b" x1={2} y1={60} x2={118} y2={60} stroke="currentColor" {...P} />,
    <circle key="c" cx={18} cy={18} r={8} stroke="#c7d2fe" {...P} />,
    <circle key="d" cx={18} cy={18} r={13} stroke="#c7d2fe" {...P} opacity={0.4} />,
    <circle key="e" cx={36} cy={16} r={6} stroke="#a5b4fc" {...P} />,
    <circle key="f" cx={48} cy={26} r={5} stroke="#818cf8" {...P} />,
    <circle key="g" cx={20} cy={38} r={9} stroke="#6366f1" {...P} />,
    <circle key="h" cx={20} cy={38} r={14} stroke="#6366f1" {...P} opacity={0.35} />,
    <circle key="i" cx={42} cy={46} r={4} stroke="#4f46e5" {...P} />,
    <circle key="j" cx={90} cy={30} r={18} stroke="#ea580c" {...P} />,
    <circle key="k" cx={90} cy={30} r={26} stroke="#ea580c" {...P} opacity={0.35} />,
    <circle key="l" cx={28} cy={78} r={10} stroke="#22c55e" {...P} />,
    <circle key="m" cx={40} cy={100} r={13} stroke="#059669" {...P} />,
    <line key="n" x1={28} y1={88} x2={40} y2={87} stroke="#22c55e" {...P} opacity={0.4} />,
    <circle key="o" cx={76} cy={76} r={12} stroke="#d946ef" {...P} />,
    <circle key="p" cx={94} cy={90} r={8} stroke="#ec4899" {...P} />,
    <circle key="q" cx={106} cy={104} r={6} stroke="#f472b6" {...P} />,
    <line key="r" x1={76} y1={76} x2={106} y2={104} stroke="#d946ef" {...P} opacity={0.3} />,
  ],

  // v6 — Monochrome
  [
    <line key="a" x1={60} y1={2} x2={60} y2={118} stroke="currentColor" {...P} />,
    <line key="b" x1={2} y1={60} x2={118} y2={60} stroke="currentColor" {...P} />,
    <circle key="c" cx={22} cy={22} r={10} stroke="currentColor" {...P} opacity={1} />,
    <circle key="d" cx={44} cy={22} r={10} stroke="currentColor" {...P} opacity={0.7} />,
    <circle key="e" cx={22} cy={44} r={10} stroke="currentColor" {...P} opacity={0.5} />,
    <circle key="f" cx={44} cy={44} r={10} stroke="currentColor" {...P} opacity={0.35} />,
    <circle key="g" cx={84} cy={28} r={14} stroke="currentColor" {...P} opacity={0.85} />,
    <circle key="h" cx={100} cy={44} r={8} stroke="currentColor" {...P} opacity={0.5} />,
    <circle key="i" cx={30} cy={88} r={14} stroke="currentColor" {...P} opacity={0.65} />,
    <circle key="j" cx={30} cy={88} r={20} stroke="currentColor" {...P} opacity={0.3} />,
    <circle key="k" cx={80} cy={78} r={7} stroke="currentColor" {...P} opacity={0.4} />,
    <circle key="l" cx={98} cy={82} r={10} stroke="currentColor" {...P} opacity={0.6} />,
    <circle key="m" cx={90} cy={104} r={8} stroke="currentColor" {...P} opacity={0.8} />,
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
        viewBox="0 0 120 120"
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
        {variant.map((el, i) =>
          cloneElement(el, {
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
