import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { execSync } from "node:child_process";

const TEMPLATES = [
  { value: "ai-saas", label: "AI SaaS", description: "Dashboard + AI features, dark mode, charts" },
  { value: "dev-docs", label: "Developer Docs", description: "Documentation site with search, code blocks" },
  { value: "dashboard", label: "Dashboard", description: "Analytics dashboard with tables, charts" },
  { value: "portfolio", label: "Portfolio", description: "Creative portfolio with scroll animations" },
  { value: "ecommerce", label: "E-commerce", description: "Product catalog, cart, checkout" },
  { value: "blog", label: "Blog", description: "Content site with MDX, RSS, categories" },
  { value: "agency", label: "Agency", description: "Agency site with case studies, team page" },
  { value: "cli-tool", label: "CLI Tool Docs", description: "CLI documentation with terminal examples" },
  { value: "startup", label: "Startup Landing", description: "Landing page + waitlist, pricing, FAQ" },
  { value: "minimal", label: "Minimal", description: "Clean starting point — just Next.js + Sigil" },
] as const;

const PRESET_CHOICES = [
  { title: "Sigil (default)", value: "sigil", description: "Structural-visibility, soft indigo + warm amber" },
  { title: "Crux", value: "crux", description: "Decisive minimal, maximum whitespace" },
  { title: "Cobalt", value: "cobalt", description: "Blue metallic, chemical precision" },
  { title: "Flux", value: "flux", description: "Dynamic gradients, energetic flow" },
  { title: "Noir", value: "noir", description: "Film noir, cinematic dark, warm amber" },
  { title: "Prism", value: "prism", description: "Light spectrum, rainbow celebration" },
  { title: "Mono", value: "mono", description: "Monochrome monospace, terminal aesthetic" },
  { title: "Onyx", value: "onyx", description: "Pure black gemstone, ultra-dark premium" },
  { title: "Arc", value: "arc", description: "Curved trajectories, smooth flowing forms" },
  { title: "Etch", value: "etch", description: "Acid-etched lines, engraved precision" },
  { title: "Dusk", value: "dusk", description: "Twilight gradient, warm-to-cool sunset" },
  { title: "Forge", value: "forge", description: "Molten heat, orange-red glow, industrial" },
  { title: "Browse all 31 presets...", value: "_all", description: "See the full catalog" },
];

const ALL_PRESETS = [
  "sigil", "crux", "alloy", "basalt", "forge", "onyx", "flux", "kova",
  "etch", "anvil", "rivet", "shard", "rune", "fang", "cobalt", "strata",
  "brass", "obsid", "axiom", "glyph", "cipher", "prism", "helix", "hex",
  "vex", "arc", "dsgn", "mrkr", "noir", "dusk", "mono",
];

type DetectedPM = "pnpm" | "yarn" | "bun" | "npm";

function detectPM(): DetectedPM {
  const agent = process.env.npm_config_user_agent ?? "";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  return "npm";
}

const PM_CREATE: Record<DetectedPM, string> = {
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx",
  npm: "npx",
};

const PM_INSTALL: Record<DetectedPM, string> = {
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
  npm: "npm install",
};

const PM_RUN: Record<DetectedPM, string> = {
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
  npm: "npm run",
};

const program = new Command();

