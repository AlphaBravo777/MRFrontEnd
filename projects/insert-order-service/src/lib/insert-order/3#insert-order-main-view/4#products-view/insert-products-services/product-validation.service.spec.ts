import { TestBed } from '@angular/core/testing';

import { ProductValidationService } from './product-validation.service';

describe('ProductValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductValidationService = TestBed.get(ProductValidationService);
    expect(service).toBeTruthy();
  });
});
