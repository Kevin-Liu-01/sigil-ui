"use client";

import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "../utils";

/** Responsive table container. */
export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...rest }, ref) {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          data-slot="table"
          className={cn("w-full caption-bottom text-sm border-collapse", className)}
          {...rest}
        />
      </div>
    );
  },
);

/** Table header group. */
export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...rest }, ref) {
    return (
      <thead
        ref={ref}
        data-slot="table-header"
        className={cn("border-b border-[var(--s-border)] border-[style:var(--s-border-style,solid)] [&_tr]:border-b [&_tr]:border-[style:var(--s-border-style,solid)]", className)}
        {...rest}
      />
    );
  },
);

/** Table body group. */
export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...rest }, ref) {
    return (
      <tbody
        ref={ref}
        data-slot="table-body"
        className={cn("[&_tr:last-child]:border-0", className)}
        {...rest}
      />
    );
  },
);

/** Table row. */
export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...rest }, ref) {
    return (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          "border-b border-[var(--s-border)] border-[style:var(--s-border-style,solid)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-surface-elevated)]",
          "data-[state=selected]:bg-[var(--s-surface-elevated)]",
          className,
        )}
        {...rest}
      />
    );
  },
);

/** Table header cell. */
export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, ...rest }, ref) {
    return (
      <th
        ref={ref}
        data-slot="table-head"
        className={cn(
          "h-10 px-3 text-left align-middle font-medium text-[var(--s-text-muted)]",
          "[&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...rest}
      />
    );
  },
);

/** Table data cell. */
export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...rest }, ref) {
    return (
      <td
        ref={ref}
        data-slot="table-cell"
        className={cn(
          "p-3 align-middle text-[var(--s-text)] [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...rest}
      />
    );
  },
);

/** Table caption. */
export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...rest }, ref) {
    return (
      <caption
        ref={ref}
        data-slot="table-caption"
        className={cn("mt-4 text-sm text-[var(--s-text-muted)]", className)}
        {...rest}
      />
    );
  },
);
