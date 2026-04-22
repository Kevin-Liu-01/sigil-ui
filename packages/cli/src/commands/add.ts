import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { readConfig, configExists } from "../utils/config.js";
import {
  getComponent,
  getAllComponents,
  listComponentNames,
  resolveComponentSource,
} from "../utils/registry.js";

export const addCommand = new Command("add")
  .description("Add Sigil components to your project")
  .argument("[components...]", "component names to add")
  .option("-a, --all", "add all available components")
  .option("-o, --overwrite", "overwrite existing files")
  .option("-d, --dir <dir>", "override components directory")
  .action(async (componentNames: string[], opts) => {
    const cwd = process.cwd();

    if (!configExists(cwd)) {
      console.log(
        chalk.red("✗"),
        "No sigil.config.ts found. Run",
        chalk.cyan("sigil init"),
        "first.",
      );
      process.exit(1);
    }

    const config = readConfig(cwd)!;
    const componentsDir = path.join(cwd, opts.dir ?? config.componentsDir);

    if (opts.all) {
      componentNames = listComponentNames();
    }

    if (componentNames.length === 0) {
      console.log(chalk.yellow("No components specified."));
      console.log();
      console.log("Usage:");
      console.log(`  ${chalk.cyan("sigil add <component> [component...]")}`);
      console.log(`  ${chalk.cyan("sigil add --all")}`);
      console.log();
      console.log("Available components:");
      for (const name of listComponentNames()) {
        console.log(`  ${chalk.gray("•")} ${name}`);
      }
      return;
    }

    fs.ensureDirSync(componentsDir);
    const added: string[] = [];
    const skipped: string[] = [];
    const failed: string[] = [];
    const depsToInstall = new Set<string>();

    for (const name of resolveWithDependencies(componentNames)) {
      const entry = getComponent(name);
      if (!entry) {
        console.log(chalk.red("✗"), `Unknown component: ${chalk.bold(name)}`);
        failed.push(name);
        continue;
      }

      for (const file of entry.files) {
        const destPath = path.join(componentsDir, file);

        if (fs.existsSync(destPath) && !opts.overwrite) {
          console.log(chalk.yellow("↗"), `${file} already exists (use --overwrite to replace)`);
          skipped.push(name);
          continue;
        }

        const sourcePath = resolveComponentSource(name, file);

        if (fs.existsSync(sourcePath)) {
          fs.copySync(sourcePath, destPath);
          console.log(chalk.green("✓"), `Added ${file}`);
        } else {
          const stub = generateComponentStub(name, file);
          fs.writeFileSync(destPath, stub, "utf-8");
          console.log(chalk.green("✓"), `Created ${file} (scaffold)`);
        }

        added.push(name);
      }

      for (const dep of entry.dependencies) {
        depsToInstall.add(dep);
      }
    }

    if (depsToInstall.size > 0) {
      console.log();
      console.log(chalk.bold("Install required dependencies:"));
      console.log(`  ${chalk.cyan(`pnpm add ${[...depsToInstall].join(" ")}`)}`);
    }

    console.log();
    if (added.length > 0) {
      console.log(chalk.green(`Added ${added.length} component(s).`));
    }
    if (skipped.length > 0) {
      console.log(chalk.yellow(`Skipped ${skipped.length} existing component(s).`));
    }
    if (failed.length > 0) {
      console.log(chalk.red(`Failed: ${failed.join(", ")}`));
    }
  });

function resolveWithDependencies(names: string[]): string[] {
  const resolved = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;
    resolved.add(name);

    const entry = getComponent(name);
    if (entry) {
      for (const dep of entry.registryDependencies) {
        if (!resolved.has(dep)) queue.push(dep);
      }
    }
  }

  return [...resolved];
}

function generateComponentStub(name: string, _file: string): string {
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

type ${pascalName}Props = ComponentPropsWithoutRef<"div">;

export const ${pascalName} = forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("sigil-${name}", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

${pascalName}.displayName = "${pascalName}";
`;
}
