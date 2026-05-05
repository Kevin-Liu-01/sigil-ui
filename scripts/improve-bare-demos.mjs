#!/usr/bin/env node
/**
 * Replace bare-demo `<X />` previews with richer examples that exercise the
 * component's actual props. Only touches files where the existing preview is
 * exactly `<X />` with no children.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "apps/web/content/docs/components");

/** Map slug -> richer preview body (replaces the entire <Component /> line). */
const REPLACEMENTS = {
  switch: `<div className="flex flex-col gap-3">
    <Switch label="Email notifications" defaultChecked />
    <Switch label="Push notifications" />
    <Switch label="SMS alerts" disabled />
  </div>`,
  checkbox: `<div className="flex flex-col gap-3">
    <Checkbox label="Subscribe to product updates" defaultChecked />
    <Checkbox label="Send weekly digest" />
    <Checkbox label="Beta features" disabled />
  </div>`,
  progress: `<div className="flex flex-col gap-3 w-full max-w-sm">
    <div className="flex items-center justify-between text-sm text-[var(--s-text-muted)]"><span>Uploading</span><span className="tabular-nums">68%</span></div>
    <Progress value={68} />
  </div>`,
  "circular-progress": `<div className="flex items-center gap-6">
    <CircularProgress value={25} />
    <CircularProgress value={50} />
    <CircularProgress value={75} />
    <CircularProgress value={100} />
  </div>`,
  meter: `<div className="flex flex-col gap-2 w-full max-w-sm">
    <Meter value={72} max={100} label="Storage" />
  </div>`,
  separator: `<div className="flex flex-col gap-3 w-full max-w-sm text-sm text-[var(--s-text)]">
    <span>Section A</span>
    <Separator />
    <span>Section B</span>
    <Separator />
    <span>Section C</span>
  </div>`,
  skeleton: `<div className="flex flex-col gap-3 w-full max-w-sm">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>`,
  "skeleton-card": `<div className="grid grid-cols-2 gap-3 w-full max-w-md">
    <SkeletonCard />
    <SkeletonCard />
  </div>`,
  "skeleton-table": `<SkeletonTable rows={4} columns={4} />`,
  "logo-bar": `<LogoBar
    items={[
      { name: "Vercel" },
      { name: "Linear" },
      { name: "Stripe" },
      { name: "Figma" },
      { name: "Notion" },
    ]}
  />`,
  "file-upload": `<FileUpload accept="image/*" maxSize={5_000_000} className="w-full max-w-md" />`,
  "color-picker": `<ColorPicker defaultValue="oklch(0.62 0.20 264)" />`,
  "split-button": `<SplitButton
    onClick={() => {}}
    items={[
      { label: "Save and continue", onSelect: () => {} },
      { label: "Save as draft", onSelect: () => {} },
      { label: "Discard changes", onSelect: () => {} },
    ]}
  >
    Save
  </SplitButton>`,
  "input-otp": `<InputOTP maxLength={6}>
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>`,
  "input-group": `<InputGroup className="w-full max-w-sm">
    <InputGroupAddon>$</InputGroupAddon>
    <InputGroupInput placeholder="0.00" />
    <InputGroupAddon>USD</InputGroupAddon>
  </InputGroup>`,
  "native-select": `<NativeSelect className="w-full max-w-xs" defaultValue="published">
    <option value="draft">Draft</option>
    <option value="review">In Review</option>
    <option value="published">Published</option>
    <option value="archived">Archived</option>
  </NativeSelect>`,
  item: `<ItemGroup className="w-full max-w-md">
    <Item title="Apollo" description="Active project, 3 contributors" />
    <Item title="Vega" description="Draft, 1 contributor" />
    <Item title="Cassia" description="Active, 5 contributors" />
  </ItemGroup>`,
  "braille-spinner": `<div className="flex items-center gap-6">
    <BrailleSpinner name="dots" />
    <BrailleSpinner name="line" />
    <BrailleSpinner name="bounce" />
  </div>`,
  "signature-pad": `<SignaturePad className="w-full max-w-md h-32" />`,
  "date-picker": `<DatePicker placeholder="Pick a date" />`,
  "date-time-picker": `<DateTimePicker placeholder="Pick a date and time" />`,
  pricing: `<Pricing
    tiers={[
      { name: "Hobby", price: "$0", description: "For tinkering", cta: "Start free", features: ["1 project", "Community support"] },
      { name: "Pro", price: "$24", description: "For growing teams", cta: "Get Pro", features: ["Unlimited projects", "Priority support", "Custom domains"], featured: true },
      { name: "Team", price: "$96", description: "For organizations", cta: "Contact sales", features: ["SSO + SAML", "Audit logs", "Dedicated support"] },
    ]}
  />`,
  "cost-calculator": `<CostCalculator
    sliders={[
      { id: "users", label: "Active users", min: 0, max: 10_000, step: 100, defaultValue: 1_500, suffix: " users" },
      { id: "calls", label: "API calls / month", min: 0, max: 1_000_000, step: 10_000, defaultValue: 250_000 },
    ]}
    estimate={(values) => ({ amount: \`$\${(values.users * 0.05 + values.calls * 0.0001).toFixed(2)}\`, period: "/ mo" })}
  />`,
  "floating-ui": `<FloatingUI title="Sigil" subtitle="Token-driven UI" />`,
  "isometric-cylinder": `<IsometricCylinder size={140} />`,
  "isometric-prism": `<IsometricPrism size={140} />`,
  "isometric-scene": `<IsometricScene size={220} />`,
  h1: `<H1>Token-driven design system</H1>`,
  "visually-hidden": `<>
    <span>Visible label.</span>
    <VisuallyHidden>Hidden but read by screen readers.</VisuallyHidden>
  </>`,
  direction: `<DirectionProvider dir="ltr">
    <div className="text-sm text-[var(--s-text)]">Left-to-right context (default).</div>
  </DirectionProvider>`,
};

