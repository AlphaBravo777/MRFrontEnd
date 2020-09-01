import { TestBed } from '@angular/core/testing';

import { AccountSharedApiService } from './account-shared-api.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('AccountSharedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ApolloTestingModule ],
  }));

  it('should be created', () => {
    const service: AccountSharedApiService = TestBed.get(AccountSharedApiService);
    expect(service).toBeTruthy();
  });
});
