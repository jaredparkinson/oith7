import { Component, OnInit, Input } from '@angular/core';
import {
  VerseNote,
  Note,
} from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'verse-note',
  templateUrl: './verse-note.component.html',
  styleUrls: ['./verse-note.component.scss'],
})
export class VerseNoteComponent implements OnInit {
  @Input() public verseNote: VerseNote;
  constructor() {}

  ngOnInit() {}
}
