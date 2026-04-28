"use client";

import {
  type MouseEvent,
  type ReactNode,
  type RefObject,
  lazy,
  Suspense,
  useCallback,
  useState,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";
import type { CanvasItemData } from "./canvas";

import {
  Hero,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  Slider,
  Tooltip,
  TooltipProvider,
  KPI,
  Terminal,
  CodeBlock,
  SigilGrid,
  SigilGridCell,
  Stack,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Center,
  Diamond,
  Hexagon,
  Triangle,
  Box3D,
  Card3D,
  Pricing,
  CTA,
  FeatureFrame,
  TestimonialCard,
  Timeline,
  Navbar,
  NavbarLogo,
  Footer,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  LoadingSpinner,
  Separator,
  Avatar,
  Progress,
  LogoBar,
} from "@sigil-ui/components";

// ---------------------------------------------------------------------------
// Component registry — maps string names to actual components + defaults
// ---------------------------------------------------------------------------

type RegistryEntry = {
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  label: string;
};

function HeroWrapper(props: Record<string, any>) {
  return (
    <Hero
      title={props.title ?? "Your Headline"}
      description={props.description ?? "A compelling description that captures your product's value."}
      actions={props.actions ?? [
        { label: "Get Started", variant: "primary" },
        { label: "Learn More", variant: "secondary" },
      ]}
    />
  );
}

function ButtonWrapper(props: Record<string, any>) {
  return (
    <div className="flex gap-3 p-4 flex-wrap">
      <Button variant={props.variant ?? "primary"}>{props.children ?? "Click me"}</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

function CardWrapper(props: Record<string, any>) {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{props.title ?? "Card Title"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--s-text-secondary)]">
          {props.children ?? "Card content goes here. This is a versatile container for grouping related information."}
        </p>
      </CardContent>
    </Card>
  );
}

function BadgeWrapper(props: Record<string, any>) {
  return (
    <div className="flex gap-2 p-4 flex-wrap">
      <Badge variant={props.variant ?? "default"}>{props.children ?? "Badge"}</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function InputWrapper(props: Record<string, any>) {
  return (
    <div className="max-w-sm p-4">
      <Input placeholder={props.placeholder ?? "Enter text..."} />
    </div>
  );
}

function TextareaWrapper(props: Record<string, any>) {
  return (
    <div className="max-w-sm p-4">
      <Textarea placeholder={props.placeholder ?? "Write a note..."} />
    </div>
  );
}

function SelectWrapper() {
  return (
    <div className="max-w-sm p-4">
      <Select defaultValue="sigil">
        <SelectTrigger>
          <SelectValue placeholder="Choose preset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sigil">Sigil</SelectItem>
          <SelectItem value="noir">Noir</SelectItem>
          <SelectItem value="cobalt">Cobalt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function CheckboxWrapper() {
  return (
    <label className="flex items-center gap-3 p-4 text-sm text-[var(--s-text)]">
      <Checkbox defaultChecked />
      Enable tokens
    </label>
  );
}

function SwitchWrapper() {
  return (
    <label className="flex items-center gap-3 p-4 text-sm text-[var(--s-text)]">
      <Switch defaultChecked />
      Motion
    </label>
  );
}

function SliderWrapper() {
  return (
    <div className="max-w-sm p-4">
      <Slider defaultValue={[64]} max={100} />
    </div>
  );
}

function TooltipWrapper() {
  return (
    <TooltipProvider>
      <Tooltip content="Token-driven tooltip">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    </TooltipProvider>
  );
}

function KPIWrapper(props: Record<string, any>) {
  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <KPI label={props.label ?? "Revenue"} value={props.value ?? "$48.2K"} change="+12.5%" trend="up" />
      <KPI label="Users" value="2,847" change="+8.1%" trend="up" />
      <KPI label="Churn" value="2.4%" change="-0.3%" trend="down" />
    </div>
  );
}

function TerminalWrapper(props: Record<string, any>) {
  return (
    <Terminal
      title={props.title ?? "Terminal"}
      lines={props.lines ?? [
        "$ npx @sigil-ui/cli init",
        "✓ Created sigil.config.ts",
        "✓ Installed @sigil-ui/tokens",
        "✓ Generated CSS variables",
        "$ npm run dev",
      ]}
    />
  );
}

function CodeBlockWrapper(props: Record<string, any>) {
  return (
    <CodeBlock
      language={props.language ?? "tsx"}
      fileName={props.fileName ?? "app.tsx"}
      code={props.code ?? `import { Button } from "@sigil-ui/components";\n\nexport default function App() {\n  return <Button variant="primary">Hello</Button>;\n}`}
    />
  );
}

function GridWrapper(props: Record<string, any>) {
  return (
    <SigilGrid columns={props.columns ?? 3} gap={props.gap ?? "1rem"} className="p-4">
      {Array.from({ length: 6 }, (_, i) => (
        <SigilGridCell key={i}>
          <div className="h-20 rounded-lg border border-[var(--s-border)] bg-[var(--s-surface)] flex items-center justify-center text-sm text-[var(--s-text-muted)]">
            Cell {i + 1}
          </div>
        </SigilGridCell>
      ))}
    </SigilGrid>
  );
}

function StackWrapper(props: Record<string, any>) {
  return (
    <Stack gap={props.gap ?? "1rem"} className="p-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="h-12 rounded-lg border border-[var(--s-border)] bg-[var(--s-surface)] flex items-center px-4 text-sm text-[var(--s-text-muted)]"
        >
          Stack item {i + 1}
        </div>
      ))}
    </Stack>
  );
}

function BoxWrapper() {
  return (
    <Box className="m-4 rounded-[var(--s-radius-md)] border border-[var(--s-border)] bg-[var(--s-surface)] p-4 text-sm text-[var(--s-text)]">
      Tokenized box
    </Box>
  );
}

function ContainerWrapper() {
  return (
    <Container className="p-4">
      <div className="rounded-[var(--s-radius-md)] border border-[var(--s-border)] bg-[var(--s-surface)] p-4 text-sm text-[var(--s-text-muted)]">
        Centered container
      </div>
    </Container>
  );
}

function FlexWrapper() {
  return (
    <Flex className="gap-3 p-4">
      <Badge>Alpha</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="outline">Gamma</Badge>
    </Flex>
  );
}

function SimpleGridWrapper() {
  return (
    <SimpleGrid columns={3} className="gap-3 p-4">
      {["One", "Two", "Three"].map((label) => (
        <div key={label} className="rounded-[var(--s-radius-md)] border border-[var(--s-border)] bg-[var(--s-surface)] p-3 text-sm text-[var(--s-text-muted)]">
          {label}
        </div>
      ))}
    </SimpleGrid>
  );
}

function CenterWrapper() {
  return (
    <Center className="min-h-32 rounded-[var(--s-radius-md)] border border-dashed border-[var(--s-border)] p-4 text-sm text-[var(--s-text-muted)]">
      Centered content
    </Center>
  );
}

function DiamondWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Diamond size={props.size ?? "lg"}>
        <div className="flex items-center justify-center w-full h-full text-xs text-[var(--s-text-muted)]">◆</div>
      </Diamond>
    </div>
  );
}

function HexagonWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Hexagon size={props.size ?? "lg"}>
        <div className="flex items-center justify-center w-full h-full text-xs text-[var(--s-text-muted)]">⬡</div>
      </Hexagon>
    </div>
  );
}

function TriangleWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Triangle size={props.size ?? "lg"} direction={props.direction ?? "up"}>
        <div className="flex items-center justify-center w-full h-full text-xs text-[var(--s-text-muted)]">▲</div>
      </Triangle>
    </div>
  );
}

function Box3DWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-12">
      <Box3D depth={props.depth ?? 20} variant={props.variant ?? "card"} hoverLift>
        <div className="p-6 text-sm text-[var(--s-text)]">3D Box</div>
      </Box3D>
    </div>
  );
}

function Card3DWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Card3D maxTilt={props.maxTilt ?? 15}>
        <div className="p-6 rounded-lg border border-[var(--s-border)] bg-[var(--s-surface)]">
          <h3 className="font-semibold text-[var(--s-text)]">3D Card</h3>
          <p className="mt-2 text-sm text-[var(--s-text-secondary)]">Hover to tilt</p>
        </div>
      </Card3D>
    </div>
  );
}

function PricingWrapper(props: Record<string, any>) {
  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <Pricing
        name={props.name ?? "Starter"}
        price={props.price ?? "$0"}
        period="/mo"
        features={["5 projects", "Basic analytics", "Community support"]}
      />
      <Pricing
        name="Pro"
        price="$29"
        period="/mo"
        highlighted
        features={["Unlimited projects", "Advanced analytics", "Priority support", "Custom themes"]}
      />
    </div>
  );
}

