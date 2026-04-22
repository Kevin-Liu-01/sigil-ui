"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Input,
  Label,
  Switch,
  Checkbox,
  Slider,
  Progress,
  Avatar,
  Select,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  RadioGroup,
  RadioGroupItem,
  Toggle,
  LoadingSpinner,
  Skeleton,
  Alert,
  AlertTitle,
  KPI,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Textarea,
  NumberField,
} from "@sigil-ui/components";

const TRANSITION_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const compositionStyle: React.CSSProperties = {
  background: "var(--s-surface)",
  border: "1px solid var(--s-border)",
  borderRadius: "var(--s-card-radius, 12px)",
  padding: 24,
  maxWidth: 280,
  width: "100%",
};

/* ------------------------------------------------------------------ */
/*  Composition 1 — Payment Form                                      */
/* ------------------------------------------------------------------ */
function PaymentForm() {
  return (
    <div style={compositionStyle} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--s-text)" }}
        >
          Payment Method
        </h3>
        <p className="text-xs" style={{ color: "var(--s-text-muted)" }}>
          All transactions are encrypted and secure.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Name on Card</Label>
        <Input
          defaultValue="John Doe"
          className="h-8 text-xs"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Card Number</Label>
        <div className="flex gap-2">
          <Input
            defaultValue="1234 5678 9012 3456"
            className="h-8 text-xs flex-1"
          />
          <Input
            defaultValue="123"
            placeholder="CVV"
            className="h-8 text-xs w-16"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label className="text-xs">Month</Label>
          <Select className="h-8 text-xs" defaultValue="12">
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="06">06</option>
            <option value="12">12</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label className="text-xs">Year</Label>
          <Select className="h-8 text-xs" defaultValue="2027">
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-xs font-semibold">Billing Address</Label>
        <Checkbox label="Same as shipping" defaultChecked />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Comments</Label>
        <Textarea
          rows={2}
          placeholder="Additional notes..."
          className="text-xs min-h-0"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button size="sm" className="flex-1 text-xs">
          Submit
        </Button>
        <Button size="sm" variant="outline" className="text-xs">
          Cancel
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composition 2 — Team & Notifications                               */
/* ------------------------------------------------------------------ */
function TeamNotifications() {
  return (
    <div style={compositionStyle} className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Team Members</CardTitle>
          <CardDescription className="text-xs">
            No pending invitations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex -space-x-2 mb-3">
            <Avatar fallback="KL" size="sm" />
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="AR" size="sm" />
          </div>
          <Button size="sm" variant="outline" className="w-full text-xs">
            Invite Members
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-1.5 flex-wrap">
        <Badge size="sm">Syncing</Badge>
        <Badge size="sm" variant="secondary">Updating</Badge>
        <Badge size="sm" variant="outline">Loading</Badge>
      </div>

      <Input
        placeholder="Send a message..."
        className="h-8 text-xs"
      />

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Price Range</Label>
        <Slider defaultValue={40} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search components..."
            className="h-8 text-xs flex-1"
            iconLeft={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            }
          />
        </div>
        <span className="text-[10px]" style={{ color: "var(--s-text-muted)" }}>
          12 results found
        </span>
      </div>

      <Input
        defaultValue="https://example.com"
        className="h-8 text-xs"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composition 3 — Settings Panel                                     */
/* ------------------------------------------------------------------ */
function SettingsPanel() {
  const [gpuCount, setGpuCount] = useState(8);

  return (
    <div style={compositionStyle} className="flex flex-col gap-4">
      <div
        className="flex items-center gap-2 rounded-[var(--s-radius-md,6px)] px-3 py-1.5 text-xs"
        style={{
          background: "var(--s-background)",
          border: "1px solid var(--s-border)",
          color: "var(--s-text-muted)",
        }}
      >
        <span style={{ color: "var(--s-text-muted)" }}>https://</span>
        <span className="flex-1 truncate" style={{ color: "var(--s-text)" }}>
          app.sigil-ui.dev/settings
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--s-text-muted)" }}>
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-xs">Two-Factor Auth</Label>
        <Button size="sm" variant="outline" className="text-xs h-7 px-2">
          Enable
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--s-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <span className="text-xs" style={{ color: "var(--s-text)" }}>
          Profile verified
        </span>
      </div>

      <Separator />

      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--s-text-muted)" }}
      >
        Appearance Settings
      </span>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Compute Environment</Label>
        <RadioGroup defaultValue="k8s" className="gap-3">
          <div className="flex items-start gap-2">
            <RadioGroupItem value="k8s" className="mt-0.5" />
            <div className="flex flex-col">
              <Label className="text-xs cursor-pointer">Kubernetes</Label>
              <span
                className="text-[10px]"
                style={{ color: "var(--s-text-muted)" }}
              >
                Auto-scaling container orchestration
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 opacity-50">
            <RadioGroupItem value="vm" disabled className="mt-0.5" />
            <div className="flex flex-col">
              <Label className="text-xs">Virtual Machine</Label>
              <span
                className="text-[10px]"
                style={{ color: "var(--s-text-muted)" }}
              >
                Coming soon
              </span>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs">Number of GPUs</Label>
        <NumberField
          value={gpuCount}
          onValueChange={setGpuCount}
          min={1}
          max={64}
          step={1}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-xs">Wallpaper Tinting</Label>
        <Switch defaultChecked />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composition 4 — AI Context Panel                                   */
/* ------------------------------------------------------------------ */
function AIContextPanel() {
  return (
    <div style={compositionStyle} className="flex flex-col gap-3">
      <Button size="sm" variant="outline" className="w-full text-xs">
        + Add context
      </Button>

      <Input
        placeholder="Ask, search, or make anything..."
        className="h-8 text-xs"
      />

      <div className="flex gap-1">
        <Badge size="sm" variant="secondary">Auto</Badge>
        <Badge size="sm" variant="outline">All Sources</Badge>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]">
          Archive
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]">
          Report
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]">
          Snooze
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]">
          &hellip;
        </Button>
      </div>

      <Checkbox label="I agree to the terms and conditions" />

      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((n) => (
          <Button
            key={n}
            size="sm"
            variant={n === 1 ? "primary" : "ghost"}
            className="h-7 w-7 p-0 text-[10px]"
          >
            {n}
          </Button>
        ))}
        <Button size="sm" variant="ghost" className="h-7 px-1 text-[10px]">
          &lsaquo;
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-1 text-[10px]">
          &rsaquo;
        </Button>
        <div className="flex-1" />
        <Button size="sm" variant="secondary" className="h-7 text-[10px]">
          Copilot
        </Button>
      </div>

      <Separator />

      <Card className="w-full">
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-xs">How did you hear about us?</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <RadioGroup defaultValue="social" className="gap-2">
            {[
              { value: "social", label: "Social Media" },
              { value: "search", label: "Search Engine" },
              { value: "referral", label: "Referral" },
              { value: "other", label: "Other" },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-2">
                <RadioGroupItem value={item.value} />
                <Label className="text-[11px] cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div
        className="flex items-center gap-3 rounded-[var(--s-radius-md,6px)] p-3"
        style={{
          background: "var(--s-surface-elevated)",
          border: "1px solid var(--s-border)",
        }}
      >
        <LoadingSpinner variant="braille" size="sm" />
        <div className="flex flex-col flex-1 gap-0.5">
          <span className="text-xs" style={{ color: "var(--s-text)" }}>
            Processing your request
          </span>
          <Progress value={65} className="h-1" />
        </div>
        <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]">
          Cancel
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Part 1 — Hero Compositions (4 columns)                            */
/* ------------------------------------------------------------------ */
function HeroCompositions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
      <PaymentForm />
      <TeamNotifications />
      <SettingsPanel />
      <AIContextPanel />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Part 2 — Dense Component Grid  (6 cols × 4 rows = 24 cells)      */
/* ------------------------------------------------------------------ */

type GridCell = {
  name: string;
  render: () => React.ReactNode;
};

const GRID_CELLS: GridCell[] = [
  /* Row 1 */
  { name: "Button", render: () => <Button size="sm">Primary</Button> },
  { name: "Secondary", render: () => <Button size="sm" variant="secondary">Secondary</Button> },
  { name: "Ghost", render: () => <Button size="sm" variant="ghost">Ghost</Button> },
  { name: "Badge", render: () => <Badge>New</Badge> },
  { name: "Badge outline", render: () => <Badge variant="outline">v2.0</Badge> },
  { name: "Avatar", render: () => <Avatar fallback="SG" size="md" /> },

  /* Row 2 */
  { name: "Input", render: () => <Input placeholder="Email..." className="h-7 text-[10px] w-full" /> },
  { name: "Textarea", render: () => <Textarea rows={2} placeholder="Write..." className="text-[10px] min-h-0 w-full" /> },
  {
    name: "Select",
    render: () => (
      <Select className="h-7 text-[10px] w-full" defaultValue="react">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>
    ),
  },
  { name: "Checkbox", render: () => <Checkbox label="Accept" /> },
  { name: "Switch", render: () => <Switch label="On" defaultChecked /> },
  { name: "Toggle", render: () => <Toggle size="sm" variant="outline" defaultPressed>Bold</Toggle> },

  /* Row 3 */
  { name: "Slider", render: () => <Slider defaultValue={50} className="w-full" /> },
  { name: "Progress", render: () => <Progress value={60} className="w-full" /> },
  {
    name: "RadioGroup",
    render: () => (
      <RadioGroup defaultValue="a" className="gap-1">
        <div className="flex items-center gap-1.5">
          <RadioGroupItem value="a" />
          <Label className="text-[10px] cursor-pointer">Alpha</Label>
        </div>
        <div className="flex items-center gap-1.5">
          <RadioGroupItem value="b" />
          <Label className="text-[10px] cursor-pointer">Beta</Label>
        </div>
      </RadioGroup>
    ),
  },
  { name: "KPI", render: () => <KPI label="Revenue" value="$4.2k" change="+8%" trend="up" className="p-1.5 text-[10px] border-0" /> },
  { name: "Separator", render: () => (
    <div className="flex flex-col gap-2 w-full items-center">
      <Separator />
      <span className="text-[9px]" style={{ color: "var(--s-text-muted)" }}>or</span>
      <Separator />
    </div>
  )},
  { name: "Alert", render: () => <Alert variant="info" className="p-2"><AlertTitle className="text-[10px]">Info alert</AlertTitle></Alert> },

  /* Row 4 */
  { name: "Skeleton text", render: () => (
    <div className="flex flex-col gap-1.5 w-full">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  )},
  { name: "Skeleton avatar", render: () => (
    <div className="flex items-center gap-2">
      <Skeleton variant="avatar" />
      <div className="flex flex-col gap-1 flex-1">
        <Skeleton variant="text" className="w-16" />
        <Skeleton variant="text" className="w-10" />
      </div>
    </div>
  )},
  { name: "Spinner", render: () => <LoadingSpinner variant="braille" size="lg" /> },
  {
    name: "Accordion",
    render: () => (
      <Accordion className="w-full">
        <AccordionItem value="faq">
          <AccordionTrigger className="text-[10px] py-1">FAQ item</AccordionTrigger>
          <AccordionContent className="text-[10px]">Answer here.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Tabs",
    render: () => (
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="h-7 p-0.5">
          <TabsTrigger value="code" className="text-[10px] px-2 py-0.5 h-6">Code</TabsTrigger>
          <TabsTrigger value="preview" className="text-[10px] px-2 py-0.5 h-6">Preview</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
  {
    name: "Card",
    render: () => (
      <Card className="w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px]">Mini Card</CardTitle>
          <CardDescription className="text-[9px]">Compact layout</CardDescription>
        </CardHeader>
      </Card>
    ),
  },
];

function DenseComponentGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-6">
      {GRID_CELLS.map((cell) => (
        <div
          key={cell.name}
          className="group flex flex-col items-center justify-center"
          style={{
            minHeight: 80,
            padding: "10px 8px 6px",
            borderRadius: "var(--s-radius-md, 6px)",
            border: "1px solid var(--s-border-muted)",
            background: "var(--s-surface)",
            transition: `transform 200ms ${TRANSITION_EASING}, border-color 200ms ${TRANSITION_EASING}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.borderColor = "var(--s-border-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.borderColor = "var(--s-border-muted)";
          }}
        >
          <div className="flex items-center justify-center flex-1 w-full">
            {cell.render()}
          </div>
          <span
            className="mt-1.5 font-mono leading-none select-none"
            style={{
              fontSize: 9,
              color: "var(--s-text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            {cell.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preset Dots (visual only — switching handled by parent)           */
/* ------------------------------------------------------------------ */
function PresetDots() {
  const dots = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <div className="flex items-center justify-center gap-2.5 mt-6">
      {dots.map((color, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            background: color,
            opacity: i === 0 ? 1 : 0.4,
            transition: `opacity 300ms ${TRANSITION_EASING}`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Transition style tag — applies smooth transitions to all children */
/* ------------------------------------------------------------------ */
const TRANSITION_CSS = `
.hero-transition-wrapper,
.hero-transition-wrapper * {
  transition:
    background-color 400ms ${TRANSITION_EASING},
    border-color 400ms ${TRANSITION_EASING},
    color 400ms ${TRANSITION_EASING},
    box-shadow 400ms ${TRANSITION_EASING},
    border-radius 400ms ${TRANSITION_EASING},
    transform 200ms ${TRANSITION_EASING};
}
`;

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */
export function HeroShowcase({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <style dangerouslySetInnerHTML={{ __html: TRANSITION_CSS }} />
      <div className="hero-transition-wrapper">
        <HeroCompositions />
        <DenseComponentGrid />
        <PresetDots />
      </div>
    </div>
  );
}
