"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type LogoBarItem = {
  src: string;
  alt: string;
};

export type LogoBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Logo images to display. */
  logos: LogoBarItem[];
};

/** Logo/brand showcase bar — typically used for social proof. */
export const LogoBar = forwardRef<HTMLDivElement, LogoBarProps>(function LogoBar(
  { logos, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="logo-bar"
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8 px-6",
        "opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300",
        className,
      )}
      {...rest}
    >
      {logos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="h-8 md:h-10 w-auto object-contain"
          loading="lazy"
        />
      ))}
    </div>
  );
});
