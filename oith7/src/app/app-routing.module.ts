import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatGroupComponent } from './components/format-group/format-group.component';
import { ChapterLoaderComponent } from './components/chapter-loader/chapter-loader.component';

const routes: Routes = [
  {
    path: ':book/:chapter',
    component: ChapterLoaderComponent,
  },
  {
    path: 'manual/:book/:chapter',
    component: ChapterLoaderComponent,
  },
  {
    path: ':lang/:book/:chapter',
    component: ChapterLoaderComponent,
  },
  {
    path: ':lang/manual/:book/:chapter',
    component: ChapterLoaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
