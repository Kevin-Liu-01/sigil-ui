"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar, type AvatarProps } from "./Avatar";
import { Badge, type BadgeProps } from "./Badge";
import { Button, type ButtonProps } from "./Button";
import { Progress } from "./Progress";
import { Skeleton } from "./Skeleton";
import { LoadingSpinner } from "./LoadingSpinner";
import { Alert, AlertDescription, AlertTitle, type AlertProps } from "./Alert";
import { toast } from "../overlays/Toast";
import { cn } from "../utils";

export interface StatusBadgeProps extends BadgeProps {
  status?: "online" | "offline" | "busy" | "away" | "success" | "warning" | "error" | "info" | "neutral";
}

const statusTone: Record<NonNullable<StatusBadgeProps["status"]>, string> = {
  online: "bg-[var(--s-success)] text-[var(--s-primary-contrast)]",
  offline: "bg-[var(--s-text-muted)] text-[var(--s-primary-contrast)]",
  busy: "bg-[var(--s-error)] text-[var(--s-primary-contrast)]",
  away: "bg-[var(--s-warning)] text-[var(--s-primary-contrast)]",
  success: "bg-[var(--s-success)] text-[var(--s-primary-contrast)]",
  warning: "bg-[var(--s-warning)] text-[var(--s-primary-contrast)]",
  error: "bg-[var(--s-error)] text-[var(--s-primary-contrast)]",
  info: "bg-[var(--s-info)] text-[var(--s-primary-contrast)]",
  neutral: "bg-[var(--s-surface)] text-[var(--s-text)]",
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(function StatusBadge(
  { status = "neutral", className, ...props },
  ref,
) {
  return <Badge ref={ref} className={cn(statusTone[status], className)} {...props} />;
});

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  status?: StatusBadgeProps["status"];
}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(function StatusDot(
  { status = "neutral", className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-status={status}
      className={cn("inline-block size-2 rounded-[var(--s-radius-full,9999px)]", statusTone[status].split(" ")[0], className)}
      {...props}
    />
  );
});

export const StatusPill = forwardRef<HTMLSpanElement, StatusBadgeProps>(function StatusPill(props, ref) {
  return <StatusBadge ref={ref} className={cn("rounded-[var(--s-radius-full,9999px)]", props.className)} {...props} />;
});

export interface OnlineIndicatorProps extends StatusDotProps {
  label?: ReactNode;
}

export const OnlineIndicator = forwardRef<HTMLSpanElement, OnlineIndicatorProps>(function OnlineIndicator(
  { label, status = "online", className, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn("inline-flex items-center gap-2 text-sm", className)} {...props}>
      <StatusDot status={status} />
      {label}
    </span>
  );
});

export interface PresenceAvatarProps extends AvatarProps {
  status?: StatusBadgeProps["status"];
}

export const PresenceAvatar = forwardRef<HTMLDivElement, PresenceAvatarProps>(function PresenceAvatar(
  { status = "online", className, ...props },
  ref,
) {
  return (
    <span className="relative inline-flex">
      <Avatar ref={ref} className={className} {...props} />
      <StatusDot status={status} className="absolute bottom-0 right-0 ring-2 ring-[var(--s-background)]" />
    </span>
  );
});

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  unread?: boolean;
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  { title, description, action, unread, children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-unread={unread || undefined}
      className={cn(
        "relative grid gap-1 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] bg-[var(--s-background)] p-4",
        "data-[unread=true]:border-[var(--s-primary)] data-[unread=true]:bg-[color-mix(in_oklch,var(--s-primary)_6%,transparent)]",
        className,
      )}
      {...props}
    >
      {title && <div className="font-medium text-[var(--s-text)]">{title}</div>}
      {description && <div className="text-sm text-[var(--s-text-muted)]">{description}</div>}
      {children}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
});

export const NotificationList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function NotificationList(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("grid gap-2", className)} {...props} />;
});

export const InlineAlert = forwardRef<HTMLDivElement, AlertProps>(function InlineAlert({ className, ...props }, ref) {
  return <Alert ref={ref} className={cn("py-3", className)} {...props} />;
});

