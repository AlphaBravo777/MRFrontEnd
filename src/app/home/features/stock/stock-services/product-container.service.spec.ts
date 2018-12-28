import { TestBed, inject } from '@angular/core/testing';

import { ProductContainerService } from './product-container.service';

describe('ProductContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductContainerService]
    });
  });

  it('should be created', inject([ProductContainerService], (service: ProductContainerService) => {
    expect(service).toBeTruthy();
  }));
});
