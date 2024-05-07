import path from "path";
import { writeFileSync, readdirSync, unlinkSync } from "fs";
import { root } from "../index.js";
export default function writeOutputFiles(similarStories) {
  emptyOutput();
  for (let i = 0; i < similarStories.length; i++) {
    writeFileSync(
      `${root}/Stories/output/${similarStories[i].id}`,
      similarStories[i].story
    );
  }
}

function emptyOutput() {
  const directory = root + "/Stories/output";

  readdirSync(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      unlinkSync(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}
