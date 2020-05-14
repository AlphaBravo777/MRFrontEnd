import { TestBed } from '@angular/core/testing';

import { BatchGroupFormService } from './batch-group-form.service';

describe('BatchGroupFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchGroupFormService = TestBed.get(BatchGroupFormService);
    expect(service).toBeTruthy();
  });
});
