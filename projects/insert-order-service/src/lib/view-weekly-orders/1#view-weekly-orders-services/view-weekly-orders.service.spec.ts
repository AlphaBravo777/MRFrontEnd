import { TestBed } from '@angular/core/testing';

import { ViewWeeklyOrdersService } from './view-weekly-orders.service';

describe('ViewWeeklyOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewWeeklyOrdersService = TestBed.get(ViewWeeklyOrdersService);
    expect(service).toBeTruthy();
  });
});
