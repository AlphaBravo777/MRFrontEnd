import { TestBed } from '@angular/core/testing';

import { InsertPnpCsvService } from './insert-pnp-csv.service';

describe('InsertPnpCsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertPnpCsvService = TestBed.get(InsertPnpCsvService);
    expect(service).toBeTruthy();
  });
});
