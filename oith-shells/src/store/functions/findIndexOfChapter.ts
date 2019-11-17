import { Chapter } from "../../../../oith-lib/src/models/Chapter";
import { shellStore } from '../store';
export function findIndexOfChapter(chapter: Chapter) {
  return shellStore.chapterHistory.findIndex(c => c.chapter.id === chapter.id);
}
