import { TestBed } from '@angular/core/testing';

import { AddClientApiService } from './add-client-api.service';

describe('AddClientApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddClientApiService = TestBed.get(AddClientApiService);
    expect(service).toBeTruthy();
  });
});
