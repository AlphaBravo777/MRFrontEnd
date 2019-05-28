import { TestBed } from '@angular/core/testing';

import { PnpPickPalletsService } from './pnp-pick-pallets.service';

describe('PnpPickPalletsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PnpPickPalletsService = TestBed.get(PnpPickPalletsService);
    expect(service).toBeTruthy();
  });
});
