"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { SearchIcon, UploadIcon } from "lucide-react";
import { cn } from "../utils";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Combobox, type ComboboxOption } from "./Combobox";
import { DateRangePicker, type DateRange } from "./DatePicker";
import { Input } from "./Input";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "../overlays/Popover";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Slider, type SliderProps } from "./Slider";
import { Switch } from "./Switch";
import { TagsInput, type TagsInputProps } from "./TagsInput";

export const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function SearchInput(
  { className, ...props },
  ref,
) {
  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--s-text-muted)]" />
      <Input ref={ref} type="search" className={cn("pl-9", className)} {...props} />
    </div>
  );
});

export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(function CurrencyInput(
  { currency = "$", className, ...props },
  ref,
) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--s-text-muted)]">{currency}</span>
      <Input ref={ref} inputMode="decimal" className={cn("pl-7 tabular-nums", className)} {...props} />
    </div>
  );
});

export const PhoneInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function PhoneInput(
  { className, ...props },
  ref,
) {
  return <Input ref={ref} type="tel" inputMode="tel" autoComplete="tel" className={className} {...props} />;
});

export const TimePicker = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(
  function TimePicker({ className, ...props }, ref) {
    return <Input ref={ref} type="time" className={cn("tabular-nums", className)} {...props} />;
  },
);

export const DateTimePicker = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(
  function DateTimePicker({ className, ...props }, ref) {
    return <Input ref={ref} type="datetime-local" className={cn("tabular-nums", className)} {...props} />;
  },
);

export interface DateRangeFieldProps extends ComponentPropsWithoutRef<typeof DateRangePicker> {
  label?: ReactNode;
  description?: ReactNode;
}

export const DateRangeField = forwardRef<HTMLButtonElement, DateRangeFieldProps>(function DateRangeField(
  { label, description, className, ...props },
  ref,
) {
  return (
    <div className="grid gap-2">
      {label && <Label>{label}</Label>}
      <DateRangePicker ref={ref} className={cn("w-full", className)} {...props} />
      {description && <p className="text-xs text-[var(--s-text-muted)]">{description}</p>}
    </div>
  );
});

export interface MultiSelectProps extends Omit<ComponentPropsWithoutRef<"button">, "onChange" | "value"> {
  options: ComboboxOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(function MultiSelect(
  { options, value = [], onValueChange, placeholder = "Select options", className, ...props },
  ref,
) {
  const selected = options.filter((option) => value.includes(option.value));
  const toggle = (optionValue: string) => {
    onValueChange?.(
      value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue],
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-[var(--s-radius-input,var(--s-radius-md,6px))] border border-[var(--s-border)] bg-[var(--s-background)] px-3 py-2 text-left text-sm",
            className,
          )}
          {...props}
        >
          {selected.length ? selected.map((item) => (
            <span key={item.value} className="rounded-[var(--s-radius-sm,4px)] bg-[var(--s-surface)] px-2 py-0.5 text-xs">
              {item.label}
            </span>
          )) : <span className="text-[var(--s-text-muted)]">{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => toggle(option.value)}
            className={cn(
              "flex w-full items-center gap-2 rounded-[var(--s-radius-sm,4px)] px-2 py-2 text-left text-sm",
              "hover:bg-[var(--s-surface)] disabled:opacity-50",
            )}
          >
            <Checkbox checked={value.includes(option.value)} tabIndex={-1} aria-hidden />
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
});

export interface AutocompleteProps extends ComponentPropsWithoutRef<typeof Combobox> {}

export const Autocomplete = Combobox;

export interface CreatableSelectProps extends AutocompleteProps {
  onCreate?: (value: string) => void;
  createLabel?: string;
}

export function CreatableSelect({ options, onCreate, createLabel = "Create", ...props }: CreatableSelectProps) {
  const [items, setItems] = useState(options);
  return (
    <div className="grid gap-2">
      <Combobox options={items} {...props} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const value = window.prompt(`${createLabel}:`);
          if (!value) return;
          setItems((prev) => [...prev, { value, label: value }]);
          onCreate?.(value);
        }}
      >
        {createLabel}
      </Button>
    </div>
  );
}

