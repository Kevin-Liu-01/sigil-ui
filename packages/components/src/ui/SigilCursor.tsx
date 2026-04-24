"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { cn } from "../utils";

export type SigilCursorVariant = "sigil" | "ring" | "dot" | "crosshair";

type CursorStyle = CSSProperties &
  Record<`--s-cursor-${string}`, string | number | undefined>;

export type SigilCursorProps = Omit<ComponentPropsWithoutRef<"div">, "color"> & {
  /** Enable the custom cursor. @default true */
  enabled?: boolean;
  /** Hide the native cursor while this component is mounted. @default true */
  hideNative?: boolean;
  /** Cursor drawing style. @default "sigil" */
  variant?: SigilCursorVariant;
  /** Cursor outer size. Accepts a number of pixels or any CSS length. */
  size?: number | string;
  /** Center dot size. Accepts a number of pixels or any CSS length. */
  dotSize?: number | string;
  /** Primary cursor color. */
  color?: string;
  /** Ring stroke color. */
  ringColor?: string;
  /** Center dot color. */
  dotColor?: string;
  /** CSS mix-blend-mode value. */
  blendMode?: CSSProperties["mixBlendMode"];
};

const toCssLength = (value: number | string | undefined): string | undefined =>
  typeof value === "number" ? `${value}px` : value;

const cursorCss = `
.sigil-cursor {
  width: var(--s-cursor-size, 28px);
  height: var(--s-cursor-size, 28px);
  color: var(--s-cursor-color, var(--s-primary));
  opacity: 0;
  mix-blend-mode: var(--s-cursor-blend-mode, normal);
  transition:
    width var(--s-duration-fast, 150ms) var(--s-ease-default, ease),
    height var(--s-duration-fast, 150ms) var(--s-ease-default, ease),
    opacity var(--s-duration-fast, 150ms) var(--s-ease-default, ease);
}

.sigil-cursor[data-visible="true"] {
  opacity: var(--s-cursor-opacity, 0.95);
}

.sigil-cursor::before,
.sigil-cursor::after,
.sigil-cursor__tick {
  content: "";
  position: absolute;
  pointer-events: none;
}

.sigil-cursor::before {
  inset: 0;
  border: var(--s-cursor-stroke-width, 1.5px) solid var(--s-cursor-ring-color, var(--s-primary));
  border-radius: var(--s-cursor-radius, var(--s-radius-full));
  box-shadow: var(--s-cursor-glow, 0 0 0 transparent);
}

.sigil-cursor::after {
  left: 50%;
  top: 50%;
  width: var(--s-cursor-dot-size, 4px);
  height: var(--s-cursor-dot-size, 4px);
  background: var(--s-cursor-dot-color, var(--s-primary));
  border-radius: var(--s-radius-full);
  transform: translate(-50%, -50%);
}

.sigil-cursor__tick {
  background: var(--s-cursor-color, var(--s-primary));
  border-radius: var(--s-radius-full);
}

.sigil-cursor__tick--top,
.sigil-cursor__tick--bottom {
  left: 50%;
  width: var(--s-cursor-stroke-width, 1.5px);
  height: var(--s-cursor-tick-size, 7px);
  transform: translateX(-50%);
}

.sigil-cursor__tick--top {
  top: calc(var(--s-cursor-gap, 3px) * -1);
}

.sigil-cursor__tick--bottom {
  bottom: calc(var(--s-cursor-gap, 3px) * -1);
}

.sigil-cursor__tick--left,
.sigil-cursor__tick--right {
  top: 50%;
  width: var(--s-cursor-tick-size, 7px);
  height: var(--s-cursor-stroke-width, 1.5px);
  transform: translateY(-50%);
}

.sigil-cursor__tick--left {
  left: calc(var(--s-cursor-gap, 3px) * -1);
}

.sigil-cursor__tick--right {
  right: calc(var(--s-cursor-gap, 3px) * -1);
}

.sigil-cursor[data-pressed="true"] {
  width: calc(var(--s-cursor-size, 28px) * var(--s-button-active-scale, 0.97));
  height: calc(var(--s-cursor-size, 28px) * var(--s-button-active-scale, 0.97));
}

.sigil-cursor[data-variant="ring"] .sigil-cursor__tick,
.sigil-cursor[data-variant="dot"] .sigil-cursor__tick,
.sigil-cursor[data-variant="dot"]::before {
  display: none;
}

.sigil-cursor[data-variant="crosshair"]::before {
  border-color: transparent;
  box-shadow: none;
}

[data-sigil-cursor="custom"],
[data-sigil-cursor="custom"] * {
  cursor: none !important;
}

@media (pointer: coarse), (prefers-reduced-motion: reduce) {
  .sigil-cursor {
    display: none !important;
  }

  [data-sigil-cursor="custom"],
  [data-sigil-cursor="custom"] * {
    cursor: auto !important;
  }
}
`;

export const SigilCursor = forwardRef<HTMLDivElement, SigilCursorProps>(
  function SigilCursor(
    {
      enabled = true,
      hideNative = true,
      variant = "sigil",
      size,
      dotSize,
      color,
      ringColor,
      dotColor,
      blendMode,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const localRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
      if (!enabled) return;

      const cursor = localRef.current;
      if (!cursor) return;

      const root = document.documentElement;
      const previousCursorMode = root.getAttribute("data-sigil-cursor");
      const coarsePointer = window.matchMedia("(pointer: coarse)");
      if (coarsePointer.matches) return;

      let animationFrame = 0;
      let x = 0;
      let y = 0;

      const render = () => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        animationFrame = 0;
      };

      const queueRender = () => {
        if (animationFrame === 0) {
          animationFrame = window.requestAnimationFrame(render);
        }
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        x = event.clientX;
        y = event.clientY;
        setVisible(true);
        queueRender();
      };

      const handlePointerLeave = () => setVisible(false);
      const handlePointerDown = () => setPressed(true);
      const handlePointerUp = () => setPressed(false);

      if (hideNative) {
        root.setAttribute("data-sigil-cursor", "custom");
      }

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);

        if (hideNative) {
          if (previousCursorMode === null) {
            root.removeAttribute("data-sigil-cursor");
          } else {
            root.setAttribute("data-sigil-cursor", previousCursorMode);
          }
        }
      };
    }, [enabled, hideNative]);

    if (!enabled) return null;

    const cursorStyle: CursorStyle = {
      ...style,
      "--s-cursor-size": toCssLength(size),
      "--s-cursor-dot-size": toCssLength(dotSize),
      "--s-cursor-color": color,
      "--s-cursor-ring-color": ringColor,
      "--s-cursor-dot-color": dotColor,
      "--s-cursor-blend-mode": blendMode,
    };

    return (
      <>
        <style>{cursorCss}</style>
        <div
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          aria-hidden="true"
          data-pressed={pressed ? "true" : "false"}
          data-visible={visible ? "true" : "false"}
          data-variant={variant}
          className={cn(
            "sigil-cursor fixed left-0 top-0 pointer-events-none",
            "z-[var(--s-cursor-z-index,2147483647)]",
            className,
          )}
          style={cursorStyle}
          {...props}
        >
          <span className="sigil-cursor__tick sigil-cursor__tick--top" />
          <span className="sigil-cursor__tick sigil-cursor__tick--right" />
          <span className="sigil-cursor__tick sigil-cursor__tick--bottom" />
          <span className="sigil-cursor__tick sigil-cursor__tick--left" />
        </div>
      </>
    );
  },
);
