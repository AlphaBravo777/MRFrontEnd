import { TestBed } from '@angular/core/testing';

import { HppPickPalletsService } from './hpp-pick-pallets.service';

describe('HppPickPalletsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppPickPalletsService = TestBed.get(HppPickPalletsService);
    expect(service).toBeTruthy();
  });
});
