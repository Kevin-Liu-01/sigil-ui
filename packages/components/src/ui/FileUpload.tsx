"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type HTMLAttributes,
} from "react";
import { cn } from "../utils";

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  onChange?: (files: File[]) => void;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  { accept, multiple = false, maxSize, disabled, onChange, className, children, ...props },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      let arr = Array.from(files);
      if (maxSize) arr = arr.filter((f) => f.size <= maxSize);
      if (!multiple) arr = arr.slice(0, 1);
      onChange?.(arr);
    },
    [maxSize, multiple, onChange],
  );

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <div
      ref={ref}
      data-slot="file-upload"
      data-dragging={isDragging || undefined}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-8",
        "rounded-[var(--s-radius-md,8px)]",
        "border-2 border-dashed border-[var(--s-border)]",
        "bg-[var(--s-background)]",
        "cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)]",
        "hover:border-[var(--s-primary)] hover:bg-[var(--s-surface)]",
        isDragging && "border-[var(--s-primary)] bg-[var(--s-surface)]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />
      {children ?? (
        <>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="text-[var(--s-text-muted)]"
            aria-hidden
          >
            <path d="M20 6v20M12 14l8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 26v6a2 2 0 002 2h24a2 2 0 002-2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm font-medium text-[var(--s-text)]">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-[var(--s-text-muted)]">
            {accept ? `Accepted: ${accept}` : "Any file type"}
            {maxSize && ` · Max ${Math.round(maxSize / 1024 / 1024)}MB`}
          </p>
        </>
      )}
    </div>
  );
});
