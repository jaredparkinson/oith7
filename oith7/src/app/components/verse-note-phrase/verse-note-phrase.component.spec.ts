import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseNotePhraseComponent } from './verse-note-phrase.component';

describe('VerseNotePhraseComponent', () => {
  let component: VerseNotePhraseComponent;
  let fixture: ComponentFixture<VerseNotePhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseNotePhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseNotePhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
