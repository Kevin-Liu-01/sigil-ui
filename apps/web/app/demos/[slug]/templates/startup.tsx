"use client";

import { useState } from "react";
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

const STATS = [
  { value: "$4.2M", label: "Raised" },
  { value: "50K", label: "Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "12ms", label: "Latency" },
];

const FEATURES = [
  {
    title: "Real-Time Collaboration",
    badge: "MULTIPLAYER",
    desc: "Every edit syncs instantly across your team. Presence indicators, cursor tracking, and conflict-free merging built in.",
  },
  {
    title: "AI-Native Workflows",
    badge: "LLM POWERED",
    desc: "Generate, refactor, and review code with models that understand your codebase context — not just the current file.",
  },
  {
    title: "Edge Computing",
    badge: "GLOBAL",
    desc: "Deploy to 40+ edge locations. Your users get sub-20ms responses no matter where they are.",
  },
  {
    title: "Developer Experience",
    badge: "DX-FIRST",
    desc: "Zero-config setup, instant previews, and a CLI that stays out of your way. Ship from your first commit.",
  },
];

const TESTIMONIALS = [
  {
    id: "sarah",
    name: "Sarah Chen",
    title: "CTO",
    company: "Arcline",
    quote:
      "We cut our deployment pipeline from 45 minutes to under 3. Velocity didn't just speed us up — it changed how we think about shipping.",
  },
  {
    id: "marcus",
    name: "Marcus Rivera",
    title: "Staff Engineer",
    company: "Forma Labs",
    quote:
      "The collaboration layer is the real differentiator. Our distributed team across four time zones finally feels synchronous.",
  },
  {
    id: "anika",
    name: "Anika Patel",
    title: "Founder",
    company: "Lattice AI",
    quote:
      "I've tried every dev tool on the market. Velocity is the first one that delivers on the promise of AI-native without the complexity tax.",
  },
];

const FAQ = [
  {
    q: "How is Velocity different from existing CI/CD tools?",
    a: "Velocity isn't just CI/CD — it's the full development loop. Real-time collaboration, AI assistance, edge deployment, and observability in one integrated platform. No glue code between six different services.",
  },
  {
    q: "What languages and frameworks are supported?",
    a: "TypeScript, Python, Go, and Rust out of the box. Framework adapters for Next.js, Remix, SvelteKit, Nuxt, and FastAPI. Custom runtimes via Dockerfiles.",
  },
  {
    q: "Is my code safe?",
    a: "Your source never leaves your infrastructure. AI models run in isolated enclaves with zero data retention. SOC 2 Type II certified, with HIPAA BAA available on Enterprise.",
  },
  {
    q: "Can I self-host Velocity?",
    a: "Enterprise customers can deploy Velocity on-prem or in their own VPC. We provide Helm charts, Terraform modules, and white-glove migration support.",
  },
  {
    q: "What happens when I hit the free tier limit?",
    a: "We notify you at 80% usage. You can upgrade anytime — no service interruption. Overage on the free tier is billed at the Pro per-unit rate, capped at the Pro plan price.",
  },
];

export default function StartupDemo() {
  const [activeTestimonial, setActiveTestimonial] = useState("sarah");

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
            VELOCITY
          </span>
          <div className="flex items-center gap-5">
            {["Features", "Pricing", "About"].map((link) => (
              <span
                key={link}
                className="hidden text-sm sm:inline"
                style={{ color: "var(--s-text-muted)", cursor: "pointer" }}
              >
                {link}
              </span>
            ))}
            <Button size="sm">Join Waitlist</Button>
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <Panel>
        <div className="px-4 pt-20 pb-14 text-center">
          <Badge variant="outline" className="mb-5">
            Now in Public Beta
          </Badge>
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
              fontWeight: 750,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            The Future Ships Faster
            <br />
            Than You Think
          </h1>
          <p
            className="mx-auto mt-5"
            style={{
              fontSize: 16,
              color: "var(--s-text-muted)",
              maxWidth: "30rem",
              lineHeight: 1.6,
            }}
          >
            Stop stitching together a dozen tools. Velocity gives your team one
            integrated platform to build, test, and ship products with a little
            bit of magic.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Join Waitlist</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Watch Demo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Product Demo</DialogTitle>
                  <DialogDescription>
                    See Velocity in action — from first commit to global
                    deployment.
                  </DialogDescription>
                </DialogHeader>
                <PlaceholderImage
                  aspect="16/9"
                  gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 25%, var(--s-background)) 0%, var(--s-surface) 100%)"
                  label="Video Player"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── Traction ─────────────────────────────────────────────── */}
      <Panel>
        <PanelHeader>Traction</PanelHeader>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-8"
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid var(--s-border)"
                    : undefined,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--s-font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--s-text-muted)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── Features ─────────────────────────────────────────────── */}
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-3">
                <PlaceholderImage
                  aspect="2/1"
                  gradient={`linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 12%, var(--s-surface)) 0%, var(--s-surface) 100%)`}
                  label={f.title}
                />
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 15, fontWeight: 600 }}>
                    {f.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.06em",
                      color: "var(--s-primary)",
                    }}
                  >
                    {f.badge}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--s-text-muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      <PanelSpacer />

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <Panel>
        <PanelHeader>Testimonials</PanelHeader>
        <div className="px-4 py-6">
          <Tabs
            value={activeTestimonial}
            onValueChange={setActiveTestimonial}
          >
            <TabsList>
              {TESTIMONIALS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs">
                  {t.name.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            {TESTIMONIALS.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <blockquote className="mt-6">
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.65,
                      fontStyle: "italic",
                      color: "var(--s-text)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-2">
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--s-text-muted)",
                      }}
                    >
                      {t.title}, {t.company}
                    </span>
                  </footer>
                </blockquote>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--s-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <Panel>
        <div className="flex flex-col items-center gap-4 px-4 py-14 text-center">
          <h2
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 650,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to build?
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--s-text-muted)",
              maxWidth: "24rem",
            }}
          >
            Join 50,000 developers already shipping faster.
          </p>
          <div className="flex w-full max-w-sm gap-2">
            <Input placeholder="you@company.com" className="flex-1" />
            <Button>Join Waitlist</Button>
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* ── Footer ──────────────────────────────────────────────── */}
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
            © 2026 Velocity
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
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>
              sigil-ui
            </span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
