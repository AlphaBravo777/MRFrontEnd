import { TestBed } from '@angular/core/testing';

import { HppTransferService } from './hpp-transfer.service';

describe('HppTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppTransferService = TestBed.get(HppTransferService);
    expect(service).toBeTruthy();
  });
});
