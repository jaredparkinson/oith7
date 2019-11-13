import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormatGroupComponent } from './components/format-group/format-group.component';
import { FormatTextComponent } from './components/format-text/format-text.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { ChapterLoaderComponent } from './components/chapter-loader/chapter-loader.component';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormatGroupsComponent } from './components/format-groups/format-groups.component';
import { VerseComponent } from './components/verse/verse.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {
  chapterReducer,
  chapterHistoryReducter,
  noteSettingsReducer,
  noteCategoriesReducer,
} from './reducers/chapter.reducer';
import { settingsReducer } from './reducers/settingsReducer';
import { VerseNotesComponent } from './components/verse-notes/verse-notes.component';
import { VerseNoteComponent } from './components/verse-note/verse-note.component';
import { VerseNoteGroupComponent } from './components/verse-note-group/verse-note-group.component';
import { VerseNotePhraseComponent } from './components/verse-note-phrase/verse-note-phrase.component';
import { VerseNoteRefComponent } from './components/verse-note-ref/verse-note-ref.component';
import { NoteComponent } from './components/note/note.component';
import { InitService } from './services/init.service';
import { NoteSettings } from '../../../oith-lib/src/processors/NoteSettings';
import { OithHeaderComponent } from './components/oith-header/oith-header.component';
export function load(initService: InitService) {
  return async () => {
    return initService.load();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    FormatGroupComponent,
    FormatTextComponent,
    ChapterComponent,
    ChapterLoaderComponent,
    FormatGroupsComponent,
    VerseComponent,
    VerseNotesComponent,
    VerseNoteComponent,
    VerseNoteGroupComponent,
    VerseNotePhraseComponent,
    VerseNoteRefComponent,
    NoteComponent,
    OithHeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot({
      chapter: chapterReducer,
      chapterHistory: chapterHistoryReducter,
      noteSettings: noteSettingsReducer,
      noteCategories: noteCategoriesReducer,
      noteTypes: noteSettingsReducer,
      settings: settingsReducer,
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [InitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
