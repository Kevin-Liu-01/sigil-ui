"use client";

import React from "react";
import {
  Button,
  Badge,
  Input,
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

const projects = [
  { name: "Meridian", category: "Brand Identity", year: "2026" },
  { name: "Arclight", category: "Product Design", year: "2025" },
  { name: "Vantage", category: "Web Platform", year: "2025" },
  { name: "Helix Labs", category: "Design System", year: "2024" },
];

const serviceItems: Record<string, { name: string; desc: string }[]> = {
  strategy: [
    { name: "Brand Positioning", desc: "Define where you stand in the market and why it matters." },
    { name: "User Research", desc: "Interviews, surveys, and analytics to understand real behavior." },
    { name: "Content Strategy", desc: "Messaging frameworks that align with business goals." },
  ],
  design: [
    { name: "Visual Identity", desc: "Logos, color systems, typography, and brand guidelines." },
    { name: "UI/UX Design", desc: "Wireframes through high-fidelity prototypes and interaction specs." },
    { name: "Motion Design", desc: "Micro-interactions and transitions that bring interfaces alive." },
  ],
  development: [
    { name: "Frontend Engineering", desc: "React, Next.js, and TypeScript with pixel-perfect implementation." },
    { name: "Design Systems", desc: "Component libraries with tokens, docs, and Storybook integration." },
    { name: "Performance", desc: "Core Web Vitals optimization, SSR, and edge delivery." },
  ],
};

export default function Page() {
  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.03em" }}>Studio</span>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm" style={{ color: "var(--s-text-muted)" }}>
            <a href="#">Work</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <Button size="sm">Start a project</Button>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 md:py-24">
        <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)", textTransform: "uppercase" as const }}>
          Digital Agency
        </div>
        <h1 className="mt-3" style={{ fontFamily: "var(--s-font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          We build brands<br />that move
        </h1>
        <p className="mt-4 max-w-md text-base" style={{ color: "var(--s-text-muted)", lineHeight: 1.7 }}>
          Strategy, design, and engineering for companies that refuse to blend in.
          We partner with ambitious teams to create digital experiences worth remembering.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button>View our work</Button>
          <Button variant="outline">Our process →</Button>
        </div>
      </Panel>

      {/* Selected Work */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Selected Work</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 2 }} gap="1rem">
            {projects.map((project) => (
              <BentoGridCell key={project.name}>
                <div style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)", overflow: "hidden" }}>
                  <PlaceholderImage aspect="4/3" label={project.name} />
                  <div className="p-3">
                    <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>{project.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{project.category}</span>
                      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>·</span>
                      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{project.year}</span>
                    </div>
                  </div>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* Services */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Services</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="strategy">
            <TabsList>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>
            {(["strategy", "design", "development"] as const).map((tab) => (
              <TabsContent key={tab} value={tab}>
                <BentoGrid columns={{ md: 3 }} gap="0.75rem" className="mt-4">
                  {serviceItems[tab].map((item) => (
                    <BentoGridCell key={item.name}>
                      <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)" }}>
                        <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>{item.name}</h4>
                        <p className="mt-1 text-sm" style={{ color: "var(--s-text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </BentoGridCell>
                  ))}
                </BentoGrid>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* Process */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Process</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="discovery">
              <AccordionTrigger>Discovery</AccordionTrigger>
              <AccordionContent>We start with stakeholder interviews, competitive analysis, and user research to understand the problem space before proposing any solutions.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="design">
              <AccordionTrigger>Design</AccordionTrigger>
              <AccordionContent>Wireframes, visual concepts, and interactive prototypes tested with real users. We iterate until the experience is right, not just pretty.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="development">
              <AccordionTrigger>Development</AccordionTrigger>
              <AccordionContent>Pixel-perfect implementation with modern frameworks, performance budgets, and accessibility baked in from day one.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="launch">
              <AccordionTrigger>Launch</AccordionTrigger>
              <AccordionContent>QA, performance audits, analytics setup, and a smooth handoff. We stick around for the first month to catch anything the metrics surface.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Contact CTA */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Contact</PanelHeader>
        <div className="p-4 py-12 text-center">
          <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Ready to start?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--s-text-muted)" }}>
            Tell us about your project and we will get back to you within 24 hours.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 max-w-sm mx-auto">
            <Input placeholder="your@email.com" className="flex-1" />
            <Button>Get in touch</Button>
          </div>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="flex items-center justify-between px-4 py-4">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>© 2026 Studio</span>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <a href="#">Twitter</a>
          <a href="#">Dribbble</a>
          <a href="#">LinkedIn</a>
        </div>
      </Panel>
    </DemoShell>
  );
}
