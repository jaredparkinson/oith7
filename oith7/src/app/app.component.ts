import { Component, OnInit, HostListener } from '@angular/core';
import { InitService, Settings } from './services/init.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ResizeService } from './services/resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public settings: Observable<Settings>;
  ngOnInit(): void {
    this.settings = this.store.select('settings');
    // .pipe(filter(o => o !== undefined));

    this.initService.loadSetings().subscribe();
    this.setupSettings();
  }
  title = 'oith7';

  public oithHeaderTop = `0px`;
  public contentTop = `48px`;

  public constructor(
    public initService: InitService,
    public store: Store<AppState>,
    public resizeService: ResizeService,
  ) {}
  public setupSettings() {
    this.settings.subscribe(o => {
      console.log(o);
      this.contentTop = `${o.contentTop}px`;
      this.oithHeaderTop = `${o.oithHeaderTop}px`;
    });
  }
  @HostListener('window:resize', ['$event'])
  public resize(event: Event) {
    this.resizeService.resize$.next(event);
  }
}
