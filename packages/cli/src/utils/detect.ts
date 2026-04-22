import fs from "fs-extra";
import path from "node:path";

export type DetectedFramework = "next" | "remix" | "vite" | "astro" | "unknown";
export type DetectedPM = "pnpm" | "yarn" | "bun" | "npm";

export type ProjectDetection = {
  framework: DetectedFramework;
  packageManager: DetectedPM;
  hasTypescript: boolean;
  hasTailwind: boolean;
  hasSrc: boolean;
  hasApp: boolean;
  globalCssPath: string | null;
};

export function detectProject(cwd: string): ProjectDetection {
  const pkg = readPkg(cwd);

  return {
    framework: detectFramework(cwd, pkg),
    packageManager: detectPM(cwd),
    hasTypescript: detectTypescript(cwd),
    hasTailwind: detectTailwind(cwd, pkg),
    hasSrc: fs.existsSync(path.join(cwd, "src")),
    hasApp: fs.existsSync(path.join(cwd, "app")) || fs.existsSync(path.join(cwd, "src", "app")),
    globalCssPath: findGlobalCss(cwd),
  };
}

function readPkg(cwd: string): Record<string, unknown> | null {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  } catch {
    return null;
  }
}

function hasDep(pkg: Record<string, unknown> | null, name: string): boolean {
  if (!pkg) return false;
  const deps = pkg.dependencies as Record<string, string> | undefined;
  const devDeps = pkg.devDependencies as Record<string, string> | undefined;
  return !!(deps?.[name] || devDeps?.[name]);
}

function detectFramework(cwd: string, pkg: Record<string, unknown> | null): DetectedFramework {
  if (hasDep(pkg, "next") || fs.existsSync(path.join(cwd, "next.config.ts")) || fs.existsSync(path.join(cwd, "next.config.mjs"))) return "next";
  if (hasDep(pkg, "@remix-run/react")) return "remix";
  if (hasDep(pkg, "astro")) return "astro";
  if (hasDep(pkg, "vite") || fs.existsSync(path.join(cwd, "vite.config.ts"))) return "vite";
  return "unknown";
}

function detectPM(cwd: string): DetectedPM {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) return "bun";
  return "npm";
}

function detectTypescript(cwd: string): boolean {
  return (
    fs.existsSync(path.join(cwd, "tsconfig.json")) ||
    fs.existsSync(path.join(cwd, "tsconfig.app.json"))
  );
}

function detectTailwind(cwd: string, pkg: Record<string, unknown> | null): boolean {
  return (
    hasDep(pkg, "tailwindcss") ||
    fs.existsSync(path.join(cwd, "tailwind.config.ts")) ||
    fs.existsSync(path.join(cwd, "tailwind.config.js"))
  );
}

function findGlobalCss(cwd: string): string | null {
  const candidates = [
    "src/app/globals.css",
    "app/globals.css",
    "src/styles/globals.css",
    "src/index.css",
    "styles/globals.css",
    "src/global.css",
    "app/global.css",
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(cwd, c))) return c;
  }
  return null;
}

export const FRAMEWORK_LABELS: Record<DetectedFramework, string> = {
  next: "Next.js",
  remix: "Remix",
  vite: "Vite + React",
  astro: "Astro",
  unknown: "Unknown",
};

export const PM_INSTALL: Record<DetectedPM, string> = {
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
  npm: "npm install",
};

export const PM_DEV_INSTALL: Record<DetectedPM, string> = {
  pnpm: "pnpm add -D",
  yarn: "yarn add -D",
  bun: "bun add -D",
  npm: "npm install -D",
};
