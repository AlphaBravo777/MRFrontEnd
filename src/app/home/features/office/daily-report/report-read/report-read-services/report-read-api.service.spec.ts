import { TestBed } from '@angular/core/testing';

import { ReportReadApiService } from './report-read-api.service';

describe('ReportReadApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportReadApiService = TestBed.get(ReportReadApiService);
    expect(service).toBeTruthy();
  });
});
