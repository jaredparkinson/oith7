import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AddSettings } from '../actions/notetypes.actions';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  public async load() {
    // let noteSettings = localStorage.getItem('eng-note-settings');
    //
    // if (noteSettings === null) {
    // noteSettings = await this.httpClient
    // .get('assets/scripture_files/eng-note-settings.json')
    // .toPromise();
    // }
    // let
  }
  public loadSetings() {
    return of(localStorage.getItem('oith7-settings')).pipe(
      map(o => {
        this.store.dispatch(
          new AddSettings(
            o !== null && o.trim() !== ''
              ? (JSON.parse(o) as Settings)
              : new Settings(),
          ),
        );
      }),
    );
  }
}

export class Settings {
  public textSize = 18;
  public notePaneWidth = 300;
  public notePaneWidthDisplay = 300;
  public notePaneHeight = 300;
  public notePaneHeightDisplay = 300;

  public oithHeaderTop = 0;
  public contentTop = 48;
  public lang = 'eng';
  public vis = {};
}
