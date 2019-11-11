import { Component, OnInit, Input } from '@angular/core';
import {
  VerseNote,
  Note,
  VerseNoteGroup,
} from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'verse-note',
  templateUrl: './verse-note.component.html',
  styleUrls: ['./verse-note.component.scss'],
})
export class VerseNoteComponent implements OnInit {
  @Input() public verseNote: VerseNote;
  public verseNoteGroups?: VerseNoteGroup[];
  public shortTitle?: string;
  public title?: string;
  constructor() {}

  ngOnInit() {
    if (this.verseNote) {
      const idSplit = this.verseNote.id.split('-');
      if (doesntInclude(['title1', 'closing1'], this.verseNote.id)) {
        if (this.verseNote.id.includes('jst-')) {
          this.title = `${idSplit[1]}-${idSplit[2]} ${idSplit[3]}:${
            idSplit[idSplit.length - 3]
          } Notes`;
        } else {
          this.title = `${capitalizeFirstLetter(idSplit[1])} ${idSplit[2]}:${
            idSplit[idSplit.length - 3]
          } Notes`;
        }
        this.shortTitle = `Verse ${idSplit[idSplit.length - 3]} Notes`;
      } else if (this.verseNote.id.includes('title1')) {
        this.title = 'Chapter Notes';
        this.shortTitle = 'Chapter Notes';
      } else if (this.verseNote.id.includes('closing')) {
        this.title = 'Footer Notes';
        this.shortTitle = 'Footer Notes';
      }
      // console.log(idSplit);

      if (this.verseNote.noteGroups) {
        this.verseNoteGroups = this.verseNote.noteGroups.sort(
          (a, b) =>
            a.formatTag.uncompressedOffsets[0] -
            b.formatTag.uncompressedOffsets[0],
        );
      }
    }
  }
}
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function doesntInclude(strings: string[], val: string) {
  return strings.filter(s => val.includes(s)).length === 0;
}
