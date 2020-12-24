import { TestBed } from '@angular/core/testing';

import { TotalStockRestApiService } from './total-stock-rest-api.service';

describe('TotalStockRestApiService', () => {
  let service: TotalStockRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStockRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
