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
} from './reducers/chapter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FormatGroupComponent,
    FormatTextComponent,
    ChapterComponent,
    ChapterLoaderComponent,
    FormatGroupsComponent,
    VerseComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot({
      chapter: chapterReducer,
      chapterHistory: chapterHistoryReducter,
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
