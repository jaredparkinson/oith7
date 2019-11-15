import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public dismissMenu = new Subject<HTMLElement>();
  constructor() {}
}
