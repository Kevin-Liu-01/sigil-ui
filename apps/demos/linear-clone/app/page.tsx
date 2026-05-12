"use client";

import React from "react";
import {
  Button,
  Badge,
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

function Panel({ children, className = "", as: Tag = "section" }: { children: React.ReactNode; className?: string; as?: "section" | "nav" | "footer" | "header" | "div" | "aside" }) {
  return <Tag className={`s-screen-line-top s-screen-line-bottom s-container-column ${className}`}>{children}</Tag>;
}
function PanelSpacer() {
  return <div className="s-screen-line-top s-screen-line-bottom s-container-column h-8" />;
}
function PanelHeader({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <header className="s-screen-line-bottom flex items-center justify-between px-4 py-2.5">
      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{children}</span>
      {right}
    </header>
  );
}
function DemoShell({ children, maxWidth = "56rem" }: { children: React.ReactNode; maxWidth?: string }) {
  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "var(--s-background)", color: "var(--s-text)", fontFamily: "var(--s-font-body)" }}>
      <div className="mx-auto px-2" style={{ maxWidth }}>{children}</div>
    </div>
  );
}
function PlaceholderImage({ aspect = "16/9", gradient, label, className = "" }: { aspect?: string; gradient?: string; label?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={{ aspectRatio: aspect, background: gradient ?? "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 15%, var(--s-surface)) 0%, var(--s-surface) 100%)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
      {label && <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--s-text-muted)", opacity: 0.6 }}>{label}</span>}
    </div>
  );
}

export default function Page() {
  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.04em" }}>Linear</span>
          <div className="hidden md:flex items-center gap-5">
            {["Features", "Method", "Pricing", "Company"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Get started</Button>
          <Button variant="ghost" size="sm">Login</Button>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 md:py-24 text-center">
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: "38rem", margin: "0 auto" }}>
          Linear is a purpose-built tool for planning and building products
        </h1>
        <p style={{ fontFamily: "var(--s-font-body)", fontSize: 15, color: "var(--s-text-muted)", maxWidth: "28rem", margin: "1.25rem auto 0", lineHeight: 1.6 }}>
          Streamline issues, projects, and product roadmaps. Built for the way modern software teams work.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button>Get started free</Button>
          <Button variant="outline">Talk to sales</Button>
        </div>
      </Panel>

      {/* Hero image */}
      <Panel>
        <PlaceholderImage aspect="21/9" label="Linear Interface" />
      </Panel>

      {/* Features */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Built for speed</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Issue Tracking</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  Create, assign, and track issues with keyboard-first workflows and real-time sync across your team.
                </p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Cycles</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  Fixed-length sprints that automatically roll over incomplete work. Measure velocity, not vanity metrics.
                </p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Roadmaps</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  Connect issues to projects to initiatives. See the big picture without losing track of the details.
                </p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      {/* Integrations — Tabs */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Integrations</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="github">
            <TabsList>
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="slack">Slack</TabsTrigger>
              <TabsTrigger value="figma">Figma</TabsTrigger>
            </TabsList>
            <TabsContent value="github" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                Auto-link pull requests to issues. Close issues on merge. Sync labels, branches, and deployment status bidirectionally.
              </p>
              <PlaceholderImage aspect="3/1" label="GitHub Integration" className="mt-4" />
            </TabsContent>
            <TabsContent value="slack" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                Create issues from Slack messages. Get notifications on issue updates. Use slash commands to search and triage without leaving Slack.
              </p>
              <PlaceholderImage aspect="3/1" label="Slack Integration" className="mt-4" />
            </TabsContent>
            <TabsContent value="figma" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                Embed Figma files in issues. Preview designs inline. Link design specs to implementation issues for seamless handoff.
              </p>
              <PlaceholderImage aspect="3/1" label="Figma Integration" className="mt-4" />
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* FAQ — Accordion */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="pricing">
              <AccordionTrigger>How does pricing work?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Linear is free for teams up to 250 issues. Pro plans start at $8/user/month with unlimited issues, cycles, and roadmaps.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="migration">
              <AccordionTrigger>Can I migrate from Jira?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Yes. Our import tool brings over issues, labels, assignees, and comments. Most teams complete migration in under 10 minutes.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  SOC 2 Type II certified. Data encrypted at rest and in transit. SAML SSO and SCIM provisioning available on Enterprise.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="api">
              <AccordionTrigger>Do you have a public API?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Full GraphQL API with webhooks. Build custom integrations, automate workflows, and sync data with any system.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Linear Clone — Sigil UI</span>
        <div className="flex items-center gap-4">
          {["Twitter", "GitHub", "Discord"].map((link) => (
            <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
