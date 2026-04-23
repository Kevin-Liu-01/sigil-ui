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
  AvatarGroup,
  Select,
  Separator,
  RadioGroup,
  RadioGroupItem,
  KPI,
  Meter,
  Stepper,
  NumberField,
} from "@sigil-ui/components";

import {
  Rocket,
  GitBranch,
  GitCommitHorizontal,
  CircleCheck,
  Clock,
  Palette,
  Moon,
  Layers,
  BarChart3,
  CalendarDays,
  Globe,
  FileText,
  ArrowUpRight,
  Building2,
  Mail,
  Plus,
  Sparkles,
  Crown,
  Check,
  Server,
  Eye,
  Radio,
  Shield,
  ChevronRight,
  CheckCircle2,
  Paintbrush,
} from "lucide-react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const TRANSITION_CSS = `
.hero-gallery, .hero-gallery * {
  transition:
    background-color 400ms ${EASING},
    border-color 400ms ${EASING},
    color 400ms ${EASING},
    box-shadow 400ms ${EASING},
    border-radius 400ms ${EASING},
    transform 200ms ${EASING};
}
`;

/* ================================================================ */
/*  Deploy cards                                                      */
/* ================================================================ */

function DeployCard() {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <Rocket size={14} className="text-[var(--s-primary)]" />
            Deploy to Production
          </CardTitle>
          <Badge size="sm" className="gap-1"><Radio size={9} />Live</Badge>
        </div>
        <CardDescription className="text-[10px]">Select the target for this deployment.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <RadioGroup defaultValue="production" className="gap-1.5">
          {[
            { value: "production", label: "Production", desc: "Public-facing. Requires approval.", icon: <Globe size={12} className="text-[var(--s-text-muted)]" /> },
            { value: "staging", label: "Staging", desc: "Internal testing environment.", icon: <Eye size={12} className="text-[var(--s-text-muted)]" /> },
            { value: "preview", label: "Preview", desc: "Ephemeral per-PR deployment.", icon: <Server size={12} className="text-[var(--s-text-muted)]" /> },
          ].map((env) => (
            <label key={env.value} className="flex items-start gap-2.5 p-2 cursor-pointer" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
              <div className="flex-1">
                <span className="text-[11px] font-medium text-[var(--s-text)] flex items-center gap-1">{env.icon}{env.label}</span>
                <p className="text-[9px] text-[var(--s-text-muted)] mt-0.5 ml-4">{env.desc}</p>
              </div>
              <RadioGroupItem value={env.value} className="mt-0.5" />
            </label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

function BuildStatus() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-3">
        <Input defaultValue="main" className="h-8 text-xs font-mono" iconLeft={<GitBranch size={13} className="text-[var(--s-text-muted)]" />} />
        <div className="flex items-center gap-2 px-2 py-1.5 text-[9px] font-mono text-[var(--s-text-muted)]" style={{ border: "1px solid var(--s-border-muted)", borderRadius: "var(--s-radius-md, 6px)" }}>
          <GitCommitHorizontal size={12} className="shrink-0" />
          <span className="truncate">a3f9c2d — fix: token compiler edge case</span>
        </div>
        <div className="flex items-center gap-3">
          {["Types", "Lint", "Tests"].map((c) => (
            <span key={c} className="flex items-center gap-1 text-[10px] text-[var(--s-text)]">
              <CircleCheck size={11} className="text-[var(--s-success)]" />{c}
            </span>
          ))}
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[10px] text-[var(--s-text)]">Build complete</span>
            <span className="text-[10px] text-[var(--s-success)]">100%</span>
          </div>
          <Progress value={100} className="h-1" />
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 text-xs"><Rocket size={13} />Deploy Now</Button>
          <Button size="sm" variant="outline" className="text-xs">Cancel</Button>
        </div>
        <p className="text-[9px] text-[var(--s-text-muted)] flex items-center gap-1"><Clock size={9} />Last deployed 4m ago</p>
      </CardContent>
    </Card>
  );
}

/* ================================================================ */
/*  Token cards                                                       */
/* ================================================================ */

function TokenEditorCard() {
  const [radius, setRadius] = useState(8);
  const [spacing, setSpacing] = useState(4);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <Palette size={14} className="text-[var(--s-primary)]" />
            Edit Tokens
          </CardTitle>
          <Badge size="sm" variant="secondary" className="font-mono text-[8px]">sigil.tokens.md</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label className="text-[10px]">Primary Color</Label>
          <div className="relative">
            <Input defaultValue="oklch(0.65 0.18 275)" className="h-8 text-[11px] font-mono pl-7" />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ background: "var(--s-primary)", border: "1px solid var(--s-border)" }} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[10px]">Display Font</Label>
          <Select className="h-8 text-[11px]" defaultValue="monument">
            <option value="monument">Monument Grotesk</option>
            <option value="inter">Inter</option>
            <option value="geist">Geist</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <Label className="text-[10px]">Card Radius</Label>
            <Badge size="sm" variant="outline" className="text-[8px] font-mono tabular-nums">{radius}px</Badge>
          </div>
          <Slider defaultValue={[8]} min={0} max={24} step={1} onValueChange={(v: number[]) => setRadius(v[0])} />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[10px]">Base Spacing</Label>
          <NumberField value={spacing} onValueChange={setSpacing} min={2} max={12} step={1} />
        </div>
      </CardContent>
    </Card>
  );
}

function TokenPreviewCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] flex items-center gap-1.5">
            <Moon size={12} className="text-[var(--s-text-muted)]" />
            Dark Mode
          </Label>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)", background: "var(--s-surface)" }}>
          <span className="text-[11px] font-medium text-[var(--s-text)] flex items-center gap-1.5">
            <Layers size={12} className="text-[var(--s-text-muted)]" />
            Preview
          </span>
          <p className="text-[9px] text-[var(--s-text-muted)] mt-1">Token-driven styling. Changes apply everywhere.</p>
        </div>
        <KPI label="Tokens compiled" value="259" change="All passing" trend="up" className="text-xs" />
      </CardContent>
    </Card>
  );
}

/* ================================================================ */
/*  Analytics cards                                                   */
/* ================================================================ */

function AnalyticsKPIs() {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <BarChart3 size={14} className="text-[var(--s-primary)]" />
            Project Analytics
          </CardTitle>
          <Badge size="sm" variant="outline" className="gap-1 text-[8px]"><CalendarDays size={9} />Last 7 days</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <KPI label="Visitors" value="12.4k" change="+14%" trend="up" className="text-xs" />
          <KPI label="Conversion" value="3.2%" change="+0.8%" trend="up" className="text-xs" />
        </div>
        <Meter value={7200} max={10000} label="API Usage" className="text-xs" />
        <p className="text-[9px] text-[var(--s-text-muted)] -mt-1">7,200 / 10,000 requests this cycle.</p>
      </CardContent>
    </Card>
  );
}

function AnalyticsTable() {
  return (
    <Card className="w-full overflow-hidden">
      <div className="grid grid-cols-3 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)]" style={{ borderBottom: "1px solid var(--s-border-muted)", background: "var(--s-surface)" }}>
        <span>Page</span><span className="text-right">Views</span><span className="text-right">Bounce</span>
      </div>
      {[
        { page: "/", views: "4,821", bounce: "32%" },
        { page: "/docs", views: "3,104", bounce: "18%" },
        { page: "/pricing", views: "1,247", bounce: "45%" },
      ].map((row) => (
        <div key={row.page} className="grid grid-cols-3 px-3 py-1.5 text-[10px]" style={{ borderBottom: "1px solid var(--s-border-muted)" }}>
          <span className="font-mono text-[var(--s-text)]">{row.page}</span>
          <span className="text-right tabular-nums text-[var(--s-text)]">{row.views}</span>
          <span className="text-right tabular-nums text-[var(--s-text-muted)]">{row.bounce}</span>
        </div>
      ))}
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-3">
        {[
          { initials: "KL", text: "Kevin pushed 3 commits to main", time: "2m ago" },
          { initials: "CI", text: "Build #847 deployed to production", time: "5m ago" },
        ].map((item) => (
          <div key={item.text} className="flex items-start gap-2">
            <Avatar fallback={item.initials} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[var(--s-text)] leading-snug">{item.text}</p>
              <span className="text-[9px] text-[var(--s-text-muted)]">{item.time}</span>
            </div>
          </div>
        ))}
        <Button size="sm" variant="outline" className="w-full text-[10px] gap-1">
          <FileText size={12} />View Full Report<ArrowUpRight size={10} className="text-[var(--s-text-muted)] ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
}

/* ================================================================ */
/*  Onboarding cards                                                  */
/* ================================================================ */

function OnboardingStepper() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-3">
        <Stepper
          steps={[
            { label: "Account", description: "Created" },
            { label: "Workspace", description: "Configure" },
            { label: "Invite", description: "Team" },
          ]}
          currentStep={1}
          orientation="horizontal"
          className="text-[9px]"
        />
        <div className="flex flex-col gap-1">
          <Label className="text-[10px]">Workspace Name</Label>
          <Input defaultValue="acme-design" className="h-8 text-[11px] font-mono" iconLeft={<Building2 size={13} className="text-[var(--s-text-muted)]" />} />
          <p className="text-[9px] text-[var(--s-text-muted)]">This will be your team URL slug.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanSelector() {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs">Plan</CardTitle>
        <CardDescription className="text-[9px]">Choose the plan that fits your needs.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="flex flex-col items-start p-2.5 text-left cursor-pointer bg-transparent" style={{ border: "1px solid var(--s-border-muted)", borderRadius: "var(--s-radius-md, 6px)" }}>
            <span className="text-[11px] font-medium text-[var(--s-text)]">Free</span>
            <span className="text-[9px] text-[var(--s-text-muted)]">5 components</span>
          </button>
          <button type="button" className="flex flex-col items-start p-2.5 text-left cursor-pointer bg-transparent relative" style={{ border: "2px solid var(--s-primary)", borderRadius: "var(--s-radius-md, 6px)" }}>
            <Badge size="sm" className="absolute -top-2 right-1.5 text-[7px] gap-0.5 px-1"><Crown size={7} />Rec</Badge>
            <span className="text-[11px] font-medium text-[var(--s-text)] flex items-center gap-1"><Sparkles size={11} className="text-[var(--s-primary)]" />Pro</span>
            <span className="text-[9px] text-[var(--s-text-muted)]">Unlimited everything</span>
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <Checkbox label="Unlimited components" defaultChecked />
          <Checkbox label="Custom presets" defaultChecked />
          <Checkbox label="Priority support" />
        </div>
      </CardContent>
    </Card>
  );
}

function InviteCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-3">
        <Label className="text-[10px]">Invite Teammates</Label>
        <div className="flex gap-2">
          <Input placeholder="colleague@company.com" className="h-8 text-[11px] flex-1" iconLeft={<Mail size={12} className="text-[var(--s-text-muted)]" />} />
          <Button size="sm" variant="outline" className="text-[10px] h-8 shrink-0"><Plus size={13} />Add</Button>
        </div>
        <div className="flex items-center gap-2">
          <AvatarGroup>
            <Avatar fallback="KL" size="sm" />
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="AR" size="sm" />
          </AvatarGroup>
          <span className="text-[9px] text-[var(--s-text-muted)]">+2 more invited</span>
        </div>
        <Button size="sm" className="w-full text-xs"><Check size={13} />Complete Setup</Button>
        <p className="text-[9px] text-[var(--s-text-muted)] text-center">You can change these settings later.</p>
      </CardContent>
    </Card>
  );
}

/* ================================================================ */
/*  Standalone micro-components (no card wrapper)                     */
/* ================================================================ */

function VerifiedRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <CheckCircle2 size={13} className="text-[var(--s-success)]" />
        Your profile has been verified.
      </span>
      <ChevronRight size={13} className="text-[var(--s-text-muted)]" />
    </div>
  );
}

function TwoFactorRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Shield size={13} className="text-[var(--s-text-muted)]" />
        Two-factor authentication
      </span>
      <Button size="sm" variant="outline" className="text-[10px] h-6 px-2">Enable</Button>
    </div>
  );
}

function TintingRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div>
        <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
          <Paintbrush size={13} className="text-[var(--s-text-muted)]" />
          Wallpaper Tinting
        </span>
        <p className="text-[9px] text-[var(--s-text-muted)] mt-0.5 ml-[21px]">Allow the wallpaper to be tinted.</p>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

/* ================================================================ */
/*  Preset dots                                                       */
/* ================================================================ */

function PresetDots() {
  const dots = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
  return (
    <div className="flex items-center justify-center gap-2.5 mt-6">
      {dots.map((color, i) => (
        <div key={i} className="rounded-full" style={{ width: 10, height: 10, background: color, opacity: i === 0 ? 1 : 0.4, transition: `opacity 300ms ${EASING}` }} />
      ))}
    </div>
  );
}

/* ================================================================ */
/*  Export — masonry-style 4-column grid of discrete cards             */
/* ================================================================ */

export function HeroShowcase({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <style dangerouslySetInnerHTML={{ __html: TRANSITION_CSS }} />
      <div className="hero-gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
          {/* Col 1 — Deploy */}
          <div className="flex flex-col gap-3">
            <DeployCard />
            <BuildStatus />
          </div>
          {/* Col 2 — Tokens */}
          <div className="flex flex-col gap-3">
            <TokenEditorCard />
            <TokenPreviewCard />
            <TintingRow />
          </div>
          {/* Col 3 — Analytics */}
          <div className="flex flex-col gap-3">
            <AnalyticsKPIs />
            <AnalyticsTable />
            <ActivityFeed />
          </div>
          {/* Col 4 — Onboarding */}
          <div className="flex flex-col gap-3">
            <OnboardingStepper />
            <PlanSelector />
            <InviteCard />
          </div>
        </div>
        <PresetDots />
      </div>
    </div>
  );
}
