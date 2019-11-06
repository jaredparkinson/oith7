import { Injectable } from '@angular/core';
import { Chapter } from '../../../../oith-lib/src/models/Chapter';
@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  public chapter?: Chapter;
  constructor() {}
}
