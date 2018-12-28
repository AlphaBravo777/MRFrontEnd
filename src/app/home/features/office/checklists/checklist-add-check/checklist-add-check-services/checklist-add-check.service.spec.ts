import { TestBed } from '@angular/core/testing';

import { ChecklistAddCheckService } from './checklist-add-check.service';

describe('ChecklistAddCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistAddCheckService = TestBed.get(ChecklistAddCheckService);
    expect(service).toBeTruthy();
  });
});
