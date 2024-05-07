import { storiesCounter } from "../index.js";
import prisma from "./prisma.js";
import { databaseStoriesStatements } from "./statements.js";

export default async function fetchDBStories() {
  const stories = await prisma.story.findMany();
  storiesCounter.length = stories.length;

  databaseStoriesStatements(stories.length);
  return stories;
}
