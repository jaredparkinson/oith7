import { Component, OnInit, HostListener } from '@angular/core';
import { InitService, Settings } from './services/init.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ResizeService } from './services/resize.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public navHeight: SafeStyle = '';
  public settings: Observable<Settings>;
  public navOpen = true;
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
    public sanitizer: DomSanitizer,
    public resizeService: ResizeService,
  ) {}
  public setupSettings() {
    this.settings.subscribe(o => {
      console.log(o);
      this.contentTop = `${o.contentTop}px`;
      this.oithHeaderTop = `${o.oithHeaderTop}px`;
      this.navHeight = this.sanitizer.bypassSecurityTrustStyle(
        `calc(100vh - ${this.contentTop} )`,
      );
      this.navOpen = o.nav;
    });
  }
  @HostListener('window:resize', ['$event'])
  public resize(event: Event) {
    this.resizeService.resize$.next(event);
  }
}
