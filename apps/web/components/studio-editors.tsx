"use client";

import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";

/* ================================================================== */
/*  Spring simulation                                                  */
/* ================================================================== */

type SpringParams = { stiffness: number; damping: number; mass: number };

function timeToPhysics(duration: number, bounce: number): SpringParams {
  const omega = (2 * Math.PI) / Math.max(duration, 0.04);
  const stiffness = omega * omega;
  const zeta = Math.max(0.0001, 1 - Math.min(bounce, 0.999));
  const damping = 2 * zeta * Math.sqrt(stiffness);
  return { stiffness, damping, mass: 1 };
}

function physicsToTime(p: SpringParams): { duration: number; bounce: number } {
  const omega = Math.sqrt(p.stiffness / Math.max(p.mass, 0.01));
  const zeta = p.damping / (2 * Math.sqrt(p.stiffness * Math.max(p.mass, 0.01)));
  return {
    duration: Math.max(0.05, (2 * Math.PI) / omega),
    bounce: Math.max(0, Math.min(1, 1 - zeta)),
  };
}

function simulateSpring(params: SpringParams, steps = 200): number[] {
  const { stiffness, damping, mass } = params;
  const omega = Math.sqrt(stiffness / Math.max(mass, 0.001));
  const zeta = damping / (2 * Math.sqrt(stiffness * Math.max(mass, 0.001)));
  const settle = zeta > 0.01 ? Math.min(6 / (zeta * omega), 4) : 4;
  const dt = settle / steps;
  let x = 0;
  let v = 0;
  const pts: number[] = [0];
  for (let i = 1; i <= steps; i++) {
    const f = -stiffness * (x - 1) - damping * v;
    v += (f / mass) * dt;
    x += v * dt;
    pts.push(x);
  }
  return pts;
}

function springToCss(bounce: number): string {
  const y1 = 1 + bounce * 0.56;
  const x1 = Math.max(0, 0.34 - bounce * 0.16);
  const x2 = Math.min(1, 0.64 + bounce * 0.08);
  return `cubic-bezier(${x1.toFixed(2)}, ${y1.toFixed(2)}, ${x2.toFixed(2)}, 1)`;
}

/* ================================================================== */
/*  Easing simulation                                                  */
/* ================================================================== */

type BezierPoint = [number, number, number, number];

const EASING_PRESETS: Record<string, BezierPoint> = {
  "ease-out-expo": [0.16, 1, 0.3, 1],
  "ease-in-out": [0.45, 0, 0.55, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.68, -0.55, 0.27, 1.55],
  "ease-out": [0, 0, 0.2, 1],
  "ease-in": [0.4, 0, 1, 1],
  snappy: [0.2, 0, 0, 1],
  linear: [0, 0, 1, 1],
};

function parseBezier(css: string): BezierPoint | null {
  const m = css.match(
    /cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/,
  );
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])];
}

function sampleBezierY(
  p: BezierPoint,
  steps = 200,
): number[] {
  const [x1, y1, x2, y2] = p;
  const pts: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sx = ((ax * t + bx) * t + cx) * t;
    const sy = ((ay * t + by) * t + cy) * t;
    pts.push(sy);
    void sx;
  }
  return pts;
}

/* ================================================================== */
/*  Shared styling constants                                           */
/* ================================================================== */

const FONT = '"PP Telegraf", "PP Mori", system-ui, sans-serif';
const FONT_MONO = '"PP Fraktion Mono", ui-monospace, monospace';
const FONT_DISPLAY = '"PP Mori", system-ui, sans-serif';

/* ================================================================== */
/*  Micro Controls (match devbar style)                                */
/* ================================================================== */

function MiniSlider({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 26 }}>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 9.5,
          fontWeight: 500,
          color: "var(--db-muted)",
          width: 72,
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, position: "relative", height: 14 }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 3,
            transform: "translateY(-50%)",
            borderRadius: 1.5,
            background: "var(--db-border)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${pct}%`,
            height: 3,
            transform: "translateY(-50%)",
            borderRadius: 1.5,
            background: "var(--db-accent)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--db-accent)",
            border: "1.5px solid var(--db-bg)",
            boxShadow: "0 0 0 0.5px var(--db-accent)",
            pointerEvents: "none",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 9.5,
          fontWeight: 500,
          color: "var(--db-text2)",
          width: 40,
          textAlign: "right",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayValue ?? value.toFixed(step < 1 ? 2 : 0)}
      </span>
    </div>
  );
}

function MiniSegmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 5,
        border: "1px solid var(--db-border)",
        overflow: "hidden",
        background: "var(--db-bg)",
      }}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: "3px 10px",
              border: "none",
              background: active ? "var(--db-accent-dim)" : "transparent",
              fontFamily: FONT,
              fontSize: 9,
              fontWeight: active ? 600 : 400,
              color: active ? "var(--db-accent)" : "var(--db-muted)",
              cursor: "pointer",
              transition: "all 120ms ease-out",
              borderRight:
                opt !== options[options.length - 1]
                  ? "1px solid var(--db-border)"
                  : "none",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  SVG Curve Component                                                */
/* ================================================================== */

function CurveCanvas({ points, label }: { points: number[]; label?: string }) {
  const W = 220;
  const H = 90;
  const PAD_X = 8;
  const PAD_TOP = 8;
  const PAD_BOT = 4;
  const plotW = W - PAD_X * 2;
  const plotH = H - PAD_TOP - PAD_BOT;

  const yMin = Math.min(0, ...points) - 0.05;
  const yMax = Math.max(1.05, ...points) + 0.05;

  const toX = (i: number) => PAD_X + (i / (points.length - 1)) * plotW;
  const toY = (v: number) =>
    PAD_TOP + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const pathD = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");

  const targetY = toY(1);

  return (
    <div
      style={{
        borderRadius: 6,
        background: "var(--db-bg)",
        border: "1px solid var(--db-border)",
        padding: "6px 2px 2px",
        position: "relative",
      }}
    >
      {label && (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 8,
            fontFamily: FONT_MONO,
            fontSize: 7,
            color: "var(--db-muted)",
            opacity: 0.5,
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      )}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", width: "100%" }}
      >
        {/* target line at y=1 */}
        <line
          x1={PAD_X}
          y1={targetY}
          x2={W - PAD_X}
          y2={targetY}
          stroke="var(--db-muted)"
          strokeWidth={0.5}
          strokeDasharray="3 2"
          opacity={0.4}
        />
        {/* zero line */}
        <line
          x1={PAD_X}
          y1={toY(0)}
          x2={W - PAD_X}
          y2={toY(0)}
          stroke="var(--db-muted)"
          strokeWidth={0.5}
          opacity={0.15}
        />
        {/* curve */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--db-accent)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* endpoint dot */}
        <circle
          cx={toX(points.length - 1)}
          cy={toY(points[points.length - 1])}
          r={2}
          fill="var(--db-accent)"
        />
      </svg>
    </div>
  );
}

/* ================================================================== */
/*  Spring Curve Editor                                                */
/* ================================================================== */

type SpringMode = "Time" | "Physics";

export type SpringCurveEditorProps = {
  duration: number;
  bounce: number;
  onDurationChange: (seconds: number) => void;
  onBounceChange: (bounce: number) => void;
  onEasingChange?: (css: string) => void;
};