function CTAWrapper(props: Record<string, any>) {
  return (
    <CTA
      title={props.title ?? "Ready to get started?"}
      description={props.description ?? "Join thousands of developers building with Sigil UI."}
      actions={[
        { label: "Start Free", href: "#" },
        { label: "Contact Sales", href: "#" },
      ]}
    />
  );
}

function FeatureFrameWrapper(props: Record<string, any>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <FeatureFrame title={props.title ?? "Lightning Fast"} description="Built for performance with zero-runtime CSS variables." />
      <FeatureFrame title="Fully Themeable" description={`${SIGIL_PRODUCT_STATS.presetCount} presets out of the box. Create your own in minutes.`} />
    </div>
  );
}

function TestimonialCardWrapper(props: Record<string, any>) {
  return (
    <TestimonialCard
      quote={props.quote ?? "Sigil UI completely transformed our design workflow. The preset system is incredibly powerful."}
      author={props.author ?? "Alex Chen"}
      role={props.role ?? "Lead Designer, Acme Corp"}
    />
  );
}

function TimelineWrapper(props: Record<string, any>) {
  return (
    <Timeline
      variant={props.variant ?? "vertical"}
      entries={props.entries ?? [
        { date: "Jan 2025", title: "Project Started", description: "Initial commit and architecture design" },
        { date: "Mar 2025", title: "Alpha Release", description: "First public alpha with 10 components" },
        { date: "Jun 2025", title: "1.0 Launch", description: `Stable release with ${SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components and ${SIGIL_PRODUCT_STATS.presetCount} presets` },
      ]}
    />
  );
}

function NavbarWrapper(props: Record<string, any>) {
  return (
    <Navbar fixed={false}>
      <NavbarLogo>
        <span className="font-bold text-[var(--s-text)]">Sigil</span>
      </NavbarLogo>
      <div className="flex gap-4 text-sm text-[var(--s-text-secondary)]">
        <span>Docs</span>
        <span>Components</span>
        <span>Presets</span>
      </div>
    </Navbar>
  );
}

function FooterWrapper(props: Record<string, any>) {
  return (
    <Footer
      columns={props.columns ?? [
        { title: "Product", links: [{ label: "Components", href: "#" }, { label: "Presets", href: "#" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "GitHub", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }] },
      ]}
    />
  );
}