program
  .name("create-sigil-app")
  .description("Create a new Next.js project with Sigil UI")
  .version("0.1.0")
  .argument("[directory]", "project directory")
  .option("-t, --template <template>", "template to use")
  .option("-p, --preset <preset>", "Sigil preset to use")
  .option("--no-git", "skip git initialization")
  .option("--no-install", "skip dependency installation")
  .option("-y, --yes", "skip prompts, use defaults")
  .action(async (directory: string | undefined, opts) => {
    const pm = detectPM();

    console.log();
    console.log(chalk.bold("  ◆ create-sigil-app"));
    console.log(chalk.dim("  Bootstrap a new project with Sigil UI"));
    console.log();

    // Step 1: Project name/directory
    let projectDir = directory;
    if (!projectDir) {
      const { name } = await prompts({
        type: "text",
        name: "name",
        message: "Project name",
        initial: "my-sigil-app",
        validate: (v: string) => /^[a-z][a-z0-9._-]*$/.test(v) || "Lowercase, alphanumeric, hyphens, dots",
      });
      if (!name) return abort();
      projectDir = name;
    }

    const projectPath = path.resolve(projectDir!);
    const projectName = path.basename(projectPath);

    if (fs.existsSync(projectPath) && fs.readdirSync(projectPath).length > 0) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `Directory ${chalk.cyan(projectDir)} is not empty. Continue anyway?`,
        initial: false,
      });
      if (!overwrite) return abort();
    }

    // Step 2: Template
    let template = opts.template;
    if (!template && !opts.yes) {
      const { selectedTemplate } = await prompts({
        type: "select",
        name: "selectedTemplate",
        message: "Choose a template",
        choices: TEMPLATES.map((t) => ({
          title: t.label,
          value: t.value,
          description: t.description,
        })),
      });
      if (!selectedTemplate) return abort();
      template = selectedTemplate;
    }
    template = template ?? "minimal";

    // Step 3: Preset
    let preset = opts.preset;
    if (!preset && !opts.yes) {
      const { selectedPreset } = await prompts({
        type: "select",
        name: "selectedPreset",
        message: "Choose a Sigil preset",
        choices: PRESET_CHOICES,
      });
      if (!selectedPreset) return abort();

      if (selectedPreset === "_all") {
        const { fullPreset } = await prompts({
          type: "select",
          name: "fullPreset",
          message: "Select from all presets",
          choices: ALL_PRESETS.map((p) => ({ title: p, value: p })),
        });
        if (!fullPreset) return abort();
        preset = fullPreset;
      } else {
        preset = selectedPreset;
      }
    }
    preset = preset ?? "sigil";

    // Step 4: Font customization
    let customFont: string | undefined;
    if (!opts.yes) {
      const { wantFont } = await prompts({
        type: "confirm",
        name: "wantFont",
        message: "Customize the display font?",
        initial: false,
      });

      if (wantFont) {
        const { font } = await prompts({
          type: "text",
          name: "font",
          message: "Display font name (e.g. Geist, Inter, Satoshi)",
          initial: "",
        });
        if (font) customFont = font;
      }
    }

    // Step 5: Features
    let features: string[] = ["primitives"];
    if (!opts.yes) {
      const { selectedFeatures } = await prompts({
        type: "multiselect",
        name: "selectedFeatures",
        message: "Additional features",
        choices: [
          { title: "GSAP + ScrollTrigger", value: "gsap", description: "Scroll-driven animations" },
          { title: "Motion (Framer Motion)", value: "motion", description: "React component animations" },
          { title: "Radix Primitives", value: "primitives", description: "Accessible headless components", selected: true },
          { title: "Sigil Grid System", value: "grid", description: "Structural-visibility grid" },
        ],
        hint: "space to toggle, enter to confirm",
      });
      if (selectedFeatures) features = selectedFeatures;
    }

    // Step 6: Agent instructions
    let generateAgent = true;
    if (!opts.yes) {
      const { agent } = await prompts({
        type: "confirm",
        name: "agent",
        message: "Generate AI agent instructions?",
        initial: true,
      });
      generateAgent = agent;
    }

    console.log();
    console.log(chalk.bold("  Creating your Sigil app..."));
    console.log();

    // Create the project
    fs.ensureDirSync(projectPath);

    // Step A: Create Next.js app
    console.log(chalk.dim("  Creating Next.js app..."));
    try {
      execSync(
        `${PM_CREATE[pm]} create-next-app@latest ${projectPath} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --skip-install`,
        { stdio: "pipe" },
      );
      console.log(chalk.green("  ✓"), "Next.js project created");
    } catch {
      console.log(chalk.yellow("  ⚠"), "create-next-app failed, scaffolding manually...");
      scaffoldManually(projectPath, projectName);
      console.log(chalk.green("  ✓"), "Project scaffolded");
    }

    // Step B: Add Sigil config
    const componentsDir = "src/components/ui";
    const tokensPath = "src/styles/sigil.tokens.css";

    const configContent = `import type { SigilConfig } from "@sigil-ui/cli";

const config: SigilConfig = {
  preset: "${preset}",
  componentsDir: "${componentsDir}",
  tokensPath: "${tokensPath}",
  typescript: true,
};

export default config;
`;
    fs.writeFileSync(path.join(projectPath, "sigil.config.ts"), configContent, "utf-8");
    console.log(chalk.green("  ✓"), "Created sigil.config.ts");

    // Step C: Create tokens CSS
    const fontOverride = customFont
      ? `\n:root {\n  --sigil-font-display: "${customFont}", system-ui, sans-serif;\n}\n`
      : "";

    const tokensContent = `/* Sigil UI tokens — generated by create-sigil-app
 * Preset: ${preset}
 */

@import "@sigil-ui/tokens/css";
@import "@sigil-ui/presets/${preset}";
${fontOverride}`;

    const tokensFullPath = path.join(projectPath, tokensPath);
    fs.ensureDirSync(path.dirname(tokensFullPath));
    fs.writeFileSync(tokensFullPath, tokensContent, "utf-8");
    console.log(chalk.green("  ✓"), `Created ${tokensPath}`);

    // Step D: Create components directory
    const compFullPath = path.join(projectPath, componentsDir);
    fs.ensureDirSync(compFullPath);

    // Step E: Inject token import into global CSS
    const globalCssPath = path.join(projectPath, "src", "app", "globals.css");
    if (fs.existsSync(globalCssPath)) {
      const globalCss = fs.readFileSync(globalCssPath, "utf-8");
      const sigilImport = `@import "../../styles/sigil.tokens.css";\n`;
      fs.writeFileSync(globalCssPath, sigilImport + globalCss, "utf-8");
      console.log(chalk.green("  ✓"), "Injected token import into globals.css");
    }

    // Step F: Agent instructions
    if (generateAgent) {
      const agentContent = generateAgentMd(preset, componentsDir, tokensPath, features);
      const agentPath = path.join(projectPath, ".sigil", "AGENTS.md");
      fs.ensureDirSync(path.dirname(agentPath));
      fs.writeFileSync(agentPath, agentContent, "utf-8");
      console.log(chalk.green("  ✓"), "Created .sigil/AGENTS.md");
    }

    // Step G: Update package.json with Sigil deps
    const pkgPath = path.join(projectPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      pkg.dependencies = pkg.dependencies ?? {};
      pkg.dependencies["@sigil-ui/tokens"] = "latest";
      pkg.dependencies["@sigil-ui/components"] = "latest";
      pkg.dependencies["@sigil-ui/presets"] = "latest";
      pkg.dependencies["clsx"] = "latest";
      pkg.dependencies["tailwind-merge"] = "latest";

      if (features.includes("gsap")) pkg.dependencies["gsap"] = "latest";
      if (features.includes("motion")) pkg.dependencies["motion"] = "latest";
      if (features.includes("primitives")) {
        pkg.dependencies["@radix-ui/react-slot"] = "latest";
        pkg.dependencies["@radix-ui/react-dialog"] = "latest";
        pkg.dependencies["@radix-ui/react-dropdown-menu"] = "latest";
        pkg.dependencies["@radix-ui/react-tabs"] = "latest";
        pkg.dependencies["@radix-ui/react-tooltip"] = "latest";
      }

      pkg.devDependencies = pkg.devDependencies ?? {};
      pkg.devDependencies["@sigil-ui/cli"] = "latest";

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
      console.log(chalk.green("  ✓"), "Updated package.json with Sigil dependencies");
    }

    // Step H: Install deps
    if (opts.install !== false) {
      console.log(chalk.dim("  Installing dependencies..."));
      try {
        execSync(`${pm} install`, { cwd: projectPath, stdio: "pipe" });
        console.log(chalk.green("  ✓"), "Dependencies installed");
      } catch {
        console.log(chalk.yellow("  ⚠"), "Install failed. Run manually:");
        console.log(`     ${chalk.cyan(`cd ${projectDir} && ${pm} install`)}`);
      }
    }

    // Step I: Init git
    if (opts.git !== false) {
      try {
        execSync("git init", { cwd: projectPath, stdio: "pipe" });
        execSync("git add -A", { cwd: projectPath, stdio: "pipe" });
        execSync('git commit -m "Initial commit with Sigil UI"', { cwd: projectPath, stdio: "pipe" });
        console.log(chalk.green("  ✓"), "Git initialized with initial commit");
      } catch {
        // Git may already be initialized or unavailable
      }
    }

    // Done!
    console.log();
    console.log(chalk.bold.green("  ✓ Your Sigil app is ready!"));
    console.log();
    console.log(`  ${chalk.gray("cd")} ${chalk.cyan(projectDir)}`);
    console.log(`  ${chalk.cyan(`${PM_RUN[pm]} dev`)}`);
    console.log();
    console.log(chalk.dim("  Preset:   ") + chalk.cyan(preset));
    console.log(chalk.dim("  Template: ") + chalk.cyan(template));
    if (customFont) console.log(chalk.dim("  Font:     ") + chalk.cyan(customFont));
    console.log();
    console.log(chalk.dim("  Commands:"));
    console.log(`    ${chalk.cyan("npx sigil add <component>")}  Add components`);
    console.log(`    ${chalk.cyan("npx sigil preset <name>")}    Switch presets`);
    console.log(`    ${chalk.cyan("npx sigil doctor")}            Validate setup`);
    console.log();
  });

