import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AddSettings, AddNoteTypes } from '../actions/notetypes.actions';
import { AddNoteSettings } from '../actions/note-settings.actions';
import { NoteSettings } from '../../../../oith-lib/src/processors/NoteSettings';
import {
  NoteTypes,
  NoteCategories,
} from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
import { AddNoteCategories } from '../actions/note-cat.actions';
import {
  Params,
  parseParams,
} from '../../../../oith-lib/src/shells/build-shells';

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
    return forkJoin(
      this.lns<NoteSettings>('note-settings').pipe(
        map(o => this.store.dispatch(new AddNoteSettings(o))),
      ),
      this.lns<NoteTypes>('note-types').pipe(
        map(o => this.store.dispatch(new AddNoteTypes(o))),
      ),
      this.lns<NoteCategories>('note-categories').pipe(
        map(o => this.store.dispatch(new AddNoteCategories(o))),
      ),
      of(localStorage.getItem('oith7-settings')).pipe(
        map(o => {
          this.store.dispatch(
            new AddSettings(
              o !== null && o.trim() !== ''
                ? (JSON.parse(o) as Settings)
                : new Settings(),
            ),
          );
        }),
      ),
    );
  }

  public lns<T>(id: string) {
    let s = localStorage.getItem(`oith7-eng-${id}`);

    if (s) {
      return of(JSON.parse(s) as T);
    }
    return this.httpClient.get<T>(`/assets/scripture_files/eng-${id}.json`, {
      responseType: 'json',
    });
    // const ids= ['note-settings']
  }
}

export class Settings {
  public textSize = 18;
  public notePaneWidth = 300;
  public notePaneWidthDisplay = 300;
  public notePaneHeight = 300;
  public notePaneHeightDisplay = 300;
  public noteCatList: Params = {};
  public oithHeaderTop = 0;
  public contentTop = 48;
  public lang = 'eng';
  public vis = {};
  displayNav: boolean;
}
