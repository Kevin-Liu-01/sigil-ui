import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { readConfig, configExists } from "../utils/config.js";

export const diffCommand = new Command("diff")
  .description("Show token changes since last sync")
  .action(async () => {
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
    const tokensPath = path.join(cwd, config.tokensPath);
    const snapshotPath = path.join(cwd, ".sigil", "tokens.snapshot.css");

    if (!fs.existsSync(tokensPath)) {
      console.log(chalk.red("✗"), `Token file not found: ${config.tokensPath}`);
      return;
    }

    const currentContent = fs.readFileSync(tokensPath, "utf-8");

    if (!fs.existsSync(snapshotPath)) {
      fs.ensureDirSync(path.dirname(snapshotPath));
      fs.writeFileSync(snapshotPath, currentContent, "utf-8");
      console.log(chalk.green("✓"), "Created initial token snapshot.");
      console.log(chalk.dim("  Run again after making changes to see a diff."));
      return;
    }

    const snapshotContent = fs.readFileSync(snapshotPath, "utf-8");

    if (currentContent === snapshotContent) {
      console.log(chalk.green("✓"), "No token changes since last sync.");
      return;
    }

    const currentLines = currentContent.split("\n");
    const snapshotLines = snapshotContent.split("\n");

    console.log(chalk.bold("Token changes since last sync:"));
    console.log();

    const added: string[] = [];
    const removed: string[] = [];
    const modified: Array<{ line: string; was: string }> = [];

    const currentVars = extractCssVars(currentLines);
    const snapshotVars = extractCssVars(snapshotLines);

    for (const [key, value] of currentVars) {
      const oldValue = snapshotVars.get(key);
      if (oldValue === undefined) {
        added.push(`${key}: ${value}`);
      } else if (oldValue !== value) {
        modified.push({ line: `${key}: ${value}`, was: `${key}: ${oldValue}` });
      }
    }

    for (const [key, value] of snapshotVars) {
      if (!currentVars.has(key)) {
        removed.push(`${key}: ${value}`);
      }
    }

    if (added.length > 0) {
      console.log(chalk.green.bold(`+ ${added.length} added`));
      for (const line of added) {
        console.log(chalk.green(`  + ${line}`));
      }
      console.log();
    }

    if (removed.length > 0) {
      console.log(chalk.red.bold(`- ${removed.length} removed`));
      for (const line of removed) {
        console.log(chalk.red(`  - ${line}`));
      }
      console.log();
    }

    if (modified.length > 0) {
      console.log(chalk.yellow.bold(`~ ${modified.length} modified`));
      for (const m of modified) {
        console.log(chalk.red(`  - ${m.was}`));
        console.log(chalk.green(`  + ${m.line}`));
      }
      console.log();
    }

    if (added.length === 0 && removed.length === 0 && modified.length === 0) {
      console.log(chalk.dim("  File content changed but no CSS variable differences detected."));
    }

    console.log(
      chalk.dim("Run"),
      chalk.cyan("sigil diff --sync"),
      chalk.dim("to update the snapshot."),
    );
  });

diffCommand
  .command("sync")
  .description("Update the token snapshot to the current state")
  .action(() => {
    const cwd = process.cwd();
    const config = readConfig(cwd);
    if (!config) {
      console.log(chalk.red("✗"), "No sigil.config.ts found.");
      process.exit(1);
    }

    const tokensPath = path.join(cwd, config.tokensPath);
    const snapshotPath = path.join(cwd, ".sigil", "tokens.snapshot.css");

    if (!fs.existsSync(tokensPath)) {
      console.log(chalk.red("✗"), `Token file not found: ${config.tokensPath}`);
      return;
    }

    const content = fs.readFileSync(tokensPath, "utf-8");
    fs.ensureDirSync(path.dirname(snapshotPath));
    fs.writeFileSync(snapshotPath, content, "utf-8");
    console.log(chalk.green("✓"), "Token snapshot updated.");
  });

function extractCssVars(lines: string[]): Map<string, string> {
  const vars = new Map<string, string>();
  for (const line of lines) {
    const match = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?)\s*;/);
    if (match) {
      vars.set(match[1], match[2]);
    }
  }
  return vars;
}
