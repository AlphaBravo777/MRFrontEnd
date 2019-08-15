import { TestBed } from '@angular/core/testing';

import { OrderGraphqlApiService } from './order-graphql-api.service';

describe('OrderGraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderGraphqlApiService = TestBed.get(OrderGraphqlApiService);
    expect(service).toBeTruthy();
  });
});
