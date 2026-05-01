"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "../utils";
import { useSigilSound } from "../sound-context";

/* -------------------------------- Context -------------------------------- */

type EmblaApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  emblaRef: UseEmblaCarouselType[0];
  api: EmblaApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  orientation: "horizontal" | "vertical";
  tilt: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used within <Carousel>");
  return ctx;
}

/* -------------------------------- Carousel ------------------------------- */

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  opts?: Parameters<typeof useEmblaCarousel>[0];
  /** Enable 3D tilt perspective on slides. */
  tilt?: boolean;
  children?: ReactNode;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { orientation = "horizontal", opts, tilt = false, className, children, ...rest },
  ref,
) {
  const [emblaRef, api] = useEmblaCarousel({
    axis: orientation === "vertical" ? "y" : "x",
    ...opts,
  });

  const { play } = useSigilSound();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => { play("nav"); api?.scrollPrev(); }, [api, play]);
  const scrollNext = useCallback(() => { play("nav"); api?.scrollNext(); }, [api, play]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{ emblaRef, api, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation, tilt }}
    >
      <div
        ref={ref}
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        className={cn("relative", className)}
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

/* ----------------------------- CarouselContent --------------------------- */

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  function CarouselContent({ className, ...rest }, ref) {
    const { emblaRef, orientation, tilt: isTilt } = useCarousel();

    return (
      <div ref={emblaRef} className="overflow-hidden" style={isTilt ? { perspective: "800px" } : undefined}>
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col" : "-ml-4",
            isTilt && "[&>div]:transition-transform [&>div]:duration-[var(--s-duration-normal)]",
            className,
          )}
          style={isTilt ? { transformStyle: "preserve-3d" } : undefined}
          {...rest}
        />
      </div>
    );
  },
);

/* ------------------------------ CarouselItem ----------------------------- */

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  function CarouselItem({ className, ...rest }, ref) {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "vertical" ? "pt-4" : "pl-4",
          className,
        )}
        {...rest}
      />
    );
  },
);

/* ----------------------------- Nav Buttons ------------------------------- */

export interface CarouselButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselButtonProps>(
  function CarouselPrevious({ className, children, ...rest }, ref) {
    const { scrollPrev, canScrollPrev, orientation } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          "absolute z-10 inline-flex h-8 w-8 items-center justify-center rounded-[var(--s-radius-full,9999px)]",
          "border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)] text-[var(--s-text)]",
          "shadow-[var(--s-shadow-sm)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-primary)]/10 disabled:opacity-40 disabled:pointer-events-none",
          orientation === "vertical"
            ? "-top-10 left-1/2 -translate-x-1/2"
            : "-left-10 top-1/2 -translate-y-1/2",
          className,
        )}
        {...rest}
      >
        {children ?? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d={orientation === "vertical" ? "M3 8.5l4-4 4 4" : "M8.5 3l-4 4 4 4"}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  },
);

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselButtonProps>(
  function CarouselNext({ className, children, ...rest }, ref) {
    const { scrollNext, canScrollNext, orientation } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          "absolute z-10 inline-flex h-8 w-8 items-center justify-center rounded-[var(--s-radius-full,9999px)]",
          "border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)] text-[var(--s-text)]",
          "shadow-[var(--s-shadow-sm)] transition-colors duration-[var(--s-duration-fast,150ms)]",
          "hover:bg-[var(--s-primary)]/10 disabled:opacity-40 disabled:pointer-events-none",
          orientation === "vertical"
            ? "-bottom-10 left-1/2 -translate-x-1/2"
            : "-right-10 top-1/2 -translate-y-1/2",
          className,
        )}
        {...rest}
      >
        {children ?? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d={orientation === "vertical" ? "M3 5.5l4 4 4-4" : "M5.5 3l4 4-4 4"}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  },
);
