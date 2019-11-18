import { Subject } from "rxjs";
import { Chapter } from "../../../oith-lib/src/models/Chapter";
import {
  NoteCategories,
  NoteTypes
} from "../../../oith-lib/src/verse-notes/settings/note-gorup-settings";
import { NoteSettings } from "../../../oith-lib/src/processors/NoteSettings";
import { ShellStore } from "./models/ShellStore";
function findChapterInHistory(chapterID: string) {
  return shellStore.chapterHistory.find(c => c.chapter.id === chapterID);
}

export const shellStore = new ShellStore();

export const chapter$: Subject<Chapter> = new Subject();

export const noteCategories$: Subject<NoteCategories> = new Subject();
export const noteSettings$: Subject<NoteSettings> = new Subject();
export const noteTypes$: Subject<NoteTypes> = new Subject();
