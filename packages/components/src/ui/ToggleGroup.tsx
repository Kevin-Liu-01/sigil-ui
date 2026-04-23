"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export type ToggleGroupProps = {
  /** Selection mode. */
  type: "single" | "multiple";
  /** Toggle size applied to all items. @default "md" */
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
};

export interface ToggleGroupItemProps extends ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  /** Item size override. @default "md" */
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-2 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-sm",
};

/** Connected row of toggle buttons — supports single or multiple selection. */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup({ className, size = "md", children, onValueChange, ...rest }, ref) {
    const { play } = useSigilSound();
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        className={cn(
          "inline-flex items-center rounded-[var(--s-radius-md,6px)]",
          "border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
          className,
        )}
        onValueChange={(value: any) => { play("toggle"); onValueChange?.(value); }}
        {...(rest as any)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    );
  },
);

/** Individual toggle group item rendered as a connected segment. */
export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem({ className, size = "md", ...rest }, ref) {
    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        data-slot="toggle-group-item"
        className={cn(
          "inline-flex cursor-pointer items-center justify-center font-medium",
          "text-[var(--s-text-secondary)] bg-transparent",
          "border-r border-[style:var(--s-border-style,solid)] border-[var(--s-border)] last:border-r-0",
          "first:rounded-l-[var(--s-radius-md,6px)] last:rounded-r-[var(--s-radius-md,6px)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface-elevated)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-ring,var(--s-primary))] focus-visible:ring-offset-2 focus-visible:z-10",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=on]:bg-[var(--s-surface)] data-[state=on]:text-[var(--s-text)]",
          sizeStyles[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
