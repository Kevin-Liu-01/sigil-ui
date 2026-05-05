"use client";

import { useState, useEffect } from "react";
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
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
  Separator,
  RadioGroup,
  RadioGroupItem,
  KPI,
  Meter,
  Stepper,
  NumberField,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Pagination,
  SplitButton,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Breadcrumb,
  Skeleton,
  Alert,
  AlertTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  LoadingSpinner,
  Textarea,
  Calendar as SigilCalendar,
  DatePicker,
  DateRangePicker,
  Kbd,
  RatingGroup,
  type DateRange,
  SparkLine,
  AreaChart,
  CommitGrid,
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
  ArrowLeft,
  Archive,
  MoreHorizontal,
  Calendar,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Search,
  Volume2,
  Bell,
  Wifi,
  Zap,
  Info,
  AudioLines,
  ArrowUp,
  RefreshCw,
  Link,
  AtSign,
  CircleCheckBig,
  Send,
  Loader2,
} from "lucide-react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

function createDemoDate(): Date {
  return new Date(2026, 3, 24);
}

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
          <Select defaultValue="monument">
            <SelectTrigger className="h-8 text-[11px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
              <SelectItem value="monument" className="text-[11px]">Monument Grotesk</SelectItem>
              <SelectItem value="inter" className="text-[11px]">Inter</SelectItem>
              <SelectItem value="geist" className="text-[11px]">Geist</SelectItem>
            </SelectContent>
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
        <KPI label="Tokens compiled" value="519" change="All passing" trend="up" className="text-xs" />
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
          { src: "/avatars/kevin.png", name: "Kevin", text: "Kevin pushed 3 commits to main", time: "2m ago" },
          { src: "/avatars/ci.png", name: "CI", text: "Build #847 deployed to production", time: "5m ago" },
        ].map((item) => (
          <div key={item.text} className="flex items-start gap-2">
            <Avatar src={item.src} name={item.name} size="sm" />
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
    <Card className="w-full" style={{ "--avatar-group-ring": "var(--s-surface, var(--s-background))" } as React.CSSProperties}>
      <CardContent className="p-4 flex flex-col gap-3">
        <Label className="text-[10px]">Invite Teammates</Label>
        <div className="flex gap-2">
          <Input placeholder="colleague@company.com" className="h-8 text-[11px] flex-1" iconLeft={<Mail size={12} className="text-[var(--s-text-muted)]" />} />
          <Button size="sm" variant="outline" className="text-[10px] h-8 shrink-0"><Plus size={13} />Add</Button>
        </div>
        <div className="flex items-center gap-2">
          <AvatarGroup>
            <Avatar src="https://github.com/shadcn.png" name="shadcn" size="sm" />
            <Avatar src="https://github.com/leerob.png" name="Lee Robinson" size="sm" />
            <Avatar src="https://github.com/rauchg.png" name="Guillermo Rauch" size="sm" />
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

function ToolbarRow() {
  return (
    <Toolbar className="w-full">
      <ToolbarButton aria-label="Go back"><ArrowLeft size={14} /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton className="text-[11px]">Archive</ToolbarButton>
      <ToolbarButton className="text-[11px]">Report</ToolbarButton>
      <ToolbarButton className="text-[11px]">Snooze</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="More"><MoreHorizontal size={14} /></ToolbarButton>
    </Toolbar>
  );
}

function ToggleGroupRow() {
  return (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="bold" size="sm"><Bold size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="italic" size="sm"><Italic size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="underline" size="sm"><Underline size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="left" size="sm"><AlignLeft size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="center" size="sm"><AlignCenter size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="right" size="sm"><AlignRight size={14} /></ToggleGroupItem>
    </ToggleGroup>
  );
}

function BadgeRow() {
  return (
    <div className="flex flex-wrap gap-1.5 p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Badge size="sm">Stable</Badge>
      <Badge size="sm" variant="secondary">Beta</Badge>
      <Badge size="sm" variant="outline">v2.4.1</Badge>
      <Badge size="sm" variant="destructive">Breaking</Badge>
    </div>
  );
}

function SliderRow() {
  const [vol, setVol] = useState(72);
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
          <Volume2 size={13} className="text-[var(--s-text-muted)]" />
          Volume
        </span>
        <span className="text-[10px] tabular-nums text-[var(--s-text-muted)]">{vol}%</span>
      </div>
      <Slider defaultValue={[72]} onValueChange={(v: number[]) => setVol(v[0])} />
    </div>
  );
}

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

function CheckboxRow() {
  return (
    <div className="p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Checkbox label="I agree to the terms and conditions" defaultChecked />
    </div>
  );
}

function TabsRow() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="h-7 p-0.5 w-full">
        <TabsTrigger value="overview" className="text-[10px] px-2 py-0.5 h-6 flex-1">Overview</TabsTrigger>
        <TabsTrigger value="analytics" className="text-[10px] px-2 py-0.5 h-6 flex-1">Analytics</TabsTrigger>
        <TabsTrigger value="reports" className="text-[10px] px-2 py-0.5 h-6 flex-1">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function SkeletonRow() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center gap-2">
        <Skeleton variant="avatar" className="h-7 w-7" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
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

function ProgressRow() {
  return (
    <div className="flex flex-col gap-1.5 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-[var(--s-text)]">Uploading assets...</span>
        <span className="text-[10px] tabular-nums text-[var(--s-text-muted)]">68%</span>
      </div>
      <Progress value={68} className="h-1.5" />
    </div>
  );
}

function PaginationRow() {
  return (
    <div className="flex flex-col gap-3">
      <Pagination currentPage={1} totalPages={3} siblingCount={1} />
      <SplitButton icon={<Calendar size={13} />}>Copilot</SplitButton>
    </div>
  );
}

function AvatarStackRow() {
  return (
    <div className="flex items-center justify-between p-3 bg-[var(--s-background)]" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <AvatarGroup max={4}>
        <Avatar src="https://github.com/shadcn.png" name="shadcn" size="sm" />
        <Avatar src="https://github.com/rauchg.png" name="Guillermo Rauch" size="sm" />
        <Avatar src="https://github.com/leerob.png" name="Lee Robinson" size="sm" />
        <Avatar src="https://github.com/t3dotgg.png" name="Theo" size="sm" />
        <Avatar src="https://github.com/kentcdodds.png" name="Kent C. Dodds" size="sm" />
        <Avatar src="https://github.com/gaearon.png" name="Dan Abramov" size="sm" />
      </AvatarGroup>
      <span className="text-[9px] text-[var(--s-text-muted)]">6 online</span>
    </div>
  );
}

function BreadcrumbRow() {
  return (
    <div className="p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Settings", href: "#" }, { label: "Tokens" }]} />
    </div>
  );
}

