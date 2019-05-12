import { TestBed } from '@angular/core/testing';

import { AlienService } from './alien.service';

describe('AlienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlienService = TestBed.get(AlienService);
    expect(service).toBeTruthy();
  });
});
