import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseNoteGroupComponent } from './verse-note-group.component';

describe('VerseNoteGroupComponent', () => {
  let component: VerseNoteGroupComponent;
  let fixture: ComponentFixture<VerseNoteGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseNoteGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseNoteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
