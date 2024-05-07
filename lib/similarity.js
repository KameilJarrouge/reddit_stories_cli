/**
 *
 * @param {Array<string>} existing
 * @param {Array<string>} target
 * @returns {number}
 */
export default function similaritySum(existing, target) {
  let counter = 0;
  let similarityCounter = 0;
  while (counter < existing.length && counter < target.length) {
    if (existing[counter] === target[counter]) similarityCounter++;
    counter++;
  }
  return similarityCounter;
}
