import { Injectable } from '@angular/core';
import { FormatGroup } from '../../../../oith-lib/src/models/Chapter';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';
import { ChapterService } from './chapter.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private router: Router, private chapterService: ChapterService) {}

  public runLink(formatGroup: FormatGroup) {
    console.log(formatGroup);
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
        map(o =>
          this.router.navigateByUrl((o.attrs as { href: string })['href']),
        ),
        flatMap$,
      )
      .subscribe(o => console.log(o));
  }
}

export function scrollIntoView(selector: string) {
  return of(document.querySelector(selector) as HTMLElement).pipe(
    filter(o => o !== undefined),
    map(o => o.scrollIntoView()),
  );
}
