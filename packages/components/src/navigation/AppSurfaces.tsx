"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { cn } from "../utils";

export const ContainerQuery = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ContainerQuery(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("@container", className)} {...props} />;
});

export interface SplitPaneProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
  ratio?: "1:1" | "1:2" | "2:1";
}

const splitRatios = {
  "1:1": "lg:grid-cols-2",
  "1:2": "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
  "2:1": "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
};

export const SplitPane = forwardRef<HTMLDivElement, SplitPaneProps>(function SplitPane(
  { left, right, ratio = "1:1", children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("grid gap-4", splitRatios[ratio], className)} {...props}>
      {left}
      {right}
      {children}
    </div>
  );
});

export const Dock = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Dock({ className, ...props }, ref) {
  return (
    <nav
      ref={ref}
      data-slot="dock"
      className={cn("fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-[var(--s-radius-full,9999px)] border border-[var(--s-border)] bg-[var(--s-overlay-surface,var(--s-surface))] p-1 shadow-[var(--s-shadow-lg)]", className)}
      {...props}
    />
  );
});

export const TopBar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function TopBar({ className, ...props }, ref) {
  return <header ref={ref} className={cn("sticky top-0 z-40 flex min-h-14 items-center border-b border-[var(--s-border)] bg-[var(--s-background)]/90 px-4 backdrop-blur", className)} {...props} />;
});

export const BottomBar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function BottomBar({ className, ...props }, ref) {
  return <footer ref={ref} className={cn("sticky bottom-0 z-40 flex min-h-14 items-center border-t border-[var(--s-border)] bg-[var(--s-background)]/90 px-4 backdrop-blur", className)} {...props} />;
});

export const MobileNav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function MobileNav({ className, ...props }, ref) {
  return <nav ref={ref} className={cn("flex items-center gap-2 overflow-x-auto p-2 md:hidden", className)} {...props} />;
});

export const SidebarNav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function SidebarNav({ className, ...props }, ref) {
  return <nav ref={ref} className={cn("grid gap-1 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] bg-[var(--s-surface)] p-2", className)} {...props} />;
});

export interface HeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const AppHeader = forwardRef<HTMLDivElement, HeaderProps>(function AppHeader(
  { title, description, actions, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-between gap-4 border-b border-[var(--s-border)] pb-4", className)} {...props}>
      <div className="grid gap-1">
        {title && <h1 className="text-xl font-semibold text-[var(--s-text)]">{title}</h1>}
        {description && <p className="text-sm text-[var(--s-text-muted)]">{description}</p>}
        {children}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
});

export const PageHeader = forwardRef<HTMLDivElement, HeaderProps>(function PageHeader({ className, ...props }, ref) {
  return <AppHeader ref={ref} className={cn("py-6", className)} {...props} />;
});

export const SectionHeader = forwardRef<HTMLDivElement, HeaderProps>(function SectionHeader({ className, ...props }, ref) {
  return <AppHeader ref={ref} className={cn("border-b-0 pb-2", className)} {...props} />;
});

export interface ContentTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Array<{ value: string; label: ReactNode; content: ReactNode }>;
  defaultValue?: string;
}

export const ContentTabs = forwardRef<HTMLDivElement, ContentTabsProps>(function ContentTabs(
  { tabs, defaultValue, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={className} {...props}>
      <Tabs defaultValue={defaultValue ?? tabs[0]?.value}>
        <TabsList>
          {tabs.map((tab) => <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>)}
        </TabsList>
        {tabs.map((tab) => <TabsContent key={tab.value} value={tab.value}>{tab.content}</TabsContent>)}
      </Tabs>
    </div>
  );
});

export interface AnchorNavItem {
  href: string;
  label: ReactNode;
}

export interface AnchorNavProps extends HTMLAttributes<HTMLElement> {
  items: AnchorNavItem[];
}

