import { TestBed } from '@angular/core/testing';

import { ViewOrderData$Service } from './view-order-data$.service';

describe('ViewOrderData$Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewOrderData$Service = TestBed.get(ViewOrderData$Service);
    expect(service).toBeTruthy();
  });
});
