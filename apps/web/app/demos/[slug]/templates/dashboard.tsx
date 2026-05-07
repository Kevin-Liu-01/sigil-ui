"use client";

import {
  Button,
  Badge,
  Input,
  Progress,
  Avatar,
  Switch,
  Label,
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
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

const STATS = [
  { label: "Users", value: "12,847", change: "+12.5%", positive: true },
  { label: "Revenue", value: "$48.2K", change: "+8.1%", positive: true },
  { label: "Uptime", value: "98.5%", change: "", positive: true },
  { label: "Avg Load", value: "2.4s", change: "", positive: false },
];

const EVENTS = [
  { name: "Deployment succeeded", time: "2 min ago" },
  { name: "User signup — kate@acme.co", time: "8 min ago" },
  { name: "Invoice #1042 paid", time: "23 min ago" },
  { name: "SSL certificate renewed", time: "1 hr ago" },
  { name: "Backup completed", time: "3 hr ago" },
  { name: "Webhook fired → /api/sync", time: "5 hr ago" },
];

const API_KEYS = [
  { name: "Production", key: "sk-prod-••••••••••••3f9a" },
  { name: "Staging", key: "sk-stag-••••••••••••b2c1" },
  { name: "Development", key: "sk-dev-•••••••••••••e47d" },
];

const TEAM = [
  { name: "KL", color: "var(--s-primary)" },
  { name: "AM", color: "color-mix(in oklch, var(--s-primary) 60%, var(--s-text))" },
  { name: "JR", color: "color-mix(in oklch, var(--s-primary) 40%, var(--s-surface))" },
  { name: "TS", color: "color-mix(in oklch, var(--s-primary) 80%, var(--s-background))" },
];

export default function DashboardDemo() {
  return (
    <DemoShell maxWidth="64rem">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Dashboard
          </span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Settings
            </Button>
            <Avatar fallback="KL" size="sm" />
          </div>
        </div>
      </Panel>

      {/* ── Overview Stats ─────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Overview</PanelHeader>
        <BentoGrid columns={{ sm: 2, md: 4 }} gap={4} className="p-1">
          {STATS.map((s) => (
            <BentoGridCell key={s.label}>
              <div className="flex w-full flex-col gap-1.5">
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--s-text-muted)",
                  }}
                >
                  {s.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </span>
                  {s.change && (
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 11,
                        fontVariantNumeric: "tabular-nums",
                        color: s.positive
                          ? "var(--s-success, oklch(0.7 0.15 145))"
                          : "var(--s-text-muted)",
                      }}
                    >
                      {s.change}
                    </span>
                  )}
                </div>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Analytics Tabs ─────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Analytics</PanelHeader>
        <div className="px-4 py-3">
          <Tabs defaultValue="traffic">
            <TabsList>
              <TabsTrigger value="traffic" className="text-xs">
                Traffic
              </TabsTrigger>
              <TabsTrigger value="revenue" className="text-xs">
                Revenue
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs">
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="traffic" className="mt-4 space-y-4">
              <PlaceholderImage
                aspect="21/9"
                gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 12%, var(--s-surface)) 0%, var(--s-surface) 100%)"
                label="Traffic Chart"
              />
              <div className="space-y-2.5">
                <ProgressRow label="/api/v1" value={82} />
                <ProgressRow label="/dashboard" value={64} />
                <ProgressRow label="/auth/login" value={41} />
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="mt-4 space-y-4">
              <PlaceholderImage
                aspect="21/9"
                gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 18%, var(--s-surface)) 0%, var(--s-surface) 60%, color-mix(in oklch, var(--s-primary) 8%, var(--s-surface)) 100%)"
                label="Revenue Chart"
              />
              <div className="space-y-2.5">
                <ProgressRow label="Subscriptions" value={71} />
                <ProgressRow label="One-time" value={48} />
                <ProgressRow label="Enterprise" value={93} />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-4 space-y-4">
              <PlaceholderImage
                aspect="21/9"
                gradient="linear-gradient(135deg, var(--s-surface) 0%, color-mix(in oklch, var(--s-primary) 10%, var(--s-surface)) 100%)"
                label="Users Chart"
              />
              <div className="space-y-2.5">
                <ProgressRow label="Active (7d)" value={76} />
                <ProgressRow label="New signups" value={58} />
                <ProgressRow label="Churned" value={12} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* ── Recent Events ──────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Recent Events</PanelHeader>
        <div className="divide-y" style={{ borderColor: "var(--s-border, oklch(0.3 0 0 / 0.1))" }}>
          {EVENTS.map((ev) => (
            <div
              key={ev.name}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <span style={{ fontSize: 13 }}>{ev.name}</span>
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 11,
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--s-text-muted)",
                }}
              >
                {ev.time}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Settings ───────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Settings</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible defaultValue="notifications">
            <AccordionItem value="notifications">
              <AccordionTrigger className="text-sm">
                Notifications
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-1">
                  <NotifRow id="email" label="Email notifications" defaultChecked />
                  <NotifRow id="slack" label="Slack alerts" defaultChecked />
                  <NotifRow id="sms" label="SMS for critical" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="api-keys">
              <AccordionTrigger className="text-sm">API Keys</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2.5 py-1">
                  {API_KEYS.map((k) => (
                    <div
                      key={k.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span style={{ fontSize: 12, fontWeight: 500 }}>
                          {k.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--s-font-mono)",
                            fontSize: 11,
                            color: "var(--s-text-muted)",
                          }}
                        >
                          {k.key}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="team">
              <AccordionTrigger className="text-sm">Team</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-2 py-2">
                  {TEAM.map((t) => (
                    <Avatar key={t.name} fallback={t.name} size="sm" />
                  ))}
                  <Button variant="outline" size="sm" className="ml-2">
                    Invite
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
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
            © 2026 Sigil Dashboard · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>
              sigil-ui
            </span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-24 shrink-0 truncate"
        style={{
          fontFamily: "var(--s-font-mono)",
          fontSize: 11,
          color: "var(--s-text-muted)",
        }}
      >
        {label}
      </span>
      <Progress value={value} className="flex-1" />
      <span
        style={{
          fontFamily: "var(--s-font-mono)",
          fontSize: 11,
          fontVariantNumeric: "tabular-nums",
          color: "var(--s-text-muted)",
          width: 28,
          textAlign: "right",
        }}
      >
        {value}%
      </span>
    </div>
  );
}

function NotifRow({
  id,
  label,
  defaultChecked = false,
}: {
  id: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} style={{ fontSize: 13 }}>
        {label}
      </Label>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}
