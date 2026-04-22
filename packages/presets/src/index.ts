export { presetCatalog, getCatalogEntry, type PresetCatalogEntry } from "./catalog";
export { sigilPreset } from "./sigil";
export { cruxPreset } from "./crux";
export { alloyPreset } from "./alloy";
export { basaltPreset } from "./basalt";
export { forgePreset } from "./forge";
export { onyxPreset } from "./onyx";
export { fluxPreset } from "./flux";
export { kovaPreset } from "./kova";
export { etchPreset } from "./etch";
export { anvilPreset } from "./anvil";
export { rivetPreset } from "./rivet";
export { shardPreset } from "./shard";
export { runePreset } from "./rune";
export { fangPreset } from "./fang";
export { cobaltPreset } from "./cobalt";
export { strataPreset } from "./strata";
export { brassPreset } from "./brass";
export { obsidPreset } from "./obsid";
export { axiomPreset } from "./axiom";
export { glyphPreset } from "./glyph";
export { cipherPreset } from "./cipher";
export { prismPreset } from "./prism";
export { helixPreset } from "./helix";
export { hexPreset } from "./hex";
export { vexPreset } from "./vex";
export { arcPreset } from "./arc";
export { dsgnPreset } from "./dsgn";
export { mrkrPreset } from "./mrkr";
export { noirPreset } from "./noir";
export { duskPreset } from "./dusk";
export { monoPreset } from "./mono";

export const presets = {
  sigil: () => import("./sigil").then((m) => m.sigilPreset),
  crux: () => import("./crux").then((m) => m.cruxPreset),
  alloy: () => import("./alloy").then((m) => m.alloyPreset),
  basalt: () => import("./basalt").then((m) => m.basaltPreset),
  forge: () => import("./forge").then((m) => m.forgePreset),
  onyx: () => import("./onyx").then((m) => m.onyxPreset),
  flux: () => import("./flux").then((m) => m.fluxPreset),
  kova: () => import("./kova").then((m) => m.kovaPreset),
  etch: () => import("./etch").then((m) => m.etchPreset),
  anvil: () => import("./anvil").then((m) => m.anvilPreset),
  rivet: () => import("./rivet").then((m) => m.rivetPreset),
  shard: () => import("./shard").then((m) => m.shardPreset),
  rune: () => import("./rune").then((m) => m.runePreset),
  fang: () => import("./fang").then((m) => m.fangPreset),
  cobalt: () => import("./cobalt").then((m) => m.cobaltPreset),
  strata: () => import("./strata").then((m) => m.strataPreset),
  brass: () => import("./brass").then((m) => m.brassPreset),
  obsid: () => import("./obsid").then((m) => m.obsidPreset),
  axiom: () => import("./axiom").then((m) => m.axiomPreset),
  glyph: () => import("./glyph").then((m) => m.glyphPreset),
  cipher: () => import("./cipher").then((m) => m.cipherPreset),
  prism: () => import("./prism").then((m) => m.prismPreset),
  helix: () => import("./helix").then((m) => m.helixPreset),
  hex: () => import("./hex").then((m) => m.hexPreset),
  vex: () => import("./vex").then((m) => m.vexPreset),
  arc: () => import("./arc").then((m) => m.arcPreset),
  dsgn: () => import("./dsgn").then((m) => m.dsgnPreset),
  mrkr: () => import("./mrkr").then((m) => m.mrkrPreset),
  noir: () => import("./noir").then((m) => m.noirPreset),
  dusk: () => import("./dusk").then((m) => m.duskPreset),
  mono: () => import("./mono").then((m) => m.monoPreset),
} as const;

export type PresetName = keyof typeof presets;
