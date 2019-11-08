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
  parseParams,
} from '../../../../../oith-lib/src/shells/build-shells';

@Component({
  selector: '[chapter-loader]',
  templateUrl: './chapter-loader.component.html',
  styleUrls: ['./chapter-loader.component.scss'],
})
export class ChapterLoaderComponent implements OnInit {
  public isManual = false;

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
          this.isManual = window.location.href.includes('manual');
          return forkJoin(
            of(chapterParams),
            this.httpClient
              .get<Chapter>(
                `assets/scripture_files/${chapterParams.lang}-${chapterParams.book}-${chapterParams.chapter}-chapter.json`,
                { responseType: 'json' },
              )
              .pipe(
                map(chapter => {
                  return forkJoin(
                    addVersesToBody(chapter),
                    buildNewShell(chapter),
                    of(chapter),
                  ).pipe(map(o => o[2]));
                  // return addVersesToBody(chapter).pipe(
                  //   map(() => {
                  //     return buildNewShell(chapter).pipe(map(() => chapter));
                  //   }),
                  // );
                }),
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
