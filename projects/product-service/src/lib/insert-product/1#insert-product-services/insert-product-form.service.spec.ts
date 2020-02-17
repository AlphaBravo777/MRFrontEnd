import { TestBed } from '@angular/core/testing';

import { InsertProductFormService } from './insert-product-form.service';

describe('InsertProductFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertProductFormService = TestBed.get(InsertProductFormService);
    expect(service).toBeTruthy();
  });
});
