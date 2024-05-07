import exitListener from "./lib/listeners/exitListener.js";
import input from "./lib/input.js";
import endListener from "./lib/listeners/endListener.js";
import {
  fileEmptyErrorStatement,
  fileErrorStatement,
  fileSuccessStatement,
  exitStatement,
  noStoriesInDBStatement,
} from "./lib/statements.js";
import fetchDBStories from "./lib/fetchDBStories.js";
import handleSimilarityCheck from "./lib/handleSimilarityCheck.js";
import { fileURLToPath } from "url";
import path from "path";

const currentFilePath = fileURLToPath(import.meta.url);

// Absolute path to the project root directory
export const root = path.dirname(currentFilePath);

export const storiesCounter = {
  count: 0,
  message: `0/0`,
  length: 0,
};

export const activeKeyPresses = {
  save: false,
  confirmSave: false,
};

// listens for CTRL+C to terminate the program
exitListener();

// load the new story from the input file
const fileInput = input();

// couldn't find the file
if (!fileInput.success) fileErrorStatement();

// found the file empty
if (fileInput.tokens.length === 0) fileEmptyErrorStatement();

// all good with the input
fileSuccessStatement();

const stories = await fetchDBStories();

if (stories.length > 0) {
  await handleSimilarityCheck(stories, fileInput.tokens);
} else {
  noStoriesInDBStatement();
}

exitStatement();
activeKeyPresses.save = true;
await endListener(fileInput.newStory, fileInput.tokens);
process.exit();
