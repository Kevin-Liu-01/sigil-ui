"use client";

import { useState } from "react";
import {
  Button,
  Badge,
  BentoGrid,
  BentoGridCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

const PROJECTS = [
  {
    name: "Neon District",
    category: "Brand",
    description:
      "Complete visual identity system for a cyberpunk-inspired fintech startup. Includes logo, type system, motion language, and component library.",
    tech: ["Figma", "After Effects", "React"],
    gradient:
      "linear-gradient(135deg, oklch(0.45 0.18 280) 0%, oklch(0.2 0.08 300) 100%)",
  },
  {
    name: "Void Interface",
    category: "Product",
    description:
      "End-to-end product design for an AI code editor. Designed the command palette, inline completions, and multi-model routing UI.",
    tech: ["React", "TypeScript", "Tailwind", "Radix"],
    gradient:
      "linear-gradient(135deg, oklch(0.3 0.02 260) 0%, oklch(0.15 0.01 240) 100%)",
  },
  {
    name: "Neural Canvas",
    category: "Art",
    description:
      "Generative art platform enabling artists to collaborate with diffusion models. Designed the canvas UI, prompt builder, and gallery.",
    tech: ["Next.js", "Canvas API", "WebGL"],
    gradient:
      "linear-gradient(135deg, oklch(0.5 0.15 150) 0%, oklch(0.25 0.08 180) 100%)",
  },
  {
    name: "Signal Chain",
    category: "Web",
    description:
      "Marketing site and documentation for an audio processing SDK. Scroll-driven demos, interactive waveform visualizations.",
    tech: ["Astro", "GSAP", "Web Audio API"],
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.12 60) 0%, oklch(0.25 0.06 40) 100%)",
  },
  {
    name: "Dark Protocol",
    category: "App",
    description:
      "Privacy-first messaging app with disappearing threads, encrypted group channels, and a custom notification system.",
    tech: ["Swift", "Kotlin", "Figma"],
    gradient:
      "linear-gradient(135deg, oklch(0.25 0.04 0) 0%, oklch(0.12 0.02 300) 100%)",
  },
  {
    name: "Quantum Field",
    category: "Product",
    description:
      "Dashboard for quantum computing researchers. Real-time qubit visualization, circuit builder, and experiment scheduling.",
    tech: ["React", "D3", "Three.js", "Python"],
    gradient:
      "linear-gradient(135deg, oklch(0.4 0.2 200) 0%, oklch(0.18 0.1 220) 100%)",
  },
];

const EXPERIENCE = [
  { company: "Vercel", title: "Design Engineer", period: "2024–Present" },
  { company: "Linear", title: "Senior Designer", period: "2022–2024" },
  { company: "Stripe", title: "Product Designer", period: "2020–2022" },
  { company: "Figma", title: "Designer", period: "2018–2020" },
];

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full text-left"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          <div className="flex flex-col gap-3">
            <PlaceholderImage
              aspect={featured ? "21/9" : "16/9"}
              gradient={project.gradient}
              label={project.name}
            />
            <div className="flex items-center justify-between px-1">
              <span style={{ fontSize: 14, fontWeight: 600 }}>{project.name}</span>
              <Badge variant="outline" className="text-[10px]">
                {project.category}
              </Badge>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <PlaceholderImage
          aspect="16/9"
          gradient={project.gradient}
          label={project.name}
          className="mt-2"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectGrid({ filter }: { filter: string }) {
  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
      {filtered.map((project, i) => (
        <BentoGridCell key={project.name} colSpan={i === 0 ? 2 : 1}>
          <ProjectCard project={project} featured={i === 0} />
        </BentoGridCell>
      ))}
    </BentoGrid>
  );
}

export default function PortfolioDemo() {
  return (
    <DemoShell>
      {/* ── Nav ──────────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Alex Chen
          </span>
          <div className="flex items-center gap-5">
            <span className="text-sm" style={{ color: "var(--s-text-muted)" }}>
              Work
            </span>
            <span className="text-sm" style={{ color: "var(--s-text-muted)" }}>
              About
            </span>
            <span className="text-sm" style={{ color: "var(--s-text-muted)" }}>
              Contact
            </span>
          </div>
        </div>
      </Panel>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-10">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Selected Work
          </h1>
          <p
            className="mt-4"
            style={{
              fontSize: 15,
              color: "var(--s-text-muted)",
              maxWidth: "32rem",
              lineHeight: 1.6,
            }}
          >
            Design engineer focused on systems that scale. Previously at Vercel,
            Linear, and Stripe.
          </p>
        </div>
      </Panel>

      {/* ── Projects ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Projects</PanelHeader>
        <div className="px-4 py-4">
          <Tabs defaultValue="All">
            <TabsList>
              <TabsTrigger value="All" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="Product" className="text-xs">
                Product
              </TabsTrigger>
              <TabsTrigger value="Brand" className="text-xs">
                Brand
              </TabsTrigger>
              <TabsTrigger value="Web" className="text-xs">
                Web
              </TabsTrigger>
            </TabsList>
            <TabsContent value="All">
              <ProjectGrid filter="All" />
            </TabsContent>
            <TabsContent value="Product">
              <ProjectGrid filter="Product" />
            </TabsContent>
            <TabsContent value="Brand">
              <ProjectGrid filter="Brand" />
            </TabsContent>
            <TabsContent value="Web">
              <ProjectGrid filter="Web" />
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* ── About ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>About</PanelHeader>
        <div className="grid gap-6 px-4 py-6 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4">
            <p style={{ fontSize: 14, color: "var(--s-text-muted)", lineHeight: 1.7 }}>
              I&apos;m a design engineer who bridges the gap between visual craft
              and technical implementation. I believe the best interfaces are
              built by people who can hold both sides — the pixel and the
              function call — in their head at once.
            </p>
            <p style={{ fontSize: 14, color: "var(--s-text-muted)", lineHeight: 1.7 }}>
              My work spans brand systems, product interfaces, and generative
              tools. I care deeply about motion, type, and the small details that
              make software feel considered.
            </p>
          </div>
          <PlaceholderImage
            aspect="1/1"
            gradient="linear-gradient(135deg, oklch(0.35 0.05 260) 0%, oklch(0.2 0.03 280) 100%)"
            label="Headshot"
          />
        </div>
      </Panel>

      {/* ── Experience ───────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Experience</PanelHeader>
        <div className="flex flex-col">
          {EXPERIENCE.map((role) => (
            <div
              key={role.company + role.period}
              className="s-screen-line-bottom flex items-center justify-between px-4 py-3.5"
            >
              <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                  {role.company}
                </span>
                <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>
                  {role.title}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 11,
                  color: "var(--s-text-muted)",
                  letterSpacing: "0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {role.period}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Footer ───────────────────────────────────────────────── */}
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
            Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>
              sigil-ui
            </span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
