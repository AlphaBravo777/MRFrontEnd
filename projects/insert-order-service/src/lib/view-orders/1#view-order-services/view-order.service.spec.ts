import { TestBed } from '@angular/core/testing';

import { ViewOrderService } from './view-order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ViewOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: ViewOrderService = TestBed.get(ViewOrderService);
    expect(service).toBeTruthy();
  });
});
