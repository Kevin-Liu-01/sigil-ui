"use client";

import { forwardRef, useId, type ForwardedRef, type HTMLAttributes, type ReactElement, type ReactNode, type Ref } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Empty } from "../ui/Empty";
import { Input } from "../ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { cn } from "../utils";

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items?: KeyValueItem[];
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(function DescriptionList(
  { items, children, className, ...props },
  ref,
) {
  return (
    <dl ref={ref} className={cn("grid gap-3 text-sm sm:grid-cols-[minmax(8rem,14rem)_1fr]", className)} {...props}>
      {items?.map((item, index) => (
        <div key={index} className="contents">
          <dt className="text-[var(--s-text-muted)]">{item.label}</dt>
          <dd className="text-[var(--s-text)]">{item.value}</dd>
        </div>
      ))}
      {children}
    </dl>
  );
});

export const KeyValue = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & KeyValueItem>(function KeyValue(
  { label, value, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex items-start justify-between gap-4 text-sm", className)} {...props}>
      <span className="text-[var(--s-text-muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--s-text)]">{value}</span>
    </div>
  );
});

export const PropertyList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { items?: KeyValueItem[] }>(
  function PropertyList({ items, children, className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("grid divide-y divide-[color:var(--s-border)] rounded-[var(--s-card-radius,10px)] border border-[color:var(--s-border)]", className)} {...props}>
        {items?.map((item, index) => <KeyValue key={index} label={item.label} value={item.value} className="p-3" />)}
        {children}
      </div>
    );
  },
);

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: ReactNode;
  change?: ReactNode;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, change, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-2 rounded-[var(--s-card-radius,10px)] border border-[color:var(--s-border)] bg-[var(--s-surface)] p-4", className)} {...props}>
      {label && <span className="text-xs uppercase tracking-[0.12em] text-[var(--s-text-muted)]">{label}</span>}
      {value && <span className="text-2xl font-semibold tabular-nums text-[var(--s-text)]">{value}</span>}
      {change && <span className="text-sm text-[var(--s-text-muted)]">{change}</span>}
      {children}
    </div>
  );
});

export const MetricGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function MetricGrid(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)} {...props} />;
});

export interface TrendProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number;
  format?: (value: number) => ReactNode;
}

export const Trend = forwardRef<HTMLSpanElement, TrendProps>(function Trend(
  { value = 0, format, className, ...props },
  ref,
) {
  const positive = value >= 0;
  return (
    <span ref={ref} className={cn("inline-flex items-center gap-1 text-sm tabular-nums", positive ? "text-[var(--s-success)]" : "text-[var(--s-error)]", className)} {...props}>
      {positive ? "↗" : "↘"} {format ? format(value) : `${positive ? "+" : ""}${value}%`}
    </span>
  );
});

export interface SparkProps extends HTMLAttributes<SVGSVGElement> {
  values: number[];
}

function normalize(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((value, index) => ({
    x: values.length === 1 ? 0 : (index / (values.length - 1)) * 100,
    y: 100 - ((value - min) / span) * 100,
  }));
}

export const SparkArea = forwardRef<SVGSVGElement, SparkProps>(function SparkArea({ values, className, ...props }, ref) {
  const points = normalize(values);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `0,100 ${line} 100,100`;
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={cn("h-10 w-full text-[var(--s-primary)]", className)} preserveAspectRatio="none" {...props}>
      <polygon points={area} fill="currentColor" opacity="0.15" />
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
});

export const SparkBar = forwardRef<SVGSVGElement, SparkProps>(function SparkBar({ values, className, ...props }, ref) {
  const max = Math.max(...values, 1);
  return (
    <svg ref={ref} viewBox={`0 0 ${values.length * 6} 32`} className={cn("h-8 w-full text-[var(--s-primary)]", className)} preserveAspectRatio="none" {...props}>
      {values.map((value, index) => {
        const height = Math.max(2, (value / max) * 32);
        return <rect key={index} x={index * 6} y={32 - height} width="4" height={height} rx="1" fill="currentColor" opacity="0.75" />;
      })}
    </svg>
  );
});

export const DataList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DataList(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("grid divide-y divide-[color:var(--s-border)] rounded-[var(--s-card-radius,10px)] border border-[color:var(--s-border)]", className)} {...props} />;
});

export const DataListItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DataListItem(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("flex items-center justify-between gap-4 p-3", className)} {...props} />;
});

export interface DataGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
}

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(function DataGrid(
  { columns, className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("grid gap-3", className)}
      style={{ gridTemplateColumns: columns ? `repeat(${columns}, minmax(0, 1fr))` : undefined, ...style }}
      {...props}
    />
  );
});

export const DataToolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DataToolbar(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("flex flex-wrap items-center justify-between gap-2", className)} {...props} />;
});

export interface DataFiltersProps extends HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string;
}

export const DataFilters = forwardRef<HTMLDivElement, DataFiltersProps>(function DataFilters(
  { searchPlaceholder = "Filter...", className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      <Input type="search" placeholder={searchPlaceholder} className="max-w-xs" />
      {children}
    </div>
  );
});

