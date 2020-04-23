import { TestBed } from '@angular/core/testing';

import { AddAccountFormService } from './add-account-form.service';

describe('AddAccountFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAccountFormService = TestBed.get(AddAccountFormService);
    expect(service).toBeTruthy();
  });
});
