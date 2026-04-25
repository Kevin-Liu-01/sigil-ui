"use client";

import type { ReactNode } from "react";

type ComponentPreviewProps = {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
};

export function ComponentPreview({
  children,
  vertical = false,
  className = "",
}: ComponentPreviewProps) {
  return (
    <div
      className={[
        "my-6 flex min-h-40 items-center justify-center gap-4 rounded-[var(--s-radius-card)] border border-[var(--s-border)] bg-[var(--s-surface)] p-6",
        vertical ? "flex-col" : "flex-row flex-wrap",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

