import { TestBed } from '@angular/core/testing';

import { DateFormService } from './date-form.service';

describe('DateFormService', () => {
  let service: DateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
