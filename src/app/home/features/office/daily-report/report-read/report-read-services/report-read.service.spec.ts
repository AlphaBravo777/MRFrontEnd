import { TestBed } from '@angular/core/testing';

import { ReportReadService } from './report-read.service';

describe('ReportReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportReadService = TestBed.get(ReportReadService);
    expect(service).toBeTruthy();
  });
});
