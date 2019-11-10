import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'note-phrase',
  templateUrl: './verse-note-phrase.component.html',
  styleUrls: ['./verse-note-phrase.component.scss'],
})
export class VerseNotePhraseComponent implements OnInit {
  @Input() public notePhrase: string;
  constructor() {}

  ngOnInit() {}
}
