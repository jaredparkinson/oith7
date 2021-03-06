import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';
import { NoteTypes } from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
import { NoteSettings } from '../../../../oith-lib/src/processors/NoteSettings';

export const ADD_NOTE_SETTINGS = '[NoteSettings] Add';
// export const ADD_HISTORY_NOTE_SETTINGS = '[NoteType] Add Histry';

export class AddNoteSettings implements Action {
  readonly type = ADD_NOTE_SETTINGS;

  public constructor(public payload: NoteSettings) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_NOTE_SETTINGS;

//   public constructor() {}
// }

export type NoteSettingsActions = AddNoteSettings; //| AddHistoryChapter;
