"use client";

import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Input,
  Switch,
  Slider,
  Progress,
  Avatar,
  KPI,
  RadioGroup,
  RadioGroupItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  LoadingSpinner,
  Skeleton,
  Toggle,
  Label,
} from "@sigil-ui/components";

type ComponentGridProps = {
  className?: string;
};

type CellDef = {
  name: string;
  importCode: string;
  tokens: string;
  render: () => React.ReactNode;
};

const CELLS: CellDef[] = [
  {
    name: "Button",
    importCode: 'import { Button } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-radius-md, --s-duration-fast",
    render: () => (
      <div className="flex items-center gap-2 flex-wrap">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="ghost">Ghost</Button>
      </div>
    ),
  },
  {
    name: "Card",
    importCode: 'import { Card } from "@sigil-ui/components"',
    tokens: "--s-surface, --s-border, --s-card-radius",
    render: () => (
      <Card className="w-full">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">Dashboard</CardTitle>
          <CardDescription className="text-xs">Manage your workspace and team settings</CardDescription>
        </CardHeader>
      </Card>
    ),
  },
  {
    name: "Badge",
    importCode: 'import { Badge } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-surface-elevated, --s-border",
    render: () => (
      <div className="flex items-center gap-2 flex-wrap">
        <Badge>New</Badge>
        <Badge variant="secondary">Beta</Badge>
        <Badge variant="outline">v2.0</Badge>
      </div>
    ),
  },
  {
    name: "Input",
    importCode: 'import { Input } from "@sigil-ui/components"',
    tokens: "--s-background, --s-border, --s-radius-md",
    render: () => <Input placeholder="Search..." className="h-9 text-xs" />,
  },
  {
    name: "Toggle + Switch",
    importCode: 'import { Toggle, Switch } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-surface-elevated, --s-border",
    render: () => (
      <div className="flex items-center gap-3">
        <Toggle size="sm" defaultPressed variant="outline">On</Toggle>
        <Switch defaultChecked />
      </div>
    ),
  },
  {
    name: "Slider + Progress",
    importCode: 'import { Slider, Progress } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-border, --s-duration-slow",
    render: () => (
      <div className="flex flex-col gap-3 w-full">
        <Slider defaultValue={65} />
        <Progress value={40} />
      </div>
    ),
  },
  {
    name: "Avatar",
    importCode: 'import { Avatar } from "@sigil-ui/components"',
    tokens: "--s-surface-elevated, --s-border, --s-text-secondary",
    render: () => (
      <div className="flex items-center gap-2">
        <Avatar fallback="KL" size="md" />
        <Avatar fallback="JD" size="md" />
      </div>
    ),
  },
  {
    name: "KPI",
    importCode: 'import { KPI } from "@sigil-ui/components"',
    tokens: "--s-text, --s-success, --s-surface",
    render: () => (
      <KPI
        label="Users"
        value="2,847"
        change="+12%"
        trend="up"
        className="p-2 border-0"
      />
    ),
  },
  {
    name: "RadioGroup",
    importCode: 'import { RadioGroup } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-border, --s-text",
    render: () => (
      <RadioGroup defaultValue="b">
        {["Option A", "Option B", "Option C"].map((opt, i) => (
          <div key={opt} className="flex items-center gap-2">
            <RadioGroupItem value={String.fromCharCode(97 + i)} />
            <Label className="text-xs cursor-pointer">{opt}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  },
  {
    name: "Accordion",
    importCode: 'import { Accordion } from "@sigil-ui/components"',
    tokens: "--s-border, --s-text, --s-text-secondary",
    render: () => (
      <Accordion defaultValue="first" className="w-full">
        <AccordionItem value="first">
          <AccordionTrigger className="text-xs py-2">What is Sigil?</AccordionTrigger>
          <AccordionContent className="text-xs">A token-driven design system.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="second">
          <AccordionTrigger className="text-xs py-2">How do presets work?</AccordionTrigger>
          <AccordionContent className="text-xs">One config changes everything.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Alert",
    importCode: 'import { Alert } from "@sigil-ui/components"',
    tokens: "--s-info, --s-border, --s-card-radius",
    render: () => (
      <Alert variant="info" className="p-3">
        <AlertTitle className="text-xs">Heads up</AlertTitle>
      </Alert>
    ),
  },
  {
    name: "LoadingSpinner + Skeleton",
    importCode: 'import { LoadingSpinner, Skeleton } from "@sigil-ui/components"',
    tokens: "--s-primary, --s-surface, --s-duration-slow",
    render: () => (
      <div className="flex items-center gap-4 w-full">
        <LoadingSpinner variant="braille" size="lg" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
    ),
  },
];

export function ComponentGrid({ className = "" }: ComponentGridProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className={`grid grid-cols-3 gap-3 ${className}`}
      style={{ gridTemplateRows: "repeat(4, auto)" }}
    >
      {CELLS.map((cell, i) => (
        <div
          key={cell.name}
          ref={(el) => { cellRefs.current[i] = el; }}
          className="relative"
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div
            className="transition-all"
            style={{
              padding: 12,
              borderRadius: "var(--s-radius-md, 6px)",
              border: `1px solid ${hoveredIdx === i ? "var(--s-border-strong)" : "var(--s-border-muted)"}`,
              background: "var(--s-surface)",
              transform: hoveredIdx === i ? "scale(1.02)" : "scale(1)",
              transitionDuration: "var(--s-duration-fast, 150ms)",
              transitionTimingFunction: "var(--s-ease-out, ease-out)",
              minHeight: 72,
              display: "flex",
              alignItems: "center",
            }}
          >
            {cell.render()}
          </div>

          {hoveredIdx === i && (
            <div
              className="absolute left-1/2 z-50 pointer-events-none"
              style={{
                bottom: "calc(100% + 8px)",
                transform: "translateX(-50%)",
                width: "max-content",
                maxWidth: 340,
                padding: "10px 14px",
                borderRadius: "var(--s-radius-md, 6px)",
                border: "1px solid var(--s-border)",
                background: "var(--s-surface-elevated)",
                boxShadow: "var(--s-shadow-lg)",
              }}
            >
              <div
                className="r-mono font-bold"
                style={{ fontSize: 13, color: "var(--s-text)", marginBottom: 4 }}
              >
                {cell.name}
              </div>
              <code
                className="r-mono block"
                style={{ fontSize: 11, color: "var(--s-text-secondary)", marginBottom: 6 }}
              >
                {cell.importCode}
              </code>
              <div
                className="r-mono"
                style={{ fontSize: 10, color: "var(--s-text-muted)" }}
              >
                tokens: {cell.tokens}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
