import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { InsertPnpCsvService } from './insert-pnp-csv.service';

describe('InsertPnpCsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, ApolloTestingModule]
  }));

  it('should be created', () => {
    const service: InsertPnpCsvService = TestBed.get(InsertPnpCsvService);
    expect(service).toBeTruthy();
  });
});
