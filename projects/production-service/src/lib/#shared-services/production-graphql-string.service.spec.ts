import { TestBed } from '@angular/core/testing';

import { ProductionGraphqlStringService } from './production-graphql-string.service';

describe('ProductionGraphqlStringService', () => {
  let service: ProductionGraphqlStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionGraphqlStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
