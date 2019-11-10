import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseNotesComponent } from './verse-notes.component';

describe('VerseNotesComponent', () => {
  let component: VerseNotesComponent;
  let fixture: ComponentFixture<VerseNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
