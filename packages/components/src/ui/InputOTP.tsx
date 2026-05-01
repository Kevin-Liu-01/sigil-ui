"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { OTPFieldPreview as OTPField } from "@base-ui/react/otp-field";
import { cn } from "../utils";

export interface InputOTPProps extends ComponentPropsWithoutRef<typeof OTPField.Root> {}

export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  function InputOTP({ className, ...rest }, ref) {
    return (
      <OTPField.Root
        ref={ref}
        data-slot="input-otp"
        className={cn("flex items-center gap-2", className)}
        {...rest}
      />
    );
  },
);

export interface InputOTPGroupProps extends ComponentPropsWithoutRef<"div"> {}

export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  function InputOTPGroup({ className, ...rest }, ref) {
    return (
      <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center", className)} {...rest} />
    );
  },
);

export interface InputOTPSlotProps extends ComponentPropsWithoutRef<typeof OTPField.Input> {}

export const InputOTPSlot = forwardRef<HTMLInputElement, InputOTPSlotProps>(
  function InputOTPSlot({ className, ...rest }, ref) {
    return (
      <OTPField.Input
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center",
          "border-y border-r border-[color:var(--s-border)] text-sm font-medium text-[var(--s-text)]",
          "transition-all duration-[var(--s-duration-fast,150ms)]",
          "first:rounded-l-[var(--s-radius-md,6px)] first:border-l",
          "last:rounded-r-[var(--s-radius-md,6px)]",
          "data-[focused]:z-10 data-[focused]:ring-[length:var(--s-focus-ring-width)] data-[focused]:ring-[var(--s-focus-ring-color)] data-[focused]:ring-offset-[var(--s-focus-ring-offset)]",
          className,
        )}
        {...rest}
      />
    );
  },
);

export interface InputOTPSeparatorProps extends ComponentPropsWithoutRef<typeof OTPField.Separator> {}

export const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  function InputOTPSeparator({ className, ...rest }, ref) {
    return (
      <OTPField.Separator
        ref={ref}
        className={cn("flex items-center text-[var(--s-text-muted)]", className)}
        {...rest}
      >
        <svg width="8" height="2" viewBox="0 0 8 2" fill="currentColor" aria-hidden>
          <rect width="8" height="2" rx="1" />
        </svg>
      </OTPField.Separator>
    );
  },
);
