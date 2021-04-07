import { TestBed } from '@angular/core/testing';

import { AccountGraphqlApiStringService } from './account-graphql-api-string.service';

describe('AccountGraphqlApiStringService', () => {
  let service: AccountGraphqlApiStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountGraphqlApiStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
