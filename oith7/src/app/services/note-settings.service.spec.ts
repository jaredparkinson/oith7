import { TestBed } from '@angular/core/testing';

import { NoteSettingsService } from './note-settings.service';

describe('NoteSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteSettingsService = TestBed.get(NoteSettingsService);
    expect(service).toBeTruthy();
  });
});
