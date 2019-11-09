import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';

@Component({
  selector: '[chapter]',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  @Input() public chapter: Chapter;
  constructor() {
    console.log(this.chapter);
  }

  ngOnInit() {}
}
