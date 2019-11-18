import { buildFMergedOld } from './buildFMerged';
import {
  FormatGroup,
  VersePlaceholder,
  FormatText,
  Verse,
  Chapter,
} from '../../../oith-lib/src/models/Chapter';
import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import {
  filter,
  map,
  toArray,
  groupBy,
  mergeMap,
  flatMap,
  take,
} from 'rxjs/operators';
import { flatMap$ } from '../../../oith-lib/src/rx/flatMap$';
import {
  VerseNote,
  VerseNoteGroup,
} from '../../../oith-lib/src/verse-notes/verse-note';
import { chapter$ } from '../store/store';
import { BuildShellOptions } from '../get_shell';

function findFormatGroupsWithVerseIDs(
  formatGroup: FormatGroup,
): Observable<VersePlaceholder> {
  return of(
    formatGroup.grps as (FormatGroup | FormatText | VersePlaceholder)[],
  ).pipe(
    filter(o => o !== undefined),
    flatMap$,
    map(o => {
      if ((o as VersePlaceholder).v !== undefined) {
        return of(o as VersePlaceholder);
      }
      return findFormatGroupsWithVerseIDs(o as FormatGroup);
    }),
    flatMap$,
  );
}

function findVerse(verses: Verse[], verseID: string) {
  return of(verses.find(v => v.id === verseID));
}

export function generateVerseNoteShell(chapter: Chapter) {
  const verseNotes = chapter.verses
    .map(v => {
      return (chapter.verseNotes
        ? chapter.verseNotes.find(
            vN =>
              vN.id ===
              `${chapter.id.replace('-chapter', '')}-${v.id}-verse-notes`,
          )
        : undefined) as VerseNote;
    })
    .filter(o => o !== undefined);
  return of((chapter.verseNotes = verseNotes));
}

export function addVersesToBody(chapter: Chapter) {
  return findFormatGroupsWithVerseIDs(chapter.body).pipe(
    map(o => {
      o.verse = chapter.verses.find(v => v.id === o.v);
    }),
    toArray(),
  );
}

function extractFormatText(
  verse: FormatGroup | Verse | FormatText,
): Observable<FormatText> {
  if (Array.isArray((verse as FormatGroup | Verse).grps)) {
    return of(
      (verse as FormatGroup | Verse).grps as (FormatGroup | FormatText)[],
    ).pipe(
      flatMap$,
      map(o => extractFormatText(o)),
      flatMap$,
    );
  } else if ((verse as FormatText).docType === 5) {
    return of(verse as FormatText);
  }

  return EMPTY;
}

export function highlightContext(
  verses: Verse[],
  chapterParams: BuildShellOptions,
  hC: 'highlight' | 'context',
) {
  (chapterParams[hC] as string).split(',').map(h => {
    if (h.includes('-')) {
      const hSplit = h.split('-');

      const firstIndex = verses.findIndex(v => v.id === hSplit[0]);
      const lastIndex = verses.findIndex(v => v.id === hSplit[1]);

      verses.slice(firstIndex, lastIndex + 1).map(v => (v[hC] = true));
    } else {
      const verse = verses.find(v => v.id === h);
      if (verse) {
        verse[hC] = true;
      }
    }
  });
}

/* For chapters with notes, generateVerseNoteGroups groups
  those notes by their note phrase.
*/
function generateVerseNoteGroups(verseNotes?: VerseNote[]) {
  if (verseNotes) {
    return of(verseNotes).pipe(
      flatMap$,
      map(vN => {
        if (vN.notes) {
          return of(vN.notes).pipe(
            flatMap$,
            groupBy(n => n.phrase),
            mergeMap(o =>
              o.pipe(
                toArray(),
                map(
                  (notes): VerseNoteGroup => {
                    const n = notes.sort((a, b) => a.noteType - b.noteType);
                    return new VerseNoteGroup(notes, '');
                  },
                ),
              ),
            ),
            toArray(),
            map(ng => {
              vN.noteGroups = ng;
            }),
          );
        }
        return EMPTY;
      }),
      flatMap(o => o),
      toArray(),
    );
  }

  return EMPTY;
}

export function buildNewShell(chapter: Chapter) {
  return of(chapter).pipe(
    map(chapter => {
      return forkJoin(
        generateVerseNoteGroups(chapter.verseNotes).pipe(
          map(() => buildFMergedOld(chapter)),
          flatMap(o => o),
        ),
      );
    }),
    flatMap(o => o),
  );
}
