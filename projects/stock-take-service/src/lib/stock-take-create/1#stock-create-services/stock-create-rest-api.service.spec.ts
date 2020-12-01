import { TestBed } from '@angular/core/testing';

import { StockCreateRestApiService } from './stock-create-rest-api.service';

describe('StockCreateRestApiService', () => {
  let service: StockCreateRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
