import { TestBed } from '@angular/core/testing';

import { ViewSpecificOrderService } from './view-specific-order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ViewSpecificOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: ViewSpecificOrderService = TestBed.get(ViewSpecificOrderService);
    expect(service).toBeTruthy();
  });
});
