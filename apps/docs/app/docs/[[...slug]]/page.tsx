import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";

import {
  ComponentPreview,
  AccentActive, AccentCTA, AccessibleIcon, Accordion, AccordionContent, AccordionItem,
  AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  AlertTitle, AnimateOnMount, AnimateOnScroll, AnnouncementBar, AppShell, ArchitectureDiagram,
  Aside, AspectRatio, Avatar, AvatarGroup, Badge, Banner,
  BeforeAfterDiagram, BentoSection, Blockquote, BlogGrid, BlogHeader, BlueprintGridSection,
  BlurFade, BorderStack, Box, Box3D, Box3DGrid, BrailleSpinner,
  Breadcrumb, Button, ButtonGroup, CTA, CTASection, Calendar,
  CalendarDayButton, CapabilityGrid, Card, Card3D, CardCell, CardContent,
  CardDescription, CardFooter, CardHeader, CardTitle, Carousel, CarouselContent,
  CarouselItem, CarouselNext, CarouselPrevious, Center, ChartContainer, ChartLegend,
  ChartTooltip, Checkbox, CheckboxGroup, CheckboxGroupItem, CircularProgress, Clipboard,
  CodeBlock, CodeShowcaseSection, Collapsible, CollapsibleContent, CollapsibleTrigger, ColorPicker,
  Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, ComparisonSection, ComparisonTable, Container,
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, CostCalculator, Cross,
  CrossHatch, DataTable, DatePicker, DateRangePicker, DensityText, Diagonal, Diagram,
  DiagramConnector, DiagramLabel, DiagramNode, Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Diamond,
  DirectionProvider, Divider, Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EcosystemDiagram, Editable, Empty,
  ExplodedView, FAQSection, FadeIn, FeatureFrame, FeatureFrameSection, FeatureGrid,
  FeatureMiniDiagram, FeatureSection, FeatureShowcaseSection, FeaturedGrid, Field, FieldDescription,
  FieldError, FieldLabel, Fieldset, FileUpload, Flex, FloatingUI,
  FlowDiagram, Footer, FooterSection, Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage, Frame, FrostedPanel,
  GapPixelCell, GapPixelGrid, GlobeDiagram, GradientBannerSection, GradientText, GrainGradient,
  Gutter, H1, H2, H3, H4, HRule,
  Header, Hero, HeroSection, Hexagon, HoverCard, HoverCardContent,
  HoverCardTrigger, HubRouteDiagram, HubSpokeDiagram, InlineCode, Input, InputGroup,
  InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, InputOTP,
  InputOTPGroup, InputOTPSeparator, InputOTPSlot, InstallSection, IsolationStack, IsometricCylinder,
  IsometricPrism, IsometricScene, IsometricStackDiagram, IsometricView, Item, ItemGroup,
  KPI, Kbd, KbdGroup, Label, Large, LargeTextSection,
  LayoutControls, Lead, LetterPullUp, LoadingSpinner, LogoBar, LogoCloudSection,
  Main, Margin, Marquee, Menubar, MenubarContent, MenubarItem,
  MenubarMenu, MenubarSeparator, MenubarTrigger, MermaidDiagram, Meter, MonoLabel,
  Muted, NativeSelect, Navbar, NavbarActions, NavbarLinks, NavbarLogo,
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  NewsletterSection, NumberField, NumberTicker, OrbitDiagram, PageGrid, PageShell,
  Pagination, Panel, PanelHead, Paragraph, ParallaxLayer, PasswordInput,
  Pattern, PipelineDiagram, PlatformHubDiagram, Popover, PopoverContent, PopoverTrigger,
  PreviewCard, PreviewCardContent, PreviewCardTrigger, Pricing, PricingTiers, Progress,
  Pulse, RadioGroup, RadioGroupItem, RatingGroup, ResizableHandle, ResizablePanel,
  ResizablePanelGroup, Ripple, SankeyDiagram, ScaleIn, ScrollArea, ScrollProgress,
  Section, SectionDivider, SectionHeading, SegmentedControl, SegmentedControlItem,
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator,
  SelectTrigger, SelectValue, Separator, Shape, Sheet, SheetContent,
  SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Sidebar, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarItem, SigilFrame,
  SigilFullBleed, SigilGrid, SigilGridCell, SigilGutter, SigilNavbar, SigilPageGrid,
  SigilSection, SignaturePad, SimpleGrid, Skeleton, SlideIn, Slider,
  Small, SocialIcons, Sonner, Spacer, SplitButton, Stack,
  StackDiagram, Stagger, StatePersistence, StatsSection, Stepper, StreamFlowDiagram,
  Switch, Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger,
  TabularValue, TagsInput, TeamSection, Terminal, Tessellation, TestimonialCard,
  TestimonialsSection, TextReveal, Textarea, Timeline, TimelineSection, Toaster,
  Toggle, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarButton, ToolbarLink,
  ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem, Tooltip, TooltipProvider, TreeView,
  Triangle, TypeWriter, UnitPricing, VisuallyHidden, VoronoiBento, VoronoiCell,
  WaterfallChart, WordRotate,
  RadarChart, TreeDiagram, GanttChart, FunnelChart, MatrixDiagram,
  DependencyGraph, DonutChart, NetworkGraph, HeatmapGrid, VennDiagram,
  PricingTable, ChangelogTable, StatusTable, SpecTable, LeaderboardTable,
  BarChart, PieChart, LineChart, AreaChart, CommitGrid, SparkLine,
  UsageGauge, BillingChart, ProgressRing, MetricCard, ActivityFeed, MiniBarList,
} from "@/components/mdx-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- MDX component map
const mdxComponents: Record<string, any> = {
  ...defaultMdxComponents,
  ComponentPreview,
  AccentActive, AccentCTA, AccessibleIcon, Accordion, AccordionContent, AccordionItem,
  AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  AlertTitle, AnimateOnMount, AnimateOnScroll, AnnouncementBar, AppShell, ArchitectureDiagram,
  Aside, AspectRatio, Avatar, AvatarGroup, Badge, Banner,
  BeforeAfterDiagram, BentoSection, Blockquote, BlogGrid, BlogHeader, BlueprintGridSection,
  BlurFade, BorderStack, Box, Box3D, Box3DGrid, BrailleSpinner,
  Breadcrumb, Button, ButtonGroup, CTA, CTASection, Calendar,
  CalendarDayButton, CapabilityGrid, Card, Card3D, CardCell, CardContent,
  CardDescription, CardFooter, CardHeader, CardTitle, Carousel, CarouselContent,
  CarouselItem, CarouselNext, CarouselPrevious, Center, ChartContainer, ChartLegend,
  ChartTooltip, Checkbox, CheckboxGroup, CheckboxGroupItem, CircularProgress, Clipboard,
  CodeBlock, CodeShowcaseSection, Collapsible, CollapsibleContent, CollapsibleTrigger, ColorPicker,
  Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, ComparisonSection, ComparisonTable, Container,
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, CostCalculator, Cross,
  CrossHatch, DataTable, DatePicker, DateRangePicker, DensityText, Diagonal, Diagram,
  DiagramConnector, DiagramLabel, DiagramNode, Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Diamond,
  DirectionProvider, Divider, Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EcosystemDiagram, Editable, Empty,
  ExplodedView, FAQSection, FadeIn, FeatureFrame, FeatureFrameSection, FeatureGrid,
  FeatureMiniDiagram, FeatureSection, FeatureShowcaseSection, FeaturedGrid, Field, FieldDescription,
  FieldError, FieldLabel, Fieldset, FileUpload, Flex, FloatingUI,
  FlowDiagram, Footer, FooterSection, Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage, Frame, FrostedPanel,
  GapPixelCell, GapPixelGrid, GlobeDiagram, GradientBannerSection, GradientText, GrainGradient,
  Gutter, H1, H2, H3, H4, HRule,
  Header, Hero, HeroSection, Hexagon, HoverCard, HoverCardContent,
  HoverCardTrigger, HubRouteDiagram, HubSpokeDiagram, InlineCode, Input, InputGroup,
  InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, InputOTP,
  InputOTPGroup, InputOTPSeparator, InputOTPSlot, InstallSection, IsolationStack, IsometricCylinder,
  IsometricPrism, IsometricScene, IsometricStackDiagram, IsometricView, Item, ItemGroup,
  KPI, Kbd, KbdGroup, Label, Large, LargeTextSection,
  LayoutControls, Lead, LetterPullUp, LoadingSpinner, LogoBar, LogoCloudSection,
  Main, Margin, Marquee, Menubar, MenubarContent, MenubarItem,
  MenubarMenu, MenubarSeparator, MenubarTrigger, MermaidDiagram, Meter, MonoLabel,
  Muted, NativeSelect, Navbar, NavbarActions, NavbarLinks, NavbarLogo,
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  NewsletterSection, NumberField, NumberTicker, OrbitDiagram, PageGrid, PageShell,
  Pagination, Panel, PanelHead, Paragraph, ParallaxLayer, PasswordInput,
  Pattern, PipelineDiagram, PlatformHubDiagram, Popover, PopoverContent, PopoverTrigger,
  PreviewCard, PreviewCardContent, PreviewCardTrigger, Pricing, PricingTiers, Progress,
  Pulse, RadioGroup, RadioGroupItem, RatingGroup, ResizableHandle, ResizablePanel,
  ResizablePanelGroup, Ripple, SankeyDiagram, ScaleIn, ScrollArea, ScrollProgress,
  Section, SectionDivider, SectionHeading, SegmentedControl, SegmentedControlItem,
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator,
  SelectTrigger, SelectValue, Separator, Shape, Sheet, SheetContent,
  SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Sidebar, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarItem, SigilFrame,
  SigilFullBleed, SigilGrid, SigilGridCell, SigilGutter, SigilNavbar, SigilPageGrid,
  SigilSection, SignaturePad, SimpleGrid, Skeleton, SlideIn, Slider,
  Small, SocialIcons, Sonner, Spacer, SplitButton, Stack,
  StackDiagram, Stagger, StatePersistence, StatsSection, Stepper, StreamFlowDiagram,
  Switch, Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger,
  TabularValue, TagsInput, TeamSection, Terminal, Tessellation, TestimonialCard,
  TestimonialsSection, TextReveal, Textarea, Timeline, TimelineSection, Toaster,
  Toggle, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarButton, ToolbarLink,
  ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem, Tooltip, TooltipProvider, TreeView,
  Triangle, TypeWriter, UnitPricing, VisuallyHidden, VoronoiBento, VoronoiCell,
  WaterfallChart, WordRotate,
  RadarChart, TreeDiagram, GanttChart, FunnelChart, MatrixDiagram,
  DependencyGraph, DonutChart, NetworkGraph, HeatmapGrid, VennDiagram,
  PricingTable, ChangelogTable, StatusTable, SpecTable, LeaderboardTable,
  BarChart, PieChart, LineChart, AreaChart, CommitGrid, SparkLine,
  UsageGauge, BillingChart, ProgressRing, MetricCard, ActivityFeed, MiniBarList,
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fumadocs type drift
  const data = page.data as any;
  const MDX = data.body;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
