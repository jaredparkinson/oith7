import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import {
  filter,
  find,
  flatMap,
  groupBy,
  map,
  mergeMap,
  toArray,
} from 'rxjs/operators';
import {
  Chapter,
  FormatGroup,
  FormatMerged,
  FormatText,
  Verse,
  VersePlaceholder,
} from '../models/Chapter';
import { flatMap$ } from '../rx/flatMap$';
import { VerseNote, VerseNoteGroup } from '../verse-notes/verse-note';

function findFormatGroupsWithVerseIDs(
  formatGroup: FormatGroup,
  // isBody: boolean,
): Observable<VersePlaceholder> {
  return of(formatGroup.grps as (
    | FormatGroup
    | FormatText
    | VersePlaceholder)[]).pipe(
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

// function findFormatGroupsWithVerseIDs(
//   formatGroup: FormatGroup,
//   // isBody: boolean,
// ): Observable<FormatGroup> {
//   if (Array.isArray(formatGroup.verseIDs)) {
//     if (Array.isArray(formatGroup.grps)) {
//       return forkJoin(
//         of(formatGroup.grps).pipe(
//           flatMap$,
//           map(o => findFormatGroupsWithVerseIDs(o)),
//           flatMap$,
//           toArray(),
//         ),
//         of([formatGroup]),
//       ).pipe(
//         flatMap$,
//         flatMap$,
//       );
//     }
//     return of(formatGroup);
//   } else {
//     return of(formatGroup.grps as FormatGroup[]).pipe(
//       filter(o => o !== undefined),
//       flatMap$,
//       map(o => findFormatGroupsWithVerseIDs(o)),
//       flatMap$,
//     );
//   }

//   return EMPTY;
// }

function findVerse(verses: Verse[], verseID: string) {
  return of(verses).pipe(
    flatMap$,
    find(o => o.id === verseID),
  );
}

export function generateVerseNoteShell(chapter: Chapter) {
  return of(chapter.verses).pipe(
    flatMap$,
    map(v => {
      return (chapter.verseNotes
        ? chapter.verseNotes.find(
            vN =>
              vN.id ===
              `${chapter.id.replace('-chapter', '')}-${v.id}-verse-notes`,
          )
        : undefined) as VerseNote;
    }),
    filter(o => o !== undefined),
    toArray(),
  );
}

// export function prepareVerseNotes(verseNotes: VerseNote[]) {}

export function addVersesToBody(chapter: Chapter) {
  return findFormatGroupsWithVerseIDs(chapter.body).pipe(
    map(o => {
      return of(o).pipe(
        map(o => findVerse(chapter.verses, o.v)),
        flatMap$,
        filter(o => o !== undefined),
        // toArray(),
        map(verses => {
          o.verse = verses; //as Verse[];
        }),
      );
      // (o.verseIDs as string[]).map(vID => {
      //   const verse = chapter.verses.find(v => v.id === vID);
      // });
    }),
    flatMap$,
    toArray(),
  );
}

function extractFormatText(
  verse: FormatGroup | Verse | FormatText,
): Observable<FormatText> {
  if (Array.isArray((verse as FormatGroup | Verse).grps)) {
    return of((verse as FormatGroup | Verse).grps as (
      | FormatGroup
      | FormatText)[]).pipe(
      flatMap$,
      map(o => extractFormatText(o)),
      flatMap$,
    );
  } else if ((verse as FormatText).docType === 5) {
    return of(verse as FormatText);
  }

  return EMPTY;
}

function addTextToFormatText(verse: Verse, formatText: FormatText) {
  if (formatText.offsets) {
    const split = formatText.offsets.split('-');

    return of(
      (formatText.formatMerged = [
        new FormatMerged(
          verse.text.slice(parseInt(split[0], 10), parseInt(split[1], 10) + 1),
        ),
      ]),
    );
  }

  return EMPTY;
}

function resetVerse(verse: Verse) {
  return extractFormatText(verse).pipe(
    map(o => {
      return addTextToFormatText(verse, o);
    }),
    flatMap$,
    toArray(),
    map(o => o),
  );
}

function resetVerses(verses: Verse[]) {
  return of(verses).pipe(
    flatMap$,
    map(v => resetVerse(v)),
    flatMap$,
    toArray(),
  );
}

function highlightVerses(verses: Verse[]) {
  return of(verses);
}

function generateVerseNoteGroups(verseNotea?: VerseNote[]) {
  if (verseNotea) {
    return of(verseNotea).pipe(
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
  return forkJoin(
    resetVerses(chapter.verses),
    generateVerseNoteGroups(chapter.verseNotes),
  );
}
