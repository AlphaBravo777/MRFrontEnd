import { TestBed } from '@angular/core/testing';

import { ConvertPnpCsvDataFactoryService } from './convert-pnp-csv-data-factory.service';

describe('ConvertPnpCsvDataFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvertPnpCsvDataFactoryService = TestBed.get(ConvertPnpCsvDataFactoryService);
    expect(service).toBeTruthy();
  });
});
