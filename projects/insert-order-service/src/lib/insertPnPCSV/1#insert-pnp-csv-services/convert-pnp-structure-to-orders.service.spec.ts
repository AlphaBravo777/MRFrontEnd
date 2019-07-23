import { TestBed } from '@angular/core/testing';

import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ConvertPnpStructureToOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: ConvertPnpStructureToOrdersService = TestBed.get(ConvertPnpStructureToOrdersService);
    expect(service).toBeTruthy();
  });
});
