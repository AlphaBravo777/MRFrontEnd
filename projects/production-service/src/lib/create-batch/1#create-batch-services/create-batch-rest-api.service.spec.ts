import { TestBed } from '@angular/core/testing';

import { CreateBatchRestApiService } from './create-batch-rest-api.service';

describe('CreateBatchRestApiService', () => {
  let service: CreateBatchRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBatchRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
