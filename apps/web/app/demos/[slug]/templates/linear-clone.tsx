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

const FEATURES = [
  {
    title: "Issue Tracking",
    desc: "Create, assign, and track issues across your entire organization. Built for speed with keyboard-first navigation.",
  },
  {
    title: "Roadmaps",
    desc: "Plan ahead with multi-team roadmaps. Visualize progress, dependencies, and milestones in one view.",
  },
  {
    title: "Cycles & Sprints",
    desc: "Automate your sprint workflow. Set cadences, roll over unfinished work, and measure velocity over time.",
  },
];

const TRUSTED = ["Vercel", "Retool", "Arc", "Loom", "Ramp", "Watershed"];

const FAQ = [
  { q: "How does Linear handle large teams?", a: "Linear scales to thousands of users across workspaces with role-based access, team-level cycles, and cross-team project views. Performance stays sub-50ms regardless of team size." },
  { q: "Can I migrate from Jira?", a: "Yes. Our importer handles Jira projects, epics, sprints, and custom fields. Most teams complete migration in under an hour." },
  { q: "What integrations are available?", a: "GitHub, GitLab, Slack, Figma, Sentry, Zendesk, and 50+ more via API. Every action in Linear can trigger or be triggered by external tools." },
  { q: "Is there an API?", a: "A full GraphQL API with real-time subscriptions, webhooks, and OAuth. Build custom workflows or integrate Linear into your existing stack." },
];

export default function LinearCloneDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            ACME
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Features</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Method</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Pricing</span>
            <Button size="sm">Get Started</Button>
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
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            Build products at the
            <br />
            speed of thought
          </h1>
          <p
            className="mx-auto mt-4"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "26rem", lineHeight: 1.6 }}
          >
            Streamline issues, projects, and roadmaps.
            Built for the way modern software teams work.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">See Method</Button>
          </div>
        </div>
      </Panel>

      {/* ── Features ────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-2">
                <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Trusted By ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Trusted By</PanelHeader>
        <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-8">
          {TRUSTED.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: "var(--s-font-mono)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--s-text-muted)",
                opacity: 0.7,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </Panel>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Product FAQ</PanelHeader>
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
            © 2026 ACME · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
