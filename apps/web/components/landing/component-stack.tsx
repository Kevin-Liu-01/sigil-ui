"use client";

import { useState, useMemo, type HTMLAttributes } from "react";
import Image from "next/image";
import {
  Button,
  Badge,
  Switch,
  Slider,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  Calendar,
  Carousel,
  CarouselContent,
  CarouselItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  MonoLabel,
  TabularValue,
  DensityText,
  cn,
} from "@sigil-ui/components";

/* ================================================================ */
/* Data                                                               */
/* ================================================================ */

const CAT: Record<string, { color: string; label: string }> = {
  behavior:  { color: "oklch(0.58 0.16 240)", label: "Behavior" },
  animation: { color: "oklch(0.62 0.20 280)", label: "Animation" },
  sound:     { color: "oklch(0.64 0.18 155)", label: "Sound" },
  viz:       { color: "oklch(0.62 0.15 55)",  label: "Visualization" },
  icon:      { color: "oklch(0.55 0.12 240)", label: "Icons" },
  utility:   { color: "oklch(0.50 0.05 260)", label: "Core" },
  tokens:    { color: "oklch(0.62 0.19 275)", label: "Design" },
};

interface LibEntry {
  name: string;
  shortLabel: string;
  cat: string;
  logo?: string;
  desc: string;
  url?: string;
}

const LIBS: Record<string, LibEntry> = {
  "radix-slot":      { name: "Radix UI",         shortLabel: "radix",      cat: "behavior",  logo: "/logos/radix.svg",    desc: "Accessible primitives — focus management, keyboard nav, ARIA patterns", url: "https://radix-ui.com" },
  "radix-dialog":    { name: "Radix UI",         shortLabel: "radix",      cat: "behavior",  logo: "/logos/radix.svg",    desc: "Focus trap, portal rendering, overlay, and ARIA dialog pattern", url: "https://radix-ui.com" },
  "radix-accordion": { name: "Radix UI",         shortLabel: "radix",      cat: "behavior",  logo: "/logos/radix.svg",    desc: "Keyboard-navigable expand/collapse with ARIA accordion", url: "https://radix-ui.com" },
  "radix-tabs":      { name: "Radix UI",         shortLabel: "radix",      cat: "behavior",  logo: "/logos/radix.svg",    desc: "Tab list + panels with ARIA roles and focus management", url: "https://radix-ui.com" },
  "cmdk":            { name: "cmdk",             shortLabel: "cmdk",       cat: "behavior",                                desc: "Composable command menu with fuzzy search", url: "https://cmdk.paco.me" },
  "day-picker":      { name: "react-day-picker", shortLabel: "day-picker", cat: "behavior",                                desc: "Calendar grid with date picking, range selection, locales" },
  "embla":           { name: "Embla Carousel",   shortLabel: "embla",      cat: "behavior",  logo: "/logos/embla.svg",    desc: "Lightweight carousel engine with plugin system", url: "https://embla-carousel.com" },
  "vaul":            { name: "Vaul",             shortLabel: "vaul",       cat: "behavior",                                desc: "Drawer with gesture handling and snap points" },
  "sonner":          { name: "Sonner",           shortLabel: "sonner",     cat: "behavior",                                desc: "Toast stack with smooth stacking animations", url: "https://sonner.emilkowal.ski" },
  "gsap":            { name: "GSAP",             shortLabel: "gsap",       cat: "animation", logo: "/logos/gsap.svg",      desc: "Professional animation engine with timeline sequencing", url: "https://gsap.com" },
  "scroll-trigger":  { name: "ScrollTrigger",    shortLabel: "scroll",     cat: "animation", logo: "/logos/gsap.svg",      desc: "Scroll-driven triggers, pinning, and scrubbing", url: "https://gsap.com" },
  "sound":           { name: "Sigil Sound",      shortLabel: "sound",      cat: "sound",                                   desc: "Built-in audio feedback for clicks, hovers, state changes" },
  "recharts":        { name: "Recharts",         shortLabel: "recharts",   cat: "viz",                                     desc: "Composable chart primitives built on React and D3", url: "https://recharts.org" },
  "d3-delaunay":     { name: "D3",               shortLabel: "d3",         cat: "viz",       logo: "/logos/d3.svg",        desc: "Delaunay triangulation and Voronoi tessellation", url: "https://d3js.org" },
  "lucide":          { name: "Lucide",           shortLabel: "lucide",     cat: "icon",      logo: "/logos/lucide.svg",    desc: "1000+ tree-shakeable SVG icons for React", url: "https://lucide.dev" },
  "clsx":            { name: "clsx",             shortLabel: "clsx",       cat: "utility",                                  desc: "Tiny utility for conditional className strings" },
  "tw-merge":        { name: "tailwind-merge",   shortLabel: "tw-merge",   cat: "utility",   logo: "/logos/tailwind.svg",  desc: "Merge Tailwind classes without style conflicts" },
  "tokens":          { name: "Token System",     shortLabel: "tokens",     cat: "tokens",                                   desc: "519 CSS custom properties — var(--s-primary), var(--s-radius-md), …" },
};

