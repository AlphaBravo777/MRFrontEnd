import { TestBed } from '@angular/core/testing';

import { ProductSharedApiService } from './product-shared-api.service';

describe('ProductSharedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSharedApiService = TestBed.get(ProductSharedApiService);
    expect(service).toBeTruthy();
  });
});
