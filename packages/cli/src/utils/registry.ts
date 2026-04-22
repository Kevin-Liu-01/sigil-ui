import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";

export type ComponentEntry = {
  name: string;
  files: string[];
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
};

const COMPONENT_REGISTRY: Record<string, ComponentEntry> = {
  button: {
    name: "button",
    files: ["button.tsx"],
    dependencies: ["@radix-ui/react-slot"],
    devDependencies: [],
    registryDependencies: [],
  },
  card: {
    name: "card",
    files: ["card.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  input: {
    name: "input",
    files: ["input.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  badge: {
    name: "badge",
    files: ["badge.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  dialog: {
    name: "dialog",
    files: ["dialog.tsx"],
    dependencies: ["@radix-ui/react-dialog"],
    devDependencies: [],
    registryDependencies: [],
  },
  dropdown: {
    name: "dropdown",
    files: ["dropdown.tsx"],
    dependencies: ["@radix-ui/react-dropdown-menu"],
    devDependencies: [],
    registryDependencies: [],
  },
  tabs: {
    name: "tabs",
    files: ["tabs.tsx"],
    dependencies: ["@radix-ui/react-tabs"],
    devDependencies: [],
    registryDependencies: [],
  },
  tooltip: {
    name: "tooltip",
    files: ["tooltip.tsx"],
    dependencies: ["@radix-ui/react-tooltip"],
    devDependencies: [],
    registryDependencies: [],
  },
  "sigil-grid": {
    name: "sigil-grid",
    files: ["sigil-grid.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  "sigil-cross": {
    name: "sigil-cross",
    files: ["sigil-cross.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  "sigil-rail": {
    name: "sigil-rail",
    files: ["sigil-rail.tsx"],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  "sigil-card": {
    name: "sigil-card",
    files: ["sigil-card.tsx"],
    dependencies: ["gsap"],
    devDependencies: [],
    registryDependencies: ["card"],
  },
};

export function getComponent(name: string): ComponentEntry | null {
  return COMPONENT_REGISTRY[name] ?? null;
}

export function getAllComponents(): ComponentEntry[] {
  return Object.values(COMPONENT_REGISTRY);
}

export function listComponentNames(): string[] {
  return Object.keys(COMPONENT_REGISTRY);
}

export function resolveComponentSource(
  componentName: string,
  fileName: string,
): string {
  return path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "..",
    "node_modules",
    "@sigil-ui",
    "components",
    "src",
    fileName,
  );
}

export async function discoverLocalComponents(
  componentsDir: string,
): Promise<string[]> {
  if (!fs.existsSync(componentsDir)) return [];
  const files = await glob("*.tsx", { cwd: componentsDir });
  return files.map((f) => path.basename(f, ".tsx"));
}
