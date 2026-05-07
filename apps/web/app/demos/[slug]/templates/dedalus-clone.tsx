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

const INSTALL_COMMANDS: Record<string, string> = {
  npm: "npx create-dedalus-app@latest",
  pnpm: "pnpm create dedalus-app@latest",
  yarn: "yarn create dedalus-app",
  bun: "bun create dedalus-app",
};

const FEATURES = [
  {
    title: "Auth",
    desc: "Email, OAuth, passkeys, and magic links. Session management, RBAC, and JWTs — configured in minutes.",
  },
  {
    title: "Database",
    desc: "Managed Postgres with branching, migrations, and connection pooling. Point-in-time recovery included.",
  },
  {
    title: "Storage",
    desc: "S3-compatible object storage with CDN delivery. Upload, transform, and serve assets from the edge.",
  },
];

const FAQ = [
  { q: "How do I get started?", a: "Run the create command, choose your stack, and you'll have auth, a database, and storage configured in under two minutes." },
  { q: "Can I self-host?", a: "Yes. Dedalus ships Docker images for every service. Deploy to your own infrastructure with a single compose file." },
  { q: "What databases are supported?", a: "Postgres is the primary database. SQLite for local development. MySQL and PlanetScale support is on the roadmap." },
  { q: "Is there a free tier?", a: "The free tier includes 500MB database, 1GB storage, and 10K monthly active users. No credit card required." },
];

export default function DedalusCloneDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            DEDALUS
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Docs</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Pricing</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Blog</span>
            <Button size="sm">Dashboard</Button>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-12 text-center">
          <Badge variant="outline" className="mb-4">Open Source</Badge>
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            The developer backend
          </h1>
          <p
            className="mx-auto mt-4"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "26rem", lineHeight: 1.6 }}
          >
            Auth, database, storage, and edge functions.
            Everything you need to ship — nothing you don&apos;t.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Start Building</Button>
            <Button variant="outline">Read Docs</Button>
          </div>
        </div>
      </Panel>

      {/* ── Install ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Install</PanelHeader>
        <div className="px-4 py-3">
          <Tabs defaultValue="npm">
            <TabsList>
              {Object.keys(INSTALL_COMMANDS).map((pm) => (
                <TabsTrigger key={pm} value={pm} className="text-xs">{pm}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(INSTALL_COMMANDS).map(([pm, cmd]) => (
              <TabsContent key={pm} value={pm} className="mt-3">
                <div
                  className="px-4 py-3"
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 13,
                    color: "var(--s-text-muted)",
                    background: "var(--s-surface)",
                    borderRadius: "var(--s-radius-sm, 6px)",
                  }}
                >
                  <span style={{ color: "var(--s-primary)", opacity: 0.7 }}>$</span>{" "}
                  {cmd}
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
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-3">
                <PlaceholderImage aspect="4/3" label={f.title} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
            © 2026 Dedalus Labs · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
