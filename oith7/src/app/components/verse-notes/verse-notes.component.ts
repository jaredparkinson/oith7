import { Component, OnInit } from '@angular/core';
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
export class VerseNotesComponent implements OnInit {
  public verseNotes: Observable<VerseNote[]>;
  constructor(private store: Store<AppState>) {
    this.verseNotes = store.select('chapter').pipe(
      filter(o => o !== undefined),
      map(o => o.verseNotes),
    );
  }

  ngOnInit() {}
}
