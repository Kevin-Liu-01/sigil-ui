"use client";

import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps as SonnerToasterProps } from "sonner";

export type SonnerProps = SonnerToasterProps;

export function Sonner(props: SonnerProps) {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--s-surface)] group-[.toaster]:text-[var(--s-text,#09090b)] group-[.toaster]:border-[color:var(--s-border)] group-[.toaster]:shadow-[var(--s-shadow-lg)]",
          description: "group-[.toast]:text-[var(--s-text-muted)]",
          actionButton:
            "group-[.toast]:bg-[var(--s-primary,#18181b)] group-[.toast]:text-[var(--s-primary-contrast)]",
          cancelButton:
            "group-[.toast]:bg-[var(--s-surface,#f4f4f5)] group-[.toast]:text-[var(--s-text-muted)]",
        },
      }}
      {...props}
    />
  );
}

export { sonnerToast };
