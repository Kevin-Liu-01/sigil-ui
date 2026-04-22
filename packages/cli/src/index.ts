import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { presetCommand } from "./commands/preset.js";
import { diffCommand } from "./commands/diff.js";
import { doctorCommand } from "./commands/doctor.js";

const program = new Command();

program
  .name("sigil")
  .description("Sigil UI — structural-visibility design system CLI")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(presetCommand);
program.addCommand(diffCommand);
program.addCommand(doctorCommand);

program.parse();
