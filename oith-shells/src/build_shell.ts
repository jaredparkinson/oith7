import { Params } from "./Params";
import { Chapter } from "../../oith-lib/src/models/Chapter";

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
