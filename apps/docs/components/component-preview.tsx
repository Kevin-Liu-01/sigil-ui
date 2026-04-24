"use client";

import type { ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
}

export function ComponentPreview({
  children,
  vertical = false,
  className = "",
}: ComponentPreviewProps) {
  return (
    <div
      className={`sigil-preview ${vertical ? "sigil-preview-vertical" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
