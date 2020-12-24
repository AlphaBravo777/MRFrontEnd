import { TestBed } from '@angular/core/testing';

import { TotalStockGraphqlApiService } from './total-stock-graphql-api.service';

describe('TotalStockGraphqlApiService', () => {
  let service: TotalStockGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStockGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
