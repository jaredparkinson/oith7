import { Injectable } from '@angular/core';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public chapter?: Chapter;

  public testChapter = new Subject<Chapter>();
  constructor() {
    this.test();
  }

  private test() {
    this.testChapter.subscribe(o => console.log(o));
    // this.chapter.subscribe(o => console.log(o));
  }
}
