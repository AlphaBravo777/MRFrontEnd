import { TestBed } from '@angular/core/testing';

import { DatePickerHelperService } from './date-picker-helper.service';

describe('DatePickerHelperService', () => {
  let service: DatePickerHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
