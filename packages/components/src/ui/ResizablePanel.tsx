"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { cn } from "../utils";

export interface ResizablePanelGroupProps extends ComponentPropsWithoutRef<typeof PanelGroup> {}

export const ResizablePanelGroup = forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  function ResizablePanelGroup({ className, ...rest }, ref) {
    return (
      <PanelGroup
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
          className,
        )}
        {...rest}
      />
    );
  },
);

export interface ResizablePanelProps extends ComponentPropsWithoutRef<typeof Panel> {}

export const ResizablePanel = forwardRef<ImperativePanelHandle, ResizablePanelProps>(
  function ResizablePanel(props, ref) {
    return <Panel ref={ref} {...props} />;
  },
);

export interface ResizableHandleProps extends ComponentPropsWithoutRef<typeof PanelResizeHandle> {
  withHandle?: boolean;
}

export const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  function ResizableHandle({ withHandle, className, ...rest }, ref) {
    return (
      <PanelResizeHandle
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "relative flex w-px items-center justify-center",
          "bg-[var(--s-border)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "after:absolute after:inset-y-0 after:-left-1 after:-right-1",
          "hover:bg-[var(--s-primary)]/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-1",
          "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
          "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:-top-1 data-[panel-group-direction=vertical]:after:-bottom-1 data-[panel-group-direction=vertical]:after:left-auto data-[panel-group-direction=vertical]:after:right-auto",
          className,
        )}
        {...rest}
      >
        {withHandle && (
          <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-[var(--s-border)] bg-[var(--s-surface)]">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-[var(--s-text-muted)]">
              <path d="M1 1v8M5 1v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </PanelResizeHandle>
    );
  },
);