export function SpringCurveEditor({
  duration,
  bounce,
  onDurationChange,
  onBounceChange,
  onEasingChange,
}: SpringCurveEditorProps) {
  const [mode, setMode] = useState<SpringMode>("Time");
  const [physics, setPhysics] = useState<SpringParams>(() =>
    timeToPhysics(duration, bounce),
  );

  const isSyncing = useRef(false);

  useEffect(() => {
    if (mode === "Time" && !isSyncing.current) {
      setPhysics(timeToPhysics(duration, bounce));
    }
  }, [duration, bounce, mode]);

  const handleTimeChange = useCallback(
    (d: number, b: number) => {
      isSyncing.current = true;
      onDurationChange(d);
      onBounceChange(b);
      onEasingChange?.(springToCss(b));
      setPhysics(timeToPhysics(d, b));
      requestAnimationFrame(() => {
        isSyncing.current = false;
      });
    },
    [onDurationChange, onBounceChange, onEasingChange],
  );

  const handlePhysicsChange = useCallback(
    (p: SpringParams) => {
      isSyncing.current = true;
      setPhysics(p);
      const t = physicsToTime(p);
      onDurationChange(t.duration);
      onBounceChange(t.bounce);
      onEasingChange?.(springToCss(t.bounce));
      requestAnimationFrame(() => {
        isSyncing.current = false;
      });
    },
    [onDurationChange, onBounceChange, onEasingChange],
  );

  const curvePoints = useMemo(() => {
    const p = mode === "Time" ? timeToPhysics(duration, bounce) : physics;
    return simulateSpring(p);
  }, [mode, duration, bounce, physics]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <CurveCanvas points={curvePoints} label="spring" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          minHeight: 26,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 9.5,
            fontWeight: 500,
            color: "var(--db-muted)",
            width: 72,
            flexShrink: 0,
          }}
        >
          Type
        </span>
        <MiniSegmented
          options={["Time", "Physics"] as const}
          value={mode}
          onChange={setMode}
        />
      </div>

      {mode === "Time" ? (
        <>
          <MiniSlider
            label="Duration"
            value={duration}
            min={0.05}
            max={2.0}
            step={0.01}
            displayValue={duration.toFixed(2)}
            onChange={(v) => handleTimeChange(v, bounce)}
          />
          <MiniSlider
            label="Bounce"
            value={bounce}
            min={0}
            max={1}
            step={0.01}
            displayValue={bounce.toFixed(2)}
            onChange={(v) => handleTimeChange(duration, v)}
          />
        </>
      ) : (
        <>
          <MiniSlider
            label="Stiffness"
            value={physics.stiffness}
            min={10}
            max={1000}
            step={5}
            displayValue={physics.stiffness.toFixed(0)}
            onChange={(v) =>
              handlePhysicsChange({ ...physics, stiffness: v })
            }
          />
          <MiniSlider
            label="Damping"
            value={physics.damping}
            min={1}
            max={100}
            step={1}
            displayValue={physics.damping.toFixed(0)}
            onChange={(v) =>
              handlePhysicsChange({ ...physics, damping: v })
            }
          />
          <MiniSlider
            label="Mass"
            value={physics.mass}
            min={0.1}
            max={10}
            step={0.1}
            displayValue={physics.mass.toFixed(1)}
            onChange={(v) =>
              handlePhysicsChange({ ...physics, mass: v })
            }
          />
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Easing Curve Editor                                                */
/* ================================================================== */

export type EasingCurveEditorProps = {
  easing: string;
  onEasingChange: (css: string) => void;
};

export function EasingCurveEditor({
  easing,
  onEasingChange,
}: EasingCurveEditorProps) {
  const bezier = useMemo(() => parseBezier(easing), [easing]);
  const curvePoints = useMemo(
    () => sampleBezierY(bezier ?? [0.16, 1, 0.3, 1]),
    [bezier],
  );

  const activePreset = useMemo(() => {
    if (!bezier) return null;
    for (const [name, pts] of Object.entries(EASING_PRESETS)) {
      if (
        pts.every(
          (v, i) => Math.abs(v - bezier[i]) < 0.02,
        )
      )
        return name;
    }
    return null;
  }, [bezier]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <CurveCanvas points={curvePoints} label="easing" />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {Object.entries(EASING_PRESETS).map(([name, pts]) => {
          const active = activePreset === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() =>
                onEasingChange(
                  `cubic-bezier(${pts[0]}, ${pts[1]}, ${pts[2]}, ${pts[3]})`,
                )
              }
              style={{
                padding: "3px 7px",
                borderRadius: 4,
                border: active
                  ? "1px solid var(--db-accent)"
                  : "1px solid var(--db-border)",
                background: active ? "var(--db-accent-dim)" : "transparent",
                fontFamily: FONT,
                fontSize: 8,
                fontWeight: active ? 600 : 400,
                color: active ? "var(--db-accent)" : "var(--db-muted)",
                cursor: "pointer",
                transition: "all 120ms ease-out",
                lineHeight: 1.4,
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 8,
          color: "var(--db-muted)",
          opacity: 0.6,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {easing}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SubSection (nested folder)                                         */
/* ================================================================== */

export function SubSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          stroke="var(--db-muted)"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{
            transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <path d="M2 1l4 3-4 3" />
        </svg>
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 9,
            fontWeight: 500,
            color: "var(--db-text2)",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 500 : 0,
          opacity: open ? 1 : 0,
          transition:
            "max-height 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease",
          paddingLeft: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            paddingBottom: 6,
            borderLeft: "1px solid var(--db-border)",
            paddingLeft: 10,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
