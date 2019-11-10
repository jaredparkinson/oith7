import { Action, createReducer, on } from '@ngrx/store';
import {
  ChapterActions,
  AddChapter,
  ADD_CHAPTER,
  REMOVE_CHAPTER,
  ChapterHistoryActions,
  ADD_CHAPTER_HISTORY,
  REMOVE_CHAPTER_HISTORY,
  // ADD_HISTORY_CHAPTER,
} from '../actions/chapter.actions';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { ChapterModel } from '../models/chapter.model';

// const chapterState: Chapter = { chapter: undefined, id: '' };

export function chapterReducer(state: Chapter, action: ChapterActions) {
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

export function chapterHistoryReducter(
  state: ChapterModel[] = [],
  action: ChapterHistoryActions,
) {
  switch (action.type) {
    case ADD_CHAPTER_HISTORY: {
      return [...state.filter(s => s.id === action.payload.id), action.payload];
    }
    case REMOVE_CHAPTER_HISTORY: {
      return state.filter(c => (c.id = action.payload));
    }

    default: {
      return state;
    }
  }
}
