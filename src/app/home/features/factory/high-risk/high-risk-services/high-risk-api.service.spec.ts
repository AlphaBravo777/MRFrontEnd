import { TestBed, inject } from '@angular/core/testing';

import { HighRiskApiService } from './high-risk-api.service';

describe('HighRiskApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighRiskApiService]
    });
  });

  it('should be created', inject([HighRiskApiService], (service: HighRiskApiService) => {
    expect(service).toBeTruthy();
  }));
});
