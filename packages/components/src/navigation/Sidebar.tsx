"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

/* -------------------------------- Context -------------------------------- */

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, setCollapsed: () => {} });

function useSidebar() {
  return useContext(SidebarContext);
}

/* -------------------------------- Sidebar -------------------------------- */

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Start in collapsed (icon-only) mode. */
  defaultCollapsed?: boolean;
  children?: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { defaultCollapsed = false, className, children, ...rest },
  ref,
) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside
        ref={ref}
        data-collapsed={collapsed || undefined}
        className={cn(
          "sticky top-0 flex h-screen flex-col border-r border-[var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "bg-[var(--s-surface)] text-[var(--s-text)]",
          "transition-[width] duration-[var(--s-duration-normal,200ms)] ease-out",
          collapsed ? "w-16" : "w-[var(--s-sidebar-width,280px)]",
          className,
        )}
        {...rest}
      >
        {children}

        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-6 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full",
            "border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] text-[var(--s-text-muted)]",
            "shadow-[var(--s-shadow-sm)] transition-colors duration-[var(--s-duration-fast,150ms)]",
            "hover:bg-[var(--s-primary)]/10 hover:text-[var(--s-text)]",
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d={collapsed ? "M4.5 3l3 3-3 3" : "M7.5 3l-3 3 3 3"}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      </aside>
    </SidebarContext.Provider>
  );
});

/* ------------------------------ SidebarHeader ---------------------------- */

export const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SidebarHeader({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center gap-2 px-4 py-4 border-b border-[var(--s-border)] border-[style:var(--s-border-style,solid)]", className)} {...rest} />
    );
  },
);

/* ----------------------------- SidebarContent ---------------------------- */

export const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SidebarContent({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex-1 overflow-y-auto px-2 py-2", className)} {...rest} />
    );
  },
);

/* ------------------------------ SidebarFooter ---------------------------- */

export const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SidebarFooter({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("border-t border-[var(--s-border)] border-[style:var(--s-border-style,solid)] px-4 py-3", className)} {...rest} />
    );
  },
);

/* ------------------------------ SidebarGroup ----------------------------- */

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  function SidebarGroup({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("py-2", className)} {...rest} />;
  },
);

/* --------------------------- SidebarGroupLabel --------------------------- */

export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  function SidebarGroupLabel({ className, children, ...rest }, ref) {
    const { collapsed } = useSidebar();

    if (collapsed) return null;

    return (
      <div
        ref={ref}
        className={cn("px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--s-text-muted)]", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ------------------------------ SidebarItem ------------------------------ */

export interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon element shown in both collapsed and expanded modes. */
  icon?: ReactNode;
  /** Active/selected state. */
  active?: boolean;
  children?: ReactNode;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  function SidebarItem({ icon, active = false, className, children, ...rest }, ref) {
    const { collapsed } = useSidebar();

    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-[var(--s-radius-md,6px)] px-3 py-2 text-sm font-medium",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          active
            ? "bg-[var(--s-primary)]/10 text-[var(--s-primary)]"
            : "text-[var(--s-text-muted)] hover:bg-[var(--s-primary)]/5 hover:text-[var(--s-text)]",
          collapsed && "justify-center px-0",
          className,
        )}
        {...rest}
      >
        {icon && <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>}
        {!collapsed && <span className="truncate">{children}</span>}
      </button>
    );
  },
);
