"use client";

import { forwardRef, type ReactNode } from "react";

export interface AccessibleIconProps {
  /** Accessible label for the icon. */
  label: string;
  children: ReactNode;
}

/**
 * Makes an icon accessible by wrapping it with a visually hidden label.
 * The child element is hidden from screen readers while the label is announced.
 */
export const AccessibleIcon = forwardRef<HTMLSpanElement, AccessibleIconProps>(
  function AccessibleIcon({ label, children }, ref) {
    return (
      <span ref={ref} data-slot="accessible-icon">
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          {label}
        </span>
        <span aria-hidden="true">{children}</span>
      </span>
    );
  },
);
