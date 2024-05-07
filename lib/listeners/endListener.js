import readline from "readline";
import { activeKeyPresses } from "../../index.js";
import {
  canceledSaveStatement,
  confirmSaveStatement,
  successfulSaveStatement,
} from "../statements.js";
import prisma from "../prisma.js";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

const endListener = async (story, tokens) => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.on("keypress", async (str, key) => {
      switch (key.name) {
        case "s":
        case "S":
          if (activeKeyPresses.save) {
            confirmSaveStatement();
            activeKeyPresses.save = false;
            activeKeyPresses.confirmSave = true;
          }

          break;
        case "y":
          if (activeKeyPresses.confirmSave) {
            //save story to db
            await prisma.story.create({
              data: {
                story,
                tokens: JSON.stringify(tokens),
              },
            });

            successfulSaveStatement();
            resolve();
            process.exit();
          }
        default:
          if (activeKeyPresses.confirmSave) {
            canceledSaveStatement();
            resolve();
            process.exit();
          }
          break;
      }
    })
  );
};

export default endListener;
