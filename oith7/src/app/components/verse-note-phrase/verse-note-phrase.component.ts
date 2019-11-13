import { Component, OnInit, Input } from '@angular/core';
import { UnderlineService } from 'src/app/services/underline.service';

@Component({
  selector: 'note-phrase',
  templateUrl: './verse-note-phrase.component.html',
  styleUrls: ['./verse-note-phrase.component.scss'],
})
export class VerseNotePhraseComponent implements OnInit {
  @Input() public notePhrase: string;
  constructor(public underlineService: UnderlineService) {}

  ngOnInit() {}

  public click() {
    // this.notePhrase = 'ioasjdfoiajsdfioajsdf';
  }
}
