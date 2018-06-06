import { TestBed, inject } from '@angular/core/testing';

import { StockTakingService } from './stock-taking.service';

describe('StockTakingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockTakingService]
    });
  });

  it('should be created', inject([StockTakingService], (service: StockTakingService) => {
    expect(service).toBeTruthy();
  }));
});
