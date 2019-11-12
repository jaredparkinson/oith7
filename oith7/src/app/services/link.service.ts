import { Injectable } from '@angular/core';
import { FormatGroup } from '../../../../oith-lib/src/models/Chapter';
import { of, EMPTY } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';
import { ChapterService } from './chapter.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private router: Router, private chapterService: ChapterService) {}

  public runLink(formatGroup: FormatGroup) {
    if (
      formatGroup.attrs &&
      formatGroup.attrs['href'] !== undefined &&
      (formatGroup.attrs['href'] as string).includes('figure1_note_asterisk')
    ) {
      return scrollIntoView('[id*="figure1_note_asterisk"]').subscribe();
    }

    if (
      formatGroup.attrs &&
      formatGroup.attrs['href'] !== undefined &&
      (formatGroup.attrs['href'] as string).includes('#p76') &&
      this.chapterService.chapter.id.includes('js-h-1')
    ) {
      return scrollIntoView('.symbol').subscribe();
    }
    return of(formatGroup)
      .pipe(
        filter(
          o =>
            o.attrs !== undefined &&
            o.attrs['href'] !== undefined &&
            typeof o.attrs['href'] === 'string' &&
            !(o.attrs['href'] as string).includes('#note'),
        ),
        map(o => {
          const href = (o.attrs as { href: string })['href'];

          if (href.includes('http')) {
            window.location.href = href;
            return EMPTY;
          }
          return of(
            this.router.navigateByUrl((o.attrs as { href: string })['href']),
          ).pipe(flatMap(o => o));
        }),
        flatMap(o => o),
      )
      .subscribe(o => o);
  }
}

export function scrollIntoView(selector: string) {
  console.log(selector);

  return of(document.querySelector(selector) as HTMLElement).pipe(
    filter(o => o !== null),
    map(o => {
      o.scrollIntoView();
    }),
  );
}
