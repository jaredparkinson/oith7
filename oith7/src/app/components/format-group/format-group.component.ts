import { Component, OnInit, Input } from '@angular/core';
import {
  FormatGroup,
  VersePlaceholder,
} from '../../../../../oith-lib/src/models/Chapter';
import { of, forkJoin } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { flatMap$ } from '../../../../../oith-lib/src/rx/flatMap$';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: '[format-group]',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup | VersePlaceholder;
  @Input() public topLevel?: boolean;
  public imgSrc?: string = '';

  constructor(public linkService: LinkService) {}

  ngOnInit() {
    of(this.formatGroup as FormatGroup)
      .pipe(
        filter(o => o !== undefined && typeof o.attrs !== 'undefined'),
        map(o => {
          return forkJoin(this.setProps(o));
        }),
        flatMap$,
      )
      .subscribe(o => o);
  }

  public setProps(grp: FormatGroup) {
    return of(grp).pipe(
      filter(f => f.name !== undefined),
      map(f => {
        switch ((f.name as string).toLowerCase()) {
          case 'img': {
            if (f.attrs) {
              f.attrs['src'] = `/assets/images/${f.attrs['src']}.jpg`;
            }
            break;
          }

          default:
            break;
        }
      }),
    );
  }
}
