import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChapterService } from 'src/app/services/chapter.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';
import {
  buildNewShell,
  addVersesToBody,
} from '../../../../../oith-lib/src/shells/build-shells';

@Component({
  selector: '[chapter-loader]',
  templateUrl: './chapter-loader.component.html',
  styleUrls: ['./chapter-loader.component.scss'],
})
export class ChapterLoaderComponent implements OnInit {
  constructor(
    public httpClient: HttpClient,
    public chapterService: ChapterService,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => parseParams(params)),
        map(chapterParams => {
          return forkJoin(
            of(chapterParams),
            this.httpClient
              .get<Chapter>(
                `assets/scripture_files/eng-${chapterParams.book}-${chapterParams.chapter}-chapter.json`,
                { responseType: 'json' },
              )
              .pipe(
                map(chapter => {
                  return addVersesToBody(chapter).pipe(
                    map(() => {
                      return buildNewShell(chapter).pipe(map(() => chapter));
                    }),
                  );
                }),
                flatMap(o => o),
                flatMap(o => o),
              ),
          );
        }),
        flatMap(o => o),
        map(o => (this.chapterService.chapter = o[1])),
      )
      .subscribe(o => console.log(o));
  }
}

export interface ChapterParams {
  book: string;
  chapter: string;
  highlight: string;
  context: string;
}

export function parseParams(params: Params): ChapterParams {
  const book = params['book'] as string;
  const chapterSplit = (params['chapter'] as string).split('.');

  return {
    book: book,
    chapter: chapterSplit[0],
    highlight: chapterSplit[1],
    context: chapterSplit[2],
  };
}
