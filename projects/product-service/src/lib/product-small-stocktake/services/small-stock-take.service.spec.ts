import { TestBed } from '@angular/core/testing';

import { SmallStockTakeService } from './small-stock-take.service';

describe('SmallStockTakeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmallStockTakeService = TestBed.get(SmallStockTakeService);
    expect(service).toBeTruthy();
  });
});
