"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  sidebarWidth?: number | string;
  sidebarPosition?: "left" | "right";
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, sidebar, footer, sidebarWidth = 256, sidebarPosition = "left", className, style, children, ...props },
  ref,
) {
  const sw = typeof sidebarWidth === "number" ? `${sidebarWidth}px` : sidebarWidth;
  const hasSidebar = !!sidebar;

  return (
    <div
      ref={ref}
      data-slot="app-shell"
      className={cn("min-h-dvh", className)}
      style={{
        display: "grid",
        gridTemplateRows: `${header ? "auto" : ""} 1fr ${footer ? "auto" : ""}`.trim(),
        gridTemplateColumns: hasSidebar
          ? sidebarPosition === "left" ? `${sw} 1fr` : `1fr ${sw}`
          : "1fr",
        ...style,
      }}
      {...props}
    >
      {header && (
        <div style={{ gridColumn: "1 / -1" }}>
          {header}
        </div>
      )}

      {hasSidebar && sidebarPosition === "left" && sidebar}

      <div className="min-w-0 min-h-0">
        {children}
      </div>

      {hasSidebar && sidebarPosition === "right" && sidebar}

      {footer && (
        <div style={{ gridColumn: "1 / -1" }}>
          {footer}
        </div>
      )}
    </div>
  );
});
