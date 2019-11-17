import { Chapter } from "../../../../oith-lib/src/models/Chapter";
import { shellStore } from '../store';
import { findIndexOfChapter } from "./findIndexOfChapter";
import { getElementScrollPosition } from '../getElementScrollPosition';
export function addChapterToHistory(chapter?: Chapter): void {
  if (chapter) {

    const chapterTop = getElementScrollPosition('.chapter-loader');
    const notesTop = getElementScrollPosition('app-verse-notes,.verse-notes')
    const chapterIndex = findIndexOfChapter(chapter);
    chapterIndex > 0
      ? (shellStore.chapterHistory[chapterIndex] = {
        chapter: chapter,
        chapterTop: chapterTop,
        notesTop: notesTop
      })
      : shellStore.chapterHistory.push({
        chapterTop: chapterTop,
        chapter: chapter,
        notesTop: notesTop
      });
  }
}
