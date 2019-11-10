import { Component, OnInit, Input } from '@angular/core';
import {
  Note,
  NoteRef,
} from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() public note: Note;
  public noteRefs?: NoteRef[];
  constructor() {}

  ngOnInit() {
    this.noteRefs = this.note.ref.sort((a, b) => a.category - b.category);
  }
}
