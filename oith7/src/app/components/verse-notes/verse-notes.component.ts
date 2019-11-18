import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VerseNote } from '../../../../../oith-lib/src/verse-notes/verse-note';
import { chapter$ } from '../../../../../oith-shells/src/store/store';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';

@Component({
  selector: 'app-verse-notes',
  templateUrl: './verse-notes.component.html',
  styleUrls: ['./verse-notes.component.scss'],
})
export class VerseNotesComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {}
  @Input() public chapterVerseNotes: Observable<Chapter>;
  public verseNotes: Observable<VerseNote[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    console.log(this.verseNotes);
    this.verseNotes = this.chapterVerseNotes.pipe(
      filter(o => o !== undefined),
      map(chapter => chapter.verseNotes),
    );

    // this.store.select('chapter').pipe(
    //   filter(o => o !== undefined),
    //   map(o => {
    //     console.log(o);

    //     return o.verseNotes;
    //   }),
    // );
  }
}
