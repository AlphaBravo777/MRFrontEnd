import { TestBed } from '@angular/core/testing';

import { ProductGraphqlApiStringService } from './product-graphql-api-string.service';

describe('ProductGraphqlApiStringService', () => {
  let service: ProductGraphqlApiStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGraphqlApiStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
