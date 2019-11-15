import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public dismissMenu = new Subject<HTMLElement | null>();
  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.dismissMenu.next(null);
    });
  }
}
