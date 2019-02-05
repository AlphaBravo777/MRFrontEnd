import { TestBed } from '@angular/core/testing';

import { LoadTrucksApiService } from './load-trucks-api.service';

describe('LoadTrucksApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadTrucksApiService = TestBed.get(LoadTrucksApiService);
    expect(service).toBeTruthy();
  });
});