interface CompDef { id: string; name: string; libs: string[]; jsx: string }

const COMPS: CompDef[] = [
  { id: "button",    name: "Button",          libs: ["radix-slot", "sound", "tokens", "clsx", "tw-merge"],                         jsx: '<Button>Get Started</Button>' },
  { id: "dialog",    name: "Dialog",          libs: ["radix-dialog", "tokens", "clsx", "tw-merge"],                                jsx: '<Dialog><DialogContent>…</DialogContent></Dialog>' },
  { id: "command",   name: "Command",         libs: ["cmdk", "radix-dialog", "lucide", "tokens", "clsx", "tw-merge"],              jsx: '<CommandDialog><CommandInput />…</CommandDialog>' },
  { id: "calendar",  name: "Calendar",        libs: ["day-picker", "lucide", "tokens", "clsx", "tw-merge"],                        jsx: '<Calendar selected={date} />' },
  { id: "carousel",  name: "Carousel",        libs: ["embla", "sound", "tokens", "clsx", "tw-merge"],                              jsx: '<Carousel><CarouselContent /></Carousel>' },
  { id: "accordion", name: "Accordion",       libs: ["radix-accordion", "sound", "tokens", "clsx", "tw-merge"],                    jsx: '<Accordion><AccordionItem>…</AccordionItem></Accordion>' },
  { id: "tabs",      name: "Tabs",            libs: ["radix-tabs", "sound", "tokens", "clsx", "tw-merge"],                         jsx: '<Tabs><TabsList>…</TabsList></Tabs>' },
  { id: "animate",   name: "AnimateOnScroll", libs: ["gsap", "scroll-trigger", "tokens", "clsx", "tw-merge"],                      jsx: '<AnimateOnScroll preset="fade-up" />' },
  { id: "chart",     name: "Chart",           libs: ["recharts", "tokens", "clsx", "tw-merge"],                                    jsx: '<ChartContainer><BarChart /></ChartContainer>' },
  { id: "voronoi",   name: "VoronoiBento",    libs: ["d3-delaunay", "tokens", "clsx", "tw-merge"],                                 jsx: '<VoronoiBento cells={cells} />' },
];

/* ================================================================ */
/* Callout positions (matches component-anatomy viewBox 520x360)     */
/* ================================================================ */

const CALLOUT_SLOTS: {
  path: string;
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { path: "M192 142 L120 82 L68 82",   x: 64,  y: 78,  anchor: "start" },
  { path: "M328 142 L400 82 L452 82",  x: 456, y: 78,  anchor: "end" },
  { path: "M192 208 L120 275 L68 275",  x: 64,  y: 271, anchor: "start" },
  { path: "M328 208 L400 275 L452 275", x: 456, y: 271, anchor: "end" },
  { path: "M260 232 L260 318",          x: 260, y: 334, anchor: "middle" },
  { path: "M310 232 L392 318 L444 318", x: 448, y: 314, anchor: "start" },
];