export interface AsyncSelectProps extends Omit<AutocompleteProps, "options"> {
  loadOptions: (query: string) => Promise<ComboboxOption[]>;
}

export function AsyncSelect({ loadOptions, searchPlaceholder = "Search...", ...props }: AsyncSelectProps) {
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  useEffect(() => {
    let active = true;
    loadOptions("").then((next) => {
      if (active) setOptions(next);
    });
    return () => {
      active = false;
    };
  }, [loadOptions]);
  return <Combobox options={options} searchPlaceholder={searchPlaceholder} {...props} />;
}

export const SegmentedTabs = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SegmentedTabs(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="segmented-tabs"
      className={cn("inline-flex rounded-[var(--s-radius-md,8px)] border border-[var(--s-border)] bg-[var(--s-surface)] p-1", className)}
      {...props}
    />
  );
});

export interface RangeSliderProps extends SliderProps {
  label?: ReactNode;
  valueLabel?: ReactNode;
}

export const RangeSlider = forwardRef<ComponentRef<typeof Slider>, RangeSliderProps>(function RangeSlider(
  { label, valueLabel, className, ...props },
  ref,
) {
  return (
    <div className={cn("grid gap-2", className)}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-[var(--s-text)]">{label}</span>
          <span className="text-[var(--s-text-muted)] tabular-nums">{valueLabel}</span>
        </div>
      )}
      <Slider ref={ref} {...props} />
    </div>
  );
});

export const DualRangeSlider = forwardRef<ComponentRef<typeof Slider>, SliderProps>(function DualRangeSlider(
  { defaultValue = [25, 75], ...props },
  ref,
) {
  return <Slider ref={ref} defaultValue={defaultValue} {...props} />;
});

export interface FileDropzoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const FileDropzone = forwardRef<HTMLInputElement, FileDropzoneProps>(function FileDropzone(
  { label = "Drop files here or browse", description, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--s-card-radius,10px)] border border-dashed border-[var(--s-border)] bg-[var(--s-surface)] p-6 text-center",
        className,
      )}
    >
      <UploadIcon className="size-5 text-[var(--s-text-muted)]" />
      <span className="text-sm font-medium text-[var(--s-text)]">{label}</span>
      {description && <span className="text-xs text-[var(--s-text-muted)]">{description}</span>}
      <input ref={ref} id={id} type="file" className="sr-only" {...props} />
    </label>
  );
});

export const ImageUpload = forwardRef<HTMLInputElement, FileDropzoneProps>(function ImageUpload(props, ref) {
  return <FileDropzone ref={ref} accept="image/*" {...props} />;
});

export interface AvatarUploadProps extends FileDropzoneProps {
  previewUrl?: string;
}

export const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps>(function AvatarUpload(
  { previewUrl, label = "Upload avatar", ...props },
  ref,
) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-16 overflow-hidden rounded-[var(--s-radius-full,9999px)] bg-[var(--s-surface)]">
        {previewUrl && <img src={previewUrl} alt="" className="size-full object-cover" />}
      </div>
      <ImageUpload ref={ref} label={label} className="min-h-20 flex-1" {...props} />
    </div>
  );
});

export const ColorField = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(
  function ColorField({ className, ...props }, ref) {
    return <Input ref={ref} type="color" className={cn("h-10 p-1", className)} {...props} />;
  },
);

export interface ComboboxFieldProps extends AutocompleteProps {
  label?: ReactNode;
  description?: ReactNode;
}

export function ComboboxField({ label, description, ...props }: ComboboxFieldProps) {
  return (
    <div className="grid gap-2">
      {label && <Label>{label}</Label>}
      <Combobox {...props} />
      {description && <p className="text-xs text-[var(--s-text-muted)]">{description}</p>}
    </div>
  );
}