function SearchRow() {
  return (
    <Input
      placeholder="Search components..."
      className="h-8 text-[11px]"
      iconLeft={<Search size={13} className="text-[var(--s-text-muted)]" />}
    />
  );
}

function GPUCounterRow() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-[11px] font-medium text-[var(--s-text)]">Number of GPUs</span>
        <p className="text-[9px] text-[var(--s-text-muted)] mt-0.5">You can add more later.</p>
      </div>
      <NumberField value={8} min={1} max={64} />
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

function NotificationsRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Bell size={13} className="text-[var(--s-text-muted)]" />
        Push notifications
      </span>
      <Switch defaultChecked />
    </div>
  );
}

function WifiRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Wifi size={13} className="text-[var(--s-text-muted)]" />
        Auto-connect to Wi-Fi
      </span>
      <Switch />
    </div>
  );
}

function AlertRow() {
  return (
    <Alert variant="info" className="p-2.5 [&>svg~*]:pl-0 [&:has(svg)]:pl-2.5">
      <AlertTitle className="text-[10px] flex items-center gap-1.5 mb-0">
        <Info size={12} />
        New deployment pipeline available.
      </AlertTitle>
    </Alert>
  );
}

function ButtonRow() {
  return (
    <div className="flex gap-1.5">
      <Button size="sm" className="flex-1 text-[10px]">Save</Button>
      <Button size="sm" variant="outline" className="flex-1 text-[10px]">Discard</Button>
      <Button size="sm" variant="ghost" className="text-[10px]">Reset</Button>
    </div>
  );
}

function StarRatingRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)]">Rate this component</span>
      <RatingGroup defaultValue={4} size="sm" />
    </div>
  );
}

const SHOWCASE_SPINNERS: { variant: string; label: string }[] = [
  { variant: "braille", label: "braille" },
  { variant: "dots2", label: "dots2" },
  { variant: "arc", label: "arc" },
  { variant: "triangle", label: "triangle" },
  { variant: "snake", label: "snake" },
  { variant: "wave", label: "wave" },
  { variant: "noise", label: "noise" },
  { variant: "sparkle", label: "sparkle" },
  { variant: "moon", label: "moon" },
  { variant: "clock", label: "clock" },
  { variant: "grow_horizontal", label: "grow" },
  { variant: "circle_halves", label: "halves" },
  { variant: "rain", label: "rain" },
  { variant: "bar", label: "bar" },
  { variant: "helix", label: "helix" },
  { variant: "square_corners", label: "square" },
];

