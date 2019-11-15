import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { take, map, filter } from 'rxjs/operators';
import { AddSettings } from 'src/app/actions/notetypes.actions';
import { BackdropService } from 'src/app/services/backdrop.service';
import { MenuService } from 'src/app/services/menu.service';
import {
  NoteSettings,
  NoteSetting,
} from '../../../../../oith-lib/src/processors/NoteSettings';
import { of } from 'rxjs';
import { AddNoteSettings } from 'src/app/actions/note-settings.actions';
import { NoteSettingsService } from 'src/app/services/note-settings.service';

@Component({
  selector: 'oith-header',
  templateUrl: './oith-header.component.html',
  styleUrls: ['./oith-header.component.scss'],
})
export class OithHeaderComponent implements OnInit {
  public dismissMenu = this.menuService.dismissMenu
    .pipe(filter(o => ancHasID(o, 'noteSettings') === true))
    .subscribe(() => {
      this.notesDropdown.visible = false;
    });
  public noteSettings?: NoteSettings;
  constructor(
    public noteSettingsService: NoteSettingsService,
    public store: Store<AppState>,
    public backdropService: BackdropService,
    public menuService: MenuService,
  ) {}
  public notesDropdown: Visibility = { visible: false };
  ngOnInit() {
    this.store.select('noteSettings').subscribe(o => (this.noteSettings = o));
  }

  public navOpen() {
    this.store
      .select('settings')
      .pipe(
        take(1),
        map(settings => {
          settings.displayNav = !settings.displayNav;
          this.store.dispatch(new AddSettings(settings));
        }),
      )
      .subscribe();
  }

  public noteSettingsClick(evt: Event, noteSetting: NoteSetting) {
    event.stopPropagation();

    of((evt.target as HTMLElement).nodeName.toLowerCase() === 'input')
      .pipe(filter(o => o))
      .subscribe(() => {
        noteSetting.enabled = (evt.target as HTMLInputElement).checked;
        this.store.dispatch(new AddNoteSettings(this.noteSettings));
        this.noteSettingsService.noteSettings$.next();
      });
  }

  public noteSettingsDropDown(event: Event) {
    const e = event.srcElement as Element;

    if (
      e.nodeName.toLowerCase() === 'svg' ||
      e.nodeName.toLowerCase() === 'path'
    ) {
      this.notesDropdown.visible = !this.notesDropdown.visible;
    }
    // this.backdropService.showVisibilty.next(this.notesDropdown);
  }
}

export interface Visibility {
  visible: boolean;
}

export function ancHasID(e: HTMLElement | null, id: string): boolean {
  if (e === null) {
    return true;
  }
  if (e !== null) {
    if (e.id === id) {
      return false;
    }
    return ancHasID(e.parentElement, id);
  }

  // return ancHasID(e.parentElement, id);/
}
