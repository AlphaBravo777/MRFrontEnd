import { TestBed } from '@angular/core/testing';

import { BatchGroupApiService } from './batch-group-api.service';

describe('BatchGroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchGroupApiService = TestBed.get(BatchGroupApiService);
    expect(service).toBeTruthy();
  });
});
