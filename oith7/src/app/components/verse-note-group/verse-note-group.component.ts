import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  VerseNoteGroup,
  Note,
} from '../../../../../oith-lib/src/verse-notes/verse-note';
import { Subject } from 'rxjs';

@Component({
  selector: 'verse-note-group',
  templateUrl: './verse-note-group.component.html',
  styleUrls: ['./verse-note-group.component.scss'],
})
export class VerseNoteGroupComponent implements OnInit, OnDestroy {
  public ngOnDestroy(): void {
    if (this.verseNoteGroup && this.verseNoteGroup.formatTag.h) {
      // this.verseNoteGroup.formatTag.h.unsubscribe();
    }
  }
  @Input() public verseNoteGroup: VerseNoteGroup;
  public notes?: Note[];
  constructor() {}

  ngOnInit() {
    // this.verseNoteGroup.formatTag.h = new Subject();
    this.notes = this.verseNoteGroup.notes.sort(
      (a, b) => a.noteType - b.noteType,
    );

    this.verseNoteGroup.formatTag.h.subscribe(o => {
      this.verseNoteGroup.formatTag.highlight = o;
    });
  }
}