function scaffoldManually(projectPath: string, projectName: string): void {
  const pkg = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev --turbopack",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
    },
    devDependencies: {
      typescript: "latest",
      "@types/node": "latest",
      "@types/react": "latest",
      "@types/react-dom": "latest",
      tailwindcss: "latest",
    },
  };

  fs.ensureDirSync(projectPath);
  fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(pkg, null, 2) + "\n");

  const tsconfig = {
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      paths: { "@/*": ["./src/*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"],
  };

  fs.writeFileSync(path.join(projectPath, "tsconfig.json"), JSON.stringify(tsconfig, null, 2) + "\n");
  fs.writeFileSync(path.join(projectPath, "next.config.ts"), `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {};\n\nexport default nextConfig;\n`);

  fs.ensureDirSync(path.join(projectPath, "src", "app"));
  fs.writeFileSync(
    path.join(projectPath, "src", "app", "layout.tsx"),
    `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${projectName}",
  description: "Built with Sigil UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
`,
  );

  fs.writeFileSync(
    path.join(projectPath, "src", "app", "page.tsx"),
    `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Sigil UI</h1>
      <p className="text-text-secondary max-w-md text-center">
        Your project is ready. Start building with the Sigil design system.
      </p>
    </main>
  );
}
`,
  );

  fs.writeFileSync(
    path.join(projectPath, "src", "app", "globals.css"),
    `@import "tailwindcss";
`,
  );
}

