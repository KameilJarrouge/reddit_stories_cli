import chalk from "chalk";
import { errorPointer, successPointer, warnPointer } from "./pointer.js";

export function fileErrorStatement() {
  console.log(`${errorPointer} Input file was not found.`);
  console.log(
    `${warnPointer} Please make sure there is a file named 'input' in the 'Stories' directory.`
  );
  process.exit();
}
export function fileEmptyErrorStatement() {
  console.log(`${errorPointer} Input file was empty.`);
  console.log(
    `${warnPointer} Please make sure the file 'input' in the 'Stories' directory is not empty.`
  );
  process.exit();
}

export function fileSuccessStatement() {
  console.log(`${successPointer} Imported story from file successfully!`);
}

export function exitStatement() {
  console.log(chalk.green("╭" + "─".repeat(59) + "╮"));
  console.log(
    `${chalk.green("│")}Press ${chalk.bold(
      "'s'"
    )} to save story or ${chalk.bold("'CTRL+C'")} to exit ${chalk.underline(
      "without saving"
    )}.${chalk.green("│")}`
  );
  console.log(chalk.green("╰" + "─".repeat(59) + "╯"));
}

export function databaseStoriesStatements(length) {
  console.log(
    `${successPointer} Fetched ${chalk.bold(length)} stories from database`
  );
}

export function noStoriesInDBStatement() {
  console.log(
    `${successPointer} No stories in database, let's remedy that shall we :)`
  );
}

export function confirmSaveStatement() {
  process.stdout.write(`Are you sure you want to add this story? (y): `);
}

export function successfulSaveStatement() {
  console.log(`\n${successPointer} Story saved!`);
}

export function canceledSaveStatement() {
  console.log(`\n${warnPointer} Canceled save!`);
}

export function afterIntervalStatement(storiesCounter) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(
    `Checking Similarity: ${storiesCounter.count}/${storiesCounter.length}\n`
  );
}

/**
 *
 * @param {Array<number>} similarStoriesIds
 */
export function finishedStatement(similarStoriesIds) {
  console.log(
    `${successPointer} Finished checking! ${
      similarStoriesIds.length === 0
        ? chalk.green("No similar stories found!")
        : chalk.red(
            `Found ${similarStoriesIds.length} similar stories (check in Stories/output)!`
          )
    }`
  );
}
