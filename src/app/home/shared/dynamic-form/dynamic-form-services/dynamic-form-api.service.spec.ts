import { TestBed } from '@angular/core/testing';

import { DynamicFormApiService } from './dynamic-form-api.service';

describe('DynamicFormApiService', () => {
  let service: DynamicFormApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
