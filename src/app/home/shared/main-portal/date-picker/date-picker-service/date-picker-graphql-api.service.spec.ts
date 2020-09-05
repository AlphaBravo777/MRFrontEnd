import { TestBed } from '@angular/core/testing';

import { DatePickerGraphqlApiService } from './date-picker-graphql-api.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('DatePickerGraphqlApiService', () => {
  let service: DatePickerGraphqlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ ApolloTestingModule ],
    });
    service = TestBed.inject(DatePickerGraphqlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