function SpinnersShowcase() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Animated Spinners</span>
        <span className="text-[9px] text-[var(--s-text-muted)]">55+ variants</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {SHOWCASE_SPINNERS.map((s) => (
          <div key={s.variant} className="flex flex-col items-center gap-1 py-1.5" style={{ background: "var(--s-surface-sunken, var(--s-background))", borderRadius: "var(--s-radius-sm, 4px)" }}>
            <span className="inline-block text-base leading-none text-[var(--s-primary)]" aria-hidden>
              <AnimatedSpinnerFrame variant={s.variant} />
            </span>
            <span className="font-mono text-[7px] text-[var(--s-text-muted)] leading-none">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedSpinnerFrame({ variant }: { variant: string }) {
  const [frame, setFrame] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);
  const [ms, setMs] = useState(80);

  useEffect(() => {
    const SPINNERS: Record<string, { frames: string[]; interval: number }> = {
      braille:   { frames: ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"], interval: 80 },
      dots2:     { frames: ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"], interval: 80 },
      arc:       { frames: ["◜","◠","◝","◞","◡","◟"], interval: 100 },
      triangle:  { frames: ["◢","◣","◤","◥"], interval: 50 },
      snake:     { frames: ["⠏","⠛","⠹","⢸","⣰","⣤","⣆","⡇"], interval: 80 },
      wave:      { frames: ["⠁⠂⠄⡀","⠂⠄⡀⢀","⠄⡀⢀⠠","⡀⢀⠠⠐","⢀⠠⠐⠈","⠠⠐⠈⠁","⠐⠈⠁⠂","⠈⠁⠂⠄"], interval: 100 },
      noise:     { frames: ["▓","▒","░","▒"], interval: 100 },
      sparkle:   { frames: ["✶","✷","✸","✹","✺","✹","✷"], interval: 120 },
      moon:      { frames: ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"], interval: 150 },
      clock:     { frames: ["🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛"], interval: 100 },
      grow_horizontal: { frames: ["▏","▎","▍","▌","▋","▊","▉","█","▉","▊","▋","▌","▍","▎"], interval: 80 },
      circle_halves:   { frames: ["◐","◓","◑","◒"], interval: 120 },
      rain:      { frames: ["⠁","⠂","⠄","⡀","⡈","⡐","⡠","⣀","⣁","⣂","⣄","⣌","⣔","⣤","⣥","⣦","⣮","⣶","⣷","⣿","⡿","⠿","⢟","⠟","⠏","⠇","⠃","⠁"], interval: 50 },
      bar:       { frames: ["|","/","—","\\"], interval: 100 },
      helix:     { frames: ["⠋⠁","⠙⠂","⠹⠄","⢸⡀","⣰⢀","⣤⠠","⣆⠐","⡇⠈"], interval: 80 },
      square_corners: { frames: ["◰","◳","◲","◱"], interval: 120 },
    };
    const s = SPINNERS[variant] ?? SPINNERS.braille;
    setFrames(s.frames);
    setMs(s.interval);
  }, [variant]);

  useEffect(() => {
    if (frames.length === 0) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), ms);
    return () => clearInterval(id);
  }, [frames, ms]);

  if (frames.length === 0) return null;
  return <>{frames[frame % frames.length]}</>;
}

function StatusBadgesRow() {
  return (
    <div className="flex gap-1.5">
      <Badge size="sm" className="gap-1 text-[10px]"><Loader2 size={10} className="animate-spin" />Syncing</Badge>
      <Badge size="sm" variant="outline" className="gap-1 text-[10px]"><RefreshCw size={10} />Updating</Badge>
      <Badge size="sm" variant="outline" className="gap-1 text-[10px]"><Loader2 size={10} className="animate-spin" />Indexing</Badge>
    </div>
  );
}

function ChatInputRow() {
  return (
    <div className="flex items-center gap-2 p-1.5 pl-1" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <button type="button" className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated)]" style={{ border: "1px solid var(--s-border)" }}>
        <Plus size={14} />
      </button>
      <span className="flex-1 text-[11px] text-[var(--s-text-muted)]">Send a message...</span>
      <button type="button" className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full text-[var(--s-text-muted)] transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated)]">
        <AudioLines size={14} />
      </button>
    </div>
  );
}

