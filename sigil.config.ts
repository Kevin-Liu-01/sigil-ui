import type { SigilConfig } from "@sigil-ui/cli";

const config: SigilConfig = {
  preset: "default",
  componentsDir: "packages/components/src/ui",
  tokensPath: "apps/web/app/_generated/sigil-tokens.css",
  typescript: true,
  features: ["primitives", "grid", "motion"],
  projectType: "design-system",
};

export default config;
