import { TestBed } from '@angular/core/testing';

import { ProductData$ServiceService } from './product-data$-service.service';

describe('ProductData$ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductData$ServiceService = TestBed.get(ProductData$ServiceService);
    expect(service).toBeTruthy();
  });
});
