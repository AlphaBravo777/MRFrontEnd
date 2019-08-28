import { TestBed } from '@angular/core/testing';

import { ViewSpecificOrderService } from './view-specific-order.service';

describe('ViewSpecificOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewSpecificOrderService = TestBed.get(ViewSpecificOrderService);
    expect(service).toBeTruthy();
  });
});
