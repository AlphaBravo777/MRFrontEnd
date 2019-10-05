import { TestBed } from '@angular/core/testing';

import { OrderGraphqlApiService } from './order-graphql-api.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('OrderGraphqlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: OrderGraphqlApiService = TestBed.get(OrderGraphqlApiService);
    expect(service).toBeTruthy();
  });
});