function generateAgentMd(
  preset: string,
  componentsDir: string,
  tokensPath: string,
  features: string[],
): string {
  return `# Sigil UI — Agent Instructions

> Auto-generated by \`create-sigil-app\`. Read this before writing any UI code.

## The #1 Rule

**Edit the token spec. Not the components.**

To change how things look, edit the token CSS file (\`${tokensPath}\`) or switch presets. Components read from CSS variables and update automatically. Do not manually edit Tailwind classes or hardcode colors/spacing/fonts in component files.

## Setup

| Key | Value |
|-----|-------|
| Preset | \`${preset}\` |
| Components | \`${componentsDir}\` |
| Tokens CSS | \`${tokensPath}\` |
| Framework | Next.js (App Router) |
| Features | ${features.join(", ") || "none"} |

## How to Make Visual Changes

| Want to change... | Do this | Do NOT do this |
|-------------------|---------|----------------|
| Primary color | Edit \`${tokensPath}\`: \`--sigil-primary: oklch(...);\` | Edit component files |
| Fonts | Edit \`${tokensPath}\`: \`--sigil-font-display: "Font", ...;\` | Add font classes to components |
| Border radius | Edit \`${tokensPath}\`: \`--sigil-radius-md: 12px;\` | Add \`rounded-*\` to components |
| Everything at once | Run \`npx sigil preset <name>\` | Edit dozens of files |
| Custom aesthetic | Run \`npx sigil preset create\` | Override each component |

## Token Conventions

- All colors use OKLCH: \`oklch(L C H)\` — no hex, no rgb, no hsl
- CSS variables use \`--s-\` prefix: \`var(--s-primary)\`, \`var(--s-radius-md)\`
- Themed tokens have automatic light/dark support
- Spacing follows the token scale — no arbitrary pixel values

## Component Conventions

- Components live in \`${componentsDir}\`
- Every component uses \`forwardRef\` and accepts \`className\`
- Styling references \`var(--s-*)\` — never hardcoded values
- Use \`clsx\` + \`tailwind-merge\` for class merging
- Add with \`npx sigil add <name>\`

## Commands

\`\`\`bash
npx sigil add button card     # copy components into project
npx sigil preset list         # browse all 31 presets
npx sigil preset <name>       # switch presets
npx sigil preset create       # scaffold custom preset
npx sigil doctor              # validate project health
npx sigil diff                # show token changes
\`\`\`

## Agent Workflow

1. Read this file to understand the setup
2. Use existing components from \`${componentsDir}\` before creating new ones
3. For visual changes, edit \`${tokensPath}\` — never hardcode values
4. For wholesale changes, switch presets
5. Run \`npx sigil doctor\` after changes
`;
}

function abort(): void {
  console.log(chalk.yellow("  Aborted."));
  process.exit(0);
}

program.parse();
