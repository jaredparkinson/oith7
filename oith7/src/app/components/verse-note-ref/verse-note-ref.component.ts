import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith-lib/src/verse-notes/verse-note';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'note-ref',
  templateUrl: './verse-note-ref.component.html',
  styleUrls: ['./verse-note-ref.component.scss'],
})
export class VerseNoteRefComponent implements OnInit {
  @Input() public noteRef: NoteRef;
  public safeText: SafeHtml = '';
  constructor(public domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeText = this.domSanitizer.bypassSecurityTrustHtml(
      this.noteRef.text,
    );
  }
}