function AccordionWrapper(props: Record<string, any>) {
  return (
    <Accordion type="single" collapsible className="max-w-md">
      <AccordionItem value="1">
        <AccordionTrigger>What is Sigil UI?</AccordionTrigger>
        <AccordionContent>A design token-driven component library with {SIGIL_PRODUCT_STATS.presetCount} presets.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>How do presets work?</AccordionTrigger>
        <AccordionContent>Presets override CSS variables to completely change the visual identity.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes — built on Radix primitives with full ARIA support.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function TableWrapper(props: Record<string, any>) {
  return (
    <div className="max-w-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Invited</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Carol</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Viewer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function TabsWrapper(props: Record<string, any>) {
  return (
    <Tabs defaultValue="tab1" className="max-w-md p-4">
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Settings</TabsTrigger>
        <TabsTrigger value="tab3">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-[var(--s-text-secondary)] p-4">Overview content goes here.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-[var(--s-text-secondary)] p-4">Settings content goes here.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-[var(--s-text-secondary)] p-4">Logs content goes here.</p>
      </TabsContent>
    </Tabs>
  );
}

function LoadingSpinnerWrapper(props: Record<string, any>) {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size={props.size ?? "md"} />
    </div>
  );
}

function SeparatorWrapper(props: Record<string, any>) {
  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-[var(--s-text-muted)]">Content above</p>
      <Separator />
      <p className="text-sm text-[var(--s-text-muted)]">Content below</p>
    </div>
  );
}

function AvatarWrapper(props: Record<string, any>) {
  return (
    <div className="flex gap-3 p-4 items-center">
      <Avatar name={props.name ?? "Kevin Liu"} size={props.size ?? "md"} />
      <Avatar name="Jane Doe" size="sm" />
      <Avatar name="AB" size="lg" />
    </div>
  );
}

function ProgressWrapper(props: Record<string, any>) {
  return (
    <div className="max-w-sm p-4 space-y-3">
      <Progress value={props.value ?? 65} />
      <Progress value={30} />
      <Progress value={90} />
    </div>
  );
}

function LogoBarWrapper(props: Record<string, any>) {
  return (
    <LogoBar
      logos={props.logos ?? [
        { src: "https://placehold.co/120x40/1a1a1a/666?text=Acme", alt: "Acme" },
        { src: "https://placehold.co/120x40/1a1a1a/666?text=Globex", alt: "Globex" },
        { src: "https://placehold.co/120x40/1a1a1a/666?text=Initech", alt: "Initech" },
        { src: "https://placehold.co/120x40/1a1a1a/666?text=Umbrella", alt: "Umbrella" },
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const COMPONENT_REGISTRY: Record<string, RegistryEntry> = {
  Hero: { component: HeroWrapper, defaultProps: {}, label: "Hero" },
  Button: { component: ButtonWrapper, defaultProps: { variant: "primary", children: "Click me" }, label: "Button" },
  Card: { component: CardWrapper, defaultProps: { title: "Card Title" }, label: "Card" },
  Badge: { component: BadgeWrapper, defaultProps: { variant: "default", children: "Badge" }, label: "Badge" },
  Input: { component: InputWrapper, defaultProps: { placeholder: "Enter text..." }, label: "Input" },
  Textarea: { component: TextareaWrapper, defaultProps: { placeholder: "Write a note..." }, label: "Textarea" },
  Select: { component: SelectWrapper, defaultProps: {}, label: "Select" },
  Checkbox: { component: CheckboxWrapper, defaultProps: {}, label: "Checkbox" },
  Switch: { component: SwitchWrapper, defaultProps: {}, label: "Switch" },
  Slider: { component: SliderWrapper, defaultProps: {}, label: "Slider" },
  Tooltip: { component: TooltipWrapper, defaultProps: {}, label: "Tooltip" },
  KPI: { component: KPIWrapper, defaultProps: { label: "Revenue", value: "$48.2K" }, label: "KPI" },
  Terminal: { component: TerminalWrapper, defaultProps: {}, label: "Terminal" },
  CodeBlock: { component: CodeBlockWrapper, defaultProps: {}, label: "Code Block" },
  Grid: { component: GridWrapper, defaultProps: { columns: 3 }, label: "Grid" },
  Stack: { component: StackWrapper, defaultProps: {}, label: "Stack" },
  Box: { component: BoxWrapper, defaultProps: {}, label: "Box" },
  Container: { component: ContainerWrapper, defaultProps: {}, label: "Container" },
  Flex: { component: FlexWrapper, defaultProps: {}, label: "Flex" },
  SimpleGrid: { component: SimpleGridWrapper, defaultProps: {}, label: "Simple Grid" },
  Center: { component: CenterWrapper, defaultProps: {}, label: "Center" },
  Diamond: { component: DiamondWrapper, defaultProps: { size: "lg" }, label: "Diamond" },
  Hexagon: { component: HexagonWrapper, defaultProps: { size: "lg" }, label: "Hexagon" },
  Triangle: { component: TriangleWrapper, defaultProps: { size: "lg" }, label: "Triangle" },
  Box3D: { component: Box3DWrapper, defaultProps: { depth: 20 }, label: "Box 3D" },
  Card3D: { component: Card3DWrapper, defaultProps: { maxTilt: 15 }, label: "Card 3D" },
  Pricing: { component: PricingWrapper, defaultProps: {}, label: "Pricing" },
  CTA: { component: CTAWrapper, defaultProps: {}, label: "CTA" },
  FeatureFrame: { component: FeatureFrameWrapper, defaultProps: {}, label: "Feature Frame" },
  TestimonialCard: { component: TestimonialCardWrapper, defaultProps: {}, label: "Testimonial" },
  Timeline: { component: TimelineWrapper, defaultProps: {}, label: "Timeline" },
  Navbar: { component: NavbarWrapper, defaultProps: {}, label: "Navbar" },
  Footer: { component: FooterWrapper, defaultProps: {}, label: "Footer" },
  Accordion: { component: AccordionWrapper, defaultProps: {}, label: "Accordion" },
  Table: { component: TableWrapper, defaultProps: {}, label: "Table" },
  Tabs: { component: TabsWrapper, defaultProps: {}, label: "Tabs" },
  LoadingSpinner: { component: LoadingSpinnerWrapper, defaultProps: {}, label: "Spinner" },
  Separator: { component: SeparatorWrapper, defaultProps: {}, label: "Separator" },
  Avatar: { component: AvatarWrapper, defaultProps: { name: "Kevin Liu" }, label: "Avatar" },
  Progress: { component: ProgressWrapper, defaultProps: { value: 65 }, label: "Progress" },
  LogoBar: { component: LogoBarWrapper, defaultProps: {}, label: "Logo Bar" },
};

export const REGISTRY_NAMES = Object.keys(COMPONENT_REGISTRY);

// ---------------------------------------------------------------------------
// Resize hook
// ---------------------------------------------------------------------------

const INNER_GAP = 16;

function useResizeHandle(
  itemId: string,
  colSpan: number,
  onResize: (id: string, span: number) => void,
  contentRef: RefObject<HTMLDivElement | null>,
) {
  const [resizing, setResizing] = useState(false);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const contentEl = contentRef.current;
      if (!contentEl) return;

      const contentW = contentEl.getBoundingClientRect().width;
      const colW = (contentW - 11 * INNER_GAP) / 12;
      const itemEl = (e.target as HTMLElement).closest(
        "[data-canvas-item]",
      ) as HTMLElement | null;
      if (!itemEl) return;

      const contentLeft = contentEl.getBoundingClientRect().left;
      const itemLeft = itemEl.getBoundingClientRect().left;
      const startCol = Math.round((itemLeft - contentLeft) / (colW + INNER_GAP));

      setResizing(true);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const move = (ev: globalThis.MouseEvent) => {
        const relX = ev.clientX - contentLeft;
        const endCol = Math.round(relX / (colW + INNER_GAP));
        const span = Math.max(1, Math.min(12 - startCol, endCol - startCol));
        if (span !== colSpan) onResize(itemId, span);
      };

      const up = () => {
        setResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    [itemId, colSpan, onResize, contentRef],
  );

  return { resizing, onMouseDown };
}

// ---------------------------------------------------------------------------
// Span presets
// ---------------------------------------------------------------------------

const SPAN_OPTIONS = [
  { span: 12, label: "Full" },
  { span: 8, label: "2/3" },
  { span: 6, label: "1/2" },
  { span: 4, label: "1/3" },
  { span: 3, label: "1/4" },
] as const;

// ---------------------------------------------------------------------------
// CanvasItem
// ---------------------------------------------------------------------------

type CanvasItemProps = {
  item: CanvasItemData;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onResize: (id: string, colSpan: number) => void;
  contentRef: RefObject<HTMLDivElement | null>;
};

export function CanvasItem({
  item,
  selected,
  onSelect,
  onRemove,
  onResize,
  contentRef,
}: CanvasItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const { resizing, onMouseDown: onResizeMouseDown } = useResizeHandle(
    item.id,
    item.colSpan,
    onResize,
    contentRef,
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: resizing ? "none" : transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
    gridColumn: `span ${item.colSpan}`,
  } as const;

  const entry = COMPONENT_REGISTRY[item.component];

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onSelect(item.id);
  };

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  const mergedProps = { ...entry?.defaultProps, ...item.props };

  return (
    <div
      ref={setNodeRef}
      data-canvas-item
      style={style}
      onClick={handleClick}
      className={[
        "group relative rounded-lg border transition-all duration-150",
        "bg-[var(--s-surface)]",
        selected
          ? "border-[var(--s-primary)] ring-1 ring-[var(--s-primary)]/20"
          : "border-[var(--s-border)] hover:border-[var(--s-border-strong)]",
        resizing ? "ring-2 ring-[var(--s-primary)]/30" : "",
      ].join(" ")}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-2.5 py-1 border-b"
        style={{ borderColor: "var(--s-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-0.5 rounded hover:bg-[var(--s-surface-elevated)] text-[var(--s-text-muted)]"
            aria-label="Drag to reorder"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="4" cy="3" r="1" fill="currentColor" />
              <circle cx="10" cy="3" r="1" fill="currentColor" />
              <circle cx="4" cy="7" r="1" fill="currentColor" />
              <circle cx="10" cy="7" r="1" fill="currentColor" />
              <circle cx="4" cy="11" r="1" fill="currentColor" />
              <circle cx="10" cy="11" r="1" fill="currentColor" />
            </svg>
          </button>
          <span className="text-[11px] font-medium text-[var(--s-text-muted)] select-none">
            {entry?.label ?? item.component}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Span selector (visible when selected) */}
          {selected && (
            <div className="flex items-center gap-0.5 mr-1">
              {SPAN_OPTIONS.map((opt) => (
                <button
                  key={opt.span}
                  onClick={(e) => {
                    e.stopPropagation();
                    onResize(item.id, opt.span);
                  }}
                  className={[
                    "text-[9px] px-1.5 py-0.5 rounded transition-colors",
                    item.colSpan === opt.span
                      ? "bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)]"
                      : "text-[var(--s-text-subtle)] hover:text-[var(--s-text)] hover:bg-[var(--s-surface-elevated)]",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Span badge */}
          {!selected && item.colSpan < 12 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--s-surface-elevated)] text-[var(--s-text-subtle)] select-none">
              {item.colSpan}/12
            </span>
          )}

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[var(--s-error)]/10 text-[var(--s-text-muted)] hover:text-[var(--s-error)]"
            aria-label="Remove component"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Component render area */}
      <div className="overflow-hidden">
        {entry ? (
          <entry.component {...mergedProps} />
        ) : (
          <div className="p-4 text-sm text-[var(--s-text-muted)]">
            Unknown: {item.component}
          </div>
        )}
      </div>

      {/* Right-edge resize handle */}
      <div
        onMouseDown={onResizeMouseDown}
        className={[
          "absolute top-0 right-0 w-2 h-full cursor-col-resize z-10",
          "after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0",
          "after:w-1 after:h-8 after:rounded-full after:transition-opacity",
          selected || resizing
            ? "after:bg-[var(--s-primary)] after:opacity-80"
            : "after:bg-[var(--s-border-strong)] after:opacity-0 group-hover:after:opacity-40",
        ].join(" ")}
      />
    </div>
  );
}
