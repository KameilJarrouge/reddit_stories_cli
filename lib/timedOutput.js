export default function timedOutput(
  pre_message,
  messageObject,
  intervals = 200
) {
  let interval = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(pre_message + messageObject.message);
  }, intervals);
  return interval;
}
