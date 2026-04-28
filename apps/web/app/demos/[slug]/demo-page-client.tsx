"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Badge,
  Input,
  KPI,
  Separator,
  Progress,
  Avatar,
  Switch,
  Label,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Terminal,
  GapPixelGrid,
  GapPixelCell,
  MonoLabel,
  TabularValue,
  DensityText,
  AccentCTA,
  CardCell,
  FeaturedGrid,
  BorderStack,
  FrostedPanel,
  AccentActive,
} from "@sigil-ui/components";

/* -------------------------------------------------------------------------- */
/*  Preset color palettes                                                      */
/* -------------------------------------------------------------------------- */

type PresetColors = {
  bg: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
};

const presets: Record<string, PresetColors> = {
  sigil: {
    bg: "oklch(0.13 0.02 260)",
    surface: "oklch(0.17 0.02 260)",
    primary: "oklch(0.72 0.19 250)",
    text: "oklch(0.95 0.01 260)",
    textSecondary: "oklch(0.65 0.02 260)",
    border: "oklch(0.25 0.02 260)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  cobalt: {
    bg: "oklch(0.14 0.03 250)",
    surface: "oklch(0.18 0.03 250)",
    primary: "oklch(0.68 0.16 245)",
    text: "oklch(0.94 0.01 250)",
    textSecondary: "oklch(0.62 0.03 250)",
    border: "oklch(0.26 0.03 250)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  kova: {
    bg: "oklch(0.98 0.005 80)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.55 0.15 150)",
    text: "oklch(0.15 0.01 80)",
    textSecondary: "oklch(0.45 0.02 80)",
    border: "oklch(0.88 0.01 80)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  etch: {
    bg: "oklch(0.97 0.005 60)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.45 0.12 30)",
    text: "oklch(0.18 0.01 60)",
    textSecondary: "oklch(0.50 0.02 60)",
    border: "oklch(0.85 0.01 60)",
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Source Serif 4', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  shard: {
    bg: "oklch(0.12 0.04 300)",
    surface: "oklch(0.16 0.04 300)",
    primary: "oklch(0.75 0.22 330)",
    text: "oklch(0.95 0.01 300)",
    textSecondary: "oklch(0.65 0.03 300)",
    border: "oklch(0.24 0.04 300)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  noir: {
    bg: "oklch(0.10 0 0)",
    surface: "oklch(0.14 0 0)",
    primary: "oklch(0.85 0 0)",
    text: "oklch(0.92 0 0)",
    textSecondary: "oklch(0.55 0 0)",
    border: "oklch(0.22 0 0)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  rune: {
    bg: "oklch(0.96 0.008 50)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.42 0.10 25)",
    text: "oklch(0.20 0.01 50)",
    textSecondary: "oklch(0.50 0.02 50)",
    border: "oklch(0.86 0.01 50)",
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Lora', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  forge: {
    bg: "oklch(0.15 0.01 70)",
    surface: "oklch(0.19 0.01 70)",
    primary: "oklch(0.72 0.14 70)",
    text: "oklch(0.92 0.01 70)",
    textSecondary: "oklch(0.60 0.02 70)",
    border: "oklch(0.28 0.01 70)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  cipher: {
    bg: "oklch(0.08 0.02 160)",
    surface: "oklch(0.12 0.02 160)",
    primary: "oklch(0.78 0.18 160)",
    text: "oklch(0.78 0.18 160)",
    textSecondary: "oklch(0.50 0.06 160)",
    border: "oklch(0.18 0.02 160)",
    fontDisplay: "'JetBrains Mono', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
  },
};

/* -------------------------------------------------------------------------- */
/*  Demo registry                                                              */
/* -------------------------------------------------------------------------- */

type DemoEntry = {
  title: string;
  description: string;
  preset: PresetColors;
};

export const DEMOS: Record<string, DemoEntry> = {
  "ai-saas": {
    title: "AI SaaS",
    description: "Developer-facing cloud product with pricing tiers and technical hero.",
    preset: presets.sigil,
  },
  dashboard: {
    title: "Dashboard",
    description: "Analytics dashboard with KPIs, tables, and sidebar navigation.",
    preset: presets.cobalt,
  },
  ecommerce: {
    title: "E-Commerce",
    description: "Product catalog with search, cart, and product grid.",
    preset: presets.kova,
  },
  "dev-docs": {
    title: "Dev Docs",
    description: "Developer documentation with sidebar, code blocks, and monospace typography.",
    preset: presets.etch,
  },
  startup: {
    title: "Startup",
    description: "Bold full-bleed startup landing page with stats.",
    preset: presets.shard,
  },
  portfolio: {
    title: "Portfolio",
    description: "Dark, dramatic project portfolio with gradient cards.",
    preset: presets.noir,
  },
  blog: {
    title: "Blog",
    description: "Editorial blog with serif typography and article list.",
    preset: presets.rune,
  },
  agency: {
    title: "Agency",
    description: "Creative agency site with case studies and contact form.",
    preset: presets.forge,
  },
  "cli-tool": {
    title: "CLI Tool",
    description: "Terminal-first product page with green-on-black aesthetic.",
    preset: presets.cipher,
  },
  playground: {
    title: "Playground",
    description: "Tabbed component showcase across all categories.",
    preset: presets.sigil,
  },
  "linear-clone": {
    title: "Linear Clone",
    description: "Dark B2B SaaS landing inspired by Linear. Hero, logo cloud, bento grid, cinematic CTA.",
    preset: presets.noir,
  },
  "vercel-clone": {
    title: "Vercel Clone",
    description: "Developer platform marketing inspired by Vercel. Clean hero, feature rows, stats, split CTA.",
    preset: presets.kova,
  },
  "dedalus-clone": {
    title: "Dedalus Clone",
    description: "Dark developer tool landing inspired by Dedalus. Purple accent, install command, FAQ, code tabs.",
    preset: presets.sigil,
  },
  "voidzero-clone": {
    title: "VoidZero Clone",
    description: "Open source tooling site inspired by VoidZero. Gradient banner, accent headlines, ecosystem diagram.",
    preset: presets.shard,
  },
  "oxide-clone": {
    title: "Oxide Clone",
    description: "Industrial hardware site inspired by Oxide. Green accent, terminal hero, monospace design.",
    preset: presets.forge,
  },
  "vite-clone": {
    title: "Vite Clone",
    description: "Build tool landing inspired by Vite. Tabbed install, logo cloud, feature cards, dark theme.",
    preset: presets.cipher,
  },
  "viteplus-clone": {
    title: "VitePlus Clone",
    description: "Unified toolchain site inspired by VitePlus. Light theme, terminal demo, install section.",
    preset: presets.etch,
  },
};

