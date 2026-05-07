"use client";

import React from "react";
import {
  Button,
  Badge,
  Avatar,
  Switch,
  Label,
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

const stats = [
  { label: "Users", value: "12,847", change: "+12.5%", positive: true },
  { label: "Revenue", value: "$48.2K", change: "+8.1%", positive: true },
  { label: "Uptime", value: "98.5%", change: "", positive: true },
  { label: "Avg Load", value: "2.4s", change: "", positive: false },
];

const events = [
  { time: "2m ago", text: "Deployment #482 succeeded", type: "success" },
  { time: "14m ago", text: "Alert: CPU spike on us-east-1", type: "warning" },
  { time: "1h ago", text: "User alice@co.com upgraded to Pro", type: "info" },
  { time: "3h ago", text: "Database backup completed", type: "success" },
  { time: "5h ago", text: "SSL certificate renewed", type: "info" },
];

const trafficMetrics = [
  { label: "Page Views", value: 82, max: 100 },
  { label: "Unique Visitors", value: 64, max: 100 },
  { label: "Bounce Rate", value: 31, max: 100 },
];

const revenueMetrics = [
  { label: "MRR", value: 72, max: 100 },
  { label: "ARR Growth", value: 58, max: 100 },
  { label: "Churn", value: 12, max: 100 },
];

const userMetrics = [
  { label: "Signups", value: 89, max: 100 },
  { label: "Activations", value: 74, max: 100 },
  { label: "Retention", value: 66, max: 100 },
];

const teamMembers = [
  { name: "Alice Chen", role: "Admin" },
  { name: "Bob Martinez", role: "Editor" },
  { name: "Carol Wu", role: "Viewer" },
];

export default function Page() {
  return (
    <DemoShell maxWidth="64rem">
      {/* Navbar */}
      <Panel as="nav">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "0.02em" }}>Dashboard</span>
          <Avatar fallback="KL" size="sm" />
        </div>
      </Panel>

      {/* Overview Stats */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Overview</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={4} gap="1rem">
            {stats.map((s) => (
              <BentoGridCell key={s.label}>
                <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-sm, 6px)", border: "1px solid var(--s-border)" }}>
                  <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "var(--s-text-muted)" }}>{s.label}</span>
                  <div className="mt-1" style={{ fontFamily: "var(--s-font-display)", fontSize: 22, fontWeight: 700 }}>{s.value}</div>
                  {s.change && (
                    <span style={{ fontSize: 12, fontWeight: 500, color: s.positive ? "var(--s-success, oklch(0.7 0.15 145))" : "var(--s-error, oklch(0.65 0.2 25))" }}>{s.change}</span>
                  )}
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* Analytics */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Analytics</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="traffic">
            <TabsList>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="traffic">
              <PlaceholderImage aspect="3/1" label="Traffic Chart" className="mb-4" />
              <div className="space-y-3">
                {trafficMetrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{m.label}</span>
                    <Progress value={m.value} className="flex-1" />
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 600, width: 32, textAlign: "right" as const }}>{m.value}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="revenue">
              <PlaceholderImage aspect="3/1" label="Revenue Chart" className="mb-4" />
              <div className="space-y-3">
                {revenueMetrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{m.label}</span>
                    <Progress value={m.value} className="flex-1" />
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 600, width: 32, textAlign: "right" as const }}>{m.value}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="users">
              <PlaceholderImage aspect="3/1" label="Users Chart" className="mb-4" />
              <div className="space-y-3">
                {userMetrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{m.label}</span>
                    <Progress value={m.value} className="flex-1" />
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 600, width: 32, textAlign: "right" as const }}>{m.value}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* Recent Events */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Recent Events</PanelHeader>
        <div className="divide-y" style={{ borderColor: "var(--s-border)" }}>
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Badge variant={e.type === "success" ? "default" : e.type === "warning" ? "outline" : "secondary"} className="shrink-0">
                {e.type}
              </Badge>
              <span style={{ fontSize: 13, flex: 1 }}>{e.text}</span>
              <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)", whiteSpace: "nowrap" as const }}>{e.time}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Settings */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Settings</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="notifications">
              <AccordionTrigger>Notifications</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 py-2">
                  {["Email alerts", "Push notifications", "Weekly digest"].map((label) => (
                    <div key={label} className="flex items-center justify-between">
                      <Label style={{ fontSize: 13 }}>{label}</Label>
                      <Switch defaultChecked={label !== "Weekly digest"} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="api-keys">
              <AccordionTrigger>API Keys</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 py-2">
                  {["sk-prod-****-abcd", "sk-dev-****-efgh"].map((key) => (
                    <div key={key} className="flex items-center justify-between p-2" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-sm, 6px)", border: "1px solid var(--s-border)" }}>
                      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 12 }}>{key}</span>
                      <Button variant="ghost" size="sm">Copy</Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="team">
              <AccordionTrigger>Team</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  {teamMembers.map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <Avatar fallback={m.name.split(" ").map((n) => n[0]).join("")} size="sm" />
                      <div className="flex-1">
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                        <div style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)" }}>{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>© 2026 Dashboard</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>Built with Sigil UI</span>
        </div>
      </Panel>
    </DemoShell>
  );
}
