import { TestBed } from '@angular/core/testing';

import { AddAccountService } from './1#add-account.service';

describe('AddAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAccountService = TestBed.get(AddAccountService);
    expect(service).toBeTruthy();
  });
});
