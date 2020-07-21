import { TestBed } from '@angular/core/testing';
import { DynamicFormGraphqlStringsService } from './dynamic-form-graphql-strings.service';


describe('GraphqlStringsService', () => {
  let service: DynamicFormGraphqlStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormGraphqlStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
