import { TestBed } from '@angular/core/testing';

import { ViewSpecificOrderApiService } from './view-specific-order-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewSpecificOrderApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, ApolloTestingModule, RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: ViewSpecificOrderApiService = TestBed.get(ViewSpecificOrderApiService);
    expect(service).toBeTruthy();
  });
});
