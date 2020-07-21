import { TestBed } from '@angular/core/testing';

import { DynamicFormData$Service } from './dynamic-form-data$.service';

describe('DynamicFormData$Service', () => {
  let service: DynamicFormData$Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormData$Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
