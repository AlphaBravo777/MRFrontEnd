import { TestBed } from '@angular/core/testing';

import { InsertFormService } from './insert-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InsertFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, ApolloTestingModule, ReactiveFormsModule ]
  }));

  it('should be created', () => {
    const service: InsertFormService = TestBed.get(InsertFormService);
    expect(service).toBeTruthy();
  });
});
