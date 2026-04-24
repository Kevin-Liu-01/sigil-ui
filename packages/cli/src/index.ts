import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { presetCommand } from "./commands/preset.js";
import { diffCommand } from "./commands/diff.js";
import { doctorCommand } from "./commands/doctor.js";
import { convertCommand } from "./commands/convert.js";

const program = new Command();

program
  .name("sigil")
  .description("Sigil UI — structural-visibility design system CLI")
  .version(readPackageVersion());

program.addCommand(initCommand);
program.addCommand(convertCommand);
program.addCommand(addCommand);
program.addCommand(presetCommand);
program.addCommand(diffCommand);
program.addCommand(doctorCommand);

program.parse();

function readPackageVersion(): string {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(dirname, "..", "package.json"),
    path.join(dirname, "..", "..", "package.json"),
  ];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(candidate, "utf-8")) as { version?: string };
      if (pkg.version) return pkg.version;
    } catch {
      // Fall through to the next candidate.
    }
  }

  return "0.0.0";
}
