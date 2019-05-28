import { TestBed } from '@angular/core/testing';

import { GetNewDateByAddingOrSubtractingService } from './get-new-date-by-adding-or-subtracting.service';

describe('GetNewDateByAddingOrSubtractingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNewDateByAddingOrSubtractingService = TestBed.get(GetNewDateByAddingOrSubtractingService);
    expect(service).toBeTruthy();
  });
});
