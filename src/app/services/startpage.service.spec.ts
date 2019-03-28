import { TestBed } from '@angular/core/testing';

import { StartpageService } from './startpage.service';

describe('StartpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartpageService = TestBed.get(StartpageService);
    expect(service).toBeTruthy();
  });
});
