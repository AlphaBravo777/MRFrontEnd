import { TestBed } from '@angular/core/testing';

import { TotalStockService } from './total-stock.service';

describe('TotalStockService', () => {
  let service: TotalStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
