import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VerseNote } from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'app-verse-notes',
  templateUrl: './verse-notes.component.html',
  styleUrls: ['./verse-notes.component.scss'],
})
export class VerseNotesComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {}
  public verseNotes: Observable<VerseNote[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    console.log(this.verseNotes);

    this.verseNotes = this.store.select('chapter').pipe(
      filter(o => o !== undefined),
      map(o => {
        console.log(o);

        return o.verseNotes;
      }),
    );
  }
}
