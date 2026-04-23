"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used within <Tabs>");
  return ctx;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Default active tab value. */
  defaultValue: string;
  /** Controlled active tab value. */
  value?: string;
  /** Callback when active tab changes. */
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { defaultValue, value, onValueChange, className, children, ...rest },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const baseId = useId();

  const activeTab = value ?? internalValue;
  const setActiveTab = (v: string) => {
    if (!value) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div
        ref={ref}
        data-slot="tabs"
        className={cn("w-full", className)}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function TabsList({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[var(--s-radius-md,2px)] bg-[var(--s-surface)] p-1 text-[var(--s-text-muted)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
        className,
      )}
      {...rest}
    />
  );
});

export interface TabsTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying this tab. */
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    { value, disabled, className, children, ...rest },
    ref,
  ) {
    const { activeTab, setActiveTab, baseId } = useTabsContext();
    const { play } = useSigilSound();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`${baseId}-trigger-${value}`}
        data-slot="tabs-trigger"
        aria-controls={`${baseId}-content-${value}`}
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        disabled={disabled}
        onClick={() => {
          play("tap");
          setActiveTab(value);
        }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--s-radius-sm,0px)] px-3 py-1.5 text-sm font-medium",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:bg-[var(--s-background)] data-[state=active]:text-[var(--s-text)] data-[state=active]:shadow-sm",
          "data-[state=inactive]:text-[var(--s-text-muted)] data-[state=inactive]:hover:text-[var(--s-text)]",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon])]:size-4",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export interface TabsContentProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding TabsTrigger. */
  value: string;
  children?: ReactNode;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, className, children, ...rest }, ref) {
    const { activeTab, baseId } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-content-${value}`}
        data-slot="tabs-content"
        aria-labelledby={`${baseId}-trigger-${value}`}
        tabIndex={0}
        className={cn(
          "mt-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-ring-offset,var(--s-background))]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
