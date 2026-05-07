"use client";

import {
  Button,
  Badge,
  Input,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  BentoGrid,
  BentoGridCell,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

const FRAMEWORKS = {
  frontend: ["Next.js", "React", "Vue", "Svelte", "Astro", "Nuxt"],
  backend: ["Node.js", "Python", "Go", "Ruby"],
  fullstack: ["Next.js", "Remix", "SvelteKit", "Nuxt"],
};

const FEATURES = [
  {
    title: "Edge Functions",
    desc: "Run server-side logic at the edge, close to your users. Zero cold starts, automatic scaling, and global distribution.",
  },
  {
    title: "Analytics",
    desc: "Real-time web analytics with Core Web Vitals tracking. Understand performance and audience without third-party scripts.",
  },
];

const STATS = [
  { value: "400K+", label: "Deployments per day" },
  { value: "99.99%", label: "Guaranteed uptime" },
];

export default function VercelCloneDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.02em" }}>
            ▲ VERCEL
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Docs</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Templates</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Enterprise</span>
            <Button size="sm">Deploy</Button>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-14 text-center">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
            }}
          >
            Develop.
            <br />
            Preview.
            <br />
            Ship.
          </h1>
          <p
            className="mx-auto mt-5"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "24rem", lineHeight: 1.6 }}
          >
            Vercel&apos;s frontend cloud gives developers frameworks,
            workflows, and infrastructure to build a faster, more
            personalized web.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Start Deploying</Button>
            <Button variant="outline">Get a Demo</Button>
          </div>
        </div>
      </Panel>

      {/* ── Frameworks ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Frameworks</PanelHeader>
        <div className="px-4 py-3">
          <Tabs defaultValue="frontend">
            <TabsList>
              <TabsTrigger value="frontend" className="text-xs">Frontend</TabsTrigger>
              <TabsTrigger value="backend" className="text-xs">Backend</TabsTrigger>
              <TabsTrigger value="fullstack" className="text-xs">Fullstack</TabsTrigger>
            </TabsList>
            {(Object.entries(FRAMEWORKS) as [keyof typeof FRAMEWORKS, string[]][]).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {items.map((fw) => (
                    <Badge key={fw} variant="secondary">{fw}</Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* ── Features ────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Platform</PanelHeader>
        <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-3">
                <PlaceholderImage aspect="2/1" label={f.title} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Scale</PanelHeader>
        <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
          {STATS.map((s) => (
            <BentoGridCell key={s.label}>
              <div className="flex w-full flex-col items-center gap-1 py-4 text-center">
                <span
                  style={{
                    fontFamily: "var(--s-font-display)",
                    fontSize: 40,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--s-text-muted)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="px-4 py-5 text-center">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Vercel · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
