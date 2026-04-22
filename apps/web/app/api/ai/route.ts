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
  "Stack", "SigilGrid", "Section", "Frame", "PageGrid", "Margin", "Gutter",
  "Divider", "HRule", "Button", "Badge", "Card", "Label", "Input", "Textarea",
  "Select", "Checkbox", "Switch", "Slider", "Progress", "Separator", "Avatar",
  "Skeleton", "Table", "Tabs", "Accordion", "Tooltip", "ScrollArea", "KPI",
  "Terminal", "CodeBlock", "LoadingSpinner", "Navbar", "Footer", "Breadcrumb",
  "Pagination", "Dialog", "Sheet", "Popover", "Toast", "Shape", "Diamond",
  "Hexagon", "Triangle", "Diagonal", "Box3D", "Box3DGrid", "Card3D",
  "FloatingUI", "IsometricView", "Diagram", "ExplodedView", "FlowDiagram",
  "Timeline", "ComparisonTable", "ArchitectureDiagram", "Hero", "FeatureFrame",
  "Pricing", "CTA", "LogoBar", "TestimonialCard", "Pattern", "Cross",
  "AnimateOnScroll",
] as const;

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

function buildSystemPrompt(
  currentTokens: Record<string, unknown>,
  canvasItems: unknown[],
): string {
  const tokenBlock = truncateTokensForPrompt(currentTokens);

  return `You are a design system AI for Sigil UI.

You help users customize design tokens, switch presets, and add components to a live sandbox canvas.

## Current Token State
\`\`\`json
${tokenBlock}
\`\`\`

## Available Presets (${PRESET_NAMES.length})
${PRESET_NAMES.join(", ")}

## Available Components (${COMPONENT_NAMES.length})
${COMPONENT_NAMES.join(", ")}

## Current Canvas
${canvasItems.length > 0 ? JSON.stringify(canvasItems, null, 2) : "Empty canvas — no components placed yet."}

## Response Format

Respond with natural language explanation combined with structured commands in JSON code blocks.

### Token Patch — modify design tokens
\`\`\`json
{"patch": {"colors": {"primary": "oklch(0.65 0.20 300)"}, "typography": {"font-display": "'Inter', sans-serif"}}}
\`\`\`

### Add Component — place a component on the canvas
\`\`\`json
{"addComponent": {"component": "Hero", "props": {"title": "Welcome", "subtitle": "Build something great"}}}
\`\`\`

### Switch Preset — apply a named preset
\`\`\`json
{"setPreset": "noir"}
\`\`\`

Rules:
- All color values must be in oklch() format when patching tokens.
- You may combine multiple commands in one response by using multiple JSON code blocks.
- Always explain what you're changing and why before providing the JSON block.
- When the user asks for a mood or aesthetic, translate that into concrete token changes.
- Preset names are case-sensitive and must match exactly.
- Component names must match the registry exactly (PascalCase).`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { messages, model, currentTokens, canvasItems } = body as {
    messages: { role: "user" | "assistant"; content: string }[];
    model: string;
    currentTokens: Record<string, unknown>;
    canvasItems: unknown[];
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
