import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NoteCategories,
  NoteCategory,
} from '../verse-notes/settings/note-gorup-settings';
import { getElementAttribute } from './getElementAttribute';
import { parseLanguage } from './note-categories-processor';

export function getAttribute(element: Element, attr: string) {
  return of(element.getAttribute(attr)).pipe(map((o) => (o ? o : '')));
}

export class NoteOverlays {
  public noteOverlays: NoteOverlay[];

  constructor(noteOverlays: NoteOverlay[]) {
    this.noteOverlays = noteOverlays;
  }
}
export class NoteOverlay {
  public name: string;
  public shortName: string;
  public className: string;
  public sort: number;

  constructor(
    name: string,
    shortName: string,
    className: string,
    sort: string,
  ) {
    this.name = name;
    this.shortName = shortName;
    this.className = className;
    this.sort = parseInt(sort);
  }
}

export function noteOverlaysProcessor(document: Document): NoteOverlays {
  const noteOverlayElements = Array.from(
    document.querySelectorAll('note-overlays note-overlay'),
  );

  if (noteOverlayElements.length === 0) {
    throw new Error(`No note-overlay elements found in settings.`);
  }

  const noteGroups = noteOverlayElements.map((noteGroupElement) => {
    const name = getElementAttribute(noteGroupElement, 'name');
    const shortName = getElementAttribute(noteGroupElement, 'short-name');
    const className = getElementAttribute(noteGroupElement, 'class');
    const sort = getElementAttribute(noteGroupElement, 'sort');
    return new NoteOverlay(name, shortName, className, sort);
  });

  return new NoteOverlays(noteGroups);
}

export function noteCategoriesProcessor(document: Document): NoteCategories {
  const noteCategoryElements = Array.from(
    document.querySelectorAll('note-categories note-category'),
  );

  if (noteCategoryElements.length === 0) {
    throw new Error(`No note-category elements found in settings.`);
  }
  const lang = parseLanguage(document);

  const noteCatagories = noteCategoryElements.map((noteGroupElement) => {
    const name = getElementAttribute(noteGroupElement, 'name');
    const label = getElementAttribute(noteGroupElement, 'label');
    const className = getElementAttribute(noteGroupElement, 'class');
    const categoriesOn = noteGroupElement.getAttribute('on');
    const categoriesOff = noteGroupElement.getAttribute('off');
    const noteCategory = getElementAttribute(noteGroupElement, 'note-category');
    return new NoteCategory(
      name,
      label,
      className,
      noteCategory,
      categoriesOn,
      categoriesOff,
    );
  });

  return new NoteCategories(`${lang}-noteCategories`, noteCatagories);
}
