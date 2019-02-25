import { TestBed } from '@angular/core/testing';

import { HppApiService } from './hpp-api.service';

describe('HppApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HppApiService = TestBed.get(HppApiService);
    expect(service).toBeTruthy();
  });
});
