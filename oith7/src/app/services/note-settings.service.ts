import { Injectable } from '@angular/core';
import { Subject, forkJoin, of } from 'rxjs';
import {
  map,
  take,
  flatMap,
  distinctUntilChanged,
  toArray,
  filter,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';
import { NoteSettings } from '../../../../oith-lib/src/processors/NoteSettings';
import { Settings } from './init.service';
import {
  NoteCategories,
  NoteTypes,
} from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
import { AddSettings, AddNoteTypes } from '../actions/notetypes.actions';
import { AddNoteSettings } from '../actions/note-settings.actions';
import { AddNoteCategories } from '../actions/note-cat.actions';

@Injectable({
  providedIn: 'root',
})
export class NoteSettingsService {
  public noteSettings$ = new Subject();
  constructor(private store: Store<AppState>) {
    this.updateNoteVisibility();
  }

  private updateNoteVisibility() {
    this.noteSettings$
      .pipe(
        map(() => {
          return forkJoin(
            this.store.select('settings').pipe(take(1)),
            this.store.select('noteCategories').pipe(take(1)),
            this.store.select('noteTypes').pipe(take(1)),
            this.store.select('noteSettings').pipe(take(1)),
          ).pipe(
            map(([settings, noteCategories, noteTypes, noteSettings]) => {
              settings.vis = {};
              return this.extractNoteSettings(noteSettings, settings).pipe(
                map(() => {
                  this.setNoteCategoriesVisible(noteCategories, settings);
                  this.setNoteTypesVisible(noteTypes, settings);
                  this.store.dispatch(new AddSettings(settings));
                  this.store.dispatch(new AddNoteSettings(noteSettings));
                  this.store.dispatch(new AddNoteCategories(noteCategories));
                  this.store.dispatch(new AddNoteTypes(noteTypes));
                }),
              );
            }),
          );
        }),
        flatMap$,
        flatMap$,
      )
      .subscribe(o => console.log(o));
  }

  private extractNoteSettings(noteSettings: NoteSettings, settings: Settings) {
    const moreSetting = noteSettings.addSettings.find(addSettings =>
      addSettings.label.toLowerCase().includes('more'),
    );
    const more = moreSetting ? moreSetting.enabled : false;

    let onPlus = of(more).pipe(
      filter(o => o),
      map(() => {
        return of(
          noteSettings.noteSettings
            .filter(noteSetting => noteSetting.enabled)
            .map(nS => nS.catOnPlus),
        ).pipe(flatMap$, flatMap$, distinctUntilChanged(), toArray());
      }),
      flatMap$,
    );
    let on = of(
      noteSettings.noteSettings
        .filter(noteSetting => noteSetting.enabled)
        .map(nS => nS.catOn.concat(nS.overlays)),
    ).pipe(flatMap$, flatMap$, distinctUntilChanged(), toArray());
    return forkJoin(on.pipe(toArray()), onPlus.pipe(toArray())).pipe(
      flatMap$,
      flatMap$,
      flatMap$,
      map(s => {
        settings.vis[s] = true;
        console.log(s);
      }),
      toArray(),
    );
  }

  private setNoteCategoriesVisible(
    noteCategories: NoteCategories,
    settings: Settings,
  ) {
    noteCategories.noteCategories.map(noteCategory => {
      const on =
        noteCategory.on.filter(on => settings.vis[on]).length ===
        noteCategory.on.length;
      const off = noteCategory.off
        ? noteCategory.off.filter(off => settings.vis[off] === undefined)
            .length === noteCategory.off.length
        : true;

      noteCategory.visible = on === true && off === true;
    });
  }
  private setNoteTypesVisible(noteTypes: NoteTypes, settings: Settings) {
    noteTypes.noteTypes.map(noteType => {
      noteType.visibility = settings.vis[noteType.className] === true;

      console.log(`${noteType.className}-${noteType.visibility}`);
    });
  }
}
