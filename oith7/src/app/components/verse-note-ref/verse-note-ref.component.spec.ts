import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseNoteRefComponent } from './verse-note-ref.component';

describe('VerseNoteRefComponent', () => {
  let component: VerseNoteRefComponent;
  let fixture: ComponentFixture<VerseNoteRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseNoteRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseNoteRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
