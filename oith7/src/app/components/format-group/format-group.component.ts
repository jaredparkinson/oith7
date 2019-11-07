import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith-lib/src/models/Chapter';
import { of, forkJoin } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { flatMap$ } from '../../../../../oith-lib/src/rx/flatMap$';

@Component({
  selector: '[format-group]',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
@Input() public topLevel?:boolean
  public imgSrc?: string = '';

  constructor() {}

  ngOnInit() {
    of(this.formatGroup)
      .pipe(
        filter(o => o !== undefined),
        map(o => {
          return forkJoin(this.setProps(o));
        }),
        flatMap$,
      )
      .subscribe(o => o);
  }

  public setProps(grp: FormatGroup) {
    return of(grp).pipe(
      filter(o => o.name !== undefined),
      map(f => {
        switch ((f.name as string).toLowerCase()) {
          case 'img': {
            if (f.attrs) {
              f.attrs['src'] = `/assets/images/${f.attrs['src']}.jpg`;
              console.log(f.attrs);
              console.log(this.imgSrc);
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
