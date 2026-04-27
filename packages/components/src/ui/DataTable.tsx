"use client";

import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode, type Ref } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import { cn } from "../utils";

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell?: (row: T, index: number) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: string | ((row: T, index: number) => string);
  getRowId?: (row: T, index: number) => string;
}

function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    className,
    emptyMessage = "No results.",
    onRowClick,
    rowClassName,
    getRowId,
  }: DataTableProps<T>,
  ref: ForwardedRef<HTMLTableElement>,
) {
  return (
    <Table ref={ref} data-slot="data-table" className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-[var(--s-text-muted)]"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIdx) => {
            const rowCls =
              typeof rowClassName === "function"
                ? rowClassName(row, rowIdx)
                : rowClassName;

            return (
              <TableRow
                key={getRowId?.(row, rowIdx) ?? String(row.id ?? row.key ?? rowIdx)}
                onClick={onRowClick ? () => onRowClick(row, rowIdx) : undefined}
                className={cn(
                  onRowClick && "cursor-pointer",
                  rowCls,
                )}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.cell
                      ? col.cell(row, rowIdx)
                      : (row[col.key] as ReactNode) ?? null}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export const DataTable = forwardRef(DataTableInner) as <T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement | null;
