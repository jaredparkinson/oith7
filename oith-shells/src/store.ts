import { Chapter } from "../../oith-lib/src/models/Chapter";
export class ShellStore {
  public chapter?: Chapter;
  public readonly chapterHistory: Chapter[] = [];
}
