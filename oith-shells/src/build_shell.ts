import { Params } from "./Params";
import { Chapter } from "../../oith-lib/src/models/Chapter";

// TODO
/*
  Steps for building a shell.
  1. Add current chapter(if any), to history. This saves the current scrolling state of the chapter and notes as well as the current state of the format tags.
    a. If possible, this should cache so it doesn't live in memory
  2. Check chapter history for chapter
    a. This is only called if checkHistory is true
      i. checkHistory is only true if the back or forward buttons are clicked
  3. For version 7( and probably the mobile app), there will be an option to check the local database.
    a. The findInDB method is an optional parameter, and will not be avaliable in the port

*/

export type BuildShell = {
  chapterParams: Params;
  chapter?: Chapter;
};

function addChapterHistory() {}

export function buildShell(
  id: string,
  chapterParams: BuildShell,
  options: {
    checkHistory: boolean;
    checkDatabase: boolean;
    findInDB?: (id: string) => void;
  } = { checkHistory: false, checkDatabase: false, findInDB: undefined }
) {}
