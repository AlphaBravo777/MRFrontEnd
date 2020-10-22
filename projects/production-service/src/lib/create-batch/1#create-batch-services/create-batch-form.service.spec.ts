import { TestBed } from '@angular/core/testing';

import { CreateBatchFormService } from './create-batch-form.service';

describe('CreateBatchFormService', () => {
  let service: CreateBatchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBatchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
