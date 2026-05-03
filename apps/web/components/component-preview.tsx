"use client";

import type { ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
  label?: string;
}

export function ComponentPreview({
  children,
  vertical = false,
  className = "",
  label,
}: ComponentPreviewProps) {
  return (
    <div className="sigil-preview-wrapper">
      {label && <div className="sigil-preview-label">{label}</div>}
      <div
        className={`sigil-preview ${vertical ? "sigil-preview-vertical" : ""} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

