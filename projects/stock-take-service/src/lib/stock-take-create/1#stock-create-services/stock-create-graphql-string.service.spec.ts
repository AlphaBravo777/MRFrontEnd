import { TestBed } from '@angular/core/testing';

import { StockCreateGraphqlStringService } from './stock-create-graphql-string.service';

describe('StockCreateGraphqlStringService', () => {
  let service: StockCreateGraphqlStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateGraphqlStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