function PriceRangeRow() {
  const [range, setRange] = useState([200, 800]);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-[11px] font-semibold text-[var(--s-text)]">Price Range</span>
        <p className="text-[9px] text-[var(--s-text-muted)] mt-0.5">Set your budget range (${range[0]} – ${range[1]}).</p>
      </div>
      <Slider defaultValue={[200, 800]} min={0} max={1000} step={50} onValueChange={(v: number[]) => setRange(v)} />
    </div>
  );
}

function SearchCountRow() {
  return (
    <div className="flex items-center gap-2 h-9 px-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Search size={13} className="text-[var(--s-text-muted)] shrink-0" />
      <span className="flex-1 text-[11px] text-[var(--s-text-muted)]">Search...</span>
      <span className="text-[10px] tabular-nums text-[var(--s-text-muted)] shrink-0">12 results</span>
    </div>
  );
}

function UrlInputRow() {
  return (
    <div className="flex items-center gap-2 h-9 px-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text-muted)] shrink-0">https://</span>
      <span className="flex-1 text-[11px] text-[var(--s-text)]">example.com</span>
      <Link size={13} className="text-[var(--s-text-muted)] shrink-0" />
    </div>
  );
}

function AiChatRow() {
  return (
    <div className="flex flex-col" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)", overflow: "hidden" }}>
      <div className="p-2.5 pb-4">
        <span className="text-[11px] text-[var(--s-text-muted)]">Ask, Search or Chat...</span>
      </div>
      <div className="flex items-center gap-2 px-2.5 pb-2">
        <button type="button" className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-[var(--s-text-muted)]" style={{ border: "1px solid var(--s-border)" }}>
          <Plus size={12} />
        </button>
        <Badge size="sm" variant="outline" className="text-[9px]">Auto</Badge>
        <span className="flex-1" />
        <span className="text-[9px] tabular-nums text-[var(--s-text-muted)]">52% used</span>
        <button type="button" className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-[var(--s-text)] text-[var(--s-background)]">
          <ArrowUp size={12} />
        </button>
      </div>
    </div>
  );
}

function MentionRow() {
  return (
    <div className="flex items-center gap-2 h-9 px-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <a href="https://x.com/kevskgs" className="flex-1 text-[11px] text-[var(--s-text)]">@kevskgs</a>
      <CircleCheckBig size={14} className="text-[var(--s-text)] shrink-0" />
    </div>
  );
}

function DateRangeRow() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  return (
    <DateRangePicker
      value={range}
      onValueChange={setRange}
      numberOfMonths={1}
      className="w-full h-8 text-[10px]"
    />
  );
}

function TagInputRow() {
  return (
    <div className="flex items-center gap-1.5 h-9 px-2" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Badge size="sm" variant="secondary" className="text-[9px] gap-0.5 shrink-0">react <span className="text-[var(--s-text-muted)] ml-0.5 cursor-pointer">&times;</span></Badge>
      <Badge size="sm" variant="secondary" className="text-[9px] gap-0.5 shrink-0">typescript <span className="text-[var(--s-text-muted)] ml-0.5 cursor-pointer">&times;</span></Badge>
      <span className="flex-1 text-[10px] text-[var(--s-text-muted)] px-1">Add tag...</span>
    </div>
  );
}

function KeyValueRow() {
  return (
    <div className="flex flex-col gap-1.5">
      {[
        { key: "Status", value: "Active" },
        { key: "Region", value: "us-east-1" },
        { key: "Latency", value: "12ms" },
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between text-[10px] px-2.5 py-1" style={{ borderBottom: "1px solid var(--s-border-muted)" }}>
          <span className="text-[var(--s-text-muted)]">{item.key}</span>
          <span className="font-mono tabular-nums text-[var(--s-text)]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function MeterRow() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Meter value={82} max={100} label="Memory" className="text-xs" />
      <Meter value={34} max={100} label="CPU" className="text-xs" />
    </div>
  );
}

function CalendarCard() {
  const [selected, setSelected] = useState<Date | undefined>(() => createDemoDate());
  return (
    <div className="w-full overflow-hidden" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <SigilCalendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
        className="p-2 w-full [--cell-size:1.5rem] [&_table]:w-full [&_table]:text-[10px] [&_button]:text-[10px] [&_th]:text-[8px] [&_td]:p-0.5 [&_select]:text-[10px] [&_.rdp-dropdowns]:text-[10px] [&_.rdp-dropdown_root]:text-[10px] [&_.rdp-caption_label]:text-[10px]"
      />
    </div>
  );
}

function DatePickerRow() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-[10px] flex items-center gap-1.5">
        <CalendarDays size={12} className="text-[var(--s-text-muted)]" />
        Deploy Date
      </Label>
      <DatePicker value={date} onValueChange={setDate} className="w-full h-8 text-[10px]" />
    </div>
  );
}

function RatingRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)]">Design quality</span>
      <RatingGroup defaultValue={4} size="sm" />
    </div>
  );
}

function KbdShortcutRow() {
  return (
    <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[10px] text-[var(--s-text-muted)]">Quick search</span>
      <div className="flex items-center gap-0.5"><Kbd className="text-[9px] h-5 min-w-[20px]">⌘</Kbd><Kbd className="text-[9px] h-5 min-w-[20px]">K</Kbd></div>
    </div>
  );
}

function UptimeRow() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Uptime — 30d</span>
        <span className="text-[9px] font-mono tabular-nums text-[var(--s-success)]">99.98%</span>
      </div>
      <div className="flex gap-px">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="flex-1 h-3 rounded-[1px]" style={{ background: i === 17 ? "var(--s-warning)" : "var(--s-success)", opacity: i === 17 ? 1 : 0.7 }} />
        ))}
      </div>
    </div>
  );
}

function LatencyRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Zap size={13} className="text-[var(--s-success)]" />
        p99 Latency
      </span>
      <span className="text-[10px] font-mono tabular-nums text-[var(--s-text)]">12ms</span>
    </div>
  );
}

function ErrorRateRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Shield size={13} className="text-[var(--s-text-muted)]" />
        Error rate
      </span>
      <span className="text-[10px] font-mono tabular-nums text-[var(--s-success)]">0.02%</span>
    </div>
  );
}

function CacheHitRow() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-[var(--s-text)]">Cache Hit Rate</span>
        <span className="text-[9px] font-mono tabular-nums text-[var(--s-success)]">94%</span>
      </div>
      <Progress value={94} className="h-1.5" />
    </div>
  );
}

function LatencyBuildRow() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col items-center justify-center p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
        <span className="text-[9px] text-[var(--s-text-muted)] flex items-center gap-1"><Zap size={10} />p99</span>
        <span className="text-sm font-mono tabular-nums font-semibold text-[var(--s-text)]">12ms</span>
      </div>
      <div className="flex flex-col items-center justify-center p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
        <span className="text-[9px] text-[var(--s-text-muted)] flex items-center gap-1"><Rocket size={10} />Builds</span>
        <span className="text-sm font-mono tabular-nums font-semibold text-[var(--s-text)]">47</span>
      </div>
    </div>
  );
}

function VoronoiRow() {
  return (
    <div className="w-full overflow-hidden flex-1 min-h-[100px]" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="grid grid-cols-5 grid-rows-3 gap-px h-full" style={{ background: "var(--s-border)" }}>
        <div className="col-span-2 row-span-3" style={{ background: "var(--s-primary)", opacity: 0.8 }} />
        <div className="col-span-2 row-span-2" style={{ background: "var(--s-surface)" }} />
        <div className="row-span-3" style={{ background: "color-mix(in oklch, var(--s-primary) 20%, var(--s-surface))" }} />
        <div style={{ background: "var(--s-surface)" }} />
        <div style={{ background: "color-mix(in oklch, var(--s-primary) 40%, var(--s-surface))" }} />
      </div>
    </div>
  );
}

function FontStackRow() {
  return (
    <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5">
        <Palette size={12} className="text-[var(--s-text-muted)]" />
        Font triad
      </span>
      <span className="text-[9px] font-mono text-[var(--s-text-muted)] truncate ml-2">Pangram · Mono · Display</span>
    </div>
  );
}

function ErrorActiveRow() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col items-center justify-center p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
        <span className="text-[9px] text-[var(--s-text-muted)] flex items-center gap-1"><Shield size={10} />Errors</span>
        <span className="text-sm font-mono tabular-nums font-semibold text-[var(--s-success)]">0.02%</span>
      </div>
      <div className="flex flex-col items-center justify-center p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
        <span className="text-[9px] text-[var(--s-text-muted)] flex items-center gap-1"><Eye size={10} />Active</span>
        <span className="text-sm font-mono tabular-nums font-semibold text-[var(--s-text)]">1,247</span>
      </div>
    </div>
  );
}