export interface CalloutProps extends Omit<AlertProps, "title"> {
  title?: ReactNode;
  description?: ReactNode;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { title, description, children, ...props },
  ref,
) {
  return (
    <Alert ref={ref} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {children}
    </Alert>
  );
});

export const BannerAlert = forwardRef<HTMLDivElement, CalloutProps>(function BannerAlert({ className, ...props }, ref) {
  return <Callout ref={ref} className={cn("rounded-none border-x-0", className)} {...props} />;
});

export interface StateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

const StateBlock = forwardRef<HTMLDivElement, StateProps>(function StateBlock(
  { title, description, action, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid place-items-center gap-3 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] p-8 text-center", className)} {...props}>
      {children}
      {title && <h3 className="text-base font-semibold text-[var(--s-text)]">{title}</h3>}
      {description && <p className="max-w-sm text-sm text-[var(--s-text-muted)]">{description}</p>}
      {action}
    </div>
  );
});

export const ErrorState = forwardRef<HTMLDivElement, StateProps>(function ErrorState(props, ref) {
  return <StateBlock ref={ref} {...props}><StatusDot status="error" className="size-3" />{props.children}</StateBlock>;
});

export const LoadingState = forwardRef<HTMLDivElement, StateProps>(function LoadingState(props, ref) {
  return <StateBlock ref={ref} {...props}><LoadingSpinner size="md" />{props.children}</StateBlock>;
});

export const SuccessState = forwardRef<HTMLDivElement, StateProps>(function SuccessState(props, ref) {
  return <StateBlock ref={ref} {...props}><StatusDot status="success" className="size-3" />{props.children}</StateBlock>;
});

export interface ProgressStepsProps extends HTMLAttributes<HTMLOListElement> {
  steps: Array<{ label: ReactNode; description?: ReactNode }>;
  currentStep?: number;
}

export const ProgressSteps = forwardRef<HTMLOListElement, ProgressStepsProps>(function ProgressSteps(
  { steps, currentStep = 0, className, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cn("grid gap-3", className)} {...props}>
      {steps.map((step, index) => (
        <li key={index} data-active={index === currentStep || undefined} data-complete={index < currentStep || undefined} className="flex gap-3">
          <span className="mt-1 flex size-5 items-center justify-center rounded-[var(--s-radius-full,9999px)] border border-[var(--s-border)] text-xs data-[complete=true]:bg-[var(--s-primary)]" />
          <span className="grid gap-0.5">
            <span className="text-sm font-medium text-[var(--s-text)]">{step.label}</span>
            {step.description && <span className="text-xs text-[var(--s-text-muted)]">{step.description}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
});

export interface TimelineProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export const TimelineProgress = forwardRef<HTMLDivElement, TimelineProgressProps>(function TimelineProgress(
  { value = 0, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-2", className)} {...props}>
      <Progress value={value} />
      {children && <div className="text-xs text-[var(--s-text-muted)]">{children}</div>}
    </div>
  );
});

export const ToastAction = forwardRef<HTMLButtonElement, ButtonProps>(function ToastAction(
  { variant = "outline", size = "sm", ...props },
  ref,
) {
  return <Button ref={ref} variant={variant} size={size} {...props} />;
});

export function ToastPromise<T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string },
) {
  toast({ title: messages.loading, variant: "info" });
  promise.then(
    () => toast({ title: messages.success, variant: "success" }),
    () => toast({ title: messages.error, variant: "error" }),
  );
  return promise;
}

export const SkeletonCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SkeletonCard(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-3 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] p-4", className)} {...props}>
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
});

export const SkeletonTable = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SkeletonTable(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-2", className)} {...props}>
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
});

export const SpinnerOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SpinnerOverlay(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("absolute inset-0 z-10 grid place-items-center bg-[var(--s-overlay-bg)] backdrop-blur-[var(--s-overlay-blur)]", className)} {...props}>
      {children ?? <LoadingSpinner size="lg" />}
    </div>
  );
});
