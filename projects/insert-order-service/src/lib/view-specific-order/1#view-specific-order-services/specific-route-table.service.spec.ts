import { TestBed } from '@angular/core/testing';

import { SpecificRouteTableService } from './specific-route-table.service';

describe('SpecificRouteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecificRouteTableService = TestBed.get(SpecificRouteTableService);
    expect(service).toBeTruthy();
  });
});
