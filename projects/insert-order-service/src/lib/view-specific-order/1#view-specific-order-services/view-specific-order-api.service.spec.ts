import { TestBed } from '@angular/core/testing';

import { ViewSpecificOrderApiService } from './view-specific-order-api.service';

describe('ViewSpecificOrderApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewSpecificOrderApiService = TestBed.get(ViewSpecificOrderApiService);
    expect(service).toBeTruthy();
  });
});
