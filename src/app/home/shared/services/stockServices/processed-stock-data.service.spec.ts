import { TestBed, inject } from '@angular/core/testing';

import { ProcessedStockDataService } from './processed-stock-data.service';

describe('ProcessedStockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessedStockDataService]
    });
  });

  it('should be created', inject([ProcessedStockDataService], (service: ProcessedStockDataService) => {
    expect(service).toBeTruthy();
  }));
});
