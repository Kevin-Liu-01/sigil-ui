"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

/* -------------------------------- Context -------------------------------- */

interface FormFieldContextValue {
  id: string;
  error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const ctx = useContext(FormFieldContext);
  if (!ctx) throw new Error("Form compound components must be used within <FormField>");
  return ctx;
}

/* --------------------------------- Form ---------------------------------- */

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, ...rest },
  ref,
) {
  return <form ref={ref} data-slot="form" className={cn("space-y-6", className)} {...rest} />;
});

/* ------------------------------ FormField -------------------------------- */

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Field name — used for label association. */
  name: string;
  /** Error message string. When truthy, children enter error state. */
  error?: string;
  children?: ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { name, error, className, children, ...rest },
  ref,
) {
  const generatedId = useId();
  const id = `form-field-${name}-${generatedId}`;

  return (
    <FormFieldContext.Provider value={{ id, error }}>
      <div ref={ref} data-slot="form-field" className={cn("space-y-2", className)} {...rest}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});

/* ------------------------------- FormItem -------------------------------- */

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  { className, ...rest },
  ref,
) {
  return (
    <div ref={ref} data-slot="form-item" className={cn("flex flex-col gap-1.5", className)} {...rest} />
  );
});

/* ------------------------------- FormLabel -------------------------------- */

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(
  { className, ...rest },
  ref,
) {
  const { id, error } = useFormField();

  return (
    <label
      ref={ref}
      data-slot="form-label"
      htmlFor={id}
      className={cn(
        "text-sm font-medium leading-none",
        error ? "text-[var(--s-error)]" : "text-[var(--s-text)]",
        className,
      )}
      {...rest}
    />
  );
});

/* ----------------------------- FormControl ------------------------------- */

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(
  { className, children, ...rest },
  ref,
) {
  const { id, error } = useFormField();
  const descriptionId = `${id}-description`;
  const messageId = `${id}-message`;

  return (
    <div
      ref={ref}
      data-slot="form-control"
      className={cn("w-full", className)}
      role="group"
      aria-describedby={error ? `${descriptionId} ${messageId}` : descriptionId}
      aria-invalid={Boolean(error) || undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

/* --------------------------- FormDescription ----------------------------- */

export interface FormDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  function FormDescription({ className, ...rest }, ref) {
    const { id } = useFormField();

    return (
      <p
        ref={ref}
        data-slot="form-description"
        id={`${id}-description`}
        className={cn("text-xs text-[var(--s-text-muted)]", className)}
        {...rest}
      />
    );
  },
);

/* ----------------------------- FormMessage -------------------------------- */

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  function FormMessage({ className, children, ...rest }, ref) {
    const { id, error } = useFormField();
    const message = error ?? children;

    if (!message) return null;

    return (
      <p
        ref={ref}
        data-slot="form-message"
        id={`${id}-message`}
        role="alert"
        className={cn("text-xs text-[var(--s-error)]", className)}
        {...rest}
      >
        {message}
      </p>
    );
  },
);
