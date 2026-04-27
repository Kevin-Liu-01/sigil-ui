import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";
import { createRequire } from "node:module";

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
  "scroll-area": {
    name: "scroll-area",
    files: ["scroll-area.tsx"],
    dependencies: ["@radix-ui/react-scroll-area"],
    devDependencies: [],
    registryDependencies: [],
  },
  "sigil-cursor": {
    name: "sigil-cursor",
    files: ["sigil-cursor.tsx"],
    dependencies: [],
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

const COMPONENT_SOURCE_FILES: Record<string, string> = {
  button: "ui/Button.tsx",
  card: "ui/Card.tsx",
  input: "ui/Input.tsx",
  badge: "ui/Badge.tsx",
  dialog: "overlays/Dialog.tsx",
  dropdown: "overlays/DropdownMenu.tsx",
  tabs: "ui/Tabs.tsx",
  tooltip: "ui/Tooltip.tsx",
  "scroll-area": "ui/ScrollArea.tsx",
  "sigil-cursor": "ui/SigilCursor.tsx",
};

const COMPOSED_COMPONENT_GROUPS: Array<{
  source: string;
  file: string;
  dependencies: string[];
  registryDependencies: string[];
  names: string[];
}> = [
  {
    source: "overlays/ComposedOverlays.tsx",
    file: "composed-overlays.tsx",
    dependencies: [
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-tooltip",
      "cmdk",
    ],
    registryDependencies: ["button", "input", "dialog", "dropdown", "tooltip"],
    names: [
      "modal", "confirm-dialog", "prompt-dialog", "responsive-dialog", "lightbox",
      "image-preview", "spotlight", "command-menu", "action-menu", "overflow-menu",
      "mega-menu", "context-panel", "popover-form", "floating-panel", "tooltip-group",
      "tour", "tour-step", "coachmark", "hotkey-provider", "shortcut-recorder",
    ],
  },
  {
    source: "ui/AdvancedInputs.tsx",
    file: "advanced-inputs.tsx",
    dependencies: [
      "@radix-ui/react-checkbox",
      "@radix-ui/react-popover",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
      "lucide-react",
    ],
    registryDependencies: ["button", "input"],
    names: [
      "search-input", "currency-input", "phone-input", "time-picker", "date-time-picker",
      "date-range-field", "multi-select", "autocomplete", "creatable-select", "async-select",
      "segmented-tabs", "range-slider", "dual-range-slider", "file-dropzone", "image-upload",
      "avatar-upload", "color-field", "combobox-field", "checkbox-card", "radio-card",
      "switch-field", "slider-field", "stepper-field", "tags-field", "copy-input",
    ],
  },
  {
    source: "ui/StatusFeedback.tsx",
    file: "status-feedback.tsx",
    dependencies: ["@radix-ui/react-toast"],
    registryDependencies: ["button", "badge"],
    names: [
      "status-badge", "status-dot", "status-pill", "online-indicator", "presence-avatar",
      "notification", "notification-list", "inline-alert", "callout", "banner-alert",
      "error-state", "loading-state", "success-state", "progress-steps", "timeline-progress",
      "toast-action", "toast-promise", "skeleton-card", "skeleton-table", "spinner-overlay",
    ],
  },
  {
    source: "data/DataComponents.tsx",
    file: "data-components.tsx",
    dependencies: ["@radix-ui/react-checkbox"],
    registryDependencies: ["button", "input"],
    names: [
      "description-list", "key-value", "property-list", "stat-card", "metric-grid",
      "trend", "spark-area", "spark-bar", "data-list", "data-list-item",
      "data-grid", "data-toolbar", "data-filters", "data-pagination", "column-visibility",
      "bulk-actions", "empty-table", "listbox", "virtual-list", "tree-table",
    ],
  },
  {
    source: "navigation/AppSurfaces.tsx",
    file: "app-surfaces.tsx",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: ["button", "card", "tabs"],
    names: [
      "container-query", "split-pane", "dock", "top-bar", "bottom-bar",
      "mobile-nav", "sidebar-nav", "app-header", "page-header", "section-header",
      "content-tabs", "anchor-nav", "table-of-contents", "scroll-spy", "masonry-grid",
      "media-card", "resource-card", "feature-card", "pricing-card", "testimonial-carousel",
    ],
  },
  {
    source: "ui/Productivity.tsx",
    file: "productivity.tsx",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: ["button", "card", "tabs"],
    names: [
      "code-tabs", "code-preview", "copy-button", "token-preview", "theme-swatch",
      "theme-switcher", "prompt-input", "chat-message", "chat-thread", "message-composer",
      "activity-timeline", "audit-log", "changelog", "version-badge", "keyboard-key",
    ],
  },
];

for (const group of COMPOSED_COMPONENT_GROUPS) {
  for (const name of group.names) {
    COMPONENT_REGISTRY[name] = {
      name,
      files: [group.file],
      dependencies: group.dependencies,
      devDependencies: [],
      registryDependencies: group.registryDependencies,
    };
    COMPONENT_SOURCE_FILES[name] = group.source;
  }
}

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
  cwd: string = process.cwd(),
): string {
  const sourceFile = COMPONENT_SOURCE_FILES[componentName] ?? fileName;
  const packageRoot = resolveComponentsPackageRoot(cwd);

  if (packageRoot) {
    return path.join(packageRoot, "src", sourceFile);
  }

  for (const workspaceSource of resolveWorkspaceComponentSources(sourceFile)) {
    if (fs.existsSync(workspaceSource)) return workspaceSource;
  }

  return path.join(cwd, "node_modules", "@sigil-ui", "components", "src", sourceFile);
}

