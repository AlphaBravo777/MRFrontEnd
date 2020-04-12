import { TestBed } from '@angular/core/testing';

import { AccountGraphqlApiService } from './account-graphql-api.service';

describe('AccountGraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountGraphqlApiService = TestBed.get(AccountGraphqlApiService);
    expect(service).toBeTruthy();
  });
});
