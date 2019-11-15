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
          return this.store.select('settings').pipe(
            take(1),
            map(settings => {
              return forkJoin(
                this.store.select('noteCategories').pipe(take(1)),
                this.store.select('noteTypes').pipe(take(1)),
                this.store.select('noteSettings').pipe(
                  take(1),
                  map(noteSettings => {
                    this.extractNoteSettings(noteSettings, settings);
                  }),
                ),
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
    console.log(settings);

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
    forkJoin(on.pipe(toArray()), onPlus.pipe(toArray()))
      .pipe(
        flatMap$,
        flatMap$,
        flatMap$,
        map(s => (settings.vis[s] = true)),
        toArray(),
      )
      .subscribe(o => console.log(settings));
  }
}