export interface CheckboxCardProps extends Omit<ComponentPropsWithoutRef<"label">, "title"> {
  checked?: boolean;
  title?: ReactNode;
  description?: ReactNode;
}

export const CheckboxCard = forwardRef<HTMLLabelElement, CheckboxCardProps>(function CheckboxCard(
  { checked, title, description, children, className, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      data-checked={checked || undefined}
      className={cn(
        "flex cursor-pointer gap-3 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] bg-[var(--s-background)] p-4",
        "data-[checked=true]:border-[var(--s-primary)] data-[checked=true]:bg-[color-mix(in_oklch,var(--s-primary)_8%,transparent)]",
        className,
      )}
      {...props}
    >
      <Checkbox checked={checked} tabIndex={-1} aria-hidden />
      <span className="grid gap-1">
        {title && <span className="font-medium text-[var(--s-text)]">{title}</span>}
        {description && <span className="text-sm text-[var(--s-text-muted)]">{description}</span>}
        {children}
      </span>
    </label>
  );
});

export interface RadioCardProps extends Omit<ComponentPropsWithoutRef<"label">, "title"> {
  value: string;
  title?: ReactNode;
  description?: ReactNode;
}

export const RadioCard = forwardRef<HTMLLabelElement, RadioCardProps>(function RadioCard(
  { value, title, description, children, className, ...props },
  ref,
) {
  return (
    <label ref={ref} className={cn("flex cursor-pointer gap-3 rounded-[var(--s-card-radius,10px)] border border-[var(--s-border)] p-4", className)} {...props}>
      <RadioGroupItem value={value} />
      <span className="grid gap-1">
        {title && <span className="font-medium text-[var(--s-text)]">{title}</span>}
        {description && <span className="text-sm text-[var(--s-text-muted)]">{description}</span>}
        {children}
      </span>
    </label>
  );
});

export interface SwitchFieldProps extends Omit<ComponentPropsWithoutRef<typeof Switch>, "label"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const SwitchField = forwardRef<ComponentRef<typeof Switch>, SwitchFieldProps>(function SwitchField(
  { label, description, className, ...props },
  ref,
) {
  return (
    <label className={cn("flex items-center justify-between gap-4", className)}>
      <span className="grid gap-1">
        {label && <span className="text-sm font-medium text-[var(--s-text)]">{label}</span>}
        {description && <span className="text-xs text-[var(--s-text-muted)]">{description}</span>}
      </span>
      <Switch ref={ref} {...props} />
    </label>
  );
});

export const SliderField = RangeSlider;

export interface StepperFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const StepperField = forwardRef<HTMLInputElement, StepperFieldProps>(function StepperField(
  { onIncrement, onDecrement, className, ...props },
  ref,
) {
  return (
    <div className="flex w-full items-center">
      <Button type="button" variant="outline" size="icon" onClick={onDecrement} aria-label="Decrease">-</Button>
      <Input ref={ref} type="number" className={cn("mx-2 text-center tabular-nums", className)} {...props} />
      <Button type="button" variant="outline" size="icon" onClick={onIncrement} aria-label="Increase">+</Button>
    </div>
  );
});

export const TagsField = forwardRef<HTMLDivElement, TagsInputProps>(function TagsField(props, ref) {
  return <TagsInput ref={ref} {...props} />;
});

export interface CopyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onCopyValue?: (value: string) => void;
}

export const CopyInput = forwardRef<HTMLInputElement, CopyInputProps>(function CopyInput(
  { value, defaultValue, onCopyValue, className, ...props },
  ref,
) {
  const stringValue = String(value ?? defaultValue ?? "");
  return (
    <div className="flex gap-2">
      <Input ref={ref} value={value} defaultValue={defaultValue} className={className} {...props} />
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          void navigator.clipboard?.writeText(stringValue);
          onCopyValue?.(stringValue);
        }}
      >
        Copy
      </Button>
    </div>
  );
});

