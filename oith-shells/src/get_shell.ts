import { Params } from './Params';
import { Chapter } from '../../oith-lib/src/models/Chapter';
import { addChapterToHistory } from './store/functions/addChapterToHistory';
import { Observable, forkJoin, of } from 'rxjs';
import { map, flatMap, delay } from 'rxjs/operators';
import { get$ } from './store/functions/get';
import { flatMap$ } from '../../oith-lib/src/rx/flatMap$';
import { findInDatabase } from './findInDatabase';
import { findInRemote } from './findInRemote';
import { findInHistory } from './findInHistory';
import { buildID } from './buildID';
import { buildNewShell } from './shells/build-shells';
import { highlightVerses } from './shells/highlightVerses';
import { chapter$ } from './store/store';
// import {  } from "../../oith-lib/src";
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

export class Settings {
  public textSize = 18;
  public notePaneWidth = 300;
  public notePaneWidthDisplay = 300;
  public notePaneHeight = 300;
  public notePaneHeightDisplay = 300;
  public noteCatList: Params = {};
  public oithHeaderTop = 0;
  public contentTop = 48;
  public lang = 'eng';
  public vis = {};
  public displayNav: boolean = true;
}

export type BuildShellOptions = {
  scrollToVerse: boolean;
  chapter?: Chapter;
  chapterParams: Params;
  checkHistory: boolean;
  id?: string;
  highlight?: string;
  context?: string;
  checkDatabase: boolean;
  settings: Settings;
  get: (id: string) => Observable<Chapter>;
  findInDB?: (id: string) => Observable<Chapter>;
  chapterTop: number;
  notesTops: number;
  resetShell?: boolean;
};

function buildShell(buildShellOptions: BuildShellOptions) {
  if (buildShellOptions.chapter && buildShellOptions.resetShell) {
    return forkJoin(
      highlightVerses(buildShellOptions.chapter.verses, buildShellOptions),
      buildNewShell(buildShellOptions.chapter),
    ).pipe(
      map(() => {
        return buildShellOptions;
      }),
    );
  }
  return of(buildShellOptions);
}

// type BuildShellOptions = {
//   checkHistory: boolean;
//   checkDatabase: boolean;
//   get?: (id: string) => Observable<Chapter> | Promise<Chapter>;
//   findInDB?: (id: string) => void;
// };

export function getShell(
  buildShellOptions: BuildShellOptions = {
    checkHistory: false,
    checkDatabase: false,
    findInDB: undefined,
    chapterParams: [],
    get: get$,
    settings: new Settings(),
    scrollToVerse: false,
    chapterTop: 0,
    notesTops: 0,
  },
) {
  return addChapterToHistory()
    .pipe(
      map(() => buildID(buildShellOptions)),
      flatMap$,
      map(buildShellOptions => findInHistory(buildShellOptions)),
      flatMap$,
      map(buildShellOptions => findInDatabase(buildShellOptions)),
      flatMap$,
      map(buildShellOptions => findInRemote(buildShellOptions)),
      flatMap(o => o),
    )
    .pipe(
      map(buildShellOptions => buildShell(buildShellOptions)),
      flatMap(o => o),
      map(buildShellOptions => {
        if (buildShellOptions.chapter) {
          chapter$.next(buildShellOptions.chapter);
          return buildShellOptions;
        }
        throw new Error(`No chapter was found.`);
      }),
      delay(200),
      // map(buildShellOptions => {}),
    );
}
