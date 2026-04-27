import { presetCatalog, type PresetCatalogEntry } from "@sigil-ui/presets/catalog";
import type { PresetName } from "@sigil-ui/presets";

export type PresetCategory =
  | "structural"
  | "minimal"
  | "dark"
  | "colorful"
  | "editorial"
  | "industrial"
  | "edgeless";

export type PresetInfo = {
  name: PresetName;
  label: string;
  description: string;
  category: PresetCategory;
  mood: string;
  primaryHue: string;
  fonts: { display: string; body: string; mono: string };
};

const CATEGORY_LABELS: Record<PresetCategory, string> = {
  structural: "Structural / Precision",
  minimal: "Minimal / Clean",
  dark: "Dark / Cinematic",
  colorful: "Colorful / Expressive",
  editorial: "Editorial / Typographic",
  industrial: "Industrial / Technical",
  edgeless: "Edgeless / Ambient",
};

export function getCategoryLabel(cat: PresetCategory): string {
  return CATEGORY_LABELS[cat];
}

export const PRESET_CATALOG: PresetInfo[] = presetCatalog.map(
  (entry: PresetCatalogEntry) => ({
    ...entry,
    name: entry.name as PresetName,
    category: entry.category as PresetCategory,
  }),
);

export function getPresetsByCategory(): Map<PresetCategory, PresetInfo[]> {
  const map = new Map<PresetCategory, PresetInfo[]>();
  for (const p of PRESET_CATALOG) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  return map;
}

export function getPresetInfo(name: string): PresetInfo | undefined {
  return PRESET_CATALOG.find((p) => p.name === name);
}

export const PRESET_NAMES = PRESET_CATALOG.map((p) => p.name);

export const PROJECT_TYPES = [
  { value: "saas", label: "SaaS / Dashboard", description: "Admin panels, analytics, settings" },
  { value: "marketing", label: "Marketing / Landing", description: "Landing pages, conversion funnels" },
  { value: "docs", label: "Documentation", description: "API docs, guides, knowledge bases" },
  { value: "blog", label: "Blog / Content", description: "Articles, newsletters, media" },
  { value: "portfolio", label: "Portfolio / Agency", description: "Case studies, creative showcase" },
  { value: "ecommerce", label: "E-commerce", description: "Product pages, cart, checkout" },
  { value: "startup", label: "Startup / MVP", description: "Fast iteration, full-stack" },
  { value: "custom", label: "Custom / Other", description: "Roll your own setup" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

export const FEATURE_OPTIONS = [
  { value: "gsap", label: "GSAP + ScrollTrigger", description: "Scroll-driven animations" },
  { value: "motion", label: "Motion (Framer Motion)", description: "React component animations" },
  { value: "primitives", label: "Radix Primitives", description: "Accessible headless components" },
  { value: "pretext", label: "Pretext", description: "Text animation effects" },
  { value: "grid", label: "Sigil Grid System", description: "Structural-visibility grid + cross marks" },
] as const;

export type FeatureOption = (typeof FEATURE_OPTIONS)[number]["value"];
