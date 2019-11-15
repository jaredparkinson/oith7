import { TestBed } from '@angular/core/testing';

import { BackdropService } from './backdrop.service';

describe('BackdropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackdropService = TestBed.get(BackdropService);
    expect(service).toBeTruthy();
  });
});
