import { TestBed, inject } from '@angular/core/testing';

import { HighRiskDataService } from './high-risk-data.service';

describe('HighRiskDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighRiskDataService]
    });
  });

  it('should be created', inject([HighRiskDataService], (service: HighRiskDataService) => {
    expect(service).toBeTruthy();
  }));
});
