import { TestBed } from '@angular/core/testing';

import { TotalStockFormService } from './total-stock-form.service';

describe('TotalStockFormService', () => {
  let service: TotalStockFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStockFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
