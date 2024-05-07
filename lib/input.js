import { readFileSync } from "fs";

export default function input() {
  let newStory;
  try {
    newStory = readFileSync("Stories/input", {
      encoding: "utf-8",
    });
  } catch (error) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    newStory: newStory,
    tokens: tokenizer(newStory),
  };
}

/**
 * tokenize the story
 * @param {String} story
 * @return {Array<string>} Array of tokens
 */
function tokenizer(story) {
  let tokens = story.split(/\W+/).filter((value) => {
    if (value !== "") return value;
  });
  return tokens;
}
