import path from "path";
import { writeFileSync, readdirSync, unlinkSync } from "fs";
export default function writeOutputFiles(similarStories) {
  emptyOutput();
  for (let i = 0; i < similarStories.length; i++) {
    writeFileSync(
      `Stories/output/${similarStories[i].id}`,
      similarStories[i].story
    );
  }
}

function emptyOutput() {
  const directory = "Stories/output";

  readdirSync(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      unlinkSync(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}
