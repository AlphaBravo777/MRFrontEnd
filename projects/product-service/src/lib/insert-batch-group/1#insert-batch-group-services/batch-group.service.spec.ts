import { TestBed } from '@angular/core/testing';

import { BatchGroupService } from './batch-group.service';

describe('BatchGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchGroupService = TestBed.get(BatchGroupService);
    expect(service).toBeTruthy();
  });
});
