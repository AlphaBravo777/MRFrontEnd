import { TestBed } from '@angular/core/testing';

import { OrderGraphqlApiStringService } from './order-graphql-api-string.service';

describe('OrderGraphqlApiStringService', () => {
  let service: OrderGraphqlApiStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGraphqlApiStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
