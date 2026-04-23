"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

/** Expandable/collapsible container — controls open state. */
export const Collapsible = Object.assign(
  ({ onOpenChange, ...props }: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>) => {
    const { play } = useSigilSound();
    return (
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        onOpenChange={(open) => { play("expand"); onOpenChange?.(open); }}
        {...props}
      />
    );
  },
  { displayName: "Collapsible" },
);

/** Trigger that toggles the collapsible — unstyled, user provides their own button. */
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export interface CollapsibleContentProps
  extends ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {}

/** Animated content area using CSS grid height transition. */
export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ className, children, ...rest }, ref) {
    return (
      <CollapsiblePrimitive.Content
        ref={ref}
        data-slot="collapsible-content"
        className={cn(
          "overflow-hidden text-[var(--s-text)]",
          "data-[state=open]:animate-[collapsibleOpen_200ms_ease-out]",
          "data-[state=closed]:animate-[collapsibleClose_200ms_ease-out]",
          className,
        )}
        {...rest}
      >
        {children}
        <style>{`
          @keyframes collapsibleOpen {
            from { height: 0; opacity: 0 }
            to { height: var(--radix-collapsible-content-height); opacity: 1 }
          }
          @keyframes collapsibleClose {
            from { height: var(--radix-collapsible-content-height); opacity: 1 }
            to { height: 0; opacity: 0 }
          }
        `}</style>
      </CollapsiblePrimitive.Content>
    );
  },
);
