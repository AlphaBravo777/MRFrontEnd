import { TestBed } from '@angular/core/testing';

import { AccountData$Service } from './account-data$.service';

describe('AccountData$Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountData$Service = TestBed.get(AccountData$Service);
    expect(service).toBeTruthy();
  });
});