/* -------------------------------------------------------------------------- */
/*  Root client component                                                      */
/* -------------------------------------------------------------------------- */

export default function DemoPageClient({ slug }: { slug: string }) {
  const demo = DEMOS[slug];
  if (!demo) notFound();

  const p = demo.preset;
  const vars = {
    "--s-background": p.bg,
    "--s-surface": p.surface,
    "--s-primary": p.primary,
    "--s-text": p.text,
    "--s-text-secondary": p.textSecondary,
    "--s-text-muted": p.textSecondary,
    "--s-border": p.border,
    "--s-border-muted": p.border,
    "--s-font-display": p.fontDisplay,
    "--s-font-body": p.fontBody,
    "--s-font-mono": p.fontMono,
    "--s-success": "oklch(0.72 0.19 155)",
    "--s-error": "oklch(0.65 0.22 25)",
    "--s-shadow-sm": "0 1px 2px oklch(0 0 0 / 0.15)",
    "--s-shadow-md": "0 4px 12px oklch(0 0 0 / 0.2)",
    "--s-card-radius": "8px",
    "--s-radius-md": "6px",
    "--s-radius-sm": "4px",
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...vars,
        background: p.bg,
        color: p.text,
        minHeight: "100vh",
        fontFamily: p.fontBody,
      }}
    >
      <DemoContent slug={slug} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Demo router                                                                */
/* -------------------------------------------------------------------------- */

function DemoContent({ slug }: { slug: string }) {
  const back = (
    <a href="/demos" className="fixed top-4 left-4 z-50 no-underline">
      <FrostedPanel edge="bottom" variant="frosted" className="px-3 py-1.5 text-[13px]">
        <span className="font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)]">← Demos</span>
      </FrostedPanel>
    </a>
  );

  switch (slug) {
    case "ai-saas":
      return <>{back}<AISaasDemo /></>;
    case "dashboard":
      return <>{back}<DashboardDemo /></>;
    case "ecommerce":
      return <>{back}<EcommerceDemo /></>;
    case "dev-docs":
      return <>{back}<DevDocsDemo /></>;
    case "startup":
      return <>{back}<StartupDemo /></>;
    case "portfolio":
      return <>{back}<PortfolioDemo /></>;
    case "blog":
      return <>{back}<BlogDemo /></>;
    case "agency":
      return <>{back}<AgencyDemo /></>;
    case "cli-tool":
      return <>{back}<CliToolDemo /></>;
    case "playground":
      return <>{back}<PlaygroundDemo /></>;
    case "linear-clone":
      return <>{back}<LinearCloneDemo /></>;
    case "vercel-clone":
      return <>{back}<VercelCloneDemo /></>;
    case "dedalus-clone":
      return <>{back}<DedalusCloneDemo /></>;
    case "voidzero-clone":
      return <>{back}<VoidZeroCloneDemo /></>;
    case "oxide-clone":
      return <>{back}<OxideCloneDemo /></>;
    case "vite-clone":
      return <>{back}<ViteCloneDemo /></>;
    case "viteplus-clone":
      return <>{back}<VitePlusCloneDemo /></>;
    default:
      notFound();
  }
}

/* -------------------------------------------------------------------------- */
/*  1. AI SaaS (sigil)                                                         */
/* -------------------------------------------------------------------------- */

