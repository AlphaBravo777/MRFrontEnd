import { TestBed } from '@angular/core/testing';

import { HppStockTakeService } from './hpp-stock-take.service';

describe('HppStockTakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppStockTakeService = TestBed.get(HppStockTakeService);
    expect(service).toBeTruthy();
  });
});
