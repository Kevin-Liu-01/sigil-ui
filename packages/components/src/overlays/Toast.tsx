"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let globalAddToast: ToastContextValue["addToast"] | null = null;

/** Imperative toast function — call from anywhere after mounting <Toaster>. */
export function toast(options: {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}) {
  globalAddToast?.({
    title: options.title,
    description: options.description,
    variant: options.variant ?? "default",
    duration: options.duration ?? 4000,
  });
}

let idCounter = 0;

export interface ToasterProps extends HTMLAttributes<HTMLDivElement> {
  /** Position of the toast stack. @default "bottom-right" */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const positionStyles: Record<string, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

/** Toast notification container — mount once at the root of your app. */
export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(function Toaster(
  { position = "bottom-right", className, ...rest },
  ref,
) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = `toast-${++idCounter}`;
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <div
        ref={ref}
        className={cn("fixed z-[100] flex flex-col gap-2 pointer-events-none", positionStyles[position], className)}
        {...rest}
      >
        {toasts.map((t) => (
          <ToastNotification key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-8px) scale(0.95); }
        }
      `}</style>
    </ToastContext.Provider>
  );
});

const variantStyles: Record<ToastVariant, string> = {
  default: "border-[var(--s-border)]",
  success: "border-[var(--s-success)]",
  error: "border-[var(--s-error)]",
  warning: "border-[var(--s-warning)]",
  info: "border-[var(--s-info)]",
};

function ToastNotification({
  toast: t,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), t.duration);
    return () => clearTimeout(timer);
  }, [t.duration]);

  useEffect(() => {
    if (leaving) {
      const timer = setTimeout(() => onRemove(t.id), 200);
      return () => clearTimeout(timer);
    }
  }, [leaving, onRemove, t.id]);

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto w-80 rounded-[var(--s-card-radius,8px)] border p-4",
        "bg-[var(--s-background)] shadow-[var(--s-shadow-md)]",
        variantStyles[t.variant],
        leaving ? "animate-[toastOut_200ms_ease-in_forwards]" : "animate-[toastIn_200ms_ease-out]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--s-text)]">{t.title}</p>
          {t.description && (
            <p className="mt-1 text-xs text-[var(--s-text-muted)]">{t.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setLeaving(true)}
          className="shrink-0 text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
