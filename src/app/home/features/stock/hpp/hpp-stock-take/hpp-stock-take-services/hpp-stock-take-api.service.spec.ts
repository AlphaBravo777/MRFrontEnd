import { TestBed } from '@angular/core/testing';

import { HppStockTakeApiService } from './hpp-stock-take-api.service';

describe('HppStockTakeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppStockTakeApiService = TestBed.get(HppStockTakeApiService);
    expect(service).toBeTruthy();
  });
});
