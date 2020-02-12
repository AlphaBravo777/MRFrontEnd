import { TestBed } from '@angular/core/testing';

import { ProductGraphqlApiService } from './product-graphql-api.service';

describe('ProductGraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductGraphqlApiService = TestBed.get(ProductGraphqlApiService);
    expect(service).toBeTruthy();
  });
});
