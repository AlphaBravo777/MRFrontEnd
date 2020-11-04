import { TestBed } from '@angular/core/testing';

import { ProductStockFormService } from './product-stock-form.service';

describe('ProductStockFormService', () => {
  let service: ProductStockFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStockFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
