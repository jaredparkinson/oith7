import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';
import { NoteTypes } from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
import { Settings } from '../services/init.service';

export const ADD_NOTE_TYPES = '[NoteType] Add';
// export const ADD_HISTORY_NOTE_TYPES = '[NoteType] Add Histry';

export class AddNoteTypes implements Action {
  readonly type = ADD_NOTE_TYPES;

  public constructor(public payload: NoteTypes) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_NOTE_TYPES;

//   public constructor() {}
// }

export type NoteTypesActions = AddNoteTypes; //| AddHistoryChapter;

export const ADD_SETTINGS = '[Settings] Add';
// export const ADD_HISTORY_NOTE_TYPES = '[NoteType] Add Histry';

export class AddSettings implements Action {
  readonly type = ADD_SETTINGS;

  public constructor(public payload: Settings) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_NOTE_TYPES;

//   public constructor() {}
// }

export type SettingsActions = AddSettings; //| AddHistoryChapter;