export interface DataPaginationProps extends HTMLAttributes<HTMLDivElement> {
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

export const DataPagination = forwardRef<HTMLDivElement, DataPaginationProps>(function DataPagination(
  { page = 1, pageCount = 1, onPageChange, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex items-center justify-end gap-2", className)} {...props}>
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>Previous</Button>
      <span className="text-sm text-[var(--s-text-muted)] tabular-nums">{page} / {pageCount}</span>
      <Button variant="outline" size="sm" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)}>Next</Button>
    </div>
  );
});

export interface ColumnVisibilityProps extends HTMLAttributes<HTMLDivElement> {
  columns: Array<{ id: string; label: ReactNode; visible?: boolean }>;
  onVisibilityChange?: (id: string, visible: boolean) => void;
}

export const ColumnVisibility = forwardRef<HTMLDivElement, ColumnVisibilityProps>(function ColumnVisibility(
  { columns, onVisibilityChange, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-2", className)} {...props}>
      {columns.map((column) => (
        <label key={column.id} className="flex items-center gap-2 text-sm">
          <Checkbox checked={column.visible ?? true} onCheckedChange={(next) => onVisibilityChange?.(column.id, Boolean(next))} />
          {column.label}
        </label>
      ))}
    </div>
  );
});

export const BulkActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function BulkActions(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("flex items-center gap-2 rounded-[var(--s-radius-md,8px)] border border-[color:var(--s-border)] bg-[var(--s-surface)] p-2", className)} {...props} />;
});

export const EmptyTable = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { message?: string }>(
  function EmptyTable({ message = "No rows found.", className, title: _title, ...props }, ref) {
    return <Empty ref={ref} className={className} title={message} {...props} />;
  },
);

export interface ListboxProps extends HTMLAttributes<HTMLDivElement> {
  options: ComboboxOptionLike[];
  value?: string;
  onValueChange?: (value: string) => void;
}

interface ComboboxOptionLike {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(function Listbox(
  { options, value, onValueChange, className, ...props },
  ref,
) {
  const listboxId = useId();
  return (
    <div
      ref={ref}
      id={listboxId}
      role="listbox"
      tabIndex={0}
      aria-activedescendant={value ? `${listboxId}-${value}` : undefined}
      onKeyDown={(event) => {
        const enabled = options.filter((option) => !option.disabled);
        const currentIndex = enabled.findIndex((option) => option.value === value);
        const move = (delta: number) => {
          const next = enabled[Math.max(0, Math.min(enabled.length - 1, currentIndex + delta))];
          if (next) onValueChange?.(next.value);
        };
        if (event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
      className={cn("grid gap-1 rounded-[var(--s-card-radius,10px)] border border-[color:var(--s-border)] p-1 focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)]", className)}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          id={`${listboxId}-${option.value}`}
          type="button"
          role="option"
          aria-selected={option.value === value}
          disabled={option.disabled}
          onClick={() => onValueChange?.(option.value)}
          className="rounded-[var(--s-radius-sm,4px)] px-3 py-2 text-left text-sm hover:bg-[var(--s-surface)] focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] aria-selected:bg-[var(--s-primary)] aria-selected:text-[var(--s-primary-contrast)]"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});

export interface VirtualListProps<T> extends HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem?: (item: T, index: number) => ReactNode;
}

function VirtualListInner<T>({ items, renderItem, className, ...props }: VirtualListProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className={cn("max-h-80 overflow-auto [content-visibility:auto]", className)} {...props}>
      {items.map((item, index) => renderItem ? renderItem(item, index) : <div key={index} className="border-b border-[color:var(--s-border)] px-3 py-2 text-sm">{item as ReactNode}</div>)}
    </div>
  );
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

export interface TreeTableRow {
  id: string;
  label: ReactNode;
  children?: TreeTableRow[];
  values?: ReactNode[];
}

export interface TreeTableProps extends HTMLAttributes<HTMLTableElement> {
  rows: TreeTableRow[];
  headers?: ReactNode[];
}

function flattenRows(rows: TreeTableRow[], depth = 0): Array<TreeTableRow & { depth: number }> {
  return rows.flatMap((row) => [{ ...row, depth }, ...flattenRows(row.children ?? [], depth + 1)]);
}

export const TreeTable = forwardRef<HTMLTableElement, TreeTableProps>(function TreeTable(
  { rows, headers = [], className, ...props },
  ref,
) {
  const flatRows = flattenRows(rows);
  return (
    <Table ref={ref} role="treegrid" className={className} {...props}>
      {headers.length > 0 && (
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {headers.map((header, index) => <TableHead key={index}>{header}</TableHead>)}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {flatRows.map((row) => (
          <TableRow key={row.id} aria-level={row.depth + 1}>
            <TableCell style={{ paddingLeft: `calc(var(--s-spacing-4,1rem) * ${row.depth + 1})` }}>{row.label}</TableCell>
            {row.values?.map((value, index) => <TableCell key={index}>{value}</TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

