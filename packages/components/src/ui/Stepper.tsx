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

  if (isH) {
    return (
      <div
        ref={ref}
        data-slot="stepper"
        role="list"
        className={cn("grid", className)}
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        {...rest}
      >
        {steps.map((step, idx) => {
          const state: "completed" | "current" | "upcoming" =
            idx < currentStep ? "completed" : idx === currentStep ? "current" : "upcoming";
          const prevCompleted = idx > 0 && idx - 1 < currentStep;

          return (
            <div
              key={idx}
              role="listitem"
              aria-current={state === "current" ? "step" : undefined}
              className="flex flex-col items-center"
            >
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    idx === 0 ? "bg-transparent" : prevCompleted ? "bg-[var(--s-primary)]" : "bg-[var(--s-border)]",
                  )}
                />
                <StepCircle state={state} index={idx} />
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    idx === steps.length - 1 ? "bg-transparent" : state === "completed" ? "bg-[var(--s-primary)]" : "bg-[var(--s-border)]",
                  )}
                />
              </div>
              <p
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  state === "upcoming" ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]",
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-[11px] text-center text-[var(--s-text-muted)]">{step.description}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="stepper"
      role="list"
      className={cn("flex flex-col gap-0", className)}
      {...rest}
    >
      {steps.map((step, idx) => {
        const state: "completed" | "current" | "upcoming" =
          idx < currentStep ? "completed" : idx === currentStep ? "current" : "upcoming";
        const isLast = idx === steps.length - 1;

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
        state === "current" && "border-2 border-[var(--s-primary)] bg-[var(--s-bg)] text-[var(--s-primary)]",
        state === "upcoming" && "border-2 border-[var(--s-border)] bg-[var(--s-bg)] text-[var(--s-text-muted)]",
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
