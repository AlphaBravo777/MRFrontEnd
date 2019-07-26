import { TestBed } from '@angular/core/testing';

import { InsertOrderData$Service } from './insert-order-data$.service';

describe('InsertOrderData$Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertOrderData$Service = TestBed.get(InsertOrderData$Service);
    expect(service).toBeTruthy();
  });
});
