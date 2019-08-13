import { TestBed } from '@angular/core/testing';

import { AccountSharedApiService } from './account-shared-api.service';

describe('AccountSharedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountSharedApiService = TestBed.get(AccountSharedApiService);
    expect(service).toBeTruthy();
  });
});
