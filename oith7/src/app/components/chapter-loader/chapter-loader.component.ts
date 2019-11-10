import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChapterService } from 'src/app/services/chapter.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, flatMap, toArray, delay, find, filter } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { Chapter } from '../../../../../oith-lib/src/models/Chapter';
import {
  buildNewShell,
  addVersesToBody,
  parseParams,
  highlightVerses,
  ChapterParams,
} from '../../../../../oith-lib/src/shells/build-shells';
import { scrollIntoView } from 'src/app/services/link.service';
import { flatMap$ } from '../../../../../oith-lib/src/rx/flatMap$';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { AddChapter, AddChapterHistory } from 'src/app/actions/chapter.actions';

@Component({
  selector: '[chapter-loader]',
  templateUrl: './chapter-loader.component.html',
  styleUrls: ['./chapter-loader.component.scss'],
})
export class ChapterLoaderComponent implements OnInit {
  public isManual = false;

  public chapter: Store<Chapter>;

  constructor(
    public httpClient: HttpClient,
    public chapterService: ChapterService,
    public activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.chapter = store.pipe(select('chapter')) as Store<Chapter>;
    store.pipe();
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => {
          const chapterParams = parseParams(params);

          return forkJoin(of(chapterParams)).pipe(
            map(o => {
              console.log('oiajsdfoijasdfoijasdofijasdoifj');

              console.log(chapterParams);

              console.log(o);
              this.addToHistory();
              return o[0];
            }),
          );
          return forkJoin(
            of(chapterParams),
            this.addCurrentPageToHistory(chapterParams),
          ).pipe(map(o => o[0]));
        }),
        flatMap(o => o),
        map(chapterParams => {
          this.isManual = window.location.href.includes('manual');
          return this.getChapter(chapterParams);
        }),
        flatMap(o => o),
        map(o => {
          // this.chapterService.chapter = o[1];
          // this.chapterService.testChapter.next(o[1]);
          // this.store.dispatch(
          //   new AddChapterHistory({ chapter: o[1], id: o[1].id }),
          // );
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
  private addToHistory() {
    const addingToHistory = this.store
      .select('chapter')
      .pipe(
        filter(o => o !== undefined),
        map(o =>
          this.store.dispatch(new AddChapterHistory({ chapter: o, id: o.id })),
        ),
      )
      .subscribe();
    addingToHistory.unsubscribe();
  }

  private getChapter(
    chapterParams: ChapterParams,
  ): Observable<[ChapterParams, Chapter]> {
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
              highlightVerses(chapter.verses, chapterParams).pipe(toArray()),
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
  }

  private addCurrentPageToHistory(chapterParams: ChapterParams) {
    return of();
  }
}
