import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseNoteComponent } from './verse-note.component';

describe('VerseNoteComponent', () => {
  let component: VerseNoteComponent;
  let fixture: ComponentFixture<VerseNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
