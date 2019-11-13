import { Chapter } from '../../../oith-lib/src/models/Chapter';
import { ChapterModel } from './models/chapter.model';
import { NoteSettings } from '../../../oith-lib/src/processors/NoteSettings';
import {
  NoteCategories,
  NoteTypes,
} from '../../../oith-lib/src/verse-notes/settings/note-gorup-settings';
export interface AppState {
  readonly chapter: Chapter;
  readonly chapterHistory: ChapterModel[];
  readonly noteSettings: NoteSettings;
  readonly noteCategories: NoteCategories;
  readonly noteTypes: NoteSettings;
}
