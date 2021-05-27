import { forkJoin, of } from 'rxjs';
import { filter, find, flatMap, map, toArray } from 'rxjs/operators';
import { flatMap$, loadnoteSettings } from '../main';
import {
  NoteCategories,
  NoteTypes,
} from '../verse-notes/settings/note-gorup-settings';
import { Note, NoteRef, VerseNote } from '../verse-notes/verse-note';

function parseVerseNoteElementID($: CheerioStatic, element: CheerioElement) {
  if (element.attribs['id'] === '') {
    console.log('throw 1');
    throw element.data;
  }
  return of($(element).attr('id'));
}

function parseNoteType(
  $: CheerioStatic,
  noteElement: CheerioElement,
  noteTypes: NoteTypes,
) {
  return of(noteTypes.noteTypes).pipe(
    flatMap$,
    find((o) => o.className === $(noteElement).attr('class')),
    map((o) => {
      if (!o) {
        console.log(
          `Overlay ${$(noteElement).attr('class')} is missing in the files`,
        );
      }
      return o ? o.noteType : -1;
    }),
  );
}

function parseNoteCategory(
  $: CheerioStatic,
  noteRefLabel: Cheerio,
  noteCategories: NoteCategories,
) {
  const noteCategoryAttr = $(noteRefLabel).attr('category-type');

  const nc = noteCategories.noteCategories.find((n) => {
    // const classList = $(noteRefLabel).attr('class');
    return `reference-label-${noteCategoryAttr}` === `${n.className}`;
    // return classList ? classList.includes(n.className) : false;
  });
  if (nc) {
    $(noteRefLabel).remove();
    // noteRefLabel.parent.;
    return of(nc.category);
  }

  // console.log($(noteRefLabel));

  console.log(
    `Not valid ${$(noteRefLabel).attr('class')} ${$(noteRefLabel).text()} `,
  );
  return of(-1);
  // throw noteRefLabel.innerHTML;
}
function parseNoteRef(
  $: CheerioStatic,
  noteRefElement: CheerioElement,
  noteCategories: NoteCategories,
) {
  const refLabelElement = $('[class*="note-reference"]', noteRefElement);
  if (refLabelElement) {
    return parseNoteCategory($, $(noteRefElement), noteCategories).pipe(
      map(
        (noteCategory): NoteRef => {
          return new NoteRef(noteCategory, $(noteRefElement).html() as string);
        },
      ),
    );
  }
  console.log('throw 3');
  throw noteRefElement.data;
}

function parseNotePhrase($: CheerioStatic, noteE: CheerioElement) {
  const notePhraseElement = $('.note-phrase', noteE);

  if (notePhraseElement) {
    return of($(notePhraseElement).html() as string);
  }

  console.log('throw 4');
  throw noteE.attribs['id'];
}

function parseOffsets(noteElement: CheerioElement) {
  return of(noteElement.attribs['offsets']);
}
function parseNoteUrl($: CheerioStatic, noteElement: CheerioElement) {
  const popupElement = $(noteElement).find('pop-up');

  return of(popupElement.attr('url'));
}
function parseNotePronunciation(noteElement: CheerioElement) {
  // const popupElement = $(noteElement).find('pop-up');
  return of(noteElement.attribs['href']);
  // return of(popupElement.attr('url'));
}

function parseSup(noteElement: CheerioElement) {
  return of(noteElement.attribs['note-marker']);
}

function parseSourceID(noteElement: CheerioElement) {
  return of(noteElement.attribs['sourceID'] as string | undefined);
}
function parseNoteMap(
  $: CheerioStatic,
  noteElement: CheerioElement,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  const parseNoteRefs = () => {
    const refs = $('.note-reference', noteElement)
      .toArray()
      .map((nre) => {
        return parseNoteRef($, nre, noteCategories).toPromise();
      });

    return Promise.all(refs);
  };
  return forkJoin(
    parseNotePhrase($, noteElement),
    parseNoteType($, noteElement, noteTypes),
    // of($('.note-reference', noteElement)).pipe(
    //   flatMap(o => o),
    //   map(nre => {
    //     return parseNoteRef($, nre, noteCategories);
    //   }),
    //   flatMap$,
    //   toArray(),
    // ),
    of(parseNoteRefs()).pipe(flatMap$),
    parseOffsets(noteElement),
    parseNoteUrl($, noteElement),
    parseNotePronunciation(noteElement),
    parseSup(noteElement),
    parseSourceID(noteElement),
  ).pipe(
    map(
      ([
        notePhrase,
        noteType,
        noteRefs,
        offsets,
        url,
        speak,
        sup,
        sourceID,
      ]) => {
        return new Note(
          noteElement.attribs['id'],
          noteRefs,
          noteType,
          notePhrase,
          offsets,
          url,
          speak,
          sup,
          sourceID,
        );
      },
    ),
  );
}

function parseNotes(
  $: CheerioStatic,
  verseNoteElement: CheerioElement,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return of($('note', verseNoteElement).toArray()).pipe(
    flatMap((o) => o),
    map((o) => parseNoteMap($, o, noteTypes, noteCategories)),
    flatMap$,
    toArray(),
  );
}

function parseVerseNote(
  $: CheerioStatic,

  verseNoteElement: CheerioElement,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return forkJoin(
    parseVerseNoteElementID($, verseNoteElement),
    parseNotes($, verseNoteElement, noteTypes, noteCategories).pipe(
      filter((o) => o.length > 0),
    ),
  ).pipe(
    map(([id, notes]) => {
      return new VerseNote(id as string, notes);
    }),
  );
}
export function verseNoteProcessor(
  document: CheerioStatic,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  document;
  noteTypes;
  noteCategories;
  return of(document('verse-notes').toArray()).pipe(
    flatMap((o) => o),
    map((verseNoteElement) => {
      return parseVerseNote(
        document,
        verseNoteElement,
        noteTypes,
        noteCategories,
      );
    }),
    flatMap$,
  );
}
