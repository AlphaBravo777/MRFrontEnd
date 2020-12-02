import { TestBed } from '@angular/core/testing';

import { StockCreateService } from './stock-create.service';

describe('StockCreateService', () => {
  let service: StockCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
