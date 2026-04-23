// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------
export { cn } from "./utils";

// ---------------------------------------------------------------------------
// Sound
// ---------------------------------------------------------------------------
export {
  SigilSoundContext,
  useSigilSound,
  type SigilSoundName,
  type SigilSoundContextValue,
} from "./sound-context";

// ---------------------------------------------------------------------------
// Layout primitives
// ---------------------------------------------------------------------------
export { Stack, type StackProps } from "./layout/Stack";
export { SigilGrid, SigilGridCell, type SigilGridProps, type SigilGridCellProps } from "./layout/Grid";
export { Section, type SectionProps } from "./layout/Section";
export { Frame, type FrameProps } from "./layout/Frame";
export { PageGrid, type PageGridProps } from "./layout/PageGrid";
export { Margin, type MarginProps } from "./layout/Margin";
export { Gutter, type GutterProps } from "./layout/Gutter";
export {
  SigilPageGrid, SigilFrame, SigilGutter, useIsInsidePageGrid, usePageGridConfig,
  type SigilPageGridProps, type SigilFrameProps, type PageGridConfig, type SigilGutterProps,
} from "./layout/SigilPageGrid";
export { SigilSection, type SigilSectionProps } from "./layout/SigilSection";
export { SigilNavbar, type SigilNavbarProps } from "./layout/SigilNavbar";
export { Divider, type DividerProps } from "./layout/Divider";
export { HRule, type HRuleProps } from "./layout/HRule";
export { VoronoiBento, VoronoiCell, type VoronoiBentoProps } from "./layout/VoronoiBento";
export { LayoutControls, type LayoutControlsProps } from "./layout/LayoutControls";
export { SectionDivider, type SectionDividerProps, type SectionDividerPattern } from "./layout/SectionDivider";

