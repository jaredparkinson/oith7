import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private httpClient: HttpClient) {}

  public async load() {
    // let noteSettings = localStorage.getItem('eng-note-settings');
    //
    // if (noteSettings === null) {
    // noteSettings = await this.httpClient
    // .get('assets/scripture_files/eng-note-settings.json')
    // .toPromise();
    // }
  }
}
