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
  console.log(state);

  switch (action.type) {
    case ADD_CHAPTER: {
      return action.payload;
      break;
    }
    // case REMOVE_CHAPTER: {

    //   }
    default: {
      return state;
    }
  }
}
