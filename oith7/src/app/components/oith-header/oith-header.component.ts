import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { take, map } from 'rxjs/operators';
import { AddSettings } from 'src/app/actions/notetypes.actions';

@Component({
  selector: 'oith-header',
  templateUrl: './oith-header.component.html',
  styleUrls: ['./oith-header.component.scss'],
})
export class OithHeaderComponent implements OnInit {
  constructor(public store: Store<AppState>) {}

  ngOnInit() {}

  public navOpen() {
    this.store
      .select('settings')
      .pipe(
        take(1),
        map(settings => {
          settings.displayNav = !settings.displayNav;
          console.log(settings);
          this.store.dispatch(new AddSettings(settings));
        }),
      )
      .subscribe();
  }
}