function resolveWorkspaceComponentSources(sourceFile: string): string[] {
  const here = path.dirname(new URL(import.meta.url).pathname);
  return [
    path.join(here, "..", "..", "components", "src", sourceFile),
    path.join(here, "..", "..", "..", "components", "src", sourceFile),
  ];
}

export function ensureComponentSupportFiles(componentsDir: string, sourceContent: string): void {
  const supportDir = path.dirname(componentsDir);

  if (sourceContent.includes("../utils")) {
    const utilsPath = path.join(supportDir, "utils.ts");
    if (!fs.existsSync(utilsPath)) {
      fs.ensureDirSync(path.dirname(utilsPath));
      fs.writeFileSync(utilsPath, `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`, "utf-8");
    }
  }

  if (sourceContent.includes("../sound-context")) {
    const soundPath = path.join(supportDir, "sound-context.tsx");
    if (!fs.existsSync(soundPath)) {
      fs.ensureDirSync(path.dirname(soundPath));
      fs.writeFileSync(soundPath, `"use client";

import { createContext, useContext, type ReactNode } from "react";

type SigilSoundName = "click" | "open" | "close" | "toggle" | string;
type SigilSoundContextValue = { play: (name?: SigilSoundName) => void };

const SigilSoundContext = createContext<SigilSoundContextValue>({ play: () => {} });

export function SigilSoundProvider({ children }: { children: ReactNode }) {
  return (
    <SigilSoundContext.Provider value={{ play: () => {} }}>
      {children}
    </SigilSoundContext.Provider>
  );
}

export function useSigilSound() {
  return useContext(SigilSoundContext);
}
`, "utf-8");
    }
  }
}

export async function discoverLocalComponents(
  componentsDir: string,
): Promise<string[]> {
  if (!fs.existsSync(componentsDir)) return [];
  const files = await glob("*.tsx", { cwd: componentsDir });
  return files.map((f) => path.basename(f, ".tsx"));
}

function resolveComponentsPackageRoot(cwd: string): string | null {
  const candidates = [
    path.join(cwd, "package.json"),
    new URL(import.meta.url).pathname,
  ];

  for (const candidate of candidates) {
    try {
      const require = createRequire(candidate);
      const entry = require.resolve("@sigil-ui/components");
      const distDir = path.dirname(entry);
      return path.basename(distDir) === "dist" ? path.dirname(distDir) : distDir;
    } catch {
      // Try the next resolution base.
    }
  }

  return null;
}
