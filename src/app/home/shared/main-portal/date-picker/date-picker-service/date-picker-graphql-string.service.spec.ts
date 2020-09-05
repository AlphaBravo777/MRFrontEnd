import { TestBed } from '@angular/core/testing';

import { DatePickerGraphqlStringService } from './date-picker-graphql-string.service';

describe('DatePickerGraphqlStringService', () => {
  let service: DatePickerGraphqlStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerGraphqlStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
