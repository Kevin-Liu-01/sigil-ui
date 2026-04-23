"use client";

import { useState, type ReactNode } from "react";
import {
  Button, Badge, Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Checkbox, Switch, Slider, Progress,
  Toggle, ToggleGroup, ToggleGroupItem,
  Avatar, AvatarGroup, KPI, Alert, AlertTitle, AlertDescription,
  Skeleton, LoadingSpinner, Textarea, NumberField, Label, Separator,
  Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter,
  Stack, Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  ScrollArea, AspectRatio, CodeBlock, Terminal,
  Breadcrumb, Pagination, Toolbar, ToolbarButton, ToolbarSeparator, SplitButton,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Timeline, Stepper, Meter, DatePicker, Calendar,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  RadioGroup, RadioGroupItem, CheckboxGroup, CheckboxGroupItem, Combobox,
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
  Field, Fieldset, FieldLabel, FieldDescription,
  Diamond, Hexagon, Triangle, Diagonal, Shape, Cross,
  VoronoiBento, Tessellation, Pattern,
  Box3D, Card3D, FloatingUI, IsometricView,
  Diagram, FlowDiagram, ComparisonTable, ExplodedView, ArchitectureDiagram,
  Hero, CTA, Pricing, FeatureGrid, LogoBar, PricingTiers, CostCalculator,
  TestimonialCard, AnnouncementBar, BlogGrid,
  Divider, HRule, SectionDivider,
  AnimateOnScroll,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
  Popover, PopoverTrigger, PopoverContent,
  HoverCard, HoverCardTrigger, HoverCardContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  Command, CommandInput,
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
  toast,
  Kbd, Empty, NativeSelect, Clipboard,
  TagsInput, ColorPicker, Editable, RatingGroup,
  TreeView, ButtonGroup,
  InputGroup, InputGroupAddon, InputGroupInput,
  FileUpload, SignaturePad,
} from "@sigil-ui/components";
import { TechFrame } from "./tech-frame";
import {
  Search, Star, Heart, Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Layers, ArrowRight, Zap, Shield, Globe, Cpu, Code,
  Calendar as CalendarIcon, ChevronDown, Upload, Folder, File,
} from "lucide-react";

type ComponentCell = {
  name: string;
  category: string;
  variants?: number;
  render: () => ReactNode;
};

const CATEGORIES = [
  "All", "UI", "Layout", "Navigation", "Overlays", "Data",
  "Forms", "Marketing", "Shapes", "3D", "Diagrams", "Patterns",
] as const;

