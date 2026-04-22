"use client";

import { createContext, forwardRef, useContext, useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

interface FieldContextValue {
  id: string;
  error?: boolean;
}

const FieldContext = createContext<FieldContextValue>({ id: "" });

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  children: ReactNode;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { error, className, children, ...rest },
  ref,
) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id, error }}>
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...rest}>
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export const FieldLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
  function FieldLabel({ className, ...rest }, ref) {
    const { id } = useContext(FieldContext);
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn("text-sm font-medium text-[var(--s-text)]", className)}
        {...rest}
      />
    );
  },
);

export const FieldDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function FieldDescription({ className, ...rest }, ref) {
    return (
      <p ref={ref} className={cn("text-xs text-[var(--s-text-muted)]", className)} {...rest} />
    );
  },
);

export const FieldError = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function FieldError({ className, children, ...rest }, ref) {
    const { error } = useContext(FieldContext);
    if (!error && !children) return null;
    return (
      <p
        ref={ref}
        role="alert"
        className={cn("text-xs font-medium text-[var(--s-error)]", className)}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset({ legend, className, children, ...rest }, ref) {
    return (
      <fieldset
        ref={ref}
        className={cn("flex flex-col gap-4 border-none p-0 m-0", className)}
        {...rest}
      >
        {legend && (
          <legend className="text-base font-semibold text-[var(--s-text)] mb-1">{legend}</legend>
        )}
        {children}
      </fieldset>
    );
  },
);
