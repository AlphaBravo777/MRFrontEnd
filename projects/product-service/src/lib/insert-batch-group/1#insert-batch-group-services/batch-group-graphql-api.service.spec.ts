import { TestBed } from '@angular/core/testing';

import { BatchGroupGraphqlApiService } from './batch-group-graphql-api.service';

describe('BatchGroupGraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchGroupGraphqlApiService = TestBed.get(BatchGroupGraphqlApiService);
    expect(service).toBeTruthy();
  });
});
