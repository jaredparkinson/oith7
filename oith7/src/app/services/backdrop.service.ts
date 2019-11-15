import { Injectable } from '@angular/core';
import { Visibility } from '../components/oith-header/oith-header.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackdropService {
  public visibility?: Visibility;
  public showVisibilty = new Subject<Visibility>();

  constructor() {
    this.showVisibilty.subscribe(o => {
      this.visibility = o;
    });
  }
}
