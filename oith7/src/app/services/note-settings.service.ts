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
import { Chapter } from '../../../../oith-lib/src/models/Chapter';

@Injectable({
  providedIn: 'root',
})
export class NoteSettingsService {
  public noteSettings$ = new Subject();
  public updateNoteVisibiliy$ = new Subject();
  constructor(private store: Store<AppState>) {
    this.resetNoteVisibilitySettings();

    this.updateNoteVisibiliy$
      .pipe(
        map(() =>
          forkJoin(
            store.select('chapter').pipe(take(1)),
            store.select('settings').pipe(take(1)),
            store.select('noteCategories').pipe(take(1)),
          ).pipe(
            map(([chapter, settings, noteCategories]) =>
              resetNoteVisibility(chapter, settings, noteCategories),
            ),
            flatMap$,
          ),
        ),
        flatMap$,
      )
      .subscribe(o => o);
  }

  private resetNoteVisibilitySettings() {
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
              settings.noteCatList = {};
              return this.extractNoteSettings(noteSettings, settings).pipe(
                map(() => {
                  this.setNoteCategoriesVisible(noteCategories, settings);
                  this.setNoteTypesVisible(noteTypes, settings);
                  this.saveSettings(
                    settings,
                    noteSettings,
                    noteCategories,
                    noteTypes,
                  );
                  this.updateNoteVisibiliy$.next();
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

  private saveSettings(
    settings: Settings,
    noteSettings: NoteSettings,
    noteCategories: NoteCategories,
    noteTypes: NoteTypes,
  ) {
    this.store.dispatch(new AddSettings(settings));
    this.store.dispatch(new AddNoteSettings(noteSettings));
    this.store.dispatch(new AddNoteCategories(noteCategories));
    this.store.dispatch(new AddNoteTypes(noteTypes));
  }

  private extractNoteSettings(noteSettings: NoteSettings, settings: Settings) {
    const moreSetting = noteSettings.addSettings.find(addSettings =>
      addSettings.label.toLowerCase().includes('more'),
    );
    const more = moreSetting ? moreSetting.enabled : false;

    const on = noteSettings.noteSettings
      .filter(noteSetting => noteSetting.enabled)
      .map(nS => nS.catOn.concat(nS.overlays).concat(more ? nS.catOnPlus : []));

    return of(on).pipe(
      flatMap(o => o),
      flatMap(o => o),
      map(s => {
        settings.vis[s] = true;
      }),
      toArray(),
    );
  }

  private setNoteCategoriesVisible(
    noteCategories: NoteCategories,
    settings: Settings,
  ) {
    noteCategories.noteCategories.map(noteCategory => {
      settings.noteCatList[noteCategory.category] = noteCategory.label;
      const on =
        noteCategory.on.filter(on => settings.vis[on]).length ===
        noteCategory.on.length;
      const off = noteCategory.off
        ? noteCategory.off.filter(off => settings.vis[off] === undefined)
            .length === noteCategory.off.length
        : true;

      noteCategory.visible = on === true && off === true;
      if (noteCategory.visible) {
        settings.vis[noteCategory.category] = true;
      }
    });
  }
  private setNoteTypesVisible(noteTypes: NoteTypes, settings: Settings) {
    noteTypes.noteTypes.map(noteType => {
      noteType.visibility = settings.vis[noteType.className] === true;
      if (noteType.visibility) {
        settings.vis[noteType.noteType] = true;
      }
      console.log(`${noteType.className}-${noteType.visibility}`);
    });
  }
}
export function resetNoteVisibility(
  chapter: Chapter,
  settings: Settings,
  noteCats: NoteCategories,
) {
  return of(chapter.verseNotes).pipe(
    flatMap$,
    flatMap(o => o.notes),
    map(note => {
      note.formatTag.visible = settings.vis[note.noteType] === true;
      if (note.formatTag.visible) {
        note.ref.map(ref => {
          ref.vis = settings.vis[ref.category] === true;
          ref.label = `${settings.noteCatList[ref.category]}\u00A0`;
        });
      } else {
      }
    }),
    toArray(),
  );
}
