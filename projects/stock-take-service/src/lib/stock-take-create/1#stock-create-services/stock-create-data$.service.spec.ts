import { TestBed } from '@angular/core/testing';

import { StockCreateData$Service } from './stock-create-data$.service';

describe('StockCreateData$Service', () => {
  let service: StockCreateData$Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateData$Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