const CELLS: ComponentCell[] = [
  /* ================================================================ */
  /* UI                                                                */
  /* ================================================================ */
  { name: "Button", category: "UI", variants: 6, render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button size="sm">Primary</Button>
      <Button size="sm" variant="secondary">Secondary</Button>
      <Button size="sm" variant="ghost">Ghost</Button>
    </div>
  )},
  { name: "Badge", category: "UI", variants: 4, render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )},
  { name: "Input", category: "UI", variants: 4, render: () => (
    <Input placeholder="Search..." className="h-8 text-xs w-full" iconLeft={<Search size={12} style={{ color: "var(--s-text-muted)" }} />} />
  )},
  { name: "Textarea", category: "UI", variants: 1, render: () => (
    <Textarea rows={2} placeholder="Write something..." className="text-xs min-h-0 w-full" />
  )},
  { name: "Select", category: "UI", variants: 2, render: () => (
    <Select defaultValue="react">
      <SelectTrigger className="h-8 text-xs w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  )},
  { name: "Checkbox", category: "UI", variants: 2, render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="Accept terms" defaultChecked />
      <Checkbox label="Subscribe to updates" />
    </div>
  )},
  { name: "Switch", category: "UI", variants: 2, render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2"><Switch defaultChecked /><Label className="text-xs">Dark mode</Label></div>
      <div className="flex items-center gap-2"><Switch /><Label className="text-xs">Notifications</Label></div>
    </div>
  )},
  { name: "Slider", category: "UI", variants: 3, render: () => <Slider defaultValue={[65]} className="w-full" /> },
  { name: "Progress", category: "UI", variants: 2, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Progress value={72} className="w-full" />
      <Progress value={35} className="w-full" />
    </div>
  )},
  { name: "Toggle", category: "UI", variants: 3, render: () => (
    <div className="flex gap-1">
      <Toggle size="sm" defaultPressed><Bold size={14} /></Toggle>
      <Toggle size="sm"><Italic size={14} /></Toggle>
      <Toggle size="sm" variant="outline"><Underline size={14} /></Toggle>
    </div>
  )},
  { name: "ToggleGroup", category: "UI", variants: 2, render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" size="sm"><AlignLeft size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="center" size="sm"><AlignCenter size={14} /></ToggleGroupItem>
      <ToggleGroupItem value="right" size="sm"><AlignRight size={14} /></ToggleGroupItem>
    </ToggleGroup>
  )},
  { name: "Avatar", category: "UI", variants: 3, render: () => (
    <div className="flex -space-x-2">
      <Avatar fallback="KL" size="sm" />
      <Avatar fallback="JD" size="sm" />
      <Avatar fallback="AR" size="sm" />
      <Avatar fallback="+5" size="sm" />
    </div>
  )},
  { name: "AvatarGroup", category: "UI", variants: 1, render: () => (
    <AvatarGroup max={3}>
      <Avatar fallback="A" size="sm" />
      <Avatar fallback="B" size="sm" />
      <Avatar fallback="C" size="sm" />
      <Avatar fallback="D" size="sm" />
      <Avatar fallback="E" size="sm" />
    </AvatarGroup>
  )},
  { name: "KPI", category: "UI", variants: 2, render: () => (
    <KPI label="Revenue" value="$4.2k" change="+8%" trend="up" className="p-2 text-xs border-0 w-full" />
  )},
  { name: "Alert", category: "UI", variants: 4, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Alert variant="info" className="p-2 w-full"><AlertTitle className="text-[10px]">Info</AlertTitle></Alert>
      <Alert variant="warning" className="p-2 w-full"><AlertTitle className="text-[10px]">Warning</AlertTitle></Alert>
    </div>
  )},
  { name: "Skeleton", category: "UI", variants: 3, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
      <div className="flex items-center gap-2">
        <Skeleton variant="avatar" />
        <Skeleton variant="text" className="flex-1" />
      </div>
    </div>
  )},
  { name: "LoadingSpinner", category: "UI", variants: 5, render: () => (
    <div className="flex gap-4 items-center">
      <LoadingSpinner variant="braille" size="sm" />
      <LoadingSpinner variant="braille" size="md" />
      <LoadingSpinner variant="braille" size="lg" />
    </div>
  )},
  { name: "NumberField", category: "UI", variants: 1, render: () => <NumberField value={8} min={0} max={100} /> },
  { name: "Label", category: "UI", variants: 1, render: () => (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-xs">Email address</Label>
      <Input placeholder="you@example.com" className="h-8 text-xs" />
    </div>
  )},
  { name: "Separator", category: "UI", variants: 1, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Separator />
      <span className="text-[9px] text-center" style={{ color: "var(--s-text-muted)" }}>or continue with</span>
      <Separator />
    </div>
  )},
  { name: "Tooltip", category: "UI", variants: 1, render: () => (
    <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)]">Hover any button to see tooltips</span>
  )},
  { name: "ScrollArea", category: "UI", variants: 1, render: () => (
    <ScrollArea className="h-[80px] w-full" style={{ border: "1px solid var(--s-border-muted)", padding: 8 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="font-[family-name:var(--s-font-mono)] text-[10px] py-0.5" style={{ color: "var(--s-text-muted)" }}>Item {i + 1}</div>
      ))}
    </ScrollArea>
  )},
  { name: "CodeBlock", category: "UI", variants: 1, render: () => (
    <div className="w-full" style={{ fontSize: 10 }}>
      <CodeBlock language="tsx" code={'<Button>Click</Button>'} />
    </div>
  )},
  { name: "Terminal", category: "UI", variants: 1, render: () => (
    <div className="w-full" style={{ fontSize: 10 }}>
      <Terminal lines={["$ npx sigil init", "✓ Done in 1.2s"]} title="zsh" />
    </div>
  )},
  { name: "Kbd", category: "UI", variants: 1, render: () => (
    <div className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
  )},
  { name: "Empty", category: "UI", variants: 1, render: () => (
    <Empty title="No results" description="Try a different search" className="py-4 [&_h3]:text-[10px] [&_p]:text-[9px]" />
  )},
  { name: "NativeSelect", category: "UI", variants: 1, render: () => (
    <NativeSelect className="h-8 text-xs w-full">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  )},
  { name: "Clipboard", category: "UI", variants: 1, render: () => (
    <Clipboard value="npx sigil init" />
  )},

  /* ================================================================ */
  /* Layout                                                            */
  /* ================================================================ */
  { name: "Card", category: "Layout", variants: 3, render: () => (
    <Card className="w-full">
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-xs">Dashboard</CardTitle>
        <CardDescription className="text-[10px]">Manage settings</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Button size="sm" className="w-full text-xs">Open</Button>
      </CardContent>
    </Card>
  )},
  { name: "Stack", category: "Layout", variants: 2, render: () => (
    <Stack gap={8} className="w-full">
      {[1, 2, 3].map((n) => (
        <div key={n} style={{ height: 16, background: `color-mix(in oklch, var(--s-primary) ${30 + n * 15}%, transparent)`, border: "1px solid var(--s-border-muted)" }} />
      ))}
    </Stack>
  )},
  { name: "Accordion", category: "Layout", variants: 1, render: () => (
    <Accordion className="w-full">
      <AccordionItem value="a">
        <AccordionTrigger className="text-xs py-1.5">What is Sigil?</AccordionTrigger>
        <AccordionContent className="text-[10px]">A token-driven design system.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger className="text-xs py-1.5">How many presets?</AccordionTrigger>
        <AccordionContent className="text-[10px]">31 curated presets.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )},
  { name: "Tabs", category: "Layout", variants: 2, render: () => (
    <Tabs defaultValue="code" className="w-full">
      <TabsList className="h-7 p-0.5">
        <TabsTrigger value="code" className="text-[10px] px-2 py-0.5 h-6">Code</TabsTrigger>
        <TabsTrigger value="preview" className="text-[10px] px-2 py-0.5 h-6">Preview</TabsTrigger>
        <TabsTrigger value="docs" className="text-[10px] px-2 py-0.5 h-6">Docs</TabsTrigger>
      </TabsList>
    </Tabs>
  )},
  { name: "Collapsible", category: "Layout", variants: 1, render: () => (
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild>
        <Button size="sm" variant="ghost" className="w-full text-xs justify-between">Show details <ArrowRight size={12} /></Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-2 text-[10px]" style={{ color: "var(--s-text-muted)", border: "1px solid var(--s-border-muted)", marginTop: 4 }}>Expandable content area</div>
      </CollapsibleContent>
    </Collapsible>
  )},
  { name: "AspectRatio", category: "Layout", variants: 1, render: () => (
    <AspectRatio ratio={16 / 9} className="w-full" style={{ background: "var(--s-surface-sunken)", border: "1px dashed var(--s-border-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="font-[family-name:var(--s-font-mono)] text-[10px]" style={{ color: "var(--s-text-muted)" }}>16:9</span>
    </AspectRatio>
  )},
  { name: "Divider", category: "Layout", variants: 2, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Divider />
      <Divider orientation="horizontal" />
    </div>
  )},
  { name: "HRule", category: "Layout", variants: 1, render: () => <HRule className="w-full" /> },
  { name: "ButtonGroup", category: "Layout", variants: 1, render: () => (
    <ButtonGroup>
      <Button size="sm" variant="outline" className="text-xs">Left</Button>
      <Button size="sm" variant="outline" className="text-xs">Mid</Button>
      <Button size="sm" variant="outline" className="text-xs">Right</Button>
    </ButtonGroup>
  )},
  { name: "VoronoiBento", category: "Layout", variants: 1, render: () => (
    <VoronoiBento seeds={4} height={80} gap={4} className="w-full">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ background: `color-mix(in oklch, var(--s-primary) ${20 + i * 15}%, var(--s-surface))`, width: "100%", height: "100%" }} />
      ))}
    </VoronoiBento>
  )},

  /* ================================================================ */
  /* Navigation                                                        */
  /* ================================================================ */
  { name: "Breadcrumb", category: "Navigation", variants: 1, render: () => (
    <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Components", href: "#" }, { label: "Button" }]} />
  )},
  { name: "Pagination", category: "Navigation", variants: 1, render: () => (
    <Pagination currentPage={3} totalPages={10} />
  )},
  { name: "Toolbar", category: "Navigation", variants: 1, render: () => (
    <Toolbar>
      <ToolbarButton><Bold size={14} /></ToolbarButton>
      <ToolbarButton><Italic size={14} /></ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton><Code size={14} /></ToolbarButton>
    </Toolbar>
  )},
  { name: "SplitButton", category: "Navigation", variants: 1, render: () => (
    <SplitButton icon={<CalendarIcon size={13} />}>Copilot</SplitButton>
  )},

  /* ================================================================ */
  /* Overlays                                                          */
  /* ================================================================ */
  { name: "Dialog", category: "Overlays", variants: 2, render: () => (
    <Dialog>
      <DialogTrigger asChild><Button size="sm" variant="outline" className="text-xs">Open Dialog</Button></DialogTrigger>
      <DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader></DialogContent>
    </Dialog>
  )},
  { name: "Drawer", category: "Overlays", variants: 2, render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button size="sm" variant="outline" className="text-xs">Open Drawer</Button></DrawerTrigger>
      <DrawerContent><DrawerHeader><DrawerTitle>Drawer</DrawerTitle></DrawerHeader></DrawerContent>
    </Drawer>
  )},
  { name: "Sheet", category: "Overlays", variants: 2, render: () => (
    <Sheet>
      <SheetTrigger asChild><Button size="sm" variant="outline" className="text-xs">Open Sheet</Button></SheetTrigger>
      <SheetContent side="right"><SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader></SheetContent>
    </Sheet>
  )},
  { name: "Popover", category: "Overlays", variants: 1, render: () => (
    <Popover>
      <PopoverTrigger asChild><Button size="sm" variant="outline" className="text-xs">Open Popover</Button></PopoverTrigger>
      <PopoverContent className="w-48 p-3"><p className="text-[10px]" style={{ color: "var(--s-text-muted)" }}>Popover content here</p></PopoverContent>
    </Popover>
  )},
  { name: "HoverCard", category: "Overlays", variants: 1, render: () => (
    <HoverCard>
      <HoverCardTrigger asChild><Button size="sm" variant="ghost" className="text-xs underline">Hover me</Button></HoverCardTrigger>
      <HoverCardContent className="w-48 p-3"><p className="text-[10px]" style={{ color: "var(--s-text-muted)" }}>Rich preview on hover</p></HoverCardContent>
    </HoverCard>
  )},
  { name: "DropdownMenu", category: "Overlays", variants: 3, render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button size="sm" variant="outline" className="text-xs">Menu <ChevronDown size={12} /></Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
        <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
        <DropdownMenuItem className="text-xs">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
  { name: "ContextMenu", category: "Overlays", variants: 2, render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center h-16 w-full border border-dashed border-[var(--s-border-muted)] rounded text-[10px]" style={{ color: "var(--s-text-muted)" }}>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="text-xs">Cut</ContextMenuItem>
        <ContextMenuItem className="text-xs">Copy</ContextMenuItem>
        <ContextMenuItem className="text-xs">Paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )},
  { name: "Command", category: "Overlays", variants: 2, render: () => (
    <Command className="w-full border border-[var(--s-border)] rounded-[var(--s-radius-md,6px)]">
      <CommandInput placeholder="Type a command..." className="h-8 text-xs" />
    </Command>
  )},
  { name: "AlertDialog", category: "Overlays", variants: 1, render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button size="sm" variant="outline" className="text-xs">Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription className="text-xs">This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel><AlertDialogAction className="text-xs">Confirm</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )},
  { name: "Toast", category: "Overlays", variants: 4, render: () => (
    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast({ title: "Saved!", description: "Changes applied." })}>Show Toast</Button>
  )},

  /* ================================================================ */
  /* Data                                                              */
  /* ================================================================ */
  { name: "Table", category: "Data", variants: 1, render: () => (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[10px] p-1.5">Name</TableHead>
          <TableHead className="text-[10px] p-1.5">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell className="text-[10px] p-1.5">Button</TableCell><TableCell className="text-[10px] p-1.5"><Badge size="sm">Stable</Badge></TableCell></TableRow>
        <TableRow><TableCell className="text-[10px] p-1.5">Calendar</TableCell><TableCell className="text-[10px] p-1.5"><Badge size="sm" variant="outline">Beta</Badge></TableCell></TableRow>
      </TableBody>
    </Table>
  )},
  { name: "DataTable", category: "Data", variants: 1, render: () => (
    <Table className="w-full">
      <TableHeader>
        <TableRow><TableHead className="text-[10px] p-1.5">Component</TableHead><TableHead className="text-[10px] p-1.5">Downloads</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell className="text-[10px] p-1.5">Button</TableCell><TableCell className="text-[10px] p-1.5 tabular-nums">12.4k</TableCell></TableRow>
        <TableRow><TableCell className="text-[10px] p-1.5">Card</TableCell><TableCell className="text-[10px] p-1.5 tabular-nums">9.1k</TableCell></TableRow>
      </TableBody>
    </Table>
  )},
  { name: "Timeline", category: "Data", variants: 1, render: () => (
    <Timeline entries={[{ date: "Jan", title: "Created", description: "Project started" }, { date: "Feb", title: "Deployed", description: "v1.0 shipped" }]} />
  )},
  { name: "Stepper", category: "Data", variants: 1, render: () => (
    <Stepper steps={[{ label: "Setup" }, { label: "Config" }, { label: "Deploy" }]} currentStep={1} />
  )},
  { name: "Meter", category: "Data", variants: 1, render: () => <Meter value={68} max={100} label="CPU Usage" /> },
  { name: "Calendar", category: "Data", variants: 1, render: () => (
    <div className="w-full flex justify-center [&_table]:text-[10px] [&_button]:h-6 [&_button]:w-6 [&_th]:w-6 [&_th]:text-[9px]">
      <Calendar className="p-1" />
    </div>
  )},
  { name: "DatePicker", category: "Data", variants: 1, render: () => (
    <div className="w-full"><DatePicker /></div>
  )},
  { name: "Carousel", category: "Data", variants: 1, render: () => (
    <Carousel className="w-full max-w-[160px]">
      <CarouselContent>
        {["--s-primary", "--s-success", "--s-warning"].map((c, i) => (
          <CarouselItem key={i}>
            <div className="flex items-center justify-center h-16 rounded text-[10px] font-mono text-white" style={{ background: `var(${c})` }}>{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-6 w-6 -left-3" />
      <CarouselNext className="h-6 w-6 -right-3" />
    </Carousel>
  )},
  { name: "TreeView", category: "Data", variants: 1, render: () => (
    <TreeView
      data={[
        { id: "src", label: "src", icon: <Folder size={12} />, children: [
          { id: "app", label: "app.tsx", icon: <File size={12} /> },
          { id: "index", label: "index.ts", icon: <File size={12} /> },
        ]},
      ]}
      defaultExpanded={["src"]}
      className="w-full text-[10px]"
    />
  )},

  /* ================================================================ */
  /* Forms                                                             */
  /* ================================================================ */
  { name: "RadioGroup", category: "Forms", variants: 1, render: () => (
    <RadioGroup defaultValue="a" className="gap-2">
      <div className="flex items-center gap-2"><RadioGroupItem value="a" /><Label className="text-[10px]">React</Label></div>
      <div className="flex items-center gap-2"><RadioGroupItem value="b" /><Label className="text-[10px]">Vue</Label></div>
      <div className="flex items-center gap-2"><RadioGroupItem value="c" /><Label className="text-[10px]">Svelte</Label></div>
    </RadioGroup>
  )},
  { name: "CheckboxGroup", category: "Forms", variants: 1, render: () => (
    <CheckboxGroup>
      <CheckboxGroupItem value="ts" label="TypeScript" defaultChecked />
      <CheckboxGroupItem value="js" label="JavaScript" />
      <CheckboxGroupItem value="py" label="Python" />
    </CheckboxGroup>
  )},
  { name: "Combobox", category: "Forms", variants: 1, render: () => (
    <Combobox
      options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, { value: "svelte", label: "Svelte" }]}
      placeholder="Select framework..."
      className="w-full"
    />
  )},
  { name: "InputOTP", category: "Forms", variants: 1, render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )},
  { name: "Form", category: "Forms", variants: 1, render: () => (
    <div className="flex flex-col gap-2 w-full">
      <Input placeholder="Email" className="h-7 text-[10px]" />
      <Button size="sm" className="text-xs w-full h-7">Submit</Button>
    </div>
  )},
  { name: "Field", category: "Forms", variants: 1, render: () => (
    <div className="flex flex-col gap-1 w-full">
      <FieldLabel className="text-[10px]">Username</FieldLabel>
      <Input className="h-7 text-[10px]" placeholder="kevinliu" />
      <FieldDescription className="text-[9px]">Your public display name</FieldDescription>
    </div>
  )},
  { name: "TagsInput", category: "Forms", variants: 1, render: () => (
    <TagsInput defaultValue={["React", "Sigil"]} className="w-full" />
  )},
  { name: "ColorPicker", category: "Forms", variants: 1, render: () => (
    <ColorPicker defaultValue="#3b82f6" swatches={["#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"]} />
  )},
  { name: "Editable", category: "Forms", variants: 1, render: () => (
    <Editable defaultValue="Click to edit" />
  )},
  { name: "RatingGroup", category: "Forms", variants: 1, render: () => (
    <RatingGroup defaultValue={3} size="sm" />
  )},
  { name: "InputGroup", category: "Forms", variants: 1, render: () => (
    <InputGroup className="w-full">
      <InputGroupAddon>$</InputGroupAddon>
      <InputGroupInput placeholder="0.00" />
    </InputGroup>
  )},
  { name: "FileUpload", category: "Forms", variants: 1, render: () => (
    <FileUpload className="w-full [&>div]:py-4 [&>div]:px-3">
      <div className="flex flex-col items-center gap-1">
        <Upload size={14} style={{ color: "var(--s-text-muted)" }} />
        <span className="text-[10px]" style={{ color: "var(--s-text-muted)" }}>Drop files here</span>
      </div>
    </FileUpload>
  )},
  { name: "SignaturePad", category: "Forms", variants: 1, render: () => (
    <SignaturePad width={160} height={60} className="w-full" />
  )},

  /* ================================================================ */
  /* Marketing                                                         */
  /* ================================================================ */
  { name: "Hero", category: "Marketing", variants: 2, render: () => (
    <div className="flex flex-col items-center gap-1 text-center w-full">
      <Badge size="sm" className="text-[9px]">New</Badge>
      <span className="text-xs font-bold" style={{ color: "var(--s-text)" }}>Ship faster</span>
      <span className="text-[9px]" style={{ color: "var(--s-text-muted)" }}>Token-driven design system</span>
    </div>
  )},
  { name: "CTA", category: "Marketing", variants: 2, render: () => (
    <div className="flex flex-col items-center gap-2 w-full">
      <span className="text-xs font-semibold" style={{ color: "var(--s-text)" }}>Ready to start?</span>
      <Button size="sm" className="text-xs h-7">Get Started</Button>
    </div>
  )},
  { name: "Pricing", category: "Marketing", variants: 1, render: () => (
    <Pricing name="Pro" price="$19" period="/mo" features={["Unlimited", "Priority"]} className="w-full p-3 text-[10px] [&_h3]:text-[10px] [&_p]:text-xs [&_li]:text-[10px]" />
  )},
  { name: "PricingTiers", category: "Marketing", variants: 1, render: () => (
    <span className="font-[family-name:var(--s-font-mono)] text-[10px]" style={{ color: "var(--s-text-muted)" }}>See Pricing page</span>
  )},
  { name: "FeatureGrid", category: "Marketing", variants: 1, render: () => (
    <FeatureGrid rows={[
      { heading: "Fast", visual: <Zap size={16} style={{ color: "var(--s-primary)" }} /> },
      { heading: "Secure", visual: <Shield size={16} style={{ color: "var(--s-primary)" }} /> },
    ]} className="w-full [&_h3]:text-[10px] [&>div]:min-h-0 [&>div]:py-2" />
  )},
  { name: "ComparisonTable", category: "Marketing", variants: 1, render: () => (
    <ComparisonTable
      columns={["Sigil", "Other"]}
      features={[
        { name: "Tokens", values: { Sigil: true, Other: false } },
        { name: "Presets", values: { Sigil: true, Other: false } },
      ]}
      className="w-full text-[10px] [&_th]:text-[10px] [&_th]:py-1 [&_th]:px-2 [&_td]:text-[10px] [&_td]:py-1 [&_td]:px-2"
    />
  )},
  { name: "TestimonialCard", category: "Marketing", variants: 1, render: () => (
    <TestimonialCard
      quote="Sigil completely changed how we build."
      author="Jane Doe"
      role="CTO"
      className="w-full"
    />
  )},
  { name: "LogoBar", category: "Marketing", variants: 1, render: () => (
    <div className="flex items-center justify-center gap-4 w-full opacity-60">
      <Globe size={16} /><Cpu size={16} /><Code size={16} /><Zap size={16} />
    </div>
  )},
  { name: "AnnouncementBar", category: "Marketing", variants: 1, render: () => (
    <AnnouncementBar message="New: Sigil v2.0 is here" badge="NEW" className="w-full" />
  )},
  { name: "BlogGrid", category: "Marketing", variants: 1, render: () => (
    <BlogGrid
      posts={[{ title: "Getting Started with Sigil", date: "Apr 2026", excerpt: "A quick intro." }]}
      className="w-full [&_h3]:text-[10px] [&_p]:text-[9px] [&_span]:text-[9px]"
    />
  )},
  { name: "CostCalculator", category: "Marketing", variants: 1, render: () => (
    <span className="font-[family-name:var(--s-font-mono)] text-[10px]" style={{ color: "var(--s-text-muted)" }}>Interactive calculator</span>
  )},

  /* ================================================================ */
  /* Shapes                                                            */
  /* ================================================================ */
  { name: "Diamond", category: "Shapes", variants: 2, render: () => <Diamond size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} /> },
  { name: "Hexagon", category: "Shapes", variants: 2, render: () => <Hexagon size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} /> },
  { name: "Triangle", category: "Shapes", variants: 2, render: () => <Triangle size="md" style={{ background: "var(--s-primary)", opacity: 0.8 }} /> },
  { name: "Diagonal", category: "Shapes", variants: 1, render: () => <Diagonal height={48} fill="var(--s-primary)" style={{ width: 80, opacity: 0.8 }} /> },
  { name: "Shape", category: "Shapes", variants: 6, render: () => (
    <div className="flex gap-3">
      <Shape variant="circle" size="sm" strokeWidth={1.5} />
      <Shape variant="diamond" size="sm" strokeWidth={1.5} />
      <Shape variant="cross" size="sm" strokeWidth={1.5} />
      <Shape variant="pill" size="sm" strokeWidth={1.5} />
    </div>
  )},
  { name: "Cross", category: "Shapes", variants: 1, render: () => <Cross size={24} strokeWidth={1.5} /> },

  /* ================================================================ */
  /* Patterns                                                          */
  /* ================================================================ */
  { name: "Pattern", category: "Patterns", variants: 7, render: () => (
    <div className="grid grid-cols-3 gap-1 w-full">
      {(["dots", "hatch", "diagonal"] as const).map((v) => (
        <Pattern key={v} variant={v} className="h-8 w-full" style={{ opacity: 0.5 }} />
      ))}
    </div>
  )},
  { name: "Tessellation", category: "Patterns", variants: 7, render: () => (
    <Tessellation variant="zigzag" className="w-full" style={{ height: 48 }} opacity={0.4} />
  )},
  { name: "SectionDivider", category: "Patterns", variants: 6, render: () => (
    <div className="flex flex-col gap-1 w-full">
      <SectionDivider pattern="dots" size="xs" />
      <SectionDivider pattern="crosshatch" size="xs" />
    </div>
  )},

  /* ================================================================ */
  /* 3D                                                                */
  /* ================================================================ */
  { name: "Box3D", category: "3D", variants: 2, render: () => (
    <Box3D depth={24} tiltX={-12} tiltY={20} perspective={400} variant="card" className="w-[72px] h-[72px]">
      <div className="w-full h-full flex items-center justify-center font-mono" style={{ fontSize: 10, color: "var(--s-text-muted)" }}>3D</div>
    </Box3D>
  )},
  { name: "Card3D", category: "3D", variants: 1, render: () => (
    <Card3D className="w-[80px] h-[60px] rounded border border-[var(--s-border)] bg-[var(--s-surface)] flex items-center justify-center">
      <span className="font-mono text-[10px]" style={{ color: "var(--s-text-muted)" }}>Tilt me</span>
    </Card3D>
  )},
  { name: "FloatingUI", category: "3D", variants: 1, render: () => (
    <FloatingUI
      layers={[
        <div key="a" className="w-16 h-8 rounded bg-[var(--s-surface)] border border-[var(--s-border)] flex items-center justify-center text-[9px]" style={{ color: "var(--s-text-muted)" }}>A</div>,
        <div key="b" className="w-16 h-8 rounded bg-[var(--s-surface)] border border-[var(--s-border)] flex items-center justify-center text-[9px]" style={{ color: "var(--s-text-muted)" }}>B</div>,
      ]}
      offset={12}
      shadowDepth="sm"
      className="h-[60px]"
    />
  )},
  { name: "IsometricView", category: "3D", variants: 1, render: () => (
    <IsometricView angle={25} className="w-[64px] h-[64px]">
      <div className="w-full h-full rounded bg-[var(--s-primary)] opacity-80 flex items-center justify-center text-white text-[10px]">ISO</div>
    </IsometricView>
  )},
  { name: "ExplodedView", category: "3D", variants: 1, render: () => (
    <ExplodedView
      gap="0.5rem"
      layers={[
        { label: "UI", children: <div className="text-[9px] text-center" style={{ color: "var(--s-text-muted)" }}>Frontend</div> },
        { label: "API", children: <div className="text-[9px] text-center" style={{ color: "var(--s-text-muted)" }}>Backend</div>, hatched: true },
      ]}
      className="w-full [&>div>div]:p-2"
    />
  )},

  /* ================================================================ */
  /* Diagrams                                                          */
  /* ================================================================ */
  { name: "Diagram", category: "Diagrams", variants: 1, render: () => (
    <Diagram showGrid gridSize={16} className="w-full p-3" style={{ minHeight: 60 }}>
      <div className="flex items-center justify-center gap-2">
        {["A", "B", "C"].map((n) => (
          <div key={n} className="px-2 py-1 rounded border border-[var(--s-border)] bg-[var(--s-surface)] text-[9px] font-mono" style={{ color: "var(--s-text-muted)" }}>{n}</div>
        ))}
      </div>
    </Diagram>
  )},
  { name: "FlowDiagram", category: "Diagrams", variants: 1, render: () => (
    <FlowDiagram
      nodes={[{ id: "1", label: "Start" }, { id: "2", label: "End" }]}
      connections={[{ from: "1", to: "2" }]}
      className="w-full text-[10px] [&_span]:text-[10px]"
    />
  )},
  { name: "ArchitectureDiagram", category: "Diagrams", variants: 1, render: () => (
    <ArchitectureDiagram
      gap="0.4rem"
      layers={[
        { label: "UI", children: <span className="text-[9px]">React</span> },
        { label: "API", children: <span className="text-[9px]">REST</span>, hatched: true },
      ]}
      className="w-full p-3 [&_h3]:text-[9px] [&_h3]:mb-2 [&>div>div>div>div]:p-1.5 [&_span]:text-[9px]"
    />
  )},
  { name: "AnimateOnScroll", category: "Diagrams", variants: 1, render: () => (
    <AnimateOnScroll preset="fadeUp">
      <div className="text-xs font-semibold text-center" style={{ color: "var(--s-text)" }}>Fade up on scroll</div>
    </AnimateOnScroll>
  )},
];

