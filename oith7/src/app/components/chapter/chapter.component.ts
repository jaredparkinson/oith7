import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';
import { chapter$ } from '../../../../../oith-shells/src/store/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: '[chapter]',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  @Input() public chapter: Chapter;

  public testChapter: Chapter;
  constructor() {
    chapter$.pipe(filter(o => o !== undefined)).subscribe(o => {
      this.testChapter = o;
    });
  }

  ngOnInit() {}
}
