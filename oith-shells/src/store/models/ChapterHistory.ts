import { Chapter } from "../../../../oith-lib/src/models/Chapter";
export class ChapterHistory {
  public chapterTop: number;
  public notesTop: number;
  public chapter: Chapter;
  constructor(chapter: Chapter, chapterTop: number, notesTop: number) {
    this.chapter = chapter;
    this.chapterTop = chapterTop;
    this.notesTop = notesTop;
  }
}
