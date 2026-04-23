"use client";

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Switch,
  Slider,
  Progress,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  KPI,
  Separator,
  Checkbox,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Alert,
  AlertTitle,
  AlertDescription,
  Toggle,
} from "@sigil-ui/components";

export function ComponentPreview({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "16px",
        padding: "24px",
        overflow: "auto",
      }}
    >
      {/* Buttons */}
      <PreviewCard title="Buttons">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Danger</Button>
          <Button size="sm">Small</Button>
        </div>
      </PreviewCard>

      {/* Badges */}
      <PreviewCard title="Badges">
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
      </PreviewCard>

      {/* Inputs */}
      <PreviewCard title="Inputs">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input placeholder="Email address" type="email" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Checkbox id="terms" />
            <Label htmlFor="terms" style={{ fontSize: "13px" }}>
              Accept terms
            </Label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch />
            <span style={{ fontSize: "13px", color: "var(--s-text-muted)" }}>
              Notifications
            </span>
          </div>
        </div>
      </PreviewCard>

      {/* Card */}
      <PreviewCard title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Next generation platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={68} />
          </CardContent>
        </Card>
      </PreviewCard>

      {/* KPI */}
      <PreviewCard title="KPI">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <KPI label="Revenue" value="$42.5k" change="+12.5%" />
          <KPI label="Users" value="8,249" change="+3.2%" />
        </div>
      </PreviewCard>

      {/* Tabs */}
      <PreviewCard title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p style={{ fontSize: "13px", color: "var(--s-text-muted)", margin: "8px 0 0" }}>
              Dashboard overview content.
            </p>
          </TabsContent>
          <TabsContent value="analytics">
            <p style={{ fontSize: "13px", color: "var(--s-text-muted)", margin: "8px 0 0" }}>
              Analytics content.
            </p>
          </TabsContent>
          <TabsContent value="settings">
            <p style={{ fontSize: "13px", color: "var(--s-text-muted)", margin: "8px 0 0" }}>
              Settings content.
            </p>
          </TabsContent>
        </Tabs>
      </PreviewCard>

      {/* Select */}
      <PreviewCard title="Select">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a preset..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sigil">Sigil</SelectItem>
            <SelectItem value="cobalt">Cobalt</SelectItem>
            <SelectItem value="basalt">Basalt</SelectItem>
            <SelectItem value="flux">Flux</SelectItem>
          </SelectContent>
        </Select>
      </PreviewCard>

      {/* Slider */}
      <PreviewCard title="Slider">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Slider defaultValue={[40]} max={100} step={1} />
          <Slider defaultValue={[20, 80]} max={100} step={1} />
        </div>
      </PreviewCard>

      {/* Avatar */}
      <PreviewCard title="Avatar">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Avatar fallback="KL" size="sm" />
          <Avatar fallback="JS" size="md" />
          <Avatar fallback="AB" size="lg" />
          <Separator orientation="vertical" style={{ height: "32px" }} />
          <div style={{ fontSize: "13px" }}>
            <div style={{ fontWeight: 600 }}>Kevin Liu</div>
            <div style={{ color: "var(--s-text-muted)", fontSize: "11px" }}>Developer</div>
          </div>
        </div>
      </PreviewCard>

      {/* Alert */}
      <PreviewCard title="Alert">
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Token changes apply in real-time across all components.
          </AlertDescription>
        </Alert>
      </PreviewCard>

      {/* Toggle */}
      <PreviewCard title="Toggle">
        <div style={{ display: "flex", gap: "6px" }}>
          <Toggle>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 4h10M2 7h10M2 10h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Toggle>
          <Toggle>A</Toggle>
          <Toggle defaultPressed>B</Toggle>
        </div>
      </PreviewCard>
    </div>
  );
}

function PreviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "var(--s-card-radius, 8px)",
        border: "1px solid var(--s-border)",
        borderStyle: "var(--s-border-style, solid)",
        background: "var(--s-surface)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--s-text-muted)",
          fontFamily: "var(--s-font-mono, ui-monospace, monospace)",
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}
