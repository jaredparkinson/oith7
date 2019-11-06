import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: '[chapter-loader]',
  templateUrl: './chapter-loader.component.html',
  styleUrls: ['./chapter-loader.component.scss']
})
export class ChapterLoaderComponent implements OnInit {
  constructor(
    public httpClient: HttpClient,
    public chapterService: ChapterService
  ) {}

  ngOnInit() {}
}
