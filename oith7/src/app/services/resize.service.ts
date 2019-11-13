import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  public resize$ = new Subject<Event>();
  constructor() {
    this.resize$.pipe(debounceTime(10)).subscribe(o => console.log(o));
  }

  public resize(event: Event) {
    console.log(event);
  }
}
