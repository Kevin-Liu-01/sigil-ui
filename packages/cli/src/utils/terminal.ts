import chalk from "chalk";

type SpinnerName = "braille" | "helix" | "arc" | "dots";

const SPINNERS: Record<SpinnerName, { frames: string[]; interval: number }> = {
  braille: { frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"], interval: 80 },
  helix: { frames: ["⠋⠁", "⠙⠂", "⠹⠄", "⢸⡀", "⣰⢀", "⣤⠠", "⣆⠐", "⡇⠈"], interval: 80 },
  arc: { frames: ["◜", "◠", "◝", "◞", "◡", "◟"], interval: 100 },
  dots: { frames: ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"], interval: 80 },
};

export const symbols = {
  success: chalk.green("✓"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✗"),
  skip: chalk.yellow("↗"),
  bullet: chalk.gray("•"),
};

const SIGIL_ART = String.raw`
   ________.__      .__.__
  /   _____/|__| ____ |__|  |
  \_____  \ |  |/ ___\|  |  |
  /        \|  / /_/  >  |  |__
 /_______  /|__\___  /|__|____/
         \/   /_____/
`;

export function printIntro(title: string, subtitle: string): void {
  console.log();
  console.log(chalk.cyan(SIGIL_ART));
  console.log(chalk.bold(`  ${title}`));
  console.log(chalk.dim(`  ${subtitle}`));
  console.log();
}

export function printSuccess(title: string, rows: Array<[string, string | undefined]> = []): void {
  console.log();
  console.log(chalk.bold.green(`  ${symbols.success} ${title}`));
  if (rows.length > 0) {
    console.log();
    for (const [label, value] of rows) {
      if (value) console.log(`  ${chalk.dim(label.padEnd(11))}${chalk.cyan(value)}`);
    }
  }
  console.log();
}

export async function withSpinner<T>(
  label: string,
  task: () => T | Promise<T>,
  options: { spinner?: SpinnerName; successText?: string; failText?: string } = {},
): Promise<T> {
  if (!process.stdout.isTTY) {
    console.log(chalk.dim(`  ${label}...`));
    const result = await task();
    console.log(symbols.success, options.successText ?? label);
    return result;
  }

  const spinner = SPINNERS[options.spinner ?? "helix"];
  let frame = 0;
  process.stdout.write(`  ${chalk.cyan(spinner.frames[frame])} ${label}`);
  const timer = setInterval(() => {
    frame = (frame + 1) % spinner.frames.length;
    process.stdout.write(`\r  ${chalk.cyan(spinner.frames[frame])} ${label}`);
  }, spinner.interval);

  try {
    const result = await task();
    clearInterval(timer);
    process.stdout.write(`\r  ${symbols.success} ${options.successText ?? label}\n`);
    return result;
  } catch (error) {
    clearInterval(timer);
    process.stdout.write(`\r  ${symbols.error} ${options.failText ?? label}\n`);
    throw error;
  }
}

