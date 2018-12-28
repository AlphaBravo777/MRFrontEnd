import { TestBed } from '@angular/core/testing';

import { ChecklistAddCheckApiService } from './checklist-add-check-api.service';

describe('ChecklistAddCheckApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistAddCheckApiService = TestBed.get(ChecklistAddCheckApiService);
    expect(service).toBeTruthy();
  });
});
