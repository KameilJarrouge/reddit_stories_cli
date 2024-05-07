import { storiesCounter } from "../index.js";
import timedOutput from "./timedOutput.js";
import similaritySum from "./similarity.js";
import { successPointer } from "./pointer.js";
import { afterIntervalStatement, finishedStatement } from "./statements.js";
import writeOutputFiles from "./writeOutputFiles.js";

export default async function handleSimilarityCheck(stories, newTokens) {
  const similarStories = [];

  const progressInterval = timedOutput("Checking Similarity: ", storiesCounter);

  await new Promise((resolve) => {
    let sum = 0;
    for (let i = 0; i < stories.length; i++) {
      // get the sum of the same tokens in the same place
      sum = similaritySum(JSON.parse(stories[i].tokens), newTokens);

      // doubt uniqueness if half the tokens of the new story matched
      if (sum > Math.ceil(newTokens.length / 2)) {
        similarStories.push(stories[i]);
      }
      storiesCounter.message = `${++storiesCounter.count}/${
        storiesCounter.length
      }`;
      sum = 0;
    }
    resolve();
  });

  clearInterval(progressInterval);
  afterIntervalStatement(storiesCounter);
  writeOutputFiles(similarStories);
  finishedStatement(similarStories.map((story) => story.id));
}
