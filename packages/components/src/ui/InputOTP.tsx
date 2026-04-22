"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { useContext } from "react";
import { cn } from "../utils";

export interface InputOTPProps extends ComponentPropsWithoutRef<typeof OTPInput> {}

export const InputOTP = forwardRef<ElementRef<typeof OTPInput>, InputOTPProps>(
  function InputOTP({ className, containerClassName, ...rest }, ref) {
    return (
      <OTPInput
        ref={ref}
        containerClassName={cn("flex items-center gap-2", containerClassName)}
        className={cn("disabled:cursor-not-allowed", className)}
        {...rest}
      />
    );
  },
);

export interface InputOTPGroupProps extends ComponentPropsWithoutRef<"div"> {}

export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  function InputOTPGroup({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center", className)} {...rest} />
    );
  },
);

export interface InputOTPSlotProps extends ComponentPropsWithoutRef<"div"> {
  index: number;
}

export const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  function InputOTPSlot({ index, className, ...rest }, ref) {
    const ctx = useContext(OTPInputContext);
    const slot = ctx.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center",
          "border-y border-r border-[var(--s-border)] text-sm font-medium text-[var(--s-text)]",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "first:rounded-l-[var(--s-radius-md,6px)] first:border-l",
          "last:rounded-r-[var(--s-radius-md,6px)]",
          slot?.isActive && "z-10 ring-2 ring-[var(--s-primary)] ring-offset-1",
          className,
        )}
        {...rest}
      >
        {slot?.char ?? ""}
        {slot?.hasFakeCaret && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-px animate-pulse bg-[var(--s-text)]" />
          </span>
        )}
      </div>
    );
  },
);

export interface InputOTPSeparatorProps extends ComponentPropsWithoutRef<"div"> {}

export const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  function InputOTPSeparator({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("flex items-center text-[var(--s-text-muted)]", className)}
        {...rest}
      >
        <svg width="8" height="2" viewBox="0 0 8 2" fill="currentColor" aria-hidden>
          <rect width="8" height="2" rx="1" />
        </svg>
      </div>
    );
  },
);
