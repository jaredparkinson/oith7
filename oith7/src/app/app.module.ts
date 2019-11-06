import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormatGroupComponent } from './components/format-group/format-group.component';
import { FormatTextComponent } from './components/format-text/format-text.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { ChapterLoaderComponent } from './components/chapter-loader/chapter-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    FormatGroupComponent,
    FormatTextComponent,
    ChapterComponent,
    ChapterLoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
