import { Injectable } from '@angular/core';
import { FormatGroup } from '../../../../oith-lib/src/models/Chapter';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private router: Router) {}

  public runLink(formatGroup: FormatGroup) {
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
