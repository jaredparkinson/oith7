import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLoaderComponent } from './chapter-loader.component';

describe('ChapterLoaderComponent', () => {
  let component: ChapterLoaderComponent;
  let fixture: ComponentFixture<ChapterLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
