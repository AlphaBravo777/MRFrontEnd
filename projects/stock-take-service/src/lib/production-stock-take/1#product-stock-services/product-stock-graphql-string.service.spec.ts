import { TestBed } from '@angular/core/testing';

import { ProductStockGraphqlStringService } from './product-stock-graphql-string.service';

describe('ProductStockGraphqlStringService', () => {
  let service: ProductStockGraphqlStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStockGraphqlStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
