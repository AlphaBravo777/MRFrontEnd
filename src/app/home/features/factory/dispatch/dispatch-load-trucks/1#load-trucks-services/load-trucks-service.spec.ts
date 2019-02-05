import { TestBed } from '@angular/core/testing';

import { LoadTrucksService } from './load-trucks.service';

describe('LoadTrucksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadTrucksService = TestBed.get(LoadTrucksService);
    expect(service).toBeTruthy();
  });
});
