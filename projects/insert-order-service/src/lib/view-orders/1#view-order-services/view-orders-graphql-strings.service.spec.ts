import { TestBed } from '@angular/core/testing';

import { ViewOrdersGraphqlStringsService } from './view-orders-graphql-strings.service';

describe('ViewOrdersGraphqlStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewOrdersGraphqlStringsService = TestBed.get(ViewOrdersGraphqlStringsService);
    expect(service).toBeTruthy();
  });
});
