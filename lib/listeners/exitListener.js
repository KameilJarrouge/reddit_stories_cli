import readline from "readline";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

const exitListener = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.on("keypress", async (str, key) => {
      switch (key.name) {
        case "c":
          if (key.ctrl) {
            resolve();
            process.exit();
          }
          break;
        default:
          break;
      }
    })
  );
};

export default exitListener;
