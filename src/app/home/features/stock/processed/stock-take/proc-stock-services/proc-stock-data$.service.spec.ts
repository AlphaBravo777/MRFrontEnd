import { TestBed, inject } from '@angular/core/testing';

import { ProcStockData$Service } from './proc-stock-data$.service';

describe('ProcStockData$Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcStockData$Service]
    });
  });

  it('should be created', inject([ProcStockData$Service], (service: ProcStockData$Service) => {
    expect(service).toBeTruthy();
  }));
});
