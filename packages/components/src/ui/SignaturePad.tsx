"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "../utils";

export interface SignaturePadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  onChange?: (dataUrl: string | null) => void;
  disabled?: boolean;
}

export const SignaturePad = forwardRef<HTMLDivElement, SignaturePadProps>(function SignaturePad(
  { width = 400, height = 200, strokeColor, strokeWidth = 2, onChange, disabled, className, ...props },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const getCtx = useCallback(() => canvasRef.current?.getContext("2d") ?? null, []);

  const getPoint = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      const { x, y } = getPoint(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    },
    [disabled, getCtx, getPoint],
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || disabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      const { x, y } = getPoint(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      setIsEmpty(false);
    },
    [isDrawing, disabled, getCtx, getPoint],
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) onChange?.(canvas.toDataURL());
  }, [isDrawing, onChange]);

  const clear = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    setIsEmpty(true);
    onChange?.(null);
  }, [getCtx, width, height, onChange]);

  useEffect(() => {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.strokeStyle = strokeColor ?? "var(--s-text, #000)";
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [getCtx, strokeColor, strokeWidth]);

  return (
    <div
      ref={ref}
      data-slot="signature-pad"
      className={cn("flex flex-col gap-2", disabled && "opacity-50", className)}
      {...props}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "rounded-[var(--s-radius-md,8px)]",
          "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-background)]",
        )}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={cn("touch-none", disabled ? "cursor-not-allowed" : "cursor-crosshair")}
          style={{ width, height }}
        />
        {isEmpty && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-[var(--s-text-muted)] pointer-events-none">
            Sign here
          </p>
        )}
      </div>
      <button
        type="button"
        disabled={disabled || isEmpty}
        onClick={clear}
        className={cn(
          "self-end text-xs text-[var(--s-text-muted)]",
          "hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        Clear
      </button>
    </div>
  );
});
