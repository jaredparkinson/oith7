import { TestBed } from '@angular/core/testing';

import { UnderlineService } from './underline.service';

describe('UnderlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnderlineService = TestBed.get(UnderlineService);
    expect(service).toBeTruthy();
  });
});
