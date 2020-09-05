import { TestBed } from '@angular/core/testing';

import { DynamicFormGraphqlService } from './dynamic-form-graphql.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('DynamicFormGraphqlService', () => {
  let service: DynamicFormGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ApolloTestingModule],
    });
    service = TestBed.inject(DynamicFormGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