function AISaasDemo() {
  return (
    <BorderStack>
      <FrostedPanel edge="bottom" variant="solid" as="nav" className="flex items-center justify-between px-8 py-4">
        <DensityText role="base" as="span" className="font-semibold">Sigil AI</DensityText>
        <div className="flex items-center gap-6">
          <DensityText role="nav" as="span" muted>Features</DensityText>
          <DensityText role="nav" as="span" muted>Docs</DensityText>
          <DensityText role="nav" as="span" muted>Pricing</DensityText>
          <AccentCTA size="sm">Login</AccentCTA>
        </div>
      </FrostedPanel>

      <section className="text-center py-24 px-6 max-w-[720px] mx-auto">
        <MonoLabel variant="accent" size="sm">GENERATIVE AI PLATFORM</MonoLabel>
        <DensityText role="headline" as="h1" className="!text-5xl mt-4 block">
          Ship AI Products Faster
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-4 leading-relaxed block">
          Full-stack inference platform with model training, fine-tuning, and deployment.
          Go from prototype to production in minutes, not months.
        </DensityText>
        <div className="flex gap-3 justify-center mt-8">
          <AccentCTA>Start Building</AccentCTA>
          <Button variant="outline">Read Docs</Button>
        </div>
      </section>

      <section className="px-6 pb-16 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">CAPABILITIES</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Model Training" footer={<MonoLabel>GPU CLUSTERS</MonoLabel>}>
            Distributed training on thousands of GPUs with automatic checkpointing and fault recovery.
          </CardCell>
          <CardCell title="Inference API" footer={<MonoLabel>SUB-100MS P99</MonoLabel>}>
            Deploy models behind a global edge network with automatic scaling and zero cold starts.
          </CardCell>
          <CardCell title="Fine-Tuning" footer={<MonoLabel>YOUR DATA</MonoLabel>}>
            Customize foundation models with your own data. RLHF, DPO, and supervised fine-tuning.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="px-6 pb-20 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">PRICING</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Hobby" footer={<MonoLabel>FREE FOREVER</MonoLabel>}>
            <TabularValue size="xl" className="block mb-2">$0</TabularValue>
            <DensityText role="detail" muted>10K requests/mo · 1 model · Community support</DensityText>
          </CardCell>
          <CardCell title="Pro" footer={<MonoLabel>MOST POPULAR</MonoLabel>}>
            <TabularValue size="xl" className="block mb-2">$49</TabularValue>
            <DensityText role="detail" muted>500K requests/mo · 10 models · Priority support</DensityText>
          </CardCell>
          <CardCell title="Enterprise" footer={<MonoLabel>CUSTOM SLA</MonoLabel>}>
            <TabularValue size="xl" className="block mb-2">$199</TabularValue>
            <DensityText role="detail" muted>Unlimited · Dedicated infra · SSO + SAML</DensityText>
          </CardCell>
        </GapPixelGrid>
      </section>

      <footer className="text-center py-8">
        <MonoLabel>© 2026 SIGIL AI · BUILT WITH SIGIL UI</MonoLabel>
      </footer>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Dashboard (cobalt)                                                      */
/* -------------------------------------------------------------------------- */

function DashboardDemo() {
  const navItems = ["Overview", "Analytics", "Users", "Settings"];

  return (
    <div className="flex min-h-screen">
      <FrostedPanel edge="right" variant="solid" as="aside" className="w-[220px] shrink-0 p-6">
        <DensityText role="base" as="div" className="font-semibold mb-8">Dashboard</DensityText>
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <AccentActive key={item} active={i === 0} className="px-3 py-2 rounded-md border text-sm cursor-pointer">
              {item}
            </AccentActive>
          ))}
        </nav>
      </FrostedPanel>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <DensityText role="headline" as="h1">Analytics Overview</DensityText>
          <MonoLabel variant="accent" size="sm">LAST 30 DAYS</MonoLabel>
        </div>

        <GapPixelGrid columns={{ md: 4 }} className="mb-8">
          <GapPixelCell className="p-4">
            <MonoLabel as="div" className="mb-1">USERS</MonoLabel>
            <TabularValue size="xl">12,847</TabularValue>
            <DensityText role="chrome" as="div" className="mt-1 !text-[var(--s-primary)]">+12.5%</DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-4">
            <MonoLabel as="div" className="mb-1">REVENUE</MonoLabel>
            <TabularValue size="xl">$48.2K</TabularValue>
            <DensityText role="chrome" as="div" className="mt-1 !text-[var(--s-primary)]">+8.1%</DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-4">
            <MonoLabel as="div" className="mb-1">UPTIME</MonoLabel>
            <TabularValue size="xl">98.5%</TabularValue>
            <DensityText role="chrome" as="div" className="mt-1 !text-[var(--s-primary)]">+0.2%</DensityText>
          </GapPixelCell>
          <GapPixelCell className="p-4">
            <MonoLabel as="div" className="mb-1">AVG LOAD</MonoLabel>
            <TabularValue size="xl">2.4s</TabularValue>
            <DensityText role="chrome" as="div" className="mt-1 !text-[var(--s-primary)]">-0.3s</DensityText>
          </GapPixelCell>
        </GapPixelGrid>

        <GapPixelGrid columns={{ md: 2 }}>
          <CardCell title="Activity">
            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: "API Calls", value: 82 },
                { label: "Auth Events", value: 64 },
                { label: "Deployments", value: 45 },
                { label: "Errors", value: 12 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <DensityText role="detail">{item.label}</DensityText>
                    <TabularValue size="xs">{item.value}%</TabularValue>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
          </CardCell>
          <CardCell title="Recent Events">
            <div className="flex flex-col gap-3 mt-2">
              {[
                { event: "Deployment succeeded", time: "2 min ago" },
                { event: "New user signup", time: "14 min ago" },
                { event: "Invoice paid", time: "1 hr ago" },
                { event: "SSL certificate renewed", time: "3 hr ago" },
                { event: "Database backup completed", time: "6 hr ago" },
              ].map((item) => (
                <div key={item.event} className="flex justify-between items-center">
                  <DensityText role="detail">{item.event}</DensityText>
                  <MonoLabel>{item.time}</MonoLabel>
                </div>
              ))}
            </div>
          </CardCell>
        </GapPixelGrid>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. E-Commerce (kova)                                                       */
/* -------------------------------------------------------------------------- */

function EcommerceDemo() {
  const products = [
    { name: "Alpine Jacket", price: "$89", color: "oklch(0.65 0.08 200)" },
    { name: "Trail Runner Pro", price: "$125", color: "oklch(0.55 0.12 150)" },
    { name: "Summit Pack 40L", price: "$45", color: "oklch(0.60 0.06 70)" },
    { name: "Merino Base Layer", price: "$210", color: "oklch(0.50 0.10 280)" },
    { name: "Ridge Beanie", price: "$65", color: "oklch(0.55 0.08 30)" },
    { name: "Carabiner Set", price: "$34", color: "oklch(0.60 0.10 160)" },
  ];

  return (
    <BorderStack>
      <nav className="flex items-center justify-between px-8 py-4">
        <DensityText role="base" as="span" className="font-bold">KOVA</DensityText>
        <div className="flex-1 max-w-[360px] mx-8">
          <Input placeholder="Search products…" />
        </div>
        <AccentCTA size="sm">Cart (3)</AccentCTA>
      </nav>

      <section className="px-8 py-12 max-w-[1000px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <MonoLabel variant="accent" size="sm">ALL</MonoLabel>
          <MonoLabel size="sm">TOPS</MonoLabel>
          <MonoLabel size="sm">BOTTOMS</MonoLabel>
          <MonoLabel size="sm">ACCESSORIES</MonoLabel>
        </div>

        <GapPixelGrid columns={{ md: 3 }}>
          {products.map((p) => (
            <GapPixelCell key={p.name} className="flex flex-col">
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ background: p.color }}
              >
                <span className="text-5xl opacity-20">◇</span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <DensityText role="body" as="div">{p.name}</DensityText>
                <div className="flex items-center justify-between">
                  <TabularValue size="md">{p.price}</TabularValue>
                  <MonoLabel size="sm">SHIPS IMMEDIATELY</MonoLabel>
                </div>
              </div>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Dev Docs (etch)                                                         */
/* -------------------------------------------------------------------------- */

function DevDocsDemo() {
  const sections = ["Getting Started", "Components", "API Reference", "Tokens"];

  return (
    <div className="flex min-h-screen">
      <FrostedPanel edge="right" variant="solid" as="aside" className="w-[240px] shrink-0 p-6">
        <DensityText role="base" as="div" className="font-semibold mb-8">Sigil Docs</DensityText>
        <nav className="flex flex-col gap-1">
          {sections.map((item, i) => (
            <AccentActive key={item} active={i === 0} className="px-3 py-2 rounded-md border text-sm cursor-pointer">
              {item}
            </AccentActive>
          ))}
        </nav>
      </FrostedPanel>

      <main className="flex-1 p-12 max-w-[720px]">
        <BorderStack>
          <div className="pb-8">
            <DensityText role="headline" as="h1" className="!text-4xl block">Installation</DensityText>
            <DensityText role="body" as="p" muted className="mt-4 leading-relaxed block">
              Sigil is a token-driven design system. Install it, pick a preset, and start building.
              One file controls every visual property across your entire application.
            </DensityText>
          </div>

          <div className="py-8">
            <MonoLabel as="div" className="mb-4 block">QUICK START</MonoLabel>
            <CardCell title="Terminal" className="border border-[var(--s-border)] rounded-md overflow-hidden">
              <div className="font-[family-name:var(--s-font-mono)] text-[13px] leading-relaxed text-[var(--s-text-muted)]">
                <div>$ npx create-sigil-app my-app</div>
                <div>$ cd my-app</div>
                <div>$ npx @sigil-ui/cli preset cobalt</div>
                <div>$ npm run dev</div>
              </div>
            </CardCell>
          </div>

          <div className="py-8">
            <MonoLabel as="div" className="mb-4 block">CONFIGURATION</MonoLabel>
            <DensityText role="body" as="p" muted className="mb-4 block">
              After init, Sigil creates a token spec with 519 configurable fields.
              Edit the spec to customize any visual property.
            </DensityText>
            <div className="flex gap-4">
              <div>
                <MonoLabel as="div" className="mb-1">VERSION</MonoLabel>
                <TabularValue size="md">2.1.0</TabularValue>
              </div>
              <div>
                <MonoLabel as="div" className="mb-1">TOKENS</MonoLabel>
                <TabularValue size="md">519</TabularValue>
              </div>
              <div>
                <MonoLabel as="div" className="mb-1">PRESETS</MonoLabel>
                <TabularValue size="md">31</TabularValue>
              </div>
            </div>
          </div>
        </BorderStack>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Startup (shard)                                                         */
/* -------------------------------------------------------------------------- */

function StartupDemo() {
  return (
    <BorderStack>
      <section className="text-center py-32 px-6 max-w-[800px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-[80px] !leading-[0.95] block">
          VELOCITY
        </DensityText>
        <MonoLabel as="div" className="mt-4 block" size="sm">THE FUTURE SHIPS FASTER THAN YOU THINK</MonoLabel>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[520px] mx-auto leading-relaxed block">
          Ship products that feel like magic. Sigil handles the design system so you
          can focus on what matters — your users.
        </DensityText>
      </section>

      <section className="px-6 pb-16 max-w-[800px] mx-auto">
        <GapPixelGrid columns={{ md: 4 }}>
          {[
            { value: "$4.2M", label: "Raised" },
            { value: "50K", label: "Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "12ms", label: "Latency" },
          ].map((stat) => (
            <GapPixelCell key={stat.label} className="p-6 text-center">
              <TabularValue size="xl" className="block">{stat.value}</TabularValue>
              <MonoLabel as="div" className="mt-2">{stat.label}</MonoLabel>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </section>

      <section className="px-6 pb-16 max-w-[800px] mx-auto">
        <GapPixelGrid columns={{ md: 2 }}>
          <CardCell title="Real-Time Collaboration" footer={<MonoLabel>MULTIPLAYER</MonoLabel>}>
            Work together on the same document with sub-100ms latency. CRDTs handle
            conflict resolution automatically.
          </CardCell>
          <CardCell title="AI-Native Workflows" footer={<MonoLabel>LLM POWERED</MonoLabel>}>
            Every action generates context for AI agents. Your tools learn from your
            workflow and surface suggestions proactively.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="text-center py-16">
        <AccentCTA size="lg">Join the waitlist</AccentCTA>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Portfolio (noir)                                                        */
/* -------------------------------------------------------------------------- */

function PortfolioDemo() {
  const projects = [
    { title: "Neon District", category: "Brand", gradient: "linear-gradient(135deg, oklch(0.3 0.1 250), oklch(0.15 0.05 300))" },
    { title: "Void Interface", category: "Product", gradient: "linear-gradient(135deg, oklch(0.25 0.08 200), oklch(0.12 0.04 240))" },
    { title: "Neural Canvas", category: "Art", gradient: "linear-gradient(135deg, oklch(0.3 0.12 30), oklch(0.18 0.06 50))" },
    { title: "Signal Chain", category: "Web", gradient: "linear-gradient(135deg, oklch(0.3 0.06 160), oklch(0.15 0.03 180))" },
    { title: "Dark Protocol", category: "App", gradient: "linear-gradient(135deg, oklch(0.3 0.1 300), oklch(0.15 0.05 330))" },
  ];

  return (
    <div className="px-8 py-20 max-w-[960px] mx-auto">
      <div className="flex items-center gap-6 mb-16">
        <MonoLabel size="sm">WORK</MonoLabel>
        <MonoLabel size="sm">/ ABOUT</MonoLabel>
        <MonoLabel size="sm">/ CONTACT</MonoLabel>
      </div>

      <DensityText role="headline" as="h1" className="!text-5xl mb-12 block">Selected Work</DensityText>

      <FeaturedGrid columns={3}>
        {projects.map((p) => (
          <GapPixelCell key={p.title} className="flex flex-col cursor-pointer">
            <div className="aspect-[3/2]" style={{ background: p.gradient }} />
            <div className="p-4">
              <DensityText role="body" as="div" className="font-semibold">{p.title}</DensityText>
              <MonoLabel className="mt-1">{p.category}</MonoLabel>
            </div>
          </GapPixelCell>
        ))}
      </FeaturedGrid>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Blog (rune)                                                             */
/* -------------------------------------------------------------------------- */

function BlogDemo() {
  const articles = [
    { title: "On Design Systems", date: "Apr 22, 2026" },
    { title: "The Token Manifesto", date: "Apr 18, 2026" },
    { title: "Why OKLCH Matters", date: "Apr 14, 2026" },
    { title: "Preset Philosophy", date: "Apr 10, 2026" },
    { title: "Component Architecture", date: "Apr 06, 2026" },
  ];

  return (
    <div className="px-6 py-20 max-w-[720px] mx-auto">
      <MonoLabel as="div" size="md" className="mb-12 block">THE SIGIL JOURNAL</MonoLabel>

      <FeaturedGrid columns={3}>
        <CardCell title="On Design Systems" className="min-h-[200px]">
          <DensityText role="body" as="p" muted className="block">
            Why switching between light and dark isn't enough. Presets change typography,
            spacing, motion, and personality — not just colors.
          </DensityText>
          <TabularValue as="time" muted size="xs" className="mt-4 block">Apr 22, 2026</TabularValue>
        </CardCell>
        <CardCell title="The Token Manifesto">
          <DensityText role="body" as="p" muted className="block">
            How a single markdown file replaced 40+ JSON token files across the monorepo.
          </DensityText>
          <TabularValue as="time" muted size="xs" className="mt-4 block">Apr 18, 2026</TabularValue>
        </CardCell>
        {articles.slice(2).map((a) => (
          <GapPixelCell key={a.title} className="p-4">
            <TabularValue as="time" muted size="xs" className="block mb-2">{a.date}</TabularValue>
            <DensityText role="body" as="div" className="font-semibold">{a.title}</DensityText>
          </GapPixelCell>
        ))}
      </FeaturedGrid>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Agency (forge)                                                          */
/* -------------------------------------------------------------------------- */

function AgencyDemo() {
  return (
    <BorderStack>
      <div className="px-8 py-4">
        <MonoLabel variant="accent" size="md">SIGIL LABS</MonoLabel>
      </div>

      <section className="px-8 py-24 max-w-[800px]">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          We build digital products.
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] leading-relaxed block">
          Strategy, design, and engineering for companies that refuse to blend in.
        </DensityText>
      </section>

      <section className="px-8 pb-16 max-w-[960px]">
        <MonoLabel as="div" className="mb-6 block">SERVICES</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Strategy" footer={<MonoLabel>RESEARCH · POSITIONING</MonoLabel>}>
            Market analysis, competitive audits, and product strategy that finds
            the gap your product should own.
          </CardCell>
          <CardCell title="Design" footer={<MonoLabel>SYSTEMS · INTERFACES</MonoLabel>}>
            Design systems, component libraries, and interfaces that feel inevitable.
            Token-driven for scalability.
          </CardCell>
          <CardCell title="Engineering" footer={<MonoLabel>FRONTEND · INFRA</MonoLabel>}>
            Production-grade implementations in React, Next.js, and the modern web stack.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="px-8 pb-16 max-w-[960px]">
        <MonoLabel as="div" className="mb-6 block">CASE STUDIES</MonoLabel>
        <GapPixelGrid columns={{ md: 2 }}>
          <CardCell title="NovaPay Rebrand" footer={<MonoLabel>FINTECH</MonoLabel>}>
            Complete visual identity overhaul for a Series B payments startup.
          </CardCell>
          <CardCell title="Helios Dashboard" footer={<MonoLabel>SAAS</MonoLabel>}>
            Analytics platform serving 50K daily active users across 12 markets.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="text-center py-16">
        <AccentCTA size="lg">Start a project</AccentCTA>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. CLI Tool (cipher)                                                       */
/* -------------------------------------------------------------------------- */

function CliToolDemo() {
  const commands = [
    { cmd: "sigil init", desc: "Interactive project setup with preset recommendations" },
    { cmd: "sigil add <name>", desc: "Copy components into your project" },
    { cmd: "sigil preset <name>", desc: "Switch preset — regenerates token CSS" },
    { cmd: "sigil diff", desc: "Show token changes since last sync" },
    { cmd: "sigil doctor", desc: "Validate config, tokens, components, deps" },
    { cmd: "sigil preset create", desc: "Scaffold a custom preset from base" },
  ];

  return (
    <BorderStack>
      <section className="text-center py-24 px-6 max-w-[680px] mx-auto">
        <MonoLabel variant="accent" size="md">V2.0</MonoLabel>
        <DensityText role="headline" as="h1" className="!text-5xl mt-4 block font-[family-name:var(--s-font-mono)]">
          bolt
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-4 leading-relaxed block">
          A lightning-fast CLI for managing design tokens, presets, and components from your terminal.
        </DensityText>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <CardCell title="Install" className="border border-[var(--s-border)] rounded-md overflow-hidden">
          <div className="font-[family-name:var(--s-font-mono)] text-[13px] text-[var(--s-primary)]">
            $ npm install -g bolt
          </div>
        </CardCell>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">COMMANDS</MonoLabel>
        <GapPixelGrid columns={{ md: 2 }}>
          {commands.map((c) => (
            <GapPixelCell key={c.cmd} className="p-4">
              <MonoLabel variant="accent" size="sm" as="div" className="mb-2">{c.cmd}</MonoLabel>
              <DensityText role="detail" muted>{c.desc}</DensityText>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <MonoLabel as="div" className="mb-4 block">BENCHMARKS</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          <GapPixelCell className="p-4 text-center">
            <TabularValue size="xl" className="block">4ms</TabularValue>
            <MonoLabel as="div" className="mt-1">INIT TIME</MonoLabel>
          </GapPixelCell>
          <GapPixelCell className="p-4 text-center">
            <TabularValue size="xl" className="block">0.8MB</TabularValue>
            <MonoLabel as="div" className="mt-1">INSTALL SIZE</MonoLabel>
          </GapPixelCell>
          <GapPixelCell className="p-4 text-center">
            <TabularValue size="xl" className="block">519</TabularValue>
            <MonoLabel as="div" className="mt-1">TOKEN FIELDS</MonoLabel>
          </GapPixelCell>
        </GapPixelGrid>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  10. Playground (sigil)                                                     */
/* -------------------------------------------------------------------------- */

function PlaygroundDemo() {
  return (
    <div className="px-8 py-20 max-w-[960px] mx-auto">
      <DensityText role="headline" as="h1" className="!text-3xl block">Component Playground</DensityText>
      <DensityText role="body" as="p" muted className="mt-2 mb-8 block">Interactive showcase of Sigil UI components.</DensityText>

      <div className="flex gap-4 mb-8">
        {["UI", "Layout", "Forms", "Data"].map((tab, i) => (
          <AccentActive key={tab} active={i === 0} className="px-3 py-1.5 rounded-md border text-sm cursor-pointer">
            <MonoLabel size="sm" variant={i === 0 ? "accent" : "muted"}>{tab}</MonoLabel>
          </AccentActive>
        ))}
      </div>

      <GapPixelGrid columns={{ md: 3 }}>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <Button>Primary</Button>
          <MonoLabel>BUTTON</MonoLabel>
        </GapPixelCell>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <MonoLabel>BADGE</MonoLabel>
        </GapPixelCell>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <Card className="w-full p-3">
            <DensityText role="detail">Card content</DensityText>
          </Card>
          <MonoLabel>CARD</MonoLabel>
        </GapPixelCell>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <Input placeholder="Type here…" className="w-full" />
          <MonoLabel>INPUT</MonoLabel>
        </GapPixelCell>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <Switch />
          <MonoLabel>SWITCH</MonoLabel>
        </GapPixelCell>
        <GapPixelCell className="p-6 flex flex-col items-center gap-3">
          <Progress value={65} className="w-full" />
          <MonoLabel>PROGRESS</MonoLabel>
        </GapPixelCell>
      </GapPixelGrid>

      <div className="mt-12 text-center">
        <AccentCTA>Open Full Sandbox</AccentCTA>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  11. Linear Clone (noir)                                                    */
/* -------------------------------------------------------------------------- */

function LinearCloneDemo() {
  return (
    <BorderStack>
      <FrostedPanel edge="bottom" variant="frosted" as="nav" className="flex items-center justify-between px-8 py-4">
        <MonoLabel variant="inverse" size="md">ACME</MonoLabel>
        <div className="flex items-center gap-6">
          <DensityText role="nav" as="span" muted>Features</DensityText>
          <DensityText role="nav" as="span" muted>Method</DensityText>
          <DensityText role="nav" as="span" muted>Pricing</DensityText>
          <AccentCTA size="sm">Get Started</AccentCTA>
        </div>
      </FrostedPanel>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          Build products at the speed of thought
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          Streamline issues, projects, and product roadmaps. Built for the way modern teams work.
        </DensityText>
        <AccentCTA className="mt-8">Get Started</AccentCTA>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Issue Tracking" footer={<MonoLabel>REAL-TIME</MonoLabel>}>
            Create, assign, and track issues with sub-second sync across every client.
          </CardCell>
          <CardCell title="Project Roadmaps" footer={<MonoLabel>VISUAL</MonoLabel>}>
            Plan and visualize your product roadmap with timeline, board, and list views.
          </CardCell>
          <CardCell title="Cycles & Sprints" footer={<MonoLabel>AUTOMATED</MonoLabel>}>
            Automated sprint planning with velocity tracking and burndown charts.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="text-center py-12">
        <MonoLabel size="sm" as="div" className="mb-4 block">TRUSTED BY</MonoLabel>
        <MonoLabel size="md">Vercel &nbsp;/ &nbsp;Stripe &nbsp;/ &nbsp;GitHub &nbsp;/ &nbsp;Notion &nbsp;/ &nbsp;Linear</MonoLabel>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  12. Vercel Clone (kova)                                                    */
/* -------------------------------------------------------------------------- */

function VercelCloneDemo() {
  return (
    <BorderStack>
      <nav className="flex items-center justify-between px-8 py-4">
        <MonoLabel variant="inverse" size="md">▲ VERCEL</MonoLabel>
        <div className="flex items-center gap-6">
          <DensityText role="nav" as="span" muted>Docs</DensityText>
          <DensityText role="nav" as="span" muted>Templates</DensityText>
          <DensityText role="nav" as="span" muted>Enterprise</DensityText>
          <AccentCTA size="sm">Deploy</AccentCTA>
        </div>
      </nav>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-6xl block">
          Develop. Preview. Ship.
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          Vercel's frontend cloud gives developers frameworks, workflows, and infrastructure
          to build a faster, more personalized web.
        </DensityText>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">FRAMEWORKS</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          {["Next.js", "React", "Svelte", "Nuxt", "Astro", "Remix"].map((fw) => (
            <GapPixelCell key={fw} className="p-4 text-center">
              <MonoLabel variant="accent" size="md">{fw}</MonoLabel>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <GapPixelGrid columns={{ md: 2 }}>
          <CardCell title="Edge Functions" footer={<MonoLabel>GLOBAL</MonoLabel>}>
            Run server-side logic at the edge, close to your users. Sub-millisecond cold starts.
          </CardCell>
          <CardCell title="Analytics" footer={<MonoLabel>REAL-TIME</MonoLabel>}>
            Web analytics built for speed. Core Web Vitals, audience, and custom events.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <GapPixelGrid columns={{ md: 2 }}>
          <GapPixelCell className="p-6 text-center">
            <TabularValue size="xl" className="block">400K+</TabularValue>
            <MonoLabel as="div" className="mt-2">DEPLOYMENTS / DAY</MonoLabel>
          </GapPixelCell>
          <GapPixelCell className="p-6 text-center">
            <TabularValue size="xl" className="block">99.99%</TabularValue>
            <MonoLabel as="div" className="mt-2">UPTIME SLA</MonoLabel>
          </GapPixelCell>
        </GapPixelGrid>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  13. Dedalus Clone (sigil)                                                  */
/* -------------------------------------------------------------------------- */

function DedalusCloneDemo() {
  return (
    <BorderStack>
      <nav className="flex items-center justify-between px-8 py-4">
        <MonoLabel variant="accent" size="md">DEDALUS</MonoLabel>
        <div className="flex items-center gap-6">
          <DensityText role="nav" as="span" muted>Docs</DensityText>
          <DensityText role="nav" as="span" muted>Pricing</DensityText>
          <DensityText role="nav" as="span" muted>Blog</DensityText>
          <AccentCTA size="sm">Dashboard</AccentCTA>
        </div>
      </nav>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          The developer backend
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          Auth, database, storage, and edge functions. All in one platform.
          Ship your backend in minutes, not weeks.
        </DensityText>
        <AccentCTA className="mt-8">Start Building</AccentCTA>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <CardCell title="Install" className="border border-[var(--s-border)] rounded-md overflow-hidden">
          <div className="font-[family-name:var(--s-font-mono)] text-[13px] text-[var(--s-primary)]">
            $ npx create-dedalus-app my-backend
          </div>
        </CardCell>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Auth" footer={<MonoLabel>JWT + SESSIONS</MonoLabel>}>
            Email, OAuth, magic links, and SSO. Row-level security built in.
          </CardCell>
          <CardCell title="Database" footer={<MonoLabel>POSTGRES</MonoLabel>}>
            Managed Postgres with auto-scaling, branching, and point-in-time recovery.
          </CardCell>
          <CardCell title="Storage" footer={<MonoLabel>S3 COMPATIBLE</MonoLabel>}>
            File storage with CDN, image transforms, and signed URLs.
          </CardCell>
        </GapPixelGrid>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  14. VoidZero Clone (shard)                                                 */
/* -------------------------------------------------------------------------- */

function VoidZeroCloneDemo() {
  return (
    <BorderStack>
      <div className="bg-[var(--s-primary)] text-center py-2">
        <DensityText role="detail" as="span" className="!text-[var(--s-background)] font-semibold">
          ★ VoidZero raised $4.6M to build the next-generation JavaScript toolchain
        </DensityText>
      </div>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-7xl block font-black">
          VOID(0)
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          A next-generation toolchain for JavaScript. Unified, fast, and open source.
          Built on Rust for maximum performance.
        </DensityText>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">ECOSYSTEM</MonoLabel>
        <GapPixelGrid columns={{ md: 2 }}>
          <CardCell title="Vite" footer={<MonoLabel>BUILD TOOL</MonoLabel>}>
            Next-generation frontend tooling. Instant server start, lightning-fast HMR,
            and optimized production builds.
          </CardCell>
          <CardCell title="Vitest" footer={<MonoLabel>TEST RUNNER</MonoLabel>}>
            Blazing-fast unit test framework powered by Vite. Jest-compatible API with
            native ESM support.
          </CardCell>
          <CardCell title="Rolldown" footer={<MonoLabel>BUNDLER</MonoLabel>}>
            Rust-based JavaScript bundler designed as the future bundler for Vite.
            Drop-in Rollup replacement.
          </CardCell>
          <CardCell title="OXC" footer={<MonoLabel>COMPILER</MonoLabel>}>
            JavaScript/TypeScript oxidation compiler. Parser, linter, formatter, and
            transpiler — all in Rust.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="text-center py-12">
        <MonoLabel size="sm" as="div" className="mb-4 block">OPEN SOURCE</MonoLabel>
        <MonoLabel size="md">MIT Licensed &nbsp;· &nbsp;GitHub &nbsp;· &nbsp;Discord &nbsp;· &nbsp;Twitter</MonoLabel>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  15. Oxide Clone (forge)                                                    */
/* -------------------------------------------------------------------------- */

function OxideCloneDemo() {
  return (
    <BorderStack>
      <nav className="flex items-center justify-between px-8 py-4">
        <MonoLabel variant="accent" size="md">0XIDE</MonoLabel>
        <div className="flex items-center gap-6">
          <MonoLabel size="sm">PRODUCT</MonoLabel>
          <MonoLabel size="sm">BLOG</MonoLabel>
          <MonoLabel size="sm">CAREERS</MonoLabel>
          <MonoLabel size="sm">GITHUB</MonoLabel>
        </div>
      </nav>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          Cloud Computing, Rewritten
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[520px] mx-auto leading-relaxed block font-[family-name:var(--s-font-mono)]">
          Purpose-built server hardware and software, integrated from chip to cloud.
          On-prem cloud infrastructure that just works.
        </DensityText>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <CardCell title="Console" className="border border-[var(--s-border)] rounded-md overflow-hidden">
          <div className="font-[family-name:var(--s-font-mono)] text-[13px] text-[var(--s-primary)] leading-relaxed">
            <div>$ oxide sled list</div>
            <div className="text-[var(--s-text-muted)]">SLED-01  online  48 cores  512GB  healthy</div>
            <div className="text-[var(--s-text-muted)]">SLED-02  online  48 cores  512GB  healthy</div>
            <div className="text-[var(--s-text-muted)]">SLED-03  online  48 cores  512GB  healthy</div>
          </div>
        </CardCell>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">SPECIFICATIONS</MonoLabel>
        <GapPixelGrid columns={{ md: 3 }}>
          <GapPixelCell className="p-6 text-center">
            <TabularValue size="xl" className="block">32</TabularValue>
            <MonoLabel as="div" className="mt-2">COMPUTE SLEDS</MonoLabel>
          </GapPixelCell>
          <GapPixelCell className="p-6 text-center">
            <TabularValue size="xl" className="block">1,536</TabularValue>
            <MonoLabel as="div" className="mt-2">CPU CORES</MonoLabel>
          </GapPixelCell>
          <GapPixelCell className="p-6 text-center">
            <TabularValue size="xl" className="block">16TB</TabularValue>
            <MonoLabel as="div" className="mt-2">TOTAL RAM</MonoLabel>
          </GapPixelCell>
        </GapPixelGrid>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  16. Vite Clone (cipher)                                                    */
/* -------------------------------------------------------------------------- */

function ViteCloneDemo() {
  const [pm, setPm] = useState<"npm" | "pnpm" | "yarn">("npm");
  const cmds = { npm: "npm create vite@latest", pnpm: "pnpm create vite", yarn: "yarn create vite" };

  return (
    <BorderStack>
      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          Next Generation Build Tool
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          Get ready for a development environment that can finally catch up with you.
          Instant server start and lightning-fast HMR.
        </DensityText>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <CardCell className="border border-[var(--s-border)] rounded-md overflow-hidden">
          <div className="flex gap-4 mb-3">
            {(["npm", "pnpm", "yarn"] as const).map((p) => (
              <MonoLabel
                key={p}
                variant={pm === p ? "accent" : "muted"}
                size="sm"
                className="cursor-pointer"
                onClick={() => setPm(p)}
              >
                {p}
              </MonoLabel>
            ))}
          </div>
          <div className="font-[family-name:var(--s-font-mono)] text-[13px] text-[var(--s-primary)]">
            $ {cmds[pm]}
          </div>
        </CardCell>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <GapPixelGrid columns={{ md: 3 }}>
          <CardCell title="Instant Server Start" footer={<MonoLabel>ESM NATIVE</MonoLabel>}>
            On-demand file serving over native ESM — no bundling required during development.
          </CardCell>
          <CardCell title="Lightning HMR" footer={<MonoLabel>SUB-MS</MonoLabel>}>
            Hot Module Replacement that stays fast regardless of application size.
          </CardCell>
          <CardCell title="Optimized Build" footer={<MonoLabel>ROLLUP</MonoLabel>}>
            Pre-configured Rollup build with multi-page and library mode support.
          </CardCell>
        </GapPixelGrid>
      </section>

      <section className="text-center py-12">
        <MonoLabel size="sm" as="div" className="mb-4 block">POWERED BY</MonoLabel>
        <MonoLabel size="md">React &nbsp;· &nbsp;Vue &nbsp;· &nbsp;Svelte &nbsp;· &nbsp;Preact &nbsp;· &nbsp;Lit &nbsp;· &nbsp;Solid</MonoLabel>
      </section>
    </BorderStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  17. VitePlus Clone (etch)                                                  */
/* -------------------------------------------------------------------------- */

function VitePlusCloneDemo() {
  return (
    <BorderStack>
      <nav className="flex items-center justify-between px-8 py-4">
        <MonoLabel variant="accent" size="md">VITE+</MonoLabel>
        <div className="flex items-center gap-6">
          <DensityText role="nav" as="span" muted>Guide</DensityText>
          <DensityText role="nav" as="span" muted>Config</DensityText>
          <DensityText role="nav" as="span" muted>Plugins</DensityText>
          <AccentCTA size="sm">Get Started</AccentCTA>
        </div>
      </nav>

      <section className="text-center py-28 px-6 max-w-[720px] mx-auto">
        <DensityText role="headline" as="h1" className="!text-5xl block">
          The Unified Toolchain
        </DensityText>
        <DensityText role="body" as="p" muted className="mt-6 max-w-[480px] mx-auto leading-relaxed block">
          Build, test, lint, and format — all powered by a single, coherent toolchain.
          Zero config to start, full control when you need it.
        </DensityText>
      </section>

      <section className="px-8 pb-16 max-w-[960px] mx-auto">
        <MonoLabel as="div" className="mb-6 block">WORKFLOW</MonoLabel>
        <GapPixelGrid columns={{ md: 4 }}>
          {[
            { step: "01", label: "Scaffold", desc: "Create a new project from any framework template" },
            { step: "02", label: "Develop", desc: "Instant HMR with native ES modules" },
            { step: "03", label: "Test", desc: "Unit and integration tests powered by Vitest" },
            { step: "04", label: "Deploy", desc: "Optimized production builds with one command" },
          ].map((s) => (
            <GapPixelCell key={s.step} className="p-4">
              <MonoLabel variant="accent" size="md" as="div" className="mb-2">{s.step}</MonoLabel>
              <DensityText role="body" as="div" className="font-semibold mb-1">{s.label}</DensityText>
              <DensityText role="detail" muted>{s.desc}</DensityText>
            </GapPixelCell>
          ))}
        </GapPixelGrid>
      </section>

      <section className="px-6 pb-16 max-w-[640px] mx-auto">
        <CardCell title="Terminal" className="border border-[var(--s-border)] rounded-md overflow-hidden">
          <div className="font-[family-name:var(--s-font-mono)] text-[13px] text-[var(--s-text-muted)] leading-relaxed">
            <div>$ npx vite-plus init my-app</div>
            <div className="text-[var(--s-primary)]">✔ Scaffolded project</div>
            <div className="text-[var(--s-primary)]">✔ Installed dependencies</div>
            <div className="text-[var(--s-primary)]">✔ Ready at localhost:5173</div>
          </div>
        </CardCell>
      </section>

      <section className="text-center py-12">
        <AccentCTA size="lg">Get Started</AccentCTA>
      </section>
    </BorderStack>
  );
}