const CELL_STYLE: React.CSSProperties = {
  minHeight: 120,
  padding: "12px 12px 8px",
  border: "1px solid var(--s-border-muted)",
  background: "var(--s-surface)",
  transition: "border-color 200ms ease, background 200ms ease",
};

export function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = CELLS.filter((cell) => {
    if (activeCategory !== "All" && cell.category !== activeCategory) return false;
    if (search && !cell.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = activeCategory === "All"
    ? [...new Set(filtered.map((c) => c.category))]
    : [activeCategory];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search components..."
          className="h-8 text-xs flex-1 max-w-[288px]"
          iconLeft={<Search size={12} style={{ color: "var(--s-text-muted)" }} />}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <div className="flex gap-0 border-b border-[var(--s-border)] overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`bg-transparent border-0 px-3 py-1.5 text-[11px] font-[family-name:var(--s-font-mono)] tracking-[0.02em] cursor-pointer transition-colors shrink-0 ${
                activeCategory === cat
                  ? "text-[var(--s-text)] border-b-2 border-b-[var(--s-primary)]"
                  : "text-[var(--s-text-muted)] border-b-2 border-b-transparent hover:text-[var(--s-text)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="font-[family-name:var(--s-font-mono)] text-[11px] text-[var(--s-text-muted)] mb-6">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""}
        {search && <> matching &ldquo;{search}&rdquo;</>}
      </div>

      {categories.map((cat) => {
        const catCells = filtered.filter((c) => c.category === cat);
        if (catCells.length === 0) return null;
        return (
          <div key={cat} className="mb-12">
            {activeCategory === "All" && (
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--s-text-muted)]">
                  {cat}
                </span>
                <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-subtle)]">
                  {catCells.length} components
                </span>
              </div>
            )}
            <TechFrame variant="brackets" extend={12} opacity={0.2} padding={4}>
              <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(192px, 1fr))" }}>
                {catCells.map((cell) => (
                  <div
                    key={cell.name}
                    className="group flex flex-col"
                    style={CELL_STYLE}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--s-border-strong)";
                      e.currentTarget.style.background = "var(--s-surface-elevated)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--s-border-muted)";
                      e.currentTarget.style.background = "var(--s-surface)";
                    }}
                  >
                    <div className="flex items-center justify-center flex-1 w-full">
                      {cell.render()}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 pt-1.5" style={{ borderTop: "1px solid var(--s-border-muted)" }}>
                      <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-muted)] leading-none flex-1">{cell.name}</span>
                      {cell.variants && (
                        <span className="font-[family-name:var(--s-font-mono)] text-[9px] text-[var(--s-text-subtle)] leading-none">{cell.variants}v</span>
                      )}
                      <a
                        href={`/docs/components/${cell.name.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1"
                        aria-label={`${cell.name} docs`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M4.5 2.5h5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TechFrame>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <span className="font-[family-name:var(--s-font-mono)] text-sm text-[var(--s-text-muted)]">No components match your search.</span>
        </div>
      )}
    </div>
  );
}
