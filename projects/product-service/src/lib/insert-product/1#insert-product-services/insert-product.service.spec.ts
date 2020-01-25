import { TestBed } from '@angular/core/testing';

import { InsertProductService } from './insert-product.service';

describe('InsertProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertProductService = TestBed.get(InsertProductService);
    expect(service).toBeTruthy();
  });
});
