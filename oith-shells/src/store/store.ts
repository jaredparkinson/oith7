import { Subject } from "rxjs";
import { Chapter } from "../../../oith-lib/src/models/Chapter";
import { ShellStore } from "./models/ShellStore";
function findChapterInHistory(chapterID: string) {
  return shellStore.chapterHistory.find(c => c.chapter.id === chapterID);
}

export const shellStore = new ShellStore();

const chapter$: Subject<Chapter> = new Subject();


