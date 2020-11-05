import { TestBed } from '@angular/core/testing';

import { ProductionStockData$Service } from './production-stock-data$.service';

describe('ProductionStockData$Service', () => {
  let service: ProductionStockData$Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionStockData$Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
