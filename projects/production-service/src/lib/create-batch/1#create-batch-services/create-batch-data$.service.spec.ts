import { TestBed } from '@angular/core/testing';

import { CreateBatchData$Service } from './create-batch-data$.service';

describe('CreateBatchData$Service', () => {
  let service: CreateBatchData$Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBatchData$Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
