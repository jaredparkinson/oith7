import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';

export const ADD_CHAPTER = '[CHAPTER] Add';
export const REMOVE_CHAPTER = '[CHAPTER] Remove';
// export const ADD_HISTORY_CHAPTER = '[CHAPTER] Add Histry';

export class AddChapter implements Action {
  readonly type = ADD_CHAPTER;

  public constructor(public payload: Chapter) {}
}
// export class AddHistoryChapter implements Action {
//   readonly type = ADD_HISTORY_CHAPTER;

//   public constructor() {}
// }

export class RemoveChapter implements Action {
  readonly type = REMOVE_CHAPTER;

  public constructor(public payload: number) {}
}

export type ChapterActions = AddChapter | RemoveChapter; //| AddHistoryChapter;

export const ADD_CHAPTER_HISTORY = '[CHAPTER_HISTORY] Add';
export const REMOVE_CHAPTER_HISTORY = '[CHAPTER_HISTORY] Remove';

export class AddChapterHistory implements Action {
  readonly type = ADD_CHAPTER_HISTORY;

  public constructor(public payload: ChapterModel) {}
}

export class RemoveChapterHistory implements Action {
  readonly type = REMOVE_CHAPTER_HISTORY;

  public constructor(public payload: string) {}
}

export type ChapterHistoryActions = AddChapterHistory | RemoveChapterHistory;
