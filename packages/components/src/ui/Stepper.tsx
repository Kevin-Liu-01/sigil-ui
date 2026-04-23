"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
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
  return (
    <div
      ref={ref}
      data-slot="stepper"
      role="list"
      className={cn(
        "flex gap-0",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col",
        className,
      )}
      {...rest}
    >
      {steps.map((step, idx) => (
        <StepperStep
          key={idx}
          index={idx}
          label={step.label}
          description={step.description}
          state={idx < currentStep ? "completed" : idx === currentStep ? "current" : "upcoming"}
          isLast={idx === steps.length - 1}
          orientation={orientation}
        />
      ))}
    </div>
  );
});

type StepState = "completed" | "current" | "upcoming";

interface StepperStepProps {
  index: number;
  label: string;
  description?: string;
  state: StepState;
  isLast: boolean;
  orientation: "horizontal" | "vertical";
}

function StepperStep({ index, label, description, state, isLast, orientation }: StepperStepProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="listitem"
      aria-current={state === "current" ? "step" : undefined}
      className={cn(
        "flex",
        isHorizontal ? "flex-1 flex-col items-center gap-2" : "flex-row items-start gap-3",
      )}
    >
      <div className={cn("flex items-center", isHorizontal ? "w-full" : "flex-col")}>
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            "transition-colors duration-[var(--s-duration-fast,150ms)]",
            state === "completed" && "bg-[var(--s-primary)] text-[var(--s-on-primary,#fff)]",
            state === "current" && "border-2 border-[var(--s-primary)] text-[var(--s-primary)]",
            state === "upcoming" && "border-2 border-[var(--s-border)] text-[var(--s-text-muted)]",
          )}
        >
          {state === "completed" ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7l3 3 5-5" />
            </svg>
          ) : (
            index + 1
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "transition-colors duration-[var(--s-duration-fast,150ms)]",
              isHorizontal ? "h-0.5 flex-1 mx-2" : "w-0.5 flex-1 my-2 ml-[15px]",
              state === "completed" ? "bg-[var(--s-primary)]" : "bg-[var(--s-border)]",
            )}
          />
        )}
      </div>
      <div className={cn(isHorizontal && "text-center", "min-w-0")}>
        <p
          className={cn(
            "text-sm font-medium",
            state === "upcoming" ? "text-[var(--s-text-muted)]" : "text-[var(--s-text)]",
          )}
        >
          {label}
        </p>
        {description && (
          <p className="mt-0.5 text-xs text-[var(--s-text-muted)]">{description}</p>
        )}
      </div>
    </div>
  );
}
