import { Action, createReducer, on } from '@ngrx/store';
import {
  ChapterActions,
  AddChapter,
  ADD_CHAPTER,
  REMOVE_CHAPTER,
} from '../actions/chapter.actions';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';

// const chapterState: Chapter = { chapter: undefined, id: '' };

export function chapterReducer(state: Chapter, action: ChapterActions) {
  switch (action.type) {
    case ADD_CHAPTER: {
      return action.payload;
      break;
    }
    default: {
      return state;
    }
  }
}