export const AnchorNav = forwardRef<HTMLElement, AnchorNavProps>(function AnchorNav(
  { items, className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cn("flex flex-wrap gap-2", className)} {...props}>
      {items.map((item) => (
        <a key={item.href} href={item.href} className="rounded-[var(--s-radius-sm,4px)] px-2 py-1 text-sm text-[var(--s-text-muted)] hover:bg-[var(--s-surface)] hover:text-[var(--s-text)]">
          {item.label}
        </a>
      ))}
    </nav>
  );
});

export const TableOfContents = forwardRef<HTMLElement, AnchorNavProps>(function TableOfContents(
  { className, ...props },
  ref,
) {
  return <AnchorNav ref={ref} className={cn("grid gap-1", className)} {...props} />;
});

export interface ScrollSpyProps extends AnchorNavProps {
  activeClassName?: string;
}

export const ScrollSpy = forwardRef<HTMLElement, ScrollSpyProps>(function ScrollSpy(
  { items, activeClassName = "text-[var(--s-primary)]", className, ...props },
  ref,
) {
  const [active, setActive] = useState(items[0]?.href);
  useEffect(() => {
    const onScroll = () => {
      let current: AnchorNavItem | undefined;
      for (const item of items) {
        const element = document.querySelector(item.href);
        if (element && element.getBoundingClientRect().top <= 120) current = item;
      }
      if (current) setActive(current.href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav ref={ref} className={cn("grid gap-1", className)} {...props}>
      {items.map((item) => (
        <a key={item.href} href={item.href} className={cn("text-sm text-[var(--s-text-muted)] hover:text-[var(--s-text)]", active === item.href && activeClassName)}>
          {item.label}
        </a>
      ))}
    </nav>
  );
});

export const MasonryGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function MasonryGrid(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid", className)} {...props} />;
});

export interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  media?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(function MediaCard(
  { media, title, description, action, children, className, ...props },
  ref,
) {
  return (
    <Card ref={ref} className={className} {...props}>
      {media && <div className="overflow-hidden rounded-t-[var(--s-card-radius,10px)]">{media}</div>}
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {(children || action) && (
        <CardContent>
          {children}
          {action && <div className="mt-4">{action}</div>}
        </CardContent>
      )}
    </Card>
  );
});

export const ResourceCard = forwardRef<HTMLDivElement, MediaCardProps & { href?: string }>(function ResourceCard(
  { href, action, ...props },
  ref,
) {
  return <MediaCard ref={ref} action={action ?? (href && <Button asChild variant="outline"><a href={href}>Open</a></Button>)} {...props} />;
});

export const FeatureCard = forwardRef<HTMLDivElement, MediaCardProps & { icon?: ReactNode }>(function FeatureCard(
  { icon, title, description, children, ...props },
  ref,
) {
  return (
    <MediaCard
      ref={ref}
      media={icon && <div className="p-4 text-[var(--s-primary)]">{icon}</div>}
      title={title}
      description={description}
      {...props}
    >
      {children}
    </MediaCard>
  );
});

export interface PricingCardProps extends MediaCardProps {
  price?: ReactNode;
  features?: ReactNode[];
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(function PricingCard(
  { price, features, action, children, title, description, className, ...props },
  ref,
) {
  return (
    <Card ref={ref} className={className} {...props}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {price && <div className="pt-3 text-3xl font-semibold tabular-nums text-[var(--s-text)]">{price}</div>}
      </CardHeader>
      <CardContent>
        {features && <ul className="grid gap-2 text-sm text-[var(--s-text-muted)]">{features.map((feature, index) => <li key={index}>{feature}</li>)}</ul>}
        {children}
      </CardContent>
      {action && <CardFooter>{action}</CardFooter>}
    </Card>
  );
});

export const TestimonialCarousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TestimonialCarousel(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("flex snap-x gap-4 overflow-x-auto pb-2 [&>*]:min-w-[min(24rem,85vw)] [&>*]:snap-start", className)} {...props} />;
});