/* ================================================================ */
/* Live component previews                                            */
/* ================================================================ */

function ComponentPreview({ id }: { id: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  switch (id) {
    case "button":
      return (
        <div className="flex flex-col items-center gap-3">
          <Button>Get Started</Button>
          <div className="flex items-center gap-2">
            <Badge>New</Badge>
            <div className="h-8 w-24 rounded-[var(--s-radius-md,6px)] border border-[var(--s-border)] bg-[var(--s-background)]" />
          </div>
        </div>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Token Editor</DialogTitle><DialogDescription>Radix Dialog with focus trap, portal, and ARIA.</DialogDescription></DialogHeader>
            <div className="grid gap-2 py-2"><Input placeholder="--s-primary" /><Input placeholder="oklch(0.7 0.15 280)" /></div>
          </DialogContent>
        </Dialog>
      );
    case "command":
      return (
        <div className="max-w-[240px] border border-[var(--s-border)] overflow-hidden" style={{ borderRadius: "var(--s-radius-md, 6px)" }}>
          <Command><CommandInput placeholder="Search..." /><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Actions"><CommandItem>Switch Preset</CommandItem><CommandItem>Edit Tokens</CommandItem></CommandGroup></CommandList></Command>
        </div>
      );
    case "calendar":
      return <Calendar mode="single" selected={date} onSelect={setDate} className="border border-[var(--s-border)]" />;
    case "carousel":
      return (
        <Carousel className="max-w-[220px]">
          <CarouselContent>
            {["A", "B", "C"].map((s) => (
              <CarouselItem key={s}><div className="flex h-16 items-center justify-center border border-[var(--s-border)] bg-[var(--s-surface)] font-[family-name:var(--s-font-mono)] text-[12px] text-[var(--s-text-muted)]">Slide {s}</div></CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    case "accordion":
      return (
        <Accordion type="single" collapsible className="max-w-[240px]">
          <AccordionItem value="a"><AccordionTrigger>What are tokens?</AccordionTrigger><AccordionContent>CSS custom properties.</AccordionContent></AccordionItem>
          <AccordionItem value="b"><AccordionTrigger>What are presets?</AccordionTrigger><AccordionContent>Bundled token values.</AccordionContent></AccordionItem>
        </Accordion>
      );
    case "tabs":
      return (
        <Tabs defaultValue="a" className="max-w-[220px]">
          <TabsList><TabsTrigger value="a">Design</TabsTrigger><TabsTrigger value="b">Code</TabsTrigger><TabsTrigger value="c">Preview</TabsTrigger></TabsList>
          <TabsContent value="a" className="mt-2 p-2 border border-[var(--s-border)] text-[var(--s-text-muted)] text-xs">Edit tokens.</TabsContent>
          <TabsContent value="b" className="mt-2 p-2 border border-[var(--s-border)] text-[var(--s-text-muted)] text-xs">Write overrides.</TabsContent>
          <TabsContent value="c" className="mt-2 p-2 border border-[var(--s-border)] text-[var(--s-text-muted)] text-xs">See changes.</TabsContent>
        </Tabs>
      );
    case "animate":
      return (
        <div className="flex items-center gap-3">
          <div className="space-y-2 animate-[s-fade-in_800ms_ease]">
            <div className="h-2.5 w-28 bg-[var(--s-text)] rounded" style={{ opacity: 0.6 }} />
            <div className="h-2.5 w-36 bg-[var(--s-text)] rounded" style={{ opacity: 0.35 }} />
            <div className="h-2.5 w-20 bg-[var(--s-text)] rounded" style={{ opacity: 0.15 }} />
          </div>
          <Slider defaultValue={[65]} className="w-20" />
        </div>
      );
    case "chart":
      return (
        <div className="flex items-end gap-1.5 h-16">
          {[40, 70, 55, 85, 60, 90, 45].map((h, i) => (
            <div key={i} className="w-4" style={{ height: `${h}%`, background: i === 5 ? "var(--s-primary)" : "color-mix(in oklch, var(--s-primary) 30%, var(--s-surface))", borderRadius: "var(--s-radius-sm, 2px) var(--s-radius-sm, 2px) 0 0" }} />
          ))}
        </div>
      );
    case "voronoi":
      return (
        <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
          <polygon points="0,0 50,0 35,30 0,25" fill="var(--s-surface)" stroke="var(--s-border)" />
          <polygon points="50,0 110,0 95,25 35,30" fill="color-mix(in oklch, var(--s-primary) 10%, var(--s-surface))" stroke="var(--s-border)" />
          <polygon points="110,0 160,0 160,35 95,25" fill="var(--s-surface)" stroke="var(--s-border)" />
          <polygon points="0,25 35,30 25,60 0,60" fill="color-mix(in oklch, var(--s-primary) 8%, var(--s-surface))" stroke="var(--s-border)" />
          <polygon points="35,30 95,25 110,60 25,60" fill="var(--s-surface)" stroke="var(--s-border)" />
          <polygon points="95,25 160,35 160,60 110,60" fill="color-mix(in oklch, var(--s-primary) 14%, var(--s-surface))" stroke="var(--s-border)" />
        </svg>
      );
    default:
      return <Button variant="outline">{id}</Button>;
  }
}

/* ================================================================ */
/* Main component                                                     */
/* ================================================================ */

export interface ComponentStackDiagramProps extends HTMLAttributes<HTMLDivElement> {}

export function ComponentStackDiagram({ className, ...rest }: ComponentStackDiagramProps) {
  const [activeId, setActiveId] = useState("button");
  const [hovered, setHovered] = useState<string | null>(null);
  const comp = COMPS.find((c) => c.id === activeId) ?? COMPS[0];

  const libs = useMemo(
    () => comp.libs.map((id) => ({ id, ...(LIBS[id] ?? { name: id, shortLabel: id, cat: "utility", desc: "" }) })),
    [comp],
  );

  const activeLib = libs.find((l) => l.id === hovered) ?? libs[0];

  return (
    <div
      data-slot="component-stack-diagram"
      className={cn("overflow-hidden border border-[var(--s-border)] bg-[var(--s-background)]", className)}
      {...rest}
    >
      {/* Component selector tabs */}
      <div className="flex gap-0 border-b border-[var(--s-border)] overflow-x-auto">
        {COMPS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => { setActiveId(c.id); setHovered(null); }}
            className={cn(
              "bg-transparent border-0 border-b-2 px-3 py-2.5 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)] shrink-0",
              activeId === c.id
                ? "text-[var(--s-text)] border-b-[var(--s-primary)] bg-[color-mix(in_oklch,var(--s-primary)_4%,transparent)]"
                : "text-[var(--s-text-muted)] border-b-transparent hover:text-[var(--s-text)] hover:bg-[var(--s-surface)]",
            )}
          >
            <MonoLabel size="sm" variant={activeId === c.id ? "accent" : "muted"}>{c.name}</MonoLabel>
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div key={comp.id} className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] animate-[s-fade-in_200ms_ease]">

        {/* ────────── LEFT: Blueprint ────────── */}
        <div className="relative min-h-[460px] border-b border-[var(--s-border)] bg-[var(--s-background)] p-5 lg:border-b-0 lg:border-r">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(var(--s-text) 1px, transparent 1px), linear-gradient(90deg, var(--s-text) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Header */}
          <div className="relative z-[1] flex items-center justify-between gap-3">
            <MonoLabel variant="accent">component blueprint</MonoLabel>
            <TabularValue size="xs" muted>libraries in use</TabularValue>
          </div>

          {/* SVG + overlaid component */}
          <div className="relative z-[1] mt-6 h-[370px]">
            <svg viewBox="0 0 520 380" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              {/* Dashed outer frame */}
              <rect x="150" y="110" width="220" height="140" stroke="var(--s-border)" strokeDasharray="5 5" opacity="0.72" />
              {/* Inner filled area */}
              <rect x="175" y="128" width="170" height="94" fill="color-mix(in oklch, var(--s-primary) 6%, var(--s-background))" stroke="var(--s-border)" />
              {/* Cross-hair guides */}
              <line x1="260" y1="56" x2="260" y2="310" stroke="var(--s-border-muted)" strokeDasharray="3 5" />
              <line x1="92" y1="175" x2="428" y2="175" stroke="var(--s-border-muted)" strokeDasharray="3 5" />

              {/* Callout lines + labels */}
              {libs.map((lib, i) => {
                if (i >= CALLOUT_SLOTS.length) return null;
                const slot = CALLOUT_SLOTS[i];
                const active = hovered === lib.id;
                const catColor = CAT[lib.cat]?.color ?? "var(--s-border)";

                return (
                  <g key={lib.id} className="cursor-pointer" onMouseEnter={() => setHovered(lib.id)} onMouseLeave={() => setHovered(null)}>
                    {/* Line */}
                    <path
                      d={slot.path}
                      stroke={active ? catColor : "var(--s-border)"}
                      strokeWidth={active ? 1.5 : 1}
                      strokeDasharray={active ? undefined : "4 4"}
                      style={{ transition: "stroke 150ms ease" }}
                    />
                    {/* Dot */}
                    <circle
                      cx={slot.x}
                      cy={slot.y + 4}
                      r={active ? 4 : 3}
                      fill={active ? catColor : "var(--s-border)"}
                      style={{ transition: "fill 150ms ease, r 150ms ease" }}
                    />
                    {/* Logo (if available) */}
                    {lib.logo && (
                      <image
                        href={lib.logo}
                        x={slot.anchor === "end" ? slot.x - 20 : slot.anchor === "middle" ? slot.x - 8 : slot.x + 8}
                        y={slot.y - 18}
                        width="16"
                        height="16"
                        opacity={active ? 1 : 0.4}
                        style={{
                          transition: "opacity 150ms ease",
                          filter: active ? "none" : "grayscale(100%)",
                        }}
                      />
                    )}
                    {/* Label */}
                    <text
                      x={slot.anchor === "end" ? (lib.logo ? slot.x - 22 : slot.x) : slot.anchor === "middle" ? slot.x : (lib.logo ? slot.x + 26 : slot.x)}
                      y={slot.y - 6}
                      textAnchor={slot.anchor}
                      className="font-[family-name:var(--s-font-mono)]"
                      fill={active ? catColor : "var(--s-text-muted)"}
                      fontSize={10}
                      fontWeight={700}
                      letterSpacing="0.12em"
                      style={{ transition: "fill 150ms ease" }}
                    >
                      {lib.shortLabel.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Overlaid real component */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto" style={{ top: "-10px" }}>
              <div
                className="relative border border-[var(--s-border)] bg-[var(--s-surface)] p-5 shadow-[var(--s-shadow-md)]"
                onMouseEnter={() => setHovered(null)}
              >
                <ComponentPreview id={comp.id} />
                <div className="absolute -bottom-6 left-1/2 h-3 w-32 -translate-x-1/2 border border-[var(--s-border-muted)] bg-[var(--s-text)]/5 blur-[1px]" />
              </div>
            </div>

            {/* Bottom logo boxes */}
            <div className="absolute bottom-0 left-2 right-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(libs.length, 6)}, 1fr)` }}>
              {libs.slice(0, 6).map((lib, i) => {
                const active = hovered === lib.id;
                return (
                  <div
                    key={lib.id}
                    className={cn(
                      "border bg-[var(--s-background)] p-2 cursor-pointer transition-all duration-[var(--s-duration-fast,150ms)]",
                      active ? "border-[var(--s-primary)] shadow-[var(--s-shadow-sm)]" : "border-[var(--s-border)] hover:border-[var(--s-border-strong)]",
                    )}
                    onMouseEnter={() => setHovered(lib.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <TabularValue size="xs" muted>{String(i + 1).padStart(2, "0")}</TabularValue>
                      {lib.logo && (
                        <Image
                          src={lib.logo}
                          alt={lib.name}
                          width={12}
                          height={12}
                          className="object-contain"
                          style={{ filter: active ? "none" : "grayscale(100%) brightness(0.5)" }}
                          unoptimized
                        />
                      )}
                    </div>
                    <MonoLabel size="xs" className="block leading-tight" variant={active ? "accent" : "muted"}>
                      {lib.shortLabel}
                    </MonoLabel>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ────────── RIGHT: Detail panel ────────── */}
        <div className="relative bg-[var(--s-surface)] p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <MonoLabel variant="accent" className="mb-2 block">libraries attached</MonoLabel>
              <DensityText role="body" as="p" muted className="max-w-[420px] leading-relaxed">
                Every library listed here ships automatically when you use this component. No extra imports.
              </DensityText>
            </div>
            <Badge variant="outline" className="font-[family-name:var(--s-font-mono)]">
              {CAT[activeLib.cat]?.label}
            </Badge>
          </div>

          {/* Active library detail */}
          <div className="mb-5 border border-[var(--s-border)] bg-[var(--s-background)] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <MonoLabel variant="accent" size="sm">selected library</MonoLabel>
              {activeLib.logo && (
                <Image src={activeLib.logo} alt={activeLib.name} width={20} height={20} className="object-contain" unoptimized />
              )}
            </div>
            <DensityText role="headline" as="h3" className="mb-2 text-xl font-semibold">
              {activeLib.name}
            </DensityText>
            <MonoLabel className="mb-3 block normal-case tracking-normal">
              {activeLib.shortLabel}
            </MonoLabel>
            <DensityText role="body" as="p" muted className="leading-relaxed">
              {activeLib.desc}
            </DensityText>
            {activeLib.url && (
              <a href={activeLib.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-[family-name:var(--s-font-mono)] text-[11px] text-[var(--s-primary)] no-underline hover:underline">
                {activeLib.url.replace("https://", "")} →
              </a>
            )}
          </div>

          {/* Library card grid */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {libs.map((lib) => {
              const active = hovered === lib.id;
              const catDef = CAT[lib.cat];
              return (
                <div
                  key={lib.id}
                  className={cn(
                    "cursor-default border bg-[var(--s-background)] p-3 transition-all duration-[var(--s-duration-fast,150ms)]",
                    active
                      ? "border-[var(--s-primary)] shadow-[var(--s-shadow-sm)]"
                      : "border-[var(--s-border)] hover:border-[var(--s-border-strong)]",
                  )}
                  onMouseEnter={() => setHovered(lib.id)}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {lib.logo ? (
                        <Image
                          src={lib.logo}
                          alt={lib.name}
                          width={16}
                          height={16}
                          className="object-contain"
                          style={{ filter: active ? "none" : "grayscale(100%) brightness(0.5)", transition: "filter 150ms ease" }}
                          unoptimized
                        />
                      ) : (
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full" style={{ background: catDef?.color }} />
                        </div>
                      )}
                      <DensityText role="detail" className="font-semibold">{lib.name}</DensityText>
                    </div>
                    <TabularValue size="xs" muted>{catDef?.label}</TabularValue>
                  </div>
                  <div className="h-1.5 bg-[var(--s-border-muted)]">
                    <div
                      className="h-full transition-all duration-[var(--s-duration-fast,150ms)]"
                      style={{ width: active ? "100%" : "42%", background: catDef?.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
