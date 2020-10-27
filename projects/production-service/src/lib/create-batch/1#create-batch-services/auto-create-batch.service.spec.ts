import { TestBed } from '@angular/core/testing';

import { AutoCreateBatchService } from './auto-create-batch.service';

describe('AutoCreateBatchService', () => {
  let service: AutoCreateBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCreateBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
