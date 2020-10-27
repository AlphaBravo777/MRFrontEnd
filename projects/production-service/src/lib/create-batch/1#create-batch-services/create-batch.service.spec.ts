import { TestBed } from '@angular/core/testing';

import { CreateBatchService } from './create-batch.service';

describe('CreateBatchService', () => {
  let service: CreateBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
