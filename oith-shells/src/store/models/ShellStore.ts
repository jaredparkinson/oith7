import { Chapter } from "../../../../oith-lib/src/models/Chapter";
import { ChapterHistory } from './ChapterHistory';
export class ShellStore {
  public chapter?: Chapter;
  public readonly chapterHistory: ChapterHistory[] = [];
}
