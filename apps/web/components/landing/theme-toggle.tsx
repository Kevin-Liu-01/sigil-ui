"use client";

import { useState, useEffect } from "react";
import { Switch } from "@sigil-ui/components";
import { useThemeSwitch } from "@/components/theme-provider";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const SMOOTH = "cubic-bezier(0.16, 1, 0.3, 1)";

function MoonIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
        transition: `opacity 200ms ${SMOOTH}, transform 350ms ${SPRING}`,
        willChange: "transform, opacity",
        color: "oklch(0.45 0.12 260)",
      }}
    >
      <path
        d="M13.5 9.5a5.5 5.5 0 01-7-7 5.5 5.5 0 107 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x1: 8 + Math.cos(rad) * 4.5,
    y1: 8 + Math.sin(rad) * 4.5,
    x2: 8 + Math.cos(rad) * 6.2,
    y2: 8 + Math.sin(rad) * 6.2,
  };
});

function SunIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
        transition: `opacity 200ms ${SMOOTH}, transform 350ms ${SPRING}`,
        willChange: "transform, opacity",
        color: "oklch(0.55 0.18 50)",
      }}
    >
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      {RAYS.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transformOrigin: "8px 8px",
            transition: `opacity 150ms ${SMOOTH} ${visible ? 40 + i * 18 : 0}ms, transform 250ms ${SPRING} ${visible ? 40 + i * 18 : 0}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function SigilThemeToggle() {
  const { resolvedTheme, setTheme } = useThemeSwitch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return <div className="w-11 h-6" />;
  }

  return (
    <Switch
      size="lg"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      thumbIcon={
        <>
          <MoonIcon visible={isDark} />
          <SunIcon visible={!isDark} />
        </>
      }
    />
  );
}
