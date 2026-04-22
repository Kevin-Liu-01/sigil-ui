/**
 * Preset catalog metadata — lightweight metadata for CLI display
 * without importing the full token objects. The CLI uses this to
 * show categorized preset lists, descriptions, and font info.
 */

export type PresetCatalogEntry = {
  readonly name: string;
  readonly label: string;
  readonly description: string;
  readonly category: "structural" | "minimal" | "dark" | "colorful" | "editorial" | "industrial";
  readonly mood: string;
  readonly primaryHue: string;
  readonly fonts: {
    readonly display: string;
    readonly body: string;
    readonly mono: string;
  };
};

export const presetCatalog: readonly PresetCatalogEntry[] = [
  { name: "sigil", label: "Sigil", description: "Structural-visibility, cross marks + grid lines, soft indigo", category: "structural", mood: "precise, engineered", primaryHue: "indigo", fonts: { display: "Nacelle", body: "system-ui", mono: "Roboto Mono" } },
  { name: "crux", label: "Crux", description: "Decisive minimal, maximum whitespace, pure essentials", category: "minimal", mood: "minimal, decisive", primaryHue: "neutral", fonts: { display: "Nacelle", body: "system-ui", mono: "Roboto Mono" } },
  { name: "alloy", label: "Alloy", description: "Fused metals aesthetic, warm steel + copper", category: "industrial", mood: "metallic, fused", primaryHue: "copper", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Fira Code" } },
  { name: "basalt", label: "Basalt", description: "Volcanic dark stone, dense and grounded", category: "dark", mood: "volcanic, grounded", primaryHue: "slate", fonts: { display: "Inter", body: "system-ui", mono: "JetBrains Mono" } },
  { name: "forge", label: "Forge", description: "Molten heat, orange-red glow, industrial craft", category: "industrial", mood: "molten, industrial", primaryHue: "orange", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Fira Code" } },
  { name: "onyx", label: "Onyx", description: "Pure black gemstone, ultra-dark premium", category: "dark", mood: "obsidian, premium", primaryHue: "purple", fonts: { display: "GT America", body: "system-ui", mono: "JetBrains Mono" } },
  { name: "flux", label: "Flux", description: "Dynamic gradients, movement-focused, energetic flow", category: "colorful", mood: "dynamic, energetic", primaryHue: "blue-purple", fonts: { display: "Satoshi", body: "system-ui", mono: "Fira Code" } },
  { name: "kova", label: "Kova", description: "Hard-forged clarity, disciplined structure", category: "structural", mood: "forged, disciplined", primaryHue: "teal", fonts: { display: "Inter", body: "system-ui", mono: "Roboto Mono" } },
  { name: "etch", label: "Etch", description: "Acid-etched lines, engraved precision", category: "editorial", mood: "etched, engraved", primaryHue: "emerald", fonts: { display: "Söhne", body: "Charter", mono: "IBM Plex Mono" } },
  { name: "anvil", label: "Anvil", description: "Heavy industrial, weighty foundations", category: "industrial", mood: "heavy, foundational", primaryHue: "iron", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Space Mono" } },
  { name: "rivet", label: "Rivet", description: "Mechanical precision, riveted joints, utilitarian", category: "industrial", mood: "mechanical, utilitarian", primaryHue: "amber", fonts: { display: "Inter", body: "system-ui", mono: "Fira Code" } },
  { name: "shard", label: "Shard", description: "Crystalline fragments, sharp facets, prismatic", category: "colorful", mood: "crystalline, sharp", primaryHue: "cyan", fonts: { display: "Satoshi", body: "system-ui", mono: "Fira Code" } },
  { name: "rune", label: "Rune", description: "Ancient symbols, mystical marks, arcane feel", category: "editorial", mood: "mystical, arcane", primaryHue: "violet", fonts: { display: "Fraunces", body: "Charter", mono: "IBM Plex Mono" } },
  { name: "fang", label: "Fang", description: "Sharp edges, aggressive contrast, fierce", category: "dark", mood: "fierce, aggressive", primaryHue: "red", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Space Mono" } },
  { name: "cobalt", label: "Cobalt", description: "Blue metallic, chemical precision, deep ocean", category: "structural", mood: "metallic, chemical", primaryHue: "cobalt", fonts: { display: "Inter", body: "system-ui", mono: "JetBrains Mono" } },
  { name: "strata", label: "Strata", description: "Geological layers, earthy tones, stratified depth", category: "editorial", mood: "layered, geological", primaryHue: "amber", fonts: { display: "Söhne", body: "Charter", mono: "IBM Plex Mono" } },
  { name: "brass", label: "Brass", description: "Warm metallic, vintage instrument, patina", category: "industrial", mood: "warm, vintage", primaryHue: "gold", fonts: { display: "Fraunces", body: "Georgia", mono: "Fira Code" } },
  { name: "obsid", label: "Obsidian", description: "Volcanic glass, mirror-dark, sharp edges", category: "dark", mood: "volcanic, reflective", primaryHue: "slate", fonts: { display: "GT America", body: "system-ui", mono: "JetBrains Mono" } },
  { name: "axiom", label: "Axiom", description: "Self-evident truth, mathematical purity, axiomatic", category: "minimal", mood: "mathematical, pure", primaryHue: "blue", fonts: { display: "Inter", body: "system-ui", mono: "Roboto Mono" } },
  { name: "glyph", label: "Glyph", description: "Typographic symbol, letterform-focused, editorial", category: "editorial", mood: "typographic, symbolic", primaryHue: "indigo", fonts: { display: "Söhne", body: "Charter", mono: "IBM Plex Mono" } },
  { name: "cipher", label: "Cipher", description: "Encoded mystery, encrypted aesthetic, crypto-noir", category: "dark", mood: "encrypted, mysterious", primaryHue: "green", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Fira Code" } },
  { name: "prism", label: "Prism", description: "Light spectrum, rainbow celebration, playful gradients", category: "colorful", mood: "spectral, joyful", primaryHue: "rainbow", fonts: { display: "Satoshi", body: "Inter", mono: "Fira Code" } },
  { name: "helix", label: "Helix", description: "DNA spiral, biological precision, organic tech", category: "structural", mood: "biological, organic-tech", primaryHue: "teal", fonts: { display: "Inter", body: "system-ui", mono: "Roboto Mono" } },
  { name: "hex", label: "Hex", description: "Hexagonal grid, honeycomb, geometric precision", category: "structural", mood: "geometric, hexagonal", primaryHue: "amber", fonts: { display: "Space Grotesk", body: "system-ui", mono: "Space Mono" } },
  { name: "vex", label: "Vex", description: "Perplexing complexity, puzzle-like, intricate", category: "colorful", mood: "complex, intricate", primaryHue: "fuchsia", fonts: { display: "Satoshi", body: "system-ui", mono: "Fira Code" } },
  { name: "arc", label: "Arc", description: "Curved trajectories, smooth arcs, flowing forms", category: "minimal", mood: "flowing, curved", primaryHue: "sky", fonts: { display: "Satoshi", body: "Inter", mono: "Fira Code" } },
  { name: "dsgn", label: "DSGN", description: "Design tool aesthetic, Figma-inspired, creator-focused", category: "colorful", mood: "creative, tool-like", primaryHue: "purple", fonts: { display: "Inter", body: "system-ui", mono: "Fira Code" } },
  { name: "mrkr", label: "Marker", description: "Hand-drawn marks, sketch aesthetic, raw ink", category: "editorial", mood: "sketched, raw", primaryHue: "black", fonts: { display: "Fraunces", body: "Charter", mono: "IBM Plex Mono" } },
  { name: "noir", label: "Noir", description: "Film noir, cinematic dark, warm amber highlights", category: "dark", mood: "cinematic, dramatic", primaryHue: "amber", fonts: { display: "GT America", body: "system-ui", mono: "JetBrains Mono" } },
  { name: "dusk", label: "Dusk", description: "Twilight gradient, warm-to-cool transition, sunset", category: "colorful", mood: "twilight, warm-cool", primaryHue: "rose-violet", fonts: { display: "Satoshi", body: "Inter", mono: "Fira Code" } },
  { name: "mono", label: "Mono", description: "Monochrome monospace, terminal aesthetic, zero decoration", category: "minimal", mood: "monochrome, terminal", primaryHue: "neutral", fonts: { display: "Space Mono", body: "Space Mono", mono: "Space Mono" } },
] as const;

export function getCatalogEntry(name: string): PresetCatalogEntry | undefined {
  return presetCatalog.find((p) => p.name === name);
}
