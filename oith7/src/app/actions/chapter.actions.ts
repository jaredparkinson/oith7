import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';

export const ADD_CHAPTER = '[CHAPTER] Add';
export const REMOVE_CHAPTER = '[CHAPTER] Remove';

export class AddChapter implements Action {
  readonly type = ADD_CHAPTER;

  public constructor(public payload: Chapter) {}
}

export class RemoveChapter implements Action {
  readonly type = REMOVE_CHAPTER;

  public constructor(public payload: number) {}
}

export type ChapterActions = AddChapter | RemoveChapter;