let touched = 0;
let skipped = 0;
const errors = [];

for (const [slug, replacement] of Object.entries(REPLACEMENTS)) {
  const file = path.join(DOCS, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: missing MDX file`);
    continue;
  }
  const src = fs.readFileSync(file, "utf-8");
  // Find the existing preview body. Match either a bare component tag or a
  // missing preview entirely.
  const previewRe = /<ComponentPreview([^>]*)>([\s\S]*?)<\/ComponentPreview>/;
  const match = src.match(previewRe);
  let next;
  // String.replace treats `$1`-`$9`, `$&`, `$'`, "$`" specially in the
  // replacement string. Escape `$` literally so prices like "$24" survive.
  const safeReplacement = replacement.replace(/\$/g, "$$$$");

  if (match) {
    const body = match[2].trim();
    const isBare = /^<([A-Z][A-Za-z0-9]*)\s*\/>$/.test(body);
    if (!isBare) {
      skipped++;
      continue;
    }
    const safeAttrs = (match[1] ?? "").replace(/\$/g, "$$$$");
    next = src.replace(previewRe, `<ComponentPreview${safeAttrs}>\n  ${safeReplacement}\n</ComponentPreview>`);
  } else {
    // Insert a Preview section after the Import code block.
    const importRe = /(```\s*\n\s*\n)/;
    if (!importRe.test(src)) {
      errors.push(`${slug}: cannot find insertion point`);
      continue;
    }
    next = src.replace(
      importRe,
      `$1## Preview\n\n<ComponentPreview>\n  ${safeReplacement}\n</ComponentPreview>\n\n`,
    );
  }
  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log(`  ✓ ${slug}`);
    touched++;
  }
}

console.log(`\nTouched ${touched}, skipped ${skipped}, errors ${errors.length}`);
for (const e of errors) console.log(`  ! ${e}`);
