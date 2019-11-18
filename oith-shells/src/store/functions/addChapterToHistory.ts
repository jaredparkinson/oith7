import { Chapter } from "../../../../oith-lib/src/models/Chapter";
import { shellStore, chapter$ } from "../store";
import { findIndexOfChapter } from "./findIndexOfChapter";
import { getElementScrollPosition } from "../getElementScrollPosition";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";
export function addChapterToHistory(): Observable<void> {
  return chapter$.pipe(
    map(chapter => {
      if (chapter) {
        const chapterTop = getElementScrollPosition(".chapter-loader");
        const notesTop = getElementScrollPosition(
          "app-verse-notes,.verse-notes"
        );
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
    })
  );
}
