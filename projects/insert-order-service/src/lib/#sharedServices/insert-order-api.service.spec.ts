import { TestBed } from '@angular/core/testing';

import { InsertOrderApiService } from './insert-order-api.service';

describe('InsertOrderApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertOrderApiService = TestBed.get(InsertOrderApiService);
    expect(service).toBeTruthy();
  });
});
