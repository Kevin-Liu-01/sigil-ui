/**
 * @sigil-ui/primitives
 *
 * Headless behavior primitives for Sigil UI.
 * Core components use Radix UI for accessible, composable patterns.
 * Extended primitives use Base UI for components Radix doesn't offer.
 */

/* ========================================================================== */
/*  Radix UI — original 28 core primitives                                    */
/* ========================================================================== */

export {
  Accordion as AccordionPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
  AccordionContent as AccordionContentPrimitive,
} from "@radix-ui/react-accordion";

export {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
  AlertDialogPortal as AlertDialogPortalPrimitive,
  AlertDialogOverlay as AlertDialogOverlayPrimitive,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogAction as AlertDialogActionPrimitive,
  AlertDialogCancel as AlertDialogCancelPrimitive,
} from "@radix-ui/react-alert-dialog";

export {
  AspectRatio as AspectRatioPrimitive,
} from "@radix-ui/react-aspect-ratio";

export {
  Avatar as AvatarPrimitive,
  AvatarImage as AvatarImagePrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
} from "@radix-ui/react-avatar";

export {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
} from "@radix-ui/react-checkbox";

export {
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
  CollapsibleContent as CollapsibleContentPrimitive,
} from "@radix-ui/react-collapsible";

export {
  ContextMenu as ContextMenuPrimitive,
  ContextMenuTrigger as ContextMenuTriggerPrimitive,
  ContextMenuContent as ContextMenuContentPrimitive,
  ContextMenuItem as ContextMenuItemPrimitive,
  ContextMenuSeparator as ContextMenuSeparatorPrimitive,
} from "@radix-ui/react-context-menu";

export {
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  DialogPortal as DialogPortalPrimitive,
  DialogOverlay as DialogOverlayPrimitive,
  DialogContent as DialogContentPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogClose as DialogClosePrimitive,
} from "@radix-ui/react-dialog";

export {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuTrigger as DropdownMenuTriggerPrimitive,
  DropdownMenuContent as DropdownMenuContentPrimitive,
  DropdownMenuItem as DropdownMenuItemPrimitive,
  DropdownMenuSeparator as DropdownMenuSeparatorPrimitive,
} from "@radix-ui/react-dropdown-menu";

export {
  HoverCard as HoverCardPrimitive,
  HoverCardTrigger as HoverCardTriggerPrimitive,
  HoverCardContent as HoverCardContentPrimitive,
} from "@radix-ui/react-hover-card";

export { Label as LabelPrimitive } from "@radix-ui/react-label";

export {
  Menubar as MenubarPrimitive,
  MenubarMenu as MenubarMenuPrimitive,
  MenubarTrigger as MenubarTriggerPrimitive,
  MenubarContent as MenubarContentPrimitive,
  MenubarItem as MenubarItemPrimitive,
  MenubarSeparator as MenubarSeparatorPrimitive,
} from "@radix-ui/react-menubar";

export {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuList as NavigationMenuListPrimitive,
  NavigationMenuItem as NavigationMenuItemPrimitive,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
} from "@radix-ui/react-navigation-menu";

export {
  Popover as PopoverPrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
  PopoverContent as PopoverContentPrimitive,
} from "@radix-ui/react-popover";

export {
  Progress as ProgressPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
} from "@radix-ui/react-progress";

export {
  RadioGroup as RadioGroupPrimitive,
  RadioGroupItem as RadioGroupItemPrimitive,
} from "@radix-ui/react-radio-group";

export {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
  ScrollAreaScrollbar as ScrollAreaScrollbarPrimitive,
  ScrollAreaThumb as ScrollAreaThumbPrimitive,
} from "@radix-ui/react-scroll-area";

export {
  Select as SelectPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
  SelectContent as SelectContentPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectLabel as SelectLabelPrimitive,
} from "@radix-ui/react-select";

export { Separator as SeparatorPrimitive } from "@radix-ui/react-separator";

export {
  Slider as SliderPrimitive,
  SliderTrack as SliderTrackPrimitive,
  SliderRange as SliderRangePrimitive,
  SliderThumb as SliderThumbPrimitive,
} from "@radix-ui/react-slider";

export { Slot } from "@radix-ui/react-slot";

export {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
} from "@radix-ui/react-switch";

export {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
  TabsContent as TabsContentPrimitive,
} from "@radix-ui/react-tabs";

export {
  ToastProvider as ToastProviderPrimitive,
  ToastViewport as ToastViewportPrimitive,
  Toast as ToastPrimitive,
  ToastTitle as ToastTitlePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastAction as ToastActionPrimitive,
} from "@radix-ui/react-toast";

export {
  Toggle as TogglePrimitive,
} from "@radix-ui/react-toggle";

export {
  ToggleGroup as ToggleGroupPrimitive,
  ToggleGroupItem as ToggleGroupItemPrimitive,
} from "@radix-ui/react-toggle-group";

export {
  Toolbar as ToolbarPrimitive,
  ToolbarButton as ToolbarButtonPrimitive,
  ToolbarSeparator as ToolbarSeparatorPrimitive,
  ToolbarToggleGroup as ToolbarToggleGroupPrimitive,
  ToolbarToggleItem as ToolbarToggleItemPrimitive,
  ToolbarLink as ToolbarLinkPrimitive,
} from "@radix-ui/react-toolbar";

export {
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipProvider as TooltipProviderPrimitive,
} from "@radix-ui/react-tooltip";

/* ========================================================================== */
/*  Base UI — extended primitives (not available in Radix)                     */
/* ========================================================================== */

export { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";

export { Button as ButtonBasePrimitive } from "@base-ui/react/button";

export { CheckboxGroup as CheckboxGroupBasePrimitive } from "@base-ui/react/checkbox-group";

export { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

export { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

export { Field as FieldPrimitive } from "@base-ui/react/field";

export { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";

export { Form as FormBasePrimitive } from "@base-ui/react/form";

export { Input as InputBasePrimitive } from "@base-ui/react/input";

export { Meter as MeterPrimitive } from "@base-ui/react/meter";

export { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";

export { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";

export { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
