import { TestBed } from '@angular/core/testing';

import { ConvertPnpStructureToOrdersService } from './convert-pnp-structure-to-orders.service';

describe('ConvertPnpStructureToOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvertPnpStructureToOrdersService = TestBed.get(ConvertPnpStructureToOrdersService);
    expect(service).toBeTruthy();
  });
});
