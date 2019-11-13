import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';
import { NoteTypes } from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';

export const ADD_NOTE_SETTINGS = '[NoteType] Add';
// export const ADD_HISTORY_NOTE_SETTINGS = '[NoteType] Add Histry';

export class AddNoteSettings implements Action {
  readonly type = ADD_NOTE_SETTINGS;

  public constructor(public payload: NoteTypes) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_NOTE_SETTINGS;

//   public constructor() {}
// }

export type NoteSettingsActions = AddNoteSettings; //| AddHistoryChapter;
