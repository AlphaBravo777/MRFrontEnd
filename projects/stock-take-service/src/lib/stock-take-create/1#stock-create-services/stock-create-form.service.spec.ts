import { TestBed } from '@angular/core/testing';

import { StockCreateFormService } from './stock-create-form.service';

describe('StockCreateFormService', () => {
  let service: StockCreateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCreateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