// ---------------------------------------------------------------------------
// Core UI
// ---------------------------------------------------------------------------
export { Button, type ButtonProps } from "./ui/Button";
export { Badge, type BadgeProps } from "./ui/Badge";
export {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  type CardProps,
} from "./ui/Card";
export { Label, type LabelProps } from "./ui/Label";
export { Input, type InputProps } from "./ui/Input";
export { Textarea, type TextareaProps } from "./ui/Textarea";
export {
  Select, SelectTrigger, SelectContent, SelectItem,
  SelectGroup, SelectLabel, SelectValue, SelectSeparator,
  type SelectProps, type SelectTriggerProps,
} from "./ui/Select";
export { Checkbox, type CheckboxProps } from "./ui/Checkbox";
export { Switch, type SwitchProps } from "./ui/Switch";
export { Slider, type SliderProps } from "./ui/Slider";
export { Progress, type ProgressProps } from "./ui/Progress";
export { Separator, type SeparatorProps } from "./ui/Separator";
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps } from "./ui/Avatar";
export { Skeleton, type SkeletonProps } from "./ui/Skeleton";
export {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from "./ui/Table";
export {
  Tabs, TabsList, TabsTrigger, TabsContent,
  type TabsProps, type TabsTriggerProps, type TabsContentProps,
} from "./ui/Tabs";
export {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  type AccordionProps, type AccordionItemProps, type AccordionTriggerProps, type AccordionContentProps,
} from "./ui/Accordion";
export { Tooltip, TooltipProvider, type TooltipProps } from "./ui/Tooltip";
export { ScrollArea, type ScrollAreaProps } from "./ui/ScrollArea";
export { KPI, type KPIProps } from "./ui/KPI";
export { Terminal, type TerminalProps } from "./ui/Terminal";
export { CodeBlock, type CodeBlockProps } from "./ui/CodeBlock";
export { LoadingSpinner, SPINNER_NAMES, type LoadingSpinnerProps, type SpinnerVariant } from "./ui/LoadingSpinner";
export {
  Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage,
  type FormProps, type FormFieldProps, type FormItemProps, type FormLabelProps,
  type FormControlProps, type FormDescriptionProps, type FormMessageProps,
} from "./ui/Form";
export { Combobox, type ComboboxProps, type ComboboxOption } from "./ui/Combobox";
export { Calendar, type CalendarProps } from "./ui/Calendar";
export {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  type CarouselProps, type CarouselContentProps, type CarouselItemProps, type CarouselButtonProps,
} from "./ui/Carousel";
export { Alert, AlertTitle, AlertDescription, type AlertProps, type AlertTitleProps, type AlertDescriptionProps, type AlertVariant, type AlertFill } from "./ui/Alert";
export { Collapsible, CollapsibleTrigger, CollapsibleContent, type CollapsibleContentProps } from "./ui/Collapsible";
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from "./ui/RadioGroup";
export { Toggle, type ToggleProps } from "./ui/Toggle";
export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps, type ToggleGroupItemProps } from "./ui/ToggleGroup";
export { DatePicker, type DatePickerProps } from "./ui/DatePicker";
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./ui/InputOTP";
export { NumberField, type NumberFieldProps } from "./ui/NumberField";
export { Meter, type MeterProps } from "./ui/Meter";
export { AspectRatio, type AspectRatioProps } from "./ui/AspectRatio";
export { DataTable, type DataTableProps } from "./ui/DataTable";
export { ChartContainer, ChartTooltip, ChartLegend } from "./ui/Chart";
export { Field, Fieldset, FieldLabel, FieldDescription, FieldError } from "./ui/Field";
export { CheckboxGroup, CheckboxGroupItem, type CheckboxGroupProps } from "./ui/CheckboxGroup";
export { Stepper, type StepperProps, type StepperStepConfig } from "./ui/Stepper";
export { SplitButton, type SplitButtonProps } from "./ui/SplitButton";
export {
  InputGroup, InputGroupInput, InputGroupTextarea, InputGroupAddon, InputGroupButton, InputGroupText,
  type InputGroupProps, type InputGroupInputProps, type InputGroupTextareaProps, type InputGroupAddonProps, type InputGroupButtonProps,
} from "./ui/InputGroup";
export { ButtonGroup, type ButtonGroupProps } from "./ui/ButtonGroup";
export { Kbd, KbdGroup, type KbdProps, type KbdGroupProps } from "./ui/Kbd";
export { Empty, type EmptyProps } from "./ui/Empty";
export { NativeSelect, type NativeSelectProps } from "./ui/NativeSelect";
export {
  H1, H2, H3, H4, Paragraph, Lead, Large, Small, Muted, InlineCode, Blockquote,
} from "./ui/Typography";
export { DirectionProvider, useDirection, type DirectionProviderProps } from "./ui/Direction";
export { Clipboard, type ClipboardProps } from "./ui/Clipboard";
export { TagsInput, type TagsInputProps } from "./ui/TagsInput";
export { ColorPicker, type ColorPickerProps } from "./ui/ColorPicker";
export { FileUpload, type FileUploadProps } from "./ui/FileUpload";
export { TreeView, type TreeViewProps, type TreeNode } from "./ui/TreeView";
export { Editable, type EditableProps } from "./ui/Editable";
export { RatingGroup, type RatingGroupProps } from "./ui/RatingGroup";
export { SignaturePad, type SignaturePadProps } from "./ui/SignaturePad";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export {
  Navbar, NavbarLogo, NavbarLinks, NavbarActions,
  type NavbarProps, type NavbarLogoProps, type NavbarLinksProps, type NavbarActionsProps,
} from "./navigation/Navbar";
export { Footer, type FooterProps, type FooterColumn } from "./navigation/Footer";
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from "./navigation/Breadcrumb";
export { Pagination, type PaginationProps } from "./navigation/Pagination";
export {
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem, SidebarGroup, SidebarGroupLabel,
  type SidebarProps, type SidebarGroupProps, type SidebarGroupLabelProps, type SidebarItemProps,
} from "./navigation/Sidebar";
export {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "./navigation/NavigationMenu";
export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator,
} from "./navigation/Menubar";
export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem, ToolbarLink, type ToolbarProps } from "./navigation/Toolbar";
export { SocialIcons, type SocialIconsProps, type SocialLink } from "./navigation/SocialIcons";

