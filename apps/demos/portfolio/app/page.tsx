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

const projects = [
  { title: "Meridian", category: "Brand Identity", year: "2026", desc: "Visual identity system for a climate-tech startup. Custom type, motion system, and tokenized design language.", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 20%, var(--s-surface)) 0%, var(--s-surface) 100%)" },
  { title: "Lattice", category: "Web Application", year: "2025", desc: "Real-time collaboration canvas with multiplayer cursors, infinite zoom, and WebGL rendering pipeline.", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 10%, var(--s-surface)) 0%, color-mix(in oklch, var(--s-primary) 25%, var(--s-surface)) 100%)" },
  { title: "Sonnet", category: "Design System", year: "2025", desc: "Token-driven component library for a Series B fintech. 200+ components, 12 presets, full dark mode.", gradient: "linear-gradient(135deg, var(--s-surface) 0%, color-mix(in oklch, var(--s-primary) 15%, var(--s-surface)) 100%)" },
  { title: "Archive", category: "Editorial", year: "2024", desc: "Long-form publishing platform with typographic precision. Custom reading metrics and scroll-driven animations.", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 12%, var(--s-surface)) 0%, var(--s-surface) 100%)" },
];

const skills = {
  design: [
    { name: "Visual Design", level: "Expert" },
    { name: "Typography", level: "Expert" },
    { name: "Motion Design", level: "Advanced" },
    { name: "Design Systems", level: "Expert" },
    { name: "Brand Identity", level: "Advanced" },
    { name: "Prototyping", level: "Advanced" },
  ],
  engineering: [
    { name: "React / Next.js", level: "Expert" },
    { name: "TypeScript", level: "Expert" },
    { name: "CSS / Tailwind", level: "Expert" },
    { name: "WebGL / Three.js", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
    { name: "Rust / WASM", level: "Intermediate" },
  ],
  tools: [
    { name: "Figma", level: "Expert" },
    { name: "VS Code / Cursor", level: "Expert" },
    { name: "Git / GitHub", level: "Expert" },
    { name: "Blender", level: "Intermediate" },
    { name: "After Effects", level: "Advanced" },
    { name: "Vercel / AWS", level: "Advanced" },
  ],
};

const aboutItems = [
  { title: "Background", content: "Design engineer with 8 years of experience building products at the intersection of design and engineering. Previously at Linear, Vercel, and a YC-backed startup." },
  { title: "Experience", content: "Led design engineering at three companies from 0→1. Built design systems used by 50+ engineers. Shipped consumer and B2B products serving millions of users." },
  { title: "Education", content: "B.S. Computer Science from Carnegie Mellon. Minor in Human-Computer Interaction. Teaching assistant for Interactive Design Studio." },
  { title: "Interests", content: "Generative art, typography, open-source tooling, mechanical keyboards, film photography. Occasional speaker at design engineering conferences." },
];

export default function Page() {
  return (
    <DemoShell>
      {/* Navbar */}
      <Panel as="nav">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>Alex Chen</span>
          <div className="flex items-center gap-5">
            {["Work", "About", "Contact"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel>
        <div className="px-4 py-16">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)", textTransform: "uppercase" as const }}>Design Engineer</span>
          <h1 className="mt-3" style={{ fontFamily: "var(--s-font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Crafting digital experiences</h1>
          <p className="mt-3" style={{ maxWidth: 440, fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
            I design and build interfaces that feel intentional. Currently focused on design systems, creative tooling, and the space where aesthetics meet engineering rigor.
          </p>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Selected Work */}
      <Panel>
        <PanelHeader>Selected Work</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 2 }} gap="0.5rem">
            {projects.map((project) => (
              <BentoGridCell key={project.title}>
                <div className="overflow-hidden" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                  <PlaceholderImage aspect="16/10" gradient={project.gradient} label={project.category} />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>{project.title}</h3>
                      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)" }}>{project.year}</span>
                    </div>
                    <p className="mt-1.5" style={{ fontSize: 12, lineHeight: 1.5, color: "var(--s-text-muted)" }}>{project.desc}</p>
                    <Button variant="ghost" size="sm" className="mt-3">View project →</Button>
                  </div>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Skills */}
      <Panel>
        <PanelHeader>Skills</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="design">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              <div className="mt-3">
                <BentoGrid columns={{ md: 3 }} gap="0.5rem">
                  {skills.design.map((s) => (
                    <BentoGridCell key={s.name}>
                      <div className="p-3" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                        <div className="mt-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", letterSpacing: "0.04em" }}>{s.level}</div>
                      </div>
                    </BentoGridCell>
                  ))}
                </BentoGrid>
              </div>
            </TabsContent>
            <TabsContent value="engineering">
              <div className="mt-3">
                <BentoGrid columns={{ md: 3 }} gap="0.5rem">
                  {skills.engineering.map((s) => (
                    <BentoGridCell key={s.name}>
                      <div className="p-3" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                        <div className="mt-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", letterSpacing: "0.04em" }}>{s.level}</div>
                      </div>
                    </BentoGridCell>
                  ))}
                </BentoGrid>
              </div>
            </TabsContent>
            <TabsContent value="tools">
              <div className="mt-3">
                <BentoGrid columns={{ md: 3 }} gap="0.5rem">
                  {skills.tools.map((s) => (
                    <BentoGridCell key={s.name}>
                      <div className="p-3" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                        <div className="mt-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", letterSpacing: "0.04em" }}>{s.level}</div>
                      </div>
                    </BentoGridCell>
                  ))}
                </BentoGrid>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      <PanelSpacer />

      {/* About */}
      <Panel>
        <PanelHeader>About</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            {aboutItems.map((item, i) => (
              <AccordionItem key={i} value={`about-${i}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Contact */}
      <Panel>
        <PanelHeader>Contact</PanelHeader>
        <div className="p-4">
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
            Open to freelance projects, collaborations, and interesting conversations.
          </p>
          <div className="mt-4 space-y-2">
            {[
              { label: "Email", value: "alex@alexchen.design" },
              { label: "GitHub", value: "github.com/alexchen" },
              { label: "Twitter", value: "@alexchen_" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)", minWidth: 52 }}>{item.label}</span>
                <a href="#" style={{ fontSize: 13, color: "var(--s-primary)" }}>{item.value}</a>
              </div>
            ))}
          </div>
          <Button size="sm" className="mt-4">Send a message</Button>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>Alex Chen © 2026</span>
          <div className="flex gap-4">
            {["GitHub", "Twitter", "Dribbble"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>
    </DemoShell>
  );
}
