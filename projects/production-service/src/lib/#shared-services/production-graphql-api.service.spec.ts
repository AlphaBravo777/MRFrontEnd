import { TestBed } from '@angular/core/testing';

import { ProductionGraphqlApiService } from './production-graphql-api.service';

describe('ProductionGraphqlApiService', () => {
  let service: ProductionGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
