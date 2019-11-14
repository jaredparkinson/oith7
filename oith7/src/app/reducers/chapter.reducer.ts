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
import { NoteSettings } from '../../../../oith-lib/src/processors/NoteSettings';
import {
  AddNoteSettings,
  NoteSettingsActions,
  ADD_NOTE_SETTINGS,
} from '../actions/note-settings.actions';
import {
  NoteTypes,
  NoteCategories,
} from '../../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
// import { NoteTypesActions, ADD_NOTE_TYPES } from '../actions/notetypes.actions';
import {
  NoteCategoryActions,
  ADD_NOTE_CATEGORIES,
} from '../actions/note-cat.actions';
import { NoteTypesActions, ADD_NOTE_TYPES } from '../actions/notetypes.actions';

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

export function noteSettingsReducer(
  state: NoteSettings,

  action: NoteSettingsActions,
) {
  switch (action.type) {
    case ADD_NOTE_SETTINGS: {
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

export function noteTypesReducer(state: NoteTypes, action: NoteTypesActions) {
  switch (action.type) {
    case ADD_NOTE_TYPES: {
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
export function noteCategoriesReducer(
  state: NoteCategories,
  action: NoteCategoryActions,
) {
  switch (action.type) {
    case ADD_NOTE_CATEGORIES: {
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
