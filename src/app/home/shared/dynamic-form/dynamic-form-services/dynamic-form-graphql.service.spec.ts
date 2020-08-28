import { TestBed } from '@angular/core/testing';

import { DynamicFormGraphqlService } from './dynamic-form-graphql.service';

describe('DynamicFormGraphqlService', () => {
  let service: DynamicFormGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
