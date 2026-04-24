import chalk from "chalk";

const HELIX = { frames: ["⠋⠁", "⠙⠂", "⠹⠄", "⢸⡀", "⣰⢀", "⣤⠠", "⣆⠐", "⡇⠈"], interval: 80 };

const SIGIL_ART = String.raw`
   ________.__      .__.__
  /   _____/|__| ____ |__|  |
  \_____  \ |  |/ ___\|  |  |
  /        \|  / /_/  >  |  |__
 /_______  /|__\___  /|__|____/
         \/   /_____/
`;

export const symbols = {
  success: chalk.green("✓"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✗"),
};

export function printIntro(title: string, subtitle: string): void {
  console.log();
  console.log(chalk.cyan(SIGIL_ART));
  console.log(chalk.bold(`  ${title}`));
  console.log(chalk.dim(`  ${subtitle}`));
  console.log();
}

export async function withSpinner<T>(
  label: string,
  task: () => T | Promise<T>,
  successText = label,
): Promise<T> {
  if (!process.stdout.isTTY) {
    console.log(chalk.dim(`  ${label}...`));
    const result = await task();
    console.log(`  ${symbols.success} ${successText}`);
    return result;
  }

  let frame = 0;
  process.stdout.write(`  ${chalk.cyan(HELIX.frames[frame])} ${label}`);
  const timer = setInterval(() => {
    frame = (frame + 1) % HELIX.frames.length;
    process.stdout.write(`\r  ${chalk.cyan(HELIX.frames[frame])} ${label}`);
  }, HELIX.interval);

  try {
    const result = await task();
    clearInterval(timer);
    process.stdout.write(`\r  ${symbols.success} ${successText}\n`);
    return result;
  } catch (error) {
    clearInterval(timer);
    process.stdout.write(`\r  ${symbols.error} ${label}\n`);
    throw error;
  }
}

