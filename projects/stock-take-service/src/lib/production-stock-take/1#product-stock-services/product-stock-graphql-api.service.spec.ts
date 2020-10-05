import { TestBed } from '@angular/core/testing';

import { ProductStockGraphqlApiService } from './product-stock-graphql-api.service';

describe('ProductStockGraphqlApiService', () => {
  let service: ProductStockGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStockGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
