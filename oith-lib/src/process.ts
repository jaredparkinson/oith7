import cheerio from 'cheerio';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { bufferCount, filter, flatMap, map, toArray } from 'rxjs/operators';
import { readFile$, writeFile$ } from './fs$';
import { fastGlob$, flatMap$, sortPath, unzipPath, flatPath } from './main';
import { chapterProcessor } from './processors/ChapterProcessor/chapterProcessor';
import { verseNoteProcessor } from './processors/verseNoteProcessor';
import {
  NoteCategories,
  NoteTypes,
} from './verse-notes/settings/note-gorup-settings';
import cuid = require('cuid');
import { sort } from './processors/sort';
import { navigationProcessor } from './processors/navigation-processor';
export const filterUndefined$ = filter(
  <T>(o: T) => o !== undefined && o !== null,
);

export function getFileType(document: CheerioStatic): Observable<string> {
  return of(document('html').attr('data-content-type'));
}

export function processExistingNotes($: CheerioStatic) {
  const verseNotes = $(
    'footer.study-notes [data-type*="verse"] > li',
  ).toArray();
  // console.log(
  //   $('[href*="note"][offsets]')
  //     .toArray()
  //     .map(o => $(o).attr('offsets')),
  // );

  verseNotes.map(verseNote => {
    const notes = $(verseNote)
      .find('li[id*="note"]')
      .toArray();
    notes.map(note => {
      const verseRef = $(`[href="#${note.attribs['id']}"]`);
      // const offsets = $(verseRef)
      //   .find('[offsets]')
      //   .toArray();

      // console.log(verseRef.attr());

      // console.log(verseRef.html());

      console.log($(verseRef).attr('offsets'));
      console.log(
        $(verseRef)
          .parent()
          .attr('offsets'),
      );
    });
  });
  // console.log(verseNotes.length);
}

export function process(noteTypes: NoteTypes, noteCategories: NoteCategories) {
  console.log('Processing Files');

  return loadFiles()
    .pipe(
      map(d => forkJoin(of(d), getFileType(d))),
      flatMap(o => o),
      map(([$, fileType]) => {
        switch (fileType) {
          case 'book':
          case 'manifest': {
            navigationProcessor($)
            break;
          }
          case 'overlay-note': {
            return verseNoteProcessor($, noteTypes, noteCategories);
            break;
          }
          default: {
            return chapterProcessor($).pipe(
              map(([chapter, $]) => {
                processExistingNotes($);
                // console.log(chapter.id);

                return chapter;
              }),
            );
          }
        }
        return EMPTY;
      }),
      flatMap(o => o),
      bufferCount(100),
      map(o => writeFile$(`${sortPath}/${cuid()}.json`, JSON.stringify(o))),
      flatMap(o => o),
      toArray(),
    )
    .pipe(
      map(() => sort()),
      flatMap(o => o),
      map(o => writeFile$(`${flatPath}/${o.id}.json`, JSON.stringify(o))),
      flatMap(o => o),
      toArray(),
    );
}
function loadFiles() {
  return fastGlob$(unzipPath).pipe(
    flatMap$,
    map(o =>
      readFile$(o).pipe(
        map(file => {
          return cheerio.load(file, { xmlMode: true, decodeEntities: false });
        }),
      ),
    ),
    flatMap$,
  );
}
