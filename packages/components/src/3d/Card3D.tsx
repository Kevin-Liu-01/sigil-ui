"use client";

import { forwardRef, useCallback, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees. @default 15 */
  maxTilt?: number;
  /** Scale factor on hover. @default 1.02 */
  scale?: number;
  /** Transition speed in ms. @default 400 */
  speed?: number;
  children?: ReactNode;
}

/** Card with perspective tilt on hover (vanilla-tilt effect via CSS + JS). */
export const Card3D = forwardRef<HTMLDivElement, Card3DProps>(function Card3D(
  { maxTilt = 15, scale = 1.02, speed = 400, className, children, style, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");

  const resolvedRef = (el: HTMLDivElement | null) => {
    (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    },
    [maxTilt, scale],
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  }, []);

  return (
    <div
      ref={resolvedRef}
      data-slot="card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "rounded-[var(--s-card-radius,8px)] border border-[color:var(--s-border)]",
        "bg-[var(--s-surface)] shadow-[var(--s-shadow-md)]",
        "will-change-transform",
        className,
      )}
      style={{
        transform,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
