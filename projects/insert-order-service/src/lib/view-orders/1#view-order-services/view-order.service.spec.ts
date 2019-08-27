import { TestBed } from '@angular/core/testing';

import { ViewOrderService } from './view-order.service';

describe('ViewOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewOrderService = TestBed.get(ViewOrderService);
    expect(service).toBeTruthy();
  });
});
