import { TestBed, inject } from '@angular/core/testing';

import { ProcessedStockService } from './processed-stock.service';

describe('ProcessedStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessedStockService]
    });
  });

  it('should be created', inject([ProcessedStockService], (service: ProcessedStockService) => {
    expect(service).toBeTruthy();
  }));
});
