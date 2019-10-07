import { TestBed } from '@angular/core/testing';

import { ProductValidationService } from './product-validation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProductValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: ProductValidationService = TestBed.get(ProductValidationService);
    expect(service).toBeTruthy();
  });
});
