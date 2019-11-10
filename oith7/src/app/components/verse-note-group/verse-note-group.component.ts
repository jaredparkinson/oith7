import { Component, OnInit, Input } from '@angular/core';
import {
  VerseNoteGroup,
  Note,
} from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'verse-note-group',
  templateUrl: './verse-note-group.component.html',
  styleUrls: ['./verse-note-group.component.scss'],
})
export class VerseNoteGroupComponent implements OnInit {
  @Input() public verseNoteGroup: VerseNoteGroup;
  public notes?: Note[];
  constructor() {}

  ngOnInit() {
    this.notes = this.verseNoteGroup.notes.sort(
      (a, b) => a.noteType - b.noteType,
    );
  }
}
