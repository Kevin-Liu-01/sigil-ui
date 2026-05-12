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
        <div className="flex items-center gap-8">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Oxide</span>
          <div className="hidden md:flex items-center gap-6">
            {["Product", "Technology", "Company", "Blog"].map((link) => (
              <a key={link} href="#" style={{ fontSize: 13, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
        <Button size="sm">Contact Sales</Button>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel className="px-4 py-16 md:py-24">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Cloud Computer</span>
        <h1 className="mt-4" style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
          The cloud computer, on your terms
        </h1>
        <p className="mt-4 max-w-xl" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
          Oxide builds rack-scale computing infrastructure — purpose-built hardware, a real API for your datacenter, and software you&apos;d actually want to use. The first cloud computer you own.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button>Request a Demo</Button>
          <Button variant="outline">Read the Docs</Button>
        </div>
      </Panel>

      {/* Hero Image */}
      <Panel>
        <PlaceholderImage aspect="21/9" label="Oxide Rack" />
      </Panel>

      <PanelSpacer />

      {/* Architecture */}
      <Panel>
        <PanelHeader>Architecture</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Hardware</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Compute Sled</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Custom-designed compute sled with AMD EPYC processors, up to 2TB of memory, and NVMe storage — optimized for density and thermal efficiency.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Networking</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Network Switch</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Purpose-built top-of-rack switch running the Dendrite networking stack. Full API control over VPCs, firewalls, and load balancing at line rate.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Software</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Control Plane</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Nexus control plane manages the entire rack through a first-class REST API. Provision VMs, disks, and networks — all API-driven with full OpenAPI specs.</p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Software Stack Tabs */}
      <Panel>
        <PanelHeader>Software Stack</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="helios">
            <TabsList>
              <TabsTrigger value="helios">Helios</TabsTrigger>
              <TabsTrigger value="omicron">Omicron</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
            </TabsList>
            <TabsContent value="helios" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                Helios is Oxide&apos;s host operating system — an illumos distribution purpose-built for the rack. It provides hardware-backed isolation through bhyve virtualization, ZFS for storage, and a minimal attack surface with no unnecessary services.
              </p>
            </TabsContent>
            <TabsContent value="omicron" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                Omicron is the rack-scale control plane. Written in Rust, it manages the lifecycle of VMs, disks, VPCs, and images across every sled in the rack. Every operation is API-driven with full audit logging and RBAC.
              </p>
            </TabsContent>
            <TabsContent value="console" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                The Oxide Console is a web application for managing your rack. Built by the same team that builds the hardware, it provides real-time metrics, instance management, networking configuration, and project organization — no third-party integrations.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      <PanelSpacer />

      {/* FAQ */}
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>What is Oxide?</AccordionTrigger>
              <AccordionContent>Oxide builds the first purpose-built cloud computer — an integrated rack of hardware and software that brings the public cloud experience to your own datacenter. One vendor, one API, one support contract.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How is this different from buying servers?</AccordionTrigger>
              <AccordionContent>Traditional on-prem means assembling components from different vendors, bolting on management software, and maintaining it all yourself. Oxide delivers a single integrated product — the hardware, networking, and software are designed together and managed through one API.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>What workloads does Oxide support?</AccordionTrigger>
              <AccordionContent>Oxide supports general-purpose compute workloads — VMs, containers, and bare metal. It&apos;s designed for teams running production infrastructure that need the elasticity of the cloud with the control and economics of on-prem.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Is the software open source?</AccordionTrigger>
              <AccordionContent>Yes. The entire Oxide software stack — including Omicron (control plane), Helios (host OS), Dendrite (networking), and the Console — is open source under the Mozilla Public License 2.0.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>&copy; 2026 Oxide Computer Company</span>
        <div className="flex items-center gap-4">
          {["GitHub", "Docs", "Careers"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{link}</a>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
