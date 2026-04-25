"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback when page changes. */
  onPageChange?: (page: number) => void;
  /** Number of page buttons visible around current. @default 1 */
  siblingCount?: number;
}

function range(start: number, end: number) {
  const result: number[] = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}

function usePaginationRange(current: number, total: number, siblings: number) {
  const totalPageNumbers = siblings * 2 + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblings);
    return [...leftRange, -1, total];
  }
  if (showLeftDots && !showRightDots) {
    const rightRange = range(total - (2 + 2 * siblings), total);
    return [1, -1, ...rightRange];
  }
  return [1, -1, ...range(leftSibling, rightSibling), -2, total];
}

/** Pagination with prev/next and numbered page buttons. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { currentPage, totalPages, onPageChange, siblingCount = 1, className, ...rest },
  ref,
) {
  const { play } = useSigilSound();
  const pages = usePaginationRange(currentPage, totalPages, siblingCount);

  const handlePageChange = (page: number) => { play("nav"); onPageChange?.(page); };

  const buttonBase = cn(
    "inline-flex items-center justify-center h-8 min-w-8 px-2 text-sm rounded-[var(--s-radius-sm,4px)]",
    "transition-colors duration-[var(--s-duration-fast,150ms)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)]",
    "disabled:opacity-50 disabled:pointer-events-none",
  );

  return (
    <nav ref={ref} data-slot="pagination" aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...rest}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={cn(buttonBase, "text-[var(--s-text-muted)] hover:bg-[var(--s-surface)]")}
        aria-label="Previous page"
      >
        &larr; Prev
      </button>

      {pages.map((page, i) =>
        page < 0 ? (
          <span key={`dots-${i}`} className="px-1 text-[var(--s-text-muted)]" aria-hidden>
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              buttonBase,
              page === currentPage
                ? "bg-[var(--s-primary)] text-[var(--s-primary-contrast)]"
                : "text-[var(--s-text-muted)] hover:bg-[var(--s-surface)]",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={cn(buttonBase, "text-[var(--s-text-muted)] hover:bg-[var(--s-surface)]")}
        aria-label="Next page"
      >
        Next &rarr;
      </button>
    </nav>
  );
});
