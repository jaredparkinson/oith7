import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChapterService } from 'src/app/services/chapter.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, flatMap, toArray, delay } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';
import {
  buildNewShell,
  addVersesToBody,
  parseParams,
  highlightVerses,
} from '../../../../../oith-lib/src/shells/build-shells';
import { scrollIntoView } from 'src/app/services/link.service';
import { flatMap$ } from '../../../../../oith-lib/src/rx/flatMap$';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { AddChapter } from 'src/app/actions/chapter.actions';

@Component({
  selector: '[chapter-loader]',
  templateUrl: './chapter-loader.component.html',
  styleUrls: ['./chapter-loader.component.scss'],
})
export class ChapterLoaderComponent implements OnInit {
  public isManual = false;

  public chapter: Observable<Chapter>;

  constructor(
    public httpClient: HttpClient,
    public chapterService: ChapterService,
    public activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.chapter = store.pipe(select('chapter'));
  }

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
                    highlightVerses(chapter.verses, chapterParams).pipe(
                      toArray(),
                    ),
                    of(chapter),
                  ).pipe(map(o => o[3]));
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
        map(o => {
          // this.chapterService.chapter = o[1];
          // this.chapterService.testChapter.next(o[1]);
          this.store.dispatch(new AddChapter(o[1]));
        }),
        delay(100),
        map(() => {
          return scrollIntoView('.context,.highlight');
        }),

        flatMap$,
      )
      .subscribe(o => {});
  }
}
