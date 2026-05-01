"use client";

import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "../utils";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="input-group"
      className={cn(
        "flex items-stretch",
        "rounded-[var(--s-radius-input,var(--s-radius-md,6px))]",
        "border border-[color:var(--s-border)] border-[style:var(--s-border-style,solid)]",
        "bg-[var(--s-background)]",
        "focus-within:ring-[length:var(--s-input-focus-ring-width)] focus-within:ring-[var(--s-input-focus-ring-color)]/20 focus-within:border-[color:var(--s-input-focus-ring-color)]",
        "transition-all duration-[var(--s-duration-fast,150ms)]",
        "has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});

export interface InputGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>(
  function InputGroupInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        data-slot="input-group-input"
        className={cn(
          "flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-[var(--s-text)]",
          "placeholder:text-[var(--s-text-muted)]",
          "focus:outline-none",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface InputGroupTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const InputGroupTextarea = forwardRef<HTMLTextAreaElement, InputGroupTextareaProps>(
  function InputGroupTextarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        data-slot="input-group-textarea"
        className={cn(
          "flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-[var(--s-text)]",
          "placeholder:text-[var(--s-text-muted)]",
          "focus:outline-none resize-none",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
  position?: "inline-start" | "inline-end";
}

export const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  function InputGroupAddon({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="input-group-addon"
        className={cn(
          "flex items-center px-3 text-sm text-[var(--s-text-muted)] bg-[var(--s-surface)]",
          "border-[color:var(--s-border)]",
          "first:rounded-l-[var(--s-radius-input,var(--s-radius-md,6px))] first:border-r",
          "last:rounded-r-[var(--s-radius-input,var(--s-radius-md,6px))] last:border-l",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface InputGroupButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const InputGroupButton = forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  function InputGroupButton({ className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        data-slot="input-group-button"
        className={cn(
          "flex items-center justify-center px-3 text-sm font-medium",
          "text-[var(--s-text)] bg-[var(--s-surface)]",
          "border-[color:var(--s-border)]",
          "hover:bg-[var(--s-surface-elevated)]",
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          "first:rounded-l-[var(--s-radius-input,var(--s-radius-md,6px))] first:border-r",
          "last:rounded-r-[var(--s-radius-input,var(--s-radius-md,6px))] last:border-l",
          className,
        )}
        {...props}
      />
    );
  },
);

export const InputGroupText = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function InputGroupText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="input-group-text"
        className={cn(
          "flex items-center px-3 text-sm text-[var(--s-text-muted)]",
          className,
        )}
        {...props}
      />
    );
  },
);
