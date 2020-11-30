import { TestBed } from '@angular/core/testing';

import { StockCreateGraphqlApiService } from './stock-create-graphql-api.service';

describe('StockCreateGraphqlApiService', () => {
  let service: StockCreateGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
