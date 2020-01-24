import { TestBed } from '@angular/core/testing';

import { HppPalletsService } from './hpp-pallets.service';

describe('HppPalletsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppPalletsService = TestBed.get(HppPalletsService);
    expect(service).toBeTruthy();
  });
});
