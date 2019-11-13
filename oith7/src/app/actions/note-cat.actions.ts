import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';
import {
  NoteTypes,
  NoteCategories,
} from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';

export const ADD_NOTE_CATEGORIES = '[NoteType] Add';
// export const ADD_HISTORY_NOTE_TYPES = '[NoteType] Add Histry';

export class AddNoteCategories implements Action {
  readonly type = ADD_NOTE_CATEGORIES;

  public constructor(public payload: NoteCategories) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_NOTE_TYPES;

//   public constructor() {}
// }

export type NoteCategoryActions = AddNoteCategories; //| AddHistoryChapter;
