import { TestBed, inject } from '@angular/core/testing';

import { HighRiskPackinglistApiService } from './high-risk-packinglist-api.service';

describe('HighRiskPackinglistApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighRiskPackinglistApiService]
    });
  });

  it('should be created', inject([HighRiskPackinglistApiService], (service: HighRiskPackinglistApiService) => {
    expect(service).toBeTruthy();
  }));
});
