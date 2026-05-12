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
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 76 65" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.04em" }}>Vercel</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            {["Products", "Solutions", "Resources", "Enterprise", "Pricing"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Sign Up</Button>
          <Button variant="ghost" size="sm">Contact</Button>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 md:py-24 text-center">
        <div className="mb-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>develop. preview. ship.</span>
        </div>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: "36rem", margin: "0 auto" }}>
          Your complete platform for the web
        </h1>
        <p style={{ fontFamily: "var(--s-font-body)", fontSize: 15, color: "var(--s-text-muted)", maxWidth: "30rem", margin: "1.25rem auto 0", lineHeight: 1.6 }}>
          Vercel provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button>Start Deploying</Button>
          <Button variant="outline">Get a Demo</Button>
        </div>
      </Panel>

      {/* Dashboard image */}
      <Panel>
        <PlaceholderImage aspect="21/9" label="Dashboard" />
      </Panel>

      {/* Infrastructure */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Infrastructure</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Edge Network</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  300+ global edge locations. Static assets served from the CDN, dynamic routes computed at the nearest edge. Zero configuration.
                </p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Serverless Functions</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  Deploy backend logic that scales automatically. Cold starts under 50ms at the edge. Pay only for what you use.
                </p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="space-y-2">
                <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Analytics</span>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  Real-time Web Vitals, audience insights, and performance monitoring. Understand your users without third-party scripts.
                </p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      {/* Framework Support — Tabs */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Framework Support</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="nextjs">
            <TabsList>
              <TabsTrigger value="nextjs">Next.js</TabsTrigger>
              <TabsTrigger value="sveltekit">SvelteKit</TabsTrigger>
              <TabsTrigger value="nuxt">Nuxt</TabsTrigger>
              <TabsTrigger value="astro">Astro</TabsTrigger>
            </TabsList>
            <TabsContent value="nextjs" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                The React framework for production. Server Components, App Router, and built-in optimizations — deployed with zero config on Vercel.
              </p>
              <PlaceholderImage aspect="3/1" label="Next.js" className="mt-4" />
            </TabsContent>
            <TabsContent value="sveltekit" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                The fastest way to build Svelte apps. File-based routing, server-side rendering, and adapter-auto for seamless Vercel deployment.
              </p>
              <PlaceholderImage aspect="3/1" label="SvelteKit" className="mt-4" />
            </TabsContent>
            <TabsContent value="nuxt" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                The intuitive Vue framework. Hybrid rendering, auto-imports, and Nitro server engine — optimized for Vercel edge and serverless.
              </p>
              <PlaceholderImage aspect="3/1" label="Nuxt" className="mt-4" />
            </TabsContent>
            <TabsContent value="astro" className="pt-4">
              <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                The web framework for content-driven sites. Islands architecture, zero JS by default, and multi-framework component support.
              </p>
              <PlaceholderImage aspect="3/1" label="Astro" className="mt-4" />
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
            <AccordionItem value="free">
              <AccordionTrigger>Is Vercel free?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  The Hobby plan is free forever for personal projects. Pro and Enterprise plans add team features, higher limits, and priority support.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="frameworks">
              <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Next.js, SvelteKit, Nuxt, Astro, Remix, Gatsby, Angular, and any static site generator. Framework detection is automatic.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="custom-domains">
              <AccordionTrigger>Can I use a custom domain?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Yes. Add any number of custom domains with automatic SSL. DNS configuration takes under 5 minutes.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="enterprise">
              <AccordionTrigger>What does Enterprise include?</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-body)", fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  99.99% SLA, SAML SSO, advanced DDoS protection, dedicated support engineer, custom invoicing, and audit logs.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 76 65" fill="currentColor" style={{ color: "var(--s-text-muted)" }}>
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Vercel Clone — Sigil UI</span>
        </div>
        <div className="flex items-center gap-4">
          {["GitHub", "Twitter", "YouTube"].map((link) => (
            <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
