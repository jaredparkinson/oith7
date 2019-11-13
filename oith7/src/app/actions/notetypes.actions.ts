import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';
import { NoteTypes } from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';

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
