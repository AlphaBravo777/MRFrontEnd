import { TestBed } from '@angular/core/testing';

import { ProductionStockRestApiService } from './production-stock-rest-api.service';

describe('ProductionStockRestApiService', () => {
  let service: ProductionStockRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionStockRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
