import { TestBed } from '@angular/core/testing';

import { DatePickerApiService } from './date-picker-api.service';

describe('DatePickerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatePickerApiService = TestBed.get(DatePickerApiService);
    expect(service).toBeTruthy();
  });
});
