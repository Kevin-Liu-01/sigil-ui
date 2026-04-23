"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface StepperStepConfig {
  label: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepperStepConfig[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  { steps, currentStep, orientation = "horizontal", className, ...rest },
  ref,
) {
  const isH = orientation === "horizontal";

  return (
    <div
      ref={ref}
      data-slot="stepper"
      role="list"
      className={cn("flex", isH ? "flex-row items-start" : "flex-col gap-0", className)}
      {...rest}
    >
      {steps.map((step, idx) => {
        const state: "completed" | "current" | "upcoming" =
          idx < currentStep ? "completed" : idx === currentStep ? "current" : "upcoming";
        const isLast = idx === steps.length - 1;

        if (isH) {
          return (
            <div key={idx} role="listitem" aria-current={state === "current" ? "step" : undefined} className="flex flex-1 items-start">
              <div className="flex flex-col items-center shrink-0">
                <StepCircle state={state} index={idx} />
                <p className={cn("mt-1.5 text-xs font-medium text-center max-w-[80px]", state === "upcoming" ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]")}>
                  {step.label}
                </p>
              </div>
              {!isLast && (
                <div className={cn("h-0.5 flex-1 mt-4 mx-1", state === "completed" ? "bg-[var(--s-primary)]" : "bg-[var(--s-border)]")} />
              )}
            </div>
          );
        }

        return (
          <div key={idx} role="listitem" aria-current={state === "current" ? "step" : undefined} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <StepCircle state={state} index={idx} />
              {!isLast && (
                <div className={cn("w-0.5 flex-1 min-h-6", state === "completed" ? "bg-[var(--s-primary)]" : "bg-[var(--s-border)]")} />
              )}
            </div>
            <div className="pb-6">
              <p className={cn("text-sm font-medium", state === "upcoming" ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]")}>
                {step.label}
              </p>
              {step.description && <p className="mt-0.5 text-xs text-[var(--s-text-muted)]">{step.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
});

function StepCircle({ state, index }: { state: "completed" | "current" | "upcoming"; index: number }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--s-radius-full,9999px)] text-xs font-semibold",
        "transition-colors duration-[var(--s-duration-fast,150ms)]",
        state === "completed" && "bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)]",
        state === "current" && "border-2 border-[var(--s-primary)] text-[var(--s-primary)]",
        state === "upcoming" && "border-2 border-[var(--s-border)] text-[var(--s-text-muted)]",
      )}
    >
      {state === "completed" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 7l3 3 5-5" />
        </svg>
      ) : (
        index + 1
      )}
    </div>
  );
}