function SkeletonCardRow() {
  return (
    <div className="flex flex-col gap-2.5 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-5/6" />
    </div>
  );
}

function RadiusPreviewRow() {
  return (
    <div className="flex items-center gap-2 p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[9px] text-[var(--s-text-muted)]">Radius</span>
      {[0, 4, 8, 16, 9999].map((r) => (
        <div key={r} className="w-5 h-5 bg-[var(--s-primary)]" style={{ borderRadius: r, opacity: r === 8 ? 1 : 0.3 }} />
      ))}
      <span className="text-[8px] font-mono text-[var(--s-text-muted)] ml-auto">8px</span>
    </div>
  );
}

function SpacingScaleRow() {
  return (
    <div className="flex flex-col gap-2 p-2.5 flex-1" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[9px] text-[var(--s-text-muted)]">Spacing Scale</span>
      <div className="flex items-end gap-1 w-full flex-1">
        {[4, 8, 12, 16, 24, 32].map((s) => (
          <div key={s} className="flex-1 bg-[var(--s-primary)]" style={{ minHeight: s, opacity: 0.6, borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function SessionCountRow() {
  return (
    <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5">
        <Globe size={12} className="text-[var(--s-primary)]" />
        Sessions today
      </span>
      <span className="text-[10px] font-mono tabular-nums font-semibold text-[var(--s-text)]">3,842</span>
    </div>
  );
}

function RegionBadgesRow() {
  return (
    <div className="flex flex-wrap gap-1.5 p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      {["us-east-1", "eu-west-1", "ap-south-1"].map((r) => (
        <Badge key={r} size="sm" variant="outline" className="text-[8px] font-mono gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--s-success)]" />{r}
        </Badge>
      ))}
    </div>
  );
}

function AlertSuccessRow() {
  return (
    <Alert variant="success" className="p-2.5 [&>svg~*]:pl-0 [&:has(svg)]:pl-2.5">
      <AlertTitle className="text-[10px] flex items-center gap-1.5 mb-0">
        <CircleCheck size={12} />
        All checks passed — ready to merge.
      </AlertTitle>
    </Alert>
  );
}

function AlertWarningRow() {
  return (
    <Alert variant="warning" fill="soft" className="p-2.5 [&>svg~*]:pl-0 [&:has(svg)]:pl-2.5">
      <AlertTitle className="text-[10px] flex items-center gap-1.5 mb-0">
        <Zap size={12} />
        Token cache expires in 2 hours.
      </AlertTitle>
    </Alert>
  );
}

function ConnectedRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[var(--s-success)] animate-pulse" />
        Connected to production
      </span>
      <span className="text-[9px] font-mono tabular-nums text-[var(--s-text-muted)]">ws://</span>
    </div>
  );
}

function HotkeyRow() {
  return (
    <div className="flex flex-col justify-between gap-2 p-3 flex-1" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[10px] font-medium text-[var(--s-text)]">Keyboard Shortcuts</span>
      {[
        { keys: ["⌘", "K"], action: "Command palette" },
        { keys: ["⌘", "B"], action: "Toggle sidebar" },
        { keys: ["⌘", "⇧", "P"], action: "Deploy" },
      ].map((s) => (
        <div key={s.action} className="flex items-center justify-between">
          <span className="text-[9px] text-[var(--s-text-muted)]">{s.action}</span>
          <div className="flex gap-0.5">
            {s.keys.map((k) => (
              <span key={k} className="inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-[3px] text-[8px] font-mono text-[var(--s-text-muted)]" style={{ border: "1px solid var(--s-border)", background: "var(--s-surface)" }}>{k}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function QuickActionsRow() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <Button size="sm" variant="outline" className="text-[9px] h-7 gap-1"><Zap size={10} />Deploy</Button>
      <Button size="sm" variant="outline" className="text-[9px] h-7 gap-1"><Eye size={10} />Preview</Button>
      <Button size="sm" variant="outline" className="text-[9px] h-7 gap-1"><Globe size={10} />Visit</Button>
    </div>
  );
}

function TokenPreviewStrip() {
  const colors = [
    { label: "primary", color: "var(--s-primary)" },
    { label: "success", color: "var(--s-success)" },
    { label: "warning", color: "var(--s-warning)" },
    { label: "error", color: "var(--s-error)" },
    { label: "info", color: "var(--s-info)" },
  ];
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Color Tokens</span>
        <span className="text-[9px] text-[var(--s-text-muted)]">5 active</span>
      </div>
      <div className="flex gap-1.5">
        {colors.map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full h-5 rounded-sm" style={{ background: c.color }} />
            <span className="text-[7px] font-mono text-[var(--s-text-muted)] uppercase">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniSparkline() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Requests / min</span>
        <span className="text-[9px] tabular-nums text-[var(--s-success)]">↑ 23%</span>
      </div>
      <div className="relative flex-1 min-h-0">
        <SparkLine data={[4, 7, 5, 9, 6, 8, 12, 10, 14, 11, 15, 13]} width={400} height={150} filled className="absolute inset-0 w-full h-full" style={{ display: "block" }} preserveAspectRatio="none" />
      </div>
    </div>
  );
}

const TRAFFIC_COMMIT_END_TIME = Date.UTC(2026, 3, 24);
const TRAFFIC_COMMIT_DAYS = Array.from({ length: 140 }, (_, index) => {
  const daysAgo = 139 - index;
  const date = new Date(TRAFFIC_COMMIT_END_TIME);
  date.setUTCDate(date.getUTCDate() - daysAgo);

  const wave = Math.round(4 + 4 * Math.sin(index / 6));
  const texture = (index * 7 + index * index * 3 + 11) % 8;

  return {
    date: date.toISOString().slice(0, 10),
    count: Math.max(0, wave + texture - 3),
  };
});

function TrafficCommitRow() {
  return (
    <div className="flex flex-col gap-2 p-3 overflow-hidden" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Traffic</span>
        <span className="text-[9px] tabular-nums text-[var(--s-text-muted)]">20 weeks</span>
      </div>
      <CommitGrid data={TRAFFIC_COMMIT_DAYS} weeks={20} cellSize={8} gap={2} showDayLabels={false} showMonthLabels={false} color="var(--s-primary)" />
    </div>
  );
}

function LatencyAreaRow() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <span className="text-[10px] font-medium text-[var(--s-text)]">Latency (p95)</span>
        <span className="text-[9px] tabular-nums text-[var(--s-warning)]">↓ 8ms</span>
      </div>
      <AreaChart
        series={[{
          label: "p95",
          points: [
            { label: "Mon", value: 120 },
            { label: "Tue", value: 98 },
            { label: "Wed", value: 140 },
            { label: "Thu", value: 105 },
            { label: "Fri", value: 88 },
            { label: "Sat", value: 72 },
            { label: "Sun", value: 64 },
          ],
          color: "var(--s-warning)",
        }]}
        width={400}
        height={150}
        showGrid
        className="w-full h-full flex-1"
        style={{ display: "block" }}
      />
    </div>
  );
}

function EnvironmentRow() {
  return (
    <div className="flex items-center justify-between p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[11px] text-[var(--s-text)] flex items-center gap-1.5">
        <Layers size={13} className="text-[var(--s-text-muted)]" />
        Environment
      </span>
      <Select defaultValue="prod">
        <SelectTrigger className="h-6 text-[9px] w-24 px-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
          <SelectItem value="prod" className="h-6 text-[10px] pl-6">Production</SelectItem>
          <SelectItem value="staging" className="h-6 text-[10px] pl-6">Staging</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function CommitMessageRow() {
  return (
    <div className="flex flex-col gap-1.5 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <Label className="text-[10px] flex items-center gap-1.5"><GitCommitHorizontal size={12} className="text-[var(--s-text-muted)]" />Commit Message</Label>
      <Textarea rows={3} placeholder="fix: resolve token compilation edge case when oklch values exceed gamut boundary" className="text-[10px] w-full" />
    </div>
  );
}

function DeployHistoryRow() {
  return (
    <div className="flex flex-col gap-1 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <span className="text-[10px] font-medium text-[var(--s-text)] mb-1">Recent Deploys</span>
      {[
        { hash: "a3f9c2d", env: "prod", time: "4m", ok: true },
        { hash: "e1b7f3a", env: "staging", time: "22m", ok: true },
        { hash: "7d2c91b", env: "preview", time: "1h", ok: false },
      ].map((d) => (
        <div key={d.hash} className="flex items-center justify-between text-[9px] py-1" style={{ borderBottom: "1px solid var(--s-border-muted)" }}>
          <span className="font-mono text-[var(--s-text-muted)]">{d.hash}</span>
          <div className="flex items-center gap-2">
            <Badge size="sm" variant="outline" className="text-[7px] px-1 py-0">{d.env}</Badge>
            <span className="text-[var(--s-text-muted)]">{d.time}</span>
            {d.ok ? <CircleCheck size={10} className="text-[var(--s-success)]" /> : <span className="text-[var(--s-error)] text-[8px]">✕</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function StorageMeterRow() {
  return (
    <div className="flex flex-col gap-2 p-3" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-[var(--s-text)]">Storage</span>
        <span className="text-[9px] tabular-nums text-[var(--s-text-muted)]">4.2 / 10 GB</span>
      </div>
      <Progress value={42} className="h-1.5" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-3">
          {/* Col 1 — Deploy */}
          <div className="flex flex-col gap-3">
            <DeployCard />
            <ToolbarRow />
            <BuildStatus />
            <StatusBadgesRow />
            <ChatInputRow />
            <SliderRow />
            <BadgeRow />
            <VerifiedRow />
            <ToggleGroupRow />
            <MentionRow />
            <ConnectedRow />
            <MeterRow />
            <EnvironmentRow />
            <DatePickerRow />
            <CommitMessageRow />
            <UptimeRow />
            <LatencyBuildRow />
            <VoronoiRow />
            <TrafficCommitRow />
            <div className="grid grid-cols-2 gap-3">
              <SessionCountRow />
              <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
                <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5"><CircleCheck size={12} className="text-[var(--s-success)]" />Pipeline healthy</span>
                <span className="text-[9px] font-mono text-[var(--s-text-muted)]">0 failures</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-end"><QuickActionsRow /></div>
          </div>
          {/* Col 2 — Tokens */}
          <div className="flex flex-col gap-3">
            <TokenEditorCard />
            <TokenPreviewCard />
            <GPUCounterRow />
            <TintingRow />
            <PriceRangeRow />
            <SpinnersShowcase />
            <BreadcrumbRow />
            <UrlInputRow />
            <CalendarCard />
            <AlertWarningRow />
            <FontStackRow />
            <RadiusPreviewRow />
            <TokenPreviewStrip />
            <SpacingScaleRow />
          </div>
          {/* Col 3 — Analytics */}
          <div className="flex flex-col gap-3">
            <AnalyticsKPIs />
            <CheckboxRow />
            <TabsRow />
            <AnalyticsTable />
            <SearchCountRow />
            <SkeletonRow />
            <ActivityFeed />
            <TwoFactorRow />
            <ProgressRow />
            <TagInputRow />
            <SearchRow />
            <ButtonRow />
            <DeployHistoryRow />
            <RatingRow />
            <AlertSuccessRow />
            <KbdShortcutRow />
            <ErrorActiveRow />
            <SkeletonCardRow />
            <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
              <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5"><BarChart3 size={12} className="text-[var(--s-primary)]" />Avg response</span>
              <span className="text-[10px] font-mono tabular-nums text-[var(--s-text)]">240ms</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
                <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5"><RefreshCw size={12} className="text-[var(--s-text-muted)]" />Last sync</span>
                <span className="text-[9px] font-mono tabular-nums text-[var(--s-text-muted)]">2m ago</span>
              </div>
              <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
                <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5"><Sparkles size={12} className="text-[var(--s-warning)]" />Plan usage</span>
                <span className="text-[9px] font-mono tabular-nums text-[var(--s-text-muted)]">82%</span>
              </div>
            </div>
            <MiniSparkline />
          </div>
          {/* Col 4 — Onboarding */}
          <div className="flex flex-col gap-3">
            <OnboardingStepper />
            <PlanSelector />
            <PaginationRow />
            <AiChatRow />
            <AvatarStackRow />
            <InviteCard />
            <NotificationsRow />
            <DateRangeRow />
            <AlertRow />
            <StarRatingRow />
            <KeyValueRow />
            <WifiRow />
            <StorageMeterRow />
            <RegionBadgesRow />
            <CacheHitRow />
            <div className="flex items-center justify-between p-2.5" style={{ border: "1px solid var(--s-border)", borderRadius: "var(--s-radius-md, 6px)" }}>
              <span className="text-[10px] text-[var(--s-text)] flex items-center gap-1.5"><Check size={12} className="text-[var(--s-success)]" />SSO enabled</span>
              <Badge size="sm" variant="outline" className="text-[8px]">SAML</Badge>
            </div>
            <HotkeyRow />
            <LatencyAreaRow />
          </div>
        </div>
      </div>
    </div>
  );
}
