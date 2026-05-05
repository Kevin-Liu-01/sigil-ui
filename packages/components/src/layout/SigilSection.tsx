/**
 * Legacy entry point. The component implementation now lives under
 * `./sigil/SigilSection.tsx` alongside the rest of the structural
 * grid. This shell re-exports the public surface so existing imports
 * keep working.
 */

export { SigilSection, type SigilSectionProps } from "./sigil";
