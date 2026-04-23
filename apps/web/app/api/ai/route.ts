import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";

const MODELS: Record<string, string> = {
  "gpt-5.4": "openai/gpt-5.4",
  "gpt-5.4-mini": "openai/gpt-5.4-mini",
  "claude-sonnet-4.6": "anthropic/claude-sonnet-4.6",
  "claude-haiku-3.5": "anthropic/claude-haiku-3.5",
  "gemini-3.1-flash": "google/gemini-3.1-flash",
  "gemini-3.1-pro": "google/gemini-3.1-pro",
};

const VALID_MODELS = new Set(Object.keys(MODELS));

const PRESET_NAMES = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
] as const;

const COMPONENT_NAMES = [
  "Hero", "CTA", "Pricing", "FeatureFrame", "TestimonialCard", "LogoBar",
  "Button", "Card", "Badge", "Input", "Tabs", "Accordion", "Table",
  "KPI", "Terminal", "CodeBlock", "Timeline", "Progress",
  "Grid", "Stack", "Navbar", "Footer", "Separator",
  "Diamond", "Hexagon", "Triangle", "Box3D", "Card3D",
  "LoadingSpinner", "Avatar",
] as const;

const PRESET_CATEGORIES: Record<string, string[]> = {
  "Structural (engineering precision)": ["sigil", "kova", "cobalt", "helix", "hex"],
  "Minimal (clean, whitespace)": ["crux", "axiom", "arc", "mono"],
  "Dark (cinematic, dramatic)": ["basalt", "onyx", "fang", "obsid", "cipher", "noir"],
  "Colorful (gradients, vibrant)": ["flux", "shard", "prism", "vex", "dsgn", "dusk"],
  "Editorial (typography-forward)": ["etch", "rune", "strata", "glyph", "mrkr"],
  "Industrial (metallic, utilitarian)": ["alloy", "forge", "anvil", "rivet", "brass"],
};

function truncateTokensForPrompt(tokens: Record<string, unknown>): string {
  const keys = [
    "colors", "typography", "spacing", "radius", "shadows",
    "motion", "borders", "buttons", "cards", "headings",
    "navigation", "backgrounds", "code", "inputs", "layout", "sigil",
  ];
  const summary: Record<string, unknown> = {};
  for (const key of keys) {
    if (key in tokens) summary[key] = tokens[key];
  }
  const json = JSON.stringify(summary, null, 2);
  return json.length > 6000 ? json.slice(0, 6000) + "\n... (truncated)" : json;
}

type CanvasEntry = {
  id: string;
  component: string;
  colSpan: number;
  order: number;
};

function buildSystemPrompt(
  currentTokens: Record<string, unknown>,
  canvasItems: CanvasEntry[],
): string {
  const tokenBlock = truncateTokensForPrompt(currentTokens);

  const canvasBlock =
    canvasItems.length > 0
      ? canvasItems
          .sort((a, b) => a.order - b.order)
          .map(
            (item) =>
              `  [${item.order}] ${item.component} — colSpan ${item.colSpan}/12 (id: ${item.id})`,
          )
          .join("\n")
      : "  (empty)";

  const presetBlock = Object.entries(PRESET_CATEGORIES)
    .map(([cat, names]) => `  ${cat}: ${names.join(", ")}`)
    .join("\n");

  return `You are a design system AI for Sigil UI — a token-driven component sandbox.

You help users build page layouts, customize design tokens, switch presets, and manage components on a live canvas.

## Canvas Layout System

The canvas uses a 5-column structural grid: margin | gutter | content (12-col) | gutter | margin.
Inside the content area, components are placed in a 12-column CSS grid.
Each component has a \`colSpan\` (1–12) that determines its width:
- 12 = full width
- 6 = half width (two items per row)
- 4 = one-third (three items per row)
- 3 = one-quarter (four items per row)
Components flow left-to-right, wrapping to the next row when a row's total colSpan exceeds 12.

## Current Canvas
${canvasBlock}

## Current Tokens
\`\`\`json
${tokenBlock}
\`\`\`

## Available Presets (${PRESET_NAMES.length})
${presetBlock}

## Available Components (${COMPONENT_NAMES.length})
${COMPONENT_NAMES.join(", ")}

## Actions (use JSON code blocks)

### 1. Patch Tokens — modify design variables
\`\`\`json
{"patch": {"colors": {"primary": "oklch(0.65 0.20 300)"}, "radius": {"md": "12px"}}}
\`\`\`

### 2. Add Component — place on canvas with optional colSpan
\`\`\`json
{"addComponent": {"component": "Hero", "props": {"title": "Welcome"}, "colSpan": 12}}
\`\`\`

### 3. Switch Preset — apply a complete visual identity
\`\`\`json
{"setPreset": "noir"}
\`\`\`

### 4. Remove Component — remove by ID
\`\`\`json
{"removeComponent": "<item-id>"}
\`\`\`

### 5. Clear Canvas
\`\`\`json
{"clearCanvas": true}
\`\`\`

## Rules
- All colors must be oklch() format.
- Preset names are case-sensitive.
- Component names are PascalCase and must match exactly.
- colSpan defaults to 12 if omitted.
- When building a page layout, think about visual hierarchy: Hero at 12, cards at 4 or 6, KPIs at 4, etc.
- When the user asks for an aesthetic, translate it into concrete token patches and/or a matching preset.
- Always explain what you're changing before the JSON block.
- You can combine multiple JSON blocks in one response.
- For "build me a landing page" type requests, add multiple components with appropriate colSpans.`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { messages, model, currentTokens, canvasItems } = body as {
    messages: { role: "user" | "assistant"; content: string }[];
    model: string;
    currentTokens: Record<string, unknown>;
    canvasItems: CanvasEntry[];
  };

  const modelKey = VALID_MODELS.has(model) ? model : "gpt-5.4-mini";
  const gatewaySlug = MODELS[modelKey]!;

  const result = streamText({
    model: gateway(gatewaySlug),
    system: buildSystemPrompt(currentTokens ?? {}, canvasItems ?? []),
    messages,
  });

  return result.toTextStreamResponse();
}
