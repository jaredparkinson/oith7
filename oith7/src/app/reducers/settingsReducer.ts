import { SettingsActions, ADD_SETTINGS } from '../actions/notetypes.actions';
import { Settings } from '../services/init.service';
import { createReducer, on, createAction } from '@ngrx/store';
export function settingsReducer(state: Settings, action: SettingsActions) {
  switch (action.type) {
    case ADD_SETTINGS: {
      console.log(action.payload);

      localStorage.setItem('oith7-settings', JSON.stringify(action.payload));
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
