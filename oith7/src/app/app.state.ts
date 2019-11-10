import { Chapter } from '../../../oith-lib/src/models/Chapter';
import { ChapterModel } from './models/chapter.model';

export interface AppState {
  readonly chapter: Chapter;
  readonly chapterHistory: ChapterModel[];
}
