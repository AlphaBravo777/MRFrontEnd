import { TestBed } from '@angular/core/testing';

import { TotalStockGraphqlStringService } from './total-stock-graphql-string.service';

describe('TotalStockGraphqlStringService', () => {
  let service: TotalStockGraphqlStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStockGraphqlStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