// ---------------------------------------------------------------------------
// Overlays
// ---------------------------------------------------------------------------
export {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
  type DialogProps, type DialogTriggerProps, type DialogContentProps, type DialogCloseProps,
} from "./overlays/Dialog";
export {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  type SheetProps, type SheetTriggerProps, type SheetContentProps,
} from "./overlays/Sheet";
export {
  Popover, PopoverTrigger, PopoverContent,
  type PopoverProps, type PopoverTriggerProps, type PopoverContentProps,
} from "./overlays/Popover";
export { toast, Toaster, type ToasterProps } from "./overlays/Toast";
export {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
  type AlertDialogContentProps,
} from "./overlays/AlertDialog";
export {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandDialog,
} from "./overlays/Command";
export {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator,
  ContextMenuCheckboxItem, ContextMenuLabel, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from "./overlays/ContextMenu";
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "./overlays/DropdownMenu";
export {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose,
} from "./overlays/Drawer";
export { HoverCard, HoverCardTrigger, HoverCardContent } from "./overlays/HoverCard";
export { PreviewCard, PreviewCardTrigger, PreviewCardContent } from "./overlays/PreviewCard";

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------
export { Shape, type ShapeProps, type ShapeVariant, type ShapeSize } from "./shapes/Shape";
export { Diamond, type DiamondProps } from "./shapes/Diamond";
export { Hexagon, type HexagonProps } from "./shapes/Hexagon";
export { Triangle, type TriangleProps } from "./shapes/Triangle";
export { Diagonal, type DiagonalProps } from "./shapes/Diagonal";

// ---------------------------------------------------------------------------
// 3D / Animated
// ---------------------------------------------------------------------------
export { Box3D, type Box3DProps } from "./3d/Box3D";
export { Box3DGrid, type Box3DGridProps, type Box3DGridItem } from "./3d/Box3DGrid";
export { Card3D, type Card3DProps } from "./3d/Card3D";
export { FloatingUI, type FloatingUIProps } from "./3d/FloatingUI";
export { IsometricView, type IsometricViewProps } from "./3d/IsometricView";

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------
export { Diagram, type DiagramProps } from "./diagrams/Diagram";
export { ExplodedView, type ExplodedViewProps, type ExplodedViewLayer } from "./diagrams/ExplodedView";
export { FlowDiagram, type FlowDiagramProps, type FlowNode, type FlowConnection } from "./diagrams/FlowDiagram";
export { Timeline, type TimelineProps, type TimelineEntry } from "./diagrams/Timeline";
export { ComparisonTable, type ComparisonTableProps, type ComparisonFeature } from "./diagrams/ComparisonTable";
export { ArchitectureDiagram, type ArchitectureDiagramProps, type ArchitectureLayer } from "./diagrams/ArchitectureDiagram";

// ---------------------------------------------------------------------------
// Marketing
// ---------------------------------------------------------------------------
export { Hero, type HeroProps, type HeroAction } from "./marketing/Hero";
export { FeatureFrame, type FeatureFrameProps } from "./marketing/FeatureFrame";
export { Pricing, type PricingProps } from "./marketing/Pricing";
export { CTA, type CTAProps, type CTAAction } from "./marketing/CTA";
export { LogoBar, type LogoBarProps, type LogoBarItem } from "./marketing/LogoBar";
export { TestimonialCard, type TestimonialCardProps } from "./marketing/TestimonialCard";
export { AnnouncementBar, type AnnouncementBarProps } from "./marketing/AnnouncementBar";
export { PricingTiers, type PricingTiersProps, type PricingTier } from "./marketing/PricingTiers";
export { UnitPricing, type UnitPricingProps, type PricingUnit } from "./marketing/UnitPricing";
export { CostCalculator, type CostCalculatorProps, type CostSlider, type CostEstimate } from "./marketing/CostCalculator";
export { BlogGrid, type BlogGridProps, type BlogPost } from "./marketing/BlogGrid";
export { BlogHeader, type BlogHeaderProps } from "./marketing/BlogHeader";
export { FeatureGrid, type FeatureGridProps, type FeatureRow } from "./marketing/FeatureGrid";

// ---------------------------------------------------------------------------
// Patterns
// ---------------------------------------------------------------------------
export { Pattern, type PatternProps, type PatternVariant } from "./patterns/Pattern";
export { Cross, type CrossProps } from "./patterns/Cross";
export { Tessellation, type TessellationProps, type TessellationVariant } from "./patterns/Tessellation";

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------
export { gsap, ScrollTrigger, PRESETS, animateElement, type AnimationPreset, type PresetName } from "./animation/animate";
export { useSigilAnimate, type UseSigilAnimateConfig } from "./animation/useSigilAnimate";
export { AnimateOnScroll, type AnimateOnScrollProps } from "./animation/AnimateOnScroll";
