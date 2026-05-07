"use client";

import { useState } from "react";
import {
  Button,
  Badge,
  Input,
  BentoGrid,
  BentoGridCell,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

const SERVICES = [
  {
    title: "Strategy",
    desc: "Brand positioning, market analysis, and product roadmaps that turn ambiguity into a clear plan of attack.",
    gradient:
      "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 20%, var(--s-surface)) 0%, var(--s-surface) 100%)",
  },
  {
    title: "Design",
    desc: "Design systems, visual identity, interaction design, and motion. We obsess over the details that make products feel considered.",
    gradient:
      "linear-gradient(150deg, color-mix(in oklch, var(--s-primary) 14%, var(--s-background)) 0%, var(--s-surface) 100%)",
  },
  {
    title: "Engineering",
    desc: "Full-stack product engineering with React, Next.js, and infrastructure that scales. From prototype to production.",
    gradient:
      "linear-gradient(120deg, var(--s-surface) 0%, color-mix(in oklch, var(--s-primary) 16%, var(--s-surface)) 100%)",
  },
];

interface CaseStudy {
  title: string;
  category: string;
  summary: string;
  description: string;
  results: string[];
  gradient: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Forma — Design System",
    category: "Brand",
    summary:
      "Complete design system for a Series B fintech. 200+ components, 8 themes, and a migration path from Material UI.",
    description:
      "Forma needed a design system that could scale across three product lines and two platforms. We built a token-driven system with automated documentation, visual regression testing, and a Figma-to-code pipeline.",
    results: [
      "200+ production components",
      "60% faster feature delivery",
      "Design-dev handoff time reduced to near zero",
    ],
    gradient:
      "linear-gradient(135deg, oklch(0.5 0.15 260) 0%, oklch(0.25 0.08 280) 100%)",
  },
  {
    title: "Arcline — Product Launch",
    category: "Product",
    summary:
      "End-to-end product design and engineering for an AI-native analytics platform. Zero to launch in 14 weeks.",
    description:
      "Arcline came to us with a working ML pipeline and no interface. We designed and built the entire product surface — dashboard, query builder, alert system, and public API docs — shipping their beta on time.",
    results: [
      "14 weeks from zero to public beta",
      "4,200 beta signups in first week",
      "Featured in TechCrunch launch coverage",
    ],
    gradient:
      "linear-gradient(135deg, oklch(0.45 0.12 180) 0%, oklch(0.2 0.06 200) 100%)",
  },
];

const PROCESS = [
  {
    title: "Discovery",
    desc: "We start with listening. Stakeholder interviews, competitive analysis, user research, and technical audit. By the end of week one, we have a shared understanding of the problem space and a scoped plan.",
  },
  {
    title: "Design",
    desc: "Rapid exploration followed by convergence. Wireframes, prototypes, and design system foundations. We present concepts, iterate fast, and lock in the visual direction before writing production code.",
  },
  {
    title: "Development",
    desc: "Component-driven engineering in two-week sprints. Continuous deployment, automated testing, and weekly demo reviews. Every component is token-driven and accessible out of the box.",
  },
  {
    title: "Launch",
    desc: "Performance audit, accessibility review, SEO optimization, and deployment. We don't just ship — we monitor, iterate on real data, and hand off a codebase that your team can own.",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full text-left"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          <div className="flex flex-col gap-3">
            <PlaceholderImage
              aspect="16/9"
              gradient={study.gradient}
              label={study.title}
            />
            <div className="flex items-center gap-2 px-0.5">
              <span style={{ fontSize: 14, fontWeight: 600 }}>{study.title}</span>
              <Badge variant="outline" className="text-[10px]">
                {study.category}
              </Badge>
            </div>
            <p
              className="px-0.5"
              style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}
            >
              {study.summary}
            </p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{study.title}</DialogTitle>
          <DialogDescription>{study.description}</DialogDescription>
        </DialogHeader>
        <PlaceholderImage
          aspect="16/9"
          gradient={study.gradient}
          label={study.title}
          className="mt-2"
        />
        <div className="mt-4 flex flex-col gap-2">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--s-text-muted)",
            }}
          >
            Results
          </span>
          {study.results.map((r) => (
            <div key={r} className="flex items-baseline gap-2">
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 11,
                  color: "var(--s-primary)",
                }}
              >
                ✓
              </span>
              <span style={{ fontSize: 13, color: "var(--s-text-muted)" }}>{r}</span>
            </div>
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

export default function AgencyDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            SIGIL LABS
          </span>
          <div className="flex items-center gap-5">
            {["Work", "Services", "Process", "Contact"].map((link) => (
              <span
                key={link}
                className="hidden text-sm sm:inline"
                style={{ color: "var(--s-text-muted)", cursor: "pointer" }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-20 pb-14">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              fontWeight: 750,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            We build digital
            <br />
            products.
          </h1>
          <p
            className="mt-5"
            style={{
              fontSize: 15,
              color: "var(--s-text-muted)",
              maxWidth: "30rem",
              lineHeight: 1.6,
            }}
          >
            Strategy, design, and engineering for teams that care about craft.
            From brand identity to shipped product.
          </p>
          <Button className="mt-8">Start a Project</Button>
        </div>
      </Panel>

      {/* ── Services ────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Services</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {SERVICES.map((service) => (
            <BentoGridCell key={service.title}>
              <div className="flex w-full flex-col gap-3">
                <PlaceholderImage
                  aspect="4/3"
                  gradient={service.gradient}
                  label={service.title}
                />
                <span style={{ fontSize: 15, fontWeight: 600 }}>{service.title}</span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.55 }}>
                  {service.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Case Studies ────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Case Studies</PanelHeader>
        <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
          {CASE_STUDIES.map((study) => (
            <BentoGridCell key={study.title}>
              <CaseStudyCard study={study} />
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Process ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Process</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {PROCESS.map((step, i) => (
              <AccordionItem key={i} value={`step-${i}`}>
                <AccordionTrigger className="text-sm">
                  <span className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 10,
                        color: "var(--s-primary)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      0{i + 1}
                    </span>
                    {step.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--s-text-muted)",
                      lineHeight: 1.6,
                      paddingLeft: 28,
                    }}
                  >
                    {step.desc}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Contact</PanelHeader>
        <div className="flex flex-col gap-4 px-4 py-6" style={{ maxWidth: "28rem" }}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Tell us about your project…"
            rows={4}
            style={{
              fontFamily: "var(--s-font-body)",
              fontSize: 14,
              color: "var(--s-text)",
              background: "var(--s-surface)",
              border: "1px solid var(--s-border)",
              borderRadius: "var(--s-radius-sm, 6px)",
              padding: "10px 12px",
              resize: "vertical",
            }}
          />
          <Button className="w-fit">Send Message</Button>
        </div>
      </Panel>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-5">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Sigil Labs
          </span>
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
